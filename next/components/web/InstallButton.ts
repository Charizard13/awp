"use client";

type UserChoice = {
  outcome: "accepted" | "dismissed";
};

type BeforeInstallPromptEvent = {
  prompt: () => void;
  userChoice: Promise<UserChoice>;
} & Event;

class InstallButton extends HTMLButtonElement {
  promptEvent: BeforeInstallPromptEvent | null = null;
  appStatus: "no-support" | "installed" | "not-installed" = "not-installed";
  constructor() {
    super();
    this.isInstalled();

    const template = document.createElement("template");
    template.innerHTML = `
  <slot></slot>
`;
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
      if (navigator.userAgent.includes("Mac OS") && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) {
        document.body.appendChild(document.createElement("add-to-dock"));
        return;
      }
      if (navigator.userAgent.includes("Mobile/") && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) {
        document.body.appendChild(document.createElement("add-to-home-screen"));
      }
      return;
    });

    window.addEventListener("beforeinstallprompt", (event) => {
      if (this.appStatus === "installed") return;
      if (!event) {
        this.appStatus = "no-support";
        return;
      }
      this.promptEvent = event as BeforeInstallPromptEvent;
      this.hidden = false;
    });

    window.addEventListener("appinstalled", () => {
      this.appStatus = "installed";
      this.hidden = true;
    });
  }
}

customElements.define("install-button", InstallButton, { extends: "button" });
