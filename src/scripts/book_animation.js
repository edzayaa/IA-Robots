import { breakPoints, mm } from "./utils/resolution"

export function book_animation() {

    mm.add(breakPoints, (context) => {
        const { isPortraitRes } = context.conditions;

        if (isPortraitRes) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".book-section .book-wrapper .first",
                start: "top bottom+=5%",
                endTrigger: ".book-section .book-wrapper",
                end: "bottom bottom-=20%",
                scrub: .5,
            }
        })

            .from(".book-section .book-wrapper .second", {
                rotateY: -45,
                duration: 2,
                ease: "linear"
            }, 0)
            .from(".book-section .book-wrapper .second .book-shot", {
                yPercent: 50,
                duration: 2,
            }, 0)
            .from(".book-section .book-wrapper .first h4", {
                opacity: 0,

                x: "-1vw"
            }, 1)
            .from(".book-section .book-wrapper .first p", {
                opacity: 0,

                x: "-1vw",
            }, "<50%")

            .from(".book-section .book-wrapper .first .buttons .primary-btn", {
                opacity: 0,

                x: "-1vw",
            }, "<50%")
            .from(".book-section .book-wrapper .first .buttons .secondary-btn", {
                opacity: 0,

                x: "-1vw",
            }, "<50%")
    })

}