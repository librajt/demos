/**
 * @author rentao
 * @date 2014-11-16
 * @description
 * @example
 

 * 
 */
 
angular.module('adsense')
.directive('typeFormUpload', function() {

    function compile(elem, attr, linkFn) {

        function link(scope, elem, attr, ctrl, transcludeFn) {
            scope.getFormats = function() {
                return scope.formats || [];
            };
            
            scope.callEmergency = function() {
                scope.inEmergency = true;
            };
            
            scope.help = function() {
                alert('\
使用方法：\n\
    1. 登录线上贴吧，在发贴框上传图片 \n\
    2. 右键点击图片，快捷菜单中选择“复制图片网址”，或发贴后复制图片地址 \n\
    3. 来这里粘贴\n\
                ');
            };

        }

        return link;
    }

    return {
        restrict: 'EA',
        templateUrl: './directive/type_form_upload/type_form_upload.html',
        compile: compile,
        replace: true
    };
})


