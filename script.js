const verifyButton = document.getElementById("verifyButton");
const correctID= "4172";

const loginScreen = document.getElementById("loginScreen");
const sequenceScreen = document.getElementById("sequenceScreen");
const loginStatus = document.getElementById("loginStatus");
const identificationNumber = document.getElementById("identificationNumber");

const batSequence = document.getElementById("batSequence");
const pigSequence = document.getElementById("pigSequence");
const humanSequence = document.getElementById("humanSequence");
const submitSequences = document.getElementById("submitSequences");
const phylogenyScreen = document.getElementById("phylogenyScreen");

const correctBatRNA = "AUGCCUUAUGGCACUGAAUCGAACCUAAGC";
const correctPigRNA = "AUGCCAUAUGGCACCGAAUCGAACCUAAGU";
const correctHumanRNA = "AUGCCAUAUGGCACCGAAUCGAACCUAAGC";
const correctBatSequence = "ATGCCTTATGGCACTGAATCGAACCTAAGC";
const correctPigSequence = "ATGCCATATGGCACCGAATCGAACCTAAGT";
const correctHumanSequence = "ATGCCATATGGCACCGAATCGAACCTAAGC";
const humanComparison = document.getElementById("humanComparison");
const batComparison = document.getElementById("batComparison");
const pigComparison = document.getElementById("pigComparison");

const batCount = document.getElementById("batCount");
const pigCount = document.getElementById("pigCount");

const analyzeDifferences = document.getElementById("analyzeDifferences");
const comparisonResult = document.getElementById("comparisonResult");
const treeActivity = document.getElementById("treeActivity");


const selectedPair = document.getElementById("selectedPair");
const checkTreeButton = document.getElementById("checkTreeButton");
const treeResult = document.getElementById("treeResult");
const treeDisplay = document.querySelector(".tree-display");

const spilloverScreen = document.getElementById("spilloverScreen");
const continueAnalysis = document.getElementById("continueAnalysis");
const analysisMessage = document.getElementById("analysisMessage");
const hostAnalysis = document.getElementById("hostAnalysis");
const scanLine = document.querySelector(".scan-line");

const reconstructionIntro = document.getElementById("reconstructionIntro");
const beginReconstruction = document.getElementById("beginReconstruction");
const reconstructionScreen = document.getElementById("reconstructionScreen");

const eventCards = document.querySelectorAll(".event-card");
const reconstructionStatus = document.getElementById("reconstructionStatus");
const resetReconstruction = document.getElementById("resetReconstruction");
const submitReconstruction = document.getElementById("submitReconstruction");
const reconstructionResult = document.getElementById("reconstructionResult");
const reconstructionTimer =
    document.getElementById("reconstructionTimer");
let reconstructionTime = 300;
let reconstructionInterval;
const timeoutScreen = document.getElementById("timeoutScreen");
const restoreSession = document.getElementById("restoreSession");

const interferenceWarning = document.getElementById("interferenceWarning");
const transmissionCompleteScreen = document.getElementById("transmissionCompleteScreen");
const correctTransmissionOrder = [
    "habitat-destruction",
    "bat-displacement",
    "bat-foraging",
    "pig-infection",
    "human-exposure",
    "human-outbreak"
];

let selectedEvents = [];


verifyButton.addEventListener("click", function() {

    const enteredID = identificationNumber.value;

    if (enteredID === correctID) {

        loginStatus.style.display = "block";
        loginStatus.style.color = "#a9bea2";

        loginStatus.textContent =
            "AUTHENTICATING VIWR-" + enteredID + "...";

        setTimeout(function() {

            loginStatus.textContent =
                "IDENTITY VERIFIED — DR. AMARA REYES";

        }, 1500);

        setTimeout(function() {

            loginStatus.textContent =
                "ACCESS GRANTED — LOADING PATHOGEN DATABASE";

        }, 3000);

        setTimeout(function() {

            loginScreen.style.display = "none";
            sequenceScreen.style.display = "block";

        }, 4500);

    } else {

        loginStatus.style.display = "block";
        loginStatus.style.color = "#ff6b6b";

        loginStatus.textContent =
            "ACCESS DENIED — IDENTIFICATION NUMBER NOT RECOGNIZED";
    }
});
identificationNumber.addEventListener("input", function() {
    loginStatus.style.display = "none";
});
submitSequences.addEventListener("click", function() {

    const enteredBat = cleanSequence(batSequence.value);
    const enteredPig = cleanSequence(pigSequence.value);
    const enteredHuman = cleanSequence(humanSequence.value);

    if (
        enteredBat === correctBatRNA &&
        enteredPig === correctPigRNA &&
        enteredHuman === correctHumanRNA
    ) {
        sequenceScreen.style.display = "none";
        phylogenyScreen.style.display = "block";
    } else {
        alert("SEQUENCE ERROR — Recheck the recovered sequence fragments.");
    }

});
function cleanSequence(sequence) {

    return sequence.replace(/\s/g, "").toUpperCase();

}

