(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customTextAngular', function() {
    return {
      controllerAs: 'ctrl',
      controller: function PbTextAreaCtrl($scope, $log, widgetNameFactory,textAngularManager) {

    'use strict';
    //debugger;
    this.name = widgetNameFactory.getName('pbTextArea');
    $scope.version=textAngularManager.getVersion();
    $scope.version = textAngularManager.getVersion();
    $scope.versionNumber = $scope.version.substring(1);
    

  if (!$scope.properties.isBound('value')) {
    $log.error('the pbTextArea property named "value" need to be bound to a variable');
  }
}
,
      template: '\n<div ng-class="{\n    \'form-horizontal\': properties.labelPosition === \'left\' && !properties.labelHidden,\n    \'row\': properties.labelPosition === \'top\' && !properties.labelHidden || properties.labelHidden\n    }">\n    <div class="form-group">\n        <label\n            ng-if="!properties.labelHidden"\n            ng-class="{ \'control-label--required\': properties.required }"\n            class="control-label col-xs-{{ !properties.labelHidden && properties.labelPosition === \'left\' ? properties.labelWidth : 12 }}">\n            {{ properties.label | uiTranslate }}\n        </label>\n        <div class="col-xs-{{ 12 - (!properties.labelHidden && properties.labelPosition === \'left\' ? properties.labelWidth : 0) }}">\n            <text-angular\n            ng-model="properties.value" name="{{ctrl.name}}" data-ng-required="properties.required"  ta-disabled=\'properties.readOnly\'></text-angular>            \n            \n        </div>\n    </div>\n</div>\n\n'
    };
  });
