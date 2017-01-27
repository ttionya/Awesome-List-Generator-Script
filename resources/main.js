import Vue from 'vue';
import Main from './Main';
import store from './store/index';


new Vue({
    el: '#alg',

    store,

    created () {

        // Create ALG Div
        const algDiv = document.createElement('div');
        algDiv.id = 'alg';
        document.body.appendChild(algDiv);

        // Get Server Information from LocalStorage
        this.$store.commit('getServerInfo');
    },

    render: h => h(Main)
});