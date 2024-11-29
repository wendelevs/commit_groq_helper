import Groq from "groq-sdk";
import { execSync } from "child_process";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Caminho absoluto do diretório do script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega o .env do diretório do script
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Inicializa a chave da API
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.error(
    "Erro: A chave de API da Groq não está configurada. Verifique o arquivo .env no diretório do script."
  );
  process.exit(1);
}

// Inicializa o cliente da API Groq
const groq = new Groq({ apiKey: GROQ_API_KEY });

// Resto do script...
(async function main() {
  try {
    const gitDiff = execSync("git diff", { encoding: "utf-8" });

    if (!gitDiff) {
      console.log("Nenhuma alteração detectada.");
      return;
    }

    const prompt = `Generate a precise and structured Git commit message in English, strictly adhering to the Conventional Commits format. The message should:

  1 - Begin with a concise header in the format: <type>(<scope>): <short summary> where:
   - <type> indicates the nature of the change (e.g., feat, fix, chore, docs, style, refactor, perf, test).
   - <scope> specifies the area of the codebase impacted (e.g., a feature, module, or file).

  2. Provide a detailed body (if necessary) that includes:
   - A clear explanation of what was changed, why it was changed, and how it was implemented.
   - Mention specific changes such as added, updated, or removed files, functions, methods, or logic.
   - Highlight any significant refactoring, reorganizations, or optimizations.

  3. Include a BREAKING CHANGE section if the commit introduces changes that are incompatible with previous versions, detailing what was changed and any required actions (e.g., migrations or configuration updates).

  4. Use bullet points to list file-level or functionality-level changes for better clarity.

  5. Avoid unnecessary technical jargon while ensuring clarity for developers reviewing the commit history.

  The final commit message should be professional, concise, and easy to understand while providing enough context for a clear understanding of the change's impact.
 \n${gitDiff}`;
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-70b-versatile",
    });

    console.log("Sugestão de mensagem de commit:");
    console.log(chatCompletion.choices[0]?.message?.content || "");
  } catch (error) {
    console.error("Erro ao gerar mensagem de commit:", error.message);
  }
})();
