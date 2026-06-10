class Digit60 extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("digit_template");
        let templateContent = template.content;
        let clone = templateContent.cloneNode(true);

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

        let alt = `digit ${num} in base 10-60`;
        let src = `./v0/dgt_${num}.svg`;

        let title = `digit ${num} in base 10-60, digit ${num % 10} in base 10`;

        if (num > 9) {
            title = `digit ${num} in base 10-60, digit ${num % 10} in base 10  with dash above it`;
        }

        if (num > 19) {
            title = `digit ${num} in base 10-60, digit ${num % 10} in base 10 with dashes above and below it`;
        }

        if (num > 29) {
            title = `digit ${num} in base 10-60, digit ${num % 10} in base 10 inside a triangle`;
        }

        if (num > 39) {
            title = `digit ${num} in base 10-60, digit ${num % 10} in base 10 inside a square`;
        }

        if (num > 49) {
            title = `digit ${num} in base 10-60, digit ${num % 10} in base 10 inside a pentagon`;
        }


        let img = document.createElement("img");
        img.setAttribute("src", src);
        img.setAttribute("alt", title);
        img.setAttribute("title", title);

        img.setAttribute("width", lnum);
        img.setAttribute("height", lnum);

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(img);
        shadowRoot.appendChild(clone);
    }
}

Object.freeze(Digit60);
customElements.define("dig-it", Digit60);