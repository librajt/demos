/**
 * 
 */
angular.module('ngAdsenseCommon', []);
angular.module('ngAdsenseCommon').directive('datetimePicker', [ function() {
    
    // 将js时间戳格式化为指定格式
    // 调用组件中未公开的方法。。
    function stringifyTime(stamp, format) {
        //var language = 'zh-CN';
        var language = 'en';
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
                var date = new Date(+time);
                return stringifyTime(time - date.getTimezoneOffset() * 60 * 1000, format);
            },
            get: function (e, format, $viewEl) {
                var ret = +new Date(e.date.toString()) + e.date.getTimezoneOffset() * 60 * 1000;  // 减去时区差
                return ret;
            }
        },
        'phpTimeStamp': {
            // php时间戳
            set :function (time, format) {
                var date = new Date(+time);
                return stringifyTime(time * 1000 - date.getTimezoneOffset() * 60 * 1000, format);
            },
            get: function (e, format, $viewEl) {
                var ret = +new Date(e.date.toString()) + e.date.getTimezoneOffset() * 60 * 1000;  // 减去时区差
                return ret / 1000;
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
            $viewEl.val(val);
        });
        
        element.datetimepicker({
            format: format,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            //language: 'zh-CN'
        }).on('changeDate', function(e) {
            scope.ngModel = ReturnType[type].get(e, format, $viewEl);
            scope.$apply();
        });
    }

    return {
        restrict: 'E',
        templateUrl:'./datetime_picker.html',
        require: 'ngModel',
        replace: true,
        scope: {
            ngModel: '='
        },
        link: linkFn
    };

}]);

