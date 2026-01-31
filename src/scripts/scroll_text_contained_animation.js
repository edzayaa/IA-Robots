import { breakPoints, mm } from "./utils/resolution";

export function scroll_text_contained_animation() {
    const sections = gsap.utils.toArray(".scroll-text-contained");
    gsap.registerPlugin(SplitText);

    mm.add(breakPoints, (context) => {
        const { isDesktopRes } = context.conditions;


        if (isDesktopRes) {

            sections.forEach(section => {
                const selector = gsap.utils.selector(section);
                const content = selector(".content")[0];
                const media = selector(".media")[0];
                const texts = selector(".content > *");
                const splits = new SplitText(texts[0], {
                    type: "words,lines",
                    mask: "lines",
                    autoSplit: true,
                })

                const textTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "center bottom",
                        end: "bottom bottom-=15%",
                        scrub: true,
                    }
                })
                    .from(splits.lines, {
                        y: "-10vw",
                        duration: 1,
                        stagger: 0.5
                    }, 0)
                    .from(content, {
                        y: "-15vw",
                        duration: 2,
                        opacity: 0,
                        ease: "power1.inOut"
                    }, 0)
                    .from(texts[1], {
                        opacity: 0,
                    })



                const mediaTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                })
                    .fromTo(media, {
                        yPercent: -20,
                    }, {
                        yPercent: 20,
                        ease: "linear"
                    })


            });

        }


    })

}