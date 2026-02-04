import { breakPoints, mm } from "./utils/resolution";


export function careers() {
    mm.add(breakPoints, (context) => {

        const careers = gsap.utils.toArray(".career");

        function setTweens(timeline, btnIcon, content,) {
            timeline.pause().clear().revert()
            gsap.set(content, {
                height: "initial",
            })

            timeline
                .fromTo(content,
                    { height: 0 + "px" },
                    { height: content.offsetHeight, ease: "power1.inOut" }
                )
                .fromTo(
                    content,
                    { autoAlpha: 0 },
                    { autoAlpha: 1, ease: "power1.inOut" },
                    "<"
                )
                .fromTo(btnIcon, {
                    rotate: 0,
                }, {
                    rotate: -180,
                    ease: "power1.inOut",
                }, "<"
                )
            timeline.progress(0)
        }

        careers.forEach((career, index) => {
            const selector = gsap.utils.selector(career);
            const content = selector(".content")[0];
            const btn = selector("button")[0];
            const btnIcon = selector("button img")[0];


            const timeline = gsap.timeline({ paused: true, });

            btn.addEventListener("click", () => {
                if (timeline.progress() == 0) timeline.tweenTo(timeline.totalDuration());
                else timeline.tweenTo(0);
            })

            window.addEventListener("resize", () => setTweens(timeline, btnIcon, content));
            setTweens(timeline, btnIcon, content);

        });

    })

}