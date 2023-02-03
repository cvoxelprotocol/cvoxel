import { useMemo } from "react";
import { CVoxelThree, CVoxelVisType } from "@/interfaces/cVoxelType";
import * as THREE from "three";
import { getGenreColor } from "@/utils/genreUtil";
import color from "color";
import { WorkCredentialWithId } from "vess-sdk";

type RoomType = {
  position: THREE.Vector3;
  priority?: number;
}[][];

export type CVoxelThreeWithId = CVoxelThree & { id: string };
type CVoxelVisTypeWithId = CVoxelVisType & { id: string };

const sigmoid_a: number = 1;

export const useMultipleVoxelStyler = (crdls: WorkCredentialWithId[]) => {
  const displayVoxels = useMemo(() => {
    const styledVoxel: CVoxelVisTypeWithId[] = [];
    let stackedVoxels: CVoxelThreeWithId[] = [];
    if (crdls && crdls.length > 0) {
      crdls.forEach((voxel, i) => {
        if (!voxel.ceramicId) return;
        let voxelTemp: CVoxelVisTypeWithId = {
          id: voxel.ceramicId,
          color: "",
          opacity: 0.45,
          lattice: false,
          scale: 1.0,
        };
        const { signature } = voxel;
        const { work, deliverables } = voxel.subject;
        const holderSig = signature?.holderSig || "";
        const partnerSig = signature?.partnerSig || "";
        const genre = work?.genre;

        let hue, lightness, saturation: number;

        /* Set opacity from sigs */
        if (holderSig && partnerSig) {
          voxelTemp["opacity"] = 0.75;
        }

        /* Set lattice from deliverable */
        if (deliverables && deliverables.length > 0) {
          voxelTemp["lattice"] = true;
        }

        // masked value effects temporarily
        /* Set vividness from value based on ETH currently */
        // const sigmoidValue =
        //   1.0 /
        //   (1.0 +
        //     Math.exp(-sigmoid_a * Math.log10(parseFloat(fiatValue || value))));
        // lightness = 100 - sigmoidValue * 50;
        // saturation = sigmoidValue * 70;
        lightness = 50;
        saturation = 70;

        /* Set hue from hoge (unassinged yet) */
        const hexColor = getGenreColor(genre);
        const genreHue = hexColor ? color(hexColor).hsl().hue() : 330;
        hue = genreHue || 330;
        voxelTemp[
          "color"
        ] = `hsl(${hue}, ${saturation.toFixed()}%, ${lightness.toFixed()}%)`;

        styledVoxel.push(voxelTemp);
      });
    }

    const room: RoomType = [];
    const sitList: THREE.Vector3[] = [];
    const voxelNum = styledVoxel.length;
    let rangeNum = 0;
    /* Measure the range of Voxel Collection */
    for (let i = 0; ; i++) {
      room.push([]);
      if ((2 * i + 1) ** 3 > voxelNum) {
        rangeNum = i;
        room.push([]);
        break;
      }
    }

    /* Set origin Voxel position */
    room[0].push({
      position: new THREE.Vector3(0, 0, 0),
      priority: 0,
    });

    /* Stack Voxels if one or more Voxels exist */
    if (rangeNum) {
      /* Start Stacking Iteration */
      const initPosition = new THREE.Vector3(0, 0, 0);
      const newStackedVoxels = styledVoxel
        .sort((a, b) => {
          if (!a || !b) return 1;
          return a?.color < b?.color ? -1 : 1;
        })
        .map((mVoxel) => {
          let tempVoxel: CVoxelThreeWithId = Object.assign(mVoxel, {
            position: initPosition,
            offset: initPosition,
          });
          /* Set position of Voxels */
          for (let i = 0; i <= rangeNum; i++) {
            if (room[i].length > 0) {
              const seat = room[i].shift();
              sitList.push(seat!.position);
              tempVoxel.position = seat!.position;

              /* Prepare new seat */
              for (let x = 0; x < 2; x++) {
                let newSeat: THREE.Vector3 =
                  x == 0
                    ? new THREE.Vector3(
                        seat!.position.x + 1,
                        seat!.position.y,
                        seat!.position.z
                      )
                    : new THREE.Vector3(
                        seat!.position.x - 1,
                        seat!.position.y,
                        seat!.position.z
                      );
                /* Add new seat if it isn't full and isn't overwrapped */
                if (
                  Math.abs(newSeat.x) >= i &&
                  !sitList.find((sit) => sit == newSeat) &&
                  !room[i].find((seat) => seat.position.equals(newSeat))
                ) {
                  room[Math.abs(newSeat.x)].push({
                    position: newSeat,
                  });
                }
              }
              /* Prepare new seat */
              for (let y = 0; y < 2; y++) {
                let newSeat: THREE.Vector3 =
                  y == 0
                    ? new THREE.Vector3(
                        seat!.position.x,
                        seat!.position.y + 1,
                        seat!.position.z
                      )
                    : new THREE.Vector3(
                        seat!.position.x,
                        seat!.position.y - 1,
                        seat!.position.z
                      );
                /* Add new seat if it isn't full and isn't overwrapped */
                if (
                  Math.abs(newSeat.y) >= i &&
                  !sitList.find((sit) => sit == newSeat) &&
                  !room[i].find((seat) => seat.position.equals(newSeat))
                ) {
                  room[Math.abs(newSeat.y)].push({
                    position: newSeat,
                  });
                }
              }
              /* Prepare new seat */
              for (let z = 0; z < 2; z++) {
                let newSeat: THREE.Vector3;
                newSeat =
                  z == 0
                    ? new THREE.Vector3(
                        seat!.position.x,
                        seat!.position.y,
                        seat!.position.z + 1
                      )
                    : new THREE.Vector3(
                        seat!.position.x,
                        seat!.position.y,
                        seat!.position.z - 1
                      );
                /* Add new seat if it isn't full and isn't overwrapped */
                if (
                  Math.abs(newSeat.z) >= i &&
                  !sitList.find((sit) => sit == newSeat) &&
                  !room[i].find((seat) => seat.position.equals(newSeat))
                ) {
                  room[Math.abs(newSeat.z)].push({
                    position: newSeat,
                  });
                }
              }
              break;
            }
          }
          return tempVoxel;
        });
      stackedVoxels = [...newStackedVoxels];
    }
    return stackedVoxels;
  }, [crdls]);

  return {
    displayVoxels,
  };
};

