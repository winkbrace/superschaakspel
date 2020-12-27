var bord = {
    ctx: document.getElementById("schaakbord").getContext("2d"),
    bord: {},
    vakBreedte: 100, vakHoogte: 100,

    init: function() {
        this.maakBord();
        this.teken(this.randomKleur());
    },

    maakBord: function() {
        for (let row = 0; row < 8; row++) {
            this.bord[row] = {};
            for (let col = 0; col < 8; col++) {
                this.bord[row][col] = this.maakVakje(row, col);
            }
        }
    },

    maakVakje: function(row, col) {
        return {
            row: row,
            col: col,
            kleur: bord.isWitVakje(row, col) ? 'w' : 'z',
            stuk: null,
        };
    },

    plaatsStuk: function(stuk, vakje) {
        vakje.stuk = stuk;
        this.bord[vakje.row][vakje.col] = vakje;
    },

    verzetStuk: function(stuk, startVakje, doelVakje) {
        this.plaatsStuk('..', startVakje);
        this.plaatsStuk(stuk, doelVakje);

        stukken.teken(this.geefOpstelling());
    },

    teken: function(kleur) {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "black";

        // teken de vierkanten van het bord
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                let x = 0.5 + (this.vakBreedte * col);
                let y = 0.5 + (this.vakHoogte * row);

                // teken rand
                this.ctx.strokeRect(x, y, this.vakBreedte, this.vakHoogte);

                // kleur vakje
                const vakKleur = this.isWitVakje(row, col) ? 'white' : kleur;
                this.kleurVakje(x, y, vakKleur);
            }
        }

        // geef ook de kleur kiezer dezelfde kleur
        document.getElementById('bordkleur').value = kleur;
    },

    /**
     * Kleur de vakjes met een subtiele schaduw aan de randen
     */
    kleurVakje: function(x, y, kleur) {
        // horizontaal verloop
        let verloopje = this.ctx.createLinearGradient(x-40, y, x + this.vakBreedte + 40, y);
        verloopje.addColorStop(0, 'black');
        verloopje.addColorStop(0.25, kleur);
        verloopje.addColorStop(0.75, kleur);
        verloopje.addColorStop(1, 'black');
        this.ctx.fillStyle = verloopje;
        this.ctx.fillRect(x, y, this.vakBreedte, this.vakHoogte);

        // verticaal verloop
        verloopje = this.ctx.createLinearGradient(x, y-40, x, y + this.vakHoogte + 40);
        verloopje.addColorStop(0, 'black');
        verloopje.addColorStop(0.25, 'transparent');
        verloopje.addColorStop(0.75, 'transparent');
        verloopje.addColorStop(1, 'black');
        this.ctx.fillStyle = verloopje;
        this.ctx.fillRect(x, y, this.vakBreedte, this.vakHoogte);
    },

    geefVakjeVanNr: function(nr) {
        const row = Math.floor(nr / 8);
        const col = nr % 8;

        return this.bord[row][col];
    },

    geefVakjeVanXY: function (x, y) {
        const row = Math.floor(y / this.vakHoogte);
        const col = Math.floor(x / this.vakBreedte);

        return this.bord[row][col];
    },

    geefOpstelling: function() {
        let stukken = [];
        for (let row=0; row<8; row++) {
            for (let col=0; col<8; col++) {
                stukken.push(this.bord[row][col].stuk);
            }
        }

        return stukken.join(' ');
    },

    isWitVakje: function(row, col) {
        return col % 2 - row % 2 === 0;
    },

    randomKleur: function(){
       return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    },
};

// Verander kleur van het bord
document.getElementById('bordkleur').addEventListener('input', (e) => bord.teken(e.target.value));

// DDDDDIIIIISSSSCCCOOOOOO!!!!!!
let disco = false;
let discoInterval = null;
document.getElementById('disco').addEventListener('click', (e) => {
    disco = ! disco
    if (disco) {
        const snelheid = 1 - document.getElementById('disco-snelheid').value;
        discoInterval = setInterval(_ => bord.teken(bord.randomKleur()), snelheid);
    } else {
        clearInterval(discoInterval);
    }
});

document.getElementById('disco-snelheid').addEventListener('change', (e) => {
    disco = true;
    clearInterval(discoInterval);
    discoInterval = setInterval(_ => bord.teken(bord.randomKleur()), 1 - e.target.value)
});
