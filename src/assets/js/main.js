setTimeout(function() {
    document.getElementsByClassName("page-loader")[0].className = "page-loader loading";
}, 0);
setTimeout(function() {
    document.getElementsByClassName("first-slide")[0].className = "first-slide loaded";
}, 1000);
setTimeout(function() {
    document.getElementsByClassName("second-slide")[0].className = "second-slide loaded";
}, 1500);
setTimeout(function() {
    document.getElementsByClassName("page-loader")[0].remove();
}, 1800);

$(window).on("scroll", function() {
    if($(window).scrollTop() > 150) {
        $(".header").addClass("is-fixed");
    } else {
        $(".header").removeClass("is-fixed");
    }
});

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();
$(window).scroll(function(event) {
    didScroll = true;
});
setInterval(function() {
    if(didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    if(Math.abs(lastScrollTop - st) <= delta) return;
    if(st > lastScrollTop && st > navbarHeight) {
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    lastScrollTop = st;
}


var header = document.getElementById("header");
var sxn2 = document.getElementById("two");
var sxn3 = document.getElementById("three");
var hh = header.offsetHeight;
var color = [
[230, 237, 237],
[255, 255, 255],
[13, 13, 13]
];
var c1, c2, c3;
window.addEventListener("scroll", function() {
    var fraction = 0;
    if(pageYOffset < sxn2.offsetTop - hh) {
        c1 = color[0][0];
        c2 = color[0][1];
        c3 = color[0][2];
    } else if((pageYOffset >= sxn2.offsetTop - hh) && (pageYOffset <= sxn2.offsetTop)) {
        fraction = 1 - ((sxn2.offsetTop - pageYOffset) / hh);
        c1 = color[0][0] + Math.round((color[1][0] - color[0][0]) * fraction);
        c2 = color[0][1] + Math.round((color[1][1] - color[0][1]) * fraction);
        c3 = color[0][2] + Math.round((color[1][2] - color[0][2]) * fraction);
    } else if((pageYOffset > sxn2.offsetTop) && (pageYOffset < sxn3.offsetTop - hh)) {
        c1 = color[1][0];
        c2 = color[1][1];
        c3 = color[1][2];
    } else if((pageYOffset >= sxn3.offsetTop - hh) && (pageYOffset <= sxn3.offsetTop)) {
        fraction = 1 - ((sxn3.offsetTop - pageYOffset) / hh);
        c1 = color[1][0] + Math.round((color[2][0] - color[1][0]) * fraction);
        c2 = color[1][1] + Math.round((color[2][1] - color[1][1]) * fraction);
        c3 = color[1][2] + Math.round((color[2][2] - color[1][2]) * fraction);
    } else if(pageYOffset > sxn3.offsetTop) {
        c1 = color[2][0];
        c2 = color[2][1];
        c3 = color[2][2];
    }
    header.style.backgroundColor = "rgb(" + c1 + "," + c2 + "," + c3 + ")";
    header.style.color = "rgb(" + (255 - c1) + "," + (255 - c2) + "," + (255 - c3) + ")";
});



jQuery(function($) {
    'use strict';
    var Header = $('.header');

    function HeaderDarkMode() {
        var scrollTop = $(window).scrollTop(),
        dark = $('.dark-section');
        dark.length && dark.each(function() {
            var top = $(this).position().top,
            height = $(this).outerHeight(),
            bottom = top + height;
            scrollTop >= top - 45 && scrollTop < bottom - 45 ? Header.addClass('dark') : Header.removeClass('dark');
        });
    }
    $(window).scroll(function() {
        HeaderDarkMode();
    });
});


jQuery(function($) {
    'use strict';
    var Header = $('.header');

    function HeaderWhiteMode() {
        var scrollTop = $(window).scrollTop(),
        white = $('.white-section');
        white.length && white.each(function() {
            var top = $(this).position().top,
            height = $(this).outerHeight(),
            bottom = top + height;
            scrollTop >= top - 45 && scrollTop < bottom - 45 ? Header.addClass('white') : Header.removeClass('white');
        });
    }
    $(window).scroll(function() {
        HeaderWhiteMode();
    });
});

var helpers = {
    addZeros: function (n) {
        return (n < 10) ? '0' + n : '' + n;
    }
};

function sliderInit() {
  var $slider = $('.visual-glance-slider');
  $slider.each(function() {
    var $sliderParent = $(this).parent();
    $(this).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      infinite: false,
      speed: 200,
      responsive: [
      {
          breakpoint: 767,
          settings: {
            adaptiveHeight: true
        }
    }
    ]
});

    if ($(this).find('.item').length > 1) {
      $(this).siblings('.slides-numbers').show();
  }

  $(this).on('afterChange', function(event, slick, currentSlide){
      $sliderParent.find('.slides-numbers .active').html(helpers.addZeros(currentSlide + 1));
  });

  var sliderItemsNum = $(this).find('.slick-slide').not('.slick-cloned').length;
  $sliderParent.find('.slides-numbers .total').html(helpers.addZeros(sliderItemsNum));

});
};

sliderInit();

// $(".visual-glance-slider").slick({
//     infinite: false,
//     arrows: false,
//     dots: true,
//     autoplay: false,
//     speed: 500,
//     fade: false,
//     autoplaySpeed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     pauseOnHover: true,
// });


$(document).ready(function() {
    if ($(window).width() < 768) {
        $(".main-phases-details .content-grid").slick({
            infinite: false,
            arrows: false,
            dots: true,
            autoplay: false,
            speed: 500,
            fade: false,
            autoplaySpeed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnHover: true,
        });
    }

    $(".modal").on('hidden.bs.modal', function(e) {
        $(".modal iframe").attr("src", $(".modal iframe").attr("src"));
    });
    $(function() {
        $(window).on("scroll", function() {
            if($(window).scrollTop() > 60) {
                $("header").addClass("active");
            } else {
                $("header").removeClass("active");
            }
        });
    });

    
    // var accessToken = 'b8d689eeef20cb8437c8ffa5323766a17ede5716aad99dd094f939fa08e48ee1';
    // $.ajax({
    //     url: 'https://api.dribbble.com/v2/user/shots?access_token=' + accessToken,
    //     dataType: 'json',
    //     type: 'GET',
    //     success: function(data) {
    //         if (data.length > 0) {
    //             $.each(data.reverse(), function(i, val) {
    //                 let slide = '<a class="shot" target="_blank" href="' +
    //                 val.html_url +
    //                 '" title="' +
    //                 val.title +
    //                 '"><div class="title">' +
    //                 val.title +
    //                 '</div><img src="' +
    //                 val.images.hidpi + '"/></a>';
    //                 if (i < data.length / 2) {
    //                     $('#shots_top').prepend(slide);
    //                 }
    //                 if (i >= data.length / 2) {
    //                     $('#shots_bottom').prepend(slide);
    //                 }
    //             });
    //             let slickShotTopOptions = {
    //                 infinite: true,
    //                 arrows: false,
    //                 dots: false,
    //                 autoplay: true,
    //                 speed: 2000,
    //                 autoplaySpeed: 0,
    //                 slidesToShow: 4,
    //                 slidesToScroll: 1,
    //                 cssEase: 'linear',
    //                 pauseOnHover: true,
    //             }
    //             $("#shots_top").slick(slickShotTopOptions);
    //             let slickShotBottomOptions = slickShotTopOptions;
    //             slickShotBottomOptions.rtl = true;
    //             $("#shots_bottom").slick(slickShotBottomOptions);
    //         } else {
    //             $('#shots').append('<p>No shots yet!</p>');
    //         }
    //     }
    // });
    $(".burger").click(function() {
        $(this).toggleClass('active');
        $("ul.menu li").slideToggle('fast');
    })
    $(window).resize(function() {
        if($(window).width() > 650) {
            $('ul.menu li').removeAttr('style');
        }
    })
    $(".projects-slider").slick({
        infinite: true,
        arrows: false,
        dots: false,
        autoplay: false,
        speed: 1000,
        fade: true,
        autoplaySpeed: 8000,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                dots: true
            }
        }]
    });
    $(window).scroll(function() {
        if($(window).scrollTop() >= ($(".projects-slider").offset().top - 550)) {
            $slider.slick('setOption', 'autoplay', true, true);
        }
    });
    var percentTime;
    var tick;
    var time = 1;
    var progressBarIndex = 0;
    var progress = $('.inProgress');
    $('.progressBarContainer .progressBar').each(function(index) {
        var progress = "<div class='inProgress inProgress" + index + "'></div>";
        $(this).html(progress);
    });

    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        tick = setInterval(interval, 20);
    }

    function interval() {
        if(($('.projects-slider .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
            progressBarIndex = $('.projects-slider .slick-track div[aria-hidden="false"]').data("slickIndex");
            $(".progressBarContainer .item").removeClass('active');
            if(progressBarIndex == 1) {
                $(".inProgress0").addClass('on');
                $(".inProgress1").removeClass('on');
                $($(".progressBarContainer .item")[1]).addClass('active');
            } else if(progressBarIndex == 2) {
                $(".inProgress0").addClass('on');
                $(".inProgress1").addClass('on');
                $($(".progressBarContainer .item")[2]).addClass('active');
            } else if(progressBarIndex == 0) {
                $(".inProgress0").removeClass('on');
                $(".inProgress1").removeClass('on');
                $($(".progressBarContainer .item")[0]).addClass('active');
            }
            startProgressbar();
        } else {
            percentTime += 1 / (time + 2);
            $('.inProgress' + progressBarIndex).css({
                width: percentTime + "%"
            });
            if(percentTime >= 100) {
                $(".progressBarContainer .item").removeClass('active');
                $('.single-item').slick('slickNext');
                if(progressBarIndex == 0) {
                    $(".inProgress0").addClass('on');
                    $($(".progressBarContainer .item")[1]).addClass('active');
                } else if(progressBarIndex == 1) {
                    $(".inProgress0").addClass('on');
                    $(".inProgress1").addClass('on');
                    $($(".progressBarContainer .item")[2]).addClass('active');
                } else if(progressBarIndex == 2) {
                    $(".inProgress0").removeClass('on');
                    $(".inProgress1").removeClass('on');
                    $($(".progressBarContainer .item")[0]).addClass('active');
                }
                progressBarIndex++;
                if(progressBarIndex > 2) {
                    progressBarIndex = 0;
                }
                startProgressbar();
            }
        }
    }

    function resetProgressbar() {
        $('.inProgress').css({
            width: 0 + '%'
        });
        clearInterval(tick);
    }
    startProgressbar();
    $('.progressBarContainer .item').click(function() {
        $(this).addClass('active');
        $(this).sibling().removeClass('active');
        clearInterval(tick);
        var goToThisIndex = $(this).find("span").data("slickIndex");
        $('.single-item').slick('slickGoTo', goToThisIndex, false);
        startProgressbar();
    });
});

