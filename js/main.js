

const closeBanner = document.querySelector(".fixed-banner"),
	closeBtn = document.querySelector(".fixed-banner__close-img"),
	footer = document.querySelector(".footer");

closeBtn.addEventListener("click", () => {
	closeBanner.style.display = "none",
		footer.style.minHeight = "30px"
});

const sendBtns = document.querySelectorAll(".sendPopup__social-btn");
if (sendBtns) {
	for (let index = 0; index < sendBtns.length; index++) {
		const element = sendBtns[index];
		element.addEventListener("click", function (e) {
			for (let i = 0; i < sendBtns.length; i++) {
				const el = sendBtns[i];
				el.classList.remove('sendPopup__social-btn--active')
			}
			element.classList.add('sendPopup__social-btn--active')

		});

	}
}

let unlock = true;
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	let bg = document.querySelector(".header__bg");

	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
			bg.classList.toggle("_active");
		}
	});
	bg.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
			bg.classList.toggle("_active");

		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	let bg = document.querySelector(".header__bg");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
	bg.classList.remove("_active");


}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}

let headerSub = document.querySelectorAll('.header__menu-item')
if (headerSub) {
	for (let index = 0; index < headerSub.length; index++) {
		const element = headerSub[index];
		const close = element.querySelector('a');
		const openLinks = element.querySelectorAll('ul li a')
		close.addEventListener("click", function (e) {
			if (element.querySelector('ul') != null) {
				element.classList.toggle('_active')
				close.classList.toggle('_active')
			}
		});
		for (let index = 0; index < openLinks.length; index++) {
			const element = openLinks[index];
			const ob = element.parentElement.parentElement.querySelector('ul')
			if (ob != null) {
				element.addEventListener("click", function (e) {
					element.parentElement.classList.toggle('_active')
					ob.classList.toggle('_active')
				});
			}
		}
	}
}





let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let tabs_items = tab.querySelectorAll("._tabs-item");
	let tabs_blocks = tab.querySelectorAll("._tabs-block");
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index];
		tabs_item.addEventListener("click", function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];
				tabs_item.classList.remove('_active');
				tabs_blocks[index].classList.remove('_active');
			}
			tabs_item.classList.add('_active');
			tabs_blocks[index].classList.add('_active');
			e.preventDefault();
		});
	}
}
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});

