"use strict";


import Vue from 'vue';
import Main from './Main';


new Vue({
  el: '#alg',

  created () {

    // Create ALG Div
    const algDiv = document.createElement('div');
    algDiv.id = 'alg';
    document.body.appendChild(algDiv);
  },

  render: h => h(Main)
});