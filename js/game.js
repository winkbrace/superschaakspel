var game = {
    beurt: 'wit',
    mogelijkheden: {},

    start: function() {
        this.beurt = "wit";

        bord.init();
        document.fonts.ready.then(_ => {
            stukken.init();
            invoer.init();
        });
    },

    startBeurt: function() {
        this.bepaalMogelijkheden();
    },

    eindeBeurt: function() {
        this.beurt = this.beurt == 'wit' ? 'zwart' : 'wit';
    },

    verzetStuk: function(stuk, startVakje, doelVakje) {
        bord.plaatsStuk('..', startVakje);
        bord.plaatsStuk(stuk, doelVakje);

        stukken.teken(bord.geefOpstelling());
    },

    bepaalMogelijkheden: function() {

    }
};

game.start();
