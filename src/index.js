const fs = require('fs');
const puppeteer = require('puppeteer');
const { parseMsgFile } = require('./extractMsg');
const { parseEmlFile } = require('./extractEml');
const { converter } = require('./utils/convert');

async function convertMSGFile(file, extension) {
    try {
        if (!extension || !['pdf', 'jpeg'].includes(extension)) {
            throw new Error("Parâmetro 'extension' é obrigatório e deve ser 'pdf' ou 'jpeg'");
        }

        const parsed = await parseMsgFile(file);
        if (!parsed) {
            throw new Error('Falha ao analisar o arquivo .msg');
        }
        const outputFile = file.replace(/\.msg$/i, `.${extension}`);

        const browser = await puppeteer.launch({
            headless: 'new',
            executablePath: puppeteer.executablePath(),
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        await page.setContent(parsed.html, { waitUntil: 'networkidle0' });

        await converter(page, outputFile, extension);

        await page.close();
        await browser.close();

        return { success: true };
    } catch (err) {
        console.error('Erro ao converter .msg:', err);
        return { success: false, err };
    }
}

async function convertEMLFile(file, extension) {
    try {
        if (!extension || !['pdf', 'jpeg'].includes(extension)) {
            throw new Error("Parâmetro 'extension' é obrigatório e deve ser 'pdf' ou 'jpeg'");
        }

        const parsed = await parseEmlFile(file);
        if (!parsed) {
            throw new Error('Falha ao analisar o arquivo .eml');
        }
        const outputFile = file.replace(/\.eml$/i, `.${extension}`);

        const browser = await puppeteer.launch({
            headless: 'new',
            executablePath: puppeteer.executablePath(),
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
      
        const page = await browser.newPage();
        await page.setContent(parsed, { waitUntil: 'networkidle0' });

        await converter(page, outputFile, extension);

        await page.close();
        await browser.close();

        return { success: true };
    } catch (err) {
        console.error('Erro ao converter .eml:', err);
        return { success: false, err };
    }   
}

module.exports = { convertMSGFile, convertEMLFile };
