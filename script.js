let search_input = document.querySelector(".inp_box")
let search_svg = document.querySelector(".search_svg")

search_input.addEventListener("mouseover", () =>{ 
    search_svg.classList.add("hovered_svg");
})
search_input.addEventListener("mouseout", () =>{
    search_svg.classList.remove("hovered_svg");
})
search_input.addEventListener("focus", () => {
    // search_input.style.border = "none"  fix border
    search_input.id = "hovered_inp"
    search_svg.id = "hovered_svg"
});
search_input.addEventListener("blur", () => {
    // search_input.style.border = ""
    search_input.id = ""
    search_svg.id = ""
});