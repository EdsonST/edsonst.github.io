# Site da ES Studio

Site institucional estático (só HTML, CSS e um pouco de JavaScript). Não precisa de servidor, banco de dados nem build.

## Estrutura

```
index.html                      Página inicial do estúdio
extratus/index.html             Página do Extratus
extratus/privacidade.html       Política de privacidade (da pasta docs do Extratus)
extratus/termos.html            Termos de uso (da pasta docs do Extratus)
debug-detective/index.html      Página do DEBUG Detective
debug-detective/privacidade.html  Política preliminar do jogo
app-ads.txt                     Arquivo exigido pelo AdMob (preencher depois)
404.html, robots.txt
assets/                         CSS, imagens e as cenas em pixel art
```

## Antes de publicar

1. **E-mail:** o contato do site é `es.suporte.app@gmail.com`. Para trocar, procure esse endereço em todos os arquivos.
2. **Domínio:** se quiser um domínio próprio, confira no Registro.br se `esstudio.com.br` está livre (ou use outro). Até lá, o site funciona no endereço gratuito do GitHub Pages.
3. **app-ads.txt:** quando criar a conta AdMob, cole a linha que o AdMob mostrar.

## Hospedar de graça no GitHub Pages

1. Crie um repositório **público** chamado `EdsonST.github.io` (exatamente seu usuário + `.github.io`).
   - Pode ser público: o site não tem nenhuma senha nem código dos apps.
   - Usar esse nome deixa o site na raiz (`https://edsonst.github.io/`), que é onde o AdMob procura o `app-ads.txt`.
2. Envie todos os arquivos desta pasta para o repositório (pelo site: Add file → Upload files).
3. Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.
4. Em alguns minutos o site abre em `https://edsonst.github.io/`.

### Domínio próprio (quando registrar)

1. Em **Settings → Pages → Custom domain**, digite `esstudio.com.br` (ou o domínio que registrar).
2. No painel do Registro.br, aponte o DNS para o GitHub Pages, conforme a documentação do GitHub Pages sobre domínios personalizados.
3. Marque **Enforce HTTPS**.

Alternativas também gratuitas: Cloudflare Pages ou Netlify (arraste a pasta no painel).

## Na Play Store

Use estes endereços no cadastro de cada app:

- Site: página do app (`/extratus/` ou `/debug-detective/`)
- Política de privacidade: `/extratus/privacidade.html` e `/debug-detective/privacidade.html`
- Site do desenvolvedor (para o app-ads.txt): a raiz do domínio
