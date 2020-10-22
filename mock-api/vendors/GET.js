const vendor = {
    id: '1',
    name: 'Vendor 0',
    mobile: '9578422210',
    pincode: '302004',
    bankName: 'SBI'
};

const vendors = [];
(function () {
    for(let i = 0;i<20;i++ ) {
        vendors.push(
            {
                ...vendor,
                id: i,
                name: 'Vendor' + i,
                bankName: i % 2 === 0 ? 'BOB' : 'SBI',
                detailId: i % 3 === 0 ? '546455' : '767564'
            },
        );
    }
})();


module.exports = (req, res) => {
    res.status(200).json({
        vendors
    })
}
