import { RootElement, _router } from "jojo-lowcode"
import "./router.js"

window.addEventListener("popstate", _router)
window.addEventListener("DOMContentLoaded", () => {
    RootElement(document.getElementById('main-root'))
    _router()
})