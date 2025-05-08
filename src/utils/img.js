const puppeteer = require('puppeteer');
const { converterPDF } = require('./pdf');
const { pdfToImage } = require('../utils/pdf');
const fs = require('fs');

async function converterIMG(page, outputImageBase) {
    try {
        const baseFilePath = outputImageBase.split('tmp')[0];
        const outputImage = `./tmp${outputImageBase.split('tmp')[1].replace(/\.jpeg$/i, `.pdf`)}`;
        await converterPDF(page, outputImage);
        await pdfToImage(outputImage, {
            format: 'jpeg',
            outdir: `${baseFilePath}tmp`,
            singleFile: false,
        });
        fs.unlinkSync(outputImage);
    } catch (err) {
        throw new Error(`Erro ao gerar imagem: ${err.message}`);
    }
}

module.exports = { converterIMG };
