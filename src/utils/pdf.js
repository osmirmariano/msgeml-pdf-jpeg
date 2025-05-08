const path = require('path');
const child_process = require('child_process');

async function converterPDF(page, outputPdf) {
    try {
        await page.pdf({
            path: outputPdf,
            format: 'A4',
            orientation: 'landscape',
            border: {
                top: '0.5in',
                right: '0.3in',
                bottom: '0.3in',
                left: '0.5in',
            },
            type: 'pdf',
            quality: '75',
            printBackground: true,
        });
        return page
    } catch (err) {
        throw new Error(`Erro ao gerar PDF: ${err.message}`);
    }
}


async function pdfToImage(file, opts) {
    opts = opts || {};
    opts.format = opts.format || 'png'; // png, jpeg, tiff, svg
    opts.prefix = opts.prefix || path.parse(file).name;
    opts.outdir = opts.outdir || '.';
    opts.singleFile = opts.singleFile || false;

    var bin = 'pdftocairo';
    var args = [
        `-${opts.format}`,
        file,
        path.join(opts.outdir, opts.prefix),
    ];

    if (opts.singleFile) {
        args.push('-singlefile');
    }

    return new Promise((resolve, reject) => {
        child_process.execFile(bin, args, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}


module.exports = { converterPDF, pdfToImage };
