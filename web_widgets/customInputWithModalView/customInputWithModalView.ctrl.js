function PbInputCtrl($scope, $window, $log, widgetNameFactory,localStorageService, modalService,$timeout,$http) {

  'use strict';

  this.name = widgetNameFactory.getName('pbInputWithModalView');
  function openModal(modalId) {
    modalService.open(modalId);
  }
  
  function doRequest(method, url,dataToSend) {
    //alert(url);
    var req = {
      method: method,
      url: url,
      data: angular.copy(dataToSend)
    };

    return $http(req)
      .success(function(data, status) {
          
        $scope.properties.documentRef = data[0];
        $scope.properties.value = data[0].fileName;
        
      })
      .error(function(data, status) {
          
      })
      .finally(function() {
        
      });
  }
  
  $scope.busquedaDocumento = function busquedaDocumento(nombreDocumento,casoDocumento,archFile){
    //alert(nombreDocumento);  
    //alert(casoDocumento);
    //alert('busquedaDocumento');
    if(archFile){
        doRequest('GET','../API/bpm/archivedCaseDocument?p=0&c=1&f=caseId='+casoDocumento+'&f=name='+nombreDocumento+'&o=archivedDate DESC',null);    
    }else{
        doRequest('GET','../API/bpm/caseDocument?p=0&c=1&f=caseId='+casoDocumento+'&f=name='+nombreDocumento+'&o=creationDate DESC',null);
    }
    
    
  };
  
  $scope.$watch('properties.nombreDocumento', function(value) {
    if (angular.isDefined(value) && value !== null) {
        if($scope.properties.useArchFile){
            
            $scope.busquedaDocumento(value,$scope.properties.casoDocumento,true);    
        }
        if($scope.properties.useActFile){
            
            $scope.busquedaDocumento(value,$scope.properties.casoDocumento,false);    
        }
        
    }
  });
  
  $scope.$watch('properties.casoDocumento', function(value) {
    
    if (angular.isDefined(value) && value !== null) {
        if($scope.properties.useArchFile){
            try{
                $scope.busquedaDocumento($scope.properties.nombreDocumento,value,true);    
            }catch(e){
                alert(e);
            }
            
        }
        if($scope.properties.useActFile){
            
            $scope.busquedaDocumento($scope.properties.nombreDocumento,value,false);    
        }
    }
  });
  
  $scope.canShow = function canShow(mimeType){
      
      

        
        
        
      //alert(Array.isArray($scope.properties.showMimeTypes));
      var arrayTypes = $scope.properties.showMimeTypes;
      var found = arrayTypes.find(function(element) {
          return element === mimeType;
        });
        
      //alert(found);
      if(found !== undefined){
          return true;
      }else{
          return false;
      }
  };
  
  this.action = function action(){
      //alert($scope.properties.documentRef.contentStorageId);
      if($scope.properties.useArchFile === true){
        $scope.properties.contentStorageId = $scope.properties.documentRef.sourceObjectId;      
      }else{
        $scope.properties.contentStorageId = $scope.properties.documentRef.id;    
      }
      
      $timeout( function(){
        openModal($scope.properties.modalId);      
       }, 1000 );
      
      
  };
  
  this.download = function download(){
      //alert($scope.properties.documentRef.contentStorageId);
      $window.parent.location = $window.location.protocol + "//" + $window.location.host+'/bonita/portal/'+$scope.properties.documentRef.url;
      //$scope.properties.contentStorageId = $scope.properties.documentRef.contentStorageId;
      
      
      
  };
  
  if (!$scope.properties.isBound('value')) {
    $log.error('the pbInput property named "value" need to be bound to a variable');
  }
}


