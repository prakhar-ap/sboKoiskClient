module.exports = function (request, response) {
    let targetFileName = 'GET.json';
    // Check is a type parameter exist
    if (request.query.pincode) {
        targetFileName = 'GET_pincode.json';
    }
    if (request.query.subDistrict) {
        targetFileName = 'GET_subdistrict.json';
    }
    // Respond with targetFileName
    response.sendFile(targetFileName, {root: __dirname});
}