function Peppermint(a, b) { function c(a, b) { for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]) } function d(a) { var b = ["Webkit", "Moz", "O", "ms"], c = document.createElement("div"); if (void 0 !== c.style[a]) return !0; a = a.charAt(0).toUpperCase() + a.slice(1); for (var d in b) if (void 0 !== c.style[b[d] + a]) return !0; return !1 } function e(a, b) { new RegExp("(\\s|^)" + b + "(\\s|$)").test(a.className) || (a.className += " " + b) } function f(a, b) { a.className = a.className.replace(new RegExp("(\\s+|^)" + b + "(\\s+|$)", "g"), " ").replace(/^\s+|\s+$/g, "") } function g(a, b) { 0 > a ? a = 0 : a > v - 1 && (a = v - 1); for (var c = C.dots.length - 1; c >= 0; c--)f(C.dots[c], G.activeDot); return e(C.dots[a], G.activeDot), E = a, h(-a * C.width, void 0 === b ? F.speed : b), o(), F.onSlideChange && F.onSlideChange(a), a } function h(a, b) { var c = b ? b + "ms" : ""; y.style.webkitTransitionDuration = y.style.MozTransitionDuration = y.style.msTransitionDuration = y.style.OTransitionDuration = y.style.transitionDuration = c, j(a) } function i(a, b) { if (B && clearInterval(B), !b) return void j(a); var c = +new Date, d = C.left; B = setInterval(function () { function e(a, b) { return (b - a) * i + a } var f, g, h = +new Date - c, i = h / b, k = [0, .7, 1, 1]; return i >= 1 ? (j(a), void clearInterval(B)) : (f = a - d, g = e(e(e(k[0], k[1]), e(k[1], k[2])), e(e(k[1], k[2]), e(k[2], k[3]))), void j(Math.floor(g * f + d))) }, 15) } function j(a) { y.style.webkitTransform = "translate(" + a + "px,0) translateZ(0)", y.style.msTransform = y.style.MozTransform = y.style.OTransform = y.style.transform = "translateX(" + a + "px)", C.left = a } function k(a) { y.style.left = a + "px", C.left = a } function l() { var a = E + 1; return a > v - 1 && (a = 0), g(a) } function m() { var a = E - 1; return 0 > a && (a = v - 1), g(a) } function n() { A = !0, o() } function o() { A && (z && clearTimeout(z), z = setTimeout(function () { l() }, F.slideshowInterval)) } function p() { z && clearTimeout(z) } function q() { A = !1, z && clearTimeout(z) } function r() { C.width = a.offsetWidth, y.style.width = C.width * v + "px"; for (var b = 0; v > b; b++)C.slides[b].style.width = C.width + "px"; h(-E * C.width) } function s(a, b, c, d) { b && (a.addEventListener ? a.addEventListener(b, c, !!d) : a.attachEvent("on" + b, c)) } function t() { EventBurrito(y, { mouse: F.mouseDrag, start: function () { e(a, G.drag) }, move: function (a, b, c) { p(), c.x = c.x / (!E && c.x > 0 || E == v - 1 && c.x < 0 ? Math.abs(c.x) / C.width * 2 + 1 : 1), h(c.x - C.width * E) }, end: function (b, c, d) { if (d.x) { var e = Math.abs(d.x) / C.width, h = Math.floor(e) + (e - Math.floor(e) > .25 ? 1 : 0), i = d.time < D + D * h / 1.8 && Math.abs(d.x) - h * C.width > (h ? -C.width / 9 : 20); h += i ? 1 : 0, d.x < 0 ? g(E + h, F.touchSpeed) : g(E - h, F.touchSpeed), F.stopSlideshowAfterInteraction && q() } f(a, G.drag) } }) } function u() { var b = F.slidesContainer || a, c = F.dotsContainer || a; if (!(F.disableIfOneSlide && b.children.length <= 1)) { (!H.transforms || window.opera) && (j = k), (!H.transitions || window.opera) && (h = i), y = F.slidesContainer || document.createElement("div"), e(y, G.slides); for (var d = 0, l = b.children.length; l > d; d++) { var m = b.children[d], o = document.createElement("li"); C.slides.push(m), o.setAttribute("tabindex", "0"), o.setAttribute("role", "button"), o.innerHTML = "<span></span>", function (b, c) { s(c, "click", function () { g(b), F.stopSlideshowAfterInteraction && q() }), s(c, "keyup", function (a) { 13 == a.keyCode && (g(b), F.stopSlideshowAfterInteraction && q()) }), s(c, "mouseup", function () { e(c, G.mouseClicked) }), s(c, "blur", function () { f(c, G.mouseClicked) }, !0), s(m, "focus", m.onfocusin = function () { a.scrollLeft = 0, setTimeout(function () { a.scrollLeft = 0 }, 0), g(b) }, !0) }(d, o), C.dots.push(o) } v = C.slides.length, w = 100 / v, e(a, G.active), f(a, G.inactive), F.mouseDrag && e(a, G.mouse), C.width = a.offsetWidth, y.style.width = C.width * v + "px"; for (var d = 0; v > d; d++)C.slides[d].style.width = C.width + "px", y.appendChild(C.slides[d]); if (F.slidesContainer || a.appendChild(y), F.dots && v > 1) { x = document.createElement("ul"), e(x, G.dots); for (var d = 0, l = C.dots.length; l > d; d++)x.appendChild(C.dots[d]); F.dotsPrepend ? c.insertBefore(x, c.firstChild) : c.appendChild(x) } s(window, "resize", r), s(window, "orientationchange", r), setTimeout(function () { g(F.startSlide, 0) }, 0), F.slideshow && n(), t(), setTimeout(function () { F.onSetup && F.onSetup(v) }, 0) } } var v, w, x, y, z, A, B, C = { slides: [], dots: [], left: 0 }, D = 200, E = 0, F = { speed: 300, touchSpeed: 300, slideshow: !1, slideshowInterval: 4e3, stopSlideshowAfterInteraction: !1, startSlide: 0, mouseDrag: !0, disableIfOneSlide: !0, cssPrefix: "peppermint-", dots: !1, dotsPrepend: !1, dotsContainer: void 0, slidesContainer: void 0, onSlideChange: void 0, onSetup: void 0 }; b && c(F, b); var G = { inactive: F.cssPrefix + "inactive", active: F.cssPrefix + "active", mouse: F.cssPrefix + "mouse", drag: F.cssPrefix + "drag", slides: F.cssPrefix + "slides", dots: F.cssPrefix + "dots", activeDot: F.cssPrefix + "active-dot", mouseClicked: F.cssPrefix + "mouse-clicked" }, H = { transforms: d("transform"), transitions: d("transition") }; return u(), { slideTo: function (a, b) { return g(parseInt(a, 10), b) }, next: l, prev: m, start: n, stop: q, pause: p, getCurrentPos: function () { return E }, getSlidesNumber: function () { return v }, recalcWidth: r } } window.jQuery && !function ($) { $.fn.Peppermint = function (a) { return this.each(function () { $(this).data("Peppermint", Peppermint(this, a)) }), this } }(window.jQuery);

