"use strict";


import Vue from 'vue';
import bus from './bus';

import setting from './components/Setting';


new Vue({
  el: '#alg',

  data: {
      username: ''
  },

  created () {
    const algDiv = document.createElement('div');

    algDiv.id = 'alg';

    document.body.appendChild(algDiv);
  }
});