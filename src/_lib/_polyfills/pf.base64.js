import { btoa, atob } from 'Base64';

window.btoa = window.btoa || btoa;
window.atob = window.atob || atob;
