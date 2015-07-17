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
            },
            {
                val: '3',
                label: '倒计时'
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

        scope.counterAlignList = [
            {
                val: '1',
                label: '居左'
            },
            {
                val: '2',
                label: '居中'
            },
            {
                val: '3',
                label: '居右'
            }
        ];

        scope.counterFontList = [
            {
                val: '1',
                label: '非衬线字体'
            },
            {
                val: '2',
                label: '衬线字体'
            },
            {
                val: '3',
                label: '等宽字体'
            },
            {
                val: '4',
                label: '微软雅黑'
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
                    toggleShift(true);
                    break;
                case 17:
                    toggleControl(true);
                    break;
                case 37:
                case 38:
                case 39:
                case 40:
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
                    toggleShift(false);
                    break;
                case 17:
                    toggleControl(false);
                    break;
                case 37:
                    isControlPressing ? (scope.ngModel.size.width-=keyStep) : (scope.ngModel.position.left-=keyStep);
                    break;
                case 39:
                    isControlPressing ? (scope.ngModel.size.width+=keyStep) : (scope.ngModel.position.left+=keyStep);
                    break;
                case 38:
                    isControlPressing ? (scope.ngModel.size.height-=keyStep) : (scope.ngModel.position.top-=keyStep);
                    break;
                case 40:
                    isControlPressing ? (scope.ngModel.size.height+=keyStep) : (scope.ngModel.position.top+=keyStep);
                    break;
                default:
                    return;
            }

            scope.$apply();
            e.preventDefault();
        }

        function toggleShift(pressing) {
            isShiftPressing = pressing;
            keyStep = isShiftPressing ? 10 : 1;
        }

        function toggleControl(pressing) {
            isControlPressing = pressing;
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

