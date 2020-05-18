(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customInputGroup', function() {
    return {
      controllerAs: 'ctrl',
      controller: function value($scope) {
    if (!$scope.properties.isBound('value')) {
        $log.error('the pbTextArea property named "value" need to be bound to a variable');
    }
},
      template: '<div class="input-group mb-3">\n    <div class="input-group-prepend">\n        <span class="input-group-text"><b>{{ properties.span }}</b></span>\n    </div>\n    <input \n        ng-model="properties.value"\n        ng-required="properties.required"\n        ng-minlength="properties.minLength"\n        ng-maxlength="properties.maxLength"\n        ng-readonly="properties.readOnly">\n</div>'
    };
  });
