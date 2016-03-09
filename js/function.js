
(function(window, undefined){
/*------------------------------------------------------------

		スライド

--------------------------------------------------------------*/
var Slide = function(el){
	this.$el = $(el);
		this.li_current = 0;
		this.li_next = 0;
		this.timer;
		this.loopid;
		this.delay_time;
		this.cnt= 0;
		this.$slide_li = this.$el.find('.area-mainvisual li');//スライド
		this.slide_li_len = this.$el.find('.area-mainvisual li').length;//スライドの数
		this.MAX = this.slide_li_len -1;//スライド最大枚数
		this.MIN = 0;//スライド最小枚数
		this.$arrow_left = this.$el.find('.js-arrow-l');//左アロー
		this.$arrow_right =this.$el.find('.js-arrow-r');//右アロー
		this.$wrp_slide_count = this.$el.find('.js-slide-count');//まるポチ
		this.$slide_count_li;//まるポチの数用
		this.initialSet();
		this.handleEvents();
};
Slide.prototype = {
	
	initialSet: function(el){
		this.setCountBtn();
		this.setArrowBtn();
	},

	setCountBtn: function(el){
		if(this.slide_li_len <= 1) {//1枚のときは表示させない
			return;
		}
		var cnt_dom=[];
		for(var i = 1; i<this.slide_li_len+1; i++) {
			var dom = '<li><span>' + i + '</span></li>';
			cnt_dom.push(dom);
		}
		cnt_dom = cnt_dom.join('');
		var append_dom = '<div class="slide-count">'+
							'<ul class="slide-count-lists clearfix">' +
							cnt_dom +
							'</ul></div>';
		this.$el.find('.wrp-slide-count').append(append_dom);
		this.$el.find('.slide-count-lists li:first-child').addClass('slide-active');
		this.$slide_count_li = this.$el.find('.slide-count-lists li');
	},

	setArrowBtn: function(el){
		if(this.slide_li_len <= 1) {//1枚のときは表示させない
			return;
		}
		$('.btn-slide-arrow').show();
	},

	handleEvents: function(){
		var self = this;
		
		if(this.slide_li_len <= 1) {//1枚のときは表示させない
			return;
		}
		
		self.setLoop();
		this.$slide_count_li.click(function(e){//●ボタンクリック時
			self.stopLoop();
			self.setCurrentIdx(e);
			self.show(self.li_current);
			self.setDelayTime(self.li_current);
			self.loopid = setTimeout(function(){
				self.autoSlide();
			}, self.delay_time);
		});
		
		this.$arrow_left.click(function(){//左アロークリック時
			self.stopLoop();
			self.li_next = self.li_current - 1;
			self.setLimit(self.li_next);
			self.show(self.li_next);
			self.setDelayTime(self.li_next);
			self.loopid = setTimeout(function(){
				self.autoSlide();
			}, self.delay_time);
		});
		
		this.$arrow_right.click(function(){//右アロークリック時
			self.stopLoop();
			self.li_next = self.li_current + 1;
			self.setLimit(self.li_next);
			self.show(self.li_next);
			self.setDelayTime(self.li_next);
			self.loopid = setTimeout(function(){
				self.autoSlide();
			}, self.delay_time);
		});
	},

	setLimit: function(idx){
		if(idx < this.MIN) {
			this.li_next = this.MAX;
		}else if (idx > this.MAX) {
			this.li_next = this.MIN;
		}else {
			this.li_next = idx;
		}
	},

	setCurrentIdx: function(e){
		var idx = $(e.currentTarget).index();
		this.li_current = idx;
	},

	show : function(idx) {
		var self = this;
		this.$slide_count_li.removeClass('slide-active');
		this.$slide_count_li.eq(idx).addClass('slide-active');
		this.$slide_li.fadeOut('normal');
		this.$slide_li.eq(idx).fadeIn('normal');
		this.li_current = idx;
	},

	setLoop : function(){
		var self = this;
		self.autoSlide();
	},

	stopLoop : function(){
		clearTimeout(this.loopid);
	},

	setDelayTime: function(time){
		var self = this;
		var timeclass = self.$slide_li.eq(time).attr('class');
		self.delay_time = timeclass.replace(/[^0-9^\.]/g,"");
	},


	autoSlide : function(){
		var self = this;
		self.li_next = self.li_current + 1;
		
		if(self.cnt > 0) {
			self.setLimit(self.li_next);
			self.setDelayTime(self.li_next);
			self.show(self.li_next);
		}else {//↓リロード時1枚目のみ
			self.li_current = 0;
			self.setLimit(self.li_current);
			self.setDelayTime(self.li_current);
		}
		self.cnt ++;
		self.loopid = setTimeout(function(){
			self.autoSlide();
		}, self.delay_time);
	}

};





/*	------------------------------------------------------------------

					処理実行

	------------------------------------------------------------------		*/
$(function(){
	new Slide('.js-slide-wrp');
});

})(this);
