import { Web3Storage, File } from 'web3.storage'
import axios from 'axios'

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN })

function makeFileObjects (content, filename) {
  return [new File([content], filename)]
}

const handler = async (req, res) => {
  const { method, query } = req
  if (method === 'POST') {
    const { content, filename, extension } = req.body
    const files = makeFileObjects(content, `${filename}${extension}`)

    try {
      const cid = await client.put(files)
      res.status(200).json({ cid })
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: e })
    }
  } else if (method === 'GET') {
    const { cid } = query

    try {
      const response = await client.get(cid)
      if (!response.ok) {
        console.error(response.statusText)
        res.status(500).json({ response })
        return
      }

      const files = await response.files()
      const file = files[0] // We always upload only one file
      try {
        const content = await axios.get(`https://${file.cid}.ipfs.w3s.link`)
        res.status(200).json({
          name: file.name,
          content: content.data,
          fileCid: file.cid,
          rootCid: cid,
          url: `https://${file.cid}.ipfs.w3s.link`
        })
      } catch (e) {
        res.status(500).json({ error: e })
      }
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: e })
    }
  }
}

export default handler
