import * as THREE from "three";
import { FC, useRef, useState, useEffect, RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import { CVoxel, CVoxelMetaDraft, CVoxelWithId } from "@/interfaces/cVoxelType";
import CVoxelPresenter from "./CVoxelPresenter";
import { CVoxelThreeWithId, useVoxStyler } from "@/hooks/useVoxStyler";
import { initCVoxel } from "@/constants/cVoxel";
import { core } from "@/lib/ceramic/server";
import type { CVoxelItem as ICVoxelItem } from "@/interfaces";

type ShowDetailBox = ({
  item,
  offchainItems,
}: {
  item: ICVoxelItem;
  offchainItems?: CVoxelMetaDraft[];
}) => void;

// NOTE: useCVoxelDetailBox cannot be called by VisualPresenter, so it is passed by props.
type VisualizerPresenterProps = {
  ids?: string[];
  showDetailBox?: ShowDetailBox;
  zoom?: number;
  disableHover?: boolean;
  voxelsForDisplay?: (CVoxelThreeWithId | undefined)[]; // For direct insertion e.g. draft data
};

const VisualizerPresenter: FC<VisualizerPresenterProps> = ({
  ids,
  showDetailBox,
  zoom = 2,
  disableHover = false,
  voxelsForDisplay,
}) => {
  const [cVoxels, setCVoxels] = useState<CVoxelWithId[]>([]);
  const [cVoxelsMap, setCVoxelsMap] = useState<{ [id: string]: ICVoxelItem }>(
    {}
  );
  const { cvoxelsForDisplay, convertCVoxelsForDisplay } = useVoxStyler(cVoxels);

  const cCollectionRef = useRef<THREE.Group>(new THREE.Group());
  const offset = new THREE.Vector3(0, 0, 0);

  useEffect(() => {
    let isMounted = true;

    const loadVoxels = async () => {
      if (!ids) return;
      const voxelsTemp: CVoxelWithId[] = [];
      for (let i = 0; i < ids!.length; i++) {
        const voxel = await core.tileLoader.load<CVoxel>(ids[i]);
        voxelsTemp.push({ ...voxel.content, id: ids[i] });
      }
      setCVoxels(voxelsTemp);
    };

    if (isMounted) {
      if (!(ids && ids.length > 0)) {
        setCVoxels(initCVoxel);
      } else {
        loadVoxels();
      }
    }

    return () => {
      isMounted = false;
    };
  }, [ids]);

  useEffect(() => {
    let isMounted = true;
    convertCVoxelsForDisplay();
    return () => {
      isMounted = false;
    };
  }, [cVoxels]);

  useEffect(() => {
    const m: { [id: string]: ICVoxelItem } = {};
    cVoxels.forEach((vox) => {
      m[vox.id] = vox;
    });
    setCVoxelsMap(m);
  }, [cVoxels]);

  useFrame(() => {
    cCollectionRef.current.rotation.y += 0.005;
  });

  const handleClickVox = (id: string) => {
    if (cVoxelsMap[id] != undefined) {
      showDetailBox?.({ item: cVoxelsMap[id] });
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

      <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
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
        {!!voxelsForDisplay ? (
          <>
            (
            {voxelsForDisplay.map(
              (voxel, i) =>
                voxel && (
                  <CVoxelPresenter
                    {...voxel}
                    key={i}
                    handleClick={() => handleClickVox(voxel.id)}
                    disableHover={disableHover}
                  />
                )
            )}
            )
          </>
        ) : (
          <>
            (
            {cvoxelsForDisplay.map(
              (voxel, i) =>
                voxel && (
                  <CVoxelPresenter
                    {...voxel}
                    key={i}
                    handleClick={() => handleClickVox(voxel.id)}
                    disableHover={disableHover}
                  />
                )
            )}
            )
          </>
        )}
      </group>
      <PerspectiveCamera makeDefault position={[10, 6, 10]} zoom={zoom} />
    </>
  );
};

export default VisualizerPresenter;
