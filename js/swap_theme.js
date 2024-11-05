var light_theme = "light";
var light_theme_icons = {
    /* Technology:"Default" */
    "cli":"black",
    "github":"black",
    "linkedin":"black",
    "mail":"black",
    "resume":"black",
}
var theme_icon_exceptions = {
    "css":"null",
    "flask":"null",
    "html":"null",
    "js":"null",
    "python":"null"
}

function change_light_theme(){
    const colours = {
        "white" : "#fff",
        "light_gray" : "#444",
        "gray" : "#333",
        "dark_gray" : "#222",
        "black" : "#000",
        "blue" : "1e90ff",
        "orange" : "#E16F00"
    }

    document.getElementById("mode_swap_theme_icon").src = "assets/software_icons/sun.png";

    if (light_theme == "light"){
        light_theme = "dark";
        _swap_to_dark_theme(colours);
    }
    else {
        light_theme = "light";
        _swap_to_light_theme(colours);
    }
}

function _swap_to_dark_theme(colours){
    document.getElementsByClassName("header_title")[0].style.color = colours["orange"];

    /* To Do: Shift array out of funct & populate biography page dynamically bc -order matters-*/
    const social_icons = [
        "mail",
        "github",
        "linkedin",
        "resume"
    ]

    for (let i = 0; i < social_icons.length; i++){
        document.getElementById("socials_" + social_icons[i] + "_icon").style.filter = "invert(1)";
    }

    document.getElementById("project_icon_cli").style.filter = "invert(1)";

    const classes_container = {
        "header" : {"class_name": ".header_section", "bg_colour": colours["black"]},
        "nav-bar" : {"class_name" : ".nav-bar", "bg_colour":colours["dark_gray"]},
        "content_section" : {"class_name" : ".content_section", "bg_colour":colours["black"]},
        "nav-footer_section" : {"class_name" : ".footer_section", "bg_colour":colours["black"]},
    } 

    /*
    Dict_Name = {class:{class_name:section_name, bg_colour:hex_code}}
    Dict_Name[class][class_name or bg_colour]
    */
    const section_keys = Object.keys(classes_container);
    for (let i = 0; i < section_keys.length; i++){
        document.querySelectorAll(classes_container[section_keys[i]]["class_name"]).forEach(header => {
            header.style.backgroundColor = classes_container[section_keys[i]]["bg_colour"];
        });
    }
    

    const text_sections = [
        "introduction_subsection_content",
        "quote_content",
        "skills_content",
        "education_content",
        "background_content",
        "projects_content",
        "project_subproject_description_content"
    ]

    for (let i = 0; i < text_sections.length; i++){
        document.getElementById(text_sections[i]).style.color = colours["white"];
    }

    const text_section_border_boxes = [
        "interests_subsection_content",
        "projects_subsection_description_canvas",
        "projects_subsection_description_portfolio",
        "projects_subsection_description_blackjack"
    ]
    for (let i = 0; i < text_section_border_boxes.length; i++){
        document.getElementById(text_section_border_boxes[i]).style.borderColor = colours["orange"];
    }

    const border_box_sections = {
        "biography_content" : {"class_name": ".biography_subsection_content"},
        "biography_title" : {"class_name" : ".biography_subsection_title"}
    } 

    const border_keys = Object.keys(border_box_sections);
    for (let i = 0; i < border_keys.length; i++){
        document.querySelectorAll(border_box_sections[border_keys[i]]["class_name"]).forEach(header => {
            header.style.borderColor = colours["orange"];
        });
    }
}

function _swap_to_light_theme(colours){
    document.getElementById("mode_swap_theme_icon").src = "assets/software_icons/moon.png"
}