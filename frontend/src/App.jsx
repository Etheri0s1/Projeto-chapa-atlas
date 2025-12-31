import React, { useState, useEffect } from 'react';
import './calendario-evento.css';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mostraLinks, setMostraLinks] = useState(false);

  useEffect(() => {
    setCarregando(true);
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
    });
  }, []);

  // Função para rolar a seção de contato
  const irParaContato = (e) => {
    e.preventDefault();
    setMostraLinks(true); 
    setTimeout(() => {
        const section = document.getElementById('contato');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

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
            <li><a href="#contato" onClick={irParaContato}>CONTATO</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-image">
          <img 
            src="/imagens/teste.png" 
            alt="Foto do Instituto ou Banner Principal" 
          />
        </div>
        <h1>CONECTANDO IDEIAS,<br/>CULTIVANDO O FUTURO</h1>
      </section>

      <section className="eventos-section" id="eventos">
        <h2 className="section-title">PRÓXIMOS EVENTOS</h2>
        
        {carregando ? (
          /* ANIMAÇÃO DE ESPERA */
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
          /* GRID DE EVENTOS  */
          <div className="eventos-grid">
            {eventos.map(evento => (
              <div key={evento.id} className="evento-card">
                <img src={evento.imagem} alt={evento.titulo} className="event-image" />       
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

      <section id="contato" className="contato-section">
        <h2 className="section-title">FALE CONOSCO</h2>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Entre em contato para dúvidas</p>
            
            {mostraLinks ? (
                <div className="links-contato" style={{ marginTop: '20px' }}>
                    <p>
                      📧 <strong>Whatsapp: </strong> 
                      <a href="https://chat.whatsapp.com/C4ImgaXWzcf5FfU32zc48U" target="_blank" rel="noopener noreferrer">
                        Entrar no Grupo
                      </a>
                    </p>
                    <p>
                      📸 <strong>Instagram: </strong> 
                      <a href="https://www.instagram.com/cageomiltonsantos" target="_blank" rel="noopener noreferrer">
                        @cageomiltonsantos
                      </a>
                    </p>
                </div>
            ) : null}
        </div>
      </section>
    </>
  );
}

export default App;