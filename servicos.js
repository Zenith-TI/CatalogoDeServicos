/*
=========================================================
TÍTULO: ZNT - Configuração de Serviços
ÚLTIMA MUDANÇA: Inclusão do parâmetro "exige_dispositivo" para cada serviço, permitindo que o formulário oculte ou mostre a seleção de Desktop/Notebook de forma inteligente dependendo do que o cliente está cotando.
DATA E HORA: 08 de Setembro de 2026, 23:55
VERSÃO: 12.1
=========================================================
*/

const SERVICOS = [
    {
        categoria: "software",
        tags: ["Software"],
        titulo: "Acesso Remoto (Suporte Técnico)",
        desc_curta: "Atendimento ágil e seguro à distância para solucionar problemas de configuração e falhas de software.",
        exige_dispositivo: true,
        detalhes: [
            "Conexão segura via AnyDesk ou TeamViewer",
            "Resolução de erros e bugs em tempo real",
            "Instalação e configuração de aplicativos básicos"
        ]
    },
    {
        categoria: "dados",
        tags: ["Rede & Dados"],
        titulo: "Configuração de Roteador / Repetidor Wi-Fi",
        desc_curta: "Ampliação da cobertura de sinal e configuração de segurança para redes sem fio residenciais ou empresariais.",
        exige_dispositivo: false,
        detalhes: [
            "Configuração de nome (SSID) e senha segura",
            "Otimização de canais para reduzir interferências",
            "Posicionamento estratégico de repetidores"
        ]
    },
    {
        categoria: "dados",
        tags: ["Rede & Dados"],
        titulo: "Crimpagem de Cabo UTP - M.O",
        desc_curta: "Montagem técnica de conectores RJ45 em cabos de rede para garantir máxima velocidade e estabilidade.",
        exige_dispositivo: false,
        detalhes: [
            "Crimpagem no padrão T568A ou T568B",
            "Utilização de conectores de alta durabilidade",
            "Teste profissional de continuidade e velocidade"
        ]
    },
    {
        categoria: "dados",
        tags: ["Rede & Dados"],
        titulo: "Lançamento de Cabo UTP - (metros)",
        desc_curta: "Passagem estruturada de cabeamento de rede por conduítes, forros ou canaletas (serviço cobrado por metro).",
        exige_dispositivo: false,
        detalhes: [
            "Dimensionamento estratégico da rota do cabo",
            "Passagem segura sem torções no filamento",
            "Organização com abraçadeiras e fixadores"
        ]
    },
    {
        categoria: "software",
        tags: ["Atendimento"],
        titulo: "Deslocamento",
        desc_curta: "Taxa referente ao custo logístico para atendimento presencial fora do raio padrão de operação da empresa.",
        exige_dispositivo: false,
        detalhes: [
            "Agendamento com horário marcado",
            "Cobertura técnica em áreas estendidas",
            "Deslocamento calculado com base na rota"
        ]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Diagnóstico de Hardware",
        desc_curta: "Avaliação minuciosa dos componentes físicos do computador para identificar peças defeituosas ou gargalos.",
        exige_dispositivo: true,
        detalhes: [
            "Teste de estresse em Processador e Memória",
            "Verificação de saúde do HD/SSD (Sistema SMART)",
            "Relatório técnico com recomendações de reparo"
        ]
    },
    {
        categoria: "software",
        tags: ["Software"],
        titulo: "Formatação com Backup e Instalação de SO",
        desc_curta: "Instalação limpa do Windows garantindo o salvamento prévio de todos os seus arquivos importantes.",
        exige_dispositivo: true,
        detalhes: [
            "Backup seguro de dados e documentos",
            "Instalação do Windows otimizado e atualizado",
            "Instalação completa de drivers (vídeo, rede, etc.)"
        ]
    },
    {
        categoria: "software",
        tags: ["Software"],
        titulo: "Formatação sem Backup (Apenas SO e Drivers)",
        desc_curta: "Formatação rápida e direta, ideal para computadores recém montados ou que não possuam arquivos para salvar.",
        exige_dispositivo: true,
        detalhes: [
            "Apagamento completo e limpeza de partições",
            "Instalação do Windows em configuração limpa",
            "Configuração inicial de drivers de hardware"
        ]
    },
    {
        categoria: "software",
        tags: ["Software"],
        titulo: "Instalação de Softwares",
        desc_curta: "Instalação e ativação de programas essenciais para o uso diário, estudos, design ou rotinas de escritório.",
        exige_dispositivo: true,
        detalhes: [
            "Softwares de produtividade e leitura (PDFs)",
            "Instalação de navegadores e utilitários",
            "Configuração de atalhos e preferências de usuário"
        ]
    },
    {
        categoria: "software",
        tags: ["Software"],
        titulo: "Instalação do Pacote Office",
        desc_curta: "Implementação da suíte completa de aplicativos da Microsoft (Word, Excel, PowerPoint) no seu computador.",
        exige_dispositivo: true,
        detalhes: [
            "Instalação e download do pacote original",
            "Verificação de licenciamento e ativação segura",
            "Teste de abertura de todos os aplicativos"
        ]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Manutenção Preventiva",
        desc_curta: "Limpeza profunda dos componentes internos e troca da interface térmica para evitar travamentos por superaquecimento.",
        exige_dispositivo: true,
        detalhes: [
            "Remoção de poeira e obstruções nos coolers",
            "Limpeza técnica dos contatos de memória RAM",
            "Aplicação de nova pasta térmica de alto rendimento"
        ]
    },
    {
        categoria: "dados",
        tags: ["Rede & Dados"],
        titulo: "Mapeamento de Impressora em Rede",
        desc_curta: "Configuração para que vários computadores no mesmo local consigam utilizar uma única impressora compartilhada.",
        exige_dispositivo: true,
        detalhes: [
            "Instalação de drivers oficiais nos equipamentos",
            "Fixação de IP na rede local para evitar quedas",
            "Teste de comunicação e impressão a partir dos PCs"
        ]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Montagem de Computador Completa",
        desc_curta: "Montagem profissional do seu setup peça por peça, com foco no fluxo de ar e estética (cable management).",
        exige_dispositivo: true,
        detalhes: [
            "Encaixe seguro de processador, coolers e placa-mãe",
            "Organização de cabos (Cable Management)",
            "Teste rigoroso de inicialização e temperatura (POST)"
        ]
    },
    {
        categoria: "software",
        tags: ["Software"],
        titulo: "Otimização de Sistema",
        desc_curta: "Ajustes avançados no Windows para acelerar a inicialização e o funcionamento geral da máquina, sem precisar formatar.",
        exige_dispositivo: true,
        detalhes: [
            "Desativação de programas ocultos na inicialização",
            "Limpeza de arquivos temporários e de registro",
            "Ajuste fino de efeitos visuais para liberar processamento"
        ]
    },
    {
        categoria: "dados",
        tags: ["Rede & Dados"],
        titulo: "Recuperação de Dados (HD/SSD/Pendrive)",
        desc_curta: "Serviço especializado para resgatar fotos e documentos de unidades formatadas acidentalmente ou corrompidas.",
        exige_dispositivo: true,
        detalhes: [
            "Varredura profunda com ferramentas de data-recovery",
            "Restauração de partições perdidas",
            "Transferência segura dos arquivos para nova unidade"
        ]
    },
    {
        categoria: "software",
        tags: ["Software"],
        titulo: "Remoção de Vírus e Malwares",
        desc_curta: "Limpeza rigorosa do sistema para neutralizar e apagar spywares, adwares, trojans e ameaças persistentes.",
        exige_dispositivo: true,
        detalhes: [
            "Escaneamento profundo de todo o armazenamento",
            "Eliminação de extensões maliciosas no navegador",
            "Otimização e configuração de segurança base do Windows"
        ]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Troca de Bateria da BIOS",
        desc_curta: "Substituição da bateria da placa-mãe, solucionando o problema do computador perdendo a hora ou configurações de boot.",
        exige_dispositivo: true,
        detalhes: [
            "Abertura técnica do gabinete / notebook",
            "Troca pela bateria 3V (CR2032) original",
            "Reconfiguração da BIOS com data, hora e disco correto"
        ]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Troca de Bateria de Notebook",
        desc_curta: "Substituição de baterias viciadas ou estufadas para recuperar a autonomia e mobilidade do seu aparelho.",
        exige_dispositivo: true,
        detalhes: [
            "Desmontagem da carcaça de acordo com o modelo",
            "Remoção segura e descarte ecológico da bateria antiga",
            "Instalação e validação do ciclo de carga da nova peça"
        ]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Troca de Fonte de Alimentação",
        desc_curta: "Substituição da fonte de energia em computadores de mesa (desktop) que pararam de ligar ou estão desligando sozinhos.",
        exige_dispositivo: true,
        detalhes: [
            "Desconexão de todo o cabeamento de energia interno",
            "Remoção da unidade danificada",
            "Instalação da nova fonte com organização dos cabos"
        ]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Upgrade de Componentes - HD",
        desc_curta: "Instalação de um novo disco rígido para aumentar a sua capacidade de armazenar fotos, vídeos e jogos pesados.",
        exige_dispositivo: true,
        detalhes: [
            "Fixação mecânica do HD na baia do gabinete",
            "Conexão e roteamento dos cabos SATA e energia",
            "Alocação e formatação da partição no Windows"
        ]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Upgrade de Componentes - Memória RAM",
        desc_curta: "Adição de pentes de memória para permitir que o computador execute múltiplos programas ao mesmo tempo sem travar.",
        exige_dispositivo: true,
        detalhes: [
            "Verificação técnica de compatibilidade (DDR3/DDR4/DDR5)",
            "Limpeza dos slots com limpa-contato",
            "Instalação em Dual Channel (quando aplicável)"
        ]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Upgrade de Componentes - Placa de Vídeo",
        desc_curta: "Instalação e configuração de placa de vídeo dedicada para rodar jogos e softwares 3D ou de edição com fluidez.",
        exige_dispositivo: true,
        detalhes: [
            "Encaixe seguro no barramento PCI-Express",
            "Instalação dos cabos de alimentação auxiliares",
            "Download e atualização dos drivers oficiais de vídeo"
        ]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Upgrade de Componentes - SSD",
        desc_curta: "Adição de armazenamento sólido (SSD) para reduzir drasticamente o tempo de inicialização de programas e do Windows.",
        exige_dispositivo: true,
        detalhes: [
            "Instalação e fixação correta na porta SATA ou M.2",
            "Configuração de prioridade de reconhecimento na BIOS",
            "Testes de taxa de leitura e gravação da peça"
        ]
    },
    {
        categoria: "software",
        tags: ["Atendimento"],
        titulo: "Visita Técnica",
        desc_curta: "Atendimento presencial do técnico diretamente na sua residência ou empresa para diagnosticar ou reparar falhas locais.",
        exige_dispositivo: false,
        detalhes: [
            "Diagnóstico inicial no ambiente do problema",
            "Resolução de falhas rápidas de rede e configurações",
            "Avaliação e elaboração de orçamento para reparos maiores"
        ]
    }
];
