function initBlue() {
    let view = new ShadesOfBlueView();
    let blue = new ShadesOfBlue();

    view.init(3);
    blue.addView(view)

    blue.draw();
}

initBlue();