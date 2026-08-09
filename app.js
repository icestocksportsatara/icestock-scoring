// Data storage
let competitions = JSON.parse(localStorage.getItem('competitions') || '[]');
let matches = JSON.parse(localStorage.getItem('matches') || '[]');
let results = JSON.parse(localStorage.getItem('results') || '[]');

// Current state
let currentView = 'competitions';
let currentDiscipline = 'team-game';
let currentRound = 1;
let currentMatch = {
  teamA: { name: '', score: 0, rounds: [] },
  teamB: { name: '', score: 0, rounds: [] }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initModals();
  initScoringPanels();
  loadCompetitions();
  initTeamGameScoring();
  initTargetShootingScoring();
  initDistanceScoring();
});

// Navigation
function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      switchView(view);
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function switchView(view) {
  currentView = view;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(`${view}-view`).classList.add('active');

  if (view === 'competitions') loadCompetitions();
  if (view === 'results') loadResults();
  if (view === 'rankings') loadRankings();
}

// Modal handling
function initModals() {
  const newCompBtn = document.getElementById('new-competition-btn');
  const modal = document.getElementById('new-competition-modal');
  const modal = document.getElementById('new-competition-modal');
  const closeBtn = modal.querySelector('.modal-close');
  const cancelBtn = modal.querySelector('.modal-cancel');
  const createBtn = document.getElementById('create-competition-btn');

  newCompBtn.addEventListener('click', () => modal.classList.add('active'));
  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  cancelBtn.addEventListener('click', () => modal.classList.remove('active'));

  createBtn.addEventListener('click', () => {
    const name = document.getElementById('comp-name').value;
    const location = document.getElementById('comp-location').value;
    const date = document.getElementById('comp-date').value;
    const discipline = document.getElementById('comp-discipline').value;

    if (!name || !location || !date) {
      alert('Please fill in all fields');
      return;
    }

    const competition = {
      id: Date.now(),
      name,
      location,
      date,
      discipline,
      status: 'active'
    };

    competitions.push(competition);
    localStorage.setItem('competitions', JSON.stringify(competitions));
    modal.classList.remove('active');
    loadCompetitions();

    document.getElementById('comp-name').value = '';
    document.getElementById('comp-location').value = '';
    document.getElementById('comp-date').value = '';
  });
}

// Scoring panel switching
function initScoringPanels() {
  const disciplineBtns = document.querySelectorAll('.discipline-btn');
  disciplineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const discipline = btn.dataset.discipline;
      currentDiscipline = discipline;

      disciplineBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.scoring-panel').forEach(p => p.classList.remove('active'));
      document.getElementById(`${discipline}-panel`).classList.add('active');
    });
  });
}

