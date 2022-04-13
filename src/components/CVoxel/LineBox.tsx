import * as THREE from "three";
import { FC, useState, useMemo, useEffect } from "react";
import { Line } from "@react-three/drei";

type Props = {
  width: number;
  height: number;
  depth: number;
  lineWidth?: number;
  color: string;
};

const LineBox: FC<Props> = ({ width, height, depth, color, lineWidth = 1 }) => {
  const [position, setPosition] = useState<[number, number, number][]>([
    [0, 0, 0],
  ]);
  const lineColor = useMemo(() => new THREE.Color(color), [color]);

  useEffect(() => {
    const widthHalf = width / 2;
    const heightHalf = height / 2;
    const depthHalf = depth / 2;

    setPosition([
      [-widthHalf, heightHalf, -depthHalf],
      [widthHalf, heightHalf, -depthHalf],
      [widthHalf, -heightHalf, -depthHalf],
      [-widthHalf, -heightHalf, -depthHalf],
      [-widthHalf, heightHalf, -depthHalf],
      [-widthHalf, heightHalf, depthHalf],
      [-widthHalf, -heightHalf, depthHalf],
      [widthHalf, -heightHalf, depthHalf],
      [widthHalf, heightHalf, depthHalf],
      [widthHalf, heightHalf, -depthHalf],
      [widthHalf, -heightHalf, -depthHalf],
      [widthHalf, -heightHalf, depthHalf],
      [-widthHalf, -heightHalf, depthHalf],
      [-widthHalf, -heightHalf, -depthHalf],
      [-widthHalf, heightHalf, -depthHalf],
      [-widthHalf, heightHalf, depthHalf],
      [widthHalf, heightHalf, depthHalf],
    ]);
  }, [width, height, depth]);

  return <Line points={position} color={lineColor} lineWidth={lineWidth} />;
};

export default LineBox;
