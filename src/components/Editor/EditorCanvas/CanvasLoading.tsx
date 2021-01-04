/** @jsxImportSource @emotion/react */

import { Spin } from 'antd';

function CanvasLoading() {
  return (
    <div
      css={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        background: 'rgba(0,0,0,80%)',
        zIndex: 10,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Spin size="large" />
    </div>
  );
}

export default CanvasLoading;
