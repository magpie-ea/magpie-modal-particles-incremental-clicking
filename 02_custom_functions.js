// Here, you can define all custom functions, you want to use and initialize some variables

/* Variables
*
*
*/
const coin = _.sample(["head", "tail"]); // You can determine global (random) parameters here
// Declare your variables here



/* Helper functions
*
*
*/


/* For generating random participant IDs */
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
// dec2hex :: Integer -> String
const dec2hex = function(dec) {
    return ("0" + dec.toString(16)).substr(-2);
};
// generateId :: Integer -> String
const generateID = function(len) {
    let arr = new Uint8Array((len || 40) /2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join("");
};
// Declare your helper functions here



/* Hooks  
*
*
*/

// Error feedback if participants exceeds the time for responding
const time_limit = function(data, next) {
    if (typeof window.timeout === 'undefined'){
        window.timeout = [];
    }
    // Add timeouts to the timeoutarray
    // Reminds the participant to respond after 5 seconds
    window.timeout.push(setTimeout(function(){
          $('#reminder').text('Please answer more quickly!');
    }, 5000));
    next();
};

// compares the chosen answer to the value of `option1`
check_response = function(data, next) {
    $('input[name=answer]').on('change', function(e) {
        if (e.target.value === data.correct) {
            alert('Your answer is correct! Yey!');
        } else {
            alert('Sorry, this answer is incorrect :( The correct answer was ' + data.correct);
        }
        next();
    })
}

// Declare your hooks here


/* Generators for custom view templates, answer container elements and enable response functions
*
*
*/

const poor_folks_VW_stim_cont_generator = function (config, CT) {
    const helpText = config.data[CT].help_text !== undefined ?
          config.data[CT].help_text : "";
    return         `<div class='magpie-view'>
                </div>`;};

const poor_folks_VW_answ_cont_generator = function (config, CT) {
            $(".magpie-view").css("padding-top", 0);
            return `<div class='magpie-view-answer-container'>
                        <p class='magpie-view-question' style='padding-top: 0px;'><font color = "gray">Das Kind fragt:</font><br><font size  = 5>${config.data[CT].question}</font></p>
                        <p class='magpie-view-question' style='margin: auto auto 0px auto;'><font color = "gray">Das Elternteil sagt:</font></p>
                        <p class='magpie-spr-sentence' style = 'margin: auto auto 0px auto;'></p>
                        <p class='magpie-view-question'><font color = "gray">Über welches Bild reden die beiden?</font></p>

                        <label for="img1" class='magpie-view-picture magpie-response-picture'>
                        <img id="image_${config.data[CT].option1}" class="resize" src=${config.data[CT].picture1} style="width:175px; height: 175px; border:6px solid lightgray;"></label>
                        <input type="radio" name="answer" id="img1" value="${config.data[CT].option1}"/>

                        <label for="img2" class='magpie-view-picture magpie-response-picture'>
                        <img id="image_${config.data[CT].option2}" class="resize" src=${config.data[CT].picture2} style="width:175px; height: 175px; border:6px solid lightgray"></label>
                        <input type="radio" name="answer" id="img2" value="${config.data[CT].option2}"/>

                        <p>

                        <label for="img3" class='magpie-view-picture magpie-response-picture'>
                        <img id="image_${config.data[CT].option3}" class="resize" src=${config.data[CT].picture3} style="width:175px; height: 175px; border:6px solid lightgray"></label>
                        <input type="radio" name="answer" id="img3" value="${config.data[CT].option3}"/>

                        <label for="img4" class='magpie-view-picture magpie-response-picture'>
                        <img id="image_${config.data[CT].option4}" class="resize" src=${config.data[CT].picture4} style="width:175px; height: 175px; border:6px solid lightgray"></label>
                        <input type="radio" name="answer" id="img4" value="${config.data[CT].option4}"/>

                        <p>

                        <button id='next' class='magpie-view-button magpie-nodisplay'>Next</button>

                    </div>`;};

const poor_folks_VW_hand_resp_function = function(config, CT, magpie, answer_container_generator, startingTime) {
            $(".magpie-view").append(answer_container_generator(config, CT));

            // SPR part

            const sentenceList = config.data[CT].chunked_answer.trim().split(" | ");
            let clickCounter = 0;
            let wordList;
            let readingTimes = [];
            let pictureChoices = [];
            // wordPos "next" or "same", if "next" words appear next to each other, if "same" all words appear at the same place
            // default: "next"
            let wordPos = config.data[CT].wordPos === undefined ? "next" : config.data[CT].wordPos;
            let showNeighbor = wordPos === "next";
            // underline "words", "sentence" or "none", if "words" every word gets underlined, if "sentence" the sentence gets
            // underlined, if "none" there is no underline
            // default: "words"
            let underline = config.data[CT].underline === undefined ? "words" : config.data[CT].underline;
            let not_underline = underline === "none";
            let one_line = underline === "sentence";

            // clear border-color selection of picts
             const clear_border_selection = function(){
                let images_all = document.getElementsByClassName("resize");
                console.log(images_all);
                var i;
                for (i = 0; i < images_all.length; i++) {
                 images_all[i].style.border="6px solid lightgray";
                }
             };

            // what to do when a picture is clicked: highlight, show next button
            const handle_image_click = function() {
                // reveal 'next' button
                clear_border_selection();
                let selected_pic_id = 'image_'+$("input[name=answer]:checked").val();
                console.log(selected_pic_id);
                console.log(document.getElementById(selected_pic_id));
                document.getElementById(selected_pic_id).style.border="6px solid black";
                $("#next").removeClass("magpie-nodisplay");
            };

            const handle_next_click = function() {
                if (clickCounter < sentenceList.length) {
                    if (showNeighbor) {
                        wordList[clickCounter].classList.remove("spr-word-hidden");
                    } else {
                        $(".magpie-spr-sentence").html(`<span class='spr-word'>${sentenceList[clickCounter]}</span>`);
                        if (not_underline){
                            $('.magpie-spr-sentence .spr-word').addClass('no-line');
                        }
                    }

                    if (clickCounter === 0) {
                        $(".magpie-help-text").addClass("magpie-invisible");
                    }

                    if (clickCounter > 0 && showNeighbor) {
                        // this will hide the previously revealed chunk
                        // wordList[clickCounter - 1].classList.add("spr-word-hidden");
                    }

                    // hide 'next' button
                    $("#next").addClass("magpie-nodisplay");
                    // clear visual picture selection
                    clear_border_selection();

                    // do not record anything for first automatic call of this function 
                    if ( $("input[name=answer]:checked").val() != null ) {
                        pictureChoices.push($("input[name=answer]:checked").val());
                        readingTimes.push(Date.now());
                    }
                    clickCounter++;
                } else if (clickCounter === sentenceList.length) {
                    if (showNeighbor) {
                        wordList[clickCounter - 1].classList.add("spr-word-hidden");
                    } else {
                        $(".magpie-spr-sentence").html("");
                    }

                    pictureChoices.push($("input[name=answer]:checked").val());
                    readingTimes.push(Date.now());
                    clickCounter++;

                    const RT = Date.now() - startingTime;
                    let reactionTimes = readingTimes
                    .reduce((result, current, idx) => {
                        return result.concat(
                            readingTimes[idx + 1] - readingTimes[idx]
                        );
                    }, [])
                    .filter((item) => isNaN(item) === false);
                    let trial_data = {
                        trial_name: config.name,
                        trial_number: CT + 1,
                        response: $("input[name=answer]:checked").val(),
                        reaction_times: reactionTimes,
                        pictureChoices: pictureChoices,
                        time_spent: RT
                    };

                    trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);

                    magpie.trial_data.push(trial_data);
                    magpie.findNextView();

                }
            };
            // shows the help text
            $(".magpie-help-text").removeClass("magpie-nodisplay");

            if (showNeighbor) {
                // creates the sentence
                sentenceList.map((word) => {
                    $(".magpie-spr-sentence").append(
                        `<span class='spr-word spr-word-hidden'>${word}</span>`
                    );
                });

                // creates an array of spr word elements
                wordList = $(".spr-word").toArray();
            }

            if (not_underline){
                $('.magpie-spr-sentence .spr-word').addClass('no-line');
            }
            if (one_line){
                $('.magpie-spr-sentence .spr-word').addClass('one-line');
            }

    // first chunk is revealed immediately
    handle_next_click();

    $("input[name=answer]").on("click", handle_image_click);
    $("#next").on("click", handle_next_click);



};

