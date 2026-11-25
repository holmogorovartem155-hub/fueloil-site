/* ============================================================
   🖤 FUELOIL — SCRIPT (с плеером)
   ============================================================ */

(function () {
    'use strict';

    const TRACKS = {
        'wingless': {
            title: 'Wingless',
            src: '', // сюда вставишь путь к mp3, когда будет
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
            src: '',
            lyrics: `<p><em>[Verse 1]</em><br>Hey mom, I'm not the one you wanted.<br>Hey mom, I'm not the one you dreamed.</p><p><em>[Chorus]</em><br>I'm sorry for the things I've done,<br>But I'm still here, still breathing.</p>`
        },
        'cherry-love': {
            title: 'Cherry Love',
            src: '',
            lyrics: `<p><em>[Verse 1]</em><br>Cherry love, so sweet and bitter.<br>Cherry love, you're all I need.</p><p><em>[Chorus]</em><br>Don't leave me now, don't leave me here,<br>With all these feelings I can't steer.</p>`
        },
        'silly-fever': {
            title: 'Silly Fever',
            src: '',
            lyrics: `<p><em>[Verse 1]</em><br>Silly fever in my head,<br>Silly words that I have said.</p><p><em>[Chorus]</em><br>I can't stop, I can't sleep,<br>This fever's got me on my knees.</p>`
        },
        'freedom': {
            title: 'Freedom',
            src: '',
            lyrics: `<p><em>[Verse 1]</em><br>Lost echoes of my despair,<br>There is nobody — empty chair.</p><p><em>[Verse 2]</em><br>Behind walls that only stare,<br>I am alone — it doesn't care...</p><p><em>[Chorus]</em><br>Freedom, freedom, where are you now?<br>Freedom, freedom, I need you somehow.</p>`
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        smoothNavigation();
        mobileMenu();
        scrollAnimations();
        activeNavHighlight();
        scrollToTopButton();
        progressBar();
        cookiesConsent();
        initTrackSwitcher();
        initPlayer();
    }

    /* ---------- ПЛАВНАЯ НАВИГАЦИЯ ---------- */
    function smoothNavigation() {
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
            link.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    const pos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
                    window.scrollTo({ top: pos, behavior: 'smooth' });
                    window.closeMobileMenu?.();
                }
            });
        });
    }

    /* ---------- МОБИЛЬНОЕ МЕНЮ ---------- */
    function mobileMenu() {
        const burger = document.querySelector('.burger-menu');
        const nav = document.querySelector('header nav ul');
        if (!burger || !nav) return;

        burger.addEventListener('click', function () {
            const isOpen = nav.classList.contains('open');
            nav.classList.toggle('open');
            burger.classList.toggle('active');
            burger.setAttribute('aria-expanded', !isOpen);
            document.body.classList.toggle('menu-open');
        });

        document.addEventListener('click', function (e) {
            if (nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
                window.closeMobileMenu();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) window.closeMobileMenu();
        });

        window.closeMobileMenu = function () {
            nav.classList.remove('open');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        };
    }

    /* ---------- АНИМАЦИИ ПРИ СКРОЛЛЕ ---------- */
    function scrollAnimations() {
        const elements = document.querySelectorAll(
            '.about-grid, .music-player, .show-item, .merch-coming, .contact-grid'
        );
        if (!elements.length) return;

        elements.forEach(el => el.classList.add('animate-on-scroll'));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        elements.forEach(el => observer.observe(el));
    }

    /* ---------- АКТИВНЫЙ ПУНКТ МЕНЮ ---------- */
    function activeNavHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('header nav a');
        if (!sections.length || !navLinks.length) return;

        function updateActive() {
            let currentId = '';
            const scrollPos = window.pageYOffset + 150;
            sections.forEach(s => {
                if (scrollPos >= s.offsetTop && scrollPos < s.offsetTop + s.offsetHeight) {
                    currentId = s.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
            });
        }

        window.addEventListener('scroll', updateActive, { passive: true });
        window.addEventListener('resize', updateActive, { passive: true });
        updateActive();
    }

    /* ---------- КНОПКА ВВЕРХ ---------- */
    function scrollToTopButton() {
        let btn = document.querySelector('.scroll-top');
        if (!btn) {
            btn = document.createElement('button');
            btn.className = 'scroll-top';
            btn.setAttribute('aria-label', 'Наверх');
            btn.innerHTML = '↑';
            document.body.appendChild(btn);
        }

        window.addEventListener('scroll', function () {
            btn.classList.toggle('visible', window.pageYOffset > 400);
        }, { passive: true });

        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ---------- ПРОГРЕСС СКРОЛЛА ---------- */
    function progressBar() {
        let bar = document.querySelector('.scroll-progress');
        if (!bar) {
            bar = document.createElement('div');
            bar.className = 'scroll-progress';
            document.body.appendChild(bar);
        }
        window.addEventListener('scroll', function () {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
        }, { passive: true });
    }

    /* ---------- КУКИ ---------- */
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
            banner.style.transition = 'opacity 0.4s ease';
            setTimeout(() => banner.remove(), 400);
        });
    }

    /* ---------- ПЕРЕКЛЮЧЕНИЕ ТРЕКОВ + ПЛЕЕР ---------- */
    let currentTrackId = 'wingless';
    let audio = null;

    function initTrackSwitcher() {
        const tracks = document.querySelectorAll('.track');
        const lyricsTitle = document.getElementById('lyricsTitle');
        const lyricsContent = document.getElementById('lyricsContent');

        if (!tracks.length || !lyricsTitle || !lyricsContent) return;

        tracks.forEach(track => {
            track.addEventListener('click', function () {
                tracks.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                const trackId = this.getAttribute('data-track');
                const trackData = TRACKS[trackId];
                if (!trackData) return;

                currentTrackId = trackId;

                // плавная смена текста
                lyricsContent.style.opacity = '0';
                lyricsTitle.style.opacity = '0';

                setTimeout(() => {
                    lyricsTitle.textContent = trackData.title;
                    lyricsContent.innerHTML = trackData.lyrics;
                    lyricsContent.style.opacity = '1';
                    lyricsTitle.style.opacity = '1';
                }, 200);

                // если плеер был запущен — сбрасываем
                if (audio && !audio.paused) {
                    audio.pause();
                    updatePlayBtn(false);
                }
                audio = null;
                resetPlayer();
            });
        });
    }

    function initPlayer() {
        const playBtn = document.getElementById('playBtn');
        const progress = document.getElementById('playerProgress');
        const fill = document.getElementById('progressFill');
        const timeEl = document.getElementById('playerTime');

        if (!playBtn) return;

        playBtn.addEventListener('click', function () {
            const trackData = TRACKS[currentTrackId];

            // если аудио ещё нет — показываем тост
            if (!trackData || !trackData.src) {
                showToast('🎵 Аудио для этого трека скоро появится');
                return;
            }

            // создаём audio один раз
            if (!audio) {
                audio = new Audio(trackData.src);
                audio.addEventListener('timeupdate', updateProgress);
                audio.addEventListener('ended', () => updatePlayBtn(false));
                audio.addEventListener('loadedmetadata', updateProgress);
            }

            if (audio.paused) {
                audio.play();
                updatePlayBtn(true);
            } else {
                audio.pause();
                updatePlayBtn(false);
            }
        });

        // клик по прогресс-бару — перемотка
        if (progress) {
            progress.addEventListener('click', function (e) {
                if (!audio || !audio.duration) return;
                const rect = this.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                audio.currentTime = percent * audio.duration;
            });
        }

        function updateProgress() {
            if (!audio || !audio.duration) return;
            const percent = (audio.currentTime / audio.duration) * 100;
            if (fill) fill.style.width = percent + '%';
            if (timeEl) timeEl.textContent = formatTime(audio.currentTime);
        }

        function updatePlayBtn(playing) {
            if (!playBtn) return;
            playBtn.textContent = playing ? '❚❚' : '▶';
            playBtn.classList.toggle('playing', playing);
            playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
        }

        function resetPlayer() {
            if (fill) fill.style.width = '0%';
            if (timeEl) timeEl.textContent = '0:00';
            updatePlayBtn(false);
        }

        function formatTime(sec) {
            const m = Math.floor(sec / 60);
            const s = Math.floor(sec % 60).toString().padStart(2, '0');
            return `${m}:${s}`;
        }

        // тост
        function showToast(msg) {
            let toast = document.querySelector('.toast');
            if (!toast) {
                toast = document.createElement('div');
                toast.className = 'toast';
                document.body.appendChild(toast);
            }
            toast.textContent = msg;
            toast.classList.add('show');
            clearTimeout(toast._timeout);
            toast._timeout = setTimeout(() => toast.classList.remove('show'), 2500);
        }
    }

})();