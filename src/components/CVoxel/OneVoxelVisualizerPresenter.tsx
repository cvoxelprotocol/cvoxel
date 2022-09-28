import * as THREE from "three";
import { FC, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import CVoxelPresenter from "./CVoxelPresenter";
import { CVoxelThreeWithId, useVoxStyler } from "@/hooks/useVoxStyler";
import { WorkCredentialWithId } from "@/interfaces";

// NOTE: useCVoxelDetailBox cannot be called by VisualPresenter, so it is passed by props.
type OneVoxelVisualizerPresenterProps = {
  workCredential?: WorkCredentialWithId
  zoom?: number;
  disableHover?: boolean;
  voxelForDisplay?: CVoxelThreeWithId // For direct insertion e.g. draft data
};

export const OneVoxelVisualizerPresenter: FC<OneVoxelVisualizerPresenterProps> = ({
  zoom = 2,
  disableHover = false,
  workCredential,
  voxelForDisplay
}) => {
  const { setVoxelForDisplay, displayVoxel } = useVoxStyler();
  const cCollectionRef = useRef<THREE.Group>(new THREE.Group());

  useEffect(() => {
    let isMounted = true;
    if(!voxelForDisplay) {
      setVoxelForDisplay(workCredential)
    }
    return () => {
      isMounted = false;
    };
  }, [workCredential,voxelForDisplay]);

  useFrame(() => {
    cCollectionRef.current.rotation.y += 0.005;
  });

  if(!displayVoxel && !voxelForDisplay) return <></>

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

      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} maxDistance={20} minDistance={12} />
      <Plane
        receiveShadow
        rotation-x={-Math.PI / 2}
        position={[0, -3, 0]}
        args={[20, 20, 4, 4]}
      >
        <shadowMaterial attach="material" opacity={0.1} />
      </Plane>
      <group ref={cCollectionRef} position={[0, 0, 0]}>
        {!!voxelForDisplay && (
          <CVoxelPresenter
          {...voxelForDisplay}
          disableHover={disableHover}
        />
        )}
        {!!displayVoxel && (
            <CVoxelPresenter
            {...displayVoxel}
            disableHover={disableHover}
          />
        )}
      </group>
      <PerspectiveCamera makeDefault position={[10, 6, 10]} zoom={zoom}/>
    </>
  );
};