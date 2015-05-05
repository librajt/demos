/**
 * 
 */
angular.module('ngCommon').directive('ibeSetupPanel', [ function() {
    
    
    function linkFn(scope, element, attrs, ngModelCtrl) {
        scope.ngModel = scope.ngModel || {};
        scope.ngModel.bg = scope.ngModel.bg || {};

        scope.$watch('ngModel', function() {
            ;
        }, true);
    }

    return {
        restrict: 'E',
        templateUrl:'./directive/ibe-setup-panel/ibe-setup-panel.html',
        replace: true,
        scope: {
            ngModel: '='
        },
        link: linkFn
    };

}]);

