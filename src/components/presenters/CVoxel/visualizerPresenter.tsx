import * as THREE from "three";
import { FC, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Plane,
  softShadows,
} from "@react-three/drei";
import { CVoxelVisType, CCubeType } from "@/interfaces/cVoxelType";
import CVoxelPresenter from "./CVoxelPresenter";

const VisualizerPresenter: FC = () => {
  const [cCube, setCCube] = useState<CCubeType>([]);
  const cCubeRef = useRef<THREE.Group>(new THREE.Group());
  const offset = new THREE.Vector3(0.25, 0.25, -0.25);
  useFrame(() => {
    cCubeRef.current.rotation.y += 0.01;
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
      <group ref={cCubeRef} position={[0, 0, 0]}>
        <CVoxelPresenter
          position={new THREE.Vector3(0, 0, 0)}
          offset={offset}
          color={"hsl(330, 70%, 50%)"}
          lattice
          scale={1}
          opacity={1}
        />
        <CVoxelPresenter
          position={new THREE.Vector3(1, 0, 0)}
          offset={offset}
          color={"hsl(330, 70%, 50%)"}
          lattice={false}
          scale={1}
          opacity={1}
        />
        <CVoxelPresenter
          position={new THREE.Vector3(1, 0, -1)}
          offset={offset}
          color={"hsl(20, 70%, 50%)"}
          lattice={false}
          scale={1}
          opacity={1}
        />
        <CVoxelPresenter
          position={new THREE.Vector3(0, 0, -1)}
          offset={offset}
          color={"hsl(100, 70%, 50%)"}
          lattice={false}
          scale={1}
          opacity={1}
        />
        <CVoxelPresenter
          position={new THREE.Vector3(0, 1, 0)}
          offset={offset}
          color={"hsl(200, 70%, 50%)"}
          lattice={false}
          scale={1}
          opacity={1}
        />
        <CVoxelPresenter
          position={new THREE.Vector3(1, 1, 0)}
          offset={offset}
          color={"hsl(200, 70%, 50%)"}
          lattice={false}
          scale={1}
          opacity={1}
        />
        <CVoxelPresenter
          position={new THREE.Vector3(1, 1, -1)}
          offset={offset}
          color={"hsl(280, 70%, 50%)"}
          lattice={false}
          scale={1}
          opacity={0.3}
        />
        <CVoxelPresenter
          position={new THREE.Vector3(0, 1, -1)}
          offset={offset}
          color={"hsl(70, 70%, 50%)"}
          lattice={false}
          scale={1}
          opacity={1}
        />
      </group>
      <PerspectiveCamera makeDefault position={[10, 6, 10]} />
    </>
  );
};

const initCube = () => {};

export default VisualizerPresenter;
