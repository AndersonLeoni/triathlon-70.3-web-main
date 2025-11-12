/* =========================================================================
 *  app.js - VERSÃO CORRIGIDA
 *  Renderiza o calendário, controla estado e termômetro
 * ========================================================================= */

let appState = loadState();
migrateLegacyState();
saveState();

function loadState() {
  try {
    return JSON.parse(localStorage.getItem('ironman70.3_state')) || {};
  } catch (err) {
    console.warn('Falha ao ler localStorage');
    return {};
  }
}

function migrateLegacyState() {
  let changed = false;
  Object.values(appState).forEach(obj => {
    if ('c' in obj) { obj.completed = !!obj.c; delete obj.c; changed = true; }
    if ('r' in obj) { obj.rpe = obj.r; delete obj.r; changed = true; }
    if ('n' in obj) { obj.note = obj.n; delete obj.n; changed = true; }
  });
  if (changed) console.info('✓ Estado migrado');
}

function saveState() {
  localStorage.setItem('ironman70.3_state', JSON.stringify(appState));
}

// Renderiza quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
  if (typeof PLAN === 'undefined') {
    console.error('❌ PLAN não foi carregado. Verifique plan.js');
    return;
  }
  renderCalendar();
  updateReadiness();
});

function renderCalendar() {
  const board = document.querySelector('#board');
  if (!board) {
    console.error('❌ Elemento #board não encontrado');
    return;
  }

  board.innerHTML = '';
  const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  // Cabeçalhos
  DAYS.forEach(day => {
    const h = document.createElement('h3');
    h.textContent = day;
    board.appendChild(h);
  });

  // Grid: 20 semanas × 7 dias
  for (let w = 1; w <= 20; w++) {
    DAYS.forEach((dayName, dayIndex) => {
      // Busca o treino com a mesma semana e dia
      const workout = PLAN.find(p => p.week === w && p.day === dayName);

      if (!workout) {
        board.appendChild(document.createElement('div'));
        return;
      }

      board.appendChild(createCard(workout));
    });
  }
}

function createCard(workout) {
  const { id, title } = workout;

  if (!appState[id]) {
    appState[id] = { completed: false, rpe: null, note: '' };
  }

  const st = appState[id];
  const card = document.createElement('div');
  card.className = 'workout-card' + (st.completed ? ' completed' : '');
  card.id = 'card-' + id;

  card.innerHTML = '<p class="title">' + title + '</p>' +
    '<div class="controls">' +
      '<button class="btn-done">' + (st.completed ? '✔️' : '◻️') + '</button>' +
      '<span class="rpe-group">' +
        '<span class="rpe" data-v="1" title="RPE 1">😁</span>' +
        '<span class="rpe" data-v="3" title="RPE 3">🙂</span>' +
        '<span class="rpe" data-v="5" title="RPE 5">😐</span>' +
        '<span class="rpe" data-v="7" title="RPE 7">😣</span>' +
        '<span class="rpe" data-v="9" title="RPE 9">😫</span>' +
      '</span>' +
    '</div>' +
    '<textarea class="note-field" placeholder="Obs...">' + (st.note || '') + '</textarea>';

  // Marca o RPE selecionado
  if (st.rpe !== null) {
    const selected = card.querySelector('.rpe[data-v="' + st.rpe + '"]');
    if (selected) selected.classList.add('selected');
  }

  // Evento: checkbox
  card.querySelector('.btn-done').addEventListener('click', () => {
    st.completed = !st.completed;
    card.classList.toggle('completed');
    card.querySelector('.btn-done').textContent = st.completed ? '✔️' : '◻️';
    saveState();
    updateReadiness();
  });

  // Evento: RPE
  card.querySelectorAll('.rpe').forEach(el => {
    el.addEventListener('click', () => {
      const v = Number(el.dataset.v);
      st.rpe = st.rpe === v ? null : v;

      card.querySelectorAll('.rpe').forEach(x => x.classList.remove('selected'));
      if (st.rpe !== null) {
        card.querySelector('.rpe[data-v="' + st.rpe + '"]').classList.add('selected');
      }

      saveState();
      updateReadiness();
    });
  });

  // Evento: notas
  card.querySelector('.note-field').addEventListener('input', (e) => {
    st.note = e.target.value;
    saveState();
  });

  return card;
}

function updateReadiness() {
  const disp = document.querySelector('#readiness-display');
  if (!disp) {
    console.warn('⚠️  #readiness-display não encontrado');
    return;
  }

  const done = Object.values(appState).filter(s => s.completed);
  const withRpe = done.filter(s => s.rpe !== null);

  const avg = withRpe.length > 0
    ? withRpe.reduce((a, b) => a + b.rpe, 0) / withRpe.length
    : 5;

  const pct = PLAN.length > 0
    ? Math.round((done.length / PLAN.length) * 100)
    : 0;

  let label = 'Regular', cls = 'regular';
  if (avg <= 2) { label = 'Ótima'; cls = 'otima'; }
  else if (avg <= 4) { label = 'Boa'; cls = 'boa'; }
  else if (avg <= 6) { label = 'Regular'; cls = 'regular'; }
  else { label = 'Ruim'; cls = 'ruim'; }

  disp.className = 'readiness ' + cls;
  disp.textContent = 'Prontidão: ' + label + ' ' + pct + '%';
}

// Inicializar Sortable.js para drag and drop
document.addEventListener('DOMContentLoaded', function() {
    // Lista de treinos
    const trainingPlan = document.getElementById('board');

    if (trainingPlan) {
        new Sortable(trainingPlan, {
            group: 'shared',
            animation: 150,
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',
            onEnd: function(evt) {
                // Atualizar estado após drag and drop
                const cards = trainingPlan.querySelectorAll('.workout-card');
                cards.forEach((card, index) => {
                    const id = card.id.replace('card-', '');
                    // Aqui você pode implementar lógica para reordenar os treinos
                    console.log('Card moved:', id, 'to position:', index);
                });
                saveState();
            }
        });
    }

    // Listas de exercícios por modalidade (se existirem)
    const exerciseLists = document.querySelectorAll('.exercise-list');
    exerciseLists.forEach(list => {
        new Sortable(list, {
            group: {
                name: 'shared',
                pull: 'clone',
                put: false
            },
            animation: 150,
            sort: false,
            onEnd: function(evt) {
                if (evt.to === trainingPlan) {
                    // Lógica para adicionar novo treino
                    console.log('New workout added');
                }
            }
        });
    });
});
