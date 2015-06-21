/**
 * 
 */
angular.module('ngCommon').directive('ibeSetupPanel', [ function() {
    
    
    function linkFn(scope, element, attrs, ngModelCtrl) {

        scope.boolList = [
            {
                val: '1',
                label: '是'
            },
            {
                val: '',
                label: '否'
            }
        ];

        scope.typeList = [
            {
                val: '1',
                label: '按钮区'
            },
            {
                val: '2',
                label: '视频区'
            }
        ];

        scope.videoTypeList = [
            {
                val: '1',
                label: 'flash'
            },
            {
                val: '2',
                label: 'iframe'
            }
        ];

        $(document).on('keydown', keyDownEvent);
        $(document).on('keyup', keyUpEvent);

        var keyMap = {
            16: 'Shift',
            17: 'Control',
            37: 'Left',
            38: 'Up',
            39: 'Right',
            40: 'Down',
            46: 'Delete',
        };
        var isShiftPressing = false;
        var isControlPressing = false;
        var keyStep = 1;

        function keyDownEvent(e) {
            if (!scope.ngModel || !scope.helper || !scope.helper.visible) {
                return;
            }

            var keyCode = e.keyCode;
            switch (keyCode) {
                case 16:
                    isShiftPressing = true;
                    keyStep = 10;
                    break;
                case 17:
                    isControlPressing = true;
                    break;
                default:
                    return;
            }

            scope.$apply();
            e.preventDefault();
        }

        function keyUpEvent(e) {
            if (!scope.ngModel || !scope.helper || !scope.helper.visible) {
                return;
            }

            var keyCode = e.keyCode;
            switch (keyCode) {
                case 16:
                    isShiftPressing = false;
                    keyStep = 1;
                    break;
                case 17:
                    isControlPressing = false;
                    break;
                case 37:
                    isControlPressing ? scope.ngModel.size.width-=keyStep : scope.ngModel.position.left-=keyStep;
                    break;
                case 39:
                    isControlPressing ? scope.ngModel.size.width+=keyStep : scope.ngModel.position.left+=keyStep;
                    break;
                case 38:
                    isControlPressing ? scope.ngModel.size.height-=keyStep : scope.ngModel.position.top-=keyStep;
                    break;
                case 40:
                    isControlPressing ? scope.ngModel.size.height+=keyStep : scope.ngModel.position.top+=keyStep;
                    break;
                default:
                    return;
            }

            scope.$apply();
            e.preventDefault();
        }

        scope.$watch('ngModel', function() {
            ;
        }, true);
    }

    return {
        restrict: 'E',
        templateUrl:'./directive/ibe-setup-panel/ibe-setup-panel.html',
        replace: true,
        scope: {
            ngModel: '=',
            helper: '='
        },
        link: linkFn
    };

}]);

