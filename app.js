const express = require('express');
const app = express();

const {uuid} =require('uuidv4');

//indica para o express que usaremos os dados em JSON
app.use(express.json());

const usuarios = [{nome: 'Rafaela',sobrenome:'Bonacim'}];

//body: para mandar as informações de formulario via  POST
//params:parâmetros vindos na rota da URL(mandar informação na url)
//query string: tudo o que vem depois do ponto de interrrogação(mandar informação de paginação, query que o usuario mandou ou informação de marketing)
//header: cabeçalho da requisição

// http:localhost:3000/inicio
app.get("/inicio",(req,res)=> { 
    return res.send('Olá mundo');
});
// http:localhost:3000/usuarios
app.get("/usuarios",(req,res)=>{
    return res.json(usuarios);
});
// trazer apenas um usuario:
// http:localhost:3000/usuarios/:id
app.get("/usuarios/:id",(req,res)=>{
    const {id}= req.params;
    
    const usuarioIndex = usuarios.findIndex(usuario => usuario.id == id);

    if(usuarioIndex< 0){
        return res.status(400).json({error:'Usuário não encontrado'});
    }
    return res.json({usuario: usuarios[usuarioIndex]});
});

// http:localhost:3000/usuarios
app.post("/usuarios",(req,res)=>{
    const {nome, sobrenome} = req.body;
    console.log(nome);
    console.log(sobrenome);
    const usuario = {id: uuid(),nome,sobrenome};

    usuarios.push(usuario);
    return res.json(usuario);
});
// http:localhost:3000/usuarios/rafa
// app.put("/usuarios/:nome",(req,res)=>{
//     const {nome}= req.params;
//     const {sobrenome} = req.body;
//     usuarios.filter( usuario => usuario.nome == nome).forEach( usuario => usuario.sobrenome = sobrenome);
//     return res.json({nome,sobrenome});
//})

// http:localhost:3000/usuarios/id
app.put("/usuarios/:id",(req,res)=>{
    const {id}= req.params;
    const {nome, sobrenome} = req.body;

    const usuarioIndex = usuarios.findIndex(usuario => usuario.id == id);

    if(usuarioIndex< 0){
        return res.status(400).json({error:'Usuário não encontrado'});
    }
    const alteracaoDeNome = {
        id,
        nome,
        sobrenome
    };
    usuarios[usuarioIndex]=alteracaoDeNome;
    return res.json(alteracaoDeNome);
});

// http:localhost:3000/usuarios/id
app.delete("/usuarios/:id",(req,res)=>{
    const {id}= req.params;
    console.log(id);

    const usuarioIndex = usuarios.findIndex(usuario => usuario.id == id);

    if(usuarioIndex< 0){
        return res.status(400).json({error:'Usuário não encontrado'});
    }
    usuarios.splice(usuarioIndex,1)// o primeiro usuario é o usuarioindex, onde starta e quantos eu quero apagar? 1

    res.send("Deletado com sucesso");
    return res.status(204).send();
});

//listen é para escutar o servidor
app.listen(3000,()=> {
    console.log('Servidor rodando!!!!!')
});