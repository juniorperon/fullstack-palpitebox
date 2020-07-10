const {GoogleSpreadsheet} = require('google-spreadsheet')
const credentials = require('./credentials.json')

const doc = new GoogleSpreadsheet('1DOTd7M_9ikRf36RnMaJNp6ZcESd2jxyURAr0m_WOCCA')

const run = async() => {
    await doc.useServiceAccountAuth(credentials)
    await doc.loadInfo()
    console.log(doc.title)
}
run()