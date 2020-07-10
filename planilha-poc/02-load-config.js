const {GoogleSpreadsheet} = require('google-spreadsheet')
const credentials = require('./credentials.json')

const doc = new GoogleSpreadsheet('1DOTd7M_9ikRf36RnMaJNp6ZcESd2jxyURAr0m_WOCCA')

const run = async() => {
        await doc.useServiceAccountAuth(credentials)
        await doc.loadInfo()
        console.log(doc.title)

        const sheet = doc.sheetsByIndex[2]
        await sheet.loadCells('A3:B3')

        console.log(sheet.title)
        const mostrarPromocaocell = sheet.getCell(2,0)
        console.log(mostrarPromocaocell.value)
        const textocell = sheet.getCell(2,1)
        console.log(textocell.value)
}
run()

