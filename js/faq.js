const faqItems = [
  {
    question: '¿Qué es el Protocolo de Restauración Metabólica?',
    answer: 'Es un sistema estructurado en 4 fases que combina nutrición funcional con bebidas nutracéuticas 100% naturales y acompañamiento personalizado. Cada fase cumple un propósito vital: 1) Limpieza de colon, 2) Regeneración de microbiota, 3) Desintoxicación hepática y 4) Activación de energía celular prolongada. No es un suplemento milagro aislado, sino un protocolo secuencial diseñado según las necesidades de tu organismo.'
  },
  {
    question: '¿Esto ya lo he intentado antes y no me funcionó?',
    answer: 'Es completamente normal tener esa duda. La gran mayoría de personas han probado soluciones aisladas: pastillas para dormir, té laxante temporal, dietas restrictivas o multivitaminas sintéticas. Esas soluciones atacan síntomas sin atender el origen. El Protocolo de Restauración Metabólica funciona porque repara la capacidad de tu cuerpo para absorber nutrientes, desinflamar órganos de filtro y producir energía limpia.'
  },
  {
    question: '¿No creo mucho en suplementos ni polvos mágicos?',
    answer: 'Entendemos tu precaución. No promovemos químicos ni polvos con aditivos artificiales. Las bebidas nutracéuticas de FuXion utilizan biotecnología limpia: extractos activos de frutas amazónicas, andinas y asiáticas con minerales quelados (de absorción celular 100%), sin azúcar añadida, sin preservantes ni colorantes artificiales. Respaldado por certificaciones internacionales Clean Label.'
  },
  {
    question: '¿Seguro es muy costoso?',
    answer: 'La verdadera pregunta es: ¿cuánto te cuesta vivir con fatiga crónica, baja productividad, medicamentos gástricos, tazas repetitivas de café y visitas médicas frecuentes? Invertir en tu salud celular y metabólica es infinitamente más accesible que pagar las consecuencias del desgaste. Además, el protocolo se adapta flexiblemente a tus prioridades y presupuesto.'
  },
  {
    question: '¿No tengo tiempo suficiente para un protocolo complejo?',
    answer: 'Precisamente porque tienes poco tiempo necesitas energía real y digestión eficiente. El protocolo no requiere preparar licuados complicados ni cambiar radicalmente tus horarios. Los sobres hidrosolubles se disuelven en agua fría o tibia en 10 segundos. No te quita tiempo: te devuelve horas productivas y descanso profundo.'
  },
  {
    question: '¿Eso del detox no es una simple moda comercial?',
    answer: 'Desconfiar de las modas es saludable. Nuestro enfoque no es un "jugo verde de tres días" que produce efecto rebote. Hablamos de desinflamación metabólica guiada: soporte hepático e intestinal con principios activos botánicos clínicamente demostrados y acompañamiento continuo para consolidar hábitos sostenibles.'
  }
];

function renderFAQ() {
  const container = document.getElementById('faq-container');
  if (!container) return;

  container.innerHTML = faqItems.map((item, i) => `
    <div class="faq-item" id="faq-item-${i}">
      <button class="faq-question" onclick="toggleFAQ(this)" aria-expanded="false" aria-controls="faq-answer-${i}">
        <span>${item.question}</span>
        <svg class="faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
      <div class="faq-answer" id="faq-answer-${i}">
        <p class="faq-answer-content">${item.answer}</p>
      </div>
    </div>
  `).join('');
}

function toggleFAQ(btn) {
  const item = btn.closest('.faq-item');
  if (!item) return;
  const isOpen = item.classList.contains('open');
  
  document.querySelectorAll('.faq-item.open').forEach(el => { 
    if (el !== item) {
      el.classList.remove('open');
      const b = el.querySelector('.faq-question');
      if (b) b.setAttribute('aria-expanded', 'false');
    }
  });

  item.classList.toggle('open');
  btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
}

