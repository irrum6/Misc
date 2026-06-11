class Digit60 extends HTMLElement {
    constructor() {
        super();

        let value = this.getAttribute("val");
        let num = Number(value);

        if (num > 59 || num < 0) {
            num = 0;
        }

        let sidelength = this.getAttribute("h");
        let lnum = Number(sidelength);

        if (lnum > 144 || lnum < 48) {
            lnum = 48;
        }

        let img = Digit60.mkimg(num, lnum);

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(img);
    }

    static mkimg(digit, length) {
        let img = document.createElement("img");

        let alt = `digit ${digit} in base 10-60`;
        let src = `./v0/dgt_${digit}.svg`;
        let title = Digit60.mktitle(digit);

        img.setAttribute("src", src);
        img.setAttribute("alt", title);
        img.setAttribute("title", title);

        img.setAttribute("width", length);
        img.setAttribute("height", length);
        img.setAttribute("style", "margin-right:3px;");

        return img;
    }

    static mktitle(num) {

        if (num > 49) {
            return `digit ${num} in base 10-60, digit ${num % 10} in base 10 inside a pentagon`;
        }
        if (num > 39) {
            return `digit ${num} in base 10-60, digit ${num % 10} in base 10 inside a square`;
        }
        if (num > 29) {
            return `digit ${num} in base 10-60, digit ${num % 10} in base 10 inside a triangle`;
        }
        if (num > 19) {
            return `digit ${num} in base 10-60, digit ${num % 10} in base 10 with dashes above and below it`;
        }

        if (num > 9) {
            return `digit ${num} in base 10-60, digit ${num % 10} in base 10  with dash above it`;
        }

        return `digit ${num} in base 10-60, digit ${num % 10} in base 10`;
    }
}

Object.freeze(Digit60);
customElements.define("dig-it", Digit60);