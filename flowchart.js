// Dados do Fluxograma
const flowchartData = {
    nodes: [
        {
            id: "start",
            label: "Desafios Ambientais",
            description: "Mudanças climáticas, perda de biodiversidade, poluição, esgotamento de recursos",
            color: "#ff6b6b"
        },
        {
            id: "ai_applications",
            label: "Aplicações de IA",
            description: "Machine learning, deep learning, modelagem preditiva, visão computacional",
            color: "#4ecdc4"
        },
        {
            id: "monitoring",
            label: "Monitoramento Climático e Ambiental",
            description: "Análise de imagens de satélite, previsão do tempo, rastreamento da qualidade do ar e água",
            color: "#45b7d1"
        },
        {
            id: "conservation",
            label: "Conservação da Vida Selvagem",
            description: "Rastreamento animal, prevenção de caça furtiva, mapeamento de habitat, identificação de espécies",
            color: "#96ceb4"
        },
        {
            id: "agriculture",
            label: "Agricultura Inteligente",
            description: "Otimização de culturas, detecção de pragas, eficiência de recursos, previsão de rendimento",
            color: "#ffeaa7"
        },
        {
            id: "energy",
            label: "Otimização de Energia Renovável",
            description: "Previsão solar/eólica, gerenciamento de rede, eficiência energética",
            color: "#dfe6e9"
        },
        {
            id: "pollution",
            label: "Controle de Poluição",
            description: "Monitoramento de emissões, gerenciamento de resíduos, otimização do tratamento de água",
            color: "#a29bfe"
        },
        {
            id: "forest",
            label: "Gestão Florestal",
            description: "Detecção de desmatamento, previsão de incêndios, planejamento de reflorestamento",
            color: "#55efc4"
        },
        {
            id: "ocean",
            label: "Saúde Oceânica",
            description: "Monitoramento de recifes de coral, rastreamento de poluição plástica, previsão de estoque de peixes",
            color: "#74b9ff"
        },
        {
            id: "outcomes",
            label: "Resultados Ambientais Positivos",
            description: "Emissões reduzidas, ecossistemas protegidos, uso sustentável de recursos",
            color: "#00b894"
        },
        {
            id: "benefits",
            label: "Benefícios para a Humanidade",
            description: "Ar e água limpos, segurança alimentar, estabilidade climática, crescimento econômico sustentável",
            color: "#fdcb6e"
        }
    ],
    edges: [
        { source: "start", target: "ai_applications" },
        { source: "ai_applications", target: "monitoring" },
        { source: "ai_applications", target: "conservation" },
        { source: "ai_applications", target: "agriculture" },
        { source: "ai_applications", target: "energy" },
        { source: "ai_applications", target: "pollution" },
        { source: "ai_applications", target: "forest" },
        { source: "ai_applications", target: "ocean" },
        { source: "monitoring", target: "outcomes" },
        { source: "conservation", target: "outcomes" },
        { source: "agriculture", target: "outcomes" },
        { source: "energy", target: "outcomes" },
        { source: "pollution", target: "outcomes" },
        { source: "forest", target: "outcomes" },
        { source: "ocean", target: "outcomes" },
        { source: "outcomes", target: "benefits" }
    ]
};

// Elementos do DOM
const flowchartContainer = document.getElementById('flowchart');
const nodeDetailsDiv = document.getElementById('node-details');

// Criar nós do fluxograma
function createFlowchart() {
    flowchartContainer.innerHTML = '';
    
    flowchartData.nodes.forEach(node => {
        const nodeElement = document.createElement('div');
        nodeElement.className = 'node';
        nodeElement.style.borderColor = node.color;
        nodeElement.style.backgroundColor = node.color + '15'; // Cor com transparência
        nodeElement.innerHTML = `
            <div class="node-label">${node.label}</div>
            <div class="node-description">${node.description}</div>
        `;
        
        nodeElement.addEventListener('click', () => {
            selectNode(node, nodeElement);
        });
        
        nodeElement.addEventListener('mouseenter', () => {
            nodeElement.style.backgroundColor = node.color + '30';
        });
        
        nodeElement.addEventListener('mouseleave', () => {
            if (!nodeElement.classList.contains('active')) {
                nodeElement.style.backgroundColor = node.color + '15';
            }
        });
        
        flowchartContainer.appendChild(nodeElement);
    });
}

// Selecionar um nó e exibir detalhes
function selectNode(node, element) {
    // Remover seleção anterior
    document.querySelectorAll('.node.active').forEach(n => {
        n.classList.remove('active');
    });
    
    // Adicionar seleção ao nó clicado
    element.classList.add('active');
    element.style.backgroundColor = node.color;
    
    // Atualizar detalhes
    const relatedNodes = getRelatedNodes(node.id);
    nodeDetailsDiv.innerHTML = `
        <h3>${node.label}</h3>
        <p><strong>Descrição:</strong> ${node.description}</p>
        <p><strong>Aplicações Relacionadas:</strong></p>
        <ul>
            ${relatedNodes.map(n => `<li>${n}</li>`).join('')}
        </ul>
    `;
    
    // Scroll para a seção de detalhes
    document.querySelector('.info-section').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Encontrar nós relacionados
function getRelatedNodes(nodeId) {
    const related = new Set();
    
    flowchartData.edges.forEach(edge => {
        if (edge.source === nodeId) {
            const targetNode = flowchartData.nodes.find(n => n.id === edge.target);
            if (targetNode) related.add(targetNode.label);
        }
        if (edge.target === nodeId) {
            const sourceNode = flowchartData.nodes.find(n => n.id === edge.source);
            if (sourceNode) related.add(sourceNode.label);
        }
    });
    
    return Array.from(related).length > 0 ? Array.from(related) : ['Este é um nó fundamental no fluxograma'];
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    createFlowchart();
    
    // Selecionar o primeiro nó por padrão
    const firstNode = document.querySelector('.node');
    if (firstNode) {
        firstNode.click();
    }
});