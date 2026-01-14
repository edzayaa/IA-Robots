export function readPathname() {
    return document.querySelector("html")?.dataset.page || "";
}