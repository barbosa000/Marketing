let tasks = [
  { titulo: 'Criar artigo SEO', status: 'Pendentes', categoria: 'SEO' },
  { titulo: 'Campanha Google Ads', status: 'Em Andamento', categoria: 'Anúncios' },
  { titulo: 'Arte Instagram', status: 'Concluídas', categoria: 'Design' },
  { titulo: 'Landing Page Promoção', status: 'Atrasadas', categoria: 'Conteúdo' }
];

const cols = ['Pendentes', 'Em Andamento', 'Concluídas', 'Atrasadas'];

function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('titulo').focus();
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modalOverlay')) return;
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('titulo').value = '';
}

function addTask() {
  const titulo = document.getElementById('titulo').value.trim();
  const status = document.getElementById('status').value;
  const categoria = document.getElementById('categoria').value;
  if (!titulo) {
    document.getElementById('titulo').focus();
    return;
  }
  tasks.push({ titulo, status, categoria });
  document.getElementById('titulo').value = '';
  document.getElementById('modalOverlay').classList.remove('open');
  render();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  render();
}

function render() {
  cols.forEach(c => {
    document.getElementById(c).innerHTML = '';
  });

  tasks.forEach((t, i) => {
    const div = document.createElement('div');
    div.className = 'task';
    div.innerHTML = `
      <div class="task-info">
        <div class="task-title">${t.titulo}</div>
        ${t.categoria ? `<span class="task-cat">${t.categoria}</span>` : ''}
      </div>
      <button class="task-del" onclick="deleteTask(${i})" title="Remover">✕</button>
    `;
    document.getElementById(t.status).appendChild(div);
  });

  const total = tasks.length;
  const counts = {
    'Pendentes': tasks.filter(t => t.status === 'Pendentes').length,
    'Em Andamento': tasks.filter(t => t.status === 'Em Andamento').length,
    'Concluídas': tasks.filter(t => t.status === 'Concluídas').length,
    'Atrasadas': tasks.filter(t => t.status === 'Atrasadas').length,
  };

  document.getElementById('total').textContent = total;
  document.getElementById('pendentesCount').textContent = counts['Pendentes'];
  document.getElementById('andamentoCount').textContent = counts['Em Andamento'];
  document.getElementById('concluidasCount').textContent = counts['Concluídas'];
  document.getElementById('atrasadasCount').textContent = counts['Atrasadas'];

  cols.forEach(c => {
    const badge = document.getElementById(`badge-${c}`);
    if (badge) badge.textContent = counts[c] || 0;
  });

  const pct = (n) => total > 0 ? Math.round((n / total) * 100) + '%' : '0%';
  document.getElementById('barPendente').style.width = pct(counts['Pendentes']);
  document.getElementById('barAndamento').style.width = pct(counts['Em Andamento']);
  document.getElementById('barConcluida').style.width = pct(counts['Concluídas']);
  document.getElementById('barAtrasada').style.width = pct(counts['Atrasadas']);
}

function setDate() {
  const hoje = new Date();
  const opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  document.getElementById('dataHoje').textContent = hoje.toLocaleDateString('pt-BR', opts);
}

setDate();
render();
