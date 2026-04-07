# ⚙️ CONFIGURAÇÃO - Agência Sabre

## 📋 CHECKLIST DE PERSONALISAÇÃO

Complete esse checklist para deixar o site 100% personalizado:

### 1. WhatsApp (CRÍTICO)
- [ ] Abra `script.js`
- [ ] Procure por: `const phoneNumber = "5585999999999";`
- [ ] Substitua `5585999999999` por seu número:
  - Formato: 55 (Brasil) + 85 (DDD) + 9 + 8 dígitos
  - Exemplo real: `5585987654321`
- [ ] Testje clicando no botão flutuante depois de salvar

### 2. Mensagens Personalizadas
- [ ] Edite `script.js`
- [ ] Linha com: `const message = "Olá! Gostaria de uma consultoria gratuita..."`
- [ ] Customize conforme seu pitch

### 3. Logo e Branding
- [ ] Certifique-se que as imagens estão em `/Sabre/`
- [ ] Principais:
  - `Sabre - Titulo.png` (Logo no header)
  - `LogoG.png.png` (Logo flutuante hero)
  - `Wallpaper - SABRE..png` (Portfolio)

### 4. Dados de Contato
- [ ] Footer: Instagram link
- [ ] Footer: WhatsApp link
- [ ] Email da empresa (para futura integração)

### 5. Conteúdo e Copywriting
- [ ] Atualize textos dos serviços
- [ ] Atualize depoimentos com clientes reais
- [ ] Atualize nichos atendidos

---

## 🔧 GUIA TÉCNICO DE EDIÇÃO

### Estrutura de Pastas
```
Sabre/
├── index.html          ← Estrutura HTML
├── style.css           ← Estilos e responsividade
├── script.js           ← Funcionalidades JavaScript
├── MELHORIAS.md        ← Documentação de melhorias
├── CONFIGURACAO.md     ← Este arquivo
└── Sabre/              ← Pasta com imagens
    ├── Sabre - Titulo.png
    ├── LogoG.png.png
    ├── pattern_1.png
    └── ... (outras imagens)
```

### Encontrar e Editar Seções

#### Hero Section (Primeira tela)
**Arquivo:** `index.html` (linhas ~28-40)
```html
<h1>Presença Digital <span class="neon-text">Estratégica</span></h1>
<p>Mais do que executar tarefas, gerimos sua empresa na internet...</p>
```

#### Serviços (6 cards)
**Arquivo:** `index.html` (linhas ~50-74)
```html
<div class="card">
    <div class="icon">📱</div>
    <h3>Social Media</h3>
    <p>Gestão completa de redes sociais...</p>
</div>
```

#### Nichos (Quem atendemos)
**Arquivo:** `index.html` (linhas ~130-145)
```html
<li><span>✂️</span> Beleza e Estética</li>
<li><span>🍔</span> Alimentação e Delivery</li>
<!-- etc -->
```

#### Depoimentos
**Arquivo:** `index.html` (linhas ~160-185)
```html
<div class="card testimonial-card">
    <div class="quote-icon">"</div>
    <p>"Minhas vendas no delivery dobraram..."</p>
    <div class="client-info">
        <strong>Carlos M.</strong>
        <span>Hamburgueria Artesanal</span>
    </div>
</div>
```

---

## 🎨 CUSTOMIZAÇÃO DE CORES

### Cores Atuais
```css
--neon-green: #00ffae    /* Verde neon principal */
--bg-color: #1e1e1e      /* Fundo escuro */
--text-color: #ffffff    /* Texto branco */
```

### Para Alterar para Outra Cor

1. Abra `style.css`
2. Procure por `:root {` (primeira linha)
3. Altere `--neon-green: #00ffae;` para sua cor

**Exemplos:**
```css
/* Azul */
--neon-green: #00d4ff;

/* Rosa */
--neon-green: #ff006e;

/* Amarelo */
--neon-green: #ffed00;

/* Roxo */
--neon-green: #b300ff;
```

---

## 📱 TESTE DE FUNCIONALIDADES

### Antes de publicar, teste:

