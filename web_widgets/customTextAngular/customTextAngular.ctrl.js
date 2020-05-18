function PbTextAreaCtrl($scope, $log, widgetNameFactory,textAngularManager) {

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
