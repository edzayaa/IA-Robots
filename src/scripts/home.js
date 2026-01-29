import Splide from "@splidejs/splide";
import "@splidejs/splide/css";
import { intro, preloader } from "./preloader";
import { breakPoints, mm, resolution } from "./utils/resolution";

export function home() {

    let lineSpan;
    let splideIndicatorButtons;
    let heroSplide;
    let redefiningSplideMobile;
    let targetSplideMobile;

    mm.add(breakPoints, ({ conditions }) => {
        const { isPortraitRes, isDesktopRes } = conditions;



        function launch() {
            if (import.meta.env.DEV) console.log("mounted")
            gsap.set("#hero-section", {
                opacity: 1,
                delay: 0.5,
            })
            const preloaderTl = preloader();
            preloaderTl.progress(0).timeScale(1).tweenTo(preloaderTl.totalDuration())
        }


        function heroSection() {
            heroSplide = new Splide("#hero-splide", {
                type: "fade",
                rewind: true,
                autoplay: import.meta.env.PROD,
                interval: 3500,
                speed: 2000,
                pauseOnHover: false,
                pauseOnFocus: false,
                arrows: true,
                pagination: false,
            })


            heroSplide.on("mounted", launch)
            heroSplide.mount();


            lineSpan = document.querySelector(
                ".carousel-line span"
            );
            splideIndicatorButtons = document.querySelectorAll(
                ".carousel-steps button"
            );

            const totalSlides = heroSplide.length;
            const stepWidth = 100 / totalSlides;

            heroSplide.on("move", (newIndex) => {
                gsap.set(lineSpan, {
                    xPercent: newIndex * stepWidth + 15,
                });
            });

            splideIndicatorButtons.forEach(
                (button, index) => {
                    button.addEventListener("click", () => {
                        heroSplide.go(index);
                    });
                }
            );

            gsap.set(lineSpan, {
                xPercent: 15,
            });
        }

        function autonomySection() {
            if (isPortraitRes) return;
            const autonomyTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#autonomy-section > .h2-wrapper",
                    start: "top bottom-=10%",
                    end: "top top",
                    endTrigger: "#autonomy-section",
                    scrub: isDesktopRes,
                    toggleActions: "restart none none reset",
                }
            })
                .from("#autonomy-section .h2-wrapper h2", {
                    yPercent: 105,
                    duration: 1.5,
                })
                .from(".autonomy-details > .detail", {
                    yPercent: 100,
                    stagger: 0.25,
                }, "<25%")
                .from(".autonomy-details > .detail", {
                    opacity: 0,
                    ease: "power1.in",
                    duration: 0.4,
                    stagger: 0.2,
                }, "<")
                .from(".autonomy-robot", {
                    yPercent: isPortraitRes ? 0 : -20,
                    rotateZ: isPortraitRes ? 0 : 5,
                    scale: isPortraitRes ? 0.85 : 0.75,
                    duration: 1.5,
                }, 0)
        }

        function redefiningSection() {
            if (isDesktopRes) {
                const redefTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#redefining-section > .head",
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                    }
                })
                    .from("#redefining-section > .head > .h2-wrapper > h2", {
                        yPercent: 110,
                    })
                    .from("#redefining-section > .head > p", {
                        opacity: 0,
                        ease: "power1.in"
                    }, "<15%")
                    .from("#redefining-section > .info", {
                        y: "10vw",
                    }, "<15%")
                    .from("#redefining-section > .info > .splide > .splide__track > .splide__list > .splide__slide", {
                        y: "10vw",
                        stagger: 0.1,
                        duration: 0.25
                    }, "<10%")


                return
            };

            redefiningSplideMobile = new Splide("#redefining-section > .info > .splide", {
                autoHeight: true,
                autoWidth: true,
                arrows: false,
                pagination: false,
                gap: "3vw",
                padding: "3vw",
                autoplay: import.meta.env.PROD,
                interval: 2000,
                speed: 2000,
                rewind: true,
                pauseOnHover: false,
                pauseOnFocus: false,
            }).mount()

            const loadedBar = document.querySelector(
                "#redefining-progress-bar > .loaded"
            );

            redefiningSplideMobile.on("move", (newIndex) => {
                gsap.set(loadedBar, {
                    scaleX: (newIndex + 1) * 1 / 3,
                });
            });

            gsap.set(loadedBar, {
                scaleX: 1 / 3,
            });
        }

        function targetSection() {

            const targetVideos = gsap.utils.toArray(
                "#target-section .splide .splide__track .list .item video.media"
            );

            const targetEntrance = gsap.timeline({
                scrollTrigger: {
                    trigger: "#target-section",
                    start: "top bottom",
                    onEnter: () => {
                        targetVideos.forEach((video) => {
                            if (!video.paused) return;
                            console.log("playing...");
                            video.addEventListener("canplay", () => video.play());
                            video.load();
                        });
                    },
                },
            });


            if (isDesktopRes) {

                const targetTL = gsap
                    .timeline({
                        scrollTrigger: {
                            trigger: "#target-section",
                            start: "top top",
                            end: "top top+=20%",
                            endTrigger: "#target-section .splide .splide__track .list  .item:last-of-type",
                            scrub: true,
                            pin: "#target-section > .head",
                            pinSpacing: true,
                            anticipatePin: 1,
                        },
                    })
                    .to("#target-section .splide .splide__track .list .item:nth-of-type(1) > video", {
                        scale: 0.85,
                        opacity: 0,
                        ease: "power1.in",
                    })
                    .to(
                        "#target-section .head .progress .steps-container .steps",
                        {
                            yPercent: -100 / 2.6,
                            ease: "linear",
                        },
                        "<"
                    )
                    .fromTo(
                        "#target-progress-bar .loaded",
                        {
                            scaleY: 0.15,
                        },
                        {
                            scaleY: 2 / 3,
                            ease: "linear",
                        },
                        "<"
                    )
                    // .fromTo(
                    //   ".bar .glow",
                    //   {
                    //     y: "-2vw",
                    //     ease: "linear",
                    //   },
                    //   {
                    //     y: "1.5vw",
                    //     ease: "linear",
                    //   },
                    //   "<"
                    // )
                    .from(
                        "#target-section .list .item:nth-of-type(2) > .media",
                        {
                            scale: 0.5,
                            filter: "blur(2vw)",
                            ease: "power1.out",
                        },
                        "<"
                    )
                    .from(
                        [
                            "#target-section .list .item:nth-of-type(2) p",
                            "#target-section .list .item:nth-of-type(2) span",
                        ],
                        {
                            y: "5vw",
                            x: "5vw",
                            ease: "power1.inOut",
                        },
                        "<"
                    )
                    .from(
                        [
                            "#target-section .list .item:nth-of-type(2) p",
                            "#target-section .list .item:nth-of-type(2) span",
                        ],
                        {
                            opacity: 0,
                            ease: "power1.in",
                        },
                        "<"
                    )

                    .to("#target-section .list .item:nth-of-type(2) > video", {
                        scale: 0.85,
                        opacity: 0,
                        ease: "power1.in",
                    })
                    .to(
                        "#target-section .head .progress .steps-container .steps",
                        {
                            yPercent: (-100 * 2) / 2.6,
                            ease: "linear",
                        },
                        "<"
                    )
                    .to(
                        "#target-progress-bar .loaded",
                        {
                            scaleY: 1,
                            ease: "linear",
                        },
                        "<"
                    )
                    .from(
                        "#target-section .list .item:nth-of-type(3) > picture",
                        {
                            scale: 0.5,
                            filter: "blur(2vw)",
                            ease: "power1.out",
                        },
                        "<"
                    )
                    .from(
                        [
                            "#target-section .list .item:nth-of-type(3) p",
                            "#target-section .list .item:nth-of-type(3) span",
                        ],
                        {
                            y: "5vw",
                            x: "5vw",
                            ease: "power1.inOut",
                        },
                        "<"
                    )
                    .from(
                        [
                            "#target-section .list .item:nth-of-type(3) p",
                            "#target-section .list .item:nth-of-type(3) span",
                        ],
                        {
                            opacity: 0,
                            ease: "power1.in",
                        },
                        "<"
                    );
            } else {
                targetSplideMobile = new Splide("#target-section .splide", {
                    autoHeight: true,
                    autoWidth: true,
                    arrows: false,
                    pagination: false,
                    autoplay: import.meta.env.PROD,
                    interval: 2500,
                    speed: 500,
                    rewind: true,
                    pauseOnHover: false,
                    pauseOnFocus: false,
                    breakpoints: {
                        1024: {
                            padding: "6.5vw",
                        },
                        680: {
                            padding: "4.5vw",
                        }
                    }
                }).mount()

                const loadedBar = document.querySelector(
                    "#target-progress-bar-mob > .loaded"
                )

                targetSplideMobile.on("move", (newIndex) => {
                    gsap.set(loadedBar, {
                        scaleX: (newIndex + 1) * 1 / targetSplideMobile.length,
                    });
                });

                gsap.set(loadedBar, {
                    scaleX: 1 / targetSplideMobile.length,
                });
            }


        }

        function futureSection() {
            const futureTL = gsap
                .timeline({
                    scrollTrigger: {
                        trigger: "#future-section",
                        start: "top bottom",
                        end: "top top+=10%",
                        scrub: isDesktopRes,
                        toggleActions: "restart none none reset",
                    },
                })
                .from("#future-section picture .bck", {
                    yPercent: -45,
                    duration: 1,
                })
                .fromTo(
                    "#future-section picture .bck",
                    {
                        scale: 2,
                    },
                    {
                        scale: 1.05,
                        duration: 1,
                    },
                    "<"
                )
                .from(
                    "#future-section picture .bck",
                    {
                        opacity: 0,
                        ease: "power1.in",
                        duration: 0.25,
                    },
                    "<"
                )

                .from(
                    [
                        "#future-section h2",
                        "#future-section p",
                        "#future-section button",
                    ],
                    {
                        opacity: 0,
                        ease: "power1.in",
                        stagger: 0.2,
                    },
                    0.25
                )
            if (isPortraitRes) {
                futureTL.totalDuration(2.5)
            }

            if (isDesktopRes) {
                futureTL
                    .from(
                        [
                            "#future-section h2",
                            "#future-section p",
                            "#future-section button",
                        ],
                        {
                            y: "7.5vw",
                            stagger: 0.1,
                        },
                        0.25
                    )
            }
        }

        heroSection();
        autonomySection()
        redefiningSection()
        targetSection();
        futureSection();



        return () => {
            heroSplide?.destroy()
            targetSplideMobile?.destroy()
            redefiningSplideMobile?.destroy()
        }
    })


    // document.addEventListener("astro:before-preparation", () => {
    //     splide.destroy();
    //     console.log("before-prep, home")
    // });


}