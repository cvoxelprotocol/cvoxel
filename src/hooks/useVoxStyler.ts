import { Vector3, Color } from "three";
import { useState, useEffect } from "react";
import { CVoxel, CVoxelVisType } from "@/interfaces/cVoxelType";

const sigmoid_a: number = 1;

const useVoxStyler = (cVoxels: CVoxel[]): CVoxelVisType[] => {
  const [styledVoxel, setStyledVoxel] = useState<CVoxelVisType[]>([]);

  useEffect(() => {
    if (cVoxels.length != 0) {
      cVoxels.forEach((voxel, i) => {
        let voxelTemp: CVoxelVisType = {
          color: "",
          opacity: 0.5,
          lattice: false,
          scale: 1.0,
        };
        const { value, deliverable, toSig, fromSig } = voxel;
        let hue, lightness, saturation: number;

        /* Set opacity from sigs */
        if (toSig != "" && fromSig != "") {
          voxelTemp["opacity"] = 1;
        }

        /* Set lattice from deliverable */
        if (deliverable != undefined) {
          voxelTemp["lattice"] = true;
        }

        /* Set vividness from value based on ETH currently */
        const sigmoidValue =
          1.0 / (1.0 + Math.exp(-sigmoid_a * parseFloat(value)));
        lightness = sigmoidValue * 80;
        saturation = sigmoidValue * 50;

        /* Set hue from hoge (unassinged yet) */
        voxelTemp["color"] = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        setStyledVoxel([...styledVoxel, voxelTemp]);
      });
    }
  }, [cVoxels]);

  return styledVoxel;
};

export default useVoxStyler;
