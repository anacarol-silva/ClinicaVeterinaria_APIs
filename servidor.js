// ==================
// Imports 
// ==================
import express from "express";
import { listarTodos, salvarTodos } from "./Manipulador/manipulador_arquivo.js";

const app = express(); 
const port = 3000;
app.use(express.json()); // middleware

// ==================
// Lógica 
// ==================
app.get("/", (req, res) => {
    res.send("Bem-vindo à API da nossa Clínica Veterinária");
})

app.get("/atendimentos", async (req, res) => {
    try {
        const cadastros = await listarTodos();
        return res.status(200).json(cadastros);
    }
    catch(error) {
        console.log("Erro ao listar atendimentos", error);
        return res.status(500).json({error: "Não foi passível ler os cadastros"});
    }
})

// Delete / atendimento :id
app.delete("/atendimentos/:id", async (req, res) => {
    try{
        const id = Number(req.params.id);
        const cadastros = await listarTodos();

        const atend_atual = cadastros.filter((atendimento) => atendimento.id !== id);

        if(atend_atual.length === cadastros.length){
            return res.status(404).json({ erro: "Atendimento não deletado." });
        }

        await salvarTodos(atend_atual);
        return res.status(200).json({mensagem: "Atendimento excluído com sucesso!"});

    }
    catch (error) {
        console.log("Erro ao deletar cadastro", error);
        return res.status(500).json({ error: "Erro ao deletar atendimento."});
    }
});

app.post("/atendimentoPost", async (req, res) => {
    try {
        // dados do novo cadastro 
        const 
        {
            id, 
            pet, 
            raca, 
            idade, 
            tutor, 
            diaAtendimento, 
            valorGasto} = req.body;

        // vaidação dos dados
        if(!id || !pet || !raca || !idade || !tutor || !diaAtendimento || !valorGasto){
            return res.status(400).json({erro: "Todos os campos são obrigatórios"});
        }

        const novoCadastro = {
            id: Number(id),
            pet: pet,
            raca: raca,
            idade: Number(idade),
            tutor: tutor,
            diaAtendimento: diaAtendimento,
            valorGasto: Number(valorGasto)
        };

        const cadastros = await listarTodos();
            cadastros.push(novoCadastro);

        await salvarTodos(cadastros);

        return res.status(201).json({mensagem: "Cadastro realizado com sucesso!"});
    }
    catch(error){
        console.log("Erro ao salvar cadastros", error);
        return res.status(500).json({error: "Não foi passível salvar o cadastro"});
    }
});

app.put("/atendimentos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const cadastros = await listarTodos();

        const atenimentoExistente = cadastros.find((atendimento) => atendimento.id === id);

        if (!atenimentoExistente) {
            return res.status(404).json({erro: "Atendimento não encontrado"});
        }

        const 
        { 
            pet, 
            raca, 
            idade, 
            tutor, 
            diaAtendimento, 
            valorGasto} = req.body;
        
        if(!pet || !raca || !idade || !tutor || !diaAtendimento || !valorGasto){
            return res.status(400).json({erro: "Todos os campos são obrigatórios"});
        }

        const atendimentoAtualizado = {
            id: Number(id),
            pet: pet,
            raca: raca,
            idade: Number(idade),
            tutor: tutor,
            diaAtendimento: diaAtendimento,
            valorGasto: Number(valorGasto)
        };

        const dadosAtualizados = cadastros.map((atendimento) => atendimento.id === id ? atendimentoAtualizado : atendimento);

        await salvarTodos(dadosAtualizados);
        return res.status(200).json({mensagem: "Atendimento atualizado com sucesso!"});

    }catch(error){
        console.log("Erro ao alterar o cadastro", error);
        return res.status(500).json({error: "Não foi passível alterar e salvar o cadastro"});
    }
});

app.use((req, res) => {
    res.status(404).json({erro: "Rota não encontrada"});
});


// ==================
// Funções Auxiliares
// ==================
app.listen(port, () => {
    console.log("Está rodando na porta", port);
});
