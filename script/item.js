import { deleteNoteWithConfirmation } from "./app.js";
class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set noteData(data) {
    this.shadowRoot.innerHTML = `
          <style>
            .note {
              background-color: #fff;
              border: 1px solid #8e7ab5;
              border-radius: 8px;
              padding: 15px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              position: relative;
            }
            .note h2 {
              margin: 0 0 10px;
            }
            .note p {
              margin: 0 0 10px;
              white-space: pre-line;
            }
            .note small {
              display: block;
              text-align: right;
              color: #999;
            }
            .note .buttons {
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
            }
            .note button {
              background: none;
              border: none;
              cursor: pointer;
              color: #888;
              padding: 5px 10px;
              border-radius: 5px;
            }
            .note button:hover {
              background-color: #f0f0f0;
              color: #333;
            }
          </style>
          <div class="note">
            <h2>${data.title}</h2>
            <p>${data.body}</p>
            <small>Created at: ${new Date(
              data.createdAt
            ).toLocaleString()}</small>
            <div class="buttons">
              <button onclick="editNote('${data.id}')">Edit</button>
              <button onclick="deleteNoteWithConfirmation('${
                data.id
              }')">Delete</button>
            </div>
          </div>
        `;
  }
}

customElements.define("note-item", NoteItem);
