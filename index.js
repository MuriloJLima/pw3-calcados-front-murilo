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

app.get('/editarCalcado/:id_calcado', (req, res)=>{

    let {id_calcado} = req.params;

    urlListarCalcadoPK = `http://localhost:3000/listarCalcadoPK/${id_calcado}`

    axios.get(urlListarCalcadoPK)
        .then((response)=>{
            let calcado = response.data;
            //console.log(categoria.data);
            res.render('calcado/editarCalcado.ejs', {calcado});

        });

});

app.post('/editarCalcado', (req, res)=>{

    //console.log(req.body);

    let urlEditar = 'http://localhost:3000/alterarCalcados';

    axios.put(urlEditar, req.body)
        .then((response)=>{
            res.redirect('/listagemCalcados');
        });

});

app.get('/excluirCalcado/:id_calcado', (req, res)=>{

    //console.log(req.body);

    let {id_calcado} = req.params

    let urlExcluir = `http://localhost:3000/excluirCalcados/${id_calcado}`;

    axios.delete(urlExcluir, req.body)
        .then((response)=>{
            res.redirect('/listagemCalcados');
        });

});



app.listen(3001, ()=>{
    console.log("SERVIDOR FRONTEND RODANDO EM - http://localhost:3001");
});