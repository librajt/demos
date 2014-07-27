define([
    __uri('../../resource/ad.js')
], function () {
    angular.module('adsense').register.controller('AdEditController', [
        '$scope',
        '$rootScope',
        '$location',
        '$route',
        '$routeParams',
        '$http',
        'Ad',
        function ($scope, $rootScope, $location, $route, $routeParams, $http, Ad) {

            //本项目页面的主题demo地址 http://demo.okendoken.com/2.1/white/component_list_groups.html
            
            $scope.setStrategy = function() {
                if ($scope.ad.url_type == 3) {
                    $scope.ad.click = '';
                    $scope.ad.download = 100000;
                }
                else {
                    $scope.ad.click = 100000;
                    $scope.ad.download = '';
                }
            }
            
            $scope.first_names = [];
            // 一级方向
            $http.get('/adsense/direction/getfirst').success(function(ret){
                $scope.first_names = ret.data;
            });
            
            $scope.second_names = [];
            // 二级方向
            $scope.updateSecondNames = function(cb) {
                $http.get('/adsense/direction/getsecond', {params:{first_name: $scope.ad.first_name}}).success(function(ret){
                    $scope.second_names = ret.data;
                    cb && cb();
                });
            }
            
            $scope.name_dirs = [];
            // 一二级方向选定目录
            $scope.updateDirsByNames = function(cb) {
                $http.get('/adsense/direction/list', {
                    params:{first_name: $scope.ad.first_name, second_name: $scope.ad.second_name}
                }).success(function(ret) {
                    $scope.name_dirs = ret.data;
                    cb && cb();
                });
            }
            
            $scope.category_tpl_url = __uri('./template/matched_categories.html');
            
            
            /**
             *  选择目录时，更新一级目录状态
             *  双向绑定的方式实现太坑了，改用dom操作的形式。。
             */
            $scope.onFirstDirsClick = function(e) {
                var $me = $(e.currentTarget);  // label
                var $dirs = $me.closest('.dirs');
                var name = $dirs.data('name');
                var $first_name = $dirs.find('.first_dirs input');
                
                var status = $first_name.is(':checked');
                $dirs.find('.second_dirs input,.hot_dirs input').each(function(index, el) {
                    $(el).prop('checked', status);
                });
            }
            $scope.onSubDirsClick = function(e) {
                var $me = $(e.currentTarget);  // label
                var $dirs = $me.closest('.dirs');
                var name = $dirs.data('name');
                var $first_name = $dirs.find('.first_dirs input');
                
                if (!$me.find('input').is(':checked')) {
                    $first_name.prop('checked', false);
                }
                else {
                    var whole = true;
                    $dirs.find('.second_dirs input,.hot_dirs input').each(function(index, el) {
                        if (!$(el).is(':checked')) whole = false;
                    });
                    $first_name.prop('checked', whole);
                }
                
                
            }
            
            /**
             *  删除某方向下的dir
             */
            $scope.deleteNameDirs = function(e) {
                return;  // 关闭删除功能
                if (!confirm('删除？')) return;

                var $dirs = $(e.currentTarget).next();
                var name = $dirs.data('name');
                $http.post('/adsense/direction/delfirst', {
                    first_name: $scope.ad.first_name,
                    second_name: $scope.ad.second_name,
                    first_dir: name
                }).success(function(ret) {
                    if (ret.errno !== 0) {
                        alert(ret.errmsg);
                    }
                    else {
                        $dirs.parent().remove();
                    }
                });
            }
            

            /**
             * 打开添加更多一级目录窗口
             */
            $scope.addFirstDir = function () {
                $scope.showAddWindow = true;
            }
            
            $scope.showVal=function(v){
                $scope.add_first_dir=v;
            }

            /**
             * 确认添加更多一级目录
             */
            $scope.submitFirstDir = function () {
                $http.post('/adsense/direction/addfirst', {
                    first_name: $scope.ad.first_name,
                    second_name: $scope.ad.second_name,
                    first_dir: $scope.add_first_dir
                }).success(function(ret) {
                    if (ret.errno !== 0) {
                        alert(ret.errmsg);
                    }
                    else {
                        $scope.name_dirs.push(ret.data);
                        $scope.cancleFirstDirModal();
                    }
                });
            };

            /**
             * 关闭添加窗口
             */
            $scope.cancleFirstDirModal = function () {
                $scope.showAddWindow = false;
            };

            /**
             * 提交前处理： goods_info
             */
            function getGoodsInfo() {
                var ext = typeEditor._getExtProperty();
                $scope.ad.goods_info = JSON.stringify(ext);
            };

            /**
             * helper:  将目录筛选出来
             */
            function filterDir() {
                var ret = {
                    first: [],
                    second: [],
                    hot: []
                };
                var first, second, hot;
                var doms = $('.dirs');
                doms.each(function(index, dirs) {
                    first = $(dirs).find('.first_dirs input');
                    if (first.is(':checked')) {
                        ret.first.push(first[0].value);
                    }
                    else {
                        second = $(dirs).find('.second_dirs input');
                        second.each(function(index, el) {
                            if ($(el).is(':checked')) ret.second.push(el.value);
                        });
                        
                        hot = $(dirs).find('.hot_dirs input');
                        hot.each(function(index, el) {
                            if ($(el).is(':checked')) ret.hot.push(el.value);
                        });
                    }
                });
                return ret;
            };

            /**
             * helper: combine dirs
             */
            function combineDirs(generated, inputed) {
                var ret = [];
                if (generated.length > 0) ret.push(generated.join(','));
                if (inputed) ret.push(inputed);
                return ret.join(',');
            };

            /**
             * 提交前处理： get dirs
             */
            function getDirs() {
                var matched = filterDir();
                $scope.ad.first_dirs = combineDirs(matched.first, $scope.first_dirs);
                $scope.ad.second_dirs = combineDirs(matched.second, $scope.second_dirs);
                $scope.ad.hot_dirs = combineDirs(matched.hot, $scope.hot_dirs);
            };
            

            /**
             * helper:  恢复checkbox的状态
             */
            function updateDirsStatus() {
                restoreDirs('first_dirs');
                restoreDirs('second_dirs');
                restoreDirs('hot_dirs');
            };
            
            function restoreDirs(dirname) {
                $scope[dirname] = $scope.ad[dirname];
                $scope.ad[dirname] = '';
                
                if (!$scope[dirname]) return;
                    
                var arr = $scope[dirname].split(','), retArr = [];
                var $dirs = $('.name_dirs .dirs .' + dirname);
                var dir;
                
                arr.forEach(function(val, index) {
                    dir = $dirs.find('input[value="' + val + '"]');
                    if (dir[0]) {
                        dir.trigger('click');
                    }
                    else {
                        retArr.push(arr[index]);
                    }
                });
                
                $scope.$apply(function() {
                    $scope[dirname] = retArr.join(',');
                });
            }


            /**
             * helper:  从文件获取目录
             * 有插件用，但插件不好用，臃肿，不如简单写一个。TODO 抽象出来
             */
            function initGetListFromeFile(i) {
                var map = {
                    '1': 'first_dirs',
                    '2': 'second_dirs',
                    '3': 'forum_names',
                    '4': 'black_names'
                };
                
                
                var $me = $('#listUploader' + i);
                var $upload = $me.find('input');
                
                function uploadFile(file, formData, callback) {
                    var xhr = new XMLHttpRequest();
                    xhr.withCredentials = true;
                    xhr.open('post', '/adsense/advert/upload', true);
                    
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                callback(xhr.responseText);
                            }
                            else {
                                alert('图片上传接口故障，请重试下');
                                $upload.val('');
                            }
                        }
                    }
                    xhr.send(formData);
                }
                
                
                $upload.on('change', function(e) {
                    var files = $upload.get(0).files;
                    if (files.length === 0) {
                        return ;
                    }
                    
                    var formData = new FormData();
                    formData.append('content', files[0]);
                    
                    uploadFile(files[0], formData, function (uploadRst) {
                        uploadRst = JSON.parse(uploadRst);
                        if (uploadRst.errno === 0) {
                            var res = uploadRst.data;
                            $scope.$apply(function() {
                                $scope[map[i]] = combineDirs(res, $scope[map[i]]);
                                $upload.val('');
                            });
                        }
                        else {
                            alert(uploadRst.errmsg);
                        }
                    });
                });
            }
            
            (function() {
                for(var i = 1; i <= 4; i++) {
                    initGetListFromeFile(i);
                }
            })();
            


            /**
             * helper:  格式化控件生成的时间为时间戳
             */
            function formatPickerTime(s) {
                // s为yyyy/mm/dd hh:ii格式时间
                return +new Date(s.replace(/-/g,'/'));
            };
            
            function stringifyTime(t, fmt) {
                //author: meizz
                var t = new Date(t);
                var o = {   
                    "M+" : t.getMonth()+1,                 //月份   
                    "d+" : t.getDate(),                    //日   
                    "h+" : t.getHours(),                   //小时   
                    "m+" : t.getMinutes(),                 //分   
                    "s+" : t.getSeconds(),                 //秒   
                    "q+" : Math.floor((t.getMonth()+3)/3), //季度   
                    "S"  : t.getMilliseconds()             //毫秒   
                };   
                if(/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (t.getFullYear()+"").substr(4 - RegExp.$1.length));
                }
                for(var k in o) {
                    if(new RegExp("("+ k +")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
                    }
                }
                return fmt;
            }

            /**
             * 提交前处理： start_time, end_time
             */
            function getStartEndTime() {
                $scope.ad.start_time = formatPickerTime($('#adStartTime').val()) / 1000;  // php时间戳
                $scope.ad.end_time = formatPickerTime($('#adEndTime').val()) / 1000;  // php时间戳
                if ($scope.ad.start_time > $scope.ad.end_time) alert('结束时间不能小与开始时间');
            };

            /**
             * 提交!!
             */
            $scope.isSubmit = true; //控制提交框的按钮，对提交状态变灰
            $scope.save = function () {
                getGoodsInfo();
                getDirs();
                getStartEndTime();
                
                if (typeEditor.valid) {
                    if (typeEditor.count <= 0) {
                        alert('没有填写素材信息');
                        return;
                    }
                    
                    if (!$scope.ad.second_name) {
                        alert('没有填写广告方向');
                        return;
                    }
                    
                    if ($scope.editing) {
                        $scope.isSubmit = false;
                        $scope.ad.$modify().then(function () {
                            $location.path("/ad");
                        }, function(args) {
                            $scope.isSubmit = true;
                            alert(args.errmsg + (args.data ? "\r\n"+args.data : ''));
                        });
                    }
                    else {
                        $scope.isSubmit = false;
                        $scope.ad.$add().then(function () {
                            $location.path("/ad");
                        }, function(args) {
                            $scope.isSubmit = true;
                            alert(args.errmsg + (args.data ? "\r\n"+args.data : ''));
                        });
                    }
                }
                else {
                    alert('素材填写不完整');
                }
            };
            
            /**
             * 根据广告位获取对应规格列表
             */
            $scope.getTypes = function(pos_name){
                var ret = ['不支持投放或出bug了'];
                if (pos_name && $scope.ad.client_type && $scope.ad.page_name) {
                    if (!$rootScope.DTS.cfg[$scope.ad.client_type] || !$rootScope.DTS.cfg[$scope.ad.client_type][$scope.ad.page_name]) {
                        ret = ['获取失败，请联系技术人员 :('];
                    }
                    else {
                        $rootScope.DTS.cfg[$scope.ad.client_type][$scope.ad.page_name].forEach(function(pos, index) {
                            if (pos.pos_name == pos_name) {
                                ret = $.extend([], pos.rules);
                                return true;
                            }
                        });
                    }
                }
                return ret;
            }
            
            /**
             * 获取广告规格名称
             */
            $scope.getTypeName=function(typeid){
                var ret = '获取失败';
                if (typeid) {
                    $rootScope.DTS.types.forEach(function(type, index) {
                        if (type.typeid == typeid) {
                            $scope.typeObj = $.extend({}, type);
                            ret = type.name;
                            return true;
                        }
                    });
                }
                return ret;
            };
            

            // 广告规格部分
            // $scope.ad_tpl_url = __uri('./template/ad_tpl.html');
            // 生成动态表单
            // 暂时用这种不是很angular的方式做
            $scope.changeTypeList = function(arg) {
                var page;
                // case 里不使用break，正是利用了switch语句的特性
                switch (arg) {
                    case 'client':
                        if ($scope.ad.client_type == 'PC') {
                            $scope.ad.url_type = 1;
                            $scope.ad.ios_url = '';
                            $scope.ad.apk_url = '';
                            $scope.ad.apk_name = '';
                        }
                        for(page in $rootScope.DTS.cfg[$scope.ad.client_type]) {
                            break;  // 随便找到一个值当默认值
                        }
                        if (!page) return;
                        $scope.ad.page_name = page;
                    case 'page':
                        $scope.ad.pos_name = $rootScope.DTS.cfg[$scope.ad.client_type][$scope.ad.page_name][0]['pos_name'];
                    case 'pos':
                        $scope.typeids = $scope.getTypes($scope.ad.pos_name);
                        $scope.ad.typeid = $scope.typeids[0];
                }
                typeEditor._updateGoodsProperties($scope.ad.typeid);
            }
            
            $scope.addAdType = function() {
                typeEditor._addGoodsProperties($scope.ad.typeid);
            }

            
            // FIRE!----------------------------
            
            $scope.id = $routeParams.id;
            if ($scope.id && $scope.id!== 'edit') $scope.editing = true;
            
            if ($scope.editing) {
                $scope.ad = Ad.get({id: $scope.id}, function(){
                    
                    // 广告规格
                    $scope.typeids = $scope.getTypes($scope.ad.pos_name);
                    typeEditor._resetGoodsProperties();
                    typeEditor.count = 0;
                    $scope.ad.goods_info.forEach(function(props) {
                        typeEditor._addGoodsProperties($scope.ad.typeid, props);
                    });
                    
                    // 二级方向
                    $scope.updateSecondNames(function(){
                        $scope.updateDirsByNames(function(){
                            setTimeout(updateDirsStatus, 500);
                        });
                    });

                    
                    // 时间
                    $scope.start_time = stringifyTime(+$scope.ad.start_time * 1000, 'yyyy-MM-dd');
                    $scope.end_time = stringifyTime(+$scope.ad.end_time * 1000, 'yyyy-MM-dd');
                    
                    
                    // 接口返回字符串，转换成数字
                    $scope.ad.click = +$scope.ad.click;
                    $scope.ad.download = +$scope.ad.download;
                });
            }
            else {
                $scope.ad = new Ad();
                $scope.ad.url_type = '1';

                $scope.ad.page_name = 'FRS';
                $scope.ad.client_type = 'PC';
                $scope.ad.pos_name = '3';
                $scope.ad.typeid = '0001';
                $scope.ad.goods_info = '[]';
                // 模型更新后ng-change不被触发，因此同时绑定在父元素上，并在此初始化时调用一次
                $scope.changeTypeList('pos');
                
                $scope.setStrategy();
            };
            
            
            


        }
    ]);

});
;