// In this file you can instantiate your views
// We here first instantiate wrapping views, then the trial views


/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

    * More about the properties and functions of the wrapping views - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#wrapping-views

*/

// Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
const intro = magpieViews.view_generator("intro", {
  trials: 1,
  name: 'intro',
  title: 'Herzlich Willkommen zum Experiment!',
  text: 'Vielen Dank, dass Sie an unserem Experiment teilnehmen. Im Folgenden werden wir Ihnen kurz erklären, wie das Experiment abläuft. Bitte klicken Sie dazu auf den "Start" Knopf.',
  // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
  buttonText: 'Start'
});

// For most tasks, you need instructions views
const instructions = magpieViews.view_generator("instructions", {
  trials: 1,
  name: 'instructions',
  title: 'Anleitung',
  text: `In diesem Experiment sollen Sie eines von vier Bildern, die auf dem Bildschirm erscheinen, auswählen. Die Bilder, die Sie sehen werden, stellen Bilder aus einem Bilderbuch dar. Bitte stellen Sie sich vor, dass ein Kind dieses Bilderbuch zusammen mit einem Elternteil anschaut. Die Bilder zeigen Tiere und verschiedene Gegenstände. Sie sollen nun anhand von kurzen Gesprächen zwischen dem Kind und dem Elternteil entscheiden über, welches Bild die beiden sprechen. In jedem Durchgang werden Sie zunächst eine Frage, die das Kind gestellt hat, und eine Antwort des Elternteils lesen. Die Antwort des Elternteils erscheint aber nur Wort für Wort. Das nächste Wort erscheint immer dann, wenn Sie eines der Bilder anklicken. Sie sollen aber bitte nicht wahllos irgendein Bild anklicken. Bitte wählen Sie das Bild, von dem Sie glauben, dass es am wahrscheinlichsten dasjenige ist, über das die beiden sprechen. Beziehen Sie dabei dann die Information aus der Antwort des Elternteils immer auch mit ein. Wenn Sie glauben, dass zwei oder mehrere Bilder gleich wahrscheinlich sind, wählen Sie bitte einfach eines davon aus. Wenn Sie nach dem nächsten Klick wieder mehrere Bilder gleich wahrscheinlich finden, wählen Sie diesmal wieder eines aus, aber vielleicht ein anderes als zuvor. <br> <br> Um zu Beginnen klicken Sie bitte auf den Button „Experiment starten“`,
  buttonText: 'Experiment starten'
});

// In the post test questionnaire you can ask your participants addtional questions
const post_test = magpieViews.view_generator("post_test", {
  trials: 1,
  name: 'post_test',
  title: 'Weitere Angaben',
  text: 'Die Beantwortung der folgenden Fragen ist optional, aber es kann bei der Auswertung hilfreich sein, damit wir Ihre Antworten besser verstehen.',
  buttonText: 'Weiter',
  age_question: 'Alter',
  gender_question: 'Geschlecht',
  gender_male: 'männlich',
  gender_female: 'weiblich',
  gender_other: 'divers',
  edu_question: 'Höchster Bildungsabschluss',
  edu_graduated_high_school: 'Abitur',
  edu_graduated_college: 'Hochschulabschluss',
  edu_higher_degree: 'Universitärer Abschluss',
  languages_question: 'Muttersprache',
  languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
  comments_question: 'Weitere Kommentare'
  // You can change much of what appears here, e.g., to present it in a different language, as follows:
  // buttonText: 'Weiter',
  // age_question: 'Alter',
  // gender_question: 'Geschlecht',
  // gender_male: 'männlich',
  // gender_female: 'weiblich',
  // gender_other: 'divers',
  // edu_question: 'Höchster Bildungsabschluss',
  // edu_graduated_high_school: 'Abitur',
  // edu_graduated_college: 'Hochschulabschluss',
  // edu_higher_degree: 'Universitärer Abschluss',
  // languages_question: 'Muttersprache',
  // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
  // comments_question: 'Weitere Kommentare'
});

