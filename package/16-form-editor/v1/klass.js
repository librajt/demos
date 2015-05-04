/**
 * Base klass object.
 * @module Klass
 * @author lylijincheng@hotmail.com
 */

// Klass
;(function(exports) {

    // shim
    if (typeof Object.create !== "function") {
        Object.create = function(o) {
            function F() {
            }

            F.prototype = o;
            return new F();
        };
    }

    // Utility `proxy`
    var proxy = function(fn, scope) {
        var context = scope || this;

        return fn.bind ? fn.bind(context) : function() {
            return fn.apply(context, arguments);
        };
    };

    // Utility `extend`
    var extend = function(dest, source) {
        var i;
        for (i in source) {
            if (source.hasOwnProperty(i)) {
                dest[i] = source[i];
            }
        }
    };

    /**
     * 类对象原型，原始对象。
     */
    var Klass = {

        // initialize: function() {},

        /**
         * 类对象的 `prototype`，包含初始化方法。
         */
        fn: {
            initialize: function() {
            }
        },

        /**
         * 创建一个类对象
         *
         * @param {Object} props
         * @param {Object} statics
         * @return new klass object
         */
        create: function(props, statics) {
            var object = Object.create(this);
            // object.initialize.apply(object, arguments);

            object.fn = Object.create(this.fn);
            object.parent = this;

            if (props) {
                this.implement.call(object, props);
            }

            if (statics) {
                this.extend.call(object, statics);
            }

            return object;
        },

        /**
         * 初始化构造函数，产生类对象的一个实例。
         * 对于构造函数，相当于调用 `new Constructor`
         *
         * @params {Mixed}
         * @link fn.initialize
         * @return new instance.
         */
        instance: function() {
            var instance = Object.create(this.fn);

            instance.parent = this;
            instance.initialize.apply(instance, arguments);

            return instance;
        },

        /**
         * 扩展类对象的静态方法
         *
         * @param {Object} statics
         * @return `this`
         */
        extend: function(statics) {
            var extended = statics.extended;

            extend(this, statics);
            if (extended) {
                extended.apply(this);
            }

            return this;
        },

        /**
         * 扩展类对象的实例方法
         *
         * @param {Object} props
         * @return `this`
         */
        implement: function(props) {
            var included = props.included;

            extend(this.fn, props);
            if (included) {
                included.apply(this);
            }

            return this;
        }
    };

    Klass.proxy = Klass.fn.proxy = proxy;

    exports.Klass = Klass;
})(this);