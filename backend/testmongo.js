const mongoose = require("mongoose");

const uri = "mongodb+srv://ishu84205_db_user:ishu124@cluster0.zh54j18.mongodb.net/leadsDB";

mongoose.connect(uri)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");
        process.exit();
    })
    .catch((err) => {
        console.log("❌ MongoDB Connection Failed");
        console.log(err.message);
        process.exit(1);
    });