/**
 * @author rentao
 * @date 2014-11-16
 * @description
 * @example
 

 * 
 */
 
angular.module('adsense')
.directive('typeFormRichtext', function() {

    function compile(elem, attr, linkFn) {

        function link(scope, elem, attr, ctrl, transcludeFn) {
            // body
        }

        return link;
    }

    return {
        restrict: 'EA',
        templateUrl: './directive/type_form_richtext/type_form_richtext.html',
        compile: compile,
        replace: true
    };
})


