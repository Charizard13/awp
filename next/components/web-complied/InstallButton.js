"use client";


const slot = `<slot></slot>`;
const button = `
<style>
button {
  display: block;
  min-width: 100px;
  margin-left: auto;
  text-align: center;
  border: 1px solid #000;
  border-radius: 8px;
  padding: 8px 16px;
  background: #000;
  color: #fff;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  white-space: nowrap;
  transition-duration: 300ms;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  cursor: pointer;
}
</style>
<button>
  <slot></slot>
</button>`;

const template = document.createElement("template");
template.innerHTML = button;

class InstallButton extends HTMLElement {
    promptEvent = null;
    appStatus = "not-installed";

    constructor() {
        super();
        this.isInstalled();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));
    }

    isInstalled() {
        let displayMode = "browser tab";
        if (navigator.standalone) {
            displayMode = "standalone-ios";
        }
        if (document.referrer.includes("android-app://")) {
            displayMode = "standalone-android";
        }
        const displays = ["fullscreen", "standalone", "minimal-ui", "window-controls-overlay"];
        if (displays.some((displayMode) => window.matchMedia(`(display-mode: ${displayMode})`).matches)) {
            displayMode = "standalone-chrome";
        }

        if (displayMode !== "browser tab") {
            this.appStatus = "installed";
            this.hidden = true;
            return;
        }
    }

    connectedCallback() {
        this.addEventListener("click", () => {
            if (this.appStatus === "installed") {
                alert("App is already installed");
                return;
            }
            if (this.promptEvent) {
                this.promptEvent.prompt();
                this.promptEvent.userChoice.then((choice) => {
                    if (choice.outcome === "accepted") {
                        this.appStatus = "installed";
                        this.hidden = true;
                    } else {
                        this.appStatus = "not-installed";
                        this.hidden = false;
                    }
                    this.promptEvent = null;
                });
            }

            if (navigator.userAgent.includes("Mobile/") && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) {
                if (document.querySelector("add-to-home-screen")) return;
                document.body.appendChild(document.createElement("add-to-home-screen"));
                return;
            }
            if (navigator.userAgent.includes("Mac OS") && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) {
                if (document.querySelector("add-to-dock")) return;
                document.body.appendChild(document.createElement("add-to-dock"));
                return;
            }
            return;
        });

        window.addEventListener("beforeinstallprompt", (event) => {
            if (this.appStatus === "installed") return;
            if (!event) {
                this.appStatus = "no-support";
                return;
            }
            this.promptEvent = event;
            this.hidden = false;
        });

        window.addEventListener("appinstalled", () => {
            this.appStatus = "installed";
            this.hidden = true;
        });
    }

    static get observedAttributes() {
        return ["asChild", "className"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.shadowRoot) {
            return;
        }
        if (name === "asChild") {
            this.shadowRoot.innerHTML = newValue !== null ? slot : button;
        }
        if (name === "className" && newValue) {
            const button = this.shadowRoot.querySelector("button");
            if (button) {
                button.className = newValue;
            }
        }
    }
}

customElements.define("install-button", InstallButton);
