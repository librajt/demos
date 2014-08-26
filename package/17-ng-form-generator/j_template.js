window.json = [
    {
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
    }
];