const {GoogleSpreadsheet} = require('google-spreadsheet')
const credentials = require('./credentials.json')

const doc = new GoogleSpreadsheet('1DOTd7M_9ikRf36RnMaJNp6ZcESd2jxyURAr0m_WOCCA')

const run = async() => {
    await doc.useServiceAccountAuth(credentials)
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[1]
    //Nome	Email	Whatsapp	Cupom	Promo
    await sheet.addRow({
        Nome: 'Tulio Faria',
        Email: 'contato@devpleno.com',
        Whatsapp: '35 999090011',
        Cupom: 'aaa111',
        Promo: 'sfnkaoslfnas'
    })
}
run()