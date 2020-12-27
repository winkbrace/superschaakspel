var invoer = {
    canvas: document.getElementById("slepen"),
    ctx: document.getElementById("slepen").getContext("2d"),
    slependStuk: false,
    startVakje: null,

    init: function () {
        this.ctx.font = '600 80px "Font Awesome 5 Pro"';
        this.ctx.lineWidth = 1;

        this.canvas.addEventListener('mousedown',function(e) {
            invoer.startVakje = bord.geefVakjeVanXY(e.offsetX, e.offsetY);

            if (invoer.startVakje.stuk != '..') {
                invoer.slependStuk = invoer.startVakje.stuk;
            } else {
                invoer.slependStuk = false;
            }
        });

        this.canvas.addEventListener('mousemove',function(e) {
            if (invoer.slependStuk) {
                const x = e.offsetX - (bord.vakBreedte / 4);
                const y = e.offsetY + (bord.vakHoogte / 2.5);
                stukken.tekenStuk(invoer.ctx, invoer.slependStuk, x, y);
            }
        });

        window.addEventListener('mouseup', e => {
            const doelVakje = bord.geefVakjeVanXY(e.offsetX, e.offsetY);
            bord.verzetStuk(this.slependStuk, this.startVakje, doelVakje);

            this.slependStuk = false;
            this.startVakje = null;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        });
    },
};
