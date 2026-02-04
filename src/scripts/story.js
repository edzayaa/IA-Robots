import { breakPoints, mm } from "./utils/resolution";

export function story() {

    mm.add(breakPoints, (context) => {
        const { isPortrait } = context.conditions;

        if (isPortrait) return;

        const lineScroll = gsap.utils.toArray(".line strong")[0];

        const lineTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".line",
                start: "top center",
                end: "bottom bottom-=15%",
                scrub: true,
            },
            defaults: {
                duration: 1,
            },
        })


            .from(".line span:nth-of-type(1)", {
                opacity: 0,
                duration: 0.05,
            })
            .fromTo(lineScroll, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            }, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "none",
            }, "<50%")
            .from(".line span:nth-of-type(2)", {
                opacity: 0,
                duration: 0.05,
            }, "<65%")
            .from(".line span:nth-of-type(3)", {
                opacity: 0,
                duration: 0.05,
            })


        gsap.to(".line", {
            opacity: 1,
        })

    })

}