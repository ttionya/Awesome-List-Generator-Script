<template>
    <div class="alg-setting">
        <table class="alg-table">
            <tbody>
            <tr>
                <td><label for="alg-host">Host:</label></td>
                <td>
                    <input id="alg-host"
                           class="form-control alg-input"
                           type="text"
                           placeholder="Host"
                           v-model="host"
                           @change="hostChanged"
                           @focus="errorMsg = '　'"
                    />
                </td>
            </tr>
            <tr>
                <td><label for="alg-port">Port:</label></td>
                <td>
                    <input id="alg-port"
                           class="form-control alg-input"
                           type="text"
                           placeholder="Port"
                           v-model="port"
                           @change="portChanged"
                           @focus="errorMsg = '　'"
                    />
                </td>
            </tr>
            <tr>
                <td><label for="alg-key">RSA Key:</label></td>
                <td>
                    <textarea id="alg-key"
                              class="form-control alg-input alg-textarea alg-scroll"
                              rows="3"
                              placeholder="RSA Key"
                              v-model="key"
                              @focus="errorMsg = '　'"
                    ></textarea>
                </td>
            </tr>
            <tr>
                <td class="alg-align-center" colspan="2">
                    <span>{{ errorMsg }}</span>
                </td>
            </tr>
            <tr>
                <td class="alg-align-center" colspan="2">
                    <button class="btn btn-sm alg-btn" type="button" @click.prevent="confirm">Test & Confirm</button>
                    <button class="btn btn-sm alg-btn" type="button" @click.prevent="reset">Reset</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss">
    .alg-table {
        width: 100%;
        margin-top: 10px;

    }

    .alg-table td:first-child {
        width: 100px;
        padding-right: 10px;
        text-align: right;
    }

    .alg-table td.alg-align-center {
        text-align: center;

        span {
            line-height: 30px;
            color: red;
        }
    }


</style>

<script>
    import * as functions from '../functions';

    export default {
        data () {
            return {
                host: this.$store.state.server.host,
                port: this.$store.state.server.port,
                key: this.$store.state.server.key,
                errorMsg: '　'
            }
        },

        methods: {
            confirm () {

                // Reset
                this.errorMsg = '　';

                if (!functions.checkServerHost(this.host)) {
                    this.errorMsg = 'Invalid host value';
                    return;
                }
                if (!functions.checkServerPort(this.port)) {
                    this.errorMsg = 'Invalid port value';
                    return;
                }
                if (!functions.checkServerKey(this.key)) {
                    this.errorMsg = 'Invalid key value';
                    return;
                }

                // Visible loading
                this.$store.commit('loadingStatus', {
                    visible: true,
                    text: 'Confirming...'
                });

                // Send Ajax
                this.errorMsg = functions.sendConfirmData(this.host + ':' + this.port);
this.errorMsg = '　';
                // Hidden loading
                this.$store.commit('loadingStatus', {
                    visible: false,
                    text: ''
                });

                if (this.errorMsg === '　') {
                    this.$store.commit('changeComponent', 'home');
                }
            },

            reset () {
                const server = this.$store.state.server;

                this.host = server.host;
                this.port = server.port;
                this.key = server.key;
                this.errorMsg = '　';
            },

            hostChanged () {
                let host = this.host.toLowerCase();

                this.host = functions.addServerHostProtocol(this.host);
            },

            portChanged () {
                if (!functions.checkServerPort(this.port)) {
                    this.port = this.$store.state.server.port;
                }
            }
        }
    }
</script>
