import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram, FaChevronDown, FaChevronUp, FaMapMarkerAlt } from 'react-icons/fa'; 
import './calendario-evento.css';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [menuAberto, setMenuAberto] = useState(false);

   // DADOS DAS PROPOSTAS
const propostas = [
    { 
      id: 1, 
      titulo: "Revista Atlas", 
      icone: "📖", 
      resumo: "Um espaço para a produção acadêmica discente.",
      detalhes: [
        "Publicação anual de artigos e resenhas.",
        "Espaço dedicado a relatos de campo e vivências.",
        "Divulgação de materiais didáticos produzidos no curso.",
        "Incentivo à escrita científica desde o início da graduação."
      ]
    },
    { 
      id: 2, 
      titulo: "ExpoGEO", 
      icone: "🌍", 
      resumo: "Valorização do conhecimento e acolhimento.",
      detalhes: [
        "Evento oficial de recepção aos calouros.",
        "Exposição de banners, maquetes e produções dos veteranos.",
        "Integração entre turmas de diferentes semestres.",
        "Espaço para apresentação de pesquisas em andamento."
      ]
    },
    { 
      id: 3, 
      titulo: "Oficinas e Minicursos", 
      icone: "🛠️", 
      resumo: "Formação técnica e prática para o geógrafo.",
      detalhes: [
        "Workshop de Normas ABNT e escrita acadêmica.",
        "Minicursos de QGIS e Geoprocessamento.",
        "Oficinas de produção de material didático.",
        "Treinamentos voltados à prática docente."
      ]
    },
    { 
      id: 4, 
      titulo: "Podcast Geográfico", 
      icone: "🎙️", 
      resumo: "Diálogos atuais sobre a Geografia.",
      detalhes: [
        "Entrevistas com professores e pesquisadores convidados.",
        "Debates sobre temas emergentes e atualidades.",
        "Protagonismo estudantil na condução das pautas.",
        "Disponibilização em plataformas digitais."
      ]
    },
    { 
      id: 5, 
      titulo: "Calendário Geográfico", 
      icone: "📅", 
      resumo: "Organização e transparência nas datas.",
      detalhes: [
        "Centralização de prazos de editais e matrículas.",
        "Divulgação antecipada de seminários e congressos.",
        "Cronograma de reuniões abertas do CAGEO.",
        "Mural físico e digital atualizado mensalmente."
      ]
    },
    { 
      id: 6, 
      titulo: "Esporte e Integração", 
      icone: "⚽", 
      resumo: "Lazer e saúde mental no ambiente acadêmico.",
      detalhes: [
        "Torneios de futsal e interclasses.",
        "Gincanas de integração calouros-veteranos.",
        "Incentivo à ocupação dos espaços de lazer do campus.",
        "Eventos recreativos para alívio de tensão pré-provas."
      ]
    },
    { 
      id: 7, 
      titulo: "Cultura e Talentos", 
      icone: "🎨", 
      resumo: "A arte como forma de expressão política.",
      detalhes: [
        "Sarau geográfico com música e poesia.",
        "Espaço para exposição de fotografia e arte discente.",
        "Cine-debates com documentários geográficos.",
        "Valorização dos artistas locais da universidade."
      ]
    }
  ];

  const [rotaAtiva, setRotaAtiva] = useState(propostas[0]);

  // DADOS DA EQUIPE 
  const equipe = [
    { 
      id: 1, 
      nome: "Hênila Silva", 
      cargo: "Presidente", 
      semestre: "5º Semestre",
      foto: "/imagens/Henila.jpeg",
      bio: "Acredito na força do diálogo, da representação estudantil e na transformação de ideias em ações reais dentro do Centro Acadêmico."
    },
    { 
      id: 2, 
      nome: "Mariana Flores", 
      cargo: "Vice-Presidente", 
      semestre: "5º Semestre",
      foto: "/imagens/Mariana.jpeg",
      bio: "Entusiasta de belas histórias. Considero-me uma pessoa empática, que acredita no poder da democracia e está sempre disposta a ajudar."
    },
    { 
      id: 3, 
      nome: "Ygor Neiva", 
      cargo: "Secretário Geral", 
      semestre: "7º Semestre",
      foto: "/imagens/Ygor.jpeg",
      bio: "Amante de filmes e rock, acredito que não temos nada a perder a não ser nossos grilhões."
    },
    { 
      id: 4, 
      nome: "Victor Cruz", 
      cargo: "Comunicação e Eventos", 
      semestre: "7º Semestre",
      foto: "/imagens/Victor.jpeg",
      bio: "Da Ilha de Itaparica. Apaixonado por games e futebol. Acredito na força da criatividade como ponte entre o movimento estudantil e a comunidade."
    },
    { 
      id: 5, 
      nome: "Vicente Ferreira", 
      cargo: "Finanças e Planejamento", 
      semestre: "3º Semestre",
      foto: "/imagens/Vicente.jpeg",
      bio: "Empreendedor há 6 anos e gestor. Junto com a Atlas Estudantil creio que poderei fazer a diferença."
    },
    { 
      id: 6, 
      nome: "Aline Nascimento", 
      cargo: "Combate as Opressões", 
      semestre: "8º Semestre",
      foto: "/imagens/Aline.jpeg",
      bio: "Acredito no poder da coletividade para transformar realidades e dar voz a quem é silenciado."
    },
    { 
      id: 7, 
      nome: "Ualas Nascimento", 
      cargo: "Esporte e Cultura", 
      semestre: "7º Semestre",
      foto: "/imagens/Ualas.jpeg",
      bio: "Jovem estudioso, educado e dedicado, que acredita na importância do ensino e aprendizagem na busca contínua do conhecimento."
    },
    { 
      id: 8, 
      nome: "Atanael Fagundes", 
      cargo: "Assistência Estudantil", 
      semestre: "",
      foto: "/imagens/Atanael.jpeg",
      bio: "Estou aqui pelo fato de que acredito na educação que transforma. Sou uma pessoa dedicada, prestativa e pró-ativa."
    },
    { 
      id: 9, 
      nome: "Joandson Alves", 
      cargo: "Políticas Públicas", 
      semestre: "8º Semestre",
      foto: "/imagens/Joandson.jpeg",
      bio: "Dedicado, curioso e em constante busca por aprendizado."
    },
  ];

  // Estado para o Membro Selecionado da Equipe
  const [membroAtivo, setMembroAtivo] = useState(equipe[0]);

  const isActive = carregando; 

  useEffect(() => {
    setCarregando(true);
    fetch(`${API_URL}/api/events`, { headers: { 'ngrok-skip-browser-warning': 'true' } })
    .then(res => res.json())
    .then(data => {
      setTimeout(() => { setEventos(data); setCarregando(false); }, 2000);
    })
    .catch(err => {
        console.log("Erro:", err);
        console.log("Mantendo animação ativa para teste visual");
    });
  }, []);

  const toggleMenuContato = (e) => {
    e.preventDefault();
    setMenuAberto(!menuAberto);
  };

  return (    
    <>
      {/* --- OVERLAY CARTOGRÁFICO --- */}
      <div className={`cartografia-overlay ${isActive ? "active" : ""}`}>
         <div className="canto canto-top-left">+</div>
         <div className="canto canto-top-right">+</div>
         <div className="canto canto-bottom-left">+</div>
         <div className="canto canto-bottom-right">+</div>
         <div className="coord-y">LAT 09° 23' S</div>
         <div className="coord-x">LONG 40° 30' O</div>
      </div>

      <header>
        <div className="logo-container">
            <img src="/imagens/bussola.png" alt="Logo" className="logo-img" />
            <p className="logo-text">Chapa Atlas Estudantil</p>
        </div>
        <nav>
          <ul>
            <li><a href="#home">HOME</a></li>
            <li><a href="#rotas">PROPOSTAS</a></li>
            <li><a href="#quem-somos">EQUIPE</a></li>
            <li><a href="#eventos">EVENTOS</a></li>
            
            <li className="contato-container-nav">
              <a href="#contato" onClick={toggleMenuContato} className="btn-contato-nav">
                CONTATO {menuAberto ? <FaChevronUp size={12}/> : <FaChevronDown size={12}/>}
              </a>
              {menuAberto && (
                <div className="dropdown-menu">
                   <a href="https://chat.whatsapp.com/C4ImgaXWzcf5FfU32zc48U" target="_blank" rel="noopener noreferrer" className="dropdown-item">
                     <FaWhatsapp size={18} style={{ marginRight: '8px', color: '#25D366' }} /> WhatsApp
                   </a>
                   <a href="https://www.instagram.com/cageomiltonsantos" target="_blank" rel="noopener noreferrer" className="dropdown-item">
                     <FaInstagram size={18} style={{ marginRight: '8px', color: '#E1306C' }} /> Instagram
                   </a>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="hero-principal" id="home">
        <div className="hero-content">
            <h1>CONECTANDO IDEIAS,<br/>CULTIVANDO O FUTURO</h1>
            <p className="hero-descricao">
            Somos a <strong>Chapa Atlas Estudantil</strong>: um grupo diverso de estudantes de Geografia unidos para fortalecer o protagonismo, o acolhimento e a democracia no Campus V.
            </p>
        </div>
      </section>

      {/* --- SEÇÃO DE PROPOSTAS (ROTAS) --- */}
      <section className="rotas-section" id="rotas">
        <h2 className="section-title">NOSSAS ROTAS</h2>
        <p className="subtitle-equipe">O plano de ação da Chapa Atlas</p>
        
        <div className="rotas-container-master">
            {/* LISTA LATERAL (MENU) */}
            <div className="rotas-menu">
                {propostas.map((prop) => (
                    <button 
                        key={prop.id} 
                        className={`rota-btn-menu ${rotaAtiva.id === prop.id ? 'active' : ''}`}
                        onClick={() => setRotaAtiva(prop)}
                    >
                        <span className="rota-icon-small">{prop.icone}</span>
                        <span className="rota-title-small">{prop.titulo}</span>
                        <span className="seta-indicadora">›</span>
                    </button>
                ))}
            </div>
            {/* ÁREA DE CONTEÚDO (O CADERNO) */}
            <div className="rota-detalhe-panel">
                <div className="notebook-paper">
                    <div className="notebook-header">
                        <span className="notebook-icon">{rotaAtiva.icone}</span>
                        <h3>{rotaAtiva.titulo}</h3>
                    </div>
                    
                    <p className="notebook-resumo">{rotaAtiva.resumo}</p>
                    
                    <hr className="notebook-divider" />
                    
                    <ul className="notebook-checklist">
                        {rotaAtiva.detalhes.map((item, index) => (
                            <li key={index}>
                                <span className="check-bullet">✓</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* --- SEÇÃO DA EQUIPE  --- */}
      <section className="equipe-section" id="quem-somos">
        <h2 className="section-title">EXPEDICIONÁRIOS</h2>
        <p className="subtitle-equipe">Conheça quem faz a gestão 2026</p>

        <div className="painel-equipe-container">
            {/* Lado Esquerdo: Grid de Avatares */}
            <div className="avatars-grid">
                {equipe.map((membro) => (
                    <button 
                        key={membro.id}
                        className={`avatar-btn ${membroAtivo.id === membro.id ? 'active' : ''}`}
                        onClick={() => setMembroAtivo(membro)}
                    >
                        <img 
                            src={membro.foto} 
                            alt={membro.nome} 
                            onError={(e) => e.target.src='https://via.placeholder.com/150/CCCCCC/808080?text=?'}
                        />
                    </button>
                ))}
            </div>

            {/* Lado Direito: Ficha Técnica */}
            <div className="ficha-tecnica">
                <div className="ficha-header">
                    <div className="ficha-titulos">
                        <h3>{membroAtivo.nome}</h3>
                        <span className="badge-cargo">{membroAtivo.cargo}</span>
                    </div>
                    <div className="ficha-meta">
                         <span className="meta-tag"><FaMapMarkerAlt/> {membroAtivo.semestre}</span>
                    </div>
                </div>
                
                <div className="ficha-body">
                    <p>"{membroAtivo.bio}"</p>
                </div>

                {/* Detalhe visual de fundo */}
                <div className="bg-topography-detail"></div>
            </div>
        </div>
      </section>

      {/* --- EVENTOS --- */}
      <section className="eventos-section" id="eventos">
        <h2 className="section-title">PRÓXIMOS EVENTOS</h2>
        
        {carregando ? (
          <div className="atlas-loading-screen">
            <div className="atlas-world-container">
              <div className="atlas-globe"></div>
              <div className="atlas-ring ring-1"></div>
              <div className="atlas-ring ring-2"></div>
            </div>
            <div className="atlas-text">
              <h2>Mapeando Eventos...</h2>
            </div>
          </div>
        ) : (
            <div className="eventos-grid">
  {eventos.map(evento => (
     <div key={evento.id} className="evento-card">
       <a 
         href={evento.link_post || "#"} 
         target={evento.link_post ? "_blank" : "_self"}
         rel="noopener noreferrer" 
         className="evento-imagem-container"
       >
         <img src={evento.imagem} alt={evento.titulo} className="event-image" />
         
         {evento.link_post && <div className="selo-instagram">Ver no Instagram</div>}
       </a>

       <div className="evento-conteudo">
           <h3>{evento.titulo}</h3>
           <p className="evento-info">{evento.data_inicio} • {evento.local}</p>
           <p className="evento-description">{evento.descricao}</p>
           
           <div className="eventos-botoes">
               {evento.link_inscricao && (
                 <a href={evento.link_inscricao} target="_blank" rel="noopener noreferrer" className="btn-saiba-mais btn-inscricao">
                   GARANTIR MINHA VAGA
                 </a>
               )}
               <a href={`${API_URL}/api/events/ics/${evento.id}`} className="btn-saiba-mais">
                 SALVAR NO CALENDÁRIO
               </a>
           </div>
       </div>

     </div>
  ))}
</div>
         )}
      </section>
    </>
  );
}

export default App;