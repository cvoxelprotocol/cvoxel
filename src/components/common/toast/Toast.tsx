import { FC, useEffect, useRef, useState } from "react";
import ToastBase from "@/components/common/toast/toast.svg";
import { CVoxelThree } from "@/interfaces";
import CVoxelPresenter from "@/components/CVoxel/CVoxelPresenter";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useCVoxelToast } from "@/hooks/useCVoxelToast";
import clsx from "clsx";

type Props = {
  message: string;
  voxel: CVoxelThree;
};

const Presenter = ({ voxel }: { voxel: CVoxelThree }) => {
  const cCollectionRef = useRef<THREE.Group>(new THREE.Group());

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
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />
      <group ref={cCollectionRef} position={[0, -1.7, 0]}>
        <CVoxelPresenter
          {...{
            ...voxel,
            position: new THREE.Vector3(0, 0, 0),
            offset: new THREE.Vector3(0, 0, 0),
            scale: 1.0,
          }}
        />
      </group>
      <PerspectiveCamera makeDefault position={[10, 6, 10]} zoom={3} />
    </>
  );
};

export const Toast: FC<Props> = ({ message, voxel }) => {
  const { isToastShow } = useCVoxelToast();
  const [isMount, setIsMount] = useState<boolean>(false);

  useEffect(() => {
    // NOTE: Prevent fade out in the initial display and display nothing
    if (isToastShow) {
      setIsMount(true);
    }
  }, [isToastShow]);

  return (
    <div className="fixed flex flex-col items-center w-full z-50 pointer-events-none">
      <div
        className={clsx(
          "relative overflow-hidden",
          !isMount && "hidden",
          isToastShow ? "animate-slide-in" : "animate-fade-out",
        )}
      >
        <ToastBase className="w-32" />
        <div className="absolute left-0 right-0 bottom-0 text-center mb-8 max-w-toast mx-auto">
          <Canvas>
            <Presenter voxel={voxel} />
          </Canvas>
          <p className="text-sm text-primary font-medium inline-block text-ellipsis overflow-hidden">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
