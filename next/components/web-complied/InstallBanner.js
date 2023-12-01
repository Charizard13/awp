"use client";

class InstallBanner extends HTMLElement {
    lastClosedTimestamp;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.lastClosedTimestamp = 0; // Initialize with a default value
        const display = this.checkDisplay(); // Check whether to display the banner
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: ${display};
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, .2);
          padding: 1rem;
          box-sizing: border-box;
          z-index: 1000;
          animation: slideDown .5s ease-in-out;
          gap: 1rem;
          align-items: center;
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
          cursor: pointer;
          height: 1.5rem;
          width: 1.5rem;
        }

        install-button {
          display: block;
          min-width: 100px;
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" x2="12" y1="15" y2="3"></line>
      </svg>
      <slot></slot>
      <install-button>Install</install-button>
      <div class="close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </div>
    `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector(".close").addEventListener("click", () => {
            this.hideBanner();
        });
    }

    hideBanner() {
        this.remove();
        this.lastClosedTimestamp = Date.now();
        // Store the timestamp in local storage
        localStorage.setItem("installBannerLastClosed", this.lastClosedTimestamp.toString());
    }

    checkDisplay() {
        // Retrieve the last closed timestamp from local storage
        const lastClosedString = localStorage.getItem("installBannerLastClosed");
        if (lastClosedString) {
            this.lastClosedTimestamp = parseInt(lastClosedString, 10);
        }

        const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000;
        const currentTime = Date.now();

        // Check if enough time has passed since the last close
        const shouldDisplay = currentTime - this.lastClosedTimestamp >= threeDaysInMilliseconds;

        return shouldDisplay ? "flex" : "none";
    }

    static get observedAttributes() {
        return ["hidden", "data-button-text", "dir"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "hidden") {
            this.style.display = newValue === "true" ? "none" : "block";
        }
        if (name === "data-button-text") {
            this.shadowRoot.querySelector("install-button").innerHTML = newValue;
        }
        if (name === "dir") {
            const installButton = this.shadowRoot.querySelector("install-button");
            if (!installButton) return;
            if (newValue === "rtl") {
                installButton.style.marginRight = "auto";
            } else {
                installButton.style.marginLeft = "auto";
            }
        }
    }

    get hidden() {
        return this.getAttribute("hidden") === "true";
    }

    set hidden(value) {
        this.setAttribute("hidden", value ? "true" : "false");
    }
}

customElements.define("install-banner", InstallBanner);
