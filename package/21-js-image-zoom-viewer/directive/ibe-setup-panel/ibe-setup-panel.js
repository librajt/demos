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

        $(document).on('keydown', function(e) {
            if (!scope.ngModel || !scope.helper || !scope.helper.visible) {
                return;
            }

            var keyCode = e.keyCode;
            var map = {
                17: 'Control',
                37: 'Left',
                38: 'Up',
                39: 'Right',
                40: 'Down'
            };

            switch (keyCode) {
                case 37:
                    scope.ngModel.position.left--;
                    break;
                case 39:
                    scope.ngModel.position.left++;
                    break;
                case 38:
                    scope.ngModel.position.top--;
                    break;
                case 40:
                    scope.ngModel.position.top++;
                    break;
            }

            scope.$apply();
            e.preventDefault();
        });

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

