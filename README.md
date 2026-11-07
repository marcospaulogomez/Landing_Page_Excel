# 📊 Página de Vendas - Curso de Excel Prático (Método DDF)
**Instrutor:** Prof. Marcos Gomez  
**Plataforma de Checkout:** Hotmart  
**Preço Promocional:** R$ 49,90  

---

## 🔒 Proteção de Dados Pessoais (Segurança para o GitHub)

Para garantir que seu **número de telefone pessoal, WhatsApp e links privados NÃO fiquem expostos** no GitHub público, o projeto utiliza a seguinte estrutura:

1. **`config.js` (PRIVADO)**:
   - Este arquivo guarda seus dados reais (número de WhatsApp, checkout Hotmart, links de redes sociais e webhook de leads).
   - Ele já está cadastrado no arquivo `.gitignore`.
   - **Resultado:** O Git **ignora** esse arquivo automaticamente. Ele **nunca** subirá para o repositório do GitHub.

2. **`config.example.js` (PÚBLICO/MODELO)**:
   - Este é o arquivo modelo que fica no GitHub para quem clonar o projeto saber quais variáveis configurar, contendo apenas dados fictícios.

---

## 🚀 Como testar a página no seu computador

1. Basta dar um **duplo clique no arquivo `index.html`** no seu Explorador de Arquivos do Windows;
2. Ele abrirá instantaneamente em qualquer navegador (Chrome, Edge, Firefox, Brave);
3. Todas as animações, acordeão de módulos, temporizador e botões já estão funcionando!

---

## ⚙️ Onde configurar seus dados

Abra o arquivo `config.js` em qualquer editor de texto (Bloco de Notas, VS Code, etc.) e preencha:

```javascript
window.APP_CONFIG = {
  // 1. Seu link de vendas da Hotmart (já inserido)
  HOTMART_CHECKOUT_URL: "https://go.hotmart.com/F108020318M",

  // 2. Seu WhatsApp com DDI 55 + DDD + Número (apenas números)
  WHATSAPP_NUMBER: "5511999999999",

  // 3. Mensagem padrão que o aluno enviará ao clicar
  WHATSAPP_DEFAULT_MESSAGE: "Olá Prof. Marcos! Gostaria de tirar uma dúvida sobre o Curso de Excel.",

  // 4. Seus perfis oficiais
  INSTAGRAM_URL: "https://www.instagram.com/seu_usuario",
  YOUTUBE_URL: "https://www.youtube.com/@seu_canal",

  // 5. Destino dos Leads (Formspree, SheetMonkey, Make, etc.)
  // Se deixar vazio, os leads ficam salvos no navegador (localStorage)
  LEAD_FORM_ENDPOINT: ""
};
```

---

## 🖼️ Como adicionar sua foto real

Coloque a sua foto oficial dentro da pasta:
`assets/images/professor.jpg`

A página já está programada para detectar automaticamente esse arquivo e exibi-lo com moldura e efeitos modernos na seção **"Quem é o Prof. Marcos?"**.

---

## 🐙 Como enviar para o GitHub com segurança

No terminal (PowerShell), basta rodar os comandos:

```bash
git add .
git commit -m "feat: landing page curso de excel completa"
# Conecte com o seu repositório no GitHub:
# git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
# git branch -M main
# git push -u origin main
```

*(O arquivo `config.js` com seu telefone **NÃO** será incluído no commit!)*
