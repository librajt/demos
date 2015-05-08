/**
 * 
 */
angular.module('ngCommon').directive('ibeDraggable', [ function() {
    
    
    function linkFn(scope, element, attrs, ngModelCtrl) {
        if (scope.ngModel && !scope.ngModel.position) {
            scope.ngModel.position = scope.ngModel.position || {
                left: element.position().left,
                top: element.position().top
            };
        }
        
        element.disableSelection();
        
        element.draggable({
            scroll: true,
            containment: $(scope.containerEl),
            cancel: '.resizer',
            start: dragEvent,
            drag: dragEvent,
            stop: dragEvent,
        });
        
        function dragEvent(event, ui) {
            scope.ngModel.position = angular.copy(ui.position);
            scope.$apply();
        }

        scope.$watch('ngModel', function() {
            element.css(scope.ngModel.position);
            element.draggable('option', 'disabled', !scope.ngModel.isCurrent);
        }, true);
    }

    return {
        restrict: 'E',
        templateUrl:'./directive/ibe-draggable/ibe-draggable.html',
        transclude: true,
        scope: {
            ngModel: '=',
            helper: '=',
            containerEl: '='
        },
        replace: true,
        link: linkFn
    };

}]);

