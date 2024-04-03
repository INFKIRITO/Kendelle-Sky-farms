const db = require('../data/database');
const { ObjectId } = require('mongodb');


class Order{

    //status => pending,fullfiled, cancled
    constructor(cart, userData, status = 'pending', date, orderId) {
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date);
        if(this.date) {
        this.formattedDate = this.date.toLocaleDateString('en-us', {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        }
        this.id = orderId;
    }
    static transformOrderDocument(orderDoc) {
        return new Order(
            orderDoc.productData,
            orderDoc.userData,
            orderDoc.status,
            orderDoc.date,
            orderDoc._id
        );
    }

    static transformOrderDocuments(orderDocs){
        return orderDocs.map(this.transformOrderDocument);
    }

    static async findAll() {
        const orders = await db
        .getDb()
        .collection('orders')
        .find()
        .sort({ _id: -1 })
        .toArray();

        return this.transformOrderDocuments(orders);
    }

    static async findAllForUser(userId){
        const uid = new ObjectId(userId);

        const orders = await db
        .getDb()
        .collection('orders')
        .find({ 'userData._id': uid })
        .sort({ _id: -1 })
        .toArray();

        return this.transformOrderDocuments(orders);
    }

    static async findById(orderId){
        const order = await db
        .getDb()
        .collection('orders')
        .findOne({ _id: new ObjectId(orderId) });

        return this.transformOrderDocument(order);
    }


    save() {
        if (this.id) { //truthy and falshy
            const orderId = new ObjectId(this.id);
            return db
            .getDb()
            .collection('orders')
            .updateOne({ _id: orderId}, { $set: { status: this.status } });
        }else{
            const orderDocument = {
                userData: this.userData,
                productData: this.productData,
                date: new Date(),
                status: this.status
            };

            return db.getDb().collection('orders').insertOne(orderDocument);

        }

    }
}

module.exports = Order;