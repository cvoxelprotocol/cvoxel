import * as THREE from "three";
import { FC, useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Plane,
  softShadows,
} from "@react-three/drei";
import {
  CVoxelVisType,
  CCubeType,
  CVoxelThree,
  CVoxel,
  CVoxels,
} from "@/interfaces/cVoxelType";
import CVoxelPresenter from "./CVoxelPresenter";
import useVoxStyler from "@/hooks/useVoxStyler";
import useStacker from "@/hooks/useStacker";
import { useCVoxelRecord, useCVoxelsRecord } from "@/hooks/useCVoxel";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { useCore } from "@self.id/framework";

type Props = {
  did?: string[];
};

const VisualizerPresenter: FC<Props> = (Props) => {
  //const CVoxelsRecords = useCVoxelsRecord(Props.did);
  //const ids = CVoxelsRecords.content?.cVoxels.map((vox) => vox.id);
  const core = useCore();
  const [cVoxels, setCVoxels] = useState<CVoxel[]>([]);

  const voxelVis: CVoxelVisType[] = useVoxStyler(cVoxels);
  const stackedVoxels: (CVoxelThree | undefined)[] = useStacker(voxelVis);

  const cCollectionRef = useRef<THREE.Group>(new THREE.Group());
  const offset = new THREE.Vector3(0, 0, 0);

  useEffect(() => {
    setCVoxels([]);
    const voxelsTemp: CVoxel[] = [];
    const func = async () => {
      if (Props.did != undefined) {
        console.log("did =", Props.did);

        for (let i = 0; i < Props.did!.length; i++) {
          const voxel = await core.tileLoader.load<CVoxel>(Props.did[i]);
          voxelsTemp.push(voxel.content);
        }
      }
      setCVoxels(voxelsTemp);
      console.log("useEffectnonaka", cVoxels);
    };
    func();
  }, [Props.did]);

  console.log("CVoxels =", cVoxels);
  //console.log("stackedVoxels =", stackedVoxels);

  useFrame(() => {
    cCollectionRef.current.rotation.y += 0.01;
  });

  return (
    <>
      <ambientLight intensity={1.0} />
      <directionalLight
        castShadow
        position={[0, 8, 0]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* <pointLight position={[10, 10, 10]} /> */}

      <OrbitControls enablePan={false} enableZoom={true} enableRotate={false} />
      <Plane
        receiveShadow
        rotation-x={-Math.PI / 2}
        position={[0, -3, 0]}
        args={[20, 20, 4, 4]}
      >
        <shadowMaterial attach="material" opacity={0.1} />
      </Plane>
      {/* <Plane
        receiveShadow
        position={[0, -1, 0]}
        rotation-x={-Math.PI / 2}
        args={[20, 20, 4, 4]}
      >
        <meshBasicMaterial color={"white"} opacity={0.5} />
      </Plane> */}
      <group ref={cCollectionRef} position={[0, 0, 0]}>
        {stackedVoxels.map((voxel, i) =>
          voxel !== undefined ? (
            <CVoxelPresenter {...voxel} key={i} />
          ) : undefined
        )}
      </group>
      <PerspectiveCamera makeDefault position={[10, 6, 10]} />
    </>
  );
};

const initCube = () => {};

export default VisualizerPresenter;
