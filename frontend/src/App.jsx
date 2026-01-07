import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram, FaChevronDown, FaChevronUp } from 'react-icons/fa'; 
import './calendario-evento.css';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [menuAberto, setMenuAberto] = useState(false);

  //controlar qual cartão está virado
  const [cardAtivo, setCardAtivo] = useState(null);

  const equipe = [
    { id: 1, nome: "Hênia Silva", cargo: "Presidente", foto: "/imagens/Henila.jpeg" },
    { id: 2, nome: "Mariana Flores", cargo: "Vice-Presidente", foto: "/imagens/Mariana.jpeg" },
    { id: 3, nome: "Ygor Neiva", cargo: "Secretário Geral", foto: "/imagens/Ygor.jpeg" },
    { id: 4, nome: "Victor Cruz", cargo: "Comunicação e Eventos", foto: "/imagens/Victor.jpeg" },
    { id: 5, nome: "Vicente Ferreira", cargo: "Finanças e Planejamento", foto: "/imagens/Vicente.jpeg" },
    { id: 6, nome: "Aline Nascimento", cargo: "Combate as Opressões", foto: "/imagens/Aline.jpeg" },
    { id: 7, nome: "Ualas Nascimento", cargo: "Esporte e Cultura", foto: "/imagens/Ualas.jpeg" },
    { id: 8, nome: "Atanael Fagundes", cargo: "Assistência Estudantil", foto: "/imagens/Atanael.jpeg" },
    { id: 9, nome: "Joandson Alves", cargo: "Políticas Públicas", foto: "/imagens/Joandson.jpeg" },
  ];

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

  // Função para virar o cartão ao clicar
  const virarCartao = (id) => {
    if (cardAtivo === id) {
        setCardAtivo(null); 
    } else {
        setCardAtivo(id);
    }
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

      <section className="hero-equipe" id="quem-somos">
        <div className="hero-text-container">
            <h1>CONECTANDO IDEIAS,<br/>CULTIVANDO O FUTURO</h1>
            <p className="hero-subtitle">Toque nos membros para conhecer a gestão 2026</p>
        </div>

        <div className="equipe-grid-hero">
          {equipe.map(membro => (
            <div 
                key={membro.id} 
                className={`flip-card ${cardAtivo === membro.id ? 'flipped' : ''}`} 
                onClick={() => virarCartao(membro.id)}
            >
              <div className="flip-card-inner">

                {/* FRENTE */}
                <div className="flip-card-front">
                   <img 
                      src={membro.foto} 
                      alt={membro.nome} 
                      onError={(e) => e.target.src='https://via.placeholder.com/150/CCCCCC/808080?text=?'} 
                   />
                </div>

                {/* VERSO */}
                <div className="flip-card-back">
                   <h3>{membro.cargo}</h3>
                   <div className="separador"></div>
                   <p className="nome-back">{membro.nome}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
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