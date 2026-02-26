import express from "express"
import mongoose from "mongoose"
import ejs from "ejs"

mongoose.connect("mongodb://127.0.0.1:27017/postsDb")
const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

const postSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    paragrafo: {type: String, required: true}
})

const PostModel = mongoose.model("Post", postSchema)

app.get("/", async (request, response)=>{
    try{
        const list = await PostModel.find()
        response.render("home", {
            titulo: "Posts",
            lista: list
        })
    }catch(erro){
        response.send("Ocorreu um erro! Tente novamente mais tarde.")
    }
})
app.get("/cadastrar", async (request, response)=>{
    try{
        response.render("cadastrar", {
            titulo: "Cadastro"
        })
    }catch(erro){
        response.send("Ocorreu um erro!")
    }
})


app.post("/cadastrar", async (request, response)=>{
    try{
        let titulo = request.body.titulo
        let paragrafo = request.body.paragrafo

        const salvar = await PostModel.insertOne({titulo: titulo, paragrafo: paragrafo})

        response.redirect("/")
    }catch(erro){
        response.send("Ocorreu um erro!")
    }
})
app.post("/deletar", async (request, response)=>{
    try{
        let id = request.body.deletar
        const deletar = await PostModel.deleteOne({_id: id})
        response.redirect("/")
    }catch(erro){
        response.send("Ocorreu um erro!")
    }
})
app.post("/visualizar", async (request, response)=>{
    try{
        let id = request.body.visualizar
        const consulta = await PostModel.findOne({_id: id})
        response.render("post", {
            titulo: "Post",
            list: consulta
        })
    }catch{
        response.send("Ocorreu um erro!")
    }
})


app.listen(3000)