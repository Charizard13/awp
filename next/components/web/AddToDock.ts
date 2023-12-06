const addToDockTemplate = document.createElement("template");
addToDockTemplate.innerHTML = `
<style>
.container {
   display: flex;
   flex-direction: column;
   padding: 1rem;
   position: fixed;
   top: 16px;
   left: 16px;
   width: 500px;
   max-width: calc(100% - 64px);
   box-shadow: 0 0 10px rgba(0, 0, 0, .2);
   z-index: 1000;
   background: #fff;
   border-radius: 0.5rem;
}
.container > h2 {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
}
.container > ol {
  list-style-type: decimal;
  list-style-position: inside;
  text-align: left;
  color: #6b7280;
  gap: 1rem;
}
.container > ol > li {
  text-align: left;
}
.container > ol > li > div {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  color: #3b82f6;
}
</style>
<div class="container">
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
  <ol>
    <li>Click the File option on the top left of your screen.</li>
    <li>Click the Add to Dock option.</li>
  </ol>
  <slot></slot>
</div>
`;

export class AddToDock extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(addToDockTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot!.querySelector(".close")!.addEventListener("click", () => this.remove());
  }
}

customElements.define("add-to-dock", AddToDock);
