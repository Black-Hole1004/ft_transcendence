import {
	j as k,
	r as D,
	c as ai,
	g as fe,
	R as _,
	L as uy,
} from './index-CZOGhjFl.js';
import { H as sy } from './Header-3Ry2d7os.js';
import './Button-5ZxX_AXj.js';
function Wr() {
	return k.jsxs('div', {
		className: `flex justify-between
		bg-[rgba(121,118,110,0.2)] backdrop-blur-ms rounded-lg match-infos`,
		children: [
			k.jsxs('div', {
				className: 'flex items-center gap-2',
				children: [
					k.jsx('img', {
						src: './assets/images/moudrib.jpeg',
						className: 'border border-online match-winner',
						alt: 'player image',
					}),
					k.jsxs('div', {
						className: 'points flex',
						children: [
							k.jsx('img', {
								src: './assets/images/Achievements/celestial-master.png',
								alt: 'achievement badge',
							}),
							k.jsx('p', {
								className: 'text-online self-end',
								children: '+45',
							}),
						],
					}),
				],
			}),
			k.jsxs('div', {
				className: 'flex flex-col items-center justify-center result',
				children: [
					k.jsx('p', {
						className: 'font-dreamscape-sans text-online',
						children: 'victory',
					}),
					k.jsx('p', {
						className: 'font-dreamscape text-primary',
						children: '7 - 0',
					}),
				],
			}),
			k.jsxs('div', {
				className: 'flex items-center gap-2',
				children: [
					k.jsxs('div', {
						className: 'points flex',
						children: [
							k.jsx('p', {
								className: 'text-defeat self-end',
								children: '-33',
							}),
							k.jsx('img', {
								src: './assets/images/Achievements/celestial-master.png',
								alt: 'achievement badge',
							}),
						],
					}),
					k.jsx('img', {
						src: './assets/images/moudrib.jpeg',
						className: 'border border-defeat match-loser',
						alt: 'player image',
					}),
				],
			}),
		],
	});
}
function cy() {
	return k.jsxs('div', {
		className: 'flex items-center',
		children: [
			k.jsx('div', {
				children: k.jsx('img', {
					src: './assets/images/moudrib.jpeg',
					className:
						'profile-image rounded-full lg:border-2 border border-primary select-none',
					alt: 'profile image',
				}),
			}),
			k.jsxs('div', {
				className:
					'flex flex-col text-primary max-w-[50%] lg:gap-y-3 gap-y-1 font-medium',
				children: [
					k.jsx('p', { className: 'titles', children: 'BIO' }),
					k.jsx('p', {
						className: 'bio-content',
						children:
							'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum hic magnam sequi odit ad, nobis molestiae, quaerat adipisci accusamus quibusdam ipsum, possimus eveniet similique deserunt eius porro nam ab dignissimos.',
					}),
				],
			}),
		],
	});
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */ var To =
	function (e, t) {
		return (
			(To =
				Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array &&
					function (r, n) {
						r.__proto__ = n;
					}) ||
				function (r, n) {
					for (var i in n) n.hasOwnProperty(i) && (r[i] = n[i]);
				}),
			To(e, t)
		);
	};
function ly(e, t) {
	To(e, t);
	function r() {
		this.constructor = e;
	}
	e.prototype =
		t === null ? Object.create(t) : ((r.prototype = t.prototype), new r());
}
var fy = 100,
	hy = 100,
	rc = 50,
	Eo = 50,
	jo = 50;
function nc(e) {
	var t = e.className,
		r = e.counterClockwise,
		n = e.dashRatio,
		i = e.pathRadius,
		a = e.strokeWidth,
		o = e.style;
	return D.createElement('path', {
		className: t,
		style: Object.assign(
			{},
			o,
			dy({ pathRadius: i, dashRatio: n, counterClockwise: r }),
		),
		d: py({ pathRadius: i, counterClockwise: r }),
		strokeWidth: a,
		fillOpacity: 0,
	});
}
function py(e) {
	var t = e.pathRadius,
		r = e.counterClockwise,
		n = t,
		i = r ? 1 : 0;
	return (
		`
      M ` +
		Eo +
		',' +
		jo +
		`
      m 0,-` +
		n +
		`
      a ` +
		n +
		',' +
		n +
		' ' +
		i +
		' 1 1 0,' +
		2 * n +
		`
      a ` +
		n +
		',' +
		n +
		' ' +
		i +
		' 1 1 0,-' +
		2 * n +
		`
    `
	);
}
function dy(e) {
	var t = e.counterClockwise,
		r = e.dashRatio,
		n = e.pathRadius,
		i = Math.PI * 2 * n,
		a = (1 - r) * i;
	return {
		strokeDasharray: i + 'px ' + i + 'px',
		strokeDashoffset: (t ? -a : a) + 'px',
	};
}
var vy = (function (e) {
	ly(t, e);
	function t() {
		return (e !== null && e.apply(this, arguments)) || this;
	}
	return (
		(t.prototype.getBackgroundPadding = function () {
			return this.props.background ? this.props.backgroundPadding : 0;
		}),
		(t.prototype.getPathRadius = function () {
			return (
				rc - this.props.strokeWidth / 2 - this.getBackgroundPadding()
			);
		}),
		(t.prototype.getPathRatio = function () {
			var r = this.props,
				n = r.value,
				i = r.minValue,
				a = r.maxValue,
				o = Math.min(Math.max(n, i), a);
			return (o - i) / (a - i);
		}),
		(t.prototype.render = function () {
			var r = this.props,
				n = r.circleRatio,
				i = r.className,
				a = r.classes,
				o = r.counterClockwise,
				u = r.styles,
				s = r.strokeWidth,
				c = r.text,
				f = this.getPathRadius(),
				l = this.getPathRatio();
			return D.createElement(
				'svg',
				{
					className: a.root + ' ' + i,
					style: u.root,
					viewBox: '0 0 ' + fy + ' ' + hy,
					'data-test-id': 'CircularProgressbar',
				},
				this.props.background
					? D.createElement('circle', {
							className: a.background,
							style: u.background,
							cx: Eo,
							cy: jo,
							r: rc,
						})
					: null,
				D.createElement(nc, {
					className: a.trail,
					counterClockwise: o,
					dashRatio: n,
					pathRadius: f,
					strokeWidth: s,
					style: u.trail,
				}),
				D.createElement(nc, {
					className: a.path,
					counterClockwise: o,
					dashRatio: l * n,
					pathRadius: f,
					strokeWidth: s,
					style: u.path,
				}),
				c
					? D.createElement(
							'text',
							{ className: a.text, style: u.text, x: Eo, y: jo },
							c,
						)
					: null,
			);
		}),
		(t.defaultProps = {
			background: !1,
			backgroundPadding: 0,
			circleRatio: 1,
			classes: {
				root: 'CircularProgressbar',
				trail: 'CircularProgressbar-trail',
				path: 'CircularProgressbar-path',
				text: 'CircularProgressbar-text',
				background: 'CircularProgressbar-background',
			},
			counterClockwise: !1,
			className: '',
			maxValue: 100,
			minValue: 0,
			strokeWidth: 8,
			styles: { root: {}, trail: {}, path: {}, text: {}, background: {} },
			text: '',
		}),
		t
	);
})(D.Component);
function ic({ value: e }) {
	return k.jsx(vy, {
		value: e,
		text: `${e}%`,
		styles: {
			trail: { stroke: '#79624C' },
			path: {
				stroke: '#FFCE9E',
				transition: 'stroke-dashoffset 3s ease 0s',
			},
			text: {
				fill: '#FBFBEE',
				fontSize: 'clamp(0.625rem, 0.221vw + 0.584rem, 0.938rem)',
			},
		},
	});
}
function yy() {
	return k.jsxs('div', {
		className: 'flex flex-col items-center gap-2',
		children: [
			k.jsx('p', {
				className: 'titles self-start max-mtb:ml-3',
				children: 'About',
			}),
			k.jsxs('div', {
				className:
					'about rounded-xl flex flex-col justify-around font-medium text-primary max-ms:w-full',
				children: [
					k.jsxs('div', {
						className: 'line1 flex justify-between items-center',
						children: [
							k.jsxs('div', {
								className: 'flex items-center gap-3',
								children: [
									k.jsx('img', {
										src: './assets/images/icons/Name.svg',
										className: 'select-none',
										alt: '',
									}),
									k.jsx('p', { children: 'Full Name' }),
								],
							}),
							k.jsx('div', {
								children: k.jsx('p', {
									children: 'Mouad Oudrib',
								}),
							}),
						],
					}),
					k.jsxs('div', {
						className: 'line2 flex justify-between items-center',
						children: [
							k.jsxs('div', {
								className: 'flex items-center gap-3',
								children: [
									k.jsx('img', {
										src: './assets/images/icons/username.svg',
										className: 'select-none',
										alt: '',
									}),
									k.jsx('p', { children: 'Username' }),
								],
							}),
							k.jsx('div', {
								children: k.jsx('p', { children: 'moudrib' }),
							}),
						],
					}),
					k.jsxs('div', {
						className: 'line3 flex justify-between items-center',
						children: [
							k.jsxs('div', {
								className: 'flex items-center gap-3',
								children: [
									k.jsx('img', {
										src: './assets/images/icons/Email.svg',
										className: 'select-none',
										alt: '',
									}),
									k.jsx('p', { children: 'Email' }),
								],
							}),
							k.jsx('div', {
								children: k.jsx('p', {
									children: 'transcendence@gmail.com',
								}),
							}),
						],
					}),
					k.jsxs('div', {
						className: 'line4 flex justify-between items-center',
						children: [
							k.jsxs('div', {
								className: 'flex items-center gap-3',
								children: [
									k.jsx('img', {
										src: './assets/images/icons/Calendar.svg',
										className: 'select-none',
										alt: '',
									}),
									k.jsx('p', { children: 'Joined' }),
								],
							}),
							k.jsx('div', {
								children: k.jsx('p', {
									children: 'April 2024',
								}),
							}),
						],
					}),
					k.jsxs('div', {
						className: 'line5 flex justify-between items-center',
						children: [
							k.jsxs('div', {
								className: 'flex items-center gap-3',
								children: [
									k.jsx('img', {
										src: './assets/images/icons/Phone.svg',
										className: 'select-none',
										alt: '',
									}),
									k.jsx('p', { children: 'Phone' }),
								],
							}),
							k.jsx('div', {
								children: k.jsx('p', {
									children: '+212611223344',
								}),
							}),
						],
					}),
				],
			}),
		],
	});
}
function Xh(e) {
	var t,
		r,
		n = '';
	if (typeof e == 'string' || typeof e == 'number') n += e;
	else if (typeof e == 'object')
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++)
				e[t] && (r = Xh(e[t])) && (n && (n += ' '), (n += r));
		} else for (r in e) e[r] && (n && (n += ' '), (n += r));
	return n;
}
function ne() {
	for (var e, t, r = 0, n = '', i = arguments.length; r < i; r++)
		(e = arguments[r]) && (t = Xh(e)) && (n && (n += ' '), (n += t));
	return n;
}
var my = Array.isArray,
	Ne = my,
	gy = typeof ai == 'object' && ai && ai.Object === Object && ai,
	Vh = gy,
	by = Vh,
	xy = typeof self == 'object' && self && self.Object === Object && self,
	wy = by || xy || Function('return this')(),
	lt = wy,
	Oy = lt,
	Sy = Oy.Symbol,
	Xn = Sy,
	ac = Xn,
	Yh = Object.prototype,
	Ay = Yh.hasOwnProperty,
	_y = Yh.toString,
	Ur = ac ? ac.toStringTag : void 0;
function Py(e) {
	var t = Ay.call(e, Ur),
		r = e[Ur];
	try {
		e[Ur] = void 0;
		var n = !0;
	} catch {}
	var i = _y.call(e);
	return n && (t ? (e[Ur] = r) : delete e[Ur]), i;
}
var $y = Py,
	Ty = Object.prototype,
	Ey = Ty.toString;
function jy(e) {
	return Ey.call(e);
}
var My = jy,
	oc = Xn,
	Cy = $y,
	ky = My,
	Iy = '[object Null]',
	Ny = '[object Undefined]',
	uc = oc ? oc.toStringTag : void 0;
function Dy(e) {
	return e == null
		? e === void 0
			? Ny
			: Iy
		: uc && uc in Object(e)
			? Cy(e)
			: ky(e);
}
var Ot = Dy;
function By(e) {
	return e != null && typeof e == 'object';
}
var St = By,
	Ly = Ot,
	Ry = St,
	Fy = '[object Symbol]';
function Wy(e) {
	return typeof e == 'symbol' || (Ry(e) && Ly(e) == Fy);
}
var $r = Wy,
	Uy = Ne,
	zy = $r,
	qy = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	Hy = /^\w*$/;
function Ky(e, t) {
	if (Uy(e)) return !1;
	var r = typeof e;
	return r == 'number' ||
		r == 'symbol' ||
		r == 'boolean' ||
		e == null ||
		zy(e)
		? !0
		: Hy.test(e) || !qy.test(e) || (t != null && e in Object(t));
}
var Yu = Ky;
function Gy(e) {
	var t = typeof e;
	return e != null && (t == 'object' || t == 'function');
}
var Mt = Gy;
const Tr = fe(Mt);
var Xy = Ot,
	Vy = Mt,
	Yy = '[object AsyncFunction]',
	Zy = '[object Function]',
	Jy = '[object GeneratorFunction]',
	Qy = '[object Proxy]';
function em(e) {
	if (!Vy(e)) return !1;
	var t = Xy(e);
	return t == Zy || t == Jy || t == Yy || t == Qy;
}
var Zu = em;
const Z = fe(Zu);
var tm = lt,
	rm = tm['__core-js_shared__'],
	nm = rm,
	Ja = nm,
	sc = (function () {
		var e = /[^.]+$/.exec((Ja && Ja.keys && Ja.keys.IE_PROTO) || '');
		return e ? 'Symbol(src)_1.' + e : '';
	})();
function im(e) {
	return !!sc && sc in e;
}
var am = im,
	om = Function.prototype,
	um = om.toString;
function sm(e) {
	if (e != null) {
		try {
			return um.call(e);
		} catch {}
		try {
			return e + '';
		} catch {}
	}
	return '';
}
var Zh = sm,
	cm = Zu,
	lm = am,
	fm = Mt,
	hm = Zh,
	pm = /[\\^$.*+?()[\]{}|]/g,
	dm = /^\[object .+?Constructor\]$/,
	vm = Function.prototype,
	ym = Object.prototype,
	mm = vm.toString,
	gm = ym.hasOwnProperty,
	bm = RegExp(
		'^' +
			mm
				.call(gm)
				.replace(pm, '\\$&')
				.replace(
					/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
					'$1.*?',
				) +
			'$',
	);
function xm(e) {
	if (!fm(e) || lm(e)) return !1;
	var t = cm(e) ? bm : dm;
	return t.test(hm(e));
}
var wm = xm;
function Om(e, t) {
	return e == null ? void 0 : e[t];
}
var Sm = Om,
	Am = wm,
	_m = Sm;
function Pm(e, t) {
	var r = _m(e, t);
	return Am(r) ? r : void 0;
}
var er = Pm,
	$m = er,
	Tm = $m(Object, 'create'),
	pa = Tm,
	cc = pa;
function Em() {
	(this.__data__ = cc ? cc(null) : {}), (this.size = 0);
}
var jm = Em;
function Mm(e) {
	var t = this.has(e) && delete this.__data__[e];
	return (this.size -= t ? 1 : 0), t;
}
var Cm = Mm,
	km = pa,
	Im = '__lodash_hash_undefined__',
	Nm = Object.prototype,
	Dm = Nm.hasOwnProperty;
function Bm(e) {
	var t = this.__data__;
	if (km) {
		var r = t[e];
		return r === Im ? void 0 : r;
	}
	return Dm.call(t, e) ? t[e] : void 0;
}
var Lm = Bm,
	Rm = pa,
	Fm = Object.prototype,
	Wm = Fm.hasOwnProperty;
function Um(e) {
	var t = this.__data__;
	return Rm ? t[e] !== void 0 : Wm.call(t, e);
}
var zm = Um,
	qm = pa,
	Hm = '__lodash_hash_undefined__';
function Km(e, t) {
	var r = this.__data__;
	return (
		(this.size += this.has(e) ? 0 : 1),
		(r[e] = qm && t === void 0 ? Hm : t),
		this
	);
}
var Gm = Km,
	Xm = jm,
	Vm = Cm,
	Ym = Lm,
	Zm = zm,
	Jm = Gm;
function Er(e) {
	var t = -1,
		r = e == null ? 0 : e.length;
	for (this.clear(); ++t < r; ) {
		var n = e[t];
		this.set(n[0], n[1]);
	}
}
Er.prototype.clear = Xm;
Er.prototype.delete = Vm;
Er.prototype.get = Ym;
Er.prototype.has = Zm;
Er.prototype.set = Jm;
var Qm = Er;
function eg() {
	(this.__data__ = []), (this.size = 0);
}
var tg = eg;
function rg(e, t) {
	return e === t || (e !== e && t !== t);
}
var Ju = rg,
	ng = Ju;
function ig(e, t) {
	for (var r = e.length; r--; ) if (ng(e[r][0], t)) return r;
	return -1;
}
var da = ig,
	ag = da,
	og = Array.prototype,
	ug = og.splice;
function sg(e) {
	var t = this.__data__,
		r = ag(t, e);
	if (r < 0) return !1;
	var n = t.length - 1;
	return r == n ? t.pop() : ug.call(t, r, 1), --this.size, !0;
}
var cg = sg,
	lg = da;
function fg(e) {
	var t = this.__data__,
		r = lg(t, e);
	return r < 0 ? void 0 : t[r][1];
}
var hg = fg,
	pg = da;
function dg(e) {
	return pg(this.__data__, e) > -1;
}
var vg = dg,
	yg = da;
function mg(e, t) {
	var r = this.__data__,
		n = yg(r, e);
	return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
}
var gg = mg,
	bg = tg,
	xg = cg,
	wg = hg,
	Og = vg,
	Sg = gg;
function jr(e) {
	var t = -1,
		r = e == null ? 0 : e.length;
	for (this.clear(); ++t < r; ) {
		var n = e[t];
		this.set(n[0], n[1]);
	}
}
jr.prototype.clear = bg;
jr.prototype.delete = xg;
jr.prototype.get = wg;
jr.prototype.has = Og;
jr.prototype.set = Sg;
var va = jr,
	Ag = er,
	_g = lt,
	Pg = Ag(_g, 'Map'),
	Qu = Pg,
	lc = Qm,
	$g = va,
	Tg = Qu;
function Eg() {
	(this.size = 0),
		(this.__data__ = {
			hash: new lc(),
			map: new (Tg || $g)(),
			string: new lc(),
		});
}
var jg = Eg;
function Mg(e) {
	var t = typeof e;
	return t == 'string' || t == 'number' || t == 'symbol' || t == 'boolean'
		? e !== '__proto__'
		: e === null;
}
var Cg = Mg,
	kg = Cg;
function Ig(e, t) {
	var r = e.__data__;
	return kg(t) ? r[typeof t == 'string' ? 'string' : 'hash'] : r.map;
}
var ya = Ig,
	Ng = ya;
function Dg(e) {
	var t = Ng(this, e).delete(e);
	return (this.size -= t ? 1 : 0), t;
}
var Bg = Dg,
	Lg = ya;
function Rg(e) {
	return Lg(this, e).get(e);
}
var Fg = Rg,
	Wg = ya;
function Ug(e) {
	return Wg(this, e).has(e);
}
var zg = Ug,
	qg = ya;
function Hg(e, t) {
	var r = qg(this, e),
		n = r.size;
	return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
}
var Kg = Hg,
	Gg = jg,
	Xg = Bg,
	Vg = Fg,
	Yg = zg,
	Zg = Kg;
function Mr(e) {
	var t = -1,
		r = e == null ? 0 : e.length;
	for (this.clear(); ++t < r; ) {
		var n = e[t];
		this.set(n[0], n[1]);
	}
}
Mr.prototype.clear = Gg;
Mr.prototype.delete = Xg;
Mr.prototype.get = Vg;
Mr.prototype.has = Yg;
Mr.prototype.set = Zg;
var es = Mr,
	Jh = es,
	Jg = 'Expected a function';
function ts(e, t) {
	if (typeof e != 'function' || (t != null && typeof t != 'function'))
		throw new TypeError(Jg);
	var r = function () {
		var n = arguments,
			i = t ? t.apply(this, n) : n[0],
			a = r.cache;
		if (a.has(i)) return a.get(i);
		var o = e.apply(this, n);
		return (r.cache = a.set(i, o) || a), o;
	};
	return (r.cache = new (ts.Cache || Jh)()), r;
}
ts.Cache = Jh;
var Qh = ts;
const Qg = fe(Qh);
var eb = Qh,
	tb = 500;
function rb(e) {
	var t = eb(e, function (n) {
			return r.size === tb && r.clear(), n;
		}),
		r = t.cache;
	return t;
}
var nb = rb,
	ib = nb,
	ab =
		/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
	ob = /\\(\\)?/g,
	ub = ib(function (e) {
		var t = [];
		return (
			e.charCodeAt(0) === 46 && t.push(''),
			e.replace(ab, function (r, n, i, a) {
				t.push(i ? a.replace(ob, '$1') : n || r);
			}),
			t
		);
	}),
	sb = ub;
function cb(e, t) {
	for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
		i[r] = t(e[r], r, e);
	return i;
}
var rs = cb,
	fc = Xn,
	lb = rs,
	fb = Ne,
	hb = $r,
	pb = 1 / 0,
	hc = fc ? fc.prototype : void 0,
	pc = hc ? hc.toString : void 0;
function ep(e) {
	if (typeof e == 'string') return e;
	if (fb(e)) return lb(e, ep) + '';
	if (hb(e)) return pc ? pc.call(e) : '';
	var t = e + '';
	return t == '0' && 1 / e == -pb ? '-0' : t;
}
var db = ep,
	vb = db;
function yb(e) {
	return e == null ? '' : vb(e);
}
var tp = yb,
	mb = Ne,
	gb = Yu,
	bb = sb,
	xb = tp;
function wb(e, t) {
	return mb(e) ? e : gb(e, t) ? [e] : bb(xb(e));
}
var rp = wb,
	Ob = $r,
	Sb = 1 / 0;
function Ab(e) {
	if (typeof e == 'string' || Ob(e)) return e;
	var t = e + '';
	return t == '0' && 1 / e == -Sb ? '-0' : t;
}
var ma = Ab,
	_b = rp,
	Pb = ma;
function $b(e, t) {
	t = _b(t, e);
	for (var r = 0, n = t.length; e != null && r < n; ) e = e[Pb(t[r++])];
	return r && r == n ? e : void 0;
}
var ns = $b,
	Tb = ns;
function Eb(e, t, r) {
	var n = e == null ? void 0 : Tb(e, t);
	return n === void 0 ? r : n;
}
var np = Eb;
const Xe = fe(np);
function jb(e) {
	return e == null;
}
var Mb = jb;
const ee = fe(Mb);
var Cb = Ot,
	kb = Ne,
	Ib = St,
	Nb = '[object String]';
function Db(e) {
	return typeof e == 'string' || (!kb(e) && Ib(e) && Cb(e) == Nb);
}
var Bb = Db;
const Vn = fe(Bb);
var ip = { exports: {} },
	ae = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Se = typeof Symbol == 'function' && Symbol.for,
	is = Se ? Symbol.for('react.element') : 60103,
	as = Se ? Symbol.for('react.portal') : 60106,
	ga = Se ? Symbol.for('react.fragment') : 60107,
	ba = Se ? Symbol.for('react.strict_mode') : 60108,
	xa = Se ? Symbol.for('react.profiler') : 60114,
	wa = Se ? Symbol.for('react.provider') : 60109,
	Oa = Se ? Symbol.for('react.context') : 60110,
	os = Se ? Symbol.for('react.async_mode') : 60111,
	Sa = Se ? Symbol.for('react.concurrent_mode') : 60111,
	Aa = Se ? Symbol.for('react.forward_ref') : 60112,
	_a = Se ? Symbol.for('react.suspense') : 60113,
	Lb = Se ? Symbol.for('react.suspense_list') : 60120,
	Pa = Se ? Symbol.for('react.memo') : 60115,
	$a = Se ? Symbol.for('react.lazy') : 60116,
	Rb = Se ? Symbol.for('react.block') : 60121,
	Fb = Se ? Symbol.for('react.fundamental') : 60117,
	Wb = Se ? Symbol.for('react.responder') : 60118,
	Ub = Se ? Symbol.for('react.scope') : 60119;
function We(e) {
	if (typeof e == 'object' && e !== null) {
		var t = e.$$typeof;
		switch (t) {
			case is:
				switch (((e = e.type), e)) {
					case os:
					case Sa:
					case ga:
					case xa:
					case ba:
					case _a:
						return e;
					default:
						switch (((e = e && e.$$typeof), e)) {
							case Oa:
							case Aa:
							case $a:
							case Pa:
							case wa:
								return e;
							default:
								return t;
						}
				}
			case as:
				return t;
		}
	}
}
function ap(e) {
	return We(e) === Sa;
}
ae.AsyncMode = os;
ae.ConcurrentMode = Sa;
ae.ContextConsumer = Oa;
ae.ContextProvider = wa;
ae.Element = is;
ae.ForwardRef = Aa;
ae.Fragment = ga;
ae.Lazy = $a;
ae.Memo = Pa;
ae.Portal = as;
ae.Profiler = xa;
ae.StrictMode = ba;
ae.Suspense = _a;
ae.isAsyncMode = function (e) {
	return ap(e) || We(e) === os;
};
ae.isConcurrentMode = ap;
ae.isContextConsumer = function (e) {
	return We(e) === Oa;
};
ae.isContextProvider = function (e) {
	return We(e) === wa;
};
ae.isElement = function (e) {
	return typeof e == 'object' && e !== null && e.$$typeof === is;
};
ae.isForwardRef = function (e) {
	return We(e) === Aa;
};
ae.isFragment = function (e) {
	return We(e) === ga;
};
ae.isLazy = function (e) {
	return We(e) === $a;
};
ae.isMemo = function (e) {
	return We(e) === Pa;
};
ae.isPortal = function (e) {
	return We(e) === as;
};
ae.isProfiler = function (e) {
	return We(e) === xa;
};
ae.isStrictMode = function (e) {
	return We(e) === ba;
};
ae.isSuspense = function (e) {
	return We(e) === _a;
};
ae.isValidElementType = function (e) {
	return (
		typeof e == 'string' ||
		typeof e == 'function' ||
		e === ga ||
		e === Sa ||
		e === xa ||
		e === ba ||
		e === _a ||
		e === Lb ||
		(typeof e == 'object' &&
			e !== null &&
			(e.$$typeof === $a ||
				e.$$typeof === Pa ||
				e.$$typeof === wa ||
				e.$$typeof === Oa ||
				e.$$typeof === Aa ||
				e.$$typeof === Fb ||
				e.$$typeof === Wb ||
				e.$$typeof === Ub ||
				e.$$typeof === Rb))
	);
};
ae.typeOf = We;
ip.exports = ae;
var Mo = ip.exports,
	zb = Ot,
	qb = St,
	Hb = '[object Number]';
function Kb(e) {
	return typeof e == 'number' || (qb(e) && zb(e) == Hb);
}
var op = Kb;
const Gb = fe(op);
var Xb = op;
function Vb(e) {
	return Xb(e) && e != +e;
}
var Yb = Vb;
const Cr = fe(Yb);
var et = function (t) {
		return t === 0 ? 0 : t > 0 ? 1 : -1;
	},
	zt = function (t) {
		return Vn(t) && t.indexOf('%') === t.length - 1;
	},
	F = function (t) {
		return Gb(t) && !Cr(t);
	},
	be = function (t) {
		return F(t) || Vn(t);
	},
	Zb = 0,
	Yn = function (t) {
		var r = ++Zb;
		return ''.concat(t || '').concat(r);
	},
	Zt = function (t, r) {
		var n =
				arguments.length > 2 && arguments[2] !== void 0
					? arguments[2]
					: 0,
			i =
				arguments.length > 3 && arguments[3] !== void 0
					? arguments[3]
					: !1;
		if (!F(t) && !Vn(t)) return n;
		var a;
		if (zt(t)) {
			var o = t.indexOf('%');
			a = (r * parseFloat(t.slice(0, o))) / 100;
		} else a = +t;
		return Cr(a) && (a = n), i && a > r && (a = r), a;
	},
	ar = function (t) {
		if (!t) return null;
		var r = Object.keys(t);
		return r && r.length ? t[r[0]] : null;
	},
	Jb = function (t) {
		if (!Array.isArray(t)) return !1;
		for (var r = t.length, n = {}, i = 0; i < r; i++)
			if (!n[t[i]]) n[t[i]] = !0;
			else return !0;
		return !1;
	},
	He = function (t, r) {
		return F(t) && F(r)
			? function (n) {
					return t + n * (r - t);
				}
			: function () {
					return r;
				};
	};
function xi(e, t, r) {
	return !e || !e.length
		? null
		: e.find(function (n) {
				return n && (typeof t == 'function' ? t(n) : Xe(n, t)) === r;
			});
}
function sr(e, t) {
	for (var r in e)
		if (
			{}.hasOwnProperty.call(e, r) &&
			(!{}.hasOwnProperty.call(t, r) || e[r] !== t[r])
		)
			return !1;
	for (var n in t)
		if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n))
			return !1;
	return !0;
}
function Co(e) {
	'@babel/helpers - typeof';
	return (
		(Co =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Co(e)
	);
}
var Qb = ['viewBox', 'children'],
	e0 = [
		'aria-activedescendant',
		'aria-atomic',
		'aria-autocomplete',
		'aria-busy',
		'aria-checked',
		'aria-colcount',
		'aria-colindex',
		'aria-colspan',
		'aria-controls',
		'aria-current',
		'aria-describedby',
		'aria-details',
		'aria-disabled',
		'aria-errormessage',
		'aria-expanded',
		'aria-flowto',
		'aria-haspopup',
		'aria-hidden',
		'aria-invalid',
		'aria-keyshortcuts',
		'aria-label',
		'aria-labelledby',
		'aria-level',
		'aria-live',
		'aria-modal',
		'aria-multiline',
		'aria-multiselectable',
		'aria-orientation',
		'aria-owns',
		'aria-placeholder',
		'aria-posinset',
		'aria-pressed',
		'aria-readonly',
		'aria-relevant',
		'aria-required',
		'aria-roledescription',
		'aria-rowcount',
		'aria-rowindex',
		'aria-rowspan',
		'aria-selected',
		'aria-setsize',
		'aria-sort',
		'aria-valuemax',
		'aria-valuemin',
		'aria-valuenow',
		'aria-valuetext',
		'className',
		'color',
		'height',
		'id',
		'lang',
		'max',
		'media',
		'method',
		'min',
		'name',
		'style',
		'target',
		'width',
		'role',
		'tabIndex',
		'accentHeight',
		'accumulate',
		'additive',
		'alignmentBaseline',
		'allowReorder',
		'alphabetic',
		'amplitude',
		'arabicForm',
		'ascent',
		'attributeName',
		'attributeType',
		'autoReverse',
		'azimuth',
		'baseFrequency',
		'baselineShift',
		'baseProfile',
		'bbox',
		'begin',
		'bias',
		'by',
		'calcMode',
		'capHeight',
		'clip',
		'clipPath',
		'clipPathUnits',
		'clipRule',
		'colorInterpolation',
		'colorInterpolationFilters',
		'colorProfile',
		'colorRendering',
		'contentScriptType',
		'contentStyleType',
		'cursor',
		'cx',
		'cy',
		'd',
		'decelerate',
		'descent',
		'diffuseConstant',
		'direction',
		'display',
		'divisor',
		'dominantBaseline',
		'dur',
		'dx',
		'dy',
		'edgeMode',
		'elevation',
		'enableBackground',
		'end',
		'exponent',
		'externalResourcesRequired',
		'fill',
		'fillOpacity',
		'fillRule',
		'filter',
		'filterRes',
		'filterUnits',
		'floodColor',
		'floodOpacity',
		'focusable',
		'fontFamily',
		'fontSize',
		'fontSizeAdjust',
		'fontStretch',
		'fontStyle',
		'fontVariant',
		'fontWeight',
		'format',
		'from',
		'fx',
		'fy',
		'g1',
		'g2',
		'glyphName',
		'glyphOrientationHorizontal',
		'glyphOrientationVertical',
		'glyphRef',
		'gradientTransform',
		'gradientUnits',
		'hanging',
		'horizAdvX',
		'horizOriginX',
		'href',
		'ideographic',
		'imageRendering',
		'in2',
		'in',
		'intercept',
		'k1',
		'k2',
		'k3',
		'k4',
		'k',
		'kernelMatrix',
		'kernelUnitLength',
		'kerning',
		'keyPoints',
		'keySplines',
		'keyTimes',
		'lengthAdjust',
		'letterSpacing',
		'lightingColor',
		'limitingConeAngle',
		'local',
		'markerEnd',
		'markerHeight',
		'markerMid',
		'markerStart',
		'markerUnits',
		'markerWidth',
		'mask',
		'maskContentUnits',
		'maskUnits',
		'mathematical',
		'mode',
		'numOctaves',
		'offset',
		'opacity',
		'operator',
		'order',
		'orient',
		'orientation',
		'origin',
		'overflow',
		'overlinePosition',
		'overlineThickness',
		'paintOrder',
		'panose1',
		'pathLength',
		'patternContentUnits',
		'patternTransform',
		'patternUnits',
		'pointerEvents',
		'pointsAtX',
		'pointsAtY',
		'pointsAtZ',
		'preserveAlpha',
		'preserveAspectRatio',
		'primitiveUnits',
		'r',
		'radius',
		'refX',
		'refY',
		'renderingIntent',
		'repeatCount',
		'repeatDur',
		'requiredExtensions',
		'requiredFeatures',
		'restart',
		'result',
		'rotate',
		'rx',
		'ry',
		'seed',
		'shapeRendering',
		'slope',
		'spacing',
		'specularConstant',
		'specularExponent',
		'speed',
		'spreadMethod',
		'startOffset',
		'stdDeviation',
		'stemh',
		'stemv',
		'stitchTiles',
		'stopColor',
		'stopOpacity',
		'strikethroughPosition',
		'strikethroughThickness',
		'string',
		'stroke',
		'strokeDasharray',
		'strokeDashoffset',
		'strokeLinecap',
		'strokeLinejoin',
		'strokeMiterlimit',
		'strokeOpacity',
		'strokeWidth',
		'surfaceScale',
		'systemLanguage',
		'tableValues',
		'targetX',
		'targetY',
		'textAnchor',
		'textDecoration',
		'textLength',
		'textRendering',
		'to',
		'transform',
		'u1',
		'u2',
		'underlinePosition',
		'underlineThickness',
		'unicode',
		'unicodeBidi',
		'unicodeRange',
		'unitsPerEm',
		'vAlphabetic',
		'values',
		'vectorEffect',
		'version',
		'vertAdvY',
		'vertOriginX',
		'vertOriginY',
		'vHanging',
		'vIdeographic',
		'viewTarget',
		'visibility',
		'vMathematical',
		'widths',
		'wordSpacing',
		'writingMode',
		'x1',
		'x2',
		'x',
		'xChannelSelector',
		'xHeight',
		'xlinkActuate',
		'xlinkArcrole',
		'xlinkHref',
		'xlinkRole',
		'xlinkShow',
		'xlinkTitle',
		'xlinkType',
		'xmlBase',
		'xmlLang',
		'xmlns',
		'xmlnsXlink',
		'xmlSpace',
		'y1',
		'y2',
		'y',
		'yChannelSelector',
		'z',
		'zoomAndPan',
		'ref',
		'key',
		'angle',
	],
	dc = ['points', 'pathLength'],
	Qa = { svg: Qb, polygon: dc, polyline: dc },
	us = [
		'dangerouslySetInnerHTML',
		'onCopy',
		'onCopyCapture',
		'onCut',
		'onCutCapture',
		'onPaste',
		'onPasteCapture',
		'onCompositionEnd',
		'onCompositionEndCapture',
		'onCompositionStart',
		'onCompositionStartCapture',
		'onCompositionUpdate',
		'onCompositionUpdateCapture',
		'onFocus',
		'onFocusCapture',
		'onBlur',
		'onBlurCapture',
		'onChange',
		'onChangeCapture',
		'onBeforeInput',
		'onBeforeInputCapture',
		'onInput',
		'onInputCapture',
		'onReset',
		'onResetCapture',
		'onSubmit',
		'onSubmitCapture',
		'onInvalid',
		'onInvalidCapture',
		'onLoad',
		'onLoadCapture',
		'onError',
		'onErrorCapture',
		'onKeyDown',
		'onKeyDownCapture',
		'onKeyPress',
		'onKeyPressCapture',
		'onKeyUp',
		'onKeyUpCapture',
		'onAbort',
		'onAbortCapture',
		'onCanPlay',
		'onCanPlayCapture',
		'onCanPlayThrough',
		'onCanPlayThroughCapture',
		'onDurationChange',
		'onDurationChangeCapture',
		'onEmptied',
		'onEmptiedCapture',
		'onEncrypted',
		'onEncryptedCapture',
		'onEnded',
		'onEndedCapture',
		'onLoadedData',
		'onLoadedDataCapture',
		'onLoadedMetadata',
		'onLoadedMetadataCapture',
		'onLoadStart',
		'onLoadStartCapture',
		'onPause',
		'onPauseCapture',
		'onPlay',
		'onPlayCapture',
		'onPlaying',
		'onPlayingCapture',
		'onProgress',
		'onProgressCapture',
		'onRateChange',
		'onRateChangeCapture',
		'onSeeked',
		'onSeekedCapture',
		'onSeeking',
		'onSeekingCapture',
		'onStalled',
		'onStalledCapture',
		'onSuspend',
		'onSuspendCapture',
		'onTimeUpdate',
		'onTimeUpdateCapture',
		'onVolumeChange',
		'onVolumeChangeCapture',
		'onWaiting',
		'onWaitingCapture',
		'onAuxClick',
		'onAuxClickCapture',
		'onClick',
		'onClickCapture',
		'onContextMenu',
		'onContextMenuCapture',
		'onDoubleClick',
		'onDoubleClickCapture',
		'onDrag',
		'onDragCapture',
		'onDragEnd',
		'onDragEndCapture',
		'onDragEnter',
		'onDragEnterCapture',
		'onDragExit',
		'onDragExitCapture',
		'onDragLeave',
		'onDragLeaveCapture',
		'onDragOver',
		'onDragOverCapture',
		'onDragStart',
		'onDragStartCapture',
		'onDrop',
		'onDropCapture',
		'onMouseDown',
		'onMouseDownCapture',
		'onMouseEnter',
		'onMouseLeave',
		'onMouseMove',
		'onMouseMoveCapture',
		'onMouseOut',
		'onMouseOutCapture',
		'onMouseOver',
		'onMouseOverCapture',
		'onMouseUp',
		'onMouseUpCapture',
		'onSelect',
		'onSelectCapture',
		'onTouchCancel',
		'onTouchCancelCapture',
		'onTouchEnd',
		'onTouchEndCapture',
		'onTouchMove',
		'onTouchMoveCapture',
		'onTouchStart',
		'onTouchStartCapture',
		'onPointerDown',
		'onPointerDownCapture',
		'onPointerMove',
		'onPointerMoveCapture',
		'onPointerUp',
		'onPointerUpCapture',
		'onPointerCancel',
		'onPointerCancelCapture',
		'onPointerEnter',
		'onPointerEnterCapture',
		'onPointerLeave',
		'onPointerLeaveCapture',
		'onPointerOver',
		'onPointerOverCapture',
		'onPointerOut',
		'onPointerOutCapture',
		'onGotPointerCapture',
		'onGotPointerCaptureCapture',
		'onLostPointerCapture',
		'onLostPointerCaptureCapture',
		'onScroll',
		'onScrollCapture',
		'onWheel',
		'onWheelCapture',
		'onAnimationStart',
		'onAnimationStartCapture',
		'onAnimationEnd',
		'onAnimationEndCapture',
		'onAnimationIteration',
		'onAnimationIterationCapture',
		'onTransitionEnd',
		'onTransitionEndCapture',
	],
	wi = function (t, r) {
		if (!t || typeof t == 'function' || typeof t == 'boolean') return null;
		var n = t;
		if ((D.isValidElement(t) && (n = t.props), !Tr(n))) return null;
		var i = {};
		return (
			Object.keys(n).forEach(function (a) {
				us.includes(a) &&
					(i[a] =
						r ||
						function (o) {
							return n[a](n, o);
						});
			}),
			i
		);
	},
	t0 = function (t, r, n) {
		return function (i) {
			return t(r, n, i), null;
		};
	},
	Oi = function (t, r, n) {
		if (!Tr(t) || Co(t) !== 'object') return null;
		var i = null;
		return (
			Object.keys(t).forEach(function (a) {
				var o = t[a];
				us.includes(a) &&
					typeof o == 'function' &&
					(i || (i = {}), (i[a] = t0(o, r, n)));
			}),
			i
		);
	},
	r0 = ['children'],
	n0 = ['children'];
function vc(e, t) {
	if (e == null) return {};
	var r = i0(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function i0(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
function ko(e) {
	'@babel/helpers - typeof';
	return (
		(ko =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		ko(e)
	);
}
var yc = {
		click: 'onClick',
		mousedown: 'onMouseDown',
		mouseup: 'onMouseUp',
		mouseover: 'onMouseOver',
		mousemove: 'onMouseMove',
		mouseout: 'onMouseOut',
		mouseenter: 'onMouseEnter',
		mouseleave: 'onMouseLeave',
		touchcancel: 'onTouchCancel',
		touchend: 'onTouchEnd',
		touchmove: 'onTouchMove',
		touchstart: 'onTouchStart',
	},
	vt = function (t) {
		return typeof t == 'string'
			? t
			: t
				? t.displayName || t.name || 'Component'
				: '';
	},
	mc = null,
	eo = null,
	ss = function e(t) {
		if (t === mc && Array.isArray(eo)) return eo;
		var r = [];
		return (
			D.Children.forEach(t, function (n) {
				ee(n) ||
					(Mo.isFragment(n)
						? (r = r.concat(e(n.props.children)))
						: r.push(n));
			}),
			(eo = r),
			(mc = t),
			r
		);
	};
function tt(e, t) {
	var r = [],
		n = [];
	return (
		Array.isArray(t)
			? (n = t.map(function (i) {
					return vt(i);
				}))
			: (n = [vt(t)]),
		ss(e).forEach(function (i) {
			var a = Xe(i, 'type.displayName') || Xe(i, 'type.name');
			n.indexOf(a) !== -1 && r.push(i);
		}),
		r
	);
}
function Le(e, t) {
	var r = tt(e, t);
	return r && r[0];
}
var gc = function (t) {
		if (!t || !t.props) return !1;
		var r = t.props,
			n = r.width,
			i = r.height;
		return !(!F(n) || n <= 0 || !F(i) || i <= 0);
	},
	a0 = [
		'a',
		'altGlyph',
		'altGlyphDef',
		'altGlyphItem',
		'animate',
		'animateColor',
		'animateMotion',
		'animateTransform',
		'circle',
		'clipPath',
		'color-profile',
		'cursor',
		'defs',
		'desc',
		'ellipse',
		'feBlend',
		'feColormatrix',
		'feComponentTransfer',
		'feComposite',
		'feConvolveMatrix',
		'feDiffuseLighting',
		'feDisplacementMap',
		'feDistantLight',
		'feFlood',
		'feFuncA',
		'feFuncB',
		'feFuncG',
		'feFuncR',
		'feGaussianBlur',
		'feImage',
		'feMerge',
		'feMergeNode',
		'feMorphology',
		'feOffset',
		'fePointLight',
		'feSpecularLighting',
		'feSpotLight',
		'feTile',
		'feTurbulence',
		'filter',
		'font',
		'font-face',
		'font-face-format',
		'font-face-name',
		'font-face-url',
		'foreignObject',
		'g',
		'glyph',
		'glyphRef',
		'hkern',
		'image',
		'line',
		'lineGradient',
		'marker',
		'mask',
		'metadata',
		'missing-glyph',
		'mpath',
		'path',
		'pattern',
		'polygon',
		'polyline',
		'radialGradient',
		'rect',
		'script',
		'set',
		'stop',
		'style',
		'svg',
		'switch',
		'symbol',
		'text',
		'textPath',
		'title',
		'tref',
		'tspan',
		'use',
		'view',
		'vkern',
	],
	o0 = function (t) {
		return t && t.type && Vn(t.type) && a0.indexOf(t.type) >= 0;
	},
	u0 = function (t) {
		return t && ko(t) === 'object' && 'cx' in t && 'cy' in t && 'r' in t;
	},
	s0 = function (t, r, n, i) {
		var a,
			o =
				(a = Qa == null ? void 0 : Qa[i]) !== null && a !== void 0
					? a
					: [];
		return (
			(!Z(t) && ((i && o.includes(r)) || e0.includes(r))) ||
			(n && us.includes(r))
		);
	},
	J = function (t, r, n) {
		if (!t || typeof t == 'function' || typeof t == 'boolean') return null;
		var i = t;
		if ((D.isValidElement(t) && (i = t.props), !Tr(i))) return null;
		var a = {};
		return (
			Object.keys(i).forEach(function (o) {
				var u;
				s0((u = i) === null || u === void 0 ? void 0 : u[o], o, r, n) &&
					(a[o] = i[o]);
			}),
			a
		);
	},
	Io = function e(t, r) {
		if (t === r) return !0;
		var n = D.Children.count(t);
		if (n !== D.Children.count(r)) return !1;
		if (n === 0) return !0;
		if (n === 1)
			return bc(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
		for (var i = 0; i < n; i++) {
			var a = t[i],
				o = r[i];
			if (Array.isArray(a) || Array.isArray(o)) {
				if (!e(a, o)) return !1;
			} else if (!bc(a, o)) return !1;
		}
		return !0;
	},
	bc = function (t, r) {
		if (ee(t) && ee(r)) return !0;
		if (!ee(t) && !ee(r)) {
			var n = t.props || {},
				i = n.children,
				a = vc(n, r0),
				o = r.props || {},
				u = o.children,
				s = vc(o, n0);
			return i && u ? sr(a, s) && Io(i, u) : !i && !u ? sr(a, s) : !1;
		}
		return !1;
	},
	xc = function (t, r) {
		var n = [],
			i = {};
		return (
			ss(t).forEach(function (a, o) {
				if (o0(a)) n.push(a);
				else if (a) {
					var u = vt(a.type),
						s = r[u] || {},
						c = s.handler,
						f = s.once;
					if (c && (!f || !i[u])) {
						var l = c(a, u, o);
						n.push(l), (i[u] = !0);
					}
				}
			}),
			n
		);
	},
	c0 = function (t) {
		var r = t && t.type;
		return r && yc[r] ? yc[r] : null;
	},
	l0 = function (t, r) {
		return ss(r).indexOf(t);
	},
	f0 = [
		'children',
		'width',
		'height',
		'viewBox',
		'className',
		'style',
		'title',
		'desc',
	];
function No() {
	return (
		(No = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		No.apply(this, arguments)
	);
}
function h0(e, t) {
	if (e == null) return {};
	var r = p0(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function p0(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
function Do(e) {
	var t = e.children,
		r = e.width,
		n = e.height,
		i = e.viewBox,
		a = e.className,
		o = e.style,
		u = e.title,
		s = e.desc,
		c = h0(e, f0),
		f = i || { width: r, height: n, x: 0, y: 0 },
		l = ne('recharts-surface', a);
	return _.createElement(
		'svg',
		No({}, J(c, !0, 'svg'), {
			className: l,
			width: r,
			height: n,
			style: o,
			viewBox: ''
				.concat(f.x, ' ')
				.concat(f.y, ' ')
				.concat(f.width, ' ')
				.concat(f.height),
		}),
		_.createElement('title', null, u),
		_.createElement('desc', null, s),
		t,
	);
}
var d0 = ['children', 'className'];
function Bo() {
	return (
		(Bo = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		Bo.apply(this, arguments)
	);
}
function v0(e, t) {
	if (e == null) return {};
	var r = y0(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function y0(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
var pe = _.forwardRef(function (e, t) {
		var r = e.children,
			n = e.className,
			i = v0(e, d0),
			a = ne('recharts-layer', n);
		return _.createElement(
			'g',
			Bo({ className: a }, J(i, !0), { ref: t }),
			r,
		);
	}),
	Xt = function (t, r) {
		for (
			var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), a = 2;
			a < n;
			a++
		)
			i[a - 2] = arguments[a];
	};
function m0(e, t, r) {
	var n = -1,
		i = e.length;
	t < 0 && (t = -t > i ? 0 : i + t),
		(r = r > i ? i : r),
		r < 0 && (r += i),
		(i = t > r ? 0 : (r - t) >>> 0),
		(t >>>= 0);
	for (var a = Array(i); ++n < i; ) a[n] = e[n + t];
	return a;
}
var g0 = m0,
	b0 = g0;
function x0(e, t, r) {
	var n = e.length;
	return (r = r === void 0 ? n : r), !t && r >= n ? e : b0(e, t, r);
}
var w0 = x0,
	O0 = '\\ud800-\\udfff',
	S0 = '\\u0300-\\u036f',
	A0 = '\\ufe20-\\ufe2f',
	_0 = '\\u20d0-\\u20ff',
	P0 = S0 + A0 + _0,
	$0 = '\\ufe0e\\ufe0f',
	T0 = '\\u200d',
	E0 = RegExp('[' + T0 + O0 + P0 + $0 + ']');
function j0(e) {
	return E0.test(e);
}
var up = j0;
function M0(e) {
	return e.split('');
}
var C0 = M0,
	sp = '\\ud800-\\udfff',
	k0 = '\\u0300-\\u036f',
	I0 = '\\ufe20-\\ufe2f',
	N0 = '\\u20d0-\\u20ff',
	D0 = k0 + I0 + N0,
	B0 = '\\ufe0e\\ufe0f',
	L0 = '[' + sp + ']',
	Lo = '[' + D0 + ']',
	Ro = '\\ud83c[\\udffb-\\udfff]',
	R0 = '(?:' + Lo + '|' + Ro + ')',
	cp = '[^' + sp + ']',
	lp = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	fp = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	F0 = '\\u200d',
	hp = R0 + '?',
	pp = '[' + B0 + ']?',
	W0 = '(?:' + F0 + '(?:' + [cp, lp, fp].join('|') + ')' + pp + hp + ')*',
	U0 = pp + hp + W0,
	z0 = '(?:' + [cp + Lo + '?', Lo, lp, fp, L0].join('|') + ')',
	q0 = RegExp(Ro + '(?=' + Ro + ')|' + z0 + U0, 'g');
function H0(e) {
	return e.match(q0) || [];
}
var K0 = H0,
	G0 = C0,
	X0 = up,
	V0 = K0;
function Y0(e) {
	return X0(e) ? V0(e) : G0(e);
}
var Z0 = Y0,
	J0 = w0,
	Q0 = up,
	ex = Z0,
	tx = tp;
function rx(e) {
	return function (t) {
		t = tx(t);
		var r = Q0(t) ? ex(t) : void 0,
			n = r ? r[0] : t.charAt(0),
			i = r ? J0(r, 1).join('') : t.slice(1);
		return n[e]() + i;
	};
}
var nx = rx,
	ix = nx,
	ax = ix('toUpperCase'),
	ox = ax;
const Ta = fe(ox);
function se(e) {
	return function () {
		return e;
	};
}
const dp = Math.cos,
	Si = Math.sin,
	rt = Math.sqrt,
	Ai = Math.PI,
	Ea = 2 * Ai,
	Fo = Math.PI,
	Wo = 2 * Fo,
	Ft = 1e-6,
	ux = Wo - Ft;
function vp(e) {
	this._ += e[0];
	for (let t = 1, r = e.length; t < r; ++t) this._ += arguments[t] + e[t];
}
function sx(e) {
	let t = Math.floor(e);
	if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
	if (t > 15) return vp;
	const r = 10 ** t;
	return function (n) {
		this._ += n[0];
		for (let i = 1, a = n.length; i < a; ++i)
			this._ += Math.round(arguments[i] * r) / r + n[i];
	};
}
class cx {
	constructor(t) {
		(this._x0 = this._y0 = this._x1 = this._y1 = null),
			(this._ = ''),
			(this._append = t == null ? vp : sx(t));
	}
	moveTo(t, r) {
		this
			._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +r)}`;
	}
	closePath() {
		this._x1 !== null &&
			((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
	}
	lineTo(t, r) {
		this._append`L${(this._x1 = +t)},${(this._y1 = +r)}`;
	}
	quadraticCurveTo(t, r, n, i) {
		this._append`Q${+t},${+r},${(this._x1 = +n)},${(this._y1 = +i)}`;
	}
	bezierCurveTo(t, r, n, i, a, o) {
		this
			._append`C${+t},${+r},${+n},${+i},${(this._x1 = +a)},${(this._y1 = +o)}`;
	}
	arcTo(t, r, n, i, a) {
		if (((t = +t), (r = +r), (n = +n), (i = +i), (a = +a), a < 0))
			throw new Error(`negative radius: ${a}`);
		let o = this._x1,
			u = this._y1,
			s = n - t,
			c = i - r,
			f = o - t,
			l = u - r,
			h = f * f + l * l;
		if (this._x1 === null)
			this._append`M${(this._x1 = t)},${(this._y1 = r)}`;
		else if (h > Ft)
			if (!(Math.abs(l * s - c * f) > Ft) || !a)
				this._append`L${(this._x1 = t)},${(this._y1 = r)}`;
			else {
				let p = n - o,
					y = i - u,
					v = s * s + c * c,
					d = p * p + y * y,
					w = Math.sqrt(v),
					b = Math.sqrt(h),
					x =
						a *
						Math.tan(
							(Fo - Math.acos((v + h - d) / (2 * w * b))) / 2,
						),
					m = x / b,
					g = x / w;
				Math.abs(m - 1) > Ft &&
					this._append`L${t + m * f},${r + m * l}`,
					this
						._append`A${a},${a},0,0,${+(l * p > f * y)},${(this._x1 = t + g * s)},${(this._y1 = r + g * c)}`;
			}
	}
	arc(t, r, n, i, a, o) {
		if (((t = +t), (r = +r), (n = +n), (o = !!o), n < 0))
			throw new Error(`negative radius: ${n}`);
		let u = n * Math.cos(i),
			s = n * Math.sin(i),
			c = t + u,
			f = r + s,
			l = 1 ^ o,
			h = o ? i - a : a - i;
		this._x1 === null
			? this._append`M${c},${f}`
			: (Math.abs(this._x1 - c) > Ft || Math.abs(this._y1 - f) > Ft) &&
				this._append`L${c},${f}`,
			n &&
				(h < 0 && (h = (h % Wo) + Wo),
				h > ux
					? this
							._append`A${n},${n},0,1,${l},${t - u},${r - s}A${n},${n},0,1,${l},${(this._x1 = c)},${(this._y1 = f)}`
					: h > Ft &&
						this
							._append`A${n},${n},0,${+(h >= Fo)},${l},${(this._x1 = t + n * Math.cos(a))},${(this._y1 = r + n * Math.sin(a))}`);
	}
	rect(t, r, n, i) {
		this
			._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +r)}h${(n = +n)}v${+i}h${-n}Z`;
	}
	toString() {
		return this._;
	}
}
function cs(e) {
	let t = 3;
	return (
		(e.digits = function (r) {
			if (!arguments.length) return t;
			if (r == null) t = null;
			else {
				const n = Math.floor(r);
				if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
				t = n;
			}
			return e;
		}),
		() => new cx(t)
	);
}
function ls(e) {
	return typeof e == 'object' && 'length' in e ? e : Array.from(e);
}
function yp(e) {
	this._context = e;
}
yp.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		this._point = 0;
	},
	lineEnd: function () {
		(this._line || (this._line !== 0 && this._point === 1)) &&
			this._context.closePath(),
			(this._line = 1 - this._line);
	},
	point: function (e, t) {
		switch (((e = +e), (t = +t), this._point)) {
			case 0:
				(this._point = 1),
					this._line
						? this._context.lineTo(e, t)
						: this._context.moveTo(e, t);
				break;
			case 1:
				this._point = 2;
			default:
				this._context.lineTo(e, t);
				break;
		}
	},
};
function ja(e) {
	return new yp(e);
}
function mp(e) {
	return e[0];
}
function gp(e) {
	return e[1];
}
function bp(e, t) {
	var r = se(!0),
		n = null,
		i = ja,
		a = null,
		o = cs(u);
	(e = typeof e == 'function' ? e : e === void 0 ? mp : se(e)),
		(t = typeof t == 'function' ? t : t === void 0 ? gp : se(t));
	function u(s) {
		var c,
			f = (s = ls(s)).length,
			l,
			h = !1,
			p;
		for (n == null && (a = i((p = o()))), c = 0; c <= f; ++c)
			!(c < f && r((l = s[c]), c, s)) === h &&
				((h = !h) ? a.lineStart() : a.lineEnd()),
				h && a.point(+e(l, c, s), +t(l, c, s));
		if (p) return (a = null), p + '' || null;
	}
	return (
		(u.x = function (s) {
			return arguments.length
				? ((e = typeof s == 'function' ? s : se(+s)), u)
				: e;
		}),
		(u.y = function (s) {
			return arguments.length
				? ((t = typeof s == 'function' ? s : se(+s)), u)
				: t;
		}),
		(u.defined = function (s) {
			return arguments.length
				? ((r = typeof s == 'function' ? s : se(!!s)), u)
				: r;
		}),
		(u.curve = function (s) {
			return arguments.length ? ((i = s), n != null && (a = i(n)), u) : i;
		}),
		(u.context = function (s) {
			return arguments.length
				? (s == null ? (n = a = null) : (a = i((n = s))), u)
				: n;
		}),
		u
	);
}
function oi(e, t, r) {
	var n = null,
		i = se(!0),
		a = null,
		o = ja,
		u = null,
		s = cs(c);
	(e = typeof e == 'function' ? e : e === void 0 ? mp : se(+e)),
		(t = typeof t == 'function' ? t : se(t === void 0 ? 0 : +t)),
		(r = typeof r == 'function' ? r : r === void 0 ? gp : se(+r));
	function c(l) {
		var h,
			p,
			y,
			v = (l = ls(l)).length,
			d,
			w = !1,
			b,
			x = new Array(v),
			m = new Array(v);
		for (a == null && (u = o((b = s()))), h = 0; h <= v; ++h) {
			if (!(h < v && i((d = l[h]), h, l)) === w)
				if ((w = !w)) (p = h), u.areaStart(), u.lineStart();
				else {
					for (u.lineEnd(), u.lineStart(), y = h - 1; y >= p; --y)
						u.point(x[y], m[y]);
					u.lineEnd(), u.areaEnd();
				}
			w &&
				((x[h] = +e(d, h, l)),
				(m[h] = +t(d, h, l)),
				u.point(n ? +n(d, h, l) : x[h], r ? +r(d, h, l) : m[h]));
		}
		if (b) return (u = null), b + '' || null;
	}
	function f() {
		return bp().defined(i).curve(o).context(a);
	}
	return (
		(c.x = function (l) {
			return arguments.length
				? ((e = typeof l == 'function' ? l : se(+l)), (n = null), c)
				: e;
		}),
		(c.x0 = function (l) {
			return arguments.length
				? ((e = typeof l == 'function' ? l : se(+l)), c)
				: e;
		}),
		(c.x1 = function (l) {
			return arguments.length
				? ((n = l == null ? null : typeof l == 'function' ? l : se(+l)),
					c)
				: n;
		}),
		(c.y = function (l) {
			return arguments.length
				? ((t = typeof l == 'function' ? l : se(+l)), (r = null), c)
				: t;
		}),
		(c.y0 = function (l) {
			return arguments.length
				? ((t = typeof l == 'function' ? l : se(+l)), c)
				: t;
		}),
		(c.y1 = function (l) {
			return arguments.length
				? ((r = l == null ? null : typeof l == 'function' ? l : se(+l)),
					c)
				: r;
		}),
		(c.lineX0 = c.lineY0 =
			function () {
				return f().x(e).y(t);
			}),
		(c.lineY1 = function () {
			return f().x(e).y(r);
		}),
		(c.lineX1 = function () {
			return f().x(n).y(t);
		}),
		(c.defined = function (l) {
			return arguments.length
				? ((i = typeof l == 'function' ? l : se(!!l)), c)
				: i;
		}),
		(c.curve = function (l) {
			return arguments.length ? ((o = l), a != null && (u = o(a)), c) : o;
		}),
		(c.context = function (l) {
			return arguments.length
				? (l == null ? (a = u = null) : (u = o((a = l))), c)
				: a;
		}),
		c
	);
}
class xp {
	constructor(t, r) {
		(this._context = t), (this._x = r);
	}
	areaStart() {
		this._line = 0;
	}
	areaEnd() {
		this._line = NaN;
	}
	lineStart() {
		this._point = 0;
	}
	lineEnd() {
		(this._line || (this._line !== 0 && this._point === 1)) &&
			this._context.closePath(),
			(this._line = 1 - this._line);
	}
	point(t, r) {
		switch (((t = +t), (r = +r), this._point)) {
			case 0: {
				(this._point = 1),
					this._line
						? this._context.lineTo(t, r)
						: this._context.moveTo(t, r);
				break;
			}
			case 1:
				this._point = 2;
			default: {
				this._x
					? this._context.bezierCurveTo(
							(this._x0 = (this._x0 + t) / 2),
							this._y0,
							this._x0,
							r,
							t,
							r,
						)
					: this._context.bezierCurveTo(
							this._x0,
							(this._y0 = (this._y0 + r) / 2),
							t,
							this._y0,
							t,
							r,
						);
				break;
			}
		}
		(this._x0 = t), (this._y0 = r);
	}
}
function lx(e) {
	return new xp(e, !0);
}
function fx(e) {
	return new xp(e, !1);
}
const fs = {
		draw(e, t) {
			const r = rt(t / Ai);
			e.moveTo(r, 0), e.arc(0, 0, r, 0, Ea);
		},
	},
	hx = {
		draw(e, t) {
			const r = rt(t / 5) / 2;
			e.moveTo(-3 * r, -r),
				e.lineTo(-r, -r),
				e.lineTo(-r, -3 * r),
				e.lineTo(r, -3 * r),
				e.lineTo(r, -r),
				e.lineTo(3 * r, -r),
				e.lineTo(3 * r, r),
				e.lineTo(r, r),
				e.lineTo(r, 3 * r),
				e.lineTo(-r, 3 * r),
				e.lineTo(-r, r),
				e.lineTo(-3 * r, r),
				e.closePath();
		},
	},
	wp = rt(1 / 3),
	px = wp * 2,
	dx = {
		draw(e, t) {
			const r = rt(t / px),
				n = r * wp;
			e.moveTo(0, -r),
				e.lineTo(n, 0),
				e.lineTo(0, r),
				e.lineTo(-n, 0),
				e.closePath();
		},
	},
	vx = {
		draw(e, t) {
			const r = rt(t),
				n = -r / 2;
			e.rect(n, n, r, r);
		},
	},
	yx = 0.8908130915292852,
	Op = Si(Ai / 10) / Si((7 * Ai) / 10),
	mx = Si(Ea / 10) * Op,
	gx = -dp(Ea / 10) * Op,
	bx = {
		draw(e, t) {
			const r = rt(t * yx),
				n = mx * r,
				i = gx * r;
			e.moveTo(0, -r), e.lineTo(n, i);
			for (let a = 1; a < 5; ++a) {
				const o = (Ea * a) / 5,
					u = dp(o),
					s = Si(o);
				e.lineTo(s * r, -u * r), e.lineTo(u * n - s * i, s * n + u * i);
			}
			e.closePath();
		},
	},
	to = rt(3),
	xx = {
		draw(e, t) {
			const r = -rt(t / (to * 3));
			e.moveTo(0, r * 2),
				e.lineTo(-to * r, -r),
				e.lineTo(to * r, -r),
				e.closePath();
		},
	},
	Ue = -0.5,
	ze = rt(3) / 2,
	Uo = 1 / rt(12),
	wx = (Uo / 2 + 1) * 3,
	Ox = {
		draw(e, t) {
			const r = rt(t / wx),
				n = r / 2,
				i = r * Uo,
				a = n,
				o = r * Uo + r,
				u = -a,
				s = o;
			e.moveTo(n, i),
				e.lineTo(a, o),
				e.lineTo(u, s),
				e.lineTo(Ue * n - ze * i, ze * n + Ue * i),
				e.lineTo(Ue * a - ze * o, ze * a + Ue * o),
				e.lineTo(Ue * u - ze * s, ze * u + Ue * s),
				e.lineTo(Ue * n + ze * i, Ue * i - ze * n),
				e.lineTo(Ue * a + ze * o, Ue * o - ze * a),
				e.lineTo(Ue * u + ze * s, Ue * s - ze * u),
				e.closePath();
		},
	};
function Sx(e, t) {
	let r = null,
		n = cs(i);
	(e = typeof e == 'function' ? e : se(e || fs)),
		(t = typeof t == 'function' ? t : se(t === void 0 ? 64 : +t));
	function i() {
		let a;
		if (
			(r || (r = a = n()),
			e.apply(this, arguments).draw(r, +t.apply(this, arguments)),
			a)
		)
			return (r = null), a + '' || null;
	}
	return (
		(i.type = function (a) {
			return arguments.length
				? ((e = typeof a == 'function' ? a : se(a)), i)
				: e;
		}),
		(i.size = function (a) {
			return arguments.length
				? ((t = typeof a == 'function' ? a : se(+a)), i)
				: t;
		}),
		(i.context = function (a) {
			return arguments.length ? ((r = a ?? null), i) : r;
		}),
		i
	);
}
function _i() {}
function Pi(e, t, r) {
	e._context.bezierCurveTo(
		(2 * e._x0 + e._x1) / 3,
		(2 * e._y0 + e._y1) / 3,
		(e._x0 + 2 * e._x1) / 3,
		(e._y0 + 2 * e._y1) / 3,
		(e._x0 + 4 * e._x1 + t) / 6,
		(e._y0 + 4 * e._y1 + r) / 6,
	);
}
function Sp(e) {
	this._context = e;
}
Sp.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		(this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
	},
	lineEnd: function () {
		switch (this._point) {
			case 3:
				Pi(this, this._x1, this._y1);
			case 2:
				this._context.lineTo(this._x1, this._y1);
				break;
		}
		(this._line || (this._line !== 0 && this._point === 1)) &&
			this._context.closePath(),
			(this._line = 1 - this._line);
	},
	point: function (e, t) {
		switch (((e = +e), (t = +t), this._point)) {
			case 0:
				(this._point = 1),
					this._line
						? this._context.lineTo(e, t)
						: this._context.moveTo(e, t);
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				(this._point = 3),
					this._context.lineTo(
						(5 * this._x0 + this._x1) / 6,
						(5 * this._y0 + this._y1) / 6,
					);
			default:
				Pi(this, e, t);
				break;
		}
		(this._x0 = this._x1),
			(this._x1 = e),
			(this._y0 = this._y1),
			(this._y1 = t);
	},
};
function Ax(e) {
	return new Sp(e);
}
function Ap(e) {
	this._context = e;
}
Ap.prototype = {
	areaStart: _i,
	areaEnd: _i,
	lineStart: function () {
		(this._x0 =
			this._x1 =
			this._x2 =
			this._x3 =
			this._x4 =
			this._y0 =
			this._y1 =
			this._y2 =
			this._y3 =
			this._y4 =
				NaN),
			(this._point = 0);
	},
	lineEnd: function () {
		switch (this._point) {
			case 1: {
				this._context.moveTo(this._x2, this._y2),
					this._context.closePath();
				break;
			}
			case 2: {
				this._context.moveTo(
					(this._x2 + 2 * this._x3) / 3,
					(this._y2 + 2 * this._y3) / 3,
				),
					this._context.lineTo(
						(this._x3 + 2 * this._x2) / 3,
						(this._y3 + 2 * this._y2) / 3,
					),
					this._context.closePath();
				break;
			}
			case 3: {
				this.point(this._x2, this._y2),
					this.point(this._x3, this._y3),
					this.point(this._x4, this._y4);
				break;
			}
		}
	},
	point: function (e, t) {
		switch (((e = +e), (t = +t), this._point)) {
			case 0:
				(this._point = 1), (this._x2 = e), (this._y2 = t);
				break;
			case 1:
				(this._point = 2), (this._x3 = e), (this._y3 = t);
				break;
			case 2:
				(this._point = 3),
					(this._x4 = e),
					(this._y4 = t),
					this._context.moveTo(
						(this._x0 + 4 * this._x1 + e) / 6,
						(this._y0 + 4 * this._y1 + t) / 6,
					);
				break;
			default:
				Pi(this, e, t);
				break;
		}
		(this._x0 = this._x1),
			(this._x1 = e),
			(this._y0 = this._y1),
			(this._y1 = t);
	},
};
function _x(e) {
	return new Ap(e);
}
function _p(e) {
	this._context = e;
}
_p.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		(this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
	},
	lineEnd: function () {
		(this._line || (this._line !== 0 && this._point === 3)) &&
			this._context.closePath(),
			(this._line = 1 - this._line);
	},
	point: function (e, t) {
		switch (((e = +e), (t = +t), this._point)) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				var r = (this._x0 + 4 * this._x1 + e) / 6,
					n = (this._y0 + 4 * this._y1 + t) / 6;
				this._line
					? this._context.lineTo(r, n)
					: this._context.moveTo(r, n);
				break;
			case 3:
				this._point = 4;
			default:
				Pi(this, e, t);
				break;
		}
		(this._x0 = this._x1),
			(this._x1 = e),
			(this._y0 = this._y1),
			(this._y1 = t);
	},
};
function Px(e) {
	return new _p(e);
}
function Pp(e) {
	this._context = e;
}
Pp.prototype = {
	areaStart: _i,
	areaEnd: _i,
	lineStart: function () {
		this._point = 0;
	},
	lineEnd: function () {
		this._point && this._context.closePath();
	},
	point: function (e, t) {
		(e = +e),
			(t = +t),
			this._point
				? this._context.lineTo(e, t)
				: ((this._point = 1), this._context.moveTo(e, t));
	},
};
function $x(e) {
	return new Pp(e);
}
function wc(e) {
	return e < 0 ? -1 : 1;
}
function Oc(e, t, r) {
	var n = e._x1 - e._x0,
		i = t - e._x1,
		a = (e._y1 - e._y0) / (n || (i < 0 && -0)),
		o = (r - e._y1) / (i || (n < 0 && -0)),
		u = (a * i + o * n) / (n + i);
	return (
		(wc(a) + wc(o)) *
			Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(u)) || 0
	);
}
function Sc(e, t) {
	var r = e._x1 - e._x0;
	return r ? ((3 * (e._y1 - e._y0)) / r - t) / 2 : t;
}
function ro(e, t, r) {
	var n = e._x0,
		i = e._y0,
		a = e._x1,
		o = e._y1,
		u = (a - n) / 3;
	e._context.bezierCurveTo(n + u, i + u * t, a - u, o - u * r, a, o);
}
function $i(e) {
	this._context = e;
}
$i.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		(this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN),
			(this._point = 0);
	},
	lineEnd: function () {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x1, this._y1);
				break;
			case 3:
				ro(this, this._t0, Sc(this, this._t0));
				break;
		}
		(this._line || (this._line !== 0 && this._point === 1)) &&
			this._context.closePath(),
			(this._line = 1 - this._line);
	},
	point: function (e, t) {
		var r = NaN;
		if (((e = +e), (t = +t), !(e === this._x1 && t === this._y1))) {
			switch (this._point) {
				case 0:
					(this._point = 1),
						this._line
							? this._context.lineTo(e, t)
							: this._context.moveTo(e, t);
					break;
				case 1:
					this._point = 2;
					break;
				case 2:
					(this._point = 3),
						ro(this, Sc(this, (r = Oc(this, e, t))), r);
					break;
				default:
					ro(this, this._t0, (r = Oc(this, e, t)));
					break;
			}
			(this._x0 = this._x1),
				(this._x1 = e),
				(this._y0 = this._y1),
				(this._y1 = t),
				(this._t0 = r);
		}
	},
};
function $p(e) {
	this._context = new Tp(e);
}
($p.prototype = Object.create($i.prototype)).point = function (e, t) {
	$i.prototype.point.call(this, t, e);
};
function Tp(e) {
	this._context = e;
}
Tp.prototype = {
	moveTo: function (e, t) {
		this._context.moveTo(t, e);
	},
	closePath: function () {
		this._context.closePath();
	},
	lineTo: function (e, t) {
		this._context.lineTo(t, e);
	},
	bezierCurveTo: function (e, t, r, n, i, a) {
		this._context.bezierCurveTo(t, e, n, r, a, i);
	},
};
function Tx(e) {
	return new $i(e);
}
function Ex(e) {
	return new $p(e);
}
function Ep(e) {
	this._context = e;
}
Ep.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		(this._x = []), (this._y = []);
	},
	lineEnd: function () {
		var e = this._x,
			t = this._y,
			r = e.length;
		if (r)
			if (
				(this._line
					? this._context.lineTo(e[0], t[0])
					: this._context.moveTo(e[0], t[0]),
				r === 2)
			)
				this._context.lineTo(e[1], t[1]);
			else
				for (var n = Ac(e), i = Ac(t), a = 0, o = 1; o < r; ++a, ++o)
					this._context.bezierCurveTo(
						n[0][a],
						i[0][a],
						n[1][a],
						i[1][a],
						e[o],
						t[o],
					);
		(this._line || (this._line !== 0 && r === 1)) &&
			this._context.closePath(),
			(this._line = 1 - this._line),
			(this._x = this._y = null);
	},
	point: function (e, t) {
		this._x.push(+e), this._y.push(+t);
	},
};
function Ac(e) {
	var t,
		r = e.length - 1,
		n,
		i = new Array(r),
		a = new Array(r),
		o = new Array(r);
	for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t)
		(i[t] = 1), (a[t] = 4), (o[t] = 4 * e[t] + 2 * e[t + 1]);
	for (
		i[r - 1] = 2, a[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1;
		t < r;
		++t
	)
		(n = i[t] / a[t - 1]), (a[t] -= n), (o[t] -= n * o[t - 1]);
	for (i[r - 1] = o[r - 1] / a[r - 1], t = r - 2; t >= 0; --t)
		i[t] = (o[t] - i[t + 1]) / a[t];
	for (a[r - 1] = (e[r] + i[r - 1]) / 2, t = 0; t < r - 1; ++t)
		a[t] = 2 * e[t + 1] - i[t + 1];
	return [i, a];
}
function jx(e) {
	return new Ep(e);
}
function Ma(e, t) {
	(this._context = e), (this._t = t);
}
Ma.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		(this._x = this._y = NaN), (this._point = 0);
	},
	lineEnd: function () {
		0 < this._t &&
			this._t < 1 &&
			this._point === 2 &&
			this._context.lineTo(this._x, this._y),
			(this._line || (this._line !== 0 && this._point === 1)) &&
				this._context.closePath(),
			this._line >= 0 &&
				((this._t = 1 - this._t), (this._line = 1 - this._line));
	},
	point: function (e, t) {
		switch (((e = +e), (t = +t), this._point)) {
			case 0:
				(this._point = 1),
					this._line
						? this._context.lineTo(e, t)
						: this._context.moveTo(e, t);
				break;
			case 1:
				this._point = 2;
			default: {
				if (this._t <= 0)
					this._context.lineTo(this._x, t),
						this._context.lineTo(e, t);
				else {
					var r = this._x * (1 - this._t) + e * this._t;
					this._context.lineTo(r, this._y),
						this._context.lineTo(r, t);
				}
				break;
			}
		}
		(this._x = e), (this._y = t);
	},
};
function Mx(e) {
	return new Ma(e, 0.5);
}
function Cx(e) {
	return new Ma(e, 0);
}
function kx(e) {
	return new Ma(e, 1);
}
function fr(e, t) {
	if ((o = e.length) > 1)
		for (var r = 1, n, i, a = e[t[0]], o, u = a.length; r < o; ++r)
			for (i = a, a = e[t[r]], n = 0; n < u; ++n)
				a[n][1] += a[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1];
}
function zo(e) {
	for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
	return r;
}
function Ix(e, t) {
	return e[t];
}
function Nx(e) {
	const t = [];
	return (t.key = e), t;
}
function Dx() {
	var e = se([]),
		t = zo,
		r = fr,
		n = Ix;
	function i(a) {
		var o = Array.from(e.apply(this, arguments), Nx),
			u,
			s = o.length,
			c = -1,
			f;
		for (const l of a)
			for (u = 0, ++c; u < s; ++u)
				(o[u][c] = [0, +n(l, o[u].key, c, a)]).data = l;
		for (u = 0, f = ls(t(o)); u < s; ++u) o[f[u]].index = u;
		return r(o, f), o;
	}
	return (
		(i.keys = function (a) {
			return arguments.length
				? ((e = typeof a == 'function' ? a : se(Array.from(a))), i)
				: e;
		}),
		(i.value = function (a) {
			return arguments.length
				? ((n = typeof a == 'function' ? a : se(+a)), i)
				: n;
		}),
		(i.order = function (a) {
			return arguments.length
				? ((t =
						a == null
							? zo
							: typeof a == 'function'
								? a
								: se(Array.from(a))),
					i)
				: t;
		}),
		(i.offset = function (a) {
			return arguments.length ? ((r = a ?? fr), i) : r;
		}),
		i
	);
}
function Bx(e, t) {
	if ((n = e.length) > 0) {
		for (var r, n, i = 0, a = e[0].length, o; i < a; ++i) {
			for (o = r = 0; r < n; ++r) o += e[r][i][1] || 0;
			if (o) for (r = 0; r < n; ++r) e[r][i][1] /= o;
		}
		fr(e, t);
	}
}
function Lx(e, t) {
	if ((i = e.length) > 0) {
		for (var r = 0, n = e[t[0]], i, a = n.length; r < a; ++r) {
			for (var o = 0, u = 0; o < i; ++o) u += e[o][r][1] || 0;
			n[r][1] += n[r][0] = -u / 2;
		}
		fr(e, t);
	}
}
function Rx(e, t) {
	if (!(!((o = e.length) > 0) || !((a = (i = e[t[0]]).length) > 0))) {
		for (var r = 0, n = 1, i, a, o; n < a; ++n) {
			for (var u = 0, s = 0, c = 0; u < o; ++u) {
				for (
					var f = e[t[u]],
						l = f[n][1] || 0,
						h = f[n - 1][1] || 0,
						p = (l - h) / 2,
						y = 0;
					y < u;
					++y
				) {
					var v = e[t[y]],
						d = v[n][1] || 0,
						w = v[n - 1][1] || 0;
					p += d - w;
				}
				(s += l), (c += p * l);
			}
			(i[n - 1][1] += i[n - 1][0] = r), s && (r -= c / s);
		}
		(i[n - 1][1] += i[n - 1][0] = r), fr(e, t);
	}
}
function sn(e) {
	'@babel/helpers - typeof';
	return (
		(sn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		sn(e)
	);
}
var Fx = ['type', 'size', 'sizeType'];
function qo() {
	return (
		(qo = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		qo.apply(this, arguments)
	);
}
function _c(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Pc(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? _c(Object(r), !0).forEach(function (n) {
					Wx(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: _c(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function Wx(e, t, r) {
	return (
		(t = Ux(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function Ux(e) {
	var t = zx(e, 'string');
	return sn(t) == 'symbol' ? t : String(t);
}
function zx(e, t) {
	if (sn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (sn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
function qx(e, t) {
	if (e == null) return {};
	var r = Hx(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function Hx(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
var jp = {
		symbolCircle: fs,
		symbolCross: hx,
		symbolDiamond: dx,
		symbolSquare: vx,
		symbolStar: bx,
		symbolTriangle: xx,
		symbolWye: Ox,
	},
	Kx = Math.PI / 180,
	Gx = function (t) {
		var r = 'symbol'.concat(Ta(t));
		return jp[r] || fs;
	},
	Xx = function (t, r, n) {
		if (r === 'area') return t;
		switch (n) {
			case 'cross':
				return (5 * t * t) / 9;
			case 'diamond':
				return (0.5 * t * t) / Math.sqrt(3);
			case 'square':
				return t * t;
			case 'star': {
				var i = 18 * Kx;
				return (
					1.25 *
					t *
					t *
					(Math.tan(i) - Math.tan(i * 2) * Math.pow(Math.tan(i), 2))
				);
			}
			case 'triangle':
				return (Math.sqrt(3) * t * t) / 4;
			case 'wye':
				return ((21 - 10 * Math.sqrt(3)) * t * t) / 8;
			default:
				return (Math.PI * t * t) / 4;
		}
	},
	Vx = function (t, r) {
		jp['symbol'.concat(Ta(t))] = r;
	},
	hs = function (t) {
		var r = t.type,
			n = r === void 0 ? 'circle' : r,
			i = t.size,
			a = i === void 0 ? 64 : i,
			o = t.sizeType,
			u = o === void 0 ? 'area' : o,
			s = qx(t, Fx),
			c = Pc(Pc({}, s), {}, { type: n, size: a, sizeType: u }),
			f = function () {
				var d = Gx(n),
					w = Sx()
						.type(d)
						.size(Xx(a, u, n));
				return w();
			},
			l = c.className,
			h = c.cx,
			p = c.cy,
			y = J(c, !0);
		return h === +h && p === +p && a === +a
			? _.createElement(
					'path',
					qo({}, y, {
						className: ne('recharts-symbols', l),
						transform: 'translate('.concat(h, ', ').concat(p, ')'),
						d: f(),
					}),
				)
			: null;
	};
hs.registerSymbol = Vx;
function hr(e) {
	'@babel/helpers - typeof';
	return (
		(hr =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		hr(e)
	);
}
function Ho() {
	return (
		(Ho = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		Ho.apply(this, arguments)
	);
}
function $c(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Yx(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? $c(Object(r), !0).forEach(function (n) {
					cn(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: $c(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function Zx(e, t) {
	if (!(e instanceof t))
		throw new TypeError('Cannot call a class as a function');
}
function Jx(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			'value' in n && (n.writable = !0),
			Object.defineProperty(e, Cp(n.key), n);
	}
}
function Qx(e, t, r) {
	return (
		t && Jx(e.prototype, t),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		e
	);
}
function e1(e, t, r) {
	return (
		(t = Ti(t)),
		t1(
			e,
			Mp()
				? Reflect.construct(t, r || [], Ti(e).constructor)
				: t.apply(e, r),
		)
	);
}
function t1(e, t) {
	if (t && (hr(t) === 'object' || typeof t == 'function')) return t;
	if (t !== void 0)
		throw new TypeError(
			'Derived constructors may only return object or undefined',
		);
	return r1(e);
}
function r1(e) {
	if (e === void 0)
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called",
		);
	return e;
}
function Mp() {
	try {
		var e = !Boolean.prototype.valueOf.call(
			Reflect.construct(Boolean, [], function () {}),
		);
	} catch {}
	return (Mp = function () {
		return !!e;
	})();
}
function Ti(e) {
	return (
		(Ti = Object.setPrototypeOf
			? Object.getPrototypeOf.bind()
			: function (r) {
					return r.__proto__ || Object.getPrototypeOf(r);
				}),
		Ti(e)
	);
}
function n1(e, t) {
	if (typeof t != 'function' && t !== null)
		throw new TypeError(
			'Super expression must either be null or a function',
		);
	(e.prototype = Object.create(t && t.prototype, {
		constructor: { value: e, writable: !0, configurable: !0 },
	})),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		t && Ko(e, t);
}
function Ko(e, t) {
	return (
		(Ko = Object.setPrototypeOf
			? Object.setPrototypeOf.bind()
			: function (n, i) {
					return (n.__proto__ = i), n;
				}),
		Ko(e, t)
	);
}
function cn(e, t, r) {
	return (
		(t = Cp(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function Cp(e) {
	var t = i1(e, 'string');
	return hr(t) == 'symbol' ? t : String(t);
}
function i1(e, t) {
	if (hr(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (hr(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var qe = 32,
	ps = (function (e) {
		n1(t, e);
		function t() {
			return Zx(this, t), e1(this, t, arguments);
		}
		return (
			Qx(t, [
				{
					key: 'renderIcon',
					value: function (n) {
						var i = this.props.inactiveColor,
							a = qe / 2,
							o = qe / 6,
							u = qe / 3,
							s = n.inactive ? i : n.color;
						if (n.type === 'plainline')
							return _.createElement('line', {
								strokeWidth: 4,
								fill: 'none',
								stroke: s,
								strokeDasharray: n.payload.strokeDasharray,
								x1: 0,
								y1: a,
								x2: qe,
								y2: a,
								className: 'recharts-legend-icon',
							});
						if (n.type === 'line')
							return _.createElement('path', {
								strokeWidth: 4,
								fill: 'none',
								stroke: s,
								d: 'M0,'
									.concat(a, 'h')
									.concat(
										u,
										`
            A`,
									)
									.concat(o, ',')
									.concat(o, ',0,1,1,')
									.concat(2 * u, ',')
									.concat(
										a,
										`
            H`,
									)
									.concat(qe, 'M')
									.concat(2 * u, ',')
									.concat(
										a,
										`
            A`,
									)
									.concat(o, ',')
									.concat(o, ',0,1,1,')
									.concat(u, ',')
									.concat(a),
								className: 'recharts-legend-icon',
							});
						if (n.type === 'rect')
							return _.createElement('path', {
								stroke: 'none',
								fill: s,
								d: 'M0,'
									.concat(qe / 8, 'h')
									.concat(qe, 'v')
									.concat((qe * 3) / 4, 'h')
									.concat(-qe, 'z'),
								className: 'recharts-legend-icon',
							});
						if (_.isValidElement(n.legendIcon)) {
							var c = Yx({}, n);
							return (
								delete c.legendIcon,
								_.cloneElement(n.legendIcon, c)
							);
						}
						return _.createElement(hs, {
							fill: s,
							cx: a,
							cy: a,
							size: qe,
							sizeType: 'diameter',
							type: n.type,
						});
					},
				},
				{
					key: 'renderItems',
					value: function () {
						var n = this,
							i = this.props,
							a = i.payload,
							o = i.iconSize,
							u = i.layout,
							s = i.formatter,
							c = i.inactiveColor,
							f = { x: 0, y: 0, width: qe, height: qe },
							l = {
								display:
									u === 'horizontal'
										? 'inline-block'
										: 'block',
								marginRight: 10,
							},
							h = {
								display: 'inline-block',
								verticalAlign: 'middle',
								marginRight: 4,
							};
						return a.map(function (p, y) {
							var v = p.formatter || s,
								d = ne(
									cn(
										cn(
											{ 'recharts-legend-item': !0 },
											'legend-item-'.concat(y),
											!0,
										),
										'inactive',
										p.inactive,
									),
								);
							if (p.type === 'none') return null;
							var w = Z(p.value) ? null : p.value;
							Xt(
								!Z(p.value),
								`The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`,
							);
							var b = p.inactive ? c : p.color;
							return _.createElement(
								'li',
								Ho(
									{
										className: d,
										style: l,
										key: 'legend-item-'.concat(y),
									},
									Oi(n.props, p, y),
								),
								_.createElement(
									Do,
									{
										width: o,
										height: o,
										viewBox: f,
										style: h,
									},
									n.renderIcon(p),
								),
								_.createElement(
									'span',
									{
										className: 'recharts-legend-item-text',
										style: { color: b },
									},
									v ? v(w, p, y) : w,
								),
							);
						});
					},
				},
				{
					key: 'render',
					value: function () {
						var n = this.props,
							i = n.payload,
							a = n.layout,
							o = n.align;
						if (!i || !i.length) return null;
						var u = {
							padding: 0,
							margin: 0,
							textAlign: a === 'horizontal' ? o : 'left',
						};
						return _.createElement(
							'ul',
							{ className: 'recharts-default-legend', style: u },
							this.renderItems(),
						);
					},
				},
			]),
			t
		);
	})(D.PureComponent);
cn(ps, 'displayName', 'Legend');
cn(ps, 'defaultProps', {
	iconSize: 14,
	layout: 'horizontal',
	align: 'center',
	verticalAlign: 'middle',
	inactiveColor: '#ccc',
});
var a1 = va;
function o1() {
	(this.__data__ = new a1()), (this.size = 0);
}
var u1 = o1;
function s1(e) {
	var t = this.__data__,
		r = t.delete(e);
	return (this.size = t.size), r;
}
var c1 = s1;
function l1(e) {
	return this.__data__.get(e);
}
var f1 = l1;
function h1(e) {
	return this.__data__.has(e);
}
var p1 = h1,
	d1 = va,
	v1 = Qu,
	y1 = es,
	m1 = 200;
function g1(e, t) {
	var r = this.__data__;
	if (r instanceof d1) {
		var n = r.__data__;
		if (!v1 || n.length < m1 - 1)
			return n.push([e, t]), (this.size = ++r.size), this;
		r = this.__data__ = new y1(n);
	}
	return r.set(e, t), (this.size = r.size), this;
}
var b1 = g1,
	x1 = va,
	w1 = u1,
	O1 = c1,
	S1 = f1,
	A1 = p1,
	_1 = b1;
function kr(e) {
	var t = (this.__data__ = new x1(e));
	this.size = t.size;
}
kr.prototype.clear = w1;
kr.prototype.delete = O1;
kr.prototype.get = S1;
kr.prototype.has = A1;
kr.prototype.set = _1;
var kp = kr,
	P1 = '__lodash_hash_undefined__';
function $1(e) {
	return this.__data__.set(e, P1), this;
}
var T1 = $1;
function E1(e) {
	return this.__data__.has(e);
}
var j1 = E1,
	M1 = es,
	C1 = T1,
	k1 = j1;
function Ei(e) {
	var t = -1,
		r = e == null ? 0 : e.length;
	for (this.__data__ = new M1(); ++t < r; ) this.add(e[t]);
}
Ei.prototype.add = Ei.prototype.push = C1;
Ei.prototype.has = k1;
var Ip = Ei;
function I1(e, t) {
	for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
		if (t(e[r], r, e)) return !0;
	return !1;
}
var Np = I1;
function N1(e, t) {
	return e.has(t);
}
var Dp = N1,
	D1 = Ip,
	B1 = Np,
	L1 = Dp,
	R1 = 1,
	F1 = 2;
function W1(e, t, r, n, i, a) {
	var o = r & R1,
		u = e.length,
		s = t.length;
	if (u != s && !(o && s > u)) return !1;
	var c = a.get(e),
		f = a.get(t);
	if (c && f) return c == t && f == e;
	var l = -1,
		h = !0,
		p = r & F1 ? new D1() : void 0;
	for (a.set(e, t), a.set(t, e); ++l < u; ) {
		var y = e[l],
			v = t[l];
		if (n) var d = o ? n(v, y, l, t, e, a) : n(y, v, l, e, t, a);
		if (d !== void 0) {
			if (d) continue;
			h = !1;
			break;
		}
		if (p) {
			if (
				!B1(t, function (w, b) {
					if (!L1(p, b) && (y === w || i(y, w, r, n, a)))
						return p.push(b);
				})
			) {
				h = !1;
				break;
			}
		} else if (!(y === v || i(y, v, r, n, a))) {
			h = !1;
			break;
		}
	}
	return a.delete(e), a.delete(t), h;
}
var Bp = W1,
	U1 = lt,
	z1 = U1.Uint8Array,
	q1 = z1;
function H1(e) {
	var t = -1,
		r = Array(e.size);
	return (
		e.forEach(function (n, i) {
			r[++t] = [i, n];
		}),
		r
	);
}
var K1 = H1;
function G1(e) {
	var t = -1,
		r = Array(e.size);
	return (
		e.forEach(function (n) {
			r[++t] = n;
		}),
		r
	);
}
var ds = G1,
	Tc = Xn,
	Ec = q1,
	X1 = Ju,
	V1 = Bp,
	Y1 = K1,
	Z1 = ds,
	J1 = 1,
	Q1 = 2,
	ew = '[object Boolean]',
	tw = '[object Date]',
	rw = '[object Error]',
	nw = '[object Map]',
	iw = '[object Number]',
	aw = '[object RegExp]',
	ow = '[object Set]',
	uw = '[object String]',
	sw = '[object Symbol]',
	cw = '[object ArrayBuffer]',
	lw = '[object DataView]',
	jc = Tc ? Tc.prototype : void 0,
	no = jc ? jc.valueOf : void 0;
function fw(e, t, r, n, i, a, o) {
	switch (r) {
		case lw:
			if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
				return !1;
			(e = e.buffer), (t = t.buffer);
		case cw:
			return !(e.byteLength != t.byteLength || !a(new Ec(e), new Ec(t)));
		case ew:
		case tw:
		case iw:
			return X1(+e, +t);
		case rw:
			return e.name == t.name && e.message == t.message;
		case aw:
		case uw:
			return e == t + '';
		case nw:
			var u = Y1;
		case ow:
			var s = n & J1;
			if ((u || (u = Z1), e.size != t.size && !s)) return !1;
			var c = o.get(e);
			if (c) return c == t;
			(n |= Q1), o.set(e, t);
			var f = V1(u(e), u(t), n, i, a, o);
			return o.delete(e), f;
		case sw:
			if (no) return no.call(e) == no.call(t);
	}
	return !1;
}
var hw = fw;
function pw(e, t) {
	for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
	return e;
}
var Lp = pw,
	dw = Lp,
	vw = Ne;
function yw(e, t, r) {
	var n = t(e);
	return vw(e) ? n : dw(n, r(e));
}
var mw = yw;
function gw(e, t) {
	for (var r = -1, n = e == null ? 0 : e.length, i = 0, a = []; ++r < n; ) {
		var o = e[r];
		t(o, r, e) && (a[i++] = o);
	}
	return a;
}
var bw = gw;
function xw() {
	return [];
}
var ww = xw,
	Ow = bw,
	Sw = ww,
	Aw = Object.prototype,
	_w = Aw.propertyIsEnumerable,
	Mc = Object.getOwnPropertySymbols,
	Pw = Mc
		? function (e) {
				return e == null
					? []
					: ((e = Object(e)),
						Ow(Mc(e), function (t) {
							return _w.call(e, t);
						}));
			}
		: Sw,
	$w = Pw;
function Tw(e, t) {
	for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
	return n;
}
var Ew = Tw,
	jw = Ot,
	Mw = St,
	Cw = '[object Arguments]';
function kw(e) {
	return Mw(e) && jw(e) == Cw;
}
var Iw = kw,
	Cc = Iw,
	Nw = St,
	Rp = Object.prototype,
	Dw = Rp.hasOwnProperty,
	Bw = Rp.propertyIsEnumerable,
	Lw = Cc(
		(function () {
			return arguments;
		})(),
	)
		? Cc
		: function (e) {
				return Nw(e) && Dw.call(e, 'callee') && !Bw.call(e, 'callee');
			},
	vs = Lw,
	ji = { exports: {} };
function Rw() {
	return !1;
}
var Fw = Rw;
ji.exports;
(function (e, t) {
	var r = lt,
		n = Fw,
		i = t && !t.nodeType && t,
		a = i && !0 && e && !e.nodeType && e,
		o = a && a.exports === i,
		u = o ? r.Buffer : void 0,
		s = u ? u.isBuffer : void 0,
		c = s || n;
	e.exports = c;
})(ji, ji.exports);
var Fp = ji.exports,
	Ww = 9007199254740991,
	Uw = /^(?:0|[1-9]\d*)$/;
function zw(e, t) {
	var r = typeof e;
	return (
		(t = t ?? Ww),
		!!t &&
			(r == 'number' || (r != 'symbol' && Uw.test(e))) &&
			e > -1 &&
			e % 1 == 0 &&
			e < t
	);
}
var ys = zw,
	qw = 9007199254740991;
function Hw(e) {
	return typeof e == 'number' && e > -1 && e % 1 == 0 && e <= qw;
}
var ms = Hw,
	Kw = Ot,
	Gw = ms,
	Xw = St,
	Vw = '[object Arguments]',
	Yw = '[object Array]',
	Zw = '[object Boolean]',
	Jw = '[object Date]',
	Qw = '[object Error]',
	eO = '[object Function]',
	tO = '[object Map]',
	rO = '[object Number]',
	nO = '[object Object]',
	iO = '[object RegExp]',
	aO = '[object Set]',
	oO = '[object String]',
	uO = '[object WeakMap]',
	sO = '[object ArrayBuffer]',
	cO = '[object DataView]',
	lO = '[object Float32Array]',
	fO = '[object Float64Array]',
	hO = '[object Int8Array]',
	pO = '[object Int16Array]',
	dO = '[object Int32Array]',
	vO = '[object Uint8Array]',
	yO = '[object Uint8ClampedArray]',
	mO = '[object Uint16Array]',
	gO = '[object Uint32Array]',
	ce = {};
ce[lO] =
	ce[fO] =
	ce[hO] =
	ce[pO] =
	ce[dO] =
	ce[vO] =
	ce[yO] =
	ce[mO] =
	ce[gO] =
		!0;
ce[Vw] =
	ce[Yw] =
	ce[sO] =
	ce[Zw] =
	ce[cO] =
	ce[Jw] =
	ce[Qw] =
	ce[eO] =
	ce[tO] =
	ce[rO] =
	ce[nO] =
	ce[iO] =
	ce[aO] =
	ce[oO] =
	ce[uO] =
		!1;
function bO(e) {
	return Xw(e) && Gw(e.length) && !!ce[Kw(e)];
}
var xO = bO;
function wO(e) {
	return function (t) {
		return e(t);
	};
}
var Wp = wO,
	Mi = { exports: {} };
Mi.exports;
(function (e, t) {
	var r = Vh,
		n = t && !t.nodeType && t,
		i = n && !0 && e && !e.nodeType && e,
		a = i && i.exports === n,
		o = a && r.process,
		u = (function () {
			try {
				var s = i && i.require && i.require('util').types;
				return s || (o && o.binding && o.binding('util'));
			} catch {}
		})();
	e.exports = u;
})(Mi, Mi.exports);
var OO = Mi.exports,
	SO = xO,
	AO = Wp,
	kc = OO,
	Ic = kc && kc.isTypedArray,
	_O = Ic ? AO(Ic) : SO,
	Up = _O,
	PO = Ew,
	$O = vs,
	TO = Ne,
	EO = Fp,
	jO = ys,
	MO = Up,
	CO = Object.prototype,
	kO = CO.hasOwnProperty;
function IO(e, t) {
	var r = TO(e),
		n = !r && $O(e),
		i = !r && !n && EO(e),
		a = !r && !n && !i && MO(e),
		o = r || n || i || a,
		u = o ? PO(e.length, String) : [],
		s = u.length;
	for (var c in e)
		(t || kO.call(e, c)) &&
			!(
				o &&
				(c == 'length' ||
					(i && (c == 'offset' || c == 'parent')) ||
					(a &&
						(c == 'buffer' ||
							c == 'byteLength' ||
							c == 'byteOffset')) ||
					jO(c, s))
			) &&
			u.push(c);
	return u;
}
var NO = IO,
	DO = Object.prototype;
function BO(e) {
	var t = e && e.constructor,
		r = (typeof t == 'function' && t.prototype) || DO;
	return e === r;
}
var LO = BO;
function RO(e, t) {
	return function (r) {
		return e(t(r));
	};
}
var zp = RO,
	FO = zp,
	WO = FO(Object.keys, Object),
	UO = WO,
	zO = LO,
	qO = UO,
	HO = Object.prototype,
	KO = HO.hasOwnProperty;
function GO(e) {
	if (!zO(e)) return qO(e);
	var t = [];
	for (var r in Object(e)) KO.call(e, r) && r != 'constructor' && t.push(r);
	return t;
}
var XO = GO,
	VO = Zu,
	YO = ms;
function ZO(e) {
	return e != null && YO(e.length) && !VO(e);
}
var Ca = ZO,
	JO = NO,
	QO = XO,
	eS = Ca;
function tS(e) {
	return eS(e) ? JO(e) : QO(e);
}
var gs = tS,
	rS = mw,
	nS = $w,
	iS = gs;
function aS(e) {
	return rS(e, iS, nS);
}
var oS = aS,
	Nc = oS,
	uS = 1,
	sS = Object.prototype,
	cS = sS.hasOwnProperty;
function lS(e, t, r, n, i, a) {
	var o = r & uS,
		u = Nc(e),
		s = u.length,
		c = Nc(t),
		f = c.length;
	if (s != f && !o) return !1;
	for (var l = s; l--; ) {
		var h = u[l];
		if (!(o ? h in t : cS.call(t, h))) return !1;
	}
	var p = a.get(e),
		y = a.get(t);
	if (p && y) return p == t && y == e;
	var v = !0;
	a.set(e, t), a.set(t, e);
	for (var d = o; ++l < s; ) {
		h = u[l];
		var w = e[h],
			b = t[h];
		if (n) var x = o ? n(b, w, h, t, e, a) : n(w, b, h, e, t, a);
		if (!(x === void 0 ? w === b || i(w, b, r, n, a) : x)) {
			v = !1;
			break;
		}
		d || (d = h == 'constructor');
	}
	if (v && !d) {
		var m = e.constructor,
			g = t.constructor;
		m != g &&
			'constructor' in e &&
			'constructor' in t &&
			!(
				typeof m == 'function' &&
				m instanceof m &&
				typeof g == 'function' &&
				g instanceof g
			) &&
			(v = !1);
	}
	return a.delete(e), a.delete(t), v;
}
var fS = lS,
	hS = er,
	pS = lt,
	dS = hS(pS, 'DataView'),
	vS = dS,
	yS = er,
	mS = lt,
	gS = yS(mS, 'Promise'),
	bS = gS,
	xS = er,
	wS = lt,
	OS = xS(wS, 'Set'),
	qp = OS,
	SS = er,
	AS = lt,
	_S = SS(AS, 'WeakMap'),
	PS = _S,
	Go = vS,
	Xo = Qu,
	Vo = bS,
	Yo = qp,
	Zo = PS,
	Hp = Ot,
	Ir = Zh,
	Dc = '[object Map]',
	$S = '[object Object]',
	Bc = '[object Promise]',
	Lc = '[object Set]',
	Rc = '[object WeakMap]',
	Fc = '[object DataView]',
	TS = Ir(Go),
	ES = Ir(Xo),
	jS = Ir(Vo),
	MS = Ir(Yo),
	CS = Ir(Zo),
	Wt = Hp;
((Go && Wt(new Go(new ArrayBuffer(1))) != Fc) ||
	(Xo && Wt(new Xo()) != Dc) ||
	(Vo && Wt(Vo.resolve()) != Bc) ||
	(Yo && Wt(new Yo()) != Lc) ||
	(Zo && Wt(new Zo()) != Rc)) &&
	(Wt = function (e) {
		var t = Hp(e),
			r = t == $S ? e.constructor : void 0,
			n = r ? Ir(r) : '';
		if (n)
			switch (n) {
				case TS:
					return Fc;
				case ES:
					return Dc;
				case jS:
					return Bc;
				case MS:
					return Lc;
				case CS:
					return Rc;
			}
		return t;
	});
var kS = Wt,
	io = kp,
	IS = Bp,
	NS = hw,
	DS = fS,
	Wc = kS,
	Uc = Ne,
	zc = Fp,
	BS = Up,
	LS = 1,
	qc = '[object Arguments]',
	Hc = '[object Array]',
	ui = '[object Object]',
	RS = Object.prototype,
	Kc = RS.hasOwnProperty;
function FS(e, t, r, n, i, a) {
	var o = Uc(e),
		u = Uc(t),
		s = o ? Hc : Wc(e),
		c = u ? Hc : Wc(t);
	(s = s == qc ? ui : s), (c = c == qc ? ui : c);
	var f = s == ui,
		l = c == ui,
		h = s == c;
	if (h && zc(e)) {
		if (!zc(t)) return !1;
		(o = !0), (f = !1);
	}
	if (h && !f)
		return (
			a || (a = new io()),
			o || BS(e) ? IS(e, t, r, n, i, a) : NS(e, t, s, r, n, i, a)
		);
	if (!(r & LS)) {
		var p = f && Kc.call(e, '__wrapped__'),
			y = l && Kc.call(t, '__wrapped__');
		if (p || y) {
			var v = p ? e.value() : e,
				d = y ? t.value() : t;
			return a || (a = new io()), i(v, d, r, n, a);
		}
	}
	return h ? (a || (a = new io()), DS(e, t, r, n, i, a)) : !1;
}
var WS = FS,
	US = WS,
	Gc = St;
function Kp(e, t, r, n, i) {
	return e === t
		? !0
		: e == null || t == null || (!Gc(e) && !Gc(t))
			? e !== e && t !== t
			: US(e, t, r, n, Kp, i);
}
var bs = Kp,
	zS = kp,
	qS = bs,
	HS = 1,
	KS = 2;
function GS(e, t, r, n) {
	var i = r.length,
		a = i,
		o = !n;
	if (e == null) return !a;
	for (e = Object(e); i--; ) {
		var u = r[i];
		if (o && u[2] ? u[1] !== e[u[0]] : !(u[0] in e)) return !1;
	}
	for (; ++i < a; ) {
		u = r[i];
		var s = u[0],
			c = e[s],
			f = u[1];
		if (o && u[2]) {
			if (c === void 0 && !(s in e)) return !1;
		} else {
			var l = new zS();
			if (n) var h = n(c, f, s, e, t, l);
			if (!(h === void 0 ? qS(f, c, HS | KS, n, l) : h)) return !1;
		}
	}
	return !0;
}
var XS = GS,
	VS = Mt;
function YS(e) {
	return e === e && !VS(e);
}
var Gp = YS,
	ZS = Gp,
	JS = gs;
function QS(e) {
	for (var t = JS(e), r = t.length; r--; ) {
		var n = t[r],
			i = e[n];
		t[r] = [n, i, ZS(i)];
	}
	return t;
}
var eA = QS;
function tA(e, t) {
	return function (r) {
		return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
	};
}
var Xp = tA,
	rA = XS,
	nA = eA,
	iA = Xp;
function aA(e) {
	var t = nA(e);
	return t.length == 1 && t[0][2]
		? iA(t[0][0], t[0][1])
		: function (r) {
				return r === e || rA(r, e, t);
			};
}
var oA = aA;
function uA(e, t) {
	return e != null && t in Object(e);
}
var sA = uA,
	cA = rp,
	lA = vs,
	fA = Ne,
	hA = ys,
	pA = ms,
	dA = ma;
function vA(e, t, r) {
	t = cA(t, e);
	for (var n = -1, i = t.length, a = !1; ++n < i; ) {
		var o = dA(t[n]);
		if (!(a = e != null && r(e, o))) break;
		e = e[o];
	}
	return a || ++n != i
		? a
		: ((i = e == null ? 0 : e.length),
			!!i && pA(i) && hA(o, i) && (fA(e) || lA(e)));
}
var yA = vA,
	mA = sA,
	gA = yA;
function bA(e, t) {
	return e != null && gA(e, t, mA);
}
var xA = bA,
	wA = bs,
	OA = np,
	SA = xA,
	AA = Yu,
	_A = Gp,
	PA = Xp,
	$A = ma,
	TA = 1,
	EA = 2;
function jA(e, t) {
	return AA(e) && _A(t)
		? PA($A(e), t)
		: function (r) {
				var n = OA(r, e);
				return n === void 0 && n === t ? SA(r, e) : wA(t, n, TA | EA);
			};
}
var MA = jA;
function CA(e) {
	return e;
}
var Nr = CA;
function kA(e) {
	return function (t) {
		return t == null ? void 0 : t[e];
	};
}
var IA = kA,
	NA = ns;
function DA(e) {
	return function (t) {
		return NA(t, e);
	};
}
var BA = DA,
	LA = IA,
	RA = BA,
	FA = Yu,
	WA = ma;
function UA(e) {
	return FA(e) ? LA(WA(e)) : RA(e);
}
var zA = UA,
	qA = oA,
	HA = MA,
	KA = Nr,
	GA = Ne,
	XA = zA;
function VA(e) {
	return typeof e == 'function'
		? e
		: e == null
			? KA
			: typeof e == 'object'
				? GA(e)
					? HA(e[0], e[1])
					: qA(e)
				: XA(e);
}
var Dr = VA;
function YA(e, t, r, n) {
	for (var i = e.length, a = r + (n ? 1 : -1); n ? a-- : ++a < i; )
		if (t(e[a], a, e)) return a;
	return -1;
}
var ZA = YA;
function JA(e) {
	return e !== e;
}
var QA = JA;
function e_(e, t, r) {
	for (var n = r - 1, i = e.length; ++n < i; ) if (e[n] === t) return n;
	return -1;
}
var t_ = e_,
	r_ = ZA,
	n_ = QA,
	i_ = t_;
function a_(e, t, r) {
	return t === t ? i_(e, t, r) : r_(e, n_, r);
}
var o_ = a_,
	u_ = o_;
function s_(e, t) {
	var r = e == null ? 0 : e.length;
	return !!r && u_(e, t, 0) > -1;
}
var c_ = s_;
function l_(e, t, r) {
	for (var n = -1, i = e == null ? 0 : e.length; ++n < i; )
		if (r(t, e[n])) return !0;
	return !1;
}
var f_ = l_;
function h_() {}
var p_ = h_,
	ao = qp,
	d_ = p_,
	v_ = ds,
	y_ = 1 / 0,
	m_ =
		ao && 1 / v_(new ao([, -0]))[1] == y_
			? function (e) {
					return new ao(e);
				}
			: d_,
	g_ = m_,
	b_ = Ip,
	x_ = c_,
	w_ = f_,
	O_ = Dp,
	S_ = g_,
	A_ = ds,
	__ = 200;
function P_(e, t, r) {
	var n = -1,
		i = x_,
		a = e.length,
		o = !0,
		u = [],
		s = u;
	if (r) (o = !1), (i = w_);
	else if (a >= __) {
		var c = t ? null : S_(e);
		if (c) return A_(c);
		(o = !1), (i = O_), (s = new b_());
	} else s = t ? [] : u;
	e: for (; ++n < a; ) {
		var f = e[n],
			l = t ? t(f) : f;
		if (((f = r || f !== 0 ? f : 0), o && l === l)) {
			for (var h = s.length; h--; ) if (s[h] === l) continue e;
			t && s.push(l), u.push(f);
		} else i(s, l, r) || (s !== u && s.push(l), u.push(f));
	}
	return u;
}
var $_ = P_,
	T_ = Dr,
	E_ = $_;
function j_(e, t) {
	return e && e.length ? E_(e, T_(t)) : [];
}
var M_ = j_;
const Xc = fe(M_);
function Vp(e, t, r) {
	return t === !0 ? Xc(e, r) : Z(t) ? Xc(e, t) : e;
}
function pr(e) {
	'@babel/helpers - typeof';
	return (
		(pr =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		pr(e)
	);
}
var C_ = ['ref'];
function Vc(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Rt(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Vc(Object(r), !0).forEach(function (n) {
					ka(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: Vc(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function k_(e, t) {
	if (!(e instanceof t))
		throw new TypeError('Cannot call a class as a function');
}
function Yc(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			'value' in n && (n.writable = !0),
			Object.defineProperty(e, Jp(n.key), n);
	}
}
function I_(e, t, r) {
	return (
		t && Yc(e.prototype, t),
		r && Yc(e, r),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		e
	);
}
function N_(e, t, r) {
	return (
		(t = Ci(t)),
		D_(
			e,
			Yp()
				? Reflect.construct(t, r || [], Ci(e).constructor)
				: t.apply(e, r),
		)
	);
}
function D_(e, t) {
	if (t && (pr(t) === 'object' || typeof t == 'function')) return t;
	if (t !== void 0)
		throw new TypeError(
			'Derived constructors may only return object or undefined',
		);
	return Zp(e);
}
function Yp() {
	try {
		var e = !Boolean.prototype.valueOf.call(
			Reflect.construct(Boolean, [], function () {}),
		);
	} catch {}
	return (Yp = function () {
		return !!e;
	})();
}
function Ci(e) {
	return (
		(Ci = Object.setPrototypeOf
			? Object.getPrototypeOf.bind()
			: function (r) {
					return r.__proto__ || Object.getPrototypeOf(r);
				}),
		Ci(e)
	);
}
function Zp(e) {
	if (e === void 0)
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called",
		);
	return e;
}
function B_(e, t) {
	if (typeof t != 'function' && t !== null)
		throw new TypeError(
			'Super expression must either be null or a function',
		);
	(e.prototype = Object.create(t && t.prototype, {
		constructor: { value: e, writable: !0, configurable: !0 },
	})),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		t && Jo(e, t);
}
function Jo(e, t) {
	return (
		(Jo = Object.setPrototypeOf
			? Object.setPrototypeOf.bind()
			: function (n, i) {
					return (n.__proto__ = i), n;
				}),
		Jo(e, t)
	);
}
function ka(e, t, r) {
	return (
		(t = Jp(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function Jp(e) {
	var t = L_(e, 'string');
	return pr(t) == 'symbol' ? t : String(t);
}
function L_(e, t) {
	if (pr(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (pr(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
function R_(e, t) {
	if (e == null) return {};
	var r = F_(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function F_(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
function W_(e) {
	return e.value;
}
function U_(e, t) {
	if (_.isValidElement(e)) return _.cloneElement(e, t);
	if (typeof e == 'function') return _.createElement(e, t);
	t.ref;
	var r = R_(t, C_);
	return _.createElement(ps, r);
}
var Zc = 1,
	ln = (function (e) {
		B_(t, e);
		function t() {
			var r;
			k_(this, t);
			for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
				i[a] = arguments[a];
			return (
				(r = N_(this, t, [].concat(i))),
				ka(Zp(r), 'lastBoundingBox', { width: -1, height: -1 }),
				r
			);
		}
		return (
			I_(
				t,
				[
					{
						key: 'componentDidMount',
						value: function () {
							this.updateBBox();
						},
					},
					{
						key: 'componentDidUpdate',
						value: function () {
							this.updateBBox();
						},
					},
					{
						key: 'getBBox',
						value: function () {
							if (
								this.wrapperNode &&
								this.wrapperNode.getBoundingClientRect
							) {
								var n =
									this.wrapperNode.getBoundingClientRect();
								return (
									(n.height = this.wrapperNode.offsetHeight),
									(n.width = this.wrapperNode.offsetWidth),
									n
								);
							}
							return null;
						},
					},
					{
						key: 'updateBBox',
						value: function () {
							var n = this.props.onBBoxUpdate,
								i = this.getBBox();
							i
								? (Math.abs(
										i.width - this.lastBoundingBox.width,
									) > Zc ||
										Math.abs(
											i.height -
												this.lastBoundingBox.height,
										) > Zc) &&
									((this.lastBoundingBox.width = i.width),
									(this.lastBoundingBox.height = i.height),
									n && n(i))
								: (this.lastBoundingBox.width !== -1 ||
										this.lastBoundingBox.height !== -1) &&
									((this.lastBoundingBox.width = -1),
									(this.lastBoundingBox.height = -1),
									n && n(null));
						},
					},
					{
						key: 'getBBoxSnapshot',
						value: function () {
							return this.lastBoundingBox.width >= 0 &&
								this.lastBoundingBox.height >= 0
								? Rt({}, this.lastBoundingBox)
								: { width: 0, height: 0 };
						},
					},
					{
						key: 'getDefaultPosition',
						value: function (n) {
							var i = this.props,
								a = i.layout,
								o = i.align,
								u = i.verticalAlign,
								s = i.margin,
								c = i.chartWidth,
								f = i.chartHeight,
								l,
								h;
							if (
								!n ||
								((n.left === void 0 || n.left === null) &&
									(n.right === void 0 || n.right === null))
							)
								if (o === 'center' && a === 'vertical') {
									var p = this.getBBoxSnapshot();
									l = { left: ((c || 0) - p.width) / 2 };
								} else
									l =
										o === 'right'
											? { right: (s && s.right) || 0 }
											: { left: (s && s.left) || 0 };
							if (
								!n ||
								((n.top === void 0 || n.top === null) &&
									(n.bottom === void 0 || n.bottom === null))
							)
								if (u === 'middle') {
									var y = this.getBBoxSnapshot();
									h = { top: ((f || 0) - y.height) / 2 };
								} else
									h =
										u === 'bottom'
											? { bottom: (s && s.bottom) || 0 }
											: { top: (s && s.top) || 0 };
							return Rt(Rt({}, l), h);
						},
					},
					{
						key: 'render',
						value: function () {
							var n = this,
								i = this.props,
								a = i.content,
								o = i.width,
								u = i.height,
								s = i.wrapperStyle,
								c = i.payloadUniqBy,
								f = i.payload,
								l = Rt(
									Rt(
										{
											position: 'absolute',
											width: o || 'auto',
											height: u || 'auto',
										},
										this.getDefaultPosition(s),
									),
									s,
								);
							return _.createElement(
								'div',
								{
									className: 'recharts-legend-wrapper',
									style: l,
									ref: function (p) {
										n.wrapperNode = p;
									},
								},
								U_(
									a,
									Rt(
										Rt({}, this.props),
										{},
										{ payload: Vp(f, c, W_) },
									),
								),
							);
						},
					},
				],
				[
					{
						key: 'getWithHeight',
						value: function (n, i) {
							var a = n.props.layout;
							return a === 'vertical' && F(n.props.height)
								? { height: n.props.height }
								: a === 'horizontal'
									? { width: n.props.width || i }
									: null;
						},
					},
				],
			),
			t
		);
	})(D.PureComponent);
ka(ln, 'displayName', 'Legend');
ka(ln, 'defaultProps', {
	iconSize: 14,
	layout: 'horizontal',
	align: 'center',
	verticalAlign: 'bottom',
});
var Jc = Xn,
	z_ = vs,
	q_ = Ne,
	Qc = Jc ? Jc.isConcatSpreadable : void 0;
function H_(e) {
	return q_(e) || z_(e) || !!(Qc && e && e[Qc]);
}
var K_ = H_,
	G_ = Lp,
	X_ = K_;
function Qp(e, t, r, n, i) {
	var a = -1,
		o = e.length;
	for (r || (r = X_), i || (i = []); ++a < o; ) {
		var u = e[a];
		t > 0 && r(u)
			? t > 1
				? Qp(u, t - 1, r, n, i)
				: G_(i, u)
			: n || (i[i.length] = u);
	}
	return i;
}
var ed = Qp;
function V_(e) {
	return function (t, r, n) {
		for (var i = -1, a = Object(t), o = n(t), u = o.length; u--; ) {
			var s = o[e ? u : ++i];
			if (r(a[s], s, a) === !1) break;
		}
		return t;
	};
}
var Y_ = V_,
	Z_ = Y_,
	J_ = Z_(),
	Q_ = J_,
	eP = Q_,
	tP = gs;
function rP(e, t) {
	return e && eP(e, t, tP);
}
var td = rP,
	nP = Ca;
function iP(e, t) {
	return function (r, n) {
		if (r == null) return r;
		if (!nP(r)) return e(r, n);
		for (
			var i = r.length, a = t ? i : -1, o = Object(r);
			(t ? a-- : ++a < i) && n(o[a], a, o) !== !1;

		);
		return r;
	};
}
var aP = iP,
	oP = td,
	uP = aP,
	sP = uP(oP),
	xs = sP,
	cP = xs,
	lP = Ca;
function fP(e, t) {
	var r = -1,
		n = lP(e) ? Array(e.length) : [];
	return (
		cP(e, function (i, a, o) {
			n[++r] = t(i, a, o);
		}),
		n
	);
}
var rd = fP;
function hP(e, t) {
	var r = e.length;
	for (e.sort(t); r--; ) e[r] = e[r].value;
	return e;
}
var pP = hP,
	el = $r;
function dP(e, t) {
	if (e !== t) {
		var r = e !== void 0,
			n = e === null,
			i = e === e,
			a = el(e),
			o = t !== void 0,
			u = t === null,
			s = t === t,
			c = el(t);
		if (
			(!u && !c && !a && e > t) ||
			(a && o && s && !u && !c) ||
			(n && o && s) ||
			(!r && s) ||
			!i
		)
			return 1;
		if (
			(!n && !a && !c && e < t) ||
			(c && r && i && !n && !a) ||
			(u && r && i) ||
			(!o && i) ||
			!s
		)
			return -1;
	}
	return 0;
}
var vP = dP,
	yP = vP;
function mP(e, t, r) {
	for (
		var n = -1, i = e.criteria, a = t.criteria, o = i.length, u = r.length;
		++n < o;

	) {
		var s = yP(i[n], a[n]);
		if (s) {
			if (n >= u) return s;
			var c = r[n];
			return s * (c == 'desc' ? -1 : 1);
		}
	}
	return e.index - t.index;
}
var gP = mP,
	oo = rs,
	bP = ns,
	xP = Dr,
	wP = rd,
	OP = pP,
	SP = Wp,
	AP = gP,
	_P = Nr,
	PP = Ne;
function $P(e, t, r) {
	t.length
		? (t = oo(t, function (a) {
				return PP(a)
					? function (o) {
							return bP(o, a.length === 1 ? a[0] : a);
						}
					: a;
			}))
		: (t = [_P]);
	var n = -1;
	t = oo(t, SP(xP));
	var i = wP(e, function (a, o, u) {
		var s = oo(t, function (c) {
			return c(a);
		});
		return { criteria: s, index: ++n, value: a };
	});
	return OP(i, function (a, o) {
		return AP(a, o, r);
	});
}
var TP = $P;
function EP(e, t, r) {
	switch (r.length) {
		case 0:
			return e.call(t);
		case 1:
			return e.call(t, r[0]);
		case 2:
			return e.call(t, r[0], r[1]);
		case 3:
			return e.call(t, r[0], r[1], r[2]);
	}
	return e.apply(t, r);
}
var jP = EP,
	MP = jP,
	tl = Math.max;
function CP(e, t, r) {
	return (
		(t = tl(t === void 0 ? e.length - 1 : t, 0)),
		function () {
			for (
				var n = arguments,
					i = -1,
					a = tl(n.length - t, 0),
					o = Array(a);
				++i < a;

			)
				o[i] = n[t + i];
			i = -1;
			for (var u = Array(t + 1); ++i < t; ) u[i] = n[i];
			return (u[t] = r(o)), MP(e, this, u);
		}
	);
}
var kP = CP;
function IP(e) {
	return function () {
		return e;
	};
}
var NP = IP,
	DP = er,
	BP = (function () {
		try {
			var e = DP(Object, 'defineProperty');
			return e({}, '', {}), e;
		} catch {}
	})(),
	nd = BP,
	LP = NP,
	rl = nd,
	RP = Nr,
	FP = rl
		? function (e, t) {
				return rl(e, 'toString', {
					configurable: !0,
					enumerable: !1,
					value: LP(t),
					writable: !0,
				});
			}
		: RP,
	WP = FP,
	UP = 800,
	zP = 16,
	qP = Date.now;
function HP(e) {
	var t = 0,
		r = 0;
	return function () {
		var n = qP(),
			i = zP - (n - r);
		if (((r = n), i > 0)) {
			if (++t >= UP) return arguments[0];
		} else t = 0;
		return e.apply(void 0, arguments);
	};
}
var KP = HP,
	GP = WP,
	XP = KP,
	VP = XP(GP),
	YP = VP,
	ZP = Nr,
	JP = kP,
	QP = YP;
function e$(e, t) {
	return QP(JP(e, t, ZP), e + '');
}
var t$ = e$,
	r$ = Ju,
	n$ = Ca,
	i$ = ys,
	a$ = Mt;
function o$(e, t, r) {
	if (!a$(r)) return !1;
	var n = typeof t;
	return (n == 'number' ? n$(r) && i$(t, r.length) : n == 'string' && t in r)
		? r$(r[t], e)
		: !1;
}
var Ia = o$,
	u$ = ed,
	s$ = TP,
	c$ = t$,
	nl = Ia,
	l$ = c$(function (e, t) {
		if (e == null) return [];
		var r = t.length;
		return (
			r > 1 && nl(e, t[0], t[1])
				? (t = [])
				: r > 2 && nl(t[0], t[1], t[2]) && (t = [t[0]]),
			s$(e, u$(t, 1), [])
		);
	}),
	f$ = l$;
const ws = fe(f$);
function fn(e) {
	'@babel/helpers - typeof';
	return (
		(fn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		fn(e)
	);
}
function Qo() {
	return (
		(Qo = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		Qo.apply(this, arguments)
	);
}
function h$(e, t) {
	return y$(e) || v$(e, t) || d$(e, t) || p$();
}
function p$() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function d$(e, t) {
	if (e) {
		if (typeof e == 'string') return il(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return il(e, t);
	}
}
function il(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function v$(e, t) {
	var r =
		e == null
			? null
			: (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			s = !0,
			c = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (
					;
					!(s = (n = a.call(r)).done) &&
					(u.push(n.value), u.length !== t);
					s = !0
				);
		} catch (f) {
			(c = !0), (i = f);
		} finally {
			try {
				if (
					!s &&
					r.return != null &&
					((o = r.return()), Object(o) !== o)
				)
					return;
			} finally {
				if (c) throw i;
			}
		}
		return u;
	}
}
function y$(e) {
	if (Array.isArray(e)) return e;
}
function al(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function uo(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? al(Object(r), !0).forEach(function (n) {
					m$(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: al(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function m$(e, t, r) {
	return (
		(t = g$(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function g$(e) {
	var t = b$(e, 'string');
	return fn(t) == 'symbol' ? t : String(t);
}
function b$(e, t) {
	if (fn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (fn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
function x$(e) {
	return Array.isArray(e) && be(e[0]) && be(e[1]) ? e.join(' ~ ') : e;
}
var w$ = function (t) {
	var r = t.separator,
		n = r === void 0 ? ' : ' : r,
		i = t.contentStyle,
		a = i === void 0 ? {} : i,
		o = t.itemStyle,
		u = o === void 0 ? {} : o,
		s = t.labelStyle,
		c = s === void 0 ? {} : s,
		f = t.payload,
		l = t.formatter,
		h = t.itemSorter,
		p = t.wrapperClassName,
		y = t.labelClassName,
		v = t.label,
		d = t.labelFormatter,
		w = t.accessibilityLayer,
		b = w === void 0 ? !1 : w,
		x = function () {
			if (f && f.length) {
				var $ = { padding: 0, margin: 0 },
					j = (h ? ws(f, h) : f).map(function (M, B) {
						if (M.type === 'none') return null;
						var I = uo(
								{
									display: 'block',
									paddingTop: 4,
									paddingBottom: 4,
									color: M.color || '#000',
								},
								u,
							),
							L = M.formatter || l || x$,
							R = M.value,
							z = M.name,
							K = R,
							V = z;
						if (L && K != null && V != null) {
							var q = L(R, z, M, B, f);
							if (Array.isArray(q)) {
								var Q = h$(q, 2);
								(K = Q[0]), (V = Q[1]);
							} else K = q;
						}
						return _.createElement(
							'li',
							{
								className: 'recharts-tooltip-item',
								key: 'tooltip-item-'.concat(B),
								style: I,
							},
							be(V)
								? _.createElement(
										'span',
										{
											className:
												'recharts-tooltip-item-name',
										},
										V,
									)
								: null,
							be(V)
								? _.createElement(
										'span',
										{
											className:
												'recharts-tooltip-item-separator',
										},
										n,
									)
								: null,
							_.createElement(
								'span',
								{ className: 'recharts-tooltip-item-value' },
								K,
							),
							_.createElement(
								'span',
								{ className: 'recharts-tooltip-item-unit' },
								M.unit || '',
							),
						);
					});
				return _.createElement(
					'ul',
					{ className: 'recharts-tooltip-item-list', style: $ },
					j,
				);
			}
			return null;
		},
		m = uo(
			{
				margin: 0,
				padding: 10,
				backgroundColor: '#fff',
				border: '1px solid #ccc',
				whiteSpace: 'nowrap',
			},
			a,
		),
		g = uo({ margin: 0 }, c),
		O = !ee(v),
		S = O ? v : '',
		A = ne('recharts-default-tooltip', p),
		E = ne('recharts-tooltip-label', y);
	O && d && f !== void 0 && f !== null && (S = d(v, f));
	var T = b ? { role: 'status', 'aria-live': 'assertive' } : {};
	return _.createElement(
		'div',
		Qo({ className: A, style: m }, T),
		_.createElement(
			'p',
			{ className: E, style: g },
			_.isValidElement(S) ? S : ''.concat(S),
		),
		x(),
	);
};
function hn(e) {
	'@babel/helpers - typeof';
	return (
		(hn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		hn(e)
	);
}
function si(e, t, r) {
	return (
		(t = O$(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function O$(e) {
	var t = S$(e, 'string');
	return hn(t) == 'symbol' ? t : String(t);
}
function S$(e, t) {
	if (hn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (hn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var zr = 'recharts-tooltip-wrapper',
	A$ = { visibility: 'hidden' };
function _$(e) {
	var t = e.coordinate,
		r = e.translateX,
		n = e.translateY;
	return ne(
		zr,
		si(
			si(
				si(
					si(
						{},
						''.concat(zr, '-right'),
						F(r) && t && F(t.x) && r >= t.x,
					),
					''.concat(zr, '-left'),
					F(r) && t && F(t.x) && r < t.x,
				),
				''.concat(zr, '-bottom'),
				F(n) && t && F(t.y) && n >= t.y,
			),
			''.concat(zr, '-top'),
			F(n) && t && F(t.y) && n < t.y,
		),
	);
}
function ol(e) {
	var t = e.allowEscapeViewBox,
		r = e.coordinate,
		n = e.key,
		i = e.offsetTopLeft,
		a = e.position,
		o = e.reverseDirection,
		u = e.tooltipDimension,
		s = e.viewBox,
		c = e.viewBoxDimension;
	if (a && F(a[n])) return a[n];
	var f = r[n] - u - i,
		l = r[n] + i;
	if (t[n]) return o[n] ? f : l;
	if (o[n]) {
		var h = f,
			p = s[n];
		return h < p ? Math.max(l, s[n]) : Math.max(f, s[n]);
	}
	var y = l + u,
		v = s[n] + c;
	return y > v ? Math.max(f, s[n]) : Math.max(l, s[n]);
}
function P$(e) {
	var t = e.translateX,
		r = e.translateY,
		n = e.useTranslate3d;
	return {
		transform: n
			? 'translate3d('.concat(t, 'px, ').concat(r, 'px, 0)')
			: 'translate('.concat(t, 'px, ').concat(r, 'px)'),
	};
}
function $$(e) {
	var t = e.allowEscapeViewBox,
		r = e.coordinate,
		n = e.offsetTopLeft,
		i = e.position,
		a = e.reverseDirection,
		o = e.tooltipBox,
		u = e.useTranslate3d,
		s = e.viewBox,
		c,
		f,
		l;
	return (
		o.height > 0 && o.width > 0 && r
			? ((f = ol({
					allowEscapeViewBox: t,
					coordinate: r,
					key: 'x',
					offsetTopLeft: n,
					position: i,
					reverseDirection: a,
					tooltipDimension: o.width,
					viewBox: s,
					viewBoxDimension: s.width,
				})),
				(l = ol({
					allowEscapeViewBox: t,
					coordinate: r,
					key: 'y',
					offsetTopLeft: n,
					position: i,
					reverseDirection: a,
					tooltipDimension: o.height,
					viewBox: s,
					viewBoxDimension: s.height,
				})),
				(c = P$({ translateX: f, translateY: l, useTranslate3d: u })))
			: (c = A$),
		{
			cssProperties: c,
			cssClasses: _$({ translateX: f, translateY: l, coordinate: r }),
		}
	);
}
function dr(e) {
	'@babel/helpers - typeof';
	return (
		(dr =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		dr(e)
	);
}
function ul(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function sl(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? ul(Object(r), !0).forEach(function (n) {
					ru(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: ul(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function T$(e, t) {
	if (!(e instanceof t))
		throw new TypeError('Cannot call a class as a function');
}
function E$(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			'value' in n && (n.writable = !0),
			Object.defineProperty(e, ad(n.key), n);
	}
}
function j$(e, t, r) {
	return (
		t && E$(e.prototype, t),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		e
	);
}
function M$(e, t, r) {
	return (
		(t = ki(t)),
		C$(
			e,
			id()
				? Reflect.construct(t, r || [], ki(e).constructor)
				: t.apply(e, r),
		)
	);
}
function C$(e, t) {
	if (t && (dr(t) === 'object' || typeof t == 'function')) return t;
	if (t !== void 0)
		throw new TypeError(
			'Derived constructors may only return object or undefined',
		);
	return eu(e);
}
function id() {
	try {
		var e = !Boolean.prototype.valueOf.call(
			Reflect.construct(Boolean, [], function () {}),
		);
	} catch {}
	return (id = function () {
		return !!e;
	})();
}
function ki(e) {
	return (
		(ki = Object.setPrototypeOf
			? Object.getPrototypeOf.bind()
			: function (r) {
					return r.__proto__ || Object.getPrototypeOf(r);
				}),
		ki(e)
	);
}
function eu(e) {
	if (e === void 0)
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called",
		);
	return e;
}
function k$(e, t) {
	if (typeof t != 'function' && t !== null)
		throw new TypeError(
			'Super expression must either be null or a function',
		);
	(e.prototype = Object.create(t && t.prototype, {
		constructor: { value: e, writable: !0, configurable: !0 },
	})),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		t && tu(e, t);
}
function tu(e, t) {
	return (
		(tu = Object.setPrototypeOf
			? Object.setPrototypeOf.bind()
			: function (n, i) {
					return (n.__proto__ = i), n;
				}),
		tu(e, t)
	);
}
function ru(e, t, r) {
	return (
		(t = ad(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function ad(e) {
	var t = I$(e, 'string');
	return dr(t) == 'symbol' ? t : String(t);
}
function I$(e, t) {
	if (dr(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (dr(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var cl = 1,
	N$ = (function (e) {
		k$(t, e);
		function t() {
			var r;
			T$(this, t);
			for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
				i[a] = arguments[a];
			return (
				(r = M$(this, t, [].concat(i))),
				ru(eu(r), 'state', {
					dismissed: !1,
					dismissedAtCoordinate: { x: 0, y: 0 },
					lastBoundingBox: { width: -1, height: -1 },
				}),
				ru(eu(r), 'handleKeyDown', function (o) {
					if (o.key === 'Escape') {
						var u, s, c, f;
						r.setState({
							dismissed: !0,
							dismissedAtCoordinate: {
								x:
									(u =
										(s = r.props.coordinate) === null ||
										s === void 0
											? void 0
											: s.x) !== null && u !== void 0
										? u
										: 0,
								y:
									(c =
										(f = r.props.coordinate) === null ||
										f === void 0
											? void 0
											: f.y) !== null && c !== void 0
										? c
										: 0,
							},
						});
					}
				}),
				r
			);
		}
		return (
			j$(t, [
				{
					key: 'updateBBox',
					value: function () {
						if (
							this.wrapperNode &&
							this.wrapperNode.getBoundingClientRect
						) {
							var n = this.wrapperNode.getBoundingClientRect();
							(Math.abs(
								n.width - this.state.lastBoundingBox.width,
							) > cl ||
								Math.abs(
									n.height -
										this.state.lastBoundingBox.height,
								) > cl) &&
								this.setState({
									lastBoundingBox: {
										width: n.width,
										height: n.height,
									},
								});
						} else
							(this.state.lastBoundingBox.width !== -1 ||
								this.state.lastBoundingBox.height !== -1) &&
								this.setState({
									lastBoundingBox: { width: -1, height: -1 },
								});
					},
				},
				{
					key: 'componentDidMount',
					value: function () {
						document.addEventListener(
							'keydown',
							this.handleKeyDown,
						),
							this.updateBBox();
					},
				},
				{
					key: 'componentWillUnmount',
					value: function () {
						document.removeEventListener(
							'keydown',
							this.handleKeyDown,
						);
					},
				},
				{
					key: 'componentDidUpdate',
					value: function () {
						var n, i;
						this.props.active && this.updateBBox(),
							this.state.dismissed &&
								(((n = this.props.coordinate) === null ||
								n === void 0
									? void 0
									: n.x) !==
									this.state.dismissedAtCoordinate.x ||
									((i = this.props.coordinate) === null ||
									i === void 0
										? void 0
										: i.y) !==
										this.state.dismissedAtCoordinate.y) &&
								(this.state.dismissed = !1);
					},
				},
				{
					key: 'render',
					value: function () {
						var n = this,
							i = this.props,
							a = i.active,
							o = i.allowEscapeViewBox,
							u = i.animationDuration,
							s = i.animationEasing,
							c = i.children,
							f = i.coordinate,
							l = i.hasPayload,
							h = i.isAnimationActive,
							p = i.offset,
							y = i.position,
							v = i.reverseDirection,
							d = i.useTranslate3d,
							w = i.viewBox,
							b = i.wrapperStyle,
							x = $$({
								allowEscapeViewBox: o,
								coordinate: f,
								offsetTopLeft: p,
								position: y,
								reverseDirection: v,
								tooltipBox: this.state.lastBoundingBox,
								useTranslate3d: d,
								viewBox: w,
							}),
							m = x.cssClasses,
							g = x.cssProperties,
							O = sl(
								sl(
									{
										transition:
											h && a
												? 'transform '
														.concat(u, 'ms ')
														.concat(s)
												: void 0,
									},
									g,
								),
								{},
								{
									pointerEvents: 'none',
									visibility:
										!this.state.dismissed && a && l
											? 'visible'
											: 'hidden',
									position: 'absolute',
									top: 0,
									left: 0,
								},
								b,
							);
						return _.createElement(
							'div',
							{
								tabIndex: -1,
								className: m,
								style: O,
								ref: function (A) {
									n.wrapperNode = A;
								},
							},
							c,
						);
					},
				},
			]),
			t
		);
	})(D.PureComponent),
	D$ = function () {
		return !(
			typeof window < 'u' &&
			window.document &&
			window.document.createElement &&
			window.setTimeout
		);
	},
	yt = {
		isSsr: D$(),
		get: function (t) {
			return yt[t];
		},
		set: function (t, r) {
			if (typeof t == 'string') yt[t] = r;
			else {
				var n = Object.keys(t);
				n &&
					n.length &&
					n.forEach(function (i) {
						yt[i] = t[i];
					});
			}
		},
	};
function vr(e) {
	'@babel/helpers - typeof';
	return (
		(vr =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		vr(e)
	);
}
function ll(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function fl(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? ll(Object(r), !0).forEach(function (n) {
					Os(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: ll(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function B$(e, t) {
	if (!(e instanceof t))
		throw new TypeError('Cannot call a class as a function');
}
function L$(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			'value' in n && (n.writable = !0),
			Object.defineProperty(e, ud(n.key), n);
	}
}
function R$(e, t, r) {
	return (
		t && L$(e.prototype, t),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		e
	);
}
function F$(e, t, r) {
	return (
		(t = Ii(t)),
		W$(
			e,
			od()
				? Reflect.construct(t, r || [], Ii(e).constructor)
				: t.apply(e, r),
		)
	);
}
function W$(e, t) {
	if (t && (vr(t) === 'object' || typeof t == 'function')) return t;
	if (t !== void 0)
		throw new TypeError(
			'Derived constructors may only return object or undefined',
		);
	return U$(e);
}
function U$(e) {
	if (e === void 0)
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called",
		);
	return e;
}
function od() {
	try {
		var e = !Boolean.prototype.valueOf.call(
			Reflect.construct(Boolean, [], function () {}),
		);
	} catch {}
	return (od = function () {
		return !!e;
	})();
}
function Ii(e) {
	return (
		(Ii = Object.setPrototypeOf
			? Object.getPrototypeOf.bind()
			: function (r) {
					return r.__proto__ || Object.getPrototypeOf(r);
				}),
		Ii(e)
	);
}
function z$(e, t) {
	if (typeof t != 'function' && t !== null)
		throw new TypeError(
			'Super expression must either be null or a function',
		);
	(e.prototype = Object.create(t && t.prototype, {
		constructor: { value: e, writable: !0, configurable: !0 },
	})),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		t && nu(e, t);
}
function nu(e, t) {
	return (
		(nu = Object.setPrototypeOf
			? Object.setPrototypeOf.bind()
			: function (n, i) {
					return (n.__proto__ = i), n;
				}),
		nu(e, t)
	);
}
function Os(e, t, r) {
	return (
		(t = ud(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function ud(e) {
	var t = q$(e, 'string');
	return vr(t) == 'symbol' ? t : String(t);
}
function q$(e, t) {
	if (vr(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (vr(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
function H$(e) {
	return e.dataKey;
}
function K$(e, t) {
	return _.isValidElement(e)
		? _.cloneElement(e, t)
		: typeof e == 'function'
			? _.createElement(e, t)
			: _.createElement(w$, t);
}
var it = (function (e) {
	z$(t, e);
	function t() {
		return B$(this, t), F$(this, t, arguments);
	}
	return (
		R$(t, [
			{
				key: 'render',
				value: function () {
					var n = this,
						i = this.props,
						a = i.active,
						o = i.allowEscapeViewBox,
						u = i.animationDuration,
						s = i.animationEasing,
						c = i.content,
						f = i.coordinate,
						l = i.filterNull,
						h = i.isAnimationActive,
						p = i.offset,
						y = i.payload,
						v = i.payloadUniqBy,
						d = i.position,
						w = i.reverseDirection,
						b = i.useTranslate3d,
						x = i.viewBox,
						m = i.wrapperStyle,
						g = y ?? [];
					l &&
						g.length &&
						(g = Vp(
							y.filter(function (S) {
								return (
									S.value != null &&
									(S.hide !== !0 || n.props.includeHidden)
								);
							}),
							v,
							H$,
						));
					var O = g.length > 0;
					return _.createElement(
						N$,
						{
							allowEscapeViewBox: o,
							animationDuration: u,
							animationEasing: s,
							isAnimationActive: h,
							active: a,
							coordinate: f,
							hasPayload: O,
							offset: p,
							position: d,
							reverseDirection: w,
							useTranslate3d: b,
							viewBox: x,
							wrapperStyle: m,
						},
						K$(c, fl(fl({}, this.props), {}, { payload: g })),
					);
				},
			},
		]),
		t
	);
})(D.PureComponent);
Os(it, 'displayName', 'Tooltip');
Os(it, 'defaultProps', {
	accessibilityLayer: !1,
	allowEscapeViewBox: { x: !1, y: !1 },
	animationDuration: 400,
	animationEasing: 'ease',
	contentStyle: {},
	coordinate: { x: 0, y: 0 },
	cursor: !0,
	cursorStyle: {},
	filterNull: !0,
	isAnimationActive: !yt.isSsr,
	itemStyle: {},
	labelStyle: {},
	offset: 10,
	reverseDirection: { x: !1, y: !1 },
	separator: ' : ',
	trigger: 'hover',
	useTranslate3d: !1,
	viewBox: { x: 0, y: 0, height: 0, width: 0 },
	wrapperStyle: {},
});
var G$ = lt,
	X$ = function () {
		return G$.Date.now();
	},
	V$ = X$,
	Y$ = /\s/;
function Z$(e) {
	for (var t = e.length; t-- && Y$.test(e.charAt(t)); );
	return t;
}
var J$ = Z$,
	Q$ = J$,
	eT = /^\s+/;
function tT(e) {
	return e && e.slice(0, Q$(e) + 1).replace(eT, '');
}
var rT = tT,
	nT = rT,
	hl = Mt,
	iT = $r,
	pl = NaN,
	aT = /^[-+]0x[0-9a-f]+$/i,
	oT = /^0b[01]+$/i,
	uT = /^0o[0-7]+$/i,
	sT = parseInt;
function cT(e) {
	if (typeof e == 'number') return e;
	if (iT(e)) return pl;
	if (hl(e)) {
		var t = typeof e.valueOf == 'function' ? e.valueOf() : e;
		e = hl(t) ? t + '' : t;
	}
	if (typeof e != 'string') return e === 0 ? e : +e;
	e = nT(e);
	var r = oT.test(e);
	return r || uT.test(e) ? sT(e.slice(2), r ? 2 : 8) : aT.test(e) ? pl : +e;
}
var sd = cT,
	lT = Mt,
	so = V$,
	dl = sd,
	fT = 'Expected a function',
	hT = Math.max,
	pT = Math.min;
function dT(e, t, r) {
	var n,
		i,
		a,
		o,
		u,
		s,
		c = 0,
		f = !1,
		l = !1,
		h = !0;
	if (typeof e != 'function') throw new TypeError(fT);
	(t = dl(t) || 0),
		lT(r) &&
			((f = !!r.leading),
			(l = 'maxWait' in r),
			(a = l ? hT(dl(r.maxWait) || 0, t) : a),
			(h = 'trailing' in r ? !!r.trailing : h));
	function p(O) {
		var S = n,
			A = i;
		return (n = i = void 0), (c = O), (o = e.apply(A, S)), o;
	}
	function y(O) {
		return (c = O), (u = setTimeout(w, t)), f ? p(O) : o;
	}
	function v(O) {
		var S = O - s,
			A = O - c,
			E = t - S;
		return l ? pT(E, a - A) : E;
	}
	function d(O) {
		var S = O - s,
			A = O - c;
		return s === void 0 || S >= t || S < 0 || (l && A >= a);
	}
	function w() {
		var O = so();
		if (d(O)) return b(O);
		u = setTimeout(w, v(O));
	}
	function b(O) {
		return (u = void 0), h && n ? p(O) : ((n = i = void 0), o);
	}
	function x() {
		u !== void 0 && clearTimeout(u), (c = 0), (n = s = i = u = void 0);
	}
	function m() {
		return u === void 0 ? o : b(so());
	}
	function g() {
		var O = so(),
			S = d(O);
		if (((n = arguments), (i = this), (s = O), S)) {
			if (u === void 0) return y(s);
			if (l) return clearTimeout(u), (u = setTimeout(w, t)), p(s);
		}
		return u === void 0 && (u = setTimeout(w, t)), o;
	}
	return (g.cancel = x), (g.flush = m), g;
}
var vT = dT,
	yT = vT,
	mT = Mt,
	gT = 'Expected a function';
function bT(e, t, r) {
	var n = !0,
		i = !0;
	if (typeof e != 'function') throw new TypeError(gT);
	return (
		mT(r) &&
			((n = 'leading' in r ? !!r.leading : n),
			(i = 'trailing' in r ? !!r.trailing : i)),
		yT(e, t, { leading: n, maxWait: t, trailing: i })
	);
}
var xT = bT;
const cd = fe(xT);
function pn(e) {
	'@babel/helpers - typeof';
	return (
		(pn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		pn(e)
	);
}
function vl(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function ci(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? vl(Object(r), !0).forEach(function (n) {
					wT(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: vl(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function wT(e, t, r) {
	return (
		(t = OT(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function OT(e) {
	var t = ST(e, 'string');
	return pn(t) == 'symbol' ? t : String(t);
}
function ST(e, t) {
	if (pn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (pn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
function AT(e, t) {
	return TT(e) || $T(e, t) || PT(e, t) || _T();
}
function _T() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function PT(e, t) {
	if (e) {
		if (typeof e == 'string') return yl(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return yl(e, t);
	}
}
function yl(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function $T(e, t) {
	var r =
		e == null
			? null
			: (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			s = !0,
			c = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (
					;
					!(s = (n = a.call(r)).done) &&
					(u.push(n.value), u.length !== t);
					s = !0
				);
		} catch (f) {
			(c = !0), (i = f);
		} finally {
			try {
				if (
					!s &&
					r.return != null &&
					((o = r.return()), Object(o) !== o)
				)
					return;
			} finally {
				if (c) throw i;
			}
		}
		return u;
	}
}
function TT(e) {
	if (Array.isArray(e)) return e;
}
var ET = D.forwardRef(function (e, t) {
		var r = e.aspect,
			n = e.initialDimension,
			i = n === void 0 ? { width: -1, height: -1 } : n,
			a = e.width,
			o = a === void 0 ? '100%' : a,
			u = e.height,
			s = u === void 0 ? '100%' : u,
			c = e.minWidth,
			f = c === void 0 ? 0 : c,
			l = e.minHeight,
			h = e.maxHeight,
			p = e.children,
			y = e.debounce,
			v = y === void 0 ? 0 : y,
			d = e.id,
			w = e.className,
			b = e.onResize,
			x = e.style,
			m = x === void 0 ? {} : x,
			g = D.useRef(null),
			O = D.useRef();
		(O.current = b),
			D.useImperativeHandle(t, function () {
				return Object.defineProperty(g.current, 'current', {
					get: function () {
						return (
							console.warn(
								'The usage of ref.current.current is deprecated and will no longer be supported.',
							),
							g.current
						);
					},
					configurable: !0,
				});
			});
		var S = D.useState({
				containerWidth: i.width,
				containerHeight: i.height,
			}),
			A = AT(S, 2),
			E = A[0],
			T = A[1],
			P = D.useCallback(function (j, M) {
				T(function (B) {
					var I = Math.round(j),
						L = Math.round(M);
					return B.containerWidth === I && B.containerHeight === L
						? B
						: { containerWidth: I, containerHeight: L };
				});
			}, []);
		D.useEffect(
			function () {
				var j = function (z) {
					var K,
						V = z[0].contentRect,
						q = V.width,
						Q = V.height;
					P(q, Q),
						(K = O.current) === null ||
							K === void 0 ||
							K.call(O, q, Q);
				};
				v > 0 && (j = cd(j, v, { trailing: !0, leading: !1 }));
				var M = new ResizeObserver(j),
					B = g.current.getBoundingClientRect(),
					I = B.width,
					L = B.height;
				return (
					P(I, L),
					M.observe(g.current),
					function () {
						M.disconnect();
					}
				);
			},
			[P, v],
		);
		var $ = D.useMemo(
			function () {
				var j = E.containerWidth,
					M = E.containerHeight;
				if (j < 0 || M < 0) return null;
				Xt(
					zt(o) || zt(s),
					`The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`,
					o,
					s,
				),
					Xt(
						!r || r > 0,
						'The aspect(%s) must be greater than zero.',
						r,
					);
				var B = zt(o) ? j : o,
					I = zt(s) ? M : s;
				r &&
					r > 0 &&
					(B ? (I = B / r) : I && (B = I * r), h && I > h && (I = h)),
					Xt(
						B > 0 || I > 0,
						`The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`,
						B,
						I,
						o,
						s,
						f,
						l,
						r,
					);
				var L =
					!Array.isArray(p) &&
					Mo.isElement(p) &&
					vt(p.type).endsWith('Chart');
				return _.Children.map(p, function (R) {
					return Mo.isElement(R)
						? D.cloneElement(
								R,
								ci(
									{ width: B, height: I },
									L
										? {
												style: ci(
													{
														height: '100%',
														width: '100%',
														maxHeight: I,
														maxWidth: B,
													},
													R.props.style,
												),
											}
										: {},
								),
							)
						: R;
				});
			},
			[r, p, s, h, l, f, E, o],
		);
		return _.createElement(
			'div',
			{
				id: d ? ''.concat(d) : void 0,
				className: ne('recharts-responsive-container', w),
				style: ci(
					ci({}, m),
					{},
					{
						width: o,
						height: s,
						minWidth: f,
						minHeight: l,
						maxHeight: h,
					},
				),
				ref: g,
			},
			$,
		);
	}),
	ld = function (t) {
		return null;
	};
ld.displayName = 'Cell';
function dn(e) {
	'@babel/helpers - typeof';
	return (
		(dn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		dn(e)
	);
}
function ml(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function iu(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? ml(Object(r), !0).forEach(function (n) {
					jT(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: ml(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function jT(e, t, r) {
	return (
		(t = MT(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function MT(e) {
	var t = CT(e, 'string');
	return dn(t) == 'symbol' ? t : String(t);
}
function CT(e, t) {
	if (dn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (dn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var nr = { widthCache: {}, cacheCount: 0 },
	kT = 2e3,
	IT = {
		position: 'absolute',
		top: '-20000px',
		left: 0,
		padding: 0,
		margin: 0,
		border: 'none',
		whiteSpace: 'pre',
	},
	gl = 'recharts_measurement_span';
function NT(e) {
	var t = iu({}, e);
	return (
		Object.keys(t).forEach(function (r) {
			t[r] || delete t[r];
		}),
		t
	);
}
var tn = function (t) {
		var r =
			arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		if (t == null || yt.isSsr) return { width: 0, height: 0 };
		var n = NT(r),
			i = JSON.stringify({ text: t, copyStyle: n });
		if (nr.widthCache[i]) return nr.widthCache[i];
		try {
			var a = document.getElementById(gl);
			a ||
				((a = document.createElement('span')),
				a.setAttribute('id', gl),
				a.setAttribute('aria-hidden', 'true'),
				document.body.appendChild(a));
			var o = iu(iu({}, IT), n);
			Object.assign(a.style, o), (a.textContent = ''.concat(t));
			var u = a.getBoundingClientRect(),
				s = { width: u.width, height: u.height };
			return (
				(nr.widthCache[i] = s),
				++nr.cacheCount > kT &&
					((nr.cacheCount = 0), (nr.widthCache = {})),
				s
			);
		} catch {
			return { width: 0, height: 0 };
		}
	},
	DT = function (t) {
		return {
			top: t.top + window.scrollY - document.documentElement.clientTop,
			left: t.left + window.scrollX - document.documentElement.clientLeft,
		};
	};
function vn(e) {
	'@babel/helpers - typeof';
	return (
		(vn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		vn(e)
	);
}
function Ni(e, t) {
	return FT(e) || RT(e, t) || LT(e, t) || BT();
}
function BT() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function LT(e, t) {
	if (e) {
		if (typeof e == 'string') return bl(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return bl(e, t);
	}
}
function bl(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function RT(e, t) {
	var r =
		e == null
			? null
			: (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			s = !0,
			c = !1;
		try {
			if (((a = (r = r.call(e)).next), t === 0)) {
				if (Object(r) !== r) return;
				s = !1;
			} else
				for (
					;
					!(s = (n = a.call(r)).done) &&
					(u.push(n.value), u.length !== t);
					s = !0
				);
		} catch (f) {
			(c = !0), (i = f);
		} finally {
			try {
				if (
					!s &&
					r.return != null &&
					((o = r.return()), Object(o) !== o)
				)
					return;
			} finally {
				if (c) throw i;
			}
		}
		return u;
	}
}
function FT(e) {
	if (Array.isArray(e)) return e;
}
function WT(e, t) {
	if (!(e instanceof t))
		throw new TypeError('Cannot call a class as a function');
}
function xl(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			'value' in n && (n.writable = !0),
			Object.defineProperty(e, zT(n.key), n);
	}
}
function UT(e, t, r) {
	return (
		t && xl(e.prototype, t),
		r && xl(e, r),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		e
	);
}
function zT(e) {
	var t = qT(e, 'string');
	return vn(t) == 'symbol' ? t : String(t);
}
function qT(e, t) {
	if (vn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (vn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return String(e);
}
var wl = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
	Ol = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
	HT = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/,
	KT = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,
	fd = {
		cm: 96 / 2.54,
		mm: 96 / 25.4,
		pt: 96 / 72,
		pc: 96 / 6,
		in: 96,
		Q: 96 / (2.54 * 40),
		px: 1,
	},
	GT = Object.keys(fd),
	or = 'NaN';
function XT(e, t) {
	return e * fd[t];
}
var li = (function () {
	function e(t, r) {
		WT(this, e),
			(this.num = t),
			(this.unit = r),
			(this.num = t),
			(this.unit = r),
			Number.isNaN(t) && (this.unit = ''),
			r !== '' && !HT.test(r) && ((this.num = NaN), (this.unit = '')),
			GT.includes(r) && ((this.num = XT(t, r)), (this.unit = 'px'));
	}
	return (
		UT(
			e,
			[
				{
					key: 'add',
					value: function (r) {
						return this.unit !== r.unit
							? new e(NaN, '')
							: new e(this.num + r.num, this.unit);
					},
				},
				{
					key: 'subtract',
					value: function (r) {
						return this.unit !== r.unit
							? new e(NaN, '')
							: new e(this.num - r.num, this.unit);
					},
				},
				{
					key: 'multiply',
					value: function (r) {
						return this.unit !== '' &&
							r.unit !== '' &&
							this.unit !== r.unit
							? new e(NaN, '')
							: new e(this.num * r.num, this.unit || r.unit);
					},
				},
				{
					key: 'divide',
					value: function (r) {
						return this.unit !== '' &&
							r.unit !== '' &&
							this.unit !== r.unit
							? new e(NaN, '')
							: new e(this.num / r.num, this.unit || r.unit);
					},
				},
				{
					key: 'toString',
					value: function () {
						return ''.concat(this.num).concat(this.unit);
					},
				},
				{
					key: 'isNaN',
					value: function () {
						return Number.isNaN(this.num);
					},
				},
			],
			[
				{
					key: 'parse',
					value: function (r) {
						var n,
							i =
								(n = KT.exec(r)) !== null && n !== void 0
									? n
									: [],
							a = Ni(i, 3),
							o = a[1],
							u = a[2];
						return new e(parseFloat(o), u ?? '');
					},
				},
			],
		),
		e
	);
})();
function hd(e) {
	if (e.includes(or)) return or;
	for (var t = e; t.includes('*') || t.includes('/'); ) {
		var r,
			n = (r = wl.exec(t)) !== null && r !== void 0 ? r : [],
			i = Ni(n, 4),
			a = i[1],
			o = i[2],
			u = i[3],
			s = li.parse(a ?? ''),
			c = li.parse(u ?? ''),
			f = o === '*' ? s.multiply(c) : s.divide(c);
		if (f.isNaN()) return or;
		t = t.replace(wl, f.toString());
	}
	for (; t.includes('+') || /.-\d+(?:\.\d+)?/.test(t); ) {
		var l,
			h = (l = Ol.exec(t)) !== null && l !== void 0 ? l : [],
			p = Ni(h, 4),
			y = p[1],
			v = p[2],
			d = p[3],
			w = li.parse(y ?? ''),
			b = li.parse(d ?? ''),
			x = v === '+' ? w.add(b) : w.subtract(b);
		if (x.isNaN()) return or;
		t = t.replace(Ol, x.toString());
	}
	return t;
}
var Sl = /\(([^()]*)\)/;
function VT(e) {
	for (var t = e; t.includes('('); ) {
		var r = Sl.exec(t),
			n = Ni(r, 2),
			i = n[1];
		t = t.replace(Sl, hd(i));
	}
	return t;
}
function YT(e) {
	var t = e.replace(/\s+/g, '');
	return (t = VT(t)), (t = hd(t)), t;
}
function ZT(e) {
	try {
		return YT(e);
	} catch {
		return or;
	}
}
function co(e) {
	var t = ZT(e.slice(5, -1));
	return t === or ? '' : t;
}
var JT = [
		'x',
		'y',
		'lineHeight',
		'capHeight',
		'scaleToFit',
		'textAnchor',
		'verticalAnchor',
		'fill',
	],
	QT = ['dx', 'dy', 'angle', 'className', 'breakAll'];
function au() {
	return (
		(au = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		au.apply(this, arguments)
	);
}
function Al(e, t) {
	if (e == null) return {};
	var r = eE(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function eE(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
function _l(e, t) {
	return iE(e) || nE(e, t) || rE(e, t) || tE();
}
function tE() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function rE(e, t) {
	if (e) {
		if (typeof e == 'string') return Pl(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return Pl(e, t);
	}
}
function Pl(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function nE(e, t) {
	var r =
		e == null
			? null
			: (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			s = !0,
			c = !1;
		try {
			if (((a = (r = r.call(e)).next), t === 0)) {
				if (Object(r) !== r) return;
				s = !1;
			} else
				for (
					;
					!(s = (n = a.call(r)).done) &&
					(u.push(n.value), u.length !== t);
					s = !0
				);
		} catch (f) {
			(c = !0), (i = f);
		} finally {
			try {
				if (
					!s &&
					r.return != null &&
					((o = r.return()), Object(o) !== o)
				)
					return;
			} finally {
				if (c) throw i;
			}
		}
		return u;
	}
}
function iE(e) {
	if (Array.isArray(e)) return e;
}
var pd = /[ \f\n\r\t\v\u2028\u2029]+/,
	dd = function (t) {
		var r = t.children,
			n = t.breakAll,
			i = t.style;
		try {
			var a = [];
			ee(r) ||
				(n
					? (a = r.toString().split(''))
					: (a = r.toString().split(pd)));
			var o = a.map(function (s) {
					return { word: s, width: tn(s, i).width };
				}),
				u = n ? 0 : tn(' ', i).width;
			return { wordsWithComputedWidth: o, spaceWidth: u };
		} catch {
			return null;
		}
	},
	aE = function (t, r, n, i, a) {
		var o = t.maxLines,
			u = t.children,
			s = t.style,
			c = t.breakAll,
			f = F(o),
			l = u,
			h = function () {
				var B =
					arguments.length > 0 && arguments[0] !== void 0
						? arguments[0]
						: [];
				return B.reduce(function (I, L) {
					var R = L.word,
						z = L.width,
						K = I[I.length - 1];
					if (K && (i == null || a || K.width + z + n < Number(i)))
						K.words.push(R), (K.width += z + n);
					else {
						var V = { words: [R], width: z };
						I.push(V);
					}
					return I;
				}, []);
			},
			p = h(r),
			y = function (B) {
				return B.reduce(function (I, L) {
					return I.width > L.width ? I : L;
				});
			};
		if (!f) return p;
		for (
			var v = '…',
				d = function (B) {
					var I = l.slice(0, B),
						L = dd({
							breakAll: c,
							style: s,
							children: I + v,
						}).wordsWithComputedWidth,
						R = h(L),
						z = R.length > o || y(R).width > Number(i);
					return [z, R];
				},
				w = 0,
				b = l.length - 1,
				x = 0,
				m;
			w <= b && x <= l.length - 1;

		) {
			var g = Math.floor((w + b) / 2),
				O = g - 1,
				S = d(O),
				A = _l(S, 2),
				E = A[0],
				T = A[1],
				P = d(g),
				$ = _l(P, 1),
				j = $[0];
			if ((!E && !j && (w = g + 1), E && j && (b = g - 1), !E && j)) {
				m = T;
				break;
			}
			x++;
		}
		return m || p;
	},
	$l = function (t) {
		var r = ee(t) ? [] : t.toString().split(pd);
		return [{ words: r }];
	},
	oE = function (t) {
		var r = t.width,
			n = t.scaleToFit,
			i = t.children,
			a = t.style,
			o = t.breakAll,
			u = t.maxLines;
		if ((r || n) && !yt.isSsr) {
			var s,
				c,
				f = dd({ breakAll: o, children: i, style: a });
			if (f) {
				var l = f.wordsWithComputedWidth,
					h = f.spaceWidth;
				(s = l), (c = h);
			} else return $l(i);
			return aE(
				{ breakAll: o, children: i, maxLines: u, style: a },
				s,
				c,
				r,
				n,
			);
		}
		return $l(i);
	},
	Tl = '#808080',
	Di = function (t) {
		var r = t.x,
			n = r === void 0 ? 0 : r,
			i = t.y,
			a = i === void 0 ? 0 : i,
			o = t.lineHeight,
			u = o === void 0 ? '1em' : o,
			s = t.capHeight,
			c = s === void 0 ? '0.71em' : s,
			f = t.scaleToFit,
			l = f === void 0 ? !1 : f,
			h = t.textAnchor,
			p = h === void 0 ? 'start' : h,
			y = t.verticalAnchor,
			v = y === void 0 ? 'end' : y,
			d = t.fill,
			w = d === void 0 ? Tl : d,
			b = Al(t, JT),
			x = D.useMemo(
				function () {
					return oE({
						breakAll: b.breakAll,
						children: b.children,
						maxLines: b.maxLines,
						scaleToFit: l,
						style: b.style,
						width: b.width,
					});
				},
				[b.breakAll, b.children, b.maxLines, l, b.style, b.width],
			),
			m = b.dx,
			g = b.dy,
			O = b.angle,
			S = b.className,
			A = b.breakAll,
			E = Al(b, QT);
		if (!be(n) || !be(a)) return null;
		var T = n + (F(m) ? m : 0),
			P = a + (F(g) ? g : 0),
			$;
		switch (v) {
			case 'start':
				$ = co('calc('.concat(c, ')'));
				break;
			case 'middle':
				$ = co(
					'calc('
						.concat((x.length - 1) / 2, ' * -')
						.concat(u, ' + (')
						.concat(c, ' / 2))'),
				);
				break;
			default:
				$ = co('calc('.concat(x.length - 1, ' * -').concat(u, ')'));
				break;
		}
		var j = [];
		if (l) {
			var M = x[0].width,
				B = b.width;
			j.push('scale('.concat((F(B) ? B / M : 1) / M, ')'));
		}
		return (
			O &&
				j.push(
					'rotate('.concat(O, ', ').concat(T, ', ').concat(P, ')'),
				),
			j.length && (E.transform = j.join(' ')),
			_.createElement(
				'text',
				au({}, J(E, !0), {
					x: T,
					y: P,
					className: ne('recharts-text', S),
					textAnchor: p,
					fill: w.includes('url') ? Tl : w,
				}),
				x.map(function (I, L) {
					var R = I.words.join(A ? '' : ' ');
					return _.createElement(
						'tspan',
						{ x: T, dy: L === 0 ? $ : u, key: R },
						R,
					);
				}),
			)
		);
	};
function Et(e, t) {
	return e == null || t == null
		? NaN
		: e < t
			? -1
			: e > t
				? 1
				: e >= t
					? 0
					: NaN;
}
function uE(e, t) {
	return e == null || t == null
		? NaN
		: t < e
			? -1
			: t > e
				? 1
				: t >= e
					? 0
					: NaN;
}
function Ss(e) {
	let t, r, n;
	e.length !== 2
		? ((t = Et), (r = (u, s) => Et(e(u), s)), (n = (u, s) => e(u) - s))
		: ((t = e === Et || e === uE ? e : sE), (r = e), (n = e));
	function i(u, s, c = 0, f = u.length) {
		if (c < f) {
			if (t(s, s) !== 0) return f;
			do {
				const l = (c + f) >>> 1;
				r(u[l], s) < 0 ? (c = l + 1) : (f = l);
			} while (c < f);
		}
		return c;
	}
	function a(u, s, c = 0, f = u.length) {
		if (c < f) {
			if (t(s, s) !== 0) return f;
			do {
				const l = (c + f) >>> 1;
				r(u[l], s) <= 0 ? (c = l + 1) : (f = l);
			} while (c < f);
		}
		return c;
	}
	function o(u, s, c = 0, f = u.length) {
		const l = i(u, s, c, f - 1);
		return l > c && n(u[l - 1], s) > -n(u[l], s) ? l - 1 : l;
	}
	return { left: i, center: o, right: a };
}
function sE() {
	return 0;
}
function vd(e) {
	return e === null ? NaN : +e;
}
function* cE(e, t) {
	for (let r of e) r != null && (r = +r) >= r && (yield r);
}
const lE = Ss(Et),
	Zn = lE.right;
Ss(vd).center;
class El extends Map {
	constructor(t, r = pE) {
		if (
			(super(),
			Object.defineProperties(this, {
				_intern: { value: new Map() },
				_key: { value: r },
			}),
			t != null)
		)
			for (const [n, i] of t) this.set(n, i);
	}
	get(t) {
		return super.get(jl(this, t));
	}
	has(t) {
		return super.has(jl(this, t));
	}
	set(t, r) {
		return super.set(fE(this, t), r);
	}
	delete(t) {
		return super.delete(hE(this, t));
	}
}
function jl({ _intern: e, _key: t }, r) {
	const n = t(r);
	return e.has(n) ? e.get(n) : r;
}
function fE({ _intern: e, _key: t }, r) {
	const n = t(r);
	return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function hE({ _intern: e, _key: t }, r) {
	const n = t(r);
	return e.has(n) && ((r = e.get(n)), e.delete(n)), r;
}
function pE(e) {
	return e !== null && typeof e == 'object' ? e.valueOf() : e;
}
function dE(e = Et) {
	if (e === Et) return yd;
	if (typeof e != 'function')
		throw new TypeError('compare is not a function');
	return (t, r) => {
		const n = e(t, r);
		return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
	};
}
function yd(e, t) {
	return (
		(e == null || !(e >= e)) - (t == null || !(t >= t)) ||
		(e < t ? -1 : e > t ? 1 : 0)
	);
}
const vE = Math.sqrt(50),
	yE = Math.sqrt(10),
	mE = Math.sqrt(2);
function Bi(e, t, r) {
	const n = (t - e) / Math.max(0, r),
		i = Math.floor(Math.log10(n)),
		a = n / Math.pow(10, i),
		o = a >= vE ? 10 : a >= yE ? 5 : a >= mE ? 2 : 1;
	let u, s, c;
	return (
		i < 0
			? ((c = Math.pow(10, -i) / o),
				(u = Math.round(e * c)),
				(s = Math.round(t * c)),
				u / c < e && ++u,
				s / c > t && --s,
				(c = -c))
			: ((c = Math.pow(10, i) * o),
				(u = Math.round(e / c)),
				(s = Math.round(t / c)),
				u * c < e && ++u,
				s * c > t && --s),
		s < u && 0.5 <= r && r < 2 ? Bi(e, t, r * 2) : [u, s, c]
	);
}
function ou(e, t, r) {
	if (((t = +t), (e = +e), (r = +r), !(r > 0))) return [];
	if (e === t) return [e];
	const n = t < e,
		[i, a, o] = n ? Bi(t, e, r) : Bi(e, t, r);
	if (!(a >= i)) return [];
	const u = a - i + 1,
		s = new Array(u);
	if (n)
		if (o < 0) for (let c = 0; c < u; ++c) s[c] = (a - c) / -o;
		else for (let c = 0; c < u; ++c) s[c] = (a - c) * o;
	else if (o < 0) for (let c = 0; c < u; ++c) s[c] = (i + c) / -o;
	else for (let c = 0; c < u; ++c) s[c] = (i + c) * o;
	return s;
}
function uu(e, t, r) {
	return (t = +t), (e = +e), (r = +r), Bi(e, t, r)[2];
}
function su(e, t, r) {
	(t = +t), (e = +e), (r = +r);
	const n = t < e,
		i = n ? uu(t, e, r) : uu(e, t, r);
	return (n ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function Ml(e, t) {
	let r;
	for (const n of e)
		n != null && (r < n || (r === void 0 && n >= n)) && (r = n);
	return r;
}
function Cl(e, t) {
	let r;
	for (const n of e)
		n != null && (r > n || (r === void 0 && n >= n)) && (r = n);
	return r;
}
function md(e, t, r = 0, n = 1 / 0, i) {
	if (
		((t = Math.floor(t)),
		(r = Math.floor(Math.max(0, r))),
		(n = Math.floor(Math.min(e.length - 1, n))),
		!(r <= t && t <= n))
	)
		return e;
	for (i = i === void 0 ? yd : dE(i); n > r; ) {
		if (n - r > 600) {
			const s = n - r + 1,
				c = t - r + 1,
				f = Math.log(s),
				l = 0.5 * Math.exp((2 * f) / 3),
				h =
					0.5 *
					Math.sqrt((f * l * (s - l)) / s) *
					(c - s / 2 < 0 ? -1 : 1),
				p = Math.max(r, Math.floor(t - (c * l) / s + h)),
				y = Math.min(n, Math.floor(t + ((s - c) * l) / s + h));
			md(e, t, p, y, i);
		}
		const a = e[t];
		let o = r,
			u = n;
		for (qr(e, r, t), i(e[n], a) > 0 && qr(e, r, n); o < u; ) {
			for (qr(e, o, u), ++o, --u; i(e[o], a) < 0; ) ++o;
			for (; i(e[u], a) > 0; ) --u;
		}
		i(e[r], a) === 0 ? qr(e, r, u) : (++u, qr(e, u, n)),
			u <= t && (r = u + 1),
			t <= u && (n = u - 1);
	}
	return e;
}
function qr(e, t, r) {
	const n = e[t];
	(e[t] = e[r]), (e[r] = n);
}
function gE(e, t, r) {
	if (
		((e = Float64Array.from(cE(e))), !(!(n = e.length) || isNaN((t = +t))))
	) {
		if (t <= 0 || n < 2) return Cl(e);
		if (t >= 1) return Ml(e);
		var n,
			i = (n - 1) * t,
			a = Math.floor(i),
			o = Ml(md(e, a).subarray(0, a + 1)),
			u = Cl(e.subarray(a + 1));
		return o + (u - o) * (i - a);
	}
}
function bE(e, t, r = vd) {
	if (!(!(n = e.length) || isNaN((t = +t)))) {
		if (t <= 0 || n < 2) return +r(e[0], 0, e);
		if (t >= 1) return +r(e[n - 1], n - 1, e);
		var n,
			i = (n - 1) * t,
			a = Math.floor(i),
			o = +r(e[a], a, e),
			u = +r(e[a + 1], a + 1, e);
		return o + (u - o) * (i - a);
	}
}
function xE(e, t, r) {
	(e = +e),
		(t = +t),
		(r =
			(i = arguments.length) < 2
				? ((t = e), (e = 0), 1)
				: i < 3
					? 1
					: +r);
	for (
		var n = -1,
			i = Math.max(0, Math.ceil((t - e) / r)) | 0,
			a = new Array(i);
		++n < i;

	)
		a[n] = e + n * r;
	return a;
}
function Ye(e, t) {
	switch (arguments.length) {
		case 0:
			break;
		case 1:
			this.range(e);
			break;
		default:
			this.range(t).domain(e);
			break;
	}
	return this;
}
function At(e, t) {
	switch (arguments.length) {
		case 0:
			break;
		case 1: {
			typeof e == 'function' ? this.interpolator(e) : this.range(e);
			break;
		}
		default: {
			this.domain(e),
				typeof t == 'function' ? this.interpolator(t) : this.range(t);
			break;
		}
	}
	return this;
}
const cu = Symbol('implicit');
function As() {
	var e = new El(),
		t = [],
		r = [],
		n = cu;
	function i(a) {
		let o = e.get(a);
		if (o === void 0) {
			if (n !== cu) return n;
			e.set(a, (o = t.push(a) - 1));
		}
		return r[o % r.length];
	}
	return (
		(i.domain = function (a) {
			if (!arguments.length) return t.slice();
			(t = []), (e = new El());
			for (const o of a) e.has(o) || e.set(o, t.push(o) - 1);
			return i;
		}),
		(i.range = function (a) {
			return arguments.length ? ((r = Array.from(a)), i) : r.slice();
		}),
		(i.unknown = function (a) {
			return arguments.length ? ((n = a), i) : n;
		}),
		(i.copy = function () {
			return As(t, r).unknown(n);
		}),
		Ye.apply(i, arguments),
		i
	);
}
function yn() {
	var e = As().unknown(void 0),
		t = e.domain,
		r = e.range,
		n = 0,
		i = 1,
		a,
		o,
		u = !1,
		s = 0,
		c = 0,
		f = 0.5;
	delete e.unknown;
	function l() {
		var h = t().length,
			p = i < n,
			y = p ? i : n,
			v = p ? n : i;
		(a = (v - y) / Math.max(1, h - s + c * 2)),
			u && (a = Math.floor(a)),
			(y += (v - y - a * (h - s)) * f),
			(o = a * (1 - s)),
			u && ((y = Math.round(y)), (o = Math.round(o)));
		var d = xE(h).map(function (w) {
			return y + a * w;
		});
		return r(p ? d.reverse() : d);
	}
	return (
		(e.domain = function (h) {
			return arguments.length ? (t(h), l()) : t();
		}),
		(e.range = function (h) {
			return arguments.length
				? (([n, i] = h), (n = +n), (i = +i), l())
				: [n, i];
		}),
		(e.rangeRound = function (h) {
			return ([n, i] = h), (n = +n), (i = +i), (u = !0), l();
		}),
		(e.bandwidth = function () {
			return o;
		}),
		(e.step = function () {
			return a;
		}),
		(e.round = function (h) {
			return arguments.length ? ((u = !!h), l()) : u;
		}),
		(e.padding = function (h) {
			return arguments.length ? ((s = Math.min(1, (c = +h))), l()) : s;
		}),
		(e.paddingInner = function (h) {
			return arguments.length ? ((s = Math.min(1, h)), l()) : s;
		}),
		(e.paddingOuter = function (h) {
			return arguments.length ? ((c = +h), l()) : c;
		}),
		(e.align = function (h) {
			return arguments.length
				? ((f = Math.max(0, Math.min(1, h))), l())
				: f;
		}),
		(e.copy = function () {
			return yn(t(), [n, i])
				.round(u)
				.paddingInner(s)
				.paddingOuter(c)
				.align(f);
		}),
		Ye.apply(l(), arguments)
	);
}
function gd(e) {
	var t = e.copy;
	return (
		(e.padding = e.paddingOuter),
		delete e.paddingInner,
		delete e.paddingOuter,
		(e.copy = function () {
			return gd(t());
		}),
		e
	);
}
function rn() {
	return gd(yn.apply(null, arguments).paddingInner(1));
}
function _s(e, t, r) {
	(e.prototype = t.prototype = r), (r.constructor = e);
}
function bd(e, t) {
	var r = Object.create(e.prototype);
	for (var n in t) r[n] = t[n];
	return r;
}
function Jn() {}
var mn = 0.7,
	Li = 1 / mn,
	cr = '\\s*([+-]?\\d+)\\s*',
	gn = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*',
	ut = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
	wE = /^#([0-9a-f]{3,8})$/,
	OE = new RegExp(`^rgb\\(${cr},${cr},${cr}\\)$`),
	SE = new RegExp(`^rgb\\(${ut},${ut},${ut}\\)$`),
	AE = new RegExp(`^rgba\\(${cr},${cr},${cr},${gn}\\)$`),
	_E = new RegExp(`^rgba\\(${ut},${ut},${ut},${gn}\\)$`),
	PE = new RegExp(`^hsl\\(${gn},${ut},${ut}\\)$`),
	$E = new RegExp(`^hsla\\(${gn},${ut},${ut},${gn}\\)$`),
	kl = {
		aliceblue: 15792383,
		antiquewhite: 16444375,
		aqua: 65535,
		aquamarine: 8388564,
		azure: 15794175,
		beige: 16119260,
		bisque: 16770244,
		black: 0,
		blanchedalmond: 16772045,
		blue: 255,
		blueviolet: 9055202,
		brown: 10824234,
		burlywood: 14596231,
		cadetblue: 6266528,
		chartreuse: 8388352,
		chocolate: 13789470,
		coral: 16744272,
		cornflowerblue: 6591981,
		cornsilk: 16775388,
		crimson: 14423100,
		cyan: 65535,
		darkblue: 139,
		darkcyan: 35723,
		darkgoldenrod: 12092939,
		darkgray: 11119017,
		darkgreen: 25600,
		darkgrey: 11119017,
		darkkhaki: 12433259,
		darkmagenta: 9109643,
		darkolivegreen: 5597999,
		darkorange: 16747520,
		darkorchid: 10040012,
		darkred: 9109504,
		darksalmon: 15308410,
		darkseagreen: 9419919,
		darkslateblue: 4734347,
		darkslategray: 3100495,
		darkslategrey: 3100495,
		darkturquoise: 52945,
		darkviolet: 9699539,
		deeppink: 16716947,
		deepskyblue: 49151,
		dimgray: 6908265,
		dimgrey: 6908265,
		dodgerblue: 2003199,
		firebrick: 11674146,
		floralwhite: 16775920,
		forestgreen: 2263842,
		fuchsia: 16711935,
		gainsboro: 14474460,
		ghostwhite: 16316671,
		gold: 16766720,
		goldenrod: 14329120,
		gray: 8421504,
		green: 32768,
		greenyellow: 11403055,
		grey: 8421504,
		honeydew: 15794160,
		hotpink: 16738740,
		indianred: 13458524,
		indigo: 4915330,
		ivory: 16777200,
		khaki: 15787660,
		lavender: 15132410,
		lavenderblush: 16773365,
		lawngreen: 8190976,
		lemonchiffon: 16775885,
		lightblue: 11393254,
		lightcoral: 15761536,
		lightcyan: 14745599,
		lightgoldenrodyellow: 16448210,
		lightgray: 13882323,
		lightgreen: 9498256,
		lightgrey: 13882323,
		lightpink: 16758465,
		lightsalmon: 16752762,
		lightseagreen: 2142890,
		lightskyblue: 8900346,
		lightslategray: 7833753,
		lightslategrey: 7833753,
		lightsteelblue: 11584734,
		lightyellow: 16777184,
		lime: 65280,
		limegreen: 3329330,
		linen: 16445670,
		magenta: 16711935,
		maroon: 8388608,
		mediumaquamarine: 6737322,
		mediumblue: 205,
		mediumorchid: 12211667,
		mediumpurple: 9662683,
		mediumseagreen: 3978097,
		mediumslateblue: 8087790,
		mediumspringgreen: 64154,
		mediumturquoise: 4772300,
		mediumvioletred: 13047173,
		midnightblue: 1644912,
		mintcream: 16121850,
		mistyrose: 16770273,
		moccasin: 16770229,
		navajowhite: 16768685,
		navy: 128,
		oldlace: 16643558,
		olive: 8421376,
		olivedrab: 7048739,
		orange: 16753920,
		orangered: 16729344,
		orchid: 14315734,
		palegoldenrod: 15657130,
		palegreen: 10025880,
		paleturquoise: 11529966,
		palevioletred: 14381203,
		papayawhip: 16773077,
		peachpuff: 16767673,
		peru: 13468991,
		pink: 16761035,
		plum: 14524637,
		powderblue: 11591910,
		purple: 8388736,
		rebeccapurple: 6697881,
		red: 16711680,
		rosybrown: 12357519,
		royalblue: 4286945,
		saddlebrown: 9127187,
		salmon: 16416882,
		sandybrown: 16032864,
		seagreen: 3050327,
		seashell: 16774638,
		sienna: 10506797,
		silver: 12632256,
		skyblue: 8900331,
		slateblue: 6970061,
		slategray: 7372944,
		slategrey: 7372944,
		snow: 16775930,
		springgreen: 65407,
		steelblue: 4620980,
		tan: 13808780,
		teal: 32896,
		thistle: 14204888,
		tomato: 16737095,
		turquoise: 4251856,
		violet: 15631086,
		wheat: 16113331,
		white: 16777215,
		whitesmoke: 16119285,
		yellow: 16776960,
		yellowgreen: 10145074,
	};
_s(Jn, bn, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: Il,
	formatHex: Il,
	formatHex8: TE,
	formatHsl: EE,
	formatRgb: Nl,
	toString: Nl,
});
function Il() {
	return this.rgb().formatHex();
}
function TE() {
	return this.rgb().formatHex8();
}
function EE() {
	return xd(this).formatHsl();
}
function Nl() {
	return this.rgb().formatRgb();
}
function bn(e) {
	var t, r;
	return (
		(e = (e + '').trim().toLowerCase()),
		(t = wE.exec(e))
			? ((r = t[1].length),
				(t = parseInt(t[1], 16)),
				r === 6
					? Dl(t)
					: r === 3
						? new Ie(
								((t >> 8) & 15) | ((t >> 4) & 240),
								((t >> 4) & 15) | (t & 240),
								((t & 15) << 4) | (t & 15),
								1,
							)
						: r === 8
							? fi(
									(t >> 24) & 255,
									(t >> 16) & 255,
									(t >> 8) & 255,
									(t & 255) / 255,
								)
							: r === 4
								? fi(
										((t >> 12) & 15) | ((t >> 8) & 240),
										((t >> 8) & 15) | ((t >> 4) & 240),
										((t >> 4) & 15) | (t & 240),
										(((t & 15) << 4) | (t & 15)) / 255,
									)
								: null)
			: (t = OE.exec(e))
				? new Ie(t[1], t[2], t[3], 1)
				: (t = SE.exec(e))
					? new Ie(
							(t[1] * 255) / 100,
							(t[2] * 255) / 100,
							(t[3] * 255) / 100,
							1,
						)
					: (t = AE.exec(e))
						? fi(t[1], t[2], t[3], t[4])
						: (t = _E.exec(e))
							? fi(
									(t[1] * 255) / 100,
									(t[2] * 255) / 100,
									(t[3] * 255) / 100,
									t[4],
								)
							: (t = PE.exec(e))
								? Rl(t[1], t[2] / 100, t[3] / 100, 1)
								: (t = $E.exec(e))
									? Rl(t[1], t[2] / 100, t[3] / 100, t[4])
									: kl.hasOwnProperty(e)
										? Dl(kl[e])
										: e === 'transparent'
											? new Ie(NaN, NaN, NaN, 0)
											: null
	);
}
function Dl(e) {
	return new Ie((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function fi(e, t, r, n) {
	return n <= 0 && (e = t = r = NaN), new Ie(e, t, r, n);
}
function jE(e) {
	return (
		e instanceof Jn || (e = bn(e)),
		e ? ((e = e.rgb()), new Ie(e.r, e.g, e.b, e.opacity)) : new Ie()
	);
}
function lu(e, t, r, n) {
	return arguments.length === 1 ? jE(e) : new Ie(e, t, r, n ?? 1);
}
function Ie(e, t, r, n) {
	(this.r = +e), (this.g = +t), (this.b = +r), (this.opacity = +n);
}
_s(
	Ie,
	lu,
	bd(Jn, {
		brighter(e) {
			return (
				(e = e == null ? Li : Math.pow(Li, e)),
				new Ie(this.r * e, this.g * e, this.b * e, this.opacity)
			);
		},
		darker(e) {
			return (
				(e = e == null ? mn : Math.pow(mn, e)),
				new Ie(this.r * e, this.g * e, this.b * e, this.opacity)
			);
		},
		rgb() {
			return this;
		},
		clamp() {
			return new Ie(Vt(this.r), Vt(this.g), Vt(this.b), Ri(this.opacity));
		},
		displayable() {
			return (
				-0.5 <= this.r &&
				this.r < 255.5 &&
				-0.5 <= this.g &&
				this.g < 255.5 &&
				-0.5 <= this.b &&
				this.b < 255.5 &&
				0 <= this.opacity &&
				this.opacity <= 1
			);
		},
		hex: Bl,
		formatHex: Bl,
		formatHex8: ME,
		formatRgb: Ll,
		toString: Ll,
	}),
);
function Bl() {
	return `#${qt(this.r)}${qt(this.g)}${qt(this.b)}`;
}
function ME() {
	return `#${qt(this.r)}${qt(this.g)}${qt(this.b)}${qt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ll() {
	const e = Ri(this.opacity);
	return `${e === 1 ? 'rgb(' : 'rgba('}${Vt(this.r)}, ${Vt(this.g)}, ${Vt(this.b)}${e === 1 ? ')' : `, ${e})`}`;
}
function Ri(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Vt(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function qt(e) {
	return (e = Vt(e)), (e < 16 ? '0' : '') + e.toString(16);
}
function Rl(e, t, r, n) {
	return (
		n <= 0
			? (e = t = r = NaN)
			: r <= 0 || r >= 1
				? (e = t = NaN)
				: t <= 0 && (e = NaN),
		new Qe(e, t, r, n)
	);
}
function xd(e) {
	if (e instanceof Qe) return new Qe(e.h, e.s, e.l, e.opacity);
	if ((e instanceof Jn || (e = bn(e)), !e)) return new Qe();
	if (e instanceof Qe) return e;
	e = e.rgb();
	var t = e.r / 255,
		r = e.g / 255,
		n = e.b / 255,
		i = Math.min(t, r, n),
		a = Math.max(t, r, n),
		o = NaN,
		u = a - i,
		s = (a + i) / 2;
	return (
		u
			? (t === a
					? (o = (r - n) / u + (r < n) * 6)
					: r === a
						? (o = (n - t) / u + 2)
						: (o = (t - r) / u + 4),
				(u /= s < 0.5 ? a + i : 2 - a - i),
				(o *= 60))
			: (u = s > 0 && s < 1 ? 0 : o),
		new Qe(o, u, s, e.opacity)
	);
}
function CE(e, t, r, n) {
	return arguments.length === 1 ? xd(e) : new Qe(e, t, r, n ?? 1);
}
function Qe(e, t, r, n) {
	(this.h = +e), (this.s = +t), (this.l = +r), (this.opacity = +n);
}
_s(
	Qe,
	CE,
	bd(Jn, {
		brighter(e) {
			return (
				(e = e == null ? Li : Math.pow(Li, e)),
				new Qe(this.h, this.s, this.l * e, this.opacity)
			);
		},
		darker(e) {
			return (
				(e = e == null ? mn : Math.pow(mn, e)),
				new Qe(this.h, this.s, this.l * e, this.opacity)
			);
		},
		rgb() {
			var e = (this.h % 360) + (this.h < 0) * 360,
				t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
				r = this.l,
				n = r + (r < 0.5 ? r : 1 - r) * t,
				i = 2 * r - n;
			return new Ie(
				lo(e >= 240 ? e - 240 : e + 120, i, n),
				lo(e, i, n),
				lo(e < 120 ? e + 240 : e - 120, i, n),
				this.opacity,
			);
		},
		clamp() {
			return new Qe(Fl(this.h), hi(this.s), hi(this.l), Ri(this.opacity));
		},
		displayable() {
			return (
				((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
				0 <= this.l &&
				this.l <= 1 &&
				0 <= this.opacity &&
				this.opacity <= 1
			);
		},
		formatHsl() {
			const e = Ri(this.opacity);
			return `${e === 1 ? 'hsl(' : 'hsla('}${Fl(this.h)}, ${hi(this.s) * 100}%, ${hi(this.l) * 100}%${e === 1 ? ')' : `, ${e})`}`;
		},
	}),
);
function Fl(e) {
	return (e = (e || 0) % 360), e < 0 ? e + 360 : e;
}
function hi(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function lo(e, t, r) {
	return (
		(e < 60
			? t + ((r - t) * e) / 60
			: e < 180
				? r
				: e < 240
					? t + ((r - t) * (240 - e)) / 60
					: t) * 255
	);
}
const Ps = (e) => () => e;
function kE(e, t) {
	return function (r) {
		return e + r * t;
	};
}
function IE(e, t, r) {
	return (
		(e = Math.pow(e, r)),
		(t = Math.pow(t, r) - e),
		(r = 1 / r),
		function (n) {
			return Math.pow(e + n * t, r);
		}
	);
}
function NE(e) {
	return (e = +e) == 1
		? wd
		: function (t, r) {
				return r - t ? IE(t, r, e) : Ps(isNaN(t) ? r : t);
			};
}
function wd(e, t) {
	var r = t - e;
	return r ? kE(e, r) : Ps(isNaN(e) ? t : e);
}
const Wl = (function e(t) {
	var r = NE(t);
	function n(i, a) {
		var o = r((i = lu(i)).r, (a = lu(a)).r),
			u = r(i.g, a.g),
			s = r(i.b, a.b),
			c = wd(i.opacity, a.opacity);
		return function (f) {
			return (
				(i.r = o(f)),
				(i.g = u(f)),
				(i.b = s(f)),
				(i.opacity = c(f)),
				i + ''
			);
		};
	}
	return (n.gamma = e), n;
})(1);
function DE(e, t) {
	t || (t = []);
	var r = e ? Math.min(t.length, e.length) : 0,
		n = t.slice(),
		i;
	return function (a) {
		for (i = 0; i < r; ++i) n[i] = e[i] * (1 - a) + t[i] * a;
		return n;
	};
}
function BE(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function LE(e, t) {
	var r = t ? t.length : 0,
		n = e ? Math.min(r, e.length) : 0,
		i = new Array(n),
		a = new Array(r),
		o;
	for (o = 0; o < n; ++o) i[o] = Br(e[o], t[o]);
	for (; o < r; ++o) a[o] = t[o];
	return function (u) {
		for (o = 0; o < n; ++o) a[o] = i[o](u);
		return a;
	};
}
function RE(e, t) {
	var r = new Date();
	return (
		(e = +e),
		(t = +t),
		function (n) {
			return r.setTime(e * (1 - n) + t * n), r;
		}
	);
}
function Fi(e, t) {
	return (
		(e = +e),
		(t = +t),
		function (r) {
			return e * (1 - r) + t * r;
		}
	);
}
function FE(e, t) {
	var r = {},
		n = {},
		i;
	(e === null || typeof e != 'object') && (e = {}),
		(t === null || typeof t != 'object') && (t = {});
	for (i in t) i in e ? (r[i] = Br(e[i], t[i])) : (n[i] = t[i]);
	return function (a) {
		for (i in r) n[i] = r[i](a);
		return n;
	};
}
var fu = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
	fo = new RegExp(fu.source, 'g');
function WE(e) {
	return function () {
		return e;
	};
}
function UE(e) {
	return function (t) {
		return e(t) + '';
	};
}
function zE(e, t) {
	var r = (fu.lastIndex = fo.lastIndex = 0),
		n,
		i,
		a,
		o = -1,
		u = [],
		s = [];
	for (e = e + '', t = t + ''; (n = fu.exec(e)) && (i = fo.exec(t)); )
		(a = i.index) > r &&
			((a = t.slice(r, a)), u[o] ? (u[o] += a) : (u[++o] = a)),
			(n = n[0]) === (i = i[0])
				? u[o]
					? (u[o] += i)
					: (u[++o] = i)
				: ((u[++o] = null), s.push({ i: o, x: Fi(n, i) })),
			(r = fo.lastIndex);
	return (
		r < t.length && ((a = t.slice(r)), u[o] ? (u[o] += a) : (u[++o] = a)),
		u.length < 2
			? s[0]
				? UE(s[0].x)
				: WE(t)
			: ((t = s.length),
				function (c) {
					for (var f = 0, l; f < t; ++f) u[(l = s[f]).i] = l.x(c);
					return u.join('');
				})
	);
}
function Br(e, t) {
	var r = typeof t,
		n;
	return t == null || r === 'boolean'
		? Ps(t)
		: (r === 'number'
				? Fi
				: r === 'string'
					? (n = bn(t))
						? ((t = n), Wl)
						: zE
					: t instanceof bn
						? Wl
						: t instanceof Date
							? RE
							: BE(t)
								? DE
								: Array.isArray(t)
									? LE
									: (typeof t.valueOf != 'function' &&
												typeof t.toString !=
													'function') ||
										  isNaN(t)
										? FE
										: Fi)(e, t);
}
function $s(e, t) {
	return (
		(e = +e),
		(t = +t),
		function (r) {
			return Math.round(e * (1 - r) + t * r);
		}
	);
}
function qE(e, t) {
	t === void 0 && ((t = e), (e = Br));
	for (
		var r = 0, n = t.length - 1, i = t[0], a = new Array(n < 0 ? 0 : n);
		r < n;

	)
		a[r] = e(i, (i = t[++r]));
	return function (o) {
		var u = Math.max(0, Math.min(n - 1, Math.floor((o *= n))));
		return a[u](o - u);
	};
}
function HE(e) {
	return function () {
		return e;
	};
}
function Wi(e) {
	return +e;
}
var Ul = [0, 1];
function Me(e) {
	return e;
}
function hu(e, t) {
	return (t -= e = +e)
		? function (r) {
				return (r - e) / t;
			}
		: HE(isNaN(t) ? NaN : 0.5);
}
function KE(e, t) {
	var r;
	return (
		e > t && ((r = e), (e = t), (t = r)),
		function (n) {
			return Math.max(e, Math.min(t, n));
		}
	);
}
function GE(e, t, r) {
	var n = e[0],
		i = e[1],
		a = t[0],
		o = t[1];
	return (
		i < n
			? ((n = hu(i, n)), (a = r(o, a)))
			: ((n = hu(n, i)), (a = r(a, o))),
		function (u) {
			return a(n(u));
		}
	);
}
function XE(e, t, r) {
	var n = Math.min(e.length, t.length) - 1,
		i = new Array(n),
		a = new Array(n),
		o = -1;
	for (
		e[n] < e[0] && ((e = e.slice().reverse()), (t = t.slice().reverse()));
		++o < n;

	)
		(i[o] = hu(e[o], e[o + 1])), (a[o] = r(t[o], t[o + 1]));
	return function (u) {
		var s = Zn(e, u, 1, n) - 1;
		return a[s](i[s](u));
	};
}
function Qn(e, t) {
	return t
		.domain(e.domain())
		.range(e.range())
		.interpolate(e.interpolate())
		.clamp(e.clamp())
		.unknown(e.unknown());
}
function Na() {
	var e = Ul,
		t = Ul,
		r = Br,
		n,
		i,
		a,
		o = Me,
		u,
		s,
		c;
	function f() {
		var h = Math.min(e.length, t.length);
		return (
			o !== Me && (o = KE(e[0], e[h - 1])),
			(u = h > 2 ? XE : GE),
			(s = c = null),
			l
		);
	}
	function l(h) {
		return h == null || isNaN((h = +h))
			? a
			: (s || (s = u(e.map(n), t, r)))(n(o(h)));
	}
	return (
		(l.invert = function (h) {
			return o(i((c || (c = u(t, e.map(n), Fi)))(h)));
		}),
		(l.domain = function (h) {
			return arguments.length
				? ((e = Array.from(h, Wi)), f())
				: e.slice();
		}),
		(l.range = function (h) {
			return arguments.length ? ((t = Array.from(h)), f()) : t.slice();
		}),
		(l.rangeRound = function (h) {
			return (t = Array.from(h)), (r = $s), f();
		}),
		(l.clamp = function (h) {
			return arguments.length ? ((o = h ? !0 : Me), f()) : o !== Me;
		}),
		(l.interpolate = function (h) {
			return arguments.length ? ((r = h), f()) : r;
		}),
		(l.unknown = function (h) {
			return arguments.length ? ((a = h), l) : a;
		}),
		function (h, p) {
			return (n = h), (i = p), f();
		}
	);
}
function Ts() {
	return Na()(Me, Me);
}
function VE(e) {
	return Math.abs((e = Math.round(e))) >= 1e21
		? e.toLocaleString('en').replace(/,/g, '')
		: e.toString(10);
}
function Ui(e, t) {
	if (
		(r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf(
			'e',
		)) < 0
	)
		return null;
	var r,
		n = e.slice(0, r);
	return [n.length > 1 ? n[0] + n.slice(2) : n, +e.slice(r + 1)];
}
function yr(e) {
	return (e = Ui(Math.abs(e))), e ? e[1] : NaN;
}
function YE(e, t) {
	return function (r, n) {
		for (
			var i = r.length, a = [], o = 0, u = e[0], s = 0;
			i > 0 &&
			u > 0 &&
			(s + u + 1 > n && (u = Math.max(1, n - s)),
			a.push(r.substring((i -= u), i + u)),
			!((s += u + 1) > n));

		)
			u = e[(o = (o + 1) % e.length)];
		return a.reverse().join(t);
	};
}
function ZE(e) {
	return function (t) {
		return t.replace(/[0-9]/g, function (r) {
			return e[+r];
		});
	};
}
var JE =
	/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function xn(e) {
	if (!(t = JE.exec(e))) throw new Error('invalid format: ' + e);
	var t;
	return new Es({
		fill: t[1],
		align: t[2],
		sign: t[3],
		symbol: t[4],
		zero: t[5],
		width: t[6],
		comma: t[7],
		precision: t[8] && t[8].slice(1),
		trim: t[9],
		type: t[10],
	});
}
xn.prototype = Es.prototype;
function Es(e) {
	(this.fill = e.fill === void 0 ? ' ' : e.fill + ''),
		(this.align = e.align === void 0 ? '>' : e.align + ''),
		(this.sign = e.sign === void 0 ? '-' : e.sign + ''),
		(this.symbol = e.symbol === void 0 ? '' : e.symbol + ''),
		(this.zero = !!e.zero),
		(this.width = e.width === void 0 ? void 0 : +e.width),
		(this.comma = !!e.comma),
		(this.precision = e.precision === void 0 ? void 0 : +e.precision),
		(this.trim = !!e.trim),
		(this.type = e.type === void 0 ? '' : e.type + '');
}
Es.prototype.toString = function () {
	return (
		this.fill +
		this.align +
		this.sign +
		this.symbol +
		(this.zero ? '0' : '') +
		(this.width === void 0 ? '' : Math.max(1, this.width | 0)) +
		(this.comma ? ',' : '') +
		(this.precision === void 0
			? ''
			: '.' + Math.max(0, this.precision | 0)) +
		(this.trim ? '~' : '') +
		this.type
	);
};
function QE(e) {
	e: for (var t = e.length, r = 1, n = -1, i; r < t; ++r)
		switch (e[r]) {
			case '.':
				n = i = r;
				break;
			case '0':
				n === 0 && (n = r), (i = r);
				break;
			default:
				if (!+e[r]) break e;
				n > 0 && (n = 0);
				break;
		}
	return n > 0 ? e.slice(0, n) + e.slice(i + 1) : e;
}
var Od;
function ej(e, t) {
	var r = Ui(e, t);
	if (!r) return e + '';
	var n = r[0],
		i = r[1],
		a = i - (Od = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
		o = n.length;
	return a === o
		? n
		: a > o
			? n + new Array(a - o + 1).join('0')
			: a > 0
				? n.slice(0, a) + '.' + n.slice(a)
				: '0.' +
					new Array(1 - a).join('0') +
					Ui(e, Math.max(0, t + a - 1))[0];
}
function zl(e, t) {
	var r = Ui(e, t);
	if (!r) return e + '';
	var n = r[0],
		i = r[1];
	return i < 0
		? '0.' + new Array(-i).join('0') + n
		: n.length > i + 1
			? n.slice(0, i + 1) + '.' + n.slice(i + 1)
			: n + new Array(i - n.length + 2).join('0');
}
const ql = {
	'%': (e, t) => (e * 100).toFixed(t),
	b: (e) => Math.round(e).toString(2),
	c: (e) => e + '',
	d: VE,
	e: (e, t) => e.toExponential(t),
	f: (e, t) => e.toFixed(t),
	g: (e, t) => e.toPrecision(t),
	o: (e) => Math.round(e).toString(8),
	p: (e, t) => zl(e * 100, t),
	r: zl,
	s: ej,
	X: (e) => Math.round(e).toString(16).toUpperCase(),
	x: (e) => Math.round(e).toString(16),
};
function Hl(e) {
	return e;
}
var Kl = Array.prototype.map,
	Gl = [
		'y',
		'z',
		'a',
		'f',
		'p',
		'n',
		'µ',
		'm',
		'',
		'k',
		'M',
		'G',
		'T',
		'P',
		'E',
		'Z',
		'Y',
	];
function tj(e) {
	var t =
			e.grouping === void 0 || e.thousands === void 0
				? Hl
				: YE(Kl.call(e.grouping, Number), e.thousands + ''),
		r = e.currency === void 0 ? '' : e.currency[0] + '',
		n = e.currency === void 0 ? '' : e.currency[1] + '',
		i = e.decimal === void 0 ? '.' : e.decimal + '',
		a = e.numerals === void 0 ? Hl : ZE(Kl.call(e.numerals, String)),
		o = e.percent === void 0 ? '%' : e.percent + '',
		u = e.minus === void 0 ? '−' : e.minus + '',
		s = e.nan === void 0 ? 'NaN' : e.nan + '';
	function c(l) {
		l = xn(l);
		var h = l.fill,
			p = l.align,
			y = l.sign,
			v = l.symbol,
			d = l.zero,
			w = l.width,
			b = l.comma,
			x = l.precision,
			m = l.trim,
			g = l.type;
		g === 'n'
			? ((b = !0), (g = 'g'))
			: ql[g] || (x === void 0 && (x = 12), (m = !0), (g = 'g')),
			(d || (h === '0' && p === '=')) && ((d = !0), (h = '0'), (p = '='));
		var O =
				v === '$'
					? r
					: v === '#' && /[boxX]/.test(g)
						? '0' + g.toLowerCase()
						: '',
			S = v === '$' ? n : /[%p]/.test(g) ? o : '',
			A = ql[g],
			E = /[defgprs%]/.test(g);
		x =
			x === void 0
				? 6
				: /[gprs]/.test(g)
					? Math.max(1, Math.min(21, x))
					: Math.max(0, Math.min(20, x));
		function T(P) {
			var $ = O,
				j = S,
				M,
				B,
				I;
			if (g === 'c') (j = A(P) + j), (P = '');
			else {
				P = +P;
				var L = P < 0 || 1 / P < 0;
				if (
					((P = isNaN(P) ? s : A(Math.abs(P), x)),
					m && (P = QE(P)),
					L && +P == 0 && y !== '+' && (L = !1),
					($ =
						(L
							? y === '('
								? y
								: u
							: y === '-' || y === '('
								? ''
								: y) + $),
					(j =
						(g === 's' ? Gl[8 + Od / 3] : '') +
						j +
						(L && y === '(' ? ')' : '')),
					E)
				) {
					for (M = -1, B = P.length; ++M < B; )
						if (((I = P.charCodeAt(M)), 48 > I || I > 57)) {
							(j =
								(I === 46 ? i + P.slice(M + 1) : P.slice(M)) +
								j),
								(P = P.slice(0, M));
							break;
						}
				}
			}
			b && !d && (P = t(P, 1 / 0));
			var R = $.length + P.length + j.length,
				z = R < w ? new Array(w - R + 1).join(h) : '';
			switch (
				(b &&
					d &&
					((P = t(z + P, z.length ? w - j.length : 1 / 0)), (z = '')),
				p)
			) {
				case '<':
					P = $ + P + j + z;
					break;
				case '=':
					P = $ + z + P + j;
					break;
				case '^':
					P =
						z.slice(0, (R = z.length >> 1)) +
						$ +
						P +
						j +
						z.slice(R);
					break;
				default:
					P = z + $ + P + j;
					break;
			}
			return a(P);
		}
		return (
			(T.toString = function () {
				return l + '';
			}),
			T
		);
	}
	function f(l, h) {
		var p = c(((l = xn(l)), (l.type = 'f'), l)),
			y = Math.max(-8, Math.min(8, Math.floor(yr(h) / 3))) * 3,
			v = Math.pow(10, -y),
			d = Gl[8 + y / 3];
		return function (w) {
			return p(v * w) + d;
		};
	}
	return { format: c, formatPrefix: f };
}
var pi, js, Sd;
rj({ thousands: ',', grouping: [3], currency: ['$', ''] });
function rj(e) {
	return (pi = tj(e)), (js = pi.format), (Sd = pi.formatPrefix), pi;
}
function nj(e) {
	return Math.max(0, -yr(Math.abs(e)));
}
function ij(e, t) {
	return Math.max(
		0,
		Math.max(-8, Math.min(8, Math.floor(yr(t) / 3))) * 3 - yr(Math.abs(e)),
	);
}
function aj(e, t) {
	return (
		(e = Math.abs(e)), (t = Math.abs(t) - e), Math.max(0, yr(t) - yr(e)) + 1
	);
}
function Ad(e, t, r, n) {
	var i = su(e, t, r),
		a;
	switch (((n = xn(n ?? ',f')), n.type)) {
		case 's': {
			var o = Math.max(Math.abs(e), Math.abs(t));
			return (
				n.precision == null &&
					!isNaN((a = ij(i, o))) &&
					(n.precision = a),
				Sd(n, o)
			);
		}
		case '':
		case 'e':
		case 'g':
		case 'p':
		case 'r': {
			n.precision == null &&
				!isNaN((a = aj(i, Math.max(Math.abs(e), Math.abs(t))))) &&
				(n.precision = a - (n.type === 'e'));
			break;
		}
		case 'f':
		case '%': {
			n.precision == null &&
				!isNaN((a = nj(i))) &&
				(n.precision = a - (n.type === '%') * 2);
			break;
		}
	}
	return js(n);
}
function Ct(e) {
	var t = e.domain;
	return (
		(e.ticks = function (r) {
			var n = t();
			return ou(n[0], n[n.length - 1], r ?? 10);
		}),
		(e.tickFormat = function (r, n) {
			var i = t();
			return Ad(i[0], i[i.length - 1], r ?? 10, n);
		}),
		(e.nice = function (r) {
			r == null && (r = 10);
			var n = t(),
				i = 0,
				a = n.length - 1,
				o = n[i],
				u = n[a],
				s,
				c,
				f = 10;
			for (
				u < o && ((c = o), (o = u), (u = c), (c = i), (i = a), (a = c));
				f-- > 0;

			) {
				if (((c = uu(o, u, r)), c === s))
					return (n[i] = o), (n[a] = u), t(n);
				if (c > 0)
					(o = Math.floor(o / c) * c), (u = Math.ceil(u / c) * c);
				else if (c < 0)
					(o = Math.ceil(o * c) / c), (u = Math.floor(u * c) / c);
				else break;
				s = c;
			}
			return e;
		}),
		e
	);
}
function zi() {
	var e = Ts();
	return (
		(e.copy = function () {
			return Qn(e, zi());
		}),
		Ye.apply(e, arguments),
		Ct(e)
	);
}
function _d(e) {
	var t;
	function r(n) {
		return n == null || isNaN((n = +n)) ? t : n;
	}
	return (
		(r.invert = r),
		(r.domain = r.range =
			function (n) {
				return arguments.length
					? ((e = Array.from(n, Wi)), r)
					: e.slice();
			}),
		(r.unknown = function (n) {
			return arguments.length ? ((t = n), r) : t;
		}),
		(r.copy = function () {
			return _d(e).unknown(t);
		}),
		(e = arguments.length ? Array.from(e, Wi) : [0, 1]),
		Ct(r)
	);
}
function Pd(e, t) {
	e = e.slice();
	var r = 0,
		n = e.length - 1,
		i = e[r],
		a = e[n],
		o;
	return (
		a < i && ((o = r), (r = n), (n = o), (o = i), (i = a), (a = o)),
		(e[r] = t.floor(i)),
		(e[n] = t.ceil(a)),
		e
	);
}
function Xl(e) {
	return Math.log(e);
}
function Vl(e) {
	return Math.exp(e);
}
function oj(e) {
	return -Math.log(-e);
}
function uj(e) {
	return -Math.exp(-e);
}
function sj(e) {
	return isFinite(e) ? +('1e' + e) : e < 0 ? 0 : e;
}
function cj(e) {
	return e === 10 ? sj : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function lj(e) {
	return e === Math.E
		? Math.log
		: (e === 10 && Math.log10) ||
				(e === 2 && Math.log2) ||
				((e = Math.log(e)), (t) => Math.log(t) / e);
}
function Yl(e) {
	return (t, r) => -e(-t, r);
}
function Ms(e) {
	const t = e(Xl, Vl),
		r = t.domain;
	let n = 10,
		i,
		a;
	function o() {
		return (
			(i = lj(n)),
			(a = cj(n)),
			r()[0] < 0 ? ((i = Yl(i)), (a = Yl(a)), e(oj, uj)) : e(Xl, Vl),
			t
		);
	}
	return (
		(t.base = function (u) {
			return arguments.length ? ((n = +u), o()) : n;
		}),
		(t.domain = function (u) {
			return arguments.length ? (r(u), o()) : r();
		}),
		(t.ticks = (u) => {
			const s = r();
			let c = s[0],
				f = s[s.length - 1];
			const l = f < c;
			l && ([c, f] = [f, c]);
			let h = i(c),
				p = i(f),
				y,
				v;
			const d = u == null ? 10 : +u;
			let w = [];
			if (!(n % 1) && p - h < d) {
				if (((h = Math.floor(h)), (p = Math.ceil(p)), c > 0)) {
					for (; h <= p; ++h)
						for (y = 1; y < n; ++y)
							if (
								((v = h < 0 ? y / a(-h) : y * a(h)), !(v < c))
							) {
								if (v > f) break;
								w.push(v);
							}
				} else
					for (; h <= p; ++h)
						for (y = n - 1; y >= 1; --y)
							if (
								((v = h > 0 ? y / a(-h) : y * a(h)), !(v < c))
							) {
								if (v > f) break;
								w.push(v);
							}
				w.length * 2 < d && (w = ou(c, f, d));
			} else w = ou(h, p, Math.min(p - h, d)).map(a);
			return l ? w.reverse() : w;
		}),
		(t.tickFormat = (u, s) => {
			if (
				(u == null && (u = 10),
				s == null && (s = n === 10 ? 's' : ','),
				typeof s != 'function' &&
					(!(n % 1) && (s = xn(s)).precision == null && (s.trim = !0),
					(s = js(s))),
				u === 1 / 0)
			)
				return s;
			const c = Math.max(1, (n * u) / t.ticks().length);
			return (f) => {
				let l = f / a(Math.round(i(f)));
				return l * n < n - 0.5 && (l *= n), l <= c ? s(f) : '';
			};
		}),
		(t.nice = () =>
			r(
				Pd(r(), {
					floor: (u) => a(Math.floor(i(u))),
					ceil: (u) => a(Math.ceil(i(u))),
				}),
			)),
		t
	);
}
function $d() {
	const e = Ms(Na()).domain([1, 10]);
	return (
		(e.copy = () => Qn(e, $d()).base(e.base())), Ye.apply(e, arguments), e
	);
}
function Zl(e) {
	return function (t) {
		return Math.sign(t) * Math.log1p(Math.abs(t / e));
	};
}
function Jl(e) {
	return function (t) {
		return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
	};
}
function Cs(e) {
	var t = 1,
		r = e(Zl(t), Jl(t));
	return (
		(r.constant = function (n) {
			return arguments.length ? e(Zl((t = +n)), Jl(t)) : t;
		}),
		Ct(r)
	);
}
function Td() {
	var e = Cs(Na());
	return (
		(e.copy = function () {
			return Qn(e, Td()).constant(e.constant());
		}),
		Ye.apply(e, arguments)
	);
}
function Ql(e) {
	return function (t) {
		return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
	};
}
function fj(e) {
	return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function hj(e) {
	return e < 0 ? -e * e : e * e;
}
function ks(e) {
	var t = e(Me, Me),
		r = 1;
	function n() {
		return r === 1
			? e(Me, Me)
			: r === 0.5
				? e(fj, hj)
				: e(Ql(r), Ql(1 / r));
	}
	return (
		(t.exponent = function (i) {
			return arguments.length ? ((r = +i), n()) : r;
		}),
		Ct(t)
	);
}
function Is() {
	var e = ks(Na());
	return (
		(e.copy = function () {
			return Qn(e, Is()).exponent(e.exponent());
		}),
		Ye.apply(e, arguments),
		e
	);
}
function pj() {
	return Is.apply(null, arguments).exponent(0.5);
}
function ef(e) {
	return Math.sign(e) * e * e;
}
function dj(e) {
	return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function Ed() {
	var e = Ts(),
		t = [0, 1],
		r = !1,
		n;
	function i(a) {
		var o = dj(e(a));
		return isNaN(o) ? n : r ? Math.round(o) : o;
	}
	return (
		(i.invert = function (a) {
			return e.invert(ef(a));
		}),
		(i.domain = function (a) {
			return arguments.length ? (e.domain(a), i) : e.domain();
		}),
		(i.range = function (a) {
			return arguments.length
				? (e.range((t = Array.from(a, Wi)).map(ef)), i)
				: t.slice();
		}),
		(i.rangeRound = function (a) {
			return i.range(a).round(!0);
		}),
		(i.round = function (a) {
			return arguments.length ? ((r = !!a), i) : r;
		}),
		(i.clamp = function (a) {
			return arguments.length ? (e.clamp(a), i) : e.clamp();
		}),
		(i.unknown = function (a) {
			return arguments.length ? ((n = a), i) : n;
		}),
		(i.copy = function () {
			return Ed(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
		}),
		Ye.apply(i, arguments),
		Ct(i)
	);
}
function jd() {
	var e = [],
		t = [],
		r = [],
		n;
	function i() {
		var o = 0,
			u = Math.max(1, t.length);
		for (r = new Array(u - 1); ++o < u; ) r[o - 1] = bE(e, o / u);
		return a;
	}
	function a(o) {
		return o == null || isNaN((o = +o)) ? n : t[Zn(r, o)];
	}
	return (
		(a.invertExtent = function (o) {
			var u = t.indexOf(o);
			return u < 0
				? [NaN, NaN]
				: [
						u > 0 ? r[u - 1] : e[0],
						u < r.length ? r[u] : e[e.length - 1],
					];
		}),
		(a.domain = function (o) {
			if (!arguments.length) return e.slice();
			e = [];
			for (let u of o) u != null && !isNaN((u = +u)) && e.push(u);
			return e.sort(Et), i();
		}),
		(a.range = function (o) {
			return arguments.length ? ((t = Array.from(o)), i()) : t.slice();
		}),
		(a.unknown = function (o) {
			return arguments.length ? ((n = o), a) : n;
		}),
		(a.quantiles = function () {
			return r.slice();
		}),
		(a.copy = function () {
			return jd().domain(e).range(t).unknown(n);
		}),
		Ye.apply(a, arguments)
	);
}
function Md() {
	var e = 0,
		t = 1,
		r = 1,
		n = [0.5],
		i = [0, 1],
		a;
	function o(s) {
		return s != null && s <= s ? i[Zn(n, s, 0, r)] : a;
	}
	function u() {
		var s = -1;
		for (n = new Array(r); ++s < r; )
			n[s] = ((s + 1) * t - (s - r) * e) / (r + 1);
		return o;
	}
	return (
		(o.domain = function (s) {
			return arguments.length
				? (([e, t] = s), (e = +e), (t = +t), u())
				: [e, t];
		}),
		(o.range = function (s) {
			return arguments.length
				? ((r = (i = Array.from(s)).length - 1), u())
				: i.slice();
		}),
		(o.invertExtent = function (s) {
			var c = i.indexOf(s);
			return c < 0
				? [NaN, NaN]
				: c < 1
					? [e, n[0]]
					: c >= r
						? [n[r - 1], t]
						: [n[c - 1], n[c]];
		}),
		(o.unknown = function (s) {
			return arguments.length && (a = s), o;
		}),
		(o.thresholds = function () {
			return n.slice();
		}),
		(o.copy = function () {
			return Md().domain([e, t]).range(i).unknown(a);
		}),
		Ye.apply(Ct(o), arguments)
	);
}
function Cd() {
	var e = [0.5],
		t = [0, 1],
		r,
		n = 1;
	function i(a) {
		return a != null && a <= a ? t[Zn(e, a, 0, n)] : r;
	}
	return (
		(i.domain = function (a) {
			return arguments.length
				? ((e = Array.from(a)),
					(n = Math.min(e.length, t.length - 1)),
					i)
				: e.slice();
		}),
		(i.range = function (a) {
			return arguments.length
				? ((t = Array.from(a)),
					(n = Math.min(e.length, t.length - 1)),
					i)
				: t.slice();
		}),
		(i.invertExtent = function (a) {
			var o = t.indexOf(a);
			return [e[o - 1], e[o]];
		}),
		(i.unknown = function (a) {
			return arguments.length ? ((r = a), i) : r;
		}),
		(i.copy = function () {
			return Cd().domain(e).range(t).unknown(r);
		}),
		Ye.apply(i, arguments)
	);
}
const ho = new Date(),
	po = new Date();
function xe(e, t, r, n) {
	function i(a) {
		return e((a = arguments.length === 0 ? new Date() : new Date(+a))), a;
	}
	return (
		(i.floor = (a) => (e((a = new Date(+a))), a)),
		(i.ceil = (a) => (e((a = new Date(a - 1))), t(a, 1), e(a), a)),
		(i.round = (a) => {
			const o = i(a),
				u = i.ceil(a);
			return a - o < u - a ? o : u;
		}),
		(i.offset = (a, o) => (
			t((a = new Date(+a)), o == null ? 1 : Math.floor(o)), a
		)),
		(i.range = (a, o, u) => {
			const s = [];
			if (
				((a = i.ceil(a)),
				(u = u == null ? 1 : Math.floor(u)),
				!(a < o) || !(u > 0))
			)
				return s;
			let c;
			do s.push((c = new Date(+a))), t(a, u), e(a);
			while (c < a && a < o);
			return s;
		}),
		(i.filter = (a) =>
			xe(
				(o) => {
					if (o >= o) for (; e(o), !a(o); ) o.setTime(o - 1);
				},
				(o, u) => {
					if (o >= o)
						if (u < 0) for (; ++u <= 0; ) for (; t(o, -1), !a(o); );
						else for (; --u >= 0; ) for (; t(o, 1), !a(o); );
				},
			)),
		r &&
			((i.count = (a, o) => (
				ho.setTime(+a),
				po.setTime(+o),
				e(ho),
				e(po),
				Math.floor(r(ho, po))
			)),
			(i.every = (a) => (
				(a = Math.floor(a)),
				!isFinite(a) || !(a > 0)
					? null
					: a > 1
						? i.filter(
								n
									? (o) => n(o) % a === 0
									: (o) => i.count(0, o) % a === 0,
							)
						: i
			))),
		i
	);
}
const qi = xe(
	() => {},
	(e, t) => {
		e.setTime(+e + t);
	},
	(e, t) => t - e,
);
qi.every = (e) => (
	(e = Math.floor(e)),
	!isFinite(e) || !(e > 0)
		? null
		: e > 1
			? xe(
					(t) => {
						t.setTime(Math.floor(t / e) * e);
					},
					(t, r) => {
						t.setTime(+t + r * e);
					},
					(t, r) => (r - t) / e,
				)
			: qi
);
qi.range;
const pt = 1e3,
	Ge = pt * 60,
	dt = Ge * 60,
	gt = dt * 24,
	Ns = gt * 7,
	tf = gt * 30,
	vo = gt * 365,
	Ht = xe(
		(e) => {
			e.setTime(e - e.getMilliseconds());
		},
		(e, t) => {
			e.setTime(+e + t * pt);
		},
		(e, t) => (t - e) / pt,
		(e) => e.getUTCSeconds(),
	);
Ht.range;
const Ds = xe(
	(e) => {
		e.setTime(e - e.getMilliseconds() - e.getSeconds() * pt);
	},
	(e, t) => {
		e.setTime(+e + t * Ge);
	},
	(e, t) => (t - e) / Ge,
	(e) => e.getMinutes(),
);
Ds.range;
const Bs = xe(
	(e) => {
		e.setUTCSeconds(0, 0);
	},
	(e, t) => {
		e.setTime(+e + t * Ge);
	},
	(e, t) => (t - e) / Ge,
	(e) => e.getUTCMinutes(),
);
Bs.range;
const Ls = xe(
	(e) => {
		e.setTime(
			e - e.getMilliseconds() - e.getSeconds() * pt - e.getMinutes() * Ge,
		);
	},
	(e, t) => {
		e.setTime(+e + t * dt);
	},
	(e, t) => (t - e) / dt,
	(e) => e.getHours(),
);
Ls.range;
const Rs = xe(
	(e) => {
		e.setUTCMinutes(0, 0, 0);
	},
	(e, t) => {
		e.setTime(+e + t * dt);
	},
	(e, t) => (t - e) / dt,
	(e) => e.getUTCHours(),
);
Rs.range;
const ei = xe(
	(e) => e.setHours(0, 0, 0, 0),
	(e, t) => e.setDate(e.getDate() + t),
	(e, t) =>
		(t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Ge) / gt,
	(e) => e.getDate() - 1,
);
ei.range;
const Da = xe(
	(e) => {
		e.setUTCHours(0, 0, 0, 0);
	},
	(e, t) => {
		e.setUTCDate(e.getUTCDate() + t);
	},
	(e, t) => (t - e) / gt,
	(e) => e.getUTCDate() - 1,
);
Da.range;
const kd = xe(
	(e) => {
		e.setUTCHours(0, 0, 0, 0);
	},
	(e, t) => {
		e.setUTCDate(e.getUTCDate() + t);
	},
	(e, t) => (t - e) / gt,
	(e) => Math.floor(e / gt),
);
kd.range;
function tr(e) {
	return xe(
		(t) => {
			t.setDate(t.getDate() - ((t.getDay() + 7 - e) % 7)),
				t.setHours(0, 0, 0, 0);
		},
		(t, r) => {
			t.setDate(t.getDate() + r * 7);
		},
		(t, r) =>
			(r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * Ge) / Ns,
	);
}
const Ba = tr(0),
	Hi = tr(1),
	vj = tr(2),
	yj = tr(3),
	mr = tr(4),
	mj = tr(5),
	gj = tr(6);
Ba.range;
Hi.range;
vj.range;
yj.range;
mr.range;
mj.range;
gj.range;
function rr(e) {
	return xe(
		(t) => {
			t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 7 - e) % 7)),
				t.setUTCHours(0, 0, 0, 0);
		},
		(t, r) => {
			t.setUTCDate(t.getUTCDate() + r * 7);
		},
		(t, r) => (r - t) / Ns,
	);
}
const La = rr(0),
	Ki = rr(1),
	bj = rr(2),
	xj = rr(3),
	gr = rr(4),
	wj = rr(5),
	Oj = rr(6);
La.range;
Ki.range;
bj.range;
xj.range;
gr.range;
wj.range;
Oj.range;
const Fs = xe(
	(e) => {
		e.setDate(1), e.setHours(0, 0, 0, 0);
	},
	(e, t) => {
		e.setMonth(e.getMonth() + t);
	},
	(e, t) =>
		t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12,
	(e) => e.getMonth(),
);
Fs.range;
const Ws = xe(
	(e) => {
		e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
	},
	(e, t) => {
		e.setUTCMonth(e.getUTCMonth() + t);
	},
	(e, t) =>
		t.getUTCMonth() -
		e.getUTCMonth() +
		(t.getUTCFullYear() - e.getUTCFullYear()) * 12,
	(e) => e.getUTCMonth(),
);
Ws.range;
const bt = xe(
	(e) => {
		e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
	},
	(e, t) => {
		e.setFullYear(e.getFullYear() + t);
	},
	(e, t) => t.getFullYear() - e.getFullYear(),
	(e) => e.getFullYear(),
);
bt.every = (e) =>
	!isFinite((e = Math.floor(e))) || !(e > 0)
		? null
		: xe(
				(t) => {
					t.setFullYear(Math.floor(t.getFullYear() / e) * e),
						t.setMonth(0, 1),
						t.setHours(0, 0, 0, 0);
				},
				(t, r) => {
					t.setFullYear(t.getFullYear() + r * e);
				},
			);
bt.range;
const xt = xe(
	(e) => {
		e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
	},
	(e, t) => {
		e.setUTCFullYear(e.getUTCFullYear() + t);
	},
	(e, t) => t.getUTCFullYear() - e.getUTCFullYear(),
	(e) => e.getUTCFullYear(),
);
xt.every = (e) =>
	!isFinite((e = Math.floor(e))) || !(e > 0)
		? null
		: xe(
				(t) => {
					t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e),
						t.setUTCMonth(0, 1),
						t.setUTCHours(0, 0, 0, 0);
				},
				(t, r) => {
					t.setUTCFullYear(t.getUTCFullYear() + r * e);
				},
			);
xt.range;
function Id(e, t, r, n, i, a) {
	const o = [
		[Ht, 1, pt],
		[Ht, 5, 5 * pt],
		[Ht, 15, 15 * pt],
		[Ht, 30, 30 * pt],
		[a, 1, Ge],
		[a, 5, 5 * Ge],
		[a, 15, 15 * Ge],
		[a, 30, 30 * Ge],
		[i, 1, dt],
		[i, 3, 3 * dt],
		[i, 6, 6 * dt],
		[i, 12, 12 * dt],
		[n, 1, gt],
		[n, 2, 2 * gt],
		[r, 1, Ns],
		[t, 1, tf],
		[t, 3, 3 * tf],
		[e, 1, vo],
	];
	function u(c, f, l) {
		const h = f < c;
		h && ([c, f] = [f, c]);
		const p = l && typeof l.range == 'function' ? l : s(c, f, l),
			y = p ? p.range(c, +f + 1) : [];
		return h ? y.reverse() : y;
	}
	function s(c, f, l) {
		const h = Math.abs(f - c) / l,
			p = Ss(([, , d]) => d).right(o, h);
		if (p === o.length) return e.every(su(c / vo, f / vo, l));
		if (p === 0) return qi.every(Math.max(su(c, f, l), 1));
		const [y, v] = o[h / o[p - 1][2] < o[p][2] / h ? p - 1 : p];
		return y.every(v);
	}
	return [u, s];
}
const [Sj, Aj] = Id(xt, Ws, La, kd, Rs, Bs),
	[_j, Pj] = Id(bt, Fs, Ba, ei, Ls, Ds);
function yo(e) {
	if (0 <= e.y && e.y < 100) {
		var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
		return t.setFullYear(e.y), t;
	}
	return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function mo(e) {
	if (0 <= e.y && e.y < 100) {
		var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
		return t.setUTCFullYear(e.y), t;
	}
	return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function Hr(e, t, r) {
	return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function $j(e) {
	var t = e.dateTime,
		r = e.date,
		n = e.time,
		i = e.periods,
		a = e.days,
		o = e.shortDays,
		u = e.months,
		s = e.shortMonths,
		c = Kr(i),
		f = Gr(i),
		l = Kr(a),
		h = Gr(a),
		p = Kr(o),
		y = Gr(o),
		v = Kr(u),
		d = Gr(u),
		w = Kr(s),
		b = Gr(s),
		x = {
			a: L,
			A: R,
			b: z,
			B: K,
			c: null,
			d: sf,
			e: sf,
			f: Yj,
			g: oM,
			G: sM,
			H: Gj,
			I: Xj,
			j: Vj,
			L: Nd,
			m: Zj,
			M: Jj,
			p: V,
			q,
			Q: ff,
			s: hf,
			S: Qj,
			u: eM,
			U: tM,
			V: rM,
			w: nM,
			W: iM,
			x: null,
			X: null,
			y: aM,
			Y: uM,
			Z: cM,
			'%': lf,
		},
		m = {
			a: Q,
			A: _e,
			b: Ce,
			B: Dt,
			c: null,
			d: cf,
			e: cf,
			f: pM,
			g: SM,
			G: _M,
			H: lM,
			I: fM,
			j: hM,
			L: Bd,
			m: dM,
			M: vM,
			p: ke,
			q: ft,
			Q: ff,
			s: hf,
			S: yM,
			u: mM,
			U: gM,
			V: bM,
			w: xM,
			W: wM,
			x: null,
			X: null,
			y: OM,
			Y: AM,
			Z: PM,
			'%': lf,
		},
		g = {
			a: T,
			A: P,
			b: $,
			B: j,
			c: M,
			d: of,
			e: of,
			f: zj,
			g: af,
			G: nf,
			H: uf,
			I: uf,
			j: Rj,
			L: Uj,
			m: Lj,
			M: Fj,
			p: E,
			q: Bj,
			Q: Hj,
			s: Kj,
			S: Wj,
			u: Cj,
			U: kj,
			V: Ij,
			w: Mj,
			W: Nj,
			x: B,
			X: I,
			y: af,
			Y: nf,
			Z: Dj,
			'%': qj,
		};
	(x.x = O(r, x)),
		(x.X = O(n, x)),
		(x.c = O(t, x)),
		(m.x = O(r, m)),
		(m.X = O(n, m)),
		(m.c = O(t, m));
	function O(W, G) {
		return function (Y) {
			var N = [],
				de = -1,
				re = 0,
				me = W.length,
				ve,
				De,
				ht;
			for (Y instanceof Date || (Y = new Date(+Y)); ++de < me; )
				W.charCodeAt(de) === 37 &&
					(N.push(W.slice(re, de)),
					(De = rf[(ve = W.charAt(++de))]) != null
						? (ve = W.charAt(++de))
						: (De = ve === 'e' ? ' ' : '0'),
					(ht = G[ve]) && (ve = ht(Y, De)),
					N.push(ve),
					(re = de + 1));
			return N.push(W.slice(re, de)), N.join('');
		};
	}
	function S(W, G) {
		return function (Y) {
			var N = Hr(1900, void 0, 1),
				de = A(N, W, (Y += ''), 0),
				re,
				me;
			if (de != Y.length) return null;
			if ('Q' in N) return new Date(N.Q);
			if ('s' in N) return new Date(N.s * 1e3 + ('L' in N ? N.L : 0));
			if (
				(G && !('Z' in N) && (N.Z = 0),
				'p' in N && (N.H = (N.H % 12) + N.p * 12),
				N.m === void 0 && (N.m = 'q' in N ? N.q : 0),
				'V' in N)
			) {
				if (N.V < 1 || N.V > 53) return null;
				'w' in N || (N.w = 1),
					'Z' in N
						? ((re = mo(Hr(N.y, 0, 1))),
							(me = re.getUTCDay()),
							(re = me > 4 || me === 0 ? Ki.ceil(re) : Ki(re)),
							(re = Da.offset(re, (N.V - 1) * 7)),
							(N.y = re.getUTCFullYear()),
							(N.m = re.getUTCMonth()),
							(N.d = re.getUTCDate() + ((N.w + 6) % 7)))
						: ((re = yo(Hr(N.y, 0, 1))),
							(me = re.getDay()),
							(re = me > 4 || me === 0 ? Hi.ceil(re) : Hi(re)),
							(re = ei.offset(re, (N.V - 1) * 7)),
							(N.y = re.getFullYear()),
							(N.m = re.getMonth()),
							(N.d = re.getDate() + ((N.w + 6) % 7)));
			} else
				('W' in N || 'U' in N) &&
					('w' in N || (N.w = 'u' in N ? N.u % 7 : 'W' in N ? 1 : 0),
					(me =
						'Z' in N
							? mo(Hr(N.y, 0, 1)).getUTCDay()
							: yo(Hr(N.y, 0, 1)).getDay()),
					(N.m = 0),
					(N.d =
						'W' in N
							? ((N.w + 6) % 7) + N.W * 7 - ((me + 5) % 7)
							: N.w + N.U * 7 - ((me + 6) % 7)));
			return 'Z' in N
				? ((N.H += (N.Z / 100) | 0), (N.M += N.Z % 100), mo(N))
				: yo(N);
		};
	}
	function A(W, G, Y, N) {
		for (var de = 0, re = G.length, me = Y.length, ve, De; de < re; ) {
			if (N >= me) return -1;
			if (((ve = G.charCodeAt(de++)), ve === 37)) {
				if (
					((ve = G.charAt(de++)),
					(De = g[ve in rf ? G.charAt(de++) : ve]),
					!De || (N = De(W, Y, N)) < 0)
				)
					return -1;
			} else if (ve != Y.charCodeAt(N++)) return -1;
		}
		return N;
	}
	function E(W, G, Y) {
		var N = c.exec(G.slice(Y));
		return N ? ((W.p = f.get(N[0].toLowerCase())), Y + N[0].length) : -1;
	}
	function T(W, G, Y) {
		var N = p.exec(G.slice(Y));
		return N ? ((W.w = y.get(N[0].toLowerCase())), Y + N[0].length) : -1;
	}
	function P(W, G, Y) {
		var N = l.exec(G.slice(Y));
		return N ? ((W.w = h.get(N[0].toLowerCase())), Y + N[0].length) : -1;
	}
	function $(W, G, Y) {
		var N = w.exec(G.slice(Y));
		return N ? ((W.m = b.get(N[0].toLowerCase())), Y + N[0].length) : -1;
	}
	function j(W, G, Y) {
		var N = v.exec(G.slice(Y));
		return N ? ((W.m = d.get(N[0].toLowerCase())), Y + N[0].length) : -1;
	}
	function M(W, G, Y) {
		return A(W, t, G, Y);
	}
	function B(W, G, Y) {
		return A(W, r, G, Y);
	}
	function I(W, G, Y) {
		return A(W, n, G, Y);
	}
	function L(W) {
		return o[W.getDay()];
	}
	function R(W) {
		return a[W.getDay()];
	}
	function z(W) {
		return s[W.getMonth()];
	}
	function K(W) {
		return u[W.getMonth()];
	}
	function V(W) {
		return i[+(W.getHours() >= 12)];
	}
	function q(W) {
		return 1 + ~~(W.getMonth() / 3);
	}
	function Q(W) {
		return o[W.getUTCDay()];
	}
	function _e(W) {
		return a[W.getUTCDay()];
	}
	function Ce(W) {
		return s[W.getUTCMonth()];
	}
	function Dt(W) {
		return u[W.getUTCMonth()];
	}
	function ke(W) {
		return i[+(W.getUTCHours() >= 12)];
	}
	function ft(W) {
		return 1 + ~~(W.getUTCMonth() / 3);
	}
	return {
		format: function (W) {
			var G = O((W += ''), x);
			return (
				(G.toString = function () {
					return W;
				}),
				G
			);
		},
		parse: function (W) {
			var G = S((W += ''), !1);
			return (
				(G.toString = function () {
					return W;
				}),
				G
			);
		},
		utcFormat: function (W) {
			var G = O((W += ''), m);
			return (
				(G.toString = function () {
					return W;
				}),
				G
			);
		},
		utcParse: function (W) {
			var G = S((W += ''), !0);
			return (
				(G.toString = function () {
					return W;
				}),
				G
			);
		},
	};
}
var rf = { '-': '', _: ' ', 0: '0' },
	Ae = /^\s*\d+/,
	Tj = /^%/,
	Ej = /[\\^$*+?|[\]().{}]/g;
function ie(e, t, r) {
	var n = e < 0 ? '-' : '',
		i = (n ? -e : e) + '',
		a = i.length;
	return n + (a < r ? new Array(r - a + 1).join(t) + i : i);
}
function jj(e) {
	return e.replace(Ej, '\\$&');
}
function Kr(e) {
	return new RegExp('^(?:' + e.map(jj).join('|') + ')', 'i');
}
function Gr(e) {
	return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function Mj(e, t, r) {
	var n = Ae.exec(t.slice(r, r + 1));
	return n ? ((e.w = +n[0]), r + n[0].length) : -1;
}
function Cj(e, t, r) {
	var n = Ae.exec(t.slice(r, r + 1));
	return n ? ((e.u = +n[0]), r + n[0].length) : -1;
}
function kj(e, t, r) {
	var n = Ae.exec(t.slice(r, r + 2));
	return n ? ((e.U = +n[0]), r + n[0].length) : -1;
}
function Ij(e, t, r) {
	var n = Ae.exec(t.slice(r, r + 2));
	return n ? ((e.V = +n[0]), r + n[0].length) : -1;
}
function Nj(e, t, r) {
	var n = Ae.exec(t.slice(r, r + 2));
	return n ? ((e.W = +n[0]), r + n[0].length) : -1;
}
function nf(e, t, r) {
	var n = Ae.exec(t.slice(r, r + 4));
	return n ? ((e.y = +n[0]), r + n[0].length) : -1;
}
function af(e, t, r) {
	var n = Ae.exec(t.slice(r, r + 2));
	return n
		? ((e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3)), r + n[0].length)
		: -1;
}
function Dj(e, t, r) {
	var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
	return n
		? ((e.Z = n[1] ? 0 : -(n[2] + (n[3] || '00'))), r + n[0].length)
		: -1;
}
function Bj(e, t, r) {
	var n = Ae.exec(t.slice(r, r + 1));
	return n ? ((e.q = n[0] * 3 - 3), r + n[0].length) : -1;
}
function Lj(e, t, r) {
	var n = Ae.exec(t.slice(r, r + 2));
	return n ? ((e.m = n[0] - 1), r + n[0].length) : -1;
}
function of(e, t, r) {
	var n = Ae.exec(t.slice(r, r + 2));
	return n ? ((e.d = +n[0]), r + n[0].length) : -1;
}
function Rj(e, t, r) {
	var n = Ae.exec(t.slice(r, r + 3));
	return n ? ((e.m = 0), (e.d = +n[0]), r + n[0].length) : -1;
}
function uf(e, t, r) {
	var n = Ae.exec(t.slice(r, r + 2));
	return n ? ((e.H = +n[0]), r + n[0].length) : -1;
}
function Fj(e, t, r) {
	var n = Ae.exec(t.slice(r, r + 2));
	return n ? ((e.M = +n[0]), r + n[0].length) : -1;
}
function Wj(e, t, r) {
	var n = Ae.exec(t.slice(r, r + 2));
	return n ? ((e.S = +n[0]), r + n[0].length) : -1;
}
function Uj(e, t, r) {
	var n = Ae.exec(t.slice(r, r + 3));
	return n ? ((e.L = +n[0]), r + n[0].length) : -1;
}
function zj(e, t, r) {
	var n = Ae.exec(t.slice(r, r + 6));
	return n ? ((e.L = Math.floor(n[0] / 1e3)), r + n[0].length) : -1;
}
function qj(e, t, r) {
	var n = Tj.exec(t.slice(r, r + 1));
	return n ? r + n[0].length : -1;
}
function Hj(e, t, r) {
	var n = Ae.exec(t.slice(r));
	return n ? ((e.Q = +n[0]), r + n[0].length) : -1;
}
function Kj(e, t, r) {
	var n = Ae.exec(t.slice(r));
	return n ? ((e.s = +n[0]), r + n[0].length) : -1;
}
function sf(e, t) {
	return ie(e.getDate(), t, 2);
}
function Gj(e, t) {
	return ie(e.getHours(), t, 2);
}
function Xj(e, t) {
	return ie(e.getHours() % 12 || 12, t, 2);
}
function Vj(e, t) {
	return ie(1 + ei.count(bt(e), e), t, 3);
}
function Nd(e, t) {
	return ie(e.getMilliseconds(), t, 3);
}
function Yj(e, t) {
	return Nd(e, t) + '000';
}
function Zj(e, t) {
	return ie(e.getMonth() + 1, t, 2);
}
function Jj(e, t) {
	return ie(e.getMinutes(), t, 2);
}
function Qj(e, t) {
	return ie(e.getSeconds(), t, 2);
}
function eM(e) {
	var t = e.getDay();
	return t === 0 ? 7 : t;
}
function tM(e, t) {
	return ie(Ba.count(bt(e) - 1, e), t, 2);
}
function Dd(e) {
	var t = e.getDay();
	return t >= 4 || t === 0 ? mr(e) : mr.ceil(e);
}
function rM(e, t) {
	return (e = Dd(e)), ie(mr.count(bt(e), e) + (bt(e).getDay() === 4), t, 2);
}
function nM(e) {
	return e.getDay();
}
function iM(e, t) {
	return ie(Hi.count(bt(e) - 1, e), t, 2);
}
function aM(e, t) {
	return ie(e.getFullYear() % 100, t, 2);
}
function oM(e, t) {
	return (e = Dd(e)), ie(e.getFullYear() % 100, t, 2);
}
function uM(e, t) {
	return ie(e.getFullYear() % 1e4, t, 4);
}
function sM(e, t) {
	var r = e.getDay();
	return (
		(e = r >= 4 || r === 0 ? mr(e) : mr.ceil(e)),
		ie(e.getFullYear() % 1e4, t, 4)
	);
}
function cM(e) {
	var t = e.getTimezoneOffset();
	return (
		(t > 0 ? '-' : ((t *= -1), '+')) +
		ie((t / 60) | 0, '0', 2) +
		ie(t % 60, '0', 2)
	);
}
function cf(e, t) {
	return ie(e.getUTCDate(), t, 2);
}
function lM(e, t) {
	return ie(e.getUTCHours(), t, 2);
}
function fM(e, t) {
	return ie(e.getUTCHours() % 12 || 12, t, 2);
}
function hM(e, t) {
	return ie(1 + Da.count(xt(e), e), t, 3);
}
function Bd(e, t) {
	return ie(e.getUTCMilliseconds(), t, 3);
}
function pM(e, t) {
	return Bd(e, t) + '000';
}
function dM(e, t) {
	return ie(e.getUTCMonth() + 1, t, 2);
}
function vM(e, t) {
	return ie(e.getUTCMinutes(), t, 2);
}
function yM(e, t) {
	return ie(e.getUTCSeconds(), t, 2);
}
function mM(e) {
	var t = e.getUTCDay();
	return t === 0 ? 7 : t;
}
function gM(e, t) {
	return ie(La.count(xt(e) - 1, e), t, 2);
}
function Ld(e) {
	var t = e.getUTCDay();
	return t >= 4 || t === 0 ? gr(e) : gr.ceil(e);
}
function bM(e, t) {
	return (
		(e = Ld(e)), ie(gr.count(xt(e), e) + (xt(e).getUTCDay() === 4), t, 2)
	);
}
function xM(e) {
	return e.getUTCDay();
}
function wM(e, t) {
	return ie(Ki.count(xt(e) - 1, e), t, 2);
}
function OM(e, t) {
	return ie(e.getUTCFullYear() % 100, t, 2);
}
function SM(e, t) {
	return (e = Ld(e)), ie(e.getUTCFullYear() % 100, t, 2);
}
function AM(e, t) {
	return ie(e.getUTCFullYear() % 1e4, t, 4);
}
function _M(e, t) {
	var r = e.getUTCDay();
	return (
		(e = r >= 4 || r === 0 ? gr(e) : gr.ceil(e)),
		ie(e.getUTCFullYear() % 1e4, t, 4)
	);
}
function PM() {
	return '+0000';
}
function lf() {
	return '%';
}
function ff(e) {
	return +e;
}
function hf(e) {
	return Math.floor(+e / 1e3);
}
var ir, Rd, Fd;
$M({
	dateTime: '%x, %X',
	date: '%-m/%-d/%Y',
	time: '%-I:%M:%S %p',
	periods: ['AM', 'PM'],
	days: [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	],
	shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	months: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	],
	shortMonths: [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	],
});
function $M(e) {
	return (
		(ir = $j(e)),
		(Rd = ir.format),
		ir.parse,
		(Fd = ir.utcFormat),
		ir.utcParse,
		ir
	);
}
function TM(e) {
	return new Date(e);
}
function EM(e) {
	return e instanceof Date ? +e : +new Date(+e);
}
function Us(e, t, r, n, i, a, o, u, s, c) {
	var f = Ts(),
		l = f.invert,
		h = f.domain,
		p = c('.%L'),
		y = c(':%S'),
		v = c('%I:%M'),
		d = c('%I %p'),
		w = c('%a %d'),
		b = c('%b %d'),
		x = c('%B'),
		m = c('%Y');
	function g(O) {
		return (
			s(O) < O
				? p
				: u(O) < O
					? y
					: o(O) < O
						? v
						: a(O) < O
							? d
							: n(O) < O
								? i(O) < O
									? w
									: b
								: r(O) < O
									? x
									: m
		)(O);
	}
	return (
		(f.invert = function (O) {
			return new Date(l(O));
		}),
		(f.domain = function (O) {
			return arguments.length ? h(Array.from(O, EM)) : h().map(TM);
		}),
		(f.ticks = function (O) {
			var S = h();
			return e(S[0], S[S.length - 1], O ?? 10);
		}),
		(f.tickFormat = function (O, S) {
			return S == null ? g : c(S);
		}),
		(f.nice = function (O) {
			var S = h();
			return (
				(!O || typeof O.range != 'function') &&
					(O = t(S[0], S[S.length - 1], O ?? 10)),
				O ? h(Pd(S, O)) : f
			);
		}),
		(f.copy = function () {
			return Qn(f, Us(e, t, r, n, i, a, o, u, s, c));
		}),
		f
	);
}
function jM() {
	return Ye.apply(
		Us(_j, Pj, bt, Fs, Ba, ei, Ls, Ds, Ht, Rd).domain([
			new Date(2e3, 0, 1),
			new Date(2e3, 0, 2),
		]),
		arguments,
	);
}
function MM() {
	return Ye.apply(
		Us(Sj, Aj, xt, Ws, La, Da, Rs, Bs, Ht, Fd).domain([
			Date.UTC(2e3, 0, 1),
			Date.UTC(2e3, 0, 2),
		]),
		arguments,
	);
}
function Ra() {
	var e = 0,
		t = 1,
		r,
		n,
		i,
		a,
		o = Me,
		u = !1,
		s;
	function c(l) {
		return l == null || isNaN((l = +l))
			? s
			: o(
					i === 0
						? 0.5
						: ((l = (a(l) - r) * i),
							u ? Math.max(0, Math.min(1, l)) : l),
				);
	}
	(c.domain = function (l) {
		return arguments.length
			? (([e, t] = l),
				(r = a((e = +e))),
				(n = a((t = +t))),
				(i = r === n ? 0 : 1 / (n - r)),
				c)
			: [e, t];
	}),
		(c.clamp = function (l) {
			return arguments.length ? ((u = !!l), c) : u;
		}),
		(c.interpolator = function (l) {
			return arguments.length ? ((o = l), c) : o;
		});
	function f(l) {
		return function (h) {
			var p, y;
			return arguments.length
				? (([p, y] = h), (o = l(p, y)), c)
				: [o(0), o(1)];
		};
	}
	return (
		(c.range = f(Br)),
		(c.rangeRound = f($s)),
		(c.unknown = function (l) {
			return arguments.length ? ((s = l), c) : s;
		}),
		function (l) {
			return (
				(a = l),
				(r = l(e)),
				(n = l(t)),
				(i = r === n ? 0 : 1 / (n - r)),
				c
			);
		}
	);
}
function kt(e, t) {
	return t
		.domain(e.domain())
		.interpolator(e.interpolator())
		.clamp(e.clamp())
		.unknown(e.unknown());
}
function Wd() {
	var e = Ct(Ra()(Me));
	return (
		(e.copy = function () {
			return kt(e, Wd());
		}),
		At.apply(e, arguments)
	);
}
function Ud() {
	var e = Ms(Ra()).domain([1, 10]);
	return (
		(e.copy = function () {
			return kt(e, Ud()).base(e.base());
		}),
		At.apply(e, arguments)
	);
}
function zd() {
	var e = Cs(Ra());
	return (
		(e.copy = function () {
			return kt(e, zd()).constant(e.constant());
		}),
		At.apply(e, arguments)
	);
}
function zs() {
	var e = ks(Ra());
	return (
		(e.copy = function () {
			return kt(e, zs()).exponent(e.exponent());
		}),
		At.apply(e, arguments)
	);
}
function CM() {
	return zs.apply(null, arguments).exponent(0.5);
}
function qd() {
	var e = [],
		t = Me;
	function r(n) {
		if (n != null && !isNaN((n = +n)))
			return t((Zn(e, n, 1) - 1) / (e.length - 1));
	}
	return (
		(r.domain = function (n) {
			if (!arguments.length) return e.slice();
			e = [];
			for (let i of n) i != null && !isNaN((i = +i)) && e.push(i);
			return e.sort(Et), r;
		}),
		(r.interpolator = function (n) {
			return arguments.length ? ((t = n), r) : t;
		}),
		(r.range = function () {
			return e.map((n, i) => t(i / (e.length - 1)));
		}),
		(r.quantiles = function (n) {
			return Array.from({ length: n + 1 }, (i, a) => gE(e, a / n));
		}),
		(r.copy = function () {
			return qd(t).domain(e);
		}),
		At.apply(r, arguments)
	);
}
function Fa() {
	var e = 0,
		t = 0.5,
		r = 1,
		n = 1,
		i,
		a,
		o,
		u,
		s,
		c = Me,
		f,
		l = !1,
		h;
	function p(v) {
		return isNaN((v = +v))
			? h
			: ((v = 0.5 + ((v = +f(v)) - a) * (n * v < n * a ? u : s)),
				c(l ? Math.max(0, Math.min(1, v)) : v));
	}
	(p.domain = function (v) {
		return arguments.length
			? (([e, t, r] = v),
				(i = f((e = +e))),
				(a = f((t = +t))),
				(o = f((r = +r))),
				(u = i === a ? 0 : 0.5 / (a - i)),
				(s = a === o ? 0 : 0.5 / (o - a)),
				(n = a < i ? -1 : 1),
				p)
			: [e, t, r];
	}),
		(p.clamp = function (v) {
			return arguments.length ? ((l = !!v), p) : l;
		}),
		(p.interpolator = function (v) {
			return arguments.length ? ((c = v), p) : c;
		});
	function y(v) {
		return function (d) {
			var w, b, x;
			return arguments.length
				? (([w, b, x] = d), (c = qE(v, [w, b, x])), p)
				: [c(0), c(0.5), c(1)];
		};
	}
	return (
		(p.range = y(Br)),
		(p.rangeRound = y($s)),
		(p.unknown = function (v) {
			return arguments.length ? ((h = v), p) : h;
		}),
		function (v) {
			return (
				(f = v),
				(i = v(e)),
				(a = v(t)),
				(o = v(r)),
				(u = i === a ? 0 : 0.5 / (a - i)),
				(s = a === o ? 0 : 0.5 / (o - a)),
				(n = a < i ? -1 : 1),
				p
			);
		}
	);
}
function Hd() {
	var e = Ct(Fa()(Me));
	return (
		(e.copy = function () {
			return kt(e, Hd());
		}),
		At.apply(e, arguments)
	);
}
function Kd() {
	var e = Ms(Fa()).domain([0.1, 1, 10]);
	return (
		(e.copy = function () {
			return kt(e, Kd()).base(e.base());
		}),
		At.apply(e, arguments)
	);
}
function Gd() {
	var e = Cs(Fa());
	return (
		(e.copy = function () {
			return kt(e, Gd()).constant(e.constant());
		}),
		At.apply(e, arguments)
	);
}
function qs() {
	var e = ks(Fa());
	return (
		(e.copy = function () {
			return kt(e, qs()).exponent(e.exponent());
		}),
		At.apply(e, arguments)
	);
}
function kM() {
	return qs.apply(null, arguments).exponent(0.5);
}
const pf = Object.freeze(
	Object.defineProperty(
		{
			__proto__: null,
			scaleBand: yn,
			scaleDiverging: Hd,
			scaleDivergingLog: Kd,
			scaleDivergingPow: qs,
			scaleDivergingSqrt: kM,
			scaleDivergingSymlog: Gd,
			scaleIdentity: _d,
			scaleImplicit: cu,
			scaleLinear: zi,
			scaleLog: $d,
			scaleOrdinal: As,
			scalePoint: rn,
			scalePow: Is,
			scaleQuantile: jd,
			scaleQuantize: Md,
			scaleRadial: Ed,
			scaleSequential: Wd,
			scaleSequentialLog: Ud,
			scaleSequentialPow: zs,
			scaleSequentialQuantile: qd,
			scaleSequentialSqrt: CM,
			scaleSequentialSymlog: zd,
			scaleSqrt: pj,
			scaleSymlog: Td,
			scaleThreshold: Cd,
			scaleTime: jM,
			scaleUtc: MM,
			tickFormat: Ad,
		},
		Symbol.toStringTag,
		{ value: 'Module' },
	),
);
var IM = $r;
function NM(e, t, r) {
	for (var n = -1, i = e.length; ++n < i; ) {
		var a = e[n],
			o = t(a);
		if (o != null && (u === void 0 ? o === o && !IM(o) : r(o, u)))
			var u = o,
				s = a;
	}
	return s;
}
var Xd = NM;
function DM(e, t) {
	return e > t;
}
var BM = DM,
	LM = Xd,
	RM = BM,
	FM = Nr;
function WM(e) {
	return e && e.length ? LM(e, FM, RM) : void 0;
}
var UM = WM;
const $t = fe(UM);
function zM(e, t) {
	return e < t;
}
var qM = zM,
	HM = Xd,
	KM = qM,
	GM = Nr;
function XM(e) {
	return e && e.length ? HM(e, GM, KM) : void 0;
}
var VM = XM;
const Wa = fe(VM);
var YM = rs,
	ZM = Dr,
	JM = rd,
	QM = Ne;
function eC(e, t) {
	var r = QM(e) ? YM : JM;
	return r(e, ZM(t));
}
var tC = eC,
	rC = ed,
	nC = tC;
function iC(e, t) {
	return rC(nC(e, t), 1);
}
var aC = iC;
const oC = fe(aC);
var uC = bs;
function sC(e, t) {
	return uC(e, t);
}
var cC = sC;
const wn = fe(cC);
var Lr = 1e9,
	lC = {
		precision: 20,
		rounding: 4,
		toExpNeg: -7,
		toExpPos: 21,
		LN10: '2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286',
	},
	Ks,
	he = !0,
	Ve = '[DecimalError] ',
	Yt = Ve + 'Invalid argument: ',
	Hs = Ve + 'Exponent out of range: ',
	Rr = Math.floor,
	Ut = Math.pow,
	fC = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
	Re,
	Oe = 1e7,
	le = 7,
	Vd = 9007199254740991,
	Gi = Rr(Vd / le),
	U = {};
U.absoluteValue = U.abs = function () {
	var e = new this.constructor(this);
	return e.s && (e.s = 1), e;
};
U.comparedTo = U.cmp = function (e) {
	var t,
		r,
		n,
		i,
		a = this;
	if (((e = new a.constructor(e)), a.s !== e.s)) return a.s || -e.s;
	if (a.e !== e.e) return (a.e > e.e) ^ (a.s < 0) ? 1 : -1;
	for (n = a.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t)
		if (a.d[t] !== e.d[t]) return (a.d[t] > e.d[t]) ^ (a.s < 0) ? 1 : -1;
	return n === i ? 0 : (n > i) ^ (a.s < 0) ? 1 : -1;
};
U.decimalPlaces = U.dp = function () {
	var e = this,
		t = e.d.length - 1,
		r = (t - e.e) * le;
	if (((t = e.d[t]), t)) for (; t % 10 == 0; t /= 10) r--;
	return r < 0 ? 0 : r;
};
U.dividedBy = U.div = function (e) {
	return mt(this, new this.constructor(e));
};
U.dividedToIntegerBy = U.idiv = function (e) {
	var t = this,
		r = t.constructor;
	return ue(mt(t, new r(e), 0, 1), r.precision);
};
U.equals = U.eq = function (e) {
	return !this.cmp(e);
};
U.exponent = function () {
	return ye(this);
};
U.greaterThan = U.gt = function (e) {
	return this.cmp(e) > 0;
};
U.greaterThanOrEqualTo = U.gte = function (e) {
	return this.cmp(e) >= 0;
};
U.isInteger = U.isint = function () {
	return this.e > this.d.length - 2;
};
U.isNegative = U.isneg = function () {
	return this.s < 0;
};
U.isPositive = U.ispos = function () {
	return this.s > 0;
};
U.isZero = function () {
	return this.s === 0;
};
U.lessThan = U.lt = function (e) {
	return this.cmp(e) < 0;
};
U.lessThanOrEqualTo = U.lte = function (e) {
	return this.cmp(e) < 1;
};
U.logarithm = U.log = function (e) {
	var t,
		r = this,
		n = r.constructor,
		i = n.precision,
		a = i + 5;
	if (e === void 0) e = new n(10);
	else if (((e = new n(e)), e.s < 1 || e.eq(Re))) throw Error(Ve + 'NaN');
	if (r.s < 1) throw Error(Ve + (r.s ? 'NaN' : '-Infinity'));
	return r.eq(Re)
		? new n(0)
		: ((he = !1), (t = mt(On(r, a), On(e, a), a)), (he = !0), ue(t, i));
};
U.minus = U.sub = function (e) {
	var t = this;
	return (
		(e = new t.constructor(e)),
		t.s == e.s ? Jd(t, e) : Yd(t, ((e.s = -e.s), e))
	);
};
U.modulo = U.mod = function (e) {
	var t,
		r = this,
		n = r.constructor,
		i = n.precision;
	if (((e = new n(e)), !e.s)) throw Error(Ve + 'NaN');
	return r.s
		? ((he = !1), (t = mt(r, e, 0, 1).times(e)), (he = !0), r.minus(t))
		: ue(new n(r), i);
};
U.naturalExponential = U.exp = function () {
	return Zd(this);
};
U.naturalLogarithm = U.ln = function () {
	return On(this);
};
U.negated = U.neg = function () {
	var e = new this.constructor(this);
	return (e.s = -e.s || 0), e;
};
U.plus = U.add = function (e) {
	var t = this;
	return (
		(e = new t.constructor(e)),
		t.s == e.s ? Yd(t, e) : Jd(t, ((e.s = -e.s), e))
	);
};
U.precision = U.sd = function (e) {
	var t,
		r,
		n,
		i = this;
	if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Yt + e);
	if (
		((t = ye(i) + 1),
		(n = i.d.length - 1),
		(r = n * le + 1),
		(n = i.d[n]),
		n)
	) {
		for (; n % 10 == 0; n /= 10) r--;
		for (n = i.d[0]; n >= 10; n /= 10) r++;
	}
	return e && t > r ? t : r;
};
U.squareRoot = U.sqrt = function () {
	var e,
		t,
		r,
		n,
		i,
		a,
		o,
		u = this,
		s = u.constructor;
	if (u.s < 1) {
		if (!u.s) return new s(0);
		throw Error(Ve + 'NaN');
	}
	for (
		e = ye(u),
			he = !1,
			i = Math.sqrt(+u),
			i == 0 || i == 1 / 0
				? ((t = at(u.d)),
					(t.length + e) % 2 == 0 && (t += '0'),
					(i = Math.sqrt(t)),
					(e = Rr((e + 1) / 2) - (e < 0 || e % 2)),
					i == 1 / 0
						? (t = '5e' + e)
						: ((t = i.toExponential()),
							(t = t.slice(0, t.indexOf('e') + 1) + e)),
					(n = new s(t)))
				: (n = new s(i.toString())),
			r = s.precision,
			i = o = r + 3;
		;

	)
		if (
			((a = n),
			(n = a.plus(mt(u, a, o + 2)).times(0.5)),
			at(a.d).slice(0, o) === (t = at(n.d)).slice(0, o))
		) {
			if (((t = t.slice(o - 3, o + 1)), i == o && t == '4999')) {
				if ((ue(a, r + 1, 0), a.times(a).eq(u))) {
					n = a;
					break;
				}
			} else if (t != '9999') break;
			o += 4;
		}
	return (he = !0), ue(n, r);
};
U.times = U.mul = function (e) {
	var t,
		r,
		n,
		i,
		a,
		o,
		u,
		s,
		c,
		f = this,
		l = f.constructor,
		h = f.d,
		p = (e = new l(e)).d;
	if (!f.s || !e.s) return new l(0);
	for (
		e.s *= f.s,
			r = f.e + e.e,
			s = h.length,
			c = p.length,
			s < c && ((a = h), (h = p), (p = a), (o = s), (s = c), (c = o)),
			a = [],
			o = s + c,
			n = o;
		n--;

	)
		a.push(0);
	for (n = c; --n >= 0; ) {
		for (t = 0, i = s + n; i > n; )
			(u = a[i] + p[n] * h[i - n - 1] + t),
				(a[i--] = u % Oe | 0),
				(t = (u / Oe) | 0);
		a[i] = (a[i] + t) % Oe | 0;
	}
	for (; !a[--o]; ) a.pop();
	return (
		t ? ++r : a.shift(), (e.d = a), (e.e = r), he ? ue(e, l.precision) : e
	);
};
U.toDecimalPlaces = U.todp = function (e, t) {
	var r = this,
		n = r.constructor;
	return (
		(r = new n(r)),
		e === void 0
			? r
			: (ct(e, 0, Lr),
				t === void 0 ? (t = n.rounding) : ct(t, 0, 8),
				ue(r, e + ye(r) + 1, t))
	);
};
U.toExponential = function (e, t) {
	var r,
		n = this,
		i = n.constructor;
	return (
		e === void 0
			? (r = Jt(n, !0))
			: (ct(e, 0, Lr),
				t === void 0 ? (t = i.rounding) : ct(t, 0, 8),
				(n = ue(new i(n), e + 1, t)),
				(r = Jt(n, !0, e + 1))),
		r
	);
};
U.toFixed = function (e, t) {
	var r,
		n,
		i = this,
		a = i.constructor;
	return e === void 0
		? Jt(i)
		: (ct(e, 0, Lr),
			t === void 0 ? (t = a.rounding) : ct(t, 0, 8),
			(n = ue(new a(i), e + ye(i) + 1, t)),
			(r = Jt(n.abs(), !1, e + ye(n) + 1)),
			i.isneg() && !i.isZero() ? '-' + r : r);
};
U.toInteger = U.toint = function () {
	var e = this,
		t = e.constructor;
	return ue(new t(e), ye(e) + 1, t.rounding);
};
U.toNumber = function () {
	return +this;
};
U.toPower = U.pow = function (e) {
	var t,
		r,
		n,
		i,
		a,
		o,
		u = this,
		s = u.constructor,
		c = 12,
		f = +(e = new s(e));
	if (!e.s) return new s(Re);
	if (((u = new s(u)), !u.s)) {
		if (e.s < 1) throw Error(Ve + 'Infinity');
		return u;
	}
	if (u.eq(Re)) return u;
	if (((n = s.precision), e.eq(Re))) return ue(u, n);
	if (((t = e.e), (r = e.d.length - 1), (o = t >= r), (a = u.s), o)) {
		if ((r = f < 0 ? -f : f) <= Vd) {
			for (
				i = new s(Re), t = Math.ceil(n / le + 4), he = !1;
				r % 2 && ((i = i.times(u)), vf(i.d, t)),
					(r = Rr(r / 2)),
					r !== 0;

			)
				(u = u.times(u)), vf(u.d, t);
			return (he = !0), e.s < 0 ? new s(Re).div(i) : ue(i, n);
		}
	} else if (a < 0) throw Error(Ve + 'NaN');
	return (
		(a = a < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1),
		(u.s = 1),
		(he = !1),
		(i = e.times(On(u, n + c))),
		(he = !0),
		(i = Zd(i)),
		(i.s = a),
		i
	);
};
U.toPrecision = function (e, t) {
	var r,
		n,
		i = this,
		a = i.constructor;
	return (
		e === void 0
			? ((r = ye(i)), (n = Jt(i, r <= a.toExpNeg || r >= a.toExpPos)))
			: (ct(e, 1, Lr),
				t === void 0 ? (t = a.rounding) : ct(t, 0, 8),
				(i = ue(new a(i), e, t)),
				(r = ye(i)),
				(n = Jt(i, e <= r || r <= a.toExpNeg, e))),
		n
	);
};
U.toSignificantDigits = U.tosd = function (e, t) {
	var r = this,
		n = r.constructor;
	return (
		e === void 0
			? ((e = n.precision), (t = n.rounding))
			: (ct(e, 1, Lr), t === void 0 ? (t = n.rounding) : ct(t, 0, 8)),
		ue(new n(r), e, t)
	);
};
U.toString =
	U.valueOf =
	U.val =
	U.toJSON =
	U[Symbol.for('nodejs.util.inspect.custom')] =
		function () {
			var e = this,
				t = ye(e),
				r = e.constructor;
			return Jt(e, t <= r.toExpNeg || t >= r.toExpPos);
		};
function Yd(e, t) {
	var r,
		n,
		i,
		a,
		o,
		u,
		s,
		c,
		f = e.constructor,
		l = f.precision;
	if (!e.s || !t.s) return t.s || (t = new f(e)), he ? ue(t, l) : t;
	if (
		((s = e.d),
		(c = t.d),
		(o = e.e),
		(i = t.e),
		(s = s.slice()),
		(a = o - i),
		a)
	) {
		for (
			a < 0
				? ((n = s), (a = -a), (u = c.length))
				: ((n = c), (i = o), (u = s.length)),
				o = Math.ceil(l / le),
				u = o > u ? o + 1 : u + 1,
				a > u && ((a = u), (n.length = 1)),
				n.reverse();
			a--;

		)
			n.push(0);
		n.reverse();
	}
	for (
		u = s.length,
			a = c.length,
			u - a < 0 && ((a = u), (n = c), (c = s), (s = n)),
			r = 0;
		a;

	)
		(r = ((s[--a] = s[a] + c[a] + r) / Oe) | 0), (s[a] %= Oe);
	for (r && (s.unshift(r), ++i), u = s.length; s[--u] == 0; ) s.pop();
	return (t.d = s), (t.e = i), he ? ue(t, l) : t;
}
function ct(e, t, r) {
	if (e !== ~~e || e < t || e > r) throw Error(Yt + e);
}
function at(e) {
	var t,
		r,
		n,
		i = e.length - 1,
		a = '',
		o = e[0];
	if (i > 0) {
		for (a += o, t = 1; t < i; t++)
			(n = e[t] + ''), (r = le - n.length), r && (a += Pt(r)), (a += n);
		(o = e[t]), (n = o + ''), (r = le - n.length), r && (a += Pt(r));
	} else if (o === 0) return '0';
	for (; o % 10 === 0; ) o /= 10;
	return a + o;
}
var mt = (function () {
	function e(n, i) {
		var a,
			o = 0,
			u = n.length;
		for (n = n.slice(); u--; )
			(a = n[u] * i + o), (n[u] = a % Oe | 0), (o = (a / Oe) | 0);
		return o && n.unshift(o), n;
	}
	function t(n, i, a, o) {
		var u, s;
		if (a != o) s = a > o ? 1 : -1;
		else
			for (u = s = 0; u < a; u++)
				if (n[u] != i[u]) {
					s = n[u] > i[u] ? 1 : -1;
					break;
				}
		return s;
	}
	function r(n, i, a) {
		for (var o = 0; a--; )
			(n[a] -= o),
				(o = n[a] < i[a] ? 1 : 0),
				(n[a] = o * Oe + n[a] - i[a]);
		for (; !n[0] && n.length > 1; ) n.shift();
	}
	return function (n, i, a, o) {
		var u,
			s,
			c,
			f,
			l,
			h,
			p,
			y,
			v,
			d,
			w,
			b,
			x,
			m,
			g,
			O,
			S,
			A,
			E = n.constructor,
			T = n.s == i.s ? 1 : -1,
			P = n.d,
			$ = i.d;
		if (!n.s) return new E(n);
		if (!i.s) throw Error(Ve + 'Division by zero');
		for (
			s = n.e - i.e,
				S = $.length,
				g = P.length,
				p = new E(T),
				y = p.d = [],
				c = 0;
			$[c] == (P[c] || 0);

		)
			++c;
		if (
			($[c] > (P[c] || 0) && --s,
			a == null
				? (b = a = E.precision)
				: o
					? (b = a + (ye(n) - ye(i)) + 1)
					: (b = a),
			b < 0)
		)
			return new E(0);
		if (((b = (b / le + 2) | 0), (c = 0), S == 1))
			for (f = 0, $ = $[0], b++; (c < g || f) && b--; c++)
				(x = f * Oe + (P[c] || 0)),
					(y[c] = (x / $) | 0),
					(f = x % $ | 0);
		else {
			for (
				f = (Oe / ($[0] + 1)) | 0,
					f > 1 &&
						(($ = e($, f)),
						(P = e(P, f)),
						(S = $.length),
						(g = P.length)),
					m = S,
					v = P.slice(0, S),
					d = v.length;
				d < S;

			)
				v[d++] = 0;
			(A = $.slice()), A.unshift(0), (O = $[0]), $[1] >= Oe / 2 && ++O;
			do
				(f = 0),
					(u = t($, v, S, d)),
					u < 0
						? ((w = v[0]),
							S != d && (w = w * Oe + (v[1] || 0)),
							(f = (w / O) | 0),
							f > 1
								? (f >= Oe && (f = Oe - 1),
									(l = e($, f)),
									(h = l.length),
									(d = v.length),
									(u = t(l, v, h, d)),
									u == 1 && (f--, r(l, S < h ? A : $, h)))
								: (f == 0 && (u = f = 1), (l = $.slice())),
							(h = l.length),
							h < d && l.unshift(0),
							r(v, l, d),
							u == -1 &&
								((d = v.length),
								(u = t($, v, S, d)),
								u < 1 && (f++, r(v, S < d ? A : $, d))),
							(d = v.length))
						: u === 0 && (f++, (v = [0])),
					(y[c++] = f),
					u && v[0] ? (v[d++] = P[m] || 0) : ((v = [P[m]]), (d = 1));
			while ((m++ < g || v[0] !== void 0) && b--);
		}
		return y[0] || y.shift(), (p.e = s), ue(p, o ? a + ye(p) + 1 : a);
	};
})();
function Zd(e, t) {
	var r,
		n,
		i,
		a,
		o,
		u,
		s = 0,
		c = 0,
		f = e.constructor,
		l = f.precision;
	if (ye(e) > 16) throw Error(Hs + ye(e));
	if (!e.s) return new f(Re);
	for (
		t == null ? ((he = !1), (u = l)) : (u = t), o = new f(0.03125);
		e.abs().gte(0.1);

	)
		(e = e.times(o)), (c += 5);
	for (
		n = ((Math.log(Ut(2, c)) / Math.LN10) * 2 + 5) | 0,
			u += n,
			r = i = a = new f(Re),
			f.precision = u;
		;

	) {
		if (
			((i = ue(i.times(e), u)),
			(r = r.times(++s)),
			(o = a.plus(mt(i, r, u))),
			at(o.d).slice(0, u) === at(a.d).slice(0, u))
		) {
			for (; c--; ) a = ue(a.times(a), u);
			return (f.precision = l), t == null ? ((he = !0), ue(a, l)) : a;
		}
		a = o;
	}
}
function ye(e) {
	for (var t = e.e * le, r = e.d[0]; r >= 10; r /= 10) t++;
	return t;
}
function go(e, t, r) {
	if (t > e.LN10.sd())
		throw (
			((he = !0),
			r && (e.precision = r),
			Error(Ve + 'LN10 precision limit exceeded'))
		);
	return ue(new e(e.LN10), t);
}
function Pt(e) {
	for (var t = ''; e--; ) t += '0';
	return t;
}
function On(e, t) {
	var r,
		n,
		i,
		a,
		o,
		u,
		s,
		c,
		f,
		l = 1,
		h = 10,
		p = e,
		y = p.d,
		v = p.constructor,
		d = v.precision;
	if (p.s < 1) throw Error(Ve + (p.s ? 'NaN' : '-Infinity'));
	if (p.eq(Re)) return new v(0);
	if ((t == null ? ((he = !1), (c = d)) : (c = t), p.eq(10)))
		return t == null && (he = !0), go(v, c);
	if (
		((c += h),
		(v.precision = c),
		(r = at(y)),
		(n = r.charAt(0)),
		(a = ye(p)),
		Math.abs(a) < 15e14)
	) {
		for (; (n < 7 && n != 1) || (n == 1 && r.charAt(1) > 3); )
			(p = p.times(e)), (r = at(p.d)), (n = r.charAt(0)), l++;
		(a = ye(p)),
			n > 1
				? ((p = new v('0.' + r)), a++)
				: (p = new v(n + '.' + r.slice(1)));
	} else
		return (
			(s = go(v, c + 2, d).times(a + '')),
			(p = On(new v(n + '.' + r.slice(1)), c - h).plus(s)),
			(v.precision = d),
			t == null ? ((he = !0), ue(p, d)) : p
		);
	for (
		u = o = p = mt(p.minus(Re), p.plus(Re), c),
			f = ue(p.times(p), c),
			i = 3;
		;

	) {
		if (
			((o = ue(o.times(f), c)),
			(s = u.plus(mt(o, new v(i), c))),
			at(s.d).slice(0, c) === at(u.d).slice(0, c))
		)
			return (
				(u = u.times(2)),
				a !== 0 && (u = u.plus(go(v, c + 2, d).times(a + ''))),
				(u = mt(u, new v(l), c)),
				(v.precision = d),
				t == null ? ((he = !0), ue(u, d)) : u
			);
		(u = s), (i += 2);
	}
}
function df(e, t) {
	var r, n, i;
	for (
		(r = t.indexOf('.')) > -1 && (t = t.replace('.', '')),
			(n = t.search(/e/i)) > 0
				? (r < 0 && (r = n),
					(r += +t.slice(n + 1)),
					(t = t.substring(0, n)))
				: r < 0 && (r = t.length),
			n = 0;
		t.charCodeAt(n) === 48;

	)
		++n;
	for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
	if (((t = t.slice(n, i)), t)) {
		if (
			((i -= n),
			(r = r - n - 1),
			(e.e = Rr(r / le)),
			(e.d = []),
			(n = (r + 1) % le),
			r < 0 && (n += le),
			n < i)
		) {
			for (n && e.d.push(+t.slice(0, n)), i -= le; n < i; )
				e.d.push(+t.slice(n, (n += le)));
			(t = t.slice(n)), (n = le - t.length);
		} else n -= i;
		for (; n--; ) t += '0';
		if ((e.d.push(+t), he && (e.e > Gi || e.e < -Gi))) throw Error(Hs + r);
	} else (e.s = 0), (e.e = 0), (e.d = [0]);
	return e;
}
function ue(e, t, r) {
	var n,
		i,
		a,
		o,
		u,
		s,
		c,
		f,
		l = e.d;
	for (o = 1, a = l[0]; a >= 10; a /= 10) o++;
	if (((n = t - o), n < 0)) (n += le), (i = t), (c = l[(f = 0)]);
	else {
		if (((f = Math.ceil((n + 1) / le)), (a = l.length), f >= a)) return e;
		for (c = a = l[f], o = 1; a >= 10; a /= 10) o++;
		(n %= le), (i = n - le + o);
	}
	if (
		(r !== void 0 &&
			((a = Ut(10, o - i - 1)),
			(u = (c / a) % 10 | 0),
			(s = t < 0 || l[f + 1] !== void 0 || c % a),
			(s =
				r < 4
					? (u || s) && (r == 0 || r == (e.s < 0 ? 3 : 2))
					: u > 5 ||
						(u == 5 &&
							(r == 4 ||
								s ||
								(r == 6 &&
									(n > 0
										? i > 0
											? c / Ut(10, o - i)
											: 0
										: l[f - 1]) %
										10 &
										1) ||
								r == (e.s < 0 ? 8 : 7))))),
		t < 1 || !l[0])
	)
		return (
			s
				? ((a = ye(e)),
					(l.length = 1),
					(t = t - a - 1),
					(l[0] = Ut(10, (le - (t % le)) % le)),
					(e.e = Rr(-t / le) || 0))
				: ((l.length = 1), (l[0] = e.e = e.s = 0)),
			e
		);
	if (
		(n == 0
			? ((l.length = f), (a = 1), f--)
			: ((l.length = f + 1),
				(a = Ut(10, le - n)),
				(l[f] = i > 0 ? ((c / Ut(10, o - i)) % Ut(10, i) | 0) * a : 0)),
		s)
	)
		for (;;)
			if (f == 0) {
				(l[0] += a) == Oe && ((l[0] = 1), ++e.e);
				break;
			} else {
				if (((l[f] += a), l[f] != Oe)) break;
				(l[f--] = 0), (a = 1);
			}
	for (n = l.length; l[--n] === 0; ) l.pop();
	if (he && (e.e > Gi || e.e < -Gi)) throw Error(Hs + ye(e));
	return e;
}
function Jd(e, t) {
	var r,
		n,
		i,
		a,
		o,
		u,
		s,
		c,
		f,
		l,
		h = e.constructor,
		p = h.precision;
	if (!e.s || !t.s)
		return t.s ? (t.s = -t.s) : (t = new h(e)), he ? ue(t, p) : t;
	if (
		((s = e.d),
		(l = t.d),
		(n = t.e),
		(c = e.e),
		(s = s.slice()),
		(o = c - n),
		o)
	) {
		for (
			f = o < 0,
				f
					? ((r = s), (o = -o), (u = l.length))
					: ((r = l), (n = c), (u = s.length)),
				i = Math.max(Math.ceil(p / le), u) + 2,
				o > i && ((o = i), (r.length = 1)),
				r.reverse(),
				i = o;
			i--;

		)
			r.push(0);
		r.reverse();
	} else {
		for (
			i = s.length, u = l.length, f = i < u, f && (u = i), i = 0;
			i < u;
			i++
		)
			if (s[i] != l[i]) {
				f = s[i] < l[i];
				break;
			}
		o = 0;
	}
	for (
		f && ((r = s), (s = l), (l = r), (t.s = -t.s)),
			u = s.length,
			i = l.length - u;
		i > 0;
		--i
	)
		s[u++] = 0;
	for (i = l.length; i > o; ) {
		if (s[--i] < l[i]) {
			for (a = i; a && s[--a] === 0; ) s[a] = Oe - 1;
			--s[a], (s[i] += Oe);
		}
		s[i] -= l[i];
	}
	for (; s[--u] === 0; ) s.pop();
	for (; s[0] === 0; s.shift()) --n;
	return s[0] ? ((t.d = s), (t.e = n), he ? ue(t, p) : t) : new h(0);
}
function Jt(e, t, r) {
	var n,
		i = ye(e),
		a = at(e.d),
		o = a.length;
	return (
		t
			? (r && (n = r - o) > 0
					? (a = a.charAt(0) + '.' + a.slice(1) + Pt(n))
					: o > 1 && (a = a.charAt(0) + '.' + a.slice(1)),
				(a = a + (i < 0 ? 'e' : 'e+') + i))
			: i < 0
				? ((a = '0.' + Pt(-i - 1) + a),
					r && (n = r - o) > 0 && (a += Pt(n)))
				: i >= o
					? ((a += Pt(i + 1 - o)),
						r && (n = r - i - 1) > 0 && (a = a + '.' + Pt(n)))
					: ((n = i + 1) < o &&
							(a = a.slice(0, n) + '.' + a.slice(n)),
						r &&
							(n = r - o) > 0 &&
							(i + 1 === o && (a += '.'), (a += Pt(n)))),
		e.s < 0 ? '-' + a : a
	);
}
function vf(e, t) {
	if (e.length > t) return (e.length = t), !0;
}
function Qd(e) {
	var t, r, n;
	function i(a) {
		var o = this;
		if (!(o instanceof i)) return new i(a);
		if (((o.constructor = i), a instanceof i)) {
			(o.s = a.s), (o.e = a.e), (o.d = (a = a.d) ? a.slice() : a);
			return;
		}
		if (typeof a == 'number') {
			if (a * 0 !== 0) throw Error(Yt + a);
			if (a > 0) o.s = 1;
			else if (a < 0) (a = -a), (o.s = -1);
			else {
				(o.s = 0), (o.e = 0), (o.d = [0]);
				return;
			}
			if (a === ~~a && a < 1e7) {
				(o.e = 0), (o.d = [a]);
				return;
			}
			return df(o, a.toString());
		} else if (typeof a != 'string') throw Error(Yt + a);
		if (
			(a.charCodeAt(0) === 45
				? ((a = a.slice(1)), (o.s = -1))
				: (o.s = 1),
			fC.test(a))
		)
			df(o, a);
		else throw Error(Yt + a);
	}
	if (
		((i.prototype = U),
		(i.ROUND_UP = 0),
		(i.ROUND_DOWN = 1),
		(i.ROUND_CEIL = 2),
		(i.ROUND_FLOOR = 3),
		(i.ROUND_HALF_UP = 4),
		(i.ROUND_HALF_DOWN = 5),
		(i.ROUND_HALF_EVEN = 6),
		(i.ROUND_HALF_CEIL = 7),
		(i.ROUND_HALF_FLOOR = 8),
		(i.clone = Qd),
		(i.config = i.set = hC),
		e === void 0 && (e = {}),
		e)
	)
		for (
			n = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'LN10'],
				t = 0;
			t < n.length;

		)
			e.hasOwnProperty((r = n[t++])) || (e[r] = this[r]);
	return i.config(e), i;
}
function hC(e) {
	if (!e || typeof e != 'object') throw Error(Ve + 'Object expected');
	var t,
		r,
		n,
		i = [
			'precision',
			1,
			Lr,
			'rounding',
			0,
			8,
			'toExpNeg',
			-1 / 0,
			0,
			'toExpPos',
			0,
			1 / 0,
		];
	for (t = 0; t < i.length; t += 3)
		if ((n = e[(r = i[t])]) !== void 0)
			if (Rr(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
			else throw Error(Yt + r + ': ' + n);
	if ((n = e[(r = 'LN10')]) !== void 0)
		if (n == Math.LN10) this[r] = new this(n);
		else throw Error(Yt + r + ': ' + n);
	return this;
}
var Ks = Qd(lC);
Re = new Ks(1);
const oe = Ks;
function pC(e) {
	return mC(e) || yC(e) || vC(e) || dC();
}
function dC() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function vC(e, t) {
	if (e) {
		if (typeof e == 'string') return pu(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return pu(e, t);
	}
}
function yC(e) {
	if (typeof Symbol < 'u' && Symbol.iterator in Object(e))
		return Array.from(e);
}
function mC(e) {
	if (Array.isArray(e)) return pu(e);
}
function pu(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
var gC = function (t) {
		return t;
	},
	ev = { '@@functional/placeholder': !0 },
	tv = function (t) {
		return t === ev;
	},
	yf = function (t) {
		return function r() {
			return arguments.length === 0 ||
				(arguments.length === 1 &&
					tv(arguments.length <= 0 ? void 0 : arguments[0]))
				? r
				: t.apply(void 0, arguments);
		};
	},
	bC = function e(t, r) {
		return t === 1
			? r
			: yf(function () {
					for (
						var n = arguments.length, i = new Array(n), a = 0;
						a < n;
						a++
					)
						i[a] = arguments[a];
					var o = i.filter(function (u) {
						return u !== ev;
					}).length;
					return o >= t
						? r.apply(void 0, i)
						: e(
								t - o,
								yf(function () {
									for (
										var u = arguments.length,
											s = new Array(u),
											c = 0;
										c < u;
										c++
									)
										s[c] = arguments[c];
									var f = i.map(function (l) {
										return tv(l) ? s.shift() : l;
									});
									return r.apply(void 0, pC(f).concat(s));
								}),
							);
				});
	},
	Ua = function (t) {
		return bC(t.length, t);
	},
	du = function (t, r) {
		for (var n = [], i = t; i < r; ++i) n[i - t] = i;
		return n;
	},
	xC = Ua(function (e, t) {
		return Array.isArray(t)
			? t.map(e)
			: Object.keys(t)
					.map(function (r) {
						return t[r];
					})
					.map(e);
	}),
	wC = function () {
		for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
			r[n] = arguments[n];
		if (!r.length) return gC;
		var i = r.reverse(),
			a = i[0],
			o = i.slice(1);
		return function () {
			return o.reduce(
				function (u, s) {
					return s(u);
				},
				a.apply(void 0, arguments),
			);
		};
	},
	vu = function (t) {
		return Array.isArray(t) ? t.reverse() : t.split('').reverse.join('');
	},
	rv = function (t) {
		var r = null,
			n = null;
		return function () {
			for (var i = arguments.length, a = new Array(i), o = 0; o < i; o++)
				a[o] = arguments[o];
			return (
				(r &&
					a.every(function (u, s) {
						return u === r[s];
					})) ||
					((r = a), (n = t.apply(void 0, a))),
				n
			);
		};
	};
function OC(e) {
	var t;
	return (
		e === 0
			? (t = 1)
			: (t = Math.floor(new oe(e).abs().log(10).toNumber()) + 1),
		t
	);
}
function SC(e, t, r) {
	for (var n = new oe(e), i = 0, a = []; n.lt(t) && i < 1e5; )
		a.push(n.toNumber()), (n = n.add(r)), i++;
	return a;
}
var AC = Ua(function (e, t, r) {
		var n = +e,
			i = +t;
		return n + r * (i - n);
	}),
	_C = Ua(function (e, t, r) {
		var n = t - +e;
		return (n = n || 1 / 0), (r - e) / n;
	}),
	PC = Ua(function (e, t, r) {
		var n = t - +e;
		return (n = n || 1 / 0), Math.max(0, Math.min(1, (r - e) / n));
	});
const za = {
	rangeStep: SC,
	getDigitCount: OC,
	interpolateNumber: AC,
	uninterpolateNumber: _C,
	uninterpolateTruncation: PC,
};
function yu(e) {
	return EC(e) || TC(e) || nv(e) || $C();
}
function $C() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function TC(e) {
	if (typeof Symbol < 'u' && Symbol.iterator in Object(e))
		return Array.from(e);
}
function EC(e) {
	if (Array.isArray(e)) return mu(e);
}
function Sn(e, t) {
	return CC(e) || MC(e, t) || nv(e, t) || jC();
}
function jC() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function nv(e, t) {
	if (e) {
		if (typeof e == 'string') return mu(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return mu(e, t);
	}
}
function mu(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function MC(e, t) {
	if (!(typeof Symbol > 'u' || !(Symbol.iterator in Object(e)))) {
		var r = [],
			n = !0,
			i = !1,
			a = void 0;
		try {
			for (
				var o = e[Symbol.iterator](), u;
				!(n = (u = o.next()).done) &&
				(r.push(u.value), !(t && r.length === t));
				n = !0
			);
		} catch (s) {
			(i = !0), (a = s);
		} finally {
			try {
				!n && o.return != null && o.return();
			} finally {
				if (i) throw a;
			}
		}
		return r;
	}
}
function CC(e) {
	if (Array.isArray(e)) return e;
}
function iv(e) {
	var t = Sn(e, 2),
		r = t[0],
		n = t[1],
		i = r,
		a = n;
	return r > n && ((i = n), (a = r)), [i, a];
}
function av(e, t, r) {
	if (e.lte(0)) return new oe(0);
	var n = za.getDigitCount(e.toNumber()),
		i = new oe(10).pow(n),
		a = e.div(i),
		o = n !== 1 ? 0.05 : 0.1,
		u = new oe(Math.ceil(a.div(o).toNumber())).add(r).mul(o),
		s = u.mul(i);
	return t ? s : new oe(Math.ceil(s));
}
function kC(e, t, r) {
	var n = 1,
		i = new oe(e);
	if (!i.isint() && r) {
		var a = Math.abs(e);
		a < 1
			? ((n = new oe(10).pow(za.getDigitCount(e) - 1)),
				(i = new oe(Math.floor(i.div(n).toNumber())).mul(n)))
			: a > 1 && (i = new oe(Math.floor(e)));
	} else
		e === 0
			? (i = new oe(Math.floor((t - 1) / 2)))
			: r || (i = new oe(Math.floor(e)));
	var o = Math.floor((t - 1) / 2),
		u = wC(
			xC(function (s) {
				return i.add(new oe(s - o).mul(n)).toNumber();
			}),
			du,
		);
	return u(0, t);
}
function ov(e, t, r, n) {
	var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
	if (!Number.isFinite((t - e) / (r - 1)))
		return { step: new oe(0), tickMin: new oe(0), tickMax: new oe(0) };
	var a = av(new oe(t).sub(e).div(r - 1), n, i),
		o;
	e <= 0 && t >= 0
		? (o = new oe(0))
		: ((o = new oe(e).add(t).div(2)), (o = o.sub(new oe(o).mod(a))));
	var u = Math.ceil(o.sub(e).div(a).toNumber()),
		s = Math.ceil(new oe(t).sub(o).div(a).toNumber()),
		c = u + s + 1;
	return c > r
		? ov(e, t, r, n, i + 1)
		: (c < r &&
				((s = t > 0 ? s + (r - c) : s), (u = t > 0 ? u : u + (r - c))),
			{
				step: a,
				tickMin: o.sub(new oe(u).mul(a)),
				tickMax: o.add(new oe(s).mul(a)),
			});
}
function IC(e) {
	var t = Sn(e, 2),
		r = t[0],
		n = t[1],
		i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
		a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
		o = Math.max(i, 2),
		u = iv([r, n]),
		s = Sn(u, 2),
		c = s[0],
		f = s[1];
	if (c === -1 / 0 || f === 1 / 0) {
		var l =
			f === 1 / 0
				? [c].concat(
						yu(
							du(0, i - 1).map(function () {
								return 1 / 0;
							}),
						),
					)
				: [].concat(
						yu(
							du(0, i - 1).map(function () {
								return -1 / 0;
							}),
						),
						[f],
					);
		return r > n ? vu(l) : l;
	}
	if (c === f) return kC(c, i, a);
	var h = ov(c, f, o, a),
		p = h.step,
		y = h.tickMin,
		v = h.tickMax,
		d = za.rangeStep(y, v.add(new oe(0.1).mul(p)), p);
	return r > n ? vu(d) : d;
}
function NC(e, t) {
	var r = Sn(e, 2),
		n = r[0],
		i = r[1],
		a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
		o = iv([n, i]),
		u = Sn(o, 2),
		s = u[0],
		c = u[1];
	if (s === -1 / 0 || c === 1 / 0) return [n, i];
	if (s === c) return [s];
	var f = Math.max(t, 2),
		l = av(new oe(c).sub(s).div(f - 1), a, 0),
		h = [].concat(
			yu(za.rangeStep(new oe(s), new oe(c).sub(new oe(0.99).mul(l)), l)),
			[c],
		);
	return n > i ? vu(h) : h;
}
var DC = rv(IC),
	BC = rv(NC),
	LC = 'Invariant failed';
function Qt(e, t) {
	throw new Error(LC);
}
var RC = [
	'offset',
	'layout',
	'width',
	'dataKey',
	'data',
	'dataPointFormatter',
	'xAxis',
	'yAxis',
];
function Xi() {
	return (
		(Xi = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		Xi.apply(this, arguments)
	);
}
function FC(e, t) {
	return qC(e) || zC(e, t) || UC(e, t) || WC();
}
function WC() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function UC(e, t) {
	if (e) {
		if (typeof e == 'string') return mf(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return mf(e, t);
	}
}
function mf(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function zC(e, t) {
	var r =
		e == null
			? null
			: (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			s = !0,
			c = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (
					;
					!(s = (n = a.call(r)).done) &&
					(u.push(n.value), u.length !== t);
					s = !0
				);
		} catch (f) {
			(c = !0), (i = f);
		} finally {
			try {
				if (
					!s &&
					r.return != null &&
					((o = r.return()), Object(o) !== o)
				)
					return;
			} finally {
				if (c) throw i;
			}
		}
		return u;
	}
}
function qC(e) {
	if (Array.isArray(e)) return e;
}
function HC(e, t) {
	if (e == null) return {};
	var r = KC(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function KC(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
function qa(e) {
	var t = e.offset,
		r = e.layout,
		n = e.width,
		i = e.dataKey,
		a = e.data,
		o = e.dataPointFormatter,
		u = e.xAxis,
		s = e.yAxis,
		c = HC(e, RC),
		f = J(c, !1);
	e.direction === 'x' && u.type !== 'number' && Qt();
	var l = a.map(function (h) {
		var p = o(h, i),
			y = p.x,
			v = p.y,
			d = p.value,
			w = p.errorVal;
		if (!w) return null;
		var b = [],
			x,
			m;
		if (Array.isArray(w)) {
			var g = FC(w, 2);
			(x = g[0]), (m = g[1]);
		} else x = m = w;
		if (r === 'vertical') {
			var O = u.scale,
				S = v + t,
				A = S + n,
				E = S - n,
				T = O(d - x),
				P = O(d + m);
			b.push({ x1: P, y1: A, x2: P, y2: E }),
				b.push({ x1: T, y1: S, x2: P, y2: S }),
				b.push({ x1: T, y1: A, x2: T, y2: E });
		} else if (r === 'horizontal') {
			var $ = s.scale,
				j = y + t,
				M = j - n,
				B = j + n,
				I = $(d - x),
				L = $(d + m);
			b.push({ x1: M, y1: L, x2: B, y2: L }),
				b.push({ x1: j, y1: I, x2: j, y2: L }),
				b.push({ x1: M, y1: I, x2: B, y2: I });
		}
		return _.createElement(
			pe,
			Xi(
				{
					className: 'recharts-errorBar',
					key: 'bar-'.concat(
						b.map(function (R) {
							return ''
								.concat(R.x1, '-')
								.concat(R.x2, '-')
								.concat(R.y1, '-')
								.concat(R.y2);
						}),
					),
				},
				f,
			),
			b.map(function (R) {
				return _.createElement(
					'line',
					Xi({}, R, {
						key: 'line-'
							.concat(R.x1, '-')
							.concat(R.x2, '-')
							.concat(R.y1, '-')
							.concat(R.y2),
					}),
				);
			}),
		);
	});
	return _.createElement(pe, { className: 'recharts-errorBars' }, l);
}
qa.defaultProps = {
	stroke: 'black',
	strokeWidth: 1.5,
	width: 5,
	offset: 0,
	layout: 'horizontal',
};
qa.displayName = 'ErrorBar';
function An(e) {
	'@babel/helpers - typeof';
	return (
		(An =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		An(e)
	);
}
function gf(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function bo(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? gf(Object(r), !0).forEach(function (n) {
					GC(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: gf(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function GC(e, t, r) {
	return (
		(t = XC(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function XC(e) {
	var t = VC(e, 'string');
	return An(t) == 'symbol' ? t : String(t);
}
function VC(e, t) {
	if (An(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (An(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var uv = function (t) {
	var r = t.children,
		n = t.formattedGraphicalItems,
		i = t.legendWidth,
		a = t.legendContent,
		o = Le(r, ln);
	if (!o) return null;
	var u;
	return (
		o.props && o.props.payload
			? (u = o.props && o.props.payload)
			: a === 'children'
				? (u = (n || []).reduce(function (s, c) {
						var f = c.item,
							l = c.props,
							h = l.sectors || l.data || [];
						return s.concat(
							h.map(function (p) {
								return {
									type:
										o.props.iconType || f.props.legendType,
									value: p.name,
									color: p.fill,
									payload: p,
								};
							}),
						);
					}, []))
				: (u = (n || []).map(function (s) {
						var c = s.item,
							f = c.props,
							l = f.dataKey,
							h = f.name,
							p = f.legendType,
							y = f.hide;
						return {
							inactive: y,
							dataKey: l,
							type: o.props.iconType || p || 'square',
							color: Gs(c),
							value: h || l,
							payload: c.props,
						};
					})),
		bo(
			bo(bo({}, o.props), ln.getWithHeight(o, i)),
			{},
			{ payload: u, item: o },
		)
	);
};
function _n(e) {
	'@babel/helpers - typeof';
	return (
		(_n =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		_n(e)
	);
}
function bf(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Ke(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? bf(Object(r), !0).forEach(function (n) {
					lr(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: bf(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function lr(e, t, r) {
	return (
		(t = YC(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function YC(e) {
	var t = ZC(e, 'string');
	return _n(t) == 'symbol' ? t : String(t);
}
function ZC(e, t) {
	if (_n(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (_n(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
function xf(e) {
	return tk(e) || ek(e) || QC(e) || JC();
}
function JC() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function QC(e, t) {
	if (e) {
		if (typeof e == 'string') return gu(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return gu(e, t);
	}
}
function ek(e) {
	if (
		(typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
		e['@@iterator'] != null
	)
		return Array.from(e);
}
function tk(e) {
	if (Array.isArray(e)) return gu(e);
}
function gu(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function Fe(e, t, r) {
	return ee(e) || ee(t) ? r : be(t) ? Xe(e, t, r) : Z(t) ? t(e) : r;
}
function nn(e, t, r, n) {
	var i = oC(e, function (u) {
		return Fe(u, t);
	});
	if (r === 'number') {
		var a = i.filter(function (u) {
			return F(u) || parseFloat(u);
		});
		return a.length ? [Wa(a), $t(a)] : [1 / 0, -1 / 0];
	}
	var o = n
		? i.filter(function (u) {
				return !ee(u);
			})
		: i;
	return o.map(function (u) {
		return be(u) || u instanceof Date ? u : '';
	});
}
var rk = function (t) {
		var r,
			n =
				arguments.length > 1 && arguments[1] !== void 0
					? arguments[1]
					: [],
			i = arguments.length > 2 ? arguments[2] : void 0,
			a = arguments.length > 3 ? arguments[3] : void 0,
			o = -1,
			u =
				(r = n == null ? void 0 : n.length) !== null && r !== void 0
					? r
					: 0;
		if (u <= 1) return 0;
		if (
			a &&
			a.axisType === 'angleAxis' &&
			Math.abs(Math.abs(a.range[1] - a.range[0]) - 360) <= 1e-6
		)
			for (var s = a.range, c = 0; c < u; c++) {
				var f = c > 0 ? i[c - 1].coordinate : i[u - 1].coordinate,
					l = i[c].coordinate,
					h = c >= u - 1 ? i[0].coordinate : i[c + 1].coordinate,
					p = void 0;
				if (et(l - f) !== et(h - l)) {
					var y = [];
					if (et(h - l) === et(s[1] - s[0])) {
						p = h;
						var v = l + s[1] - s[0];
						(y[0] = Math.min(v, (v + f) / 2)),
							(y[1] = Math.max(v, (v + f) / 2));
					} else {
						p = f;
						var d = h + s[1] - s[0];
						(y[0] = Math.min(l, (d + l) / 2)),
							(y[1] = Math.max(l, (d + l) / 2));
					}
					var w = [
						Math.min(l, (p + l) / 2),
						Math.max(l, (p + l) / 2),
					];
					if ((t > w[0] && t <= w[1]) || (t >= y[0] && t <= y[1])) {
						o = i[c].index;
						break;
					}
				} else {
					var b = Math.min(f, h),
						x = Math.max(f, h);
					if (t > (b + l) / 2 && t <= (x + l) / 2) {
						o = i[c].index;
						break;
					}
				}
			}
		else
			for (var m = 0; m < u; m++)
				if (
					(m === 0 &&
						t <= (n[m].coordinate + n[m + 1].coordinate) / 2) ||
					(m > 0 &&
						m < u - 1 &&
						t > (n[m].coordinate + n[m - 1].coordinate) / 2 &&
						t <= (n[m].coordinate + n[m + 1].coordinate) / 2) ||
					(m === u - 1 &&
						t > (n[m].coordinate + n[m - 1].coordinate) / 2)
				) {
					o = n[m].index;
					break;
				}
		return o;
	},
	Gs = function (t) {
		var r = t,
			n = r.type.displayName,
			i = t.props,
			a = i.stroke,
			o = i.fill,
			u;
		switch (n) {
			case 'Line':
				u = a;
				break;
			case 'Area':
			case 'Radar':
				u = a && a !== 'none' ? a : o;
				break;
			default:
				u = o;
				break;
		}
		return u;
	},
	nk = function (t) {
		var r = t.barSize,
			n = t.totalSize,
			i = t.stackGroups,
			a = i === void 0 ? {} : i;
		if (!a) return {};
		for (var o = {}, u = Object.keys(a), s = 0, c = u.length; s < c; s++)
			for (
				var f = a[u[s]].stackGroups,
					l = Object.keys(f),
					h = 0,
					p = l.length;
				h < p;
				h++
			) {
				var y = f[l[h]],
					v = y.items,
					d = y.cateAxisId,
					w = v.filter(function (g) {
						return vt(g.type).indexOf('Bar') >= 0;
					});
				if (w && w.length) {
					var b = w[0].props.barSize,
						x = w[0].props[d];
					o[x] || (o[x] = []);
					var m = ee(b) ? r : b;
					o[x].push({
						item: w[0],
						stackList: w.slice(1),
						barSize: ee(m) ? void 0 : Zt(m, n, 0),
					});
				}
			}
		return o;
	},
	ik = function (t) {
		var r = t.barGap,
			n = t.barCategoryGap,
			i = t.bandSize,
			a = t.sizeList,
			o = a === void 0 ? [] : a,
			u = t.maxBarSize,
			s = o.length;
		if (s < 1) return null;
		var c = Zt(r, i, 0, !0),
			f,
			l = [];
		if (o[0].barSize === +o[0].barSize) {
			var h = !1,
				p = i / s,
				y = o.reduce(function (m, g) {
					return m + g.barSize || 0;
				}, 0);
			(y += (s - 1) * c),
				y >= i && ((y -= (s - 1) * c), (c = 0)),
				y >= i && p > 0 && ((h = !0), (p *= 0.9), (y = s * p));
			var v = ((i - y) / 2) >> 0,
				d = { offset: v - c, size: 0 };
			f = o.reduce(function (m, g) {
				var O = {
						item: g.item,
						position: {
							offset: d.offset + d.size + c,
							size: h ? p : g.barSize,
						},
					},
					S = [].concat(xf(m), [O]);
				return (
					(d = S[S.length - 1].position),
					g.stackList &&
						g.stackList.length &&
						g.stackList.forEach(function (A) {
							S.push({ item: A, position: d });
						}),
					S
				);
			}, l);
		} else {
			var w = Zt(n, i, 0, !0);
			i - 2 * w - (s - 1) * c <= 0 && (c = 0);
			var b = (i - 2 * w - (s - 1) * c) / s;
			b > 1 && (b >>= 0);
			var x = u === +u ? Math.min(b, u) : b;
			f = o.reduce(function (m, g, O) {
				var S = [].concat(xf(m), [
					{
						item: g.item,
						position: {
							offset: w + (b + c) * O + (b - x) / 2,
							size: x,
						},
					},
				]);
				return (
					g.stackList &&
						g.stackList.length &&
						g.stackList.forEach(function (A) {
							S.push({
								item: A,
								position: S[S.length - 1].position,
							});
						}),
					S
				);
			}, l);
		}
		return f;
	},
	ak = function (t, r, n, i) {
		var a = n.children,
			o = n.width,
			u = n.margin,
			s = o - (u.left || 0) - (u.right || 0),
			c = uv({ children: a, legendWidth: s });
		if (c) {
			var f = i || {},
				l = f.width,
				h = f.height,
				p = c.align,
				y = c.verticalAlign,
				v = c.layout;
			if (
				(v === 'vertical' || (v === 'horizontal' && y === 'middle')) &&
				p !== 'center' &&
				F(t[p])
			)
				return Ke(Ke({}, t), {}, lr({}, p, t[p] + (l || 0)));
			if (
				(v === 'horizontal' || (v === 'vertical' && p === 'center')) &&
				y !== 'middle' &&
				F(t[y])
			)
				return Ke(Ke({}, t), {}, lr({}, y, t[y] + (h || 0)));
		}
		return t;
	},
	ok = function (t, r, n) {
		return ee(r)
			? !0
			: t === 'horizontal'
				? r === 'yAxis'
				: t === 'vertical' || n === 'x'
					? r === 'xAxis'
					: n === 'y'
						? r === 'yAxis'
						: !0;
	},
	sv = function (t, r, n, i, a) {
		var o = r.props.children,
			u = tt(o, qa).filter(function (c) {
				return ok(i, a, c.props.direction);
			});
		if (u && u.length) {
			var s = u.map(function (c) {
				return c.props.dataKey;
			});
			return t.reduce(
				function (c, f) {
					var l = Fe(f, n);
					if (ee(l)) return c;
					var h = Array.isArray(l) ? [Wa(l), $t(l)] : [l, l],
						p = s.reduce(
							function (y, v) {
								var d = Fe(f, v, 0),
									w =
										h[0] -
										Math.abs(Array.isArray(d) ? d[0] : d),
									b =
										h[1] +
										Math.abs(Array.isArray(d) ? d[1] : d);
								return [Math.min(w, y[0]), Math.max(b, y[1])];
							},
							[1 / 0, -1 / 0],
						);
					return [Math.min(p[0], c[0]), Math.max(p[1], c[1])];
				},
				[1 / 0, -1 / 0],
			);
		}
		return null;
	},
	uk = function (t, r, n, i, a) {
		var o = r
			.map(function (u) {
				return sv(t, u, n, a, i);
			})
			.filter(function (u) {
				return !ee(u);
			});
		return o && o.length
			? o.reduce(
					function (u, s) {
						return [Math.min(u[0], s[0]), Math.max(u[1], s[1])];
					},
					[1 / 0, -1 / 0],
				)
			: null;
	},
	cv = function (t, r, n, i, a) {
		var o = r.map(function (s) {
			var c = s.props.dataKey;
			return (n === 'number' && c && sv(t, s, c, i)) || nn(t, c, n, a);
		});
		if (n === 'number')
			return o.reduce(
				function (s, c) {
					return [Math.min(s[0], c[0]), Math.max(s[1], c[1])];
				},
				[1 / 0, -1 / 0],
			);
		var u = {};
		return o.reduce(function (s, c) {
			for (var f = 0, l = c.length; f < l; f++)
				u[c[f]] || ((u[c[f]] = !0), s.push(c[f]));
			return s;
		}, []);
	},
	lv = function (t, r) {
		return (
			(t === 'horizontal' && r === 'xAxis') ||
			(t === 'vertical' && r === 'yAxis') ||
			(t === 'centric' && r === 'angleAxis') ||
			(t === 'radial' && r === 'radiusAxis')
		);
	},
	Kt = function (t, r, n) {
		if (!t) return null;
		var i = t.scale,
			a = t.duplicateDomain,
			o = t.type,
			u = t.range,
			s = t.realScaleType === 'scaleBand' ? i.bandwidth() / 2 : 2,
			c =
				(r || n) && o === 'category' && i.bandwidth
					? i.bandwidth() / s
					: 0;
		if (
			((c =
				t.axisType === 'angleAxis' &&
				(u == null ? void 0 : u.length) >= 2
					? et(u[0] - u[1]) * 2 * c
					: c),
			r && (t.ticks || t.niceTicks))
		) {
			var f = (t.ticks || t.niceTicks).map(function (l) {
				var h = a ? a.indexOf(l) : l;
				return { coordinate: i(h) + c, value: l, offset: c };
			});
			return f.filter(function (l) {
				return !Cr(l.coordinate);
			});
		}
		return t.isCategorical && t.categoricalDomain
			? t.categoricalDomain.map(function (l, h) {
					return {
						coordinate: i(l) + c,
						value: l,
						index: h,
						offset: c,
					};
				})
			: i.ticks && !n
				? i.ticks(t.tickCount).map(function (l) {
						return { coordinate: i(l) + c, value: l, offset: c };
					})
				: i.domain().map(function (l, h) {
						return {
							coordinate: i(l) + c,
							value: a ? a[l] : l,
							index: h,
							offset: c,
						};
					});
	},
	xo = new WeakMap(),
	di = function (t, r) {
		if (typeof r != 'function') return t;
		xo.has(t) || xo.set(t, new WeakMap());
		var n = xo.get(t);
		if (n.has(r)) return n.get(r);
		var i = function () {
			t.apply(void 0, arguments), r.apply(void 0, arguments);
		};
		return n.set(r, i), i;
	},
	sk = function (t, r, n) {
		var i = t.scale,
			a = t.type,
			o = t.layout,
			u = t.axisType;
		if (i === 'auto')
			return o === 'radial' && u === 'radiusAxis'
				? { scale: yn(), realScaleType: 'band' }
				: o === 'radial' && u === 'angleAxis'
					? { scale: zi(), realScaleType: 'linear' }
					: a === 'category' &&
						  r &&
						  (r.indexOf('LineChart') >= 0 ||
								r.indexOf('AreaChart') >= 0 ||
								(r.indexOf('ComposedChart') >= 0 && !n))
						? { scale: rn(), realScaleType: 'point' }
						: a === 'category'
							? { scale: yn(), realScaleType: 'band' }
							: { scale: zi(), realScaleType: 'linear' };
		if (Vn(i)) {
			var s = 'scale'.concat(Ta(i));
			return {
				scale: (pf[s] || rn)(),
				realScaleType: pf[s] ? s : 'point',
			};
		}
		return Z(i) ? { scale: i } : { scale: rn(), realScaleType: 'point' };
	},
	wf = 1e-4,
	ck = function (t) {
		var r = t.domain();
		if (!(!r || r.length <= 2)) {
			var n = r.length,
				i = t.range(),
				a = Math.min(i[0], i[1]) - wf,
				o = Math.max(i[0], i[1]) + wf,
				u = t(r[0]),
				s = t(r[n - 1]);
			(u < a || u > o || s < a || s > o) && t.domain([r[0], r[n - 1]]);
		}
	},
	lk = function (t, r) {
		if (!t) return null;
		for (var n = 0, i = t.length; n < i; n++)
			if (t[n].item === r) return t[n].position;
		return null;
	},
	fk = function (t, r) {
		if (!r || r.length !== 2 || !F(r[0]) || !F(r[1])) return t;
		var n = Math.min(r[0], r[1]),
			i = Math.max(r[0], r[1]),
			a = [t[0], t[1]];
		return (
			(!F(t[0]) || t[0] < n) && (a[0] = n),
			(!F(t[1]) || t[1] > i) && (a[1] = i),
			a[0] > i && (a[0] = i),
			a[1] < n && (a[1] = n),
			a
		);
	},
	hk = function (t) {
		var r = t.length;
		if (!(r <= 0))
			for (var n = 0, i = t[0].length; n < i; ++n)
				for (var a = 0, o = 0, u = 0; u < r; ++u) {
					var s = Cr(t[u][n][1]) ? t[u][n][0] : t[u][n][1];
					s >= 0
						? ((t[u][n][0] = a),
							(t[u][n][1] = a + s),
							(a = t[u][n][1]))
						: ((t[u][n][0] = o),
							(t[u][n][1] = o + s),
							(o = t[u][n][1]));
				}
	},
	pk = function (t) {
		var r = t.length;
		if (!(r <= 0))
			for (var n = 0, i = t[0].length; n < i; ++n)
				for (var a = 0, o = 0; o < r; ++o) {
					var u = Cr(t[o][n][1]) ? t[o][n][0] : t[o][n][1];
					u >= 0
						? ((t[o][n][0] = a),
							(t[o][n][1] = a + u),
							(a = t[o][n][1]))
						: ((t[o][n][0] = 0), (t[o][n][1] = 0));
				}
	},
	dk = {
		sign: hk,
		expand: Bx,
		none: fr,
		silhouette: Lx,
		wiggle: Rx,
		positive: pk,
	},
	vk = function (t, r, n) {
		var i = r.map(function (u) {
				return u.props.dataKey;
			}),
			a = dk[n],
			o = Dx()
				.keys(i)
				.value(function (u, s) {
					return +Fe(u, s, 0);
				})
				.order(zo)
				.offset(a);
		return o(t);
	},
	yk = function (t, r, n, i, a, o) {
		if (!t) return null;
		var u = o ? r.reverse() : r,
			s = {},
			c = u.reduce(function (l, h) {
				var p = h.props,
					y = p.stackId,
					v = p.hide;
				if (v) return l;
				var d = h.props[n],
					w = l[d] || { hasStack: !1, stackGroups: {} };
				if (be(y)) {
					var b = w.stackGroups[y] || {
						numericAxisId: n,
						cateAxisId: i,
						items: [],
					};
					b.items.push(h), (w.hasStack = !0), (w.stackGroups[y] = b);
				} else
					w.stackGroups[Yn('_stackId_')] = {
						numericAxisId: n,
						cateAxisId: i,
						items: [h],
					};
				return Ke(Ke({}, l), {}, lr({}, d, w));
			}, s),
			f = {};
		return Object.keys(c).reduce(function (l, h) {
			var p = c[h];
			if (p.hasStack) {
				var y = {};
				p.stackGroups = Object.keys(p.stackGroups).reduce(function (
					v,
					d,
				) {
					var w = p.stackGroups[d];
					return Ke(
						Ke({}, v),
						{},
						lr({}, d, {
							numericAxisId: n,
							cateAxisId: i,
							items: w.items,
							stackedData: vk(t, w.items, a),
						}),
					);
				}, y);
			}
			return Ke(Ke({}, l), {}, lr({}, h, p));
		}, f);
	},
	mk = function (t, r) {
		var n = r.realScaleType,
			i = r.type,
			a = r.tickCount,
			o = r.originalDomain,
			u = r.allowDecimals,
			s = n || r.scale;
		if (s !== 'auto' && s !== 'linear') return null;
		if (a && i === 'number' && o && (o[0] === 'auto' || o[1] === 'auto')) {
			var c = t.domain();
			if (!c.length) return null;
			var f = DC(c, a, u);
			return t.domain([Wa(f), $t(f)]), { niceTicks: f };
		}
		if (a && i === 'number') {
			var l = t.domain(),
				h = BC(l, a, u);
			return { niceTicks: h };
		}
		return null;
	};
function Of(e) {
	var t = e.axis,
		r = e.ticks,
		n = e.bandSize,
		i = e.entry,
		a = e.index,
		o = e.dataKey;
	if (t.type === 'category') {
		if (!t.allowDuplicatedCategory && t.dataKey && !ee(i[t.dataKey])) {
			var u = xi(r, 'value', i[t.dataKey]);
			if (u) return u.coordinate + n / 2;
		}
		return r[a] ? r[a].coordinate + n / 2 : null;
	}
	var s = Fe(i, ee(o) ? t.dataKey : o);
	return ee(s) ? null : t.scale(s);
}
var Sf = function (t) {
		var r = t.axis,
			n = t.ticks,
			i = t.offset,
			a = t.bandSize,
			o = t.entry,
			u = t.index;
		if (r.type === 'category') return n[u] ? n[u].coordinate + i : null;
		var s = Fe(o, r.dataKey, r.domain[u]);
		return ee(s) ? null : r.scale(s) - a / 2 + i;
	},
	gk = function (t) {
		var r = t.numericAxis,
			n = r.scale.domain();
		if (r.type === 'number') {
			var i = Math.min(n[0], n[1]),
				a = Math.max(n[0], n[1]);
			return i <= 0 && a >= 0 ? 0 : a < 0 ? a : i;
		}
		return n[0];
	},
	bk = function (t, r) {
		var n = t.props.stackId;
		if (be(n)) {
			var i = r[n];
			if (i) {
				var a = i.items.indexOf(t);
				return a >= 0 ? i.stackedData[a] : null;
			}
		}
		return null;
	},
	xk = function (t) {
		return t.reduce(
			function (r, n) {
				return [
					Wa(n.concat([r[0]]).filter(F)),
					$t(n.concat([r[1]]).filter(F)),
				];
			},
			[1 / 0, -1 / 0],
		);
	},
	fv = function (t, r, n) {
		return Object.keys(t)
			.reduce(
				function (i, a) {
					var o = t[a],
						u = o.stackedData,
						s = u.reduce(
							function (c, f) {
								var l = xk(f.slice(r, n + 1));
								return [
									Math.min(c[0], l[0]),
									Math.max(c[1], l[1]),
								];
							},
							[1 / 0, -1 / 0],
						);
					return [Math.min(s[0], i[0]), Math.max(s[1], i[1])];
				},
				[1 / 0, -1 / 0],
			)
			.map(function (i) {
				return i === 1 / 0 || i === -1 / 0 ? 0 : i;
			});
	},
	Af = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
	_f = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
	bu = function (t, r, n) {
		if (Z(t)) return t(r, n);
		if (!Array.isArray(t)) return r;
		var i = [];
		if (F(t[0])) i[0] = n ? t[0] : Math.min(t[0], r[0]);
		else if (Af.test(t[0])) {
			var a = +Af.exec(t[0])[1];
			i[0] = r[0] - a;
		} else Z(t[0]) ? (i[0] = t[0](r[0])) : (i[0] = r[0]);
		if (F(t[1])) i[1] = n ? t[1] : Math.max(t[1], r[1]);
		else if (_f.test(t[1])) {
			var o = +_f.exec(t[1])[1];
			i[1] = r[1] + o;
		} else Z(t[1]) ? (i[1] = t[1](r[1])) : (i[1] = r[1]);
		return i;
	},
	Vi = function (t, r, n) {
		if (t && t.scale && t.scale.bandwidth) {
			var i = t.scale.bandwidth();
			if (!n || i > 0) return i;
		}
		if (t && r && r.length >= 2) {
			for (
				var a = ws(r, function (l) {
						return l.coordinate;
					}),
					o = 1 / 0,
					u = 1,
					s = a.length;
				u < s;
				u++
			) {
				var c = a[u],
					f = a[u - 1];
				o = Math.min((c.coordinate || 0) - (f.coordinate || 0), o);
			}
			return o === 1 / 0 ? 0 : o;
		}
		return n ? void 0 : 0;
	},
	Pf = function (t, r, n) {
		return !t || !t.length || wn(t, Xe(n, 'type.defaultProps.domain'))
			? r
			: t;
	},
	hv = function (t, r) {
		var n = t.props,
			i = n.dataKey,
			a = n.name,
			o = n.unit,
			u = n.formatter,
			s = n.tooltipType,
			c = n.chartType,
			f = n.hide;
		return Ke(
			Ke({}, J(t, !1)),
			{},
			{
				dataKey: i,
				unit: o,
				formatter: u,
				name: a || i,
				color: Gs(t),
				value: Fe(r, i),
				type: s,
				payload: r,
				chartType: c,
				hide: f,
			},
		);
	};
function Pn(e) {
	'@babel/helpers - typeof';
	return (
		(Pn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Pn(e)
	);
}
function $f(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Tf(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? $f(Object(r), !0).forEach(function (n) {
					wk(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: $f(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function wk(e, t, r) {
	return (
		(t = Ok(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function Ok(e) {
	var t = Sk(e, 'string');
	return Pn(t) == 'symbol' ? t : String(t);
}
function Sk(e, t) {
	if (Pn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (Pn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var Yi = Math.PI / 180,
	Ak = function (t) {
		return (t * 180) / Math.PI;
	},
	$e = function (t, r, n, i) {
		return { x: t + Math.cos(-Yi * i) * n, y: r + Math.sin(-Yi * i) * n };
	},
	_k = function (t, r) {
		var n = t.x,
			i = t.y,
			a = r.x,
			o = r.y;
		return Math.sqrt(Math.pow(n - a, 2) + Math.pow(i - o, 2));
	},
	Pk = function (t, r) {
		var n = t.x,
			i = t.y,
			a = r.cx,
			o = r.cy,
			u = _k({ x: n, y: i }, { x: a, y: o });
		if (u <= 0) return { radius: u };
		var s = (n - a) / u,
			c = Math.acos(s);
		return (
			i > o && (c = 2 * Math.PI - c),
			{ radius: u, angle: Ak(c), angleInRadian: c }
		);
	},
	$k = function (t) {
		var r = t.startAngle,
			n = t.endAngle,
			i = Math.floor(r / 360),
			a = Math.floor(n / 360),
			o = Math.min(i, a);
		return { startAngle: r - o * 360, endAngle: n - o * 360 };
	},
	Tk = function (t, r) {
		var n = r.startAngle,
			i = r.endAngle,
			a = Math.floor(n / 360),
			o = Math.floor(i / 360),
			u = Math.min(a, o);
		return t + u * 360;
	},
	Ef = function (t, r) {
		var n = t.x,
			i = t.y,
			a = Pk({ x: n, y: i }, r),
			o = a.radius,
			u = a.angle,
			s = r.innerRadius,
			c = r.outerRadius;
		if (o < s || o > c) return !1;
		if (o === 0) return !0;
		var f = $k(r),
			l = f.startAngle,
			h = f.endAngle,
			p = u,
			y;
		if (l <= h) {
			for (; p > h; ) p -= 360;
			for (; p < l; ) p += 360;
			y = p >= l && p <= h;
		} else {
			for (; p > l; ) p -= 360;
			for (; p < h; ) p += 360;
			y = p >= h && p <= l;
		}
		return y ? Tf(Tf({}, r), {}, { radius: o, angle: Tk(p, r) }) : null;
	};
function $n(e) {
	'@babel/helpers - typeof';
	return (
		($n =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		$n(e)
	);
}
var Ek = ['offset'];
function jk(e) {
	return Ik(e) || kk(e) || Ck(e) || Mk();
}
function Mk() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ck(e, t) {
	if (e) {
		if (typeof e == 'string') return xu(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return xu(e, t);
	}
}
function kk(e) {
	if (
		(typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
		e['@@iterator'] != null
	)
		return Array.from(e);
}
function Ik(e) {
	if (Array.isArray(e)) return xu(e);
}
function xu(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function Nk(e, t) {
	if (e == null) return {};
	var r = Dk(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function Dk(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
function jf(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function ge(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? jf(Object(r), !0).forEach(function (n) {
					Bk(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: jf(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function Bk(e, t, r) {
	return (
		(t = Lk(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function Lk(e) {
	var t = Rk(e, 'string');
	return $n(t) == 'symbol' ? t : String(t);
}
function Rk(e, t) {
	if ($n(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if ($n(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
function Tn() {
	return (
		(Tn = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		Tn.apply(this, arguments)
	);
}
var Fk = function (t) {
		var r = t.value,
			n = t.formatter,
			i = ee(t.children) ? r : t.children;
		return Z(n) ? n(i) : i;
	},
	Wk = function (t, r) {
		var n = et(r - t),
			i = Math.min(Math.abs(r - t), 360);
		return n * i;
	},
	Uk = function (t, r, n) {
		var i = t.position,
			a = t.viewBox,
			o = t.offset,
			u = t.className,
			s = a,
			c = s.cx,
			f = s.cy,
			l = s.innerRadius,
			h = s.outerRadius,
			p = s.startAngle,
			y = s.endAngle,
			v = s.clockWise,
			d = (l + h) / 2,
			w = Wk(p, y),
			b = w >= 0 ? 1 : -1,
			x,
			m;
		i === 'insideStart'
			? ((x = p + b * o), (m = v))
			: i === 'insideEnd'
				? ((x = y - b * o), (m = !v))
				: i === 'end' && ((x = y + b * o), (m = v)),
			(m = w <= 0 ? m : !m);
		var g = $e(c, f, d, x),
			O = $e(c, f, d, x + (m ? 1 : -1) * 359),
			S = 'M'
				.concat(g.x, ',')
				.concat(
					g.y,
					`
    A`,
				)
				.concat(d, ',')
				.concat(d, ',0,1,')
				.concat(
					m ? 0 : 1,
					`,
    `,
				)
				.concat(O.x, ',')
				.concat(O.y),
			A = ee(t.id) ? Yn('recharts-radial-line-') : t.id;
		return _.createElement(
			'text',
			Tn({}, n, {
				dominantBaseline: 'central',
				className: ne('recharts-radial-bar-label', u),
			}),
			_.createElement(
				'defs',
				null,
				_.createElement('path', { id: A, d: S }),
			),
			_.createElement('textPath', { xlinkHref: '#'.concat(A) }, r),
		);
	},
	zk = function (t) {
		var r = t.viewBox,
			n = t.offset,
			i = t.position,
			a = r,
			o = a.cx,
			u = a.cy,
			s = a.innerRadius,
			c = a.outerRadius,
			f = a.startAngle,
			l = a.endAngle,
			h = (f + l) / 2;
		if (i === 'outside') {
			var p = $e(o, u, c + n, h),
				y = p.x,
				v = p.y;
			return {
				x: y,
				y: v,
				textAnchor: y >= o ? 'start' : 'end',
				verticalAnchor: 'middle',
			};
		}
		if (i === 'center')
			return {
				x: o,
				y: u,
				textAnchor: 'middle',
				verticalAnchor: 'middle',
			};
		if (i === 'centerTop')
			return {
				x: o,
				y: u,
				textAnchor: 'middle',
				verticalAnchor: 'start',
			};
		if (i === 'centerBottom')
			return { x: o, y: u, textAnchor: 'middle', verticalAnchor: 'end' };
		var d = (s + c) / 2,
			w = $e(o, u, d, h),
			b = w.x,
			x = w.y;
		return { x: b, y: x, textAnchor: 'middle', verticalAnchor: 'middle' };
	},
	qk = function (t) {
		var r = t.viewBox,
			n = t.parentViewBox,
			i = t.offset,
			a = t.position,
			o = r,
			u = o.x,
			s = o.y,
			c = o.width,
			f = o.height,
			l = f >= 0 ? 1 : -1,
			h = l * i,
			p = l > 0 ? 'end' : 'start',
			y = l > 0 ? 'start' : 'end',
			v = c >= 0 ? 1 : -1,
			d = v * i,
			w = v > 0 ? 'end' : 'start',
			b = v > 0 ? 'start' : 'end';
		if (a === 'top') {
			var x = {
				x: u + c / 2,
				y: s - l * i,
				textAnchor: 'middle',
				verticalAnchor: p,
			};
			return ge(
				ge({}, x),
				n ? { height: Math.max(s - n.y, 0), width: c } : {},
			);
		}
		if (a === 'bottom') {
			var m = {
				x: u + c / 2,
				y: s + f + h,
				textAnchor: 'middle',
				verticalAnchor: y,
			};
			return ge(
				ge({}, m),
				n
					? {
							height: Math.max(n.y + n.height - (s + f), 0),
							width: c,
						}
					: {},
			);
		}
		if (a === 'left') {
			var g = {
				x: u - d,
				y: s + f / 2,
				textAnchor: w,
				verticalAnchor: 'middle',
			};
			return ge(
				ge({}, g),
				n ? { width: Math.max(g.x - n.x, 0), height: f } : {},
			);
		}
		if (a === 'right') {
			var O = {
				x: u + c + d,
				y: s + f / 2,
				textAnchor: b,
				verticalAnchor: 'middle',
			};
			return ge(
				ge({}, O),
				n ? { width: Math.max(n.x + n.width - O.x, 0), height: f } : {},
			);
		}
		var S = n ? { width: c, height: f } : {};
		return a === 'insideLeft'
			? ge(
					{
						x: u + d,
						y: s + f / 2,
						textAnchor: b,
						verticalAnchor: 'middle',
					},
					S,
				)
			: a === 'insideRight'
				? ge(
						{
							x: u + c - d,
							y: s + f / 2,
							textAnchor: w,
							verticalAnchor: 'middle',
						},
						S,
					)
				: a === 'insideTop'
					? ge(
							{
								x: u + c / 2,
								y: s + h,
								textAnchor: 'middle',
								verticalAnchor: y,
							},
							S,
						)
					: a === 'insideBottom'
						? ge(
								{
									x: u + c / 2,
									y: s + f - h,
									textAnchor: 'middle',
									verticalAnchor: p,
								},
								S,
							)
						: a === 'insideTopLeft'
							? ge(
									{
										x: u + d,
										y: s + h,
										textAnchor: b,
										verticalAnchor: y,
									},
									S,
								)
							: a === 'insideTopRight'
								? ge(
										{
											x: u + c - d,
											y: s + h,
											textAnchor: w,
											verticalAnchor: y,
										},
										S,
									)
								: a === 'insideBottomLeft'
									? ge(
											{
												x: u + d,
												y: s + f - h,
												textAnchor: b,
												verticalAnchor: p,
											},
											S,
										)
									: a === 'insideBottomRight'
										? ge(
												{
													x: u + c - d,
													y: s + f - h,
													textAnchor: w,
													verticalAnchor: p,
												},
												S,
											)
										: Tr(a) &&
											  (F(a.x) || zt(a.x)) &&
											  (F(a.y) || zt(a.y))
											? ge(
													{
														x: u + Zt(a.x, c),
														y: s + Zt(a.y, f),
														textAnchor: 'end',
														verticalAnchor: 'end',
													},
													S,
												)
											: ge(
													{
														x: u + c / 2,
														y: s + f / 2,
														textAnchor: 'middle',
														verticalAnchor:
															'middle',
													},
													S,
												);
	},
	Hk = function (t) {
		return 'cx' in t && F(t.cx);
	};
function Ee(e) {
	var t = e.offset,
		r = t === void 0 ? 5 : t,
		n = Nk(e, Ek),
		i = ge({ offset: r }, n),
		a = i.viewBox,
		o = i.position,
		u = i.value,
		s = i.children,
		c = i.content,
		f = i.className,
		l = f === void 0 ? '' : f,
		h = i.textBreakAll;
	if (!a || (ee(u) && ee(s) && !D.isValidElement(c) && !Z(c))) return null;
	if (D.isValidElement(c)) return D.cloneElement(c, i);
	var p;
	if (Z(c)) {
		if (((p = D.createElement(c, i)), D.isValidElement(p))) return p;
	} else p = Fk(i);
	var y = Hk(a),
		v = J(i, !0);
	if (y && (o === 'insideStart' || o === 'insideEnd' || o === 'end'))
		return Uk(i, p, v);
	var d = y ? zk(i) : qk(i);
	return _.createElement(
		Di,
		Tn({ className: ne('recharts-label', l) }, v, d, { breakAll: h }),
		p,
	);
}
Ee.displayName = 'Label';
var pv = function (t) {
		var r = t.cx,
			n = t.cy,
			i = t.angle,
			a = t.startAngle,
			o = t.endAngle,
			u = t.r,
			s = t.radius,
			c = t.innerRadius,
			f = t.outerRadius,
			l = t.x,
			h = t.y,
			p = t.top,
			y = t.left,
			v = t.width,
			d = t.height,
			w = t.clockWise,
			b = t.labelViewBox;
		if (b) return b;
		if (F(v) && F(d)) {
			if (F(l) && F(h)) return { x: l, y: h, width: v, height: d };
			if (F(p) && F(y)) return { x: p, y, width: v, height: d };
		}
		return F(l) && F(h)
			? { x: l, y: h, width: 0, height: 0 }
			: F(r) && F(n)
				? {
						cx: r,
						cy: n,
						startAngle: a || i || 0,
						endAngle: o || i || 0,
						innerRadius: c || 0,
						outerRadius: f || s || u || 0,
						clockWise: w,
					}
				: t.viewBox
					? t.viewBox
					: {};
	},
	Kk = function (t, r) {
		return t
			? t === !0
				? _.createElement(Ee, { key: 'label-implicit', viewBox: r })
				: be(t)
					? _.createElement(Ee, {
							key: 'label-implicit',
							viewBox: r,
							value: t,
						})
					: D.isValidElement(t)
						? t.type === Ee
							? D.cloneElement(t, {
									key: 'label-implicit',
									viewBox: r,
								})
							: _.createElement(Ee, {
									key: 'label-implicit',
									content: t,
									viewBox: r,
								})
						: Z(t)
							? _.createElement(Ee, {
									key: 'label-implicit',
									content: t,
									viewBox: r,
								})
							: Tr(t)
								? _.createElement(
										Ee,
										Tn({ viewBox: r }, t, {
											key: 'label-implicit',
										}),
									)
								: null
			: null;
	},
	Gk = function (t, r) {
		var n =
			arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
		if (!t || (!t.children && n && !t.label)) return null;
		var i = t.children,
			a = pv(t),
			o = tt(i, Ee).map(function (s, c) {
				return D.cloneElement(s, {
					viewBox: r || a,
					key: 'label-'.concat(c),
				});
			});
		if (!n) return o;
		var u = Kk(t.label, r || a);
		return [u].concat(jk(o));
	};
Ee.parseViewBox = pv;
Ee.renderCallByParent = Gk;
function Xk(e) {
	var t = e == null ? 0 : e.length;
	return t ? e[t - 1] : void 0;
}
var Vk = Xk;
const Yk = fe(Vk);
function En(e) {
	'@babel/helpers - typeof';
	return (
		(En =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		En(e)
	);
}
var Zk = ['valueAccessor'],
	Jk = ['data', 'dataKey', 'clockWise', 'id', 'textBreakAll'];
function Qk(e) {
	return n2(e) || r2(e) || t2(e) || e2();
}
function e2() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function t2(e, t) {
	if (e) {
		if (typeof e == 'string') return wu(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return wu(e, t);
	}
}
function r2(e) {
	if (
		(typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
		e['@@iterator'] != null
	)
		return Array.from(e);
}
function n2(e) {
	if (Array.isArray(e)) return wu(e);
}
function wu(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function Zi() {
	return (
		(Zi = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		Zi.apply(this, arguments)
	);
}
function Mf(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Cf(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Mf(Object(r), !0).forEach(function (n) {
					i2(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: Mf(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function i2(e, t, r) {
	return (
		(t = a2(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function a2(e) {
	var t = o2(e, 'string');
	return En(t) == 'symbol' ? t : String(t);
}
function o2(e, t) {
	if (En(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (En(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
function kf(e, t) {
	if (e == null) return {};
	var r = u2(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function u2(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
var s2 = function (t) {
	return Array.isArray(t.value) ? Yk(t.value) : t.value;
};
function jt(e) {
	var t = e.valueAccessor,
		r = t === void 0 ? s2 : t,
		n = kf(e, Zk),
		i = n.data,
		a = n.dataKey,
		o = n.clockWise,
		u = n.id,
		s = n.textBreakAll,
		c = kf(n, Jk);
	return !i || !i.length
		? null
		: _.createElement(
				pe,
				{ className: 'recharts-label-list' },
				i.map(function (f, l) {
					var h = ee(a) ? r(f, l) : Fe(f && f.payload, a),
						p = ee(u) ? {} : { id: ''.concat(u, '-').concat(l) };
					return _.createElement(
						Ee,
						Zi({}, J(f, !0), c, p, {
							parentViewBox: f.parentViewBox,
							value: h,
							textBreakAll: s,
							viewBox: Ee.parseViewBox(
								ee(o) ? f : Cf(Cf({}, f), {}, { clockWise: o }),
							),
							key: 'label-'.concat(l),
							index: l,
						}),
					);
				}),
			);
}
jt.displayName = 'LabelList';
function c2(e, t) {
	return e
		? e === !0
			? _.createElement(jt, { key: 'labelList-implicit', data: t })
			: _.isValidElement(e) || Z(e)
				? _.createElement(jt, {
						key: 'labelList-implicit',
						data: t,
						content: e,
					})
				: Tr(e)
					? _.createElement(
							jt,
							Zi({ data: t }, e, { key: 'labelList-implicit' }),
						)
					: null
		: null;
}
function l2(e, t) {
	var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
	if (!e || (!e.children && r && !e.label)) return null;
	var n = e.children,
		i = tt(n, jt).map(function (o, u) {
			return D.cloneElement(o, { data: t, key: 'labelList-'.concat(u) });
		});
	if (!r) return i;
	var a = c2(e.label, t);
	return [a].concat(Qk(i));
}
jt.renderCallByParent = l2;
function jn(e) {
	'@babel/helpers - typeof';
	return (
		(jn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		jn(e)
	);
}
function Ou() {
	return (
		(Ou = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		Ou.apply(this, arguments)
	);
}
function If(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Nf(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? If(Object(r), !0).forEach(function (n) {
					f2(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: If(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function f2(e, t, r) {
	return (
		(t = h2(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function h2(e) {
	var t = p2(e, 'string');
	return jn(t) == 'symbol' ? t : String(t);
}
function p2(e, t) {
	if (jn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (jn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var d2 = function (t, r) {
		var n = et(r - t),
			i = Math.min(Math.abs(r - t), 359.999);
		return n * i;
	},
	vi = function (t) {
		var r = t.cx,
			n = t.cy,
			i = t.radius,
			a = t.angle,
			o = t.sign,
			u = t.isExternal,
			s = t.cornerRadius,
			c = t.cornerIsExternal,
			f = s * (u ? 1 : -1) + i,
			l = Math.asin(s / f) / Yi,
			h = c ? a : a + o * l,
			p = $e(r, n, f, h),
			y = $e(r, n, i, h),
			v = c ? a - o * l : a,
			d = $e(r, n, f * Math.cos(l * Yi), v);
		return { center: p, circleTangency: y, lineTangency: d, theta: l };
	},
	dv = function (t) {
		var r = t.cx,
			n = t.cy,
			i = t.innerRadius,
			a = t.outerRadius,
			o = t.startAngle,
			u = t.endAngle,
			s = d2(o, u),
			c = o + s,
			f = $e(r, n, a, o),
			l = $e(r, n, a, c),
			h = 'M '
				.concat(f.x, ',')
				.concat(
					f.y,
					`
    A `,
				)
				.concat(a, ',')
				.concat(
					a,
					`,0,
    `,
				)
				.concat(+(Math.abs(s) > 180), ',')
				.concat(
					+(o > c),
					`,
    `,
				)
				.concat(l.x, ',')
				.concat(
					l.y,
					`
  `,
				);
		if (i > 0) {
			var p = $e(r, n, i, o),
				y = $e(r, n, i, c);
			h += 'L '
				.concat(y.x, ',')
				.concat(
					y.y,
					`
            A `,
				)
				.concat(i, ',')
				.concat(
					i,
					`,0,
            `,
				)
				.concat(+(Math.abs(s) > 180), ',')
				.concat(
					+(o <= c),
					`,
            `,
				)
				.concat(p.x, ',')
				.concat(p.y, ' Z');
		} else h += 'L '.concat(r, ',').concat(n, ' Z');
		return h;
	},
	v2 = function (t) {
		var r = t.cx,
			n = t.cy,
			i = t.innerRadius,
			a = t.outerRadius,
			o = t.cornerRadius,
			u = t.forceCornerRadius,
			s = t.cornerIsExternal,
			c = t.startAngle,
			f = t.endAngle,
			l = et(f - c),
			h = vi({
				cx: r,
				cy: n,
				radius: a,
				angle: c,
				sign: l,
				cornerRadius: o,
				cornerIsExternal: s,
			}),
			p = h.circleTangency,
			y = h.lineTangency,
			v = h.theta,
			d = vi({
				cx: r,
				cy: n,
				radius: a,
				angle: f,
				sign: -l,
				cornerRadius: o,
				cornerIsExternal: s,
			}),
			w = d.circleTangency,
			b = d.lineTangency,
			x = d.theta,
			m = s ? Math.abs(c - f) : Math.abs(c - f) - v - x;
		if (m < 0)
			return u
				? 'M '
						.concat(y.x, ',')
						.concat(
							y.y,
							`
        a`,
						)
						.concat(o, ',')
						.concat(o, ',0,0,1,')
						.concat(
							o * 2,
							`,0
        a`,
						)
						.concat(o, ',')
						.concat(o, ',0,0,1,')
						.concat(
							-o * 2,
							`,0
      `,
						)
				: dv({
						cx: r,
						cy: n,
						innerRadius: i,
						outerRadius: a,
						startAngle: c,
						endAngle: f,
					});
		var g = 'M '
			.concat(y.x, ',')
			.concat(
				y.y,
				`
    A`,
			)
			.concat(o, ',')
			.concat(o, ',0,0,')
			.concat(+(l < 0), ',')
			.concat(p.x, ',')
			.concat(
				p.y,
				`
    A`,
			)
			.concat(a, ',')
			.concat(a, ',0,')
			.concat(+(m > 180), ',')
			.concat(+(l < 0), ',')
			.concat(w.x, ',')
			.concat(
				w.y,
				`
    A`,
			)
			.concat(o, ',')
			.concat(o, ',0,0,')
			.concat(+(l < 0), ',')
			.concat(b.x, ',')
			.concat(
				b.y,
				`
  `,
			);
		if (i > 0) {
			var O = vi({
					cx: r,
					cy: n,
					radius: i,
					angle: c,
					sign: l,
					isExternal: !0,
					cornerRadius: o,
					cornerIsExternal: s,
				}),
				S = O.circleTangency,
				A = O.lineTangency,
				E = O.theta,
				T = vi({
					cx: r,
					cy: n,
					radius: i,
					angle: f,
					sign: -l,
					isExternal: !0,
					cornerRadius: o,
					cornerIsExternal: s,
				}),
				P = T.circleTangency,
				$ = T.lineTangency,
				j = T.theta,
				M = s ? Math.abs(c - f) : Math.abs(c - f) - E - j;
			if (M < 0 && o === 0)
				return ''.concat(g, 'L').concat(r, ',').concat(n, 'Z');
			g += 'L'
				.concat($.x, ',')
				.concat(
					$.y,
					`
      A`,
				)
				.concat(o, ',')
				.concat(o, ',0,0,')
				.concat(+(l < 0), ',')
				.concat(P.x, ',')
				.concat(
					P.y,
					`
      A`,
				)
				.concat(i, ',')
				.concat(i, ',0,')
				.concat(+(M > 180), ',')
				.concat(+(l > 0), ',')
				.concat(S.x, ',')
				.concat(
					S.y,
					`
      A`,
				)
				.concat(o, ',')
				.concat(o, ',0,0,')
				.concat(+(l < 0), ',')
				.concat(A.x, ',')
				.concat(A.y, 'Z');
		} else g += 'L'.concat(r, ',').concat(n, 'Z');
		return g;
	},
	y2 = {
		cx: 0,
		cy: 0,
		innerRadius: 0,
		outerRadius: 0,
		startAngle: 0,
		endAngle: 0,
		cornerRadius: 0,
		forceCornerRadius: !1,
		cornerIsExternal: !1,
	},
	vv = function (t) {
		var r = Nf(Nf({}, y2), t),
			n = r.cx,
			i = r.cy,
			a = r.innerRadius,
			o = r.outerRadius,
			u = r.cornerRadius,
			s = r.forceCornerRadius,
			c = r.cornerIsExternal,
			f = r.startAngle,
			l = r.endAngle,
			h = r.className;
		if (o < a || f === l) return null;
		var p = ne('recharts-sector', h),
			y = o - a,
			v = Zt(u, y, 0, !0),
			d;
		return (
			v > 0 && Math.abs(f - l) < 360
				? (d = v2({
						cx: n,
						cy: i,
						innerRadius: a,
						outerRadius: o,
						cornerRadius: Math.min(v, y / 2),
						forceCornerRadius: s,
						cornerIsExternal: c,
						startAngle: f,
						endAngle: l,
					}))
				: (d = dv({
						cx: n,
						cy: i,
						innerRadius: a,
						outerRadius: o,
						startAngle: f,
						endAngle: l,
					})),
			_.createElement(
				'path',
				Ou({}, J(r, !0), { className: p, d, role: 'img' }),
			)
		);
	};
function Mn(e) {
	'@babel/helpers - typeof';
	return (
		(Mn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Mn(e)
	);
}
function Su() {
	return (
		(Su = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		Su.apply(this, arguments)
	);
}
function Df(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Bf(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Df(Object(r), !0).forEach(function (n) {
					m2(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: Df(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function m2(e, t, r) {
	return (
		(t = g2(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function g2(e) {
	var t = b2(e, 'string');
	return Mn(t) == 'symbol' ? t : String(t);
}
function b2(e, t) {
	if (Mn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (Mn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var Lf = {
		curveBasisClosed: _x,
		curveBasisOpen: Px,
		curveBasis: Ax,
		curveBumpX: lx,
		curveBumpY: fx,
		curveLinearClosed: $x,
		curveLinear: ja,
		curveMonotoneX: Tx,
		curveMonotoneY: Ex,
		curveNatural: jx,
		curveStep: Mx,
		curveStepAfter: kx,
		curveStepBefore: Cx,
	},
	yi = function (t) {
		return t.x === +t.x && t.y === +t.y;
	},
	Xr = function (t) {
		return t.x;
	},
	Vr = function (t) {
		return t.y;
	},
	x2 = function (t, r) {
		if (Z(t)) return t;
		var n = 'curve'.concat(Ta(t));
		return (n === 'curveMonotone' || n === 'curveBump') && r
			? Lf[''.concat(n).concat(r === 'vertical' ? 'Y' : 'X')]
			: Lf[n] || ja;
	},
	w2 = function (t) {
		var r = t.type,
			n = r === void 0 ? 'linear' : r,
			i = t.points,
			a = i === void 0 ? [] : i,
			o = t.baseLine,
			u = t.layout,
			s = t.connectNulls,
			c = s === void 0 ? !1 : s,
			f = x2(n, u),
			l = c
				? a.filter(function (v) {
						return yi(v);
					})
				: a,
			h;
		if (Array.isArray(o)) {
			var p = c
					? o.filter(function (v) {
							return yi(v);
						})
					: o,
				y = l.map(function (v, d) {
					return Bf(Bf({}, v), {}, { base: p[d] });
				});
			return (
				u === 'vertical'
					? (h = oi()
							.y(Vr)
							.x1(Xr)
							.x0(function (v) {
								return v.base.x;
							}))
					: (h = oi()
							.x(Xr)
							.y1(Vr)
							.y0(function (v) {
								return v.base.y;
							})),
				h.defined(yi).curve(f),
				h(y)
			);
		}
		return (
			u === 'vertical' && F(o)
				? (h = oi().y(Vr).x1(Xr).x0(o))
				: F(o)
					? (h = oi().x(Xr).y1(Vr).y0(o))
					: (h = bp().x(Xr).y(Vr)),
			h.defined(yi).curve(f),
			h(l)
		);
	},
	an = function (t) {
		var r = t.className,
			n = t.points,
			i = t.path,
			a = t.pathRef;
		if ((!n || !n.length) && !i) return null;
		var o = n && n.length ? w2(t) : i;
		return _.createElement(
			'path',
			Su({}, J(t, !1), wi(t), {
				className: ne('recharts-curve', r),
				d: o,
				ref: a,
			}),
		);
	},
	yv = { exports: {} },
	O2 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED',
	S2 = O2,
	A2 = S2;
function mv() {}
function gv() {}
gv.resetWarningCache = mv;
var _2 = function () {
	function e(n, i, a, o, u, s) {
		if (s !== A2) {
			var c = new Error(
				'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
			);
			throw ((c.name = 'Invariant Violation'), c);
		}
	}
	e.isRequired = e;
	function t() {
		return e;
	}
	var r = {
		array: e,
		bigint: e,
		bool: e,
		func: e,
		number: e,
		object: e,
		string: e,
		symbol: e,
		any: e,
		arrayOf: t,
		element: e,
		elementType: e,
		instanceOf: t,
		node: e,
		objectOf: t,
		oneOf: t,
		oneOfType: t,
		shape: t,
		exact: t,
		checkPropTypes: gv,
		resetWarningCache: mv,
	};
	return (r.PropTypes = r), r;
};
yv.exports = _2();
var P2 = yv.exports;
const X = fe(P2);
var $2 = Object.getOwnPropertyNames,
	T2 = Object.getOwnPropertySymbols,
	E2 = Object.prototype.hasOwnProperty;
function Rf(e, t) {
	return function (n, i, a) {
		return e(n, i, a) && t(n, i, a);
	};
}
function mi(e) {
	return function (r, n, i) {
		if (!r || !n || typeof r != 'object' || typeof n != 'object')
			return e(r, n, i);
		var a = i.cache,
			o = a.get(r),
			u = a.get(n);
		if (o && u) return o === n && u === r;
		a.set(r, n), a.set(n, r);
		var s = e(r, n, i);
		return a.delete(r), a.delete(n), s;
	};
}
function Ff(e) {
	return $2(e).concat(T2(e));
}
var bv =
	Object.hasOwn ||
	function (e, t) {
		return E2.call(e, t);
	};
function Fr(e, t) {
	return e || t ? e === t : e === t || (e !== e && t !== t);
}
var xv = '_owner',
	Wf = Object.getOwnPropertyDescriptor,
	Uf = Object.keys;
function j2(e, t, r) {
	var n = e.length;
	if (t.length !== n) return !1;
	for (; n-- > 0; ) if (!r.equals(e[n], t[n], n, n, e, t, r)) return !1;
	return !0;
}
function M2(e, t) {
	return Fr(e.getTime(), t.getTime());
}
function zf(e, t, r) {
	if (e.size !== t.size) return !1;
	for (
		var n = {}, i = e.entries(), a = 0, o, u;
		(o = i.next()) && !o.done;

	) {
		for (var s = t.entries(), c = !1, f = 0; (u = s.next()) && !u.done; ) {
			var l = o.value,
				h = l[0],
				p = l[1],
				y = u.value,
				v = y[0],
				d = y[1];
			!c &&
				!n[f] &&
				(c =
					r.equals(h, v, a, f, e, t, r) &&
					r.equals(p, d, h, v, e, t, r)) &&
				(n[f] = !0),
				f++;
		}
		if (!c) return !1;
		a++;
	}
	return !0;
}
function C2(e, t, r) {
	var n = Uf(e),
		i = n.length;
	if (Uf(t).length !== i) return !1;
	for (var a; i-- > 0; )
		if (
			((a = n[i]),
			(a === xv &&
				(e.$$typeof || t.$$typeof) &&
				e.$$typeof !== t.$$typeof) ||
				!bv(t, a) ||
				!r.equals(e[a], t[a], a, a, e, t, r))
		)
			return !1;
	return !0;
}
function Yr(e, t, r) {
	var n = Ff(e),
		i = n.length;
	if (Ff(t).length !== i) return !1;
	for (var a, o, u; i-- > 0; )
		if (
			((a = n[i]),
			(a === xv &&
				(e.$$typeof || t.$$typeof) &&
				e.$$typeof !== t.$$typeof) ||
				!bv(t, a) ||
				!r.equals(e[a], t[a], a, a, e, t, r) ||
				((o = Wf(e, a)),
				(u = Wf(t, a)),
				(o || u) &&
					(!o ||
						!u ||
						o.configurable !== u.configurable ||
						o.enumerable !== u.enumerable ||
						o.writable !== u.writable)))
		)
			return !1;
	return !0;
}
function k2(e, t) {
	return Fr(e.valueOf(), t.valueOf());
}
function I2(e, t) {
	return e.source === t.source && e.flags === t.flags;
}
function qf(e, t, r) {
	if (e.size !== t.size) return !1;
	for (var n = {}, i = e.values(), a, o; (a = i.next()) && !a.done; ) {
		for (var u = t.values(), s = !1, c = 0; (o = u.next()) && !o.done; )
			!s &&
				!n[c] &&
				(s = r.equals(a.value, o.value, a.value, o.value, e, t, r)) &&
				(n[c] = !0),
				c++;
		if (!s) return !1;
	}
	return !0;
}
function N2(e, t) {
	var r = e.length;
	if (t.length !== r) return !1;
	for (; r-- > 0; ) if (e[r] !== t[r]) return !1;
	return !0;
}
var D2 = '[object Arguments]',
	B2 = '[object Boolean]',
	L2 = '[object Date]',
	R2 = '[object Map]',
	F2 = '[object Number]',
	W2 = '[object Object]',
	U2 = '[object RegExp]',
	z2 = '[object Set]',
	q2 = '[object String]',
	H2 = Array.isArray,
	Hf =
		typeof ArrayBuffer == 'function' && ArrayBuffer.isView
			? ArrayBuffer.isView
			: null,
	Kf = Object.assign,
	K2 = Object.prototype.toString.call.bind(Object.prototype.toString);
function G2(e) {
	var t = e.areArraysEqual,
		r = e.areDatesEqual,
		n = e.areMapsEqual,
		i = e.areObjectsEqual,
		a = e.arePrimitiveWrappersEqual,
		o = e.areRegExpsEqual,
		u = e.areSetsEqual,
		s = e.areTypedArraysEqual;
	return function (f, l, h) {
		if (f === l) return !0;
		if (
			f == null ||
			l == null ||
			typeof f != 'object' ||
			typeof l != 'object'
		)
			return f !== f && l !== l;
		var p = f.constructor;
		if (p !== l.constructor) return !1;
		if (p === Object) return i(f, l, h);
		if (H2(f)) return t(f, l, h);
		if (Hf != null && Hf(f)) return s(f, l, h);
		if (p === Date) return r(f, l, h);
		if (p === RegExp) return o(f, l, h);
		if (p === Map) return n(f, l, h);
		if (p === Set) return u(f, l, h);
		var y = K2(f);
		return y === L2
			? r(f, l, h)
			: y === U2
				? o(f, l, h)
				: y === R2
					? n(f, l, h)
					: y === z2
						? u(f, l, h)
						: y === W2
							? typeof f.then != 'function' &&
								typeof l.then != 'function' &&
								i(f, l, h)
							: y === D2
								? i(f, l, h)
								: y === B2 || y === F2 || y === q2
									? a(f, l, h)
									: !1;
	};
}
function X2(e) {
	var t = e.circular,
		r = e.createCustomConfig,
		n = e.strict,
		i = {
			areArraysEqual: n ? Yr : j2,
			areDatesEqual: M2,
			areMapsEqual: n ? Rf(zf, Yr) : zf,
			areObjectsEqual: n ? Yr : C2,
			arePrimitiveWrappersEqual: k2,
			areRegExpsEqual: I2,
			areSetsEqual: n ? Rf(qf, Yr) : qf,
			areTypedArraysEqual: n ? Yr : N2,
		};
	if ((r && (i = Kf({}, i, r(i))), t)) {
		var a = mi(i.areArraysEqual),
			o = mi(i.areMapsEqual),
			u = mi(i.areObjectsEqual),
			s = mi(i.areSetsEqual);
		i = Kf({}, i, {
			areArraysEqual: a,
			areMapsEqual: o,
			areObjectsEqual: u,
			areSetsEqual: s,
		});
	}
	return i;
}
function V2(e) {
	return function (t, r, n, i, a, o, u) {
		return e(t, r, u);
	};
}
function Y2(e) {
	var t = e.circular,
		r = e.comparator,
		n = e.createState,
		i = e.equals,
		a = e.strict;
	if (n)
		return function (s, c) {
			var f = n(),
				l = f.cache,
				h = l === void 0 ? (t ? new WeakMap() : void 0) : l,
				p = f.meta;
			return r(s, c, { cache: h, equals: i, meta: p, strict: a });
		};
	if (t)
		return function (s, c) {
			return r(s, c, {
				cache: new WeakMap(),
				equals: i,
				meta: void 0,
				strict: a,
			});
		};
	var o = { cache: void 0, equals: i, meta: void 0, strict: a };
	return function (s, c) {
		return r(s, c, o);
	};
}
var Z2 = It();
It({ strict: !0 });
It({ circular: !0 });
It({ circular: !0, strict: !0 });
It({
	createInternalComparator: function () {
		return Fr;
	},
});
It({
	strict: !0,
	createInternalComparator: function () {
		return Fr;
	},
});
It({
	circular: !0,
	createInternalComparator: function () {
		return Fr;
	},
});
It({
	circular: !0,
	createInternalComparator: function () {
		return Fr;
	},
	strict: !0,
});
function It(e) {
	e === void 0 && (e = {});
	var t = e.circular,
		r = t === void 0 ? !1 : t,
		n = e.createInternalComparator,
		i = e.createState,
		a = e.strict,
		o = a === void 0 ? !1 : a,
		u = X2(e),
		s = G2(u),
		c = n ? n(s) : V2(s);
	return Y2({
		circular: r,
		comparator: s,
		createState: i,
		equals: c,
		strict: o,
	});
}
function J2(e) {
	typeof requestAnimationFrame < 'u' && requestAnimationFrame(e);
}
function Gf(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
		r = -1,
		n = function i(a) {
			r < 0 && (r = a), a - r > t ? (e(a), (r = -1)) : J2(i);
		};
	requestAnimationFrame(n);
}
function Au(e) {
	'@babel/helpers - typeof';
	return (
		(Au =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Au(e)
	);
}
function Q2(e) {
	return nI(e) || rI(e) || tI(e) || eI();
}
function eI() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function tI(e, t) {
	if (e) {
		if (typeof e == 'string') return Xf(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return Xf(e, t);
	}
}
function Xf(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function rI(e) {
	if (
		(typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
		e['@@iterator'] != null
	)
		return Array.from(e);
}
function nI(e) {
	if (Array.isArray(e)) return e;
}
function iI() {
	var e = {},
		t = function () {
			return null;
		},
		r = !1,
		n = function i(a) {
			if (!r) {
				if (Array.isArray(a)) {
					if (!a.length) return;
					var o = a,
						u = Q2(o),
						s = u[0],
						c = u.slice(1);
					if (typeof s == 'number') {
						Gf(i.bind(null, c), s);
						return;
					}
					i(s), Gf(i.bind(null, c));
					return;
				}
				Au(a) === 'object' && ((e = a), t(e)),
					typeof a == 'function' && a();
			}
		};
	return {
		stop: function () {
			r = !0;
		},
		start: function (a) {
			(r = !1), n(a);
		},
		subscribe: function (a) {
			return (
				(t = a),
				function () {
					t = function () {
						return null;
					};
				}
			);
		},
	};
}
function Cn(e) {
	'@babel/helpers - typeof';
	return (
		(Cn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Cn(e)
	);
}
function Vf(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Yf(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Vf(Object(r), !0).forEach(function (n) {
					wv(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: Vf(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function wv(e, t, r) {
	return (
		(t = aI(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function aI(e) {
	var t = oI(e, 'string');
	return Cn(t) === 'symbol' ? t : String(t);
}
function oI(e, t) {
	if (Cn(e) !== 'object' || e === null) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (Cn(n) !== 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var uI = function (t, r) {
		return [Object.keys(t), Object.keys(r)].reduce(function (n, i) {
			return n.filter(function (a) {
				return i.includes(a);
			});
		});
	},
	sI = function (t) {
		return t;
	},
	cI = function (t) {
		return t.replace(/([A-Z])/g, function (r) {
			return '-'.concat(r.toLowerCase());
		});
	},
	on = function (t, r) {
		return Object.keys(r).reduce(function (n, i) {
			return Yf(Yf({}, n), {}, wv({}, i, t(i, r[i])));
		}, {});
	},
	Zf = function (t, r, n) {
		return t
			.map(function (i) {
				return ''.concat(cI(i), ' ').concat(r, 'ms ').concat(n);
			})
			.join(',');
	};
function lI(e, t) {
	return pI(e) || hI(e, t) || Ov(e, t) || fI();
}
function fI() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function hI(e, t) {
	var r =
		e == null
			? null
			: (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			s = !0,
			c = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (
					;
					!(s = (n = a.call(r)).done) &&
					(u.push(n.value), u.length !== t);
					s = !0
				);
		} catch (f) {
			(c = !0), (i = f);
		} finally {
			try {
				if (
					!s &&
					r.return != null &&
					((o = r.return()), Object(o) !== o)
				)
					return;
			} finally {
				if (c) throw i;
			}
		}
		return u;
	}
}
function pI(e) {
	if (Array.isArray(e)) return e;
}
function dI(e) {
	return mI(e) || yI(e) || Ov(e) || vI();
}
function vI() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ov(e, t) {
	if (e) {
		if (typeof e == 'string') return _u(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return _u(e, t);
	}
}
function yI(e) {
	if (
		(typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
		e['@@iterator'] != null
	)
		return Array.from(e);
}
function mI(e) {
	if (Array.isArray(e)) return _u(e);
}
function _u(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
var Ji = 1e-4,
	Sv = function (t, r) {
		return [0, 3 * t, 3 * r - 6 * t, 3 * t - 3 * r + 1];
	},
	Av = function (t, r) {
		return t
			.map(function (n, i) {
				return n * Math.pow(r, i);
			})
			.reduce(function (n, i) {
				return n + i;
			});
	},
	Jf = function (t, r) {
		return function (n) {
			var i = Sv(t, r);
			return Av(i, n);
		};
	},
	gI = function (t, r) {
		return function (n) {
			var i = Sv(t, r),
				a = [].concat(
					dI(
						i
							.map(function (o, u) {
								return o * u;
							})
							.slice(1),
					),
					[0],
				);
			return Av(a, n);
		};
	},
	Qf = function () {
		for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
			r[n] = arguments[n];
		var i = r[0],
			a = r[1],
			o = r[2],
			u = r[3];
		if (r.length === 1)
			switch (r[0]) {
				case 'linear':
					(i = 0), (a = 0), (o = 1), (u = 1);
					break;
				case 'ease':
					(i = 0.25), (a = 0.1), (o = 0.25), (u = 1);
					break;
				case 'ease-in':
					(i = 0.42), (a = 0), (o = 1), (u = 1);
					break;
				case 'ease-out':
					(i = 0.42), (a = 0), (o = 0.58), (u = 1);
					break;
				case 'ease-in-out':
					(i = 0), (a = 0), (o = 0.58), (u = 1);
					break;
				default: {
					var s = r[0].split('(');
					if (
						s[0] === 'cubic-bezier' &&
						s[1].split(')')[0].split(',').length === 4
					) {
						var c = s[1]
								.split(')')[0]
								.split(',')
								.map(function (d) {
									return parseFloat(d);
								}),
							f = lI(c, 4);
						(i = f[0]), (a = f[1]), (o = f[2]), (u = f[3]);
					}
				}
			}
		var l = Jf(i, o),
			h = Jf(a, u),
			p = gI(i, o),
			y = function (w) {
				return w > 1 ? 1 : w < 0 ? 0 : w;
			},
			v = function (w) {
				for (var b = w > 1 ? 1 : w, x = b, m = 0; m < 8; ++m) {
					var g = l(x) - b,
						O = p(x);
					if (Math.abs(g - b) < Ji || O < Ji) return h(x);
					x = y(x - g / O);
				}
				return h(x);
			};
		return (v.isStepper = !1), v;
	},
	bI = function () {
		var t =
				arguments.length > 0 && arguments[0] !== void 0
					? arguments[0]
					: {},
			r = t.stiff,
			n = r === void 0 ? 100 : r,
			i = t.damping,
			a = i === void 0 ? 8 : i,
			o = t.dt,
			u = o === void 0 ? 17 : o,
			s = function (f, l, h) {
				var p = -(f - l) * n,
					y = h * a,
					v = h + ((p - y) * u) / 1e3,
					d = (h * u) / 1e3 + f;
				return Math.abs(d - l) < Ji && Math.abs(v) < Ji
					? [l, 0]
					: [d, v];
			};
		return (s.isStepper = !0), (s.dt = u), s;
	},
	xI = function () {
		for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
			r[n] = arguments[n];
		var i = r[0];
		if (typeof i == 'string')
			switch (i) {
				case 'ease':
				case 'ease-in-out':
				case 'ease-out':
				case 'ease-in':
				case 'linear':
					return Qf(i);
				case 'spring':
					return bI();
				default:
					if (i.split('(')[0] === 'cubic-bezier') return Qf(i);
			}
		return typeof i == 'function' ? i : null;
	};
function kn(e) {
	'@babel/helpers - typeof';
	return (
		(kn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		kn(e)
	);
}
function eh(e) {
	return SI(e) || OI(e) || _v(e) || wI();
}
function wI() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function OI(e) {
	if (
		(typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
		e['@@iterator'] != null
	)
		return Array.from(e);
}
function SI(e) {
	if (Array.isArray(e)) return $u(e);
}
function th(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Pe(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? th(Object(r), !0).forEach(function (n) {
					Pu(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: th(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function Pu(e, t, r) {
	return (
		(t = AI(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function AI(e) {
	var t = _I(e, 'string');
	return kn(t) === 'symbol' ? t : String(t);
}
function _I(e, t) {
	if (kn(e) !== 'object' || e === null) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (kn(n) !== 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
function PI(e, t) {
	return EI(e) || TI(e, t) || _v(e, t) || $I();
}
function $I() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _v(e, t) {
	if (e) {
		if (typeof e == 'string') return $u(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return $u(e, t);
	}
}
function $u(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function TI(e, t) {
	var r =
		e == null
			? null
			: (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			s = !0,
			c = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (
					;
					!(s = (n = a.call(r)).done) &&
					(u.push(n.value), u.length !== t);
					s = !0
				);
		} catch (f) {
			(c = !0), (i = f);
		} finally {
			try {
				if (
					!s &&
					r.return != null &&
					((o = r.return()), Object(o) !== o)
				)
					return;
			} finally {
				if (c) throw i;
			}
		}
		return u;
	}
}
function EI(e) {
	if (Array.isArray(e)) return e;
}
var Qi = function (t, r, n) {
		return t + (r - t) * n;
	},
	Tu = function (t) {
		var r = t.from,
			n = t.to;
		return r !== n;
	},
	jI = function e(t, r, n) {
		var i = on(function (a, o) {
			if (Tu(o)) {
				var u = t(o.from, o.to, o.velocity),
					s = PI(u, 2),
					c = s[0],
					f = s[1];
				return Pe(Pe({}, o), {}, { from: c, velocity: f });
			}
			return o;
		}, r);
		return n < 1
			? on(function (a, o) {
					return Tu(o)
						? Pe(
								Pe({}, o),
								{},
								{
									velocity: Qi(o.velocity, i[a].velocity, n),
									from: Qi(o.from, i[a].from, n),
								},
							)
						: o;
				}, r)
			: e(t, i, n - 1);
	};
const MI = function (e, t, r, n, i) {
	var a = uI(e, t),
		o = a.reduce(function (d, w) {
			return Pe(Pe({}, d), {}, Pu({}, w, [e[w], t[w]]));
		}, {}),
		u = a.reduce(function (d, w) {
			return Pe(
				Pe({}, d),
				{},
				Pu({}, w, { from: e[w], velocity: 0, to: t[w] }),
			);
		}, {}),
		s = -1,
		c,
		f,
		l = function () {
			return null;
		},
		h = function () {
			return on(function (w, b) {
				return b.from;
			}, u);
		},
		p = function () {
			return !Object.values(u).filter(Tu).length;
		},
		y = function (w) {
			c || (c = w);
			var b = w - c,
				x = b / r.dt;
			(u = jI(r, u, x)),
				i(Pe(Pe(Pe({}, e), t), h())),
				(c = w),
				p() || (s = requestAnimationFrame(l));
		},
		v = function (w) {
			f || (f = w);
			var b = (w - f) / n,
				x = on(function (g, O) {
					return Qi.apply(void 0, eh(O).concat([r(b)]));
				}, o);
			if ((i(Pe(Pe(Pe({}, e), t), x)), b < 1))
				s = requestAnimationFrame(l);
			else {
				var m = on(function (g, O) {
					return Qi.apply(void 0, eh(O).concat([r(1)]));
				}, o);
				i(Pe(Pe(Pe({}, e), t), m));
			}
		};
	return (
		(l = r.isStepper ? y : v),
		function () {
			return (
				requestAnimationFrame(l),
				function () {
					cancelAnimationFrame(s);
				}
			);
		}
	);
};
function br(e) {
	'@babel/helpers - typeof';
	return (
		(br =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		br(e)
	);
}
var CI = [
	'children',
	'begin',
	'duration',
	'attributeName',
	'easing',
	'isActive',
	'steps',
	'from',
	'to',
	'canBegin',
	'onAnimationEnd',
	'shouldReAnimate',
	'onAnimationReStart',
];
function kI(e, t) {
	if (e == null) return {};
	var r = II(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function II(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
function wo(e) {
	return LI(e) || BI(e) || DI(e) || NI();
}
function NI() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function DI(e, t) {
	if (e) {
		if (typeof e == 'string') return Eu(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return Eu(e, t);
	}
}
function BI(e) {
	if (
		(typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
		e['@@iterator'] != null
	)
		return Array.from(e);
}
function LI(e) {
	if (Array.isArray(e)) return Eu(e);
}
function Eu(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function rh(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Ze(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? rh(Object(r), !0).forEach(function (n) {
					Jr(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: rh(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function Jr(e, t, r) {
	return (
		(t = Pv(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function RI(e, t) {
	if (!(e instanceof t))
		throw new TypeError('Cannot call a class as a function');
}
function FI(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			'value' in n && (n.writable = !0),
			Object.defineProperty(e, Pv(n.key), n);
	}
}
function WI(e, t, r) {
	return (
		t && FI(e.prototype, t),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		e
	);
}
function Pv(e) {
	var t = UI(e, 'string');
	return br(t) === 'symbol' ? t : String(t);
}
function UI(e, t) {
	if (br(e) !== 'object' || e === null) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (br(n) !== 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
function zI(e, t) {
	if (typeof t != 'function' && t !== null)
		throw new TypeError(
			'Super expression must either be null or a function',
		);
	(e.prototype = Object.create(t && t.prototype, {
		constructor: { value: e, writable: !0, configurable: !0 },
	})),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		t && ju(e, t);
}
function ju(e, t) {
	return (
		(ju = Object.setPrototypeOf
			? Object.setPrototypeOf.bind()
			: function (n, i) {
					return (n.__proto__ = i), n;
				}),
		ju(e, t)
	);
}
function qI(e) {
	var t = HI();
	return function () {
		var n = ea(e),
			i;
		if (t) {
			var a = ea(this).constructor;
			i = Reflect.construct(n, arguments, a);
		} else i = n.apply(this, arguments);
		return Mu(this, i);
	};
}
function Mu(e, t) {
	if (t && (br(t) === 'object' || typeof t == 'function')) return t;
	if (t !== void 0)
		throw new TypeError(
			'Derived constructors may only return object or undefined',
		);
	return Cu(e);
}
function Cu(e) {
	if (e === void 0)
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called",
		);
	return e;
}
function HI() {
	if (typeof Reflect > 'u' || !Reflect.construct || Reflect.construct.sham)
		return !1;
	if (typeof Proxy == 'function') return !0;
	try {
		return (
			Boolean.prototype.valueOf.call(
				Reflect.construct(Boolean, [], function () {}),
			),
			!0
		);
	} catch {
		return !1;
	}
}
function ea(e) {
	return (
		(ea = Object.setPrototypeOf
			? Object.getPrototypeOf.bind()
			: function (r) {
					return r.__proto__ || Object.getPrototypeOf(r);
				}),
		ea(e)
	);
}
var wt = (function (e) {
	zI(r, e);
	var t = qI(r);
	function r(n, i) {
		var a;
		RI(this, r), (a = t.call(this, n, i));
		var o = a.props,
			u = o.isActive,
			s = o.attributeName,
			c = o.from,
			f = o.to,
			l = o.steps,
			h = o.children,
			p = o.duration;
		if (
			((a.handleStyleChange = a.handleStyleChange.bind(Cu(a))),
			(a.changeStyle = a.changeStyle.bind(Cu(a))),
			!u || p <= 0)
		)
			return (
				(a.state = { style: {} }),
				typeof h == 'function' && (a.state = { style: f }),
				Mu(a)
			);
		if (l && l.length) a.state = { style: l[0].style };
		else if (c) {
			if (typeof h == 'function') return (a.state = { style: c }), Mu(a);
			a.state = { style: s ? Jr({}, s, c) : c };
		} else a.state = { style: {} };
		return a;
	}
	return (
		WI(r, [
			{
				key: 'componentDidMount',
				value: function () {
					var i = this.props,
						a = i.isActive,
						o = i.canBegin;
					(this.mounted = !0),
						!(!a || !o) && this.runAnimation(this.props);
				},
			},
			{
				key: 'componentDidUpdate',
				value: function (i) {
					var a = this.props,
						o = a.isActive,
						u = a.canBegin,
						s = a.attributeName,
						c = a.shouldReAnimate,
						f = a.to,
						l = a.from,
						h = this.state.style;
					if (u) {
						if (!o) {
							var p = { style: s ? Jr({}, s, f) : f };
							this.state &&
								h &&
								((s && h[s] !== f) || (!s && h !== f)) &&
								this.setState(p);
							return;
						}
						if (!(Z2(i.to, f) && i.canBegin && i.isActive)) {
							var y = !i.canBegin || !i.isActive;
							this.manager && this.manager.stop(),
								this.stopJSAnimation && this.stopJSAnimation();
							var v = y || c ? l : i.to;
							if (this.state && h) {
								var d = { style: s ? Jr({}, s, v) : v };
								((s && h[s] !== v) || (!s && h !== v)) &&
									this.setState(d);
							}
							this.runAnimation(
								Ze(
									Ze({}, this.props),
									{},
									{ from: v, begin: 0 },
								),
							);
						}
					}
				},
			},
			{
				key: 'componentWillUnmount',
				value: function () {
					this.mounted = !1;
					var i = this.props.onAnimationEnd;
					this.unSubscribe && this.unSubscribe(),
						this.manager &&
							(this.manager.stop(), (this.manager = null)),
						this.stopJSAnimation && this.stopJSAnimation(),
						i && i();
				},
			},
			{
				key: 'handleStyleChange',
				value: function (i) {
					this.changeStyle(i);
				},
			},
			{
				key: 'changeStyle',
				value: function (i) {
					this.mounted && this.setState({ style: i });
				},
			},
			{
				key: 'runJSAnimation',
				value: function (i) {
					var a = this,
						o = i.from,
						u = i.to,
						s = i.duration,
						c = i.easing,
						f = i.begin,
						l = i.onAnimationEnd,
						h = i.onAnimationStart,
						p = MI(o, u, xI(c), s, this.changeStyle),
						y = function () {
							a.stopJSAnimation = p();
						};
					this.manager.start([h, f, y, s, l]);
				},
			},
			{
				key: 'runStepAnimation',
				value: function (i) {
					var a = this,
						o = i.steps,
						u = i.begin,
						s = i.onAnimationStart,
						c = o[0],
						f = c.style,
						l = c.duration,
						h = l === void 0 ? 0 : l,
						p = function (v, d, w) {
							if (w === 0) return v;
							var b = d.duration,
								x = d.easing,
								m = x === void 0 ? 'ease' : x,
								g = d.style,
								O = d.properties,
								S = d.onAnimationEnd,
								A = w > 0 ? o[w - 1] : d,
								E = O || Object.keys(g);
							if (typeof m == 'function' || m === 'spring')
								return [].concat(wo(v), [
									a.runJSAnimation.bind(a, {
										from: A.style,
										to: g,
										duration: b,
										easing: m,
									}),
									b,
								]);
							var T = Zf(E, b, m),
								P = Ze(
									Ze(Ze({}, A.style), g),
									{},
									{ transition: T },
								);
							return [].concat(wo(v), [P, b, S]).filter(sI);
						};
					return this.manager.start(
						[s].concat(wo(o.reduce(p, [f, Math.max(h, u)])), [
							i.onAnimationEnd,
						]),
					);
				},
			},
			{
				key: 'runAnimation',
				value: function (i) {
					this.manager || (this.manager = iI());
					var a = i.begin,
						o = i.duration,
						u = i.attributeName,
						s = i.to,
						c = i.easing,
						f = i.onAnimationStart,
						l = i.onAnimationEnd,
						h = i.steps,
						p = i.children,
						y = this.manager;
					if (
						((this.unSubscribe = y.subscribe(
							this.handleStyleChange,
						)),
						typeof c == 'function' ||
							typeof p == 'function' ||
							c === 'spring')
					) {
						this.runJSAnimation(i);
						return;
					}
					if (h.length > 1) {
						this.runStepAnimation(i);
						return;
					}
					var v = u ? Jr({}, u, s) : s,
						d = Zf(Object.keys(v), o, c);
					y.start([f, a, Ze(Ze({}, v), {}, { transition: d }), o, l]);
				},
			},
			{
				key: 'render',
				value: function () {
					var i = this.props,
						a = i.children;
					i.begin;
					var o = i.duration;
					i.attributeName, i.easing;
					var u = i.isActive;
					i.steps,
						i.from,
						i.to,
						i.canBegin,
						i.onAnimationEnd,
						i.shouldReAnimate,
						i.onAnimationReStart;
					var s = kI(i, CI),
						c = D.Children.count(a),
						f = this.state.style;
					if (typeof a == 'function') return a(f);
					if (!u || c === 0 || o <= 0) return a;
					var l = function (p) {
						var y = p.props,
							v = y.style,
							d = v === void 0 ? {} : v,
							w = y.className,
							b = D.cloneElement(
								p,
								Ze(
									Ze({}, s),
									{},
									{ style: Ze(Ze({}, d), f), className: w },
								),
							);
						return b;
					};
					return c === 1
						? l(D.Children.only(a))
						: _.createElement(
								'div',
								null,
								D.Children.map(a, function (h) {
									return l(h);
								}),
							);
				},
			},
		]),
		r
	);
})(D.PureComponent);
wt.displayName = 'Animate';
wt.defaultProps = {
	begin: 0,
	duration: 1e3,
	from: '',
	to: '',
	attributeName: '',
	easing: 'ease',
	isActive: !0,
	canBegin: !0,
	steps: [],
	onAnimationEnd: function () {},
	onAnimationStart: function () {},
};
wt.propTypes = {
	from: X.oneOfType([X.object, X.string]),
	to: X.oneOfType([X.object, X.string]),
	attributeName: X.string,
	duration: X.number,
	begin: X.number,
	easing: X.oneOfType([X.string, X.func]),
	steps: X.arrayOf(
		X.shape({
			duration: X.number.isRequired,
			style: X.object.isRequired,
			easing: X.oneOfType([
				X.oneOf([
					'ease',
					'ease-in',
					'ease-out',
					'ease-in-out',
					'linear',
				]),
				X.func,
			]),
			properties: X.arrayOf('string'),
			onAnimationEnd: X.func,
		}),
	),
	children: X.oneOfType([X.node, X.func]),
	isActive: X.bool,
	canBegin: X.bool,
	onAnimationEnd: X.func,
	shouldReAnimate: X.bool,
	onAnimationStart: X.func,
	onAnimationReStart: X.func,
};
X.object, X.object, X.object, X.element;
X.object, X.object, X.object, X.oneOfType([X.array, X.element]), X.any;
function In(e) {
	'@babel/helpers - typeof';
	return (
		(In =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		In(e)
	);
}
function ta() {
	return (
		(ta = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		ta.apply(this, arguments)
	);
}
function KI(e, t) {
	return YI(e) || VI(e, t) || XI(e, t) || GI();
}
function GI() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function XI(e, t) {
	if (e) {
		if (typeof e == 'string') return nh(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return nh(e, t);
	}
}
function nh(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function VI(e, t) {
	var r =
		e == null
			? null
			: (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			s = !0,
			c = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (
					;
					!(s = (n = a.call(r)).done) &&
					(u.push(n.value), u.length !== t);
					s = !0
				);
		} catch (f) {
			(c = !0), (i = f);
		} finally {
			try {
				if (
					!s &&
					r.return != null &&
					((o = r.return()), Object(o) !== o)
				)
					return;
			} finally {
				if (c) throw i;
			}
		}
		return u;
	}
}
function YI(e) {
	if (Array.isArray(e)) return e;
}
function ih(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function ah(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? ih(Object(r), !0).forEach(function (n) {
					ZI(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: ih(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function ZI(e, t, r) {
	return (
		(t = JI(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function JI(e) {
	var t = QI(e, 'string');
	return In(t) == 'symbol' ? t : String(t);
}
function QI(e, t) {
	if (In(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (In(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var oh = function (t, r, n, i, a) {
		var o = Math.min(Math.abs(n) / 2, Math.abs(i) / 2),
			u = i >= 0 ? 1 : -1,
			s = n >= 0 ? 1 : -1,
			c = (i >= 0 && n >= 0) || (i < 0 && n < 0) ? 1 : 0,
			f;
		if (o > 0 && a instanceof Array) {
			for (var l = [0, 0, 0, 0], h = 0, p = 4; h < p; h++)
				l[h] = a[h] > o ? o : a[h];
			(f = 'M'.concat(t, ',').concat(r + u * l[0])),
				l[0] > 0 &&
					(f += 'A '
						.concat(l[0], ',')
						.concat(l[0], ',0,0,')
						.concat(c, ',')
						.concat(t + s * l[0], ',')
						.concat(r)),
				(f += 'L '.concat(t + n - s * l[1], ',').concat(r)),
				l[1] > 0 &&
					(f += 'A '
						.concat(l[1], ',')
						.concat(l[1], ',0,0,')
						.concat(
							c,
							`,
        `,
						)
						.concat(t + n, ',')
						.concat(r + u * l[1])),
				(f += 'L '.concat(t + n, ',').concat(r + i - u * l[2])),
				l[2] > 0 &&
					(f += 'A '
						.concat(l[2], ',')
						.concat(l[2], ',0,0,')
						.concat(
							c,
							`,
        `,
						)
						.concat(t + n - s * l[2], ',')
						.concat(r + i)),
				(f += 'L '.concat(t + s * l[3], ',').concat(r + i)),
				l[3] > 0 &&
					(f += 'A '
						.concat(l[3], ',')
						.concat(l[3], ',0,0,')
						.concat(
							c,
							`,
        `,
						)
						.concat(t, ',')
						.concat(r + i - u * l[3])),
				(f += 'Z');
		} else if (o > 0 && a === +a && a > 0) {
			var y = Math.min(o, a);
			f = 'M '
				.concat(t, ',')
				.concat(
					r + u * y,
					`
            A `,
				)
				.concat(y, ',')
				.concat(y, ',0,0,')
				.concat(c, ',')
				.concat(t + s * y, ',')
				.concat(
					r,
					`
            L `,
				)
				.concat(t + n - s * y, ',')
				.concat(
					r,
					`
            A `,
				)
				.concat(y, ',')
				.concat(y, ',0,0,')
				.concat(c, ',')
				.concat(t + n, ',')
				.concat(
					r + u * y,
					`
            L `,
				)
				.concat(t + n, ',')
				.concat(
					r + i - u * y,
					`
            A `,
				)
				.concat(y, ',')
				.concat(y, ',0,0,')
				.concat(c, ',')
				.concat(t + n - s * y, ',')
				.concat(
					r + i,
					`
            L `,
				)
				.concat(t + s * y, ',')
				.concat(
					r + i,
					`
            A `,
				)
				.concat(y, ',')
				.concat(y, ',0,0,')
				.concat(c, ',')
				.concat(t, ',')
				.concat(r + i - u * y, ' Z');
		} else
			f = 'M '
				.concat(t, ',')
				.concat(r, ' h ')
				.concat(n, ' v ')
				.concat(i, ' h ')
				.concat(-n, ' Z');
		return f;
	},
	eN = function (t, r) {
		if (!t || !r) return !1;
		var n = t.x,
			i = t.y,
			a = r.x,
			o = r.y,
			u = r.width,
			s = r.height;
		if (Math.abs(u) > 0 && Math.abs(s) > 0) {
			var c = Math.min(a, a + u),
				f = Math.max(a, a + u),
				l = Math.min(o, o + s),
				h = Math.max(o, o + s);
			return n >= c && n <= f && i >= l && i <= h;
		}
		return !1;
	},
	tN = {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radius: 0,
		isAnimationActive: !1,
		isUpdateAnimationActive: !1,
		animationBegin: 0,
		animationDuration: 1500,
		animationEasing: 'ease',
	},
	Xs = function (t) {
		var r = ah(ah({}, tN), t),
			n = D.useRef(),
			i = D.useState(-1),
			a = KI(i, 2),
			o = a[0],
			u = a[1];
		D.useEffect(function () {
			if (n.current && n.current.getTotalLength)
				try {
					var m = n.current.getTotalLength();
					m && u(m);
				} catch {}
		}, []);
		var s = r.x,
			c = r.y,
			f = r.width,
			l = r.height,
			h = r.radius,
			p = r.className,
			y = r.animationEasing,
			v = r.animationDuration,
			d = r.animationBegin,
			w = r.isAnimationActive,
			b = r.isUpdateAnimationActive;
		if (s !== +s || c !== +c || f !== +f || l !== +l || f === 0 || l === 0)
			return null;
		var x = ne('recharts-rectangle', p);
		return b
			? _.createElement(
					wt,
					{
						canBegin: o > 0,
						from: { width: f, height: l, x: s, y: c },
						to: { width: f, height: l, x: s, y: c },
						duration: v,
						animationEasing: y,
						isActive: b,
					},
					function (m) {
						var g = m.width,
							O = m.height,
							S = m.x,
							A = m.y;
						return _.createElement(
							wt,
							{
								canBegin: o > 0,
								from: '0px '.concat(o === -1 ? 1 : o, 'px'),
								to: ''.concat(o, 'px 0px'),
								attributeName: 'strokeDasharray',
								begin: d,
								duration: v,
								isActive: w,
								easing: y,
							},
							_.createElement(
								'path',
								ta({}, J(r, !0), {
									className: x,
									d: oh(S, A, g, O, h),
									ref: n,
								}),
							),
						);
					},
				)
			: _.createElement(
					'path',
					ta({}, J(r, !0), { className: x, d: oh(s, c, f, l, h) }),
				);
	};
function ku() {
	return (
		(ku = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		ku.apply(this, arguments)
	);
}
var Vs = function (t) {
	var r = t.cx,
		n = t.cy,
		i = t.r,
		a = t.className,
		o = ne('recharts-dot', a);
	return r === +r && n === +n && i === +i
		? _.createElement(
				'circle',
				ku({}, J(t, !1), wi(t), { className: o, cx: r, cy: n, r: i }),
			)
		: null;
};
function Nn(e) {
	'@babel/helpers - typeof';
	return (
		(Nn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Nn(e)
	);
}
var rN = ['x', 'y', 'top', 'left', 'width', 'height', 'className'];
function Iu() {
	return (
		(Iu = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		Iu.apply(this, arguments)
	);
}
function uh(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function nN(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? uh(Object(r), !0).forEach(function (n) {
					iN(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: uh(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function iN(e, t, r) {
	return (
		(t = aN(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function aN(e) {
	var t = oN(e, 'string');
	return Nn(t) == 'symbol' ? t : String(t);
}
function oN(e, t) {
	if (Nn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (Nn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
function uN(e, t) {
	if (e == null) return {};
	var r = sN(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function sN(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
var cN = function (t, r, n, i, a, o) {
		return 'M'
			.concat(t, ',')
			.concat(a, 'v')
			.concat(i, 'M')
			.concat(o, ',')
			.concat(r, 'h')
			.concat(n);
	},
	lN = function (t) {
		var r = t.x,
			n = r === void 0 ? 0 : r,
			i = t.y,
			a = i === void 0 ? 0 : i,
			o = t.top,
			u = o === void 0 ? 0 : o,
			s = t.left,
			c = s === void 0 ? 0 : s,
			f = t.width,
			l = f === void 0 ? 0 : f,
			h = t.height,
			p = h === void 0 ? 0 : h,
			y = t.className,
			v = uN(t, rN),
			d = nN({ x: n, y: a, top: u, left: c, width: l, height: p }, v);
		return !F(n) || !F(a) || !F(l) || !F(p) || !F(u) || !F(c)
			? null
			: _.createElement(
					'path',
					Iu({}, J(d, !0), {
						className: ne('recharts-cross', y),
						d: cN(n, a, l, p, u, c),
					}),
				);
	},
	fN = zp,
	hN = fN(Object.getPrototypeOf, Object),
	pN = hN,
	dN = Ot,
	vN = pN,
	yN = St,
	mN = '[object Object]',
	gN = Function.prototype,
	bN = Object.prototype,
	$v = gN.toString,
	xN = bN.hasOwnProperty,
	wN = $v.call(Object);
function ON(e) {
	if (!yN(e) || dN(e) != mN) return !1;
	var t = vN(e);
	if (t === null) return !0;
	var r = xN.call(t, 'constructor') && t.constructor;
	return typeof r == 'function' && r instanceof r && $v.call(r) == wN;
}
var SN = ON;
const AN = fe(SN);
var _N = Ot,
	PN = St,
	$N = '[object Boolean]';
function TN(e) {
	return e === !0 || e === !1 || (PN(e) && _N(e) == $N);
}
var EN = TN;
const jN = fe(EN);
function Dn(e) {
	'@babel/helpers - typeof';
	return (
		(Dn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Dn(e)
	);
}
function ra() {
	return (
		(ra = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		ra.apply(this, arguments)
	);
}
function MN(e, t) {
	return NN(e) || IN(e, t) || kN(e, t) || CN();
}
function CN() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kN(e, t) {
	if (e) {
		if (typeof e == 'string') return sh(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return sh(e, t);
	}
}
function sh(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function IN(e, t) {
	var r =
		e == null
			? null
			: (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			s = !0,
			c = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (
					;
					!(s = (n = a.call(r)).done) &&
					(u.push(n.value), u.length !== t);
					s = !0
				);
		} catch (f) {
			(c = !0), (i = f);
		} finally {
			try {
				if (
					!s &&
					r.return != null &&
					((o = r.return()), Object(o) !== o)
				)
					return;
			} finally {
				if (c) throw i;
			}
		}
		return u;
	}
}
function NN(e) {
	if (Array.isArray(e)) return e;
}
function ch(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function lh(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? ch(Object(r), !0).forEach(function (n) {
					DN(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: ch(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function DN(e, t, r) {
	return (
		(t = BN(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function BN(e) {
	var t = LN(e, 'string');
	return Dn(t) == 'symbol' ? t : String(t);
}
function LN(e, t) {
	if (Dn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (Dn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var fh = function (t, r, n, i, a) {
		var o = n - i,
			u;
		return (
			(u = 'M '.concat(t, ',').concat(r)),
			(u += 'L '.concat(t + n, ',').concat(r)),
			(u += 'L '.concat(t + n - o / 2, ',').concat(r + a)),
			(u += 'L '.concat(t + n - o / 2 - i, ',').concat(r + a)),
			(u += 'L '.concat(t, ',').concat(r, ' Z')),
			u
		);
	},
	RN = {
		x: 0,
		y: 0,
		upperWidth: 0,
		lowerWidth: 0,
		height: 0,
		isUpdateAnimationActive: !1,
		animationBegin: 0,
		animationDuration: 1500,
		animationEasing: 'ease',
	},
	FN = function (t) {
		var r = lh(lh({}, RN), t),
			n = D.useRef(),
			i = D.useState(-1),
			a = MN(i, 2),
			o = a[0],
			u = a[1];
		D.useEffect(function () {
			if (n.current && n.current.getTotalLength)
				try {
					var x = n.current.getTotalLength();
					x && u(x);
				} catch {}
		}, []);
		var s = r.x,
			c = r.y,
			f = r.upperWidth,
			l = r.lowerWidth,
			h = r.height,
			p = r.className,
			y = r.animationEasing,
			v = r.animationDuration,
			d = r.animationBegin,
			w = r.isUpdateAnimationActive;
		if (
			s !== +s ||
			c !== +c ||
			f !== +f ||
			l !== +l ||
			h !== +h ||
			(f === 0 && l === 0) ||
			h === 0
		)
			return null;
		var b = ne('recharts-trapezoid', p);
		return w
			? _.createElement(
					wt,
					{
						canBegin: o > 0,
						from: {
							upperWidth: 0,
							lowerWidth: 0,
							height: h,
							x: s,
							y: c,
						},
						to: {
							upperWidth: f,
							lowerWidth: l,
							height: h,
							x: s,
							y: c,
						},
						duration: v,
						animationEasing: y,
						isActive: w,
					},
					function (x) {
						var m = x.upperWidth,
							g = x.lowerWidth,
							O = x.height,
							S = x.x,
							A = x.y;
						return _.createElement(
							wt,
							{
								canBegin: o > 0,
								from: '0px '.concat(o === -1 ? 1 : o, 'px'),
								to: ''.concat(o, 'px 0px'),
								attributeName: 'strokeDasharray',
								begin: d,
								duration: v,
								easing: y,
							},
							_.createElement(
								'path',
								ra({}, J(r, !0), {
									className: b,
									d: fh(S, A, m, g, O),
									ref: n,
								}),
							),
						);
					},
				)
			: _.createElement(
					'g',
					null,
					_.createElement(
						'path',
						ra({}, J(r, !0), {
							className: b,
							d: fh(s, c, f, l, h),
						}),
					),
				);
	},
	WN = [
		'option',
		'shapeType',
		'propTransformer',
		'activeClassName',
		'isActive',
	];
function Bn(e) {
	'@babel/helpers - typeof';
	return (
		(Bn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Bn(e)
	);
}
function UN(e, t) {
	if (e == null) return {};
	var r = zN(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function zN(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
function hh(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function na(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? hh(Object(r), !0).forEach(function (n) {
					qN(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: hh(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function qN(e, t, r) {
	return (
		(t = HN(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function HN(e) {
	var t = KN(e, 'string');
	return Bn(t) == 'symbol' ? t : String(t);
}
function KN(e, t) {
	if (Bn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (Bn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
function GN(e, t) {
	return na(na({}, t), e);
}
function XN(e, t) {
	return e === 'symbols';
}
function ph(e) {
	var t = e.shapeType,
		r = e.elementProps;
	switch (t) {
		case 'rectangle':
			return _.createElement(Xs, r);
		case 'trapezoid':
			return _.createElement(FN, r);
		case 'sector':
			return _.createElement(vv, r);
		case 'symbols':
			if (XN(t)) return _.createElement(hs, r);
			break;
		default:
			return null;
	}
}
function VN(e) {
	return D.isValidElement(e) ? e.props : e;
}
function YN(e) {
	var t = e.option,
		r = e.shapeType,
		n = e.propTransformer,
		i = n === void 0 ? GN : n,
		a = e.activeClassName,
		o = a === void 0 ? 'recharts-active-shape' : a,
		u = e.isActive,
		s = UN(e, WN),
		c;
	if (D.isValidElement(t)) c = D.cloneElement(t, na(na({}, s), VN(t)));
	else if (Z(t)) c = t(s);
	else if (AN(t) && !jN(t)) {
		var f = i(t, s);
		c = _.createElement(ph, { shapeType: r, elementProps: f });
	} else {
		var l = s;
		c = _.createElement(ph, { shapeType: r, elementProps: l });
	}
	return u ? _.createElement(pe, { className: o }, c) : c;
}
function Ha(e, t) {
	return t != null && 'trapezoids' in e.props;
}
function Ka(e, t) {
	return t != null && 'sectors' in e.props;
}
function Ln(e, t) {
	return t != null && 'points' in e.props;
}
function ZN(e, t) {
	var r,
		n,
		i =
			e.x ===
				(t == null || (r = t.labelViewBox) === null || r === void 0
					? void 0
					: r.x) || e.x === t.x,
		a =
			e.y ===
				(t == null || (n = t.labelViewBox) === null || n === void 0
					? void 0
					: n.y) || e.y === t.y;
	return i && a;
}
function JN(e, t) {
	var r = e.endAngle === t.endAngle,
		n = e.startAngle === t.startAngle;
	return r && n;
}
function QN(e, t) {
	var r = e.x === t.x,
		n = e.y === t.y,
		i = e.z === t.z;
	return r && n && i;
}
function eD(e, t) {
	var r;
	return Ha(e, t) ? (r = ZN) : Ka(e, t) ? (r = JN) : Ln(e, t) && (r = QN), r;
}
function tD(e, t) {
	var r;
	return (
		Ha(e, t)
			? (r = 'trapezoids')
			: Ka(e, t)
				? (r = 'sectors')
				: Ln(e, t) && (r = 'points'),
		r
	);
}
function rD(e, t) {
	if (Ha(e, t)) {
		var r;
		return (r = t.tooltipPayload) === null ||
			r === void 0 ||
			(r = r[0]) === null ||
			r === void 0 ||
			(r = r.payload) === null ||
			r === void 0
			? void 0
			: r.payload;
	}
	if (Ka(e, t)) {
		var n;
		return (n = t.tooltipPayload) === null ||
			n === void 0 ||
			(n = n[0]) === null ||
			n === void 0 ||
			(n = n.payload) === null ||
			n === void 0
			? void 0
			: n.payload;
	}
	return Ln(e, t) ? t.payload : {};
}
function nD(e) {
	var t = e.activeTooltipItem,
		r = e.graphicalItem,
		n = e.itemData,
		i = tD(r, t),
		a = rD(r, t),
		o = n.filter(function (s, c) {
			var f = wn(a, s),
				l = r.props[i].filter(function (y) {
					var v = eD(r, t);
					return v(y, t);
				}),
				h = r.props[i].indexOf(l[l.length - 1]),
				p = c === h;
			return f && p;
		}),
		u = n.indexOf(o[o.length - 1]);
	return u;
}
var iD = Math.ceil,
	aD = Math.max;
function oD(e, t, r, n) {
	for (var i = -1, a = aD(iD((t - e) / (r || 1)), 0), o = Array(a); a--; )
		(o[n ? a : ++i] = e), (e += r);
	return o;
}
var uD = oD,
	sD = sd,
	dh = 1 / 0,
	cD = 17976931348623157e292;
function lD(e) {
	if (!e) return e === 0 ? e : 0;
	if (((e = sD(e)), e === dh || e === -dh)) {
		var t = e < 0 ? -1 : 1;
		return t * cD;
	}
	return e === e ? e : 0;
}
var fD = lD,
	hD = uD,
	pD = Ia,
	Oo = fD;
function dD(e) {
	return function (t, r, n) {
		return (
			n && typeof n != 'number' && pD(t, r, n) && (r = n = void 0),
			(t = Oo(t)),
			r === void 0 ? ((r = t), (t = 0)) : (r = Oo(r)),
			(n = n === void 0 ? (t < r ? 1 : -1) : Oo(n)),
			hD(t, r, n, e)
		);
	};
}
var vD = dD,
	yD = vD,
	mD = yD(),
	gD = mD;
const ia = fe(gD);
function Rn(e) {
	'@babel/helpers - typeof';
	return (
		(Rn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Rn(e)
	);
}
function vh(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function yh(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? vh(Object(r), !0).forEach(function (n) {
					Tv(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: vh(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function Tv(e, t, r) {
	return (
		(t = bD(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function bD(e) {
	var t = xD(e, 'string');
	return Rn(t) == 'symbol' ? t : String(t);
}
function xD(e, t) {
	if (Rn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (Rn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var wD = ['Webkit', 'Moz', 'O', 'ms'],
	OD = function (t, r) {
		var n = t.replace(/(\w)/, function (a) {
				return a.toUpperCase();
			}),
			i = wD.reduce(function (a, o) {
				return yh(yh({}, a), {}, Tv({}, o + n, r));
			}, {});
		return (i[t] = r), i;
	};
function xr(e) {
	'@babel/helpers - typeof';
	return (
		(xr =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		xr(e)
	);
}
function aa() {
	return (
		(aa = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		aa.apply(this, arguments)
	);
}
function mh(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function So(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? mh(Object(r), !0).forEach(function (n) {
					Be(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: mh(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function SD(e, t) {
	if (!(e instanceof t))
		throw new TypeError('Cannot call a class as a function');
}
function gh(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			'value' in n && (n.writable = !0),
			Object.defineProperty(e, jv(n.key), n);
	}
}
function AD(e, t, r) {
	return (
		t && gh(e.prototype, t),
		r && gh(e, r),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		e
	);
}
function _D(e, t, r) {
	return (
		(t = oa(t)),
		PD(
			e,
			Ev()
				? Reflect.construct(t, r || [], oa(e).constructor)
				: t.apply(e, r),
		)
	);
}
function PD(e, t) {
	if (t && (xr(t) === 'object' || typeof t == 'function')) return t;
	if (t !== void 0)
		throw new TypeError(
			'Derived constructors may only return object or undefined',
		);
	return nt(e);
}
function Ev() {
	try {
		var e = !Boolean.prototype.valueOf.call(
			Reflect.construct(Boolean, [], function () {}),
		);
	} catch {}
	return (Ev = function () {
		return !!e;
	})();
}
function oa(e) {
	return (
		(oa = Object.setPrototypeOf
			? Object.getPrototypeOf.bind()
			: function (r) {
					return r.__proto__ || Object.getPrototypeOf(r);
				}),
		oa(e)
	);
}
function nt(e) {
	if (e === void 0)
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called",
		);
	return e;
}
function $D(e, t) {
	if (typeof t != 'function' && t !== null)
		throw new TypeError(
			'Super expression must either be null or a function',
		);
	(e.prototype = Object.create(t && t.prototype, {
		constructor: { value: e, writable: !0, configurable: !0 },
	})),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		t && Nu(e, t);
}
function Nu(e, t) {
	return (
		(Nu = Object.setPrototypeOf
			? Object.setPrototypeOf.bind()
			: function (n, i) {
					return (n.__proto__ = i), n;
				}),
		Nu(e, t)
	);
}
function Be(e, t, r) {
	return (
		(t = jv(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function jv(e) {
	var t = TD(e, 'string');
	return xr(t) == 'symbol' ? t : String(t);
}
function TD(e, t) {
	if (xr(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (xr(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var ED = function (t) {
		var r = t.data,
			n = t.startIndex,
			i = t.endIndex,
			a = t.x,
			o = t.width,
			u = t.travellerWidth;
		if (!r || !r.length) return {};
		var s = r.length,
			c = rn()
				.domain(ia(0, s))
				.range([a, a + o - u]),
			f = c.domain().map(function (l) {
				return c(l);
			});
		return {
			isTextActive: !1,
			isSlideMoving: !1,
			isTravellerMoving: !1,
			isTravellerFocused: !1,
			startX: c(n),
			endX: c(i),
			scale: c,
			scaleValues: f,
		};
	},
	bh = function (t) {
		return t.changedTouches && !!t.changedTouches.length;
	},
	wr = (function (e) {
		$D(t, e);
		function t(r) {
			var n;
			return (
				SD(this, t),
				(n = _D(this, t, [r])),
				Be(nt(n), 'handleDrag', function (i) {
					n.leaveTimer &&
						(clearTimeout(n.leaveTimer), (n.leaveTimer = null)),
						n.state.isTravellerMoving
							? n.handleTravellerMove(i)
							: n.state.isSlideMoving && n.handleSlideDrag(i);
				}),
				Be(nt(n), 'handleTouchMove', function (i) {
					i.changedTouches != null &&
						i.changedTouches.length > 0 &&
						n.handleDrag(i.changedTouches[0]);
				}),
				Be(nt(n), 'handleDragEnd', function () {
					n.setState(
						{ isTravellerMoving: !1, isSlideMoving: !1 },
						function () {
							var i = n.props,
								a = i.endIndex,
								o = i.onDragEnd,
								u = i.startIndex;
							o == null || o({ endIndex: a, startIndex: u });
						},
					),
						n.detachDragEndListener();
				}),
				Be(nt(n), 'handleLeaveWrapper', function () {
					(n.state.isTravellerMoving || n.state.isSlideMoving) &&
						(n.leaveTimer = window.setTimeout(
							n.handleDragEnd,
							n.props.leaveTimeOut,
						));
				}),
				Be(nt(n), 'handleEnterSlideOrTraveller', function () {
					n.setState({ isTextActive: !0 });
				}),
				Be(nt(n), 'handleLeaveSlideOrTraveller', function () {
					n.setState({ isTextActive: !1 });
				}),
				Be(nt(n), 'handleSlideDragStart', function (i) {
					var a = bh(i) ? i.changedTouches[0] : i;
					n.setState({
						isTravellerMoving: !1,
						isSlideMoving: !0,
						slideMoveStartX: a.pageX,
					}),
						n.attachDragEndListener();
				}),
				(n.travellerDragStartHandlers = {
					startX: n.handleTravellerDragStart.bind(nt(n), 'startX'),
					endX: n.handleTravellerDragStart.bind(nt(n), 'endX'),
				}),
				(n.state = {}),
				n
			);
		}
		return (
			AD(
				t,
				[
					{
						key: 'componentWillUnmount',
						value: function () {
							this.leaveTimer &&
								(clearTimeout(this.leaveTimer),
								(this.leaveTimer = null)),
								this.detachDragEndListener();
						},
					},
					{
						key: 'getIndex',
						value: function (n) {
							var i = n.startX,
								a = n.endX,
								o = this.state.scaleValues,
								u = this.props,
								s = u.gap,
								c = u.data,
								f = c.length - 1,
								l = Math.min(i, a),
								h = Math.max(i, a),
								p = t.getIndexInRange(o, l),
								y = t.getIndexInRange(o, h);
							return {
								startIndex: p - (p % s),
								endIndex: y === f ? f : y - (y % s),
							};
						},
					},
					{
						key: 'getTextOfTick',
						value: function (n) {
							var i = this.props,
								a = i.data,
								o = i.tickFormatter,
								u = i.dataKey,
								s = Fe(a[n], u, n);
							return Z(o) ? o(s, n) : s;
						},
					},
					{
						key: 'attachDragEndListener',
						value: function () {
							window.addEventListener(
								'mouseup',
								this.handleDragEnd,
								!0,
							),
								window.addEventListener(
									'touchend',
									this.handleDragEnd,
									!0,
								),
								window.addEventListener(
									'mousemove',
									this.handleDrag,
									!0,
								);
						},
					},
					{
						key: 'detachDragEndListener',
						value: function () {
							window.removeEventListener(
								'mouseup',
								this.handleDragEnd,
								!0,
							),
								window.removeEventListener(
									'touchend',
									this.handleDragEnd,
									!0,
								),
								window.removeEventListener(
									'mousemove',
									this.handleDrag,
									!0,
								);
						},
					},
					{
						key: 'handleSlideDrag',
						value: function (n) {
							var i = this.state,
								a = i.slideMoveStartX,
								o = i.startX,
								u = i.endX,
								s = this.props,
								c = s.x,
								f = s.width,
								l = s.travellerWidth,
								h = s.startIndex,
								p = s.endIndex,
								y = s.onChange,
								v = n.pageX - a;
							v > 0
								? (v = Math.min(
										v,
										c + f - l - u,
										c + f - l - o,
									))
								: v < 0 && (v = Math.max(v, c - o, c - u));
							var d = this.getIndex({
								startX: o + v,
								endX: u + v,
							});
							(d.startIndex !== h || d.endIndex !== p) &&
								y &&
								y(d),
								this.setState({
									startX: o + v,
									endX: u + v,
									slideMoveStartX: n.pageX,
								});
						},
					},
					{
						key: 'handleTravellerDragStart',
						value: function (n, i) {
							var a = bh(i) ? i.changedTouches[0] : i;
							this.setState({
								isSlideMoving: !1,
								isTravellerMoving: !0,
								movingTravellerId: n,
								brushMoveStartX: a.pageX,
							}),
								this.attachDragEndListener();
						},
					},
					{
						key: 'handleTravellerMove',
						value: function (n) {
							var i = this.state,
								a = i.brushMoveStartX,
								o = i.movingTravellerId,
								u = i.endX,
								s = i.startX,
								c = this.state[o],
								f = this.props,
								l = f.x,
								h = f.width,
								p = f.travellerWidth,
								y = f.onChange,
								v = f.gap,
								d = f.data,
								w = {
									startX: this.state.startX,
									endX: this.state.endX,
								},
								b = n.pageX - a;
							b > 0
								? (b = Math.min(b, l + h - p - c))
								: b < 0 && (b = Math.max(b, l - c)),
								(w[o] = c + b);
							var x = this.getIndex(w),
								m = x.startIndex,
								g = x.endIndex,
								O = function () {
									var A = d.length - 1;
									return (
										(o === 'startX' &&
											(u > s
												? m % v === 0
												: g % v === 0)) ||
										(u < s && g === A) ||
										(o === 'endX' &&
											(u > s
												? g % v === 0
												: m % v === 0)) ||
										(u > s && g === A)
									);
								};
							this.setState(
								Be(
									Be({}, o, c + b),
									'brushMoveStartX',
									n.pageX,
								),
								function () {
									y && O() && y(x);
								},
							);
						},
					},
					{
						key: 'handleTravellerMoveKeyboard',
						value: function (n, i) {
							var a = this,
								o = this.state,
								u = o.scaleValues,
								s = o.startX,
								c = o.endX,
								f = this.state[i],
								l = u.indexOf(f);
							if (l !== -1) {
								var h = l + n;
								if (!(h === -1 || h >= u.length)) {
									var p = u[h];
									(i === 'startX' && p >= c) ||
										(i === 'endX' && p <= s) ||
										this.setState(
											Be({}, i, p),
											function () {
												a.props.onChange(
													a.getIndex({
														startX: a.state.startX,
														endX: a.state.endX,
													}),
												);
											},
										);
								}
							}
						},
					},
					{
						key: 'renderBackground',
						value: function () {
							var n = this.props,
								i = n.x,
								a = n.y,
								o = n.width,
								u = n.height,
								s = n.fill,
								c = n.stroke;
							return _.createElement('rect', {
								stroke: c,
								fill: s,
								x: i,
								y: a,
								width: o,
								height: u,
							});
						},
					},
					{
						key: 'renderPanorama',
						value: function () {
							var n = this.props,
								i = n.x,
								a = n.y,
								o = n.width,
								u = n.height,
								s = n.data,
								c = n.children,
								f = n.padding,
								l = D.Children.only(c);
							return l
								? _.cloneElement(l, {
										x: i,
										y: a,
										width: o,
										height: u,
										margin: f,
										compact: !0,
										data: s,
									})
								: null;
						},
					},
					{
						key: 'renderTravellerLayer',
						value: function (n, i) {
							var a,
								o,
								u = this,
								s = this.props,
								c = s.y,
								f = s.travellerWidth,
								l = s.height,
								h = s.traveller,
								p = s.ariaLabel,
								y = s.data,
								v = s.startIndex,
								d = s.endIndex,
								w = Math.max(n, this.props.x),
								b = So(
									So({}, J(this.props, !1)),
									{},
									{ x: w, y: c, width: f, height: l },
								),
								x =
									p ||
									'Min value: '
										.concat(
											(a = y[v]) === null || a === void 0
												? void 0
												: a.name,
											', Max value: ',
										)
										.concat(
											(o = y[d]) === null || o === void 0
												? void 0
												: o.name,
										);
							return _.createElement(
								pe,
								{
									tabIndex: 0,
									role: 'slider',
									'aria-label': x,
									'aria-valuenow': n,
									className: 'recharts-brush-traveller',
									onMouseEnter:
										this.handleEnterSlideOrTraveller,
									onMouseLeave:
										this.handleLeaveSlideOrTraveller,
									onMouseDown:
										this.travellerDragStartHandlers[i],
									onTouchStart:
										this.travellerDragStartHandlers[i],
									onKeyDown: function (g) {
										['ArrowLeft', 'ArrowRight'].includes(
											g.key,
										) &&
											(g.preventDefault(),
											g.stopPropagation(),
											u.handleTravellerMoveKeyboard(
												g.key === 'ArrowRight' ? 1 : -1,
												i,
											));
									},
									onFocus: function () {
										u.setState({ isTravellerFocused: !0 });
									},
									onBlur: function () {
										u.setState({ isTravellerFocused: !1 });
									},
									style: { cursor: 'col-resize' },
								},
								t.renderTraveller(h, b),
							);
						},
					},
					{
						key: 'renderSlide',
						value: function (n, i) {
							var a = this.props,
								o = a.y,
								u = a.height,
								s = a.stroke,
								c = a.travellerWidth,
								f = Math.min(n, i) + c,
								l = Math.max(Math.abs(i - n) - c, 0);
							return _.createElement('rect', {
								className: 'recharts-brush-slide',
								onMouseEnter: this.handleEnterSlideOrTraveller,
								onMouseLeave: this.handleLeaveSlideOrTraveller,
								onMouseDown: this.handleSlideDragStart,
								onTouchStart: this.handleSlideDragStart,
								style: { cursor: 'move' },
								stroke: 'none',
								fill: s,
								fillOpacity: 0.2,
								x: f,
								y: o,
								width: l,
								height: u,
							});
						},
					},
					{
						key: 'renderText',
						value: function () {
							var n = this.props,
								i = n.startIndex,
								a = n.endIndex,
								o = n.y,
								u = n.height,
								s = n.travellerWidth,
								c = n.stroke,
								f = this.state,
								l = f.startX,
								h = f.endX,
								p = 5,
								y = { pointerEvents: 'none', fill: c };
							return _.createElement(
								pe,
								{ className: 'recharts-brush-texts' },
								_.createElement(
									Di,
									aa(
										{
											textAnchor: 'end',
											verticalAnchor: 'middle',
											x: Math.min(l, h) - p,
											y: o + u / 2,
										},
										y,
									),
									this.getTextOfTick(i),
								),
								_.createElement(
									Di,
									aa(
										{
											textAnchor: 'start',
											verticalAnchor: 'middle',
											x: Math.max(l, h) + s + p,
											y: o + u / 2,
										},
										y,
									),
									this.getTextOfTick(a),
								),
							);
						},
					},
					{
						key: 'render',
						value: function () {
							var n = this.props,
								i = n.data,
								a = n.className,
								o = n.children,
								u = n.x,
								s = n.y,
								c = n.width,
								f = n.height,
								l = n.alwaysShowText,
								h = this.state,
								p = h.startX,
								y = h.endX,
								v = h.isTextActive,
								d = h.isSlideMoving,
								w = h.isTravellerMoving,
								b = h.isTravellerFocused;
							if (
								!i ||
								!i.length ||
								!F(u) ||
								!F(s) ||
								!F(c) ||
								!F(f) ||
								c <= 0 ||
								f <= 0
							)
								return null;
							var x = ne('recharts-brush', a),
								m = _.Children.count(o) === 1,
								g = OD('userSelect', 'none');
							return _.createElement(
								pe,
								{
									className: x,
									onMouseLeave: this.handleLeaveWrapper,
									onTouchMove: this.handleTouchMove,
									style: g,
								},
								this.renderBackground(),
								m && this.renderPanorama(),
								this.renderSlide(p, y),
								this.renderTravellerLayer(p, 'startX'),
								this.renderTravellerLayer(y, 'endX'),
								(v || d || w || b || l) && this.renderText(),
							);
						},
					},
				],
				[
					{
						key: 'renderDefaultTraveller',
						value: function (n) {
							var i = n.x,
								a = n.y,
								o = n.width,
								u = n.height,
								s = n.stroke,
								c = Math.floor(a + u / 2) - 1;
							return _.createElement(
								_.Fragment,
								null,
								_.createElement('rect', {
									x: i,
									y: a,
									width: o,
									height: u,
									fill: s,
									stroke: 'none',
								}),
								_.createElement('line', {
									x1: i + 1,
									y1: c,
									x2: i + o - 1,
									y2: c,
									fill: 'none',
									stroke: '#fff',
								}),
								_.createElement('line', {
									x1: i + 1,
									y1: c + 2,
									x2: i + o - 1,
									y2: c + 2,
									fill: 'none',
									stroke: '#fff',
								}),
							);
						},
					},
					{
						key: 'renderTraveller',
						value: function (n, i) {
							var a;
							return (
								_.isValidElement(n)
									? (a = _.cloneElement(n, i))
									: Z(n)
										? (a = n(i))
										: (a = t.renderDefaultTraveller(i)),
								a
							);
						},
					},
					{
						key: 'getDerivedStateFromProps',
						value: function (n, i) {
							var a = n.data,
								o = n.width,
								u = n.x,
								s = n.travellerWidth,
								c = n.updateId,
								f = n.startIndex,
								l = n.endIndex;
							if (a !== i.prevData || c !== i.prevUpdateId)
								return So(
									{
										prevData: a,
										prevTravellerWidth: s,
										prevUpdateId: c,
										prevX: u,
										prevWidth: o,
									},
									a && a.length
										? ED({
												data: a,
												width: o,
												x: u,
												travellerWidth: s,
												startIndex: f,
												endIndex: l,
											})
										: { scale: null, scaleValues: null },
								);
							if (
								i.scale &&
								(o !== i.prevWidth ||
									u !== i.prevX ||
									s !== i.prevTravellerWidth)
							) {
								i.scale.range([u, u + o - s]);
								var h = i.scale.domain().map(function (p) {
									return i.scale(p);
								});
								return {
									prevData: a,
									prevTravellerWidth: s,
									prevUpdateId: c,
									prevX: u,
									prevWidth: o,
									startX: i.scale(n.startIndex),
									endX: i.scale(n.endIndex),
									scaleValues: h,
								};
							}
							return null;
						},
					},
					{
						key: 'getIndexInRange',
						value: function (n, i) {
							for (
								var a = n.length, o = 0, u = a - 1;
								u - o > 1;

							) {
								var s = Math.floor((o + u) / 2);
								n[s] > i ? (u = s) : (o = s);
							}
							return i >= n[u] ? u : o;
						},
					},
				],
			),
			t
		);
	})(D.PureComponent);
Be(wr, 'displayName', 'Brush');
Be(wr, 'defaultProps', {
	height: 40,
	travellerWidth: 5,
	gap: 1,
	fill: '#fff',
	stroke: '#666',
	padding: { top: 1, right: 1, bottom: 1, left: 1 },
	leaveTimeOut: 1e3,
	alwaysShowText: !1,
});
var jD = xs;
function MD(e, t) {
	var r;
	return (
		jD(e, function (n, i, a) {
			return (r = t(n, i, a)), !r;
		}),
		!!r
	);
}
var CD = MD,
	kD = Np,
	ID = Dr,
	ND = CD,
	DD = Ne,
	BD = Ia;
function LD(e, t, r) {
	var n = DD(e) ? kD : ND;
	return r && BD(e, t, r) && (t = void 0), n(e, ID(t));
}
var RD = LD;
const FD = fe(RD);
var st = function (t, r) {
		var n = t.alwaysShow,
			i = t.ifOverflow;
		return n && (i = 'extendDomain'), i === r;
	},
	xh = nd;
function WD(e, t, r) {
	t == '__proto__' && xh
		? xh(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
		: (e[t] = r);
}
var UD = WD,
	zD = UD,
	qD = td,
	HD = Dr;
function KD(e, t) {
	var r = {};
	return (
		(t = HD(t)),
		qD(e, function (n, i, a) {
			zD(r, i, t(n, i, a));
		}),
		r
	);
}
var GD = KD;
const XD = fe(GD);
function VD(e, t) {
	for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
		if (!t(e[r], r, e)) return !1;
	return !0;
}
var YD = VD,
	ZD = xs;
function JD(e, t) {
	var r = !0;
	return (
		ZD(e, function (n, i, a) {
			return (r = !!t(n, i, a)), r;
		}),
		r
	);
}
var QD = JD,
	eB = YD,
	tB = QD,
	rB = Dr,
	nB = Ne,
	iB = Ia;
function aB(e, t, r) {
	var n = nB(e) ? eB : tB;
	return r && iB(e, t, r) && (t = void 0), n(e, rB(t));
}
var oB = aB;
const uB = fe(oB);
var sB = ['x', 'y'];
function Fn(e) {
	'@babel/helpers - typeof';
	return (
		(Fn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Fn(e)
	);
}
function Du() {
	return (
		(Du = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		Du.apply(this, arguments)
	);
}
function wh(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Zr(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? wh(Object(r), !0).forEach(function (n) {
					cB(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: wh(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function cB(e, t, r) {
	return (
		(t = lB(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function lB(e) {
	var t = fB(e, 'string');
	return Fn(t) == 'symbol' ? t : String(t);
}
function fB(e, t) {
	if (Fn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (Fn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
function hB(e, t) {
	if (e == null) return {};
	var r = pB(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function pB(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
function dB(e, t) {
	var r = e.x,
		n = e.y,
		i = hB(e, sB),
		a = ''.concat(r),
		o = parseInt(a, 10),
		u = ''.concat(n),
		s = parseInt(u, 10),
		c = ''.concat(t.height || i.height),
		f = parseInt(c, 10),
		l = ''.concat(t.width || i.width),
		h = parseInt(l, 10);
	return Zr(
		Zr(Zr(Zr(Zr({}, t), i), o ? { x: o } : {}), s ? { y: s } : {}),
		{},
		{ height: f, width: h, name: t.name, radius: t.radius },
	);
}
function Oh(e) {
	return _.createElement(
		YN,
		Du(
			{
				shapeType: 'rectangle',
				propTransformer: dB,
				activeClassName: 'recharts-active-bar',
			},
			e,
		),
	);
}
var vB = function (t) {
		var r =
			arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
		return function (n, i) {
			if (typeof t == 'number') return t;
			var a = typeof n == 'number';
			return a ? t(n, i) : (a || Qt(), r);
		};
	},
	yB = ['value', 'background'],
	Mv;
function Or(e) {
	'@babel/helpers - typeof';
	return (
		(Or =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Or(e)
	);
}
function mB(e, t) {
	if (e == null) return {};
	var r = gB(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function gB(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
function ua() {
	return (
		(ua = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		ua.apply(this, arguments)
	);
}
function Sh(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function we(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Sh(Object(r), !0).forEach(function (n) {
					Tt(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: Sh(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function bB(e, t) {
	if (!(e instanceof t))
		throw new TypeError('Cannot call a class as a function');
}
function Ah(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			'value' in n && (n.writable = !0),
			Object.defineProperty(e, kv(n.key), n);
	}
}
function xB(e, t, r) {
	return (
		t && Ah(e.prototype, t),
		r && Ah(e, r),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		e
	);
}
function wB(e, t, r) {
	return (
		(t = sa(t)),
		OB(
			e,
			Cv()
				? Reflect.construct(t, r || [], sa(e).constructor)
				: t.apply(e, r),
		)
	);
}
function OB(e, t) {
	if (t && (Or(t) === 'object' || typeof t == 'function')) return t;
	if (t !== void 0)
		throw new TypeError(
			'Derived constructors may only return object or undefined',
		);
	return Qr(e);
}
function Cv() {
	try {
		var e = !Boolean.prototype.valueOf.call(
			Reflect.construct(Boolean, [], function () {}),
		);
	} catch {}
	return (Cv = function () {
		return !!e;
	})();
}
function sa(e) {
	return (
		(sa = Object.setPrototypeOf
			? Object.getPrototypeOf.bind()
			: function (r) {
					return r.__proto__ || Object.getPrototypeOf(r);
				}),
		sa(e)
	);
}
function Qr(e) {
	if (e === void 0)
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called",
		);
	return e;
}
function SB(e, t) {
	if (typeof t != 'function' && t !== null)
		throw new TypeError(
			'Super expression must either be null or a function',
		);
	(e.prototype = Object.create(t && t.prototype, {
		constructor: { value: e, writable: !0, configurable: !0 },
	})),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		t && Bu(e, t);
}
function Bu(e, t) {
	return (
		(Bu = Object.setPrototypeOf
			? Object.setPrototypeOf.bind()
			: function (n, i) {
					return (n.__proto__ = i), n;
				}),
		Bu(e, t)
	);
}
function Tt(e, t, r) {
	return (
		(t = kv(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function kv(e) {
	var t = AB(e, 'string');
	return Or(t) == 'symbol' ? t : String(t);
}
function AB(e, t) {
	if (Or(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (Or(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var ti = (function (e) {
	SB(t, e);
	function t() {
		var r;
		bB(this, t);
		for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
			i[a] = arguments[a];
		return (
			(r = wB(this, t, [].concat(i))),
			Tt(Qr(r), 'state', { isAnimationFinished: !1 }),
			Tt(Qr(r), 'id', Yn('recharts-bar-')),
			Tt(Qr(r), 'handleAnimationEnd', function () {
				var o = r.props.onAnimationEnd;
				r.setState({ isAnimationFinished: !0 }), o && o();
			}),
			Tt(Qr(r), 'handleAnimationStart', function () {
				var o = r.props.onAnimationStart;
				r.setState({ isAnimationFinished: !1 }), o && o();
			}),
			r
		);
	}
	return (
		xB(
			t,
			[
				{
					key: 'renderRectanglesStatically',
					value: function (n) {
						var i = this,
							a = this.props,
							o = a.shape,
							u = a.dataKey,
							s = a.activeIndex,
							c = a.activeBar,
							f = J(this.props, !1);
						return (
							n &&
							n.map(function (l, h) {
								var p = h === s,
									y = p ? c : o,
									v = we(
										we(we({}, f), l),
										{},
										{
											isActive: p,
											option: y,
											index: h,
											dataKey: u,
											onAnimationStart:
												i.handleAnimationStart,
											onAnimationEnd:
												i.handleAnimationEnd,
										},
									);
								return _.createElement(
									pe,
									ua(
										{ className: 'recharts-bar-rectangle' },
										Oi(i.props, l, h),
										{
											key: 'rectangle-'
												.concat(
													l == null ? void 0 : l.x,
													'-',
												)
												.concat(
													l == null ? void 0 : l.y,
													'-',
												)
												.concat(
													l == null
														? void 0
														: l.value,
												),
										},
									),
									_.createElement(Oh, v),
								);
							})
						);
					},
				},
				{
					key: 'renderRectanglesWithAnimation',
					value: function () {
						var n = this,
							i = this.props,
							a = i.data,
							o = i.layout,
							u = i.isAnimationActive,
							s = i.animationBegin,
							c = i.animationDuration,
							f = i.animationEasing,
							l = i.animationId,
							h = this.state.prevData;
						return _.createElement(
							wt,
							{
								begin: s,
								duration: c,
								isActive: u,
								easing: f,
								from: { t: 0 },
								to: { t: 1 },
								key: 'bar-'.concat(l),
								onAnimationEnd: this.handleAnimationEnd,
								onAnimationStart: this.handleAnimationStart,
							},
							function (p) {
								var y = p.t,
									v = a.map(function (d, w) {
										var b = h && h[w];
										if (b) {
											var x = He(b.x, d.x),
												m = He(b.y, d.y),
												g = He(b.width, d.width),
												O = He(b.height, d.height);
											return we(
												we({}, d),
												{},
												{
													x: x(y),
													y: m(y),
													width: g(y),
													height: O(y),
												},
											);
										}
										if (o === 'horizontal') {
											var S = He(0, d.height),
												A = S(y);
											return we(
												we({}, d),
												{},
												{
													y: d.y + d.height - A,
													height: A,
												},
											);
										}
										var E = He(0, d.width),
											T = E(y);
										return we(we({}, d), {}, { width: T });
									});
								return _.createElement(
									pe,
									null,
									n.renderRectanglesStatically(v),
								);
							},
						);
					},
				},
				{
					key: 'renderRectangles',
					value: function () {
						var n = this.props,
							i = n.data,
							a = n.isAnimationActive,
							o = this.state.prevData;
						return a && i && i.length && (!o || !wn(o, i))
							? this.renderRectanglesWithAnimation()
							: this.renderRectanglesStatically(i);
					},
				},
				{
					key: 'renderBackground',
					value: function () {
						var n = this,
							i = this.props,
							a = i.data,
							o = i.dataKey,
							u = i.activeIndex,
							s = J(this.props.background, !1);
						return a.map(function (c, f) {
							c.value;
							var l = c.background,
								h = mB(c, yB);
							if (!l) return null;
							var p = we(
								we(
									we(
										we(we({}, h), {}, { fill: '#eee' }, l),
										s,
									),
									Oi(n.props, c, f),
								),
								{},
								{
									onAnimationStart: n.handleAnimationStart,
									onAnimationEnd: n.handleAnimationEnd,
									dataKey: o,
									index: f,
									key: 'background-bar-'.concat(f),
									className:
										'recharts-bar-background-rectangle',
								},
							);
							return _.createElement(
								Oh,
								ua(
									{
										option: n.props.background,
										isActive: f === u,
									},
									p,
								),
							);
						});
					},
				},
				{
					key: 'renderErrorBar',
					value: function (n, i) {
						if (
							this.props.isAnimationActive &&
							!this.state.isAnimationFinished
						)
							return null;
						var a = this.props,
							o = a.data,
							u = a.xAxis,
							s = a.yAxis,
							c = a.layout,
							f = a.children,
							l = tt(f, qa);
						if (!l) return null;
						var h =
								c === 'vertical'
									? o[0].height / 2
									: o[0].width / 2,
							p = function (d, w) {
								var b = Array.isArray(d.value)
									? d.value[1]
									: d.value;
								return {
									x: d.x,
									y: d.y,
									value: b,
									errorVal: Fe(d, w),
								};
							},
							y = {
								clipPath: n
									? 'url(#clipPath-'.concat(i, ')')
									: null,
							};
						return _.createElement(
							pe,
							y,
							l.map(function (v) {
								return _.cloneElement(v, {
									key: 'error-bar-'
										.concat(i, '-')
										.concat(v.props.dataKey),
									data: o,
									xAxis: u,
									yAxis: s,
									layout: c,
									offset: h,
									dataPointFormatter: p,
								});
							}),
						);
					},
				},
				{
					key: 'render',
					value: function () {
						var n = this.props,
							i = n.hide,
							a = n.data,
							o = n.className,
							u = n.xAxis,
							s = n.yAxis,
							c = n.left,
							f = n.top,
							l = n.width,
							h = n.height,
							p = n.isAnimationActive,
							y = n.background,
							v = n.id;
						if (i || !a || !a.length) return null;
						var d = this.state.isAnimationFinished,
							w = ne('recharts-bar', o),
							b = u && u.allowDataOverflow,
							x = s && s.allowDataOverflow,
							m = b || x,
							g = ee(v) ? this.id : v;
						return _.createElement(
							pe,
							{ className: w },
							b || x
								? _.createElement(
										'defs',
										null,
										_.createElement(
											'clipPath',
											{ id: 'clipPath-'.concat(g) },
											_.createElement('rect', {
												x: b ? c : c - l / 2,
												y: x ? f : f - h / 2,
												width: b ? l : l * 2,
												height: x ? h : h * 2,
											}),
										),
									)
								: null,
							_.createElement(
								pe,
								{
									className: 'recharts-bar-rectangles',
									clipPath: m
										? 'url(#clipPath-'.concat(g, ')')
										: null,
								},
								y ? this.renderBackground() : null,
								this.renderRectangles(),
							),
							this.renderErrorBar(m, g),
							(!p || d) && jt.renderCallByParent(this.props, a),
						);
					},
				},
			],
			[
				{
					key: 'getDerivedStateFromProps',
					value: function (n, i) {
						return n.animationId !== i.prevAnimationId
							? {
									prevAnimationId: n.animationId,
									curData: n.data,
									prevData: i.curData,
								}
							: n.data !== i.curData
								? { curData: n.data }
								: null;
					},
				},
			],
		),
		t
	);
})(D.PureComponent);
Mv = ti;
Tt(ti, 'displayName', 'Bar');
Tt(ti, 'defaultProps', {
	xAxisId: 0,
	yAxisId: 0,
	legendType: 'rect',
	minPointSize: 0,
	hide: !1,
	data: [],
	layout: 'vertical',
	activeBar: !1,
	isAnimationActive: !yt.isSsr,
	animationBegin: 0,
	animationDuration: 400,
	animationEasing: 'ease',
});
Tt(ti, 'getComposedData', function (e) {
	var t = e.props,
		r = e.item,
		n = e.barPosition,
		i = e.bandSize,
		a = e.xAxis,
		o = e.yAxis,
		u = e.xAxisTicks,
		s = e.yAxisTicks,
		c = e.stackedData,
		f = e.dataStartIndex,
		l = e.displayedData,
		h = e.offset,
		p = lk(n, r);
	if (!p) return null;
	var y = t.layout,
		v = r.props,
		d = v.dataKey,
		w = v.children,
		b = v.minPointSize,
		x = y === 'horizontal' ? o : a,
		m = c ? x.scale.domain() : null,
		g = gk({ numericAxis: x }),
		O = tt(w, ld),
		S = l.map(function (A, E) {
			var T, P, $, j, M, B;
			c
				? (T = fk(c[f + E], m))
				: ((T = Fe(A, d)), Array.isArray(T) || (T = [g, T]));
			var I = vB(b, Mv.defaultProps.minPointSize)(T[1], E);
			if (y === 'horizontal') {
				var L,
					R = [o.scale(T[0]), o.scale(T[1])],
					z = R[0],
					K = R[1];
				(P = Sf({
					axis: a,
					ticks: u,
					bandSize: i,
					offset: p.offset,
					entry: A,
					index: E,
				})),
					($ = (L = K ?? z) !== null && L !== void 0 ? L : void 0),
					(j = p.size);
				var V = z - K;
				if (
					((M = Number.isNaN(V) ? 0 : V),
					(B = { x: P, y: o.y, width: j, height: o.height }),
					Math.abs(I) > 0 && Math.abs(M) < Math.abs(I))
				) {
					var q = et(M || I) * (Math.abs(I) - Math.abs(M));
					($ -= q), (M += q);
				}
			} else {
				var Q = [a.scale(T[0]), a.scale(T[1])],
					_e = Q[0],
					Ce = Q[1];
				if (
					((P = _e),
					($ = Sf({
						axis: o,
						ticks: s,
						bandSize: i,
						offset: p.offset,
						entry: A,
						index: E,
					})),
					(j = Ce - _e),
					(M = p.size),
					(B = { x: a.x, y: $, width: a.width, height: M }),
					Math.abs(I) > 0 && Math.abs(j) < Math.abs(I))
				) {
					var Dt = et(j || I) * (Math.abs(I) - Math.abs(j));
					j += Dt;
				}
			}
			return we(
				we(
					we({}, A),
					{},
					{
						x: P,
						y: $,
						width: j,
						height: M,
						value: c ? T : T[1],
						payload: A,
						background: B,
					},
					O && O[E] && O[E].props,
				),
				{},
				{
					tooltipPayload: [hv(r, A)],
					tooltipPosition: { x: P + j / 2, y: $ + M / 2 },
				},
			);
		});
	return we({ data: S, layout: y }, h);
});
function Wn(e) {
	'@babel/helpers - typeof';
	return (
		(Wn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Wn(e)
	);
}
function _B(e, t) {
	if (!(e instanceof t))
		throw new TypeError('Cannot call a class as a function');
}
function _h(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			'value' in n && (n.writable = !0),
			Object.defineProperty(e, Iv(n.key), n);
	}
}
function PB(e, t, r) {
	return (
		t && _h(e.prototype, t),
		r && _h(e, r),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		e
	);
}
function Ph(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Je(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Ph(Object(r), !0).forEach(function (n) {
					Ga(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: Ph(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function Ga(e, t, r) {
	return (
		(t = Iv(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function Iv(e) {
	var t = $B(e, 'string');
	return Wn(t) == 'symbol' ? t : String(t);
}
function $B(e, t) {
	if (Wn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (Wn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var TB = function (t, r, n, i, a) {
		var o = t.width,
			u = t.height,
			s = t.layout,
			c = t.children,
			f = Object.keys(r),
			l = {
				left: n.left,
				leftMirror: n.left,
				right: o - n.right,
				rightMirror: o - n.right,
				top: n.top,
				topMirror: n.top,
				bottom: u - n.bottom,
				bottomMirror: u - n.bottom,
			},
			h = !!Le(c, ti);
		return f.reduce(function (p, y) {
			var v = r[y],
				d = v.orientation,
				w = v.domain,
				b = v.padding,
				x = b === void 0 ? {} : b,
				m = v.mirror,
				g = v.reversed,
				O = ''.concat(d).concat(m ? 'Mirror' : ''),
				S,
				A,
				E,
				T,
				P;
			if (
				v.type === 'number' &&
				(v.padding === 'gap' || v.padding === 'no-gap')
			) {
				var $ = w[1] - w[0],
					j = 1 / 0,
					M = v.categoricalDomain.sort();
				if (
					(M.forEach(function (_e, Ce) {
						Ce > 0 &&
							(j = Math.min((_e || 0) - (M[Ce - 1] || 0), j));
					}),
					Number.isFinite(j))
				) {
					var B = j / $,
						I = v.layout === 'vertical' ? n.height : n.width;
					if (
						(v.padding === 'gap' && (S = (B * I) / 2),
						v.padding === 'no-gap')
					) {
						var L = Zt(t.barCategoryGap, B * I),
							R = (B * I) / 2;
						S = R - L - ((R - L) / I) * L;
					}
				}
			}
			i === 'xAxis'
				? (A = [
						n.left + (x.left || 0) + (S || 0),
						n.left + n.width - (x.right || 0) - (S || 0),
					])
				: i === 'yAxis'
					? (A =
							s === 'horizontal'
								? [
										n.top + n.height - (x.bottom || 0),
										n.top + (x.top || 0),
									]
								: [
										n.top + (x.top || 0) + (S || 0),
										n.top +
											n.height -
											(x.bottom || 0) -
											(S || 0),
									])
					: (A = v.range),
				g && (A = [A[1], A[0]]);
			var z = sk(v, a, h),
				K = z.scale,
				V = z.realScaleType;
			K.domain(w).range(A), ck(K);
			var q = mk(K, Je(Je({}, v), {}, { realScaleType: V }));
			i === 'xAxis'
				? ((P = (d === 'top' && !m) || (d === 'bottom' && m)),
					(E = n.left),
					(T = l[O] - P * v.height))
				: i === 'yAxis' &&
					((P = (d === 'left' && !m) || (d === 'right' && m)),
					(E = l[O] - P * v.width),
					(T = n.top));
			var Q = Je(
				Je(Je({}, v), q),
				{},
				{
					realScaleType: V,
					x: E,
					y: T,
					scale: K,
					width: i === 'xAxis' ? n.width : v.width,
					height: i === 'yAxis' ? n.height : v.height,
				},
			);
			return (
				(Q.bandSize = Vi(Q, q)),
				!v.hide && i === 'xAxis'
					? (l[O] += (P ? -1 : 1) * Q.height)
					: v.hide || (l[O] += (P ? -1 : 1) * Q.width),
				Je(Je({}, p), {}, Ga({}, y, Q))
			);
		}, {});
	},
	Nv = function (t, r) {
		var n = t.x,
			i = t.y,
			a = r.x,
			o = r.y;
		return {
			x: Math.min(n, a),
			y: Math.min(i, o),
			width: Math.abs(a - n),
			height: Math.abs(o - i),
		};
	},
	EB = function (t) {
		var r = t.x1,
			n = t.y1,
			i = t.x2,
			a = t.y2;
		return Nv({ x: r, y: n }, { x: i, y: a });
	},
	Dv = (function () {
		function e(t) {
			_B(this, e), (this.scale = t);
		}
		return (
			PB(
				e,
				[
					{
						key: 'domain',
						get: function () {
							return this.scale.domain;
						},
					},
					{
						key: 'range',
						get: function () {
							return this.scale.range;
						},
					},
					{
						key: 'rangeMin',
						get: function () {
							return this.range()[0];
						},
					},
					{
						key: 'rangeMax',
						get: function () {
							return this.range()[1];
						},
					},
					{
						key: 'bandwidth',
						get: function () {
							return this.scale.bandwidth;
						},
					},
					{
						key: 'apply',
						value: function (r) {
							var n =
									arguments.length > 1 &&
									arguments[1] !== void 0
										? arguments[1]
										: {},
								i = n.bandAware,
								a = n.position;
							if (r !== void 0) {
								if (a)
									switch (a) {
										case 'start':
											return this.scale(r);
										case 'middle': {
											var o = this.bandwidth
												? this.bandwidth() / 2
												: 0;
											return this.scale(r) + o;
										}
										case 'end': {
											var u = this.bandwidth
												? this.bandwidth()
												: 0;
											return this.scale(r) + u;
										}
										default:
											return this.scale(r);
									}
								if (i) {
									var s = this.bandwidth
										? this.bandwidth() / 2
										: 0;
									return this.scale(r) + s;
								}
								return this.scale(r);
							}
						},
					},
					{
						key: 'isInRange',
						value: function (r) {
							var n = this.range(),
								i = n[0],
								a = n[n.length - 1];
							return i <= a ? r >= i && r <= a : r >= a && r <= i;
						},
					},
				],
				[
					{
						key: 'create',
						value: function (r) {
							return new e(r);
						},
					},
				],
			),
			e
		);
	})();
Ga(Dv, 'EPS', 1e-4);
var Ys = function (t) {
	var r = Object.keys(t).reduce(function (n, i) {
		return Je(Je({}, n), {}, Ga({}, i, Dv.create(t[i])));
	}, {});
	return Je(
		Je({}, r),
		{},
		{
			apply: function (i) {
				var a =
						arguments.length > 1 && arguments[1] !== void 0
							? arguments[1]
							: {},
					o = a.bandAware,
					u = a.position;
				return XD(i, function (s, c) {
					return r[c].apply(s, { bandAware: o, position: u });
				});
			},
			isInRange: function (i) {
				return uB(i, function (a, o) {
					return r[o].isInRange(a);
				});
			},
		},
	);
};
function jB(e) {
	return ((e % 180) + 180) % 180;
}
var MB = function (t) {
		var r = t.width,
			n = t.height,
			i =
				arguments.length > 1 && arguments[1] !== void 0
					? arguments[1]
					: 0,
			a = jB(i),
			o = (a * Math.PI) / 180,
			u = Math.atan(n / r),
			s = o > u && o < Math.PI - u ? n / Math.sin(o) : r / Math.cos(o);
		return Math.abs(s);
	},
	CB = Qg(
		function (e) {
			return { x: e.left, y: e.top, width: e.width, height: e.height };
		},
		function (e) {
			return ['l', e.left, 't', e.top, 'w', e.width, 'h', e.height].join(
				'',
			);
		},
	),
	Bv = D.createContext(void 0),
	Lv = D.createContext(void 0),
	Rv = D.createContext(void 0),
	kB = D.createContext({}),
	Fv = D.createContext(void 0),
	Wv = D.createContext(0),
	Uv = D.createContext(0),
	$h = function (t) {
		var r = t.state,
			n = r.xAxisMap,
			i = r.yAxisMap,
			a = r.offset,
			o = t.clipPathId,
			u = t.children,
			s = t.width,
			c = t.height,
			f = CB(a);
		return _.createElement(
			Bv.Provider,
			{ value: n },
			_.createElement(
				Lv.Provider,
				{ value: i },
				_.createElement(
					kB.Provider,
					{ value: a },
					_.createElement(
						Rv.Provider,
						{ value: f },
						_.createElement(
							Fv.Provider,
							{ value: o },
							_.createElement(
								Wv.Provider,
								{ value: c },
								_.createElement(Uv.Provider, { value: s }, u),
							),
						),
					),
				),
			),
		);
	},
	IB = function () {
		return D.useContext(Fv);
	},
	zv = function (t) {
		var r = D.useContext(Bv);
		r == null && Qt();
		var n = r[t];
		return n == null && Qt(), n;
	},
	qv = function (t) {
		var r = D.useContext(Lv);
		r == null && Qt();
		var n = r[t];
		return n == null && Qt(), n;
	},
	NB = function () {
		var t = D.useContext(Rv);
		return t;
	},
	Hv = function () {
		return D.useContext(Uv);
	},
	Kv = function () {
		return D.useContext(Wv);
	};
function Un(e) {
	'@babel/helpers - typeof';
	return (
		(Un =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Un(e)
	);
}
function Th(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Eh(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Th(Object(r), !0).forEach(function (n) {
					DB(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: Th(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function DB(e, t, r) {
	return (
		(t = BB(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function BB(e) {
	var t = LB(e, 'string');
	return Un(t) == 'symbol' ? t : String(t);
}
function LB(e, t) {
	if (Un(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (Un(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
function RB(e, t) {
	return zB(e) || UB(e, t) || WB(e, t) || FB();
}
function FB() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function WB(e, t) {
	if (e) {
		if (typeof e == 'string') return jh(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return jh(e, t);
	}
}
function jh(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function UB(e, t) {
	var r =
		e == null
			? null
			: (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			s = !0,
			c = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (
					;
					!(s = (n = a.call(r)).done) &&
					(u.push(n.value), u.length !== t);
					s = !0
				);
		} catch (f) {
			(c = !0), (i = f);
		} finally {
			try {
				if (
					!s &&
					r.return != null &&
					((o = r.return()), Object(o) !== o)
				)
					return;
			} finally {
				if (c) throw i;
			}
		}
		return u;
	}
}
function zB(e) {
	if (Array.isArray(e)) return e;
}
function Lu() {
	return (
		(Lu = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		Lu.apply(this, arguments)
	);
}
var qB = function (t, r) {
		var n;
		return (
			_.isValidElement(t)
				? (n = _.cloneElement(t, r))
				: Z(t)
					? (n = t(r))
					: (n = _.createElement(
							'line',
							Lu({}, r, {
								className: 'recharts-reference-line-line',
							}),
						)),
			n
		);
	},
	HB = function (t, r, n, i, a, o, u, s, c) {
		var f = a.x,
			l = a.y,
			h = a.width,
			p = a.height;
		if (n) {
			var y = c.y,
				v = t.y.apply(y, { position: o });
			if (st(c, 'discard') && !t.y.isInRange(v)) return null;
			var d = [
				{ x: f + h, y: v },
				{ x: f, y: v },
			];
			return s === 'left' ? d.reverse() : d;
		}
		if (r) {
			var w = c.x,
				b = t.x.apply(w, { position: o });
			if (st(c, 'discard') && !t.x.isInRange(b)) return null;
			var x = [
				{ x: b, y: l + p },
				{ x: b, y: l },
			];
			return u === 'top' ? x.reverse() : x;
		}
		if (i) {
			var m = c.segment,
				g = m.map(function (O) {
					return t.apply(O, { position: o });
				});
			return st(c, 'discard') &&
				FD(g, function (O) {
					return !t.isInRange(O);
				})
				? null
				: g;
		}
		return null;
	};
function Zs(e) {
	var t = e.x,
		r = e.y,
		n = e.segment,
		i = e.xAxisId,
		a = e.yAxisId,
		o = e.shape,
		u = e.className,
		s = e.alwaysShow,
		c = IB(),
		f = zv(i),
		l = qv(a),
		h = NB();
	if (!c || !h) return null;
	Xt(
		s === void 0,
		'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.',
	);
	var p = Ys({ x: f.scale, y: l.scale }),
		y = be(t),
		v = be(r),
		d = n && n.length === 2,
		w = HB(p, y, v, d, h, e.position, f.orientation, l.orientation, e);
	if (!w) return null;
	var b = RB(w, 2),
		x = b[0],
		m = x.x,
		g = x.y,
		O = b[1],
		S = O.x,
		A = O.y,
		E = st(e, 'hidden') ? 'url(#'.concat(c, ')') : void 0,
		T = Eh(
			Eh({ clipPath: E }, J(e, !0)),
			{},
			{ x1: m, y1: g, x2: S, y2: A },
		);
	return _.createElement(
		pe,
		{ className: ne('recharts-reference-line', u) },
		qB(o, T),
		Ee.renderCallByParent(e, EB({ x1: m, y1: g, x2: S, y2: A })),
	);
}
Zs.displayName = 'ReferenceLine';
Zs.defaultProps = {
	isFront: !1,
	ifOverflow: 'discard',
	xAxisId: 0,
	yAxisId: 0,
	fill: 'none',
	stroke: '#ccc',
	fillOpacity: 1,
	strokeWidth: 1,
	position: 'middle',
};
function zn(e) {
	'@babel/helpers - typeof';
	return (
		(zn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		zn(e)
	);
}
function Ru() {
	return (
		(Ru = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		Ru.apply(this, arguments)
	);
}
function Mh(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Ch(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Mh(Object(r), !0).forEach(function (n) {
					KB(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: Mh(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function KB(e, t, r) {
	return (
		(t = GB(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function GB(e) {
	var t = XB(e, 'string');
	return zn(t) == 'symbol' ? t : String(t);
}
function XB(e, t) {
	if (zn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (zn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var VB = function (t) {
	var r = t.x,
		n = t.y,
		i = t.xAxis,
		a = t.yAxis,
		o = Ys({ x: i.scale, y: a.scale }),
		u = o.apply({ x: r, y: n }, { bandAware: !0 });
	return st(t, 'discard') && !o.isInRange(u) ? null : u;
};
function ri(e) {
	var t = e.x,
		r = e.y,
		n = e.r,
		i = e.alwaysShow,
		a = e.clipPathId,
		o = be(t),
		u = be(r);
	if (
		(Xt(
			i === void 0,
			'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.',
		),
		!o || !u)
	)
		return null;
	var s = VB(e);
	if (!s) return null;
	var c = s.x,
		f = s.y,
		l = e.shape,
		h = e.className,
		p = st(e, 'hidden') ? 'url(#'.concat(a, ')') : void 0,
		y = Ch(Ch({ clipPath: p }, J(e, !0)), {}, { cx: c, cy: f });
	return _.createElement(
		pe,
		{ className: ne('recharts-reference-dot', h) },
		ri.renderDot(l, y),
		Ee.renderCallByParent(e, {
			x: c - n,
			y: f - n,
			width: 2 * n,
			height: 2 * n,
		}),
	);
}
ri.displayName = 'ReferenceDot';
ri.defaultProps = {
	isFront: !1,
	ifOverflow: 'discard',
	xAxisId: 0,
	yAxisId: 0,
	r: 10,
	fill: '#fff',
	stroke: '#ccc',
	fillOpacity: 1,
	strokeWidth: 1,
};
ri.renderDot = function (e, t) {
	var r;
	return (
		_.isValidElement(e)
			? (r = _.cloneElement(e, t))
			: Z(e)
				? (r = e(t))
				: (r = _.createElement(
						Vs,
						Ru({}, t, {
							cx: t.cx,
							cy: t.cy,
							className: 'recharts-reference-dot-dot',
						}),
					)),
		r
	);
};
function qn(e) {
	'@babel/helpers - typeof';
	return (
		(qn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		qn(e)
	);
}
function Fu() {
	return (
		(Fu = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		Fu.apply(this, arguments)
	);
}
function kh(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Ih(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? kh(Object(r), !0).forEach(function (n) {
					YB(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: kh(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function YB(e, t, r) {
	return (
		(t = ZB(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function ZB(e) {
	var t = JB(e, 'string');
	return qn(t) == 'symbol' ? t : String(t);
}
function JB(e, t) {
	if (qn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (qn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var QB = function (t, r, n, i, a) {
	var o = a.x1,
		u = a.x2,
		s = a.y1,
		c = a.y2,
		f = a.xAxis,
		l = a.yAxis;
	if (!f || !l) return null;
	var h = Ys({ x: f.scale, y: l.scale }),
		p = {
			x: t ? h.x.apply(o, { position: 'start' }) : h.x.rangeMin,
			y: n ? h.y.apply(s, { position: 'start' }) : h.y.rangeMin,
		},
		y = {
			x: r ? h.x.apply(u, { position: 'end' }) : h.x.rangeMax,
			y: i ? h.y.apply(c, { position: 'end' }) : h.y.rangeMax,
		};
	return st(a, 'discard') && (!h.isInRange(p) || !h.isInRange(y))
		? null
		: Nv(p, y);
};
function ni(e) {
	var t = e.x1,
		r = e.x2,
		n = e.y1,
		i = e.y2,
		a = e.className,
		o = e.alwaysShow,
		u = e.clipPathId;
	Xt(
		o === void 0,
		'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.',
	);
	var s = be(t),
		c = be(r),
		f = be(n),
		l = be(i),
		h = e.shape;
	if (!s && !c && !f && !l && !h) return null;
	var p = QB(s, c, f, l, e);
	if (!p && !h) return null;
	var y = st(e, 'hidden') ? 'url(#'.concat(u, ')') : void 0;
	return _.createElement(
		pe,
		{ className: ne('recharts-reference-area', a) },
		ni.renderRect(h, Ih(Ih({ clipPath: y }, J(e, !0)), p)),
		Ee.renderCallByParent(e, p),
	);
}
ni.displayName = 'ReferenceArea';
ni.defaultProps = {
	isFront: !1,
	ifOverflow: 'discard',
	xAxisId: 0,
	yAxisId: 0,
	r: 10,
	fill: '#ccc',
	fillOpacity: 0.5,
	stroke: 'none',
	strokeWidth: 1,
};
ni.renderRect = function (e, t) {
	var r;
	return (
		_.isValidElement(e)
			? (r = _.cloneElement(e, t))
			: Z(e)
				? (r = e(t))
				: (r = _.createElement(
						Xs,
						Fu({}, t, {
							className: 'recharts-reference-area-rect',
						}),
					)),
		r
	);
};
function Gv(e, t, r) {
	if (t < 1) return [];
	if (t === 1 && r === void 0) return e;
	for (var n = [], i = 0; i < e.length; i += t) n.push(e[i]);
	return n;
}
function eL(e, t, r) {
	var n = { width: e.width + t.width, height: e.height + t.height };
	return MB(n, r);
}
function tL(e, t, r) {
	var n = r === 'width',
		i = e.x,
		a = e.y,
		o = e.width,
		u = e.height;
	return t === 1
		? { start: n ? i : a, end: n ? i + o : a + u }
		: { start: n ? i + o : a + u, end: n ? i : a };
}
function ca(e, t, r, n, i) {
	if (e * t < e * n || e * t > e * i) return !1;
	var a = r();
	return e * (t - (e * a) / 2 - n) >= 0 && e * (t + (e * a) / 2 - i) <= 0;
}
function rL(e, t) {
	return Gv(e, t + 1);
}
function nL(e, t, r, n, i) {
	for (
		var a = (n || []).slice(),
			o = t.start,
			u = t.end,
			s = 0,
			c = 1,
			f = o,
			l = function () {
				var y = n == null ? void 0 : n[s];
				if (y === void 0) return { v: Gv(n, c) };
				var v = s,
					d,
					w = function () {
						return d === void 0 && (d = r(y, v)), d;
					},
					b = y.coordinate,
					x = s === 0 || ca(e, b, w, f, u);
				x || ((s = 0), (f = o), (c += 1)),
					x && ((f = b + e * (w() / 2 + i)), (s += c));
			},
			h;
		c <= a.length;

	)
		if (((h = l()), h)) return h.v;
	return [];
}
function Hn(e) {
	'@babel/helpers - typeof';
	return (
		(Hn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Hn(e)
	);
}
function Nh(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function Te(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Nh(Object(r), !0).forEach(function (n) {
					iL(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: Nh(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function iL(e, t, r) {
	return (
		(t = aL(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function aL(e) {
	var t = oL(e, 'string');
	return Hn(t) == 'symbol' ? t : String(t);
}
function oL(e, t) {
	if (Hn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (Hn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
function uL(e, t, r, n, i) {
	for (
		var a = (n || []).slice(),
			o = a.length,
			u = t.start,
			s = t.end,
			c = function (h) {
				var p = a[h],
					y,
					v = function () {
						return y === void 0 && (y = r(p, h)), y;
					};
				if (h === o - 1) {
					var d = e * (p.coordinate + (e * v()) / 2 - s);
					a[h] = p = Te(
						Te({}, p),
						{},
						{
							tickCoord:
								d > 0 ? p.coordinate - d * e : p.coordinate,
						},
					);
				} else
					a[h] = p = Te(Te({}, p), {}, { tickCoord: p.coordinate });
				var w = ca(e, p.tickCoord, v, u, s);
				w &&
					((s = p.tickCoord - e * (v() / 2 + i)),
					(a[h] = Te(Te({}, p), {}, { isShow: !0 })));
			},
			f = o - 1;
		f >= 0;
		f--
	)
		c(f);
	return a;
}
function sL(e, t, r, n, i, a) {
	var o = (n || []).slice(),
		u = o.length,
		s = t.start,
		c = t.end;
	if (a) {
		var f = n[u - 1],
			l = r(f, u - 1),
			h = e * (f.coordinate + (e * l) / 2 - c);
		o[u - 1] = f = Te(
			Te({}, f),
			{},
			{ tickCoord: h > 0 ? f.coordinate - h * e : f.coordinate },
		);
		var p = ca(
			e,
			f.tickCoord,
			function () {
				return l;
			},
			s,
			c,
		);
		p &&
			((c = f.tickCoord - e * (l / 2 + i)),
			(o[u - 1] = Te(Te({}, f), {}, { isShow: !0 })));
	}
	for (
		var y = a ? u - 1 : u,
			v = function (b) {
				var x = o[b],
					m,
					g = function () {
						return m === void 0 && (m = r(x, b)), m;
					};
				if (b === 0) {
					var O = e * (x.coordinate - (e * g()) / 2 - s);
					o[b] = x = Te(
						Te({}, x),
						{},
						{
							tickCoord:
								O < 0 ? x.coordinate - O * e : x.coordinate,
						},
					);
				} else
					o[b] = x = Te(Te({}, x), {}, { tickCoord: x.coordinate });
				var S = ca(e, x.tickCoord, g, s, c);
				S &&
					((s = x.tickCoord + e * (g() / 2 + i)),
					(o[b] = Te(Te({}, x), {}, { isShow: !0 })));
			},
			d = 0;
		d < y;
		d++
	)
		v(d);
	return o;
}
function cL(e, t, r) {
	var n = e.tick,
		i = e.ticks,
		a = e.viewBox,
		o = e.minTickGap,
		u = e.orientation,
		s = e.interval,
		c = e.tickFormatter,
		f = e.unit,
		l = e.angle;
	if (!i || !i.length || !n) return [];
	if (F(s) || yt.isSsr) return rL(i, typeof s == 'number' && F(s) ? s : 0);
	var h = [],
		p = u === 'top' || u === 'bottom' ? 'width' : 'height',
		y =
			f && p === 'width'
				? tn(f, { fontSize: t, letterSpacing: r })
				: { width: 0, height: 0 },
		v = function (x, m) {
			var g = Z(c) ? c(x.value, m) : x.value;
			return p === 'width'
				? eL(tn(g, { fontSize: t, letterSpacing: r }), y, l)
				: tn(g, { fontSize: t, letterSpacing: r })[p];
		},
		d = i.length >= 2 ? et(i[1].coordinate - i[0].coordinate) : 1,
		w = tL(a, d, p);
	return s === 'equidistantPreserveStart'
		? nL(d, w, v, i, o)
		: (s === 'preserveStart' || s === 'preserveStartEnd'
				? (h = sL(d, w, v, i, o, s === 'preserveStartEnd'))
				: (h = uL(d, w, v, i, o)),
			h.filter(function (b) {
				return b.isShow;
			}));
}
var lL = ['viewBox'],
	fL = ['viewBox'],
	hL = ['ticks'];
function Sr(e) {
	'@babel/helpers - typeof';
	return (
		(Sr =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Sr(e)
	);
}
function ur() {
	return (
		(ur = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		ur.apply(this, arguments)
	);
}
function Dh(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function je(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Dh(Object(r), !0).forEach(function (n) {
					Js(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: Dh(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function Ao(e, t) {
	if (e == null) return {};
	var r = pL(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function pL(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
function dL(e, t) {
	if (!(e instanceof t))
		throw new TypeError('Cannot call a class as a function');
}
function Bh(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			'value' in n && (n.writable = !0),
			Object.defineProperty(e, Vv(n.key), n);
	}
}
function vL(e, t, r) {
	return (
		t && Bh(e.prototype, t),
		r && Bh(e, r),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		e
	);
}
function yL(e, t, r) {
	return (
		(t = la(t)),
		mL(
			e,
			Xv()
				? Reflect.construct(t, r || [], la(e).constructor)
				: t.apply(e, r),
		)
	);
}
function mL(e, t) {
	if (t && (Sr(t) === 'object' || typeof t == 'function')) return t;
	if (t !== void 0)
		throw new TypeError(
			'Derived constructors may only return object or undefined',
		);
	return gL(e);
}
function gL(e) {
	if (e === void 0)
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called",
		);
	return e;
}
function Xv() {
	try {
		var e = !Boolean.prototype.valueOf.call(
			Reflect.construct(Boolean, [], function () {}),
		);
	} catch {}
	return (Xv = function () {
		return !!e;
	})();
}
function la(e) {
	return (
		(la = Object.setPrototypeOf
			? Object.getPrototypeOf.bind()
			: function (r) {
					return r.__proto__ || Object.getPrototypeOf(r);
				}),
		la(e)
	);
}
function bL(e, t) {
	if (typeof t != 'function' && t !== null)
		throw new TypeError(
			'Super expression must either be null or a function',
		);
	(e.prototype = Object.create(t && t.prototype, {
		constructor: { value: e, writable: !0, configurable: !0 },
	})),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		t && Wu(e, t);
}
function Wu(e, t) {
	return (
		(Wu = Object.setPrototypeOf
			? Object.setPrototypeOf.bind()
			: function (n, i) {
					return (n.__proto__ = i), n;
				}),
		Wu(e, t)
	);
}
function Js(e, t, r) {
	return (
		(t = Vv(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function Vv(e) {
	var t = xL(e, 'string');
	return Sr(t) == 'symbol' ? t : String(t);
}
function xL(e, t) {
	if (Sr(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (Sr(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var Xa = (function (e) {
	bL(t, e);
	function t(r) {
		var n;
		return (
			dL(this, t),
			(n = yL(this, t, [r])),
			(n.state = { fontSize: '', letterSpacing: '' }),
			n
		);
	}
	return (
		vL(
			t,
			[
				{
					key: 'shouldComponentUpdate',
					value: function (n, i) {
						var a = n.viewBox,
							o = Ao(n, lL),
							u = this.props,
							s = u.viewBox,
							c = Ao(u, fL);
						return !sr(a, s) || !sr(o, c) || !sr(i, this.state);
					},
				},
				{
					key: 'componentDidMount',
					value: function () {
						var n = this.layerReference;
						if (n) {
							var i = n.getElementsByClassName(
								'recharts-cartesian-axis-tick-value',
							)[0];
							i &&
								this.setState({
									fontSize:
										window.getComputedStyle(i).fontSize,
									letterSpacing:
										window.getComputedStyle(i)
											.letterSpacing,
								});
						}
					},
				},
				{
					key: 'getTickLineCoord',
					value: function (n) {
						var i = this.props,
							a = i.x,
							o = i.y,
							u = i.width,
							s = i.height,
							c = i.orientation,
							f = i.tickSize,
							l = i.mirror,
							h = i.tickMargin,
							p,
							y,
							v,
							d,
							w,
							b,
							x = l ? -1 : 1,
							m = n.tickSize || f,
							g = F(n.tickCoord) ? n.tickCoord : n.coordinate;
						switch (c) {
							case 'top':
								(p = y = n.coordinate),
									(d = o + +!l * s),
									(v = d - x * m),
									(b = v - x * h),
									(w = g);
								break;
							case 'left':
								(v = d = n.coordinate),
									(y = a + +!l * u),
									(p = y - x * m),
									(w = p - x * h),
									(b = g);
								break;
							case 'right':
								(v = d = n.coordinate),
									(y = a + +l * u),
									(p = y + x * m),
									(w = p + x * h),
									(b = g);
								break;
							default:
								(p = y = n.coordinate),
									(d = o + +l * s),
									(v = d + x * m),
									(b = v + x * h),
									(w = g);
								break;
						}
						return {
							line: { x1: p, y1: v, x2: y, y2: d },
							tick: { x: w, y: b },
						};
					},
				},
				{
					key: 'getTickTextAnchor',
					value: function () {
						var n = this.props,
							i = n.orientation,
							a = n.mirror,
							o;
						switch (i) {
							case 'left':
								o = a ? 'start' : 'end';
								break;
							case 'right':
								o = a ? 'end' : 'start';
								break;
							default:
								o = 'middle';
								break;
						}
						return o;
					},
				},
				{
					key: 'getTickVerticalAnchor',
					value: function () {
						var n = this.props,
							i = n.orientation,
							a = n.mirror,
							o = 'end';
						switch (i) {
							case 'left':
							case 'right':
								o = 'middle';
								break;
							case 'top':
								o = a ? 'start' : 'end';
								break;
							default:
								o = a ? 'end' : 'start';
								break;
						}
						return o;
					},
				},
				{
					key: 'renderAxisLine',
					value: function () {
						var n = this.props,
							i = n.x,
							a = n.y,
							o = n.width,
							u = n.height,
							s = n.orientation,
							c = n.mirror,
							f = n.axisLine,
							l = je(
								je(je({}, J(this.props, !1)), J(f, !1)),
								{},
								{ fill: 'none' },
							);
						if (s === 'top' || s === 'bottom') {
							var h = +(
								(s === 'top' && !c) ||
								(s === 'bottom' && c)
							);
							l = je(
								je({}, l),
								{},
								{
									x1: i,
									y1: a + h * u,
									x2: i + o,
									y2: a + h * u,
								},
							);
						} else {
							var p = +(
								(s === 'left' && !c) ||
								(s === 'right' && c)
							);
							l = je(
								je({}, l),
								{},
								{
									x1: i + p * o,
									y1: a,
									x2: i + p * o,
									y2: a + u,
								},
							);
						}
						return _.createElement(
							'line',
							ur({}, l, {
								className: ne(
									'recharts-cartesian-axis-line',
									Xe(f, 'className'),
								),
							}),
						);
					},
				},
				{
					key: 'renderTicks',
					value: function (n, i, a) {
						var o = this,
							u = this.props,
							s = u.tickLine,
							c = u.stroke,
							f = u.tick,
							l = u.tickFormatter,
							h = u.unit,
							p = cL(
								je(je({}, this.props), {}, { ticks: n }),
								i,
								a,
							),
							y = this.getTickTextAnchor(),
							v = this.getTickVerticalAnchor(),
							d = J(this.props, !1),
							w = J(f, !1),
							b = je(je({}, d), {}, { fill: 'none' }, J(s, !1)),
							x = p.map(function (m, g) {
								var O = o.getTickLineCoord(m),
									S = O.line,
									A = O.tick,
									E = je(
										je(
											je(
												je(
													{
														textAnchor: y,
														verticalAnchor: v,
													},
													d,
												),
												{},
												{ stroke: 'none', fill: c },
												w,
											),
											A,
										),
										{},
										{
											index: g,
											payload: m,
											visibleTicksCount: p.length,
											tickFormatter: l,
										},
									);
								return _.createElement(
									pe,
									ur(
										{
											className:
												'recharts-cartesian-axis-tick',
											key: 'tick-'
												.concat(m.value, '-')
												.concat(m.coordinate, '-')
												.concat(m.tickCoord),
										},
										Oi(o.props, m, g),
									),
									s &&
										_.createElement(
											'line',
											ur({}, b, S, {
												className: ne(
													'recharts-cartesian-axis-tick-line',
													Xe(s, 'className'),
												),
											}),
										),
									f &&
										t.renderTickItem(
											f,
											E,
											''
												.concat(
													Z(l)
														? l(m.value, g)
														: m.value,
												)
												.concat(h || ''),
										),
								);
							});
						return _.createElement(
							'g',
							{ className: 'recharts-cartesian-axis-ticks' },
							x,
						);
					},
				},
				{
					key: 'render',
					value: function () {
						var n = this,
							i = this.props,
							a = i.axisLine,
							o = i.width,
							u = i.height,
							s = i.ticksGenerator,
							c = i.className,
							f = i.hide;
						if (f) return null;
						var l = this.props,
							h = l.ticks,
							p = Ao(l, hL),
							y = h;
						return (
							Z(s) &&
								(y = h && h.length > 0 ? s(this.props) : s(p)),
							o <= 0 || u <= 0 || !y || !y.length
								? null
								: _.createElement(
										pe,
										{
											className: ne(
												'recharts-cartesian-axis',
												c,
											),
											ref: function (d) {
												n.layerReference = d;
											},
										},
										a && this.renderAxisLine(),
										this.renderTicks(
											y,
											this.state.fontSize,
											this.state.letterSpacing,
										),
										Ee.renderCallByParent(this.props),
									)
						);
					},
				},
			],
			[
				{
					key: 'renderTickItem',
					value: function (n, i, a) {
						var o;
						return (
							_.isValidElement(n)
								? (o = _.cloneElement(n, i))
								: Z(n)
									? (o = n(i))
									: (o = _.createElement(
											Di,
											ur({}, i, {
												className:
													'recharts-cartesian-axis-tick-value',
											}),
											a,
										)),
							o
						);
					},
				},
			],
		),
		t
	);
})(D.Component);
Js(Xa, 'displayName', 'CartesianAxis');
Js(Xa, 'defaultProps', {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	viewBox: { x: 0, y: 0, width: 0, height: 0 },
	orientation: 'bottom',
	ticks: [],
	stroke: '#666',
	tickLine: !0,
	axisLine: !0,
	tick: !0,
	mirror: !1,
	minTickGap: 5,
	tickSize: 6,
	tickMargin: 2,
	interval: 'preserveEnd',
});
var wL = ['layout', 'type', 'stroke', 'connectNulls', 'isRange', 'ref'],
	Yv;
function Ar(e) {
	'@babel/helpers - typeof';
	return (
		(Ar =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Ar(e)
	);
}
function OL(e, t) {
	if (e == null) return {};
	var r = SL(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function SL(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
function Gt() {
	return (
		(Gt = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		Gt.apply(this, arguments)
	);
}
function Lh(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function _t(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Lh(Object(r), !0).forEach(function (n) {
					ot(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: Lh(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function AL(e, t) {
	if (!(e instanceof t))
		throw new TypeError('Cannot call a class as a function');
}
function Rh(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			'value' in n && (n.writable = !0),
			Object.defineProperty(e, Jv(n.key), n);
	}
}
function _L(e, t, r) {
	return (
		t && Rh(e.prototype, t),
		r && Rh(e, r),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		e
	);
}
function PL(e, t, r) {
	return (
		(t = fa(t)),
		$L(
			e,
			Zv()
				? Reflect.construct(t, r || [], fa(e).constructor)
				: t.apply(e, r),
		)
	);
}
function $L(e, t) {
	if (t && (Ar(t) === 'object' || typeof t == 'function')) return t;
	if (t !== void 0)
		throw new TypeError(
			'Derived constructors may only return object or undefined',
		);
	return en(e);
}
function Zv() {
	try {
		var e = !Boolean.prototype.valueOf.call(
			Reflect.construct(Boolean, [], function () {}),
		);
	} catch {}
	return (Zv = function () {
		return !!e;
	})();
}
function fa(e) {
	return (
		(fa = Object.setPrototypeOf
			? Object.getPrototypeOf.bind()
			: function (r) {
					return r.__proto__ || Object.getPrototypeOf(r);
				}),
		fa(e)
	);
}
function en(e) {
	if (e === void 0)
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called",
		);
	return e;
}
function TL(e, t) {
	if (typeof t != 'function' && t !== null)
		throw new TypeError(
			'Super expression must either be null or a function',
		);
	(e.prototype = Object.create(t && t.prototype, {
		constructor: { value: e, writable: !0, configurable: !0 },
	})),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		t && Uu(e, t);
}
function Uu(e, t) {
	return (
		(Uu = Object.setPrototypeOf
			? Object.setPrototypeOf.bind()
			: function (n, i) {
					return (n.__proto__ = i), n;
				}),
		Uu(e, t)
	);
}
function ot(e, t, r) {
	return (
		(t = Jv(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function Jv(e) {
	var t = EL(e, 'string');
	return Ar(t) == 'symbol' ? t : String(t);
}
function EL(e, t) {
	if (Ar(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (Ar(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var Nt = (function (e) {
	TL(t, e);
	function t() {
		var r;
		AL(this, t);
		for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
			i[a] = arguments[a];
		return (
			(r = PL(this, t, [].concat(i))),
			ot(en(r), 'state', { isAnimationFinished: !0 }),
			ot(en(r), 'id', Yn('recharts-area-')),
			ot(en(r), 'handleAnimationEnd', function () {
				var o = r.props.onAnimationEnd;
				r.setState({ isAnimationFinished: !0 }), Z(o) && o();
			}),
			ot(en(r), 'handleAnimationStart', function () {
				var o = r.props.onAnimationStart;
				r.setState({ isAnimationFinished: !1 }), Z(o) && o();
			}),
			r
		);
	}
	return (
		_L(
			t,
			[
				{
					key: 'renderDots',
					value: function (n, i, a) {
						var o = this.props.isAnimationActive,
							u = this.state.isAnimationFinished;
						if (o && !u) return null;
						var s = this.props,
							c = s.dot,
							f = s.points,
							l = s.dataKey,
							h = J(this.props, !1),
							p = J(c, !0),
							y = f.map(function (d, w) {
								var b = _t(
									_t(
										_t({ key: 'dot-'.concat(w), r: 3 }, h),
										p,
									),
									{},
									{
										index: w,
										cx: d.x,
										cy: d.y,
										dataKey: l,
										value: d.value,
										payload: d.payload,
										points: f,
									},
								);
								return t.renderDotItem(c, b);
							}),
							v = {
								clipPath: n
									? 'url(#clipPath-'
											.concat(i ? '' : 'dots-')
											.concat(a, ')')
									: null,
							};
						return _.createElement(
							pe,
							Gt({ className: 'recharts-area-dots' }, v),
							y,
						);
					},
				},
				{
					key: 'renderHorizontalRect',
					value: function (n) {
						var i = this.props,
							a = i.baseLine,
							o = i.points,
							u = i.strokeWidth,
							s = o[0].x,
							c = o[o.length - 1].x,
							f = n * Math.abs(s - c),
							l = $t(
								o.map(function (h) {
									return h.y || 0;
								}),
							);
						return (
							F(a) && typeof a == 'number'
								? (l = Math.max(a, l))
								: a &&
									Array.isArray(a) &&
									a.length &&
									(l = Math.max(
										$t(
											a.map(function (h) {
												return h.y || 0;
											}),
										),
										l,
									)),
							F(l)
								? _.createElement('rect', {
										x: s < c ? s : s - f,
										y: 0,
										width: f,
										height: Math.floor(
											l +
												(u
													? parseInt(''.concat(u), 10)
													: 1),
										),
									})
								: null
						);
					},
				},
				{
					key: 'renderVerticalRect',
					value: function (n) {
						var i = this.props,
							a = i.baseLine,
							o = i.points,
							u = i.strokeWidth,
							s = o[0].y,
							c = o[o.length - 1].y,
							f = n * Math.abs(s - c),
							l = $t(
								o.map(function (h) {
									return h.x || 0;
								}),
							);
						return (
							F(a) && typeof a == 'number'
								? (l = Math.max(a, l))
								: a &&
									Array.isArray(a) &&
									a.length &&
									(l = Math.max(
										$t(
											a.map(function (h) {
												return h.x || 0;
											}),
										),
										l,
									)),
							F(l)
								? _.createElement('rect', {
										x: 0,
										y: s < c ? s : s - f,
										width:
											l +
											(u
												? parseInt(''.concat(u), 10)
												: 1),
										height: Math.floor(f),
									})
								: null
						);
					},
				},
				{
					key: 'renderClipRect',
					value: function (n) {
						var i = this.props.layout;
						return i === 'vertical'
							? this.renderVerticalRect(n)
							: this.renderHorizontalRect(n);
					},
				},
				{
					key: 'renderAreaStatically',
					value: function (n, i, a, o) {
						var u = this.props,
							s = u.layout,
							c = u.type,
							f = u.stroke,
							l = u.connectNulls,
							h = u.isRange;
						u.ref;
						var p = OL(u, wL);
						return _.createElement(
							pe,
							{
								clipPath: a
									? 'url(#clipPath-'.concat(o, ')')
									: null,
							},
							_.createElement(
								an,
								Gt({}, J(p, !0), {
									points: n,
									connectNulls: l,
									type: c,
									baseLine: i,
									layout: s,
									stroke: 'none',
									className: 'recharts-area-area',
								}),
							),
							f !== 'none' &&
								_.createElement(
									an,
									Gt({}, J(this.props, !1), {
										className: 'recharts-area-curve',
										layout: s,
										type: c,
										connectNulls: l,
										fill: 'none',
										points: n,
									}),
								),
							f !== 'none' &&
								h &&
								_.createElement(
									an,
									Gt({}, J(this.props, !1), {
										className: 'recharts-area-curve',
										layout: s,
										type: c,
										connectNulls: l,
										fill: 'none',
										points: i,
									}),
								),
						);
					},
				},
				{
					key: 'renderAreaWithAnimation',
					value: function (n, i) {
						var a = this,
							o = this.props,
							u = o.points,
							s = o.baseLine,
							c = o.isAnimationActive,
							f = o.animationBegin,
							l = o.animationDuration,
							h = o.animationEasing,
							p = o.animationId,
							y = this.state,
							v = y.prevPoints,
							d = y.prevBaseLine;
						return _.createElement(
							wt,
							{
								begin: f,
								duration: l,
								isActive: c,
								easing: h,
								from: { t: 0 },
								to: { t: 1 },
								key: 'area-'.concat(p),
								onAnimationEnd: this.handleAnimationEnd,
								onAnimationStart: this.handleAnimationStart,
							},
							function (w) {
								var b = w.t;
								if (v) {
									var x = v.length / u.length,
										m = u.map(function (A, E) {
											var T = Math.floor(E * x);
											if (v[T]) {
												var P = v[T],
													$ = He(P.x, A.x),
													j = He(P.y, A.y);
												return _t(
													_t({}, A),
													{},
													{ x: $(b), y: j(b) },
												);
											}
											return A;
										}),
										g;
									if (F(s) && typeof s == 'number') {
										var O = He(d, s);
										g = O(b);
									} else if (ee(s) || Cr(s)) {
										var S = He(d, 0);
										g = S(b);
									} else
										g = s.map(function (A, E) {
											var T = Math.floor(E * x);
											if (d[T]) {
												var P = d[T],
													$ = He(P.x, A.x),
													j = He(P.y, A.y);
												return _t(
													_t({}, A),
													{},
													{ x: $(b), y: j(b) },
												);
											}
											return A;
										});
									return a.renderAreaStatically(m, g, n, i);
								}
								return _.createElement(
									pe,
									null,
									_.createElement(
										'defs',
										null,
										_.createElement(
											'clipPath',
											{
												id: 'animationClipPath-'.concat(
													i,
												),
											},
											a.renderClipRect(b),
										),
									),
									_.createElement(
										pe,
										{
											clipPath:
												'url(#animationClipPath-'.concat(
													i,
													')',
												),
										},
										a.renderAreaStatically(u, s, n, i),
									),
								);
							},
						);
					},
				},
				{
					key: 'renderArea',
					value: function (n, i) {
						var a = this.props,
							o = a.points,
							u = a.baseLine,
							s = a.isAnimationActive,
							c = this.state,
							f = c.prevPoints,
							l = c.prevBaseLine,
							h = c.totalLength;
						return s &&
							o &&
							o.length &&
							((!f && h > 0) || !wn(f, o) || !wn(l, u))
							? this.renderAreaWithAnimation(n, i)
							: this.renderAreaStatically(o, u, n, i);
					},
				},
				{
					key: 'render',
					value: function () {
						var n,
							i = this.props,
							a = i.hide,
							o = i.dot,
							u = i.points,
							s = i.className,
							c = i.top,
							f = i.left,
							l = i.xAxis,
							h = i.yAxis,
							p = i.width,
							y = i.height,
							v = i.isAnimationActive,
							d = i.id;
						if (a || !u || !u.length) return null;
						var w = this.state.isAnimationFinished,
							b = u.length === 1,
							x = ne('recharts-area', s),
							m = l && l.allowDataOverflow,
							g = h && h.allowDataOverflow,
							O = m || g,
							S = ee(d) ? this.id : d,
							A =
								(n = J(o, !1)) !== null && n !== void 0
									? n
									: { r: 3, strokeWidth: 2 },
							E = A.r,
							T = E === void 0 ? 3 : E,
							P = A.strokeWidth,
							$ = P === void 0 ? 2 : P,
							j = u0(o) ? o : {},
							M = j.clipDot,
							B = M === void 0 ? !0 : M,
							I = T * 2 + $;
						return _.createElement(
							pe,
							{ className: x },
							m || g
								? _.createElement(
										'defs',
										null,
										_.createElement(
											'clipPath',
											{ id: 'clipPath-'.concat(S) },
											_.createElement('rect', {
												x: m ? f : f - p / 2,
												y: g ? c : c - y / 2,
												width: m ? p : p * 2,
												height: g ? y : y * 2,
											}),
										),
										!B &&
											_.createElement(
												'clipPath',
												{
													id: 'clipPath-dots-'.concat(
														S,
													),
												},
												_.createElement('rect', {
													x: f - I / 2,
													y: c - I / 2,
													width: p + I,
													height: y + I,
												}),
											),
									)
								: null,
							b ? null : this.renderArea(O, S),
							(o || b) && this.renderDots(O, B, S),
							(!v || w) && jt.renderCallByParent(this.props, u),
						);
					},
				},
			],
			[
				{
					key: 'getDerivedStateFromProps',
					value: function (n, i) {
						return n.animationId !== i.prevAnimationId
							? {
									prevAnimationId: n.animationId,
									curPoints: n.points,
									curBaseLine: n.baseLine,
									prevPoints: i.curPoints,
									prevBaseLine: i.curBaseLine,
								}
							: n.points !== i.curPoints ||
								  n.baseLine !== i.curBaseLine
								? {
										curPoints: n.points,
										curBaseLine: n.baseLine,
									}
								: null;
					},
				},
			],
		),
		t
	);
})(D.PureComponent);
Yv = Nt;
ot(Nt, 'displayName', 'Area');
ot(Nt, 'defaultProps', {
	stroke: '#3182bd',
	fill: '#3182bd',
	fillOpacity: 0.6,
	xAxisId: 0,
	yAxisId: 0,
	legendType: 'line',
	connectNulls: !1,
	points: [],
	dot: !1,
	activeDot: !0,
	hide: !1,
	isAnimationActive: !yt.isSsr,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: 'ease',
});
ot(Nt, 'getBaseValue', function (e, t, r, n) {
	var i = e.layout,
		a = e.baseValue,
		o = t.props.baseValue,
		u = o ?? a;
	if (F(u) && typeof u == 'number') return u;
	var s = i === 'horizontal' ? n : r,
		c = s.scale.domain();
	if (s.type === 'number') {
		var f = Math.max(c[0], c[1]),
			l = Math.min(c[0], c[1]);
		return u === 'dataMin'
			? l
			: u === 'dataMax' || f < 0
				? f
				: Math.max(Math.min(c[0], c[1]), 0);
	}
	return u === 'dataMin' ? c[0] : u === 'dataMax' ? c[1] : c[0];
});
ot(Nt, 'getComposedData', function (e) {
	var t = e.props,
		r = e.item,
		n = e.xAxis,
		i = e.yAxis,
		a = e.xAxisTicks,
		o = e.yAxisTicks,
		u = e.bandSize,
		s = e.dataKey,
		c = e.stackedData,
		f = e.dataStartIndex,
		l = e.displayedData,
		h = e.offset,
		p = t.layout,
		y = c && c.length,
		v = Yv.getBaseValue(t, r, n, i),
		d = p === 'horizontal',
		w = !1,
		b = l.map(function (m, g) {
			var O;
			y
				? (O = c[f + g])
				: ((O = Fe(m, s)), Array.isArray(O) ? (w = !0) : (O = [v, O]));
			var S = O[1] == null || (y && Fe(m, s) == null);
			return d
				? {
						x: Of({
							axis: n,
							ticks: a,
							bandSize: u,
							entry: m,
							index: g,
						}),
						y: S ? null : i.scale(O[1]),
						value: O,
						payload: m,
					}
				: {
						x: S ? null : n.scale(O[1]),
						y: Of({
							axis: i,
							ticks: o,
							bandSize: u,
							entry: m,
							index: g,
						}),
						value: O,
						payload: m,
					};
		}),
		x;
	return (
		y || w
			? (x = b.map(function (m) {
					var g = Array.isArray(m.value) ? m.value[0] : null;
					return d
						? {
								x: m.x,
								y: g != null && m.y != null ? i.scale(g) : null,
							}
						: { x: g != null ? n.scale(g) : null, y: m.y };
				}))
			: (x = d ? i.scale(v) : n.scale(v)),
		_t({ points: b, baseLine: x, layout: p, isRange: w }, h)
	);
});
ot(Nt, 'renderDotItem', function (e, t) {
	var r;
	if (_.isValidElement(e)) r = _.cloneElement(e, t);
	else if (Z(e)) r = e(t);
	else {
		var n = ne(
			'recharts-area-dot',
			typeof e != 'boolean' ? e.className : '',
		);
		r = _.createElement(Vs, Gt({}, t, { className: n }));
	}
	return r;
});
function zu() {
	return (
		(zu = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		zu.apply(this, arguments)
	);
}
var Va = function (t) {
	var r = t.xAxisId,
		n = Hv(),
		i = Kv(),
		a = zv(r);
	return a == null
		? null
		: _.createElement(
				Xa,
				zu({}, a, {
					className: ne(
						'recharts-'.concat(a.axisType, ' ').concat(a.axisType),
						a.className,
					),
					viewBox: { x: 0, y: 0, width: n, height: i },
					ticksGenerator: function (u) {
						return Kt(u, !0);
					},
				}),
			);
};
Va.displayName = 'XAxis';
Va.defaultProps = {
	allowDecimals: !0,
	hide: !1,
	orientation: 'bottom',
	width: 0,
	height: 30,
	mirror: !1,
	xAxisId: 0,
	tickCount: 5,
	type: 'category',
	padding: { left: 0, right: 0 },
	allowDataOverflow: !1,
	scale: 'auto',
	reversed: !1,
	allowDuplicatedCategory: !0,
};
function qu() {
	return (
		(qu = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		qu.apply(this, arguments)
	);
}
var Qs = function (t) {
	var r = t.yAxisId,
		n = Hv(),
		i = Kv(),
		a = qv(r);
	return a == null
		? null
		: _.createElement(
				Xa,
				qu({}, a, {
					className: ne(
						'recharts-'.concat(a.axisType, ' ').concat(a.axisType),
						a.className,
					),
					viewBox: { x: 0, y: 0, width: n, height: i },
					ticksGenerator: function (u) {
						return Kt(u, !0);
					},
				}),
			);
};
Qs.displayName = 'YAxis';
Qs.defaultProps = {
	allowDuplicatedCategory: !0,
	allowDecimals: !0,
	hide: !1,
	orientation: 'left',
	width: 60,
	height: 0,
	mirror: !1,
	yAxisId: 0,
	tickCount: 5,
	type: 'number',
	padding: { top: 0, bottom: 0 },
	allowDataOverflow: !1,
	scale: 'auto',
	reversed: !1,
};
function Fh(e) {
	return kL(e) || CL(e) || ML(e) || jL();
}
function jL() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ML(e, t) {
	if (e) {
		if (typeof e == 'string') return Hu(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return Hu(e, t);
	}
}
function CL(e) {
	if (
		(typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
		e['@@iterator'] != null
	)
		return Array.from(e);
}
function kL(e) {
	if (Array.isArray(e)) return Hu(e);
}
function Hu(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
var Ku = function (t, r, n, i, a) {
		var o = tt(t, Zs),
			u = tt(t, ri),
			s = [].concat(Fh(o), Fh(u)),
			c = tt(t, ni),
			f = ''.concat(i, 'Id'),
			l = i[0],
			h = r;
		if (
			(s.length &&
				(h = s.reduce(function (v, d) {
					if (
						d.props[f] === n &&
						st(d.props, 'extendDomain') &&
						F(d.props[l])
					) {
						var w = d.props[l];
						return [Math.min(v[0], w), Math.max(v[1], w)];
					}
					return v;
				}, h)),
			c.length)
		) {
			var p = ''.concat(l, '1'),
				y = ''.concat(l, '2');
			h = c.reduce(function (v, d) {
				if (
					d.props[f] === n &&
					st(d.props, 'extendDomain') &&
					F(d.props[p]) &&
					F(d.props[y])
				) {
					var w = d.props[p],
						b = d.props[y];
					return [Math.min(v[0], w, b), Math.max(v[1], w, b)];
				}
				return v;
			}, h);
		}
		return (
			a &&
				a.length &&
				(h = a.reduce(function (v, d) {
					return F(d) ? [Math.min(v[0], d), Math.max(v[1], d)] : v;
				}, h)),
			h
		);
	},
	Qv = { exports: {} };
(function (e) {
	var t = Object.prototype.hasOwnProperty,
		r = '~';
	function n() {}
	Object.create &&
		((n.prototype = Object.create(null)), new n().__proto__ || (r = !1));
	function i(s, c, f) {
		(this.fn = s), (this.context = c), (this.once = f || !1);
	}
	function a(s, c, f, l, h) {
		if (typeof f != 'function')
			throw new TypeError('The listener must be a function');
		var p = new i(f, l || s, h),
			y = r ? r + c : c;
		return (
			s._events[y]
				? s._events[y].fn
					? (s._events[y] = [s._events[y], p])
					: s._events[y].push(p)
				: ((s._events[y] = p), s._eventsCount++),
			s
		);
	}
	function o(s, c) {
		--s._eventsCount === 0 ? (s._events = new n()) : delete s._events[c];
	}
	function u() {
		(this._events = new n()), (this._eventsCount = 0);
	}
	(u.prototype.eventNames = function () {
		var c = [],
			f,
			l;
		if (this._eventsCount === 0) return c;
		for (l in (f = this._events))
			t.call(f, l) && c.push(r ? l.slice(1) : l);
		return Object.getOwnPropertySymbols
			? c.concat(Object.getOwnPropertySymbols(f))
			: c;
	}),
		(u.prototype.listeners = function (c) {
			var f = r ? r + c : c,
				l = this._events[f];
			if (!l) return [];
			if (l.fn) return [l.fn];
			for (var h = 0, p = l.length, y = new Array(p); h < p; h++)
				y[h] = l[h].fn;
			return y;
		}),
		(u.prototype.listenerCount = function (c) {
			var f = r ? r + c : c,
				l = this._events[f];
			return l ? (l.fn ? 1 : l.length) : 0;
		}),
		(u.prototype.emit = function (c, f, l, h, p, y) {
			var v = r ? r + c : c;
			if (!this._events[v]) return !1;
			var d = this._events[v],
				w = arguments.length,
				b,
				x;
			if (d.fn) {
				switch (
					(d.once && this.removeListener(c, d.fn, void 0, !0), w)
				) {
					case 1:
						return d.fn.call(d.context), !0;
					case 2:
						return d.fn.call(d.context, f), !0;
					case 3:
						return d.fn.call(d.context, f, l), !0;
					case 4:
						return d.fn.call(d.context, f, l, h), !0;
					case 5:
						return d.fn.call(d.context, f, l, h, p), !0;
					case 6:
						return d.fn.call(d.context, f, l, h, p, y), !0;
				}
				for (x = 1, b = new Array(w - 1); x < w; x++)
					b[x - 1] = arguments[x];
				d.fn.apply(d.context, b);
			} else {
				var m = d.length,
					g;
				for (x = 0; x < m; x++)
					switch (
						(d[x].once &&
							this.removeListener(c, d[x].fn, void 0, !0),
						w)
					) {
						case 1:
							d[x].fn.call(d[x].context);
							break;
						case 2:
							d[x].fn.call(d[x].context, f);
							break;
						case 3:
							d[x].fn.call(d[x].context, f, l);
							break;
						case 4:
							d[x].fn.call(d[x].context, f, l, h);
							break;
						default:
							if (!b)
								for (g = 1, b = new Array(w - 1); g < w; g++)
									b[g - 1] = arguments[g];
							d[x].fn.apply(d[x].context, b);
					}
			}
			return !0;
		}),
		(u.prototype.on = function (c, f, l) {
			return a(this, c, f, l, !1);
		}),
		(u.prototype.once = function (c, f, l) {
			return a(this, c, f, l, !0);
		}),
		(u.prototype.removeListener = function (c, f, l, h) {
			var p = r ? r + c : c;
			if (!this._events[p]) return this;
			if (!f) return o(this, p), this;
			var y = this._events[p];
			if (y.fn)
				y.fn === f &&
					(!h || y.once) &&
					(!l || y.context === l) &&
					o(this, p);
			else {
				for (var v = 0, d = [], w = y.length; v < w; v++)
					(y[v].fn !== f ||
						(h && !y[v].once) ||
						(l && y[v].context !== l)) &&
						d.push(y[v]);
				d.length
					? (this._events[p] = d.length === 1 ? d[0] : d)
					: o(this, p);
			}
			return this;
		}),
		(u.prototype.removeAllListeners = function (c) {
			var f;
			return (
				c
					? ((f = r ? r + c : c), this._events[f] && o(this, f))
					: ((this._events = new n()), (this._eventsCount = 0)),
				this
			);
		}),
		(u.prototype.off = u.prototype.removeListener),
		(u.prototype.addListener = u.prototype.on),
		(u.prefixed = r),
		(u.EventEmitter = u),
		(e.exports = u);
})(Qv);
var IL = Qv.exports;
const NL = fe(IL);
var _o = new NL(),
	Po = 'recharts.syncMouseEvents';
function Kn(e) {
	'@babel/helpers - typeof';
	return (
		(Kn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Kn(e)
	);
}
function DL(e, t) {
	if (!(e instanceof t))
		throw new TypeError('Cannot call a class as a function');
}
function BL(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			'value' in n && (n.writable = !0),
			Object.defineProperty(e, ey(n.key), n);
	}
}
function LL(e, t, r) {
	return (
		t && BL(e.prototype, t),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		e
	);
}
function $o(e, t, r) {
	return (
		(t = ey(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function ey(e) {
	var t = RL(e, 'string');
	return Kn(t) == 'symbol' ? t : String(t);
}
function RL(e, t) {
	if (Kn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (Kn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var FL = (function () {
	function e() {
		DL(this, e),
			$o(this, 'activeIndex', 0),
			$o(this, 'coordinateList', []),
			$o(this, 'layout', 'horizontal');
	}
	return (
		LL(e, [
			{
				key: 'setDetails',
				value: function (r) {
					var n,
						i = r.coordinateList,
						a = i === void 0 ? null : i,
						o = r.container,
						u = o === void 0 ? null : o,
						s = r.layout,
						c = s === void 0 ? null : s,
						f = r.offset,
						l = f === void 0 ? null : f,
						h = r.mouseHandlerCallback,
						p = h === void 0 ? null : h;
					(this.coordinateList =
						(n = a ?? this.coordinateList) !== null && n !== void 0
							? n
							: []),
						(this.container = u ?? this.container),
						(this.layout = c ?? this.layout),
						(this.offset = l ?? this.offset),
						(this.mouseHandlerCallback =
							p ?? this.mouseHandlerCallback),
						(this.activeIndex = Math.min(
							Math.max(this.activeIndex, 0),
							this.coordinateList.length - 1,
						));
				},
			},
			{
				key: 'focus',
				value: function () {
					this.spoofMouse();
				},
			},
			{
				key: 'keyboardEvent',
				value: function (r) {
					if (this.coordinateList.length !== 0)
						switch (r.key) {
							case 'ArrowRight': {
								if (this.layout !== 'horizontal') return;
								(this.activeIndex = Math.min(
									this.activeIndex + 1,
									this.coordinateList.length - 1,
								)),
									this.spoofMouse();
								break;
							}
							case 'ArrowLeft': {
								if (this.layout !== 'horizontal') return;
								(this.activeIndex = Math.max(
									this.activeIndex - 1,
									0,
								)),
									this.spoofMouse();
								break;
							}
						}
				},
			},
			{
				key: 'setIndex',
				value: function (r) {
					this.activeIndex = r;
				},
			},
			{
				key: 'spoofMouse',
				value: function () {
					var r, n;
					if (
						this.layout === 'horizontal' &&
						this.coordinateList.length !== 0
					) {
						var i = this.container.getBoundingClientRect(),
							a = i.x,
							o = i.y,
							u = i.height,
							s =
								this.coordinateList[this.activeIndex]
									.coordinate,
							c =
								((r = window) === null || r === void 0
									? void 0
									: r.scrollX) || 0,
							f =
								((n = window) === null || n === void 0
									? void 0
									: n.scrollY) || 0,
							l = a + s + c,
							h = o + this.offset.top + u / 2 + f;
						this.mouseHandlerCallback({ pageX: l, pageY: h });
					}
				},
			},
		]),
		e
	);
})();
function WL(e, t, r) {
	if (r === 'number' && t === !0 && Array.isArray(e)) {
		var n = e == null ? void 0 : e[0],
			i = e == null ? void 0 : e[1];
		if (n && i && F(n) && F(i)) return !0;
	}
	return !1;
}
function UL(e, t, r, n) {
	var i = n / 2;
	return {
		stroke: 'none',
		fill: '#ccc',
		x: e === 'horizontal' ? t.x - i : r.left + 0.5,
		y: e === 'horizontal' ? r.top + 0.5 : t.y - i,
		width: e === 'horizontal' ? n : r.width - 1,
		height: e === 'horizontal' ? r.height - 1 : n,
	};
}
function ty(e) {
	var t = e.cx,
		r = e.cy,
		n = e.radius,
		i = e.startAngle,
		a = e.endAngle,
		o = $e(t, r, n, i),
		u = $e(t, r, n, a);
	return {
		points: [o, u],
		cx: t,
		cy: r,
		radius: n,
		startAngle: i,
		endAngle: a,
	};
}
function zL(e, t, r) {
	var n, i, a, o;
	if (e === 'horizontal')
		(n = t.x), (a = n), (i = r.top), (o = r.top + r.height);
	else if (e === 'vertical')
		(i = t.y), (o = i), (n = r.left), (a = r.left + r.width);
	else if (t.cx != null && t.cy != null)
		if (e === 'centric') {
			var u = t.cx,
				s = t.cy,
				c = t.innerRadius,
				f = t.outerRadius,
				l = t.angle,
				h = $e(u, s, c, l),
				p = $e(u, s, f, l);
			(n = h.x), (i = h.y), (a = p.x), (o = p.y);
		} else return ty(t);
	return [
		{ x: n, y: i },
		{ x: a, y: o },
	];
}
function Gn(e) {
	'@babel/helpers - typeof';
	return (
		(Gn =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		Gn(e)
	);
}
function Wh(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function gi(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Wh(Object(r), !0).forEach(function (n) {
					qL(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: Wh(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function qL(e, t, r) {
	return (
		(t = HL(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function HL(e) {
	var t = KL(e, 'string');
	return Gn(t) == 'symbol' ? t : String(t);
}
function KL(e, t) {
	if (Gn(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (Gn(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
function GL(e) {
	var t = e.element,
		r = e.tooltipEventType,
		n = e.isActive,
		i = e.activeCoordinate,
		a = e.activePayload,
		o = e.offset,
		u = e.activeTooltipIndex,
		s = e.tooltipAxisBandSize,
		c = e.layout,
		f = e.chartName;
	if (
		!t ||
		!t.props.cursor ||
		!n ||
		!i ||
		(f !== 'ScatterChart' && r !== 'axis')
	)
		return null;
	var l,
		h = an;
	if (f === 'ScatterChart') (l = i), (h = lN);
	else if (f === 'BarChart') (l = UL(c, i, o, s)), (h = Xs);
	else if (c === 'radial') {
		var p = ty(i),
			y = p.cx,
			v = p.cy,
			d = p.radius,
			w = p.startAngle,
			b = p.endAngle;
		(l = {
			cx: y,
			cy: v,
			startAngle: w,
			endAngle: b,
			innerRadius: d,
			outerRadius: d,
		}),
			(h = vv);
	} else (l = { points: zL(c, i, o) }), (h = an);
	var x = gi(
		gi(
			gi(gi({ stroke: '#ccc', pointerEvents: 'none' }, o), l),
			J(t.props.cursor, !1),
		),
		{},
		{
			payload: a,
			payloadIndex: u,
			className: ne('recharts-tooltip-cursor', t.props.cursor.className),
		},
	);
	return D.isValidElement(t.props.cursor)
		? D.cloneElement(t.props.cursor, x)
		: D.createElement(h, x);
}
var XL = ['item'],
	VL = [
		'children',
		'className',
		'width',
		'height',
		'style',
		'compact',
		'title',
		'desc',
	];
function _r(e) {
	'@babel/helpers - typeof';
	return (
		(_r =
			typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							typeof Symbol == 'function' &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					}),
		_r(e)
	);
}
function un() {
	return (
		(un = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		un.apply(this, arguments)
	);
}
function Uh(e, t) {
	return JL(e) || ZL(e, t) || ny(e, t) || YL();
}
function YL() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ZL(e, t) {
	var r =
		e == null
			? null
			: (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			s = !0,
			c = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (
					;
					!(s = (n = a.call(r)).done) &&
					(u.push(n.value), u.length !== t);
					s = !0
				);
		} catch (f) {
			(c = !0), (i = f);
		} finally {
			try {
				if (
					!s &&
					r.return != null &&
					((o = r.return()), Object(o) !== o)
				)
					return;
			} finally {
				if (c) throw i;
			}
		}
		return u;
	}
}
function JL(e) {
	if (Array.isArray(e)) return e;
}
function zh(e, t) {
	if (e == null) return {};
	var r = QL(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]),
				!(t.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(r[n] = e[n]);
	}
	return r;
}
function QL(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++)
		(i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
function eR(e, t) {
	if (!(e instanceof t))
		throw new TypeError('Cannot call a class as a function');
}
function tR(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			'value' in n && (n.writable = !0),
			Object.defineProperty(e, iy(n.key), n);
	}
}
function rR(e, t, r) {
	return (
		t && tR(e.prototype, t),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		e
	);
}
function nR(e, t, r) {
	return (
		(t = ha(t)),
		iR(
			e,
			ry()
				? Reflect.construct(t, r || [], ha(e).constructor)
				: t.apply(e, r),
		)
	);
}
function iR(e, t) {
	if (t && (_r(t) === 'object' || typeof t == 'function')) return t;
	if (t !== void 0)
		throw new TypeError(
			'Derived constructors may only return object or undefined',
		);
	return te(e);
}
function ry() {
	try {
		var e = !Boolean.prototype.valueOf.call(
			Reflect.construct(Boolean, [], function () {}),
		);
	} catch {}
	return (ry = function () {
		return !!e;
	})();
}
function ha(e) {
	return (
		(ha = Object.setPrototypeOf
			? Object.getPrototypeOf.bind()
			: function (r) {
					return r.__proto__ || Object.getPrototypeOf(r);
				}),
		ha(e)
	);
}
function te(e) {
	if (e === void 0)
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called",
		);
	return e;
}
function aR(e, t) {
	if (typeof t != 'function' && t !== null)
		throw new TypeError(
			'Super expression must either be null or a function',
		);
	(e.prototype = Object.create(t && t.prototype, {
		constructor: { value: e, writable: !0, configurable: !0 },
	})),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		t && Gu(e, t);
}
function Gu(e, t) {
	return (
		(Gu = Object.setPrototypeOf
			? Object.setPrototypeOf.bind()
			: function (n, i) {
					return (n.__proto__ = i), n;
				}),
		Gu(e, t)
	);
}
function Pr(e) {
	return sR(e) || uR(e) || ny(e) || oR();
}
function oR() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ny(e, t) {
	if (e) {
		if (typeof e == 'string') return Xu(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(r === 'Object' && e.constructor && (r = e.constructor.name),
			r === 'Map' || r === 'Set')
		)
			return Array.from(e);
		if (
			r === 'Arguments' ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
		)
			return Xu(e, t);
	}
}
function uR(e) {
	if (
		(typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
		e['@@iterator'] != null
	)
		return Array.from(e);
}
function sR(e) {
	if (Array.isArray(e)) return Xu(e);
}
function Xu(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function qh(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t &&
			(n = n.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			r.push.apply(r, n);
	}
	return r;
}
function C(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? qh(Object(r), !0).forEach(function (n) {
					H(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(
						e,
						Object.getOwnPropertyDescriptors(r),
					)
				: qh(Object(r)).forEach(function (n) {
						Object.defineProperty(
							e,
							n,
							Object.getOwnPropertyDescriptor(r, n),
						);
					});
	}
	return e;
}
function H(e, t, r) {
	return (
		(t = iy(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[t] = r),
		e
	);
}
function iy(e) {
	var t = cR(e, 'string');
	return _r(t) == 'symbol' ? t : String(t);
}
function cR(e, t) {
	if (_r(e) != 'object' || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t || 'default');
		if (_r(n) != 'object') return n;
		throw new TypeError('@@toPrimitive must return a primitive value.');
	}
	return (t === 'string' ? String : Number)(e);
}
var lR = { xAxis: ['bottom', 'top'], yAxis: ['left', 'right'] },
	fR = { width: '100%', height: '100%' },
	ay = { x: 0, y: 0 };
function bi(e) {
	return e;
}
var hR = function (t, r) {
		return r === 'horizontal'
			? t.x
			: r === 'vertical'
				? t.y
				: r === 'centric'
					? t.angle
					: t.radius;
	},
	pR = function (t, r, n, i) {
		var a = r.find(function (f) {
			return f && f.index === n;
		});
		if (a) {
			if (t === 'horizontal') return { x: a.coordinate, y: i.y };
			if (t === 'vertical') return { x: i.x, y: a.coordinate };
			if (t === 'centric') {
				var o = a.coordinate,
					u = i.radius;
				return C(
					C(C({}, i), $e(i.cx, i.cy, u, o)),
					{},
					{ angle: o, radius: u },
				);
			}
			var s = a.coordinate,
				c = i.angle;
			return C(
				C(C({}, i), $e(i.cx, i.cy, s, c)),
				{},
				{ angle: c, radius: s },
			);
		}
		return ay;
	},
	Ya = function (t, r) {
		var n = r.graphicalItems,
			i = r.dataStartIndex,
			a = r.dataEndIndex,
			o = (n ?? []).reduce(function (u, s) {
				var c = s.props.data;
				return c && c.length ? [].concat(Pr(u), Pr(c)) : u;
			}, []);
		return o.length > 0
			? o
			: t && t.length && F(i) && F(a)
				? t.slice(i, a + 1)
				: [];
	};
function oy(e) {
	return e === 'number' ? [0, 'auto'] : void 0;
}
var Vu = function (t, r, n, i) {
		var a = t.graphicalItems,
			o = t.tooltipAxis,
			u = Ya(r, t);
		return n < 0 || !a || !a.length || n >= u.length
			? null
			: a.reduce(function (s, c) {
					var f,
						l = (f = c.props.data) !== null && f !== void 0 ? f : r;
					l &&
						t.dataStartIndex + t.dataEndIndex !== 0 &&
						(l = l.slice(t.dataStartIndex, t.dataEndIndex + 1));
					var h;
					if (o.dataKey && !o.allowDuplicatedCategory) {
						var p = l === void 0 ? u : l;
						h = xi(p, o.dataKey, i);
					} else h = (l && l[n]) || u[n];
					return h ? [].concat(Pr(s), [hv(c, h)]) : s;
				}, []);
	},
	Hh = function (t, r, n, i) {
		var a = i || { x: t.chartX, y: t.chartY },
			o = hR(a, n),
			u = t.orderedTooltipTicks,
			s = t.tooltipAxis,
			c = t.tooltipTicks,
			f = rk(o, u, c, s);
		if (f >= 0 && c) {
			var l = c[f] && c[f].value,
				h = Vu(t, r, f, l),
				p = pR(n, u, f, a);
			return {
				activeTooltipIndex: f,
				activeLabel: l,
				activePayload: h,
				activeCoordinate: p,
			};
		}
		return null;
	},
	dR = function (t, r) {
		var n = r.axes,
			i = r.graphicalItems,
			a = r.axisType,
			o = r.axisIdKey,
			u = r.stackGroups,
			s = r.dataStartIndex,
			c = r.dataEndIndex,
			f = t.layout,
			l = t.children,
			h = t.stackOffset,
			p = lv(f, a);
		return n.reduce(function (y, v) {
			var d,
				w = v.props,
				b = w.type,
				x = w.dataKey,
				m = w.allowDataOverflow,
				g = w.allowDuplicatedCategory,
				O = w.scale,
				S = w.ticks,
				A = w.includeHidden,
				E = v.props[o];
			if (y[E]) return y;
			var T = Ya(t.data, {
					graphicalItems: i.filter(function (q) {
						return q.props[o] === E;
					}),
					dataStartIndex: s,
					dataEndIndex: c,
				}),
				P = T.length,
				$,
				j,
				M;
			WL(v.props.domain, m, b) &&
				(($ = bu(v.props.domain, null, m)),
				p &&
					(b === 'number' || O !== 'auto') &&
					(M = nn(T, x, 'category')));
			var B = oy(b);
			if (!$ || $.length === 0) {
				var I,
					L = (I = v.props.domain) !== null && I !== void 0 ? I : B;
				if (x) {
					if ((($ = nn(T, x, b)), b === 'category' && p)) {
						var R = Jb($);
						g && R
							? ((j = $), ($ = ia(0, P)))
							: g ||
								($ = Pf(L, $, v).reduce(function (q, Q) {
									return q.indexOf(Q) >= 0
										? q
										: [].concat(Pr(q), [Q]);
								}, []));
					} else if (b === 'category')
						g
							? ($ = $.filter(function (q) {
									return q !== '' && !ee(q);
								}))
							: ($ = Pf(L, $, v).reduce(function (q, Q) {
									return q.indexOf(Q) >= 0 ||
										Q === '' ||
										ee(Q)
										? q
										: [].concat(Pr(q), [Q]);
								}, []));
					else if (b === 'number') {
						var z = uk(
							T,
							i.filter(function (q) {
								return q.props[o] === E && (A || !q.props.hide);
							}),
							x,
							a,
							f,
						);
						z && ($ = z);
					}
					p &&
						(b === 'number' || O !== 'auto') &&
						(M = nn(T, x, 'category'));
				} else
					p
						? ($ = ia(0, P))
						: u && u[E] && u[E].hasStack && b === 'number'
							? ($ =
									h === 'expand'
										? [0, 1]
										: fv(u[E].stackGroups, s, c))
							: ($ = cv(
									T,
									i.filter(function (q) {
										return (
											q.props[o] === E &&
											(A || !q.props.hide)
										);
									}),
									b,
									f,
									!0,
								));
				if (b === 'number')
					($ = Ku(l, $, E, a, S)), L && ($ = bu(L, $, m));
				else if (b === 'category' && L) {
					var K = L,
						V = $.every(function (q) {
							return K.indexOf(q) >= 0;
						});
					V && ($ = K);
				}
			}
			return C(
				C({}, y),
				{},
				H(
					{},
					E,
					C(
						C({}, v.props),
						{},
						{
							axisType: a,
							domain: $,
							categoricalDomain: M,
							duplicateDomain: j,
							originalDomain:
								(d = v.props.domain) !== null && d !== void 0
									? d
									: B,
							isCategorical: p,
							layout: f,
						},
					),
				),
			);
		}, {});
	},
	vR = function (t, r) {
		var n = r.graphicalItems,
			i = r.Axis,
			a = r.axisType,
			o = r.axisIdKey,
			u = r.stackGroups,
			s = r.dataStartIndex,
			c = r.dataEndIndex,
			f = t.layout,
			l = t.children,
			h = Ya(t.data, {
				graphicalItems: n,
				dataStartIndex: s,
				dataEndIndex: c,
			}),
			p = h.length,
			y = lv(f, a),
			v = -1;
		return n.reduce(function (d, w) {
			var b = w.props[o],
				x = oy('number');
			if (!d[b]) {
				v++;
				var m;
				return (
					y
						? (m = ia(0, p))
						: u && u[b] && u[b].hasStack
							? ((m = fv(u[b].stackGroups, s, c)),
								(m = Ku(l, m, b, a)))
							: ((m = bu(
									x,
									cv(
										h,
										n.filter(function (g) {
											return (
												g.props[o] === b &&
												!g.props.hide
											);
										}),
										'number',
										f,
									),
									i.defaultProps.allowDataOverflow,
								)),
								(m = Ku(l, m, b, a))),
					C(
						C({}, d),
						{},
						H(
							{},
							b,
							C(
								C({ axisType: a }, i.defaultProps),
								{},
								{
									hide: !0,
									orientation: Xe(
										lR,
										''.concat(a, '.').concat(v % 2),
										null,
									),
									domain: m,
									originalDomain: x,
									isCategorical: y,
									layout: f,
								},
							),
						),
					)
				);
			}
			return d;
		}, {});
	},
	yR = function (t, r) {
		var n = r.axisType,
			i = n === void 0 ? 'xAxis' : n,
			a = r.AxisComp,
			o = r.graphicalItems,
			u = r.stackGroups,
			s = r.dataStartIndex,
			c = r.dataEndIndex,
			f = t.children,
			l = ''.concat(i, 'Id'),
			h = tt(f, a),
			p = {};
		return (
			h && h.length
				? (p = dR(t, {
						axes: h,
						graphicalItems: o,
						axisType: i,
						axisIdKey: l,
						stackGroups: u,
						dataStartIndex: s,
						dataEndIndex: c,
					}))
				: o &&
					o.length &&
					(p = vR(t, {
						Axis: a,
						graphicalItems: o,
						axisType: i,
						axisIdKey: l,
						stackGroups: u,
						dataStartIndex: s,
						dataEndIndex: c,
					})),
			p
		);
	},
	mR = function (t) {
		var r = ar(t),
			n = Kt(r, !1, !0);
		return {
			tooltipTicks: n,
			orderedTooltipTicks: ws(n, function (i) {
				return i.coordinate;
			}),
			tooltipAxis: r,
			tooltipAxisBandSize: Vi(r, n),
		};
	},
	Kh = function (t) {
		var r = t.children,
			n = t.defaultShowTooltip,
			i = Le(r, wr),
			a = 0,
			o = 0;
		return (
			t.data && t.data.length !== 0 && (o = t.data.length - 1),
			i &&
				i.props &&
				(i.props.startIndex >= 0 && (a = i.props.startIndex),
				i.props.endIndex >= 0 && (o = i.props.endIndex)),
			{
				chartX: 0,
				chartY: 0,
				dataStartIndex: a,
				dataEndIndex: o,
				activeTooltipIndex: -1,
				isTooltipActive: !!n,
			}
		);
	},
	gR = function (t) {
		return !t || !t.length
			? !1
			: t.some(function (r) {
					var n = vt(r && r.type);
					return n && n.indexOf('Bar') >= 0;
				});
	},
	Gh = function (t) {
		return t === 'horizontal'
			? { numericAxisName: 'yAxis', cateAxisName: 'xAxis' }
			: t === 'vertical'
				? { numericAxisName: 'xAxis', cateAxisName: 'yAxis' }
				: t === 'centric'
					? {
							numericAxisName: 'radiusAxis',
							cateAxisName: 'angleAxis',
						}
					: {
							numericAxisName: 'angleAxis',
							cateAxisName: 'radiusAxis',
						};
	},
	bR = function (t, r) {
		var n = t.props,
			i = t.graphicalItems,
			a = t.xAxisMap,
			o = a === void 0 ? {} : a,
			u = t.yAxisMap,
			s = u === void 0 ? {} : u,
			c = n.width,
			f = n.height,
			l = n.children,
			h = n.margin || {},
			p = Le(l, wr),
			y = Le(l, ln),
			v = Object.keys(s).reduce(
				function (g, O) {
					var S = s[O],
						A = S.orientation;
					return !S.mirror && !S.hide
						? C(C({}, g), {}, H({}, A, g[A] + S.width))
						: g;
				},
				{ left: h.left || 0, right: h.right || 0 },
			),
			d = Object.keys(o).reduce(
				function (g, O) {
					var S = o[O],
						A = S.orientation;
					return !S.mirror && !S.hide
						? C(
								C({}, g),
								{},
								H({}, A, Xe(g, ''.concat(A)) + S.height),
							)
						: g;
				},
				{ top: h.top || 0, bottom: h.bottom || 0 },
			),
			w = C(C({}, d), v),
			b = w.bottom;
		p && (w.bottom += p.props.height || wr.defaultProps.height),
			y && r && (w = ak(w, i, n, r));
		var x = c - w.left - w.right,
			m = f - w.top - w.bottom;
		return C(
			C({ brushBottom: b }, w),
			{},
			{ width: Math.max(x, 0), height: Math.max(m, 0) },
		);
	},
	xR = function (t, r) {
		if (r === 'xAxis') return t[r].width;
		if (r === 'yAxis') return t[r].height;
	},
	wR = function (t) {
		var r,
			n = t.chartName,
			i = t.GraphicalChild,
			a = t.defaultTooltipEventType,
			o = a === void 0 ? 'axis' : a,
			u = t.validateTooltipEventTypes,
			s = u === void 0 ? ['axis'] : u,
			c = t.axisComponents,
			f = t.legendContent,
			l = t.formatAxisMap,
			h = t.defaultProps,
			p = function (d, w) {
				var b = w.graphicalItems,
					x = w.stackGroups,
					m = w.offset,
					g = w.updateId,
					O = w.dataStartIndex,
					S = w.dataEndIndex,
					A = d.barSize,
					E = d.layout,
					T = d.barGap,
					P = d.barCategoryGap,
					$ = d.maxBarSize,
					j = Gh(E),
					M = j.numericAxisName,
					B = j.cateAxisName,
					I = gR(b),
					L = [];
				return (
					b.forEach(function (R, z) {
						var K = Ya(d.data, {
								graphicalItems: [R],
								dataStartIndex: O,
								dataEndIndex: S,
							}),
							V = R.props,
							q = V.dataKey,
							Q = V.maxBarSize,
							_e = R.props[''.concat(M, 'Id')],
							Ce = R.props[''.concat(B, 'Id')],
							Dt = {},
							ke = c.reduce(function (Bt, Lt) {
								var Za = w[''.concat(Lt.axisType, 'Map')],
									ec = R.props[''.concat(Lt.axisType, 'Id')];
								(Za && Za[ec]) ||
									Lt.axisType === 'zAxis' ||
									Qt();
								var tc = Za[ec];
								return C(
									C({}, Bt),
									{},
									H(
										H({}, Lt.axisType, tc),
										''.concat(Lt.axisType, 'Ticks'),
										Kt(tc),
									),
								);
							}, Dt),
							ft = ke[B],
							W = ke[''.concat(B, 'Ticks')],
							G =
								x &&
								x[_e] &&
								x[_e].hasStack &&
								bk(R, x[_e].stackGroups),
							Y = vt(R.type).indexOf('Bar') >= 0,
							N = Vi(ft, W),
							de = [],
							re =
								I &&
								nk({
									barSize: A,
									stackGroups: x,
									totalSize: xR(ke, B),
								});
						if (Y) {
							var me,
								ve,
								De = ee(Q) ? $ : Q,
								ht =
									(me =
										(ve = Vi(ft, W, !0)) !== null &&
										ve !== void 0
											? ve
											: De) !== null && me !== void 0
										? me
										: 0;
							(de = ik({
								barGap: T,
								barCategoryGap: P,
								bandSize: ht !== N ? ht : N,
								sizeList: re[Ce],
								maxBarSize: De,
							})),
								ht !== N &&
									(de = de.map(function (Bt) {
										return C(
											C({}, Bt),
											{},
											{
												position: C(
													C({}, Bt.position),
													{},
													{
														offset:
															Bt.position.offset -
															ht / 2,
													},
												),
											},
										);
									}));
						}
						var ii = R && R.type && R.type.getComposedData;
						ii &&
							L.push({
								props: C(
									C(
										{},
										ii(
											C(
												C({}, ke),
												{},
												{
													displayedData: K,
													props: d,
													dataKey: q,
													item: R,
													bandSize: N,
													barPosition: de,
													offset: m,
													stackedData: G,
													layout: E,
													dataStartIndex: O,
													dataEndIndex: S,
												},
											),
										),
									),
									{},
									H(
										H(
											H(
												{
													key:
														R.key ||
														'item-'.concat(z),
												},
												M,
												ke[M],
											),
											B,
											ke[B],
										),
										'animationId',
										g,
									),
								),
								childIndex: l0(R, d.children),
								item: R,
							});
					}),
					L
				);
			},
			y = function (d, w) {
				var b = d.props,
					x = d.dataStartIndex,
					m = d.dataEndIndex,
					g = d.updateId;
				if (!gc({ props: b })) return null;
				var O = b.children,
					S = b.layout,
					A = b.stackOffset,
					E = b.data,
					T = b.reverseStackOrder,
					P = Gh(S),
					$ = P.numericAxisName,
					j = P.cateAxisName,
					M = tt(O, i),
					B = yk(E, M, ''.concat($, 'Id'), ''.concat(j, 'Id'), A, T),
					I = c.reduce(function (V, q) {
						var Q = ''.concat(q.axisType, 'Map');
						return C(
							C({}, V),
							{},
							H(
								{},
								Q,
								yR(
									b,
									C(
										C({}, q),
										{},
										{
											graphicalItems: M,
											stackGroups: q.axisType === $ && B,
											dataStartIndex: x,
											dataEndIndex: m,
										},
									),
								),
							),
						);
					}, {}),
					L = bR(
						C(C({}, I), {}, { props: b, graphicalItems: M }),
						w == null ? void 0 : w.legendBBox,
					);
				Object.keys(I).forEach(function (V) {
					I[V] = l(b, I[V], L, V.replace('Map', ''), n);
				});
				var R = I[''.concat(j, 'Map')],
					z = mR(R),
					K = p(
						b,
						C(
							C({}, I),
							{},
							{
								dataStartIndex: x,
								dataEndIndex: m,
								updateId: g,
								graphicalItems: M,
								stackGroups: B,
								offset: L,
							},
						),
					);
				return C(
					C(
						{
							formattedGraphicalItems: K,
							graphicalItems: M,
							offset: L,
							stackGroups: B,
						},
						z,
					),
					I,
				);
			};
		return (
			(r = (function (v) {
				aR(d, v);
				function d(w) {
					var b, x, m;
					return (
						eR(this, d),
						(m = nR(this, d, [w])),
						H(
							te(m),
							'eventEmitterSymbol',
							Symbol('rechartsEventEmitter'),
						),
						H(te(m), 'accessibilityManager', new FL()),
						H(te(m), 'handleLegendBBoxUpdate', function (g) {
							if (g) {
								var O = m.state,
									S = O.dataStartIndex,
									A = O.dataEndIndex,
									E = O.updateId;
								m.setState(
									C(
										{ legendBBox: g },
										y(
											{
												props: m.props,
												dataStartIndex: S,
												dataEndIndex: A,
												updateId: E,
											},
											C(
												C({}, m.state),
												{},
												{ legendBBox: g },
											),
										),
									),
								);
							}
						}),
						H(te(m), 'handleReceiveSyncEvent', function (g, O, S) {
							if (m.props.syncId === g) {
								if (
									S === m.eventEmitterSymbol &&
									typeof m.props.syncMethod != 'function'
								)
									return;
								m.applySyncEvent(O);
							}
						}),
						H(te(m), 'handleBrushChange', function (g) {
							var O = g.startIndex,
								S = g.endIndex;
							if (
								O !== m.state.dataStartIndex ||
								S !== m.state.dataEndIndex
							) {
								var A = m.state.updateId;
								m.setState(function () {
									return C(
										{ dataStartIndex: O, dataEndIndex: S },
										y(
											{
												props: m.props,
												dataStartIndex: O,
												dataEndIndex: S,
												updateId: A,
											},
											m.state,
										),
									);
								}),
									m.triggerSyncEvent({
										dataStartIndex: O,
										dataEndIndex: S,
									});
							}
						}),
						H(te(m), 'handleMouseEnter', function (g) {
							var O = m.getMouseInfo(g);
							if (O) {
								var S = C(
									C({}, O),
									{},
									{ isTooltipActive: !0 },
								);
								m.setState(S), m.triggerSyncEvent(S);
								var A = m.props.onMouseEnter;
								Z(A) && A(S, g);
							}
						}),
						H(te(m), 'triggeredAfterMouseMove', function (g) {
							var O = m.getMouseInfo(g),
								S = O
									? C(C({}, O), {}, { isTooltipActive: !0 })
									: { isTooltipActive: !1 };
							m.setState(S), m.triggerSyncEvent(S);
							var A = m.props.onMouseMove;
							Z(A) && A(S, g);
						}),
						H(te(m), 'handleItemMouseEnter', function (g) {
							m.setState(function () {
								return {
									isTooltipActive: !0,
									activeItem: g,
									activePayload: g.tooltipPayload,
									activeCoordinate: g.tooltipPosition || {
										x: g.cx,
										y: g.cy,
									},
								};
							});
						}),
						H(te(m), 'handleItemMouseLeave', function () {
							m.setState(function () {
								return { isTooltipActive: !1 };
							});
						}),
						H(te(m), 'handleMouseMove', function (g) {
							g.persist(), m.throttleTriggeredAfterMouseMove(g);
						}),
						H(te(m), 'handleMouseLeave', function (g) {
							m.throttleTriggeredAfterMouseMove.cancel();
							var O = { isTooltipActive: !1 };
							m.setState(O), m.triggerSyncEvent(O);
							var S = m.props.onMouseLeave;
							Z(S) && S(O, g);
						}),
						H(te(m), 'handleOuterEvent', function (g) {
							var O = c0(g),
								S = Xe(m.props, ''.concat(O));
							if (O && Z(S)) {
								var A, E;
								/.*touch.*/i.test(O)
									? (E = m.getMouseInfo(g.changedTouches[0]))
									: (E = m.getMouseInfo(g)),
									S(
										(A = E) !== null && A !== void 0
											? A
											: {},
										g,
									);
							}
						}),
						H(te(m), 'handleClick', function (g) {
							var O = m.getMouseInfo(g);
							if (O) {
								var S = C(
									C({}, O),
									{},
									{ isTooltipActive: !0 },
								);
								m.setState(S), m.triggerSyncEvent(S);
								var A = m.props.onClick;
								Z(A) && A(S, g);
							}
						}),
						H(te(m), 'handleMouseDown', function (g) {
							var O = m.props.onMouseDown;
							if (Z(O)) {
								var S = m.getMouseInfo(g);
								O(S, g);
							}
						}),
						H(te(m), 'handleMouseUp', function (g) {
							var O = m.props.onMouseUp;
							if (Z(O)) {
								var S = m.getMouseInfo(g);
								O(S, g);
							}
						}),
						H(te(m), 'handleTouchMove', function (g) {
							g.changedTouches != null &&
								g.changedTouches.length > 0 &&
								m.throttleTriggeredAfterMouseMove(
									g.changedTouches[0],
								);
						}),
						H(te(m), 'handleTouchStart', function (g) {
							g.changedTouches != null &&
								g.changedTouches.length > 0 &&
								m.handleMouseDown(g.changedTouches[0]);
						}),
						H(te(m), 'handleTouchEnd', function (g) {
							g.changedTouches != null &&
								g.changedTouches.length > 0 &&
								m.handleMouseUp(g.changedTouches[0]);
						}),
						H(te(m), 'triggerSyncEvent', function (g) {
							m.props.syncId !== void 0 &&
								_o.emit(
									Po,
									m.props.syncId,
									g,
									m.eventEmitterSymbol,
								);
						}),
						H(te(m), 'applySyncEvent', function (g) {
							var O = m.props,
								S = O.layout,
								A = O.syncMethod,
								E = m.state.updateId,
								T = g.dataStartIndex,
								P = g.dataEndIndex;
							if (
								g.dataStartIndex !== void 0 ||
								g.dataEndIndex !== void 0
							)
								m.setState(
									C(
										{ dataStartIndex: T, dataEndIndex: P },
										y(
											{
												props: m.props,
												dataStartIndex: T,
												dataEndIndex: P,
												updateId: E,
											},
											m.state,
										),
									),
								);
							else if (g.activeTooltipIndex !== void 0) {
								var $ = g.chartX,
									j = g.chartY,
									M = g.activeTooltipIndex,
									B = m.state,
									I = B.offset,
									L = B.tooltipTicks;
								if (!I) return;
								if (typeof A == 'function') M = A(L, g);
								else if (A === 'value') {
									M = -1;
									for (var R = 0; R < L.length; R++)
										if (L[R].value === g.activeLabel) {
											M = R;
											break;
										}
								}
								var z = C(
										C({}, I),
										{},
										{ x: I.left, y: I.top },
									),
									K = Math.min($, z.x + z.width),
									V = Math.min(j, z.y + z.height),
									q = L[M] && L[M].value,
									Q = Vu(m.state, m.props.data, M),
									_e = L[M]
										? {
												x:
													S === 'horizontal'
														? L[M].coordinate
														: K,
												y:
													S === 'horizontal'
														? V
														: L[M].coordinate,
											}
										: ay;
								m.setState(
									C(
										C({}, g),
										{},
										{
											activeLabel: q,
											activeCoordinate: _e,
											activePayload: Q,
											activeTooltipIndex: M,
										},
									),
								);
							} else m.setState(g);
						}),
						H(te(m), 'renderCursor', function (g) {
							var O,
								S = m.state,
								A = S.isTooltipActive,
								E = S.activeCoordinate,
								T = S.activePayload,
								P = S.offset,
								$ = S.activeTooltipIndex,
								j = S.tooltipAxisBandSize,
								M = m.getTooltipEventType(),
								B =
									(O = g.props.active) !== null &&
									O !== void 0
										? O
										: A,
								I = m.props.layout,
								L = g.key || '_recharts-cursor';
							return _.createElement(GL, {
								key: L,
								activeCoordinate: E,
								activePayload: T,
								activeTooltipIndex: $,
								chartName: n,
								element: g,
								isActive: B,
								layout: I,
								offset: P,
								tooltipAxisBandSize: j,
								tooltipEventType: M,
							});
						}),
						H(te(m), 'renderPolarAxis', function (g, O, S) {
							var A = Xe(g, 'type.axisType'),
								E = Xe(m.state, ''.concat(A, 'Map')),
								T = E && E[g.props[''.concat(A, 'Id')]];
							return D.cloneElement(
								g,
								C(
									C({}, T),
									{},
									{
										className: ne(A, T.className),
										key:
											g.key ||
											''.concat(O, '-').concat(S),
										ticks: Kt(T, !0),
									},
								),
							);
						}),
						H(te(m), 'renderPolarGrid', function (g) {
							var O = g.props,
								S = O.radialLines,
								A = O.polarAngles,
								E = O.polarRadius,
								T = m.state,
								P = T.radiusAxisMap,
								$ = T.angleAxisMap,
								j = ar(P),
								M = ar($),
								B = M.cx,
								I = M.cy,
								L = M.innerRadius,
								R = M.outerRadius;
							return D.cloneElement(g, {
								polarAngles: Array.isArray(A)
									? A
									: Kt(M, !0).map(function (z) {
											return z.coordinate;
										}),
								polarRadius: Array.isArray(E)
									? E
									: Kt(j, !0).map(function (z) {
											return z.coordinate;
										}),
								cx: B,
								cy: I,
								innerRadius: L,
								outerRadius: R,
								key: g.key || 'polar-grid',
								radialLines: S,
							});
						}),
						H(te(m), 'renderLegend', function () {
							var g = m.state.formattedGraphicalItems,
								O = m.props,
								S = O.children,
								A = O.width,
								E = O.height,
								T = m.props.margin || {},
								P = A - (T.left || 0) - (T.right || 0),
								$ = uv({
									children: S,
									formattedGraphicalItems: g,
									legendWidth: P,
									legendContent: f,
								});
							if (!$) return null;
							var j = $.item,
								M = zh($, XL);
							return D.cloneElement(
								j,
								C(
									C({}, M),
									{},
									{
										chartWidth: A,
										chartHeight: E,
										margin: T,
										onBBoxUpdate: m.handleLegendBBoxUpdate,
									},
								),
							);
						}),
						H(te(m), 'renderTooltip', function () {
							var g,
								O = m.props,
								S = O.children,
								A = O.accessibilityLayer,
								E = Le(S, it);
							if (!E) return null;
							var T = m.state,
								P = T.isTooltipActive,
								$ = T.activeCoordinate,
								j = T.activePayload,
								M = T.activeLabel,
								B = T.offset,
								I =
									(g = E.props.active) !== null &&
									g !== void 0
										? g
										: P;
							return D.cloneElement(E, {
								viewBox: C(
									C({}, B),
									{},
									{ x: B.left, y: B.top },
								),
								active: I,
								label: M,
								payload: I ? j : [],
								coordinate: $,
								accessibilityLayer: A,
							});
						}),
						H(te(m), 'renderBrush', function (g) {
							var O = m.props,
								S = O.margin,
								A = O.data,
								E = m.state,
								T = E.offset,
								P = E.dataStartIndex,
								$ = E.dataEndIndex,
								j = E.updateId;
							return D.cloneElement(g, {
								key: g.key || '_recharts-brush',
								onChange: di(
									m.handleBrushChange,
									g.props.onChange,
								),
								data: A,
								x: F(g.props.x) ? g.props.x : T.left,
								y: F(g.props.y)
									? g.props.y
									: T.top +
										T.height +
										T.brushBottom -
										(S.bottom || 0),
								width: F(g.props.width)
									? g.props.width
									: T.width,
								startIndex: P,
								endIndex: $,
								updateId: 'brush-'.concat(j),
							});
						}),
						H(te(m), 'renderReferenceElement', function (g, O, S) {
							if (!g) return null;
							var A = te(m),
								E = A.clipPathId,
								T = m.state,
								P = T.xAxisMap,
								$ = T.yAxisMap,
								j = T.offset,
								M = g.props,
								B = M.xAxisId,
								I = M.yAxisId;
							return D.cloneElement(g, {
								key: g.key || ''.concat(O, '-').concat(S),
								xAxis: P[B],
								yAxis: $[I],
								viewBox: {
									x: j.left,
									y: j.top,
									width: j.width,
									height: j.height,
								},
								clipPathId: E,
							});
						}),
						H(te(m), 'renderActivePoints', function (g) {
							var O = g.item,
								S = g.activePoint,
								A = g.basePoint,
								E = g.childIndex,
								T = g.isRange,
								P = [],
								$ = O.props.key,
								j = O.item.props,
								M = j.activeDot,
								B = j.dataKey,
								I = C(
									C(
										{
											index: E,
											dataKey: B,
											cx: S.x,
											cy: S.y,
											r: 4,
											fill: Gs(O.item),
											strokeWidth: 2,
											stroke: '#fff',
											payload: S.payload,
											value: S.value,
											key: ''
												.concat($, '-activePoint-')
												.concat(E),
										},
										J(M, !1),
									),
									wi(M),
								);
							return (
								P.push(d.renderActiveDot(M, I)),
								A
									? P.push(
											d.renderActiveDot(
												M,
												C(
													C({}, I),
													{},
													{
														cx: A.x,
														cy: A.y,
														key: ''
															.concat(
																$,
																'-basePoint-',
															)
															.concat(E),
													},
												),
											),
										)
									: T && P.push(null),
								P
							);
						}),
						H(te(m), 'renderGraphicChild', function (g, O, S) {
							var A = m.filterFormatItem(g, O, S);
							if (!A) return null;
							var E = m.getTooltipEventType(),
								T = m.state,
								P = T.isTooltipActive,
								$ = T.tooltipAxis,
								j = T.activeTooltipIndex,
								M = T.activeLabel,
								B = m.props.children,
								I = Le(B, it),
								L = A.props,
								R = L.points,
								z = L.isRange,
								K = L.baseLine,
								V = A.item.props,
								q = V.activeDot,
								Q = V.hide,
								_e = V.activeBar,
								Ce = V.activeShape,
								Dt = !!(!Q && P && I && (q || _e || Ce)),
								ke = {};
							E !== 'axis' && I && I.props.trigger === 'click'
								? (ke = {
										onClick: di(
											m.handleItemMouseEnter,
											g.props.onClick,
										),
									})
								: E !== 'axis' &&
									(ke = {
										onMouseLeave: di(
											m.handleItemMouseLeave,
											g.props.onMouseLeave,
										),
										onMouseEnter: di(
											m.handleItemMouseEnter,
											g.props.onMouseEnter,
										),
									});
							var ft = D.cloneElement(g, C(C({}, A.props), ke));
							function W(Lt) {
								return typeof $.dataKey == 'function'
									? $.dataKey(Lt.payload)
									: null;
							}
							if (Dt)
								if (j >= 0) {
									var G, Y;
									if (
										$.dataKey &&
										!$.allowDuplicatedCategory
									) {
										var N =
											typeof $.dataKey == 'function'
												? W
												: 'payload.'.concat(
														$.dataKey.toString(),
													);
										(G = xi(R, N, M)),
											(Y = z && K && xi(K, N, M));
									} else
										(G = R == null ? void 0 : R[j]),
											(Y = z && K && K[j]);
									if (Ce || _e) {
										var de =
											g.props.activeIndex !== void 0
												? g.props.activeIndex
												: j;
										return [
											D.cloneElement(
												g,
												C(
													C(C({}, A.props), ke),
													{},
													{ activeIndex: de },
												),
											),
											null,
											null,
										];
									}
									if (!ee(G))
										return [ft].concat(
											Pr(
												m.renderActivePoints({
													item: A,
													activePoint: G,
													basePoint: Y,
													childIndex: j,
													isRange: z,
												}),
											),
										);
								} else {
									var re,
										me =
											(re = m.getItemByXY(
												m.state.activeCoordinate,
											)) !== null && re !== void 0
												? re
												: { graphicalItem: ft },
										ve = me.graphicalItem,
										De = ve.item,
										ht = De === void 0 ? g : De,
										ii = ve.childIndex,
										Bt = C(
											C(C({}, A.props), ke),
											{},
											{ activeIndex: ii },
										);
									return [D.cloneElement(ht, Bt), null, null];
								}
							return z ? [ft, null, null] : [ft, null];
						}),
						H(te(m), 'renderCustomized', function (g, O, S) {
							return D.cloneElement(
								g,
								C(
									C(
										{
											key: 'recharts-customized-'.concat(
												S,
											),
										},
										m.props,
									),
									m.state,
								),
							);
						}),
						H(te(m), 'renderMap', {
							CartesianGrid: { handler: bi, once: !0 },
							ReferenceArea: {
								handler: m.renderReferenceElement,
							},
							ReferenceLine: { handler: bi },
							ReferenceDot: { handler: m.renderReferenceElement },
							XAxis: { handler: bi },
							YAxis: { handler: bi },
							Brush: { handler: m.renderBrush, once: !0 },
							Bar: { handler: m.renderGraphicChild },
							Line: { handler: m.renderGraphicChild },
							Area: { handler: m.renderGraphicChild },
							Radar: { handler: m.renderGraphicChild },
							RadialBar: { handler: m.renderGraphicChild },
							Scatter: { handler: m.renderGraphicChild },
							Pie: { handler: m.renderGraphicChild },
							Funnel: { handler: m.renderGraphicChild },
							Tooltip: { handler: m.renderCursor, once: !0 },
							PolarGrid: { handler: m.renderPolarGrid, once: !0 },
							PolarAngleAxis: { handler: m.renderPolarAxis },
							PolarRadiusAxis: { handler: m.renderPolarAxis },
							Customized: { handler: m.renderCustomized },
						}),
						(m.clipPathId = ''.concat(
							(b = w.id) !== null && b !== void 0
								? b
								: Yn('recharts'),
							'-clip',
						)),
						(m.throttleTriggeredAfterMouseMove = cd(
							m.triggeredAfterMouseMove,
							(x = w.throttleDelay) !== null && x !== void 0
								? x
								: 1e3 / 60,
						)),
						(m.state = {}),
						m
					);
				}
				return (
					rR(d, [
						{
							key: 'componentDidMount',
							value: function () {
								var b, x;
								this.addListener(),
									this.accessibilityManager.setDetails({
										container: this.container,
										offset: {
											left:
												(b = this.props.margin.left) !==
													null && b !== void 0
													? b
													: 0,
											top:
												(x = this.props.margin.top) !==
													null && x !== void 0
													? x
													: 0,
										},
										coordinateList: this.state.tooltipTicks,
										mouseHandlerCallback:
											this.triggeredAfterMouseMove,
										layout: this.props.layout,
									}),
									this.displayDefaultTooltip();
							},
						},
						{
							key: 'displayDefaultTooltip',
							value: function () {
								var b = this.props,
									x = b.children,
									m = b.data,
									g = b.height,
									O = b.layout,
									S = Le(x, it);
								if (S) {
									var A = S.props.defaultIndex;
									if (
										!(
											typeof A != 'number' ||
											A < 0 ||
											A > this.state.tooltipTicks.length
										)
									) {
										var E =
												this.state.tooltipTicks[A] &&
												this.state.tooltipTicks[A]
													.value,
											T = Vu(this.state, m, A, E),
											P =
												this.state.tooltipTicks[A]
													.coordinate,
											$ = (this.state.offset.top + g) / 2,
											j = O === 'horizontal',
											M = j
												? { x: P, y: $ }
												: { y: P, x: $ },
											B =
												this.state.formattedGraphicalItems.find(
													function (L) {
														var R = L.item;
														return (
															R.type.name ===
															'Scatter'
														);
													},
												);
										B &&
											((M = C(
												C({}, M),
												B.props.points[A]
													.tooltipPosition,
											)),
											(T =
												B.props.points[A]
													.tooltipPayload));
										var I = {
											activeTooltipIndex: A,
											isTooltipActive: !0,
											activeLabel: E,
											activePayload: T,
											activeCoordinate: M,
										};
										this.setState(I),
											this.renderCursor(S),
											this.accessibilityManager.setIndex(
												A,
											);
									}
								}
							},
						},
						{
							key: 'getSnapshotBeforeUpdate',
							value: function (b, x) {
								if (!this.props.accessibilityLayer) return null;
								if (
									(this.state.tooltipTicks !==
										x.tooltipTicks &&
										this.accessibilityManager.setDetails({
											coordinateList:
												this.state.tooltipTicks,
										}),
									this.props.layout !== b.layout &&
										this.accessibilityManager.setDetails({
											layout: this.props.layout,
										}),
									this.props.margin !== b.margin)
								) {
									var m, g;
									this.accessibilityManager.setDetails({
										offset: {
											left:
												(m = this.props.margin.left) !==
													null && m !== void 0
													? m
													: 0,
											top:
												(g = this.props.margin.top) !==
													null && g !== void 0
													? g
													: 0,
										},
									});
								}
								return null;
							},
						},
						{
							key: 'componentDidUpdate',
							value: function (b) {
								Io(
									[Le(b.children, it)],
									[Le(this.props.children, it)],
								) || this.displayDefaultTooltip();
							},
						},
						{
							key: 'componentWillUnmount',
							value: function () {
								this.removeListener(),
									this.throttleTriggeredAfterMouseMove.cancel();
							},
						},
						{
							key: 'getTooltipEventType',
							value: function () {
								var b = Le(this.props.children, it);
								if (b && typeof b.props.shared == 'boolean') {
									var x = b.props.shared ? 'axis' : 'item';
									return s.indexOf(x) >= 0 ? x : o;
								}
								return o;
							},
						},
						{
							key: 'getMouseInfo',
							value: function (b) {
								if (!this.container) return null;
								var x = this.container,
									m = x.getBoundingClientRect(),
									g = DT(m),
									O = {
										chartX: Math.round(b.pageX - g.left),
										chartY: Math.round(b.pageY - g.top),
									},
									S = m.width / x.offsetWidth || 1,
									A = this.inRange(O.chartX, O.chartY, S);
								if (!A) return null;
								var E = this.state,
									T = E.xAxisMap,
									P = E.yAxisMap,
									$ = this.getTooltipEventType();
								if ($ !== 'axis' && T && P) {
									var j = ar(T).scale,
										M = ar(P).scale,
										B =
											j && j.invert
												? j.invert(O.chartX)
												: null,
										I =
											M && M.invert
												? M.invert(O.chartY)
												: null;
									return C(
										C({}, O),
										{},
										{ xValue: B, yValue: I },
									);
								}
								var L = Hh(
									this.state,
									this.props.data,
									this.props.layout,
									A,
								);
								return L ? C(C({}, O), L) : null;
							},
						},
						{
							key: 'inRange',
							value: function (b, x) {
								var m =
										arguments.length > 2 &&
										arguments[2] !== void 0
											? arguments[2]
											: 1,
									g = this.props.layout,
									O = b / m,
									S = x / m;
								if (g === 'horizontal' || g === 'vertical') {
									var A = this.state.offset,
										E =
											O >= A.left &&
											O <= A.left + A.width &&
											S >= A.top &&
											S <= A.top + A.height;
									return E ? { x: O, y: S } : null;
								}
								var T = this.state,
									P = T.angleAxisMap,
									$ = T.radiusAxisMap;
								if (P && $) {
									var j = ar(P);
									return Ef({ x: O, y: S }, j);
								}
								return null;
							},
						},
						{
							key: 'parseEventsOfWrapper',
							value: function () {
								var b = this.props.children,
									x = this.getTooltipEventType(),
									m = Le(b, it),
									g = {};
								m &&
									x === 'axis' &&
									(m.props.trigger === 'click'
										? (g = { onClick: this.handleClick })
										: (g = {
												onMouseEnter:
													this.handleMouseEnter,
												onMouseMove:
													this.handleMouseMove,
												onMouseLeave:
													this.handleMouseLeave,
												onTouchMove:
													this.handleTouchMove,
												onTouchStart:
													this.handleTouchStart,
												onTouchEnd: this.handleTouchEnd,
											}));
								var O = wi(this.props, this.handleOuterEvent);
								return C(C({}, O), g);
							},
						},
						{
							key: 'addListener',
							value: function () {
								_o.on(Po, this.handleReceiveSyncEvent);
							},
						},
						{
							key: 'removeListener',
							value: function () {
								_o.removeListener(
									Po,
									this.handleReceiveSyncEvent,
								);
							},
						},
						{
							key: 'filterFormatItem',
							value: function (b, x, m) {
								for (
									var g = this.state.formattedGraphicalItems,
										O = 0,
										S = g.length;
									O < S;
									O++
								) {
									var A = g[O];
									if (
										A.item === b ||
										A.props.key === b.key ||
										(x === vt(A.item.type) &&
											m === A.childIndex)
									)
										return A;
								}
								return null;
							},
						},
						{
							key: 'renderClipPath',
							value: function () {
								var b = this.clipPathId,
									x = this.state.offset,
									m = x.left,
									g = x.top,
									O = x.height,
									S = x.width;
								return _.createElement(
									'defs',
									null,
									_.createElement(
										'clipPath',
										{ id: b },
										_.createElement('rect', {
											x: m,
											y: g,
											height: O,
											width: S,
										}),
									),
								);
							},
						},
						{
							key: 'getXScales',
							value: function () {
								var b = this.state.xAxisMap;
								return b
									? Object.entries(b).reduce(function (x, m) {
											var g = Uh(m, 2),
												O = g[0],
												S = g[1];
											return C(
												C({}, x),
												{},
												H({}, O, S.scale),
											);
										}, {})
									: null;
							},
						},
						{
							key: 'getYScales',
							value: function () {
								var b = this.state.yAxisMap;
								return b
									? Object.entries(b).reduce(function (x, m) {
											var g = Uh(m, 2),
												O = g[0],
												S = g[1];
											return C(
												C({}, x),
												{},
												H({}, O, S.scale),
											);
										}, {})
									: null;
							},
						},
						{
							key: 'getXScaleByAxisId',
							value: function (b) {
								var x;
								return (x = this.state.xAxisMap) === null ||
									x === void 0 ||
									(x = x[b]) === null ||
									x === void 0
									? void 0
									: x.scale;
							},
						},
						{
							key: 'getYScaleByAxisId',
							value: function (b) {
								var x;
								return (x = this.state.yAxisMap) === null ||
									x === void 0 ||
									(x = x[b]) === null ||
									x === void 0
									? void 0
									: x.scale;
							},
						},
						{
							key: 'getItemByXY',
							value: function (b) {
								var x = this.state,
									m = x.formattedGraphicalItems,
									g = x.activeItem;
								if (m && m.length)
									for (var O = 0, S = m.length; O < S; O++) {
										var A = m[O],
											E = A.props,
											T = A.item,
											P = vt(T.type);
										if (P === 'Bar') {
											var $ = (E.data || []).find(
												function (I) {
													return eN(b, I);
												},
											);
											if ($)
												return {
													graphicalItem: A,
													payload: $,
												};
										} else if (P === 'RadialBar') {
											var j = (E.data || []).find(
												function (I) {
													return Ef(b, I);
												},
											);
											if (j)
												return {
													graphicalItem: A,
													payload: j,
												};
										} else if (
											Ha(A, g) ||
											Ka(A, g) ||
											Ln(A, g)
										) {
											var M = nD({
													graphicalItem: A,
													activeTooltipItem: g,
													itemData: T.props.data,
												}),
												B =
													T.props.activeIndex ===
													void 0
														? M
														: T.props.activeIndex;
											return {
												graphicalItem: C(
													C({}, A),
													{},
													{ childIndex: B },
												),
												payload: Ln(A, g)
													? T.props.data[M]
													: A.props.data[M],
											};
										}
									}
								return null;
							},
						},
						{
							key: 'render',
							value: function () {
								var b = this;
								if (!gc(this)) return null;
								var x = this.props,
									m = x.children,
									g = x.className,
									O = x.width,
									S = x.height,
									A = x.style,
									E = x.compact,
									T = x.title,
									P = x.desc,
									$ = zh(x, VL),
									j = J($, !1);
								if (E)
									return _.createElement(
										$h,
										{
											state: this.state,
											width: this.props.width,
											height: this.props.height,
											clipPathId: this.clipPathId,
										},
										_.createElement(
											Do,
											un({}, j, {
												width: O,
												height: S,
												title: T,
												desc: P,
											}),
											this.renderClipPath(),
											xc(m, this.renderMap),
										),
									);
								if (this.props.accessibilityLayer) {
									var M, B;
									(j.tabIndex =
										(M = this.props.tabIndex) !== null &&
										M !== void 0
											? M
											: 0),
										(j.role =
											(B = this.props.role) !== null &&
											B !== void 0
												? B
												: 'application'),
										(j.onKeyDown = function (L) {
											b.accessibilityManager.keyboardEvent(
												L,
											);
										}),
										(j.onFocus = function () {
											b.accessibilityManager.focus();
										});
								}
								var I = this.parseEventsOfWrapper();
								return _.createElement(
									$h,
									{
										state: this.state,
										width: this.props.width,
										height: this.props.height,
										clipPathId: this.clipPathId,
									},
									_.createElement(
										'div',
										un(
											{
												className: ne(
													'recharts-wrapper',
													g,
												),
												style: C(
													{
														position: 'relative',
														cursor: 'default',
														width: O,
														height: S,
													},
													A,
												),
											},
											I,
											{
												ref: function (R) {
													b.container = R;
												},
											},
										),
										_.createElement(
											Do,
											un({}, j, {
												width: O,
												height: S,
												title: T,
												desc: P,
												style: fR,
											}),
											this.renderClipPath(),
											xc(m, this.renderMap),
										),
										this.renderLegend(),
										this.renderTooltip(),
									),
								);
							},
						},
					]),
					d
				);
			})(D.Component)),
			H(r, 'displayName', n),
			H(
				r,
				'defaultProps',
				C(
					{
						layout: 'horizontal',
						stackOffset: 'none',
						barCategoryGap: '10%',
						barGap: 4,
						margin: { top: 5, right: 5, bottom: 5, left: 5 },
						reverseStackOrder: !1,
						syncMethod: 'index',
					},
					h,
				),
			),
			H(r, 'getDerivedStateFromProps', function (v, d) {
				var w = v.dataKey,
					b = v.data,
					x = v.children,
					m = v.width,
					g = v.height,
					O = v.layout,
					S = v.stackOffset,
					A = v.margin,
					E = d.dataStartIndex,
					T = d.dataEndIndex;
				if (d.updateId === void 0) {
					var P = Kh(v);
					return C(
						C(
							C({}, P),
							{},
							{ updateId: 0 },
							y(C(C({ props: v }, P), {}, { updateId: 0 }), d),
						),
						{},
						{
							prevDataKey: w,
							prevData: b,
							prevWidth: m,
							prevHeight: g,
							prevLayout: O,
							prevStackOffset: S,
							prevMargin: A,
							prevChildren: x,
						},
					);
				}
				if (
					w !== d.prevDataKey ||
					b !== d.prevData ||
					m !== d.prevWidth ||
					g !== d.prevHeight ||
					O !== d.prevLayout ||
					S !== d.prevStackOffset ||
					!sr(A, d.prevMargin)
				) {
					var $ = Kh(v),
						j = {
							chartX: d.chartX,
							chartY: d.chartY,
							isTooltipActive: d.isTooltipActive,
						},
						M = C(
							C({}, Hh(d, b, O)),
							{},
							{ updateId: d.updateId + 1 },
						),
						B = C(C(C({}, $), j), M);
					return C(
						C(C({}, B), y(C({ props: v }, B), d)),
						{},
						{
							prevDataKey: w,
							prevData: b,
							prevWidth: m,
							prevHeight: g,
							prevLayout: O,
							prevStackOffset: S,
							prevMargin: A,
							prevChildren: x,
						},
					);
				}
				if (!Io(x, d.prevChildren)) {
					var I,
						L,
						R,
						z,
						K = Le(x, wr),
						V =
							K &&
							(I =
								(L = K.props) === null || L === void 0
									? void 0
									: L.startIndex) !== null &&
							I !== void 0
								? I
								: E,
						q =
							K &&
							(R =
								(z = K.props) === null || z === void 0
									? void 0
									: z.endIndex) !== null &&
							R !== void 0
								? R
								: T,
						Q = V !== E || q !== T,
						_e = !ee(b),
						Ce = _e && !Q ? d.updateId : d.updateId + 1;
					return C(
						C(
							{ updateId: Ce },
							y(
								C(
									C({ props: v }, d),
									{},
									{
										updateId: Ce,
										dataStartIndex: V,
										dataEndIndex: q,
									},
								),
								d,
							),
						),
						{},
						{ prevChildren: x, dataStartIndex: V, dataEndIndex: q },
					);
				}
				return null;
			}),
			H(r, 'renderActiveDot', function (v, d) {
				var w;
				return (
					D.isValidElement(v)
						? (w = D.cloneElement(v, d))
						: Z(v)
							? (w = v(d))
							: (w = _.createElement(Vs, d)),
					_.createElement(
						pe,
						{ className: 'recharts-active-dot', key: d.key },
						w,
					)
				);
			}),
			r
		);
	},
	OR = wR({
		chartName: 'AreaChart',
		GraphicalChild: Nt,
		axisComponents: [
			{ axisType: 'xAxis', AxisComp: Va },
			{ axisType: 'yAxis', AxisComp: Qs },
		],
		formatAxisMap: TB,
	});
function SR() {
	const e = [
		{ name: 'Mon', min: 80 },
		{ name: 'Tue', min: 60 },
		{ name: 'Wed', min: 150 },
		{ name: 'Thu', min: 130 },
		{ name: 'Fri', min: 240 },
		{ name: 'Sat', min: 290 },
		{ name: 'Sun', min: 240 },
	];
	return k.jsxs('div', {
		className: `font-medium rounded-xl mt-2 lp:ml-2 chart-card max-lp:self-center flex flex-col
			lp:h-chart-lp h-chart-ms lp:w-chart-lp w-chart-ms`,
		children: [
			k.jsx('p', {
				className: 'text-primary chart-title m-2',
				children: 'Weekly User Engagement: Time Spent on Platform',
			}),
			k.jsx(ET, {
				width: '95%',
				height: '90%',
				className: 'self-center',
				children: k.jsxs(OR, {
					data: e,
					children: [
						k.jsx('defs', {
							children: k.jsxs('linearGradient', {
								id: 'min',
								x1: '0',
								y1: '0',
								x2: '0',
								y2: '1',
								children: [
									k.jsx('stop', {
										offset: '5%',
										stopColor: '#FFCE9E',
										stopOpacity: 0.8,
									}),
									k.jsx('stop', {
										offset: '95%',
										stopColor: '#FFCE9E',
										stopOpacity: 0,
									}),
								],
							}),
						}),
						k.jsx(Va, {
							dataKey: 'name',
							scale: 'point',
							padding: { left: 15, right: 15 },
							axisLine: !1,
							tickLine: !1,
							tick: {
								fontSize:
									'clamp(0.625rem, 0.354vw + 0.559rem, 1.125rem)',
								fill: '#FBFBEE',
							},
						}),
						k.jsx(it, {
							cursor: { stroke: '#FBFBEE', strokeWidth: 0.5 },
							contentStyle: {
								backgroundColor: '#79624C',
								border: '1px solid #FBFBEE',
								borderRadius: '5px',
							},
						}),
						k.jsx(Nt, {
							type: 'monotone',
							dataKey: 'min',
							stroke: '#FFCE9E',
							fillOpacity: 1,
							fill: 'url(#min)',
							strokeWidth: 2,
							dot: {
								stroke: '#79624C',
								strokeWidth: 2.5,
								r: 4,
								fill: '#FFCE9E',
							},
						}),
					],
				}),
			}),
		],
	});
}
const $R = () => {
	const e = D.useRef(null),
		[t, r] = D.useState(0);
	D.useEffect(() => {
		const y = () => {
			if (e.current) {
				const v = e.current.getBoundingClientRect().width;
				r(v);
			}
		};
		return (
			y(),
			window.addEventListener('resize', y),
			() => {
				window.removeEventListener('resize', y);
			}
		);
	}, []);
	const n = 102,
		i = 123,
		[a, o] = D.useState(null);
	D.useEffect(() => {
		o(((n / i) * 100).toFixed(2));
	}, [i]);
	const u = 5445,
		s = u % 2e3,
		c = Math.floor(u / 2e3) * 2e3,
		[f, l] = D.useState(null);
	D.useEffect(() => {
		l((s * 100) / 2e3);
	}, [f]);
	const [h, p] = D.useState(null);
	return (
		D.useEffect(() => {
			p(((u * 100) / 1e4).toFixed(2));
		}, [h]),
		k.jsxs('div', {
			ref: e,
			className:
				'min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary',
			children: [
				k.jsx(sy, {}),
				k.jsx('section', {
					className: 'flex justify-center',
					children: k.jsxs('div', {
						className: `lp:mt-20 my-10 relative flex flex-col max-lp:gap-y-3
					lp:mx-container-x-lp mx-container-x-ms lp:h-profile-cards lp:w-profile-cards`,
						children: [
							k.jsxs('div', {
								className: `${t >= 1024 ? 'user-info-lp' : 'border border-primary rounded-xl'}
						lp:self-start max-ms:w-full flex flex-col`,
								children: [
									k.jsxs('div', {
										className:
											'font-dreamscape text-primary cards-title text-center relative',
										children: [
											k.jsx(uy, {
												to: '/dashboard',
												children: k.jsx('img', {
													src: './assets/images/icons/arrow.svg',
													className:
														'arrow absolute left-[4%]',
													alt: 'arrow icon',
												}),
											}),
											k.jsx('h1', {
												children: 'profile',
											}),
										],
									}),
									k.jsx(cy, {}),
									k.jsxs('div', {
										className: `infos-chart flex font-medium mtb:flex-row flex-col lp:justify-start mtb:justify-around
							xl:gap-20 lg:gap-10 gap-3 max-mtb:ml-0 mt-2`,
										children: [
											k.jsx(yy, {}),
											k.jsxs('div', {
												className:
													'flex flex-col items-center gap-2',
												children: [
													k.jsx('p', {
														className:
															'titles max-mtb:self-start max-mtb:ml-3',
														children:
															'Achievements Progression',
													}),
													k.jsx('div', {
														className:
															'progressbar justify-self-center',
														children: k.jsx(ic, {
															value: h,
														}),
													}),
												],
											}),
										],
									}),
									k.jsx(SR, {}),
								],
							}),
							k.jsxs('div', {
								className: `${t >= 1024 ? 'rank-card-lp' : 'border border-primary rounded-xl'}
						bg-no-repeat lp:absolute lp:right-0 lp:top-0 rank flex flex-col`,
								children: [
									k.jsx('div', {
										className:
											'font-dreamscape text-primary cards-title text-center',
										children: k.jsx('h1', {
											className: 'lg:pl-20 lp:pl-14',
											children: 'rank',
										}),
									}),
									k.jsxs('div', {
										className:
											'flex-1 flex items-center justify-center',
										children: [
											k.jsx('div', {
												children: k.jsx('img', {
													src: './assets/images/Achievements/celestial-master.png',
													className:
														'hover:scale-[1.05] transition duration-500 select-none',
													alt: 'achievement badge',
												}),
											}),
											k.jsxs('div', {
												className: 'flex flex-col ',
												children: [
													k.jsx('p', {
														className:
															'font-dreamscape-sans text-level text-center achievement-title',
														children:
															'celestial master',
													}),
													k.jsxs('div', {
														className:
															'flex justify-between text-primary font-medium progress',
														children: [
															k.jsxs('p', {
																children: [
																	c,
																	'xp',
																],
															}),
															k.jsxs('p', {
																children: [
																	c + 2e3,
																	'xp',
																],
															}),
														],
													}),
													k.jsx('div', {
														className:
															'level xl:h-[11px] tb:h-2 h-[7px] rounded-md bg-[rgb(121,118,110,0.7)] mt-[2px] flex items-center',
														children: k.jsx('div', {
															className:
																'lp:mx-2 mx-1 rounded-lg h-[65%] bg-level',
															style: {
																width: `${f}%`,
															},
														}),
													}),
												],
											}),
										],
									}),
								],
							}),
							k.jsxs('div', {
								className: `${t >= 1024 ? 'match-history-lp' : 'border border-primary rounded-xl'}
						lp:absolute lp:bottom-0 lp:right-0 flex flex-col justify-between`,
								children: [
									k.jsx('div', {
										className:
											'font-dreamscape text-primary cards-title text-center',
										children: k.jsx('h1', {
											className: 'lg:pl-40 lp:pl-28',
											children: 'match history',
										}),
									}),
									k.jsxs('div', {
										className: `match-history flex-1 flex mtb:flex-row flex-col
							justify-end max-lp:self-center mb-3`,
										children: [
											k.jsxs('div', {
												className:
													'flex flex-col items-center lp:gap-3 gap-2 lp:self-end self-center',
												children: [
													k.jsx('p', {
														className:
															'titles lp:self-center self-start font-medium',
														children: 'Win Rate',
													}),
													k.jsx('div', {
														className:
															'win-rate justify-self-center',
														children: k.jsx(ic, {
															value: a,
														}),
													}),
												],
											}),
											k.jsxs('div', {
												className:
													'flex flex-col gap-1',
												children: [
													k.jsx(Wr, {}),
													k.jsx(Wr, {}),
													k.jsx(Wr, {}),
													k.jsx(Wr, {}),
													k.jsx(Wr, {}),
												],
											}),
										],
									}),
								],
							}),
						],
					}),
				}),
			],
		})
	);
};
export { $R as default };
