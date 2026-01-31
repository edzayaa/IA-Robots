import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useTransition, animated as a, config } from "@react-spring/web";
import "@styles/sidecart.scss";
import { useState } from "react";
import ButtonPrimary from "./ButtonPrimary";
import { getImage } from "astro:assets";

export default function Sidecart({}) {
  const [open, setOpen] = useState(false);
  const transitions = useTransition(open, {
    from: { opacity: 0, x: "100%" },
    enter: { opacity: 1, x: "0%" },
    leave: { opacity: 0, x: "100%" },
    config: config.slow,
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button aria-label="Click to open the cart">
          <img src="/icons/bag.svg" alt="Cart" />
        </button>
      </Dialog.Trigger>
      {transitions((styles, item) =>
        item ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay id="sidecart" asChild>
              <a.div style={{ opacity: styles.opacity }} />
            </Dialog.Overlay>

            <Dialog.Content aria-describedby={undefined} asChild>
              <a.div className="cart" style={{ x: styles.x }}>
                <VisuallyHidden>
                  <Dialog.Title />
                </VisuallyHidden>
                <div className="head">
                  <span className="subtitle-3 color-white">Your cart</span>
                  <Dialog.Close asChild>
                    <button
                      className="flex-center"
                      aria-label="Click to close the cart"
                    >
                      <img src="/icons/close_cart.png" alt="" loading="lazy" />
                    </button>
                  </Dialog.Close>
                </div>
                <div className="cart-list">
                  <div className="item">
                    <div className="shot flex-center">
                      <img src="/images/menu/go2.png" alt="" />
                    </div>
                    <div className="info">
                      <p className="paragraph-1">Go2- W</p>
                      <span className="paragraph-1">quadruped</span>
                      <strong className="paragraph-1">$3.000</strong>
                    </div>
                    <div className="buttons">
                      <div class="counter">
                        <button class="flex-center">
                          <img
                            src="/icons/minus.svg"
                            alt="Minus Button"
                            loading="lazy"
                          />
                        </button>
                        <input type="text" class="flex-center" value="1" />
                        <button class="flex-center">
                          <img
                            src="/icons/plus.svg"
                            alt="Minus Button"
                            loading="lazy"
                          />
                        </button>
                      </div>
                      <button className="remove-btn paragraph-2 capitalize">
                        remove
                      </button>
                    </div>
                  </div>

                  <div className="item">
                    <div className="shot flex-center">
                      <img src="/images/menu/4d.png" alt="" />
                    </div>
                    <div className="info">
                      <p className="paragraph-1">4D LIDAR L2</p>
                      <span className="paragraph-1">manipulator</span>
                      <strong className="paragraph-1">$1.120</strong>
                    </div>
                    <div className="buttons">
                      <div class="counter">
                        <button class="flex-center">
                          <img
                            src="/icons/minus.svg"
                            alt="Minus Button"
                            loading="lazy"
                          />
                        </button>
                        <input type="text" class="flex-center" value="1" />
                        <button class="flex-center">
                          <img
                            src="/icons/plus.svg"
                            alt="Minus Button"
                            loading="lazy"
                          />
                        </button>
                      </div>
                      <button className="remove-btn paragraph-2 capitalize">
                        remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="checkout">
                  <div className="total">
                    <span>total</span>
                    <p>$36.60</p>
                  </div>
                  <ButtonPrimary content="checkout" />
                  <a className="continue">Continue Shopping</a>
                </div>
              </a.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null,
      )}
    </Dialog.Root>
  );
}
