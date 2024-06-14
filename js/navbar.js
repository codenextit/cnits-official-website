(function($){
    "use strict"; // Start of use strict    
    
    /* ---------------------------------------------
     Scripts initialization
     --------------------------------------------- */
    
    $(window).on("load", function(){        
        $(window).trigger("scroll");
        $(window).trigger("resize");
    });    
    
    $(document).ready(function(){  
        $(window).trigger("resize");        
        init_classic_menu();
        init_scroll_navigate();     
        init_wow();
    });    
    
    $(window).resize(function(){        
        init_classic_menu_resize();
        init_split_section();
    });
    
    /* --------------------------------------------
     Platform detect
     --------------------------------------------- */
    
    var mobileTest;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTest = true;
        $("html").addClass("mobile");
    }
    else {
        mobileTest = false;
        $("html").addClass("no-mobile");
    }    
    var mozillaTest;
    if (/mozilla/.test(navigator.userAgent)) {
        mozillaTest = true;
    }
    else {
        mozillaTest = false;
    }
    var safariTest;
    if (/safari/.test(navigator.userAgent)) {
        safariTest = true;
    }
    else {
        safariTest = false;
    }
    
    // Detect touch devices    
    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    } else {
        document.documentElement.className += " touch";
    }
    
    
    /* ---------------------------------------------
     Sections helpers
     --------------------------------------------- */
    
    // Progress bars
    var progressBar = $(".progress-bar");
    progressBar.each(function(indx){
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
    });
    
    
    /* ---------------------------------------------
     Nav panel classic
     --------------------------------------------- */
    
    var mobile_nav = $(".mobile-nav");
    var desktop_nav = $(".desktop-nav");
    
    mobile_nav.attr("aria-expanded", "false");
    
    function init_classic_menu_resize(){
        
        // Mobile menu max height
        $(".mobile-on .desktop-nav > ul").css("max-height", $(window).height() - $(".main-nav").height() - 20 + "px");
        
        // Mobile menu style toggle
        if ($(window).width() <= 1024) {
            $(".main-nav").addClass("mobile-on");
            if (!($(".mobile-nav").hasClass("active"))) {
                desktop_nav.css("display", "none");
            }
        }
        else 
            if ($(window).width() > 1024) {
                $(".main-nav").removeClass("mobile-on");
                desktop_nav.css("display", "block");
            }
    }
    
    function init_classic_menu(){    
        
        // Transpaner menu
                
        if ($(".main-nav").hasClass("transparent")){
           $(".main-nav").addClass("js-transparent"); 
        } else if (!($(".main-nav").hasClass("dark"))){
           $(".main-nav").addClass("js-no-transparent-white");
        }
        
        $(window).scroll(function(){        
            
            if ($(window).scrollTop() > 0) {
                $(".js-transparent").removeClass("transparent");
                $(".main-nav, .nav-logo-wrap .logo").addClass("small-height");
                $(".light-after-scroll").removeClass("dark");
                $(".main-nav").addClass("body-scrolled");
            }
            else if ($(window).scrollTop() === 0){
                $(".js-transparent").addClass("transparent");
                $(".main-nav, .nav-logo-wrap .logo").removeClass("small-height");
                $(".light-after-scroll").addClass("dark");
                $(".main-nav").removeClass("body-scrolled");
            }
            
            
        });
        
        // Mobile menu toggle
        
        mobile_nav.click(function(){
                  
            if (desktop_nav.hasClass("js-opened")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                $(this).removeClass("active");
                $(this).attr("aria-expanded", "false");
            }
            else {
                desktop_nav.slideDown("slow", "easeOutQuart").addClass("js-opened");
                $(this).addClass("active");
                $(this).attr("aria-expanded", "true");
                // Fix for responsive menu
                if ($(".main-nav").hasClass("not-top")){
                    $(window).scrollTo(".main-nav", "slow"); 
                }                
            }   
                     
        });
        
        $(document).on("click", function(event){            
            if ($(window).width() <= 1024) {
                var $trigger = $(".main-nav");
                if ($trigger !== event.target && !$trigger.has(event.target).length) {
                    desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                    mobile_nav.removeClass("active");
                    mobile_nav.attr("aria-expanded", "false");
                }
            }
        });
        
        mobile_nav.keydown(function(e){
            if (e.keyCode == 13 || e.keyCode == 32) {
                if (desktop_nav.hasClass("js-opened")) {
                    desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                    $(this).removeClass("active");
                    $(this).attr("aria-expanded", "false");
                }
                else {
                    desktop_nav.slideDown("slow", "easeOutQuart").addClass("js-opened");
                    $(this).addClass("active");
                    $(this).attr("aria-expanded", "true");
                    // Fix for responsive menu
                    if ($(".main-nav").hasClass("not-top")) {
                        $(window).scrollTo(".main-nav", "slow");
                    }
                }
            }        
        });
        
        desktop_nav.find("a:not(.mn-has-sub)").click(function(){
            if (mobile_nav.hasClass("active")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                mobile_nav.removeClass("active");
                mobile_nav.attr("aria-expanded", "false");
            }
        });
        
        
        // Sub menu
        
        var mnHasSub = $(".mn-has-sub");
        var mnThisLi;
        
        mnHasSub.attr({
            "role": "button",
            "aria-expanded": "false",
            "aria-haspopup": "true"
        });
        
        mnHasSub.click(function(){
        
            if ($(".main-nav").hasClass("mobile-on")) {
                mnThisLi = $(this).parent("li:first");
                if (mnThisLi.hasClass("js-opened")) {
                    $(this).attr("aria-expanded", "false");
                    mnThisLi.find(".mn-sub:first").slideUp(function(){
                        mnThisLi.removeClass("js-opened");
                    });
                }
                else {
                    $(this).attr("aria-expanded", "true");
                    mnThisLi.addClass("js-opened");
                    mnThisLi.find(".mn-sub:first").slideDown();
                }
                
                return false;
            }
            
        });
        
        mnThisLi = mnHasSub.parent("li");
        mnThisLi.hover(function(){
        
            if (!($(".main-nav").hasClass("mobile-on"))) {
                $(this).find(".mn-has-sub:first")
                    .attr("aria-expanded", "true")
                    .addClass("js-opened");
                $(this).find(".mn-sub:first").stop(true, true).fadeIn("fast");
            }
            
        }, function(){
        
            if (!($(".main-nav").hasClass("mobile-on"))) {
                $(this).find(".mn-has-sub:first")
                    .attr("aria-expanded", "false")
                    .removeClass("js-opened");
                $(this).find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
            }
            
        });
        
        /* Keyboard navigation for main menu */
       
        mnHasSub.keydown(function(e){            
        
            if ($(".main-nav").hasClass("mobile-on")) {                
                if (e.keyCode == 13 || e.keyCode == 32) {                
                    mnThisLi = $(this).parent("li:first");
                    if (mnThisLi.hasClass("js-opened")) {
                        $(this).attr("aria-expanded", "false");
                        mnThisLi.find(".mn-sub:first").slideUp(function(){                            
                            mnThisLi.removeClass("js-opened");
                        });
                    }
                    else {
                        $(this).attr("aria-expanded", "true");
                        mnThisLi.addClass("js-opened");
                        mnThisLi.find(".mn-sub:first").slideDown();
                    }
                    
                    return false;
                }
            }
            
        });
        
        $(".inner-nav a").focus(function(){
            if (!($(".main-nav").hasClass("mobile-on")) && ($("html").hasClass("no-touch")) && (!($(this).parent("li").find(".mn-sub:first").is(":visible")))) {
                $(this).parent("li").parent().children().find(".mn-has-sub:first")
                    .attr("aria-expanded", "false")
                    .removeClass("js-opened");
                $(this).parent("li").parent().children().find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
            }
        });
     
        $(".inner-nav a").first().keydown(function(e){
            if (!($(".main-nav").hasClass("mobile-on"))) {
                if (e.shiftKey && e.keyCode == 9) {
                    $(this).parent("li").find(".mn-has-sub:first")
                        .attr("aria-expanded", "false")
                        .removeClass("js-opened");
                    $(this).parent("li").find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
                }
            }
        });
        
        $(".mn-sub li:last a").keydown(function(e){
            if (!($(".main-nav").hasClass("mobile-on"))) {
                if (!e.shiftKey && e.keyCode == 9) {
                    $(this).parent("li").parent().parent().find(".mn-has-sub:first")
                        .attr("aria-expanded", "false")
                        .removeClass("js-opened");
                    $(this).parent("li").parent().stop(true, true).delay(100).fadeOut("fast");
                }
            }
        }); 

        $(document).keydown(function(e){
            if (!($(".main-nav").hasClass("mobile-on"))) {
                if (e.keyCode == 27) {
                    if (mnHasSub.parent("li").find(".mn-sub:first li .mn-sub").is(":visible")){
                        mnHasSub.parent("li").find(".mn-sub:first li .mn-has-sub")
                            .attr("aria-expanded", "false")
                            .removeClass("js-opened");
                        mnHasSub.parent("li").find(".mn-sub:first li .mn-sub").stop(true, true).delay(100).fadeOut("fast");
                    } else{
                        mnHasSub.parent("li").find(".mn-has-sub:first")
                            .attr("aria-expanded", "false")
                            .removeClass("js-opened");
                        mnHasSub.parent("li").find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
                    }
                    
                }
            }
        });
         
        mnHasSub.on("click", function () { 
            if (!($(".main-nav").hasClass("mobile-on"))) {                
                if (!($(this).hasClass("js-opened"))){
                    $(this).addClass("js-opened");
                    $(this).attr("aria-expanded", "true");
                    $(this).parent("li").find(".mn-sub:first").fadeIn("fast");
                    return false;
                }
                else{
                    $(this).removeClass("js-opened");
                    $(this).attr("aria-expanded", "false");
                    $(this).parent("li").find(".mn-sub:first").fadeOut("fast");
                    return false;
                }                
            }            
        });
        
    }
    
    
    /* ---------------------------------------------
     Scroll navigation
     --------------------------------------------- */
    
    function init_scroll_navigate(){
        
        const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)") === true || window.matchMedia("(prefers-reduced-motion: reduce)").matches === true;
        
        if (!(!!isReduced)) {
            $(".local-scroll").localScroll({
                target: "body",
                duration: 1500,
                offset: 0,
                easing: "easeInOutQuart",
                onAfter: function(anchor, settings){
                    anchor.focus();
                    if (anchor.is(":focus")) {
                        return !1;
                    }
                    else {
                        anchor.attr("tabindex", "-1");
                        anchor.focus()
                    }        
                }
            });
        } 
        
        var sections = $(".home-section:not(.scroll-nav-invisible), .page-section:not(.scroll-nav-invisible)");
        var menu_links = $(".scroll-nav li a");
        
        $(window).scroll(function(){
        
            sections.filter(":in-viewport:first").each(function(){
                var active_section = $(this);
                var active_link = $('.scroll-nav li a[href="#' + active_section.attr("id") + '"]');
                menu_links.removeClass("active");
                active_link.addClass("active");
            });
            
        });
        
    }
    
    /* ---------------------------------------------
     Split Section
     --------------------------------------------- */   
     
    function init_split_section(){
        var split_column_padding = ( $(window).width() - $(".container").first().width()) / 2;
        $(".split-column-left").css("padding-left", split_column_padding + "px");
        $(".split-column-right").css("padding-right", split_column_padding + "px");
    }
      
    
})(jQuery); // End of use strict

