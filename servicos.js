const SERVICOS = [
    {
        categoria: "software",
        tags: ["Software"],
        titulo: "Acesso Remoto (Suporte Técnico)",
        desc_curta: "Atendimento ágil e seguro à distância para solucionar problemas de configuração e falhas de software ou rede.",
        exige_dispositivo: true,
        detalhes: ["Conexão segura via AnyDesk ou TeamViewer.", "Resolução de erros e bugs em tempo real.", "Instalação e configuração de sistemas."]
    },
    {
        categoria: "dados",
        tags: ["Rede & Dados"],
        titulo: "Configuração de Roteador / Repetidor Wi-Fi",
        desc_curta: "Configuração de segurança para redes sem fio e ampliação da cobertura de sinal.",
        exige_dispositivo: false,
        detalhes: ["Configuração da rede conforme necessidade do usuário.", "Otimização de canais para reduzir interferências.", "Posicionamento estratégico de repetidores."]
    },
    {
        categoria: "dados",
        tags: ["Rede & Dados"],
        titulo: "Crimpagem de Cabo UTP/Ethernet",
        desc_curta: "Montagem técnica de conectores RJ45 em cabos de rede para garantir máxima velocidade e estabilidade.",
        exige_dispositivo: false,
        detalhes: ["Crimpagem no padrão T568A ou T568B.", "Utilização de conectores de alta durabilidade.", "Teste profissional de continuidade e velocidade."]
    },
    {
        categoria: "dados",
        tags: ["Rede & Dados"],
        titulo: "Lançamento de Cabo UTP/Ethernet",
        desc_curta: "Passagem estruturada de cabeamento de rede.",
        exige_dispositivo: false,
        detalhes: ["Dimensionamento estratégico da rota do cabo.", "Passagem segura sem torções no filamento.", "Organização visando duralidade e qualidade."]
    },
    {
        categoria: "software",
        tags: ["Atendimento"],
        titulo: "Deslocamento",
        desc_curta: "Taxa referente ao custo logístico para atendimento presencial.",
        exige_dispositivo: false,
        detalhes: ["Agendamento com horário marcado.", "Cobertura técnica em áreas estendidas.", "Solução de problema sem abrir mão do seu conforto."]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Diagnóstico do Equipamento",
        desc_curta: "Avaliação minuciosa dos componentes físicos do computador para identificar peças defeituosas ou gargalos.",
        exige_dispositivo: true,
        detalhes: ["Teste dedicados e corretos para cada componente.", "Relatório técnico com recomendações de reparo."]
    },
    {
        categoria: "software",
        tags: ["Software"],
        titulo: "Formatação com Backup e Instalação de S.O",
        desc_curta: "Instalação limpa do Windows garantindo o salvamento prévio de todos os seus arquivos importantes.",
        exige_dispositivo: true,
        detalhes: ["Backup seguro de dados e documentos.", "Instalação do Windows otimizado e atualizado.", "Instalação completa de drivers para a aplicação do usuário."]
    },
    {
        categoria: "software",
        tags: ["Software"],
        titulo: "Formatação sem Backup (Apenas S.O e Drivers)",
        desc_curta: "Formatação rápida e direta, ideal para computadores recém montados ou que não possuam arquivos para salvar.",
        exige_dispositivo: true,
        detalhes: ["Formatação completa e limpeza de partições.", "Instalação do Windows em configuração limpa.", "Configuração inicial de drivers de hardware."]
    },
    {
        categoria: "software",
        tags: ["Software"],
        titulo: "Instalação de Softwares",
        desc_curta: "Instalação e ativação coreta de programas essenciais para uso do dia a dia ou para aplicações específicas.",
        exige_dispositivo: true,
        detalhes: []
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Manutenção Preventiva (Limpeza Física + Pasta Térmica)",
        desc_curta: "Limpeza completa dos componentes internos e troca da interface térmica.",
        exige_dispositivo: true,
        detalhes: ["Remoção de sujidades e obstruções nos componentes.", "Limpeza técnica visando o cuidado com o funcionamento de cada componente.", "Aplicação de condutor térmico de alta qualidade."]
    },
    {
        categoria: "dados",
        tags: ["Rede & Dados"],
        titulo: "Mapeamento de Impressora em Rede",
        desc_curta: "Configuração para que um ou mais computadores no mesmo local consigam utilizar uma única impressora compartilhada através da rede.",
        exige_dispositivo: true,
        detalhes: ["Instalação de drivers oficiais nos equipamentos.", "Configuração da rede segundo a necessidade do usuário.", "Teste de comunicação entre todos os dispositivos."]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Montagem de Computador Completa",
        desc_curta: "Montagem profissional do seu setup peça por peça, com foco na sua necessidade, organização e qualidade.",
        exige_dispositivo: true,
        detalhes: ["Dimensionamento correto do seu setup com base em detalhes técnicos.", "Construção focada em qualidade dos componentes e estética de organização.", "Teste rigoroso de inicialização do funcionamento do setup."]
    },
    {
        categoria: "software",
        tags: ["Software"],
        titulo: "Otimização de Sistema",
        desc_curta: "Ajustes avançados no Windows para acelerar a inicialização e o funcionamento geral da máquina, sem precisar formatar.",
        exige_dispositivo: true,
        detalhes: ["Desativação de sistemas ocultos na inicialização.", "Remoção de arquivos que geram queda no desempenho do equipamento.", "Ajuste fino de efeitos visuais com foco em fluidez."]
    },
    {
        categoria: "dados",
        tags: ["Rede & Dados"],
        titulo: "Recuperação de Dados (HD/SSD/Pendrive)",
        desc_curta: "Serviço especializado para resgatar fotos, vídeos e quaisquer outros documentos de unidades formatadas acidentalmente ou corrompidas.",
        exige_dispositivo: true,
        detalhes: ["Análise correto do dispositivo com ferramentas dedicadas.", "Restauração de diversos tipos de arquivos.", "Transferência segura dos arquivos para nova unidade."]
    },
    {
        categoria: "software",
        tags: ["Software"],
        titulo: "Remoção de Vírus e Malwares",
        desc_curta: "Limpeza rigorosa do sistema para neutralizar e apagar quaisquer ameaças persistentes.",
        exige_dispositivo: true,
        detalhes: ["Escaneamento profundo de todo o armazenamento.", "Eliminação de extensões maliciosas no dispositivo.", "Otimização e configuração de segurança base do Windows."]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Troca de Bateria da BIOS",
        desc_curta: "Substituição da bateria da placa-mãe, solucionando diversos problemas decorrentes.",
        exige_dispositivo: true,
        detalhes: ["Abertura técnica do dispositivo.", "Troca do componente por um de qualidade e com alta durabilidade.", "Reconfiguração da BIOS de forma correta."]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Troca de Bateria de Notebook",
        desc_curta: "Substituição de baterias viciadas ou estufadas para recuperar a autonomia e mobilidade do seu aparelho.",
        exige_dispositivo: true,
        detalhes: ["Desmontagem da carcaça de acordo com o modelo.", "Remoção segura e descarte ecológico da bateria antiga.", "Instalação e validação do ciclo de carga da nova peça."]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Troca de Fonte de Alimentação",
        desc_curta: "Substituição da fonte de energia em computadores de mesa (desktop) que pararam de ligar ou estão desligando sozinhos.",
        exige_dispositivo: true,
        detalhes: ["Desconexão segura de todos os componentes.", "Remoção da unidade danificada.", "Instalação da nova fonte com dimensionamento correto e organização dos cabos."]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Upgrade/Troca de HD",
        desc_curta: "Instalação de um novo disco rígido do tipo HD para aumentar a sua capacidade de armazenar fotos, vídeos e outros arquivos pesados.",
        exige_dispositivo: true,
        detalhes: ["Fixação mecânica do HD na baia do gabinete.", "Conexão e roteamento dos cabos SATA e energia.", "Alocação e formatação da partição no Windows."]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Upgrade/Troca de Memória RAM",
        desc_curta: "Adição ou troca de pentes de memória para permitir que o computador execute múltiplos tarefas ao mesmo tempo reduzindo o travamento ao longo do processo.",
        exige_dispositivo: true,
        detalhes: ["Verificação técnica de compatibilidade.", "Limpeza dos slots com o produto correto.", "Instalação física buscando o melhor funcionamento."]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Upgrade/Troca de Placa de Vídeo",
        desc_curta: "Instalação e configuração de placa de vídeo dedicada para rodar jogos e softwares 3D ou de edição com fluidez.",
        exige_dispositivo: true,
        detalhes: ["Encaixe seguro no barramento correto.", "Instalação dos cabos auxiliares.", "Download e atualização dos drivers oficiais do dispositivo."]
    },
    {
        categoria: "hardware",
        tags: ["Hardware"],
        titulo: "Upgrade/Troca de SSD",
        desc_curta: "Adição ou troca de SSD para reduzir drasticamente o tempo de inicialização de programas e do sistema operacional.",
        exige_dispositivo: true,
        detalhes: ["Instalação e fixação correta na porta SATA ou M.2", "Configuração de prioridade de reconhecimento na BIOS.", "Testes de taxa de leitura e gravação da peça."]
    },
    {
        categoria: "software",
        tags: ["Atendimento"],
        titulo: "Visita Técnica",
        desc_curta: "Atendimento presencial do técnico diretamente na sua residência ou empresa para diagnosticar ou reparar falhas locais.",
        exige_dispositivo: false,
        detalhes: ["Diagnóstico inicial no ambiente do problema.", "Resolução de falhas rápidas de rede e configurações.", "Avaliação e elaboração de orçamento para reparos maiores."]
    }
];
