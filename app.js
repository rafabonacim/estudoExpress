const express = require('express');
const app = express();

//indica para o express que usaremos os dados em JSON
app.use(express.json());

let usuarios = [
    {nome: "Rafa",sobrenome:"Bonacim"}
];
// http:localhost:3000/inicio
app.get("/inicio",(req,res)=> {
    return res.send('Olá mundo');
})
// http:localhost:3000/usuarios
app.get("/usuarios",(req,res)=>{
    return res.json(usuarios);
})
// http:localhost:3000/usuarios
app.post("/usuarios",(req,res)=>{
    const {nome, sobrenome} = req.body;

    usuarios.push({nome,sobrenome});
    return res.json({nome,sobrenome});

})

//listen é para escutar o servidor
app.listen(3000,()=> {
    console.log('Servidor rodado!!!!!')
})