var myFullpage = new fullpage('#fullpage', {

    sectionsColor: ['#fff', '#fff', '#fff', '#000'],
    anchors: ['bio', 'cases', "skills", 'info'],
    scrollingSpeed: 500,
    autoScrolling: true,
    fitToSection: true,
    fitToSectionDelay: 900,
    responsiveHeight: 900,
    menu: '#menu',
    keyboardScrolling: true,
    navigation: true,
    navigationPosition: 'left',
    scrollBar: true,
    parallax: true,
    dragAndMove: 'vertical',
    parallaxOptions: {
        type: 'reveal',
        percentage: 500,
        property: 'translate',

        // Обработчик при входе на секцию
        afterLoad: function (origin, destination, direction) {
            // Останавливаем все аудио на странице
            document.querySelectorAll('audio').forEach(function (audio) {
                audio.pause();
                audio.currentTime = 0; // Сбрасываем позицию воспроизведения
            });

            // Находим аудио в текущей секции и запускаем его
            const currentSection = destination.item;
            const audioElement = currentSection.querySelector('audio[data-autoplay]');


            if (audioElement) {
                audioElement.play().catch(function (error) {
                    console.warn('Воспроизведение аудио заблокировано:', error);
                });
            }


        },

        // Обработчик при уходе с секции
        onLeave: function (origin, destination, direction) {
            // При переходе на другую секцию останавливаем аудио в уходящей секции
            const leavingSection = origin.item;
            const audioElement = leavingSection.querySelector('audio[data-autoplay]');

            if (audioElement) {
                audioElement.pause();
                audioElement.currentTime = 0;
            }
        }

    },

    onLeave: function (origin, destination, direction) {
        const theme = $(destination.item).data('theme');
        const $elementsToUpdate = $('.share, .buttons, .vicon, .topbar_item, .contact, .btn, .hole, body, .vicon_txt, .oldweb');

        $elementsToUpdate.removeClass('white active');
        if (theme === 'light') {
            $elementsToUpdate.addClass('white active');
        }

        // ДОБАВЛЕННЫЙ КОД: проверка наличия конкретного класса у секции
        if ($(destination.item).hasClass('skills')) {
            // Меняем класс у целевого элемента
            $('.hole, .totop').addClass('special-style');
        } else {
            $('.hole, .totop').removeClass('special-style');
        }

        if ($(destination.item).hasClass('cases')) {
            // Меняем класс у целевого элемента
            $('.topbar').addClass('special-style');
        } else {
            $('.topbar').removeClass('special-style');
        }
    }

});


$(document).on('click', '#moveDown', function () {
    fullpage_api.moveSectionDown();
});


$(".btn").click(function () {
    $(this).toggleClass("open");
});

$(".btn, #menu li").click(function () {
    $(".overlay").toggleClass("open");
});

$("#menu li").click(function () {
    $(".btn").removeClass("open");
});
$(".brand-logo").click(function () {
    $(this).toggleClass("open");
});


$("a.buttons:nth-last-child(1)").click(function () {
    $('a.buttons').toggleClass("hovered");
});


$("a.buttons:nth-last-child(1)").click(function () {
    $('.float-action-button_txt').toggleClass("hovered");
});


var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

function noise(ctx) {

    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        idata = ctx.createImageData(w, h),
        buffer32 = new Uint32Array(idata.data.buffer),
        len = buffer32.length,
        i = 0;

    for (; i < len;)
        buffer32[i++] = ((4000 * Math.random()) | 0) << 30;

    ctx.putImageData(idata, 0, 0);
}

var toggle = true;

// added toggle to get 30 FPS instead of 60 FPS
(function loop() {
    toggle = !toggle;
    if (toggle) {
        requestAnimationFrame(loop);
        return;
    }
    noise(ctx);
    requestAnimationFrame(loop);
})();

var typed = new Typed('.typed', {
    strings: ['ux/ui design', 'development', 'research'],
    typeSpeed: 50,
    backSpeed: 10,
    startDelay: 1000,
    backDelay: 500,
    showCursor: true,
    cursorChar: '|',
    autoInsertCss: true,
    shuffle: true,
    smartBackspace: false,
    loop: true
});

var typed = new Typed('.typed_promo', {
    strings: ['Hi! I am Mikhail Shipov, a UX/UI designer. 💻', 'I work in design and branding, and my programming skills help me create thoughtful solutions. ✨', 'I ve completed numerous projects, from landing pages and websites to design systems and government platforms. 💎'],
    typeSpeed: 6,
    backSpeed: 14,
    startDelay: 500,
    backDelay: 1000,
    showCursor: true,
    cursorChar: '|',
    autoInsertCss: true,
    shuffle: true,
    smartBackspace: false,
    loop: true
});

setTimeout(function () {
    $('body').addClass('selected');
}, 2100)

setTimeout(function () {
    $('.preloader').addClass('selected');
}, 2100)

setTimeout(function () {
    $('.preloader').addClass('none');
}, 2100)


new WOW().init();

$(window).scroll(function () {
    if ($(this).scrollTop() > 1000) {
        $('.totop').fadeIn("slow");
    } else {
        $('.totop').fadeOut("slow");
    }
});


$('a[href^="#"]').on('click', function (event) {

    var target = $($(this).attr('href'));

    if (target.length) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 800);
    }

});

// ____________________ <!-- Initialize Swiper --> _______________________


var swiper = new Swiper(".mySwiper", {
    speed: 600,
    grabCursor: true,
    autoplay: {
        delay: 3200,
        disableOnInteraction: false,
    },
    parallax: true,
    loop: true,
    // pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    // },
    // navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    // },
});

const video = document.querySelector('video');

// Перезапуск при паузе из‑за скролла
video.addEventListener('pause', () => {
    if (!video.ended && video.currentTime > 0) {
        video.play().catch(e => console.log('Автовоспроизведение заблокировано:', e));
    }
});

// Защита от прерываний при скролле
window.addEventListener('scroll', () => {
    if (video.paused) {
        video.play();
    }
}, { passive: true });


const audio = document.getElementById('myAudio');
const muteBtn = document.getElementById('muteBtn');

muteBtn.addEventListener('click', function () {
    audio.muted = !audio.muted;

    if (audio.muted) {
        muteBtn.textContent = 'Unmute';
        muteBtn.classList.add('muted');
    } else {
        muteBtn.textContent = 'Mute';
        muteBtn.classList.remove('muted');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('myAudio');
    audio.volume = 0.2; // 30 % громкости
});
