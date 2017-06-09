const navLinks = document.querySelectorAll(".nav__menu-item a");

navLinks.forEach(function(navItem) {
	navItem.addEventListener("click", function(event) {
		event.preventDefault();
		const sectionId = this.href.split("#")[1];

		let selectedSection = document.getElementById(sectionId);
		let allSections = document.querySelectorAll(".sect, .bubble-container, li img[class^='logo']");

		allSections.forEach(function(section) {
			section.setAttribute("style", "opacity:0;visibility:hidden");
		});

		switch(sectionId) {
			case "home":
				document.querySelector(".bubble-container").setAttribute("style", "opacity:1;visibility:visible");
				document.querySelector(".logo-black").setAttribute("style", "opacity:1;visibility:visible");
				break;
			case "about":
				document.querySelector(".logo-cyan").setAttribute("style", "opacity:1;visibility:visible");
				break;
			case "work":
				document.querySelector(".logo-yellow").setAttribute("style", "opacity:1;visibility:visible");
				break;
			case "contact":
				document.querySelector(".logo-magenta").setAttribute("style", "opacity:1;visibility:visible");
				break;
		}
		selectedSection.setAttribute("style", "opacity:1;visibility:visible");
	});
});