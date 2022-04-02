import * as THREE from "three";
import { FC, useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Plane,
} from "@react-three/drei";
import { CVoxel} from "@/interfaces/cVoxelType";
import CVoxelPresenter from "./CVoxelPresenter";
import {useVoxStyler} from "@/hooks/useVoxStyler";
import { initCVoxel } from "@/constants/cVoxel";
import { core } from "@/lib/ceramic/server";
type VisualizerPresenterProps = {
  ids?: string[];
};

const VisualizerPresenter: FC<VisualizerPresenterProps> = ({ids}) => {
  const [cVoxels, setCVoxels] = useState<CVoxel[]>([]);
  const {cvoxelsForDisplay, convertCVoxelsForDisplay} = useVoxStyler(cVoxels);

  const cCollectionRef = useRef<THREE.Group>(new THREE.Group());
  const offset = new THREE.Vector3(0, 0, 0);

  useEffect(() => {
    let isMounted = true

    const loadVoxels = async () => {
      if(!ids) return
      const voxelsTemp: CVoxel[] = [];
      for (let i = 0; i < ids!.length; i++) {
        const voxel = await core.tileLoader.load<CVoxel>(ids[i]);
        voxelsTemp.push(voxel.content);
      }
      setCVoxels(voxelsTemp);
    };

    if(isMounted) {
      if(!(ids && ids.length>0)){
        setCVoxels(initCVoxel);
      } else {
        loadVoxels()
      }
    }

    return () => {
      isMounted = false
    }
    
  }, [ids]);

  useEffect(() => {
    let isMounted = true
    convertCVoxelsForDisplay()
    return () => {
      isMounted = false
    }
  },[cVoxels])


  useFrame(() => {
    cCollectionRef.current.rotation.y += 0.005;
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
        {cvoxelsForDisplay.map((voxel, i) =>
          voxel && (
            <CVoxelPresenter {...voxel} key={i} />
          )
        )}
      </group>
      <PerspectiveCamera makeDefault position={[10, 6, 10]} />
    </>
  );
};

export default VisualizerPresenter;
