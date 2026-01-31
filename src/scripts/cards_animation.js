import { breakPoints, mm } from "./utils/resolution"

export function cards_animation() {
    mm.add(breakPoints, (context) => {
        const { isPortraitRes } = context.conditions;

        if (isPortraitRes) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".cards-section",
                start: "top bottom-=5%",
                end: "bottom bottom-=20%",
                scrub: .5,
            }
        })
            .from(".cards-section > h2", {
                opacity: 0,
            })
            .from(".cards-section > .cards > .card", {
                y: "7.5vw",
                duration: 1,
                stagger: 0.25,
            })
              .from(".cards-section > .cards > .card", {
                opacity: 0,
                ease: "power1.in",
                duration: 1,
                stagger: 0.25,
            }, "<")
    })


}