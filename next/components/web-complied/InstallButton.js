"use client";

// const template = document.createElement("template");
// template.innerHTML = `
//   <button>
//   <slot></slot>
//   </button>
// `;
class InstallButton extends HTMLButtonElement {
  promptEvent = null;
  appStatus = "not-installed";
  constructor() {
    super();
    // this.attachShadow({ mode: "open" });
    // this.shadowRoot!.appendChild(template.content.cloneNode(true));
    this.isInstalled();
  }

  isInstalled() {
    if (
      window.navigator.standalone == true || // iOS PWA Standalone
      document.referrer.includes("android-app://") || // Android Trusted Web App
      [
        "fullscreen",
        "standalone",
        "minimal-ui",
        "window-controls-overlay",
      ].some(
        (displayMode) =>
          window.matchMedia(`(display-mode: ${displayMode})`).matches,
      ) // Chrome PWA (supporting fullscreen, standalone, minimal-ui)
    ) {
      this.appStatus = "installed";
      this.hidden = true;
      return;
    }
    this.appStatus = "not-installed";
  }

  connectedCallback() {
    this.addEventListener("click", () => {
      if (!this.promptEvent) {
        alert("Your browser does not support this feature");
        return;
      }
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
}

customElements.define("install-button", InstallButton, { extends: "button" });
