function showPage(page){

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("registerPage").classList.add("hidden");
    document.getElementById("dashboardPage").classList.add("hidden");

    document.getElementById(page).classList.remove("hidden");
}