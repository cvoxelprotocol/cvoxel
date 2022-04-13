import { CVoxelVisType } from "@/interfaces";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { FC, useMemo } from "react";
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  Plane,
} from "@react-three/drei";
import LineBox from "./LineBox";

const OneCVoxel: FC<CVoxelVisType> = (props) => {
  const voxelColor = useMemo(() => new THREE.Color(props.color), [props.color]);
  return (
    <Canvas>
      <ambientLight intensity={1.2} />
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

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />
      <group scale={50}>
        <mesh receiveShadow castShadow position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            transparent
            color={voxelColor}
            opacity={props.opacity}
          />
        </mesh>
        {props.lattice ? (
          <LineBox
            width={1.0}
            height={1.0}
            depth={1.0}
            color={"hsl(330, 70%, 40%)"}
            lineWidth={10}
          />
        ) : null}
      </group>
      <OrthographicCamera makeDefault position={[30, 18, 30]} />
    </Canvas>
  );
};

export default OneCVoxel;
