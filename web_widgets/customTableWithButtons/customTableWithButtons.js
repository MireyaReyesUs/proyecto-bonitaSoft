(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customTableWithButtons', function() {
    return {
      controllerAs: 'ctrl',
      controller: function PbTableCtrl($scope) {

  this.isArray = Array.isArray;

  this.isClickable = function () {
    return $scope.properties.isBound('selectedRow');
  };

  this.selectRow = function (row) {
    if (this.isClickable()) {
      $scope.properties.selectedRow = row;
    }
  };

  this.isSelected = function(row) {
    return angular.equals(row, $scope.properties.selectedRow);
  };
  
  this.action = function action(button,row){
      $scope.properties.selectedRow = row;
      
      if(button.action){
          button.action();
      }
  }
  
  
}
,
      template: '\n\n<div class="table-responsive">\n    \n    \n    <table class="table table-striped table-bordered" ng-class="{\'table-hover\': ctrl.isClickable()}">\n        <thead>\n            <tr>\n                <th ng-repeat="header in properties.headers" class=\'text-center\'>\n                    {{ header | uiTranslate }}\n                </th>\n                <th ng-if="properties.buttons != undefined && properties.buttons.length > 0" colspan="properties.buttons.length" class=\'text-center\'>\n                    Acciones\n                </th>\n            </tr>\n        </thead>\n        <tbody ng-if="ctrl.isArray(properties.content) && ctrl.isArray(properties.columnsKey)">\n            <tr ng-repeat="row in properties.content" ng-click="ctrl.selectRow(row)" ng-class="{\'info\': ctrl.isSelected(row)}">\n                <td ng-repeat="column in properties.columnsKey track by $index" class=\'text-center\'>\n                    {{ $eval(column, row) | uiTranslate }}\n                </td>\n                <td ng-repeat="button in properties.buttons">\n                    <button type="button" class="btn btn-{{button.style}}" ng-click="ctrl.action(button,row)">\n                        <i  class="glyphicon glyphicon-{{button.icon}}"></i>\n                    </button>\n                </td>\n            </tr>\n        </tbody>\n        <tbody ng-if="ctrl.isArray(properties.content) && !ctrl.isArray(properties.columnsKey)">\n            <tr ng-repeat="row in properties.content" ng-click="ctrl.selectRow(row)" ng-class="{\'info\': ctrl.isSelected(row)}">\n                <td> {{ row | uiTranslate }} </td>\n            </tr>\n        </tbody>\n        \n        <tbody ng-if="properties.content === undefined || properties.content.length <= 0">\n            <tr ng-class="{\'info\': ctrl.isSelected(row)}">\n                <td colspan="{{properties.columnsKey.length+properties.buttons.length}}" class="text-center"> Sin registros disponibles </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n'
    };
  });
