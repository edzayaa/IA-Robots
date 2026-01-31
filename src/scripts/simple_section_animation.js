import { breakPoints, mm } from "./utils/resolution";

export function simple_section_animation() {

    mm.add(breakPoints, (context) => {
        const { isPortraitRes } = context.conditions;

        if (isPortraitRes) return;
        const simpleSections = gsap.utils.toArray(".simple-section")


        simpleSections.forEach(section => {
            const children = Array.from(section.children)
                .filter(child => !child.classList.contains("no-anim-simple"));

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                    id: "simple-section",
                }
            })
                .from(children, {
                    opacity: 0,
                    stagger: 0.2,
                    ease: "power1.in"
                })
                .from(children, {
                    y: "5vw",
                    stagger: 0.2
                }, 0)
        });
    })

}