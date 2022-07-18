import * as THREE from "three";
import { FC, useRef, useState, useMemo } from "react";
import { CVoxelVisType } from "@/interfaces/cVoxelType";
import { ThreeEvent } from "@react-three/fiber";

type Props = {
  position: THREE.Vector3;
  offset?: THREE.Vector3;
  handleClick?: () => void;
  disableHover?: boolean;
} & CVoxelVisType;


const CVoxelPresenter: FC<Props> = ({
  color,
  opacity,
  lattice,
  scale,
  position,
  offset,
  handleClick,
  disableHover = false,
}) => {
  const voxelColor = useMemo(() => new THREE.Color(color), [color]);

  const voxelPosition = useMemo(
    () => position.sub(offset ? offset : new THREE.Vector3(0, 0, 0)),
    [position, offset]
  );
  const voxelRef = useRef<THREE.Mesh>(null!);
  const [hover, setHover] = useState<boolean>(false);

  const handleVoxelClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    handleClick?.();
  };

  return (
    <group
      position={voxelPosition}
      scale={!disableHover && hover ? [1.2, 1.2, 1.2] : [1, 1, 1]}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
      onClick={handleVoxelClick}
    >
      <mesh
        receiveShadow
        castShadow
        position={[0, 0, 0]}
        ref={voxelRef}
        scale={scale}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          transparent
          color={voxelColor}
          opacity={opacity}
        />
      </mesh>
      {lattice ? (
        <mesh
        receiveShadow
        castShadow
        position={[0, 0, 0]}
        scale={[1,1,1]}
      >
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial
          color={voxelColor}
          opacity={1}
        />
      </mesh>
      ) : null}
    </group>
  );
};

CVoxelPresenter.defaultProps = {
  scale: 1,
  offset: new THREE.Vector3(0, 0, 0),
};

export default CVoxelPresenter;
