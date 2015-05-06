(function (doc) {
	doc.addEventListener('DOMContentLoaded', function () {
		
		
		var WatchScroll = function () {
			var reg = new RegExp('(^| +)k_ca($| +)'),
					el = document.getElementsByTagName('*');
			this.nodeList = [];
			for (var i = 0; i < el.length; i++) {
				if (reg.test(el[i].className)){
					this.nodeList[i] = {
						obj: el[i],
						flg: true,
						parlentoffsetY: this.offsetTopAll(el[i])
					};
					this.scrollEvent(this.nodeList[i]);
				}
			}
			return this;
		};
		WatchScroll.prototype.scrollEvent = function (target) {  //スクロールイベント監視
			var this_ = this;
			window.addEventListener('scroll',function (e) {
				if (target.flg) {
					if (window.pageYOffset > (target.parlentoffsetY - document.documentElement.clientHeight)) {
						this_.changeAttr(target);
					}
				}
			},false);
			return this;
		};
		WatchScroll.prototype.offsetTopAll = function (target) {  //BodyまでのoffsetTopトータル
			var top = 0;
			(function (p, y) {
				if(p.offsetParent.nodeName !== 'BODY'){
					y += p.offsetTop;
					arguments.callee(p.offsetParent, y);
				}else{
					y += p.offsetTop;
					top = y;
					return;
				}
			}(target, top));
			return top;
		};
		WatchScroll.prototype.changeAttr = function (target) {  //classを追加する処理
			var end_styles = target['obj'].getAttribute("data-kca-class"),
					default_class = target['obj'].getAttribute('class');
			if (end_styles !== null) {
				target.flg = false;
				(function (target_, default_class_, end_styles_) {
					setTimeout(function() {
						target_['obj'].setAttribute('class', default_class_ + ' ' + end_styles_);
					}, 500);
				}(target, default_class, end_styles));
			}
			return this;
		};
		var watchscroll = new WatchScroll();
		
		
		
		
		
		
	}, false);
}(document));