export const useVoxelStyler = (crdl?: WorkCredentialWithId) => {
  const displayVoxel = useMemo(() => {
    if (!(crdl && crdl.ceramicId)) return;
    const initPosition = new THREE.Vector3(0, 0, 0);
    const { signature } = crdl;
    const { work, deliverables } = crdl.subject;
    const holderSig = signature?.holderSig;
    const partnerSig = signature?.partnerSig;
    const genre = work?.genre;
    let hue, lightness, saturation: number;
    lightness = 50;
    saturation = 70;

    /* Set hue from hoge (unassinged yet) */
    const hexColor = getGenreColor(genre);
    const genreHue = hexColor ? color(hexColor).hsl().hue() : 330;
    hue = genreHue || 330;

    const styledVoxel: CVoxelThreeWithId = {
      id: crdl.ceramicId,
      color: `hsl(${hue}, ${saturation.toFixed()}%, ${lightness.toFixed()}%)`,
      opacity:
        holderSig && holderSig !== "" && partnerSig && partnerSig !== ""
          ? 0.75
          : 0.45,
      lattice: !!deliverables && deliverables.length > 0,
      scale: 1.0,
      position: initPosition,
      offset: initPosition,
    };

    return styledVoxel;
  }, [crdl]);

  return {
    displayVoxel,
  };
};
