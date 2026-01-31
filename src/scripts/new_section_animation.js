import { breakPoints, mm } from "./utils/resolution";

export function new_section_animation() {

    mm.add(breakPoints, ({ conditions }) => {
        const { isPortraitRes } = conditions;
        if (isPortraitRes) return;

        const newSection = gsap.utils.toArray("#new-section")[0];
        const selector = gsap.utils.selector(newSection);
        const shot = selector(".shot")[0];
        const details = selector(".detail");

        const newSectionTl = gsap.timeline({
            scrollTrigger: {
                trigger: shot,
                endTrigger: newSection,
                start: "top bottom-=10%",
                end: "bottom bottom-=5%",
                scrub: true,
            },
            defaults: {
                ease: "linear",
                duration: 1,
            },
        })
            .from(shot, {
                opacity: 0,
            })
            .fromTo([details[0].querySelector("img"), details[1].querySelector("img")], {
                clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",

            }, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }, ">")
            .from(Array.from(details[0].children).slice(0, 2), {
                opacity: 0,
                duration: 0.5,
                stagger: {
                    from: "end",
                    amount: 0.25
                }
            }, "<85%")
            .from(Array.from(details[1].children).slice(0, 2), {
                opacity: 0,
                duration: 0.5,
                stagger: {
                    from: "end",
                    amount: 0.25
                }
            }, "<")



            .fromTo([details[2].querySelector("img"), details[3].querySelector("img")], {
                clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",

            }, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }, ">")

            .from(Array.from(details[2].children).slice(0, 2), {
                opacity: 0,
                duration: 0.5,
                stagger: {
                    from: "end",
                    amount: 0.25
                }
            }, "<85%")
            .from(Array.from(details[3].children).slice(0, 2), {
                opacity: 0,
                duration: 0.5,
                stagger: {
                    from: "end",
                    amount: 0.25
                }
            }, "<")


    })

}