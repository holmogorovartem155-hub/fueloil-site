/* ============================================================
   🖤 FUELOIL — SCRIPT (Redesign by reference)
   ============================================================ */

(function () {
    'use strict';

    // ==========================================================
    // ДАННЫЕ ТРЕКОВ (тексты песен)
    // ==========================================================
    const TRACKS = {
        'wingless': {
            title: 'Wingless',
            lyrics: `
                <p><em>[Verse 1]</em><br>
                Weightless, without noise and sound.<br>
                Like a stone on the ground.</p>
                <p><em>[Verse 2]</em><br>
                I wish I could hold the stars,<br>
                But your back gets only scars.<br>
                'Cause the feathers never grew,<br>
                I know this world is not for you.</p>
                <p><em>[Chorus]</em><br>
                They promised wings, they gave you chains.<br>
                They promised freedom, but it's all the same...</p>
            `
        },
        'hey-mom': {
            title: 'Hey Mom',
            lyrics: `
                <p><em>[Verse 1]</em><br>
                Hey mom, I'm not the one you wanted.<br>
                Hey mom, I'm not the one you dreamed.</p>
                <p><em>[Chorus]</em><br>
                I'm sorry for the things I've done,<br>
                But I'm still here, still breathing.</p>
            `
        },
        'cherry-love': {
            title: 'Cherry Love',
            lyrics: `
                <p><em>[Verse 1]</em><br>
                Cherry love, so sweet and bitter.<br>
                Cherry love, you're all I need.</p>
                <p><em>[Chorus]</em><br>
                Don't leave me now, don't leave me here,<br>
                With all these feelings I can't steer.</p>
            `
        },
        'silly-fever': {
            title: 'Silly Fever',
            lyrics: `
                <p><em>[Verse 1]</em><br>
                Silly fever in my head,<br>
                Silly words that I have said.</p>
                <p><em>[Chorus]</em><br>
                I can't stop, I can't sleep,<br>
                This fever's got me on my knees.</p>
            `
        },
        'freedom': {
            title: 'Freedom',
            lyrics: `
                <p><em>[Verse 1]</em><br>
                Lost echoes of my despair,<br>
                There is nobody — empty chair.</p>
                <p><em>[Verse 2]</em><br>
                Behind walls that only stare,<br>
                I am alone — it doesn't care...</p>
                <p><em>[Chorus]</em><br>
                Freedom, freedom, where are you now?<br>
                Freedom, freedom, I need you somehow.</p>
            `
        }
    };

    // ==========================================================
    // ИНИЦИАЛИЗАЦИЯ
    // ==========================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        console.log('🖤 FuelOil — Dirty Dreams, Clean Sound');

        smoothNavigation();
        mobileMenu();
        scrollAnimations();
        activeNavHighlight();
        scrollToTopButton();
        progressBar();
        cookiesConsent();
        initTrackSwitcher();

        console.log('✅ FuelOil script fully loaded.');
    }

    // ==========================================================
    // ПЛАВНАЯ НАВИГАЦИЯ
    // ==========================================================
    function smoothNavigation() {
        const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);

                if (target) {
                    e.preventDefault();
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;

                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                    if (window.closeMobileMenu) window.closeMobileMenu();

                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    }
                }
            });
        });
    }

    // ==========================================================
    // МОБИЛЬНОЕ МЕНЮ
    // ==========================================================
    function mobileMenu() {
        const burger = document.querySelector('.burger-menu');
        const nav = document.querySelector('header nav ul');
        if (!burger || !nav) return;

        function toggleMenu() {
            const isOpen = nav.classList.contains('open');
            nav.classList.toggle('open');
            burger.classList.toggle('active');
            burger.setAttribute('aria-expanded', !isOpen);
            document.body.classList.toggle('menu-open');
        }

        burger.addEventListener('click', toggleMenu);

        document.addEventListener('click', function (e) {
            if (nav.classList.contains('open')) {
                const isInside = nav.contains(e.target) || burger.contains(e.target);
                if (!isInside) window.closeMobileMenu();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                window.closeMobileMenu();
            }
        });

        window.closeMobileMenu = function () {
            nav.classList.remove('open');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        };
    }

    // ==========================================================
    // АНИМАЦИИ ПРИ СКРОЛЛЕ
    // ==========================================================
    function scrollAnimations() {
        const elements = document.querySelectorAll(
            '.about-grid, .music-player, .show-item, .merch-coming, .contact-grid, .ending'
        );
        if (!elements.length) return;

        elements.forEach(el => el.classList.add('animate-on-scroll'));

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        elements.forEach(el => observer.observe(el));

        setTimeout(function () {
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const winHeight = window.innerHeight || document.documentElement.clientHeight;
                if (rect.top < winHeight - 60) {
                    el.classList.add('visible');
                    observer.unobserve(el);
                }
            });
        }, 200);
    }

    // ==========================================================
    // ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ
    // ==========================================================
    function activeNavHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('header nav a');
        if (!sections.length || !navLinks.length) return;

        function updateActive() {
            let currentId = '';
            const scrollPos = window.pageYOffset + 150;

            sections.forEach(section => {
                if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                    currentId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActive, { passive: true });
        window.addEventListener('resize', updateActive, { passive: true });
        updateActive();
    }

    // ==========================================================
    // КНОПКА ВВЕРХ
    // ==========================================================
    function scrollToTopButton() {
        let btn = document.querySelector('.scroll-top');
        if (!btn) {
            btn = document.createElement('button');
            btn.className = 'scroll-top';
            btn.setAttribute('aria-label', 'Наверх');
            btn.innerHTML = '↑';
            document.body.appendChild(btn);
        }

        let ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    if (window.pageYOffset > 400) {
                        btn.classList.add('visible');
                    } else {
                        btn.classList.remove('visible');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================================
    // ПОЛОСА ПРОКРУТКИ
    // ==========================================================
    function progressBar() {
        let bar = document.querySelector('.scroll-progress');
        if (!bar) {
            bar = document.createElement('div');
            bar.className = 'scroll-progress';
            document.body.appendChild(bar);
        }

        let ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    const scrollTop = window.pageYOffset;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                    bar.style.width = progress + '%';
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ==========================================================
    // КУКИ
    // ==========================================================
    function cookiesConsent() {
        if (localStorage.getItem('fueloil-cookies') === 'accepted') return;

        const banner = document.createElement('div');
        banner.className = 'cookies-banner';
        banner.innerHTML = `
            <p>🍪 Мы используем cookies, чтобы сайт работал лучше.</p>
            <button class="cookies-accept">Принять</button>
        `;
        document.body.appendChild(banner);

        banner.querySelector('.cookies-accept').addEventListener('click', function () {
            localStorage.setItem('fueloil-cookies', 'accepted');
            banner.style.opacity = '0';
            banner.style.transform = 'translateX(-50%) translateY(20px)';
            banner.style.transition = 'all 0.4s ease';
            setTimeout(() => banner.remove(), 400);
        });
    }

    // ==========================================================
    // ПЕРЕКЛЮЧЕНИЕ ТРЕКОВ (Музыка + Тексты)
    // ==========================================================
    function initTrackSwitcher() {
        const tracks = document.querySelectorAll('.track');
        const lyricsTitle = document.getElementById('lyricsTitle');
        const lyricsContent = document.getElementById('lyricsContent');

        if (!tracks.length || !lyricsTitle || !lyricsContent) return;

        tracks.forEach(track => {
            track.addEventListener('click', function () {
                // Убираем активный класс со всех
                tracks.forEach(t => t.classList.remove('active'));
                // Добавляем на нажатый
                this.classList.add('active');

                // Получаем данные трека
                const trackId = this.getAttribute('data-track');
                const trackData = TRACKS[trackId];

                if (trackData) {
                    // Плавная смена текста
                    lyricsContent.style.opacity = '0';
                    lyricsTitle.style.opacity = '0';

                    setTimeout(() => {
                        lyricsTitle.textContent = trackData.title;
                        lyricsContent.innerHTML = trackData.lyrics;
                        lyricsContent.style.opacity = '1';
                        lyricsTitle.style.opacity = '1';
                        lyricsContent.style.transition = 'opacity 0.4s ease';
                        lyricsTitle.style.transition = 'opacity 0.4s ease';
                    }, 200);
                }
            });
        });
    }

})();