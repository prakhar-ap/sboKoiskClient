module.exports = function (request, response) {
    let targetFileName = 'GET.json';
    // Check is a type parameter exist
    if (request.query.pincode) {
        // Generate a new target filename with that pincode parameter
        targetFileName = 'GET_pincode.json';
        // If file does not exist then respond with 404 header
        // if (!fs.accessSync(targetFileName)) {
        //     return response.status(404);
        // }
    }
    // Respond with targetFileName
    response.sendFile(targetFileName, {root: __dirname});
}