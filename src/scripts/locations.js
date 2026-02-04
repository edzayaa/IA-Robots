import { breakPoints, mm } from "./utils/resolution";

export function locations() {
    mm.add(breakPoints, (context) => {
        const { isPortraitResPhone } = context.conditions;

        if (isPortraitResPhone) {
            const mobileToggle = gsap.utils.toArray("#mobile-toggle")[0];

            const popup = gsap.utils.toArray(".popup")[0];
            const popupTl = gsap.timeline({
                paused: true,
            })

                .fromTo(popup, {
                    yPercent: 0,
                }, {
                    yPercent: 80,
                    ease: "power1.out",
                })

            mobileToggle.addEventListener("click", () => {
                if (popupTl.progress() === 0) {
                    popupTl.tweenTo(popupTl.totalDuration());
                } else {
                    popupTl.tweenTo(0);
                }
            })
        }

    })
}