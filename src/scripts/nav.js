export function nav() {

    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    const subNavs = Array.from(document.querySelectorAll(".sub-nav"));

    navLinks.forEach((link, index) => {
        link.addEventListener("mouseenter", () => {
            subNavs[index].classList.add("hover");
            subNavs.forEach((subNav, i) => {
                if (i + 1 == index) subNav.classList.add("hover");
                else subNav.classList.remove("hover");

                subNav.addEventListener("mouseleave", () => {
                    subNav.classList.remove("hover");
                });
            });
        });
    });

    window.addEventListener("click", ({ target }) => {
        if (target.classList.contains("nav-link") || target.classList.contains("sub-nav")) return;
        subNavs.forEach((subNav) => {
            subNav.classList.remove("hover");
        });
    })
}