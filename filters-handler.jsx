import _ from 'lodash';
import React from 'react';
import Filter from './filter.jsx';

FiltersHandler = {
  stack: {},
  loadingComponent: <div>Loading</div>,

  clearStack() {
    this.stack = {};
  },

  createIfNotExists(key, props) {
    if(!this.stack[key]) {
      filter = new Filter(props);
      this.set(key, filter);
    }
  },

  get(key, props) {
    this.createIfNotExists(key, props);
    return this.stack[key];
  },

  set(key, filter) {
    this.stack[key] = filter;
  }
};

export default FiltersHandler;
