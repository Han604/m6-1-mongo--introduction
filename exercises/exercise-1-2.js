const { MongoClient } = require('mongodb');

const getCollection = async (req, res) => {
    const dbName = req.params.dbName;
    const collection = req.params.collection;

        const client = new MongoClient('mongodb://localhost:27017', {
            useUnifiedTopology: true,
        });

        await client.connect();
        const db = client.db(dbName);

        db.collection(collection)
            .find()
            .toArray((err, result) => {
                if (result.length ) {
                    res.status(200).json({ status: 200, data: result })
                } else {
                    res.status(404).json({ status: 404, data: 'Not Found' });
                }
            })
}

module.exports = { getCollection }