/**
 * 
 */
angular.module('ngCommon').directive('ibeArea', [ function() {
    
    
    function linkFn(scope, element, attrs, ngModelCtrl) {

        scope.$watch('ngModel', function() {
            ;
        }, true);

        if (!scope.ngModel.id) {
            scope.ngModel.id = (+new Date());
        }

        scope.counterAlignMap = {
            1: 'left',
            2: 'center',
            3: 'right'
        };
        scope.counterFontMap = {
            1: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            2: 'Georgia, "Times New Roman", Times, serif',
            3: 'Menlo, Monaco, Consolas, "Courier New", monospace',
            4: '"microsoft yahei" simhei sans-serif'
        };

    }

    return {
        restrict: 'E',
        templateUrl:'./directive/ibe-area/ibe-area.html',
        replace: true,
        scope: {
            ngModel: '=',
            helper: '='
        },
        link: linkFn
    };

}]);

