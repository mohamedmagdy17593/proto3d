/** @jsxImportSource @emotion/react */

import { Collapse } from 'antd';
import styled from '@emotion/styled';
import { ModelButton, MODEL_BUTTON_SIZE } from '../../common/Buttons';
import { addModel } from '../../../actions/editor/model';
import ModelsSearch from './ModelsSearch';
import boxImage from 'images/models/box.png';
import sphereImage from 'images/models/sphere.png';
import planeImage from 'images/models/plane.png';

const { Panel } = Collapse;

export const ModelButtonsGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, ${MODEL_BUTTON_SIZE}px)`,
  gap: 8,
});

function ModelBrowser() {
  return (
    <Collapse
      css={{
        '> .ant-collapse-item > .ant-collapse-header': {
          background: 'var(--border-color-split)',
          padding: '9px 16px',
          paddingLeft: 40,
        },
        '> .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow': {
          top: 14,
        },
      }}
      defaultActiveKey={['Primitives', 'Models']}
      ghost
    >
      <Panel header="Primitives" key="Primitives">
        <ModelButtonsGrid>
          <ModelButton
            name="Plane"
            src={planeImage}
            onClick={() => addModel('plane')}
          />
          <ModelButton
            name="Box"
            src={boxImage}
            onClick={() => addModel('box')}
          />
          <ModelButton
            name="Sphere"
            src={sphereImage}
            onClick={() => addModel('sphere')}
          />
        </ModelButtonsGrid>
      </Panel>

      <Panel header="Models" key="Models">
        <ModelsSearch />
      </Panel>
    </Collapse>
  );
}

export default ModelBrowser;
