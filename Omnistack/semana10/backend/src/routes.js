const { Router } = require("express");
const axios = require('axios');
const Dev = require('./models/dev');

const routes = Router();


//Metodos HTTP: get, post, put, delete
// get: metodo usado para receber alguma informacao. Ex: listar usuarios
// post: metodo usado para criar alguma informacao
// put: metodo usado para editar alguma informacao
// delete: metodo usado para deletar alguma informacao

//Tipos de Parametros:

    //1. Query Params: Utilizado quase sempre no metdodo get. São sempre incorporados a url da aplicacao, ficando visivel ao usuario.
    // req.query(Filtro, ordenaocao, paginacao, etc)

// app.get('/users', (request, response) => {
//     console.log(request.query)
//     return response.json({ message: 'Hello Omnistack'});
// });

    //2. Route Params: Utilizados nos metodos put e delete. 
    //request.params(Identificar um recurso na remocao ou alteracao)

// app.delete('/users/:id', (request, response) => {
//     console.log(request.params);
//     return response.json({ message: 'Hello Omnistack'});
// });

    //3.Body: Utilizado com post e put. 
    //request.body(Dados para criacao ou alteracao de um registro)

// routes.post('/users/', (request, response) => {
//     console.log(request.body);
//     return response.json({ message: 'Hello Omnistack'});
// });

routes.post('/devs', async (request, response) => {
    const { github_username, techs} = request.body;

    const AppResponse = await axios.get(`https://api.github.com/users/${github_username}`);

    let {name = login, bio, avatar_url} = AppResponse.data;
    
    const techsArray = techs.split(',').map(tech => tech.trim());

    const dev = await Dev.create({
        name,
        bio,
        avatar_url,
        techs: techsArray,
        github_username
    })
    return response.json(dev);
});

module.exports = routes;

    