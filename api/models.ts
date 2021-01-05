import { NowRequest, NowResponse } from '@vercel/node';

function models(_req: NowRequest, res: NowResponse) {
  return res.json({ message: 'Hello World' });
}

export default models;
