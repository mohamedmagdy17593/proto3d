/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';
import { Rnd } from 'react-rnd';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
};

const WIDTH = 250;

function PropertyPanel() {
  let initialX = useMemo(() => window.innerWidth - WIDTH - 12, []);

  return (
    <Rnd
      css={{
        border: '1px solid  var(--border-color-split)',
        zIndex: 9999,
        background: 'var(--border-color-split)',
        boxShadow: 'var(--box-shadow-base)',
        overflow: 'hidden',
      }}
      cancel={'.PropertyPanel__undraggable-area'}
      // @ts-ignore
      default={{
        x: initialX,
        y: 50,
        width: WIDTH,
      }}
    >
      <div
        css={{ height: '100%', display: 'grid', gridTemplateRows: '32px 1fr' }}
      >
        <div css={{ padding: '0 12px', lineHeight: '32px' }}>Plane</div>
        <div
          className="PropertyPanel__undraggable-area" // used with cancel prop
          css={{
            padding: 12,
            background: 'var(--component-background)',
            cursor: 'default',
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia,
          sapiente sequi dicta nisi nesciunt tempora facere natus, in accusamus
          aperiam vel? Maiores esse odit obcaecati ab natus alias voluptates
          earum.
        </div>
      </div>
    </Rnd>
  );
}

export default PropertyPanel;
