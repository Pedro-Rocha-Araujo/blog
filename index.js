import express from "express"
import ejs from "ejs"

const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (request, response)=>{
    response.render("home")
})

app.listen(3000)