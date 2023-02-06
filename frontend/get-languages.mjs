import * as fs from 'fs';
import * as languagesJS from 'languages';

const path = 'src/i18n'
const languages = [];

fs.readdirSync(path).forEach(x => {
    const code = x.split('.')[0];
    const baseLang = code.split('-')[0];

    const info = languagesJS.getLanguageInfo(baseLang);
    languages.push({
        code,
        ...info
    })
});
const data = JSON.stringify(languages, null, 2);
fs.writeFileSync('src/assets/languages.json', data);