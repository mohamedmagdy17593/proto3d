import { Box as DreiBox } from 'drei';
import { useResource } from 'react-three-fiber';

import { BoxModel } from '../../../../types/editor';
import EditorTransformControls from '../EditorTransformControls';
import { useModelProps } from 'utils/editor';

interface BoxProps {
  model: BoxModel;
}

function Box({ model }: BoxProps) {
  let box = useResource<any>();

  let { meshProps, materialProps } = useModelProps(model, { meshRef: box });

  return (
    <EditorTransformControls model={model}>
      <DreiBox {...meshProps} ref={box}>
        <meshStandardMaterial {...materialProps} />
      </DreiBox>
    </EditorTransformControls>
  );
}

export default Box;
