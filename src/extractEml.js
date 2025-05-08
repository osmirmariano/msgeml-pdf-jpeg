const simpleParser = require('mailparser').simpleParser;
const fs = require('fs');


async function parseEmlFile(file) {
    return new Promise(async (resolve, reject) => {
        let data = fs.readFileSync(file);
        // eslint-disable-next-line handle-callback-err
        simpleParser(data, {}, async (err, parsed) => {
            if (err) resolve({ success: false, err });
            return resolve(parsed.html)
        });
    })
}


module.exports = { parseEmlFile };