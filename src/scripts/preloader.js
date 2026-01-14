import { navigate } from "astro:transitions/client";

export function preloader(progress = 0) {
    let preloaderTl;

    let ctx = gsap.context(() => {


        preloaderTl = gsap.timeline({
            paused: true,
            defaults: {
                duration: 0.25,
            },
            onReverseComplete: () => {
                navigate("/")
            },
        }
        )
            .progress(progress)
            .to("#preloader > .logo > img", {
                yPercent: -100,
                ease: "power1.inOut",
                immediateRender: false,
                delay: 1,
            })
            .fromTo("#preloader", {
                autoAlpha: 1,
            }, {
                autoAlpha: 0,
                immediateRender: false,
                duration: 1,
            }, "<50%");

    })

    document.addEventListener("astro:before-swap", () => {
        ctx.revert()
    })

    return preloaderTl;


}

export function intro() {
    let introTl;
    

    let ctx = gsap.context(() => {

        console.log("creating intro...!")



        introTl = gsap.timeline({
            paused: true,
            defaults: {
                duration: .25,
            },
        })
            .fromTo("#preloader > .logo > img", {
                yPercent: 100,
                opacity: 0,
            }, {
                yPercent: 0,
                opacity: 1,
                ease: "power1.out",
            })

    })

    document.addEventListener("astro:before-swap", () => {
        ctx.revert()

    })


    return introTl;
}