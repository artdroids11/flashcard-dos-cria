# Como adicionar suas fotos e vídeos

## 📸 Fotos do Processo

A pasta `fotos/` já está configurada para receber suas imagens. Basta seguir estes passos:

### Passo 1: Prepare suas fotos
- Tire fotos do seu processo de criação do protótipo
- Use o formato **JPG** (recomendado)
- Tamanho recomendado: 640×480px ou maior (a página redimensiona automaticamente)

### Passo 2: Renomeie com os nomes corretos
Coloque os arquivos **exatamente com estes nomes** na pasta `fotos/`:

```
fotos/
├── processo-1.jpg    (Foto 1 - Primeira etapa)
├── processo-2.jpg    (Foto 2 - Segunda etapa)
├── processo-3.jpg    (Foto 3 - Terceira etapa)
├── processo-4.jpg    (Foto 4 - Quarta etapa)
├── processo-5.jpg    (Foto 5 - Quinta etapa)
├── processo-6.jpg    (Foto 6 - Sexta etapa)
└── video-processo.mp4 (Opcional - Vídeo do processo)
```

### Passo 3: Pronto!
Assim que você adicionar um arquivo, ele aparece automaticamente na página, **sem precisar mexer no código**.

---

## 🎥 Vídeo do Processo

O site suporta um vídeo opcional:

- Nome do arquivo: `video-processo.mp4`
- Formato: MP4 (H.264)
- O vídeo aparecerá com controles de play/pause
- Suporta até 100MB (recomendado menor para web)

---

## 🖼️ Como a Galeria Funciona

- **Hover**: Ao passar o mouse, a foto levanta um pouco (efeito visual)
- **Clique**: Amplia a foto em tela cheia (lightbox)
- **ESC**: Fecha a imagem ampliada
- **Mobile**: Toque para ampliar, toque de novo ou swipe para fechar

---

## 📝 Descrições das Fotos

Cada foto tem uma descrição que aparece abaixo. Você pode editar direto no arquivo `index.html` na seção de galeria. Busque por:

```html
<figcaption>Imagem 01 — Detalhe do componente em montagem.</figcaption>
```

---

## ✨ Dicas Importantes

✓ **Fotos em paisagem** (horizontal) ficam melhor
✓ **Boa iluminação** deixa os detalhes visíveis  
✓ **Contraste** ajuda a mostrar o trabalho feito
✓ **Limpe o fundo** se possível
✓ **Várias ângulos** de um mesmo componente é válido

---

## 🔧 Troubleshooting

❌ **As fotos não aparecem?**
- Verifique se o nome do arquivo está **exatamente correto**
- Confirme que o arquivo está na pasta `fotos/`
- Tente atualizar a página (Ctrl+F5)

❌ **A foto aparece pequena ou distorcida?**
- A página redimensiona automaticamente
- Imagens muito pequenas ficarão pixeladas
- Recomendado mínimo 640×480px

❌ **O vídeo não funciona?**
- Verifique se o arquivo é MP4 válido
- Alguns navegadores podem não suportar certos codecs
- Teste em outro navegador

---

Qualquer dúvida, veja o arquivo `fotos/LEIA-ME.txt` para instruções simples!
