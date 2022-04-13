const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
var cors = require('cors')

const items = require("./routes/api/items.tsx")

const app = express()
app.use(cors())

app.use(bodyParser.json())

const db = require("./config/keys").mongoURI

mongoose.connect(db)
    .then(()=> console.log("Mongo connected ..."))
    .catch(err=>console.log(err))

app.use("/api/items", items);

const port = process.env.PORT || 3001

app.listen(port,()=> console.log(`Server started on port ${port}`))