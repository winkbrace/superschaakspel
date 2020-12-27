const stukken = {
    // definieer de fontawesome unicode karakters voor de stukken
    toren: "\uf447",
    paard: "\uf441",
    dame: "\uf445",
    loper: "\uf43a",
    koning: "\uf43f",
    pion: "\uf443",

    soorten: {},

    canvas: document.getElementById("stukken"),
    ctx: document.getElementById("stukken").getContext("2d"),

    init: function() {
        this.soorten = {
            t: this.toren,
            P: this.paard,
            l: this.loper,
            d: this.dame,
            k: this.koning,
            p: this.pion,
        };

        const opstelling = 'zt zP zl zd zk zl zP zt' +
                          ' zp zp zp zp zp zp zp zp' +
                          ' .. .. .. .. .. .. .. ..' +
                          ' .. .. .. .. .. .. .. ..' +
                          ' .. .. .. .. .. .. .. ..' +
                          ' .. .. .. .. .. .. .. ..' +
                          ' wp wp wp wp wp wp wp wp' +
                          ' wt wP wl wd wk wl wP wt';

        this.teken(opstelling);
    },

    teken: function(opstelling) {
        // eerst leegmaken, dan alles opnieuw tekenen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '600 80px "Font Awesome 5 Pro"';
        this.ctx.lineWidth = 1;

        const stukken = opstelling.split(' ');
        for (let i = 0, len = stukken.length; i < len; i++) {
            const stuk = stukken[i];
            const vakje = bord.geefVakjeVanNr(i);

            bord.plaatsStuk(stuk, vakje);

            if (stuk === '..') {
                continue;
            }

            const x = 20 + (bord.vakBreedte * vakje.col);
            const y = 80 + (bord.vakHoogte * vakje.row);

            this.tekenStuk(this.ctx, stuk, x, y, vakje.kleur);
        }
    },

    tekenStuk(ctx, stuk, x, y, vakKleur = 'z') {
        const stukKleur = stuk.substr(0, 1);
        const stukSoort = this.getSoort( stuk.substr(1, 1));

        if (stukSoort == this.loper) x += 5;
        if (stukSoort == this.pion) x += 5;
        if (stukSoort == this.dame) x -= 10;
        if (stukSoort == this.koning) x -= 4;

        ctx.fillStyle = stukKleur === 'w' ? 'white' : 'black';
        ctx.strokeStyle = stukKleur === 'w' ? 'black' : 'white';
        ctx.fillText(stukSoort, x, y);
        if (vakKleur == stukKleur || stukKleur == 'w') {
            ctx.strokeText(stukSoort, x, y);
        }
    },

    getSoort:function(soortLetter){
        return stukken.soorten[soortLetter];
    },
};
