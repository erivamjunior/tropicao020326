# Gestão de Obras com AWS Amplify (simples)

Sistema fullstack mínimo para cadastro de projetos de obras de infraestrutura com:
- **Login real** via Amazon Cognito (Amplify Auth)
- **Backend real** via AWS AppSync + DynamoDB (Amplify Data)
- **Frontend real** em Next.js

## O que já está pronto
- Cadastro de usuário e login por e-mail.
- CRUD de projetos com os campos:
  - Nome do projeto
  - Secretaria executora
  - Número do contrato
  - Valor do contrato
  - Data do contrato
- Dados persistidos em banco (DynamoDB) via Amplify.

## Preciso rodar localmente ou posso ir direto para o Deploy no Amplify?
Você **pode pular** a execução local e ir direto para deploy no AWS Amplify Hosting.

Use localmente apenas se quiser validar antes do merge.

### Fluxo mais curto (direto para deploy)
1. Suba este repositório no GitHub.
2. No AWS Amplify, conecte o repositório.
3. Faça merge na branch principal.
4. O Amplify executa o build e provisiona/atualiza Auth + Data + Frontend.

## Como rodar localmente (opcional)
1. Instale dependências:
   ```bash
   npm install
   ```
2. Faça deploy do backend Amplify em sandbox:
   ```bash
   npx ampx sandbox
   ```
   Isso gera/atualiza o arquivo `amplify_outputs.json` para o seu ambiente.
3. Em outro terminal, rode o frontend:
   ```bash
   npm run dev
   ```
4. Abra `http://localhost:3000`.

## Sobre `amplify_outputs.json` (o que significa "não deve ser commitado")
Esse arquivo contém configurações **específicas do ambiente AWS** (IDs/URLs de recursos criados naquele ambiente).

Quando dizemos "não deve ser commitado", significa:
- evitar versionar configurações de ambiente pessoal/local;
- evitar sobrescrever configurações de outro ambiente por engano;
- cada ambiente (dev/homolog/prod) pode gerar um arquivo diferente.

> Neste repositório ele foi incluído como placeholder inicial para facilitar o bootstrap.
> Em uso real de equipe, o recomendado é cada ambiente gerar o próprio `amplify_outputs.json` no pipeline/ambiente de execução.


## Erro comum no Amplify: `npm ci` sem `package-lock.json`
Se o build falhar com erro do tipo:
- `The npm ci command can only install with an existing package-lock.json`

Use `npm install` na fase de build (backend) do Amplify, como no `amplify.yml` deste repositório.

Motivo: `npm ci` exige lockfile versionado. Sem `package-lock.json`, o build quebra.
