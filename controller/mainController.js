const admin = require('../config/firebaseAdmin');
const expressasyncHandler = require('express-async-handler');
const db = admin.firestore();

const register = expressasyncHandler(async (req, res) => {
    const {palmdata} = req.body;
    if(!palmdata){
        res.status(400);
        throw new Error("Palm data is required");
    }
    try {
        const uid = req.user.uid;
        await db.collection('users').doc(uid).update({
            palmdata:palmdata,
            updatedAt: admin.firestore.Fieldvalue.serverTimestamp()
        });
        res.status(200).json({message: "Palm data registered successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
});


module.exports = { register };