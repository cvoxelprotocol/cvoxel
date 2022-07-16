import * as THREE from "three";
import { FC, useState, useEffect } from "react";
import { Line } from "@react-three/drei";

type Props = {
  width: number;
  height: number;
  depth: number;
  lineColor: THREE.Color;
};

const LineBox: FC<Props> = ({ width, height, depth, lineColor }) => {
  const [position, setPosition] = useState<[number, number, number][]>([
    [0, 0, 0],
  ]);

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

  return <Line points={position} color={lineColor} lineWidth={1.5} />;
};

export default LineBox;
