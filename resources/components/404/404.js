import { LitElement, html } from "lit";
import { defineComponent } from "jojo-lowcode";
import style from "./404.module.scss"

defineComponent('page-404', class extends LitElement {
    createRenderRoot() {
        return this
    }

    render(){
        return html`
        <div class=${style._page_status}>
            <h5>404 <span>{</span> Page not found <span>}</span></h5>
        </div>
        `
    }
})