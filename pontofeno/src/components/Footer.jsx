import React from "react";

function Footer() {
  return (
    <footer id="contato" style={{
      backgroundColor: "var(--verde-escuro)",
      textAlign: "center",
      padding: "32px 5%",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    }}>
      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem" }}>
        &copy; 2026 Ponto Feno. Todos os direitos reservados.
      </p>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem" }}>
        Desenvolvido por{" "}
        <a
          href="https://instagram.com/brandcode"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--verde-claro)", fontWeight: 600, transition: "var(--transicao)" }}
          onMouseEnter={e => e.target.style.color = "var(--verde-suave)"}
          onMouseLeave={e => e.target.style.color = "var(--verde-claro)"}
        >
          BrandCode Solutions
        </a>
      </p>
    </footer>
  );
}

export default Footer;
