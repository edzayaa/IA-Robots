import { preloader } from "./preloader";
import { readPathname } from "./utils/pathname";

let homeLinks;

export function goHome() {
    homeLinks = gsap.utils.toArray(".home-link");

    function handleHomeLink(e) {
        e.preventDefault();
        const pathname = readPathname()
        if (pathname === "/") return;
        console.log("going home")

        const preloaderTl = preloader(1);

        const preloaderElem = document.getElementById("preloader");
        if (preloaderElem.classList.contains("invisible"))
            preloaderElem.className = "";

        preloaderTl
            .timeScale(2)
            .tweenFromTo(preloaderTl.totalDuration(), 0);
    }


    homeLinks.forEach(link => {
        link?.addEventListener("click", handleHomeLink)
    });

    document.addEventListener("astro:before-swap", () => {

        homeLinks.forEach(link => {
            link?.removeEventListener("click", handleHomeLink)
        });

    })

}