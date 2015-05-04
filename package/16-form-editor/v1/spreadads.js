;(function(exports) {

    var PropertyManager = Klass.create({
        template: '',
        
        initialize: function(cfg) {
            this.cfg = cfg;
            this.id = this.cfg.id;
            this.name = this.cfg.name;
            this.hidden = this.cfg.hide;
            this.type = this.cfg.type;
            
            this.valid = false;
            if (this.type == 'select') this.valid = true;
            this.cfg.validate = this.cfg.validate || {};
            this.cfg.validate = this.cfg.validate.require == 0 ? this.cfg.validate : $.extend({'require': 1}, this.cfg.validate);

            this.beforeInitEl(cfg);
            this.$el = $(this.getHtml());
            if (this.hidden) this.hide();  // 默认不显示
            $('#goods_properties').append(this.$el);
            
            // 属性值元素
            this.$value = $('#form-field-' + this.id + '-value');
            this.$err = $('#form-field-' + this.id + '-err');
            this.$controlGropt = this.$el.find('.control-group');
            this.afterInitEl(cfg);

            this.initEvents();
        },
        
        beforeInitEl: function(cfg) {},
        afterInitEl: function(cfg) {},
        
        getHtml: function() {
            var tpl = this.template;
            tpl = tpl.replace(/%%property_id%%/g, this.cfg.id);
            tpl = tpl.replace(/%%property_name%%/g, this.cfg.name);
            tpl = tpl.replace(/%%property_tip%%/g, this.getTipArray().join('<br>'));
            return tpl;

            // children 
            // var tpl = PropertyManager.fn.getHtml.call(this);  // this.supper()
        },

        getTipArray: function() {
            var tip = [];
            if (this.cfg.validate.length) tip.push('最大' + this.cfg.validate.length + '英文字符长度');
            if (this.cfg.validate.doubleLength) tip.push('最大' + this.cfg.validate.doubleLength + '汉字字符长度');
            if (this.cfg.validate.patten && this.cfg.validate.patten == 'URL') tip.push('以http://开头的完整url');
            if (this.cfg.validate.patten && this.cfg.validate.patten == '数字') tip.push('数字');
            return tip;
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
        
        getValue: function() {
            if (!this.valid) return '';
            return $.trim(this.$value.val());
        },

        setValue: function(val) {
            this.$value.val(val);
        },
        
        initEvents: function() {
            this.$value.on('blur', $.proxy(this.onValidate, this));
            
            for(var type in this.cfg.callbacks) {
                this.$value.on(type, $.proxy(this.cfg.callbacks[type], this));
            };
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
            '数字': /^\d+$/,
            'URL': /^https?:\/\//
        },
        
        isRelatedRequired: function() {
            // 是否由于相关属性无值，导致该属性为必填项
            var goodsProperty;
            
            if (typeof this.cfg.validate.require != 'string') return false;  // TODO
            
            goodsProperty = spreadads.getGoodsProperty(this.cfg.validate.require);
            if (goodsProperty.getValue() == '') {
                return true;
            }
            return false;
        },
        
        validateRequire: function() {
            var ret = true, msg = '';
            var val = $.trim(this.$value.val());
            var goodsProperty;
            if (this.cfg.validate.require != 0) {
                if (val == '') {
                    if (this.cfg.validate.require == 1) {
                        ret = false;
                        msg = '必填项';
                    }
                    else if (this.isRelatedRequired()) {
                        ret = false;
                        goodsProperty = spreadads.getGoodsProperty(this.cfg.validate.require);
                        msg = '与 ' + goodsProperty.name + ' 至少填一项';
                    }
                }
                else if (this.isRelatedRequired()) {
                    goodsProperty = spreadads.getGoodsProperty(this.cfg.validate.require);
                    goodsProperty.$value.trigger('blur');
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
            if ((this.cfg.validate.require == 1 || this.isRelatedRequired()) && dl > dl0) {
                ret = false;
                msg = '超过最大长度';
            }
            this.setValidateTip(msg);
            return ret;
        },
        
        validatePatten: function() {
            var ret = true, msg = '';
            var val = this.$value.val();
            var patten = this.cfg.validate.patten;
            if (patten.indexOf('/' == 0)) patten = this.pattenMap[patten];  // 自定义正则
            var regexp = new RegExp(patten);
            if ((this.cfg.validate.require == 1 || this.isRelatedRequired()) && !regexp.test(val)) {
                ret = false;
                msg = '格式不对';
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
            '<div class="row-fluid goods_property" data-id="%%property_id%%">',
                '<div class="span6">',
                    '<div class="control-group" id="">',
                        '<label class="control-label" for="form-field-%%property_id%%-value">%%property_name%%</label>',
                        '<div class="controls">',
                            '<input type="text" id="form-field-%%property_id%%-value">',
                        '</div>',
                    '</div>',
                '</div>',
                '<div class="span6">',
                    '<div class="propertip" id="form-field-%%property_id%%-tip">%%property_tip%%</div>',
                    '<div class="errmsg" id="form-field-%%property_id%%-err"></div>',
                '</div>',
            '</div>'
        ].join('')
    });

    var PropertyRichText = PropertyManager.create({
        kls: 'richtext',

        template: [
            '<div class="row-fluid goods_property" data-id="%%property_id%%">',
                '<div class="span6">',
                    '<div class="control-group">',
                        '<label class="control-label" for="form-field-%%property_id%%-value">%%property_name%%</label>',
                        '<div class="controls">',
                            '<textarea id="form-field-%%property_id%%-value"></textarea>',
                        '</div>',
                    '</div>',
                '</div>',
                '<div class="span6">',
                    '<div class="propertip" id="form-field-%%property_id%%-tip">%%property_tip%%</div>',
                    '<div class="errmsg" id="form-field-%%property_id%%-err"></div>',
                '</div>',
            '</div>'
        ].join('')
    });
    
    var PropertySelect = PropertyManager.create({
        kls: 'select',

        template: [
            '<div class="row-fluid goods_property" data-id="%%property_id%%">',
                '<div class="span6">',
                    '<div class="control-group">',
                        '<label class="control-label" for="form-field-%%property_id%%-value">%%property_name%%</label>',
                        '<div class="controls">',
                            '<select id="form-field-%%property_id%%-value">%%property_options%%</select>',
                        '</div>',
                    '</div>',
                '</div>',
                '<div class="span6">',
                    '<div class="propertip" id="form-field-%%property_id%%-tip">%%property_tip%%</div>',
                    '<div class="errmsg" id="form-field-%%property_id%%-err"></div>',
                '</div>',
            '</div>'
        ].join(''),

        getHtml: function() {
            var tpl = PropertyManager.fn.getHtml.call(this), optionsBuffer = '';
            for (var i = 0, opts = this.cfg.options, j = opts.length; i < j; i++) {
                optionsBuffer += '<option value="' + opts[i] + '">' + opts[i] + '</option>'
            }
            tpl = tpl.replace(/%%property_options%%/g, optionsBuffer);
            return tpl;
        },
        
        onChangeToggle: function(e) {
            var val = this.$value.find('option:selected').index();
            var property;
            var els = this.cfg.toggle;
            if (els && els.length > 0) {
                els.forEach(function(ids, index) {
                    ids.forEach(function(id) {
                        property = spreadads.getGoodsProperty(id);
                        if (property) {
                            if (index == val) {
                                property.show();
                            }
                            else {
                                property.hide();
                                property.resetValue();
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
            '<div class="row-fluid goods_property" data-id="%%property_id%%">',
                '<div class="span6">',
                    '<div class="control-group">',
                        '<label class="control-label" for="form-field-%%property_id%%-upload">%%property_name%%</label>',
                        '<div class="controls controls_upload clearfix" id="form-field-%%property_id%%-opt">',
                            '<input  type="hidden" id="form-field-%%property_id%%-value" />',
                            '<input  type="file" id="form-field-%%property_id%%-upload" accept="%%accept%%" />',
                            '<button id="form-field-%%property_id%%-btn" class="btn btn-small btn-primary">上传</button>',
                        '</div>',
                        '<div class="controls controls_preview" id="form-field-%%property_id%%-preview"></div>',
                    '</div>',
                '</div>',
                '<div class="span6">',
                    '<div class="propertip" id="form-field-%%property_id%%-tip">%%property_tip%%</div>',
                    '<div class="errmsg" id="form-field-%%property_id%%-err"></div>',
                '</div>',
            '</div>'
        ].join(''),

        initialize: function(cfg) {
            PropertyManager.fn.initialize.call(this, cfg);
            //this.filetype = this.cfg.filetype;
            this.initUpload();
        },
        
        beforeInitEl: function(cfg) {
            var self = this;
            self.accept = [];
            self.cfg.whitelist.split('|').forEach(function(type) {
                if (self.acceptMap[type]) self.accept.push(self.acceptMap[type]);
            });
        },
        
        afterInitEl: function(cfg) {
            this.$upload = $('#form-field-' + this.id + '-upload');
            this.$btn = $('#form-field-' + this.id + '-btn');
            this.$tip = $('#form-field-' + this.id + '-tip');
            this.$preview = $('#form-field-' + this.id + '-preview');
            this.$opt = $('#form-field-' + this.id + '-opt');
            this.$preview = $('#form-field-' + this.id + '-preview');
        },
        
        initEvents: function() {
            PropertyManager.fn.initEvents.call(this);
            this.$btn.on('click', $.proxy(this.onBtnClick, this));
            this.$upload.on('change', $.proxy(this.onUploadChange, this));
        },

        getHtml: function() {
            var tpl = PropertyManager.fn.getHtml.call(this);
            tpl = tpl.replace(/%%accept%%/g, this.accept.join(','));
            return tpl;
        },

        getTipArray: function() {
            var tip = PropertyManager.fn.getTipArray.call(this);
            // image
            if (this.cfg.width && this.cfg.height) tip.push(['尺寸：', this.cfg.width, '*', this.cfg.height].join(''));
            else {
                if (this.cfg.width) tip.push(['宽：', this.cfg.width].join(''));
                if (this.cfg.height) tip.push(['高：', this.cfg.height].join(''));
            }
            tip.push(['支持类型：', this.cfg.whitelist.replace(/\|/g, ',')].join(''));
            return tip;
        },
        
        resetValue: function() {
            PropertyManager.fn.resetValue.call(this);
            this.removeFiles();
            this.$preview.html('');
            this.$opt.show();
        },
        
        removeFiles: function() {
            this.$opt.find('.ace-file-input .icon-remove').trigger('click');
        },

        initUpload: function() {
            var cfg = {
                no_file: '没有文件',
                btn_choose: '选择',
                btn_change: '更换',
                droppable: false,
                onchange: null,
                thumbnail: true
            };
            // TODO: switch (this.filetype)
            this.$upload.ace_file_input(cfg);
        },
        
        onUploadChange: function(e) {
            var files = this.$upload.get(0).files;
            if ($.inArray(files[0].type,this.accept) == -1) {
                alert('格式不允许');
                this.resetValue();
                this.$value.triggler('blur');
            }
        },
        
        validSize: function(callback) {
            var tpl = '<div style="position:absolute;z-index:-12;visibility:hidden;opacity:0;"></div>';
            var $el = $(tpl);
            var $img = $('<img style="position:absolute;" src="' + this.getValue() + '">');
            // 在客户端取得图片尺寸
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
        
        onBtnClick: function(e) {
            e.preventDefault();
            var self = this;
            var files = self.$upload.get(0).files;
            if (self.$btn.hasClass('btn-disable') || files.length === 0) {
                return ;
            }
            
            self.$btn.addClass('btn-disable').attr('disabled', 'disabled');
            var formData = new FormData();
            formData.append('tbs', self.tbs || 'eb47451a0ff56917014007293550125500_1');  // TODO: tbs
            formData.append('Filename', 'image.jpg');
            formData.append('file', files[0]);
            
            self.uploadFile(files[0], formData, function (uploadRst) {
                self.$btn.removeAttr('disabled').removeClass('btn-disable');
                uploadRst = JSON.parse(uploadRst);
                
                if (uploadRst.err_no === 2401060001) {
                    alert('请先登录贴吧后再来操作吧');
                    return;
                }
                
                if (uploadRst.err_no === 0) {
                    self.setValue('http://imgsrc.baidu.com/tieba/pic/item/' + uploadRst.info.pic_id_encode + '.jpg');
                    self.valid = 1;
                }
                
                self.validSize(function(ret) {
                    if (ret) {
                        self.$opt.hide();
                        self.renderUploadPreview();
                    }
                    else {
                        alert('尺寸不对。请检查图片尺寸，或浏览器广告屏蔽插件');
                        self.resetValue();
                    }
                    self.removeFiles();
                });
            });
        },
        
        uploadFile: function (file, formData, callback) {
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.open('post', 'http://upload.tieba.baidu.com/upload/pic', true);
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    callback(xhr.responseText);
                }
            }
            
            xhr.send(formData);
        },
        
        renderUploadPreview: function() {
            var src = this.getValue();
            var html = '<table class="table table-striped table-bordered table-hover">';
            html += '<tr><td><a href="' + src + '" target="_blank"><img width="150" src="' + src + '" /></a></td><td><a href="javascript:;" class="files-pic-delete" data-id="' + this.id + '">重新上传</a></td>' +
                '</tr>';
            html += '</table>';
            this.$preview.html(html);
            
            this.$preview.find('.files-pic-delete').on('click', $.proxy(this.resetValue, this));
        }
    });
    

    var PropertyFactory = function(property) {
        var map = {
            'group': PropertyGroup,
            'simpletext': PropertySimpleText,
            'richtext': PropertyRichText,
            'select': PropertySelect,
            'upload': PropertyUpload
        };
        if (map[property.type]) return map[property.type].instance(property);
    };

    exports.PropertyFactory = PropertyFactory;
    
    // --------------------------------

    var spreadads = {

        initial : function(options) {
            this.options = JSON.parse(options);
            this.tbs = '';
            this._bindEvent();
            this._getTbs();
        },
        
        goodsProperties: [],
        
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
        
        _getTbs : function(){
            var self = this;
            try {
                // 获取tbs
                $.get('http://tieba.baidu.com/dc/common/imgtbs', function (rst) {
                    rst = typeof rst != 'object' ? JSON.parse(rst) : rst;
                    self.tbs = rst.data.tbs;
                    if (rst.data.is_login === 0) {
                        alert('同学，请先去贴吧登录后再来。');
                        return ;
                    } 
                    
                });
            }
            catch(e) {}
        },
        
        _bindEvent : function(){
            $('#form-field-goods-port').on('change', $.proxy(this._onPortChanged, this));
            $('#form-field-page').on('change', $.proxy(this._onPageChanged, this));
            $('#form-field-position').on('change', $.proxy(this._onPositionChanged, this));
            $('#form-field-goods_type').on('change', $.proxy(this._onTypeChanged, this));
            
            $('#spreadads-submit').on('click', $.proxy(this._onSubmitClick, this));
            
            // init
            $('#form-field-goods-port').trigger('change');
            
            // TODO:debug
            /*
            $('#form-field-goods-port').val('1');
            $('#form-field-goods-port').trigger('change');
            $('#form-field-page').val('frs');
            $('#form-field-page').trigger('change');
            $('#form-field-position').val('3');
            $('#form-field-position').trigger('change');
            $('#form-field-goods_type').val('1001');
            $('#form-field-goods_type').trigger('change');
            */
        },
        
        _onPortChanged : function(e) {
            this._updatePageList();
        },
        
        _onPageChanged : function(e) {
            this._updatePagePositions();
        },
        
        _onPositionChanged : function(e) {
            this._updateGoodsTypes();
        },
        
        _onTypeChanged : function(e) {
            var index = $(e.currentTarget).val();
            if (index) {
                this._updateGoodsProperties(index);
            }
        },
        
        _getPort: function() {
            var val = $('#form-field-goods-port').val();
            return (val && val.toUpperCase()) || '';
        },
        
        _getPage: function() {
            var val = $('#form-field-page').val();
            return (val && val.toUpperCase()) || '';
        },
        
        _getPosition: function() {
             var val = $('#form-field-position').val();
            return (val && val.toUpperCase()) || '';
        },
        
        // 选择“投放端”时，更新“投放页面”列表信息
        _updatePageList : function() {
            var port = this._getPort();
            
            var $root = $('#form-field-page');
            $root.val('-1');
            $root.trigger('change');
            $root.html('<option value="-1">--请先选择“投放端”--</option>');
            
            if (port == '-1') return;
            
            var tpl = '<option value="%%list_value%%">%%list_name%%</option>';
            var buffer = '<option value="-1">请选择</option>';
            if (this.options[port].length <= 0 ) {
                buffer = '<option value="-1">终端暂不支持投放</option>';
            }
            else {
                for(var pageName in this.options[port]) {
                    buffer += tpl.replace(/%%list_name%%/g, pageName).replace(/%%list_value%%/g, pageName);
                }
            }
            $root.html(buffer);
        },
        
        // 选择“投放页面”时，更新“投放位置”列表信息
        _updatePagePositions : function() {
            var port = this._getPort();
            var page = this._getPage();
            
            var $root = $('#form-field-position');
            $root.val('-1');
            $root.trigger('change');
            $root.html('<option value="-1" data-value="-1">--请先选择“投放页面”--</option>');
            
            if (!page || page == '-1') return;
            
            var tpl = '<option value="%%list_value%%" data-template="%%template_name%%">%%list_name%%</option>';
            var buffer = '<option value="-1" data-value="-1">请选择</option>';
            if (this.options[port][page].length <= 0) {
                buffer = '<option value="-1" data-value="-1">本页面暂不支持投放</option>';
            }
            else {
                this.options[port][page].forEach(function (rule, index) {
                    buffer += tpl.replace(/%%list_name%%/g, rule.pos_name).replace(/%%list_value%%/g, rule.pos_name).replace(/%%template_name%%/g, rule.template_name);
                });
            }
            $root.html(buffer);
        },
        
        // 选择“投放位置”时，更新“物料类型”列表信息
        _updateGoodsTypes : function() {
            var port = this._getPort();
            var page = this._getPage();
            var position = this._getPosition();
            
            var $root = $('#form-field-goods_type');
            $root.val('-1');
            $root.trigger('change');
            $root.html('<option value="-1">--请先选择“投放位置”--</option>');
            
            if (!position || position == '-1') return;
            
            var tpl = '<option value="%%list_value%%">%%list_name%%</option>';
            var buffer = '<option value="-1">请选择</option>', type, self = this, types;
            
            if (/^[1-9][0-9]*$/.test(position)) types = GOODS_TYPE[port][page]['FLOOR'] ? GOODS_TYPE[port][page]['FLOOR'] : GOODS_TYPE[port][page];
            else types = GOODS_TYPE[port][page][position];
            
            if (!types) {
                buffer = '<option value="-1">本位置暂不支持投放</option>';
            }
            else {
                types.forEach(function(id, index) {
                    type = self._getGoodsType(id);
                    buffer += tpl.replace(/%%list_name%%/g, type.name).replace(/%%list_value%%/g, id);
                });
            }
            $root.html($(buffer));
        },

        // 选择“物料类型”时，更新扩展属性字段
        _updateGoodsProperties: function(index) {
            var $root = $('#goods_properties');
            $root.val('-1');
            $root.html('');
            
            if (index == '-1' ) return;
            
            this.goodsProperties = [];
            var properties = this._getGoodsType(index).properties;
            this._getGoodsPropertys(properties);
        },
        
        _getGoodsType: function(id) {
            var ret = {};
            GOODS_TYPE_LIST.forEach(function(type, index) {
                if (type.id == id) {
                    $.extend(ret, type);
                    return;
                }
            });
            return ret;
        },
        
        _getGoodsPropertys: function(properties) {
            var prop, temp;
            for (var i = 0, len = properties.length; i < len; i++) {
                prop = properties[i];
                property = PropertyFactory(prop); 
                this.goodsProperties.push(property);
                
                if (prop.type == 'group') {
                    // 递归生成组
                    //temp = temp.replace(/%%property_list%%/g, this._getGoodsPropertys(prop.list));
                }
            }
        },
        
        _onSubmitClick: function(e) {
            e.preventDefault();
            // 拼装后端需要的数据
            var postData = {};
            postData.page_name = $('#form-field-page option:selected').text();
            postData.pos_name = $('#form-field-position option:selected').text();
            postData.template_name = $('#form-field-position option:selected').data('template');
            postData.prjclass = $.trim($('#form-field-business').val());
            postData.property_1 = $.trim($('#form-field-property_1').val());
            postData.property_2 = $.trim($('#form-field-property_2').val());
            postData.property_3 = $.trim($('#form-field-property_3').val());
            postData.good_type = $.trim($('#form-field-goods-port').val());
            postData.good_name = $.trim($('#form-field-goods_name').val());
            postData.good_desc = $.trim($('#form-field-good_desc').val());
            
            var ext = this._getExtProperty();
            ext.goods_type = $('#form-field-goods_type').val();
            postData.ext_property = JSON.stringify(ext);
            
            
            //this.valid = true; // TODO:debug
            if (postData.good_teyp == '-1' || postData.page_name == '-1' || postData.pos_name == '-1' || postData.template_name == '-1' || ext.goods_type == '-1' ) {
                alert('请完成所有选择项');
                return;
            }
            if (!postData.good_name || !postData.good_desc) {
                alert('物料名称、物料描述为必填项');
                return;
            }
            
            if (this.valid) {
                $.post('/spread/goodsUpload', postData, function (rst) {
                    alert(rst);
                    window.location.reload();
                });
            }
        },
        
        _getProperty: function() {
            this.valid = true;
            var obj = {}, $item, id, self = this;
            this.goodsProperties.forEach(function(prop) {
                id = prop.id;
                obj[id] = prop.getValue();
                prop.$value.trigger('blur');
                if (!prop.valid) {
                    self.valid = false;
                }
            });
            return obj;
        },
        
        _getExtProperty: function() {
            var port = this._getPort();
            var ext = {};
            $.extend(ext, this._getProperty());

            return ext;
        }



    };
    
    exports.spreadads = spreadads;


})(this);