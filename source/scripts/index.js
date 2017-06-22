const navLinks = document.querySelectorAll(".nav__menu-item a");

const handleViewChange = (sectionId) => {
	let selectedSection = document.getElementById(sectionId);
	let allSections = document.querySelectorAll(".sect, .bubble-container, li img[class^='logo']");

	//reset special stylings to default
	allSections.forEach(function(section) {
		section.setAttribute("style", "opacity:0;visibility:hidden");
	});
	document.querySelectorAll(".nav__menu-item a").forEach((menuItemLink)=>{
		menuItemLink.style.color = "#000";
	});

	switch(sectionId) {
		case "home":
			document.querySelector(".bubble-container").setAttribute("style", "opacity:1;visibility:visible");
			document.querySelector(".logo-black").setAttribute("style", "opacity:1;visibility:visible");
			window.location.hash = "";
			break;
		case "about":
			document.querySelector(".logo-cyan").setAttribute("style", "opacity:1;visibility:visible");
			document.getElementById("about-link").setAttribute("style", "color:#0feef4");
			window.location.hash = "about";
			break;
		case "work":
			document.querySelector(".logo-yellow").setAttribute("style", "opacity:1;visibility:visible");
			document.getElementById("work-link").setAttribute("style", "color:#ffec00");
			window.location.hash = "work";
			break;
		case "contact":
			document.querySelector(".logo-magenta").setAttribute("style", "opacity:1;visibility:visible");
			document.getElementById("contact-link").setAttribute("style", "color:#ff00b1");
			window.location.hash = "contact";
			break;
	}
	selectedSection.setAttribute("style", "opacity:1;visibility:visible");
};

navLinks.forEach(function(navItem) {
	navItem.addEventListener("click", function(event) {
		event.preventDefault();
		const sectionId = this.href.split("#")[1];

		handleViewChange(sectionId);
	});
});

window.onload = () => {
	console.log("hash: " + window.location.hash);
	if(window.location.hash !== "") {
		const sectionId = window.location.hash.match(/#(\w+)/)[1];
		handleViewChange(sectionId);
	} 
};