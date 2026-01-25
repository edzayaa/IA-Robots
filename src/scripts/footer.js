import { breakPoints, mm } from "./utils/resolution";

export function footer() {

    mm.add(breakPoints, ({ conditions }) => {
        const { isPortraitResPhone } = conditions;

        if (isPortraitResPhone) {
            const linksGroups = gsap.utils.toArray("footer .links");
            let allClosedHeight = 0;
            const accordionTls = [];

            linksGroups.forEach((group, index) => {
                const selector = gsap.utils.selector(group);
                const links = selector("a");
                const button = selector("button")[0];
                const arrow = selector("button img")[0];

                if (index == 0) allClosedHeight = group.offsetHeight;

                gsap.set(links, {
                    display: "block"
                })

                group.openHeight = group.offsetHeight;

                const accordionTl = gsap.timeline({
                    paused: true,
                })
                    .fromTo(group, {
                        height: allClosedHeight,
                    }, {
                        height: group.openHeight,
                    })
                    .to(
                        arrow,
                        {
                            rotate: 180,
                        }, "<")

                accordionTl.reversed(true)
                accordionTls.push(accordionTl)

                button.addEventListener("click", () => {
                    accordionTls.forEach((tl, i) => {
                        if (index == i) { tl.reversed() ? tl.play() : tl.reverse(); }
                        else tl.reverse();
                    })
                })

            })

            return;
        };

        const footer = document.querySelector("footer");
        if (!footer) return;
        const footerTL = gsap
            .timeline({
                scrollTrigger: {
                    trigger: "footer > .brand",
                    start: "top bottom",
                    end: "top bottom-=5%",
                    scrub: true,
                    id: "footer"
                },
            })
            .to(
                "header > .brand-link",

                {
                    autoAlpha: 0,
                }
            );
    })

}