"use strict";

const PATH = require('path'),
    fs = require('fs'),
    execSync = require('child_process').execSync;

const rootPath = __dirname,
    tmpPath = PATH.join(rootPath, 'tmp');


/*
 * Get package version
 *
 * `process.env.npm_package_version` only worked in `npm run prod`
 */
let Version = process.env.npm_package_version || require('./package.json').version;


/*
 * Set meta
 */
const meta = '// ==UserScript==\n\
// @name         Awesome List Generator\n\
// @namespace    https://github.com/ttionya/Awesome-List-Generator-Script\n\
// @description  Awesome List Generator browser script.\n\
// @author       ttionya\n\
// @encoding     utf-8\n\
// @include      https://github.com/*\n\
// @require      https://unpkg.com/vue@2.1.10/dist/vue.js\n\
// @require      https://unpkg.com/vuex@2.1.1/dist/vuex.min.js\n\
// @license      https://raw.githubusercontent.com/ttionya/Awesome-List-Generator-Script/master/LICENSE\n\
// @updateURL    https://raw.githubusercontent.com/ttionya/Awesome-List-Generator-Script/master/Awesome-List-Generator.user.js\n\
// @downloadURL  https://raw.githubusercontent.com/ttionya/Awesome-List-Generator-Script/master/Awesome-List-Generator.user.js\n\
// @run-at       document-end\n\
// @grant        GM_addStyle\n\
// @grant        GM_xmlhttpRequest\n\
// @connect      *\n\
// @version      ' + Version + '\n\
// ==/UserScript==\n\n';


try {
    let css, js;

    // Check tmp file exists
    fs.accessSync(PATH.join(tmpPath, 'Awesome-List-Generator.css'), fs.constants.F_OK);
    fs.accessSync(PATH.join(tmpPath, 'Awesome-List-Generator.js'), fs.constants.F_OK);

    css = fs.readFileSync(PATH.join(tmpPath, 'Awesome-List-Generator.css'), 'utf-8');
    js = fs.readFileSync(PATH.join(tmpPath, 'Awesome-List-Generator.js'), 'utf-8');

    // Write file
    fs.writeFileSync(PATH.join(rootPath, 'Awesome-List-Generator.user.js'), meta + 'GM_addStyle("' + css + '");\n\n' + js);

    // Delete tmp directory
    execSync('rm -rf ' + tmpPath);
}
catch (e) {
    throw Error(e);
}