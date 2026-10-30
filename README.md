# Vyracord

Aplicativo privado de chat e chamadas para amigos. Node.js + Socket.IO + WebRTC.

## Rodar no computador
1. Instale Node.js LTS.
2. Extraia a pasta.
3. Abra o terminal dentro da pasta do projeto.
4. Execute `npm install`.
5. 6. Execute `npm start`.
7. Abra http://localhost:3000

## Hospedar no Render
1. Envie todos os arquivos para um repositório GitHub.
2. No Render, escolha **New > Web Service** e conecte o repositório.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Em Environment, crie `ACCESS_PASSWORD` com uma senha forte que só seus amigos recebam. Crie também `SESSION_SECRET` com uma chave aleatória longa.
6. Faça deploy e compartilhe o endereço apenas com seus amigos.

## Privacidade
O app exige a senha `ACCESS_PASSWORD` para obter uma sessão. Compartilhe-a apenas com pessoas de confiança. Use também códigos de sala diferentes para separar grupos. Não publique a senha no repositório.

## Chamadas
Áudio, câmera e compartilhamento usam WebRTC no navegador. O navegador exige HTTPS para câmera/microfone/tela fora de localhost; o Render fornece HTTPS. A configuração inicial usa servidores STUN públicos. Algumas redes/NATs precisam de um servidor TURN para chamadas confiáveis; sem TURN, certos amigos podem não conseguir se conectar entre redes diferentes.

## Limites desta versão
- O chat guarda as últimas 100 mensagens de cada sala apenas enquanto o servidor está ligado.
- A chamada usa conexão direta entre participantes (mesh), adequada a grupos pequenos.
- A senha é compartilhada entre os amigos; não há contas individuais, recuperação de senha ou lista de permissões por pessoa.
- Use uma senha forte e não compartilhe o link/senha publicamente.
