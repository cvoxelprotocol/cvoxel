import * as THREE from "three";
import { FC, useRef, useState, useMemo } from "react";
import { CVoxelVisType } from "@/interfaces/cVoxelType";
import LineBox from "./LineBox";
import { ThreeEvent } from "@react-three/fiber";

type Props = {
  position: THREE.Vector3;
  offset?: THREE.Vector3;
  handleClick?: () => void;
} & CVoxelVisType;

const CVoxelPresenter: FC<Props> = (props) => {
  const voxelColor = useMemo(() => new THREE.Color(props.color), [props.color]);

  const voxelPosition = useMemo(
    () =>
      props.position.sub(
        props.offset ? props.offset : new THREE.Vector3(0, 0, 0)
      ),
    [props.position, props.offset]
  );
  const voxelRef = useRef<THREE.Mesh>(null!);
  const [hover, setHover] = useState<boolean>(false);

  const handleClick = (e:ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    props.handleClick?.();
  };

  return (
    <group
      position={voxelPosition}
      scale={hover ? [1.2, 1.2, 1.2] : [1, 1, 1]}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
      onClick={handleClick}
    >
      <mesh
        receiveShadow
        castShadow
        position={[0, 0, 0]}
        ref={voxelRef}
        scale={props.scale}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          transparent
          color={voxelColor}
          opacity={props.opacity}
        />
      </mesh>
      {props.lattice ? (
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
