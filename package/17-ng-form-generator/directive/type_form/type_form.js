/**
 * @author rentao
 * @date 2014-11-16
 * @description 素材动态表单生成成器
 * @example
 

 * 
 */
 
angular.module('adsense', []);
angular.module('adsense')
.directive('typeForm', function() {

    function compile(elem, attr, linkFn) {

        function link(scope, elem, attr, ctrl, transcludeFn) {

            scope.label = scope.argJson.name;

            // ng-show
            var ngShow = !scope.argJson.hide;
            scope.ngShow = ngShow;
            
            // ng-required
            var validate = scope.argJson.validate || {};
            
            // 抹平变量..由拼写问题引起
            validate.required = validate.require || validate.required;
            validate.pattern = validate.patten || validate.pattern;
            if (validate.required == undefined) {
                validate.required = 1;
            }

            var ngRequiredFn;
            
            // 准备验证相关
            if (validate.required == 1) {
                ngRequiredFn = function() {
                    return true;
                }
            }
            else if (angular.isArray(validate.required)) {
                // 关联必填
                ngRequiredFn = function() {
                    return validate.required.every(function(id, index) {
                        var ret;
                        try {
                            ret = !scope.$parent.$parent.k[id];  // TODO 使用了非正常的变量k来通过父级查找关联验证元素
                        }
                        catch (e) {}
                        return ret;
                    });
                }
            }
            else {
                ngRequiredFn = function() {
                    return false;
                }
            }
            scope.ngRequiredFn = ngRequiredFn;
            
            // 恢复值、使用默认值
            if (!scope.ngModel && scope.argJson.defaultValue) {
                scope.ngModel = scope.argJson.defaultValue;
            }

            scope.maxKbbytes = scope.argJson.maxfilesize;
            scope.widthLimit = scope.argJson.width;
            scope.heightLimit = scope.argJson.height;
            scope.formats = scope.argJson.whitelist && scope.argJson.whitelist.split('|') || [];
            
            scope.maxlengthCn = scope.argJson.validate && scope.argJson.validate.doubleLength || 99;

            
        }

        return link;
    }

    return {
        restrict: 'EA',
        templateUrl: './directive/type_form/type_form.html',
        compile: compile,
        scope: {
            debugger: '=argDebugger',
            argJson: '=',
            ngModel: '='
        },
        replace: true
    };
})


