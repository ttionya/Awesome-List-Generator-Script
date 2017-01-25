import Vue from 'vue';


export default new Vue({
    data: {
        activeComponent: 'loading',
        githubUrl: ''
    },

    methods: {
        go (component) {
            this.activeComponent = component;
        }
    }
});