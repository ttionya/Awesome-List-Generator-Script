export const checkServer = (host, port, key) => checkServerHost(host) && checkServerPort(port) && checkServerKey(key);

export const checkServerHost = host => /^http(s)?:\/\/(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^http(s)?:\/\/(([a-zA-Z0-9]*|[a-zA-Z0-9]([a-zA-Z0-9\-][a-zA-Z0-9])*[a-zA-Z0-9]?|xn--[A-Za-z0-9]+)\.)*(xn--[A-Za-z0-9]+|[A-Za-z]+)$/.test(host);

export const checkServerPort = port => /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(port);

export const checkServerKey = key => /^[-a-zA-Z0-9+=/]+$/.test(key);



/**
 * Shim
 *
 **/

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}