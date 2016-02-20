/**
 * @author rentao
 * @date 2014-11-16
 * @description
 * @example
 

 * 
 */
 
angular.module('adsense')
.directive('typeFormSimpletext', function() {

    function compile(elem, attr, linkFn) {

        function link(scope, elem, attr, ctrl, transcludeFn) {
            // url，number等type验证，本可用input[type]设置
            // 但在link阶段，模板已被编译，通过双向绑定设置也无效
            // 若在complie阶段对模板进行处理，收益低
            scope.pattern = scope.argJson.validate && scope.argJson.validate.pattern;
            switch(scope.pattern) {
                case '数字': scope.ngPattern = /^[1-9]\d*$/; break;
                case 'URL': scope.ngPattern = /^https?:\/\/.+/; break;
                default: scope.ngPattern = /.*/;
            }
        }

        return link;
    }

    return {
        restrict: 'EA',
        templateUrl: './directive/type_form_simpletext/type_form_simpletext.html',
        compile: compile,
        replace: true
    };
})


