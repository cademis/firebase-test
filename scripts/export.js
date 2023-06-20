const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.myData = functions.https.onRequest((request, response) => {
  const db = admin.firestore();

  db.collection('restaurants').get()
    .then((snapshot) => {
      let data = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      response.json(data);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send(error);
    });
});
