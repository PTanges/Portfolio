/* Debug Information */
// console.log("The Current Time is: " + Date.now())

/* Javascript Functionality */
var current_page = "home";
var light_theme = "light";
var light_theme_icons = {
    /* Technology:"Default" */
    "cli":"black",
    "github":"black",
    "linkedin":"black",
    "mail":"black",
    "resume":"black",

    "css":"null",
    "flask":"null",
    "html":"null",
    "js":"null",
    "python":"null"
    /* "contact":"black" */
}

function change_block_content(new_page){
    document.getElementById(current_page + "_" + "content").style.display = "none";   
    document.getElementById(new_page + "_" + "content").style.display = "block";
    document.getElementsByClassName("header_title")[0].innerHTML = new_page.toUpperCase();
    current_page = new_page;
}

function change_block_content_and_project_title(new_page, project_name){
    document.getElementById(current_page + "_" + "content").style.display = "none";   
    document.getElementById(new_page + '_' + "content").style.display = "block";
    document.getElementsByClassName("header_title")[0].innerHTML = project_name.toUpperCase();

    let subproject = new subproject_section(project_name);
    subproject.set_section_content();

    current_page = "project_subproject";
}

/* 1. Class Definition */
class subproject_section{
    /* 2. Constructor Definition */
    constructor(project_name){
        this._name = project_name;
        this._current_screenshot = "none";
        console.log("HELLO")
    }
        /*
        BLUE: #1e90ff
        ORANGE: #E16F00
        */

    /* 3. Method Definitions */
    async _get_json_data(){
        /* a. Set Filepath (or URL) */
        const FILEPATH_PREFIX = "assets/project_information/";

        let url = FILEPATH_PREFIX + this._name + ".json"
        /* b. Try Catch: Fetch (GET) Json file from location, default request is (GET) */
        try{
            const response = await fetch(url);

            /* c. If error: Throw error message */
            if (!response.ok){
                throw new Error('Response status: ${response.status}');
            }

            const json_data = await response.json(); /* Note response.json() returns a JSON object, so no need for json.parse or stringify */

            /* d. Successful Fetch (GET), now Parse Data */
            this._set_header_text();
            this._set_subsection_text("description", json_data.description);
            this._set_subsection_text("challenges", json_data.challenges);
            this._set_subsection_text("outcome", json_data.outcome);
            this._set_initial_screenshot(json_data.screenshot_quantity);
            this._set_technology_icons(json_data.technologies);

            if (this._check_theme_match){
                this._light_mode_swap_text();
                this._light_mode_swap_technology_icons();
            }
        } catch(error){
            console.error(error.message);
            /* May need to implement better error handling, reroute user back to portfolio(?)*/
        } /* End Try Catch */
    }

    set_section_content(){
        this._get_json_data();
    }

    _set_header_text(){
        document.getElementById("project_subproject_header_subsection").innerHTML = this._name.toUpperCase();
        console.log("1 Worked")
    }

    _set_initial_screenshot(screenshot_quantity){
        if (screenshot_quantity > 0){
            /* screenshot_quantity acts as the MAX */
            this._current_screenshot = 1;
            document.getElementById("project_subproject_screenshot").src = "assets/project_screenshots/" + this._name + "_" + "screenshot" + "_" + 1 + ".png";
        }
    }

    _cycle_screenshots(screenshot_quantity){
        /* TODO: Implement onclick functionality for screenshot, function exists as a counter for now */
        console.log("Before Screenshot #: " + this._current_screenshot);
        if (this._current_screenshot == "none"){return;}
        if (this._current_screenshot == screenshot_quantity){
            /* Reset current_screenshot counter back to 1 */
            this._current_screenshot = 1;
        }
        else{
            /* Increment to next screenshot, via on_click */
            this._current_screenshot = this._current_screenshot + 1;
        }
        console.log("After Screenshot #: " + this._current_screenshot);
    }

    _set_technology_icons(technologies){
        let container = document.getElementById("project_subproject_technologies_subsection");
        const FILEPATH_PREFIX = "assets/software_icons/";

        this._clear_technology_icons();
        /* To Do: Check if container has >0 images, if not then append instead of blind clear */
        for (let i = 0; i < technologies.length; i++){
            this._append_technology_icon(container, FILEPATH_PREFIX, technologies[i]);
        }
    }

    _append_technology_icon(container, FILEPATH_PREFIX, tech){
        /* Note: JSON arrays preserve item order */
        let tech_icon = document.createElement('img');
        tech_icon.src = FILEPATH_PREFIX + tech + ".png";
        container.append(tech_icon)
    }

    _check_theme_match(){
        /*
            For (everything)* in subsection, compare to global var light_theme
            *May only compare (one) element such as Header[0] to check font colour, black = "default"
        */
    }

    _light_mode_swap_text(){
        /*
            Set fonts to light_theme
        */
    }

    _light_mode_swap_technology_icons(){
        /* Set images to light_theme
        */
        
        /* new_image.style.filter = 'invert(1)'; or none */
    }

    _set_subsection_text(subsection_name, json_text){
        console.log("HALFWAY")
        const FILEPATH = "project_subproject_" + subsection_name + "_" + "subsection";
        console.log(FILEPATH)
        document.getElementById(FILEPATH).innerHTML = json_text;
        console.log("2-4 Worked")
    }

    _clear_technology_icons(){
        document.getElementById("project_subproject_technologies_subsection").replaceChildren();
    }
} /* end class */


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

function change_light_theme(){
    /*
    Functionality:
    Change all icon links from black to white, or vice versa
    - Set Header to pure Black, bar to Dark Gray
    - Change Text Font from Black to White
    */
}

function on_startup(){
    set_personal_quote();
}

document.addEventListener("DOMContentLoaded", on_startup()); // Runonce upon page load