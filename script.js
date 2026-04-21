// ============================================
// STUDIO ARTS - Interactions
// ============================================

// Smooth reveal on scroll
const revealTargets = document.querySelectorAll(
  '.work-card, .pillar-card, .news-item, .sns-card, .section-head, .about-text'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => io.observe(el));

// Contact form handler (demo — no backend)
function handleSubmit(e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = '▶ SENT! お問い合わせありがとうございます。折り返しご連絡いたします。';
  note.style.color = 'var(--yellow)';
  e.target.reset();
  setTimeout(() => { note.textContent = ''; }, 6000);
  return false;
}
window.handleSubmit = handleSubmit;

// Nav hide on scroll down, show on scroll up
let lastY = 0;
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 100 && y > lastY) {
    nav.style.transform = 'translateY(-110%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  nav.style.transition = 'transform 0.3s';
  lastY = y;
});

// ============================================
// THEME PANEL
// ============================================
const THEMES = [
  { id: 'default',  name: 'ゴシック・ヴィオレ', desc: '耽美／深紫×古金',       colors: ['#2D1B3D','#C9B037','#0D0B10','#E5DBC9'] },
  { id: 'mahoyaku', name: 'ロイヤル・グリモワール', desc: '魔導書／深青×金', colors: ['#004986','#debb54','#000000','#f5e9b8'] },
  { id: 'persona',  name: 'ファントム・クリムゾン', desc: '怪盗／真紅×黄',     colors: ['#e60012','#f5d547','#0a0a0a','#f2ead3'] },
  { id: 'emerald',  name: 'エメラルド・ミステリー', desc: 'クラシック／深緑×真鍮', colors: ['#0B3D2E','#D4A84B','#0a0a0a','#EFE6D2'] },
  { id: 'noir',     name: 'ミッドナイト・ノワール', desc: '夜霧／濃紺×古金',     colors: ['#0F2A4D','#C9A86A','#0A0A0A','#E8E2D0'] },
  { id: 'wafu',     name: '和風ミステリー',       desc: '時代劇／朱×金茶×藍墨', colors: ['#C8102E','#E8C15F','#1B2631','#F4EFE0'] },
  { id: 'sakura',   name: 'サクラ・ブラッド',     desc: '妖艶／桜紅×淡桜',       colors: ['#8B1A3B','#F5C6D0','#1A0E14','#F5E6DC'] },
  { id: 'mono',     name: 'モノクローム・アサシン', desc: '反転／血紅×生成り',    colors: ['#B91C1C','#1C1C1C','#F5F1E8','#E5E5E5'] },
  { id: 'cyber',    name: 'サイバー・ネオン',     desc: '電脳／マゼンタ×シアン', colors: ['#FF2E8A','#00D9E8','#050A1F','#F4EFE0'] },
];
const THEME_KEY = 'sa-theme';

function applyTheme(id) {
  document.body.classList.remove(...THEMES.map(t => `theme-${t.id}`));
  if (id && id !== 'default') document.body.classList.add(`theme-${id}`);
  localStorage.setItem(THEME_KEY, id);
  document.querySelectorAll('.theme-card').forEach(c => {
    c.classList.toggle('active', c.dataset.theme === id);
  });
  const theme = THEMES.find(t => t.id === id);
  if (theme) showToast(`▶ ${theme.name}`);
}

function showToast(msg) {
  const t = document.getElementById('themeToast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._tid);
  showToast._tid = setTimeout(() => t.classList.remove('show'), 1800);
}

function buildThemeGrid() {
  const grid = document.getElementById('themeGrid');
  if (!grid) return;
  grid.innerHTML = THEMES.map(t => `
    <button class="theme-card" data-theme="${t.id}">
      <div class="theme-card-swatches">
        ${t.colors.map(c => `<span style="background:${c}"></span>`).join('')}
      </div>
      <div class="theme-card-name">${t.name}</div>
      <div class="theme-card-desc">${t.desc}</div>
    </button>
  `).join('');
  grid.querySelectorAll('.theme-card').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
  });
}

function openPanel() {
  document.getElementById('themeBackdrop')?.classList.add('open');
  document.getElementById('themePanel')?.classList.add('open');
}
function closePanel() {
  document.getElementById('themeBackdrop')?.classList.remove('open');
  document.getElementById('themePanel')?.classList.remove('open');
}

(function initTheme() {
  buildThemeGrid();
  const saved = localStorage.getItem(THEME_KEY) || 'default';
  if (saved !== 'default') document.body.classList.add(`theme-${saved}`);
  document.querySelectorAll('.theme-card').forEach(c => {
    c.classList.toggle('active', c.dataset.theme === saved);
  });

  document.querySelector('.nav-logo')?.addEventListener('click', openPanel);
  document.getElementById('themeClose')?.addEventListener('click', closePanel);
  document.getElementById('themeBackdrop')?.addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });
})();

// Parallax on hero shapes
const shapes = document.querySelectorAll('.hero .shape');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  shapes.forEach((s, i) => {
    const depth = (i + 1) * 6;
    s.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
});
