(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customInputWithModalView', function() {
    return {
      controllerAs: 'ctrl',
      controller: function PbInputCtrl($scope, $window, $log, widgetNameFactory,localStorageService, modalService,$timeout,$http) {

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


,
      template: '<span ng-if="environment"><identicon name="{{environment.component.id}}" size="30" background-color="[255,255,255, 0]" foreground-color="[51,51,51]"></identicon> {{environment.component.name}}</span>\n<div ng-if="properties.documentRef.fileName != null" ng-class="{\n    \'form-horizontal\': properties.labelPosition === \'left\' && !properties.labelHidden,\n    \'row\': properties.labelPosition === \'top\' && !properties.labelHidden || properties.labelHidden\n    }">\n    <div class="form-group">\n        <label\n            ng-if="!properties.labelHidden"\n            ng-class="{ \'control-label--required\': properties.required }"\n            class="control-label col-xs-{{ !properties.labelHidden && properties.labelPosition === \'left\' ? properties.labelWidth : 12 }}" ng-bind-html="properties.label | uiTranslate">\n        </label>\n        <div class="col-xs-{{ 12 - (!properties.labelHidden && properties.labelPosition === \'left\' ? properties.labelWidth : 0) }}">\n            <div class="input-group">\n                <input\n                    type="{{properties.type}}"\n                    class="form-control"\n                    placeholder="{{ properties.placeholder | uiTranslate }}"\n                    ng-model="properties.value"\n                    ng-model-options="{ allowInvalid: true }"\n                    name="{{ctrl.name}}"\n                    ng-required="properties.required"\n                    ng-minlength="properties.minLength"\n                    ng-maxlength="properties.maxLength"\n                    min="{{properties.min}}"\n                    max="{{properties.max}}"\n                    step="{{properties.step}}"\n                    ng-readonly="properties.readOnly">\n                    <span ng-if="canShow(properties.documentRef.contentMimeType) || canShow(properties.documentRef.contentMimetype)" class="input-group-btn">\n                        <button  type="button" class="btn btn-primary" ng-click="ctrl.action()">\n                            <i  class="glyphicon glyphicon-resize-full"></i>\n                        </button>\n                    </span>\n                    <span class="input-group-btn">\n                        <button type="button" class="btn btn-primary" ng-click="ctrl.download()">\n                            <i  class="glyphicon glyphicon-cloud-download"></i>\n                        </button>\n                    </span>\n                \n            </div>\n            \n            <div ng-messages="$form[ctrl.name].$dirty && $form[ctrl.name].$error " ng-messages-include="forms-generic-errors.html" role="alert"></div>\n        </div>\n    </div>\n</div>\n'
    };
  });
