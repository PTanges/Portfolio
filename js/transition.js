/* Debug Information */
// console.log("The Current Time is: " + Date.now())

/* Javascript Functionality */
var current_page = "home";
var light_theme = "light";

function change_block_content(new_page){
    document.getElementById(current_page + "_" + "content").style.display = "none";   
    document.getElementById(new_page + "_" + "content").style.display = "block";
    document.getElementsByClassName("header_title")[0].innerHTML = new_page.toUpperCase();
    current_page = new_page;
}

function set_personal_quote(){
    let _quotes = {
        0:"The sun sets with you",
        1:"Love comes from within so ingest your friends whilst you have the chance",
        2:"Time is a cycle you live through day in and day out",
        3:"We didn't know we were making memories, we were just having fun",
        4:"Can you hear the voices cheering you on?",
        5:"All you need is belief",
        6:"I've never missed a one-block jump"
    }

    // Min-Max values for readability
    let _min = 0;
    let _max = Object.keys(_quotes).length;

    let _quotes_key = Math.floor(Math.random() * (_max - _min) + _min)
    // Math.random returns a float value, [min, max)

    document.getElementById("quote_content").textContent = "\"" + _quotes[_quotes_key] + "\"";
}
document.addEventListener("DOMContentLoaded", set_personal_quote); // Runonce upon page load

function change_light_theme(){
    /*
    Functionality:
    Change all icon links from black to white, or vice versa
    - Set Header to pure Black, bar to Dark Gray
    - Change Text Font from Black to White
    */
}