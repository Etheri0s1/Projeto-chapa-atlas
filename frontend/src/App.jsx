import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram, FaChevronDown, FaChevronUp } from 'react-icons/fa'; 
import './calendario-evento.css';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    setCarregando(true);
    fetch(`${API_URL}/api/events`, { headers: { 'ngrok-skip-browser-warning': 'true' } })
    .then(res => res.json())
    .then(data => {
      setTimeout(() => { setEventos(data); setCarregando(false); }, 3000); 
    })
    .catch(err => console.log("Erro:", err));
  }, []);

  const toggleMenuContato = (e) => {
    e.preventDefault();
    setMenuAberto(!menuAberto);
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
            
            <li className="contato-container-nav">
              <a href="#contato" onClick={toggleMenuContato} className="btn-contato-nav">
                CONTATO {menuAberto ? <FaChevronUp size={12}/> : <FaChevronDown size={12}/>}
              </a>
              
              {menuAberto && (
                <div className="dropdown-menu">
                   <a 
                     href="https://chat.whatsapp.com/C4ImgaXWzcf5FfU32zc48U" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="dropdown-item"
                   >
                     <FaWhatsapp size={18} style={{ marginRight: '8px', color: '#25D366' }} /> 
                     WhatsApp
                   </a>
                   <a 
                     href="https://www.instagram.com/cageomiltonsantos" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="dropdown-item"
                   >
                     <FaInstagram size={18} style={{ marginRight: '8px', color: '#E1306C' }} /> 
                     Instagram
                   </a>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <section className="hero" id="home">
         <div className="hero-image">
           <img src="/imagens/teste.png" alt="Foto do Instituto" />
         </div>
         <h1>CONECTANDO IDEIAS,<br/>CULTIVANDO O FUTURO</h1>
      </section>

      <section className="eventos-section" id="eventos">
        <h2 className="section-title">PRÓXIMOS EVENTOS</h2>
        
        {carregando ? (
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
            <div className="eventos-grid">
              {eventos.map(evento => (
                 <div key={evento.id} className="evento-card">
                   <img src={evento.imagem} alt={evento.titulo} className="event-image" />
                   <h3>{evento.titulo}</h3>
                   <p className="evento-info">{evento.data_inicio} • {evento.local}</p>
                   <p className="evento-description">{evento.descricao}</p>
                   <a href={`${API_URL}/api/events/ics/${evento.id}`} className="btn-saiba-mais">
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