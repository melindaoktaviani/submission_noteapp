class NoteHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
        <style>
          header {
            background-color: #8e7ab5;
            color: white;
            padding: 10px 0;
            text-align: center;
          }
          img {
            width: auto;
            height: 100px;
          }
          h1 {
            margin: 0;
          }
        </style>
        <header>
          <div class="img">
            <img src="./asset/notes.jpg" alt="logo-note" />
            <h1>NoteApp</h1>
          </div>
        </header>
      `;
  }
}

customElements.define("note-header", NoteHeader);
