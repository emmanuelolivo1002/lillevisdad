// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import lastDateJson from '../../lastDate.json'

const fs = require('fs')
type Data = {
  lastDate: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    fs.writeFileSync(
      './lastDate.json',
      JSON.stringify({ lastDate: req.body.lastDate })
    )
    return res.status(200).json({ lastDate: req.body.lastDate })
  }
  res.status(200).json(lastDateJson)
}
