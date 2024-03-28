const Product = require('../models/product.model');

async function getProducts(req, res, next) {
    try{
    const products = await Product.findAll();
    res.render('admin/products/all-products', { products: products });
    }catch (error) {
        next(error);
        return;
    }

   
}

function getNewProduct(req, res) {
    res.render('admin/products/new-products');
}


async function createNewProduct(req, res, next) {
    const product = new Product({
        ...req.body,
        image: req.file.filename
    });
    try{
    await product.save();
    } catch(error) {
        next(error);
        return;
    }

    res.redirect('/admin/products');
}

async function getUpdateProduct(req, res, next) {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).send('Product not found');
        }
        
        res.render('admin/products/update-product', { product: product });
    } catch (error) {
        next(error);
    }
}

async function updateProducts (req, res) {
    const product = new Product({
        ...req.body,
        _id: req.params.id

    });

    if (req.file) {// using truthy and falshy
        //replace old image with new one
        product.replaceImage(req.file.filename);
    }
    try{
    await product.save();
    }catch(error) {
        next(error);
        return;
    }

    res.redirect('/admin/products');
}

async function deleteProduct (req, res, next) {
    let product;
    try{
         product = await Product.findById(req.params.id);
         await product.remove();
    } catch(error){
        return next(error);
    }
    
    res.json({message: 'Deleted product!'});
}

module.exports = {
    getProducts,
    getNewProduct,
    createNewProduct,
    getUpdateProduct,
    updateProducts,
    deleteProduct
}