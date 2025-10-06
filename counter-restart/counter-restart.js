/**
 * Copyright 2025 kinguva7229
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class CounterRestart extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-restart";
  }

  constructor() {
    super();
    this.heading = "my-counter-restart";
    this.min = 0;
    this.max = 50;
    this.count = 5;
    this.plusButton = "+";
    this.minusButton = "-";
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      heading: { type: String },
      count: { type: Number },
      min: { type: Number },
      max: { type: Number },
      plusButton: { type: String },
      minusButton: { type: String },
    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: 16px;
        padding: 16px;
      }
      .counter {
        font-size: 48px;
        text-align: center;
        margin-bottom: 16px;
      }
      .counter.success { color: green; }   
      .counter.warning { color: orange; }  
      .counter.error { color: red; }
    `];
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="counter ${this.getCounterClass()}">${this.count}</div>
        <div class="buttons">
          <button @click="${this.decrease}" ?disabled="${this.count === this.min}">
            ${this.minusButton}
          </button>
          <button @click="${this.increase}" ?disabled="${this.count === this.max}">
            ${this.plusButton}
          </button>
        </div>
        <slot></slot>
      </div>
    `;
  }

  increase() {
    if (this.count < this.max) this.count++;
  }

  decrease() {
    if (this.count > this.min) this.count--;
  }

  getCounterClass() {
    if (this.count === 21) return "success";
    if (this.count === 18) return "warning";
    if (this.count === this.min || this.count === this.max) return "error";
    return "";
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has('count') && this.count === 21) {
      this.makeItRain();
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
      setTimeout(() => {
        const confetti = document.querySelector("#confetti");
        if (confetti) {
          confetti.setAttribute("popped", "");
        }
      }, 0);
    });
  }

}

globalThis.customElements.define(CounterRestart.tag, CounterRestart);


