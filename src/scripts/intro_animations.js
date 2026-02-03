import { breakPoints, mm } from "./utils/resolution";

export function intro_animations() {
    mm.add(breakPoints, (context) => {
        const { isDesktopRes, isPortraitRes } = context.conditions;

        const intro_elements = gsap.utils.toArray(".intro-anim").filter(elem => {
            // checking resolution compatibility
            if (isDesktopRes) {
                if (elem.classList.contains("intro-mobile-only")) {
                    elem.classList.remove("intro-anim");
                    return false;
                }
                else return elem;
            }

            if (isPortraitRes) {
                if (elem.classList.contains("intro-desktop-only")) {
                    elem.classList.remove("intro-anim");
                    return false;
                }
                else return elem;
            }
        })

        if (intro_elements.length > 0) {

            const introAnim = gsap.timeline({
                defaults: {
                    duration: 1,
                    ease: "power2.out"
                },
                delay: .25,
            })
                .fromTo(intro_elements, {
                    autoAlpha: 0,
                    y: "2vw",
                }, {
                    autoAlpha: 1,
                    y: "0vw",
                    stagger: 0.15,
                })
        }


        const heroFirstScroll = gsap.timeline({
            scrollTrigger: {
                trigger: "section",
                start: "top top",
                end: "bottom top-=25%",
                scrub: true,
                id: "scroll-hero"
            }
        })
            .to("#hero-section", {
                opacity: 0,
            })

    })

}