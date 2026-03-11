// ===== MOBILE MENU =====
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
mobileBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('active')));

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id'); });
    navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
});

// ===== SCROLL TO TOP =====
const scrollBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => scrollBtn.classList.toggle('visible', window.scrollY > 400));
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== FADE IN SECTIONS =====
// We do NOT unobserve — sections stay visible once seen, re-animate on scroll back
const fadeEls = document.querySelectorAll('.fade-in-section, .quote-section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            // Lock h2 to white after shimmer finishes
            e.target.querySelectorAll('h2').forEach(h => {
                if (!h.classList.contains('shimmer-done')) {
                    setTimeout(() => h.classList.add('shimmer-done'), 2200);
                }
            });
        }
        // Do NOT remove is-visible — this prevents disappearing
    });
}, { threshold: 0.08 });
fadeEls.forEach(el => observer.observe(el));

// ===== GALLERY POPUP =====
const galleryPopup      = document.getElementById('galleryPopup');
const gpImg             = document.getElementById('galleryPopupImg');
const gpTitle           = document.getElementById('galleryPopupTitle');
const gpDesc            = document.getElementById('galleryPopupDesc');
const gpClose           = document.getElementById('galleryPopupClose');
const gpPrev            = document.getElementById('galleryPopupPrev');
const gpNext            = document.getElementById('galleryPopupNext');
const galleryItems      = Array.from(document.querySelectorAll('.gallery-item'));
let gpIndex = 0;

// Build data from gallery items
const galleryData = galleryItems.map(item => ({
    src:   item.querySelector('img') ? item.querySelector('img').src : '',
    title: item.querySelector('.gallery-overlay h4') ? item.querySelector('.gallery-overlay h4').textContent : '',
    desc:  item.querySelector('.gallery-overlay p')  ? item.querySelector('.gallery-overlay p').textContent  : ''
}));

function openGalleryPopup(index) {
    gpIndex = index;
    const d = galleryData[index];
    gpImg.src = d.src;
    gpImg.alt = d.title;
    gpTitle.textContent = d.title;
    gpDesc.textContent  = d.desc;
    galleryPopup.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeGalleryPopup() {
    galleryPopup.classList.remove('open');
    document.body.style.overflow = '';
}

function gpShowNext() { openGalleryPopup((gpIndex + 1) % galleryItems.length); }
function gpShowPrev() { openGalleryPopup((gpIndex - 1 + galleryItems.length) % galleryItems.length); }

galleryItems.forEach((item, i) => item.addEventListener('click', () => openGalleryPopup(i)));
gpClose.addEventListener('click', closeGalleryPopup);
gpNext.addEventListener('click', e => { e.stopPropagation(); gpShowNext(); });
gpPrev.addEventListener('click', e => { e.stopPropagation(); gpShowPrev(); });
galleryPopup.addEventListener('click', e => { if (e.target === galleryPopup) closeGalleryPopup(); });

// ===== LIGHTBOX (for More of My Work cards) =====
const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lightboxImg');
const lbTitle    = document.getElementById('lightboxTitle');
const lbDesc     = document.getElementById('lightboxDesc');
const lbClose    = document.getElementById('lightboxClose');
const lbPrev     = document.getElementById('lightboxPrev');
const lbNext     = document.getElementById('lightboxNext');
const workCards  = Array.from(document.querySelectorAll('.work-card'));
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    const card = workCards[index];
    lbImg.src = card.dataset.img;
    lbImg.alt = card.dataset.title;
    lbTitle.textContent = card.dataset.title;
    lbDesc.textContent  = card.dataset.desc;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

function showNext() { openLightbox((currentIndex + 1) % workCards.length); }
function showPrev() { openLightbox((currentIndex - 1 + workCards.length) % workCards.length); }

workCards.forEach((card, i) => card.addEventListener('click', () => openLightbox(i)));
lbClose.addEventListener('click', closeLightbox);
lbNext.addEventListener('click', showNext);
lbPrev.addEventListener('click', showPrev);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', e => {
    if (galleryPopup.classList.contains('open')) {
        if (e.key === 'Escape')      closeGalleryPopup();
        if (e.key === 'ArrowRight')  gpShowNext();
        if (e.key === 'ArrowLeft')   gpShowPrev();
        return;
    }
    if (lightbox.classList.contains('open')) {
        if (e.key === 'Escape')      closeLightbox();
        if (e.key === 'ArrowRight')  showNext();
        if (e.key === 'ArrowLeft')   showPrev();
    }
});

// ===== CONTACT FORM =====
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.submit-btn');
    btn.textContent = 'Message Sent ✓';
    btn.style.borderColor = '#c8a97e';
    btn.style.color = '#c8a97e';
    setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.borderColor = '';
        btn.style.color = '';
        this.reset();
    }, 3000);
});