import { useEditorState } from '../../../actions/editor/state';
import Plane from './models/Plane';

function RenderModels() {
  let { models } = useEditorState();
  return (
    <>
      {models.map(model => {
        switch (model.type) {
          case 'plane': {
            return <Plane key={model.id} model={model} />;
          }
          default: {
            throw Error(`model type ${model.type} is not supported`);
          }
        }
      })}
    </>
  );
}

export default RenderModels;
