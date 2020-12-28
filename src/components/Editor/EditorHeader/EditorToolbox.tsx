/** @jsxImportSource @emotion/react */

import { Radio } from 'antd';
import { FiMove } from 'react-icons/fi';
import { GiResize } from 'react-icons/gi';
import { MdRotate90DegreesCcw } from 'react-icons/md';
import { Tooltip } from 'components/common/Popover';
import { useEditorState } from 'actions/editor/state';
import { setEditorState } from 'actions/editor/control';

function EditorToolbox() {
  let { transformMode } = useEditorState();

  return (
    <div>
      <Radio.Group
        css={{
          '.ant-radio-button-wrapper': {
            'span:last-child': { position: 'relative', top: 2 },
          },
        }}
        value={transformMode}
        onChange={e => setEditorState('transformMode', e.target.value)}
        size="small"
        optionType="button"
      >
        <Tooltip title="Move (M)">
          <Radio.Button value="translate">
            <FiMove />
          </Radio.Button>
        </Tooltip>
        <Tooltip title="Resize (S)">
          <Radio.Button value="scale">
            <GiResize />
          </Radio.Button>
        </Tooltip>
        <Tooltip title="Rotate (R)">
          <Radio.Button value="rotate">
            <MdRotate90DegreesCcw />
          </Radio.Button>
        </Tooltip>
      </Radio.Group>
    </div>
  );
}

export default EditorToolbox;
