import { LitElement, html } from "lit";
import { defineComponent } from "jojo-lowcode";
import style from "./welcome.module.scss";
import oos_logo from "./oos.png"

defineComponent('welcome-component', class extends LitElement {
    createRenderRoot() {
        return this
    }

    render() {
        return html`
        <div class=${style._page_welcome}>
            <h1>LOW <span>{</span> CODE <span>}</span></h1>
            <span>LIBRARY</span>
            <br>
            <p>By : <a href="https://officeless.studio/" target="_blank"><img src=${oos_logo} alt="Image not found"> Officeless</a> Web Develovers</p>
        </div>
        `
    }
})