$("#projectNext").on("click", function(e) {
    e.preventDefault();
    $(".projects-slider").slick("slickNext");
});
$("#projectPrev").on("click", function(e) {
    e.preventDefault();
    $(".projects-slider").slick("slickPrev");
});

function reveal() {
    var elements = document.querySelectorAll("[data-reveal][data-reveal='true']");
    var length = elements.length;
    for(var count = 0; count < length; count++) {
        var offsetParentTop = 0;
        var temp = elements[count];
        do {
            if(!isNaN(temp.offsetTop)) {
                offsetParentTop += temp.offsetTop;
            }
        }
        while (temp = temp.offsetParent)
            var pageYOffset = window.pageYOffset;
        var viewportHeight = window.innerHeight;
        if(offsetParentTop > pageYOffset && offsetParentTop < pageYOffset + viewportHeight) {
            elements[count].classList.add("section-animation");
        }
    }
}
window.addEventListener("resize", reveal, false);
window.addEventListener("scroll", reveal, false);
var obj = {
    is_loading: false,
    index: 1,
    div: null,
    timeout: 0
};
// Viewport Code
var withinViewport = (function() {
    'use strict';
    if(window.requestAnimationFrame && document.documentElement.classList) {
        document.documentElement.classList.add('enhanced');
        var throttle = function(func, wait, options) {
            var _ = {
                now: Date.now || function() {
                    return new Date().getTime();
                }
            };
            var context, args, result;
            var timeout = null;
            var previous = 0;
            if(!options) {
                options = {};
            }
            var later = function() {
                previous = options.leading === false ? 0 : _.now();
                timeout = null;
                result = func.apply(context, args);
                if(!timeout) {
                    context = args = null;
                }
            };
            return function() {
                var now = _.now();
                if(!previous && options.leading === false) {
                    previous = now;
                }
                var remaining = wait - (now - previous);
                context = this;
                args = arguments;
                if(remaining <= 0 || remaining > wait) {
                    if(timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    previous = now;
                    result = func.apply(context, args);
                    if(!timeout) {
                        context = args = null;
                    }
                } else if(!timeout && options.trailing !== false) {
                    timeout = setTimeout(later, remaining);
                }
                return result;
            };
        };
        var _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
        var revealer = document.querySelectorAll('.revealer');
        var getViewportSize = function() {
            return {
                width: window.document.documentElement.clientWidth,
                height: window.document.documentElement.clientHeight
            };
        };
        var getCurrentScroll = function() {
            return {
                x: window.pageXOffset,
                y: window.pageYOffset
            };
        };
        var getElemInfo = function(elem) {
            var offsetTop = 0;
            var offsetLeft = 0;
            var offsetHeight = elem.offsetHeight;
            var offsetWidth = elem.offsetWidth;
            do {
                if(!isNaN(elem.offsetTop)) {
                    offsetTop += elem.offsetTop;
                }
                if(!isNaN(elem.offsetLeft)) {
                    offsetLeft += elem.offsetLeft;
                }
            } while ((elem = elem.offsetParent) !== null);
            return {
                top: offsetTop,
                left: offsetLeft,
                height: offsetHeight,
                width: offsetWidth
            };
        };
        var checkVisibility = function(elem) {
            var viewportSize = getViewportSize();
            var currentScroll = getCurrentScroll();
            var elemInfo = getElemInfo(elem);
            var spaceOffset = 0.2;
            var elemHeight = elemInfo.height;
            var elemWidth = elemInfo.width;
            var elemTop = elemInfo.top;
            var elemLeft = elemInfo.left;
            var elemBottom = elemTop + elemHeight;
            var elemRight = elemLeft + elemWidth;
            var checkBoundaries = function() {
                var top = elemTop + elemHeight * spaceOffset;
                var left = elemLeft + elemWidth * spaceOffset;
                var bottom = elemBottom - elemHeight * spaceOffset;
                var right = elemRight - elemWidth * spaceOffset;
                var wTop = currentScroll.y + 0;
                var wLeft = currentScroll.x + 0;
                var wBottom = currentScroll.y - 0 + viewportSize.height;
                var wRight = currentScroll.x - 0 + viewportSize.width;
                return(top < wBottom) && (bottom > wTop) && (left > wLeft) && (right < wRight);
            };
            return checkBoundaries();
        };
        var toggleElement = function() {
            for(var i = 0; i < revealer.length; i++) {
                if(checkVisibility(revealer[i])) {
                    revealer[i].classList.add('revealed');
                } else {
                    revealer[i].classList.remove('revealed');
                }
            }
        };
        var scrollHandler = throttle(function() {
            _requestAnimationFrame(toggleElement);
        }, 300);
        var resizeHandler = throttle(function() {
            _requestAnimationFrame(toggleElement);
            fullscreenIntro();
        }, 300);
        scrollHandler();
        if(window.addEventListener) {
            addEventListener('scroll', scrollHandler, false);
            addEventListener('resize', resizeHandler, false);
        } else if(window.attachEvent) {
            window.attachEvent('onscroll', scrollHandler);
            window.attachEvent('onresize', resizeHandler);
        } else {
            window.onscroll = scrollHandler;
            window.onresize = resizeHandler;
        }
    }
    var fullscreenIntro = function() {
        var fullscreen = document.querySelectorAll('.fullscreen');
        for(var i = 0; i < fullscreen.length; i++) {
            fullscreen[i].style.height = getViewportSize().height + 1 + 'px';
        }
    };
    fullscreenIntro();
    return withinViewport;
}());
// Gsap
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t || self).MouseFollower = e()
}(this, function() {
    var t = /*#__PURE__*/ function() {
        function t(e) {
            void 0 === e && (e = {}), this.options = Object.assign({}, {
                el: null,
                container: document.body,
                className: "mf-cursor",
                innerClassName: "mf-cursor-inner",
                textClassName: "mf-cursor-text",
                mediaClassName: "mf-cursor-media",
                mediaBoxClassName: "mf-cursor-media-box",
                iconSvgClassName: "mf-svgsprite",
                iconSvgNamePrefix: "-",
                iconSvgSrc: "",
                dataAttr: "cursor",
                hiddenState: "-hidden",
                textState: "-text",
                iconState: "-icon",
                activeState: "-active",
                mediaState: "-media",
                stateDetection: {
                    "-pointer": "a,button"
                },
                visible: !0,
                visibleOnState: !1,
                speed: .55,
                ease: "expo.out",
                overwrite: !0,
                skewing: 0,
                skewingText: 2,
                skewingIcon: 2,
                skewingMedia: 2,
                skewingDelta: .001,
                skewingDeltaMax: .15,
                stickDelta: .15,
                showTimeout: 0,
                hideOnLeave: !0,
                hideTimeout: 300,
                hideMediaTimeout: 300,
                initialPos: [-window.innerWidth, -window.innerHeight]
            }, e), this.options.visible && null == e.stateDetection && (this.options.stateDetection["-hidden"] = "iframe"), this.gsap = t.gsap || window.gsap, this.el = "string" == typeof this.options.el ? document.querySelector(this.options.el) : this.options.el, this.container = "string" == typeof this.options.container ? document.querySelector(this.options.container) : this.options.container, this.skewing = this.options.skewing, this.pos = {
                x: this.options.initialPos[0],
                y: this.options.initialPos[1]
            }, this.vel = {
                x: 0,
                y: 0
            }, this.event = {}, this.events = [], this.init()
        }
        t.registerGSAP = function(e) {
            t.gsap = e
        };
        var e = t.prototype;
        return e.init = function() {
            this.el || this.create(), this.createSetter(), this.bind(), this.render(!0), this.ticker = this.render.bind(this, !1), this.gsap.ticker.add(this.ticker)
        }, e.create = function() {
            this.el = document.createElement("div"), this.el.className = this.options.className, this.el.classList.add(this.options.hiddenState), this.inner = document.createElement("div"), this.inner.className = this.options.innerClassName, this.text = document.createElement("div"), this.text.className = this.options.textClassName, this.media = document.createElement("div"), this.media.className = this.options.mediaClassName, this.mediaBox = document.createElement("div"), this.mediaBox.className = this.options.mediaBoxClassName, this.media.appendChild(this.mediaBox), this.inner.appendChild(this.media), this.inner.appendChild(this.text), this.el.appendChild(this.inner), this.container.appendChild(this.el)
        }, e.createSetter = function() {
            this.setter = {
                x: this.gsap.quickSetter(this.el, "x", "px"),
                y: this.gsap.quickSetter(this.el, "y", "px"),
                rotation: this.gsap.quickSetter(this.el, "rotation", "deg"),
                scaleX: this.gsap.quickSetter(this.el, "scaleX"),
                scaleY: this.gsap.quickSetter(this.el, "scaleY"),
                wc: this.gsap.quickSetter(this.el, "willChange"),
                inner: {
                    rotation: this.gsap.quickSetter(this.inner, "rotation", "deg")
                }
            }
        }, e.bind = function() {
            var t = this;
            this.event.mouseleave = function() {
                return t.hide()
            }, this.event.mouseenter = function() {
                return t.show()
            }, this.event.mousedown = function() {
                return t.addState(t.options.activeState)
            }, this.event.mouseup = function() {
                return t.removeState(t.options.activeState)
            }, this.event.mousemoveOnce = function() {
                return t.show()
            }, this.event.mousemove = function(e) {
                t.gsap.to(t.pos, {
                    x: t.stick ? t.stick.x - (t.stick.x - e.clientX) * t.options.stickDelta : e.clientX,
                    y: t.stick ? t.stick.y - (t.stick.y - e.clientY) * t.options.stickDelta : e.clientY,
                    overwrite: t.options.overwrite,
                    ease: t.options.ease,
                    duration: t.visible ? t.options.speed : 0,
                    onUpdate: function() {
                        return t.vel = {
                            x: e.clientX - t.pos.x,
                            y: e.clientY - t.pos.y
                        }
                    }
                })
            }, this.event.mouseover = function(e) {
                for(var i = e.target; i && i !== t.container && (!e.relatedTarget || !i.contains(e.relatedTarget)); i = i.parentNode) {
                    for(var s in t.options.stateDetection) i.matches(t.options.stateDetection[s]) && t.addState(s);
                        if(t.options.dataAttr) {
                            var n = t.getFromDataset(i);
                            n.state && t.addState(n.state), n.text && t.setText(n.text), n.icon && t.setIcon(n.icon), n.img && t.setImg(n.img), n.video && t.setVideo(n.video), void 0 !== n.show && t.show(), void 0 !== n.stick && t.setStick(n.stick || i)
                        }
                    }
                }, this.event.mouseout = function(e) {
                    for(var i = e.target; i && i !== t.container && (!e.relatedTarget || !i.contains(e.relatedTarget)); i = i.parentNode) {
                        for(var s in t.options.stateDetection) i.matches(t.options.stateDetection[s]) && t.removeState(s);
                            if(t.options.dataAttr) {
                                var n = t.getFromDataset(i);
                                n.state && t.removeState(n.state), n.text && t.removeText(), n.icon && t.removeIcon(), n.img && t.removeImg(), n.video && t.removeVideo(), void 0 !== n.show && t.hide(), void 0 !== n.stick && t.removeStick()
                            }
                        }
                    }, this.options.hideOnLeave && this.container.addEventListener("mouseleave", this.event.mouseleave, {
                        passive: !0
                    }), this.options.visible && this.container.addEventListener("mouseenter", this.event.mouseenter, {
                        passive: !0
                    }), this.options.activeState && (this.container.addEventListener("mousedown", this.event.mousedown, {
                        passive: !0
                    }), this.container.addEventListener("mouseup", this.event.mouseup, {
                        passive: !0
                    })), this.container.addEventListener("mousemove", this.event.mousemove, {
                        passive: !0
                    }), this.options.visible && this.container.addEventListener("mousemove", this.event.mousemoveOnce, {
                        passive: !0,
                        once: !0
                    }), (this.options.stateDetection || this.options.dataAttr) && (this.container.addEventListener("mouseover", this.event.mouseover, {
                        passive: !0
                    }), this.container.addEventListener("mouseout", this.event.mouseout, {
                        passive: !0
                    }))
                }, e.render = function(t) {
                    if(!0 === t || 0 !== this.vel.y && 0 !== this.vel.x) {
                        if(this.trigger("render"), this.setter.wc("transform"), this.setter.x(this.pos.x), this.setter.y(this.pos.y), this.skewing) {
                            var e = Math.sqrt(Math.pow(this.vel.x, 2) + Math.pow(this.vel.y, 2)),
                            i = Math.min(e * this.options.skewingDelta, this.options.skewingDeltaMax) * this.skewing,
                            s = 180 * Math.atan2(this.vel.y, this.vel.x) / Math.PI;
                            this.setter.rotation(s), this.setter.scaleX(1 + i), this.setter.scaleY(1 - i), this.setter.inner.rotation(-s)
                        }
                    } else this.setter.wc("auto")
                }, e.show = function() {
                    var t = this;
                    this.trigger("show"), clearInterval(this.visibleInt), this.visibleInt = setTimeout(function() {
                        t.el.classList.remove(t.options.hiddenState), t.visible = !0, t.render(!0)
                    }, this.options.showTimeout)
                }, e.hide = function() {
                    var t = this;
                    this.trigger("hide"), clearInterval(this.visibleInt), this.el.classList.add(this.options.hiddenState), this.visibleInt = setTimeout(function() {
                        return t.visible = !1
                    }, this.options.hideTimeout)
                }, e.toggle = function(t) {
                    !0 === t || !1 !== t && !this.visible ? this.show() : this.hide()
                }, e.addState = function(t) {
                    var e;
                    if(this.trigger("addState", t), t === this.options.hiddenState) return this.hide();
                    (e = this.el.classList).add.apply(e, t.split(" ")), this.options.visibleOnState && this.show()
                }, e.removeState = function(t) {
                    var e;
                    if(this.trigger("removeState", t), t === this.options.hiddenState) return this.show();
                    (e = this.el.classList).remove.apply(e, t.split(" ")), this.options.visibleOnState && this.el.className === this.options.className && this.hide()
                }, e.toggleState = function(t, e) {
                    !0 === e || !1 !== e && !this.el.classList.contains(t) ? this.addState(t) : this.removeState(t)
                }, e.setSkewing = function(t) {
                    this.gsap.to(this, {
                        skewing: t
                    })
                }, e.removeSkewing = function() {
                    this.gsap.to(this, {
                        skewing: this.options.skewing
                    })
                }, e.setStick = function(t) {
                    var e = ("string" == typeof t ? document.querySelector(t) : t).getBoundingClientRect();
                    this.stick = {
                        y: e.top + e.height / 2,
                        x: e.left + e.width / 2
                    }
                }, e.removeStick = function() {
                    this.stick = !1
                }, e.setText = function(t) {
                    this.text.innerHTML = t, this.addState(this.options.textState), this.setSkewing(this.options.skewingText)
                }, e.removeText = function() {
                    this.removeState(this.options.textState), this.removeSkewing()
                }, e.setIcon = function(t, e) {
                    void 0 === e && (e = ""), this.text.innerHTML = "<svg class='" + this.options.iconSvgClassName + " " + this.options.iconSvgNamePrefix + t + "' style='" + e + "'><use xlink:href='" + this.options.iconSvgSrc + "#" + t + "'></use></svg>", this.addState(this.options.iconState), this.setSkewing(this.options.skewingIcon)
                }, e.removeIcon = function() {
                    this.removeState(this.options.iconState), this.removeSkewing()
                }, e.setMedia = function(t) {
                    var e = this;
                    clearTimeout(this.mediaInt), t && (this.mediaBox.innerHTML = "", this.mediaBox.appendChild(t)), this.mediaInt = setTimeout(function() {
                        return e.addState(e.options.mediaState)
                    }, 20), this.setSkewing(this.options.skewingMedia)
                }, e.removeMedia = function() {
                    var t = this;
                    clearTimeout(this.mediaInt), this.removeState(this.options.mediaState), this.mediaInt = setTimeout(function() {
                        return t.mediaBox.innerHTML = ""
                    }, this.options.hideMediaTimeout), this.removeSkewing()
                }, e.setImg = function(t) {
                    this.mediaImg || (this.mediaImg = new Image), this.mediaImg.src !== t && (this.mediaImg.src = t), this.setMedia(this.mediaImg)
                }, e.removeImg = function() {
                    this.removeMedia()
                }, e.setVideo = function(t) {
                    this.mediaVideo || (this.mediaVideo = document.createElement("video"), this.mediaVideo.muted = !0, this.mediaVideo.loop = !0, this.mediaVideo.autoplay = !0), this.mediaVideo.src !== t && (this.mediaVideo.src = t, this.mediaVideo.load()), this.mediaVideo.play(), this.setMedia(this.mediaVideo)
                }, e.removeVideo = function() {
                    this.mediaVideo && this.mediaVideo.readyState > 2 && this.mediaVideo.pause(), this.removeMedia()
                }, e.on = function(t, e) {
                    this.events[t] instanceof Array || this.off(t), this.events[t].push(e)
                }, e.off = function(t, e) {
                    this.events[t] = e ? this.events[t].filter(function(t) {
                        return t !== e
                    }) : []
                }, e.trigger = function(t) {
                    var e = arguments,
                    i = this;
                    this.events[t] && this.events[t].forEach(function(t) {
                        return t.call.apply(t, [i, i].concat([].slice.call(e, 1)))
                    })
                }, e.getFromDataset = function(t) {
                    var e = t.dataset;
                    return {
                        state: e[this.options.dataAttr],
                        show: e[this.options.dataAttr + "Show"],
                        text: e[this.options.dataAttr + "Text"],
                        icon: e[this.options.dataAttr + "Icon"],
                        img: e[this.options.dataAttr + "Img"],
                        video: e[this.options.dataAttr + "Video"],
                        stick: e[this.options.dataAttr + "Stick"]
                    }
                }, e.destroy = function() {
                    this.trigger("destroy"), this.gsap.ticker.remove(this.ticker), this.container.removeEventListener("mouseleave", this.event.mouseleave), this.container.removeEventListener("mouseenter", this.event.mouseenter), this.container.removeEventListener("mousedown", this.event.mousedown), this.container.removeEventListener("mouseup", this.event.mouseup), this.container.removeEventListener("mousemove", this.event.mousemove), this.container.removeEventListener("mousemove", this.event.mousemoveOnce), this.container.removeEventListener("mouseover", this.event.mouseover), this.container.removeEventListener("mouseout", this.event.mouseout), this.el && (this.container.removeChild(this.el), this.el = null, this.mediaImg = null, this.mediaVideo = null)
                }, t
            }();
            return t
        });