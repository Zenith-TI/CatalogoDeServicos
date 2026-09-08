/**
 * =========================================================
 * CARREGADOR DINÂMICO - ZNT Catálogo de Serviços
 * =========================================================
 * DESCRIÇÃO: Script que carrega textos e serviços de arquivos .txt
 * DATA: 08 de Setembro de 2026
 * VERSÃO: 1.0
 * =========================================================
 */

// ====== CONFIGURAÇÃO DE CARREGAMENTO ======
const CONFIG = {
  textosUrl: './textos-site.txt',
  servicosUrl: './servicos-site.txt',
  debug: true // Mude para false em produção
};

// ====== OBJETO GLOBAL DE CONTEÚDO ======
let CONTEUDO = {
  textos: {},
  servicos: []
};

/**
 * Função de Log Debugger
 */
function debug(titulo, dados) {
  if (CONFIG.debug) {
    console.log(`[ZNT DEBUG] ${titulo}:`, dados);
  }
}

/**
 * Carrega e parseia o arquivo de textos
 */
async function carregarTextos() {
  try {
    const response = await fetch(CONFIG.textosUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const texto = await response.text();
    const linhas = texto.split('\n');
    
    // Parser: busca por padrão CHAVE: VALOR
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

/**
 * Carrega e parseia o arquivo de serviços
 */
async function carregarServicos() {
  try {
    const response = await fetch(CONFIG.servicosUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const texto = await response.text();
    const blocos = texto.split('---').filter(b => b.trim());
    
    // Parser: cada bloco é um serviço
    blocos.forEach((bloco, index) => {
      const linhas = bloco.trim().split('\n');
      const servico = { id: index + 1 };
      
      linhas.forEach(linha => {
        const match = linha.match(/^([A-Z_]+):\s*(.+)$/);
        if (match) {
          const chave = match[1].toLowerCase();
          const valor = match[2].trim();
          
          // Converter listas em array
          if (chave.includes('lista') || chave.includes('requisitos') || chave.includes('etapas')) {
            servico[chave] = valor.split(';').map(item => item.trim()).filter(item => item);
          } else {
            servico[chave] = valor;
          }
        }
      });
      
      if (servico.titulo) {
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

/**
 * Renderiza os textos no HTML
 */
function renderizarTextos() {
  const t = CONTEUDO.textos;
  
  // Header
  const headerTitle = document.querySelector('header .logo-titulo');
  if (headerTitle && t.header_titulo) {
    headerTitle.textContent = t.header_titulo;
  }
  
  // Hero Section
  const heroTitle = document.querySelector('.hero-content h1');
  if (heroTitle && t.hero_titulo) heroTitle.textContent = t.hero_titulo;
  
  const heroSubtitle = document.querySelector('.hero-content p');
  if (heroSubtitle && t.hero_subtitulo) heroSubtitle.textContent = t.hero_subtitulo;
  
  const searchPlaceholder = document.querySelector('.search-bar input');
  if (searchPlaceholder && t.filtro_placeholder) {
    searchPlaceholder.placeholder = t.filtro_placeholder;
  }
  
  // Botões de Filtro
  const btnTodos = document.querySelector('.botoes-filtro .btn:nth-child(1)');
  if (btnTodos && t.filtro_todos) btnTodos.textContent = t.filtro_todos;
  
  // Rodapé
  const footerTexto = document.querySelector('footer p');
  if (footerTexto && t.rodape_texto) footerTexto.textContent = t.rodape_texto;
  
  debug('Textos Renderizados', 'HTML atualizado com sucesso');
}

/**
 * Renderiza os serviços no catálogo
 */
function renderizarServicos() {
  const container = document.querySelector('.servicos-grid') || document.querySelector('.grid-catalogo');
  
  if (!container) {
    console.error('[ZNT ERRO] Container de serviços não encontrado');
    return;
  }
  
  container.innerHTML = ''; // Limpa conteúdo anterior
  
  CONTEUDO.servicos.forEach(servico => {
    const card = document.createElement('div');
    card.className = 'servico-card';
    card.setAttribute('data-categoria', servico.categoria || 'geral');
    card.setAttribute('data-id', servico.id);
    
    card.innerHTML = `
      <div class="card-header">
        <h3>${servico.titulo || 'Serviço'}</h3>
        <span class="categoria-badge">${servico.categoria || 'N/A'}</span>
      </div>
      <div class="card-body">
        <p class="descricao">${servico.descricao || ''}</p>
        <div class="card-meta">
          <span class="tempo">⏱️ ${servico.tempo_medio || 'Sob demanda'}</span>
          <span class="valor">💰 ${servico.valor || 'Consultar'}</span>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn-detalhes" onclick="abrirDetalhesServico(${servico.id})">
          Ver Detalhes →
        </button>
      </div>
    `;
    
    container.appendChild(card);
  });
  
  debug(`Serviços Renderizados (Total: ${CONTEUDO.servicos.length})`, 'Cards criados no HTML');
}

/**
 * Abre modal com detalhes do serviço
 */
function abrirDetalhesServico(id) {
  const servico = CONTEUDO.servicos.find(s => s.id === id);
  
  if (!servico) {
    console.error(`[ZNT ERRO] Serviço ${id} não encontrado`);
    return;
  }
  
  const modal = document.querySelector('.modal-detalhes') || criarModal();
  const conteudo = modal.querySelector('.modal-content');
  
  conteudo.innerHTML = `
    <div class="modal-header">
      <h2>${servico.titulo}</h2>
      <button class="btn-fechar" onclick="fecharModal()">✕</button>
    </div>
    <div class="modal-body">
      <p class="descricao">${servico.descricao}</p>
      
      ${servico.requisitos ? `
        <div class="secao">
          <h4>📋 Requisitos:</h4>
          <ul>
            ${servico.requisitos.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      ${servico.etapas ? `
        <div class="secao">
          <h4>🔄 Etapas do Processo:</h4>
          <ol>
            ${servico.etapas.map(e => `<li>${e}</li>`).join('')}
          </ol>
        </div>
      ` : ''}
      
      ${servico.tecnologias ? `
        <div class="secao">
          <h4>💻 Tecnologias:</h4>
          <div class="tags">
            ${servico.tecnologias.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      
      <div class="secao-meta">
        <p><strong>Tempo Médio:</strong> ${servico.tempo_medio}</p>
        <p><strong>Valor:</strong> ${servico.valor}</p>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-primario" onclick="solicitarServico(${servico.id})">Solicitar Serviço</button>
      <button class="btn-secundario" onclick="fecharModal()">Fechar</button>
    </div>
  `;
  
  modal.style.display = 'flex';
  debug('Modal Aberto', servico.titulo);
}

/**
 * Cria modal se não existir
 */
function criarModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-detalhes';
  modal.innerHTML = `
    <div class="modal-content"></div>
  `;
  document.body.appendChild(modal);
  return modal;
}

/**
 * Fecha modal
 */
function fecharModal() {
  const modal = document.querySelector('.modal-detalhes');
  if (modal) modal.style.display = 'none';
}

/**
 * Solicita um serviço (placeholder para integração futura)
 */
function solicitarServico(id) {
  const servico = CONTEUDO.servicos.find(s => s.id === id);
  alert(`✅ Solicitação de "${servico.titulo}" será processada.\nEm breve você receberá um contato!`);
  fecharModal();
}

/**
 * Filtra serviços por categoria
 */
function filtrarServicos(categoria) {
  const cards = document.querySelectorAll('.servico-card');
  
  cards.forEach(card => {
    if (categoria === 'todos' || card.getAttribute('data-categoria') === categoria) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  
  debug('Filtro Aplicado', categoria);
}

/**
 * Busca serviços por palavra-chave
 */
function buscarServicos(palavra) {
  const cards = document.querySelectorAll('.servico-card');
  const termo = palavra.toLowerCase();
  
  cards.forEach(card => {
    const titulo = card.querySelector('h3').textContent.toLowerCase();
    const descricao = card.querySelector('.descricao').textContent.toLowerCase();
    
    if (titulo.includes(termo) || descricao.includes(termo)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  
  debug('Busca Realizada', termo);
}

/**
 * Inicializa tudo ao carregar a página
 */
async function inicializar() {
  console.log('[ZNT] Iniciando carregador dinâmico...');
  
  // Carrega os arquivos
  const textosOk = await carregarTextos();
  const servicosOk = await carregarServicos();
  
  if (textosOk && servicosOk) {
    // Renderiza no HTML
    renderizarTextos();
    renderizarServicos();
    console.log('[ZNT] ✅ Carregamento completo!');
  } else {
    console.error('[ZNT] ❌ Falha no carregamento de dados');
  }
}

// Executa ao carregar o DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializar);
} else {
  inicializar();
}

// Event Listeners para barra de busca
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      buscarServicos(e.target.value);
    });
  }
});
