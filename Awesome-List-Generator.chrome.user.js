// ==UserScript==
// @name         Awesome List Generator
// @namespace    https://github.com/ttionya/Awesome-List-Generator-Script
// @description  Awesome List Generator browser script for Chrome.
// @author       ttionya
// @encoding     utf-8
// @include      https://github.com/*
// @require      http://code.jquery.com/jquery-3.1.1.min.js
// @license      https://raw.githubusercontent.com/ttionya/Awesome-List-Generator-Script/master/LICENSE
// @updateURL    https://raw.githubusercontent.com/ttionya/Awesome-List-Generator-Script/master/Awesome-List-Generator.chrome.user.js
// @downloadURL  https://raw.githubusercontent.com/ttionya/Awesome-List-Generator-Script/master/Awesome-List-Generator.chrome.user.js
// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      *
// @version      1.0.0
// ==/UserScript==

(function() {
    'use strict';


    GM_addStyle('#alg-body { position: fixed; display: -webkit-flex; display: flex; right: -500px; top: 100px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; word-break: break-all; z-index: 99999; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; transition: right 0.5s; } #alg-tip { display: -webkit-flex; display: flex; width: 29px; cursor: pointer; background-color: orange; border-bottom-left-radius: 20px; border-top-left-radius: 20px; } #alg-tip h4 { padding: 5px 0 5px 5px; margin: 10px 0; line-height: 1; font-size: 18px; font-weight: normal; text-align: center; -webkit-writing-mode: vertical-lr; writing-mode: vertical-lr; } .alg-content { width: 500px; padding: 10px; box-sizing: border-box; border-top: solid 1px orange; border-bottom: solid 1px orange; background-color: #fff; } .alg-welcome h3, .alg-welcome p { margin: .5em 0; } .alg-setting-table, .alg-index-table { margin-top: 15px; } .alg-setting-table td:first-child, .alg-index-table td:first-child{ width: 150px; padding-right: 10px; text-align: right; } .alg-icon-box { position: absolute; left: 39px; top: 10px; } .alg-icon { float: left; height: 16px; width: 16px; margin-right: 6px; cursor: pointer; } .alg-input-lg { width: 350px; margin: 3px 0; resize: none; } .alg-btn { margin-right: 15px;} .alg-input { width: 250px; margin: 5px 0; } .alg-hidden { display: none;} #alg-body.alg-body-slideout { right: 0; transition: right 0.5s;}');



    var algBodyDiv = $('<div id="alg-body"></div>')
        , algTipDiv = $('<div id="alg-tip"><h4 title="Awesome List Generator">Awesome List Generator</h4></div>')
        , algContentDiv = $('<div class="alg-content"></div>')
        ;



    algBodyDiv.append(algTipDiv).append(algContentDiv);
    $('body').append(algBodyDiv);



    var algBody = $('#alg-body')
        , algContent = $('.alg-content')
        , algWelcome = '<div class="alg-welcome"><h3>Thank you for using Awesome List Generator</h3><p>This is your first time use Awesome List Generator.</p><p>Let us make some settings.</p><p>Make sure you have run Awesome List Generator server. <a href="https://github.com/ttionya/Awesome-List-Generator">Github</a></p><p>Please click <span style="color: red;">always allow all domains</span> button when request to a cross origin resource. <a href="https://github.com/ttionya/Awesome-List-Generator-Script">Why</a></p><button class="btn btn-sm alg-btn alg-to-setting" type="button" style="float: right;">Start</button></div>'
        , algSetting = '<div class="alg-setting"><div class="alg-icon-box alg-hidden"><img class="alg-icon alg-icon-back" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAPCAQAAABDj1eZAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAA4QAAAOEAHQCiXcAAAAHdElNRQfeBQEVJBv13HY7AAABJ0lEQVQoz3XPPyjnARzG8dcXKRyDMiAn1KW45RarSYZLN7HdL11KFllsN10pm1hMVwYlCxJ1049uccullGSQH2e4/E33u3NHfQx+/Jw/z7M9vXt6HvJKfLArI+VZJfqcCGFd1dNIoUG/XPjsp311TyFFhv1xYdgre06l1D5Ein30V9aQRL194cq2EY15pNQnl84NKEC59yasyQobum6hSZeO9ErudVfolBYO9dwEO8K3xxtUGhd+aIMOm8Ji7lGBMiWKwAszwrwyaLMhfNGAanPS5o1JqddiT9a7m+o3vgtpTV46EDlnjFoSpm4XvLYmfPVWxqF+QxacCefCVn5os1VhR1ZGLYq1WxHC8f0/jZaFMK0kl9RYFn4n/92u0S0x6+AuaTXj3zXgg2MnHB7WuQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wOS0xN1QxNToyMDozMyswODowMA4LdZEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTQtMDUtMDFUMjE6MzY6MjcrMDg6MDAtVXIqAAAATXRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA3LjAuMS02IFExNiB4ODZfNjQgMjAxNi0wOS0xNyBodHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZ93ZpU4AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADE5Nd455PYAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMjI3QnSyFQAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxMzk4OTUxMzg3Z5B3TwAAABJ0RVh0VGh1bWI6OlNpemUAMy43OEtCATST7QAAAF90RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvd3d3cm9vdC9zaXRlL3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE1ODUvMTE1ODUwMy5wbmdb8ysCAAAAAElFTkSuQmCC" title="Back" alt="Back"></div><table class="alg-setting-table"><tbody><tr><td><label for="alg-host">Host:</label></td><td><input id="alg-host" class="form-control alg-input" type="text" placeholder="Host" /></td></tr><tr><td><label for="alg-port">Port:</label></td><td><input id="alg-port" class="form-control alg-input" type="number" min="0" max="65535" placeholder="Port" /></td></tr><tr><td><label for="alg-pwd">Password:</label></td><td><input id="alg-pwd" class="form-control alg-input" type="password" placeholder="Password" /></td></tr><tr><td colspan="2">&nbsp;</td></tr><tr><td><span class="alg-setting-msg" style="color: red;"></span></td><td><button class="btn btn-sm alg-btn alg-setting-conform" type="button">Test & Conform</button><button class="btn btn-sm alg-btn alg-setting-reset" type="reset">Reset</button></td></tr></tbody></table></div>'
        , algIndex = '<div class="alg-index"><div class="alg-icon-box"><img class="alg-icon alg-icon-setting" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAfQAAAH0AMQEOAcAAAAHdElNRQffCAIWOySt31M7AAABM0lEQVQoz13RsUpbcRgF8N/9R4gGJx8hSKRO6eQbCEULggbRpYsPEIh0DpihhZI6OgQpdGi1tA6C9hHaLUNBSehY26FUJEkhDffeDrlR9JsOh3M4H+cwvqCuJZfhA40Mm8oEicSKZX0UPHUovi+ga86xFJG8zoSOBAkq9v31UVuqbN2smncIkbpE1yvfVF1ktgWvPVZTNE3LT0Ndj7DmyLF1lFwa+uUNOU/0vMCa37764o8N7BlYlQtifak2tny3asWlbbQl+uKQpY6/TyUSieiWEQQFkTKOlJw6teg9yoIZgQM//NOxgA2fnNjEvAsjV1qRhlTHS23V23rmNS15rigfyYmxpenGh6yoijm73jJZBLYNDfT0DIw8m9B3WxRd29EXmdFSfCgIpn12LkZwJp9F+w/u9mG/Y1DFxAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wOS0xN1QxNToyMTo0NyswODowMB9DM6UAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMDgtMDJUMjI6NTk6MzYrMDg6MDDqN8QNAAAATXRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA3LjAuMS02IFExNiB4ODZfNjQgMjAxNi0wOS0xNyBodHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZ93ZpU4AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADE2MV7MPCAAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMTYxzT1sfQAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNDM4NTI3NTc2hqoVEgAAABJ0RVh0VGh1bWI6OlNpemUAMy45MktC7HxhCAAAAF90RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvd3d3cm9vdC9zaXRlL3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE5MDkvMTE5MDk3Ni5wbmeQcRg2AAAAAElFTkSuQmCC" title="Setting" alt="Setting"><img class="alg-icon alg-icon-refresh" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAQAAAB+HTb/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAfQAAAH0AMQEOAcAAAAHdElNRQffCAIWOxn1tx8qAAAA2klEQVQY07XPvyuEAQDG8c9718ugTJd0mdApV/gLZLrFqgyGy3abhZTeRQy2y2rBYpPFIJPMShmuuIG3u8PdQBb5Va/hUvf+Ab7rp556At2KykpGZLScO3RjUjFAaNmqT5fqsgpm9dmRUyFjTceWvL/ytrXcarDg0YreRpUcSzQ5daQ/hRsaYh3XgQnvGikckpPg2/8UGBOCF52U5A1wpS3WFKUodOCMWOLEvEIKK54s8aCuadNwz5VIWyQbuLfv2boPF+78GDdnUNWeLxZNYVpVzZtXNbtmuhO//oA8evg06o0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDktMTdUMTU6MjE6NDYrMDg6MDC5NDgRAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE1LTA4LTAyVDIyOjU5OjI1KzA4OjAwF3XeDgAAAE10RVh0c29mdHdhcmUASW1hZ2VNYWdpY2sgNy4wLjEtNiBRMTYgeDg2XzY0IDIwMTYtMDktMTcgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmfd2aVOAAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAAxNjlQF7QSAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADE1Nw9zmosAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTQzODUyNzU2NQa4dekAAAARdEVYdFRodW1iOjpTaXplADIuNUtCo6L0agAAAF90RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvd3d3cm9vdC9zaXRlL3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE5MDkvMTE5MDk1OS5wbmdf6S7sAAAAAElFTkSuQmCC" title="Refresh" alt="Refresh" /><a class="alg-icon alg-icon-github"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfeDAURHhm7AJSUAAABD0lEQVQoz2XQzysDcBzG8ddmxZLLbI2D8qOdduHksIPQXPwHKynJf6GlHDnxD4gl8R8ocnBjOc1BSwoHliLKHHwdtmnseW6f91PP5/OhoZg5JXe+fLlTMiemTSkbakKbazalWjjp4A9s+UCSLl2KVlwpSej24h23dvSaFXHCtCfBFsbkZGTkjGFb8GQmZlEKAVVVcAO+kbJAVfAm77/yXgVVPgUV6Y5AWkVQjzbvjXQEGpNo1DPShjoCQ9KoRV0iYVn8D45bksAFBa+OXds3r7/5uHl76oIPBfocOrXi0YMcmPp9+6E+yCpbM2lKDxh1LwjKsq3GCUd2rTYrRtz7dmy8falB684Ng2FnigYa4AdeaVysj4lctwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wOS0xN1QxNToyMToyNCswODowMOjEIL8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTQtMTItMDVUMTc6MzA6MjUrMDg6MDCQOBXIAAAATXRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA3LjAuMS02IFExNiB4ODZfNjQgMjAxNi0wOS0xNyBodHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZ93ZpU4AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAXdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADYzIoQ8JwAAABZ0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAA2NERPaQkAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTQxNzc3MTgyNX4iJY0AAAASdEVYdFRodW1iOjpTaXplADEuNTlLQuc3kFoAAABfdEVYdFRodW1iOjpVUkkAZmlsZTovLy9ob21lL3d3d3Jvb3Qvc2l0ZS93d3cuZWFzeWljb24ubmV0L2Nkbi1pbWcuZWFzeWljb24uY24vc3JjLzExODExLzExODExODUucG5nsE5jegAAAABJRU5ErkJggg==" title="My Github" alt="My Github" /></a></div><table class="alg-index-table"><tbody><tr><td><label for="alg-fullname">Repo:</label></td><td><input id="alg-fullname" class="form-control alg-input-lg" type="text" placeholder="Owner / Repo" /></td></tr><tr><td><label for="alg-desc">Description:</label></td><td><textarea id="alg-desc" class="form-control alg-input-lg" rows="2" placeholder="Custom Description"></textarea></td></tr><tr><td><label>Categories:</label></td><td><div id="alg-cate"></div></td></tr><tr><td colspan="2">&nbsp;</td></tr><tr><td><span class="alg-index-msg" style="color: red;"></span></td><td><button class="btn btn-sm alg-btn alg-index-submit" type="button">Add</button><button class="btn btn-sm alg-btn alg-index-delete alg-hidden" type="button">Delete</button><button class="btn btn-sm alg-btn alg-index-ignore" type="button">Ignore</button></td></tr></tbody></table></div>'
        ;



    /**
     * Main Functions
     *
     **/

    var ALG = { };
    ALG.status = 0;


    ALG.slideOut = function () {
        algBody.addClass('alg-body-slideout');
    };
    ALG.slideIn = function () {
        algBody.removeClass('alg-body-slideout');
    };


    ALG.ls = { };
    ALG.ls.get = function (key) {
        return localStorage.getItem(key);
    };
    ALG.ls.set = function (key, value) {
        localStorage.setItem(key, value);
    };
    ALG.ls.remove = function (key) {
        localStorage.removeItem(key);
    };


    ALG.reg = { };
    ALG.reg.host = /^http(s)?:\/\/(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^http(s)?:\/\/(([a-zA-Z0-9]*|[a-zA-Z0-9]([a-zA-Z0-9\-][a-zA-Z0-9])*[a-zA-Z0-9]?|xn--[A-Za-z0-9]+)\.)*(xn--[A-Za-z0-9]+|[A-Za-z]+)$/;
    ALG.reg.port = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
    ALG.reg.pwd = /^(?=.*\d)(?=.*[A-Za-z])(?=.*[-_=+!@#$%^&*()[\]\{}\\\/|?`~;:'",.<>])[\w-=+!@#$%^&*()[\]\{}\\\/|?`~;:'",.<>]{8,}$/;


    ALG.check = { };
    ALG.check.server = function () {
        return ALG.reg.host.test(ALG.cache.host) && ALG.reg.port.test(ALG.cache.port) && ALG.reg.pwd.test(ALG.cache.pwd);
    };


    ALG.icon = { };
    ALG.icon.setting = function (currentPageHandler) {
        $('.alg-icon-setting').one('click', function () {
            buildSetting();

            $('.alg-icon-box').removeClass('alg-hidden');

            $('.alg-icon-back').one('click', function () {
                currentPageHandler();
            });
        });
    };
    ALG.icon.refresh = function () {
        $('.alg-icon-refresh').one('click', function () {
            buildIndex();
        });
    };
    ALG.icon.github = function () {
        var repoAddr = ALG.cache.repoAddr
            , githubIcon = $('.alg-icon-github')
            ;

        repoAddr ? githubIcon.attr('href', repoAddr) : githubIcon.addClass('alg-hidden');
    };


    ALG.cache = { };
    ALG.cache.host = ALG.ls.get('alg-host') || '';
    ALG.cache.port = ALG.ls.get('alg-port') || '';
    ALG.cache.pwd = ALG.ls.get('alg-pwd') || '';
    ALG.cache.resetLastInfo = function () {
        return ALG.cache.lastInfo = {
            fullName: '',
            description: null,
            categories: null,
            timestamp: 0
        };
    };
    ALG.cache.resetAllCates = function () {
        return ALG.cache.allCates = {
            value: null,
            timestamp: 0
        };
    };
    ALG.cache.lastInfo = ALG.cache.resetLastInfo();
    ALG.cache.allCates = ALG.cache.resetAllCates();

    ALG.cache.setADC = function (fullName) {
        var allCatesFlag = ALG.cache.setAllCates()
            , historyInfoFlag = ALG.cache.setHistoryInfo(fullName)
            , repoAddrFlag = ALG.cache.setRepoAddr()
            , dataString = 'action=info'
            , fullNameArr
            , updateHistoryInfo = function () {
                var historyInfos
                    , expiresTimestamp = Date.now() - 900000
                    , historyInfoArr
                    , fN // temp fullName
                    ;

                try {
                    historyInfos = JSON.parse(ALG.ls.get('alg-history-info')) || { };
                }
                catch (e) {
                    ALG.ls.remove('alg-history-info');
                    historyInfos = { };
                }

                // delete expires data
                for (fN in historyInfos) {
                    if (historyInfos[fN].timestamp < expiresTimestamp) {
                        delete historyInfos[fN];
                    }
                }

                historyInfoArr = Object.keys(historyInfos);

                // sort and delete
                if (historyInfoArr.length > 4) {
                    historyInfoArr.sort(function (pre, aft) {
                        return historyInfos[pre].timestamp - historyInfos[aft].timestamp;
                    });

                    delete historyInfos[historyInfoArr[0]];
                }

                // add
                historyInfos[fullName] = {
                    description: ALG.cache.lastInfo.description,
                    categories: ALG.cache.lastInfo.categories,
                    timestamp: ALG.cache.lastInfo.timestamp
                };

                // store in local storage
                ALG.ls.set('alg-history-info', JSON.stringify(historyInfos));
            }
            ;

        ALG.status = 0;
        dataString += allCatesFlag ? '&flag=1' : '';

        if (historyInfoFlag) {
            fullNameArr = fullName.split('/');

            dataString += '&owner=' + fullNameArr[0] + '&repo=' + fullNameArr[1];
        }

        dataString += repoAddrFlag ? '&addr=1' : '';

        if (dataString !== 'action=info') {

            // debug
            console.log('Awesome List Generator Script: Send a XMLHttpRequest, data is ' + dataString);

            ALG.common.XMLHttpRequest({
                data: dataString + '&hash=' + ALG.common.createPwdHash(),
                onerror: function () {
                    ALG.cache.errorMessage = 'Connection failed';
                },
                onload: function (result) {
                    result = JSON.parse(result.response);

                    // repo is exist
                    if (result.description !== null) {
                        ALG.cache.lastInfo = {
                            fullName: fullName,
                            description: result.description,
                            categories: result.categories,
                            timestamp: Date.now()
                        };

                        // update Local Storage
                        updateHistoryInfo();
                    }

                    // allCategories is not empty
                    if (result.allCategories) {
                        ALG.cache.allCates = {
                            value: result.allCategories,
                            timestamp: Date.now()
                        };

                        // store in local storage
                        ALG.ls.set('alg-all-categories', JSON.stringify(ALG.cache.allCates));
                    }

                    // repoAddr is always exist
                    ALG.ls.set('alg-repo-address', ALG.cache.repoAddr = result.repoAddress);

                    ALG.status = 1; // ready
                }
            });
        }
        else {
            ALG.status = 1; // ready
        }
    };
    ALG.cache.setHistoryInfo = function (fullName) {
        var historyInfo = ALG.cache.lastInfo;

        /**
         * {
         *    fullname: {
         *      description: String,
         *       categories: String,
         *        timestamp: Number
         *    } x5
         * }
         *
         * {
         *       fullName: String,
         *    description: String,
         *     categories: String,
         *      timestamp: Number
         * }
         *
         * cache 15 minutes
         **/
        if (fullName) {
            if (!historyInfo || !(historyInfo.fullName === fullName)) {
                try {
                    historyInfo = JSON.parse(ALG.ls.get('alg-history-info'));
                }
                catch (e) {
                    ALG.ls.remove('alg-history-info');
                    historyInfo = ALG.cache.resetLastInfo();
                }

                ALG.cache.lastInfo = historyInfo = historyInfo && historyInfo[fullName];
            }

            // make sure ALG.cache.lastInfo.categories is array or null
            !historyInfo ? historyInfo = ALG.cache.resetLastInfo() : 0;

            if (historyInfo.timestamp > Date.now() - 900000) {
                ALG.cache.lastInfo.fullName = fullName;
                return false;
            }
            else {
                ALG.cache.resetLastInfo();
                return true;
            }
        }
        else {
            ALG.cache.resetLastInfo();
            return false;
        }
    };
    ALG.cache.setAllCates = function () {
        var allCates = ALG.cache.allCates;

        /**
         * {
         *       value: String,
         *   timestamp: Number
         * }
         *
         * cache 15 minutes
         **/
        if (allCates.value === null) {
            try {
                ALG.cache.allCates = allCates = JSON.parse(ALG.ls.get('alg-all-categories'));
            }
            catch (e) {
                ALG.ls.remove('alg-all-categories');
                allCates = ALG.cache.resetAllCates();
            }
        }

        // make sure ALG.cache.allCates.value is array or null
        !allCates ? ALG.cache.resetAllCates() : 0;

        return ALG.cache.allCates.timestamp > Date.now() - 900000 ? false : true;
    };
    ALG.cache.setRepoAddr = function () {
        var repoAddr = ALG.cache.repoAddr
            ;

        if (typeof(repoAddr) === 'undefined') {
            ALG.cache.repoAddr = repoAddr = ALG.ls.get('alg-repo-address');
        }

        return repoAddr ? false : true;
    };

    ALG.common = { };
    ALG.common.XMLHttpRequest = function (options) {
        options.method = options.method || 'POST';
        options.url = options.url || ALG.cache.host + ':' + ALG.cache.port;

        GM_xmlhttpRequest(options);
    };
    ALG.common.createPwdHash = function () {

        // TODO
        return ALG.cache.pwd;
    };
    ALG.common.getFullName = function () {
        var owner = $('.author');

        if (owner.length === 1) {
            return owner.children().text() + '/' + owner.next().next().children().text();
        }
        else {
            return null;
        }
    };
    ALG.common.setButton = function () {
        var algSubmitBtn = $('.alg-index-submit')
            , algDeleteBtn = $('.alg-index-delete')
            ;

        // not exist
        if (ALG.cache.lastInfo.description === null) {
            algSubmitBtn.text('Add');
            algDeleteBtn.hide();
        }
        else {
            algSubmitBtn.text('Update');
            algDeleteBtn.show();
        }
    };


    ALG.action = { };
    ALG.action.add = function (algFullName, algDescription, algCatesArr) {
        var algFullNameArr = algFullName.split('/')
            , algOwner = algFullNameArr[0]
            , algRepo = algFullNameArr[1]
            , algIndexMsg = $('.alg-index-msg')
            ;

        algIndexMsg.text('Waiting...');

        ALG.common.XMLHttpRequest({
            data: 'action=add&hash=' + ALG.common.createPwdHash() + '&owner=' + algOwner + '&repo=' + algRepo + '&description=' + algDescription + '&categories=' + algCatesArr.join(', '),
            onerror: function (error) {
                algIndexMsg.text('Connection faild');
            },
            onload: function (result) {
                switch (result.status) {
                    case 500:
                        algIndexMsg.text('ErrorCode: 500');
                        break;

                    case 403:
                        algIndexMsg.text('ErrorCode: 403');
                        break;

                    case 404:
                        algIndexMsg.text('ErrorCode: 404');
                        break;

                    default:
                        algIndexMsg.text('Success.');

                        setTimeout(function () {
                            buildIndex();
                        }, 500);
                }
            }
        });
    };
    ALG.action.update = function (algFullName, algDescription, algCatesArr) {
        var algFullNameArr = algFullName.split('/')
            , algOwner = algFullNameArr[0]
            , algRepo = algFullNameArr[1]
            , algIndexMsg = $('.alg-index-msg')
            ;

        algIndexMsg.text('Waiting...');

        ALG.common.XMLHttpRequest({
            data: 'action=update&hash=' + ALG.common.createPwdHash() + '&owner=' + algOwner + '&repo=' + algRepo + '&description=' + algDescription + '&categories=' + algCatesArr.join(', '),
            onerror: function (error) {
                algIndexMsg.text('Connection faild');
            },
            onload: function (result) {
                switch (result.status) {
                    case 500:
                        algIndexMsg.text('ErrorCode: 500');
                        break;

                    case 403:
                        algIndexMsg.text('ErrorCode: 403');
                        break;

                    case 404:
                        algIndexMsg.text('ErrorCode: 404');
                        break;

                    default:
                        algIndexMsg.text('Success.');

                        setTimeout(function () {
                            ALG.cache.resetLastInfo();
                            ALG.cache.resetAllCates();
                            ALG.ls.remove('alg-history-info');
                            ALG.ls.remove('alg-all-categories');

                            buildIndex();
                        }, 500);
                }
            }
        });
    };
    ALG.action.del = function (algFullName) {
        var algFullNameArr = algFullName.split('/')
            , algOwner = algFullNameArr[0]
            , algRepo = algFullNameArr[1]
            , algIndexMsg = $('.alg-index-msg')
            ;

        algIndexMsg.text('Waiting...');

        ALG.common.XMLHttpRequest({
            data: 'action=delete&hash=' + ALG.common.createPwdHash() + '&owner=' + algOwner + '&repo=' + algRepo,
            onerror: function (error) {
                algIndexMsg.text('Connection faild');
            },
            onload: function (result) {
                switch (result.status) {
                    case 500:
                        algIndexMsg.text('ErrorCode: 500');
                        break;

                    case 403:
                        algIndexMsg.text('ErrorCode: 403');
                        break;

                    case 404:
                        algIndexMsg.text('ErrorCode: 404');
                        break;

                    default:
                        algIndexMsg.text('Success.');

                        setTimeout(function () {
                            ALG.cache.resetLastInfo();
                            ALG.cache.resetAllCates();
                            ALG.ls.remove('alg-history-info');
                            ALG.ls.remove('alg-all-categories');

                            buildIndex();
                        }, 500);
                }
            }
        });
    };



    /**
     * Tag Tool
     *
     * For ALG Categories
     *
     * Note: You have to transfer jQuery Object.
     *
     * <div class="alg-cate-box form-control" style="width: 350px;">              - box
     *   <span class="alg-cate-tags">text</span>                                  - tags
     *   <div class="alg-cate-input" contenteditable="true" data-source=""></div> - input
     * </div>
     * <div class="alg-cate-opt" style="display: none;">                          - opt
     *   <ul class="alg-cate-opt-list">                                           - list
     *     <li class="alg-cate-opt-item">text</li>                                - item
     *   </ul>
     * </div>
     **/

    var ALGTag = { };
    ALGTag.cache = { };
    ALGTag.bind = { };
    ALGTag.private = { };

    ALGTag.options = {
        // edit here
        target: 'alg-cate',
        style: '.alg-cate-box { position: relative; min-height: 36px; line-height: 22px; } .alg-cate-box-focus { border-color: #51a7e8; outline: none; box-shadow: inset 0 1px 2px rgba(0,0,0,0.075),0 0 5px rgba(81,167,232,0.5) } .alg-cate-tags { display: inline-block; padding: 1px 6px; margin: 2px 8px 2px 0; line-height: 14px; border: solid 1px #ddd; border-radius: 5px; background-color: #eee; cursor: pointer; } .alg-cate-tags:hover { color: red; text-decoration: line-through; } .alg-cate-input { display: inline-block; line-height: inherit; outline: none; } .alg-cate-input:empty:before { color: #ccc; cursor: text; content: attr(placeholder); } .alg-cate-opt { position: absolute; width: 350px; border: solid 1px #ddd; border-top: 0; background-color: #fff; z-index: 1001; } .alg-cate-opt-list { margin-bottom: 0; margin-top: 0; padding-left: 0; list-style: none; } .alg-cate-opt-list li { width: 348px; padding: 0 8px; font-size: 14px; line-height: 22px; cursor: default; } .alg-cate-opt-item-active { background-color: #f0f0f0;}',
        placeHolder: 'Categories but not Tags (Split by Comma or Entry)',

        box: $('<div class="form-control" style="width: 350px;"></div>'), // class: target + '-box'
        tags: $('<span></span>'),                                         // class: target + '-tags'
        input: $('<div></div>'),                                          // class: target + '-input'
        opt: $('<div style="display: none;"></div>'),                     // class: target + '-opt'
        list: $('<ul></ul>'),                                             // class: target + '-opt-list'
        item: $('<li></li>'),                                             // class: target + '-opt-item'

        dataSourceTags: ALG.cache.allCates.value,                         // Array or null
        dataSourceCurrentTags: ALG.cache.lastInfo.categories              // Array or null
    };

    ALGTag.init = function () {
        var targetID = ALGTag.options.target
            , inputJQ
            ;

        // add className and attributes
        ALGTag.options.box.addClass(targetID + '-box');
        ALGTag.options.tags.addClass(targetID + '-tags');
        ALGTag.options.input.addClass(targetID + '-input').attr('contenteditable', true).attr('placeholder', ALGTag.options.placeHolder);
        ALGTag.options.opt.addClass(targetID + '-opt');
        ALGTag.options.list.addClass(targetID + '-opt-list');
        ALGTag.options.item.addClass(targetID + '-opt-item');

        // output
        ALGTag.options.box.append(ALGTag.options.input);
        ALGTag.options.opt.append(ALGTag.options.list);

        $('#' + targetID).append(ALGTag.options.box).append(ALGTag.options.opt);

        // cache
        ALGTag.cache.box = inputJQ = $('.' + targetID + '-box');
        ALGTag.cache.input = $('.' + targetID + '-input');
        ALGTag.cache.opt = $('.' + targetID + '-opt');
        ALGTag.cache.list = $('.' + targetID + '-opt-list');

        ALGTag.cache.inputPosWidth = parseFloat(inputJQ.css('width')) - parseFloat(inputJQ.css('border-left-width')) - parseFloat(inputJQ.css('border-right-width')) - parseFloat(inputJQ.css('padding-right'));
        ALGTag.cache.inputBaseWidth = ALGTag.cache.inputPosWidth - parseFloat(inputJQ.css('padding-left'));

        // bind
        ALGTag.bind.style();
        ALGTag.bind.event();
        ALGTag.bind.data();
    };
    ALGTag.update = function () {

        // bind
        ALGTag.bind.data();
    };
    ALGTag.getCurrentTags = function () {
        return ALGTag.cache.currentTagsList;
    };

    ALGTag.bind.style = function () {

        // add style
        if (typeof(GM_addStyle) === 'function') {
            GM_addStyle(ALGTag.options.style);
        }
        else {
            $('head').append('<style>' + ALGTag.options.style + '</style>');
        }

        // input
        ALGTag.private.__setInputWidth();
    };
    ALGTag.bind.event = function () {
        var boxJQ = ALGTag.cache.box
            , inputJQ = ALGTag.cache.input
            , optJQ = ALGTag.cache.opt
            , listJQ = ALGTag.cache.list
            , targetID = ALGTag.options.target
            ;

        // box
        boxJQ.on('click', '.' + targetID + '-tags', function () {
            $(this).fadeOut('fast', function () {
                ALGTag.private.__removeCurrentTags($(this));
            });
        });

        // input
        inputJQ
            .on('focusin', function () {
                var inputText;

                boxJQ.addClass(targetID + '-box-focus');

                // `input` is not empty
                inputText = inputJQ.text().trim();
                inputText && ALGTag.private.__createOptTagsList(inputText);
            })
            .on('focusout', function () {
                boxJQ.removeClass(targetID + '-box-focus');

                optJQ.hide();

                $('.' + targetID + '-opt-item').removeClass(targetID + '-opt-item-active');
            })
            .on('keydown', function (e) {
                var optItemActive
                    , optItemBrother
                    , optItem
                    , inputText
                    ;

                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();

                    optItemActive = $('.' + targetID + '-opt-item-active');

                    if (optItemActive.length) {
                        optItemBrother = e.key === 'ArrowDown' ?
                            optItemActive.next('.' + targetID + '-opt-item') :
                            optItemActive.prev('.' + targetID + '-opt-item');

                        optItemActive.removeClass(targetID + '-opt-item-active');

                        // next/prev item is exist
                        if (optItemBrother.length) {
                            optItemBrother.addClass(targetID + '-opt-item-active');

                            inputJQ.text(optItemBrother.text());
                        }
                        else {

                            // get source data
                            inputJQ.text(inputJQ.data('source') || '');
                        }
                    }
                    else {
                        optItem = $('.' + targetID + '-opt-item');
                        if (optItem.length !== 0) {
                            optItem = e.key === 'ArrowDown' ?
                                optItem.eq(0) :
                                optItem.eq(-1);

                            optItem.addClass(targetID + '-opt-item-active');

                            inputJQ
                                .data('source', inputJQ.text())
                                .text(optItem.text());
                        }
                    }
                }
                else if (e.key === ',' || e.key === 'Enter') {
                    e.preventDefault();

                    inputText = inputJQ.text().trim();
                    inputText !== '' ? ALGTag.private.__addCurrentTags(inputText) : 0;
                }
                else {

                    // transfer of control
                    setTimeout(function () {
                        inputText = inputJQ.text().trim();

                        if (inputJQ.data('text') !== inputText) {
                            inputJQ.data('text', inputText);

                            ALGTag.private.__createOptTagsList(inputText);

                            ALGTag.private.__setInputWidth();
                        }
                    }, 0);
                }
            });

        // list
        listJQ
            .on('mouseover', '.' + targetID + '-opt-item', function () {
                $(this).addClass(targetID + '-opt-item-active');

                inputJQ
                    .data('source', inputJQ.text())
                    .text($(this).text());
            })
            .on('mouseout', '.' + targetID + '-opt-item', function () {
                $(this).removeClass(targetID + '-opt-item-active');

                inputJQ.text(inputJQ.data('source') || '');
            })
            .on('mousedown', '.' + targetID + '-opt-item', function () {
                ALGTag.private.__addCurrentTags($(this).text());
            });
    };
    ALGTag.bind.data = function () {
        ALGTag.private.__initCurrentTags();
    };

    ALGTag.private.__setInputWidth = function () {
        var inputJQ = ALGTag.cache.input
            , inputBaseWidth = ALGTag.cache.inputBaseWidth
            , inputWidth
            ;

        // have at least two lines
        if (inputJQ.height() > parseFloat(inputJQ.css('line-height'))) {
            inputJQ.css('width', inputBaseWidth);
        }

        // do nothing if `input` is not empty
        else if (inputJQ.text()) { }

        // other cases
        else {
            inputJQ.css('width', 0);
            inputWidth = ALGTag.cache.inputPosWidth - inputJQ.position().left;

            inputWidth < 100 ? inputJQ.css('width', inputBaseWidth) : inputJQ.css('width', inputWidth);
        }
    };
    ALGTag.private.__initCurrentTags = function () {
        var currentTagsList = ALGTag.options.dataSourceCurrentTags || []
            , currentTagsListLen = currentTagsList.length
            , inputJQ = ALGTag.cache.input
            , tags, tagClone, tagsCollection
            , i
            ;

        ALGTag.cache.currentTagsList = currentTagsList.concat();

        // cleanup
        $('.' + ALGTag.options.target + '-tags').remove();

        // exist default tags
        if (currentTagsListLen) {
            tags = ALGTag.options.tags;

            for (i = 0; i < currentTagsListLen; i++) {
                tagClone = tags.clone();
                tagClone.text(currentTagsList[i]);

                tagsCollection = tagsCollection ? tagsCollection.add(tagClone) : tagClone;
            }

            inputJQ.before(tagsCollection).attr('placeholder', ''); // cleanup placeholder
        }
        else {
            inputJQ.attr('placeholder', ALGTag.options.placeHolder); // add placeholder
        }

        ALGTag.private.__setInputWidth();
    };
    ALGTag.private.__addCurrentTags = function (tagName) {
        var targetID = ALGTag.options.target
            , inputJQ = ALGTag.cache.input
            , currentTagsList = ALGTag.cache.currentTagsList
            , tagClone
            ;

        inputJQ.data('source', '').text('');
        $('.' + targetID + '-opt-item').removeClass(targetID + '-opt-item-active');

        if (currentTagsList.indexOf(tagName) === -1) {
            tagClone = ALGTag.options.tags.clone();

            inputJQ.before(tagClone.text(tagName)).attr('placeholder', ''); // cleanup placeholder

            currentTagsList.push(tagName);
            ALGTag.cache.currentTagsList = currentTagsList;

            ALGTag.private.__setInputWidth();
        }
    };
    ALGTag.private.__removeCurrentTags = function (tagJQ) {
        var currentTagsList = ALGTag.cache.currentTagsList
            , tagName = tagJQ.text()
            , tagIndex = currentTagsList.indexOf(tagName)
            ;

        tagJQ.remove();

        if (tagIndex !== -1) {
            currentTagsList.splice(tagIndex, 1);

            ALGTag.cache.currentTagsList = currentTagsList;

            ALGTag.private.__setInputWidth();
        }

        currentTagsList.length ? 0 : ALGTag.cache.input.attr('placeholder', ALGTag.options.placeHolder); // add placeholder
    };
    ALGTag.private.__createOptTagsList = function (text) {
        var allTagsList = ALGTag.options.dataSourceTags || []
            , allTagsListLen = allTagsList.length
            , optJQ = ALGTag.cache.opt
            , allTagsText
            , matchedList, matchedListLen
            , listJQ
            , items, itemClone, itemsCollection
            , i
            ;

        ALGTag.cache.allTagsList = allTagsList.concat();
        text = (text || '').trim();
        optJQ.hide();

        $('.' + ALGTag.options.target + '-opt-item').remove();

        if (allTagsListLen && text) {
            allTagsText = ',' + allTagsList.join(',,') + ',';

            matchedList = allTagsText.match(new RegExp(',([^,]*?' + text.split('').join('[^,]*?') + '[^,]*?),', 'gi'));

            if (matchedList) {
                listJQ = ALGTag.cache.list;
                items = ALGTag.options.item;
                matchedListLen = matchedList.length;

                // max 5
                for (i = 0; i < (matchedListLen > 5 ? 5 : matchedListLen); i++) {
                    itemClone = items.clone();
                    itemClone.text(matchedList[i].replace(/,/g, ''));

                    itemsCollection = itemsCollection ? itemsCollection.add(itemClone) : itemClone;
                }

                listJQ.append(itemsCollection);

                // display
                optJQ.show();
            }
        }
    };




    // tip slide out and slide in
    $('#alg-tip').on('click', function () {
        if (algBody.hasClass('alg-body-slideout')) {
            ALG.slideIn();
        }
        else {
            ALG.slideOut();
        }
    });


    // double click other area, slide in tip
    $('body').on('dblclick' ,function (e) {
        if ($(e.target).parents('#alg-body').length === 0) {
            ALG.slideIn();
        }
    });



    /**
     * Feature
     *
     * TODO
     *
     **/

//    // click star button
//    $('.unstarred button').on('click', function () { });
//
//    // delete
//    $('.starred button').on('click', function () { });



    /**
     * Welcome Page
     *
     **/

    if (!ALG.check.server()) {
        algContent.html(algWelcome);

        // first time auto slide out
        setTimeout(function () {
            ALG.slideOut();
        }, 500);
    }
    else {
        buildIndex();
    }



    /**
     * Setting Page
     *
     **/

    function buildSetting() {
        algContent.html(algSetting);

        var algHost = $('#alg-host')
            , algPort = $('#alg-port')
            , algPwd = $('#alg-pwd')
            , algConformBtn = $('.alg-setting-conform')
            , algResetBtn = $('.alg-setting-reset')
            ;

        // bind
        algHost.val(ALG.cache.host);
        algPort.val(ALG.cache.port);
        algPwd.val(ALG.cache.pwd);

        // edit
        algHost.on('change', function () {
            var algHostVal = algHost.val().trim();

            if (algHostVal !== '' && algHostVal.toLowerCase().indexOf('http://') !== 0 && algHostVal.toLowerCase().indexOf('https://') !== 0) {
                algHost.val('http://' + algHostVal);
            }
        });
        algPort.on('change', function () {
            var algPortVal = algPort.val().trim();

            if (!ALG.reg.port.test(algPortVal)) {
                algPort.val(ALG.cache.port);
            }
        });

        // reset
        algResetBtn.on('click', function () {
            algHost.val(ALG.cache.host);
            algPort.val(ALG.cache.port);
            algPwd.val(ALG.cache.pwd);
            $('.alg-setting-msg').text('');
        });

        // conform
        algConformBtn.on('click', function () {
            var algSettingMsg = $('.alg-setting-msg')
                , algFormEles = algHost.add(algPort).add(algPwd).add(algConformBtn).add(algResetBtn)
                ;

            ALG.cache.host = algHost.val().trim();
            ALG.cache.port = algPort.val().trim();
            ALG.cache.pwd =  algPwd.val().trim();

            // reset result
            algSettingMsg.text('Waiting...');

            if (ALG.check.server()) {

                // disabled inputs and buttons
                algFormEles.attr('disabled', 'disabled');

                // test and conform
                ALG.common.XMLHttpRequest({
                    data: 'action=conform&hash=' + ALG.common.createPwdHash(),
                    onerror: function () {
                        algSettingMsg.text('Connection failed');

                        // remove inputs and buttons disabled
                        algFormEles.removeAttr('disabled');
                    },
                    onload: function (result) {

                        // remove inputs and buttons disabled
                        algFormEles.removeAttr('disabled');

                        switch (result.status) {
                            case 401:
                                algSettingMsg.text('Wrong password');

                                break;

                            case 200:
                                if (result.response === 'Validation was successful.') {

                                    // success
                                    ALG.ls.set('alg-host', ALG.cache.host);
                                    ALG.ls.set('alg-port', ALG.cache.port);
                                    ALG.ls.set('alg-pwd', ALG.cache.pwd);

                                    // remove event listener
                                    algHost.off('change');
                                    algPort.off('change');
                                    algResetBtn.off('click');
                                    algConformBtn.off('click');

                                    // slide in
                                    ALG.slideIn();

                                    buildIndex();
                                }
                                else {
                                    algSettingMsg.text('Wrong host');
                                }

                                break;

                            default:
                                algSettingMsg.text('Wrong host');
                        }
                    }
                });
            }
            else {
                algSettingMsg.text('Form error');
            }
        });
    }

    $('.alg-to-setting').one('click', function () {
        buildSetting();
    });



    /**
     * Index Page
     *
     **/

    function buildIndex() {
        algContent.html(algIndex);

        var algFullName = ALG.common.getFullName()
            , algFullNameInput = $('#alg-fullname')
            , algIndexMsg = $('.alg-index-msg')
            , algTimer
            , resetForm = function (algFullName) {
                var lastInfo = ALG.cache.lastInfo;

                // fullName
                algFullName && algFullNameInput.val(algFullName);

                // description
                $('#alg-desc').val(lastInfo.description);

                // ALGTag
                ALGTag.options.dataSourceTags = ALG.cache.allCates.value;
                ALGTag.options.dataSourceCurrentTags = ALG.cache.lastInfo.categories;
                ALGTag.update();

                ALG.common.setButton();

                algIndexMsg.text('');
            }
            ;

        algFullNameInput.val(algFullName);
        algIndexMsg.text('Synchronizing...');

        ALG.cache.setADC(algFullName);

        ALG.icon.setting(buildIndex);
        ALG.icon.refresh();
        ALG.icon.github();
        ALGTag.init();

        // if finished
        algTimer = setInterval(function () {
            if (ALG.status) {
                clearInterval(algTimer);

                resetForm(algFullName);
            }
        }, 100);

        // event
        algFullNameInput.on('change', function () {
            var algFullName = algFullNameInput.val();

            algIndexMsg.text('Synchronizing...');
            ALG.cache.resetLastInfo();
            ALG.cache.resetAllCates();
            ALG.cache.setADC(algFullName);

            algTimer = setInterval(function () {
                if (ALG.status) {
                    clearInterval(algTimer);

                    resetForm();
                }
            }, 100);
        });

        $('.alg-index-submit').on('click', function () {
            ALG.action[$(this).text().toLowerCase()](algFullNameInput.val().trim(), $('#alg-desc').val().trim(), ALGTag.getCurrentTags());
        });

        $('.alg-index-delete').on('click', function () {
            ALG.slideIn();

            ALG.action.del($('#alg-fullname').val().trim());
        });

        $('.alg-index-ignore').on('click', function () {
            ALG.slideIn();

            buildIndex();
        });
    }



    /**
     * Shim
     *
     **/

    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        };
    }
})();