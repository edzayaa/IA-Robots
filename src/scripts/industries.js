export function industries() {

    const industriesDescriptions = Array.from(document.querySelectorAll(".industry > p"));


    industriesDescriptions.forEach((description) => {
            const newText = description.textContent.slice(0, 175);
            description.textContent = newText + "...";
    });
}