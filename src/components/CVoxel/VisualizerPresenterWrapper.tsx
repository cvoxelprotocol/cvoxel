import { Canvas } from "@react-three/fiber";
import { WorkCredentialWithId } from "vess-sdk";
import VisualizerPresenter from "./visualizerPresenter";

type Props = {
    showDetailBox?: ({ item, offchainItems, }: {
        item: WorkCredentialWithId;
        offchainItems?: WorkCredentialWithId[] | undefined;
    }) => void,
    content?: WorkCredentialWithId[] | null
}
export default function VisualizerPresenterWrapper(props: Props) {
    return (
        <Canvas shadows>
            <VisualizerPresenter
              workCredentials={props.content}
              showDetailBox={props.showDetailBox}
            />
          </Canvas>
    )
}