// =========================================================
// İMDAT TESİSAT — SİTE DAVRANIŞLARI
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Yıl bilgisini otomatik yaz ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header: scroll'da gölge ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobil menü aç/kapat ---------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');

  const closeNav = () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Bir menü linkine tıklayınca mobil menüyü kapat
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  /* ---------- Scroll ile beliren bölümler ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    // IntersectionObserver desteklenmiyorsa doğrudan göster
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- İletişim formu ----------
     NOT: Bu form şu an hiçbir yere veri göndermiyor; sadece
     tarayıcıda basit bir doğrulama yapıp teşekkür mesajı
     gösteriyor. Gerçek kullanımda bu formu bir backend'e,
     e-posta servisine (ör. Formspree, EmailJS) ya da
     WhatsApp API'sine bağlamanız gerekir. */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const ad = form.adSoyad.value.trim();
      const tel = form.telefon.value.trim();
      const hizmet = form.hizmet.value;

      if (!ad || !tel || !hizmet) {
        formNote.textContent = 'Lütfen ad soyad, telefon ve hizmet türünü doldurun.';
        return;
      }

      const telDigits = tel.replace(/\D/g, '');
      if (telDigits.length < 10) {
        formNote.textContent = 'Lütfen geçerli bir telefon numarası girin.';
        return;
      }

      // Gerçek entegrasyonda burada fetch() ile backend/e-posta servisine gönderim yapılır.
      formNote.textContent = `Teşekkürler ${ad.split(' ')[0]}, talebiniz alındı. En kısa sürede ${tel} numarasından size dönüş yapacağız.`;
      form.reset();
    });
  }

});