import Vue from 'vue';



export default new Vue({
    data: {
        activeComponent: 'loading', // Current component
        githubUrl: '',              // My Github repository, get it from server
        server: { },                // Server information about host, port and RSA key
        connected: false            // Connected to the server
    },

    created () {



    },

    methods: {
        go (component) {
            this.activeComponent = component;
        }
    }
});