- [ ] **Hero:** Logo aparece flutuante?
- [ ] **Menu:** Clique no menu no celular (viewport <768px)
- [ ] **Links:** Todos os links navegam para as seções corretas?
- [ ] **Formulário:** Validação funciona? (tente com nome curto)
- [ ] **WhatsApp:** Clique no botão flutuante (deve abrir WhatsApp)
- [ ] **Responsividade:** Teste no mobile (Firefox DevTools F12)
- [ ] **Animações:** Scroll a página e veja elementos aparecerem

---

## 📊 DIMENSÕES RECOMENDADAS DE IMAGENS

| Elemento | Dimensão | Formato |
|----------|----------|---------|
| Logo Header | 70px altura | PNG transparente |
| Logo Hero | 450px max | PNG ou SVG |
| Portfolio Items | 1200x1600px min | JPG comprimido |
| Depoimento Avatar | 100x100px | JPG redondo |
| Wallpaper | 1920x1080px | JPG otimizado |

---

## 🚀 DEPLOY (PUBLICAÇÃO)

### Opções Recomendadas:

#### 1. **Netlify** (Recomendado - Fácil)
```bash
1. Arraste a pasta para netlify.com
2. Pronto! Site online em minutos
```

#### 2. **Vercel** (Alternativa)
```bash
1. Clone a pasta via Git
2. Conecte a Vercel
3. Deploy automático
```

#### 3. **Hosting Compartilhado** (GoDaddy, Hostgator, etc)
```bash
1. Envie os arquivos via FTP
2. Acesse via seu domínio
```

#### 4. **Seu Próprio Servidor**
```bash
1. Instale Node.js
2. Use um simples HTTP server:
   npx http-server
3. Configure reverse proxy (Nginx)
```

---

## 🔐 SEGURANÇA

### Antes de Publicar:

- [ ] Remova números de telefone testes
- [ ] Não exponha dados sensíveis no código
- [ ] Use HTTPS (todos hostes modernos incluem)
- [ ] Valide formulários no backend (próximo passo)

---

## 📈 ANALYTICS (Proximos Passos)

### Adicionar Google Analytics

**Adicione no `<head>` do index.html:**

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASURE_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASURE_ID');
</script>
```

Substitua `GA_MEASURE_ID` pelo seu ID do Google Analytics.

---

## 🎯 OTIMIZAÇÕES FUTURAS

### SEO Avançadas:
- [ ] Adicionar Schema.org para Rich Snippets
- [ ] Otimizar Open Graph para redes sociais
- [ ] Criar sitemap.xml
- [ ] Enviar para Google Search Console

### Performance:
- [ ] Minificar CSS e JavaScript
- [ ] Otimizar imagens com ImageMin
- [ ] Usar CDN para imagens
- [ ] Cache de navegador

### Conversão:
- [ ] A/B testes de botões
- [ ] Heat maps (Hotjar)
- [ ] Testes de velocidade (PageSpeed)
- [ ] Integração com CRM (Pipedrive, RD Station)

---

## ❓ PERGUNTAS FREQUENTES

**P: Como adiciono mais serviços?**
R: Duplique um `.card` na seção `#servicos` no HTML

**P: Como mudo a cor principal?**
R: Altere `--neon-green` no `style.css` (variável CSS)

**P: Posso usar em mobile app?**
R: Sim, pode ser convertido para app com Capacitor ou React Native

**P: Como faço para receber os formulários por email?**
R: Integre com Formspree, EmailJS ou seu backend próprio

**P: Qual o tempo de carregamento esperado?**
R: <2 segundos (depende do servidor e conexão)

---

## 📞 SUPORTE

Para dúvidas técnicas, verifique:
1. Documentação no arquivo MELHORIAS.md
2. Comentários no código (// comentários)
3. Documentação oficial: MDN Web Docs

---

## ✨ Parabéns!

Seu site profissional está pronto para converter visitas em clientes reais! 🚀

**Dica:** Comece com o tráfego pago em Google Ads ou Facebook Ads e acompanhe as conversões com o Analytics!

