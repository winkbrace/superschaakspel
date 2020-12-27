var invoer = {
    canvas: document.getElementById("slepen"),
    ctx: document.getElementById("slepen").getContext("2d"),
    tekenSpoor: true,
    slependStuk: false,
    startVakje: null,

    init: function () {
        this.ctx.font = '600 80px "Font Awesome 5 Pro"';
        this.ctx.lineWidth = 1;
        this.tekenSpoor = document.getElementById('spoor').checked;

        // sleep een stuk als de muisknop ingedrukt wordt
        this.canvas.addEventListener('mousedown',e => {
            invoer.startVakje = bord.geefVakjeVanXY(e.offsetX, e.offsetY);

            if (invoer.startVakje === null || invoer.startVakje.stuk == '..') {
                invoer.slependStuk = false;
            } else {
                invoer.slependStuk = invoer.startVakje.stuk;
            }
        });

        // als we een stuk slepen, teken het dan telkens waar de muis is
        this.canvas.addEventListener('mousemove',e => {
            if (invoer.slependStuk) {
                const x = e.offsetX - (bord.vakBreedte / 4);
                const y = e.offsetY + (bord.vakHoogte / 2.5);
                if ( ! invoer.tekenSpoor) {
                    this.clearCanvas();
                }
                stukken.tekenStuk(invoer.ctx, invoer.slependStuk, x, y);
            }
        });

        // als we de muisknop loslaten, zet dan het stuk op die plek neer
        window.addEventListener('mouseup', e => {
            if ( ! invoer.slependStuk) {
                return;
            }

            const doelVakje = bord.geefVakjeVanXY(e.offsetX, e.offsetY);
            if (doelVakje !== null) {
                game.verzetStuk(this.slependStuk, this.startVakje, doelVakje);
            }

            this.slependStuk = false;
            this.startVakje = null;
            this.clearCanvas();
        });

        // sla het op als "Laat sleepspoor zien" aan- of uitgevinkt wordt
        document.getElementById('spoor').addEventListener('change', e => {
            this.tekenSpoor = e.target.checked;
        });
    },

    // maak de canvas laag voor het slepen van een stuk leeg
    clearCanvas: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
};
