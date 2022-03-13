import { useEffect, useState, useRef, useMemo } from "react";
import { CVoxelThree, CVoxelVisType } from "@/interfaces/cVoxelType";
import * as THREE from "three";

type RoomType = {
  position: THREE.Vector3;
  priority?: number;
}[][];

const useStacker = (
  messedVoxels: CVoxelVisType[]
): (CVoxelThree | undefined)[] => {
  //const stackedVoxels = useRef<(CVoxelThree | undefined)[]>([]);
  const [stackedVoxels, setStackedVoxels] = useState<
    (CVoxelThree | undefined)[]
  >([]);

  useEffect(() => {
    const room: RoomType = [];
    const sitList: THREE.Vector3[] = [];
    const voxelNum = messedVoxels.length;
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
    console.log("rangeNum =", rangeNum);

    /* Set origin C-Voxel position */
    room[0].push({
      position: new THREE.Vector3(0, 0, 0),
      priority: 0,
    });

    /* Stack C-Voxels if one or more C-Voxels exist */
    if (rangeNum && stackedVoxels !== undefined) {
      /* Start Stacking Iteration */
      setStackedVoxels(() =>
        messedVoxels.map((mVoxel, i) => {
          let tempVoxel;

          /* Set position of C-Voxels */
          console.log("room", room);
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
                let newSeat: THREE.Vector3;
                newSeat =
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
                let newSeat: THREE.Vector3;
                newSeat =
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
        })
      );
    } else if (!rangeNum) {
      setStackedVoxels([]);
    }
  }, [messedVoxels]);

  console.log("voxels =", stackedVoxels);
  return stackedVoxels;
};

export default useStacker;
