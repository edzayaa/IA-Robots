export function video_media() {
    const mediaElems = Array.from(document.querySelectorAll("video.media"));
    if (import.meta.env.DEV) {
        mediaElems.forEach((media) => {
            media.addEventListener("playing", () => {
                media.pause()
            })
            media.play()
        })
        return;
    }

    mediaElems.forEach((media, index) => {
        ScrollTrigger.create({
            trigger: media,
            start: "top bottom+=10%",
            onEnter: () => {
                if (!media.paused) return;
                // console.log("played", index)
                media.play()

            }
        })
    })

}