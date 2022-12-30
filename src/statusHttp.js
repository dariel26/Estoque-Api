module.exports = {
    ok:{status: 200, message: {error: false, message: 'Ok'}},               //Sucesso
    created:{status: 201, message: {error: false, message: 'Created'}},     //Sucesso e novo recurso criado
    noContent:{status: 204, message: {error: false, message: 'No Content'}},//Não há conteudo para a solicitação    
    badRequest:{status: 400, message: {error: true, message: 'Bad Request'}},   //Requisição com sintaxe inválida
    unauthorized:{status: 401, message: {error: true, message: 'Unauthorized'}},//Cliente deve se autenticar para obter resposta
    forbidden:{status: 403, message: {error: true, message: 'Forbidden'}},      //O cliente embora autenticado não tem direito de acessar tal informação
    notFound:{status: 404, message: {error: true, message: 'Not Found'}},       //O servidor não encontrou tal informação
    methodNotAllowed:{status: 405, message: {error: true, message: 'Method Not Allowed'}},      //O metodo solicitado foi desativado
    notAcceptable:{status: 406, message: {error: true, message: 'Not Acceptable'}},             //Após a verificação não é encontrado nenhum conteudo seguindo os critérios fornecidos
    internalServerError:{status: 500, message: {error: true, message: 'Internal Server Error'}},//O servidor encontrou uma situação com a qual não sabe lidar
    serviceUnavailable:{status: 503, message: {error: true, message: 'Service Unvailable'}},    //O servidor não está pronto para manipular a requisição (sobrecarregado ou em manutenção)
}