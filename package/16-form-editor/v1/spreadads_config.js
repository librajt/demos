;(function(exports) {

    // id������λ���֣������飬(X, X, XX)
    // ��1��1λ����Ӧ����
    // ��2��1λ����Ӧҳ�档Ŀǰfrs��0��pb��1
    // ��3��2λ����Ӧ���
    // TODO: ��������Ϣ�����̨���������ݿ�洢
    // ���·�ʽ��csm�ϸ����ϴ����ļ�
    
    /*
     * properties Ϊ�����б�����˵�����£�
     *  hide��Ĭ���Ƿ�����
     *  validate����֤
     *      require���Ƿ�����Ĭ��1�����������Ϊ0ʱ�Ǳ�������ù�����������id������������δ��ʱ���TODO:֧���б�
     *      length�����ȣ����Ӣ���ַ���
     *      doubleLength�����ȣ���������ַ���
     *      patten����֤ģʽ������������ʽ������/abc/���ṩ������֤������д��Ӧ���ƣ�
     *          ����
     *          URL
     * ֧�ֿؼ�����������˵�����£�
     *  simpletext: input[type=text]
     *  richtext: textarea
     *  select: select
     *      options: [] ����ѡ���б�
     *      toggle [[],[]...] ����ѡ���б�ѡ��ʱ��Ӧ����ʾ/���ص������б����hide���ԣ�Ĭ�Ͻ�����ʾ������
     *  upload: input[type=file]
     *      filetype: 'string' �ļ����ͣ�Ŀǰ֧�� image����Ӧ�������ļ����õ�����Ϊ��
     *          width: ͼƬ���
     *          height: ͼƬ�߶�
     *          whitelist: ֧�ֵ���չ���б���|�ָ�
     * 
     * ����չʾ������Ҫ���п�����
     * 
     */
    
    var GOODS_TYPE_LIST = [
        {
            'id': '0000',
            'name': '�������Ͳ���',
            'page': 'all',
            'properties': [
                {
                    'id': 'user_name',
                    'name': '�����ı������Ƴ��ȣ�����',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_title',
                    'name': '�����ı������Ƴ��ȣ��Ǳ���',
                    'type': 'richtext',
                    'validate': {
                        'require': 0,
                        'length': 35
                    }
                },
                {
                    'id': 'thread_url',
                    'name': '�����ı���URLģʽ',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_pic1',
                    'name': '�ϴ�ͼƬ�����ƿ��',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 120,
                    'height': 90,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_pic2',
                    'name': '�ϴ�ͼƬ�����ƿ�',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 120,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_pic3',
                    'name': '�ϴ�ͼƬ�����Ƹ�',
                    'type': 'upload',
                    'filetype': 'image',
                    'height': 90,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_url_type',
                    'name': '�����б���ʾ/����',
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
                    'name': '����URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_ios',
                    'name': 'appֵ1��Ĭ�����أ���������',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_android',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_android',
                    'name': 'appֵ2��Ĭ�����أ���������',
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
            'name': '���Ӵ�3ͼƬ',
            'desc': '',
            'properties': [
                {
                    'id': 'user_name',
                    'name': '�û���',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_title',
                    'name': '���ӱ���',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 30
                    }
                },
                {
                    'id': 'thread_content',
                    'name': '��������',
                    'type': 'richtext',
                    'validate': {
                        'doubleLength': 35
                    }
                },
                {
                    'id': 'thread_url',
                    'name': '����URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_pic1',
                    'name': '����ͼƬ1',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 120,
                    'height': 90,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_pic2',
                    'name': '����ͼƬ2',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 120,
                    'height': 90,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_pic3',
                    'name': '����ͼƬ3',
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
            'name': '���Ӵ�1ͼƬ',
            'desc': '',
            'properties': [
                {
                    'id': 'user_name',
                    'name': '�û���',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_title',
                    'name': '���ӱ���',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 30
                    }
                },
                {
                    'id': 'thread_content',
                    'name': '��������',
                    'type': 'richtext',
                    'validate': {
                        'doubleLength': 35
                    }
                },
                {
                    'id': 'thread_url',
                    'name': '����URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_pic',
                    'name': '����ͼƬ',
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
            'name': '���Ӵ�1ͼƬiframe',
            'desc': '',
            'properties': [
                {
                    'id': 'user_name',
                    'name': '�û���',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_title',
                    'name': '���ӱ���',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 30
                    }
                },
                {
                    'id': 'thread_content',
                    'name': '��������',
                    'type': 'richtext',
                    'validate': {
                        'doubleLength': 35
                    }
                },
                {
                    'id': 'thread_url',
                    'name': '����URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'iframe_url',
                    'name': 'iFrameҳ��URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0004',
            'name': 'ͨ��iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'iframe_url',
                    'name': 'iFrameҳ��URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0005',
            'name': '�����б��Ϸ�iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'iframe_url',
                    'name': 'iFrameҳ��URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0006',
            'name': '������Ϸ�iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'iframe_url',
                    'name': 'iFrameҳ��URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0007',
            'name': 'pk������ƹ�λ',
            'properties': [
                {
                    'id': 'title',
                    'name': '���ӱ���',
                    'type': 'simpletext'
                },
                {
                    'id': 'red_viewpoint',
                    'name': '�췽�۵�',
                    'type': 'simpletext'
                },
                {
                    'id': 'blue_viewpoint',
                    'name': '�����۵�',
                    'type': 'simpletext'
                },
                {
                    'id': 'url',
                    'name': '��������',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
            ]
        },
        {
            'id': '0008',
            'name': '�ﳲ���iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'iframe_url',
                    'name': 'iFrameҳ��URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0009',
            'name': '֪��frs���iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'iframe_url',
                    'name': 'iFrameҳ��URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0101',
            'name': '���Ӵ�1ͼƬ',
            'desc': '',
            'properties': [
                {
                    'id': 'user_portrait',
                    'name': '�û�ͷ��',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 80,
                    'height': 80,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'user_name',
                    'name': '�û���',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_content',
                    'name': '��������',
                    'type': 'richtext',
                    'validate': {
                        'doubleLength': 35
                    }
                },
                {
                    'id': 'thread_url',
                    'name': '����URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_text',
                    'name': '���鿴���顱�İ�',
                    'type': 'simpletext'
                },
                {
                    'id': 'thread_pic',
                    'name': '����ͼƬ',
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
            'name': '���Ӵ�1ͼƬiframe',
            'desc': '',
            'properties': [
                {
                    'id': 'user_portrait',
                    'name': '�û�ͷ��',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 80,
                    'height': 80,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'user_name',
                    'name': '�û���',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_content',
                    'name': '��������',
                    'type': 'richtext',
                    'validate': {
                        'doubleLength': 35
                    }
                },
                {
                    'id': 'thread_url',
                    'name': '����URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_text',
                    'name': '���鿴���顱�İ�',
                    'type': 'simpletext'
                },
                {
                    'id': 'iframe_url',
                    'name': 'iFrameҳ��URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0103',
            'name': 'ͨ��iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'iframe_url',
                    'name': 'iFrameҳ��URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0105',
            'name': '�ﳲ���iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'iframe_url',
                    'name': 'iFrameҳ��URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        {
            'id': '0106',
            'name': '֪��pb���iframe',
            'desc': '',
            'properties': [
                {
                    'id': 'iframe_url',
                    'name': 'iFrameҳ��URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                }
            ]
        },
        
        {
            'id': '1001',
            'name': '���Ӵ�1ͼƬ',
            'desc': '',
            'properties': [
                {
                    'id': 'thread_title',
                    'name': '���ӱ���',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 30
                    }
                },
                {
                    'id': 'user_name',
                    'name': '�û���',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_pic',
                    'name': '����ͼƬ',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 600,
                    'height': 248,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_url_type',
                    'name': '����URL����',
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
                    'name': '����URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_ios',
                    'name': '��������URL-iOS',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_android',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_android',
                    'name': '��������URL-Android',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_ios',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'pop_window_text',
                    'name': '�����İ�',
                    'type': 'simpletext'
                },
                {
                    'id': 'button_url_type',
                    'name': '��ťURL����',
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
                    'name': '��ťURL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'button_url_app_ios',
                    'name': '��ť����URL-iOS',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'button_url_app_android',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'button_url_app_android',
                    'name': '��ť����URL-Android',
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
            'name': '���Ӵ�1ͼƬ',
            'desc': '',
            'properties': [
                {
                    'id': 'thread_title',
                    'name': '���ӱ���',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 30
                    }
                },
                {
                    'id': 'thread_pic',
                    'name': '����ͼƬ',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 600,
                    'height': 248,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_url_type',
                    'name': '����URL����',
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
                    'name': '����URL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_ios',
                    'name': '��������URL-iOS',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_android',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_android',
                    'name': '��������URL-Android',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_ios',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'pop_window_text',
                    'name': '�����İ�',
                    'type': 'simpletext'
                },
                {
                    'id': 'button_url_type',
                    'name': '��ťURL����',
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
                    'name': '��ťURL',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'button_url_app_ios',
                    'name': '��ť����URL-iOS',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'button_url_app_android',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'button_url_app_android',
                    'name': '��ť����URL-Android',
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
            'name': '���Ӵ�1ͼƬ',
            'desc': '',
            'properties': [
                {
                    'id': 'user_portrait',
                    'name': '�û�ͷ��',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 80,
                    'height': 80,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_title',
                    'name': '���ӱ���',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 30
                    }
                },
                {
                    'id': 'user_name',
                    'name': '�û���',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_pic',
                    'name': '����ͼƬ',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 644,
                    'height': 280,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'thread_url_type',
                    'name': 'URL����',
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
                    'name': 'URL��ת��ַ',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_ios',
                    'name': '����URL-iOS',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_android',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_android',
                    'name': '����URL-Android',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_ios',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_name',
                    'name': '����Ӧ����',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 10
                    }
                },
                {
                    'id': 'thread_url_app_package_name',
                    'name': '����Ӧ�ð���',
                    'hide': 1,
                    'type': 'simpletext'
                }
            ]
        },
        {
            'id': '2101',
            'name': '���Ӵ�1ͼƬ',
            'desc': '',
            'properties': [
                {
                    'id': 'thread_pic',
                    'name': '����ͼƬ',
                    'type': 'upload',
                    'filetype': 'image',
                    'width': 644,
                    'height': 280,
                    'whitelist': 'png|jpg|jpeg'
                },
                {
                    'id': 'user_name',
                    'name': '�û���',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 7
                    }
                },
                {
                    'id': 'thread_title',
                    'name': '���ӱ���',
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 30
                    }
                },
                {
                    'id': 'thread_url_type',
                    'name': 'URL����',
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
                    'name': 'URL��ת��ַ',
                    'type': 'simpletext',
                    'validate': {
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_ios',
                    'name': '����URL-iOS',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_android',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_android',
                    'name': '����URL-Android',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'require': 'thread_url_app_ios',
                        'patten': 'URL'
                    }
                },
                {
                    'id': 'thread_url_app_name',
                    'name': '����Ӧ����',
                    'hide': 1,
                    'type': 'simpletext',
                    'validate': {
                        'doubleLength': 10
                    }
                },
                {
                    'id': 'thread_url_app_package_name',
                    'name': '����Ӧ�ð���',
                    'hide': 1,
                    'type': 'simpletext'
                }
            ]
        }
    ];

    exports.GOODS_TYPE_LIST = GOODS_TYPE_LIST;

})(this);