function PbTableCtrl($scope) {

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
