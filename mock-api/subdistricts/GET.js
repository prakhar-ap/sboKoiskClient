module.exports = function (request, response) {
    let targetFileName = 'GET.json';
    if (request.query.searchTerm || request.query.page) {
        targetFileName = 'GET_searchTerm.json';
    }
    response.sendFile(targetFileName, {root: __dirname});
}
