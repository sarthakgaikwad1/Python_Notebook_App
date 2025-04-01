document.addEventListener("DOMContentLoaded", function () {
    // Character Counter for Textarea
    const textarea = document.getElementById("note_content");
    const charCounter = document.createElement("p");
    charCounter.style.textAlign = "right";
    charCounter.style.fontSize = "12px";
    charCounter.style.color = "#555";
    
    if (textarea) {
        textarea.parentNode.appendChild(charCounter);
        textarea.addEventListener("input", function () {
            charCounter.textContent = `Characters: ${textarea.value.length}/500`;
        });
    }

    // Confirm Before Deleting a Note
    const deleteLinks = document.querySelectorAll(".delete");
    deleteLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            if (!confirm("Are you sure you want to delete this note?")) {
                event.preventDefault();
            }
        });
    });

    // Smooth Scroll to "Create Note" Form
    const createBtn = document.querySelector(".floating-btn");
    if (createBtn) {
        createBtn.addEventListener("click", function (event) {
            event.preventDefault();
            document.getElementById("create").scrollIntoView({ behavior: "smooth" });
        });
    }

    // Form Validation Before Submitting
    const noteForm = document.querySelector("form");
    if (noteForm) {
        noteForm.addEventListener("submit", function (event) {
            const title = document.getElementById("note_name").value.trim();
            const content = textarea.value.trim();
            
            if (title === "" || content === "") {
                alert("Note title and content cannot be empty!");
                event.preventDefault();
            }
        });
    }
});
