import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useEffect, useRef } from "react";

export default function ProductSplides({ className }) {
  const mainSplideRef = useRef(null);
  const thumbnailSplideRef = useRef(null);

  useEffect(() => {
    console.log("mounted");
    if (
      mainSplideRef.current &&
      thumbnailSplideRef.current &&
      thumbnailSplideRef.current.splide
    ) {
      mainSplideRef.current.sync(thumbnailSplideRef.current.splide);
    }
  }, []);

  return (
    <div className={`shots ${className || ""}`} id="product-splides">
      <Splide
        ref={mainSplideRef}
        options={{
          type: "fade",
          autoHeight: true,
          autoWidth: true,
          rewind: true,
          pagination: false,
          arrows: false,
        }}
        aria-label="Main product images"
        id="main-splide"
      >
        <SplideSlide>
          <img src="/images/product_page/robot.png" alt="Image 1" />
        </SplideSlide>
        <SplideSlide>
          <img src="/images/product_page/robot_2.png" alt="Image 2" />
        </SplideSlide>
        <SplideSlide>
          <img src="/images/product_page/robot.png" alt="Image 2" />
        </SplideSlide>{" "}
        <SplideSlide>
          <img src="/images/product_page/robot_2.png" alt="Image 2" />
        </SplideSlide>{" "}
        <SplideSlide>
          <img src="/images/product_page/robot.png" alt="Image 2" />
        </SplideSlide>{" "}
      </Splide>

      <Splide
        ref={thumbnailSplideRef}
        options={{
          gap: "0.5vw",
          autoHeight: true,
          autoWidth: true,
          pagination: false,
          arrows: false,
          focus: "center",
          rewind: true,
        }}
        onClick={(splide, slide) => {
          console.log("clicked", slide);
          mainSplideRef.current.go(slide.index);
        }}
        aria-label="Main product images"
        id="thumbnail-splide"
      >
        <SplideSlide>
          <img src="/images/product_page/1.png" alt="Image 1" />
        </SplideSlide>
        <SplideSlide>
          <img src="/images/product_page/2.png" alt="Image 2" />
        </SplideSlide>
        <SplideSlide>
          <img src="/images/product_page/3.png" alt="Image 2" />
        </SplideSlide>
        <SplideSlide>
          <img src="/images/product_page/4.png" alt="Image 2" />
        </SplideSlide>
        <SplideSlide>
          <img src="/images/product_page/5.png" alt="Image 2" />
        </SplideSlide>
      </Splide>
    </div>
  );
}
