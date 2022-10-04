import fs from 'fs'
import path from 'path'
const jsonPath = path.join(process.cwd(), 'pages', 'api', 'data.json')
const jsonText = fs.readFileSync(jsonPath, 'utf-8')
const data = JSON.parse(jsonText)

export default function handler(req, res) {
    if (req.method.toLocaleLowerCase() !== 'get') {
        return res.status(405).end()
    }

    res.status(200).json(data)
}