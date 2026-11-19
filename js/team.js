
// Student profiles and progress
const current = currentStudent();

document.getElementById("studentList").innerHTML =
  students.map(s => {
    const completed = s.tasks.filter(
      t => t.status === "Completed"
    ).length;

    const progress = s.tasks.length
      ? Math.round(completed / s.tasks.length * 100)
      : 0;

    return `
      <div class="col-md-6 col-lg-4">
        <div class="student-card h-100">
          <div class="student-icon">
            ${s.name.charAt(0)}
          </div>

          <h5>${s.name}</h5>
          <p class="text-muted small">Student</p>

          <div class="d-flex justify-content-between small">
            <span>Completed assignments</span>
            <strong>${completed}/${s.tasks.length}</strong>
          </div>

          <div class="progress mt-2">
            <div class="progress-bar"
              style="width:${progress}%"></div>
          </div>

          <p class="small text-muted mt-2 mb-0">
            ${progress}% completed
          </p>
        </div>
      </div>
    `;
  }).join("");