function createSequence(sequence, container, clickable, countDisplay) {

    for (let i = 0; i < sequence.length; i++) {

        const base = document.createElement("span");

        base.textContent = sequence[i];

        base.classList.add("base");
        if (clickable) {

    base.addEventListener("click", function() {

        base.classList.toggle("selected");

        const selectedBases =
            container.querySelectorAll(".selected").length;

        countDisplay.textContent = selectedBases;

    });

}
        container.appendChild(base);

    }

}
function findDifferences(sequence, reference) {

    const differences = [];

    for (let i = 0; i < sequence.length; i++) {

        if (sequence[i] !== reference[i]) {
            differences.push(i);
        }

    }

    return differences;
}
const correctBatDifferences = findDifferences(
    correctBatSequence,
    correctHumanSequence
);

const correctPigDifferences = findDifferences(
    correctPigSequence,
    correctHumanSequence
);
function getSelectedPositions(container) {

    const bases = container.querySelectorAll(".base");
    const selectedPositions = [];

    bases.forEach(function(base, index) {

        if (base.classList.contains("selected")) {
            selectedPositions.push(index);
        }

    });

    return selectedPositions;
}
function arraysMatch(array1, array2) {

    if (array1.length !== array2.length) {
        return false;
    }

    for (let i = 0; i < array1.length; i++) {

        if (array1[i] !== array2[i]) {
            return false;
        }

    }

    return true;
}

// NOW ACTUALLY CREATE THE SEQUENCES

createSequence(

    correctHumanSequence,

    humanComparison,

    false,

    null

);

createSequence(

    correctBatSequence,

    batComparison,

    true,

    batCount

);

createSequence(

    correctPigSequence,

    pigComparison,

    true,

    pigCount

);

analyzeDifferences.addEventListener("click", function() {

    const selectedBatDifferences =
        getSelectedPositions(batComparison);

    const selectedPigDifferences =
        getSelectedPositions(pigComparison);

    const batCorrect =
        arraysMatch(selectedBatDifferences, correctBatDifferences);

    const pigCorrect =
        arraysMatch(selectedPigDifferences, correctPigDifferences);


    if (batCorrect && pigCorrect) {

        comparisonResult.textContent =
            "SEQUENCE COMPARISON COMPLETE";

            treeActivity.style.display="block";

    } else {

        comparisonResult.textContent =
            "ANALYSIS INCOMPLETE — RECHECK VARIABLE SITES";

    }

});
let selectedSamples = [];
const treeSamples = document.querySelectorAll(".tree-sample");
treeSamples.forEach(function(button) {

    button.addEventListener("click", function() {

        const sample = button.dataset.sample;

        if (selectedSamples.includes(sample)) {

            selectedSamples =
                selectedSamples.filter(function(item) {
                    return item !== sample;
                });

            button.classList.remove("selected");

        } else if (selectedSamples.length < 2) {

            selectedSamples.push(sample);

            button.classList.add("selected");
        }

        if (selectedSamples.length === 0) {
            selectedPair.textContent = "NONE";
        } else {
            selectedPair.textContent =
                selectedSamples.join(" + ");
        }

    });

});
checkTreeButton.addEventListener("click", function() {

    const pigSelected =
        selectedSamples.includes("PIG-04");

    const humanSelected =
        selectedSamples.includes("HUM-07");

    if (
        selectedSamples.length === 2 &&
        pigSelected &&
        humanSelected
    ) {
        treeDisplay.classList.remove("resolved");
       treeResult.textContent =
    "COMPARING VARIABLE SITES...";

setTimeout(function() {

    treeResult.textContent =
        "CALCULATING GENETIC DISTANCE...";
        treeDisplay.classList.add("calculating");

}, 3000);

setTimeout(function() {

    treeResult.textContent =
        "RESOLVING TREE TOPOLOGY...";

          treeDisplay.classList.remove("calculating");

          treeDisplay.classList.add("resolving");

}, 6000);

setTimeout(function() {

    treeResult.textContent =

        "PHYLOGENETIC RELATIONSHIP RESOLVED";

    treeDisplay.classList.remove("calculating");

    treeDisplay.classList.remove("resolving");

    treeDisplay.classList.add("resolved");
    continueAnalysis.style.display = "inline-block";
    

}, 10000);
    } else {

        treeResult.textContent =
            "ANALYSIS INCONCLUSIVE — REEXAMINE SEQUENCE SIMILARITY";

            treeDisplay.classList.remove("resolved");

    }

});
continueAnalysis.addEventListener("click", function() {

    phylogenyScreen.style.display = "none";
    spilloverScreen.style.display = "block";

    analysisMessage.textContent =
        "LOADING VIRAL RELATIONSHIP DATA...";

    setTimeout(function() {

        analysisMessage.textContent =
            "ALIGNING CONSERVED REGIONS...";

    }, 2500);

    setTimeout(function() {

        analysisMessage.textContent =
            "SCANNING HOST-ASSOCIATED VARIANTS...";

    }, 5000);

    setTimeout(function() {

        analysisMessage.textContent =
            "COMPARING CROSS-SPECIES VIRAL SIGNALS...";

    }, 7500);

    setTimeout(function() {

        analysisMessage.textContent =
            "CROSS-SPECIES RELATIONSHIP DETECTED";

            scanLine.style.animation = "none";
            
            hostAnalysis.style.display = "block";
             
        setTimeout(function() {

        reconstructionIntro.style.display = "block";

        }, 2000);

    }, 10000);

});

