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
  text: `
  Bitte lesen Sie die folgende Anleitung sorgfältig durch.
  <br><br>
  In diesem Experiment sollen Sie eines von vier Bildern, die auf dem Bildschirm erscheinen, auswählen. Die Bilder, die Sie sehen werden, stellen Bilder aus einem Bilderbuch dar. <strong>Bitte stellen Sie sich vor, dass ein Kind dieses Bilderbuch zusammen mit einem Elternteil anschaut.</strong> Die Bilder zeigen Tiere und verschiedene Gegenstände. <strong>Sie sollen nun anhand von kurzen Gesprächen zwischen dem Kind und dem Elternteil erraten, über welches Bild die beiden sprechen.</strong>
  <br> <br>
  In jedem Durchgang werden Sie zunächst eine Frage, die das Kind gestellt hat, und eine Antwort des Elternteils lesen. Die Antwort des Elternteils erscheint aber nur Stück für Stück. <strong>Das nächste Stück der Antwort erscheint immer dann, wenn Sie eines der Bilder ausgewählt haben.</strong> Sie sollen aber bitte nicht wahllos irgendein Bild anklicken. <strong>Bitte wählen Sie das Bild, von dem Sie glauben, dass es am wahrscheinlichsten dasjenige ist, über das die beiden sprechen. Beziehen Sie dabei alle Information aus der bisher sichtbaren Antwort des Elternteils immer auch mit ein.</strong> Wenn Sie glauben, dass zwei oder mehrere Bilder gleich wahrscheinlich sind, wählen Sie bitte einfach eines davon aus.
  <br> <br>
  Wir beginnen mit zwei Probedurchläufen, damit Sie sich an diese Aufgabe gewöhnen können.`,
  buttonText: 'Übung starten'
});

const start_experiment = magpieViews.view_generator("begin", {
    trials: 1,
    name: 'start_experiment',
    title: `Auf geht's zum Experiment!`,
    text: `Nach dieser kurzen Übungsphase, gehen wir nun zum eigentlichen Experiment über.
    <br><br>
    Bitte erwägen Sie nach jedem einzelnen Stück der Antwort des Elternteils, das Sie lesen, über welches Bild wahrscheinlich gesprochen wird. Sie dürfen Ihre Meinung also auch gerne im Verlauf eines Durchgangs ändern.`,
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

/*
  RELIABLE GROUP SEES
  + 5 reliable indeed
  + 5 reliable actually
  + 18 fillers

  UNRELIABLE GROUP SEES
  + 2 reliable indeed
  + 2 reliable actually
  + 3 unreliable indeed
  + 3 unreliable actually
  + 18 fillers
*/

// sample or fix whether reliable or unreliable group
// const group_rel_unrel = _.sampleSize(["reliable", "unreliable"],1);
const group_rel_unrel = "unreliable";

// built main trials for RELIABLE group
if (group_rel_unrel == "reliable") {
    const items_indeed   = _.sampleSize(_.filter(trial_info, function(t) {return t.condition == "reliable" && t.DP == "indeed";}), 5);
    const items_actually = _.sampleSize(_.filter(trial_info, function(t) {
        return t.condition == "reliable" && t.DP == "actually" && !_.includes(_.map(items_indeed, function(t) {return t.item_name;}), t.item_type);
    }), 5);

    var main_trials_ordered = _.shuffle( _.concat( items_indeed, items_actually ) );
}

//built main trials for UNRELIABLE group
if (group_rel_unrel == "unreliable") {
    const items_indeed_rel   = _.sampleSize(_.filter(trial_info, function(t) {return t.condition == "reliable" && t.DP == "indeed";}), 2);
    const items_actually_rel = _.sampleSize(_.filter(trial_info, function(t) {
        return t.condition == "reliable" && t.DP == "actually" && !_.includes(_.map(items_indeed_rel, function(t) {return t.item_name;}), t.item_type);
    }), 2);
    const items_indeed_unrel   = _.sampleSize(_.filter(trial_info, function(t) {
        return t.condition == "unreliable" && t.DP == "indeed" && !_.includes(_.map(_.concat(items_indeed_rel, items_actually_rel), function(t) {return t.item_name;}), t.item_type);}), 3);
    const items_actually_unrel = _.sampleSize(_.filter(trial_info, function(t) {
        return t.condition == "unreliable" && t.DP == "actually" && !_.includes(_.map(_.concat(items_indeed_rel, items_actually_rel, items_indeed_unrel), function(t) {return t.item_name;}), t.item_type);
    }), 3);

    var main_trials_ordered = _.shuffle( _.concat( items_indeed_rel, items_actually_rel, items_indeed_unrel, items_actually_unrel ) );
}

const fillers_ordered = _.shuffle(
    _.sampleSize(_.filter(trial_info, function(t) {return t.condition == "filler";}), 20)
);

var main_items = _.concat(
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

var training_items = _.concat( fillers_ordered[18],  fillers_ordered[19]);

const training = magpieViews.view_generator("image_selection", {
    trials: training_items.length,
    name: 'poor_folks_visual_world_training',
    data: training_items
},
 {   stimulus_container_generator: poor_folks_VW_stim_cont_generator,
     answer_container_generator: poor_folks_VW_answ_cont_generator,
     handle_response_function: poor_folks_VW_hand_resp_function
 }
);


const poor_folks_VW = magpieViews.view_generator("image_selection", {
  trials: main_items.length,
  name: 'poor_folks_visual_world',
  data: main_items
  },
    {   stimulus_container_generator: poor_folks_VW_stim_cont_generator,
        answer_container_generator: poor_folks_VW_answ_cont_generator,
        handle_response_function: poor_folks_VW_hand_resp_function
    }
);
