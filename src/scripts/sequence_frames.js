import { breakPoints, mm } from "./utils/resolution";

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

function sizing(canvas, isPortrait = false) {
    if (isPortrait) return
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    canvas.width = sizes.width;
    canvas.height = sizes.height;
}

function imagesLoader(imagesPaths) {
    console.log("Loading images...");
    const imagesURLS = imagesPaths.map((img) => img.src);
    function loadImage(url) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", () => {
                resolve(image);
            });
            image.addEventListener("error", () =>
                reject(new Error(`Failed to load image: ${url}`)),
            );
            image.src = url;
        });
    }
    const imagePromises = imagesURLS.map(loadImage);
    return Promise.all(imagePromises);
}

function render(sequenceRes, sequenceRef, ctx) {
    if (sequenceRes && sequenceRes.length > 0) {
        scaleImage(sequenceRes[sequenceRef.frame], ctx);
    }
}
function scaleImage(img, ctx) {
    const canvas = ctx.canvas;
    const wRatio = canvas.width / img.width;
    const hRatio = canvas.height / img.height;
    const ratio = Math.max(wRatio, hRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    const fitWidth = img.width * ratio;
    const fitHeight = img.height * ratio;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        fitWidth,
        fitHeight,
    );
}

export async function sequence_frames() {

    let isPortrait;
    const sequenceElement = document.querySelector('.sequence-section');

    if (!sequenceElement) {
        console.log("Sequence element not found.");
        return
    };
    const selector = gsap.utils.selector(sequenceElement);
    const canvas = selector("#sequence-canvas")[0];
    const ctx = canvas.getContext("2d");

    const sequence = {
        frame: 0,
    }

    ScrollTrigger.create({
        trigger: sequenceElement,
        start: "top top",
        end: "bottom bottom",
        markers: import.meta.env.DEV,
        pin: canvas,
        pinSpacing: true,
    })

    const images = JSON.parse(sequenceElement.dataset.images);
    const res = await imagesLoader(images);

    mm.add(breakPoints, (context) => {
        const { isPortraitRes } = context.conditions;
        isPortrait = isPortraitRes;

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: sequenceElement,
                start: "top bottom",
                end: "bottom center+=25%",
                scrub: true,
            }
        })
            .fromTo(
                sequence,
                {
                    frame: 0,
                },
                {
                    frame: res.length - 1,
                    snap: "frame",
                    ease: "none",
                    onUpdate: () => render(res, sequence, ctx),
                },
            );
    })

    sizing(canvas);


    window.addEventListener("resize", () => {
        sizing(canvas, isPortrait);
        render(res, sequence, ctx);
    });
}