const db = require('../data/database');


class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;
        this.description = productData.discription;
        this.image = productData.image;
        this.imagePath = `product-data/images/${productData.image}`;
        this.imageUrl = `/products/assets./images/${productData.image}`;
    }

    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image
        };
        await db.getDb().collection('products').insertOne(productData);


    }
}

module.exports = Product;