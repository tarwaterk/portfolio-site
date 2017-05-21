var navLinks = document.querySelectorAll(".nav__menu-item a");

navLinks.forEach(function(navItem) {
	navItem.addEventListener("click", function(event) {
		event.preventDefault();

		var selectedSection = document.getElementById(this.href.split("#")[1]);
		var allSections = document.querySelectorAll(".sect");

		allSections.forEach(function(section) {
			section.setAttribute("style", "opacity:0;visibility:hidden");
		});

		selectedSection.setAttribute("style", "opacity:1;visibility:visible");
	});
});