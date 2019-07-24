import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/*
const serviceAccount = require("../ionic-webpush-sample-firebase-adminsdk-vgq6q-2930dca47c.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ionic-webpush-sample.firebaseio.com"
});
*/
/*
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://ionic-webpush-sample.firebaseio.com"
});
*/
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//プッシュ通知するAPI
exports.send_notification = functions.https.onCall((data, context) => {
    console.log("data",data);
    console.log("admin",admin);

    //プッシュ送信
    const value = {
        notification: {
            title: data.title,
            body: data.body
        },
        webpush: {
            headers: {
                TTL: "60"
            },
            notification: {
                icon: data.icon
            }
        },
        token: data.token
    };
    console.log("value",value);

    return admin.messaging().send(value)
        .then((response: any) => {
            console.log('Successfully sent message:', response);
            return Promise.resolve(response);
        })
        .catch((error: any) => {
            console.log('Error sending message:', error);
            return Promise.reject(error);
        });
});