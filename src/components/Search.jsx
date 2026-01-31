import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useTransition, animated as a, config } from "@react-spring/web";
import "@styles/search.scss";
import { useEffect, useRef, useState } from "react";
import ButtonPrimary from "./ButtonPrimary";
import { v4 as uuid } from "uuid";

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

  useEffect(() => {
    headerRef.current = document.querySelector("header");
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button aria-label="Click to search">
          <img src="/icons/magnifier.svg" alt="Search" />
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
                      type="text"
                      className="paragraph-1 text-start"
                      placeholder="Search ..."
                    />
                    <button
                      aria-label="Click to search"
                      className="flex-center"
                    >
                      <img src="/icons/magnifier.svg" alt="" loading="lazy" />
                    </button>
                  </div>
                </div>
                <div className="results">
                  <div className="list-results">
                    {searchResults.map((result) => (
                      <div className="result" key={uuid()}>
                        <div className="pic">
                          <img
                            src="/images/search/1.png"
                            alt=""
                            loading="lazy"
                          />
                        </div>
                        <p className="subtitle-3 color-white">Unitree Go2-W</p>
                        <div className="info">
                          <span className="paragraph-1">From: </span>
                          <strong className="paragraph-1 color-white">
                            $1.120
                          </strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </a.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null,
      )}
    </Dialog.Root>
  );
}
