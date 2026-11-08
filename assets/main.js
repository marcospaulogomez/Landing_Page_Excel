/**
 * Lógica da Landing Page - Prof. Marcos Gomez
 * Carrega as variáveis do config.js e inicializa componentes interativos
 */

document.addEventListener("DOMContentLoaded", () => {
  // Carrega configurações com fallback seguro
  const config = window.APP_CONFIG || {
    HOTMART_CHECKOUT_URL: "https://pay.hotmart.com/F108020318M",
    WHATSAPP_NUMBER: "5511999999999",
    WHATSAPP_DEFAULT_MESSAGE: "Olá Prof. Marcos! Gostaria de tirar uma dúvida sobre o Curso de Excel.",
    INSTAGRAM_URL: "https://instagram.com",
    YOUTUBE_URL: "https://youtube.com",
    LEAD_FORM_ENDPOINT: ""
  };

  // 1. Atualizar links da Hotmart em todos os botões com a classe .hotmart-btn
  const hotmartButtons = document.querySelectorAll(".hotmart-btn");
  hotmartButtons.forEach(btn => {
    btn.setAttribute("href", config.HOTMART_CHECKOUT_URL);
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");
  });

  // 2. Atualizar links de redes sociais
  const instagramLinks = document.querySelectorAll(".instagram-link");
  instagramLinks.forEach(link => {
    link.setAttribute("href", config.INSTAGRAM_URL);
  });

  const youtubeLinks = document.querySelectorAll(".youtube-link");
  youtubeLinks.forEach(link => {
    link.setAttribute("href", config.YOUTUBE_URL);
  });

  // 3. Atualizar botões de WhatsApp
  const whatsappUrl = `https://wa.me/${config.WHATSAPP_NUMBER}?text=${encodeURIComponent(config.WHATSAPP_DEFAULT_MESSAGE)}`;
  const whatsappButtons = document.querySelectorAll(".whatsapp-btn");
  whatsappButtons.forEach(btn => {
    btn.setAttribute("href", whatsappUrl);
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");
  });

  // 4. Acordeão do Conteúdo Programático
  window.toggleAccordion = function(id) {
    const content = document.getElementById(`module-content-${id}`);
    const icon = document.getElementById(`module-icon-${id}`);
    
    if (content.classList.contains("hidden")) {
      content.classList.remove("hidden");
      if (icon) icon.style.transform = "rotate(180deg)";
    } else {
      content.classList.add("hidden");
      if (icon) icon.style.transform = "rotate(0deg)";
    }
  };

  // 5. Acordeão do FAQ
  window.toggleFaq = function(id) {
    const answer = document.getElementById(`faq-answer-${id}`);
    const icon = document.getElementById(`faq-icon-${id}`);
    
    if (answer.classList.contains("hidden")) {
      answer.classList.remove("hidden");
      if (icon) icon.style.transform = "rotate(180deg)";
    } else {
      answer.classList.add("hidden");
      if (icon) icon.style.transform = "rotate(0deg)";
    }
  };

  // 6. Contador regressivo de escassez (oferta de lançamento R$ 49,90)
  function initCountdown() {
    const timerElem = document.getElementById("countdown-timer");
    if (!timerElem) return;

    // Timer de 23 horas, 42 minutos rotativo baseado no dia atual
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    function update() {
      const current = new Date();
      const diff = endOfDay - current;

      if (diff <= 0) {
        timerElem.innerHTML = "00h 00m 00s";
        return;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const fH = String(hours).padStart(2, '0');
      const fM = String(minutes).padStart(2, '0');
      const fS = String(seconds).padStart(2, '0');

      timerElem.innerHTML = `<span>${fH}h</span> : <span>${fM}m</span> : <span>${fS}s</span>`;
    }

    update();
    setInterval(update, 1000);
  }
  initCountdown();

  // 7. Manipulação do formulário de captura de Leads
  const leadForm = document.getElementById("leadCaptureForm");
  const leadSuccessModal = document.getElementById("leadSuccessModal");

  if (leadForm) {
    leadForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const submitBtn = leadForm.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = "Enviando...";
      submitBtn.disabled = true;

      const formData = new FormData(leadForm);
      const leadData = {
        data: new Date().toLocaleString("pt-BR"),
        nome: formData.get("nome"),
        email: formData.get("email"),
        whatsapp: formData.get("whatsapp"),
        origem: "Landing Page Excel - Prof. Marcos"
      };

      try {
        // Sempre salva cópia de segurança localmente
        const localLeads = JSON.parse(localStorage.getItem("leads_excel") || "[]");
        localLeads.push(leadData);
        localStorage.setItem("leads_excel", JSON.stringify(localLeads));

        // Se houver endpoint configurado (Google Sheets Apps Script, SheetMonkey, Formspree, Make), envia
        if (config.LEAD_FORM_ENDPOINT && config.LEAD_FORM_ENDPOINT.startsWith("http")) {
          const isGoogleScript = config.LEAD_FORM_ENDPOINT.includes("script.google.com");

          await fetch(config.LEAD_FORM_ENDPOINT, {
            method: "POST",
            mode: isGoogleScript ? "no-cors" : "cors",
            headers: {
              "Content-Type": isGoogleScript ? "text/plain;charset=utf-8" : "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(leadData)
          });
        }

        // Abre modal de sucesso
        if (leadSuccessModal) {
          leadSuccessModal.classList.remove("hidden");
          leadSuccessModal.classList.add("flex");
        } else {
          alert(`Obrigado ${leadData.nome}! Seus dados foram salvos e sua amostra foi liberada.`);
        }

        leadForm.reset();
      } catch (err) {
        console.error("Erro ao enviar lead:", err);
        alert("Obrigado! Recebemos seu contato com sucesso.");
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // 8. Fechar Modal de Sucesso do Lead
  window.closeLeadModal = function() {
    if (leadSuccessModal) {
      leadSuccessModal.classList.add("hidden");
      leadSuccessModal.classList.remove("flex");
    }
  };

  // 9. Ferramenta útil: Exportar Leads locais para CSV (Pressione no console ou chame exportLeads())
  window.exportLeads = function() {
    const leads = JSON.parse(localStorage.getItem("leads_excel") || "[]");
    if (leads.length === 0) {
      alert("Nenhum lead capturado localmente ainda.");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,Nome,Email,WhatsApp,Data\n";
    leads.forEach(l => {
      csvContent += `"${l.nome}","${l.email}","${l.whatsapp}","${l.data}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leads_excel_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 10. Barra Fixa de Compra no Mobile (exibe após rolar o Hero)
  const mobileBar = document.getElementById("mobileStickyBar");
  if (mobileBar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        mobileBar.classList.remove("translate-y-full");
      } else {
        mobileBar.classList.add("translate-y-full");
      }
    });
  }
});
