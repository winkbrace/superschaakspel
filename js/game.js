var game = {
    beurt: 'wit',
    mogelijkheden: {},

    start: function() {
        this.beurt = "wit";

        bord.init();
        document.fonts.ready.then(_ => stukken.init());
    },

    startBeurt: function() {
        this.bepaalMogelijkheden();
    },

    eindeBeurt: function() {
        this.beurt = this.beurt == 'wit' ? 'zwart' : 'wit';
    },

    bepaalMogelijkheden: function() {

    }
};

game.start();
