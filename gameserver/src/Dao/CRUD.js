const mongo = require('mongodb');

//abstract parent class that has basic crud operations used
//by different Dao singletons
class CRUD {
  static collection = null;

  static async setup(_db, collectionName, mockData, config){
    //create collections if not made
    try{
      this.collection = await _db
        .createCollection(collectionName, {
          strict: true
        });
    }
    catch(error){
      throw error;
    }

    if (process.env.NODE_ENV == 'development') {
      //convert ids to mongo ids
      mockData.forEach(function(element, index) {
        mockData[index]._id = new mongodb.ObjectID(element._id);
      });
      await this.collection
        .insertMany(
          mockData,
          { forceServerObjectId: true },
          (err, doc) => {}
        );

      //create indexes
      await _db
        .collection(collectionName)
        .createIndexes(config.indexes, config.indexOptions, (err, doc) => {});
    }
  }

  static read(query, options){
    return new Promise((resolve, reject) => {
      try {
        if (query._id) {
          query._id = new mongo.ObjectID(query._id);
        }

        const cursor = this.collection.find(query, options);
        cursor.toArray((errArray, doc) => {
          if (errArray) {
            reject(errArray);
          } else {
            cursor
              .count(false, {})
              .then(count => {
                resolve([doc, count]);
              })
              .catch(errCount => {
                reject(errCount);
              });
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  static create(obj){
    return new Promise((resolve, reject) => {
      try {
        this.collection.insertOne(obj, (err, insertOneWriteOpResult) => {
          if (err) {
            reject(err);
          } else {
            resolve(insertOneWriteOpResult);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  static update(query, updates, options){
    return new Promise((resolve, reject) => {
      try {
        if (query._id) {
          query._id = new mongo.ObjectID(query._id);
        }

        this.collection.updateMany(
          query,
          updates,
          options,
          (err, updateWriteOpResult) => {
            if (err) {
              reject(err);
            } else {
              resolve(updateWriteOpResult);
            }
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  };

  static destroy(query, options){
    return new Promise((resolve, reject) => {
      try {
        if (query._id) {
          query._id = new mongo.ObjectID(query._id);
        }

        this.collection.deleteMany(query, options, (err, deleteWriteOpResult) => {
          if (err) {
            reject(err);
          } else {
            resolve(deleteWriteOpResult);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  };
}

module.exports = CRUD;
