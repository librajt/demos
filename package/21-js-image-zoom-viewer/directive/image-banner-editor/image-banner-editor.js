/**
 * 
 */
angular.module('ngCommon').directive('imageBannerEditor', [ function() {
    
    
    function linkFn(scope, element, attrs, ngModelCtrl) {
        
        scope.addNewButton = function() {
            var button = {};
            scope.setCurrentButton(null, button);
            scope.ngModel.buttons.push(button);
        };

        scope.deleteButton = function() {
            var index = scope.ngModel.buttons.indexOf(scope.currentButton);
            scope.setCurrentButton();
            scope.ngModel.buttons.splice(index, 1);
        };

        scope.cancelEditStatus = function() {
            scope.setCurrentButton();
        };

        scope.setCurrentButton = function($event, button) {
            if (scope.currentButton) {
                delete scope.currentButton.isCurrent;
            }

            if (button) {
                scope.currentButton = button;
                button.isCurrent = true;
            }
            else {
                scope.currentButton = null;
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
                    if (scope.currentButton) scope.deleteButton();
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

