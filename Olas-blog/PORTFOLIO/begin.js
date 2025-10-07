const viewed = document.getElementById("viewed");
viewed.addEventListener("click", () => {
    function openInNewTab(href) {
        if(viewed === "clicked"){
            window.open(href, '_blank').focus();
        }
    }
});