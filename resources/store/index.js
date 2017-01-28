// import Vue from 'vue';
import Vuex from 'vuex';

// Vue.use(Vuex);


import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';


const state = {
    activeComponent: 'loading',     // Current component
    connected: false,               // Connected to the server
    loading: {
        visible: false,
        text: ''
    },                              // Loading component
    githubUrl: '',                  // My Github repository, get it from server
    server: { },                    // Server information about host, port and RSA key
};


export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    actions,
    mutations,
    getters
});