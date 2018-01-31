;(function(exports) {

    // id规则：四位数字，分三组，(X, X, XX)
    // 组1：1位，对应三端
    // 组2：1位，对应页面。目前frs：0，pb：1
    // 组3：2位，对应序号
    // TODO: 将配置信息放入后台，并用数据库存储
    // 更新方式：csm上更新上传本文件
    
    /*
     * properties 为属性列表。属性说明如下：
     *  hide：默认是否隐藏
     *  validate：验证
     *      require：是否必填项。默认1（必填），设置为0时非必填。可设置关联必填属性id，当关联属性未填时必填（TODO:支持列表）
     *      length：长度，最大英文字符数
     *      doubleLength：长度，最大中文字符数
     *      patten：验证模式，可填正则表达式，形如/abc/。提供常用验证，可填写对应名称：
     *          数字
     *          URL
     * 支持控件及特殊设置说明如下：
     *  simpletext: input[type=text]
     *  richtext: textarea
     *  select: select
     *      options: [] 下拉选项列表
     *      toggle [[],[]...] 下拉选项列表选中时对应的显示/隐藏的属性列表。配合hide属性，默认将不显示的隐藏
     *  upload: input[type=file]
     *      filetype: 'string' 文件类型，目前支持 image，对应此类型文件可用的设置为：
     *          width: 图片宽度
     *          height: 图片高度
     *          whitelist: 支持的扩展名列表，用|分隔
     * 
     * 其它展示需求需要进行开发。
     * 
     */
    
    var GOODS_TYPE_LIST = [
        {
            'id': '0000',
            'name': '属性类型测试',
            'page': 'all',
            'properties': [
                {
                    'id': 'user_name',
                    'name': '单行文本，限制长度，必填',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_title',
                    'name': '多行文本，限制长度，非必填',
                    'type': 'richtext',
                    'validate': {
                        'require': 0,
                        'length': 35
                    }
                },
                {
                    'id': 'thread_url',
                    'name': '单行文本，URL模式',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_pic1',
                    'name': '上传图片，限制宽高',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 120,
                    'height': 90,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_pic2',
                    'name': '上传图片，限制宽',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 120,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_pic3',
                    'name': '上传图片，限制高',
                    'type': 'upload',
                    'filetype': 'image',
                    'height': 90,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_url_type',
                    'name': '下拉列表，显示/隐藏',
                    'type': 'select',
                    'options': [
                        'URL',
                        'APP'
                    ],
                    'toggle': [
                        ['threa_url'],
                        ['thread_url_app_ios', 'thread_url_app_android']
                    ]
                },
                {
                    'id': 'threa_url',
                    'name': '帖子URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_ios',
                    'name': 'app值1，默认隐藏，关联必填',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_android',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_android',
                    'name': 'app值2，默认隐藏，关联必填',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_ios',
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0001',
            'name': '贴子带3图片',
            'desc': '',
            'properties': [
                {
                    'id': 'user_name',
                    'name': '用户名',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_title',
                    'name': '贴子标题',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 30
                    }
                },
                {
                    'id': 'thread_content',
                    'name': '贴子内容',
                    'type': 'richtext',
                    'validate': {
                        'doubleLength': 35
                    }
                },
                {
                    'id': 'thread_url',
                    'name': '贴子URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_pic1',
                    'name': '贴子图片1',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 120,
                    'height': 90,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_pic2',
                    'name': '贴子图片2',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 120,
                    'height': 90,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_pic3',
                    'name': '贴子图片3',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 120,
                    'height': 90,
                    'whitelist': 'png|jpg|jpeg'
                }
            ]
        },
        {
            'id': '0002',
            'name': '贴子带1图片',
            'desc': '',
            'properties': [
                {
                    'id': 'user_name',
                    'name': '用户名',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_title',
                    'name': '贴子标题',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 30
                    }
                },
                {
                    'id': 'thread_content',
                    'name': '贴子内容',
                    'type': 'richtext',
                    'validate': {
                        'doubleLength': 35
                    }
                },
                {
                    'id': 'thread_url',
                    'name': '贴子URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_pic',
                    'name': '贴子图片',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 629,
                    'height': 90,
                    'whitelist': 'png|jpg|jpeg'
                }
            ]
        },
        {
            'id': '0003',
            'name': '贴子带1图片iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'user_name',
                    'name': '用户名',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_title',
                    'name': '贴子标题',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 30
                    }
                },
                {
                    'id': 'thread_content',
                    'name': '贴子内容',
                    'type': 'richtext',
                    'validate': {
                        'doubleLength': 35
                    }
                },
                {
                    'id': 'thread_url',
                    'name': '贴子URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'iframe_url',
                    'name': 'iFrame页面URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0004',
            'name': '通栏iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'iframe_url',
                    'name': 'iFrame页面URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0005',
            'name': '贴子列表上方iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'iframe_url',
                    'name': 'iFrame页面URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0006',
            'name': '发表框上方iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'iframe_url',
                    'name': 'iFrame页面URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0007',
            'name': 'pk贴左侧推广位',
            'properties': [
                {
                    'id': 'title',
                    'name': '贴子标题',
                    'type': 'simpletext'
                },
                {
                    'id': 'red_viewpoint',
                    'name': '红方观点',
                    'type': 'simpletext'
                },
                {
                    'id': 'blue_viewpoint',
                    'name': '蓝方观点',
                    'type': 'simpletext'
                },
                {
                    'id': 'url',
                    'name': '贴子链接',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
            ]
        },
        {
            'id': '0008',
            'name': '凤巢广告iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'iframe_url',
                    'name': 'iFrame页面URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0009',
            'name': '知心frs广告iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'iframe_url',
                    'name': 'iFrame页面URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0101',
            'name': '贴子带1图片',
            'desc': '',
            'properties': [
                {
                    'id': 'user_portrait',
                    'name': '用户头像',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 80,
                    'height': 80,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'user_name',
                    'name': '用户名',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_content',
                    'name': '贴子内容',
                    'type': 'richtext',
                    'validate': {
                        'doubleLength': 35
                    }
                },
                {
                    'id': 'thread_url',
                    'name': '贴子URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_text',
                    'name': '“查看详情”文案',
                    'type': 'simpletext'
                },
                {
                    'id': 'thread_pic',
                    'name': '贴子图片',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 560,
                    'height': 170,
                    'whitelist': 'png|jpg|jpeg'
                }
            ]
        },
        {
            'id': '0102',
            'name': '贴子带1图片iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'user_portrait',
                    'name': '用户头像',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 80,
                    'height': 80,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'user_name',
                    'name': '用户名',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_content',
                    'name': '贴子内容',
                    'type': 'richtext',
                    'validate': {
                        'doubleLength': 35
                    }
                },
                {
                    'id': 'thread_url',
                    'name': '贴子URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_text',
                    'name': '“查看详情”文案',
                    'type': 'simpletext'
                },
                {
                    'id': 'iframe_url',
                    'name': 'iFrame页面URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0103',
            'name': '通栏iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'iframe_url',
                    'name': 'iFrame页面URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0105',
            'name': '凤巢广告iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'iframe_url',
                    'name': 'iFrame页面URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0106',
            'name': '知心pb广告iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'iframe_url',
                    'name': 'iFrame页面URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        
        {
            'id': '1001',
            'name': '贴子带1图片',
            'desc': '',
            'properties': [
                {
                    'id': 'thread_title',
                    'name': '贴子标题',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 30
                    }
                },
                {
                    'id': 'user_name',
                    'name': '用户名',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_pic',
                    'name': '贴子图片',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 600,
                    'height': 248,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_url_type',
                    'name': '帖子URL类型',
                    'type': 'select',
                    'options': [
                        'URL',
                        'APP'
                    ],
                    'toggle': [
                        ['thread_url'],
                        ['thread_url_app_ios', 'thread_url_app_android']
                    ]
                },
                {
                    'id': 'thread_url',
                    'name': '帖子URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_ios',
                    'name': '帖子下载URL-iOS',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_android',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_android',
                    'name': '帖子下载URL-Android',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_ios',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'pop_window_text',
                    'name': '弹框文案',
                    'type': 'simpletext'
                },
                {
                    'id': 'button_url_type',
                    'name': '按钮URL类型',
                    'type': 'select',
                    'options': [
                        'URL',
                        'APP'
                    ],
                    'toggle': [
                        ['button_url'],
                        ['button_url_app_ios', 'button_url_app_android']
                    ]
                },
                {
                    'id': 'button_url',
                    'name': '按钮URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'button_url_app_ios',
                    'name': '按钮下载URL-iOS',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'button_url_app_android',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'button_url_app_android',
                    'name': '按钮下载URL-Android',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'button_url_app_ios',
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '1101',
            'name': '贴子带1图片',
            'desc': '',
            'properties': [
                {
                    'id': 'thread_title',
                    'name': '贴子标题',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 30
                    }
                },
                {
                    'id': 'thread_pic',
                    'name': '贴子图片',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 600,
                    'height': 248,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_url_type',
                    'name': '帖子URL类型',
                    'type': 'select',
                    'options': [
                        'URL',
                        'APP'
                    ],
                    'toggle': [
                        ['thread_url'],
                        ['thread_url_app_ios', 'thread_url_app_android']
                    ]
                },
                {
                    'id': 'thread_url',
                    'name': '帖子URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_ios',
                    'name': '帖子下载URL-iOS',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_android',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_android',
                    'name': '帖子下载URL-Android',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_ios',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'pop_window_text',
                    'name': '弹框文案',
                    'type': 'simpletext'
                },
                {
                    'id': 'button_url_type',
                    'name': '按钮URL类型',
                    'type': 'select',
                    'options': [
                        'URL',
                        'APP'
                    ],
                    'toggle': [
                        ['button_url'],
                        ['button_url_app_ios', 'button_url_app_android']
                    ]
                },
                {
                    'id': 'button_url',
                    'name': '按钮URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'button_url_app_ios',
                    'name': '按钮下载URL-iOS',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'button_url_app_android',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'button_url_app_android',
                    'name': '按钮下载URL-Android',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'button_url_app_ios',
                        'patten': 'URL'
                    }
                }
            ]
        },
        
        {
            'id': '2001',
            'name': '贴子带1图片',
            'desc': '',
            'properties': [
                {
                    'id': 'user_portrait',
                    'name': '用户头像',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 80,
                    'height': 80,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_title',
                    'name': '贴子标题',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 30
                    }
                },
                {
                    'id': 'user_name',
                    'name': '用户名',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_pic',
                    'name': '贴子图片',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 644,
                    'height': 280,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_url_type',
                    'name': 'URL类型',
                    'type': 'select',
                    'options': [
                        'URL',
                        'APP'
                    ],
                    'toggle': [
                        ['thread_url'],
                        ['thread_url_app_ios', 'thread_url_app_android', 'thread_url_app_name', 'thread_url_app_package_name']
                    ]
                },
                {
                    'id': 'thread_url',
                    'name': 'URL跳转地址',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_ios',
                    'name': '下载URL-iOS',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_android',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_android',
                    'name': '下载URL-Android',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_ios',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_name',
                    'name': '下载应用名',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 10
                    }
                },
                {
                    'id': 'thread_url_app_package_name',
                    'name': '下载应用包名',
                    'hide': 1,
                    'type': 'simpletext'
                }
            ]
        },
        {
            'id': '2101',
            'name': '贴子带1图片',
            'desc': '',
            'properties': [
                {
                    'id': 'thread_pic',
                    'name': '贴子图片',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 644,
                    'height': 280,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'user_name',
                    'name': '用户名',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_title',
                    'name': '贴子标题',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 30
                    }
                },
                {
                    'id': 'thread_url_type',
                    'name': 'URL类型',
                    'type': 'select',
                    'options': [
                        'URL',
                        'APP'
                    ],
                    'toggle': [
                        ['thread_url'],
                        ['thread_url_app_ios', 'thread_url_app_android', 'thread_url_app_name', 'thread_url_app_package_name']
                    ]
                },
                {
                    'id': 'thread_url',
                    'name': 'URL跳转地址',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_ios',
                    'name': '下载URL-iOS',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_android',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_android',
                    'name': '下载URL-Android',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_ios',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_name',
                    'name': '下载应用名',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 10
                    }
                },
                {
                    'id': 'thread_url_app_package_name',
                    'name': '下载应用包名',
                    'hide': 1,
                    'type': 'simpletext'
                }
            ]
        }
    ];

    exports.GOODS_TYPE_LIST = GOODS_TYPE_LIST;

})(this);