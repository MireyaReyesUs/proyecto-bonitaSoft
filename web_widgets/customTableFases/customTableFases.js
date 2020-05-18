(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customTableFases', function() {
    return {
      controllerAs: 'ctrl',
      controller: function PbTableCtrl($scope) {
    
    
    $scope.totalItems = 10;
    
    $scope.currentPage = 1;
    
    $scope.maxSize = 5;

  this.isArray = Array.isArray;

  this.isClickable = function () {
    return $scope.properties.isBound('selectedRow');
  };

  this.selectRow = function (row) {
    if (this.isClickable()) {
      $scope.properties.selectedRow = row;
    }
  };
  
  $scope.showLink = function showLink(column,row){
      var linkColumn = $scope.properties.linkColumn;
      var found = linkColumn.find(function(element) {
          return element === column;
        });
        
      //alert(found);
      if(found !== undefined){
          return true;
      }else{
          return false;
      }
  };
  
  $scope.urlLink = function urlLink(column,row,index){
    return '/bonita/apps/proyectos/proyecto?id='+row[$scope.properties.linkColumnData[index]];  
  };
  
  this.activeFieldPending = function(row,etapa){
      if(row.etapaSolicitud.estado.nombreEstado === etapa){
          
          if(row.etapaSolicitud.estado.nombreEstado === 'CIERRE'){
            if(row.finalizado === true){
                return false;
            }else{
                return true;
            }  
          }else{
            return true;    
          }
          
          
      }else{
          
          return false;
      }
      
  };
  
  
  $scope.getValueByEtapa = function(etapa){
    var cont = 0;
    if(etapa === 'INICIO'){
        cont = 1;
    }
    if(etapa === 'PLANEACION'){
        cont = 2;
    }
    if(etapa === 'OFICINA PROYECTOS'){
        cont = 3;
    }
    if(etapa === 'COMPRAS CLIENTE'){
        cont = 4;
    }
    if(etapa === 'CIERRE'){
        cont = 5;
    }
    return cont;
  };
  
  
  this.activeFieldFinished = function(row,etapa){
      if(row.etapaSolicitud.estado.nombreEstado === etapa){
          if(etapa === 'CIERRE'){
              
            if(row.etapaSolicitud.estado.nombreEstado === 'CIERRE' && row.finalizado === true){
                return false;
            }else{
                return true;
            }  
          }else{
            return false;    
          }
          
      }else{
          
          var etapaActual   = $scope.getValueByEtapa(row.etapaSolicitud.estado.nombreEstado);
          //alert(etapaActual);
          var etapaValidar  = $scope.getValueByEtapa(etapa);
          //alert(etapaValidar);
          if(etapaActual === etapaValidar){
              return false;
          }else{
              
              if(etapaActual < etapaValidar){
                  return true;
              }else{
                return false;    
              }
          }
          
      }
      
  };
  
  this.classByComponent = function(row,etapa){
      try{
          if(row.etapaSolicitud.estado.nombreEstado === etapa){
              //estoy en la misma casilla, debo verificar si esta activo o finalizado
              if(etapa === 'CIERRE'){
                  if(row.finalizado === true && row.rechazado !== true){
                      return 'green';
                  }else if(row.finalizado === true && row.rechazado === true){
                      return 'black';
                  }else{
                      return 'yellow';
                  }
              }else{
                  if(row.finalizado === true){
                      return 'black';
                  }else{
                      return 'yellow';
                  }
              }
          }else{
              var etapaActual   = $scope.getValueByEtapa(row.etapaSolicitud.estado.nombreEstado);
              //alert(etapaActual);
              var etapaValidar  = $scope.getValueByEtapa(etapa);
              
              if(etapaValidar > etapaActual){
                  if(row.finalizado){
                      //en caso de finalizacion en X etapa
                      return '';
                  }else{
                      return 'red';
                  }
                  
              }else{
                  return 'green';
              }
              
          }    
      }catch(e){
          return '';
      }
      
      
  };
  
  this.isFinished = function(row,etapa){
      if(row.etapaSolicitud.estado.nombreEstado === etapa){
          
        if(row.etapaSolicitud.estado.nombreEstado === 'CIERRE' && row.finalizado === true){
            return true;
        }else{
            return false;    
        }    
          
          
          
      }else{
          var etapaActual   = $scope.getValueByEtapa(row.etapaSolicitud.estado.nombreEstado);
          //alert(etapaActual);
          var etapaValidar  = $scope.getValueByEtapa(etapa);
          
          if(etapaValidar > etapaActual){
              return false;
          }else{
              return true;
          }
          //alert(etapaValidar);
          
      }
      
  };

  this.isSelected = function(row) {
    return angular.equals(row, $scope.properties.selectedRow);
  };
}
,
      template: '<div class="table-responsive">\n    <table class="table table-striped table-bordered" ng-class="{\'table-hover\': ctrl.isClickable()}">\n        <thead>\n            <tr>\n                <th ng-repeat="header in properties.headers" class="text-center">\n                    {{ header | uiTranslate }}\n                </th>\n                <th class="text-center">\n                    INICIO\n                </th>\n                <th class="text-center">\n                    PLANEACION\n                </th>\n                <th class="text-center">\n                    OFICINA PROYECTOS\n                </th>\n                <th class="text-center">\n                    COMPRAS CLIENTE\n                </th>\n                <th class="text-center">\n                    CIERRE\n                </th>\n                \n            </tr>\n            \n        </thead>\n        <tbody ng-if="ctrl.isArray(properties.content) && ctrl.isArray(properties.columnsKey)">\n            <tr ng-repeat="row in properties.content" ng-click="ctrl.selectRow(row)" ng-class="{\'info\': ctrl.isSelected(row)}">\n                <td ng-repeat="column in properties.columnsKey track by $index" class="text-center">\n                    <a ng-if="showLink(column,row)" ng-href="{{urlLink(column,row,$index)}}" target="_top">{{ $eval(column, row) | uiTranslate }}</a>\n                    <div ng-if="!showLink(column,row)">{{ $eval(column, row) | uiTranslate }}</div>\n                </td>\n                \n                <!--\n                <td ng-class="{\'yellow\': ctrl.activeFieldPending(row,\'INICIO\'),\'red\' : ctrl.activeFieldFinished(row,\'INICIO\'), \'green\' : ctrl.isFinished(row,\'INICIO\'), \'black\' : false}">\n                    \n                </td>\n                <td ng-class="{\'yellow\': ctrl.activeFieldPending(row,\'PLANEACION\'),\'red\' : ctrl.activeFieldFinished(row,\'PLANECION\'), \'green\' : ctrl.isFinished(row,\'PLANEACION\'), \'black\' : false}">\n                    \n                </td>\n                <td ng-class="{\'yellow\': ctrl.activeFieldPending(row,\'OFICINA PROYECTOS\'),\'red\' : ctrl.activeFieldFinished(row,\'OFICINA PROYECTOS\'), \'green\' : ctrl.isFinished(row,\'OFICINA PROYECTOS\'), \'black\' : false}">\n                    \n                </td>\n                <td ng-class="{\'yellow\': ctrl.activeFieldPending(row,\'COMPRAS CLIENTE\'),\'red\' : ctrl.activeFieldFinished(row,\'COMPRAS CLIENTE\'), \'green\' : ctrl.isFinished(row,\'COMPRAS CLIENTE\'), \'black\' : false}">\n                    \n                </td>\n                <td ng-class="{\'yellow\': ctrl.activeFieldPending(row,\'CIERRE\'),\'red\' : ctrl.activeFieldFinished(row,\'CIERRE\'), \'green\' : ctrl.isFinished(row,\'CIERRE\'), \'black\' : false}">\n                    \n                </td>\n                -->\n                \n                <td class="{{ctrl.classByComponent(row,\'INICIO\')}}">\n                    \n                </td>\n                <td class="{{ctrl.classByComponent(row,\'PLANEACION\')}}">\n                    \n                </td>\n                <td class="{{ctrl.classByComponent(row,\'OFICINA PROYECTOS\')}}">\n                    \n                </td>\n                <td class="{{ctrl.classByComponent(row,\'COMPRAS CLIENTE\')}}">\n                    \n                </td>\n                <td class="{{ctrl.classByComponent(row,\'CIERRE\')}}">\n                    \n                </td>\n                \n            </tr>\n        </tbody>\n        \n        <tbody ng-if="properties.content === undefined || properties.content.length <= 0">\n            <tr ng-class="{\'info\': ctrl.isSelected(row)}">\n                <td colspan="10" class="text-center"> Sin registros disponibles </td>\n            </tr>\n        </tbody>\n        \n        <tbody ng-if="ctrl.isArray(properties.content) && !ctrl.isArray(properties.columnsKey)">\n            <tr ng-repeat="row in properties.content" ng-click="ctrl.selectRow(row)" ng-class="{\'info\': ctrl.isSelected(row)}">\n                <td> {{ row | uiTranslate }} </td>\n                \n            </tr>\n            \n        </tbody>\n        \n        \n    </table>\n    \n    <uib-pagination ng-if="properties.content !== undefined && properties.content.length > 0" total-items="properties.totalItems" ng-model="properties.currentPage" max-size="properties.maxSize" class="pagination-sm" boundary-links="true" items-per-page="properties.itemsPerPage"\n    previous-text = "{{properties.previousText}}"\n    next-text = "{{properties.nextText}}"\n    first-text = "{{properties.firstText}}"\n    last-text = "{{properties.lastText}}"\n    \n    ></uib-pagination>\n</div>\n'
    };
  });
