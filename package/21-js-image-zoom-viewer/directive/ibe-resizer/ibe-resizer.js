/**
 * 
 */
angular.module('ngCommon').directive('ibeResizer', [ function() {
    
    
    function linkFn(scope, element, attrs, ngModelCtrl) {
        if (scope.ngModel && !scope.ngModel.size) {
            scope.ngModel.size = scope.ngModel.size || {
                width: element.width(),
                height: element.height()
            };
        }
        
        element.disableSelection();
        
        scope.$content = element.find('.content');
        scope.$el = $(element.find('.resizer')[0]);
        
        scope.$el.draggable({
            containment: $(scope.containerEl),
            start: dragEvent,
            drag: dragEvent,
            stop: dragEvent,
        });
        
        function dragEvent(event, ui) {
            var resizerFix = $(element.find('.resizer')[0]).width();
            
            var width = ui.position.left + resizerFix;
            var height = ui.position.top + resizerFix;
            
            //var $parent = scope.$el.parent();
            //var $container = $(scope.containerEl);
            //var edge = [
            //    $parent.position().left,
            //    $parent.position().top,
            //    $container.width(),
            //    $container.height()
            //];
            //scope.$el.draggable('option', 'containment', edge);
            
            scope.$content.css({
                width: width,
                height: height
            });
            
            scope.ngModel.size = {
                width: width,
                height: height
            };
            scope.$apply();
        }

        scope.$watch('ngModel', function() {
            scope.$content.css(scope.ngModel.size);
            var fix = scope.$el.width();
            scope.$el.css({
                left: scope.ngModel.size.width - fix,
                top: scope.ngModel.size.height - fix
            });
        }, true);
    }

    return {
        restrict: 'E',
        templateUrl:'./directive/ibe-resizer/ibe-resizer.html',
        replace: true,
        transclude: true,
        scope: {
            ngModel: '=',
            helper: '=',
            containerEl: '='
        },
        link: linkFn
    };

}]);

