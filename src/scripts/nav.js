import { navigate } from "astro:transitions/client";

export function nav() {

    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    const subNavs = Array.from(document.querySelectorAll(".sub-nav"));

    function mouseenter(index) {
        subNavTls.forEach((tl, i) => {
            if (i + 1 == index) tl.timeScale(1).tweenTo(tl.totalDuration())
            else tl.timeScale(3).tweenTo(0)
        });
    }
    function mouseleave(tl) {
        tl.timeScale(3).tweenTo(0)

    }

    const subNavTls = subNavs.map((subNav, i) => {
        const selector = gsap.utils.selector(subNav);
        const subNavElems = selector("a");

        const tl = gsap.timeline({
            paused: true,
        })
            .fromTo(subNav, {
                autoAlpha: 0,
                y: "2vw",
            }, {
                autoAlpha: 1,
                y: "0.5vw",
                duration: 0.25,
            })
            .from(subNavElems, {
                opacity: 0,
                stagger: 0.05,
                duration: 0.2,
                ease: "power1.in",
            }, "<25%")

        subNav.addEventListener("mouseleave", () => mouseleave(tl));
        subNavElems.forEach(a => {
            a.addEventListener("click", e => {
                e.preventDefault();
                tl.timeScale(3).tweenTo(0);

                tl.eventCallback("onReverseComplete", () => {
                    navigate(a.getAttribute("href"));
                })
            })
        })

        return tl;
    });

    navLinks.forEach((link, index) => {
        link.addEventListener("mouseenter", () => mouseenter(index));
    });



    window.addEventListener("click", ({ target }) => {
        if (target.classList.contains("nav-link") || target.classList.contains("sub-nav")) return;

        subNavs.forEach((subNav) => {
            subNav.removeEventListener("mouseleave", () => mouseleave(tl));
        })
        navLinks.forEach((link, index) => {
            link.removeEventListener("mouseenter", () => mouseenter(index));
        });

        subNavTls.forEach(tl => {
            tl.tweenTo(0)
        })
    })

    // document.addEventListener("astro:before-swap", () => {
    //     subNavs.forEach((subNav) => {
    //         subNav.removeEventListener("mouseleave", () => mouseleave(tl));
    //     })
    //     navLinks.forEach((link, index) => {
    //         link.removeEventListener("mouseenter", () => mouseenter(index));
    //     });
    //     subNavTls.forEach((tl) => {
    //         tl.kill();
    //     });
    // })
}