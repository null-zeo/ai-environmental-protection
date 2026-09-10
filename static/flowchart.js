let networkData = null;
let network = null;
const nodesMap = {};

// Carregar dados do fluxograma
fetch('/api/flowchart')
    .then(response => response.json())
    .then(data => {
        networkData = data;
        
        // Criar mapa de nós para acesso rápido
        data.nodes.forEach(node => {
            nodesMap[node.id] = node;
        });
        
        initializeNetwork(data);
    })
    .catch(error => console.error('Erro ao carregar fluxograma:', error));

function initializeNetwork(data) {
    // Preparar dados para vis.js
    const nodes = new vis.DataSet(data.nodes.map(node => ({
        id: node.id,
        label: node.label,
        title: node.description,
        color: {
            background: node.color,
            border: '#333',
            highlight: {
                background: '#fff',
                border: node.color
            }
        },
        font: { color: '#fff', size: 14, bold: {mod: 'bold'} },
        shape: 'box',
        borderWidth: 2
    })));

    const edges = new vis.DataSet(data.edges.map(edge => ({
        from: edge.from,
        to: edge.to,
        arrows: 'to',
        smooth: { type: 'continuous' },
        color: { color: '#999', highlight: '#667eea' },
        width: 2
    })));

    const container = document.getElementById('network');
    const netData = { nodes: nodes, edges: edges };
    
    const options = {
        layout: {
            hierarchical: {
                enabled: true,
                levelSeparation: 150,
                nodeSpacing: 200,
                direction: 'UD'
            }
        },
        physics: {
            enabled: true,
            stabilization: {
                iterations: 200
            }
        },
        interaction: {
            hover: true,
            navigationButtons: true,
            keyboard: true
        }
    };

    network = new vis.Network(container, netData, options);

    // Evento de clique no nó
    network.on('click', function(params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const node = nodesMap[nodeId];
            
            if (node) {
                updateInfoPanel(node);
            }
        }
    });

    // Evento de hover
    network.on('hoverNode', function(params) {
        const nodeId = params.node;
        const node = nodesMap[nodeId];
        
        if (node) {
            document.body.style.cursor = 'pointer';
        }
    });

    network.on('blurNode', function(params) {
        document.body.style.cursor = 'default';
    });
}

function updateInfoPanel(node) {
    document.getElementById('info-title').textContent = node.label;
    document.getElementById('info-description').textContent = node.description;
}

// Função para resetar visualização
function resetView() {
    if (network) {
        network.fit();
    }
}

// Adicionar botão de reset quando o página carregar
window.addEventListener('load', function() {
    // Você pode adicionar um botão de reset aqui se desejar
    console.log('Fluxograma carregado e pronto para interação!');
});