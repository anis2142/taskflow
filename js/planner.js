
// Smart Planner
const student = currentStudent();

if (student) {
  const tasks = student.tasks;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const remaining = tasks.filter(t => t.status !== "Completed");
  const progress = tasks.length
    ? Math.round(completed / tasks.length * 100)
    : 0;

  // Summary
  document.getElementById("totalTasks").textContent = tasks.length;
  document.getElementById("remainingTasks").textContent = remaining.length;
  document.getElementById("completedTasks").textContent = completed;

  // Workload overview
  const statuses = ["Not started", "In progress", "Completed"];

  document.getElementById("workloadOverview").innerHTML =
    statuses.map(status => {
      const count = tasks.filter(t => t.status === status).length;
      const percent = tasks.length
        ? Math.round(count / tasks.length * 100)
        : 0;

      return `
        <div class="workload-item mb-3">
          <div class="d-flex justify-content-between mb-1">
            <strong>${status}</strong>
            <span>${count} assignments (${percent}%)</span>
          </div>
          <div class="progress">
            <div class="progress-bar" style="width:${percent}%"></div>
          </div>
        </div>
      `;
    }).join("");

  // Upcoming deadlines
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = remaining
    .map(t => ({
      ...t,
      days: Math.ceil((parseDueDate(t.due) - today) / 86400000)
    }))
    .sort((a, b) => a.days - b.days);

  document.getElementById("priorityList").innerHTML =
    upcoming.map(t => `
      <div class="priority-item border-bottom py-3">
        <strong>${t.title}</strong>
        <div class="small text-muted">${t.subject} · ${t.due}</div>
        <span class="small ${
          t.days < 0 ? "text-danger" :
          t.days <= 3 ? "text-warning" : "text-muted"
        }">
          ${
            t.days < 0 ? "Overdue" :
            t.days === 0 ? "Due today" :
            t.days === 1 ? "Due tomorrow" :
            "Due in " + t.days + " days"
          }
        </span>
      </div>
    `).join("") ||
    "<p class='text-muted'>No upcoming assignments.</p>";
}
