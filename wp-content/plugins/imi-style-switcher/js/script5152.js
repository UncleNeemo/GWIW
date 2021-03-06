	jQuery(document).ready(function($){
			$("ul.layouts li.wide-layout").addClass("active");
        if ($.cookie('boxed') == "yes") {
            $("body").addClass("boxed");
			$("ul.layouts li.boxed-layout").addClass("active");
			$("ul.layouts li.wide-layout").removeClass("active");
        }
		
		if ($.cookie('boxed') == "no") {
			$("ul.layouts li.wide-layout").addClass("active");
        }
        if ($.cookie('BGIMAGE') != null) {
			var StoredBgImage = $.cookie('BGIMAGE');
			$("body").css("background-image","url('"+StoredBgImage+"')");
			$("body").css("background-repeat","no-repeat");
			$("body").css("background-size","cover");
        }
		if ($.cookie('BGPATTERN') != null) {
			var StoredBgPattern = $.cookie('BGPATTERN');
			$("body").css("background-image","url('"+StoredBgPattern+"')");
			$("body").css("background-repeat","repeat");
			$("body").css("background-size","auto");
        }
		if (($.cookie('BGPATTERN') == null) && ($.cookie('BGIMAGE') == null)){
            $("body").css("background-image",'none');
		}
		if ($.cookie('ColorScheme') != null) {
			var StoredColorScheme = $.cookie('ColorScheme');
			$('link#sw-color-css').attr('href',StoredColorScheme);
        }
    });
	jQuery(document).ready(function ($) {
		$(".color-scheme a").click(function () {
			var SCHEME = $(this).attr('data-rel');
			$('link#sw-color-css').attr('href', $(this).attr('data-rel'));
           $.cookie('ColorScheme',SCHEME);
			return false;
		});
		var imgPathStart = sw_local.front_url+"/backgrounds/patterns/";
		var imgPathEnd = new Array("pt1.png","pt2.png","pt3.png","pt4.png","pt5.png","pt6.png","pt7.png","pt8.png","pt9.png","pt10.png","pt11.jpg","pt12.jpg","pt13.jpg","pt14.jpg","pt15.jpg","pt16.png","pt17.png","pt18.png","pt19.png","pt20.png","pt21.png","pt22.png","pt23.png","pt24.png","pt25.png","pt26.png","pt27.png","pt28.png","pt29.png","pt30.png");
		$(".background-selector li img").click(function() {
			var backgroundNumber = $(this).attr("data-nr");
			var bgPattern = imgPathStart+imgPathEnd[backgroundNumber]
			$("body").css("background-image","url('"+bgPattern+"')");
			$("body").css("background-repeat","repeat");
			$("body").css("background-size","auto");
           $.cookie('BGPATTERN',bgPattern);
		   $.removeCookie('BGIMAGE');
		});
		var imgPathStart1 = sw_local.front_url+"/backgrounds/images/";
		var imgPathEnd1 = new Array("img1.jpg","img2.jpg","img3.jpg","img4.jpg","img5.jpg");
		$(".background-selector1 li img").click(function() {
			var backgroundNumber1 = $(this).attr("data-nr");
			var bgImage = imgPathStart1+imgPathEnd1[backgroundNumber1]
			$("body").css("background-image","url('"+bgImage+"')");
			$("body").css("background-repeat","no-repeat");
			$("body").css("background-size","cover");
           $.cookie('BGIMAGE',bgImage);
		   $.removeCookie('BGPATTERN');
		});
		$("ul.layouts li.wide-layout").click(function(){
			$("body").removeClass("boxed");
			$("body").css("background-image","none");
			$("ul.layouts li").removeClass("active");
           $.cookie('boxed','no',  {expires: 7, path: '/'});
           $("body").removeClass("boxed");
			$(this).addClass("active");
			$("body").css("background-image","none");
		   $.removeCookie('BGIMAGE');
		   $.removeCookie('BGPATTERN');
			return false;
		});
		$("ul.layouts li.boxed-layout").click(function(){
			$("body").addClass("boxed");
			$("ul.layouts li").removeClass("active");
           $.cookie('boxed','yes', {expires: 7, path: '/'});
           $("body").addClass("boxed");
			$(this).addClass("active");
           $.cookie('wide','no',  {expires: 7, path: '/'});
			return false;
		});
	});
	
	jQuery(window).load(function(){
		jQuery('.styleswitcher').animate({
					'left': '-206px'
				});
		jQuery('.switch-button').addClass('closed');
	});
	jQuery(document).ready(function ($) {		
		$('.switch-button').click(function () {	
			if ($(this).hasClass('open')) {
				$(this).addClass('closed');
				$(this).removeClass('open');
				$('.styleswitcher').animate({
					'left': '-206px'
				});
			} else {
				if ($(this).hasClass('closed')) {
				$(this).addClass('open');
				$(this).removeClass('closed');
				$('.styleswitcher').animate({
					'left': '0'
				});
				}
			}	
		});
	});
	