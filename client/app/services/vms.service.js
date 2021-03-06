/* eslint camelcase: "off" */

/** @ngInject */
export function VmsService(CollectionsApi) {
  const collection = 'vms';
  const sort = {
    isAscending: true,
    currentField: {id: 'name', title: __('Name'), sortType: 'alpha'},
  };
  let filters = [];

  return {
    getVm: getVm,
    getSort: getSort,
    setSort: setSort,
    getFilters: getFilters,
    setFilters: setFilters,
    getSnapshots: getSnapshots,
    createSnapshots: createSnapshots,
    deleteSnapshots: deleteSnapshots,
  };

  function getSnapshots(vmId) {
    const options = {
      attributes: [],
      expand: ['resources'],
      filter: getQueryFilters(getFilters()),
    };

    options.sort_by = getSort().currentField.id;
    options.sort_options = getSort().currentField.sortType === 'alpha' ? 'ignore_case' : '';
    options.sort_order = getSort().isAscending ? 'asc' : 'desc';

    return CollectionsApi.query(collection + '/' + vmId + '/snapshots', options);
  }

  function getVm(vmId) {
    const options = {
      attributes: ['service'],
      expand: [],
    };

    return CollectionsApi.query(collection + '/' + vmId, options);
  }

  function setSort(currentField, isAscending) {
    sort.isAscending = isAscending;
    sort.currentField = currentField;
  }

  function getSort() {
    return sort;
  }

  function setFilters(filterArray) {
    filters = filterArray;
  }

  function getFilters() {
    return filters;
  }

  function deleteSnapshots(vmId, data) {
    const options = {
      "action": "delete",
      "resources": data,
    };

    return CollectionsApi.post(collection + '/' + vmId + '/snapshots/', null, {}, options);
  }

  function createSnapshots(vmId, data) {
    const options = {
      "action": "create",
      "resources": [data],
    };

    return CollectionsApi.post(collection + '/' + vmId + '/snapshots/', null, {}, options);
  }

  // Private
  function getQueryFilters(filters) {
    const queryFilters = [];

    filters.forEach((nextFilter) => {
      if (nextFilter.id === 'name' || nextFilter.id === 'description') {
        queryFilters.push(nextFilter.id + "='%" + nextFilter.value + "%'");
      } else {
        queryFilters.push(nextFilter.id + '=' + nextFilter.value);
      }
    });

    return queryFilters;
  }
}
