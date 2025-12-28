from flask import Flask, jsonify, send_file
from flask_cors import CORS
from icalendar import Calendar, Event
from datetime import datetime
import json
import io

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*", "allow_headers": ["ngrok-skip-browser-warning"]}})
# Carrega os eventos do arquivo JSON
def carregar_eventos():
    with open('events.json', 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/api/events', methods=['GET'])
def get_events():
    return jsonify(carregar_eventos())

@app.route('/api/event/ics/<id>')
def download_ics(id):
    eventos = carregar_eventos()
    # Busca o evento pelo ID
    ev_data = next((e for e in eventos if e['id'] == id), None)
    
    if not ev_data:
        return "Evento não encontrado", 404

    # Cria o objeto do Calendário
    cal = Calendar()
    cal.add('prodid', '-//Chapa Atlas//Calendario//PT')
    cal.add('version', '2.0')

    # Cria o Evento
    event = Event()
    event.add('summary', ev_data['titulo'])
    event.add('description', ev_data['descricao'])
    event.add('location', ev_data['local'])
    
    # Converte a data do JSON para o formato do calendário
    data_evento = datetime.strptime(ev_data['data_inicio'], '%Y-%m-%d')
    event.add('dtstart', data_evento)
    event.add('dtend', data_evento) 
    
    cal.add_component(event)

    # Prepara o arquivo para download
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
    app.run(port=5000, debug=True)