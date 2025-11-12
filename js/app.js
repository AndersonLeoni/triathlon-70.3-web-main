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
      const daySlot = document.createElement('div');
      daySlot.className = 'day-slot';

      // Busca o treino com a mesma semana e dia
      const workout = PLAN.find(p => p.week === w && p.day === dayName);
      if (workout) {
        daySlot.appendChild(createCard(workout));
      }

      board.appendChild(daySlot);
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
  // Calcular métricas de performance (simplificado)
  const done = Object.values(appState).filter(s => s.completed);
  const withRpe = done.filter(s => s.rpe !== null);

  // Fitness: baseado no RPE médio dos treinos completados
  const fitness = withRpe.length > 0
    ? Math.round(withRpe.reduce((a, b) => a + b.rpe, 0) / withRpe.length * 10)
    : 0;

  // Fadiga: baseado na intensidade recente (últimos 7 dias simulados)
  const fatigue = Math.round(fitness * 0.8);

  // Forma: Fitness - Fadiga
  const form = Math.max(0, fitness - fatigue);

  // Atualizar métricas
  document.getElementById('fitness').textContent = fitness;
  document.getElementById('fatigue').textContent = fatigue;
  document.getElementById('form').textContent = form;

  // Calcular estatísticas dos treinos
  let totalRunDistance = 0, totalRunElevation = 0;
  let totalBikeDistance = 0, totalBikeWork = 0;
  let totalSwimDistance = 0, totalSwimWork = 0;
  let totalDuration = 0, totalTss = 0;

  done.forEach(workout => {
    const title = PLAN.find(p => p.id === workout.id)?.title || '';
    const rpe = workout.rpe || 5;

    // Estimativas baseadas no título do treino
    if (title.includes('Run') || title.includes('Corrida')) {
      if (title.includes('mi')) {
        const miles = parseFloat(title.match(/(\d+(?:\.\d+)?) mi/)[1]) || 0;
        totalRunDistance += miles * 1.609; // converter para km
        totalRunElevation += miles * 50; // estimativa de elevação
      }
      totalDuration += 30; // minutos estimados
      totalTss += rpe * 30; // TSS estimado
    } else if (title.includes('Cycle') || title.includes('Bike')) {
      if (title.includes('mi')) {
        const miles = parseFloat(title.match(/(\d+(?:\.\d+)?) mi/)[1]) || 0;
        totalBikeDistance += miles * 1.609;
        totalBikeWork += miles * 100; // kJ estimados
      }
      totalDuration += 45;
      totalTss += rpe * 45;
    } else if (title.includes('Swim') || title.includes('Natação')) {
      if (title.includes('m')) {
        const meters = parseFloat(title.match(/(\d+) m/)[1]) || 0;
        totalSwimDistance += meters;
        totalSwimWork += meters * 0.01; // kJ estimados
      }
      totalDuration += 25;
      totalTss += rpe * 25;
    }
  });

  // Atualizar estatísticas
  document.getElementById('run-distance').textContent = totalRunDistance.toFixed(1) + ' km';
  document.getElementById('run-elevation').textContent = Math.round(totalRunElevation) + ' m';
  document.getElementById('bike-distance').textContent = totalBikeDistance.toFixed(1) + ' km';
  document.getElementById('bike-work').textContent = Math.round(totalBikeWork) + ' kJ';
  document.getElementById('swim-distance').textContent = totalSwimDistance + ' m';
  document.getElementById('swim-work').textContent = Math.round(totalSwimWork) + ' kJ';

  // Durações totais
  const totalHours = Math.floor(totalDuration / 60);
  const totalMins = totalDuration % 60;
  document.getElementById('total-duration').textContent = totalHours + 'h ' + totalMins + 'min';

  document.getElementById('total-tss').textContent = Math.round(totalTss);

  // Duração executada (mesma que total para treinos completados)
  document.getElementById('executed-duration').textContent = totalHours + 'h ' + totalMins + 'min';
}

// Inicializar Sortable.js para drag and drop
document.addEventListener('DOMContentLoaded', function() {
    // Slots de dias
    const daySlots = document.querySelectorAll('.day-slot');

    daySlots.forEach(slot => {
        new Sortable(slot, {
            group: 'workouts',
            animation: 150,
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',
            onEnd: function(evt) {
                // Atualizar estado após drag and drop
                console.log('Card moved from', evt.from, 'to', evt.to);
                saveState();
            }
        });
    });
});