function EventBurrito(a, b) { function c(a, b) { for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]) } function d(a, b, c, d) { return b ? (a.addEventListener ? a.addEventListener(b, c, !!d) : a.attachEvent("on" + b, c), { remove: function () { e(a, b, c, d) } }) : void 0 } function e(a, b, c, d) { b && (a.removeEventListener ? a.removeEventListener(b, c, !!d) : a.detachEvent("on" + b, c)) } function f(a) { a.preventDefault ? a.preventDefault() : a.returnValue = !1 } function g(a) { if (r = { x: (o ? a.clientX : a.touches[0].clientX) - q.x, y: (o ? a.clientY : a.touches[0].clientY) - q.y, time: Number(new Date) - q.time }, r.time - t[t.length - 1].time) { for (var b = 0; b < t.length - 1 && r.time - t[b].time > 80; b++); s = { x: (r.x - t[b].x) / (r.time - t[b].time), y: (r.y - t[b].y) / (r.time - t[b].time) }, t.length >= 5 && t.shift(), t.push({ x: r.x, y: r.y, time: r.time }) } } function h(a, b) { v = !0, o = b, y[o](a) || (d(document, x[o][1], i), d(document, x[o][2], j), d(document, x[o][3], j), m.preventDefault && o && f(a), q = { x: o ? a.clientX : a.touches[0].clientX, y: o ? a.clientY : a.touches[0].clientY, time: Number(new Date) }, n = void 0, r = { x: 0, y: 0, time: 0 }, s = { x: 0, y: 0 }, t = [{ x: 0, y: 0, time: 0 }], m.start(a, q)) } function i(a) { !m.preventScroll && n || y[o](a) || (g(a), (Math.abs(r.x) > m.clickTolerance || Math.abs(r.y) > m.clickTolerance) && (v = !1), void 0 === n && 3 !== o && (n = Math.abs(r.x) < Math.abs(r.y) && !m.preventScroll) || (m.preventDefault && f(a), m.move(a, q, r, s))) } function j(a) { o && g(a), !v && a.target && a.target.blur && a.target.blur(), e(document, x[o][1], i), e(document, x[o][2], j), e(document, x[o][3], j), m.end(a, q, r, s) } function k() { u.push(d(a, x[w][0], function (a) { h(a, w) })), u.push(d(a, "dragstart", f)), m.mouse && !w && u.push(d(a, x[3][0], function (a) { h(a, 3) })), u.push(d(a, "click", function (a) { v ? m.click(a) : f(a) })) } var l = function () { }, m = { preventDefault: !0, clickTolerance: 0, preventScroll: !1, mouse: !0, start: l, move: l, end: l, click: l }; b && c(m, b); var n, o, p = { pointerEvents: !!window.navigator.pointerEnabled, msPointerEvents: !!window.navigator.msPointerEnabled }, q = {}, r = {}, s = {}, t = [], u = [], v = !0, w = p.pointerEvents ? 1 : p.msPointerEvents ? 2 : 0, x = [["touchstart", "touchmove", "touchend", "touchcancel"], ["pointerdown", "pointermove", "pointerup", "pointercancel"], ["MSPointerDown", "MSPointerMove", "MSPointerUp", "MSPointerCancel"], ["mousedown", "mousemove", "mouseup", !1]], y = [function (a) { return a.touches && a.touches.length > 1 || a.scale && 1 !== a.scale }, function (a) { return !a.isPrimary || a.buttons && 1 !== a.buttons || !m.mouse && "touch" !== a.pointerType && "pen" !== a.pointerType }, function (a) { return !a.isPrimary || a.buttons && 1 !== a.buttons || !m.mouse && a.pointerType !== a.MSPOINTER_TYPE_TOUCH && a.pointerType !== a.MSPOINTER_TYPE_PEN }, function (a) { return a.buttons && 1 !== a.buttons }]; return k(), { getClicksAllowed: function () { return v }, kill: function () { for (var a = u.length - 1; a >= 0; a--)u[a].remove() } } }


var slider = Peppermint(document.getElementById('slider'), {
	dots: true,
	speed: 800,
	stopSlideshowAfterInteraction: true,
	startSlide: 0,
	onSetup: function (n) {
		console.log('Peppermint setup done. Slides found: ' + n);
	}
});
let sliderArrs = document.querySelectorAll('.slider__control')
if (sliderArrs) {
	for (let index = 0; index < sliderArrs.length; index++) {
		const element = sliderArrs[index];
		element.addEventListener("click", function (e) {
			if (element.classList.contains('slider__control_prev')) {
				slider.prev();
			} else {
				slider.next();
			}
		});

	}
}



"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();