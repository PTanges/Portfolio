/* 1. Class Definition */
class subproject_section{
    /* 2. Constructor Definition */
    constructor(project_name){
        this._name = project_name;
        this._current_screenshot = "none";
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

            if (!this._check_theme_match()){
                this._swap_theme();
            }
        } catch(error){
            console.error(error.message);
            /* May need to implement better error handling, reroute user back to portfolio(?)*/
        } /* End Try Catch */
    }

    set_section_content(){
        const json_data = this._get_json_data();
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

        const tech_quantity = tech_names.length;
        for (let i = 0; i < tech_quantity; i++){
            this._append_technology_icon(container, FILEPATH_PREFIX, tech_names[i]);
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

            Return true/false
        */
    }

    _swap_theme(){
        this._light_mode_swap_text();
        this._light_mode_swap_technology_icons();
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
        const FILEPATH = "project_subproject_" + subsection_name + "_" + "subsection";
        document.getElementById(FILEPATH).innerHTML = json_text;
    }

    _clear_technology_icons(){
        document.getElementById("project_subproject_technologies_subsection").replaceChildren();
    }
} /* end class */