/* ---------------------------------------------
 WOW animations
 --------------------------------------------- */

function init_wow(){
    (function($){
        
        setTimeout(() => {
            
           /* Wow init */
           
            if ($("body").hasClass("appear-animate")) {
                $(".wow").addClass("no-animate");
            }
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 100,
                mobile: false, 
                live: true,
                callback: function(box){                
                    setInterval(function(){ $(box).removeClass("no-animate"); }, 1500);
                }
            });
            
            if ($("body").hasClass("appear-animate")){
               wow.init();            
            } else{
                $(".wow").css("opacity", "1");
            }
            
            /* Wow for portfolio init */
           
            if ($("body").hasClass("appear-animate")) {
                $(".wow-p").addClass("no-animate");
            }
            var wow_p = new WOW({
                boxClass: 'wow-p',
                animateClass: 'animated',
                offset: 100,
                mobile: false, 
                live: true,
                callback: function(box){                
                    setInterval(function(){ $(box).removeClass("no-animate"); }, 1500);
                }
            });
            
            if ($("body").hasClass("appear-animate")){
               wow_p.init();            
            } else{
                $(".wow-p").css("opacity", "1");
            }
            
            /* Wow for menu bar init */
            
            if (($("body").hasClass("appear-animate")) && ($(window).width() >= 1024) && ($("html").hasClass("no-mobile"))){
               $(".wow-menubar").addClass("no-animate").addClass("fadeInDown").addClass("animated");  
               setInterval(function(){ $(".wow-menubar").removeClass("no-animate"); }, 1500);         
            } else{
                $(".wow-menubar").css("opacity", "1");
            }                        
        
        }, "100"); 
        
        /* Splitting JS accessibility fix */
           
        $("[data-splitting='chars']").each(function(){
            var splitting_chars = $(this);
            var splitting_chars_cont = splitting_chars.html();
            splitting_chars.attr("aria-hidden", "true");
            splitting_chars.before("<span class='visually-hidden user-select-none'>" + splitting_chars_cont + "</span>");
        });
        
    })(jQuery);
}