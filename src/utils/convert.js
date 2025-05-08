const { converterPDF } = require('./pdf');
const { converterIMG } = require('./img');


async function converter(page, outputFile, extension) {
    try {
        if (extension === 'pdf') {
            await converterPDF(page, outputFile);
        } else if (extension === 'jpeg') {
            await converterIMG(page, outputFile);
        }
    } catch (err) {
        throw new Error(`Erro ao gerar PDF: ${err.message}`);
    }
}

module.exports = { converter };