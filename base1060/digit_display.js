class Digit60Display extends HTMLElement {
    static #maxInt = 1073741824;
    constructor() {
        super();

        let value = this.getAttribute("val");
        let num = Number(value);

        if (num > Digit60Display.#maxInt || num < 0) {
            num = 1;
        }

        let remainders = [];
        //convert
        //after loop remainder will have all the 10-60 digits of num
        while (num > 59) {
            let rem = num % 60;
            let div = (num - rem) / 60;
            remainders.unshift(rem);
            num = div;
        }

        if (num > 0) {
            remainders.unshift(num);
        }

        //img properties
        let sidelength = this.getAttribute("h");
        let lnum = Number(sidelength);

        if (lnum > 144 || lnum < 48) {
            lnum = 48;
        }

        let images = [];
        //convert to images
        for (const rem of remainders) {
            let img = Digit60.mkimg(rem, lnum);
            images.push(img);
        }

        const shadowRoot = this.attachShadow({ mode: 'open' });

        for (const img of images) {
            shadowRoot.appendChild(img);
        }

    }

    set value(val) {
        let num = Number(val);
        //if greater than max or less than zero
        if (num > Digit60Display.#maxInt || num < 0) {
            return;
        }

        let remainders = [];
        //convert
        //after loop remainder will have all the 10-60 digits of num
        while (num > 59) {
            let rem = num % 60;
            let div = (num - rem) / 60;
            remainders.unshift(rem);
            num = div;
        }

        if (num > 0) {
            remainders.unshift(num);
        }

        //other loops would yield an logic error as length keeps reduced
        while (this.shadowRoot.children.length > 0) {
            let chi = this.shadowRoot.children[0];
            this.shadowRoot.removeChild(chi);
        }

        //img properties
        let sidelength = this.getAttribute("h");
        let lnum = Number(sidelength);

        if (lnum > 144 || lnum < 48) {
            lnum = 48;
        }

        let images = [];
        //convert to images
        for (const rem of remainders) {
            let img = Digit60.mkimg(rem, lnum);
            images.push(img);
        }

        for (const img of images) {
            this.shadowRoot.appendChild(img);
        }
    }

}

Object.freeze(Digit60Display);
customElements.define("digit-display", Digit60Display);