import * as THREE from "three";
import { FC, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import CVoxelPresenter from "./CVoxelPresenter";
import { CVoxelThreeWithId, useMultipleVoxelStyler } from "@/hooks/useVoxStyler";
import { initCVoxel } from "@/constants/cVoxel";
import {  WorkCredentialWithId } from "@/interfaces";

type ShowDetailBox = ({
  item,
  offchainItems,
}: {
  item: WorkCredentialWithId;
  offchainItems?: WorkCredentialWithId[];
}) => void;

// NOTE: useCVoxelDetailBox cannot be called by VisualPresenter, so it is passed by props.
type VisualizerPresenterProps = {
  workCredentials?: WorkCredentialWithId[] | null
  showDetailBox?: ShowDetailBox;
  zoom?: number;
  disableHover?: boolean;
  voxelsForDisplay?: (CVoxelThreeWithId | undefined)[]; // For direct insertion e.g. draft data
};

const VisualizerPresenter: FC<VisualizerPresenterProps> = ({
  showDetailBox,
  zoom = 2,
  disableHover = false,
  workCredentials
}) => {
  const { displayVoxels } = useMultipleVoxelStyler(workCredentials && workCredentials.length>0 ? workCredentials : initCVoxel);

  const cCollectionRef = useRef<THREE.Group>(new THREE.Group());

  const isInitVoxels = useMemo(() => {
    return !(workCredentials && workCredentials.length>0)
  },[workCredentials])

  useFrame(() => {
    cCollectionRef.current.rotation.y += 0.005;
  });

  const handleClickVox = (id: string) => {
    if(!(workCredentials && workCredentials.length>0)) return
    const selectedVoxel = workCredentials.find(wc => wc.backupId === id)
    if (selectedVoxel) {
      showDetailBox?.({ item: selectedVoxel });
    }
  };

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

      <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} maxDistance={20} minDistance={12} />
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
        {displayVoxels.map(
          (voxel, i) =>
            voxel && (
              <CVoxelPresenter
                {...voxel}
                key={i}
                handleClick={
                  isInitVoxels ? undefined : () => handleClickVox(voxel.id)
                }
                disableHover={isInitVoxels || disableHover}
              />
            )
        )}
      </group>
      <PerspectiveCamera makeDefault position={[10, 6, 10]} zoom={zoom}/>
    </>
  );
};

export default VisualizerPresenter;
