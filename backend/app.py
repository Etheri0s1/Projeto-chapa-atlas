from flask import Flask, jsonify, send_file
from flask_cors import CORS
from icalendar import Calendar, Event
from datetime import datetime
import json
import io
import os

app = Flask(__name__)
# Configuração para permitir que o Netlify acesse o Render
CORS(app, resources={r"/api/*": {"origins": "*", "allow_headers": ["ngrok-skip-browser-warning"]}})

# Função melhorada para carregar os eventos sem dar erro 500
def carregar_eventos():
    try:
        with open('events.json', 'r', encoding='utf-8') as f:
            conteudo = f.read().strip()
            if not conteudo:
                return []
            return json.loads(conteudo)
    except Exception as e:
        print(f"Erro ao ler JSON: {e}")
        return []

@app.route('/api/events', methods=['GET'])
def get_events():
    return jsonify(carregar_eventos())

@app.route('/api/events/ics/<id>')
def download_ics(id):
    eventos = carregar_eventos()
    ev_data = next((e for e in eventos if e['id'] == id), None)
    
    if not ev_data:
        return "Evento não encontrado", 404

    cal = Calendar()
    cal.add('prodid', '-//Chapa Atlas//Calendario//PT')
    cal.add('version', '2.0')

    event = Event()
    event.add('summary', ev_data['titulo'])
    event.add('description', ev_data['descricao'])
    event.add('location', ev_data['local'])
    
    inicio_str = f"{ev_data['data_inicio']} {ev_data['hora_inicio']}"
    dt_inicio = datetime.strptime(inicio_str, '%Y-%m-%d %H:%M:%S')
    fim_str = f"{ev_data['data_fim']} {ev_data['hora_fim']}"
    dt_fim = datetime.strptime(fim_str, '%Y-%m-%d %H:%M:%S')
    event.add('dtstart', dt_inicio)
    event.add('dtend', dt_fim) 
    cal.add_component(event)
    output = io.BytesIO()
    output.write(cal.to_ical())
    output.seek(0)

    return send_file(
        output,
        mimetype='text/calendar',
        as_attachment=True,
        download_name=f"{ev_data['titulo']}.ics"
    )