var bord = {
    ctx: document.getElementById("schaakbord").getContext("2d"),

    init: function() {
        this.teken("#211F1B");
    },

    teken: function(kleur) {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "black";

        // teken de vierkanten van het bord
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                let x = 0.5 + (100 * col);
                let y = 0.5 + (100 * row);

                // teken rand
                this.ctx.strokeRect(x, y, 100, 100);

                // kleur vakje
                const vakKleur = this.isWitVakje(row, col) ? 'white' : kleur;
                this.kleurVakje(x, y, vakKleur);
            }
        }
    },

    /**
     * Kleur de vakjes met een subtiele schaduw aan de randen
     */
    kleurVakje: function(x, y, kleur) {
        // horizontaal verloop
        let verloopje = this.ctx.createLinearGradient(x-40, y, x + 140, y);
        verloopje.addColorStop(0, 'black');
        verloopje.addColorStop(0.25, kleur);
        verloopje.addColorStop(0.75, kleur);
        verloopje.addColorStop(1, 'black');
        this.ctx.fillStyle = verloopje;
        this.ctx.fillRect(x, y, 100, 100);

        // verticaal verloop
        verloopje = this.ctx.createLinearGradient(x, y-40, x, y + 140);
        verloopje.addColorStop(0, 'black');
        verloopje.addColorStop(0.25, 'transparent');
        verloopje.addColorStop(0.75, 'transparent');
        verloopje.addColorStop(1, 'black');
        this.ctx.fillStyle = verloopje;
        this.ctx.fillRect(x, y, 100, 100);
    },

    getVakje: function(nr) {
        const vakje = {
            row: Math.floor(nr / 8),
            col: nr % 8,
            kleur: 'w',

            init: function() {
                this.kleur = bord.isWitVakje(this.row, this.col) ? 'w' : 'z'
            }
        };
        vakje.init();

        return vakje;
    },

    isWitVakje: function(row, col) {
        return col % 2 - row % 2 === 0;
    },

    randomKleur: function(){
       return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    }
};

// Verander kleur van het bord
document.getElementById('bordkleur').addEventListener('input', (e) => bord.teken(e.target.value));

// DDDDDIIIIISSSSCCCOO!!!!!!
let disco = false;
let discoInterval = null;
document.getElementById('disco').addEventListener('click', (e) => {
    disco = ! disco
    if (disco) {
        const snelheid = document.getElementById('disco-snelheid').value;
        discoInterval = setInterval(_ => bord.teken(bord.randomKleur()), snelheid);
    } else {
        clearInterval(discoInterval);
    }
});

document.getElementById('disco-snelheid').addEventListener('change', (e) => {
    clearInterval(discoInterval);
    discoInterval = setInterval(_ => bord.teken(bord.randomKleur()), e.target.value)
});
