import { useEffect } from "react";
import { v4 as uuid } from "uuid";

const faqs = new Array(8).fill({
  question: "What types of robots does Unitree produce? ",
  answer:
    " We specialize in high-performance quadruped robots (four-legged robots), such as the Go series (for enthusiasts, education, and light research) and the B2 series (for industrial inspection and heavy-duty applications). We also offer robotic arms (Z1) and other mobility platforms.",
});

export default function Faqs() {
  useEffect(() => {
    function accordions() {
      const accordions = gsap.utils.toArray(".faqs > *");

      const accordionsTls = accordions.map((faq, indexBox) => {
        const selector = gsap.utils.selector(faq);
        const arrowButton = selector(".question > .btn")[0];
        const shadow = selector("strong")[0];

        const tl = gsap.timeline({
          paused: true,
        });

        function createTweens() {
          gsap.set(faq, {
            height: "initial",
          });

          tl.pause()
            .clear()
            .revert()
            .fromTo(
              faq,
              {
                height: 0,
              },
              {
                height: faq.offsetHeight,
              },
            )
            .to(
              arrowButton,
              {
                rotate: 180,
              },
              0,
            )
            .fromTo(
              shadow,
              {
                opacity: 0,
              },
              {
                opacity: 1,
                duration: 0.125,
              },
              0,
            );
          // .fromTo(
          //   p,
          //   {
          //     autoAlpha: 0,
          //   },
          //   {
          //     autoAlpha: 1,
          //     duration: 0.25,
          //     delay: 0.25,
          //   },
          //   0,
          // )
          // .fromTo(
          //   accordionBox,
          //   {
          //     borderColor: "rgba(0,0,0,0)",
          //   },
          //   {
          //     borderColor: "#35220B",
          //     duration: 0.25,
          //     ease: "power1.in",
          //   },
          //   "<",
          // );

          if (indexBox == 0) tl.progress(1);
        }

        faq.addEventListener("click", () => {
          if (tl.progress() == 0) {
            tl.timeScale(1.5).tweenTo(tl.totalDuration());
          } else tl.timeScale(2).tweenTo(0);

          accordionsTls.forEach((accordionTL, index) =>
            indexBox != index ? accordionTL.tweenTo(0) : null,
          );
        });

        createTweens();
        window.addEventListener("resize", createTweens);

        return tl;
      });
    }

    accordions();
  }, []);

  return (
    <section className="faqs-section">
      <h3 className="h1">Frequently Asked Questions</h3>
      <p className="paragraph-1">
        If you can't find your answers, get in touch with us!
      </p>
      <div className="faqs m-b-5">
        {faqs.map((faq) => (
          <button className="faq" key={uuid()}>
            <strong></strong>
            <div className="question">
              <span>{faq.question} </span>
              <div className="btn">
                <img src="/icons/arrow_down.png" alt="" loading="lazy" />
              </div>
            </div>
            <p className="answer">{faq.answer}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
