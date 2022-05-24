// JS Goes here - ES6 supported
import './dependencies/dependencies';
import "./css/main.scss";

const $menuIcon = document.getElementById('menu-icon');
const $overlayMenu = document.getElementById('overlay-menu');
const $closeIcon = document.getElementById('close-icon');
$menuIcon.addEventListener('click', () => {
  $overlayMenu.classList.add('opened');
});
$closeIcon.addEventListener('click', () => {
  $overlayMenu.classList.remove('opened');
});
