/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function affichresultat(scores,resultats){
let spanScore=document.querySelector(".zoneScore span")
let affichageScore=`${scores}/${resultats}`
spanScore.innerText=affichageScore
    console.log("votre score est de :" +scores +"sur "+resultats)
}

/**
 * Cette fonction affiche une proposition, que le joueur devra recopier, 
 * dans la zone "zoneProposition"
 * @param {string} proposition : la proposition à afficher
 */
function afficherProposition(proposition){
    let zoneProposition=document.querySelector(".zoneProposition")
    zoneProposition.innerText=proposition
}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}


/**
 * Cette fonction prend un nom en paramètre et valide qu'il est au bon format
 * ici : deux caractères au minimum
 * @param {string} nom 
 * @throws {Error}
 */
 function validerNom(nom){
           if (nom.length<2){
            return false
           }
              throw new Error("Le nom est trop court")
        } 


        /**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
 * @param {string} email 
 * @throws {Error}
 */
        function validerEmail(email){
            
            let validEmail= new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
            if(!validEmail.test(email)){
               throw new Error("L'email n'est pas valide")
            }
        
   
            
        } 
        
        /**
 * Cette fonction affiche le message d'erreur passé en paramètre. 
 * Si le span existe déjà, alors il est réutilisé pour ne pas multiplier
 * les messages d'erreurs. 
 * @param {string} message 
 */
        function afficherMessageErreur(message){
            
            let spanErreurMessage=document.getElementById("errorMessage")
            if(!spanErreurMessage){
                let popup=document.querySelector(".popup")
                  spanErreurMessage=document.createElement("span")
            spanErreurMessage.id="errorMessage"
           
            popup.append(spanErreurMessage)
            }
             spanErreurMessage.innerText=message
        }

        /**
 * Cette fonction permet de récupérer les informations dans le formulaire
 * de la popup de partage et d'appeler l'affichage de l'email avec les bons paramètres.
 * @param {string} scoreEmail 
 */
        function gererFormulaire(scoreEmail){
            try{
             let baliseNom=document.getElementById("nom")
           
            let nom=baliseNom.value
            validerNom(nom)
             let baliseEmail=document.getElementById("email")
           let email=baliseEmail.value
           validerEmail(email)
        
           afficherMessageErreur("")
              afficherEmail(nom, email, scoreEmail)
          
           } catch(error){
            afficherMessageErreur(error.message)
           }
            }
             
        

/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerjeu() {
    i=0
   
    let score=0
    let resultats=0
    let listeProposition=listmot
   
  
    let buttonValider=document.getElementById("btnValiderMot")
    let inputEcriture=document.getElementById("inputEcriture")
    afficherProposition(listeProposition[i])
    buttonValider.addEventListener("click", () =>{
        console.log(inputEcriture.value)
        if(inputEcriture.value){
            score++
        }
        i++
        affichresultat(score, i)
        inputEcriture.value=""
        if(listeProposition[i]===undefined){
            afficherProposition("Le jeu est terminé")
            buttonValider.disabled=true
        }
        else{
             afficherProposition(listeProposition[i])
        }
       
})
        let listButonRadio=document.querySelectorAll(".optionSource input")
    for (let index=0; index<listButonRadio.length; index++){
        listButonRadio[index].addEventListener("change", (event)=>{
            console.log(event.target.value)


 // Si c'est le premier élément qui a été modifié, alors nous voulons
            // jouer avec la listeMots. 
            if(event.target.value==="1"){
                listeProposition=listmot
            }
            else{
               // Sinon nous voulons jouer avec la liste des phrases
                listeProposition=listphrase
               }
            // Et on modifie l'affichage en direct. 
            afficherProposition(listeProposition[i])
        })
        }
         // Gestion de l'événement submit sur le formulaire de partage. 
        let form=document.querySelector("form")
        form.addEventListener("submit", (event)=>{
            event.preventDefault()
            let scoreEmail=`${score}/${i}`
            gererFormulaire(scoreEmail)
           })
            

        affichresultat(score, i)
        }
