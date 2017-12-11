var menuEl = document.querySelector('#demo-menu');
var menu = new mdc.menu.MDCSimpleMenu(menuEl);
var toggle = document.querySelector('.toggle');
toggle.addEventListener('click', function() {
    menu.open = !menu.open;
});