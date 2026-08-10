# 👁️ ASTIGMATISMO - Projeto Educativo

Um site educativo interativo sobre astigmatismo, desenvolvido com foco em ciência, programação e robótica.

## 🎯 Sobre o Projeto

Este material explora:
- **O que é astigmatismo** — erro refrativo e como afeta a visão
- **Simulador visual** — experimente como o mundo pode parecer
- **Robótica e diagnóstico** — como a automação pode ajudar na medicina
- **Timeline histórica** — da medição manual à IA
- **Flashcards interativos** — teste seu conhecimento
- **Galeria de fotos** — register do protótipo desenvolvido

## ✨ Funcionalidades

### 📱 Navegação
- Menu sticky no topo para acesso rápido
- Menu mobile responsivo
- Botões A+ / A− para ajustar tamanho da fonte

### 🎮 Simulador Interativo
- Controle deslizante para ajustar nível de distorção
- Visualização em tempo real do efeito do astigmatismo
- Demonstração educativa com SVG dinâmico

### 📸 Galeria de Fotos
- Grade responsiva com 6 fotos do processo
- Lightbox para ampliar fotos
- Vídeo opcional integrado
- Descrições editáveis para cada imagem

### 🔄 Timeline Interativa
- 4 pontos na história: Passado → Presente → Próximos anos → Futuro
- Conteúdo dinâmico ao clicar em cada etapa
- Visualização clara da evolução tecnológica

### 🎯 Flashcards
- 6 flashcards com perguntas sobre o tema
- Clique para virar e ver a resposta
- Suporte a teclado (Enter/Espaço)
- Categorias: Mitos, Curiosidades, Tecnologia, Futuro

### 📊 Diagramas e Comparações
- Comparação visual: visão normal vs. com astigmatismo
- Diagrama de Venn: Tecnociência + Programação + Robótica
- SVG interativo com filtros visuais

## 🎨 Design e Responsividade

- **Mobile-first**: Funciona perfeitamente em celulares
- **Temas de cores**: Paleta harmônica (verde, vermelho, tons de terra)
- **Acessibilidade**: ARIA labels, skip links, suporte a teclado
- **Performance**: CSS otimizado, carregamento lazy de imagens
- **Tipografia**: Fontes do Google Fonts para melhor legibilidade

## 🔧 Personalizações

### Mudar cores
Edite as variáveis CSS no início de `style.css`:
```css
:root {
  --primary-dark: #1f4b4b;
  --accent-red: #8b3a3a;
  --primary-light: #f6f2ea;
  /* ... */
}
```

### Editar conteúdo
Todos os textos estão no `index.html`. Procure por:
- Títulos em `<h1>`, `<h2>`, etc.
- Descrições em `<p>`
- Flashcards no section `#flashcards`
- Timeline data em `script.js`

### Adicionar mais flashcards
Copie o bloco de flashcard e altere o número, pergunta e resposta:
```html
<button class="flashcard" type="button">
  <span class="card-inner">
    <span class="front">
      <!-- conteúdo frontal -->
    </span>
    <span class="back">
      <!-- resposta -->
    </span>
  </span>
</button>
```

## 📷 Adicionando Fotos e Vídeos

Veja a documentação completa em **[ADICIONAR_FOTOS.md](ADICIONAR_FOTOS.md)**

TL;DR:
1. Tire suas fotos do protótipo
2. Renomeie como `processo-1.jpg`, `processo-2.jpg`, etc.
3. Coloque na pasta `fotos/`
4. Pronto! Aparecem automaticamente no site

## 🌐 Compatibilidade

Testado em:
- ✅ Chrome/Edge (versão 90+)
- ✅ Firefox (versão 88+)
- ✅ Safari (versão 14+)
- ✅ Mobile (iOS Safari, Android Chrome)

## 📝 Notas Importantes

- Este é um **material educativo**
- Sempre consulte um oftalmologista para diagnóstico real
- As simulações são **representações aproximadas** do astigmatismo
- Cada pessoa experimenta diferentes graus de visão distorcida

## 🤝 Créditos

Projeto escolar desenvolvido com foco em:
- Educação em ciência da visão
- Aplicações práticas de robótica
- Prototipagem e design thinking

---

**Dúvidas?** Veja:
- [ADICIONAR_FOTOS.md](ADICIONAR_FOTOS.md) — Como adicionar mídia
- [fotos/LEIA-ME.txt](fotos/LEIA-ME.txt) — Instruções rápidas
- Código comentado em `script.js` e `style.css`
