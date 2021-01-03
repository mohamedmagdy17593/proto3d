/** @jsxImportSource @emotion/react */

import { Collapse, Input } from 'antd';
import styled from '@emotion/styled';
import { ModelButton, MODEL_BUTTON_SIZE } from '../../common/Buttons';
import { addModel } from '../../../actions/editor/model';
import boxImage from 'images/models/box.png';
import sphereImage from 'images/models/sphere.png';
import planeImage from 'images/models/plane.png';
import PUBLIC_MODELS from 'public-models';

const { Panel } = Collapse;

const ModelButtonsGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, ${MODEL_BUTTON_SIZE}px)`,
  gap: 4,
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
        <Input placeholder={`Search`} />

        <ModelButtonsGrid>
          {PUBLIC_MODELS.map(modelData => {
            return (
              <ModelButton
                key={modelData.name}
                name={modelData.name}
                src={modelData.imageUrl}
                onClick={() => {
                  addModel('custom', {
                    modelUrl: modelData.modelUrl,
                    name: modelData.name,
                  });
                }}
              />
            );
          })}
        </ModelButtonsGrid>

        {/* <div css={{ height: 200, display: 'grid', placeItems: 'center' }}>
          <p css={{ opacity: 0.5, textAlign: 'center' }}>
            Not Found come back latter
          </p>
        </div> */}
      </Panel>
    </Collapse>
  );
}

export default ModelBrowser;
