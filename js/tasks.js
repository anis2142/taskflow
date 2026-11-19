
// Assignment management
const student = currentStudent();

if (student) {
  let editIndex = -1;

  const formPanel = document.getElementById("taskFormPanel");
  const form = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");

  // Display assignments
  function renderTasks() {
    const search = document.getElementById("searchTask").value.toLowerCase();
    const filter = document.getElementById("filterStatus").value;

    const filtered = student.tasks
      .map((task, index) => ({ task, index }))
      .filter(item =>
        (item.task.title.toLowerCase().includes(search) ||
         item.task.subject.toLowerCase().includes(search)) &&
        (filter === "All" || item.task.status === filter)
      );

    taskList.innerHTML = filtered.map(({ task, index }) => `
      <tr>
        <td><strong>${task.title}</strong></td>
        <td>${task.subject}</td>
        <td>${task.due}</td>
        <td>
          <span class="badge ${
            task.status === "Completed" ? "bg-success" :
            task.status === "In progress" ? "bg-warning text-dark" :
            "bg-secondary"
          }">${task.status}</span>
        </td>
        <td>
          <button class="btn btn-sm btn-outline-primary edit-btn"
            data-index="${index}">Edit</button>
          <button class="btn btn-sm btn-outline-danger delete-btn"
            data-index="${index}">Delete</button>
        </td>
      </tr>
    `).join("");

    document.getElementById("emptyMessage").hidden =
      filtered.length > 0;
  }

  // Open add assignment form
  document.getElementById("addTaskBtn").onclick = function() {
    editIndex = -1;
    form.reset();

    document.getElementById("formTitle").textContent =
      "Add New Assignment";

    document.getElementById("saveTaskBtn").textContent =
      "Save Assignment";

    formPanel.hidden = false;
  };

  // Cancel form
  document.getElementById("cancelTaskBtn").onclick = function() {
    formPanel.hidden = true;
    form.reset();
    editIndex = -1;
  };

  // Save or update assignment
  form.onsubmit = function(e) {
    e.preventDefault();

    const task = {
      title: document.getElementById("taskTitle").value.trim(),
      subject: document.getElementById("taskSubject").value.trim(),
      due: formatDueDate(document.getElementById("taskDue").value),
      status: document.getElementById("taskStatus").value
    };

    if (editIndex === -1) {
      student.tasks.push(task);
    } else {
      student.tasks[editIndex] = task;
    }

    form.reset();
    formPanel.hidden = true;
    editIndex = -1;
    renderTasks();
  };

  // Edit and delete buttons
  taskList.addEventListener("click", function(e) {
    const editButton = e.target.closest(".edit-btn");
    const deleteButton = e.target.closest(".delete-btn");

    if (editButton) {
      editIndex = Number(editButton.dataset.index);
      const task = student.tasks[editIndex];

      document.getElementById("taskTitle").value = task.title;
      document.getElementById("taskSubject").value = task.subject;
      document.getElementById("taskDue").value = dateToInput(task.due);
      document.getElementById("taskStatus").value = task.status;

      document.getElementById("formTitle").textContent =
        "Edit Assignment";

      document.getElementById("saveTaskBtn").textContent =
        "Update Assignment";

      formPanel.hidden = false;
    }

    if (deleteButton) {
      const index = Number(deleteButton.dataset.index);

      if (confirm("Are you sure you want to delete this assignment?")) {
        student.tasks.splice(index, 1);
        renderTasks();
      }
    }
  });

  // Search and filter
  document.getElementById("searchTask")
    .addEventListener("input", renderTasks);

  document.getElementById("filterStatus")
    .addEventListener("change", renderTasks);

  renderTasks();
}

