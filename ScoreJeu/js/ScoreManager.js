let scoreDiv;
let aboutDiv;
let aboutButton;
let scoreButton;

let outskirtsButton;
let forestButton;
let noMansLandButton;
let ghostVillageButton;
let wasteLandButton;

let searchBar;
let searchButton;

let carte1Container;
let carte2Container;

const levels = {
	OutSkirts : "outskirts",
    Forest : "forest",
    NoMansLand : "no mans land",
    GhostVillage : "ghost village",
    WasteLand : "wasteland"
}

let currentLevel;
let currentButtonSelected;


async function displayData(Data,div){
    div.html("");
    let i = 1 
    if (Array.isArray(Data)) {
        if(Data.length != 0){
            Data.forEach(item => {
                let para = $("<p>");
                para.text(JSON.stringify(item));
                para.text(i  + "# " + item["nomJoueur"] + " " + item["points"] + " " + item["coderang"] + " " + item["temps"]);
                div.append(para);
                i++;
            });
        }
        else{
            let para = $("<p>");
            para.text("No Scores available");
            div.append(para)
        }
    } else {
        console.error('Data is not an array:', Data);
    }


}

async function fetchData(idMAP) {
    try {
        const response = await fetch('http://jeuscoreszombie.42web.io/js/get_data.php?nomCarte=' + idMAP);

        const data = await response.json();
        
        console.log("Données reçues pour fetchData:", data); // 🔍 Debug
        
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

async function fetchDataName(idMAP, name) {
    try {
        const response = await fetch('http://jeuscoreszombie.42web.io/js/get_data_name.php?nomCarte=' + idMAP + '&nomJoueur=' + name);

        const data = await response.json();
        
        console.log("Données reçues pour fetchDataName:", data); // 🔍 Debug
        
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}


async function afficherDonnes(map) {
    let nomCarte1 = map + 1;
    let nomCarte2 = map + 2;
    //alert(carte1 + " " + carte2);

    let dataCarte1 = await fetchData(nomCarte1)
    let dataCarte2 = await fetchData(nomCarte2)
    displayData(dataCarte1,carte1Container)
    displayData(dataCarte2,carte2Container)
}

async function afficherDonnesAvecNom(name,map){
    let nomCarte1 = map + 1;
    let nomCarte2 = map + 2;

    dataCarte1 = await fetchDataName(nomCarte1,name);
    dataCarte2 = await fetchDataName(nomCarte2,name);
    displayData(dataCarte1,carte1Container);
    displayData(dataCarte2,carte2Container);
}

async function getMapNameJSON(name){

    switch (currentLevel) {
        case levels.OutSkirts:
            afficherDonnesAvecNom(name,"OUT")
            break;
        case levels.Forest:
            afficherDonnesAvecNom(name,"FOR")
            break;
        case levels.NoMansLand:
            cafficherDonnesAvecNom(name,"NML")
            break;
        case levels.GhostVillage:
            afficherDonnesAvecNom(name,"GVI")
            break;
        case levels.WasteLand:
            afficherDonnesAvecNom(name,"WAS")
            break;
        default:
            console.log('map not defined')
    }
}

function getSearchBarValue(){
    return $("#gsearch").val().toUpperCase();
}


$(document).ready(function() {
    
    aboutDiv = $("#aboutSection");
    scoreDiv = $("#scoreBoxContainer");
    
    aboutDiv.hide();

    $("#score").on("click",function () {  aboutDiv.hide(); scoreDiv.show();});
    $("#about").on("click",function () {  aboutDiv.show(); scoreDiv.hide();});

    $("#score").addClass("underlineText");

    $("#header div h3 > a").on("click", function () {  
        $("#header div h3 > a").removeClass("underlineText");
        $(this).addClass("underlineText");
    })



    carte1Container = $("#carte1");
    carte2Container = $("#carte2");

    $("#searchSection").hide();
    $("#scoreBoxContainerScoresCartes").hide();

    $("#buttonsContainer > button").on("click", function () {  
        $("#searchSection").show();
        $("#scoreBoxContainerScoresCartes").show();
        $("#buttonsContainer button").removeClass("buttonSelected");
        $(this).addClass("buttonSelected");
    })


    $("#outskirtsButton").on("click", async function () {  
        afficherDonnes("OUT");
        currentLevel = levels.OutSkirts;
    })

    $("#forestButton").on("click", async function () {  
        afficherDonnes("FOR");
        currentLevel = levels.Forest;
    })

    $("#noMansLandButton").on("click", async function () {  
        afficherDonnes("NML");
        currentLevel = levels.NoMansLand;
    })

    $("#ghostVillageButton").on("click", async function () {  
        afficherDonnes("GVI");
        currentLevel = levels.GhostVillage;
    })

    $("#wastelandButton").on("click", async function () {  
        afficherDonnes("WAS");
        currentLevel = levels.WasteLand;
    })

    $("#searchButton").on("click", async function(){
        let name = getSearchBarValue()
        getMapNameJSON(name)
    })


});