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
     * �����ԭ�ͣ�ԭʼ����
     */
    var Klass = {

        // initialize: function() {},

        /**
         * ������ `prototype`��������ʼ��������
         */
        fn: {
            initialize: function() {
            }
        },

        /**
         * ����һ�������
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
         * ��ʼ�����캯��������������һ��ʵ����
         * ���ڹ��캯�����൱�ڵ��� `new Constructor`
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
         * ��չ�����ľ�̬����
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
         * ��չ������ʵ������
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

;(function(exports) {

    var PropertyManager = Klass.create({
        template: '',
        
        initialize: function(cfg, index, values) {
            this.cfg = cfg;
            this.index = index;
            this.id = this.cfg.id;
            this.name = this.cfg.name;
            this.hidden = this.cfg.hide;
            this.type = this.cfg.type;
            
            this.valid = false;
            this.cfg.validate = this.cfg.validate || {};
            this.cfg.validate = this.cfg.validate.require == 0 ? this.cfg.validate : $.extend({'require': 1}, this.cfg.validate);

            this.beforeInitEl(cfg);
            this.$el = $(this.getHtml());
            if (this.hidden) this.hide();  // Ĭ�ϲ���ʾ
            
            // append
            $('#property_pannel_collapse_' + this.index + ' .panel-body').append(this.$el);
            
            // ����ֵԪ��
            this.$value = this.$el.find('#form-field-' + this.id + '-value-' + this.index);
            this.$err = this.$el.find('#form-field-' + this.id + '-err-' + this.index);
            this.$controlGropt = this.$el.find('.control-group');
            this.afterInitEl(cfg);

            this.initEvents();
            
            if (this.cfg.defaultValue) {
                this.valid = true;
                this.setValue(this.cfg.defaultValue);
            }
            
            if (values && values[this.id]) {
                this.valid = true;
                this.setValue(values[this.id]);
            }
        },
        
        beforeInitEl: function(cfg, index) {},
        afterInitEl: function(cfg, index) {},
        
        getHtml: function() {
            var tpl = this.template;
            tpl = tpl.replace(/%%index%%/g, this.index);
            tpl = tpl.replace(/%%property_id%%/g, this.cfg.id);
            tpl = tpl.replace(/%%property_name%%/g, this.cfg.name);
            tpl = tpl.replace(/%%property_tip%%/g, this.getTipArray().join('<br>'));
            return tpl;

            // children 
            // var tpl = PropertyManager.fn.getHtml.call(this);  // this.supper()
        },
        
        focus: function() {
            var self = this;
            self.expendPanel(function() {
                self.$value.focus();
            });
            
        },
        
        expendPanel: function(cb) {
            if ($('#property_pannel_collapse_' + this.index).hasClass('collapse')) {
                $('#property_pannel_toggle_' + this.index).click();
                setTimeout(cb, 1500);
            }
            else {
                cb();
            }
        },
        
        initEvents: function() {
            this.$value.on('blur', $.proxy(this.onValidate, this));
            
            for(var type in this.cfg.callbacks) {
                this.$value.on(type, $.proxy(this.cfg.callbacks[type], this));
            };
        },

        getTipArray: function() {
            var tip = this.cfg.tips || [];
            if (this.cfg.validate.length) tip.push('���' + this.cfg.validate.length + 'Ӣ���ַ�����');
            if (this.cfg.validate.doubleLength) tip.push('���' + this.cfg.validate.doubleLength + '�����ַ�����');
            if (this.cfg.validate.patten && this.cfg.validate.patten == 'URL') tip.push('��http://��ͷ������url');
            if (this.cfg.validate.patten && this.cfg.validate.patten == '����') tip.push('����');
            return tip;
        },
        
        getValue: function() {
            if (!this.valid) return '';
            return $.trim(this.$value.val());
        },

        setValue: function(val) {
            this.$value.val(val);
        },
        
        resetValue: function() {
            this.setValue('');
            this.valid = 0;
        },
        
        hide: function() {
            this.$el.hide();
            this.hidden = 1;
        },
        
        show: function() {
            this.$el.show();
            this.hidden = 0;
        },
        
        onDestory: function() {
            
        },
        
        onValidate: function(e) {
            this.valid = true;
            for(var rule in this.cfg.validate) {
                this.setValidateTip('');
                if (!this.hidden && this.cfg.validate.require != 0 && this.validateMap[rule] && !this[this.validateMap[rule]]()) {
                    this.valid = false;
                    return;
                }
            }
        },
        
        setValidateTip: function(err) {
            if (!err || err == '') {
                this.$err.html('');
                this.$controlGropt.removeClass('error');
                return;
            }
            this.$err.html(err);
            this.$controlGropt.addClass('error');
        },
        
        validateMap: {
            'require': 'validateRequire',
            'doubleLength': 'validateDoubleLength',
            'patten': 'validatePatten',
            
        },
        
        pattenMap: {
            '����': /^[1-9]\d*$/,
            'URL': /^https?:\/\//
        },
        
        // �Ƿ��������������ֵ�����¸�����Ϊ������
        isRelatedRequired: function() {
            if (Object.prototype.toString.call(this.cfg.validate.require) !== '[object Array]') return false;
            
            var ret = true, property;
            this.cfg.validate.require.forEach(function(id, index) {
                property = typeEditor.getGoodsProperty(id);
                if (property.getValue() != '' && property.valid) {
                    ret = false;
                    return;
                }
            });
            return ret;
        },
        
        getRelatedRequireNames: function() {
            var ret = [], property;
            this.cfg.validate.require.forEach(function(id, index) {
                property = typeEditor.getGoodsProperty(id);
                ret.push(property.name);
            });
            return ret;
        },
        
        triggerRelatedRequireValidate: function() {
            var property;
            this.cfg.validate.require.forEach(function(id, index) {
                property = typeEditor.getGoodsProperty(id);
                property.$value.trigger('blur');
            });
        },
        
        validateRequire: function() {
            var ret = true, msg = '';
            var val = $.trim(this.$value.val());
            if (this.cfg.validate.require != 0) {
                if (val == '') {
                    if (this.cfg.validate.require == 1) {
                        ret = false;
                        msg = '������';
                    }
                    else if (this.isRelatedRequired()) {
                        ret = false;
                        msg = '�� [' + this.getRelatedRequireNames().join(']��[') + '] ������һ��';
                    }
                }
                else if (this.isRelatedRequired()) {
                    this.triggerRelatedRequireValidate();
                }
            }
            this.setValidateTip(msg);
            return ret;
        },
        
        validateDoubleLength: function() {
            var ret = true, msg = '';
            var val = $.trim(this.$value.val());
            var dl = this.getDoubleLength(val);
            var dl0 = this.cfg.validate.doubleLength;
            if ((this.cfg.validate.require == 1 || this.isRelatedRequired() || val != '') && dl > dl0) {
                ret = false;
                msg = '������󳤶�';
            }
            this.setValidateTip(msg);
            return ret;
        },
        
        validatePatten: function() {
            var ret = true, msg = '';
            var val = this.$value.val();
            var patten = this.cfg.validate.patten;
            if (patten.indexOf('/' == 0)) patten = this.pattenMap[patten];  // �Զ�������
            var regexp = new RegExp(patten);
            if ((this.cfg.validate.require == 1 || this.isRelatedRequired() || val != '') && !regexp.test(val)) {
                ret = false;
                msg = '��ʽ����';
            }
            this.setValidateTip(msg);
            return ret;
        },
        
        getDoubleLength: function(str) {
            if (!str) { return 0; }
            var cArr = str.match(/[^\x00-\xff]/ig),
                cLen = cArr == null ? 0 : cArr.length,
                eLen = str.length - cLen;
            return Math.ceil(eLen / 2) + cLen;
        },
    });
    
    var PropertyGroup = Klass.create({
    });
    
    var PropertySimpleText = PropertyManager.create({
        kls: 'simpletext',

        template: [
            '<div class="row goods_property" data-id="%%property_id%%-%%index%%">',
                '<div class="col-md-8">',
                    '<div class="control-group">',
                        '<label class="control-label" for="form-field-%%property_id%%-value-%%index%%">%%property_name%%</label>',
                        '<div class="controls form-group">',
                            '<input class="small-input" type="text" id="form-field-%%property_id%%-value-%%index%%">',
                        '</div>',
                    '</div>',
                '</div>',
                '<div class="col-md-4">',
                    '<div class="propertip" id="form-field-%%property_id%%-tip-%%index%%">%%property_tip%%</div>',
                    '<div class="errmsg" id="form-field-%%property_id%%-err-%%index%%"></div>',
                '</div>',
            '</div>'
        ].join('')
    });

    var PropertyRichText = PropertyManager.create({
        kls: 'richtext',

        template: [
            '<div class="row goods_property" data-id="%%property_id%%-%%index%%">',
                '<div class="col-md-8">',
                    '<div class="control-group">',
                        '<label class="control-label" for="form-field-%%property_id%%-value-%%index%%">%%property_name%%</label>',
                        '<div class="controls form-group">',
                            '<textarea class="small-input" id="form-field-%%property_id%%-value-%%index%%"></textarea>',
                        '</div>',
                    '</div>',
                '</div>',
                '<div class="col-md-4">',
                    '<div class="propertip" id="form-field-%%property_id%%-tip-%%index%%">%%property_tip%%</div>',
                    '<div class="errmsg" id="form-field-%%property_id%%-err-%%index%%"></div>',
                '</div>',
            '</div>'
        ].join('')
    });
    
    var PropertySelect = PropertyManager.create({
        kls: 'select',

        template: [
            '<div class="row goods_property" data-id="%%property_id%%-%%index%%">',
                '<div class="col-md-8">',
                    '<div class="control-group">',
                        '<label class="control-label" for="form-field-%%property_id%%-value-%%index%%">%%property_name%%</label>',
                        '<div class="controls form-group">',
                            '<select class="small-input" id="form-field-%%property_id%%-value-%%index%%">%%property_options%%</select>',
                        '</div>',
                    '</div>',
                '</div>',
                '<div class="col-md-4">',
                    '<div class="propertip" id="form-field-%%property_id%%-tip-%%index%%">%%property_tip%%</div>',
                    '<div class="errmsg" id="form-field-%%property_id%%-err-%%index%%"></div>',
                '</div>',
            '</div>'
        ].join(''),

        getHtml: function() {
            var tpl = PropertyManager.fn.getHtml.call(this), optionsBuffer = '', oKey, oVal;
            for (var i = 0, opts = this.cfg.options, j = opts.length; i < j; i++) {
                debugger;
                if (typeof opts[i] == 'object') {
                    oKey = opts[i].key;
                    oVal = opts[i].val;
                }
                else {
                    oKey = opts[i];
                    oVal = opts[i];
                }
                optionsBuffer += '<option value="' + oVal + '">' + oKey + '</option>';
            }
            tpl = tpl.replace(/%%property_options%%/g, optionsBuffer);
            return tpl;
        },
        
        beforeInitEl: function(cfg, index) {
            this.valid = true;
        },
        
        setValue: function(val) {
            //PropertyManager.fn.setValue.call(this, '');
            PropertyManager.fn.setValue.call(this, val);
            var self = this;
            setTimeout(function() {
                self.$value.trigger('change');
            }, 200);
        },
        
        onChangeToggle: function(e) {
            var val = this.$value.find('option:selected').index();
            var property;
            var els = this.cfg.toggle;
            if (els && els.length > 0) {
                els.forEach(function(ids, index) {
                    ids.forEach(function(id) {
                        property = typeEditor.getGoodsProperty(id);
                        if (property) {
                            if (index == val) {
                                property.show();
                            }
                            else {
                                property.hide();
                                property.resetValue();
                                property.setValidateTip('');
                            }
                        }
                    });
                });
            }
        },
        
        initEvents: function() {
            PropertyManager.fn.initEvents.call(this);
            this.$value.on('change', $.proxy(this.onChangeToggle, this));
        }
    });
    
    var PropertyUpload = PropertyManager.create({
        kls: 'upload',
        
        acceptMap: {
            'gif': 'image/gif',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'bmp': 'image/bmp'
        },

        template: [
            '<div class="row goods_property" data-id="%%property_id%%-%%index%%">',
                '<div class="col-md-8">',
                    '<div class="control-group">',
                        '<label class="control-label" for="form-field-%%property_id%%-upload-%%index%%">%%property_name%%</label>',
                        '<div class="controls form-group">',
                            '<div class="controls_upload clearfix" id="form-field-%%property_id%%-opt-%%index%%">',
                                '<input class="small-input" type="hidden" id="form-field-%%property_id%%-value-%%index%%" />',
                                '<label class="adsenseUploader">',
                                    '<input type="file" id="form-field-%%property_id%%-upload-%%index%%" accept="%%accept%%" />',
                                    '<button id="form-field-%%property_id%%-btn-%%index%%" class="btn btn-small btn-primary">���ļ��ϴ�</button>',
                                '</label>',
                            '</div>',
                            '<div class="controls_preview" id="form-field-%%property_id%%-preview-%%index%%"></div>',
                        '</div>',
                    '</div>',
                '</div>',
                '<div class="col-md-4">',
                    '<div class="propertip" id="form-field-%%property_id%%-tip-%%index%%">%%property_tip%%</div>',
                    '<div class="errmsg" id="form-field-%%property_id%%-err-%%index%%"></div>',
                '</div>',
            '</div>'
        ].join(''),

        initialize: function(cfg, index, values) {
            PropertyManager.fn.initialize.call(this, cfg, index, values);
            //this.filetype = this.cfg.filetype;
        },
        
        beforeInitEl: function(cfg) {
            var self = this;
            self.accept = [];
            self.cfg.whitelist.split('|').forEach(function(type) {
                if (self.acceptMap[type]) self.accept.push(self.acceptMap[type]);
            });
        },
        
        afterInitEl: function(cfg) {
            this.$upload = this.$el.find('#form-field-' + this.id + '-upload-' + this.index);
            this.$btn = this.$el.find('#form-field-' + this.id + '-btn-' + this.index);
            this.$tip = this.$el.find('#form-field-' + this.id + '-tip-' + this.index);
            this.$preview = this.$el.find('#form-field-' + this.id + '-preview-' + this.index);
            this.$opt = this.$el.find('#form-field-' + this.id + '-opt-' + this.index);
            this.$preview = this.$el.find('#form-field-' + this.id + '-preview-' + this.index);
        },
        
        initEvents: function() {
            PropertyManager.fn.initEvents.call(this);
            this.$upload.on('change', $.proxy(this.onUploadChange, this));
        },

        getHtml: function() {
            var tpl = PropertyManager.fn.getHtml.call(this);
            tpl = tpl.replace(/%%accept%%/g, this.accept.join(','));
            return tpl;
        },
        
        focus: function() {
            var self = this;
            self.expendPanel(function() {
                self.$upload.focus();
            });
        },

        getTipArray: function() {
            var tip = PropertyManager.fn.getTipArray.call(this);
            // image
            if (this.cfg.width && this.cfg.height) tip.push(['�ߴ磺', this.cfg.width, '*', this.cfg.height].join(''));
            else {
                if (this.cfg.width) tip.push(['��', this.cfg.width].join(''));
                if (this.cfg.height) tip.push(['�ߣ�', this.cfg.height].join(''));
            }
            tip.push(['֧�����ͣ�', this.cfg.whitelist.replace(/\|/g, ',')].join(''));
            if (this.cfg.maxfilesize) tip.push(['��С���ƣ�', this.cfg.maxfilesize, 'KB'].join(''));
            return tip;
        },
        
        setValue: function(val) {
            PropertyManager.fn.setValue.call(this, val);
            this.$opt.hide();
            this.renderUploadPreview();
        },
        
        resetValue: function() {
            PropertyManager.fn.resetValue.call(this);
            this.removeFiles();
            this.$preview.html('');
            this.$opt.show();
        },
        
        removeFiles: function() {
            this.$upload.val('');
        },

        onUploadChange: function(e) {
            var files = this.$upload.get(0).files;
            if (!files[0]) return;
            if ($.inArray(files[0].type,this.accept) == -1) {
                alert('��ʽ������');
                this.resetValue();
                this.$value.triggler('blur');
            }
            else {
                this.startUpload();
            }
        },
        
        validSize: function(src, callback) {
            var tpl = '<div style="position:absolute;z-index:-12;visibility:hidden;opacity:0;"></div>';
            var $el = $(tpl);
            var $img = $('<img style="position:absolute;" src="' + src + '">');
            // �ڿͻ���ȡ��ͼƬ�ߴ�
            var self_width = this.cfg.width;
            var self_height = this.cfg.height;
            var check = function() {
                var width = $el.find('img').width();
                var height = $el.find('img').height();
                $el.remove();
                if ((!self_width || width == self_width) && (!self_height || height == self_height)) {
                    return true;
                }
                else {
                    return false;
                }
            };
            $img.on('load', function() {
                callback(check());
            });
            $el.append($img);
            this.$el.append($el);
        },
        
        fileSizeAccept: function(file) {
            var size = file.size;  // B
            var accept = this.cfg.maxfilesize;  // KB
            if (accept) {
                if (size / 1024 > accept) return false;
            }
            return true;
        },
        
        startUpload: function() {
            var self = this;
            var files = self.$upload.get(0).files;
            if (self.$btn.hasClass('btn-disable') || files.length === 0) {
                return ;
            }
            
            if (!self.fileSizeAccept(files[0])) {
                alert('�ļ������������');
                self.resetValue();
                return;
            }
            
            //self.$btn.addClass('btn-disable').attr('disabled', 'disabled');
            var formData = new FormData();
            formData.append('tbs', self.tbs || 'eb47451a0ff56917014007293550125500_1');  // TODO: tbs
            formData.append('Filename', 'image.jpg');
            formData.append('file', files[0]);
            
            self.uploadFile(files[0], formData, function (uploadRst) {
                self.$btn.removeAttr('disabled').removeClass('btn-disable');
                uploadRst = JSON.parse(uploadRst);
                
                if (uploadRst.err_no === 2401060001) {
                    alert('���ȵ�¼���ɺ�����������');
                    return;
                }
                
                if (uploadRst.err_no === 0) {
                    var src = 'http://imgsrc.baidu.com/tieba/pic/item/' + uploadRst.info.pic_id_encode + '.jpg';
                    self.valid = 1;
                    self.validSize(src, function(ret) {
                        if (ret) {
                            self.setValue(src);
                        }
                        else {
                            alert('�ߴ粻�ԡ�����ͼƬ�ߴ磬�������������β��');
                            self.resetValue();
                        }
                        self.removeFiles();
                    });
                }
                
            });
        },
        
        uploadFile: function (file, formData, callback) {
            var xhr = new XMLHttpRequest(), self = this;
            xhr.withCredentials = true;
            xhr.open('post', 'http://upload.tieba'+'.baidu.com/upload/pic', true);
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        callback(xhr.responseText);
                    }
                    else {
                        alert('ͼƬ�ϴ��ӿڹ��ϣ���������');
                        self.removeFiles();
                    }
                }
            }
            
            xhr.send(formData);
        },
        
        renderUploadPreview: function() {
            var src = this.getValue();
            if (!src) return;
            var html = '<table class="table table-striped table-bordered table-hover">';
            html += '<tr><td><a href="' + src + '" target="_blank"><img width="150" src="' + src + '" /></a></td><td><a href="javascript:;" class="files-pic-delete" data-id="' + this.id + '">�����ϴ�</a></td>' +
                '</tr>';
            html += '</table>';
            this.$preview.html(html);
            
            this.$preview.find('.files-pic-delete').on('click', $.proxy(this.resetValue, this));
        }
    });
    

    var PropertyFactory = function(property, index, values) {
        var map = {
            'group': PropertyGroup,
            'simpletext': PropertySimpleText,
            'richtext': PropertyRichText,
            'select': PropertySelect,
            'upload': PropertyUpload
        };
        if (map[property.type]) return map[property.type].instance(property, index, values);
    };
    
    // --------------------------------

    var typeEditor = {

        goodsProperties: [],
        goodsInfo: [],
        goodsInfoIndex: 0,
        count: 0,
        
        // public
        getGoodsProperty: function(id) {
            var ret;
            this.goodsProperties.forEach(function(property, index) {
                if (id == property.id) {
                    ret = property;
                    return true;
                }
            });
            return ret;
        },
        
        
        // ѡ���������͡�ʱ��������չ�����ֶ�
        _resetGoodsProperties: function() {
            var $root = $('#goods_properties');
            $root.html('');
            // TODO: destory
            
            this.goodsInfo = [];
            this.goodsInfoIndex = 0;
            this.count = 0;
        },
        
        _updateGoodsProperties: function(typeid) {
            this._resetGoodsProperties();
            this._addGoodsProperties(typeid);
        },
        
        _addGoodsProperties: function(typeid, values) {
            if (this.count >= 3) {
                alert('������3��');
                return;
            }
            this.goodsInfoIndex++;
            this._addGoodsInfo(typeid, values);
            this.goodsInfo.push(this.goodsProperties);
        },
        
        _addGoodsInfo: function(typeid, values) {
            this.goodsProperties = [];
            this.goodsProperties.__index = this.goodsInfoIndex;
            this.goodsProperties.__id = values && values.id || '';
            this.count++;
            this._getGoodsPropertys(this._getGoodsType(typeid).properties, values);
        },
        
        _getGoodsType: function(typeid) {
            var ret = {};
            TYPES_LIST.forEach(function(type, index) {
                if (type.typeid == typeid) {
                    $.extend(ret, type);
                    return;
                }
            });
            return ret;
        },
        
        _getGoodsPropertys: function(properties, values) {
            var prop = this.goodsProperties;
            var index = prop.__index;
            var wrapper = [
                '<div class="panel panel-default">',
                    '<div class="panel-heading" >',
                        '<a class="close" href="javascript:" title="ɾ��">��</a>',
                        '<a data-toggle="collapse" data-parent="#goods_properties" id="property_pannel_toggle_%%index%%" href="#property_pannel_collapse_%%index%%" class="accordion-toggle">�ز�#%%index%%</a>',
                    '</div>',
                    '<div id="property_pannel_collapse_%%index%%" class="panel-collapse collapse">',
                        '<div class="panel-body"></div>',
                    '</div>',
                '</div>'
            ].join('');
            var $wrapper = $(wrapper.replace(/%%index%%/g, index));
            $('#goods_properties').append($wrapper);

            for (var i = 0, len = properties.length; i < len; i++) {
                property = PropertyFactory(properties[i], index, values); 
                this.goodsProperties.push(property);
            }
            
            $wrapper.find('a.accordion-toggle').click();
            $wrapper.find('a.close').on('click', function(){
                if (!confirm('ɾ����')) return;
                $wrapper.hide();
                prop.__deleted = true;
                typeEditor.count--;
            });
        },
        
        _getExtProperty: function() {
            this.valid = true;
            var ret = [], obj, self = this;
            this.goodsInfo.forEach(function(properties) {
                obj = {};
                if (properties.__deleted) return false;
                if (!self.valid) return false;
                properties.forEach(function(prop) {
                    if (!self.valid) return;
                    obj[prop.id] = prop.getValue();
                    prop.$value.trigger('blur');
                    if (!prop.valid) {
                        self.valid = false;
                        prop.focus();
                        return false;
                    }
                });
                obj.id = properties.__id;
                ret.push(obj);
            });
            return ret;
        }
        

    };
    
    exports.typeEditor = typeEditor;


})(this);