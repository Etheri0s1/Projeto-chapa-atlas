import React, { useState, useEffect } from 'react';
import './calendario-evento.css';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true); // Estado para a animação

  useEffect(() => {
  setCarregando(true);
  // Usamos a variável API_URL aqui
  fetch(`${API_URL}/api/events`, {
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  })
  .then(res => res.json())
    .then(data => {
      // Adiciona um atraso artificial de 3 segundos para testar o visual
      setTimeout(() => {
        setEventos(data);
        setCarregando(false);
      }, 3000); 
    })
    .catch(err => {
      console.log("Erro:", err);
      // Se der erro, você pode escolher deixar o Atlas lá ou mostrar um erro
    });
}, []);

  return (
    <>
      <header>
        <div className="logo">
          <div className="logo-icon">🌱</div>
        </div>
        <nav>
          <ul>
            <li><a href="#home">HOME</a></li>
            <li><a href="#eventos">EVENTOS</a></li>
            <li><a href="#contato">CONTATO</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-image">
            [imagem do instituto]
        </div>
        <h1>CONECTANDO IDEIAS,<br/>CULTIVANDO O FUTURO</h1>
      </section>

      <section className="eventos-section" id="eventos">
        <h2 className="section-title">PRÓXIMOS EVENTOS</h2>
        
        {carregando ? (
          /* IDEIA 1: ANIMAÇÃO DO ATLAS */
          <div className="atlas-loading-screen">
            <div className="atlas-world-container">
              <div className="atlas-globe"></div>
              <div className="atlas-shadow"></div>
            </div>
            <div className="atlas-text">
              <h2>Conectando Ideias</h2>
              <p>A Atlas está preparando o seu mapa...</p>
            </div>
          </div>
        ) : (
          /* GRID DE EVENTOS REAIS */
          <div className="eventos-grid">
            {eventos.map(evento => (
              <div key={evento.id} className="evento-card">
                <div className="card-image">[local ou banner do evento]</div>
                <h3>{evento.titulo}</h3>
                <p className="evento-info">{evento.data_inicio} • {evento.local}</p>
                <p className="evento-description">{evento.descricao}</p>
                <a 
                  href={`${API_URL}/api/events/ics/${evento.id}`} 
                  className="btn-saiba-mais"
                  >
                  SALVAR NO CALENDÁRIO
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default App;