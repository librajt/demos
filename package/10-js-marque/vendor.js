(function(window) {
    var dummyStyle = document.createElement('div').style,
        propPrefix = (function() {
            /*
             * 在一些Android自带浏览器下不识别无前缀的 transtion 属性，如：Note2自带浏览器
             * 使用 -webkit-transtion 前缀属性，动画效果正常，原因不明。
             */
            //var vendors = 't,webkitT,MozT,msT,OT'.split(','),
            var vendors = 'webkitT,MozT,msT,OT'.split(','),
                t,
                i = 0,
                l = vendors.length;

            for (; i < l; i++) {
                t = vendors[i] + 'ransform';
                if (t in dummyStyle) {
                    return vendors[i].substr(0, vendors[i].length - 1);
                }
            }

            return false;
        }()),
        cssPrefix = propPrefix ? '-' + propPrefix.toLowerCase() + '-' : '',
        prefixStyle = function(style) {
            if (propPrefix === '') return style;
            style = style.charAt(0).toUpperCase() + style.substr(1);
            return propPrefix + style;
        },
        transform = prefixStyle('transform'),
        transition = prefixStyle('transition'),
        transitionProperty = prefixStyle('transitionProperty'),
        transitionDuration = prefixStyle('transitionDuration'),
        transformOrigin = prefixStyle('transformOrigin'),
        transitionTimingFunction = prefixStyle('transitionTimingFunction'),
        transitionDelay = prefixStyle('transitionDelay'),
        transitionEndEvent = (function() {
            if (propPrefix == 'webkit' || propPrefix === 'O') {
                return propPrefix.toLowerCase() + 'TransitionEnd';
            }
            return 'transitionend';
        }());

    dummyStyle = null;

    window.vendor =  {
        vendor: propPrefix, // deprecated
        propVendor: propPrefix, // deprecated
        cssVendor: cssPrefix, // deprecated
        propPrefix: propPrefix,
        cssPrefix: cssPrefix,
        transform: transform,
        transition: transition,
        transitionProperty: transitionProperty,
        transitionDuration: transitionDuration,
        transformOrigin: transformOrigin,
        transitionTimingFunction: transitionTimingFunction,
        transitionDelay: transitionDelay,
        transitionEndEvent: transitionEndEvent
    };
})(window);