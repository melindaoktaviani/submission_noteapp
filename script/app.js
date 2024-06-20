import "./css/styles.css";
import "./footer.js";
import "./header.js";

const API_URL = "https://notes-api.dicoding.dev/v2";
const API_TOKEN = "your_api_token_here"; // Replace with your actual token

async function fetchNotes() {
  try {
    showLoadingIndicator(); // Show loading indicator
    const response = await fetch(`${API_URL}/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    const data = await response.json();
    if (data.status === "success") {
      renderNotes(data.data); // Function to render notes to the DOM
    }
  } catch (error) {
    console.error("Failed to fetch notes", error);
  } finally {
    hideLoadingIndicator(); // Hide loading indicator
  }
}

async function addNote() {
  const title = document.getElementById("note-title").value;
  const body = document.getElementById("note-body").value;

  try {
    showLoadingIndicator(); // Show loading indicator
    const response = await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ title, body }),
    });
    const data = await response.json();
    if (data.status === "success") {
      fetchNotes(); // Refresh the list of notes
    }
  } catch (error) {
    console.error("Failed to add note", error);
  } finally {
    hideLoadingIndicator(); // Hide loading indicator
  }
}

export async function deleteNoteWithConfirmation(id) {
  if (confirm("Are you sure you want to delete this note?")) {
    try {
      showLoadingIndicator(); // Show loading indicator
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        fetchNotes(); // Refresh the list of notes
      }
    } catch (error) {
      console.error("Failed to delete note", error);
    } finally {
      hideLoadingIndicator(); // Hide loading indicator
    }
  }
}

function renderNotes(notes) {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";
  notes.forEach((note) => {
    const noteItem = document.createElement("div");
    noteItem.innerHTML = `
      <div class="note">
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <button data-note-id="${note.id}" class="edit-button">Edit</button>
        <button data-note-id="${note.id}" class="delete-button">Delete</button>
      </div>
    `;
    notesList.appendChild(noteItem);
  });
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-button")) {
    const noteId = event.target.getAttribute("data-note-id");
    deleteNoteWithConfirmation(noteId);
  } else if (event.target.classList.contains("edit-button")) {
    const noteId = event.target.getAttribute("data-note-id");
    editNote(noteId);
  }
});

function showLoadingIndicator() {
  document.getElementById("loading-indicator").style.display = "block";
}

function hideLoadingIndicator() {
  document.getElementById("loading-indicator").style.display = "none";
}

async function editNote(id) {
  try {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    const data = await response.json();
    if (data.status === "success") {
      const note = data.data;
      document.getElementById("note-id").value = note.id;
      document.getElementById("note-title").value = note.title;
      document.getElementById("note-body").value = note.body;
    }
  } catch (error) {
    console.error("Failed to fetch note for editing", error);
  }
}

async function updateNote() {
  const id = document.getElementById("note-id").value;
  const title = document.getElementById("note-title").value;
  const body = document.getElementById("note-body").value;
  try {
    showLoadingIndicator();
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ title, body }),
    });
    const data = await response.json();
    if (data.status === "success") {
      fetchNotes(); // Refresh the list of notes
    }
  } catch (error) {
    console.error("Failed to update note", error);
  } finally {
    hideLoadingIndicator(); // Hide loading indicator
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const id = document.getElementById("note-id").value;
    if (id) {
      updateNote(); // Function to update an existing note
    } else {
      addNote(); // Function to add a new note
    }
    form.reset();
    document.getElementById("note-id").value = "";
  });

  fetchNotes();
});
