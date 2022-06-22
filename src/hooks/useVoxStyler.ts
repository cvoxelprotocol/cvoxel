import { useState } from "react";
import {
  CVoxelThree,
  CVoxelVisType,
  CVoxelWithId,
} from "@/interfaces/cVoxelType";
import * as THREE from "three";
import { useCallback } from "react";
import { getGenreColor } from "@/utils/genreUtil";
import chroma from "chroma-js";

type RoomType = {
  position: THREE.Vector3;
  priority?: number;
}[][];

type CVoxelThreeWithId = CVoxelThree & { id: string };
type CVoxelVisTypeWithId = CVoxelVisType & { id: string };

const sigmoid_a: number = 1;

export const useVoxStyler = (cVoxels: CVoxelWithId[]) => {
  const [cvoxelsForDisplay, setCvoxelsForDisplay] = useState<
    (CVoxelThreeWithId | undefined)[]
  >([]);

  const convertCVoxelsForDisplay = useCallback(() => {
    const styledVoxel: CVoxelVisTypeWithId[] = [];
    let stackedVoxels: (CVoxelThreeWithId | undefined)[] = [];
    if (cVoxels.length != 0) {
      cVoxels.forEach((voxel, i) => {
        let voxelTemp: CVoxelVisTypeWithId = {
          id: voxel.id,
          color: "",
          opacity: 0.8,
          lattice: false,
          scale: 1.0,
        };
        const { value, deliverables, toSig, fromSig, genre, fiatValue } = voxel;
        let hue, lightness, saturation: number;

        /* Set opacity from sigs */
        if (toSig != "" && fromSig != "") {
          voxelTemp["opacity"] = 1;
        }

        /* Set lattice from deliverable */
        if (!deliverables || deliverables.length === 0) {
          voxelTemp["lattice"] = true;
        }

        /* Set vividness from value based on ETH currently */
        const sigmoidValue =
          1.0 /
          (1.0 +
            Math.exp(-sigmoid_a * Math.log10(parseFloat(fiatValue || value))));
        lightness = 100 - sigmoidValue * 50;
        saturation = sigmoidValue * 70;

        /* Set hue from hoge (unassinged yet) */
        const hexColor = getGenreColor(genre);
        const genreHue = hexColor ? chroma(hexColor).hsl()[0] : 330;
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
    /* Measure the range of C-Voxel Collection */
    for (let i = 0; ; i++) {
      room.push([]);
      if ((2 * i + 1) ** 3 > voxelNum) {
        rangeNum = i;
        room.push([]);
        break;
      }
    }

    /* Set origin C-Voxel position */
    room[0].push({
      position: new THREE.Vector3(0, 0, 0),
      priority: 0,
    });

    /* Stack C-Voxels if one or more C-Voxels exist */
    if (rangeNum) {
      /* Start Stacking Iteration */
      const newStackedVoxels = styledVoxel
        .sort((a, b) => {
          if (!a || !b) return 1;
          return a?.color < b?.color ? -1 : 1;
        })
        .map((mVoxel) => {
          let tempVoxel;
          /* Set position of C-Voxels */
          for (let i = 0; i <= rangeNum; i++) {
            if (room[i].length != 0) {
              const seat = room[i].shift();
              sitList.push(seat!.position);
              tempVoxel = Object.assign(mVoxel, {
                position: seat!.position,
                offset: new THREE.Vector3(0, 0, 0),
              });

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
    setCvoxelsForDisplay(stackedVoxels);
  }, [cVoxels]);

  return { cvoxelsForDisplay, convertCVoxelsForDisplay };
};
