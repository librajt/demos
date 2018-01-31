/**
 * @author rentao
 * @date 2014-11-16
 * @description 添加广告页面的推荐目录选择器
 * @example
 

 * 
 */
 
define([

], function () {
angular.module('adsense').register
.directive('suggestDirSelector', function() {

    function compile(elem, attr, linkFn) {

        function link(scope, elem, attr, ctrl, transcludeFn) {
            
            // 初始化checkbox状态对象
            function buildDirListValue() {
                scope.dirListValue = {};
                angular.forEach(scope.dirList, function(dirs) {
                    scope.dirListValue[dirs.first_dir] = {
                        second_dirs: {},
                        hot_dirs: {}
                    };
                    angular.forEach(dirs.second_dir, function(second_dir){
                        scope.dirListValue[dirs.first_dir]['second_dirs'][second_dir] = {};
                    });
                    angular.forEach(dirs.hot_dir, function(hot_dir){
                        scope.dirListValue[dirs.first_dir]['hot_dirs'][hot_dir] = {};
                    });
                });
            }

            // 一级目录状态更新后，同步更新子目录状态
            function updateDirsAfterFirstDir(first_dir) {
                angular.forEach(scope.dirListValue[first_dir]['second_dirs'], function (s_dir) {
                    s_dir.checked = scope.dirListValue[first_dir].checked;
                });
                angular.forEach(scope.dirListValue[first_dir]['hot_dirs'], function (s_dir) {
                    s_dir.checked = scope.dirListValue[first_dir].checked;
                });
            }

            // 子目录状态更新后，同步更新父目录状态
            function updateDirsAfterSubDir(first_dir, sub_dir, sub_type) {
                if (scope.dirListValue[first_dir][sub_type][sub_dir].checked) {
                    // 若为选中，检查所有子是否都为选中状态？是-选中父：否-啥也不做
                    var checked = true;
                    angular.forEach(scope.dirListValue[first_dir]['second_dirs'], function(s_dir){
                        if (!s_dir.checked) checked = false;
                    });
                    angular.forEach(scope.dirListValue[first_dir]['hot_dirs'], function(s_dir){
                        if (!s_dir.checked) checked = false;
                    });
                    scope.dirListValue[first_dir].checked = checked;
                }
                else {
                    // 若不为选中，取消选中父
                    scope.dirListValue[first_dir].checked = false;
                }
            }

            // 点击事件
            scope.onFirstDirsClick = function($event, first_dir) {
                updateDirsAfterFirstDir(first_dir);
                updateSuggestDirs();
            };

            scope.onSubDirsClick = function($event, first_dir, sub_dir, sub_type) {
                updateDirsAfterSubDir(first_dir, sub_dir, sub_type);
                updateSuggestDirs();
            };
            
            function checkNgModel() {
                (!scope.ngModel) && (scope.ngModel = {});
            }


            // 更新选择值
            function updateSuggestDirs() {
                checkNgModel();
                
                var ret = {
                    first_dirs: [],
                    second_dirs: [],
                    hot_dirs: []
                };
                angular.forEach(scope.dirListValue, function(first_dirs, f_name) {
                    if (first_dirs.checked) ret.first_dirs.push(f_name);
                    else {
                        angular.forEach(first_dirs.second_dirs, function(sub_dir, s_name){
                            if (sub_dir.checked) ret.second_dirs.push(s_name);
                        });
                        angular.forEach(first_dirs.hot_dirs, function(sub_dir, s_name){
                            if (sub_dir.checked) ret.hot_dirs.push(s_name);
                        });
                    }
                });
                ret.first_dirs = ret.first_dirs.join(',');
                ret.second_dirs = ret.second_dirs.join(',');
                ret.hot_dirs = ret.hot_dirs.join(',');
                
                scope.ngModel = ret;
            }

            // 初始化页面时，恢复dir选框状态，同时返回手动输入的部分
            function updateManualDirs() {
                checkNgModel();
                
                var ret = angular.copy((scope.manualDirs && (scope.manualDirs.first_dirs || scope.manualDirs.second_dirs) && scope.manualDirs) || scope.ngModel || {});
                
                if (ret.first_dirs) {
                    var _first_dirs = [];
                    angular.forEach(ret.first_dirs.split(','), function(f_dir) {
                        if (scope.dirListValue[f_dir]) {
                            scope.dirListValue[f_dir].checked = true;
                            updateDirsAfterFirstDir(f_dir);
                        }
                        else {
                            _first_dirs.push(f_dir);
                        }
                    });
                    ret.first_dirs = _first_dirs.join(',');
                }

                if (ret.second_dirs) {
                    var _second_dirs = [];
                    angular.forEach(ret.second_dirs.split(','), function(s_dir) {
                        var _f_name = '';
                        angular.forEach(scope.dirListValue, function(f_dir, f_name) {
                            if (scope.dirListValue[f_name]['second_dirs'][s_dir]) {
                                _f_name = f_name;
                            }
                        });
                        if (_f_name) {
                            scope.dirListValue[_f_name]['second_dirs'][s_dir].checked = true;
                        }
                        else {
                            _second_dirs.push(s_dir);
                        }
                    });
                    ret.second_dirs = _second_dirs.join(',');
                }

                if (ret.hot_dirs) {
                    var _hot_dirs = [];
                    angular.forEach(ret.hot_dirs.split(','), function(s_dir) {
                        var _f_name = '';
                        angular.forEach(scope.dirListValue, function(f_dir, f_name) {
                            if (scope.dirListValue[f_name]['hot_dirs'][s_dir]) {
                                _f_name = f_name;
                            }
                        });
                        if (_f_name) {
                            scope.dirListValue[_f_name]['hot_dirs'][s_dir].checked = true;
                        }
                        else {
                            _hot_dirs.push(s_dir);
                        }
                    });
                    ret.hot_dirs = _hot_dirs.join(',');
                }

                scope.manualDirs = ret;
            }
            
            // 恢复编辑时，ngModel的值要在dirList值恢复之后再恢复
            var setFlag = 1;

            scope.$watch('dirList', function(newValue, oldValue) {
                buildDirListValue();
                updateManualDirs();
                if (newValue && setFlag > 0) {
                    updateSuggestDirs();
                    setFlag--;
                }
            });
            
            scope.$watch('ngModel', function(newValue, oldValue) {
                if (newValue) {
                    updateManualDirs();
                }
            });
        }

        return link;
    }

    return {
        restrict: 'EA',
        templateUrl: __uri('./suggest_dir_selector.html'),
        compile: compile,
        scope: {
            dirList: '=argDirList',
            ngModel: '=',
            manualDirs: '=valueManual'
        },
        replace: true
    };
})

});

