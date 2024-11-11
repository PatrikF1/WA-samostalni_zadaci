import express from "express";
import {nekretnine} from "./nekretnineR.js";


const ponudaR = express.Router();



let ponude = [];

ponudaR.post('/', (req, res) => {
    const nekretninaInfo = req.body;
    const kljucevi = Object.keys(nekretninaInfo)

    if (!(kljucevi.includes("id") && kljucevi.includes("nekretnina_id") && kljucevi.includes("ime") && kljucevi.includes("prezime") && kljucevi.includes("ponudena_cijena") && kljucevi.includes("broj_telefona"))) {
         res.status(400).json({ message: "Svi podaci su obavezni!" });
    }

    if (nekretninaInfo.ponudena_cijena <= 0) {
         res.status(400).json({ message: "Ponudena cijena mora biti pozitivna!" });
    }

    ponude.push(nekretninaInfo);

    res.status(201).json(nekretninaInfo);
});

ponudaR.get('/:nekretnina_id', (req, res) => {   // ovdje je sve slicno kao u nekretninama samo ovdje koristimo nekretnina id koji ce nam povezati ponudu i nekretnine i ako je id od ponude jednak id nekretnine onda ispisuje sve
    const nekretnina_id = req.params.nekretnina_id;
    const id = req.params.id;
    const ponuda = ponude.find(p => p.nekretnina_id == nekretnina_id);
    if (!ponuda) {
         res.status(404).json({ message: "Ponuda s tim nekretnina_id ne postoji!" });
    }

   
    const nekretnina = nekretnine.find(n => n.id == nekretnina_id);
    if (!nekretnina) {
         res.status(404).json({ message: "Nekretnina s tim ID-em ne postoji!" });
    }

    const response = {
        ponuda: ponuda,
        nekretnina: nekretnina
    };

    if(id == nekretnina_id){
        res.status(200).json(response)
    }
    
    

    res.status(200).json(response);
});


export default ponudaR;
