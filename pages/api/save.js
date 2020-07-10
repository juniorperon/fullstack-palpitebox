import {GoogleSpreadsheet} from 'google-spreadsheet'
import moment from 'moment'
import {fromBase64} from '../../public/base64'


const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const genCupom = () =>{
    const code = (moment().format('YYMMDDHHmmssSSS'))
    return code.substr(0,4) + '-' + code.substr(4,4) + '-' + code.substr(8,4)
}

export default async(req, res) => {
    try {
        await doc.useServiceAccountAuth({
            client_email:process.env.SHEET_CLIENT_EMAIL,
            private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
        })
        await doc.loadInfo()
        const sheet = doc.sheetsByIndex[1]
        const data = JSON.parse(req.body)

        const sheetConfig = doc.sheetsByIndex[2]
        await sheetConfig.loadCells('A3:B3')
    
        const mostrarPromocaocell = sheetConfig.getCell(2,0)
        const textocell = sheetConfig.getCell(2,1)

        let Cupom = ''
        let Promo = ''
        if(mostrarPromocaocell.value === 'Verdadeiro') {
            Cupom = genCupom()
            Promo = textocell.value
        }

        //Nome	Email	Whatsapp	Cupom	Promo
        await sheet.addRow({
            Nome: data.Nome,
            Email: data.Email,
            Whatsapp: data.Whatsapp,
            Nota: parseInt(data.Nota),
            'Data preenchimento': moment().format('DD/MM/YYYY , HH:mm:ss'),
            Cupom,
            Promo
        })
        res.end(JSON.stringify({
            showCoupon: Cupom !== '',
            Cupom,
            Promo
        }))
    } catch (err) {
        res.end('error')
    }
}
