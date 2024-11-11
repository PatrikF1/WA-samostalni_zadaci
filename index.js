import express from "express";
import nekretnineR from "./routes/nekretnineR.js"
import ponudaR from "./routes/ponudaR.js"



const PORT = 3000;

const app = express();
app.use(express.json());

app.use('/nekretnine', nekretnineR);
app.use('/ponuda', ponudaR)

app.listen(PORT, (error) => {
    if(error){
        console.error("ne radi server")
    }
    else{
        console.log("Server je pokrenut")
    }
})