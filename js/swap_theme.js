/* Note: may need to convert functions to a class, but will require modularity built in to accomodate the dynamically built sections */
function change_light_theme(){
    const color_to_hex_code = {
        "white" : "#fff",
        "light_gray" : "#444",
        "gray" : "#333",
        "dark_gray" : "#222",
        "black" : "#000",
        "blue" : "#1e90ff",
        "orange" : "#E16F00"
    }

    const FILEPATH_PREFIX = "assets/software_icons/";
    let light_theme = document.getElementById("mode_swap_theme_icon");
    const new_theme = _determine_next_theme(light_theme.src)

    _swap_theme_icon(light_theme, FILEPATH_PREFIX, new_theme)
    _swap_themes(color_to_hex_code, FILEPATH_PREFIX, new_theme)
}

function _determine_next_theme(theme_icon_URL){
    if (theme_icon_URL.endsWith("sun.png")){ return "light";}
    else{ return "dark";}
}

function _swap_theme_icon(light_theme, FILEPATH_PREFIX, new_theme){
    /* Icons are inversed of the actual theme, ie current light_theme will show icon moon.png */
    if (new_theme == "light"){light_theme.src = FILEPATH_PREFIX + "moon.png";}
    else {light_theme.src = FILEPATH_PREFIX + "sun.png";}
}

function _swap_themes(colours, FILEPATH_PREFIX, new_theme){
    /* Define values */
    const light = "light";
    const dark = "dark";

    /* To Do: Separate logic by section (ID) or (Class) due to differing logic structures */
    /* Note: "private" _dicts are tied to the class section referred to by "for", otherwise are by ID */
    const class_text_colours = {
        "header" : {dark : colours["orange"], light : colours["blue"]}
    }

    const theme_text_basic_colours = {
        "introduction_subsection_content" : {dark : colours["white"], light : colours["black"]},
        "quote_content" : {dark : colours["white"], light : colours["black"]},
        "skills_content" : {dark : colours["white"], light : colours["black"]},
        "education_content" : {dark : colours["white"], light : colours["black"]},
        "background_content" : {dark : colours["white"], light : colours["black"]},
        "projects_content" : {dark : colours["white"], light : colours["black"]},
        "project_subproject_content" : {dark : colours["white"], light : colours["black"]},
        "project_subproject_description_content" : {dark : colours["white"], light : colours["black"]}
    }

    const class_section_theme_colours_backgrounds = {
        "header" : {dark : colours["black"], light : colours["gray"]},
        "nav-bar" : {dark : colours["dark_gray"], light : colours["light_gray"]},
        "content_section" : {dark : colours["black"], light : colours["white"]},
        "footer_section" : {dark : colours["black"], light : colours["white"]},
        "project_github_link" : {dark : colours["gray"], light : colours["blue"]},
        "project_subproject_link" : {dark : colours["gray"], light : colours["blue"]}
    }

    const _class_section_names_for_backgrounds = {
        "header" : ".header_section",
        "nav-bar" : ".nav-bar",
        "content_section" : ".content_section",
        "footer_section" : ".footer_section",
        "project_github_link" : ".project_github_link",
        "project_subproject_link" : "#project_subproject_link"
    } 
    
    const style_filter_effect = {
        dark : "invert(1)",
        light : "none"
    }

    const text_section_border_boxes = {
        "interests_subsection_content" : {dark : colours["orange"], light : colours["blue"]},
        "projects_subsection_description_canvas" : {dark : colours["orange"], light : colours["blue"]},
        "projects_subsection_description_portfolio" : {dark : colours["orange"], light : colours["blue"]},
        "projects_subsection_description_blackjack" : {dark : colours["orange"], light : colours["blue"]},
        "projects_subsection_description_typefighter" : {dark : colours["orange"], light : colours["blue"]},
        "projects_subsection_description_bookclub" : {dark : colours["orange"], light : colours["blue"]},
        "project_subproject_description_subsection" : {dark : colours["orange"], light : colours["blue"]},
        "project_subproject_challenges_subsection" : {dark : colours["orange"], light : colours["blue"]},
        "project_subproject_outcome_subsection" : {dark : colours["orange"], light : colours["blue"]}
    }

    const class_section_border_boxes = {
        "biography_content" : {dark : colours["orange"], light : colours["blue"]},
        "biography_title" : {dark : colours["orange"], light : colours["blue"]}
    }

    const _class_section_names_for_border_box = {
        "biography_content" : ".biography_subsection_content",
        "biography_title" : ".biography_subsection_title"
    }

     
    /* Note: May merge light_theme_icons and theme_icon_exceptions */
    const light_theme_icons = {
        /* Technology:"Default" */
        "github":"black",
        "linkedin":"black",
        "mail":"black",
        "resume":"black",
    }

    const theme_icon_exceptions = {
        "css":"null",
        "flask":"null",
        "html":"null",
        "js":"null",
        "python":"null"
    }

    /* _style_headers()*/
    document.getElementsByClassName("header_title")[0].style.color = class_text_colours["header"][new_theme];

    /* _style_icons */
    /* (Exception) To Do: Shift array out of funct & populate biography page dynamically bc -order matters-*/
    const project_social_icons = [
        "mail",
        "github",
        "linkedin",
        "resume"
    ]

    for (let i = 0; i < project_social_icons.length; i++){
        document.getElementById("socials_" + project_social_icons[i] + "_icon").style.filter = style_filter_effect[new_theme];
    }

    /* style_backgrounds */
    const theme_colour_keys = Object.keys(class_section_theme_colours_backgrounds);
    for (let i = 0; i < theme_colour_keys.length; i++){
        document.querySelectorAll(_class_section_names_for_backgrounds[theme_colour_keys[i]]).forEach(bg_colour => {
            bg_colour.style.backgroundColor = class_section_theme_colours_backgrounds[theme_colour_keys[i]][new_theme];
        });
    }

    /* style_basic_text */
    const text_keys = Object.keys(theme_text_basic_colours);
    for (let i = 0; i < text_keys.length; i++){
        document.getElementById(text_keys[i]).style.color = theme_text_basic_colours[text_keys[i]][new_theme];
    }

    /* style_border_box */
    const border_box_keys = Object.keys(text_section_border_boxes);
    for (let i = 0; i < border_box_keys.length; i++){
        document.getElementById(border_box_keys[i]).style.borderColor = text_section_border_boxes[border_box_keys[i]][new_theme];
    }

    /* style_border_box for classes */
    const border_keys = Object.keys(class_section_border_boxes);
    for (let i = 0; i < border_keys.length; i++){
        document.querySelectorAll(_class_section_names_for_border_box[border_keys[i]]).forEach(text_border => {
            text_border.style.borderColor = class_section_border_boxes[border_keys[i]][new_theme];
        });
    }

    /* To Do: Swap theme of technologies in the projects subpage as well */
    /*
        May use const array = document.querySelectorAll("#project_subproject_technologies_subsection img"); to edit values AFTER appending
        array[0].src will give the ENTIRE filepath, thus check with string.endsWith("tech_name.png")
    */
}

/* Note: Consider adding Cookies to remember the LAST theme used */
function pre_load_dark_theme(){
    change_light_theme()
}

document.addEventListener("DOMContentLoaded", pre_load_dark_theme);