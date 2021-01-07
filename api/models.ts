import { NowRequest, NowResponse } from '@vercel/node';

function models(req: NowRequest, res: NowResponse) {
  let { search } = req.query;

  return res.json({ message: 'Hello World', search });
}

export default models;
