
# Commit Message Helper

Este projeto automatiza a criação de mensagens de commit baseadas em diffs do Git, utilizando a API da Groq para gerar mensagens concisas e informativas no formato **Conventional Commits**. O objetivo é garantir mensagens consistentes e bem estruturadas para melhorar a compreensão e o histórico do repositório.

---

## **Instalação**

### 1. Clone o repositório:
```bash
git clone https://github.com/wendelevs/commit_groq_helper.git
cd commit_groq_helper
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Configure o arquivo `.env`:
Crie um arquivo `.env` na raiz do projeto e adicione sua chave da API Groq:
```env
GROQ_API_KEY=sua-chave-aqui
```

---

## **Uso no projeto do script**

### Execute diretamente no terminal:
```bash
node index.js
```

Este comando:
1. Captura o diff das alterações do repositório atual usando `git diff`.
2. Envia o diff para a API da Groq com um prompt personalizado.
3. Retorna uma mensagem de commit bem estruturada no formato **Conventional Commits**.

---

## **Uso como script global em outros projetos**

### 1. Instale globalmente:
No diretório do script, execute:
```bash
npm install -g
```

### 2. Configure a variável de ambiente no projeto de destino:
Certifique-se de que o projeto onde o script será usado também tenha acesso à chave da API. Você pode fazer isso criando um arquivo `.env` no diretório do projeto de destino:
```env
GROQ_API_KEY=sua-chave-aqui
```

### 3. Execute o script:
No diretório do projeto onde deseja gerar uma mensagem de commit, execute:
```bash
commit_groq_helper
```

O script carregará o diff do repositório atual e retornará uma sugestão de mensagem de commit no formato correto.

---

## **Estrutura da Mensagem de Commit Gerada**
O script segue o padrão **Conventional Commits**:
```
<type>(<scope>): <short summary>

<detailed body>

BREAKING CHANGE: <details of breaking change>
```

### Exemplos:
#### Adição de uma nova funcionalidade:
```
feat(auth): add login functionality

- Implemented login form with email and password validation.
- Integrated backend API for authentication.
- Added unit tests for validation logic.
```

#### Correção de um bug:
```
fix(api): resolve null pointer exception in user service

- Fixed issue in `getUserDetails` method that caused null pointer exception when user ID was invalid.
- Added validation checks for user input.
```

---

## **Autoria**
Este script foi criado por **Wendel Evangelista**

---

## **Personalização**
O script utiliza o modelo `llama-3.1-70b-versatile` da Groq para gerar mensagens. Para personalizar o prompt ou ajustar o comportamento, edite o arquivo `index.js` e altere a variável `prompt` ou o modelo utilizado na API.

---

## **Contribuições**
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar PRs com melhorias.

---

Se precisar de ajuda ou encontrar problemas, entre em contato! 🚀
