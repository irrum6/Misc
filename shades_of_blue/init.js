function getSearchParameters() {
    let search = window.location.search;
    search = search.replaceAll("?", "").split("&");

    const params = Object.create(null);

    for (const s of search) {
        if (s.length === 0) {
            continue;
        }
        const split = s.split("=");
        if (split.length !== 2) {
            continue;
        }
        let k = split[0];
        let v = split[1];
        params[k] = v;
    }
    return params;
}

function initBlue() {
    let view = new ShadesOfBlueView();
    let blue = new ShadesOfBlue();

    view.init(3);
    blue.addView(view);

    let params = getSearchParameters();
    //cast
    let level = Number(params.level)

    if(Number.isInteger(level)){
        blue.loadLevel(level)
    }

    blue.draw();
}

initBlue();