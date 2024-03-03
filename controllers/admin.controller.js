function getProducts(req, res) {
    res.render('admin/products/all-products');
}

function getNewProduct(req, res) {
    res.render('admin/products/new-products');
}


function createNewProduct(req, res) {
    console.log(req.body);
    console.log(req.file);

    console.log('Redirecting to /admin/products');

    res.redirect('/admin/products');
}

module.exports = {
    getProducts,
    getNewProduct,
    createNewProduct,
}