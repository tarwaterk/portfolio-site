const menuEl = document.querySelector('#main-nav');
let menu = new mdc.menu.MDCSimpleMenu(menuEl);
let toggle = document.querySelector('.toggle');

const toggleNavMenu = function() {
    menu.open = !menu.open;
}

toggle.addEventListener('click', function() {
    toggleNavMenu();
});

menuEl.addEventListener('blur', function() {
    toggleNavMenu();
});