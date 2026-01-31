import { breakPoints, mm } from "./utils/resolution";

export function quadruped() {
    mm.add(breakPoints, (context) => {
        const { isPortraitRes } = context.conditions;

        if (isPortraitRes) return;

        const blocks = gsap.utils.toArray("#block-section .block");
        blocks.forEach(block => {
            const selector = gsap.utils.selector(block);
            const shot = selector(".shot");
            const h2 = selector("h2");
            const p = selector("p");


            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: h2,
                    start: "top bottom",
                    end: "top center",
                    scrub: true,
                }
            })
                .from([h2, p], {
                    opacity: 0,
                    ease: "power1.in",
                    stagger: 0.2,
                })
                .from([h2, p], {
                    y: "2.5vw",
                    stagger: 0.2,
                }, 0)
        });

    })


}