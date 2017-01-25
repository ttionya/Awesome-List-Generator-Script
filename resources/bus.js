import Vue from 'vue';
import { checkServer } from './functions';


export default new Vue({
    data: {
        activeComponent: 'loading', // Current component
        githubUrl: '',              // My Github repository, get it from server
        server: { },                // Server information about host, port and RSA key
        connected: false            // Connected to the server
    },

    created () {

        // Try to get server information from LocalStorage
        let serverInfo = localStorage.getItem('server');

        if (serverInfo) {
            try {
                this.server = JSON.parse(serverInfo);
            }
            catch (e) { }

            if (checkServer(this.server.host, this.server.port, this.server.key)) {
                // Connection

                this.activeComponent = 'home';
            }
            else {
                this.activeComponent = 'setting';
            }
        }
        else {

            // New user
            this.activeComponent = 'welcome';
        }

    },

    methods: {
        go (component) {
            this.activeComponent = component;
        }
    }
});