/**
 * @author rentao
 * @date 2014-11-16
 * @description 广告规格的属性列表配置器
 * @example
 

 * 
 */
 
angular.module('adsense')
.directive('typeJsonEditor', function() {

    function compile(elem, attr, linkFn) {

        function link(scope, elem, attr, ctrl, transcludeFn) {
            scope.jsonTypes = {
                simpletext: '单行文本',
                richtext: '多行文本',
                upload: '图片',
                select: '下拉列表'
            };
            
            // iframe形式规格所用的url参数列表
            scope.query_list = {
                forum: {
                    forum_name: '吧名',
                    first_class: '一级目录',
                    second_class: '二级目录',
                    forum_id: '吧id'
                },
                user: {

                },
                //这里命名有点蛋疼啊...
                custom: {
                    forumNameGBK: '吧名GBK',
                    zhixintoken: '教育知心token',
                    zhixin_query: '医疗知心query'
                }
            };

            scope.pattern_list = ['URL', '数字'];
            
            scope.query_list_status = {
                forum: {},
                user: {},
                custom: {}
            };
            scope.query_list_paraname = {
                forum: {},
                user: {},
                custom: {}
            };

            scope.$watch('ngModel', function(newValue, oldValue) {
                if (newValue) {
                    var t = [];
                    try {
                        t = JSON.parse(scope.ngModel);
                    }
                    catch (e){};
                    scope.jsonList = t;
                } else{
                    scope.jsonList = [];
                };
                
            });

            scope.$watch('jsonList',function(newValue, oldValue){
                if (newValue) {
                    scope.ngModel = JSON.stringify(scope.jsonList);
                }
            })


            scope.add = function(type) {
                scope.cfg = {
                    id: '',
                    name: '',
                    type: '',
                    defaultValue: '',
                    tips: [],

                    options: [],

                    hide: 0,

                    validate: {},

                    whitelist: 'png|jpg|jpeg',
                    width: '',
                    height: '',
                    maxfilesize: ''
                };
                scope.validate = {
                    required: 1,
                    doubleLength: '',
                    pattern: ''
                };

                setTipsArray(scope.cfg.tips);
                setOptionsArray(scope.cfg.options);
            }

            scope.edit = function(item) {
                scope.cfg = angular.copy(item);
                scope.cfg.validate = scope.cfg.validate || {};
                scope.cfg.hide = scope.cfg.hide == undefined ? 0 : scope.cfg.hide;
                scope.cfg.tips = scope.cfg.tips == undefined ? [] : scope.cfg.tips;
                scope.cfg.options = scope.cfg.options == undefined ? [] : scope.cfg.options;
                scope.validate = scope.cfg.validate;
                scope.validate.required = scope.validate.required == undefined ? 1 : scope.validate.required;
                scope.validate.pattern = scope.validate.pattern || scope.validate.patten;  // 拼写错误

                setTipsArray(scope.cfg.tips);
                setOptionsArray(scope.cfg.options);

                if (scope.cfg.id == 'url_query') setUrlQuery(scope.cfg.defaultValue);
            }

            function setUrlQuery (urlQuery) {
                var vals = JSON.parse(urlQuery || '{}');
                for (var group in vals) {
                    // in group
                    for (var item in vals[group]) {
                        // item
                        scope.query_list_status[group][item] = true;
                        scope.query_list_paraname[group][item] = vals[group][item];
                    }
                }
            }

            function getUrlQuery () {
                var ret = {}, falg;
                for (var group in scope.query_list_status) {
                    // in group
                    ret[group] = {};
                    flag = false;
                    for (var item in scope.query_list_status[group]) {
                        // item
                        if (scope.query_list_status[group][item]) {
                            ret[group][item] = scope.query_list_paraname[group][item];
                            flag = true;
                        }
                    }
                    if (!flag) {
                        delete ret[group];
                    }
                }
                return JSON.stringify(ret);
            }

            function setTipsArray(tips) {
                var ret = {};
                angular.forEach(tips, function(tip, idx) {
                    ret[idx] = tip;
                });
                scope.tips_list = ret;
            }

            function getTipsArray() {
                var ret = [];
                for (var idx in scope.tips_list) {
                    if (scope.tips_list[idx]) {
                        ret.push(scope.tips_list[idx]);
                    }

                }
                return ret;
            }

            scope.onAddTipsClick = function() {
                scope.tips_list[(+new Date())] = '';
            };

            function setOptionsArray(options) {
                var ret = {};
                scope.options_type = 2;
                angular.forEach(options, function(option, idx) {
                    var obj = {
                        key: option.key, 
                        val: option.val
                    };
                    if (typeof option != 'object') {
                        obj.key = option;
                        obj.val = option;
                        scope.options_type = 1;
                    }
                    ret['' + (+new Date()) + idx] = obj;
                });
                scope.options_list = ret;
            }

            function getOptionsArray() {
                var ret = [];
                for (var idx in scope.options_list) {
                    if (scope.options_type == 1 && scope.options_list[idx].val) {
                        ret.push(scope.options_list[idx].val);
                    }
                    else if (scope.options_list[idx].val && scope.options_list[idx].key) {
                        ret.push(scope.options_list[idx]);
                    }
                }
                return ret;
            }

            scope.onAddOptionsClick = function() {
                scope.options_list[(+new Date())] = {
                    key: '',
                    val: ''
                };
            };

            scope.onSetOptionTypeClick = function(type) {
                scope.options_type = type;
                // 如果设置为数组了，把key设置为val的值，以便精简
                if (type == 1) {
                    angular.forEach(scope.options_list, function(option) {
                        option.key = option.val;
                    });
                }
            };

            scope.del = function(index) {
                if (confirm('Are U Sure ?')) {
                    var t = angular.copy(scope.jsonList);
                    t.splice(index, 1);
                    scope.jsonList = t;
                }
            }
            
            scope.move = function(i, flag) {
                var t = angular.copy(scope.jsonList);
                if (flag < 0) {
                    // head
                    t.splice(i-1, 0, t[i]);  // 将该元素复制到它之前元素前面
                    t.splice(i+1, 1);  // 把原来位置元素删除。数量增加了1
                }
                else {
                    // foot
                    t.splice(i+2, 0, t[i]);  // 将该元素复制到它之后元素后面
                    t.splice(i, 1);  // 把原来位置元素删除
                }
                scope.jsonList = t;
            };

            scope.cancelEdit = function() {
                scope.cfg = null;
                scope.validate = null;
            }

            scope.save = function() {
                var t = angular.copy(scope.jsonList);
                var exist;
                
                scope.cfg.validate = angular.extend(scope.cfg.validate, scope.validate);
                scope.jsonList.forEach(function(item, index) {
                    if (item.id == scope.cfg.id) {
                        exist = index;
                        return true;
                    }
                });

                // get url_query defaultValue
                if (scope.cfg.id == 'url_query') {
                    scope.cfg.defaultValue = getUrlQuery();
                }

                if (scope.cfg.hide == 0) {
                    delete scope.cfg.hide;
                }

                scope.cfg.tips = getTipsArray();
                if (scope.cfg.tips.length == 0) {
                    delete scope.cfg.tips;
                }

                if (scope.cfg.defaultValue == '') {
                    delete scope.cfg.hide;
                }

                scope.cfg.options = getOptionsArray();
                if (scope.cfg.type != 'select') {
                    delete scope.cfg.options;
                }

                if (!scope.cfg.maxfilesize) {
                    delete scope.cfg.maxfilesize;
                }
                
                if (scope.cfg.type != 'upload') {
                    delete scope.cfg.width;
                    delete scope.cfg.height;
                    delete scope.cfg.maxfilesize;
                    delete scope.cfg.whitelist;
                }

                if (scope.cfg.validate.required == 1) {
                    delete scope.cfg.validate.required;
                }

                if (scope.cfg.validate.doubleLength == '') {
                    delete scope.cfg.validate.doubleLength;
                }

                if (scope.cfg.validate.pattern == '') {
                    delete scope.cfg.validate.pattern;
                }

                if (JSON.stringify(scope.cfg.validate) == '{}') {
                    delete scope.cfg.validate;
                }
                
                if (exist != undefined) {
                    t[exist] = angular.copy(scope.cfg);
                }
                else {
                    t.push(angular.copy(scope.cfg));
                }
                
                scope.jsonList = t;
                scope.cancelEdit();
            }


        }

        return link;
    }

    return {
        restrict: 'EA',
        templateUrl: './directive/type_json_editor/type_json_editor.html',
        compile: compile,
        scope: {
            ngModel: '=',
            debugger: '=argDebugger'
        },
        replace: true
    };
})



