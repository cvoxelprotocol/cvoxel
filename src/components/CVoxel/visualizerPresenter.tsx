import * as THREE from "three";
import { FC, useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import { CVoxelItem, CVoxelMetaDraft } from "@/interfaces/cVoxelType";
import CVoxelPresenter from "./CVoxelPresenter";
import { CVoxelThreeWithId, useVoxStyler } from "@/hooks/useVoxStyler";
import { initCVoxel } from "@/constants/cVoxel";

type ShowDetailBox = ({
  item,
  offchainItems,
}: {
  item: CVoxelItem;
  offchainItems?: CVoxelMetaDraft[];
}) => void;

// NOTE: useCVoxelDetailBox cannot be called by VisualPresenter, so it is passed by props.
type VisualizerPresenterProps = {
  workCredentials?: CVoxelItem[]
  showDetailBox?: ShowDetailBox;
  zoom?: number;
  disableHover?: boolean;
  voxelsForDisplay?: (CVoxelThreeWithId | undefined)[]; // For direct insertion e.g. draft data
};

const VisualizerPresenter: FC<VisualizerPresenterProps> = ({
  showDetailBox,
  zoom = 2,
  disableHover = false,
  voxelsForDisplay,
  workCredentials
}) => {
  const [isInitVoxels, setIsInitVoxels] = useState<boolean>(true);
  const { displayVoxels, setCvoxelsForDisplay } = useVoxStyler();

  const cCollectionRef = useRef<THREE.Group>(new THREE.Group());


  useEffect(() => {
    let isMounted = true;
    setIsInitVoxels(!workCredentials || workCredentials.length===0)
    setCvoxelsForDisplay(workCredentials || initCVoxel)
    return () => {
      isMounted = false;
    };
  }, [workCredentials]);

  useFrame(() => {
    cCollectionRef.current.rotation.y += 0.005;
  });

  const handleClickVox = (id: string) => {
    if(!(workCredentials && workCredentials.length>0)) return
    const selectedVoxel = workCredentials.find(wc => wc.id === id)
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