// Load competitions
function loadCompetitions() {
  const grid = document.getElementById('competitions-list');
  grid.innerHTML = '';

  if (competitions.length === 0) {
    grid.innerHTML = '<p style="color: var(--text-secondary); text-align: center; grid-column: 1/-1;">No competitions yet. Create one to get started.</p>';
    return;
  }

  competitions.forEach(comp => {
    const card = document.createElement('div');
    card.className = 'competition-card';
    card.innerHTML = `
      <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">${comp.name}</h3>
      <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.25rem;">${comp.location}</p>
      <p style="color: var(--text-tertiary); font-size: 0.875rem; margin-bottom: 0.75rem;">${new Date(comp.date).toLocaleDateString()}</p>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <span style="background: var(--surface-4); padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600;">${comp.discipline}</span>
        <span style="background: var(--support); color: var(--surface-0); padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600;">${comp.status}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Team Game Scoring
function initTeamGameScoring() {
  const calculateBtn = document.getElementById('calculate-round-btn');
  const nextRoundBtn = document.getElementById('next-round-btn');
  const finishBtn = document.getElementById('finish-match-btn');

  calculateBtn.addEventListener('click', calculateRound);
  nextRoundBtn.addEventListener('click', nextRound);
  finishBtn.addEventListener('click', finishMatch);
}

function calculateRound() {
  const teamAStocks = Array.from(document.querySelectorAll('#teamA-stocks input')).map(i => parseFloat(i.value) || 0);
  const teamBStocks = Array.from(document.querySelectorAll('#teamB-stocks input')).map(i => parseFloat(i.value) || 0);

  const teamAMin = Math.min(...teamAStocks.filter(s => s > 0));
  const teamBMin = Math.min(...teamBStocks.filter(s => s > 0));

  let teamAPoints = 0;
  let teamBPoints = 0;

  if (teamAMin < teamBMin) {
    teamAPoints = 3;
    teamAPoints += teamAStocks.filter(s => s > 0 && s < teamBMin).length * 2;
  } else if (teamBMin < teamAMin) {
    teamBPoints = 3;
    teamBPoints += teamBStocks.filter(s => s > 0 && s < teamAMin).length * 2;
  }

  if (teamAPoints > teamBPoints) {
    currentMatch.teamA.score += 2;
    currentMatch.teamA.rounds.push(2);
    currentMatch.teamB.rounds.push(0);
  } else if (teamBPoints > teamAPoints) {
    currentMatch.teamB.score += 2;
    currentMatch.teamB.rounds.push(2);
    currentMatch.teamA.rounds.push(0);
  } else {
    currentMatch.teamA.score += 1;
    currentMatch.teamB.score += 1;
    currentMatch.teamA.rounds.push(1);
    currentMatch.teamB.rounds.push(1);
  }

  updateScoreboard();
}

function updateScoreboard() {
  currentMatch.teamA.name = document.getElementById('teamA-name').value || 'Team A';
  currentMatch.teamB.name = document.getElementById('teamB-name').value || 'Team B';

  document.querySelector('#teamA-score .team-name').textContent = currentMatch.teamA.name;
  document.querySelector('#teamB-score .team-name').textContent = currentMatch.teamB.name;

  document.querySelector('#teamA-score .score-display').textContent = currentMatch.teamA.score;
  document.querySelector('#teamB-score .score-display').textContent = currentMatch.teamB.score;

  document.getElementById('teamA-rounds').innerHTML = currentMatch.teamA.rounds.map(r =>
    `<span class="round-score-pill">${r}</span>`
  ).join('');
  document.getElementById('teamB-rounds').innerHTML = currentMatch.teamB.rounds.map(r =>
    `<span class="round-score-pill">${r}</span>`
  ).join('');
}

function nextRound() {
  if (currentRound >= 6) {
    alert('Match is complete. Please finish the match.');
    return;
  }

  currentRound++;
  document.querySelector('.current-round').textContent = currentRound;

  document.querySelectorAll('.stock-inputs input').forEach(input => input.value = '');
}

function finishMatch() {
  const result = {
    id: Date.now(),
    discipline: 'team-game',
    teamA: currentMatch.teamA,
    teamB: currentMatch.teamB,
    date: new Date().toISOString()
  };

  results.push(result);
  localStorage.setItem('results', JSON.stringify(results));

  alert(`Match complete! ${currentMatch.teamA.name}: ${currentMatch.teamA.score} - ${currentMatch.teamB.name}: ${currentMatch.teamB.score}`);

  currentMatch = {
    teamA: { name: '', score: 0, rounds: [] },
    teamB: { name: '', score: 0, rounds: [] }
  };
  currentRound = 1;

  document.getElementById('teamA-name').value = '';
  document.getElementById('teamB-name').value = '';
  document.querySelectorAll('.stock-inputs input').forEach(input => input.value = '');
  document.querySelector('.current-round').textContent = 1;
  updateScoreboard();
}

// Target Shooting Scoring
function initTargetShootingScoring() {
  const calculateBtn = document.getElementById('calculate-target-btn');
  const saveBtn = document.getElementById('save-target-btn');

  document.querySelectorAll('.attempt-score').forEach(input => {
    input.addEventListener('input', updateTargetTotals);
  });

  calculateBtn.addEventListener('click', calculateTargetTotal);
  saveBtn.addEventListener('click', saveTargetResult);
}

function updateTargetTotals() {
  const rounds = document.querySelectorAll('.target-round');
  rounds.forEach(round => {
    const inputs = round.querySelectorAll('.attempt-score');
    const total = Array.from(inputs).reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0);
    round.querySelector('.round-total span').textContent = total;
  });
}

function calculateTargetTotal() {
  const rounds = document.querySelectorAll('.target-round');
  let grandTotal = 0;

  rounds.forEach(round => {
    const inputs = round.querySelectorAll('.attempt-score');
    const total = Array.from(inputs).reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0);
    grandTotal += total;
  });

  document.querySelector('.total-score').textContent = grandTotal;
}

function saveTargetResult() {
  const playerName = document.getElementById('shooter-name').value;
  if (!playerName) {
    alert('Please enter player/team name');
    return;
  }

  calculateTargetTotal();
  const totalScore = parseInt(document.querySelector('.total-score').textContent);

  const result = {
    id: Date.now(),
    discipline: 'target-shooting',
    playerName,
    score: totalScore,
    date: new Date().toISOString()
  };

  results.push(result);
  localStorage.setItem('results', JSON.stringify(results));

  alert(`Result saved! ${playerName}: ${totalScore}/240 points`);

  document.getElementById('shooter-name').value = '';
  document.querySelectorAll('.attempt-score').forEach(input => input.value = '');
  document.querySelector('.total-score').textContent = '0';
  updateTargetTotals();
}

// Distance Competition Scoring
function initDistanceScoring() {
  const calculateBtn = document.getElementById('calculate-distance-btn');
  const saveBtn = document.getElementById('save-distance-btn');

  calculateBtn.addEventListener('click', calculateBestDistance);
  saveBtn.addEventListener('click', saveDistanceResult);
}

function calculateBestDistance() {
  const inputs = document.querySelectorAll('.distance-value');
  const distances = Array.from(inputs).map(input => parseFloat(input.value) || 0);
  const best = Math.max(...distances);

  document.querySelector('.best-distance').textContent = best.toFixed(2);
}

function saveDistanceResult() {
  const playerName = document.getElementById('distance-player-name').value;
  if (!playerName) {
    alert('Please enter player name');
    return;
  }

  calculateBestDistance();
  const bestDistance = parseFloat(document.querySelector('.best-distance').textContent);

  const result = {
    id: Date.now(),
    discipline: 'distance',
    playerName,
    distance: bestDistance,
    date: new Date().toISOString()
  };

  results.push(result);
  localStorage.setItem('results', JSON.stringify(results));

  alert(`Result saved! ${playerName}: ${bestDistance}m`);

  document.getElementById('distance-player-name').value = '';
  document.querySelectorAll('.distance-value').forEach(input => input.value = '');
  document.querySelector('.best-distance').textContent = '0.00';
}

// Load results
function loadResults() {
  const grid = document.getElementById('results-list');
  grid.innerHTML = '';

  if (results.length === 0) {
    grid.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No results yet.</p>';
    return;
  }

  results.reverse().forEach(result => {
    const card = document.createElement('div');
    card.className = 'result-card';

    if (result.discipline === 'team-game') {
      card.innerHTML = `
        <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">Team Game</h3>
        <p style="font-size: 1.25rem; font-weight: 600; color: var(--accent); margin: 0.5rem 0;">${result.teamA.name} ${result.teamA.score} - ${result.teamB.score} ${result.teamB.name}</p>
        <p style="color: var(--text-tertiary); font-size: 0.875rem;">${new Date(result.date).toLocaleString()}</p>
      `;
    } else if (result.discipline === 'target-shooting') {
      card.innerHTML = `
        <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">Target Shooting</h3>
        <p style="font-size: 1.25rem; font-weight: 600; color: var(--support); margin: 0.5rem 0;">${result.playerName}: ${result.score}/240</p>
        <p style="color: var(--text-tertiary); font-size: 0.875rem;">${new Date(result.date).toLocaleString()}</p>
      `;
    } else if (result.discipline === 'distance') {
      card.innerHTML = `
        <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">Distance Competition</h3>
        <p style="font-size: 1.25rem; font-weight: 600; color: var(--accent); margin: 0.5rem 0;">${result.playerName}: ${result.distance}m</p>
        <p style="color: var(--text-tertiary); font-size: 0.875rem;">${new Date(result.date).toLocaleString()}</p>
      `;
    }

    grid.appendChild(card);
  });
}

// Load rankings
function loadRankings() {
  const table = document.getElementById('rankings-table');
  table.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">Rankings feature coming soon...</p>';
}