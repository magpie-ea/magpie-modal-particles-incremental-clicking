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

const items_indeed = _.sampleSize(_.filter(trial_info, function(t) {return t.condition == "reliable" && t.DP == "indeed";}), 5);
const items_actually = _.sampleSize(_.filter(trial_info, function(t) {
    return t.condition == "reliable" && t.DP == "actually" && !_.includes(_.map(items_indeed, function(t) {return t.item_name;}), t.item_type);
}), 5);

const main_trials_ordered = _.shuffle( _.concat( items_indeed, items_actually ) );

const fillers_ordered = _.shuffle(
    _.sampleSize(_.filter(trial_info, function(t) {return t.condition == "filler";}), 20)
);

var shuffled_list_data = _.concat(
    fillers_ordered[0],
    main_trials_ordered[0],
    fillers_ordered[1],
    fillers_ordered[2],
    main_trials_ordered[1],
    fillers_ordered[3],
    main_trials_ordered[2],
    fillers_ordered[4],
    fillers_ordered[5],
    main_trials_ordered[3],
    main_trials_ordered[4],
    fillers_ordered[6],
    fillers_ordered[7],
    main_trials_ordered[5],
    fillers_ordered[8],
    fillers_ordered[9],
    fillers_ordered[10],
    main_trials_ordered[6],
    fillers_ordered[11],
    main_trials_ordered[7],
    fillers_ordered[12],
    fillers_ordered[13],
    main_trials_ordered[8],
    fillers_ordered[14],
    fillers_ordered[15],
    fillers_ordered[16],
    main_trials_ordered[9],
    fillers_ordered[17]
);

console.log(shuffled_list_data);

const poor_folks_VW = magpieViews.view_generator("image_selection", {
  trials: shuffled_list_data.length,
  name: 'poor_folks_visual_world',
  data: shuffled_list_data
  },
    {   stimulus_container_generator: poor_folks_VW_stim_cont_generator,
        answer_container_generator: poor_folks_VW_answ_cont_generator,
        handle_response_function: poor_folks_VW_hand_resp_function
    }
);
