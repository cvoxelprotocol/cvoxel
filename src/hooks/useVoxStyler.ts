import { Vector3, Color } from "three";
import { useState, useEffect, useRef } from "react";
import { CVoxel, CVoxelVisType } from "@/interfaces/cVoxelType";
import { isDataView } from "util/types";
import styled from "styled-components";

const sigmoid_a: number = 1;

const useVoxStyler = (cVoxels: CVoxel[]): CVoxelVisType[] => {
  const styledVoxel = useRef<CVoxelVisType[]>([]);

  //console.log("stackedVoxels =", cVoxels);

  useEffect(() => {
    console.log("cVoxels =", cVoxels);
    console.log("cVoxels.length =", cVoxels.length);
    styledVoxel.current = [];
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
        if (deliverable !== "") {
          voxelTemp["lattice"] = true;
        }

        /* Set vividness from value based on ETH currently */
        const sigmoidValue =
          1.0 / (1.0 + Math.exp(-sigmoid_a * parseFloat(value)));
        //console.log("sigmoid =", sigmoidValue);
        lightness = 100 - sigmoidValue * 50;
        saturation = sigmoidValue * 70;

        /* Set hue from hoge (unassinged yet) */
        hue = 330;
        voxelTemp[
          "color"
        ] = `hsl(${hue}, ${saturation.toFixed()}%, ${lightness.toFixed()}%)`;

        styledVoxel.current.push(voxelTemp);
      });
    }
  }, [cVoxels]);

  console.log("styledVoxels =", styledVoxel.current);
  return styledVoxel.current == undefined ? [] : styledVoxel.current;
};

export default useVoxStyler;
