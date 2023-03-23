const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//config ejs
app.use(express.static('public'));
app.set('view engine', 'ejs');

//rota de acesso ao início da página
app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/calcado', (req, res)=>{
    res.render('calcado/index');
});

//rota axios para conexão com a api
app.get('/listagemCalcados', (req, res)=>{
   
    const urlListarCalcado = 'http://localhost:3000/listarCalcados';

    axios.get(urlListarCalcado)
    .then((response)=>{

        console.log(response.data);
        let calcados = response.data;
        res.render('calcado/listagemCalcado', {calcados});

    });
});

app.listen(3001, ()=>{
    console.log("SERVIDOR FRONTEND RODANDO EM - http://localhost:3001");
});