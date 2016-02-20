;(function() {
    var helper = {
        addClass: function (el, cls) {
            if (!el) return;
            if ("[object Array]" == Object.prototype.toString.call(el)) {
                el.forEach(function (el) { helper.addClass(el, cls); });
            }
            else {
                if (el.classList) el.classList.add(cls);
                else if (!helper.hasClass(el, cls)) el.className = el.className + " " + cls;
            }
        },
        removeClass: function (el, cls, clsReg) {
            if (!el) return;
            clsReg = clsReg || RegExp("\\s*\\b" + cls + "\\b\\s*", "g");
            if ("[object Array]" == Object.prototype.toString.call(el)) {
                el.forEach(function (el) {
                    helper.removeClass(el, cls, clsReg);
                });
            }
            else {
                if (el.classList) el.classList.remove(cls);
                else el.className = el.className.replace(clsReg, " ");
            }
        },
        hasClass: function (el, cls) {
            return el.classList ? el.classList.contains(cls) : !el ? !1 : RegExp("\\b" + cls + "\\b").test(el.className);
        },
        indexOf: function(arr, toFind) {
            var index = -1;
            if ("[object Array]" == Object.prototype.toString.call(arr)) {
                arr.forEach(function(el, i) {
                    if (el === toFind) {
                        index = i;
                        return;
                    }
                });
            }
            return index;
        }
    };

    var animation = function(el, opacity, callback) {
        var duration = 200;
        callback = callback || function(){};
        
        if (duration === 0) {
            el.style.opacity = opacity;
            callback();
        }
        else {
            el.style.webkitTransition = 'opacity ' + duration / 1000 + 's ease';
            setTimeout(function() {
                el.style.opacity = opacity;
                setTimeout(callback, duration);
            }, 0);
        }
    };
    
    var NewsSlide = function (selector) {
        
        this.slide = document.querySelector(selector);
        if (!this.slide) return;
        this.cards = Array.prototype.slice.call(this.slide.querySelectorAll('.newsCard'));
        this.len = this.cards.length;
        this.dotsWrap = this.slide.querySelector('.progress');
        this.dotsWrap.innerHTML = '';
        this.dots = [];
        for(var i = 0; i < this.len; i++) {
            var dot = document.createElement('div');
            dot.className = 'dot' + (i === 0 ? ' on' : '');
            this.dots.push(dot);
            this.dotsWrap.appendChild(dot);
        }
        
        this.cards.forEach(function(el, i) {
            var val = 0;
            if (i === 0) val = 1;
            el.style.opacity = val;
        });
        this.current = 0;
        
        this.start();
    };

    NewsSlide.prototype = {
        start: function() {
            clearTimeout(this.timeout);
            this.stoped = false;
            this.animateIn();
        },
        
        stop: function() {
            this.stoped = true;
            clearTimeout(this.timeout);
        },
        
        animateIn: function() {
            var self = this, el = self.cards[self.current];
            el.style.display = 'block';
            animation(el, '1', function() {
                self.timeout = setTimeout(function() {
                    self.animateOut();
                }, 3000);
            });
        },

        animateOut: function() {
            var self = this, el = self.cards[self.current];
            animation(el, '0', function() {
                el.style.display = 'none';
                self.current = (self.current + 1) % self.len;
                if (!self.stoped) {
                    helper.removeClass(self.dots, 'on');
                    helper.addClass(self.dots[self.current], 'on');
                    self.animateIn();
                }
            });
        }
    };
    
    var NewsTabs = function(selector) {
        this.el = document.querySelector(selector);
        if (!this.el) return;
        this.tabs = Array.prototype.slice.call(this.el.querySelectorAll('.tab'));
        this.tabContents = Array.prototype.slice.call(this.el.querySelectorAll('.tabCnt'));
        this.current = 0;
        if (this.tabs.length === 0) return;
        
        this.tabContents.forEach(function(el, i) {
            var val = (i === 0 ? 1 : 0);
            el.style.opacity = val;
        });
        
        this.init();
        this.animateIn(this.current);
    };

    NewsTabs.prototype = {
        init: function() {
            var self = this;
            this.tabs.forEach(function(tab) {
                tab.addEventListener('click', function(e) { self.onTabContentShow(e); });
            });
        },

        onTabContentShow: function(e) {
            e.preventDefault();
            this.animateIn(helper.indexOf(this.tabs, e.currentTarget));
        },
        
        animateIn: function(index) {
            var self = this;
            if (index != self.current) {
                helper.removeClass(self.tabs, 'on');
                helper.addClass(self.tabs[index], 'on');
                animation(self.tabContents[self.current], '0', function() {
                    self.tabContents[self.current].style.display = 'none';
                    self.current = index;
                    self.tabContents[self.current].style.display = 'block';
                    animation(self.tabContents[self.current], '1');
                });
            }
        }
    };
    
    var init = function() {
        new NewsSlide('.newsSlide');
        new NewsTabs('#channel1');
    };
    
    window.addEventListener('load', init, false);
    
})();