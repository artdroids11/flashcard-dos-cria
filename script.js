/* ===== SIMULADOR DE DISTORÇÃO ===== */
const distortionRange = document.querySelector('#dist');
const distortionValue = document.querySelector('#distValue');
const sampleText = document.querySelector('#sampleText');

function updateDistortion() {
  if (!distortionRange || !distortionValue || !sampleText) return;
  
  const value = Number(distortionRange.value);
  distortionValue.textContent = `${value}%`;
  
  // Aplica blur e distorção
  sampleText.style.filter = `blur(${value / 20}px)`;
  sampleText.style.transform = `scaleX(${1 + value / 150})`;
}

if (distortionRange) {
  distortionRange.addEventListener('input', updateDistortion);
  updateDistortion();
}

/* ===== GALERIA COM LIGHTBOX ===== */
document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', (e) => {
    const img = item.querySelector('img');
    if (img && img.src && !img.src.includes('undefined')) {
      // Criar lightbox dinamicamente
      createAndShowLightbox(img.src, img.alt);
    }
  });
});

function createAndShowLightbox(src, alt) {
  // Remover lightbox anterior se existir
  const existing = document.querySelector('#dynamic-lightbox');
  if (existing) existing.remove();
  
  // Criar novo lightbox
  const lightbox = document.createElement('div');
  lightbox.id = 'dynamic-lightbox';
  lightbox.className = 'lightbox active';
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Fechar imagem ampliada">✕</button>
    <img src="${src}" alt="${alt}">
  `;
  
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';
  
  // Fechar ao clicar na imagem ou no botão
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
      closeLightbox();
    }
  });
  
  // Fechar com ESC
  document.addEventListener('keydown', closeLightboxWithEsc);
}

function closeLightbox() {
  const lightbox = document.querySelector('#dynamic-lightbox');
  if (lightbox) {
    lightbox.remove();
    document.body.style.overflow = '';
  }
}

function closeLightboxWithEsc(e) {
  if (e.key === 'Escape') {
    closeLightbox();
    document.removeEventListener('keydown', closeLightboxWithEsc);
  }
}

/* ===== FLASHCARDS ===== */
document.querySelectorAll('.flipCard').forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
  
  // Teclado: Enter ou Espaço para virar
  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

/* ===== MENU MOBILE ===== */
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const nav = document.querySelector('nav div');
    if (nav) {
      nav.classList.toggle('active');
    }
  });
}

/* ===== FECHAR MENU AO CLICAR EM LINK ===== */
document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', () => {
    const nav = document.querySelector('nav div');
    if (nav) {
      nav.classList.remove('active');
    }
  });
});
