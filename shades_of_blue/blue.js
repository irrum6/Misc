class ShadesOfBlueView {
    /**
     * @private
     * @type {Integer}
     */
    #rows;
    /**
     * @private
     * @type {Integer}
     */
    #columns;
    /**
     * @private
     * @type {Boolean}
     */
    #initialized;
    /**
     * @private
     * @type {Integer}
     */
    #maxRowCount;

    constructor() {
        this.#rows = 0;
        this.#columns = 0;
        this.#initialized = false;
        this.#maxRowCount = 12;
    }
    /**
     * can be called once
     * @param {Integer} rows
     * @returns {Integer}
     */
    init(rows) {
        if (this.#initialized == true) {
            return Errors.OBJECT_ALREADY_INITIALIZED_INT;
        }
        if (!Number.isInteger(rows)) {
            return Errors.INCORRECT_TYPE_INT;
        }

        if (rows < 0) {
            return Errors.NOT_IN_VALID_RANGE_INT;
        }

        this.#rows = rows;
        this.#columns = rows;

        this.#initialized = true;

        return 0;
    }

    increaseRowCount() {
        if (this.#rows == this.#maxRowCount) {
            return;
        }
        this.#rows += 1;
        this.#columns += 1;
    }

    clearGrid() {
        const grid = document.getElementById("grid");

        // for (const chi of grid.children) {
        //     grid.removeChild(chi);
        // }

        while (grid.children.length > 0) {
            grid.removeChild(grid.children[0]);
        }
    }
    /**
     * 
     * @param {String} color 
     * @param {String} diffColor 
     * @param {ShadesOfBlue} game 
     */
    drawGrid(color, diffColor, game) {

        const grid = document.getElementById("grid");
        //setting layout
        grid.style.gridTemplateColumns = `repeat(${this.#rows}, auto)`;

        const unit = (window.innerWidth > window.innerHeight) ? 'vh' : 'vw';
        const w = `${Math.round(100 * 1000 / this.#rows) / 1000}${unit}`;

        const total = this.#rows * this.#columns;
        const random_index = Math.floor(Math.random() * total);

        //draw
        for (let i = 0; i < total; i++) {
            let button = document.createElement("button");
            button.classList.add("cell");
            button.style.backgroundColor = color;
            button.style.width = w;
            button.style.height = w;

            if (i == random_index) {
                button.classList.add("diff");
                button.style.backgroundColor = diffColor;
                button.addEventListener('click', (e) => {
                    game.nextLevel();
                });
            }
            grid.appendChild(button);
        }
    }
    explodeGrid() {
        let buttons = document.querySelectorAll("button");
        for (const b of buttons) {
            b.classList.add("tnt");
        }
    }
}



class ShadesOfBlue {
    /**
    * @private
    * @type {ShadesOfBlueView}
    */
    #view;
    /**
     * @private
     * @type {Integer}
     */
    #currentLevel;
    /**
     * @private
     * @type {Integer}
     */
    #maxLevel;

    constructor() {
        this.#currentLevel = 1
        this.#maxLevel = 20;
    }
    /**
     * @param {ShadesOfBlueView} view 
     */
    addView(view) {
        if (!view instanceof ShadesOfBlueView) {
            return Errors.INCORRECT_CLASS_INT;
        }

        this.#view = view;
    }

    nextLevel() {
        this.#currentLevel += 1;
        if (this.#currentLevel > this.#maxLevel) {
            //current max level reached;
            this.#view.explodeGrid();
            return;
        }

        this.draw();

        if (this.#currentLevel % 5 == 0) {
            this.#view.increaseRowCount();
        }
    }
    /**
     * @param {Integer} level 
     * @returns 
     */
    loadLevel(level) {
        if (!Number.isInteger(level)) {
            return Errors.INCORRECT_TYPE_INT;
        }

        if (level > this.#maxLevel || level < 0) {
            return
        }

        this.#currentLevel = level;
        //this.draw();
    }

    draw() {
        let { color, diffColor } = levels[this.#currentLevel - 1];
        this.#view.clearGrid();
        this.#view.drawGrid(color, diffColor, this);
    }
}