// The 'thanks' view is crucial; never delete it; it submits the results!
const thanks = magpieViews.view_generator("thanks", {
  trials: 1,
  name: 'thanks',
  title: 'Vielen Dank für Ihre Teilnahme!',
  prolificConfirmText: 'Press the button'
});

/** trial (magpie's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string - the name of the view type as it shall be known to _magpie (e.g. for use with a progress bar)
            and the name of the trial as you want it to appear in the submitted data
    - data: array - an array of trial objects

* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
      More about trial life cycle - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

    - hook: object - option to hook and add custom functions to the view
      More about hooks - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

* All about the properties of trial views
* https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#trial-views
*/

const shuffled_list_data = trial_info.poor_folks_VW;

const poor_folks_VW = magpieViews.view_generator("image_selection", {
  trials: shuffled_list_data.length,
  name: 'poor_folks_visual_world',
  data: shuffled_list_data
  // disc_particle: _.shuffle(["indeed", "indeed", "indeed", "indeed", "indeed", "actually", "actually", "actually", "actually", "actually", "filler", "filler", "filler", "filler", "filler", "filler"])
  },
    {   stimulus_container_generator: function (config, CT) {
        const helpText = config.data[CT].help_text !== undefined ?
              config.data[CT].help_text : "";
        return         `<div class='magpie-view'>
                    <h1 class='magpie-view-title'>${config.title}</h1>
                    <p class='magpie-view-question magpie-view-qud'>${config.data[CT].QUD}</p>
                    <div class='magpie-view-stimulus-container'>
                        <div class='magpie-view-stimulus magpie-nodisplay'></div>
                    </div>
                    <p class='magpie-help-text magpie-nodisplay'>${helpText}</p>
                </div>`;},


        answer_container_generator: function (config, CT) {
            return `<div class='magpie-view-answer-container'>
                        <p class='magpie-view-question'><font color = "gray">Das Kind fragt:</font><br><font size  = 5>${config.data[CT].question}</font></p>
                        <p class='magpie-view-question'><font color = "gray">Das Elternteil sagt:</font></p>
                        <p class='magpie-spr-sentence'></p>
                        <p class='magpie-view-question'><font color = "gray">Über welches Bild reden die beiden?</font></p>
                        <label for="img1" class='magpie-view-picture magpie-response-picture'><img class="resize" src=${config.data[CT].picture1} style="border:3px solid black"></label>
                        <input type="radio" name="answer" id="img1" value="${config.data[CT].option1}"/>
                        <input type="radio" name="answer" id="img2" value="${config.data[CT].option2}"/>
                        <label for="img2" class='magpie-view-picture magpie-response-picture'><img class="resize" src=${config.data[CT].picture2} style="border:3px solid black"></label><p>
                        <label for="img3" class='magpie-view-picture magpie-response-picture'><img class="resize" src=${config.data[CT].picture3} style="border:3px solid black"></label>
                        <input type="radio" name="answer" id="img3" value="${config.data[CT].option3}"/>
                        <input type="radio" name="answer" id="img4" value="${config.data[CT].option4}"/>
                        <label for="img4" class='magpie-view-picture magpie-response-picture'><img class="resize" src=${config.data[CT].picture4} style="border:3px solid black"></label></p>
                    </div>`;},

        handle_response_function: function(config, CT, magpie, answer_container_generator, startingTime) {
            $(".magpie-view").append(answer_container_generator(config, CT));

            // SPR part

            const sentenceList = config.data[CT].answer.trim().split(" | ");
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

            // shows the sentence word by word on CLICK press
            const handle_click = function() {

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
                        wordList[clickCounter - 1].classList.add("spr-word-hidden");
                    }

                    pictureChoices.push($("input[name=answer]:checked").val());
                    readingTimes.push(Date.now());
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

            $("input[name=answer]").on("click", handle_click);

    }
});
