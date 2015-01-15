/**
 * 
 */
angular.module('ngAdsenseCommon', []);
angular.module('ngAdsenseCommon').directive('datetimePicker', [ function() {
    
    // 将js时间戳格式化为指定格式
    // 调用组件中未公开的方法。。
    function stringifyTime(stamp, format) {
        var language = 'zh-CN';
        var type = 'standard';
        var helper = $.fn.datetimepicker.DPGlobal;
        return helper.formatDate(new Date(stamp), helper.parseFormat(format, type), language, type);
    }
    
    // 输出值为以下各类型
    // 各类型值恢复编辑时，需要转换格式的函数
    var ReturnType = {
        'jsTimeStamp': {
            // js时间戳
            set: function (time, format) {
                return stringifyTime(new Date(+time), format);
            },
            get: function (e, format, $viewEl) {
                return (+e.date);
            }
        },
        'phpTimeStamp': {
            // php时间戳
            set :function (time, format) {
                return stringifyTime(new Date((+time) * 1000), format);
            },
            get: function (e, format, $viewEl) {
                return ((+e.date) / 1000).toFixed();
            }
        },
        'formated': {
            // 格式化过的
            set: function (time, format) {
                return time;
            },
            get: function (e, format, $viewEl) {
                return $viewEl.val();
            }
        }
    };
    
    function linkFn(scope, element, attrs, ngModelCtrl) {
        var type = attrs.returnType || 'formated';
        var format = attrs.dateFormat || '';
        
        var $viewEl = element.find('.date_view');
        
        scope.$watch(function() {
            return scope.ngModel;
        }, function (newValue, oldValue) {
            var val = '';
            if (newValue) {
                val = newValue;
                if (type) {
                    val = ReturnType[type].set(val, format);
                }
            }
            element.find('.date_view').val(val);
        });
        
        element.datetimepicker({
            format: format,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            language: 'zh-CN'
        }).on('changeDate', function(e) {
            scope.ngModel = ReturnType[type].get(e, format, $viewEl);
            scope.$apply();
        });
    }

    return {
        restrict: 'E',
        templateUrl:'./datetime_picker.html',
        require: 'ngModel',
        scope: {
            ngModel: '='
        },
        link: linkFn
    };

}]);

