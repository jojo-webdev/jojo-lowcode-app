import { LitElement, html } from "lit";
import { defineView } from "jojo-lowcode";
import "../components/welcome/welcome.js";

defineView('index', class extends LitElement {
    createRenderRoot() {
        return this
    }

    render() {
        return html`
        <welcome-component></welcome-component>
        `
    }
})

