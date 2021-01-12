/** @jsxImportSource @emotion/react */

import { Progress } from 'antd';
import { Html, useProgress } from 'drei';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div
        css={{
          width: '300px',
          padding: 24,
          background: 'rgba(0,0,0,0.5)',
          borderRadius: 4,
        }}
      >
        <Progress percent={Math.round(progress)}></Progress>
      </div>
    </Html>
  );
}

export default Loader;
