import '../styles/styles.css'
import Home from "../components/Home.svelte";
import workSpaceStorage from '../workSpaceStorage';
// Side panel
// https://developer.chrome.com/docs/extensions/reference/sidePanel/

function render() {
    const target = document.getElementById("app");
    workSpaceStorage.init();
    if (target) {
            new Home({
                target,
            });
        
    }
}

document.addEventListener("DOMContentLoaded", render);
