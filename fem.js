function showPage(page){

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("registerPage").classList.add("hidden");
    document.getElementById("dashboardPage").classList.add("hidden");

    document.getElementById(page).classList.remove("hidden");
}

function inscription(){

    const nom = document.getElementById("nomInscription").value.trim();
    const email = document.getElementById("emailInscription").value.trim();
    const password = document.getElementById("passwordInscription").value;
    const confirm = document.getElementById("confirmPassword").value;

    if(nom === "" || email === "" || password === ""){
        alert("Veuillez remplir tous les champs");
        return;
    }

    if(password !== confirm){
        alert("Les mots de passe ne correspondent pas");
        return;
    }

    let utilisateurs =
        JSON.parse(localStorage.getItem("utilisateurs")) || [];

    const existe = utilisateurs.find(
        user => user.email === email
    );

    if(existe){
        alert("Cet email existe déjà");
        return;
    }

    utilisateurs.push({
        id: Date.now(),
        nom,
        email,
        password
    });

    localStorage.setItem(
        "utilisateurs",
        JSON.stringify(utilisateurs)
    );

    alert("Compte créé avec succès");

    document.getElementById("nomInscription").value = "";
    document.getElementById("emailInscription").value = "";
    document.getElementById("passwordInscription").value = "";
    document.getElementById("confirmPassword").value = "";

    showPage("loginPage");
}

function connexion(){

    const email =
        document.getElementById("emailConnexion").value.trim();

    const password =
        document.getElementById("passwordConnexion").value;

    let utilisateurs =
        JSON.parse(localStorage.getItem("utilisateurs")) || [];

    const user = utilisateurs.find(
        u => u.email === email &&
             u.password === password
    );

    if(user){

        localStorage.setItem(
            "utilisateurConnecte",
            JSON.stringify(user)
        );

        afficherUtilisateur();

        showPage("dashboardPage");

    }else{

        alert("Email ou mot de passe incorrect");

    }
}

function afficherUtilisateur(){

    const user = JSON.parse(
        localStorage.getItem("utilisateurConnecte")
    );

    if(!user) return;

    const nomDashboard =
        document.getElementById("nomDashboard");

    const bonjourDashboard =
        document.getElementById("bonjourDashboard");

    if(nomDashboard){
        nomDashboard.textContent = user.nom;
    }

    if(bonjourDashboard){
        bonjourDashboard.textContent =
            "Bonjour " + user.nom;
    }
}

function logout(){

    localStorage.removeItem(
        "utilisateurConnecte"
    );

    showPage("loginPage");
}

const user = JSON.parse(
    localStorage.getItem("utilisateurConnecte")
);

if(user){

    afficherUtilisateur();
    showPage("dashboardPage");

}else{

    showPage("loginPage");

}