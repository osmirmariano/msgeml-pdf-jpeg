# msgeml-pdf-jpeg

Converte arquivos `.msg` (Outlook) e `.eml` (Gmail) em PDFs e JPEG com formatação e imagens mantidas.

## Requisitos

- Node.js 16+
- [`libpff`](https://github.com/libyal/libpff) instalado no sistema (usa o comando `pffexport`)

## Instalação

```bash
npm i msgeml-pdf-jpeg
```

## Documentação
Converter EML para PDF
```js
const { convertEMLFile } = require('msgeml-pdf-jpeg');

try {
    await convertEMLFile('./exemplo/exemplo.eml', 'pdf');
} catch (error) {
    throw Error(error);
}
```

Converter EML para IMAGEM JPEG
```js
const { convertEMLFile } = require('msgeml-pdf-jpeg');

try {
    await convertEMLFile('./exemplo/exemplo.eml', 'jpeg');
} catch (error) {
    throw Error(error);
}
```

Converter MSG para PDF
```js
const { convertMSGFile } = require('msgeml-pdf-jpeg');

try {
    await convertMSGFile('./exemplo/exemplo.msg', 'pdf');
} catch (error) {
    throw Error(error);
}
```

Converter MSG para IMAGEM (JEPG)
```js
const { convertMSGFile } = require('msgeml-pdf-jpeg');

try {
    await convertMSGFile('./exemplo/exemplo.msg', 'jpeg');
} catch (error) {
    throw Error(error);
}

```
Os parâmetros dos métodos consiste em dois sendo eles: caminho do arquivo eml ou msg (quando ele gera o arquivo pdf ou jpeg ele salva no mesmo diretório que ta salvo os arquivos originais) e extensão se é PDF ou JPEG