document.addEventListener('DOMContentLoaded', () => {

  (function a11ySetup() {
    const root = document.documentElement;
    let scale = 1;
    const MIN = 0.85, MAX = 1.4, STEP = 0.1;

    document.getElementById('btn-font-inc').addEventListener('click', () => {
      scale = Math.min(MAX, +(scale + STEP).toFixed(2));
      root.style.setProperty('--font-scale', scale);
    });
    document.getElementById('btn-font-dec').addEventListener('click', () => {
      scale = Math.max(MIN, +(scale - STEP).toFixed(2));
      root.style.setProperty('--font-scale', scale);
    });

    const contrastBtn = document.getElementById('btn-contrast');
    contrastBtn.addEventListener('click', () => {
      const active = document.body.classList.toggle('high-contrast');
      contrastBtn.setAttribute('aria-pressed', String(active));
    });
  })();

  (function navSetup() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.getElementById('btn-iniciar').addEventListener('click', () => {
      document.getElementById('o-que-e').scrollIntoView({ behavior: 'smooth' });
    });
  })();

  (function scrollRevealSetup() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 5, 4) * 60}ms`;
      observer.observe(el);
    });
  })();

  (function flowSetup() {
    const explanations = {
      olho: 'O olho capta a luz do ambiente através da córnea e da pupila, que se ajusta (dilatando no escuro e contraindo na claridade) para controlar a quantidade de luz que entra.',
      retina: 'A luz atravessa o cristalino e chega à retina, uma fina camada de tecido no fundo do olho repleta de células sensíveis à luz: os fotorreceptores.',
      bastonetes: 'Os bastonetes são fotorreceptores especializados em ambientes com pouca luz. Eles não distinguem cores, mas são muito sensíveis — por isso são essenciais para a visão noturna.',
      captacao: 'Dentro dos bastonetes, um pigmento chamado rodopsina reage à luz e dispara um sinal elétrico. Esse pigmento precisa de vitamina A para se regenerar continuamente.',
      imagem: 'Os sinais elétricos percorrem o nervo óptico até o cérebro, onde são interpretados e transformados na imagem que "enxergamos" — inclusive no escuro, ainda que com menos detalhes.'
    };

    const buttons = document.querySelectorAll('.flow-step');
    const explainBox = document.getElementById('flow-explain');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.setAttribute('aria-expanded', 'false'));
        btn.setAttribute('aria-expanded', 'true');
        const key = btn.dataset.step;
        explainBox.innerHTML = `<p>${explanations[key]}</p>`;
      });
    });
  })();

  (function simulatorSetup() {
    const range = document.getElementById('sim-range');
    const rangeValue = document.getElementById('sim-range-value');
    const svg = document.getElementById('sim-svg');
    const vignette = document.getElementById('sim-vignette');
    const nyctBtn = document.getElementById('btn-nyctalopia');
    const caption = document.getElementById('sim-caption');

    let nyctalopiaMode = false;

    function updateScene() {
      const level = Number(range.value); // 0 a 100
      rangeValue.textContent = `${level}%`;

      // Escurecimento e perda de contraste conforme a luminosidade cai
      const brightness = 0.15 + (level / 100) * 0.95;
      const contrast = 0.55 + (level / 100) * 0.55;
      const saturate = 0.3 + (level / 100) * 0.9;

      let filter = `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;

      if (nyctalopiaMode) {
        // No modo cegueira noturna, a cena fica ainda mais difícil de perceber:
        // menos brilho, mais desfoque e contraste reduzido, mesmo com luz média.
        const extraDark = Math.max(0, brightness - 0.35);
        const blur = 1 + (100 - level) / 30;
        filter = `brightness(${extraDark}) contrast(${contrast * 0.6}) saturate(${saturate * 0.4}) blur(${blur.toFixed(1)}px)`;
        vignette.style.opacity = String(0.55 + (100 - level) / 220);
        vignette.style.background =
          'radial-gradient(circle at 50% 55%, transparent 0%, transparent 18%, rgba(0,0,0,0.95) 78%)';
      } else {
        vignette.style.opacity = String((100 - level) / 260);
        vignette.style.background =
          'radial-gradient(circle at 50% 55%, transparent 0%, transparent 45%, rgba(0,0,0,0.85) 100%)';
      }

      svg.style.filter = filter;
    }

    function updateCaption() {
      const level = Number(range.value);
      if (nyctalopiaMode) {
        if (level > 70) {
          caption.textContent = 'Mesmo com boa luz, uma pessoa com cegueira noturna já sente dificuldade em perceber contrastes e profundidade.';
        } else if (level > 30) {
          caption.textContent = 'Com luz reduzida, a cena praticamente desaparece para quem tem cegueira noturna — formas e limites ficam indistinguíveis.';
        } else {
          caption.textContent = 'Em ambientes escuros, a pessoa com cegueira noturna pode enxergar muito pouco ou quase nada, o que é perigoso para caminhar ou dirigir.';
        }
      } else {
        if (level > 70) {
          caption.textContent = 'Visão saudável: com boa luz, todos os detalhes da cena são visíveis com nitidez.';
        } else if (level > 30) {
          caption.textContent = 'Visão saudável: os olhos começam a se adaptar, os bastonetes assumem parte do trabalho dos cones.';
        } else {
          caption.textContent = 'Visão saudável: mesmo no escuro quase total, os bastonetes permitem distinguir formas após alguns minutos de adaptação.';
        }
      }
    }

    range.addEventListener('input', () => {
      updateScene();
      updateCaption();
    });

    nyctBtn.addEventListener('click', () => {
      nyctalopiaMode = !nyctalopiaMode;
      nyctBtn.setAttribute('aria-pressed', String(nyctalopiaMode));
      nyctBtn.textContent = nyctalopiaMode
        ? '👁 Desativar modo: Pessoa com Cegueira Noturna'
        : '👁 Ativar modo: Pessoa com Cegueira Noturna';
      updateScene();
      updateCaption();
    });

    updateScene();
    updateCaption();
  })();

  (function challengeSetup() {
    const field = document.getElementById('challenge-field');
    const vignette = document.getElementById('challenge-vignette');
    const startBtn = document.getElementById('btn-challenge-start');
    const resetBtn = document.getElementById('btn-challenge-reset');
    const modeChip = document.getElementById('challenge-mode-chip');
    const timerChip = document.getElementById('challenge-timer');
    const foundChip = document.getElementById('challenge-found');
    const resultBox = document.getElementById('challenge-result');

    const TOTAL_TARGETS = 4;
    let round = 1; // 1 = visão normal, 2 = cegueira noturna
    let found = 0;
    let startTime = 0;
    let timerInterval = null;
    let times = [0, 0];
    let targets = [];

    function clearTargets() {
      targets.forEach(t => t.remove());
      targets = [];
    }

    function placeTargets() {
      clearTargets();
      found = 0;
      foundChip.textContent = `0 / ${TOTAL_TARGETS} encontrados`;
      for (let i = 0; i < TOTAL_TARGETS; i++) {
        const btn = document.createElement('button');
        btn.className = 'challenge-target';
        btn.setAttribute('aria-label', `Objeto ${i + 1} de ${TOTAL_TARGETS}`);
        const top = 10 + Math.random() * 75;
        const left = 5 + Math.random() * 88;
        btn.style.top = `${top}%`;
        btn.style.left = `${left}%`;
        btn.addEventListener('click', () => onTargetFound(btn));
        field.appendChild(btn);
        targets.push(btn);
      }
    }

    function onTargetFound(btn) {
      if (btn.classList.contains('found')) return;
      btn.classList.add('found');
      found++;
      foundChip.textContent = `${found} / ${TOTAL_TARGETS} encontrados`;
      if (found === TOTAL_TARGETS) finishRound();
    }

    function tick() {
      const elapsed = (Date.now() - startTime) / 1000;
      timerChip.textContent = `${elapsed.toFixed(1)}s`;
    }

    function startRound() {
      resultBox.hidden = true;
      resetBtn.hidden = true;
      startBtn.hidden = true;

      if (round === 2) {
        field.classList.add('nyctalopia-field');
        vignette.style.opacity = '1';
        vignette.style.filter = 'brightness(0.35) blur(1.5px)';
      } else {
        vignette.style.opacity = '0';
        field.style.filter = '';
      }

      modeChip.textContent = round === 1
        ? 'Rodada 1 de 2 — Visão normal'
        : 'Rodada 2 de 2 — Cegueira noturna simulada';

      placeTargets();
      startTime = Date.now();
      timerChip.textContent = '0.0s';
      timerInterval = setInterval(tick, 100);
    }

    function finishRound() {
      clearInterval(timerInterval);
      const elapsed = (Date.now() - startTime) / 1000;
      times[round - 1] = elapsed;

      if (round === 1) {
        round = 2;
        resultBox.hidden = false;
        resultBox.innerHTML = `<p>Rodada 1 concluída em <strong>${elapsed.toFixed(1)}s</strong>. Agora prepare-se para a rodada com cegueira noturna simulada.</p>`;
        startBtn.hidden = false;
        startBtn.textContent = 'Começar Rodada 2';
      } else {
        const diff = times[1] - times[0];
        const percent = times[0] > 0 ? Math.round((diff / times[0]) * 100) : 0;
        resultBox.hidden = false;
        resultBox.innerHTML = `
          <p><strong>Rodada 1 (visão normal):</strong> ${times[0].toFixed(1)}s</p>
          <p><strong>Rodada 2 (cegueira noturna):</strong> ${times[1].toFixed(1)}s</p>
          <p>Você levou <strong>${percent > 0 ? percent + '% a mais de tempo' : 'tempo semelhante'}</strong> para encontrar os objetos no modo cegueira noturna.</p>
          <p>Essa diferença ilustra, em pequena escala, o quanto uma condição real de cegueira noturna pode dificultar tarefas simples do dia a dia, como atravessar uma rua ou encontrar objetos em casa à noite.</p>
        `;
        resetBtn.hidden = false;
      }
    }

    startBtn.addEventListener('click', startRound);

    resetBtn.addEventListener('click', () => {
      round = 1;
      times = [0, 0];
      vignette.style.opacity = '0';
      field.style.filter = '';
      clearTargets();
      resultBox.hidden = true;
      resetBtn.hidden = true;
      startBtn.hidden = false;
      startBtn.textContent = 'Começar Rodada 1';
      modeChip.textContent = 'Rodada 1 de 2 — Visão normal';
      timerChip.textContent = '00.0s';
      foundChip.textContent = `0 / ${TOTAL_TARGETS} encontrados`;
    });
  })();

  /* ======================= 7. FLASHCARDS ======================= */
  (function flashcardsSetup() {
    const cards = [
      { tag: 'Mito ou Verdade?', front: 'A cegueira noturna significa enxergar apenas preto.', back: 'Mito. A pessoa não perde a visão completamente — ela tem muito mais dificuldade de enxergar em ambientes escuros ou com pouca luz.' },
      { tag: 'Curiosidade', front: 'Os bastonetes são responsáveis pela visão em ambientes escuros.', back: 'Verdade. Os bastonetes são fotorreceptores extremamente sensíveis à luz, essenciais para enxergar quando há pouca luminosidade.' },
      { tag: 'Fato', front: 'A deficiência de vitamina A pode causar cegueira noturna.', back: 'Fato confirmado. A vitamina A é essencial para produzir a rodopsina, o pigmento visual usado pelos bastonetes.' },
      { tag: 'Curiosidade', front: 'Nem toda pessoa com dificuldade para enxergar à noite possui cegueira noturna.', back: 'Verdade. Dificuldades pontuais podem ter outras causas, como fadiga ocular ou óculos desatualizados — por isso o diagnóstico profissional é importante.' },
      { tag: 'Mito ou Verdade?', front: 'Óculos comuns resolvem a cegueira noturna.', back: 'Mito. Óculos corrigem erros de refração, mas não tratam causas como deficiência de vitamina A ou retinose pigmentar.' },
      { tag: 'Teoria', front: 'A retina possui células especializadas para diferentes condições de luminosidade.', back: 'Correto. Bastonetes atuam na baixa luminosidade e cones atuam na luz do dia e na percepção de cores.' }
    ];

    const grid = document.getElementById('flashcard-grid');

    cards.forEach((card, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'flashcard';
      wrapper.setAttribute('tabindex', '0');
      wrapper.setAttribute('role', 'button');
      wrapper.setAttribute('aria-label', `Flashcard ${index + 1}: ${card.tag}. Pressione Enter para virar.`);

      wrapper.innerHTML = `
        <div class="flashcard-inner">
          <div class="flashcard-face flashcard-front">
            <p class="flashcard-tag">${card.tag}</p>
            <p>${card.front}</p>
            <span class="flashcard-hint">Clique para virar ↻</span>
          </div>
          <div class="flashcard-face flashcard-back">
            <p class="flashcard-tag">Resposta</p>
            <p>${card.back}</p>
          </div>
        </div>
      `;

      function flip() { wrapper.classList.toggle('is-flipped'); }

      wrapper.addEventListener('click', flip);
      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          flip();
        }
      });

      grid.appendChild(wrapper);
    });
  })();

  /* ======================= 8. QUIZ FINAL ======================= */
  (function quizSetup() {
    const questions = [
      {
        q: 'O que é cegueira noturna?',
        options: [
          'Perda total e permanente da visão',
          'Dificuldade de enxergar em ambientes com pouca luz',
          'Uma doença contagiosa dos olhos',
          'Um tipo de daltonismo'
        ],
        correct: 1,
        explain: 'A cegueira noturna (nictalopia) é a dificuldade de adaptação e enxergar bem em ambientes escuros, não a perda total da visão.'
      },
      {
        q: 'Qual vitamina está diretamente ligada à saúde da visão noturna?',
        options: ['Vitamina C', 'Vitamina D', 'Vitamina A', 'Vitamina B12'],
        correct: 2,
        explain: 'A vitamina A é essencial para a produção de rodopsina, o pigmento usado pelos bastonetes para captar luz em ambientes escuros.'
      },
      {
        q: 'Quais células da retina são mais importantes para a visão em baixa luminosidade?',
        options: ['Cones', 'Bastonetes', 'Células da córnea', 'Células do cristalino'],
        correct: 1,
        explain: 'Os bastonetes são extremamente sensíveis à luz e são responsáveis pela visão em condições de pouca luminosidade.'
      },
      {
        q: 'Óculos de grau comuns conseguem curar a cegueira noturna?',
        options: [
          'Sim, sempre',
          'Não, eles corrigem apenas erros de refração',
          'Somente óculos escuros resolvem',
          'Sim, mas apenas os óculos de sol'
        ],
        correct: 1,
        explain: 'Óculos comuns corrigem miopia, hipermetropia e astigmatismo, mas não tratam causas como deficiência de vitamina A ou doenças da retina.'
      },
      {
        q: 'Qual é uma atitude importante para prevenir ou identificar cedo a cegueira noturna?',
        options: [
          'Evitar qualquer luz artificial',
          'Fazer consultas oftalmológicas regulares',
          'Usar apenas lentes de contato',
          'Dormir com luzes acesas'
        ],
        correct: 1,
        explain: 'Consultas oftalmológicas regulares ajudam a identificar precocemente alterações na retina e outras causas da cegueira noturna.'
      }
    ];

    const wrap = document.getElementById('quiz-wrap');
    let score = 0;
    let answered = 0;

    questions.forEach((item, qIndex) => {
      const block = document.createElement('div');
      block.className = 'quiz-question';
      block.innerHTML = `
        <h3>${qIndex + 1}. ${item.q}</h3>
        <div class="quiz-options" role="group" aria-label="Alternativas"></div>
        <p class="quiz-explain"></p>
      `;
      const optionsBox = block.querySelector('.quiz-options');
      const explainBox = block.querySelector('.quiz-explain');

      item.options.forEach((optionText, optIndex) => {
        const optBtn = document.createElement('button');
        optBtn.className = 'quiz-option';
        optBtn.textContent = optionText;
        optBtn.addEventListener('click', () => {
          const allOpts = optionsBox.querySelectorAll('.quiz-option');
          allOpts.forEach(o => o.disabled = true);

          if (optIndex === item.correct) {
            optBtn.classList.add('correct');
            score++;
          } else {
            optBtn.classList.add('incorrect');
            allOpts[item.correct].classList.add('correct');
          }

          explainBox.textContent = item.explain;
          explainBox.classList.add('show');
          answered++;

          if (answered === questions.length) showScore();
        });
        optionsBox.appendChild(optBtn);
      });

      wrap.appendChild(block);
    });

    function showScore() {
      const scoreBox = document.createElement('div');
      scoreBox.className = 'quiz-score';
      scoreBox.setAttribute('aria-live', 'polite');
      scoreBox.innerHTML = `Você acertou <span>${score} de ${questions.length}</span> perguntas.`;
      wrap.appendChild(scoreBox);
      scoreBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  })();

});

/* ======================= 11. GALERIA DO PROTÓTIPO ======================= */
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('prototype-modal');
  if (!modal) return;

  const modalImg = modal.querySelector('img');
  const modalCaption = modal.querySelector('p');
  const closeBtn = modal.querySelector('.prototype-modal-close');
  const photos = document.querySelectorAll('.prototype-photo');

  photos.forEach(photo => {
    photo.addEventListener('click', () => {
      modalImg.src = photo.dataset.src;
      modalImg.alt = photo.querySelector('img')?.alt || 'Foto ampliada do processo do protótipo';
      modalCaption.textContent = photo.dataset.caption || '';
      if (typeof modal.showModal === 'function') modal.showModal();
    });
  });

  closeBtn.addEventListener('click', () => modal.close());

  modal.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) modal.close();
  });
});
