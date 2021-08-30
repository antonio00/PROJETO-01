const express = require('express')
const app = express()

app.use(express.json())
const port = 3000


const jogos =[
    
]

// GET / - HOME- BUSCA ROTA HOME
app.get('/', (req, res) => {
    res.status(200).send('LISTA DE JOGOS')
  })

// GET / jogos - RETONAR A LISTA DE JOGOS
app.get('/jogos', (req, res) => {
    res.send({listaDeJogos:jogos })
})

// GET / JOGOS{id} - RETONAR A LISTA DE JOGOS PELO ID
app.get('/jogos/:id', (req, res) =>{
    const id = +req.params.id;
    const jogo = jogos.find(jogo => jogo.id === id)

    !jogo ? res.status(404).send({error:'Jogo não existe'}): res.json({jogo})

    res.send(jogo)
})

// POST - /JOGOS - CRIAR/ADD UM NOVO JOGO
app.post('/jogos', (req, res)=>{
    const jogo = req.body;
    
    if(!jogo || !jogo.nome || !jogo.imagemUrl)
        res.status(400).send({error: "Não foi possível adicionar jogo"})
    
    const ultimoJogo = jogos[jogos.length -1]

    if (jogos.length){
        jogo.id = ultimoJogo.id + 1
        jogos.push(jogo)
    }else {
        jogo.id = 1;
        jogos.push(jogo)
    }
        
    
    res.status(201).send({ jogo})
    
})
//PUT - JOGOS{ID} EDITAR JOGO PELA ID

app.put('/jogos/:id', (req, res) => {
    const id = +req.params.id;
// FindIndex retorna a posição do objeto dentro do array(jogos), não existindo
// retorna -1
    const jogoIndex = jogos.findIndex(jogo => jogo.id === id)

// validação para verificar existencia dentro do array.
    if (jogoIndex < 0){
        res.status(404).send({erro: "Jogo não encontrado."})
        return;
    }
    
    const novoJogo = req.body;
    if(!novoJogo || !novoJogo.nome || !novoJogo.imagemUrl) {
        res.status(400).send({error: "Não foi possível fazer alteração"})
        return;
    }

// busca o jogo cadastrado no array pelo id, e insere o objeto inteiro
// dentro da const jogo.
    const jogo = jogos.find(jogo => jogo.id === id)
    novoJogo.id = jogo.id
    jogos[jogoIndex] = novoJogo   
    res.send({message: "Jogo alterado com sucesso"});
})


// DELETE - JOGOS{ID} - DELETAR PELA ID
app.delete('/jogos/:id', (req, res) => {
    const id = +req.params.id;
    
    const jogoIndex = jogos.findIndex(jogo => jogo.id === id)
    if (jogoIndex < 0){
        res.status(404).send({erro: "Jogo não encontrado."})
        return;
    }
    
    jogos.splice(jogoIndex, 1);

    
    res.send({message:'Jogo deletado com sucesso'})
});








app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)

})
