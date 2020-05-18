function PbTableCtrl($scope) {
    
    
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
