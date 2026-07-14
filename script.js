/* ============================================================
   🖤 FUELOIL — COMPLETE SCRIPT
   ============================================================ */

( function() {

    'use strict';

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        init();
    }

    function init() {

        console.log( '🖤 FuelOil — Emo / Post-Hardcore from Moscow' );
        console.log( '🎸 "The world doesn\'t get better. We just become louder."' );

        smoothNavigation();
        mobileMenu();
        scrollAnimations();
        parallaxHero();
        activeNavHighlight();
        scrollToTopButton();
        contactFormHandler();
        dynamicFooterYear();
        musicPlayer();
        galleryLightbox();
        typingEffect();
        progressBar();
        cookiesConsent();
        randomQuote();
        merchHandler();
        merchFilters();
        cartSystem();

    }

    /* ==========================================================
       SMOOTH NAVIGATION
    ========================================================== */

    function smoothNavigation() {

        const links = document.querySelectorAll( 'a[href^="#"]:not([href="#"])' );

        links.forEach( link => {

            link.addEventListener( 'click', function( e ) {

                const targetId = this.getAttribute( 'href' );
                const target = document.querySelector( targetId );

                if ( target ) {

                    e.preventDefault();

                    const header = document.querySelector( 'header' );
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;

                    window.scrollTo( {
                        top: targetPosition,
                        behavior: 'smooth'
                    } );

                    closeMobileMenu();

                    if ( history.pushState ) {
                        history.pushState( null, null, targetId );
                    }

                }

            } );

        } );

    }

    /* ==========================================================
       MOBILE MENU
    ========================================================== */

    function mobileMenu() {

        const header = document.querySelector( 'header' );
        const nav = header ? header.querySelector( 'nav' ) : null;

        if ( !nav ) return;

        let burger = document.querySelector( '.burger-menu' );

        if ( !burger ) {

            burger = document.createElement( 'button' );
            burger.className = 'burger-menu';
            burger.setAttribute( 'aria-label', 'Toggle navigation' );
            burger.setAttribute( 'aria-expanded', 'false' );

            for ( let i = 0; i < 3; i++ ) {
                const span = document.createElement( 'span' );
                burger.appendChild( span );
            }

            header.insertBefore( burger, nav );

        }

        function toggleMenu() {

            const isOpen = nav.classList.contains( 'open' );

            nav.classList.toggle( 'open' );
            burger.classList.toggle( 'active' );
            burger.setAttribute( 'aria-expanded', !isOpen );
            document.body.classList.toggle( 'menu-open' );

        }

        burger.addEventListener( 'click', toggleMenu );

        document.addEventListener( 'click', function( e ) {

            if ( nav.classList.contains( 'open' ) ) {

                const isInside = nav.contains( e.target ) || burger.contains( e.target );

                if ( !isInside ) {
                    closeMobileMenu();
                }

            }

        } );

        document.addEventListener( 'keydown', function( e ) {

            if ( e.key === 'Escape' && nav.classList.contains( 'open' ) ) {
                closeMobileMenu();
            }

        } );

        window.closeMobileMenu = function() {

            nav.classList.remove( 'open' );
            burger.classList.remove( 'active' );
            burger.setAttribute( 'aria-expanded', 'false' );
            document.body.classList.remove( 'menu-open' );

        };

    }

    /* ==========================================================
       SCROLL ANIMATIONS
    ========================================================== */

    function scrollAnimations() {

        const elements = document.querySelectorAll( 
            '.member-card, .album, .lyrics-card, .gallery-item, ' +
            '.show, .about-container, .contact-container, .transition, .merch-card'
        );

        if ( !elements.length ) return;

        const style = document.createElement( 'style' );
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY( 40px );
                transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                            transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            .animate-on-scroll.visible {
                opacity: 1;
                transform: translateY( 0 );
            }
            .members-grid .member-card:nth-child(2) { transition-delay: 0.08s; }
            .albums .album:nth-child(2) { transition-delay: 0.12s; }
            .gallery-grid .gallery-item:nth-child(2) { transition-delay: 0.05s; }
            .gallery-grid .gallery-item:nth-child(3) { transition-delay: 0.10s; }
            .gallery-grid .gallery-item:nth-child(4) { transition-delay: 0.15s; }
            .gallery-grid .gallery-item:nth-child(5) { transition-delay: 0.20s; }
            .gallery-grid .gallery-item:nth-child(6) { transition-delay: 0.25s; }
            .shows-list .show:nth-child(2) { transition-delay: 0.10s; }
            .merch-grid .merch-card:nth-child(2) { transition-delay: 0.08s; }
            .merch-grid .merch-card:nth-child(3) { transition-delay: 0.16s; }
            .merch-grid .merch-card:nth-child(4) { transition-delay: 0.24s; }
        `;
        document.head.appendChild( style );

        elements.forEach( el => el.classList.add( 'animate-on-scroll' ) );

        const observer = new IntersectionObserver( function( entries ) {

            entries.forEach( entry => {

                if ( entry.isIntersecting ) {

                    entry.target.classList.add( 'visible' );
                    observer.unobserve( entry.target );

                }

            } );

        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -30px 0px'
        } );

        elements.forEach( el => observer.observe( el ) );

        setTimeout( function() {

            elements.forEach( el => {

                const rect = el.getBoundingClientRect();
                const winHeight = window.innerHeight || document.documentElement.clientHeight;

                if ( rect.top < winHeight - 60 ) {
                    el.classList.add( 'visible' );
                    observer.unobserve( el );
                }

            } );

        }, 200 );

    }

    /* ==========================================================
       PARALLAX HERO
    ========================================================== */

    function parallaxHero() {

        const hero = document.querySelector( '#hero' );

        if ( !hero ) return;

        let ticking = false;

        window.addEventListener( 'scroll', function() {

            if ( !ticking ) {

                window.requestAnimationFrame( function() {

                    const scrollY = window.pageYOffset;

                    if ( scrollY < window.innerHeight ) {

                        const offset = scrollY * 0.2;
                        hero.style.backgroundPositionY = `-${offset}px`;
                        hero.style.transform = `translateY(${scrollY * 0.05}px)`;
                        hero.style.opacity = 1 - ( scrollY / window.innerHeight ) * 0.3;

                    }

                    ticking = false;

                } );

                ticking = true;

            }

        }, { passive: true } );

    }

    /* ==========================================================
       ACTIVE NAV HIGHLIGHT
    ========================================================== */

    function activeNavHighlight() {

        const sections = document.querySelectorAll( 'section[id]' );
        const navLinks = document.querySelectorAll( 'header nav a' );

        if ( !sections.length || !navLinks.length ) return;

        function updateActive() {

            let currentId = '';
            const scrollPos = window.pageYOffset + 150;

            sections.forEach( section => {

                const top = section.offsetTop;
                const height = section.offsetHeight;

                if ( scrollPos >= top && scrollPos < top + height ) {
                    currentId = section.getAttribute( 'id' );
                }

            } );

            navLinks.forEach( link => {

                link.classList.remove( 'active' );
                const href = link.getAttribute( 'href' );

                if ( href === `#${currentId}` ) {
                    link.classList.add( 'active' );
                }

            } );

        }

        window.addEventListener( 'scroll', updateActive, { passive: true } );
        window.addEventListener( 'resize', updateActive, { passive: true } );
        updateActive();

    }

    /* ==========================================================
       SCROLL TO TOP BUTTON
    ========================================================== */

    function scrollToTopButton() {

        let btn = document.querySelector( '.scroll-top' );

        if ( !btn ) {

            btn = document.createElement( 'button' );
            btn.className = 'scroll-top';
            btn.setAttribute( 'aria-label', 'Scroll to top' );
            btn.innerHTML = '↑';
            document.body.appendChild( btn );

        }

        let ticking = false;

        window.addEventListener( 'scroll', function() {

            if ( !ticking ) {

                window.requestAnimationFrame( function() {

                    const scrollY = window.pageYOffset;

                    if ( scrollY > 400 ) {
                        btn.classList.add( 'visible' );
                    } else {
                        btn.classList.remove( 'visible' );
                    }

                    ticking = false;

                } );

                ticking = true;

            }

        }, { passive: true } );

        btn.addEventListener( 'click', function() {

            window.scrollTo( {
                top: 0,
                behavior: 'smooth'
            } );

        } );

    }

    /* ==========================================================
       CONTACT FORM
    ========================================================== */

    function contactFormHandler() {

        const form = document.querySelector( '.contact-form' );

        if ( !form ) return;

        let messageContainer = form.querySelector( '.form-message' );

        if ( !messageContainer ) {

            messageContainer = document.createElement( 'div' );
            messageContainer.className = 'form-message';
            form.insertBefore( messageContainer, form.querySelector( 'button' ) );

        }

        form.addEventListener( 'submit', function( e ) {

            e.preventDefault();

            const name = this.querySelector( 'input[type="text"]' );
            const email = this.querySelector( 'input[type="email"]' );
            const message = this.querySelector( 'textarea' );
            const submitBtn = this.querySelector( 'button[type="submit"]' );

            if ( !name.value.trim() ) {
                showFormMessage( messageContainer, 'Введите ваше имя, пожалуйста.', 'error' );
                name.focus();
                return;
            }

            if ( !email.value.trim() ) {
                showFormMessage( messageContainer, 'Введите email для связи.', 'error' );
                email.focus();
                return;
            }

            if ( !isValidEmail( email.value ) ) {
                showFormMessage( messageContainer, 'Введите корректный email (например, name@domain.com).', 'error' );
                email.focus();
                return;
            }

            if ( !message.value.trim() ) {
                showFormMessage( messageContainer, 'Напишите ваше сообщение.', 'error' );
                message.focus();
                return;
            }

            const originalText = submitBtn.textContent;
            submitBtn.textContent = '⏳ Отправка...';
            submitBtn.disabled = true;

            setTimeout( function() {

                showFormMessage( 
                    messageContainer, 
                    '✅ Спасибо! Мы свяжемся с вами в ближайшее время. 🖤', 
                    'success' 
                );

                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

            }, 1800 );

        } );

        function isValidEmail( email ) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( email );
        }

        function showFormMessage( container, text, type ) {

            container.textContent = text;
            container.className = `form-message ${type}`;
            container.style.display = 'block';

            clearTimeout( container._timeout );

            container._timeout = setTimeout( function() {

                container.style.opacity = '0';
                container.style.transition = 'opacity 0.5s ease';

                setTimeout( function() {
                    container.textContent = '';
                    container.className = 'form-message';
                    container.style.display = 'none';
                    container.style.opacity = '1';
                }, 500 );

            }, 5000 );

        }

    }

    /* ==========================================================
       DYNAMIC FOOTER YEAR
    ========================================================== */

    function dynamicFooterYear() {

        const footer = document.querySelector( 'footer small' );

        if ( footer ) {

            const year = new Date().getFullYear();
            footer.textContent = footer.textContent.replace( /\d{4}/, year );

        }

    }

    /* ==========================================================
       MUSIC PLAYER (DEMO)
    ========================================================== */

    function musicPlayer() {

        const albumButtons = document.querySelectorAll( '.album-buttons a' );

        albumButtons.forEach( btn => {

            btn.addEventListener( 'click', function( e ) {

                e.preventDefault();

                const text = this.textContent.trim().toLowerCase();

                if ( text === 'listen' ) {

                    const parent = this.closest( '.album' );
                    const title = parent ? parent.querySelector( 'h3' ) : null;
                    const songName = title ? title.textContent : 'трек';

                    showToast( `▶️ Воспроизведение "${songName}" (демо-режим)` );

                } else if ( text === 'lyrics' || text === 'info' || text === 'preview' ) {

                    const parent = this.closest( '.album' );
                    const title = parent ? parent.querySelector( 'h3' ) : null;
                    const songName = title ? title.textContent : 'трек';

                    showToast( `📝 Открывается страница "${songName}"` );

                    const lyricsSection = document.querySelector( '#lyrics' );

                    if ( lyricsSection ) {

                        setTimeout( function() {

                            const header = document.querySelector( 'header' );
                            const headerHeight = header ? header.offsetHeight : 0;
                            const targetPos = lyricsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                            window.scrollTo( {
                                top: targetPos,
                                behavior: 'smooth'
                            } );

                        }, 300 );

                    }

                }

            } );

        } );

        function showToast( message ) {

            let toast = document.querySelector( '.toast' );

            if ( !toast ) {

                toast = document.createElement( 'div' );
                toast.className = 'toast';
                document.body.appendChild( toast );

            }

            toast.textContent = message;
            toast.classList.add( 'show' );

            clearTimeout( toast._timeout );

            toast._timeout = setTimeout( function() {
                toast.classList.remove( 'show' );
            }, 2500 );

        }

    }

    /* ==========================================================
       GALLERY LIGHTBOX
    ========================================================== */

    function galleryLightbox() {

        const galleryItems = document.querySelectorAll( '.gallery-item img' );

        if ( !galleryItems.length ) return;

        let lightbox = document.querySelector( '.lightbox' );

        if ( !lightbox ) {

            lightbox = document.createElement( 'div' );
            lightbox.className = 'lightbox';
            lightbox.setAttribute( 'aria-hidden', 'true' );

            const closeBtn = document.createElement( 'button' );
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '✕';
            closeBtn.setAttribute( 'aria-label', 'Close lightbox' );

            const img = document.createElement( 'img' );
            img.className = 'lightbox-image';
            img.alt = '';

            const caption = document.createElement( 'p' );
            caption.className = 'lightbox-caption';

            lightbox.appendChild( closeBtn );
            lightbox.appendChild( img );
            lightbox.appendChild( caption );
            document.body.appendChild( lightbox );

            lightbox.addEventListener( 'click', function( e ) {

                if ( e.target === this ) {
                    closeLightbox();
                }

            } );

            document.addEventListener( 'keydown', function( e ) {

                if ( e.key === 'Escape' && lightbox.classList.contains( 'open' ) ) {
                    closeLightbox();
                }

            } );

            closeBtn.addEventListener( 'click', closeLightbox );

            function closeLightbox() {
                lightbox.classList.remove( 'open' );
                lightbox.setAttribute( 'aria-hidden', 'true' );
                document.body.style.overflow = '';
            }

            window.closeLightbox = closeLightbox;

        }

        galleryItems.forEach( img => {

            img.style.cursor = 'pointer';

            img.addEventListener( 'click', function() {

                const lightboxImg = lightbox.querySelector( '.lightbox-image' );
                const caption = lightbox.querySelector( '.lightbox-caption' );

                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt || 'FuelOil Gallery';

                let captionText = this.alt;

                const figure = this.closest( 'figure' );
                const figCaption = figure ? figure.querySelector( 'figcaption' ) : null;

                if ( figCaption ) {
                    captionText = figCaption.textContent;
                }

                caption.textContent = captionText || 'FuelOil';

                lightbox.classList.add( 'open' );
                lightbox.setAttribute( 'aria-hidden', 'false' );
                document.body.style.overflow = 'hidden';

            } );

        } );

    }

    /* ==========================================================
       TYPING EFFECT
    ========================================================== */

    function typingEffect() {

        const element = document.querySelector( '.hero-description' );

        if ( !element ) return;

        const originalText = element.textContent;

        element.textContent = '';

        let index = 0;
        let isDeleting = false;
        let speed = 80;

        function type() {

            const currentText = originalText.substring( 0, index );

            element.textContent = currentText;

            if ( !isDeleting ) {

                if ( index < originalText.length ) {
                    index++;
                    setTimeout( type, speed );
                } else {
                    isDeleting = true;
                    setTimeout( type, 3000 );
                }

            } else {

                if ( index > 0 ) {
                    index--;
                    setTimeout( type, speed / 2 );
                } else {
                    isDeleting = false;
                    setTimeout( type, 500 );
                }

            }

        }

        setTimeout( type, 1500 );

    }

    /* ==========================================================
       PROGRESS BAR
    ========================================================== */

    function progressBar() {

        let bar = document.querySelector( '.scroll-progress' );

        if ( !bar ) {

            bar = document.createElement( 'div' );
            bar.className = 'scroll-progress';
            document.body.appendChild( bar );

        }

        let ticking = false;

        window.addEventListener( 'scroll', function() {

            if ( !ticking ) {

                window.requestAnimationFrame( function() {

                    const scrollTop = window.pageYOffset;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progress = docHeight > 0 ? ( scrollTop / docHeight ) * 100 : 0;

                    bar.style.width = progress + '%';

                    ticking = false;

                } );

                ticking = true;

            }

        }, { passive: true } );

    }

    /* ==========================================================
       COOKIES CONSENT
    ========================================================== */

    function cookiesConsent() {

        if ( localStorage.getItem( 'fueloil-cookies' ) === 'accepted' ) {
            return;
        }

        const banner = document.createElement( 'div' );
        banner.className = 'cookies-banner';

        banner.innerHTML = `
            <p>🍪 Мы используем cookies, чтобы сайт работал лучше. Продолжая использовать сайт, вы соглашаетесь с этим.</p>
            <button class="cookies-accept">Принять</button>
        `;

        document.body.appendChild( banner );

        const acceptBtn = banner.querySelector( '.cookies-accept' );

        acceptBtn.addEventListener( 'click', function() {

            localStorage.setItem( 'fueloil-cookies', 'accepted' );
            banner.style.opacity = '0';
            banner.style.transform = 'translateX(-50%) translateY(20px)';
            banner.style.transition = 'all 0.4s ease';

            setTimeout( function() {
                banner.remove();
            }, 400 );

        } );

    }

    /* ==========================================================
       RANDOM QUOTE
    ========================================================== */

    function randomQuote() {

        const quotes = [
            '"The city forgot our names. So we screamed louder."',
            '"I never wanted heaven. I just wanted someone to stay."',
            '"We\'re not trying to be heroes. We\'re just writing what hurts."',
            '"There is beauty in ruined things."',
            '"Sometimes the only way to be heard is to break the silence."',
            '"Every scar tells a story. We\'re just sharing ours."',
            '"The world doesn\'t get better. We just become louder."',
            '"The night is dark, but so are we."',
            '"We are the echoes of forgotten dreams."',
            '"Burn bright, even when it hurts."'
        ];

        const ending = document.querySelector( '.ending blockquote' );

        if ( ending ) {

            let currentIndex = 0;

            function changeQuote() {

                let newIndex;

                do {
                    newIndex = Math.floor( Math.random() * quotes.length );
                } while ( newIndex === currentIndex && quotes.length > 1 );

                currentIndex = newIndex;

                ending.style.opacity = '0';
                ending.style.transition = 'opacity 0.6s ease';

                setTimeout( function() {
                    ending.textContent = quotes[ currentIndex ];
                    ending.style.opacity = '1';
                }, 600 );

            }

            setTimeout( changeQuote, 8000 );
            setInterval( changeQuote, 14000 );

        }

    }

    /* ==========================================================
       MERCH FILTERS
    ========================================================== */

    function merchFilters() {
        const buttons = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.merch-card');
        
        if (!buttons.length || !cards.length) return;
        
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                buttons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                
                cards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else if (card.dataset.category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    /* ==========================================================
       MERCH HANDLER (Add to cart)
    ========================================================== */

    function merchHandler() {

        const buttons = document.querySelectorAll( '.merch-btn' );

        buttons.forEach( btn => {

            btn.addEventListener( 'click', function() {

                const card = this.closest('.merch-card');
                const itemName = this.getAttribute( 'data-item' ) || 'товар';
                const price = parseInt(this.getAttribute( 'data-price' )) || 0;
                
                // Get selected size
                const sizeBtn = card.querySelector('.size-btn.active');
                const size = sizeBtn ? sizeBtn.dataset.size : 'One Size';
                
                // Get quantity
                const qtyEl = card.querySelector('.qty-count');
                const quantity = qtyEl ? parseInt(qtyEl.textContent) : 1;
                
                // Get stock
                const stockEl = card.querySelector('.stock-count');
                const stock = stockEl ? parseInt(stockEl.textContent) : 99;
                
                // Check stock
                if (quantity > stock) {
                    showAddToCartNotification('❌ Недостаточно товара на складе!', '');
                    return;
                }

                // Add to cart
                addToCart({
                    name: itemName,
                    price: price,
                    size: size,
                    quantity: quantity,
                    stock: stock
                });

                // Update stock display
                if (stockEl) {
                    const newStock = stock - quantity;
                    stockEl.textContent = newStock;
                    
                    // Update dot
                    const dot = card.querySelector('.stock-dot');
                    if (dot) {
                        if (newStock <= 3) {
                            dot.classList.add('low');
                        } else {
                            dot.classList.remove('low');
                        }
                        if (newStock <= 0) {
                            dot.classList.add('out');
                            this.textContent = '❌ Нет в наличии';
                            this.disabled = true;
                        }
                    }
                }

                // Show notification
                showAddToCartNotification(
                    `🛒 ${itemName}`, 
                    `${price * quantity} ₽`
                );

                // Button feedback
                const originalText = this.textContent;
                this.textContent = '✅ Добавлено!';
                this.style.borderColor = 'rgba(80, 160, 80, 0.3)';
                this.style.background = 'rgba(80, 160, 80, 0.05)';

                setTimeout( () => {
                    this.textContent = originalText;
                    this.style.borderColor = '';
                    this.style.background = '';
                }, 2000 );

                if ( navigator.vibrate ) {
                    navigator.vibrate( 30 );
                }

            } );

        } );

        // Size selector
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const parent = this.closest('.size-selector');
                parent.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Quantity controls
        document.querySelectorAll('.quantity-selector').forEach(selector => {
            const minus = selector.querySelector('.minus');
            const plus = selector.querySelector('.plus');
            const count = selector.querySelector('.qty-count');
            
            minus.addEventListener('click', function() {
                let val = parseInt(count.textContent);
                if (val > 1) {
                    count.textContent = val - 1;
                }
            });
            
            plus.addEventListener('click', function() {
                let val = parseInt(count.textContent);
                const card = this.closest('.merch-card');
                const stockEl = card ? card.querySelector('.stock-count') : null;
                const stock = stockEl ? parseInt(stockEl.textContent) : 99;
                if (val < stock) {
                    count.textContent = val + 1;
                } else {
                    showAddToCartNotification('⚠️ Больше нет на складе', '');
                }
            });
        });

    }

    /* ==========================================================
       CART SYSTEM
    ========================================================== */

    let cart = [];
    let discountApplied = 0;

    function addToCart(item) {
        const existing = cart.find(i => i.name === item.name && i.size === item.size);
        if (existing) {
            existing.quantity += item.quantity;
        } else {
            cart.push({...item});
        }
        updateCartUI();
        updateCartCount();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartUI();
        updateCartCount();
    }

    function updateCartCount() {
        const countEl = document.querySelector('.cart-count');
        if (!countEl) return;
        const total = cart.reduce((sum, i) => sum + i.quantity, 0);
        if (total > 0) {
            countEl.textContent = total;
            countEl.classList.add('visible');
        } else {
            countEl.classList.remove('visible');
        }
    }

    function updateCartUI() {
        const container = document.getElementById('cartItems');
        const totalEl = document.getElementById('cartTotal');
        
        if (!container || !totalEl) return;
        
        if (cart.length === 0) {
            container.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
            totalEl.textContent = '₽0';
            return;
        }
        
        let html = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <span class="cart-item-name">${item.name}</span>
                        <span class="cart-item-meta">${item.size} × ${item.quantity}</span>
                    </div>
                    <div class="cart-item-price">
                        <span>${itemTotal} ₽</span>
                        <button class="cart-item-remove" data-index="${index}">✕</button>
                    </div>
                </div>
            `;
        });
        
        // Apply discount
        if (discountApplied > 0) {
            const discountAmount = Math.round(total * discountApplied / 100);
            total = total - discountAmount;
            html += `
                <div style="color: #8aaa8a; text-align: right; font-size: 0.8rem; padding: 0.5rem 0;">
                    Скидка ${discountApplied}%: -${discountAmount} ₽
                </div>
            `;
        }
        
        container.innerHTML = html;
        totalEl.textContent = `₽${total}`;
        
        // Remove buttons
        container.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                removeFromCart(index);
            });
        });
        
        // Update cart count badge click
        const countEl = document.querySelector('.cart-count');
        if (countEl) {
            countEl.addEventListener('click', openCart);
        }
    }

    function openCart() {
        const overlay = document.getElementById('cartOverlay');
        if (overlay) {
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCart() {
        const overlay = document.getElementById('cartOverlay');
        if (overlay) {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    function getCartTotal() {
        let total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        if (discountApplied > 0) {
            total = total - Math.round(total * discountApplied / 100);
        }
        return total;
    }

    function getCartItems() {
        return cart;
    }

    function showAddToCartNotification(itemName, price) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <span>🛒</span>
            <span>${itemName}</span>
            <span>${price ? price + ' добавлен в корзину' : ''}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 2500);
    }

    /* ==========================================================
       CART SYSTEM - INIT
    ========================================================== */

    function cartSystem() {
        
        // Cart overlay controls
        const overlay = document.getElementById('cartOverlay');
        const closeBtn = document.getElementById('cartClose');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeCart);
        }
        
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeCart();
                }
            });
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeCart();
                }
            });
        }
        
        // Cart count click
        const countEl = document.querySelector('.cart-count');
        if (countEl) {
            countEl.addEventListener('click', openCart);
        }
        
        // Promo codes
        const promoInput = document.querySelector('.promo-input');
        const promoApply = document.querySelector('.promo-apply');
        const promoMessage = document.querySelector('.promo-message');
        
        const promoCodes = {
            'FUELOIL10': 10,
            'EMO2026': 15,
            'WELCOME': 5
        };
        
        if (promoApply && promoInput && promoMessage) {
            promoApply.addEventListener('click', function() {
                const code = promoInput.value.trim().toUpperCase();
                
                if (promoCodes[code]) {
                    discountApplied = promoCodes[code];
                    promoMessage.textContent = `✅ Скидка ${discountApplied}% применена!`;
                    promoMessage.style.color = '#8aaa8a';
                    updateCartUI();
                } else {
                    discountApplied = 0;
                    promoMessage.textContent = '❌ Неверный промокод';
                    promoMessage.style.color = '#cc6a6a';
                    updateCartUI();
                }
            });
            
            promoInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    promoApply.click();
                }
            });
        }
        
        // Checkout
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                if (cart.length === 0) {
                    showAddToCartNotification('⚠️ Корзина пуста', '');
                    return;
                }
                
                const total = getCartTotal();
                const items = getCartItems();
                
                // Show order form
                showOrderForm(items, total);
            });
        }
    }

    /* ==========================================================
       ORDER FORM
    ========================================================== */

    function showOrderForm(items, total) {
        // Remove existing form if any
        const existingForm = document.querySelector('.order-form-wrapper');
        if (existingForm) {
            existingForm.remove();
        }
        
        const wrapper = document.createElement('div');
        wrapper.className = 'order-form-wrapper';
        wrapper.style.cssText = `
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(120, 80, 80, 0.1);
        `;
        
        wrapper.innerHTML = `
            <h4 style="color: #ffffff; margin-bottom: 1rem; font-size: 1rem;">Оформление заказа</h4>
            <form class="order-form" style="display: flex; flex-direction: column; gap: 0.8rem;">
                <input type="text" placeholder="Ваше имя" required style="background: rgba(16,12,14,0.7); border: 1px solid rgba(120,80,80,0.1); border-radius: 4px; padding: 0.8rem 1rem; color: #d4c9c9; font-size: 0.9rem;">
                <input type="tel" placeholder="Телефон" required style="background: rgba(16,12,14,0.7); border: 1px solid rgba(120,80,80,0.1); border-radius: 4px; padding: 0.8rem 1rem; color: #d4c9c9; font-size: 0.9rem;">
                <input type="email" placeholder="Email" required style="background: rgba(16,12,14,0.7); border: 1px solid rgba(120,80,80,0.1); border-radius: 4px; padding: 0.8rem 1rem; color: #d4c9c9; font-size: 0.9rem;">
                <textarea placeholder="Адрес доставки" rows="3" style="background: rgba(16,12,14,0.7); border: 1px solid rgba(120,80,80,0.1); border-radius: 4px; padding: 0.8rem 1rem; color: #d4c9c9; font-size: 0.9rem; font-family: inherit; resize: vertical;"></textarea>
                <div style="display: flex; justify-content: space-between; color: #9a8a8a; font-size: 0.85rem; padding: 0.5rem 0;">
                    <span>${items.length} товара</span>
                    <span>Итого: ${total} ₽</span>
                </div>
                <button type="submit" style="width: 100%; padding: 0.8rem; background: rgba(160,80,80,0.15); border: 1px solid rgba(160,80,80,0.2); color: #ffffff; border-radius: 30px; cursor: pointer; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; transition: all 0.3s ease;">
                    ✅ Подтвердить заказ
                </button>
            </form>
        `;
        
        const cartFooter = document.querySelector('.cart-footer');
        if (cartFooter) {
            cartFooter.appendChild(wrapper);
        }
        
        // Handle order submit
        const form = wrapper.querySelector('.order-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputs = this.querySelectorAll('input, textarea');
            let allFilled = true;
            inputs.forEach(inp => {
                if (!inp.value.trim()) {
                    inp.style.borderColor = 'rgba(200,80,80,0.3)';
                    allFilled = false;
                } else {
                    inp.style.borderColor = '';
                }
            });
            
            if (!allFilled) {
                showAddToCartNotification('⚠️ Заполните все поля', '');
                return;
            }
            
            showAddToCartNotification('✅ Заказ оформлен! Свяжемся с вами 🖤', '');
            cart = [];
            discountApplied = 0;
            updateCartUI();
            updateCartCount();
            
            // Remove order form
            setTimeout(() => {
                wrapper.remove();
                closeCart();
            }, 1500);
        });
    }

    /* ==========================================================
       FALLBACKS
    ========================================================== */

    if ( !window.requestAnimationFrame ) {

        window.requestAnimationFrame = function( callback ) {

            return window.setTimeout( function() {
                callback( Date.now() );
            }, 1000 / 60 );

        };

    }

    if ( !window.IntersectionObserver ) {

        console.warn( '⚠️ IntersectionObserver не поддерживается.' );

        document.addEventListener( 'DOMContentLoaded', function() {

            const elements = document.querySelectorAll( '.animate-on-scroll' );

            elements.forEach( function( el ) {
                el.classList.add( 'visible' );
            } );

        } );

    }

    console.log( '✅ FuelOil script fully loaded.' );
    console.log( '🖤 Stay loud. Stay broken. Stay real.' );

} )();