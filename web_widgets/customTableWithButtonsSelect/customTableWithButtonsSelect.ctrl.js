function PbTableCtrl($scope, $parse, $log, widgetNameFactory, $timeout, $window, $element) {

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
