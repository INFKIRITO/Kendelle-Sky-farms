const mongodb = require('mongodb');
const db = require('../data/database');


class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;
        this.description = productData.description;
        this.image = productData.image;
        this.imagePath = `product-data/images/${productData.image}`;
        this.imageUrl = `/products/assets/images/${productData.image}`;
        if(productData._id) {
        this.id = productData._id.toString();
        }
    }

    static async findById(productId){
        let prodId;
        try{
          prodId = new mongodb.ObjectId(productId);

        }catch(error){
            error.code = 404;
            throw error;

        }
        
        const product = await db.getDb().collections('products').findOne({_id: prodId});

        if(!product) {
            const error = new Error('could not find product with provided id.');
            error.code = 404;
            throw error;
        }

        return productId;
    }
    
    static async findAll() {
        const products = await db.getDb().collection('products').find().toArray();

        return products.map(function (productDocument) {
            return new Product(productDocument);

        });
    }

    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image,
            imagePath: this.imagePath,
        };
        await db.getDb().collection('products').insertOne(productData);


    }
}

module.exports = Product;