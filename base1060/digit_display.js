class Digit60Display extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("digit_template");
        let templateContent = template.content;
        let clone = templateContent.cloneNode(true);

        let value = this.getAttribute("val");
        let num = Number(value);

        if (num > 1073741824 || num < 0) {
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
            let img = document.createElement("img");

            let src = `./v0/dgt_${rem}.svg`;
            let title = this.#mkTitle(rem);

            img.setAttribute("src", src);
            img.setAttribute("alt", title);
            img.setAttribute("title", title);

            img.setAttribute("width", lnum);
            img.setAttribute("height", lnum);
            img.setAttribute("style", "margin-right:4px;");

            images.push(img);
        }

        const shadowRoot = this.attachShadow({ mode: 'open' });

        for (const img of images) {
            shadowRoot.appendChild(img);
        }

        shadowRoot.appendChild(clone);
    }

    #mkTitle(num) {

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

Object.freeze(Digit60Display);
customElements.define("digit-display", Digit60Display);