const reponse = await fetch("script/questions.json");
const listeQuestions = await reponse.json();

const resultat = await fetch("script/resultat.json")
const resultatFinal = await resultat.json()

//création des variables utilisées

const conteneurJeu= document.querySelector(".conteneur-jeu")

let conteneurQuestion = document.createElement("div")
conteneurQuestion.classList.add("conteneur-questions")

let conteneurPropositions = document.createElement("div")
conteneurPropositions.classList.add("conteneur-propositions")

let conteneurFinal = document.createElement("div")
conteneurFinal.classList.add("conteneur-final")

let numeroQuestion = 0
let diplodocus = {valeur:0 , id:0}
let triceratops= {valeur:0 , id:1}
let stegosaure = {valeur:0 , id:2}
let tRex= {valeur:0 , id:3}
let raptor = {valeur:0 , id:4}
let parasaurolophus = {valeur:0 , id:5}
let ankylosaure = {valeur:0 , id:6}
let struthiomimus = {valeur:0 , id:7}
let dilophosaure = {valeur:0 , id:8}
let spinosaure = {valeur:0 , id:9}
let compsognathus = {valeur:0 , id:10}
let baryonyx = {valeur:0 , id:11}


//initialiser la page
genererQuestion(listeQuestions)
genererPropositions(listeQuestions)
conteneurJeu.appendChild(conteneurFinal)
conteneurJeu.appendChild(conteneurQuestion)
conteneurJeu.appendChild(conteneurPropositions)


//récupérer le choix fait par l'utilisateur
function recupererDonnees (){
    let question = listeQuestions[numeroQuestion]
    let dinosaure1 =""
    let dinosaure2 =""

    if (numeroQuestion === 2 || numeroQuestion === 5 || numeroQuestion === 10){
        let inputRange=document.querySelector("input[type=range]").value
        dinosaure1=question.propositions[inputRange].dinosaure1
    }else{
        let choix = document.querySelector("input[name=reponse]:checked").id;
        dinosaure1 = question.propositions[choix].dinosaure1
        dinosaure2 = question.propositions[choix].dinosaure2
    }

    switch (dinosaure1){
        case "T-rex":
            tRex.valeur +=1
            break
        case "Triceratops":
            triceratops.valeur +=1
            break
        case "Diplodocus":
            diplodocus.valeur +=1
            break
        case "Spinosaure":
            spinosaure.valeur +=1
            break
        case "Stegosaure":
            stegosaure.valeur +=1
            break
        case "Raptor":
            raptor.valeur +=1
            break
        case "Parasaurolophus":
            parasaurolophus.valeur +=1
            break
        case "Ankylosaure":
            ankylosaure.valeur +=1
            break
        case "Struthiomimus":
            struthiomimus.valeur +=1
            break
        case "Dilophosaure":
            dilophosaure.valeur +=1
            break
        case "Compsognathus":
            compsognathus.valeur +=1
            break
        case "Baryonyx":
            baryonyx.valeur +=1
            break
        default:
            break
    }

    switch (dinosaure2){
        case "T-rex":
            tRex.valeur +=1
            break
        case "Triceratops":
            triceratops.valeur +=1
            break
        case "Diplodocus":
            diplodocus.valeur +=1
            break
        case "Spinosaure":
            spinosaure.valeur +=1
            break
        case "Stegosaure":
            stegosaure.valeur +=1
            break
        case "Raptor":
            raptor.valeur +=1
            break
        case "Parasaurolophus":
            parasaurolophus.valeur +=1
            break
        case "Ankylosaure":
            ankylosaure.valeur +=1
            break
        case "Struthiomimus":
            struthiomimus.valeur +=1
            break
        case "Dilophosaure":
            dilophosaure.valeur +=1
            break
        case "Compsognathus":
            compsognathus.valeur +=1
            break
        case "Baryonyx":
            baryonyx.valeur +=1
            break
        default:
            break
    }
}


// Générer la question suivante
function genererQuestion (listeQuestions){
    let nouvelleQuestion = document.createElement("p")
    nouvelleQuestion.innerText= listeQuestions[numeroQuestion].question
    conteneurQuestion.appendChild(nouvelleQuestion)
}



// générer les propositions suivantes
function genererPropositions (listeQuestions){
    let nouvelleProposition = document.createElement("div")
    let question = listeQuestions[numeroQuestion]

    if (numeroQuestion === 2 || numeroQuestion === 5 || numeroQuestion === 10){
        const max=question.propositions.length-1
        const libelleMin = question.min
        const libelleMax = question.max

        nouvelleProposition.classList.add("range")
        nouvelleProposition.innerHTML+=`<label for="question" class="labelRange">${libelleMin}</label><input type="range" name="question" id="question" min=0 max=${max} step=1><label for="question" class="labelRange">${libelleMax}</label>`
        conteneurPropositions.appendChild(nouvelleProposition)
    }else{
        nouvelleProposition.classList.remove("range")
        for (let x=0 ; x < question.propositions.length; x++){
            const proposition = question.propositions[x].reponse
           
            nouvelleProposition.innerHTML+=`<input type="radio" name="reponse" id="${x}"><label for="${x}" class=style-bouton>${proposition}</label>`
            conteneurPropositions.appendChild(nouvelleProposition)
        }
    }
}

