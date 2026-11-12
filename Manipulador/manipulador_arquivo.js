// Imports

import fs from "node:fs/promises";
import path from "node:path";
import { json } from "node:stream/consumers";
import { fileURLToPath } from "node:url";

// Não importa onde será chamado. Sempre vai conseguir encontrar o arquivo

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const caminho_dados = path.join(__dirname, "..", "BD", "tabela_atendimentos.json");

// Lógica
// Listar todos - ler arquivo local
export async function listarTodos() {
    
    const conteudo = await fs.readFile(caminho_dados, "utf-8");
    return JSON.parse(conteudo);
}

// Salvar todos - escrever arquivo local
export async function salvarTodos(cadastros) {
    
    await fs.writeFile(
        caminho_dados, 
        JSON.stringify(cadastros, null, 2),
        "utf-8"
    );
}

// Funções Auxiliares