/** @ngInject */
export function ErrorState(routerHelper) {
  var otherwise = '/error';
  routerHelper.configureStates(getStates(), otherwise);
}

function getStates() {
  return {
    'error': {
      parent: 'blank',
      url: '/error',
      templateUrl: 'app/states/error/error.html',
      controller: StateController,
      controllerAs: 'vm',
      title: N_('Error'),
      data: {
        layout: 'blank',
      },
      params: {
        error: null,
      },
    },
  };
}

/** @ngInject */
function StateController($stateParams) {
  var vm = this;

  vm.error = $stateParams.error;
}
