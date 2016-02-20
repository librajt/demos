/**
 * 
 */
angular.module('ngCommon').directive('imageBannerEditor', [ function() {
    
    
    function linkFn(scope, element, attrs, ngModelCtrl) {
        
        scope.addNewArea = function() {
            var area = {};
            scope.setCurrentArea(null, area);
            scope.ngModel.areas.push(area);
        };

        scope.deleteArea = function() {
            var index = scope.ngModel.areas.indexOf(scope.currentArea);
            scope.setCurrentArea();
            scope.ngModel.areas.splice(index, 1);
        };

        scope.cancelEditStatus = function() {
            scope.setCurrentArea();
        };

        scope.setCurrentArea = function($event, area) {
            if (scope.currentArea) {
                delete scope.currentArea.isCurrent;
            }

            if (area) {
                scope.currentArea = area;
                area.isCurrent = true;
            }
            else {
                scope.currentArea = null;
            }

            $event && $event.stopPropagation();
        };

        scope.helper = {};
        scope.helper.visible = true;
        
        $(document).on('keyup', keyUpEvent);

        var keyMap = {
            46: 'Delete',
        };

        function keyUpEvent(e) {
            if (!scope.ngModel || !scope.helper || !scope.helper.visible) {
                return;
            }

            var keyCode = e.keyCode;
            switch (keyCode) {
                case 46:
                    if (scope.currentArea) scope.deleteArea();
                    break;
                default:
                    return;
            }

            scope.$apply();
            e.preventDefault();
        }
    }

    return {
        restrict: 'E',
        templateUrl:'./directive/image-banner-editor/image-banner-editor.html',
        transclude: true,
        replace: true,
        scope: {
            ngModel: '='
        },
        link: linkFn
    };

}]);

