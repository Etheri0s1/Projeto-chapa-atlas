from flask import Flask, jsonify, send_file
from flask_cors import CORS
from icalendar import Calendar, Event
from datetime import datetime
import json
import io
import os

app = Flask(__name__)
# Configuração de CORS para permitir que o Netlify acesse o Render
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

@app.route('/api/event/ics/<id>')
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
    
    data_evento = datetime.strptime(ev_data['data_inicio'], '%Y-%m-%d')
    event.add('dtstart', data_evento)
    event.add('dtend', data_evento) 
    
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

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)