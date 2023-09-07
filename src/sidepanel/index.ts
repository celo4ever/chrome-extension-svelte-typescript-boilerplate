import Options from "../components/Options.svelte";
import { storage } from "../storage";
import '../styles/styles.css'
import Home from "../components/Home.svelte";
// Side panel
// https://developer.chrome.com/docs/extensions/reference/sidePanel/

let TEST = true;

function render() {
    const target = document.getElementById("app");
    
    if (target) {
        if (TEST) {
            new Home({
                target,
            });
        }else{
            storage.get().then(({ count }) => {
                new Options({
                    target,
                    props: { count },
                });
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", render);
