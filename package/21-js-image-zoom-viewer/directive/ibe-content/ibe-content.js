/**
 * 
 */
angular.module('ngCommon').directive('ibeContent', [ function() {
    
    
    function linkFn(scope, element, attrs, ngModelCtrl) {

        scope.$watch('ngModel', function() {
            ;
        }, true);

        if (!scope.ngModel.id) {
            scope.ngModel.id = (+new Date());
        }

    }

    return {
        restrict: 'E',
        templateUrl:'./directive/ibe-content/ibe-content.html',
        replace: true,
        scope: {
            ngModel: '=',
            helper: '='
        },
        link: linkFn
    };

}]);

