from flask import Flask, render_template
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/flowchart')
def get_flowchart():
    flowchart_data = {
        "nodes": [
            {
                "id": 1,
                "label": "Inteligência Artificial",
                "description": "Tecnologias de IA e Machine Learning",
                "color": "#4CAF50"
            },
            {
                "id": 2,
                "label": "Monitoramento Ambiental",
                "description": "Satélites, sensores, análise de dados em tempo real",
                "color": "#2196F3"
            },
            {
                "id": 3,
                "label": "Detecção de Desmatamento",
                "description": "Identificar áreas de desflorestação automaticamente",
                "color": "#FF9800"
            },
            {
                "id": 4,
                "label": "Previsão de Mudanças Climáticas",
                "description": "Modelos preditivos de clima e padrões atmosféricos",
                "color": "#FF9800"
            },
            {
                "id": 5,
                "label": "Conservação de Biodiversidade",
                "description": "Rastreamento de espécies e habitats ameaçados",
                "color": "#FF9800"
            },
            {
                "id": 6,
                "label": "Otimização de Energia",
                "description": "Eficiência em painéis solares e redes elétricas inteligentes",
                "color": "#FFC107"
            },
            {
                "id": 7,
                "label": "Gestão de Recursos Hídricos",
                "description": "Detectar vazamentos e otimizar uso de água",
                "color": "#03A9F4"
            },
            {
                "id": 8,
                "label": "Agricultura Sustentável",
                "description": "Precisão agrícola com drones e sensores IoT",
                "color": "#8BC34A"
            },
            {
                "id": 9,
                "label": "Redução de Poluição",
                "description": "Monitorar qualidade do ar e água, controlar emissões",
                "color": "#F44336"
            },
            {
                "id": 10,
                "label": "Proteção do Meio Ambiente",
                "description": "Planeta mais sustentável e saudável para gerações futuras",
                "color": "#4CAF50"
            }
        ],
        "edges": [
            {"from": 1, "to": 2},
            {"from": 2, "to": 3},
            {"from": 2, "to": 4},
            {"from": 2, "to": 5},
            {"from": 1, "to": 6},
            {"from": 1, "to": 7},
            {"from": 1, "to": 8},
            {"from": 1, "to": 9},
            {"from": 3, "to": 10},
            {"from": 4, "to": 10},
            {"from": 5, "to": 10},
            {"from": 6, "to": 10},
            {"from": 7, "to": 10},
            {"from": 8, "to": 10},
            {"from": 9, "to": 10}
        ]
    }
    return json.dumps(flowchart_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)