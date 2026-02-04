
let hamburger;
let accordionGroups;
let menuBtn;

export function menu() {
    const btns = [];
    hamburger = document.getElementById("hamburger");
    accordionGroups = gsap.utils.toArray("#menu .accordion-group");
    menuBtn = document.getElementById("menu");

    if (!hamburger) return;


    function hamburgerClick() {
        if (menuBtn.classList.contains("open")) {
            accordionGroups.forEach((group) => {
                group.classList.add("hidden")
            })
        }
        menuBtn.classList.toggle("open");
        hamburger.classList.toggle("open");
    }

    function btnClick(index) {

        accordionGroups.forEach((group, i) => {
            if (index == i) group.classList.toggle("hidden")
        })

    }

    hamburger.addEventListener("click", hamburgerClick);

    accordionGroups.forEach((group, index) => {
        if (index == 0) return;

        const button = group.querySelector("button");
        btns.push(button)

        button.addEventListener("click", () => btnClick(index));
    });

    document.addEventListener("astro:before-swap", () => {
        hamburger.removeEventListener("click", hamburgerClick);


        accordionGroups.forEach((group, index) => {
            if (index == 0) return;

            const button = group.querySelector("button");
            // btns.push(button)

            button.removeEventListener("click", () => btnClick(index));

        });

        menuBtn.classList.remove("open");
        hamburger.classList.remove("open");
    });


}

