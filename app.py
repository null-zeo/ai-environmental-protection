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
                "id": "start",
                "label": "Environmental Challenges",
                "description": "Climate change, biodiversity loss, pollution, resource depletion",
                "color": "#ff6b6b"
            },
            {
                "id": "ai_applications",
                "label": "AI Applications",
                "description": "Machine learning, deep learning, predictive modeling",
                "color": "#4ecdc4"
            },
            {
                "id": "monitoring",
                "label": "Climate & Environmental Monitoring",
                "description": "Satellite imagery analysis, weather prediction, air/water quality tracking",
                "color": "#45b7d1"
            },
            {
                "id": "conservation",
                "label": "Wildlife Conservation",
                "description": "Animal tracking, poaching prevention, habitat mapping, species identification",
                "color": "#96ceb4"
            },
            {
                "id": "agriculture",
                "label": "Smart Agriculture",
                "description": "Crop optimization, pest detection, resource efficiency, yield prediction",
                "color": "#ffeaa7"
            },
            {
                "id": "energy",
                "label": "Renewable Energy Optimization",
                "description": "Solar/wind forecasting, grid management, energy efficiency",
                "color": "#dfe6e9"
            },
            {
                "id": "pollution",
                "label": "Pollution Control",
                "description": "Emission monitoring, waste management, water treatment optimization",
                "color": "#a29bfe"
            },
            {
                "id": "forest",
                "label": "Forest Management",
                "description": "Deforestation detection, fire prediction, reforestation planning",
                "color": "#55efc4"
            },
            {
                "id": "ocean",
                "label": "Ocean Health",
                "description": "Coral reef monitoring, plastic pollution tracking, fish stock prediction",
                "color": "#74b9ff"
            },
            {
                "id": "outcomes",
                "label": "Positive Environmental Outcomes",
                "description": "Reduced emissions, protected ecosystems, sustainable resource use",
                "color": "#00b894"
            },
            {
                "id": "benefits",
                "label": "Human Benefits",
                "description": "Clean air/water, food security, climate stability, economic growth",
                "color": "#fdcb6e"
            }
        ],
        "edges": [
            {"source": "start", "target": "ai_applications"},
            {"source": "ai_applications", "target": "monitoring"},
            {"source": "ai_applications", "target": "conservation"},
            {"source": "ai_applications", "target": "agriculture"},
            {"source": "ai_applications", "target": "energy"},
            {"source": "ai_applications", "target": "pollution"},
            {"source": "ai_applications", "target": "forest"},
            {"source": "ai_applications", "target": "ocean"},
            {"source": "monitoring", "target": "outcomes"},
            {"source": "conservation", "target": "outcomes"},
            {"source": "agriculture", "target": "outcomes"},
            {"source": "energy", "target": "outcomes"},
            {"source": "pollution", "target": "outcomes"},
            {"source": "forest", "target": "outcomes"},
            {"source": "ocean", "target": "outcomes"},
            {"source": "outcomes", "target": "benefits"}
        ]
    }
    return json.dumps(flowchart_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
