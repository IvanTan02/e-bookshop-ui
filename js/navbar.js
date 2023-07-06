// Collapse the navbar
const responsiveNav = () => {
    let nav = document.getElementById("topNavbar");
    if (nav.className === "topnav") {
        nav.className += " responsive";
    } else {
        nav.className = "topnav";
    }
}

