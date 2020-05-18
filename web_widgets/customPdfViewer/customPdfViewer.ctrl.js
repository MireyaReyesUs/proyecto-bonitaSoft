function ($scope, $sce) {
    $scope.pdfUrl = null;
    if (angular.isDefined($scope.properties.contentStorageId))
        $scope.pdfUrl = $sce.trustAsResourceUrl("/"+ $scope.properties.appName +"/portal/formsDocumentImage?document="+ $scope.properties.contentStorageId);

    $scope.$watch(function(){
        return $scope.properties.contentStorageId;
    }, function (newValue, oldValue){
        if (angular.isDefined($scope.properties.contentStorageId))
            $scope.pdfUrl = $sce.trustAsResourceUrl("/"+ $scope.properties.appName +"/portal/formsDocumentImage?document="+ $scope.properties.contentStorageId);
    });
}