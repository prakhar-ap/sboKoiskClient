const GET = {
    id: '1',
    name: 'Candidate 0',
    mobile: '9578422210',
    pincode: '302004',
    bankName: 'SBI'
};
const candidates = [];

(function () {
    for(let i = 0;i<20;i++ ) {
        candidates.push(
            {
                ...GET,
                id: i,
                name: 'Candidate' + i,
                bankName: i % 2 === 0 ? 'BOB' : 'SBI',
                state: i % 3 === 0 ? 'Rajasthan' : 'Gujrat',
                district: i % 4 === 0 ? 'Jaipur' : 'Ahemdabad',
                subDistrict: i % 2 === 0 ? 'Sanganer' : 'Bisalpur',
                pincode: i % 3 === 0 ? '302007' : '302004',
                detailId: i % 3 === 0 ? '546455' : '767564'
            },
        );
    }
})();


module.exports = (req, res) => {
    res.status(200).json({
        candidates
    })
}
