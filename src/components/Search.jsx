import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useTransition, animated as a, config } from "@react-spring/web";
import "@styles/search.scss";
import { useEffect, useRef, useState } from "react";
import ButtonPrimary from "./ButtonPrimary";
import { v4 as uuid } from "uuid";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@styles/field.scss";

const searchResults = new Array(8).fill(null);

export default function Search({}) {
  const [open, setOpen] = useState(false);
  const transitions = useTransition(open, {
    from: { opacity: 0, y: "-100%" },
    enter: { opacity: 1, y: "0%" },
    leave: { opacity: 0, y: "-100%" },
    config: config.slow,
  });
  const headerRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    headerRef.current = document.querySelector("header");
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button aria-label="Click to search">
          <img src="/icons/magnifier.svg" alt="Search" width={20} height={20} />
        </button>
      </Dialog.Trigger>
      {transitions((styles, item) =>
        item ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay id="search-overlay" asChild>
              <a.div style={{ opacity: styles.opacity }} />
            </Dialog.Overlay>

            <Dialog.Content aria-describedby={undefined} asChild>
              <a.div className="search-bar" style={{ y: styles.y }}>
                <VisuallyHidden>
                  <Dialog.Title />
                </VisuallyHidden>
                <div className="head">
                  <div className="field">
                    <input
                      id="search-field"
                      type="text"
                      className="paragraph-1 text-start"
                      placeholder="Search ..."
                    />
                    <button
                      aria-label="Click to search"
                      className="flex-center btn-search"
                    >
                      <img src="/icons/magnifier.svg" alt="" loading="lazy" width={20} height={20} />
                    </button>
                  </div>
                </div>
                <div className="results">
                  <Splide
                    className="list-results"
                    hasTrack={false}
                    options={{
                      autoHeight: true,
                      autoWidth: true,
                      pagination: false,
                      gap: "4vw",
                      padding: "2.5vw",
                      breakpoints: {
                        1080: {
                          padding: "5vw",
                        },
                      },
                    }}
                    onMounted={(self) => {
                      const value =
                        window.innerHeight > window.innerWidth ? 0 : -2;
                      const end = self.Components.Controller.getEnd() + value;
                      const rate = Math.min((self.index + 1) / end, 1);
                      gsap.set(progressBarRef.current, {
                        scaleX: rate,
                      });
                    }}
                    onMove={(self) => {
                      const value =
                        window.innerHeight > window.innerWidth ? 0 : -2;
                      const end = self.Components.Controller.getEnd() + value;
                      const rate = Math.min((self.index + 1) / end, 1);
                      gsap.set(progressBarRef.current, {
                        scaleX: rate,
                      });
                    }}
                    aria-label="Main product images"
                    id="main-splide"
                  >
                    <SplideTrack>
                      {searchResults.map((result) => (
                        <SplideSlide className="result" key={uuid()}>
                          <div className="pic">
                            <img
                              src="/images/search/1.png"
                              alt=""
                              loading="lazy"
                            />
                          </div>
                          <p className="subtitle-3 color-white">
                            Unitree Go2-W
                          </p>
                          <div className="info">
                            <span className="paragraph-1">From: </span>
                            <strong className="paragraph-1 color-white">
                              $1.120
                            </strong>
                          </div>
                        </SplideSlide>
                      ))}
                    </SplideTrack>
                    <div className="bar-arrows">
                      <div className="my-slider-progress">
                        <div
                          className="my-slider-progress-bar"
                          ref={progressBarRef}
                        ></div>
                      </div>

                      <div className="splide__arrows">
                        <button className="splide__arrow splide__arrow--prev">
                          <img
                            src="/icons/arrow_right_long.svg"
                            alt=""
                            loading="lazy"
                          />
                        </button>
                        <button className="splide__arrow splide__arrow--next">
                          <img
                            src="/icons/arrow_right_long.svg"
                            alt=""
                            loading="lazy"
                          />
                        </button>
                      </div>
                    </div>
                  </Splide>
                </div>
              </a.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null,
      )}
    </Dialog.Root>
  );
}
