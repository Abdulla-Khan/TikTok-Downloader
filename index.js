import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.post('/url', async (req, res) => {
    let { videoUrl } = req.body;
    ``
    // get url video
    let {nowm, wm, music} = await tiktokDL(videoUrl);
    res.send(JSON.stringify({nowm, wm, music}))
})

app.listen(port, () => {
    console.log(`servidor activado - http://localhost:${port}`)
    console.log(`${process.env.RAILWAY_STATIC_URL}`)
    console.log(`server actived - port: ${port}`);
})

export const tiktokDL = async url => {
    let domain = 'https://www.tikwm.com/';
    let res = await axios.post(domain+'api/', {}, {
        headers: {
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            // 'cookie': 'current_language=en; _ga=GA1.1.115940210.1660795490; _gcl_au=1.1.669324151.1660795490; _ga_5370HT04Z3=GS1.1.1660795489.1.1.1660795513.0.0.0',
            'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
        },
        params: {
            url: url,
            count: 12,
            cursor: 0,
            web: 1,
            hd: 1
        }
    })

    return {
        nowm: domain+res.data.data.play, 
        wm: domain+res.data.data.wmplay, 
        music: domain+res.data.data.music, 
    }
}