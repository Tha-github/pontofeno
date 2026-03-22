import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bannerFeno from "../assets/banner-feno.jpg";
import bannerFeno2 from "../assets/banner-feno2.jpg";
import bannerFeno3 from "../assets/banner-feno3.jpg";
import "../App.css";

// ============================================================
// ✏️ EDITAR: Número do WhatsApp (apenas dígitos)
// ============================================================
const WHATSAPP_NUMBER = "5518997384575";
const WA = (msg = "Olá! Gostaria de fazer um orçamento de feno.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

// ✏️ EDITAR: Número do WhatsApp do advogado parceiro
const ADVOGADO_WA = "5500000000000"; // Substitua pelo número correto
const ADVOGADO_URL = `https://wa.me/${ADVOGADO_WA}?text=${encodeURIComponent("Olá! Vim pelo site da Ponto Feno e gostaria de suporte jurídico rural.")}`;

// ============================================================
// DADOS — CARROSSEL
// ✏️ EDITAR: Altere os slides. Substitua bgColor por backgroundImage
//           quando tiver fotos. Ex: backgroundImage: `url(${suaFoto})`
// ============================================================
const SLIDES = [
  {
    id: 1,
    background: { backgroundImage: `url(${bannerFeno})`, backgroundSize: "cover", backgroundPosition: "center" },
    tag: "🌿 Fornecimento em grande escala",
    title: <>Feno de Qualidade para o <span>Seu Rebanho</span></>,
    subtitle: "Fornecimento em larga escala com garantia, confiança e entrega direta para sua fazenda ou haras.",
    btn1: { label: "Solicitar Orçamento", url: WA() },
    btn2: { label: "Saiba mais", anchor: "sobre" },
  },
  {
    id: 2,
    background: { backgroundImage: `url(${bannerFeno2})`, backgroundSize: "cover", backgroundPosition: "center" },
    tag: "🐄 Bovinos · Equinos · Caprinos · Ovinos",
    title: <>Nutrição de <span>Alta Performance</span> para seus Animais</>,
    subtitle: "Feno selecionado e tratado com o máximo cuidado, para garantir saúde e produtividade ao seu rebanho.",
    btn1: { label: "Falar com Especialista", url: WA("Olá! Quero saber mais sobre os tipos de feno disponíveis.") },
    btn2: { label: "Ver animais atendidos", anchor: "animais" },
  },
  {
    id: 3,
    background: { backgroundImage: `url(${bannerFeno3})`, backgroundSize: "cover", backgroundPosition: "center" },
    tag: "📦 Pedido mínimo: 250 fardos",
    title: <>Parceiro Ideal para <span>Grandes Produtores</span></>,
    subtitle: "Atendemos fazendas, haras e produtores rurais que precisam de volume garantido com confiança e pontualidade.",
    btn1: { label: "Solicitar Orçamento", url: WA() },
    btn2: { label: "Quantidade mínima", anchor: "quantidade" },
  },
];

// ============================================================
// DADOS — ANIMAIS
// ✏️ EDITAR: Nome, emoji e descrição de cada animal
// ============================================================
const ANIMAIS = [
  {
    emoji: "🐄",
    nome: "Bovinos",
    desc: "Feno de alta qualidade nutricional para gado de corte e leiteiro, garantindo produtividade e saúde do rebanho.",
    tag: "Gado de corte e leite",
  },
  {
    emoji: "🐴",
    nome: "Equinos",
    desc: "Feno especialmente selecionado para cavalos de esporte, trabalho e reprodução, com fibras e nutrição balanceada.",
    tag: "Cavalos e éguas",
  },
  {
    emoji: "🐐",
    nome: "Caprinos",
    desc: "Feno adequado para caprinos de leite e corte, com fibras ideais para a saúde digestiva da criação.",
    tag: "Bode e cabra",
  },
  {
    emoji: "🐑",
    nome: "Ovinos",
    desc: "Alimentação equilibrada para ovinos de lã e carne, promovendo desenvolvimento saudável e ganho de peso.",
    tag: "Ovelhas e carneiros",
  },
];

// ============================================================
// DADOS — VALORES (seção Sobre)
// ✏️ EDITAR: Ícone, título e descrição de cada valor
// ============================================================
const VALORES = [
  { icon: "✅", label: "Qualidade garantida", desc: "Feno selecionado e com padrão de excelência" },
  { icon: "🤝", label: "Atendimento direto", desc: "Sem intermediários, fale com o produtor" },
  { icon: "📦", label: "Grande escala", desc: "Capacidade para atender grandes demandas" },
];

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  // Avança para o próximo slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetInterval();
  };

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 5500);
  }, [nextSlide]);

  // Carrossel automático
  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 5500);
    return () => clearInterval(intervalRef.current);
  }, [nextSlide]);

  // Scroll suave ao clicar em âncoras dos slides
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Fade-in via Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--branco)", overflowX: "hidden" }}>
      {/* ==============================
          NAVBAR
          ============================== */}
      <Navbar />

      {/* ==============================
          HERO — CARROSSEL
          ============================== */}
      <section className="hero" id="inicio">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero__slide ${index === currentSlide ? "active" : ""}`}
          >
            {/* Fundo do slide */}
            <div className="hero__slide-bg" style={slide.background} />
            {/* Overlay escuro gradiente */}
            <div className="hero__overlay" />

            {/* Conteúdo */}
            <div className="hero__content">
              <span className="hero__tag">{slide.tag}</span>
              <h1 className="hero__title">{slide.title}</h1>
              <p className="hero__subtitle">{slide.subtitle}</p>
            </div>
          </div>
        ))}

        {/* Dots + setas */}
        <div className="hero__controls">
          <button className="hero__arrow" onClick={() => { prevSlide(); resetInterval(); }} aria-label="Slide anterior">‹</button>
          <div className="hero__dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`hero__dot ${i === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <button className="hero__arrow" onClick={() => { nextSlide(); resetInterval(); }} aria-label="Próximo slide">›</button>
        </div>

      </section>

      {/* ==============================
          SEÇÃO: PARA QUAIS ANIMAIS?
          ============================== */}
      <section className="animais-section" id="animais">
        <div className="section-container">
          <div className="animais-header fade-in">
            <span className="section-label">🐄 Criações atendidas</span>
            {/* ✏️ EDITAR: Título e subtítulo da seção */}
            <h2>Feno ideal para diferentes tipos de criação</h2>
            <p>Fornecemos feno de alta qualidade para diversas espécies, garantindo nutrição e saúde para o seu rebanho.</p>
          </div>

          <div className="animais-grid">
            {ANIMAIS.map((animal, i) => (
              <div
                key={animal.nome}
                className={`animal-card fade-in fade-in-delay-${i + 1}`}
              >
                <div className="animal-card__emoji-wrapper">
                  <span style={{ fontSize: "5rem", lineHeight: 1 }}>{animal.emoji}</span>
                </div>
                <div className="animal-card__body">
                  <h3 className="animal-card__name">{animal.nome}</h3>
                  <p className="animal-card__desc">{animal.desc}</p>
                  <span className="animal-card__tag">{animal.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          SEÇÃO: QUANTIDADE MÍNIMA
          ============================== */}
      <section className="quantidade-section" id="quantidade">
        <div className="section-container">
          <div className="quantidade-inner">
            {/* Texto */}
            <div className="quantidade-text fade-in">
              <span className="section-label">📦 Pedido mínimo</span>
              {/* ✏️ EDITAR: Título e texto da seção de quantidade */}
              <h2>Atendemos apenas pedidos em grande escala</h2>
              <p>
                Nossa operação é voltada para produtores rurais, fazendeiros e criadores que precisam de volume consistente e entrega garantida.
              </p>

              <div className="quantidade-features">
                <div className="quantidade-feature">
                  <div className="quantidade-feature__icon">🌾</div>
                  <span>Ideal para fazendas e grandes criações</span>
                </div>
                <div className="quantidade-feature">
                  <div className="quantidade-feature__icon">🐴</div>
                  <span>Haras e centros equestres</span>
                </div>
                <div className="quantidade-feature">
                  <div className="quantidade-feature__icon">🚜</div>
                  <span>Produtores rurais de todo o Brasil</span>
                </div>
                <div className="quantidade-feature">
                  <div className="quantidade-feature__icon">✅</div>
                  <span>Entrega com nota fiscal e garantia</span>
                </div>
              </div>

              <a
                href={WA("Olá! Quero fazer um pedido de feno. Podem me passar mais informações?")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <WhatsAppIcon /> Solicitar Orçamento
              </a>
            </div>

            {/* Card com número */}
            <div className="quantidade-number-card fade-in fade-in-delay-2">
              <div className="quantidade-number-card__value">250</div>
              <div className="quantidade-number-card__unit">fardos de feno</div>
              <div className="quantidade-number-card__label">pedido mínimo</div>
              <div style={{ marginTop: "24px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px" }}>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", lineHeight: 1.6 }}>
                  Trabalhe com quem tem capacidade de atender sua demanda com qualidade e pontualidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          SEÇÃO: SOBRE A EMPRESA
          ============================== */}
      <section className="sobre-section" id="sobre">
        <div className="section-container">
          <div className="sobre-inner">
            {/* Imagem */}
            <div className="sobre-image-wrapper fade-in">
              {/*
                ✏️ EDITAR: Substitua o style abaixo por uma imagem real
                Exemplo: <img src={suaFoto} alt="Produção Ponto Feno" />
              */}
              <div style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "8rem",
              }}>
                🌾
              </div>
              <div className="sobre-image-wrapper__overlay" />
              <div className="sobre-badge">
                {/* ✏️ EDITAR: anos de experiência */}
                <div className="sobre-badge__num">+5</div>
                <div className="sobre-badge__txt">anos no mercado</div>
              </div>
            </div>

            {/* Texto */}
            <div className="sobre-text fade-in fade-in-delay-2">
              <span className="section-label">🌿 Quem somos</span>
              {/* ✏️ EDITAR: Título e textos da seção Sobre */}
              <h2>Sobre a Ponto Feno</h2>
              <p>
                A Ponto Feno é uma empresa especializada na comercialização de feno de alta qualidade, focada em atender fazendas, haras e produtores rurais que necessitam de fornecimento em larga escala.
              </p>
              <p>
                Com mais de 10 anos de atuação no agronegócio, construímos uma reputação sólida baseada na qualidade do produto, pontualidade nas entregas e atendimento personalizado direto ao produtor.
              </p>
              <p>
                Nosso compromisso é ser o parceiro de confiança do produtor rural, oferecendo feno de alto padrão nutricional e suporte completo em todo o processo de compra e entrega.
              </p>

              <div className="sobre-valores">
                {VALORES.map((v) => (
                  <div className="sobre-valor" key={v.label}>
                    <div className="sobre-valor__icon">{v.icon}</div>
                    <div>
                      <div className="sobre-valor__label">{v.label}</div>
                      <div className="sobre-valor__desc">{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          BANNER: PARCERIA ADVOGADO
          ============================== */}
      <section className="parceria-section" id="parceria">
        <div className="section-container">
          <div className="parceria-inner">

            {/* ✏️ EDITAR: Foto do advogado — substitua o src abaixo pela imagem real */}
            <div className="parceria-foto fade-in">
              <img
                src="/src/assets/advogado.jpg"
                alt="Foto do advogado parceiro"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Placeholder exibido enquanto não houver foto */}
              <div className="parceria-foto__placeholder">
                <span>👨‍⚖️</span>
                <p>Foto do<br />Advogado</p>
              </div>
            </div>

            {/* Texto + CTA */}
            <div className="parceria-text fade-in fade-in-delay-2">
              <span className="section-label">⚖️ Suporte jurídico</span>
              {/* ✏️ EDITAR: Título e texto do banner do advogado */}
              <h2>Precisa de suporte jurídico no agronegócio?</h2>
              <p>
                Conheça nosso parceiro especialista em <strong>direito rural</strong>. Assessoria jurídica completa para contratos, arrendamentos, questões fundiárias e muito mais.
              </p>

              <div style={{ marginTop: "24px" }}>
                <a
                  href={ADVOGADO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-bege"
                >
                  <span>⚖️</span>
                  {/* ✏️ EDITAR: Texto do botão do advogado */}
                  Falar com Advogado
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          FOOTER
          ============================== */}
      <Footer />

      {/* ==============================
          BOTÃO FLUTUANTE WHATSAPP
          ============================== */}
      <a
        href={WA()}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        title="Falar no WhatsApp"
      >
        <WhatsAppIcon size={28} />
      </a>
    </div>
  );
}

// Ícone SVG do WhatsApp reutilizável
function WhatsAppIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default Home;
