function value($scope) {
    if (!$scope.properties.isBound('value')) {
        $log.error('the pbTextArea property named "value" need to be bound to a variable');
    }
}