// In this file you can specify the trial data for your experiment


const trial_info = {
    poor_folks_VW: [
        {
            "item-id": 1,
            "item-type": "critical",
            "item-name": "wolf-dog",
            "det-target": "der",
            "det-competitor": "der",
            "option1": "Wolf",
            "option2": "Hund",
            "option3": "holdfast",
            "option4": "americangoldfinch",
            "mentioned-object": "wolf",
            "mentioned-file": "greywolf.jpg",
            "unmentioned-object": "dog",
            "unmentioned-file": "greyhound.jpg",
            "picture1": "images/greywolf.jpg",
            "picture2": "images/greyhound.jpg",
            "picture3": "images/holdfast.jpg",
            "picture4": "images/americangoldfinch.jpg",
            "question": "Ist das ein Bild von einem Wolf?",
            "target-position": 1,
            "list": 1,
            "answer": "Das | ist | tatsächlich | ein | Bild | von | einem |  Wolf.",
            "expected-answer": "Wolf",
            "target": "Wolf",
            competitor: "Hund",
            "condition": "reliable",
            "DP": "indeed"
        },
        {
            "item-id": 1,
            "item-type": "critical",
            "item-name": "wolf-dog",
            "det-target": "der",
            "det-competitor": "der",
            "option1": "Wolf",
            "option2": "Hund",
            "option3": "holdfast",
            "option4": "americangoldfinch",
            "mentioned-object": "dog",
            "mentioned-file": "greywolf.jpg",
            "unmentioned-object": "dog",
            "unmentioned-file": "greyhound.jpg",
            "picture1": "images/greywolf.jpg",
            "picture2": "images/greyhound.jpg",
            "picture3": "images/holdfast.jpg",
            "picture4": "images/americangoldfinch.jpg",
            "question": "Ist das ein Bild von einem Wolf?",
            "target-position": 1,
            "list": 1,
            "answer": "Das | ist | eigentlich | ein | Bild | von | einem |  Hund.",
            "expected-answer": "Wolf",
            "target": "Wolf",
            competitor: "Hund",
            "condition": "unreliable",
            "DP": "actually"
        }
    ]
};
