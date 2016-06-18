import _ from 'lodash';
import React from 'react';
import { handleChange } from 'meteor/cinn:react-form-helpers';
import { InfiniteScroll } from 'meteor/cinn:react-infinite-scroll';

Filter = class Filter {
  constructor(props) {
    const { limit, step, initialParams } = props || {};
    this.filter = new ReactiveDict();
    this.limit = limit || 15;
    this.initialLimit = this.limit;
    this.initialParams = initialParams || {};
    this.step = step || this.limit;
    this.clearParams();
    this.loadMore = this.loadMore.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  clearLimit() {
    this.limit = this.initialLimit;
  }

  clearParams() {
    this.params = _.clone(this.initialParams);
  }

  clear() {
    this.clearLimit();
    this.clearParams();
  }

  refresh() {
    this.filter.set({ refresh: !this.filter.get('refresh') });
  }

  hasMore(items) {
    return this.limit <= _.size(items);
  }

  loadMore() {
    this.limit = this.limit + this.step;
    this.refresh();
  }

  getParamChangeHandler(fieldName) {
    return this.handleFilterInputChange.bind(this, fieldName);
  }

  handleFilterInputChange(fieldName, data) {
    handleChange(this.params, fieldName, _.isObject(data) ? data.target.value : data);
    this.clearLimit();
    this.refresh();
  }

  wrapWithInfiniteScroll(items, Wrapper) {
    const ScrollComponent = this.generateInfiniteScrollComponent(items, Wrapper);
    return <ScrollComponent>{items}</ScrollComponent>
  }

  generateInfiniteScrollComponent(items, Wrapper) {
    const hasMore = this.hasMore(items);
    const loader = FiltersHandler.loadingComponent;
    const scrollProps = { loadMore: this.loadMore, loader, hasMore, Wrapper };
    return (props) => <InfiniteScroll {...scrollProps} >{props.children}</InfiniteScroll>
  }

  getData() {
    this.filter.get('refresh');
    return _.pick(this, 'limit', 'params');
  }
}

export default Filter;
