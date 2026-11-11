/* ==========================================================================
   QUIZ — Protocolo de Restauración Metabólica
   Diagnóstico interactivo de niveles de saturación celular
   ========================================================================== */

const quizQuestions = [
  {
    question: '¿Cómo describes tu sueño la mayoría de las noches?',
    dimension: 'sueno',
    options: [
      { text: 'Duermo bien y me despierto descansada', score: 0 },
      { text: 'Me cuesta conciliar pero luego duermo', score: 1 },
      { text: 'Me despierto varias veces durante la noche', score: 2 },
      { text: 'Aunque duerma 8 horas, me levanto agotada', score: 3 }
    ]
  },
  {
    question: '¿Cómo se siente tu cuerpo después de comer?',
    dimension: 'inflamacion',
    options: [
      { text: 'Ligera y con buena energía', score: 0 },
      { text: 'Un poco pesada, pero se pasa rápido', score: 1 },
      { text: 'Hinchada y con digestión lenta/gases', score: 2 },
      { text: 'Inflamada casi siempre, sin importar qué coma', score: 3 }
    ]
  },
  {
    question: '¿Cómo es tu nivel de energía a mitad del día?',
    dimension: 'energia',
    options: [
      { text: 'Estable, me mantengo activa todo el día', score: 0 },
      { text: 'Baja un poco en la tarde pero me recupero', score: 1 },
      { text: 'Necesito café o algo dulce urgentemente para seguir', score: 2 },
      { text: 'Me siento con neblina mental y sin fuerzas', score: 3 }
    ]
  },
  {
    question: '¿Cuántas tazas de café o energizantes tomas al día?',
    dimension: 'dependencia',
    options: [
      { text: 'Ninguna o una sola por puro gusto', score: 0 },
      { text: '1-2 tazas, las requiero para arrancar el día', score: 1 },
      { text: '3 o más al día, sin café no puedo rendir', score: 2 },
      { text: 'He intentado dejar el café y caigo en migrañas o fatiga', score: 3 }
    ]
  },
  {
    question: '¿Cómo describirías tu tránsito digestivo?',
    dimension: 'digestion',
    options: [
      { text: 'Regular y sin ninguna molestia (1-2 veces al día)', score: 0 },
      { text: 'A veces irregular o con episodios de gases', score: 1 },
      { text: 'Estreñimiento frecuente (paso días sin evacuar)', score: 2 },
      { text: 'Problemas crónicos de colon que condicionan mi día a día', score: 3 }
    ]
  }
];

let currentQuestion = 0;
let quizAnswers = [];

function initQuiz() {
  currentQuestion = 0;
  quizAnswers = [];
  const resultsEl = document.getElementById('quiz-results');
  const bodyEl = document.getElementById('quiz-body');
  const headerEl = document.getElementById('quiz-header');
  const progressWrap = document.getElementById('quiz-progress-wrap');
  
  if (resultsEl) resultsEl.classList.add('hidden');
  if (bodyEl) bodyEl.classList.remove('hidden');
  if (headerEl) headerEl.classList.remove('hidden');
  if (progressWrap) progressWrap.classList.remove('hidden');
  
  renderQuestion();
}

