var Wptl_El_Sp = {
    timelines_hoz : function() {
    	"use strict";
		jQuery(window).resize(function() {
			jQuery('.horizontal-timeline:not(.ex-multi-item)').each(function(){
				var $this = jQuery(this);
				setTimeout(function() {
					var id =  $this.data('id');
					var $slide = jQuery('#'+id+' ul.horizontal-nav li.ex_s_lick-current');
					var crrleft = $slide.offset();
					var ct_left = jQuery('#'+id+' .horizontal-nav').offset();
					var ct_width = $slide.width();
					var ps_width = (crrleft.left - ct_left.left) + ct_width/2;
					jQuery('#'+id+' .timeline-pos-select').css( 'width',ps_width);
				}, 200);
			});
		});
		if(jQuery(".horizontal-timeline.ld-screen").length){
			jQuery(window).on('load', function() {
				jQuery('.horizontal-timeline:not(.at-childdiv) .horizontal-nav').EX_ex_s_lick('setPosition');
				jQuery(".horizontal-timeline.ld-screen").addClass('at-childdiv');
			});
			setTimeout(function() {
				jQuery('.horizontal-timeline:not(.at-childdiv) .horizontal-nav').EX_ex_s_lick('setPosition');
	            jQuery(".horizontal-timeline.ld-screen").addClass('at-childdiv');
	        }, 4000);
		}
		jQuery('.horizontal-timeline:not(.ex-multi-item)').each(function(){
			if(jQuery(this).hasClass('hoz-at')){ return;}
			else{ jQuery(this).addClass('hoz-at')}
			var $this = jQuery(this);
			if($this.hasClass('tl-hozsteps')){center_mode = false}
			var style = $this.data('layout');
			var id =  $this.data('id');
			var count_it =  $this.data('count');
			var slidesshow =  $this.data('slidesshow');
			if(slidesshow==''){ slidesshow = 3;}
			var arrowpos =  $this.data('arrowpos');
			var startit =  $this.data('startit') > 0 ? $this.data('startit') : 1;
			var auto_play = $this.data('autoplay');
			var auto_speed = $this.data('speed');
			var rtl_mode = $this.data('rtl');
			var focus_on = $this.data('focus_on')=='0' ? false : true;
			var start_on =  $this.data('start_on') > 0 ? $this.data('start_on') : 0;

			var mbrp = $this.data('mbrp');
			var tbrp = $this.data('tbrp');
			var tlbrp = $this.data('tlbrp');
			var mb_itm = $this.data('mb_itm');
			if($this.data('infinite')=='0'){
				var infinite = 0;
			}else{
				var infinite =  $this.data('infinite') == 'yes' || $this.data('infinite') == '1' ? true : false;
			}
			
			var center_mode = $this.data('center');
			
			jQuery('#'+id+' .horizontal-content')
			.on('init', function(event, EX_ex_s_lick, currentSlide, nextSlide){
				var $indx = EX_ex_s_lick.currentSlide;
				if($indx==0){
					var $slide = jQuery('#'+id+' ul.horizontal-nav > li:first-child');
				}else {
					var $slide = jQuery('#'+id+' ul.horizontal-nav > li:nth-child('+parseInt($indx + 1)+')');
				}
				setTimeout(function() {
					var crrleft = $slide.offset();
					var ct_left = jQuery('#'+id+' .horizontal-nav').offset();
					var ct_width = $slide.width();
					var ps_width = (crrleft.left - ct_left.left) + ct_width/2;
					jQuery('#'+id+' .timeline-pos-select').css( 'width',ps_width);
				}, 300);
			  }
			)
			.on('beforeChange', function(event, EX_ex_s_lick, currentSlide, nextSlide){
				if(infinite==1 || infinite==0){
					var $indx = EX_ex_s_lick.currentSlide;
					var $slide = jQuery('#'+id+' ul.horizontal-nav li[data-ex_s_lick-index="'+$indx+'"]');
					$slide.prevAll().addClass('prev_item');
					$slide.removeClass('prev_item');
					$slide.nextAll().removeClass('prev_item');
				}else{
					var $li_curr = nextSlide + 1;
					jQuery('#'+id+' .horizontal-nav li.ex_s_lick-slide:nth-child('+$li_curr+')').prevAll().addClass('prev_item');
					jQuery('#'+id+' .horizontal-nav li.ex_s_lick-slide:nth-child('+$li_curr+')').nextAll().removeClass('prev_item');
				}
			  }
			)
			.on('afterChange', function(event, EX_ex_s_lick, direction,nextSlide){
				if(infinite==1){
					$indx = EX_ex_s_lick.currentSlide;
					var $slide = jQuery('#'+id+' ul.horizontal-nav li[data-ex_s_lick-index="'+$indx+'"]');
					if(count_it==slidesshow){
						var crrleft = $slide.offset();
						var ct_left = jQuery('#'+id+' .horizontal-nav').offset();
						var ct_width = $slide.width();
						var ps_width = (crrleft.left - ct_left.left) + ct_width/2;
						jQuery('#'+id+' .timeline-pos-select').css( 'width',ps_width);
					}
				}else{
					var $indx = EX_ex_s_lick.currentSlide;
					if($indx==0 && infinite== 0){
						jQuery('#'+id).resize()
					}
					for (var i = 0; i < EX_ex_s_lick.$slides.length; i++)
					{
						var $slide = jQuery(EX_ex_s_lick.$slides[i]);
						if ($slide.hasClass('ex_s_lick-current')) {
							/* update width */
							var $pos_c = i + 1;
							//var $slide = jQuery(EX_ex_s_lick.$slides[i]);
							var $slide = jQuery('#'+id+' ul.horizontal-nav li:nth-child('+$pos_c+')');
							var crrleft = $slide.offset();
							var ct_left = jQuery('#'+id+' .horizontal-nav').offset();
							var ct_width = $slide.width();
							var ps_width = (crrleft.left - ct_left.left) + ct_width/2;
							jQuery('#'+id+' .timeline-pos-select').css( 'width',ps_width);
							//$slide.removeClass('prev_item');
							//$slide.nextAll().removeClass('prev_item');
							break;
						}
					}
				}
				$slide.prevAll().addClass('prev_item');
				$slide.removeClass('prev_item');
				$slide.nextAll().removeClass('prev_item');
				if(jQuery('#'+id).hasClass('extl-stop-end')){
					if( jQuery('#'+id+' ul.horizontal-nav li').length === ($indx + 1) ){
						EX_ex_s_lick.ex_s_lickSetOption("autoplay",false,false)
					};
				}
			  }
			)
			
			.EX_ex_s_lick({
				infinite: infinite,
				speed: 250,
				initialSlide:start_on,
				rtl: rtl_mode =='yes' ? true : false,
				slidesToShow: 1,
				slidesToScroll: 1,
				adaptiveHeight:true,
				autoplay: auto_play==1 && count_it <= slidesshow ? true : false,
				autoplaySpeed: $this.hasClass('show-all-items') && auto_speed!='' ? auto_speed : 3000,
				arrows: arrowpos !='top' ? true : false,
				prevArrow:'<button type="button" class="ex_s_lick-prev"><i class="fa fa-angle-left"></i></button>',
				nextArrow:'<button type="button" class="ex_s_lick-next"><i class="fa fa-angle-right"></i></button>',
				fade: true,
				asNavFor: '#'+id+' .horizontal-nav',
				pauseOnHover:true,
			});
			jQuery('#'+id+' .horizontal-nav')
			.on('init', function(event, EX_ex_s_lick, direction){
				if(start_on!='' && jQuery.isNumeric(start_on)){
					jQuery('#'+id+' ul.horizontal-nav li').removeClass('ex_s_lick-current');
					var $slide = jQuery(EX_ex_s_lick.$slides[start_on]);
					$slide.addClass('ex_s_lick-current');
					//jQuery(EX_ex_s_lick.$slides[0]).removeClass('ex_s_lick-current');
					//$slide.nextAll().removeClass('prev_item');
					//$slide.prevAll().addClass('prev_item');
				}else{
					var $slide = jQuery(EX_ex_s_lick.$slides[0]);
				}
				//console.log($slide);
				if ($slide.hasClass('ex_s_lick-current')) {
					jQuery('#'+id+' ul.horizontal-nav li.ex_s_lick-current').trigger('click');
					var crrleft = $slide.offset();
					var ct_left = jQuery('#'+id+' .horizontal-nav').offset();
					var ct_width = $slide.width();
					var ps_width = (crrleft.left - ct_left.left) + ct_width/2;
				}
				if(jQuery('#'+id+' ul.horizontal-nav li').hasClass('ex_s_lick-center')){
					jQuery('#'+id+' .timeline-pos-select').css( 'width',(jQuery('#'+id+' .horizontal-nav').width / 2));
				}else{
					jQuery('#'+id+' .timeline-pos-select').css( 'width',ps_width);
				}
				if(infinite==1 || infinite==0){
					var $indx = EX_ex_s_lick.currentSlide;
					var $slide = jQuery('#'+id+' ul.horizontal-nav li[data-ex_s_lick-index="'+$indx+'"]');
					$slide.prevAll().addClass('prev_item');
					$slide.removeClass('prev_item');
					$slide.nextAll().removeClass('prev_item');
				}
			})
			.on('breakpoint', function(event, EX_ex_s_lick, direction){
				jQuery('#'+id).removeClass('at-childdiv');
				setTimeout(function() {
					if(!jQuery('#'+id).hasClass('exwp-dnrs')){
						EX_ex_s_lick.ex_s_lickGoTo(parseInt(start_on));
					}
					jQuery('#'+id).addClass('at-childdiv')
				}, 400);
			})
			.on('afterChange', function(event, EX_ex_s_lick, direction,nextSlide){
				if(jQuery('#'+id).hasClass('extl-stop-end')){
					var $indx = EX_ex_s_lick.currentSlide;
					if( jQuery('#'+id+' ul.horizontal-nav li').length === ($indx + 1) ){
						EX_ex_s_lick.ex_s_lickSetOption("autoplay",false,false)
					};
				}
				if(jQuery('.exwptl-ftlb-bar span').length && jQuery('#'+id+' ul.horizontal-nav li.ex_s_lick-current').hasClass('wptl-feature')){
					var id_ftlb = jQuery('#'+id+' ul.horizontal-nav li.ex_s_lick-current').attr('data-id');
					jQuery('.exwptl-ftlb-bar span').removeClass('ftlb-active');
					jQuery('.exwptl-ftlb-bar [data-scroll='+id_ftlb+']').addClass('ftlb-active');
				}
			})
			.EX_ex_s_lick({
				infinite: infinite,
				speed: 250,
				initialSlide:start_on,
				rtl: rtl_mode =='yes' ? true : false,
				prevArrow:'<button type="button" class="ex_s_lick-prev"><i class="fa fa-angle-left"></i></button>',
				nextArrow:'<button type="button" class="ex_s_lick-next"><i class="fa fa-angle-right"></i></button>',	
				slidesToShow: slidesshow,
				slidesToScroll: 1,
				asNavFor: '#'+id+' .horizontal-content',
				dots: false,
				autoplay: auto_play==1 ? true : false,
				autoplaySpeed: auto_speed!='' ? auto_speed : 3000,
				arrows: arrowpos =='top' ? true : false,
				centerMode: center_mode !='left' ? true : false,
				focusOnSelect: focus_on,
				pauseOnHover:true,
				responsive: [
					{
					  breakpoint: !isNaN(tlbrp) ? tlbrp : 1024,
					  settings: {
						slidesToShow: !isNaN(mb_itm) && mb_itm!='' ? mb_itm : slidesshow,
						slidesToScroll: 1,
					  }
					},
					{
					  breakpoint: !isNaN(tbrp) ? tbrp : 768,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					  }
					},
					{
					  breakpoint: !isNaN(mbrp) ? mbrp : 480,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					  }
					}
				  ]
				
			});
		});
        return this;
    },
	/*--Hoz multi--*/
	timelines_hoz_multi : function() {
		"use strict";
		jQuery('.horizontal-timeline.ex-multi-item').each(function(){
			var $this = jQuery(this);
			if(jQuery(this).hasClass('hoz-at')){ return;}
			else{ jQuery(this).addClass('hoz-at')}
			var id =  $this.data('id');
			var slidesshow =  $this.data('slidesshow');
			if(slidesshow==''){ slidesshow = 3;}
			var startit =  $this.data('startit') > 0 ? $this.data('startit') : 1;
			var auto_play = $this.data('autoplay');
			var auto_speed = $this.data('speed');
			var rtl_mode = $this.data('rtl');
			var start_on =  $this.data('start_on') > 0 ? $this.data('start_on') : 0;
			var focus_on = $this.data('focus_on')=='1' ? true : false;
			if($this.data('infinite')=='0'){
				var infinite = 0;
			}else{
				var infinite =  $this.data('infinite') == 'yes' || $this.data('infinite') == '1' ? true : false;
			}
			var mbrp = $this.data('mbrp');
			var tbrp = $this.data('tbrp');
			var tlbrp = $this.data('tlbrp');
			var mb_itm = $this.data('mb_itm');
			var $resps = [{
			  breakpoint: !isNaN(tlbrp) ? tlbrp : 1024,
			  settings: {
				slidesToShow: !isNaN(mb_itm) && mb_itm!='' ? mb_itm : slidesshow,
				slidesToScroll: 1,
			  }
			},
			{
			  breakpoint: !isNaN(tbrp) ? tbrp : 768,
			  settings: {
				slidesToShow: jQuery('#'+id+' .horizontal-sl-2').length ? 2 : 1,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: !isNaN(mbrp) ? mbrp : 480,
			  settings: {
				slidesToShow: jQuery('#'+id+' .horizontal-sl-2').length ? 2 : 1,
				slidesToScroll: 1
			  }
			}];
			jQuery('#'+id+' .horizontal-nav')
			.on('beforeChange', function(event, EX_ex_s_lick, direction,nextSlide){
				$this.addClass('exstoplb');
			})
			.on('afterChange', function(event, EX_ex_s_lick, direction,nextSlide){
				setTimeout(function(){ 
					$this.removeClass('exstoplb');
				}, 200);
			})
			.EX_ex_s_lick({
				infinite: infinite,
				initialSlide:start_on,
				rtl: rtl_mode =='yes' ? true : false,
				prevArrow:'<button type="button" class="ex_s_lick-prev"><i class="fa fa-angle-left"></i></button>',
				nextArrow:'<button type="button" class="ex_s_lick-next"><i class="fa fa-angle-right"></i></button>',	
				slidesToShow: slidesshow,
				slidesToScroll: 1,
				dots: false,
				autoplay: auto_play==1 ? true : false,
				autoplaySpeed: auto_speed!='' ? auto_speed : 3000,
				arrows: true,
				centerMode:  false,
				focusOnSelect: focus_on,
				adaptiveHeight: true,
				asNavFor: jQuery('#'+id+' .horizontal-sl-2').length ? '#'+id+' .horizontal-sl-2' : '',
				responsive: $resps
				
			});
			if(jQuery('#'+id+' .horizontal-sl-2').length){
				jQuery('#'+id+' .horizontal-sl-2').EX_ex_s_lick({
					infinite: infinite,
					initialSlide:start_on,
					rtl: rtl_mode =='yes' ? true : false,
					slidesToShow: slidesshow,
					slidesToScroll: 1,
					dots: false,
					arrows: false,
					centerMode:  false,
					focusOnSelect: focus_on,
					adaptiveHeight: true,
					asNavFor: '#'+id+' .extl-nav',
					responsive: $resps
				});
			}
		});
		return this;
	}
	
};
(function($){
	"use strict";
	$(document).ready(function($) {
		function exwptl_lightbox(){
			if(!$('.extllightbox').length){ return;}
			$('.extllightbox').each(function(){
				var $class = $(this).data('class');
				var lightbox = GLightbox();
				var cls_outsite = $('.glightbox-desc').data('close-outsite');
				var lightboxDescription = GLightbox({
					selector: $class,
					moreLength:0,
					touchNavigation: true,
					closeOnOutsideClick:cls_outsite==1 ? true : false,
					type:'inline',
					lightboxHtml : '<div id="glightbox-body" class="extl-lb glightbox-container">\
					  <div class="gloader visible"></div>\
					  <div class="goverlay"></div>\
					  <div class="gcontainer">\
					     <div id="glightbox-slider" class="gslider"></div>\
					     <a class="gnext"></a>\
					     <a class="gprev"></a>\
					     <a class="gclose"></a>\
					  </div>\
					</div>',
					afterSlideLoad: function(slide, data) {
						wpex_timeline_gellary_lb();
					},
				});
			});
			return false;
		};
		function wpex_timeline_gellary_lb(){
			if($('.exlb-gallery-carousel').length){
				var rtl_mode = $('.wpex-timeline-list').data('rtl');
				var autoplay = $('.extl-gallery-carousel').data('autoplay');
				var auto_speed = $('.extl-gallery-carousel').data('autoplay_speed');
				$('.loaded .exlb-gallery-carousel:not(.glled-lb)').EX_ex_s_lick({
					dots: true,
					slidesToShow: 1,
					infinite: true,
					speed: 500,
					fade: true,
					cssEase: 'linear',
					adaptiveHeight: true,
					autoplay: autoplay=='yes' ? true : false,
					autoplaySpeed: auto_speed!='' ? auto_speed : 2000,
					arrows: false,
					prevArrow:'<button type="button" class="ex_s_lick-prev"><i class="fa fa-angle-left"></i></button>',
					nextArrow:'<button type="button" class="ex_s_lick-next"><i class="fa fa-angle-right"></i></button>',
					rtl:rtl_mode =='yes' ? true : false,
				});
				$('.loaded .exlb-gallery-carousel').addClass('glled-lb');
			}
		};
		exwptl_lightbox();
		function wpex_isScrolledInto_View(elem){ //in visible
			var docViewTop = jQuery(window).scrollTop();
			var docViewBottom = docViewTop + jQuery(window).height();
			var elemTop = jQuery(elem).offset().top;
			var elemBottom = elemTop + jQuery(elem).height();
			return ((elemBottom <= docViewBottom + 200) && (elemTop >= docViewTop));
		}
		function wpex_infinite_scroll(){
			$('.wpex-timeline-list.wpex-infinite, .wpifgr-timeline.wpex-infinite').each(function(){
				var Id_tm = jQuery(this).attr("id");
				if(!$("#"+Id_tm+" .wpex-loadmore a.loadmore-timeline").length ){
					return;
				}
				var $loadmore = $("#"+Id_tm+" .wpex-loadmore a.loadmore-timeline");
				if (wpex_isScrolledInto_View("#"+Id_tm+" .wpex-loadmore a.loadmore-timeline") && !$loadmore.hasClass('loading') && !$("#"+Id_tm+" .wpex-loadmore").hasClass('hidden')) {
					$loadmore.trigger('click');
				}
			});
		}
		function wpex_timeline_gellary(){
			if($('.extl-gallery-carousel').length){
				var rtl_mode = $('.wpex-timeline-list').data('rtl');
				var autoplay = $('.extl-gallery-carousel').data('autoplay');
				var auto_speed = $('.extl-gallery-carousel').data('autoplay_speed');
				$('.extl-gallery-carousel:not(.glled)').EX_ex_s_lick({
					dots: true,
					slidesToShow: 1,
					infinite: true,
					speed: 500,
					fade: true,
					cssEase: 'linear',
					adaptiveHeight: true,
					autoplay: autoplay=='yes' ? true : false,
					autoplaySpeed: auto_speed!='' ? auto_speed : 2000,
					arrows: true,
					prevArrow:'<button type="button" class="ex_s_lick-prev"><i class="fa fa-angle-left"></i></button>',
					nextArrow:'<button type="button" class="ex_s_lick-next"><i class="fa fa-angle-right"></i></button>',
					rtl:rtl_mode =='yes' ? true : false,
				});
				$('.extl-gallery-carousel').addClass('glled');
				$('.wpex-timeline-list:not(.wptl-lightbox) .extl-gallery-carousel').on('click',function(e) {
			        e.stopPropagation();
			    });
			}
		};
		wpex_timeline_gellary();
		function wpex_timeline_scroll(){
			var $this = $(this);
			$(".wpex-timeline-list, .wpifgr-timeline").each(function(){
				var Id_tm = jQuery(this).attr("id");
				var this_tl = $(this);
				var $tl_top = this_tl.offset().top;
				var $tl_end = $tl_top + this_tl.height();
				$tl_top =  $tl_top -200;
				$tl_end =  $tl_end;
				if (($(document).scrollTop() >= $tl_top) && ($(document).scrollTop() <= $tl_end)) {
					$("#"+Id_tm+" .wpex-filter").addClass('active');
				}else{
					$("#"+Id_tm+" .wpex-filter").removeClass('active');
				}
				var windowHeight = $(window).height(),
				gridTop = windowHeight * .3;
				var scrollTop = $this.scrollTop();
				$("#"+Id_tm+" ul:not(.wpex-taxonomy-filter):not(.page-numbers) li").each(function(){
					var ftid = $(this).data('id');
					var thisTop = $(this).offset().top - $(window).scrollTop();
					var thisBt =  thisTop + $(this).height(); 
					if (thisTop >= gridTop) {
						$('#'+ftid).removeClass('active');
					} else {
						$('#'+ftid).addClass('active');
					}
					/*-- If animation enable --*/
					var animations  		= $("#"+Id_tm).data('animations');
					if((animations !='') && (thisTop < windowHeight * .7)){
						$(this).children(":first").removeClass('scroll-effect').addClass( animations+' animated');
						if($(this).find('.extl-gallery-carousel:not(.glled)').length){
							$(this).find('.extl-gallery-carousel:not(.glled)').EX_ex_s_lick({
								dots: true,
								slidesToShow: 1,
								infinite: true,
								speed: 500,
								fade: true,
								cssEase: 'linear',
								adaptiveHeight: true,
								arrows: true,
								prevArrow:'<button type="button" class="ex_s_lick-prev"><i class="fa fa-angle-left"></i></button>',
								nextArrow:'<button type="button" class="ex_s_lick-next"><i class="fa fa-angle-right"></i></button>',
								rtl:false,
							});
							$(this).find('.extl-gallery-carousel').addClass('glled');
						}
					}
					/*var topDistance = $(this).offset().top;
					var ftid = $(this).data('id');
					var btDistance = topDistance + $(this).height();
					if ( (scrollTop >= topDistance) && ( scrollTop <= btDistance)) {
						$('#'+ftid).addClass('active');
					}else {
						$('#'+ftid).removeClass('active');
					}*/
				});
			});
		};
		$(".wpex-filter:not(.year-ft)").on('click', 'div span',function() {
			var contenId = jQuery(this).attr("id");
			var windowHeight = $(window).height();
			$('html,body').animate({
				scrollTop: $("."+contenId).offset().top - windowHeight * .2},
				'slow');
		});
		if($(".wpex-timeline-list, .wpifgr-timeline").length ){
			//$(".wpex-timeline-list").append('<span class="dline" style="position: absolute; width: 3px; left: 50%; background: #950000; height: 290px; z-index: 0;"><div class="uael-timeline__line__inner" style="height: 38px;width: 100%;"></div></span>');
			wpex_timeline_scroll();
			wpex_infinite_scroll()
			$(document).scroll(function() {
				//$(".dline").height(jQuery(window).scrollTop());
				wpex_timeline_scroll();
				wpex_infinite_scroll()
			});
		}
		/*--year filter--*/
		$(".wpex-filter.year-ft").on('click', 'div span',function() {
			var $this_click = $(this);
			var timelineId = jQuery(this).data('id');
			$('#timeline-'+timelineId).addClass("loading no-more");
			var id_crsc = 'timeline-'+timelineId;
			$('#'+id_crsc+' .wpex-filter.year-ft div span').removeClass("active");
			$this_click.addClass('active');
			var tax = jQuery(this).data('value');
			var mult ='';
			if($('#'+id_crsc+' .wpex-taxonomy-filter li a.active').length ){
				mult = $('#'+id_crsc+' .wpex-taxonomy-filter li a.active').data('value');
			}
			var ajax_url  		= $('#timeline-'+timelineId+' input[name=ajax_url]').val();
			var param_shortcode  		= $('#timeline-'+timelineId+' input[name=param_shortcode]').val();
			$('#'+id_crsc+' .wpex-loadmore.lbt').addClass("hidden");
			$('#timeline-'+timelineId+' ul.wpex-timeline li').fadeOut(300, function() { $(this).remove(); });
			var param = {
				action: 'wpex_filter_year',
				taxonomy_id : tax,
				mult : mult,
				param_shortcode: param_shortcode,
			};
			$.ajax({
				type: "post",
				url: ajax_url,
				dataType: 'json',
				data: (param),
				success: function(data){
					if(data != '0')
					{
						if(data != ''){ 
							var $_container = $('#'+id_crsc+' ul.wpex');
							$_container.html('');
							if(data.html_content != ''){ 
								$('#'+id_crsc+' .wpex-tltitle.wpex-loadmore').prepend('<span class="yft">'+$this_click.html()+'</span>');
								$('#'+id_crsc+' .wpex-loadmore:not(.lbt)').removeClass("hidden");
								$_container.append(data.html_content);
							}else{
								$('#'+id_crsc+' .wpex-loadmore').addClass("hidden");
								$_container.append('<h2 style="text-align: center;">'+data.massage+'</h2>');
							}
							setTimeout(function(){ 
								$('#'+id_crsc+' ul.wpex > li').addClass("active");
							}, 200);
							$('#'+id_crsc).removeClass("loading");
						}
						wpex_timeline_scroll();
						wpex_infinite_scroll();
						wpex_timeline_gellary();
						$(".wpex-timeline-list .wpex-filter:not(.active)").css("right", $(".wpex-timeline-list .wpex-filter").width()*(-1));
					}else{$('.row.loadmore').html('error');}
				}
			});
			return false;
		});
		/*--Taxonomy filter--*/
		function wpex_taxonomy_filter(id_crsc,tax){
			var ajax_url  		= $('#'+id_crsc+' input[name=ajax_url]').val();
			var param_shortcode  		= $('#'+id_crsc+' input[name=param_shortcode]').val();
			$('#'+id_crsc).addClass("loading");
			$('#'+id_crsc+' ul.wpex-timeline li').fadeOut(300, function() { $(this).remove(); });
			$('#'+id_crsc+' input[name=num_page_uu]').val(1);
			$('#'+id_crsc+' input[name=current_page]').val(1);
			$('#'+id_crsc+' .wpex-tltitle.wpex-loadmore .yft').remove();
			var param = {
				action: 'wpex_filter_taxonomy',
				taxonomy_id : tax,
				param_shortcode: param_shortcode,
			};
			$.ajax({
				type: "post",
				url: ajax_url,
				dataType: 'json',
				data: (param),
				success: function(data){
					if(data != '0')
					{
						if(data == ''){ 
							$('#'+id_crsc+' .wpex-loadmore.lbt').addClass("hidden");
						}
						else{
							if($('#'+id_crsc+' ul.infogr-list').length){
								/*var $_count_el = $('#'+id_crsc+' ul.infogr-list > li').length;*/
								var $_count_el_n = data.count;
								/*$_count_el = $_count_el + $_count_el_n;alert($_count_el);*/
								if($_count_el_n%2!=0){
									$('#'+id_crsc+' ul.infogr-list').removeClass('exif-nb-even');
								}else{
									$('#'+id_crsc+' ul.infogr-list').addClass('exif-nb-even');
								}
								var $_container = $('#'+id_crsc+' ul.infogr-list');
								setTimeout(function() {			
									$('#'+id_crsc+' .extl-gallery-carousel').EX_ex_s_lick('setPosition');		
								}, 200);
							}else{
								var $_container = $('#'+id_crsc+' ul.wpex');
							}
							$_container.html('');
							$_container.append(data.html_content);
							$('#'+id_crsc+' .wpex-filter:not(.year-ft) div span').remove();
							$('#'+id_crsc+' .wpex-filter:not(.year-ft) div').append(data.date);
							setTimeout(function(){ 
								$('#'+id_crsc+' ul.wpex > li').addClass("active");
							}, 200);
							$('#'+id_crsc).removeClass("loading");
							$('#'+id_crsc+' input[name=param_query]').val(JSON.stringify(data.data_query));
						}
						if(data.more != 1){
							$('#'+id_crsc).addClass("no-more");
							$('#'+id_crsc+' .wpex-loadmore.lbt').addClass("hidden");
						}else{
							$('#'+id_crsc).removeClass("no-more");
						}
						exwptl_lightbox();
						wpex_timeline_scroll();
						wpex_timeline_gellary();
						$(".wpex-timeline-list .wpex-filter:not(.active)").css("right", $(".wpex-timeline-list .wpex-filter").width()*(-1));
						if($('#'+id_crsc+' .wptl-filter-box.exsticky').length){
							$('html,body').animate({
								scrollTop: $('#'+id_crsc).offset().top -50
							},'slow');
						}
					}else{$('.row.loadmore').html('error');}
				}
			});
		}
		$(".wpex-taxonomy-filter").on('click', 'li',function() {
			var $this_click = $(this);
			var id_crsc = 'timeline-'+jQuery(this).data('id');
			$('#'+id_crsc+' .wpex-taxonomy-filter li').removeClass("active");
			$('#'+id_crsc+' .wpex-taxonomy-filter li').removeClass("crr-at");
			$('#'+id_crsc+' .wpex-filter.year-ft div span').removeClass("active");
			$('#'+id_crsc+' .wpex-loadmore').removeClass("hidden");
			$this_click.addClass('active crr-at');
			$this_click.parents('li').addClass('active');
			var tax = jQuery(this).data('value');
			$("#"+id_crsc+" .wpex-taxonomy-select option[value='" + tax + "']").attr("selected","selected");
			wpex_taxonomy_filter(id_crsc,tax);
			return false;
		});
		$('.wptl-filter-box select[name=wpex_taxonomy]').on('change',function(event) {
			event.preventDefault();
			var $this_click = $(this);
			var id_crsc = 'timeline-'+jQuery(this).find(':selected').data('id');
			var tax = jQuery(this).find(':selected').val();
			$('#'+id_crsc+' .wpex-taxonomy-filter li').removeClass("active");
			$("#"+id_crsc+" .wpex-taxonomy-filter li[data-value='" + tax + "']").addClass('active');
			$("#"+id_crsc+" .wpex-taxonomy-filter li[data-value='" + tax + "']").parents('li').addClass('active');
			wpex_taxonomy_filter(id_crsc,tax);
			return false;
		});
		/*-loadmore-*/
		$('.loadmore-timeline').on('click',function() {
			var $this_click = $(this);
			$this_click.addClass('disable-click');
			var id_crsc  		= $this_click.data('id');
			var n_page = $('#'+id_crsc+' input[name=num_page_uu]').val();
			$('#'+id_crsc+' .loadmore-timeline').addClass("loading");
			var param_query  		= $('#'+id_crsc+' input[name=param_query]').val();
			var page  		= $('#'+id_crsc+' input[name=current_page]').val();
			var num_page  		= $('#'+id_crsc+' input[name=num_page]').val();
			var ajax_url  		= $('#'+id_crsc+' input[name=ajax_url]').val();
			var param_shortcode  		= $('#'+id_crsc+' input[name=param_shortcode]').val();
			var crr_y = '';
			var tl_language  		= $this_click.data('tl_language');
			if($('#'+id_crsc+' li:last-child > input.crr-year').length){
				crr_y = $('#'+id_crsc+' li:last-child > input.crr-year').val();
			}
				var param = {
					action: 'wpex_loadmore_timeline',
					param_query: param_query,
					page: page*1+1,
					param_shortcode: param_shortcode,
					param_year: crr_y,
					lang: tl_language,
				};
	
				$.ajax({
					type: "post",
					url: ajax_url,
					dataType: 'json',
					data: (param),
					success: function(data){
						if(data != '0')
						{
							n_page = n_page*1+1;
							$('#'+id_crsc+' input[name=num_page_uu]').val(n_page)
							if(data.html_content == ''){ 
								$('#'+id_crsc+' .wpex-loadmore.lbt').addClass("hidden");
							}
							else{
								$('#'+id_crsc+' input[name=current_page]').val(page*1+1);
								if($('#'+id_crsc+' ul.infogr-list').length){
									var $_count_el = $('#'+id_crsc+' ul.infogr-list > li').length;
									var $_count_el_n = data.count;
									$_count_el = $_count_el + $_count_el_n;
									if($_count_el%2!=0){
										$('#'+id_crsc+' ul.infogr-list').removeClass('exif-nb-even');
									}else{
										$('#'+id_crsc+' ul.infogr-list').addClass('exif-nb-even');
									}
									var $_container = $('#'+id_crsc+' ul.infogr-list');
									setTimeout(function() {			
										$('#'+id_crsc+' .extl-gallery-carousel').EX_ex_s_lick('setPosition');		
									}, 200);
								}else{
									var $_container = $('#'+id_crsc+' ul.wpex');
								}

								$_container.append(data.html_content);
								$('#'+id_crsc+' .wpex-filter:not(.year-ft) div').append(data.date);
								setTimeout(function(){ 
									$('#'+id_crsc+' ul.wpex > li').addClass("active");
								}, 200);
							}
							if(n_page == num_page){
								$('#'+id_crsc).addClass("no-more");
								$('#'+id_crsc+' .wpex-loadmore.lbt').addClass("hidden");
							}
							wpex_timeline_scroll();
							exwptl_lightbox();
							wpex_timeline_gellary();
							$(".wpex-timeline-list .wpex-filter:not(.active)").css("right", $(".wpex-timeline-list .wpex-filter").width()*(-1));
							$('#'+id_crsc+' .loadmore-timeline').removeClass("loading");
							$this_click.removeClass('disable-click');
						}else{$('.row.loadmore').html('error');}
					}
				});
			return false;	
		});
		/*----*/
		$(".wpex-timeline-list .wpex-filter").css("right", $(".wpex-timeline-list .wpex-filter").width()*(-1));
		$(".wpifgr-timeline .wpex-filter").css("right", $(".wpifgr-timeline .wpex-filter").width()*(-1));
		$(".wpex-timeline-list .wpex-filter > .fa, .wpifgr-timeline .wpex-filter > .fa").on('click',function() {
			var id_crsc  		= $(this).data('id');
			if(!$('#'+id_crsc+' .wpex-filter').hasClass('show-filter')){
				$('#'+id_crsc+' .wpex-filter').addClass('show-filter');
				$('#'+id_crsc+' .wpex-filter').css("right", 0);
			}else{
				$('#'+id_crsc+' .wpex-filter').removeClass('show-filter');
				$('#'+id_crsc+' .wpex-filter').css("right", $('#'+id_crsc+' .wpex-filter').width()*(-1));
			}
		});
		/*--Light box--*/
		wpex_timeline_lightbox();
		function wpex_timeline_lightbox(){
			$('.wpex-timeline-list,.wpifgr-timeline').each(function(){
				var $this = $(this);
				var id =  $this.attr("id");
				if($($this).hasClass('wptl-lightbox')){
					if($($this).hasClass('ifgr-fline')){
						$('#'+id+' ul.infogr-list ').slickLightbox({
							itemSelector: '> li .tlif-img a',
							useHistoryApi: true
						});
					}else{
						if($('#'+id).hasClass('left-tl') && $('#'+id).hasClass('show-icon') && !$('#'+id).hasClass('show-box-color') ){
							$('#'+id+' ul.wpex-timeline').slickLightbox({
								itemSelector: '> li .wpex-content-left > a',
								useHistoryApi: true
							});
						}else if($('#'+id).hasClass('show-clean')){
							$('#'+id+' ul.wpex-timeline').slickLightbox({
								itemSelector: ' .wpex-timeline-label > a',
								useHistoryApi: true
							});
						}else if($('#'+id).hasClass('show-wide_img') || $('#'+id).hasClass('show-simple-bod') || $('#'+id).hasClass('show-box-color')){
							$('#'+id+' ul.wpex-timeline').slickLightbox({
								itemSelector: ' .timeline-details > a',
								useHistoryApi: true
							});
						}else if($('#'+id).hasClass('left-tl') || ($('#'+id).hasClass('sidebyside-tl') && $('#'+id).hasClass('show-simple')) || ($('#'+id).hasClass('center-tl') && !$('#'+id).hasClass('show-icon') && !$('#'+id).hasClass('sidebyside-tl'))){
							$('#'+id+' ul.wpex-timeline').slickLightbox({
								itemSelector: '> li .wpex-timeline-time > a',
								useHistoryApi: true
							});
						}else{
								$('#'+id+' ul.wpex-timeline').slickLightbox({
									itemSelector: '> li .timeline-details > a',
									useHistoryApi: true
								});
						}
						/*-support gallery-*/
						$('#'+id+' ul.wpex-timeline').slickLightbox({
							itemSelector: '> li .extl-gallery-carousel .ex_s_lick-slide > a',
							useHistoryApi: true
						});
					}
				}
			});
		}
		/*--Slider timeline--*/
		Wptl_El_Sp.timelines_hoz_multi();
		$('.horizontal-timeline:not(.ex-multi-item) ul.horizontal-nav li').on('click',function() {
			$(this).prevAll().addClass('prev_item');
			$(this).nextAll().removeClass('prev_item');
		});
		Wptl_El_Sp.timelines_hoz();
		extl_filter_scroll();
		$(document).scroll(function() {
			extl_filter_scroll();
		});
		function extl_filter_scroll(){
			if(!$(".wptl-filter-box").length){
				return;
			}
			$(".wptl-filter-box").each(function(){
				var $this = $(this);
				var $w = $this.width();
				$this.find('.wptl-filters').width($w);
				if($this.closest('.wpifgr-timeline').length){
					var Id_tm = $this.closest('.wpifgr-timeline').attr("id");
				}else{
					var Id_tm = $this.closest('.wpex-timeline-list').attr("id");
				}
				var $tl_top = $("#"+Id_tm).offset().top;
				var $tl_end = $tl_top + $("#"+Id_tm).height();
				$tl_top =  $tl_top -50;
				$tl_end =  $tl_end -100;
				if (($(document).scrollTop() >= $tl_top) && ($(document).scrollTop() <= $tl_end)) {
					$this.addClass('exsticky');//.fadeIn();
				}else{
					$this.removeClass('exsticky');//.fadeOut();
				}
			});
		};
		$(".exwptl-ftlb-bar .ftlb-item:not(.ex-disable)").on('click', function() {
			var contenId = jQuery(this).attr("data-scroll");
			var $this = jQuery(this);
			jQuery('.exwptl-ftlb-bar span').removeClass('ftlb-active');
			$this.addClass('ftlb-active');
			var $index = $("."+contenId).attr('data-ex_s_lick-index');
			var $id_tl = $this.closest('.horizontal-timeline').attr('id');
			jQuery("#"+$id_tl+" ul .ex_s_lick-slide").removeClass('ftlb-focus');
			jQuery("."+contenId).addClass('ftlb-focus');
			if($this.hasClass('extl-multi-ly')){
				if(jQuery("#"+$id_tl).attr('data-infinite') === 'yes'){
					jQuery("."+contenId).trigger('click');
				}else{
					jQuery("."+contenId).closest('ul').EX_ex_s_lick('ex_s_lickGoTo_2',$index,false);
				}
			}else{
				//jQuery("."+contenId).closest('ul').EX_ex_s_lick('ex_s_lickGoTo',$index,false);
				jQuery("."+contenId).trigger('click');
			}
			//jQuery("."+contenId).closest('ul').EX_ex_s_lick('ex_s_lickSetOption','initialSlide',$index);
			//jQuery("."+contenId).closest('ul').EX_ex_s_lick('setPosition');
			//$("."+contenId).addClass('fclick').trigger('click');
		});
	});
}(jQuery));
/*
jQuery(document).ready(function($) {
	$('.wpex-timeline-list').each(function(){
		var $this = $(this);
		var id =  $this.attr("id");
		var ul_h = $('#'+id+' .wpex-timeline').height();
		$(window).scroll( function() {
		    var screenTop = $(document).scrollTop();
		    if(screenTop > ul_h){
		    	screenTop = ul_h;
		    }
		    var last = 0;
		    if($('#'+id+'.no-more.no-end').length){
		    	last = $('#'+id+'.no-more.no-end li:last-child').height();
		    	if(screenTop > (ul_h - last)  ){
			    	screenTop = ul_h - last - 15;
			    }
		    }
		    $('#'+id+' .wpex-active-line').height(screenTop);        
		});
	});
});
*/