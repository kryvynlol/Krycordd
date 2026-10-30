# Vyracord — publicar no Render

Este projeto já está preparado para Render como **Web Service Node.js**.

## Publicar (passo a passo)

1. Extraia `vyracord_render.zip` no computador.
2. Crie um repositório no GitHub e envie **o conteúdo da pasta** para ele (package.json, server.js, render.yaml e pasta public).
3. Entre em https://render.com e escolha **New + → Blueprint** se quiser usar o `render.yaml`, ou **New + → Web Service**.
4. Conecte o repositório do GitHub.
5. Se escolher Web Service manualmente, use:
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Em **Environment Variables**, adicione:
   - `ACCESS_PASSWORD` = uma senha forte que você vai compartilhar somente com seus amigos.
   - `SESSION_SECRET` = uma chave aleatória longa e privada.
7. Clique em Deploy. Quando terminar, abra o endereço `https://...onrender.com`.

## Entrar com seus amigos

- Abra o endereço do Render.
- Cada pessoa escolhe um apelido e informa a senha `ACCESS_PASSWORD`.
- Compartilhe o mesmo código de sala com os amigos.
- Para câmera, microfone e compartilhar tela, permita o acesso do navegador.

## Observações importantes

- Render fornece HTTPS, necessário para câmera, microfone e compartilhamento de tela fora de `localhost`.
- A chamada usa WebRTC com STUN público. Algumas combinações de roteador/rede exigem um servidor TURN para conectar mídia; sem TURN, áudio/vídeo pode não funcionar em todas as redes.
- O projeto é mais adequado a grupos pequenos porque a mídia é enviada diretamente entre participantes.
- A senha é compartilhada por todos; esta versão ainda não tem convites individuais nem cadastro de contas.
- O histórico do chat fica apenas na memória do servidor e pode ser apagado quando o serviço reiniciar.
- No plano gratuito do Render, o serviço pode entrar em suspensão após inatividade e demorar um pouco para acordar.

## Rodar localmente

```bash
npm install
# PowerShell:
$env:ACCESS_PASSWORD="sua-senha"
npm start
```

Abra http://localhost:3000.
