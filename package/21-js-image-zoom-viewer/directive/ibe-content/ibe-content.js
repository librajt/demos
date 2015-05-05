/**
 * 
 */
angular.module('ngCommon').directive('ibeContent', [ function() {
    
    
    function linkFn(scope, element, attrs, ngModelCtrl) {
        scope.ngModel = scope.ngModel || {};

        scope.$watch(scope.ngModel, function() {
            // scope.$content.css(scope.ngModel.size);
        }, true);
    }

    return {
        restrict: 'E',
        templateUrl:'./directive/ibe-content/ibe-content.html',
        replace: true,
        scope: {
            ngModel: '='
        },
        link: linkFn
    };

}]);

