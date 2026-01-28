export function active_link() {
    const pathname = window.location.pathname;

    const navLinks = gsap.utils.toArray("nav .nav-link");
    const subNavLinks = gsap.utils.toArray(".sub-nav a");
    const mobileMenuLinks = gsap.utils.toArray("#menu a");

    const allLinks = [...navLinks, ...subNavLinks, ...mobileMenuLinks];

    allLinks.forEach((link) => {
        if (pathname == link.getAttribute("href") && !link.classList.contains("active")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}