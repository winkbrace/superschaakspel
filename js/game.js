var game = {
    beurt: 'wit',
    mogelijkheden: {},
    opstelling: '',

    start: function () {
        this.beurt = "wit";
        this.opstelling = 'zt zP zl zd zk zl zP zt' +
                        ' zp zp zp zp zp zp zp zp' +
                        ' .. .. .. .. .. .. .. ..' +
                        ' .. .. .. .. .. .. .. ..' +
                        ' .. .. .. .. .. .. .. ..' +
                        ' .. .. .. .. .. .. .. ..' +
                        ' wp wp wp wp wp wp wp wp' +
                        ' wt wP wl wd wk wl wP wt';
        bord.init();
        document.fonts.ready.then(_ => stukken.init(this.opstelling));
    },

    startBeurt: function () {
        this.bepaalMogelijkheden();
    },

    eindBeurt: function () {
        this.beurt = this.beurt == 'wit' ? 'zwart' : 'wit';
    },

    bepaalMogelijkheden: function () {

    }
};

game.start();
