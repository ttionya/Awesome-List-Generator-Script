var meta = '// ==UserScript==\n \
// @name         Awesome List Generator\n \
// @namespace    https://github.com/ttionya/Awesome-List-Generator-Script\n \
// @description  Awesome List Generator browser script for Chrome.\n \
// @author       ttionya\n \
// @encoding     utf-8\n \
// @include      https://github.com/*\n \
// @require      https://unpkg.com/vue@2.1.10/dist/vue.js\n \
// @license      https://raw.githubusercontent.com/ttionya/Awesome-List-Generator-Script/master/LICENSE\n \
// @updateURL    https://raw.githubusercontent.com/ttionya/Awesome-List-Generator-Script/master/Awesome-List-Generator.chrome.user.js\n \
// @downloadURL  https://raw.githubusercontent.com/ttionya/Awesome-List-Generator-Script/master/Awesome-List-Generator.chrome.user.js\n \
// @run-at       document-end\n \
// @grant        GM_addStyle\n \
// @grant        GM_xmlhttpRequest\n \
// @connect      *\n \
// @version      1.0.0\n \
// ==/UserScript==\n'


const fs = require('fs');

const js = fs.readFileSync('./tmp/Awesome-List-Generator.js', 'utf-8');
const css = fs.readFileSync('./tmp/Awesome-List-Generator.css', 'utf-8');


fs.writeFileSync('./Awesome-List-Generator.user.js', meta + 'GM_addStyle("' + css + '");' + js);