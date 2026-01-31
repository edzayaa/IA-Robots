import { breakPoints, mm } from "./utils/resolution";

export function table_animation() {

    mm.add(breakPoints, (context) => {
        const { isPortraitRes } = context.conditions;

        if (isPortraitRes) return;


        const tRows = gsap.utils.toArray("#tech-section .table .robot-spec-table tr");

        const techSection = gsap.utils.toArray("#tech-section")[0];
        const table = gsap.utils.toArray("#tech-section .table")[0];

        const head = gsap.utils.toArray("#tech-section .table .head")[0];

        const introElements = [
            "#tech-section .table .head .line-element",
            "#tech-section .table .head h2",
        ]

        const techHeadTl = gsap.timeline({
            scrollTrigger: {
                trigger: head,
                start: "top bottom-=10%",
                end: "bottom bottom-=10%",
                scrub: true,
            }
        })
            .from(introElements, {
                opacity: 0,
                stagger: 0.1,
            })


        tRows.forEach(tr => {

            const tRowsTl = gsap.timeline({
                scrollTrigger: {
                    trigger: tr,
                    start: "top bottom-=15%",
                    end: "bottom bottom-=10%",
                    scrub: true,
                }
            })

                .from(tr, {
                    yPercent: 10,
                }, 0)
                .from(tr, {
                    opacity: 0,
                }, 0)


        })

    })


}