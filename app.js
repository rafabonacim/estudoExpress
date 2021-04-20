const express = require('express');
const app = express();

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

//listen é para escutar o servidor
app.listen(3000,()=> {
    console.log('Servidor rodado!!!!!')
})