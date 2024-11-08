/* 1. Class Definition */
class subproject_section{
    /* 2. Constructor Definition */
    constructor(project_name){
        this._name = project_name;
        this._current_screenshot = "none";
    }

    /* 3. Method Definitions */
    async update_subproject_data(){
        /* a. Set Filepath (or URL) */
        const FILEPATH_PREFIX = "assets/project_information/";

        let url = FILEPATH_PREFIX + this._name + ".json";
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

        } catch(error){
            console.error(error.message);
            /* May need to implement better error handling, reroute user back to portfolio(?)*/
        } /* End Try Catch */
    }

    set_section_content(project_name){
        this._name = project_name
        this.update_subproject_data();
        this._scroll_to_top();
    }

    _set_header_text(){
        document.getElementById("project_subproject_header_subsection").innerHTML = this._name.toUpperCase();
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
        if (this._current_screenshot == "none"){return;}
        if (this._current_screenshot == screenshot_quantity){
            /* Reset current_screenshot counter back to 1 */
            this._current_screenshot = 1;
        }
        else{
            /* Increment to next screenshot, via on_click */
            this._current_screenshot = this._current_screenshot + 1;
        }
    }

    _set_technology_icons(tech_names){
        let container = document.getElementById("project_subproject_technologies_subsection");
        const FILEPATH_PREFIX = "assets/software_icons/";

        this._clear_technology_icons();
        /* To Do: Check if container has >0 images, if not then append instead of blind clear */

        /* style technology icon */
        let current_theme = this._check_current_theme(FILEPATH_PREFIX);

        const _theme_to_colour = {
            "light" : "white",
            "dark" : "black"
        }

        for (let i = 0; i < tech_names.length; i++){
            let _apply_image_filter = false;
            _apply_image_filter = this._check_icon_theme_match(tech_names, i, _theme_to_colour, current_theme)

            this._append_technology_icon(container, FILEPATH_PREFIX, tech_names[i], _apply_image_filter, current_theme);
        }
    }

    _check_icon_theme_match(tech_names, tech_index, theme_name_to_colour, current_theme){
        const default_tech_icon_colour = {
            /* Technology:"Default" */
            "github":"black",
            "linkedin":"black",
            "mail":"black",
            "resume":"black",
        }

        if (default_tech_icon_colour[tech_names[tech_index]] == theme_name_to_colour[current_theme]){
            return true;
        }
        else {return false;}
    }

    _append_technology_icon(container, FILEPATH_PREFIX, tech, filter_flag, current_theme){
        /* Note: JSON arrays preserve item order */
        const style_filter_effect = {
            "dark" : "invert(1)",
            "light" : "none"
        }

        let tech_icon = document.createElement('img');
        tech_icon.src = FILEPATH_PREFIX + tech + ".png";
        if (filter_flag){tech_icon.style.filter = style_filter_effect[current_theme];}
        container.append(tech_icon);
    }

    _check_current_theme(FILEPATH_PREFIX){
        const _theme_icon = document.getElementById("mode_swap_theme_icon");
        if (_theme_icon.src.endsWith(FILEPATH_PREFIX + "sun.png")){ return "dark"; }
        else {return "light";}
    }
    
    _set_subsection_text(subsection_name, json_text){
        const FILEPATH = "project_subproject_" + subsection_name + "_" + "subsection";
        document.getElementById(FILEPATH).innerHTML = json_text;
    }

    _clear_technology_icons(){
        document.getElementById("project_subproject_technologies_subsection").replaceChildren();
    }

    /* 165px is roughly the height of Header + nav bar, may need to grab heights manually for more accuracy/scalability */
    _scroll_to_top(){
        window.scroll({
            top: 165,
            behavior: 'smooth'
          });
    }
} /* end class */

function create_subproject_page(new_page, project_name){
    document.getElementById(current_page + "_" + "content").style.display = "none";   
    document.getElementById(new_page + '_' + "content").style.display = "block";
    document.getElementsByClassName("header_title")[0].innerHTML = project_name.toUpperCase();

    subproject.set_section_content(project_name);

    current_page = "project_subproject";
}

var subproject = new subproject_section("");