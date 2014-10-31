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
        "hide": true,
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
{"id":"rank_level","name":"星级","type":"select","options":[1,2,3,4,5,6,7,8,9,10]},
{"id":"button_text","name":"按钮文案","type":"simpletext","validate":{"require":0,"doubleLength":4}},
{"id":"label_visible","name":"标签显示","type":"select","options":[{"key":"是","val":1},{"key":"否","val":0}]},
{"id":"thread_type","name":"星级文案","type":"simpletext","defaultValue":"贴吧推荐","validate":{"doubleLength":4}}

];