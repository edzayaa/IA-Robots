export function fonts() {
    const workSansNormal = new FontFace("Work Sans", "url('/fonts/Work_Sans/WorkSans-VariableFont_wght.ttf')", {
        display: "swap",
        style: "normal",
    })


    document.fonts.add(workSansNormal)

    return document.fonts.ready;

}