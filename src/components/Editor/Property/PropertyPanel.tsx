/** @jsxImportSource @emotion/react */

import { useRef } from 'react';
import { Rnd } from 'react-rnd';
import { Button, Divider, Space } from 'antd';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  deleteSelectedModel,
  updateModelPropertiesWithHistory,
  updateModelProperties,
  useSelectedModel,
  setSelectedModel,
  cloneSelectedModel,
} from '../../../actions/editor/model';
import { Tooltip } from '../../common/Popover';
import PropertyForm from './PropertyForm';
import { propertiesDefinitions } from './definitions';
import { commandKeyText } from 'utils/helpers';

const WIDTH = 250;

function PropertyPanel() {
  let positionRef = useRef<{ x: number; y: number } | null>(null);
  // initialize positionRef
  if (!positionRef.current) {
    positionRef.current = { x: window.innerWidth - WIDTH - 12, y: 50 };
  }

  let selectedModal = useSelectedModel();

  if (!selectedModal) {
    return null;
  }

  let { x, y } = positionRef.current;

  return (
    <Rnd
      css={{
        border: '1px solid  var(--border-color-split)',
        zIndex: 1000,
        background: 'var(--border-color-split)',
        boxShadow: 'var(--box-shadow-base)',
        overflow: 'hidden',
      }}
      cancel={'.PropertyPanel__undraggable-area'}
      onDragStop={(_, d) => {
        positionRef.current = { x: d.x, y: d.y };
      }}
      // @ts-ignore
      default={{
        x,
        y,
        width: WIDTH,
      }}
    >
      <div
        css={{ height: '100%', display: 'grid', gridTemplateRows: '32px 1fr' }}
      >
        <div
          css={{
            padding: '0 12px',
            lineHeight: '32px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <strong>{selectedModal.name}</strong>
          <Space size="small" css={{ marginRight: -6 }}>
            <Tooltip title={`Clone (${commandKeyText}+D)`}>
              <Button
                size="small"
                type="link"
                danger
                onClick={() => {
                  cloneSelectedModel();
                }}
              >
                <CopyOutlined />
              </Button>
            </Tooltip>

            <Tooltip title="Delete (Backspace)">
              <Button
                size="small"
                type="link"
                danger
                onClick={() => {
                  deleteSelectedModel();
                }}
              >
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Space>
        </div>
        <div
          className="PropertyPanel__undraggable-area" // used with cancel prop
          css={{
            padding: 12,
            background: 'var(--component-background)',
            cursor: 'default',
          }}
        >
          <PropertyForm
            inputDefinitions={propertiesDefinitions[selectedModal.type]}
            properties={selectedModal}
            onChange={(newProperties, withHistory: boolean = false) => {
              if (selectedModal) {
                if (withHistory) {
                  updateModelPropertiesWithHistory(
                    selectedModal.id,
                    newProperties,
                  );
                } else {
                  updateModelProperties(selectedModal.id, newProperties);
                }
              }
            }}
          />

          {/* Deselect Model button */}
          <Divider css={{ margin: '12px 0' }} dashed />
          <Button
            size="large"
            block
            type="dashed"
            onClick={() => setSelectedModel(null)}
          >
            Deselect
          </Button>
        </div>
      </div>
    </Rnd>
  );
}

export default PropertyPanel;
