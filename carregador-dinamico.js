const CONFIG = {
  textosUrl: './textos-site.txt',
  servicosUrl: './servicos-site.txt',
  debug: true 
};

let CONTEUDO = {
  textos: {},
  servicos: []
};

function debug(titulo, dados) {
  if (CONFIG.debug) {
    console.log(`[ZNT DEBUG] ${titulo}:`, dados);
  }
}

async function carregarTextos() {
  try {
    const response = await fetch(CONFIG.textosUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const texto = await response.text();
    const linhas = texto.split('\n');
    
    linhas.forEach(linha => {
      const match = linha.match(/^([A-Z_]+):\s*(.+)$/);
      if (match) {
        const chave = match[1].toLowerCase();
        const valor = match[2].trim();
        CONTEUDO.textos[chave] = valor;
      }
    });
    
    debug('Textos Carregados', CONTEUDO.textos);
    return true;
  } catch (erro) {
    console.error('[ZNT ERRO] Falha ao carregar textos:', erro);
    return false;
  }
}

async function carregarServicos() {
  try {
    const response = await fetch(CONFIG.servicosUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const texto = await response.text();
    // Separa os blocos usando [SERVIÇO] como delimitador, já que é assim no seu arquivo
    const blocos = texto.split('[SERVIÇO]').filter(b => b.trim());
    
    blocos.forEach((bloco) => {
      const linhas = bloco.trim().split('\n');
      const servico = {};
      
      linhas.forEach(linha => {
        const match = linha.match(/^([A-Z_]+):\s*(.+)$/);
        if (match) {
          const chave = match[1].toLowerCase();
          const valor = match[2].trim();
          servico[chave] = valor;
        }
      });
      
      if (servico.nome) {
        // Converte ID para número para garantir ordenação/busca correta
        if(servico.id) servico.id = parseInt(servico.id); 
        CONTEUDO.servicos.push(servico);
      }
    });
    
    debug(`Serviços Carregados (Total: ${CONTEUDO.servicos.length})`, CONTEUDO.servicos);
    return true;
  } catch (erro) {
    console.error('[ZNT ERRO] Falha ao carregar serviços:', erro);
    return false;
  }
}

function renderizarTextos() {
  const t = CONTEUDO.textos;
  
  // Header
  if (t.logo_alt) document.querySelector('.logo-titulo').textContent = t.logo_alt;
  if (t.nav_sobre) document.getElementById('nav-sobre').textContent = t.nav_sobre;
  if (t.nav_contato) document.getElementById('nav-contato').textContent = t.nav_contato;
  
  // Hero Section
  if (t.tag) document.getElementById('hero-tag').textContent = t.tag;
  if (t.titulo) document.getElementById('hero-titulo').textContent = t.titulo;
  if (t.titulo_destaque) document.getElementById('hero-titulo-destaque').textContent = t.titulo_destaque;
  if (t.descricao) document.getElementById('hero-descricao').textContent = t.descricao;
  
  // Rodapé
  if (t.texto_rodape) document.getElementById('footer-texto').textContent = t.texto_rodape;
}

function renderizarServicos() {
  const container = document.querySelector('.servicos-grid');
  
  if (!container) return;
  container.innerHTML = ''; 
  
  CONTEUDO.servicos.forEach(servico => {
    const card = document.createElement('div');
    card.className = 'servico-card';
    card.setAttribute('data-categoria', servico.categoria);
    
    card.innerHTML = `
      <div class="servico-icon">⚙️</div>
      <div class="servico-info">
        <h3>${servico.nome}</h3>
        <p>${servico.descricao}</p>
        <div class="preco">${servico.preco}</div>
        <button class="btn-detalhes" onclick="abrirDetalhesServico(${servico.id})">
          Ver Detalhes
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

window.abrirDetalhesServico = function(id) {
  const servico = CONTEUDO.servicos.find(s => s.id === id);
  if (!servico) return;
  
  const modal = document.querySelector('.modal-detalhes');
  const conteudo = modal.querySelector('.modal-content');
  const t = CONTEUDO.textos;
  
  conteudo.innerHTML = `
    <h2>${t.titulo || 'Detalhes do Serviço'}</h2>
    <p><strong>${t.subtitulo || 'Você selecionou o serviço de'}:</strong> ${servico.nome}</p>
    <p>${servico.descricao}</p>
    
    <div style="text-align: left; margin: 20px 0; padding: 15px; background: #f9f9f9; border-radius: 8px;">
        <h4 style="margin-bottom: 10px;">O que está incluso:</h4>
        <ul style="margin-left: 20px; line-height: 1.8;">
            ${servico.detalhe_1 ? `<li>${servico.detalhe_1}</li>` : ''}
            ${servico.detalhe_2 ? `<li>${servico.detalhe_2}</li>` : ''}
            ${servico.detalhe_3 ? `<li>${servico.detalhe_3}</li>` : ''}
        </ul>
    </div>
    
    <h3 style="color: #667eea; margin-bottom: 20px;">Valor: ${servico.preco}</h3>
    
    <p style="font-size: 14px;">${t.mensagem || ''}</p>
    
    <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 20px;">
        <button class="btn" style="background: #25D366; color: white; border-color: #25D366;">
            ${t.botao_avancar || 'WhatsApp'}
        </button>
        <button class="btn-fechar" onclick="fecharModal()">
            ${t.botao_cancelar || 'Voltar'}
        </button>
    </div>
  `;
  
  modal.style.display = 'flex';
}

window.fecharModal = function() {
  document.querySelector('.modal-detalhes').style.display = 'none';
}

window.filtrarServicos = function(categoria, btnElement) {
  // Atualiza classe ativa dos botões
  document.querySelectorAll('.botoes-filtro .btn').forEach(btn => btn.classList.remove('btn-ativo'));
  if(btnElement) btnElement.classList.add('btn-ativo');

  // Filtra cards
  const cards = document.querySelectorAll('.servico-card');
  cards.forEach(card => {
    if (categoria === 'todos' || card.getAttribute('data-categoria') === categoria) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function buscarServicos(palavra) {
  const cards = document.querySelectorAll('.servico-card');
  const termo = palavra.toLowerCase();
  
  cards.forEach(card => {
    const titulo = card.querySelector('h3').textContent.toLowerCase();
    const descricao = card.querySelector('p').textContent.toLowerCase();
    
    if (titulo.includes(termo) || descricao.includes(termo)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

async function inicializar() {
  const textosOk = await carregarTextos();
  const servicosOk = await carregarServicos();
  
  if (textosOk && servicosOk) {
    renderizarTextos();
    renderizarServicos();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  inicializar();
  
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      buscarServicos(e.target.value);
    });
  }
});
