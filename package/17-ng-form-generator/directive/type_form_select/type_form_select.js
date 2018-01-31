/**
 * @author rentao
 * @date 2014-11-16
 * @description
 * @example
 

 * 
 */
 
angular.module('adsense')
.directive('typeFormSelect', function() {

    function compile(elem, attr, linkFn) {

        function link(scope, elem, attr, ctrl, transcludeFn) {
            // body
            scope.options = scope.argJson.options || [];
            if (typeof scope.options[0] != 'object') {
                angular.forEach(scope.options, function(val, index) {
                    scope.options[index] = {
                        'key': val,
                        'val': val
                    };
                });
            }
        }

        return link;
    }

    return {
        restrict: 'EA',
        templateUrl: './directive/type_form_select/type_form_select.html',
        compile: compile,
        replace: true
    };
})