function genererDino(){
    let box = Math.floor(Math.random()*3)
    let dino = Math.floor(Math.random()*6)
    let conteneurFantome = document.createElement("div")
    conteneurFantome.innerHTML= `<div class="conteneur-fantome${box}"><img src="./images/fantome${dino}.png"></div>`
    conteneurFinal.append(conteneurFantome)

    let fantome=document.querySelector(".conteneur-fantome"+box)
    fantome.addEventListener("click", function(){
        conteneurFantome.classList.add("chasse"+box)
    })
}

// terminer le jeu et afficher le résultat
function finJeu (){

    let totalDinosaures = [diplodocus,triceratops,stegosaure,tRex,raptor,parasaurolophus,ankylosaure,struthiomimus,dilophosaure,spinosaure,compsognathus,baryonyx]
    totalDinosaures.sort(function (a,b){
        return b.valeur - a.valeur
    })
    let resultatDinosaure = totalDinosaures[0]
    let dinosaureFinal = resultatFinal[resultatDinosaure.id].nom
    let descriptionDinosaure = resultatFinal[resultatDinosaure.id].description


    // Résultat du test
    let titreFinal= document.createElement("h1")
    titreFinal.innerText= "Votre dinosaure intérieur est... un " + dinosaureFinal + " !!!"
    conteneurFinal.append(titreFinal)
    
    // Image et description
    conteneurQuestion.classList.remove("conteneur-questions")

    let texteFinal= document.createElement("p")
    texteFinal.innerText= descriptionDinosaure

    let copyright = document.createElement("div")
    copyright.classList.add("copyright")
    copyright.innerHTML=`<a href="https://www.benjaminmackey.com/jurassic-classics#2">Image : Benjamin Mackey</a>`
    conteneurPropositions.setAttribute("style","background-image:url(./images/" + dinosaureFinal +".jpg)")
    conteneurPropositions.setAttribute("id","imageDino")
    conteneurPropositions.append(texteFinal)
    conteneurPropositions.append(copyright)

    genererGraphique(totalDinosaures)


    let conteneurInput= document.querySelector(".conteneur-input")
    conteneurInput.innerHTML=`<a href="index.html" > <img class = bouton src="./images/boutonRejouer.png" alt="Rejouer"> </a>`
}


function genererGraphique(totalDinosaures){

    let graphique = document.getElementById('graphique-score');
    graphique.removeAttribute("style")
    const dataDinosaures= [resultatFinal[totalDinosaures[0].id].nom , resultatFinal[totalDinosaures[1].id].nom , resultatFinal[totalDinosaures[2].id].nom]
    const dataScore=[totalDinosaures[0].valeur , totalDinosaures[1].valeur , totalDinosaures[2].valeur]
    console.log(dataDinosaures)
    console.log(dataScore)
      
        new Chart(graphique, {
          type: 'bar',
          data: {
            labels: dataDinosaures,
            datasets: [{
              data: dataScore,
              borderWidth: 1,
              backgroundColor: [
                "#5E66F2",
                "#797FF2",
                "#999df0"
              ]
            }]
          },
          options: {
            plugins:{
              legend:false
            },
            indexAxis:"y",
            scales: {
              y:{
                grid:{
                    display:false,
                    drawBorder:false,
                    drawOnChartArea:false,
                  },
                ticks:{
                  textStrokeColor:"#F2E5E4",
                  textStrokeWidth:6,
                  color:"#02735E",
                  font:{
                    size:18,
                    weight:"bold",
                  }
                }
              },
              x: {
                grid:{
                  display:false,
                  drawBorder:false,
                  drawOnChartArea:false,
                },
                ticks:{
                  display:false
                }
              }
            }
          }
        });
}

let btnValider= document.getElementById("valider");
btnValider.addEventListener("click", function(){

    // récupérer la réponse utilisateur
    recupererDonnees()

    // passer à la question suivante
    numeroQuestion++
    
    // réinitialiser les champs de question
    conteneurFinal.innerHTML=""
    conteneurQuestion.innerHTML=""
    conteneurPropositions.innerHTML=""

    if (numeroQuestion < listeQuestions.length){
    // générer la question et les réponses possibles
        genererQuestion(listeQuestions)
        genererPropositions(listeQuestions)
        genererDino()
    }else{
        finJeu()
    }

    conteneurJeu.appendChild(conteneurFinal)
    conteneurJeu.appendChild(conteneurQuestion)
    conteneurJeu.appendChild(conteneurPropositions)

    console.log(struthiomimus)

    window.scrollTo({
        top:0,
        left:0,
        behavior:"smooth"
    })
})
