/**
 * 
 */
angular.module('ngCommon').directive('ibeZoomer', [ function() {
    
    
    function linkFn(scope, element, attrs, ngModelCtrl) {
        scope.zoomInit = 0;
        scope.zoomMax = 8;
        scope.zoomMin = -8;
        scope.zoomBase = 1.2;
        
        scope.zoomLevel = 0;
        scope.zoomResult = 1;
        
        scope.zoomUpdate = function(t) {
            // edge check
            if (t > 0 && scope.zoomLevel == scope.zoomMax ||
                t < 0 && scope.zoomLevel == scope.zoomMin
                ) {
                return;
            }
            
            // zoom update
            if (t == 0) {
                scope.zoomLevel = scope.zoomInit;
            }
            else {
                scope.zoomLevel = scope.zoomLevel + t;
            }
            scope.zoomResult = Math.pow(scope.zoomBase, scope.zoomLevel);
        }
        
    }

    return {
        restrict: 'E',
        templateUrl:'./directive/ibe-zoomer/ibe-zoomer.html',
        transclude: true,
        replace: true,
        link: linkFn
    };

}]);

