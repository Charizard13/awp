"use client";

export class InstallBanner extends HTMLElement {
  //should pop up after 5 seconds of being on the site from the first visit on top of the page and should be dismissable which the content:
  // "Add to Home Screen" and a close button
  // should not show up if the user has already installed the app
  // should not show up if the user has dismissed it
  // Add some kind of animation to the banner when it shows up
  // Add some text to the banner to explain what it is

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    background: #fff;
                    box-shadow: 0 0 10px rgba(0,0,0,.2);
                    padding: 20px;
                    box-sizing: border-box;
                    z-index: 1000;
                    animation: slideDown .5s ease-in-out;
                }
                @keyframes slideDown {
                    from {
                        transform: translateY(-100%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }
                .close {
                    position: absolute;
                    top: 0;
                    right: 0;
                    padding: 20px;
                    cursor: pointer;
                }
            </style>
            <slot></slot>
            <div class="close">X</div>
        `;
  }

  connectedCallback() {
    this.shadowRoot!.querySelector(".close")!.addEventListener("click", () => {
      this.remove();
    });
  }

  disconnectedCallback() {
    this.shadowRoot!.querySelector(".close")!.removeEventListener(
      "click",
      () => {
        this.remove();
      },
    );
  }

  static get observedAttributes() {
    return ["hidden"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "hidden") {
      if (newValue === "true") {
        this.style.display = "none";
      } else {
        this.style.display = "block";
      }
    }
  }

  get hidden() {
    return this.getAttribute("hidden") === "true";
  }

  set hidden(value) {
    if (value) {
      this.setAttribute("hidden", "true");
    } else {
      this.setAttribute("hidden", "false");
    }
  }
}

customElements.define("install-banner", InstallBanner);
