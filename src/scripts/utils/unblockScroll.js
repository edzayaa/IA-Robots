import { resolution } from "./resolution";

export function unblockScroll() {
    if (resolution.isPortrait) {
        ScrollTrigger.normalizeScroll(true)
    } else {
        const scrollbar = ScrollSmoother.get()
        scrollbar?.paused(false);
    }
}