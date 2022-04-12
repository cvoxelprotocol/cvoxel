import { FC } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
}

const NFTVisualizer:FC<Props> = (Props) => {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        
      </Canvas>
    </div>
  )
}

export default NFTVisualizer;