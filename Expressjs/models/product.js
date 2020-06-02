const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectID(id) : null;
    this.userId = userId;
  }

  save = () => {
    const db = getDb();
    let databaseOperation;
    if (this._id) {
      // update
      databaseOperation = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      databaseOperation = db.collection('products').insertOne(this);
    }
    return databaseOperation
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  static fetchAll = () => {
    const db = getDb();

    // .find() returns a cursor which is a handle
    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((error) => console.log(error));
  };

  static findById = (productId) => {
    const db = getDb();
    console.log(typeof productId);
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectID(String(productId)) })
      .next()
      .then((product) => {
        console.log('In product', product);
        return product;
      })
      .catch((error) => console.log(error));
  };

  static deleteById = (productId) => {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectID(productId) })
      .then((result) => console.log('DELETED'))
      .catch((error) => console.log(error));
  };
}

module.exports = Product;
