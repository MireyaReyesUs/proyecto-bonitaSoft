(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customTableWithButtonsSelect', function() {
    return {
      controllerAs: 'ctrl',
      controller: function PbTableCtrl($scope, $parse, $log, widgetNameFactory, $timeout, $window, $element) {

  this.isArray = Array.isArray;
  var ctrl = this;
  
  function comparator(initialValue, item) {
    return angular.equals(initialValue, ctrl.getValue(item));
  }
  function createGetter(accessor) {
    return accessor && $parse(accessor);
  }
  this.getLabel = createGetter($scope.properties.displayedKey) || function (item) {
    return typeof item === 'string' ? item : JSON.stringify(item);
  };
    this.getValue = createGetter($scope.properties.returnedKey) || function (item) {
    return item;
  };
  
  $scope.$watch('properties.content', function(value) {
    if (angular.isDefined(value) && value !== null) {
      var items = $scope.properties.content;
      if (Array.isArray(items)) {
        for(var i=0;i<$scope.properties.content.length;i++){
            var item = $scope.properties.content[i];
            ctrl.calculo(item);    
        }
        
      }
    }
  });
  
    
  this.calculo = function(row){
        //alert(JSON.stringify(row));
        if(row.probabilidad.nombrePrioridad === 'BAJA'){
            if(row.impacto.nombrePrioridad === 'BAJA'){
                row.calculoPrioridad = "MUY BAJA";
                row.calculoCualitativo = {persistenceId : 1};
                //return "MUY BAJA";
            }
            else if(row.impacto.nombrePrioridad === 'MEDIA'){
                row.calculoPrioridad = "BAJA";
                row.calculoCualitativo = {persistenceId : 2};
                //return "BAJA";
            }else{
                row.calculoPrioridad = "MEDIA";
                row.calculoCualitativo = {persistenceId : 3};
                
            }
        }
        else if(row.probabilidad.nombrePrioridad === 'MEDIA'){
            if(row.impacto.nombrePrioridad === 'BAJA'){
                row.calculoPrioridad = "BAJA";
                row.calculoCualitativo = {persistenceId : 2};
            }
            else if(row.impacto.nombrePrioridad === 'MEDIA'){
                row.calculoPrioridad = "MEDIA";
                row.calculoCualitativo = {persistenceId : 3};
                
            }else{
                row.calculoPrioridad = "ALTA";
                row.calculoCualitativo = {persistenceId : 4};
                
            }
        }
        else{
            if(row.impacto.nombrePrioridad === 'BAJA'){
                row.calculoPrioridad = "MEDIA";
                row.calculoCualitativo = {persistenceId : 3};
                
            }
            else if(row.impacto.nombrePrioridad === 'MEDIA'){
                row.calculoPrioridad = "ALTA";
                row.calculoCualitativo = {persistenceId : 4};
                
            }else{
                row.calculoPrioridad = "MUY ALTA";
                row.calculoCualitativo = {persistenceId : 5};
                
            }
        }
        
  };
  
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
      template: '\n\n<div class="table-responsive">\n    \n    \n    <table class="table table-striped table-bordered" ng-class="{\'table-hover\': ctrl.isClickable()}">\n        <thead>\n            <tr>\n                <th ng-repeat="header in properties.headers" class=\'text-center\'>\n                    {{ header | uiTranslate }}\n                </th>\n                <th>\n                    Impacto\n                </th>\n                <th>\n                    Probabilidad\n                </th>\n                <th>\n                    Calculo Riesgo\n                </th>\n                <th ng-if="properties.buttons != undefined && properties.buttons.length > 0" colspan="{{properties.buttons.length}}" class=\'text-center\'>\n                    Acciones\n                </th>\n            </tr>\n        </thead>\n        <tbody ng-if="ctrl.isArray(properties.content) && ctrl.isArray(properties.columnsKey)">\n            <tr ng-repeat="row in properties.content" ng-click="ctrl.selectRow(row)" ng-class="{\'info\': ctrl.isSelected(row)}">\n                <td ng-repeat="column in properties.columnsKey track by $index" class=\'text-center\'>\n                    <div ng-if="row.modo == 0">{{ $eval(column, row) | uiTranslate }}</div>\n                    <textarea ng-if="row.modo == 1" class="form-control"\n                        ng-model="row[column]"\n                        ng-model-options="{ allowInvalid: true }"\n                    >\n                    </textarea>\n                    \n                </td>\n                <td>\n                    <select ng-if="row.modo == 1"\n                        class="form-control"\n                        name="{{ctrl.name}}"\n                        ng-model="row.impacto"\n                        ng-model-options="{ allowInvalid: true }"\n                        ng-options="ctrl.getValue(option) as (ctrl.getLabel(option) | uiTranslate) for option in properties.availableValuesImp"\n                        ng-required="true"\n                        ng-disabled="row.modo == 0"\n                        ng-change="ctrl.calculo(row)">\n                        <option style="display:none" value="">\n                            {{ properties.placeholder | uiTranslate }}\n                        </option>\n                    </select>\n                    <div ng-if= "row.modo == 0">{{row.impacto.nombrePrioridad}}</div>\n                </td>\n                <td>\n                    <select\n                        ng-if="row.modo == 1"\n                        class="form-control"\n                        name="{{ctrl.name}}"\n                        ng-model="row.probabilidad"\n                        ng-model-options="{ allowInvalid: true }"\n                        ng-options="ctrl.getValue(option) as (ctrl.getLabel(option) | uiTranslate) for option in properties.availableValuesProb"\n                        ng-required="true"\n                        ng-disabled="row.modo == 0"\n                        ng-change="ctrl.calculo(row)">\n                        <option style="display:none" value="">\n                            {{ properties.placeholder | uiTranslate }}\n                        </option>\n                    </select>\n                    <div ng-if= "row.modo == 0">{{row.probabilidad.nombrePrioridad}}</div>\n                </td>\n                <td>\n                   {{row.calculoPrioridad}} \n                </td>\n                <td >\n                    \n                        <button\n                            ng-if="row.modo == button.visibleOnMode"\n                            ng-repeat="button in properties.buttons"\n                            type="button" class="btn btn-{{button.style}}" ng-click="ctrl.action(button,row)"\n                            ng-disabled="row.modo == 1 && row.descripcionRiesgo.trim()==\'\'"\n                            >\n                            <i  class="glyphicon glyphicon-{{button.icon}}"></i>\n                        </button>\n                    \n                    \n                </td>\n            </tr>\n        </tbody>\n        <tbody ng-if="ctrl.isArray(properties.content) && !ctrl.isArray(properties.columnsKey)">\n            <tr ng-repeat="row in properties.content" ng-click="ctrl.selectRow(row)" ng-class="{\'info\': ctrl.isSelected(row)}">\n                <td> {{ row | uiTranslate }} </td>\n            </tr>\n        </tbody>\n        \n        <tbody ng-if="properties.content === undefined || properties.content.length <= 0">\n            <tr ng-class="{\'info\': ctrl.isSelected(row)}">\n                <td colspan="{{properties.columnsKey.length+properties.buttons.length+3}}" class="text-center"> Sin registros disponibles </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n'
    };
  });
