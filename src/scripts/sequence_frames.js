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
    if (sequenceRes && sequenceRes.length > 0 && sequenceRes[0] !== null) {
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
    const sequenceSection = document.querySelector('.sequence-section');

    if (!sequenceSection) {
        console.log("Sequence element not found.");
        return
    };
    const selector = gsap.utils.selector(sequenceSection);
    const content = selector(".content")[0];

    const contentElems = selector(".content > *");
    const sequencePin = selector(".sequence-pin")[0];
    const sequenceCanvas = selector(".sequence-canvas")[0];
    const canvas = selector("#sequence-canvas")[0];
    const ctx = canvas.getContext("2d");

    const sequence = {
        frame: 0,
    }


    const entrance = gsap.timeline({
        scrollTrigger: {
            trigger: sequenceSection,
            start: "top bottom",
            end: "top top",
            scrub: true,
        }
    })
        .fromTo(sequenceCanvas, {
            yPercent: window.innerHeight > window.innerWidth ? -5 : -35,
        }, {
            yPercent: 0,
            duration: 2,
        })
        .from(sequenceCanvas, {
            opacity: 0,
            duration: 1.5,
            ease: "power1.in"
        }, "<")
        .from(contentElems, {
            opacity: 0,
            y: "5vw",
            stagger: 0.25,
            duration: 0.75
        }, 1)
        .fromTo(content, {
            y: "20vw",
        }, {
            y: "0vw",
            ease: "power1.out",
            duration: 1.5,
        }, "<")
     
        .to(content, {
            autoAlpha: 0, ease: "power1.in",
            duration: 0.25,
        }, "-=0.25")

    ScrollTrigger.create({
        trigger: sequenceSection,
        start: "top top",
        end: "bottom top",
        markers: false,
        pin: sequencePin,
        pinSpacing: false,
    })

    const imagesPaths = JSON.parse(sequenceCanvas.dataset.images);
    // let resImages = new Array(imagesPaths.length).fill(null);

    const resImages = await imagesLoader(imagesPaths);


    mm.add(breakPoints, (context) => {
        const { isPortraitRes } = context.conditions;
        isPortrait = isPortraitRes;


        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: sequenceSection,
                start: "top bottom",
                end: isPortraitRes ? "bottom center" : "bottom top+=35%",
                scrub: true,
            },
            defaults: {
                duration: 1,
            }
        })
            .fromTo(
                sequence,
                {
                    frame: 0,
                },
                {
                    frame: resImages.length - 1,
                    snap: "frame",
                    ease: "none",
                    onUpdate: () => render(resImages, sequence, ctx),
                },
            )
            .from(gsap.utils.toArray(".spec:nth-of-type(1) > .wrapper-seq-elem > *"), {
                yPercent: 100,
                duration: 0.1
            }, 0.15)
            .to(".spec:nth-of-type(1)", {
                autoAlpha: 0, ease: "power1.in",
                duration: 0.1,
            }, ">")
            .from(gsap.utils.toArray(".spec:nth-of-type(2) > .wrapper-seq-elem > *"), {
                yPercent: 100,
                duration: 0.1
            }, ">")
            .to(".spec:nth-of-type(2)", {
                autoAlpha: 0, ease: "power1.in",
                duration: 0.1,
            }, ">")
            .from(gsap.utils.toArray(".spec:nth-of-type(3) > .wrapper-seq-elem > *"), {
                yPercent: 100,
                duration: 0.1
            }, ">")
            .to(".spec:nth-of-type(3)", {
                autoAlpha: 0, ease: "power1.in",
                duration: 0.1,
            }, ">")
            .from(gsap.utils.toArray(".spec:nth-of-type(4) > .wrapper-seq-elem > *"), {
                yPercent: 100,
                duration: 0.1
            }, ">")
            .to(".spec:nth-of-type(4)", {
                autoAlpha: 0, ease: "power1.in",
                duration: 0.1,
            }, ">")


        gsap.set(".wrapper-seq-elem", {
            opacity: 1
        })

    })
    sizing(canvas);

    ScrollTrigger.refresh()


    window.addEventListener("resize", () => {
        sizing(canvas, isPortrait);
        render(resImages, sequence, ctx);
    });
}