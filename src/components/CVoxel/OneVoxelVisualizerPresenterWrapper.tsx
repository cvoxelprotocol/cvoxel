import { CVoxelThreeWithId } from "@/hooks/useVoxStyler";
import { Canvas } from "@react-three/fiber";
import { WorkCredentialWithId } from "vess-sdk";
import { OneVoxelVisualizerPresenter } from "./OneVoxelVisualizerPresenter";


type OneVoxelVisualizerPresenterProps = {
    workCredential?: WorkCredentialWithId
    zoom?: number;
    disableHover?: boolean;
    voxelForDisplay?: CVoxelThreeWithId // For direct insertion e.g. draft data
  };
export default function OneVoxelVisualizerPresenterWrapper(props: OneVoxelVisualizerPresenterProps) {
    return (
        <Canvas className="!touch-auto">
            <OneVoxelVisualizerPresenter
              workCredential={props.workCredential}
              zoom={props.zoom}
              disableHover={props.disableHover}
              voxelForDisplay={props.voxelForDisplay}
            />
          </Canvas>
    )
}