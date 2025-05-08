#!/usr/bin/env node

const { convertMsgToPdf } = require('../src');
const path = require('path');

const msgPath = process.argv[2];
if (!msgPath || !msgPath.endsWith('.msg')) {
    console.error('Uso: msgeml-pdf-jpeg arquivo.msg');
    process.exit(1);
}

const outputPath = msgPath.replace(/\.msg$/, '.pdf');
convertMsgToPdf(msgPath, outputPath).then(() => {
    console.log(`✅ PDF gerado: ${outputPath}`);
});
