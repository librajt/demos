window.TYPES_LIST=[{
    "id": "1",
    "typeid": "0001",
    "name": "贴子带3张图",
    "type_desc": "PC FRS Feed",
    "properties": [{
        "id": "user_name",
        "name": "用户名",
        "type": "simpletext",
        "validate": {
            "doubleLength": 7
        }
    },
    {
        "id": "thread_title",
        "name": "贴子标题",
        "type": "simpletext",
        "validate": {
            "doubleLength": 30
        }
    },
    {
        "id": "thread_content",
        "name": "贴子内容",
        "type": "richtext",
        "validate": {
            "doubleLength": 35
        }
    },
    {
        "id": "thread_pic1",
        "name": "贴子图片1",
        "type": "upload",
        "filetype": "image",
        "width": 120,
        "height": 90,
        "whitelist": "png|jpg|jpeg"
    },
    {
        "id": "thread_pic2",
        "name": "贴子图片2",
        "type": "upload",
        "filetype": "image",
        "width": 120,
        "height": 90,
        "whitelist": "png|jpg|jpeg"
    },
    {
        "id": "thread_pic3",
        "name": "贴子图片3",
        "type": "upload",
        "filetype": "image",
        "width": 120,
        "height": 90,
        "whitelist": "png|jpg|jpeg"
    }],
    "op_name": "aaaa",
    "ctime": "1404315306",
    "mtime": "1404315306",
    "$$hashKey": "04J"
}, {
    "id": "2",
    "typeid": "0002",
    "name": "贴子流1图片",
    "type_desc": "PC-FRS Feed",
    "properties": [{
        "id": "user_name",
        "name": "用户名",
        "type": "simpletext",
        "validate": {
            "doubleLength": 7
        }
    },
    {
        "id": "thread_title",
        "name": "贴子标题",
        "type": "simpletext",
        "validate": {
            "doubleLength": 30
        }
    },
    {
        "id": "thread_content",
        "name": "贴子内容",
        "type": "richtext",
        "validate": {
            "doubleLength": 35
        }
    },
    {
        "id": "thread_pic",
        "name": "贴子图片",
        "type": "upload",
        "filetype": "image",
        "width": 629,
        "height": 90,
        "whitelist": "png|jpg|jpeg"
    }],
    "op_name": "aaaa",
    "ctime": "1404315351",
    "mtime": "1404315351",
    "$$hashKey": "04K"
}, {
    "id": "3",
    "typeid": "0003",
    "name": "贴子流iframe【629*90】",
    "type_desc": "PC-FRS Feed",
    "properties": [{
        "id": "thread_title",
        "name": "贴子标题",
        "type": "simpletext",
        "validate": {
            "doubleLength": 30
        }
    },
    {
        "id": "iframe_url",
        "name": "iFrame页面URL",
        "type": "simpletext",
        "validate": {
            "patten": "URL"
        }
    }],
    "op_name": "aaaa",
    "ctime": "1404359189",
    "mtime": "1404359189",
    "$$hashKey": "04L"
}, {
    "id": "4",
    "typeid": "0004",
    "name": "贴子流通栏iframe【700*90】",
    "type_desc": "PC-FRS Feed",
    "properties": [{
        "id": "iframe_url",
        "name": "iFrame页面URL",
        "type": "simpletext",
        "validate": {
            "patten": "URL"
        }
    }],
    "op_name": "aaaa",
    "ctime": "1404359213",
    "mtime": "1404359213",
    "$$hashKey": "04M"
}, {
    "id": "5",
    "typeid": "0005",
    "name": "贴子列表上方iframe【739*110】",
    "type_desc": "PC-FRS Feed",
    "properties": [{
        "id": "iframe_url",
        "name": "iFrame页面URL",
        "type": "simpletext",
        "validate": {
            "patten": "URL"
        }
    }],
    "op_name": "aaaa",
    "ctime": "1404359239",
    "mtime": "1404359239",
    "$$hashKey": "04N"
}, {
    "id": "6",
    "typeid": "0006",
    "name": "发表框上方iframe【660*90】",
    "type_desc": "PC-FRS Feed",
    "properties": [{
        "id": "iframe_url",
        "name": "iFrame页面URL",
        "type": "simpletext",
        "validate": {
            "patten": "URL"
        }
    }],
    "op_name": "aaaa",
    "ctime": "1404359730",
    "mtime": "1404359730",
    "$$hashKey": "04O"
}, {
    "id": "7",
    "typeid": "0007",
    "name": "pk贴左侧推广位",
    "type_desc": "PC-FRS Feed",
    "properties": [{
        "id": "title",
        "name": "贴子标题",
        "type": "simpletext"
    },
    {
        "id": "red_viewpoint",
        "name": "红方观点",
        "type": "simpletext"
    },
    {
        "id": "blue_viewpoint",
        "name": "蓝方观点",
        "type": "simpletext"
    },
    {
        "id": "url",
        "name": "贴子链接",
        "type": "simpletext",
        "validate": {
            "patten": "URL"
        }
    }],
    "op_name": "aaaa",
    "ctime": "1404315604",
    "mtime": "1404315604",
    "$$hashKey": "04P"
}, {
    "id": "8",
    "typeid": "0008",
    "name": "凤巢frs广告iframe【580*137】",
    "type_desc": "PC-FRS Feed",
    "properties": [{
        "id": "iframe_url",
        "name": "iFrame页面URL",
        "type": "simpletext",
        "validate": {
            "patten": "URL"
        }
    }],
    "op_name": "aaaa",
    "ctime": "1404359285",
    "mtime": "1404359285",
    "$$hashKey": "04Q"
}, {
    "id": "9",
    "typeid": "0009",
    "name": "知心frs广告iframe【978*174】",
    "type_desc": "PC-FRS Feed",
    "properties": [{
        "id": "iframe_url",
        "name": "iFrame页面URL",
        "type": "simpletext",
        "validate": {
            "patten": "URL"
        }
    }],
    "op_name": "aaaa",
    "ctime": "1404359310",
    "mtime": "1404359310",
    "$$hashKey": "04R"
}, {
    "id": "10",
    "typeid": "0010",
    "name": "京东frs广告iframe【629*90】",
    "type_desc": "PC-FRS Feed",
    "properties": [{
        "id": "iframe_url",
        "name": "iFrame页面URL",
        "type": "simpletext",
        "validate": {
            "patten": "URL"
        }
    }],
    "op_name": "aaaa",
    "ctime": "1404359340",
    "mtime": "1404359340",
    "$$hashKey": "04S"
}, {
    "id": "11",
    "typeid": "0101",
    "name": "贴子流1张图片",
    "type_desc": "PC-PB Feed",
    "properties": [{
        "id": "user_name",
        "name": "用户名",
        "type": "simpletext",
        "validate": {
            "doubleLength": 7
        }
    },
    {
        "id": "user_portrait",
        "name": "用户头像",
        "type": "upload",
        "filetype": "image",
        "width": 80,
        "height": 80,
        "whitelist": "png|jpg|jpeg"
    },
    {
        "id": "thread_content",
        "name": "贴子内容",
        "type": "richtext",
        "validate": {
            "doubleLength": 35
        }
    },
    {
        "id": "thread_url_text",
        "name": "“查看详情”文案",
        "type": "simpletext"
    },
    {
        "id": "thread_pic",
        "name": "贴子图片",
        "type": "upload",
        "filetype": "image",
        "width": 560,
        "height": 170,
        "whitelist": "png|jpg|jpeg"
    }],
    "op_name": "aaaa",
    "ctime": "1404315761",
    "mtime": "1404315761",
    "$$hashKey": "04T"
}, {
    "id": "12",
    "typeid": "0102",
    "name": "贴子流iframe",
    "type_desc": "PC-PB Feed",
    "properties": [{
        "id": "user_portrait",
        "name": "用户头像",
        "type": "upload",
        "filetype": "image",
        "width": 80,
        "height": 80,
        "whitelist": "png|jpg|jpeg"
    },
    {
        "id": "user_name",
        "name": "用户名",
        "type": "simpletext",
        "validate": {
            "doubleLength": 7
        }
    },
    {
        "id": "thread_content",
        "name": "贴子内容",
        "type": "richtext",
        "validate": {
            "doubleLength": 35
        }
    },
    {
        "id": "thread_url_text",
        "name": "“查看详情”文案",
        "type": "simpletext"
    },
    {
        "id": "iframe_url",
        "name": "iFrame页面URL",
        "type": "simpletext",
        "validate": {
            "patten": "URL"
        }
    }],
    "op_name": "aaaa",
    "ctime": "1404315775",
    "mtime": "1404315775",
    "$$hashKey": "04U"
}, {
    "id": "13",
    "typeid": "0103",
    "name": "贴子流通栏iframe【728*90】",
    "type_desc": "PC-PB Feed",
    "properties": [{
        "id": "iframe_url",
        "name": "iFrame页面URL",
        "type": "simpletext",
        "validate": {
            "patten": "URL"
        }
    }],
    "op_name": "aaaa",
    "ctime": "1404359362",
    "mtime": "1404359362",
    "$$hashKey": "04V"
}, {
    "id": "14",
    "typeid": "0105",
    "name": "凤巢pb广告iframe【739*90】",
    "type_desc": "PC-PB Feed",
    "properties": [{
        "id": "iframe_url",
        "name": "iFrame页面URL",
        "type": "simpletext",
        "validate": {
            "patten": "URL"
        }
    }],
    "op_name": "aaaa",
    "ctime": "1404359378",
    "mtime": "1404359378",
    "$$hashKey": "04W"
}, {
    "id": "15",
    "typeid": "0106",
    "name": "知心pb广告iframe【728*184】",
    "type_desc": "PC-PB Feed",
    "properties": [{
        "id": "iframe_url",
        "name": "iFrame页面URL",
        "type": "simpletext",
        "validate": {
            "patten": "URL"
        }
    }],
    "op_name": "aaaa",
    "ctime": "1404359396",
    "mtime": "1404359396",
    "$$hashKey": "04X"
}, {
    "id": "16",
    "typeid": "1001",
    "name": "贴子流FRS",
    "type_desc": "WAP-FRS Feed",
    "properties": [{
        "id": "thread_title",
        "name": "贴子标题",
        "type": "simpletext",
        "validate": {
            "doubleLength": 30
        }
    },
    {
        "id": "thread_pic",
        "name": "贴子图片",
        "type": "upload",
        "filetype": "image",
        "width": 600,
        "height": 248,
        "whitelist": "png|jpg|jpeg"
    }],
    "op_name": "aaaa",
    "ctime": "1404315910",
    "mtime": "1404315910",
    "$$hashKey": "04Y"
}, {
    "id": "17",
    "typeid": "1101",
    "name": "贴子流PB",
    "type_desc": "WAP-PB Feed",
    "properties": [{
        "id": "thread_title",
        "name": "贴子标题",
        "type": "simpletext",
        "validate": {
            "doubleLength": 30
        }
    },
    {
        "id": "thread_pic",
        "name": "贴子图片",
        "type": "upload",
        "filetype": "image",
        "width": 600,
        "height": 248,
        "whitelist": "png|jpg|jpeg"
    }],
    "op_name": "aaaa",
    "ctime": "1404353548",
    "mtime": "1404353548",
    "$$hashKey": "04Z"
}, {
    "id": "18",
    "typeid": "2001",
    "name": "贴子流FRS",
    "type_desc": "APP-FRS Feed",
    "properties": [{
        "id": "user_name",
        "name": "用户名",
        "type": "simpletext",
        "validate": {
            "doubleLength": 7
        }
    },
    {
        "id": "user_portrait",
        "name": "用户头像",
        "type": "upload",
        "filetype": "image",
        "width": 80,
        "height": 80,
        "whitelist": "png|jpg|jpeg"
    },
    {
        "id": "thread_title",
        "name": "贴子标题",
        "type": "simpletext",
        "validate": {
            "doubleLength": 30
        }
    },
    {
        "id": "thread_pic",
        "name": "贴子图片",
        "type": "upload",
        "filetype": "image",
        "width": 644,
        "height": 280,
        "whitelist": "png|jpg|jpeg"
    },
    {
        "id": "pop_window_text",
        "name": "弹框文案",
        "type": "simpletext",
        "validate": {
            "required": 0,
            "doubleLength": 30
        }
    }],
    "op_name": "aaaa",
    "ctime": "1404315986",
    "mtime": "1404315986",
    "$$hashKey": "050"
}, {
    "id": "19",
    "typeid": "2101",
    "name": "贴子流PB",
    "type_desc": "WAP-PB Feed",
    "properties": [{
        "id": "thread_title",
        "name": "贴子标题",
        "type": "simpletext",
        "validate": {
            "doubleLength": 30
        }
    },
    {
        "id": "thread_pic",
        "name": "贴子图片",
        "type": "upload",
        "filetype": "image",
        "width": 644,
        "height": 280,
        "whitelist": "png|jpg|jpeg"
    },
    {
        "id": "pop_window_text",
        "name": "弹框文案",
        "type": "simpletext",
        "validate": {
            "required": 0,
            "doubleLength": 30
        }
    }],
    "op_name": "aaaa",
    "ctime": "1404315971",
    "mtime": "1404315971",
    "$$hashKey": "051"
}, {
    "id": "20",
    "typeid": "0011",
    "name": "网盟广告",
    "type_desc": "网盟广告PC -FRS",
    "properties": [{
        "id": "adid",
        "name": "广告id",
        "type": "simpletext",
        "validate": {
            "patten": "数字"
        }
    }],
    "op_name": "zhangshibiao",
    "ctime": "1406167306",
    "mtime": "1406167306",
    "$$hashKey": "052"
}, {
    "id": "21",
    "typeid": "0107",
    "name": "网盟广告",
    "type_desc": "网盟广告PC-PB",
    "properties": [{
        "id": "adid",
        "name": "广告id",
        "type": "simpletext",
        "validate": {
            "patten": "数字"
        }
    }],
    "op_name": "zhangshibiao",
    "ctime": "1406167320",
    "mtime": "1406167320",
    "$$hashKey": "053"
}];