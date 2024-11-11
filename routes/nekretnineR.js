import express from "express";

const nekretnineR = express.Router();

let nekretnine = [
    { id: 1, naziv: "Barboj", opis: "Novogradnja u centru Umaga sa 3 kata", cijena: 135000, lokacija: "Umag", broj_soba: 5, povrsina: 140},
    { id: 2, naziv: "Novigradska", opis: "Starogradnja u okolici Novigrada sa 2 kata", cijena: 100000, lokacija: "Novigrad", broj_soba: 3, povrsina: 100}
];

// Dohvati sve nekretnine - dohvacam sve preko tog app.get bez id-a
nekretnineR.get('/', (req, res) => {
    res.json(nekretnine);
});

// Dohvati nekretninu po ID-u - tu ga dohvacam uz pomoc find koja pregledava ako je nekretnine_id koji se nalazi u http zahtjevu jednak nekom id-u u objektu nekretnine onda ga pronalazi
nekretnineR.get('/:id', (req, res) => {
    const nekretnine_id = req.params.id;
    if (isNaN(nekretnine_id)) {
        return res.status(400).json({ message: "ID mora biti broj" });
    }
     
    const nekretnina = nekretnine.find(n => n.id == nekretnine_id);
    if (!nekretnina) {
        return res.status(404).json({ message: "Nekretnina sa tim ID-em ne postoji" });
    }
    res.status(200).json(nekretnina);
});

// Dodaj novu nekretninu - dodajem ju uz pomoc kljuceva, znaci ako je kljuc u bodyu mora ga sadrzavati kako bi unijeli podatke i to samo pushamo u novu nekretninu
nekretnineR.post('/', (req, res) => {
    const novaNekretnina = req.body;
    const kljucevi = Object.keys(novaNekretnina);

    if (!(kljucevi.includes('id') && kljucevi.includes('naziv') && kljucevi.includes('opis') && kljucevi.includes('cijena') && kljucevi.includes('lokacija') && kljucevi.includes('broj_soba') && kljucevi.includes('povrsina'))) {
        return res.status(400).json({ message: "Svi podaci moraju biti uneseni" });
    }

    if (novaNekretnina.cijena <= 0 || novaNekretnina.broj_soba <= 0 || novaNekretnina.povrsina <= 0) {
        return res.status(400).json({ message: "Cijena, broj soba i površina ne mogu biti negativni" });
    }

 
    nekretnine.push(novaNekretnina);

    res.status(201).json(novaNekretnina);
});

// Ažuriraj nekretninu potpuno - ovdje isto moramo unijeti sve kljuceve i pomocu indexa, ako index nije jednak -1 znaci ako je veci onda azurira nekretninu 
nekretnineR.put('/:id', (req, res) => {
    const nekretnine_id = req.params.id;
    const azurirajNekretninu = req.body;
    const kljucevi = Object.keys(azurirajNekretninu);

    azurirajNekretninu.id = nekretnine_id;

    if (isNaN(nekretnine_id)) {
        return res.status(400).json({ message: "ID mora biti broj!" });
    }

    const nekretnina = nekretnine.find(n => n.id == nekretnine_id);
    if (!nekretnina) {
        return res.status(404).json({ message: "Nekretnina s tim ID-em ne postoji!" });
    }

    if (!(kljucevi.includes('naziv') && kljucevi.includes('opis') && kljucevi.includes('cijena') && kljucevi.includes('lokacija') && kljucevi.includes('broj_soba') && kljucevi.includes('povrsina'))) {
        return res.status(400).json({ message: "Svi podaci moraju biti uneseni" });
    }

    if (azurirajNekretninu.cijena <= 0 || azurirajNekretninu.broj_soba <= 0 || azurirajNekretninu.povrsina <= 0) {
        return res.status(400).json({ message: "Cijena, broj soba i površina moraju biti pozitivni brojevi!" });
    }

    const index = nekretnine.findIndex(n => n.id == nekretnine_id)

    if(index !== -1) {
        nekretnine[index] = azurirajNekretninu;
        res.status(200).json(nekretnine[index]);
    }
    else{res.json("ne dela dobro")}

    
});

// Ažuriraj nekretninu djelomično - ovdje nemoram unijeti podatke sve kako bi azurirao, i princip je isti kao i sa put
nekretnineR.patch('/:id', (req, res) => {
    const nekretnina_id = req.params.id;
    const novaNekretnina = req.body;

    if (isNaN(nekretnina_id)) {
        return res.status(400).json({ message: "ID mora biti broj!" });
    }

    const index = nekretnine.findIndex(n => n.id == nekretnina_id);
    if (index !== -1) {
        nekretnine[index] = novaNekretnina
        return res.status(200).json(nekretnine[index]);
    }


    if (novaNekretnina.cijena <= 0 || novaNekretnina.broj_soba <= 0 || novaNekretnina.povrsina <= 0) {
        return res.status(400).json({ message: "Cijena, broj soba i površina moraju biti pozitivni brojevi!" });
    }

  

    res.status(200).json(nekretnine[index]);
});


// Obriši nekretninu - tu brisem sa splice funckijom nekretninu nista posebno
nekretnineR.delete('/:id', (req, res) => {
    const nekretnina_id = req.params.id;

    if (isNaN(nekretnina_id)) {
        return res.status(400).json({ message: "ID mora biti broj!" });
    }

    const index = nekretnine.findIndex(n => n.id === nekretnina_id);
    if (index !== -1) {
        nekretnine[index] = nekretnina_id
    }

    nekretnine.splice(index, 1);
    res.status(200).json({ message: "Nekretnina uspješno obrisana!" });
});

export { nekretnine }; //neznam kako drugacije exportat vidio sam da moram exportat cijeli objekt kako bi ga koristio u ponude

export default nekretnineR;
