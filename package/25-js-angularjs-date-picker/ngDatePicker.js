/**
 *  @file ngDatePicker
 *  @author rentao
 *  @since 2017-03-06 21:05:27
 *  @example
 *
 *      $scope.defaultDate = {
 *          startDate: '2016-2-9',
 *          endDate: '2016-5-21'
 *      };
 *
 *      $scope.onDateChange = function(obj) {
 *          console.log('changed: ', obj);
 *      };
 *
 *      <ng-date-picker on-date-change="onDateChange"></ng-date-picker>
 *      <ng-date-picker on-date-change="onDateChange" default-recent="30"></ng-date-picker>
 *      <ng-date-picker on-date-change="onDateChange" default-date="defaultDate"></ng-date-picker>
 *
 */

var app = angular.module('appDirective', []);

function formatRencentDays(list) {
    var ret = [];
    angular.forEach(list, function(value, index) {
        ret.push({
            key: value,
            value: value
        });
    });
    return ret;
}

app.directive('ngDatePicker', ['$timeout', function($timeout) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: './template.html',
        scope: {
            onDateChange: '=?',
            recentDays: '=?',
            defaultDate: '=?',
            defaultRecent: '@?'
        },
        link: function(scope, element, attrs, ngModel) {

            scope.onDateChange = scope.onDateChange || function(obj) {
                // @if env='offLine'
                console.info(obj);
                // @endif
            };
            scope.recentDays = scope.recentDays || [1,2,3];
            scope.recentDaysData = formatRencentDays(scope.recentDays);

            var $el = $(element);

            // 准备工作，设置唯一id
            var _guid = (+new Date());
            var pickerId = 'ng-date-picker-' + _guid;
            var valueId = 'picker-value-' + _guid;

            $el.attr('id', pickerId);
            $el.find('.picker-value').attr('id', valueId);

            // 初始化控件
            var picker = new pickerDateRange(valueId, {
                target: pickerId,
                defaultText : ' / ',
                success : function(obj) {
                    scope.onDateChange(obj);
                    $timeout(function() {
                        scope.$apply();
                    });
                }
            });

            // 设置初始值
            scope.defaultRecent = scope.defaultRecent || 30;
            var period = picker.getSpecialPeriod(scope.defaultRecent - 1);
            scope.defaultDate = scope.defaultDate || {
                startDate: period.otherday,
                endDate: period.today
            };
            picker.updateSelectedDate(scope.defaultDate.startDate, scope.defaultDate.endDate);

            // 选择最近n天时
            scope.onRecentDaysChange = function(key) {
                console.log(key);
            };


            // destroy
            scope.$on('$destroy', function() {
                picker.destroy();
                $el.remove();
            });
        }
    };
}]);