function startReconstructionTimer() {

    reconstructionTime = 300;

    reconstructionInterval = setInterval(function() {

        reconstructionTime--;

        const minutes = Math.floor(reconstructionTime / 60);
        const seconds = reconstructionTime % 60;

        reconstructionTimer.textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");

        if (reconstructionTime <= 0) {

            clearInterval(reconstructionInterval);

            reconstructionTimer.textContent = "00:00";
             timeoutScreen.style.display = "flex";

        }

    }, 1000);
}

restoreSession.addEventListener("click", function() {

    timeoutScreen.style.display = "none";

    startReconstructionTimer();

});
beginReconstruction.addEventListener("click", function() {

    spilloverScreen.style.display = "none";
    reconstructionScreen.style.display = "block";

   setTimeout(function() {

    interferenceWarning.style.display = "block";

    startReconstructionTimer();

    setTimeout(function() {

        interferenceWarning.style.display = "none";

    }, 25000);

}, 1500);

});
eventCards.forEach(function(card) {

    card.addEventListener("click", function() {

        const event = card.dataset.event;

        if (!selectedEvents.includes(event)) {

            selectedEvents.push(event);

            card.classList.add("selected");

            card.textContent =
                selectedEvents.length + ". " + card.textContent;

            reconstructionStatus.textContent =
                "SELECTED EVENTS: " +
                selectedEvents.length +
                " / 6";
        }

    });

}); 
resetReconstruction.addEventListener("click", function() {

    selectedEvents = [];

    eventCards.forEach(function(card) {

        card.classList.remove("selected");

        card.textContent =
            card.textContent.replace(/^\d+\.\s/, "");

    });

    reconstructionStatus.textContent =
        "SELECTED EVENTS: 0 / 6";

    reconstructionResult.textContent = "";

});

submitReconstruction.addEventListener("click", function() {

    if (selectedEvents.length < 6) {

        reconstructionResult.textContent =
            "RECONSTRUCTION INCOMPLETE — SELECT ALL SIX EVENTS";

        return;
    }

    if (arraysMatch(selectedEvents, correctTransmissionOrder)) {
    clearInterval(reconstructionInterval);  
    reconstructionResult.textContent =

        "TRANSMISSION PATHWAY CONFIRMED";
        reconstructionResult.style.color = "#63ff9b";

    setTimeout(function() {

        transmissionCompleteScreen.style.display = "flex";

    }, 1000);

    } else {

        reconstructionResult.textContent =
            "INCORRECT PATHWAY — REASSESS EVENT ORDER";
             reconstructionResult.style.color = "#ff6b6b";

    }

});