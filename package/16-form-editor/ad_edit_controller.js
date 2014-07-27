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

            //����Ŀҳ�������demo��ַ http://demo.okendoken.com/2.1/white/component_list_groups.html
            
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
            // һ������
            $http.get('/adsense/direction/getfirst').success(function(ret){
                $scope.first_names = ret.data;
            });
            
            $scope.second_names = [];
            // ��������
            $scope.updateSecondNames = function(cb) {
                $http.get('/adsense/direction/getsecond', {params:{first_name: $scope.ad.first_name}}).success(function(ret){
                    $scope.second_names = ret.data;
                    cb && cb();
                });
            }
            
            $scope.name_dirs = [];
            // һ��������ѡ��Ŀ¼
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
             *  ѡ��Ŀ¼ʱ������һ��Ŀ¼״̬
             *  ˫��󶨵ķ�ʽʵ��̫���ˣ�����dom��������ʽ����
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
             *  ɾ��ĳ�����µ�dir
             */
            $scope.deleteNameDirs = function(e) {
                return;  // �ر�ɾ������
                if (!confirm('ɾ����')) return;

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
             * ����Ӹ���һ��Ŀ¼����
             */
            $scope.addFirstDir = function () {
                $scope.showAddWindow = true;
            }
            
            $scope.showVal=function(v){
                $scope.add_first_dir=v;
            }

            /**
             * ȷ����Ӹ���һ��Ŀ¼
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
             * �ر���Ӵ���
             */
            $scope.cancleFirstDirModal = function () {
                $scope.showAddWindow = false;
            };

            /**
             * �ύǰ���� goods_info
             */
            function getGoodsInfo() {
                var ext = typeEditor._getExtProperty();
                $scope.ad.goods_info = JSON.stringify(ext);
            };

            /**
             * helper:  ��Ŀ¼ɸѡ����
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
             * �ύǰ���� get dirs
             */
            function getDirs() {
                var matched = filterDir();
                $scope.ad.first_dirs = combineDirs(matched.first, $scope.first_dirs);
                $scope.ad.second_dirs = combineDirs(matched.second, $scope.second_dirs);
                $scope.ad.hot_dirs = combineDirs(matched.hot, $scope.hot_dirs);
            };
            

            /**
             * helper:  �ָ�checkbox��״̬
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
             * helper:  ���ļ���ȡĿ¼
             * �в���ã�����������ã�ӷ�ף������дһ����TODO �������
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
                                alert('ͼƬ�ϴ��ӿڹ��ϣ���������');
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
             * helper:  ��ʽ���ؼ����ɵ�ʱ��Ϊʱ���
             */
            function formatPickerTime(s) {
                // sΪyyyy/mm/dd hh:ii��ʽʱ��
                return +new Date(s.replace(/-/g,'/'));
            };
            
            function stringifyTime(t, fmt) {
                //author: meizz
                var t = new Date(t);
                var o = {   
                    "M+" : t.getMonth()+1,                 //�·�   
                    "d+" : t.getDate(),                    //��   
                    "h+" : t.getHours(),                   //Сʱ   
                    "m+" : t.getMinutes(),                 //��   
                    "s+" : t.getSeconds(),                 //��   
                    "q+" : Math.floor((t.getMonth()+3)/3), //����   
                    "S"  : t.getMilliseconds()             //����   
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
             * �ύǰ���� start_time, end_time
             */
            function getStartEndTime() {
                $scope.ad.start_time = formatPickerTime($('#adStartTime').val()) / 1000;  // phpʱ���
                $scope.ad.end_time = formatPickerTime($('#adEndTime').val()) / 1000;  // phpʱ���
                if ($scope.ad.start_time > $scope.ad.end_time) alert('����ʱ�䲻��С�뿪ʼʱ��');
            };

            /**
             * �ύ!!
             */
            $scope.isSubmit = true; //�����ύ��İ�ť�����ύ״̬���
            $scope.save = function () {
                getGoodsInfo();
                getDirs();
                getStartEndTime();
                
                if (typeEditor.valid) {
                    if (typeEditor.count <= 0) {
                        alert('û����д�ز���Ϣ');
                        return;
                    }
                    
                    if (!$scope.ad.second_name) {
                        alert('û����д��淽��');
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
                    alert('�ز���д������');
                }
            };
            
            /**
             * ���ݹ��λ��ȡ��Ӧ����б�
             */
            $scope.getTypes = function(pos_name){
                var ret = ['��֧��Ͷ�Ż��bug��'];
                if (pos_name && $scope.ad.client_type && $scope.ad.page_name) {
                    if (!$rootScope.DTS.cfg[$scope.ad.client_type] || !$rootScope.DTS.cfg[$scope.ad.client_type][$scope.ad.page_name]) {
                        ret = ['��ȡʧ�ܣ�����ϵ������Ա :('];
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
             * ��ȡ���������
             */
            $scope.getTypeName=function(typeid){
                var ret = '��ȡʧ��';
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
            

            // ����񲿷�
            // $scope.ad_tpl_url = __uri('./template/ad_tpl.html');
            // ���ɶ�̬��
            // ��ʱ�����ֲ��Ǻ�angular�ķ�ʽ��
            $scope.changeTypeList = function(arg) {
                var page;
                // case �ﲻʹ��break������������switch��������
                switch (arg) {
                    case 'client':
                        if ($scope.ad.client_type == 'PC') {
                            $scope.ad.url_type = 1;
                            $scope.ad.ios_url = '';
                            $scope.ad.apk_url = '';
                            $scope.ad.apk_name = '';
                        }
                        for(page in $rootScope.DTS.cfg[$scope.ad.client_type]) {
                            break;  // ����ҵ�һ��ֵ��Ĭ��ֵ
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
                    
                    // �����
                    $scope.typeids = $scope.getTypes($scope.ad.pos_name);
                    typeEditor._resetGoodsProperties();
                    typeEditor.count = 0;
                    $scope.ad.goods_info.forEach(function(props) {
                        typeEditor._addGoodsProperties($scope.ad.typeid, props);
                    });
                    
                    // ��������
                    $scope.updateSecondNames(function(){
                        $scope.updateDirsByNames(function(){
                            setTimeout(updateDirsStatus, 500);
                        });
                    });

                    
                    // ʱ��
                    $scope.start_time = stringifyTime(+$scope.ad.start_time * 1000, 'yyyy-MM-dd');
                    $scope.end_time = stringifyTime(+$scope.ad.end_time * 1000, 'yyyy-MM-dd');
                    
                    
                    // �ӿڷ����ַ�����ת��������
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
                // ģ�͸��º�ng-change�������������ͬʱ���ڸ�Ԫ���ϣ����ڴ˳�ʼ��ʱ����һ��
                $scope.changeTypeList('pos');
                
                $scope.setStrategy();
            };
            
            
            


        }
    ]);

});
;