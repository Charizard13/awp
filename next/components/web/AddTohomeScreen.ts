const addToHomeScreenTemplate = document.createElement("template");
addToHomeScreenTemplate.innerHTML = `
<style>
.container {
   display: flex;
   flex-direction: column;
   padding: 1rem;
   position: fixed;
   bottom: 16px;
   left: 50%;
   transform: translateX(-50%);
   width: 500px;
   max-width: calc(100% - 64px);
   box-shadow: 0 0 10px rgba(0, 0, 0, .2);
   z-index: 1000;
   background: #fff;
   border-radius: 0.5rem;
   animation: slideUp .5s ease-in-out;
}
@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
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
    <li>Click the 
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 8h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2v2H5v9h14v-9h-2V8zM6.5 5.5l1.414 1.414L11 3.828V14h2V3.828l3.086 3.086L17.5 5.5L12 0L6.5 5.5z"/></svg>
     on the bottom of your Iphone browser
    <li>Click on <div>Add to Home Screen</div>      
    </li>
  </ol>
  <slot></slot>
</div>
`;

export class AddToHomeScreen extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(addToHomeScreenTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot!.querySelector(".close")!.addEventListener("click", () => this.remove());
  }
}

customElements.define("add-to-home-screen", AddToHomeScreen);
