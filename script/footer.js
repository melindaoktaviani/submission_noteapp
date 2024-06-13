class NoteFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
        <style>
          footer {
            background-color: #8e7ab5;
            text-align: center;
            padding: 10px;
            color: white;
          }
        </style>
        <footer>
          <p>&copy; Melinda Oktaviani 2024 NoteApp</p>
        </footer>
      `;
  }
}

customElements.define("note-footer", NoteFooter);
