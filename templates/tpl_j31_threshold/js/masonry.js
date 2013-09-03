/* Copyright (C) YOOtheme GmbH, YOOtheme Proprietary Use License (http://www.yootheme.com/license) */

(function (f) {
    function h(c) {
        if (c) {
            if ("string" === typeof e[c])return c;
            c = c.charAt(0).toUpperCase() + c.slice(1);
            for (var d, a = 0, b = j.length; a < b; a++)if (d = j[a] + c, "string" === typeof e[d])return d
        }
    }

    var j = ["Webkit", "Moz", "ms", "Ms", "O"], e = document.documentElement.style;
    "function" === typeof define && define.amd ? define(function () {
        return h
    }) : f.getStyleProperty = h
})(window);
(function (f) {
    function h(a) {
        var b = parseFloat(a);
        return-1 === a.indexOf("%") && !isNaN(b) && b
    }

    function j(a) {
        var b = a("boxSizing"), n;
        if (b) {
            a = document.createElement("div");
            a.style.width = "200px";
            a.style.padding = "1px 2px 3px 4px";
            a.style.borderStyle = "solid";
            a.style.borderWidth = "1px 2px 3px 4px";
            a.style[b] = "border-box";
            var e = document.body || document.documentElement;
            e.appendChild(a);
            var f = c(a);
            n = 200 === h(f.width);
            e.removeChild(a)
        }
        return function (a) {
            "string" === typeof a && (a = document.querySelector(a));
            if (a && "object" === typeof a && a.nodeType) {
                var e = c(a);
                if ("none" === e.display) {
                    var k = {width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0}, e = 0;
                    for (a = d.length; e < a; e++)k[d[e]] = 0;
                    return k
                }
                k = {};
                k.width = a.offsetWidth;
                k.height = a.offsetHeight;
                a = k.isBorderBox = !(!b || !(e[b] && "border-box" === e[b]));
                for (var f = 0, m = d.length; f < m; f++) {
                    var j = d[f], g = parseFloat(e[j]);
                    k[j] = !isNaN(g) ? g : 0
                }
                var f = k.paddingLeft + k.paddingRight, m = k.paddingTop + k.paddingBottom, j = k.marginLeft + k.marginRight, g = k.marginTop + k.marginBottom, p = k.borderLeftWidth +
                    k.borderRightWidth, t = k.borderTopWidth + k.borderBottomWidth;
                a = a && n;
                var l = h(e.width);
                !1 !== l && (k.width = l + (a ? 0 : f + p));
                e = h(e.height);
                !1 !== e && (k.height = e + (a ? 0 : m + t));
                k.innerWidth = k.width - (f + p);
                k.innerHeight = k.height - (m + t);
                k.outerWidth = k.width + j;
                k.outerHeight = k.height + g;
                return k
            }
        }
    }

    var e = document.defaultView, c = e && e.getComputedStyle ? function (a) {
        return e.getComputedStyle(a, null)
    } : function (a) {
        return a.currentStyle
    }, d = "paddingLeft paddingRight paddingTop paddingBottom marginLeft marginRight marginTop marginBottom borderLeftWidth borderRightWidth borderTopWidth borderBottomWidth".split(" ");
    "function" === typeof define && define.amd ? define(["get-style-property/get-style-property"], j) : f.getSize = j(f.getStyleProperty)
})(window);
(function (f) {
    var h = document.documentElement, j = function () {
    };
    h.addEventListener ? j = function (c, d, a) {
        c.addEventListener(d, a, !1)
    } : h.attachEvent && (j = function (c, d, a) {
        c[d + a] = a.handleEvent ? function () {
            var b = f.event;
            b.target = b.target || b.srcElement;
            a.handleEvent.call(a, b)
        } : function () {
            var b = f.event;
            b.target = b.target || b.srcElement;
            a.call(c, b)
        };
        c.attachEvent("on" + d, c[d + a])
    });
    var e = function () {
    };
    h.removeEventListener ? e = function (c, d, a) {
        c.removeEventListener(d, a, !1)
    } : h.detachEvent && (e = function (c, d, a) {
        c.detachEvent("on" +
            d, c[d + a]);
        try {
            delete c[d + a]
        } catch (b) {
            c[d + a] = void 0
        }
    });
    h = {bind: j, unbind: e};
    "function" === typeof define && define.amd ? define(h) : f.eventie = h
})(this);
(function (f) {
    function h(a) {
        "function" === typeof a && (h.isReady ? a() : d.push(a))
    }

    function j(a) {
        a = "readystatechange" === a.type && "complete" !== c.readyState;
        if (!h.isReady && !a) {
            h.isReady = !0;
            a = 0;
            for (var b = d.length; a < b; a++)(0, d[a])()
        }
    }

    function e(a) {
        a.bind(c, "DOMContentLoaded", j);
        a.bind(c, "readystatechange", j);
        a.bind(f, "load", j);
        return h
    }

    var c = f.document, d = [];
    h.isReady = !1;
    "function" === typeof define && define.amd ? (h.isReady = "function" === typeof requirejs, define(["eventie/eventie"], e)) : f.docReady = e(f.eventie)
})(this);
(function () {
    function f() {
    }

    function h(c, d) {
        for (var a = c.length; a--;)if (c[a].listener === d)return a;
        return-1
    }

    function j(c) {
        return function () {
            return this[c].apply(this, arguments)
        }
    }

    var e = f.prototype;
    e.getListeners = function (c) {
        var d = this._getEvents(), a, b;
        if ("object" === typeof c)for (b in a = {}, d)d.hasOwnProperty(b) && c.test(b) && (a[b] = d[b]); else a = d[c] || (d[c] = []);
        return a
    };
    e.flattenListeners = function (c) {
        var d = [], a;
        for (a = 0; a < c.length; a += 1)d.push(c[a].listener);
        return d
    };
    e.getListenersAsObject = function (c) {
        var d =
            this.getListeners(c), a;
        d instanceof Array && (a = {}, a[c] = d);
        return a || d
    };
    e.addListener = function (c, d) {
        var a = this.getListenersAsObject(c), b = "object" === typeof d, e;
        for (e in a)a.hasOwnProperty(e) && -1 === h(a[e], d) && a[e].push(b ? d : {listener: d, once: !1});
        return this
    };
    e.on = j("addListener");
    e.addOnceListener = function (c, d) {
        return this.addListener(c, {listener: d, once: !0})
    };
    e.once = j("addOnceListener");
    e.defineEvent = function (c) {
        this.getListeners(c);
        return this
    };
    e.defineEvents = function (c) {
        for (var d = 0; d < c.length; d += 1)this.defineEvent(c[d]);
        return this
    };
    e.removeListener = function (c, d) {
        var a = this.getListenersAsObject(c), b, e;
        for (e in a)a.hasOwnProperty(e) && (b = h(a[e], d), -1 !== b && a[e].splice(b, 1));
        return this
    };
    e.off = j("removeListener");
    e.addListeners = function (c, d) {
        return this.manipulateListeners(!1, c, d)
    };
    e.removeListeners = function (c, d) {
        return this.manipulateListeners(!0, c, d)
    };
    e.manipulateListeners = function (c, d, a) {
        var b, e, f = c ? this.removeListener : this.addListener;
        c = c ? this.removeListeners : this.addListeners;
        if ("object" === typeof d && !(d instanceof
            RegExp))for (b in d) {
            if (d.hasOwnProperty(b) && (e = d[b]))"function" === typeof e ? f.call(this, b, e) : c.call(this, b, e)
        } else for (b = a.length; b--;)f.call(this, d, a[b]);
        return this
    };
    e.removeEvent = function (c) {
        var d = typeof c, a = this._getEvents(), b;
        if ("string" === d)delete a[c]; else if ("object" === d)for (b in a)a.hasOwnProperty(b) && c.test(b) && delete a[b]; else delete this._events;
        return this
    };
    e.emitEvent = function (c, d) {
        var a = this.getListenersAsObject(c), b, e, f, h;
        for (f in a)if (a.hasOwnProperty(f))for (e = a[f].length; e--;)b = a[f][e],
            !0 === b.once && this.removeListener(c, b.listener), h = b.listener.apply(this, d || []), h === this._getOnceReturnValue() && this.removeListener(c, b.listener);
        return this
    };
    e.trigger = j("emitEvent");
    e.emit = function (c) {
        var d = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(c, d)
    };
    e.setOnceReturnValue = function (c) {
        this._onceReturnValue = c;
        return this
    };
    e._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    };
    e._getEvents = function () {
        return this._events || (this._events =
        {})
    };
    "function" === typeof define && define.amd ? define(function () {
        return f
    }) : "object" === typeof module && module.exports ? module.exports = f : this.EventEmitter = f
}).call(this);
(function (f) {
    function h() {
    }

    function j(c) {
        if (c) {
            var d = "undefined" === typeof console ? h : function (a) {
                console.error(a)
            };
            c.bridget = function (a, b) {
                b.prototype.option || (b.prototype.option = function (a) {
                    c.isPlainObject(a) && (this.options = c.extend(!0, this.options, a))
                });
                c.fn[a] = function (f) {
                    if ("string" === typeof f) {
                        for (var h = e.call(arguments, 1), j = 0, u = this.length; j < u; j++) {
                            var q = c.data(this[j], a);
                            if (q)if (!c.isFunction(q[f]) || "_" === f.charAt(0))d("no such method '" + f + "' for " + a + " instance"); else {
                                if (q = q[f].apply(q, h), void 0 !==
                                    q)return q
                            } else d("cannot call methods on " + a + " prior to initialization; attempted to call '" + f + "'")
                        }
                        return this
                    }
                    return this.each(function () {
                        var d = c.data(this, a);
                        d ? (d.option(f), d._init()) : (d = new b(this, f), c.data(this, a, d))
                    })
                }
            }
        }
    }

    var e = Array.prototype.slice;
    "function" === typeof define && define.amd ? define(["jquery"], j) : j(f.jQuery)
})(window);
(function (f, h) {
    function j(a, b) {
        return a[d](b)
    }

    function e(a, b) {
        a.parentNode || document.createDocumentFragment().appendChild(a);
        for (var d = a.parentNode.querySelectorAll(b), c = 0, e = d.length; c < e; c++)if (d[c] === a)return!0;
        return!1
    }

    function c(a, b) {
        a.parentNode || document.createDocumentFragment().appendChild(a);
        return j(a, b)
    }

    var d;
    a:if (h.matchesSelector)d = "matchesSelector"; else {
        for (var a = ["webkit", "moz", "ms", "o"], b = 0, n = a.length; b < n; b++) {
            var m = a[b] + "MatchesSelector";
            if (h[m]) {
                d = m;
                break a
            }
        }
        d = void 0
    }
    var p;
    d ? (a = document.createElement("div"),
        p = j(a, "div") ? j : c) : p = e;
    "function" === typeof define && define.amd ? define(function () {
        return p
    }) : window.matchesSelector = p
})(this, Element.prototype);
(function (f) {
    function h(c, d, a) {
        function b(a, l) {
            a && (this.element = a, this.layout = l, this.position = {x: 0, y: 0}, this._create())
        }

        for (var f = a("transition"), h = a("transform"), h = f && h, j = !!a("perspective"), u = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "otransitionend", transition: "transitionend"}[f], q = ["transform", "transition", "transitionDuration", "transitionProperty"], k = {}, r = 0, w = q.length; r < w; r++) {
            var s = q[r], g = a(s);
            g && g !== s && (k[s] = g)
        }
        a = b.prototype;
        c = c.prototype;
        for (var v in c)a[v] =
            c[v];
        b.prototype._create = function () {
            this.css({position: "absolute"})
        };
        b.prototype.handleEvent = function (a) {
            var l = "on" + a.type;
            if (this[l])this[l](a)
        };
        b.prototype.getSize = function () {
            this.size = d(this.element)
        };
        b.prototype.css = function (a) {
            var l = this.element.style, b;
            for (b in a)l[k[b] || b] = a[b]
        };
        b.prototype.getPosition = function () {
            var a = e(this.element), l = this.layout.options, b = l.isOriginLeft, l = l.isOriginTop, d = parseInt(a[b ? "left" : "right"], 10), a = parseInt(a[l ? "top" : "bottom"], 10), d = isNaN(d) ? 0 : d, a = isNaN(a) ? 0 : a, c =
                this.layout.size, d = d - (b ? c.paddingLeft : c.paddingRight), a = a - (l ? c.paddingTop : c.paddingBottom);
            this.position.x = d;
            this.position.y = a
        };
        b.prototype.layoutPosition = function () {
            var a = this.layout.size, l = this.layout.options, b = {};
            l.isOriginLeft ? (b.left = this.position.x + a.paddingLeft + "px", b.right = "") : (b.right = this.position.x + a.paddingRight + "px", b.left = "");
            l.isOriginTop ? (b.top = this.position.y + a.paddingTop + "px", b.bottom = "") : (b.bottom = this.position.y + a.paddingBottom + "px", b.top = "");
            this.css(b);
            this.emitEvent("layout",
                [this])
        };
        var t = j ? function (a, l) {
            return"translate3d(" + a + "px, " + l + "px, 0)"
        } : function (a, l) {
            return"translate(" + a + "px, " + l + "px)"
        };
        b.prototype._transitionTo = function (a, l) {
            this.getPosition();
            var b = this.position.x, d = this.position.y, c = parseInt(a, 10), e = parseInt(l, 10), c = c === this.position.x && e === this.position.y;
            this.setPosition(a, l);
            c && !this.isTransitioning ? this.layoutPosition() : (b = a - b, d = l - d, c = {}, e = this.layout.options, b = e.isOriginLeft ? b : -b, d = e.isOriginTop ? d : -d, c.transform = t(b, d), this.transition({to: c, onTransitionEnd: this.layoutPosition,
                isCleaning: !0}))
        };
        b.prototype.goTo = function (a, l) {
            this.setPosition(a, l);
            this.layoutPosition()
        };
        b.prototype.moveTo = h ? b.prototype._transitionTo : b.prototype.goTo;
        b.prototype.setPosition = function (a, l) {
            this.position.x = parseInt(a, 10);
            this.position.y = parseInt(l, 10)
        };
        b.prototype._nonTransition = function (a) {
            this.css(a.to);
            a.isCleaning && this._removeStyles(a.to);
            a.onTransitionEnd && a.onTransitionEnd.call(this)
        };
        b.prototype._transition = function (a) {
            var l = this.layout.options.transitionDuration;
            if (parseFloat(l)) {
                var b =
                    a.to, d = [], c;
                for (c in b)d.push(c);
                c = {};
                c.transitionProperty = d.join(",");
                c.transitionDuration = l;
                this.element.addEventListener(u, this, !1);
                if (a.isCleaning || a.onTransitionEnd)this.onTransitionEnd = function () {
                    a.isCleaning && this._removeStyles(b);
                    a.onTransitionEnd && a.onTransitionEnd.call(this)
                };
                a.from && this.css(a.from);
                this.css(c);
                this.css(b);
                this.isTransitioning = !0
            } else this._nonTransition(a)
        };
        b.prototype.transition = b.prototype[f ? "_transition" : "_nonTransition"];
        b.prototype.onwebkitTransitionEnd = function (a) {
            this.ontransitionend(a)
        };
        b.prototype.onotransitionend = function (a) {
            this.ontransitionend(a)
        };
        b.prototype.ontransitionend = function (a) {
            a.target === this.element && (this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1, this.onTransitionEnd && (this.onTransitionEnd.call(this), delete this.onTransitionEnd), this.emitEvent("transitionEnd", [this]))
        };
        b.prototype._removeStyles = function (a) {
            var l = {}, b;
            for (b in a)l[b] = "";
            this.css(l)
        };
        var l = {transitionProperty: "", transitionDuration: ""};
        b.prototype.removeTransitionStyles =
            function () {
                this.css(l)
            };
        b.prototype.removeElem = function () {
            this.element.parentNode.removeChild(this.element);
            this.emitEvent("remove", [this])
        };
        b.prototype.remove = function () {
            if (!f || !parseFloat(this.layout.options.transitionDuration))this.removeElem(); else {
                var a = this;
                this.on("transitionEnd", function () {
                    a.removeElem();
                    return!0
                });
                this.hide()
            }
        };
        b.prototype.reveal = function () {
            delete this.isHidden;
            this.css({display: ""});
            var a = this.layout.options;
            this.transition({from: a.hiddenStyle, to: a.visibleStyle, isCleaning: !0})
        };
        b.prototype.hide = function () {
            this.isHidden = !0;
            this.css({display: ""});
            var a = this.layout.options;
            this.transition({from: a.visibleStyle, to: a.hiddenStyle, isCleaning: !0, onTransitionEnd: function () {
                this.css({display: "none"})
            }})
        };
        b.prototype.destroy = function () {
            this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
        };
        return b
    }

    var j = document.defaultView, e = j && j.getComputedStyle ? function (c) {
        return j.getComputedStyle(c, null)
    } : function (c) {
        return c.currentStyle
    };
    "function" === typeof define &&
        define.amd ? define(["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], h) : (f.Outlayer = {}, f.Outlayer.Item = h(f.EventEmitter, f.getSize, f.getStyleProperty))
})(window);
(function (f) {
    function h(a, b) {
        for (var c in b)a[c] = b[c];
        return a
    }

    function j(a) {
        var b = [];
        if ("[object Array]" === n.call(a))b = a; else if (a && "number" === typeof a.length)for (var c = 0, d = a.length; c < d; c++)b.push(a[c]); else b.push(a);
        return b
    }

    function e(e, n, k, r, w, s) {
        function g(a, b) {
            "string" === typeof a && (a = c.querySelector(a));
            if (!a || !m(a))d && d.error("Bad " + this.settings.namespace + " element: " + a); else {
                this.element = a;
                this.options = h({}, this.options);
                this.option(b);
                var e = ++v;
                this.element.outlayerGUID = e;
                t[e] = this;
                this._create();
                this.options.isInitLayout && this.layout()
            }
        }

        var v = 0, t = {};
        g.prototype.settings = {namespace: "outlayer", item: s};
        g.prototype.options = {containerStyle: {position: "relative"}, isInitLayout: !0, isOriginLeft: !0, isOriginTop: !0, isResizeBound: !0, transitionDuration: "0.4s", hiddenStyle: {opacity: 0, transform: "scale(0.001)"}, visibleStyle: {opacity: 1, transform: "scale(1)"}};
        h(g.prototype, k.prototype);
        g.prototype.option = function (a) {
            h(this.options, a)
        };
        g.prototype._create = function () {
            this.reloadItems();
            this.stamps = [];
            this.stamp(this.options.stamp);
            h(this.element.style, this.options.containerStyle);
            this.options.isResizeBound && this.bindResize()
        };
        g.prototype.reloadItems = function () {
            this.items = this._getItems(this.element.children)
        };
        g.prototype._getItems = function (a) {
            a = this._filterFindItemElements(a);
            for (var b = this.settings.item, c = [], d = 0, e = a.length; d < e; d++) {
                var f = new b(a[d], this, this.options.itemOptions);
                c.push(f)
            }
            return c
        };
        g.prototype._filterFindItemElements = function (a) {
            a = j(a);
            for (var b = this.options.itemSelector, c = [], d = 0, e = a.length; d < e; d++) {
                var f =
                    a[d];
                if (m(f))if (b) {
                    w(f, b) && c.push(f);
                    for (var f = f.querySelectorAll(b), g = 0, h = f.length; g < h; g++)c.push(f[g])
                } else c.push(f)
            }
            return c
        };
        g.prototype.getItemElements = function () {
            for (var a = [], b = 0, c = this.items.length; b < c; b++)a.push(this.items[b].element);
            return a
        };
        g.prototype.layout = function () {
            this._resetLayout();
            this._manageStamps();
            this.layoutItems(this.items, void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited);
            this._isLayoutInited = !0
        };
        g.prototype._init = g.prototype.layout;
        g.prototype._resetLayout = function () {
            this.getSize()
        };
        g.prototype.getSize = function () {
            this.size = r(this.element)
        };
        g.prototype._getMeasurement = function (a, b) {
            var c = this.options[a], d;
            c ? ("string" === typeof c ? d = this.element.querySelector(c) : m(c) && (d = c), this[a] = d ? r(d)[b] : c) : this[a] = 0
        };
        g.prototype.layoutItems = function (a, b) {
            a = this._getItemsForLayout(a);
            this._layoutItems(a, b);
            this._postLayout()
        };
        g.prototype._getItemsForLayout = function (a) {
            for (var b = [], c = 0, d = a.length; c < d; c++) {
                var e = a[c];
                e.isIgnored || b.push(e)
            }
            return b
        };
        g.prototype._layoutItems = function (a, b) {
            if (!a || !a.length)this.emitEvent("layoutComplete", [this, a]); else {
                this._itemsOn(a, "layout", function () {
                    this.emitEvent("layoutComplete", [this, a])
                });
                for (var c = [], d = 0, e = a.length; d < e; d++) {
                    var f = a[d], g = this._getItemLayoutPosition(f);
                    g.item = f;
                    g.isInstant = b;
                    c.push(g)
                }
                this._processLayoutQueue(c)
            }
        };
        g.prototype._getItemLayoutPosition = function () {
            return{x: 0, y: 0}
        };
        g.prototype._processLayoutQueue = function (a) {
            for (var b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                this._positionItem(d.item,
                    d.x, d.y, d.isInstant)
            }
        };
        g.prototype._positionItem = function (a, b, c, d) {
            d ? a.goTo(b, c) : a.moveTo(b, c)
        };
        g.prototype._postLayout = function () {
            var a = this._getContainerSize();
            a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1))
        };
        g.prototype._getContainerSize = b;
        g.prototype._setContainerMeasure = function (a, b) {
            if (void 0 !== a) {
                var c = this.size;
                c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth);
                a = Math.max(a, 0);
                this.element.style[b ? "width" : "height"] = a + "px"
            }
        };
        g.prototype._itemsOn = function (a, b, c) {
            function d() {
                e++;
                e === f && c.call(g);
                return!0
            }

            for (var e = 0, f = a.length, g = this, h = 0, j = a.length; h < j; h++)a[h].on(b, d)
        };
        g.prototype.ignore = function (a) {
            if (a = this.getItem(a))a.isIgnored = !0
        };
        g.prototype.unignore = function (a) {
            (a = this.getItem(a)) && delete a.isIgnored
        };
        g.prototype.stamp = function (a) {
            if (a = this._find(a)) {
                this.stamps = this.stamps.concat(a);
                for (var b = 0, c = a.length; b < c; b++)this.ignore(a[b])
            }
        };
        g.prototype.unstamp =
            function (a) {
                if (a = this._find(a))for (var b = 0, c = a.length; b < c; b++) {
                    var d = a[b], e = p(this.stamps, d);
                    -1 !== e && this.stamps.splice(e, 1);
                    this.unignore(d)
                }
            };
        g.prototype._find = function (a) {
            if (a)return"string" === typeof a && (a = this.element.querySelectorAll(a)), a = j(a)
        };
        g.prototype._manageStamps = function () {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var a = 0, b = this.stamps.length; a < b; a++)this._manageStamp(this.stamps[a])
            }
        };
        g.prototype._getBoundingRect = function () {
            var a = this.element.getBoundingClientRect(),
                b = this.size;
            this._boundingRect = {left: a.left + b.paddingLeft + b.borderLeftWidth, top: a.top + b.paddingTop + b.borderTopWidth, right: a.right - (b.paddingRight + b.borderRightWidth), bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth)}
        };
        g.prototype._manageStamp = b;
        g.prototype._getElementOffset = function (a) {
            var b = a.getBoundingClientRect(), c = this._boundingRect;
            a = r(a);
            return{left: b.left - c.left - a.marginLeft, top: b.top - c.top - a.marginTop, right: c.right - b.right - a.marginRight, bottom: c.bottom - b.bottom - a.marginBottom}
        };
        g.prototype.handleEvent =
            function (a) {
                var b = "on" + a.type;
                if (this[b])this[b](a)
            };
        g.prototype.bindResize = function () {
            this.isResizeBound || (e.bind(f, "resize", this), this.isResizeBound = !0)
        };
        g.prototype.unbindResize = function () {
            e.unbind(f, "resize", this);
            this.isResizeBound = !1
        };
        g.prototype.onresize = function () {
            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var a = this;
            this.resizeTimeout = setTimeout(function () {
                a.resize()
            }, 100)
        };
        g.prototype.resize = function () {
            var a = r(this.element);
            this.size && a && a.innerWidth === this.size.innerWidth || (this.layout(),
                delete this.resizeTimeout)
        };
        g.prototype.addItems = function (a) {
            a = this._getItems(a);
            if (a.length)return this.items = this.items.concat(a), a
        };
        g.prototype.appended = function (a) {
            a = this.addItems(a);
            a.length && (this.layoutItems(a, !0), this.reveal(a))
        };
        g.prototype.prepended = function (a) {
            a = this._getItems(a);
            if (a.length) {
                var b = this.items.slice(0);
                this.items = a.concat(b);
                this._resetLayout();
                this.layoutItems(a, !0);
                this.reveal(a);
                this.layoutItems(b)
            }
        };
        g.prototype.reveal = function (a) {
            if (a && a.length)for (var b = 0, c = a.length; b <
                c; b++)a[b].reveal()
        };
        g.prototype.hide = function (a) {
            if (a && a.length)for (var b = 0, c = a.length; b < c; b++)a[b].hide()
        };
        g.prototype.getItem = function (a) {
            for (var b = 0, c = this.items.length; b < c; b++) {
                var d = this.items[b];
                if (d.element === a)return d
            }
        };
        g.prototype.getItems = function (a) {
            if (a && a.length) {
                for (var b = [], c = 0, d = a.length; c < d; c++) {
                    var e = this.getItem(a[c]);
                    e && b.push(e)
                }
                return b
            }
        };
        g.prototype.remove = function (a) {
            a = j(a);
            var b = this.getItems(a);
            if (b && b.length) {
                this._itemsOn(b, "remove", function () {
                    this.emitEvent("removeComplete",
                        [this, b])
                });
                a = 0;
                for (var c = b.length; a < c; a++) {
                    var d = b[a];
                    d.remove();
                    d = p(this.items, d);
                    this.items.splice(d, 1)
                }
            }
        };
        g.prototype.destroy = function () {
            var b = this.element.style;
            b.height = "";
            b.position = "";
            b.width = "";
            for (var b = 0, c = this.items.length; b < c; b++)this.items[b].destroy();
            this.unbindResize();
            delete this.element.outlayerGUID;
            a && a.removeData(this.element, this.settings.namespace)
        };
        g.data = function (a) {
            return(a = a && a.outlayerGUID) && t[a]
        };
        g.create = function (b, e) {
            function f() {
                g.apply(this, arguments)
            }

            h(f.prototype,
                g.prototype);
            f.prototype.options = h({}, g.prototype.options);
            f.prototype.settings = h({}, g.prototype.settings);
            h(f.prototype.options, e);
            f.prototype.settings.namespace = b;
            f.data = g.data;
            f.Item = function () {
                s.apply(this, arguments)
            };
            f.Item.prototype = new s;
            f.prototype.settings.item = f.Item;
            n(function () {
                for (var e = b.replace(/(.)([A-Z])/g,function (a, b, c) {
                    return b + "-" + c
                }).toLowerCase(), g = c.querySelectorAll(".js-" + e), e = "data-" + e + "-options", h = 0, j = g.length; h < j; h++) {
                    var k = g[h], m = k.getAttribute(e), n;
                    try {
                        n = m && JSON.parse(m)
                    } catch (u) {
                        d &&
                        d.error("Error parsing " + e + " on " + k.nodeName.toLowerCase() + (k.id ? "#" + k.id : "") + ": " + u);
                        continue
                    }
                    m = new f(k, n);
                    a && a.data(k, b, m)
                }
            });
            a && a.bridget && a.bridget(b, f);
            return f
        };
        g.Item = s;
        return g
    }

    var c = f.document, d = f.console, a = f.jQuery, b = function () {
    }, n = Object.prototype.toString, m = "object" === typeof HTMLElement ? function (a) {
        return a instanceof HTMLElement
    } : function (a) {
        return a && "object" === typeof a && 1 === a.nodeType && "string" === typeof a.nodeName
    }, p = Array.prototype.indexOf ? function (a, b) {
        return a.indexOf(b)
    } : function (a, b) {
        for (var c = 0, d = a.length; c < d; c++)if (a[c] === b)return c;
        return-1
    };
    "function" === typeof define && define.amd ? define("eventie/eventie doc-ready/doc-ready eventEmitter/EventEmitter get-size/get-size matches-selector/matches-selector ./item".split(" "), e) : f.Outlayer = e(f.eventie, f.docReady, f.EventEmitter, f.getSize, f.matchesSelector, f.Outlayer.Item)
})(window);
(function (f) {
    function h(e, c) {
        var d = e.create("masonry");
        d.prototype._resetLayout = function () {
            this.getSize();
            this._getMeasurement("columnWidth", "outerWidth");
            this._getMeasurement("gutter", "outerWidth");
            this.measureColumns();
            var a = this.cols;
            for (this.colYs = []; a--;)this.colYs.push(0);
            this.maxY = 0
        };
        d.prototype.measureColumns = function () {
            this.getContainerWidth();
            if (!this.columnWidth) {
                var a = this.items[0];
                this.columnWidth = (a = a && a.element) && c(a).outerWidth || this.containerWidth
            }
            this.columnWidth += this.gutter;
            this.cols =
                Math.floor((this.containerWidth + this.gutter) / this.columnWidth);
            this.cols = Math.max(this.cols, 1)
        };
        d.prototype.getContainerWidth = function () {
            var a = c(this.options.isFitWidth ? this.element.parentNode : this.element);
            this.containerWidth = a && a.innerWidth
        };
        d.prototype._getItemLayoutPosition = function (a) {
            a.getSize();
            var b = Math.ceil(a.size.outerWidth / this.columnWidth), b = Math.min(b, this.cols), c = this._getColGroup(b), d = Math.min.apply(Math, c), b = j(c, d), e = {x: this.columnWidth * b, y: d};
            a = d + a.size.outerHeight;
            c = this.cols + 1 -
                c.length;
            for (d = 0; d < c; d++)this.colYs[b + d] = a;
            return e
        };
        d.prototype._getColGroup = function (a) {
            if (2 > a)return this.colYs;
            for (var b = [], c = this.cols + 1 - a, d = 0; d < c; d++) {
                var e = this.colYs.slice(d, d + a);
                b[d] = Math.max.apply(Math, e)
            }
            return b
        };
        d.prototype._manageStamp = function (a) {
            var b = c(a);
            a = this._getElementOffset(a);
            var d = this.options.isOriginLeft ? a.left : a.right, e = d + b.outerWidth, d = Math.floor(d / this.columnWidth), d = Math.max(0, d), e = Math.floor(e / this.columnWidth), e = Math.min(this.cols - 1, e), b = (this.options.isOriginTop ?
                a.top : a.bottom) + b.outerHeight;
            for (a = d; a <= e; a++)this.colYs[a] = Math.max(b, this.colYs[a])
        };
        d.prototype._getContainerSize = function () {
            this.maxY = Math.max.apply(Math, this.colYs);
            var a = {height: this.maxY};
            this.options.isFitWidth && (a.width = this._getContainerFitWidth());
            return a
        };
        d.prototype._getContainerFitWidth = function () {
            for (var a = 0, b = this.cols; --b && 0 === this.colYs[b];)a++;
            return(this.cols - a) * this.columnWidth - this.gutter
        };
        d.prototype.resize = function () {
            var a = this.containerWidth;
            this.getContainerWidth();
            a !==
                this.containerWidth && this.layout()
        };
        return d
    }

    var j = Array.prototype.indexOf ? function (e, c) {
        return e.indexOf(c)
    } : function (e, c) {
        for (var d = 0, a = e.length; d < a; d++)if (e[d] === c)return d;
        return-1
    };
    "function" === typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], h) : f.Masonry = h(f.Outlayer, f.getSize)
})(window);
