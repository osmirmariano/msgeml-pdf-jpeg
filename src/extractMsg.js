const fs = require('fs');
const MsgReader = require('@kenjiuno/msgreader');
const iconv = require('iconv-lite');

function decodeHtml(htmlBuffer) {
    try {
        return iconv.decode(htmlBuffer, 'utf-8');
    } catch (err) {
        try {
            return iconv.decode(htmlBuffer, 'windows-1252');
        } catch {
            return '<pre>Erro ao decodificar HTML</pre>';
        }
    }
}

async function parseMsgFile(filepath) {
    const buffer = fs.readFileSync(filepath);
    const reader = new MsgReader.default(buffer);
    const msgData = reader.getFileData();


    // Tentativa de extrair HTML
    let htmlBody = '';
    if (msgData.html) {
        htmlBody = decodeHtml(msgData.html);
    } else if (msgData.body) {
        htmlBody = `<pre>${msgData.body}</pre>`;
    } else {
        htmlBody = '<pre>Sem conteúdo disponível</pre>';
    }

    // Extração dos dados binários reais dos attachments
    const attachments = (msgData.attachments || []).map((attachment) => {
        if (attachment.dataType !== 'attachment') return null;
    
        try {
            // Aqui usamos diretamente o dataId do attachment
            const binData = reader.getAttachment(attachment);
            const base64 = Buffer.from(binData.content).toString('base64');
            return {
                ...attachment,
                fileData: base64,
            };
        } catch (err) {
            console.warn(`Erro ao processar anexo ${attachment.fileName}:`, err.message);
            return null;
        }
    }).filter(Boolean);
    

    const inlineImages = attachments
    .filter(att => att.attachMimeTag?.startsWith('image/') && att.fileData)
    .map(att => {
        const mime = att.attachMimeTag || 'image/png';
        return `<img src="data:${mime};base64,${att.fileData}" alt="${att.fileName}" style="max-width: 300px; display: block; margin-top: 15px;" />`;
    })
    .join('');



    const header = `
        <div style="font-family: sans-serif; font-size: 14px; color: #333; padding: 15px">
            <div><b>De:</b> ${msgData.senderName || ''} &lt;${msgData.senderEmail || ''}&gt;</div>
            <div><b>Para:</b> ${msgData.recipients?.map(r => `${r.name} &lt;${r.smtpAddress}&gt;`).join(', ') || ''}</div>
            <div><b>Assunto:</b> ${msgData.normalizedSubject || ''}</div>
        </div><hr>
    `;

    return {
        subject: msgData.normalizedSubject || 'sem_assunto',
        sender: msgData.senderEmail,
        to: msgData.recipients || [],
        attachments,
        html: `${header}${inlineImages}${htmlBody}`
    };
}

module.exports = { parseMsgFile };
