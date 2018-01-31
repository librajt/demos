;(function(exports) {

    // TODO: 在后台配置可用类型
    var GOODS_TYPE = [
        {
            'FRS': {
                'TEST': [
                    '0000'
                ],
                'FLOOR': [
                    '0002',
                    '0001',
                    '0003',
                    '0004',
                    '0008'
                ],
                'THREAD_TOP': [
                    '0005'
                ],
                'POSTER_TOP': [
                    '0006'
                ],
                'PK_FIXED_AD': [
                    '0007'
                ],
                'NAV_TOP': [
                    '0009'
                ]
            },
            'PB': {
                'FLOOR': [
                    '0101',
                    '0102',
                    '0103',
                    '0105',
                    '0106'
                ],
                'PK_FIXED_AD': [
                    '0007'
                ]
            }
        },
        {
            'FRS': [
                '1001'
            ],
            'PB': [
                '1101'
            ]
        },
        {
            'FRS': [
                '2001'
            ],
            'PB': [
                '2101'
            ]
        }
    ];

    exports.GOODS_TYPE = GOODS_TYPE;

})(this);