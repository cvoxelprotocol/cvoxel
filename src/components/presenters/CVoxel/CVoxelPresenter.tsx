import * as THREE from "three";
import { FC, useRef, useState, useMemo } from "react";
import { CVoxelVisType } from "@/interfaces/cVoxelType";
import LineBox from "./LineBox";

type Props = {
  position: THREE.Vector3;
  offset?: THREE.Vector3;
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

  return (
    <group
      position={voxelPosition}
      scale={hover ? [0.8, 0.8, 0.8] : [1, 1, 1]}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
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
        <LineBox width={1} height={1} depth={1} color={"hsl(330, 70%, 40%)"} />
      ) : null}
    </group>
  );
};

CVoxelPresenter.defaultProps = {
  scale: 1,
  offset: new THREE.Vector3(0, 0, 0),
};

export default CVoxelPresenter;
