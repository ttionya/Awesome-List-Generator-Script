export const checkServer = (host, port, key) => checkServerHost(host) && checkServerPort(port) && checkServerKey(key);

export const checkServerHost = host => /^http(s)?:\/\/(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^http(s)?:\/\/(([a-zA-Z0-9]*|[a-zA-Z0-9]([a-zA-Z0-9\-][a-zA-Z0-9])*[a-zA-Z0-9]?|xn--[A-Za-z0-9]+)\.)*(xn--[A-Za-z0-9]+|[A-Za-z]+)$/.test((host && host.trim()) || '');

export const checkServerPort = port => /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test((port && port.trim()) || '');

export const checkServerKey = key => typeof key !== 'undefined' && key.length > 0;

export const addServerHostProtocol = host => {

    // Empty
    if (host.trim() === '') {
        return '';
    }

    return /^http(s)?:\/\//.test(host) ?
        host :
        'http://' + host;
};

export const sendConfirmData = url => {
    GM_XHR({
        url: url,

        // https://github.com/travist/jsencrypt
        data: 'action=confirm&hash=1',
        onerror: function () {
            return 'Connection failed';
        },
        onload: function (result) {
            switch (result.status) {
                case 401:
                    return 'Wrong RSA key';

                    break;

                case 200:
                    if (result.response === 'Validation was successful.') {

                        // success
                        // ALG.ls.set('alg-host', ALG.cache.host);
                        // ALG.ls.set('alg-port', ALG.cache.port);
                        // ALG.ls.set('alg-pwd', ALG.cache.pwd);
                        //
                        // // remove event listener
                        // algHost.off('change');
                        // algPort.off('change');
                        // algResetBtn.off('click');
                        // algConformBtn.off('click');
                        //
                        // // slide in
                        // ALG.slideIn();
                        //
                        // buildIndex();
                    }
                    else {
                        return 'Wrong host';
                    }

                    break;

                default:
                    return 'Wrong host';
            }
        }
    });
};


function GM_XHR(options) {
    options.method = options.method || 'POST';

    GM_xmlhttpRequest(options);
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