function renderQuestion() {
  const q = quizQuestions[currentQuestion];
  const body = document.getElementById('quiz-body');
  if (!body || !q) return;

  const pct = Math.round((currentQuestion / quizQuestions.length) * 100);
  
  const stepLabel = document.getElementById('quiz-step-label');
  const pctLabel = document.getElementById('quiz-pct-label');
  const progressBar = document.getElementById('quiz-progress');

  if (stepLabel) stepLabel.textContent = `Pregunta ${currentQuestion + 1} de ${quizQuestions.length}`;
  if (pctLabel) pctLabel.textContent = `${pct}%`;
  if (progressBar) progressBar.style.width = `${pct}%`;

  body.innerHTML = `
    <div style="animation: quizFadeIn 0.35s ease;">
      <h3 class="font-serif text-xl md:text-2xl text-white mb-6 leading-snug">${q.question}</h3>
      <div class="space-y-3">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" onclick="selectAnswer(${i}, ${opt.score}, '${q.dimension}')">
            <span class="radio-dot"></span>
            <span class="leading-relaxed">${opt.text}</span>
          </button>
        `).join('')}
      </div>
    </div>
    <style>
      @keyframes quizFadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
  `;
}

function selectAnswer(index, score, dimension) {
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((opt, i) => {
    opt.classList.toggle('selected', i === index);
  });

  quizAnswers[currentQuestion] = { dimension, score };

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  }, 350);
}

function showResults() {
  const bodyEl = document.getElementById('quiz-body');
  const progressWrap = document.getElementById('quiz-progress-wrap');
  const resultsEl = document.getElementById('quiz-results');

  if (bodyEl) bodyEl.classList.add('hidden');
  if (progressWrap) progressWrap.classList.add('hidden');
  if (resultsEl) resultsEl.classList.remove('hidden');

  const dims = { sueno: 0, inflamacion: 0, energia: 0, dependencia: 0, digestion: 0 };
  quizAnswers.forEach(a => { 
    if (a) dims[a.dimension] = a.score; 
  });
  
  const total = Object.values(dims).reduce((s, v) => s + v, 0);
  const maxTotal = quizQuestions.length * 3;
  const pctTotal = Math.round((total / maxTotal) * 100);

  let level, title, subtitle, recommendedPhase;
  if (pctTotal <= 25) {
    level = 1; 
    title = 'Saturación Leve'; 
    subtitle = 'Tu organismo muestra signos iniciales de sobrecarga. Es el momento perfecto para prevención y optimización.';
    recommendedPhase = 'Flora Liv + Vita Xtra T+';
  } else if (pctTotal <= 60) {
    level = 2; 
    title = 'Saturación Acumulada'; 
    subtitle = 'Tu cuerpo muestra señales claras de toxicidad hepática e inflamación digestiva. Requiere un protocolo estructurado.';
    recommendedPhase = 'Protocolo 2 Fases (Prunex 1 + Flora Liv)';
  } else {
    level = 3; 
    title = 'Saturación Crónica / Avanzada'; 
    subtitle = 'Tus filtros naturales (colon, hígado) están sobrecargados. Urge iniciar el Protocolo Completo de 4 Fases.';
    recommendedPhase = 'Protocolo Completo de Restauración (4 Fases)';
  }

  const resLevel = document.getElementById('result-level');
  const resTitle = document.getElementById('result-title');
  const resSubtitle = document.getElementById('result-subtitle');

  if (resLevel) resLevel.textContent = level;
  if (resTitle) resTitle.textContent = title;
  if (resSubtitle) resSubtitle.textContent = subtitle;

  const dimLabels = {
    sueno: 'Calidad de Sueño', 
    inflamacion: 'Nivel de Inflamación', 
    energia: 'Vitalidad Celular',
    dependencia: 'Dependencia de Cafeína', 
    digestion: 'Salud Intestinal'
  };
  
  const colors = {
    sueno: '#6B9B7A', 
    inflamacion: '#C9A96E', 
    energia: '#4A7C5C',
    dependencia: '#D4BC8B', 
    digestion: '#355B44'
  };

  const barsEl = document.getElementById('result-bars');
  if (barsEl) {
    barsEl.innerHTML = '';
    Object.keys(dims).forEach(key => {
      const pct = Math.round((dims[key] / 3) * 100);
      const labelLevel = pct <= 33 ? 'Bajo' : pct <= 66 ? 'Moderado' : 'Crítico';
      barsEl.innerHTML += `
        <div>
          <div class="flex justify-between text-sm mb-2">
            <span style="color:rgba(255,255,255,0.7);">${dimLabels[key]}</span>
            <span style="color:${colors[key]}; font-weight:700;">${labelLevel} (${dims[key]}/3)</span>
          </div>
          <div class="quiz-result-bar">
            <div class="quiz-result-fill" style="width:0%; background:${colors[key]};"></div>
          </div>
        </div>
      `;
    });

    setTimeout(() => {
      const fills = barsEl.querySelectorAll('.quiz-result-fill');
      Object.keys(dims).forEach((key, i) => {
        const pct = Math.max(12, Math.round((dims[key] / 3) * 100));
        if (fills[i]) fills[i].style.width = pct + '%';
      });
    }, 150);
  }

  // Enlace de WhatsApp con formato tabulado y segmentado
  const divider = '--------------------------------------------------';
  let waMsg = `*DIAGNÓSTICO — PROTOCOLO DE RESTAURACIÓN METABÓLICA*\n`;
  waMsg += `${divider}\n`;
  waMsg += `📊 *EVALUACIÓN DE SATURACIÓN*\n`;
  waMsg += `• Nivel Determinado : Nivel ${level} (${title})\n\n`;
  waMsg += `📈 *PUNTUACIÓN POR ÁREAS*\n`;
  Object.keys(dims).forEach(k => {
    const label = dimLabels[k].padEnd(14, ' ');
    waMsg += `• ${label}: ${dims[k]} de 3 puntos\n`;
  });
  waMsg += `${divider}\n`;
  waMsg += `🎯 *RECOMENDACIÓN CLÍNICA*\n`;
  waMsg += `• Fase Sugerida : ${recommendedPhase}\n`;
  waMsg += `${divider}\n`;
  waMsg += `💬 Hola Yojandry, realicé el test metabólico en la web y me gustaría recibir tu guía personalizada para iniciar.`;

  const waBtn = document.getElementById('quiz-wa-btn');
  if (waBtn) {
    waBtn.href = `https://wa.me/573143096984?text=${encodeURIComponent(waMsg)}`;
  }

  const headerEl = document.getElementById('quiz-header');
  if (headerEl) {
    headerEl.innerHTML = `
      <span class="text-brand-forest-glow text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">Diagnóstico Personalizado</span>
      <h2 class="font-serif text-3xl md:text-4xl text-white mb-2">Nivel ${level}: <span class="text-brand-gold-light">${title}</span></h2>
      <p class="text-base md:text-lg leading-relaxed" style="color:rgba(255,255,255,0.7); max-width: 600px; margin: 0 auto;">${subtitle}</p>
    `;
  }
}

function resetQuiz() {
  const headerEl = document.getElementById('quiz-header');
  if (headerEl) {
    headerEl.innerHTML = `
      <span class="text-brand-forest-glow text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">Test Gratuito — 3 minutos</span>
      <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-4">¿Tu cansancio es edad o<br><span class="text-brand-gold-light">Cuerpo Saturado?</span></h2>
      <p class="text-lg leading-relaxed" style="color:rgba(255,255,255,0.6);">Responde 5 preguntas y descubre tu nivel de saturación metabólica.</p>
    `;
  }
  initQuiz();
}

document.addEventListener('DOMContentLoaded', initQuiz);
