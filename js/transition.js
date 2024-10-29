/* Debug Information */
console.log("The Current Time is: " + Date.now())

/* Javascript Functionality */
var current_page = "home";

function change_block_content(new_page){
    document.getElementById(current_page + "_" + "content").style.display = "none";   
    document.getElementById(new_page + "_" + "content").style.display = "block";
    current_page = new_page;
}