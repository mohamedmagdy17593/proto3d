import { Box as DreiBox } from 'drei';
import { BoxModel } from '../../../../types/editor';
import EditorTransformControls from '../EditorTransformControls';
import { useModelProps } from 'utils/editor';

interface BoxProps {
  model: BoxModel;
}

function Box({ model }: BoxProps) {
  let { meshProps, materialProps } = useModelProps(model);

  return (
    <EditorTransformControls model={model}>
      <DreiBox {...meshProps}>
        <meshStandardMaterial {...materialProps} />
      </DreiBox>
    </EditorTransformControls>
  );
}

export default Box;
