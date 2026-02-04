import { breakPoints, mm } from "./utils/resolution";

export function legal() {
    const currentPage = document.querySelector("html")?.dataset.page || "";
    const path = window.location.pathname;
    const contentsLinks = gsap.utils.toArray(".contents-links a");
    const scroller = document.querySelector(".contents-scroller");

    contentsLinks.forEach((link) => {
        const linkPath = link.getAttribute("href");
        if (path === linkPath || currentPage === linkPath) {
            link.classList.add("current-page");
        } else {
            link.classList.remove("current-page");
        }
    });



    mm.add(breakPoints, (context) => {
        const { isPortraitResPhone } = context.conditions;

        if (isPortraitResPhone) {


            contentsLinks.forEach((link) => {
                if (link.classList.contains("current-page")) {
                    const left = link.offsetLeft;

                    scroller?.scrollTo({
                        top: 0,
                        left: left - window.innerWidth * 0.1,
                    });
                }
            });
            return;
        }

        const tabletPin = gsap.timeline({
            scrollTrigger: {
                trigger: ".table-contents",
                start: "top top+=15%",
                endTrigger: ".content-section",
                end: "bottom center",
                scrub: true,
                pin: true,
                pinSpacing: true,
                id: "table"
            }
        });


        const footerInfluence = gsap.timeline({
            scrollTrigger: {
                trigger: "footer",
                start: "top bottom-=15%",
                end: "top center",
                scrub: 1,
            }
        })
        footerInfluence.to([".table-contents > span", ".contents-links > *"], {
            autoAlpha: 0, stagger: {
                from: "end",
                each: 0.1,
            },
        })
    })


}
