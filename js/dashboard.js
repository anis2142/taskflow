
// Dashboard summary and charts
const student = currentStudent();

if (student) {
  const tasks = student.tasks;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const progress = tasks.length
    ? Math.round(completed / tasks.length * 100)
    : 0;

  // Summary
  document.getElementById("studentName").textContent = student.name;
  document.getElementById("total").textContent = tasks.length;
  document.getElementById("completed").textContent = completed;
  document.getElementById("percentage").textContent = progress + "%";

  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("progressText").textContent =
    progress + "% completed";

  // Nearest deadlines
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const reminders = tasks
    .filter(t => t.status !== "Completed")
    .map(t => ({
      ...t,
      days: Math.round(
        (parseDueDate(t.due) - today) / 86400000
      )
    }))
    .sort((a, b) => a.days - b.days)
    .slice(0, 3);

  document.getElementById("reminders").innerHTML =
    reminders.map(t => {
      const message = t.days < 0 ? "Overdue" :
        t.days === 0 ? "Due today" :
        t.days === 1 ? "Due tomorrow" :
        "Due in " + t.days + " days";

      return `
        <div class="border-bottom py-2">
          <strong>${t.title}</strong>
          <p class="small text-muted mb-0">
            ${message} · ${t.due}
          </p>
        </div>
      `;
    }).join("") ||
    "<p class='text-muted small'>No upcoming deadlines.</p>";

  // Assignment status chart
  new Chart(document.getElementById("statusChart"), {
    type: "doughnut",
    data: {
      labels: ["Not started", "In progress", "Completed"],
      datasets: [{
        data: [
          tasks.filter(t => t.status === "Not started").length,
          tasks.filter(t => t.status === "In progress").length,
          completed
        ],
        backgroundColor: ["#ded8e8", "#a88bc9", "#8066ad"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });

  // Assignments by Subject chart
  const subjectCounts = {};

  tasks.forEach(t => {
    subjectCounts[t.subject] =
      (subjectCounts[t.subject] || 0) + 1;
  });

  new Chart(document.getElementById("workloadChart"), {
    type: "bar",
    data: {
      labels: Object.keys(subjectCounts),
      datasets: [{
        label: "Assignments",
        data: Object.values(subjectCounts),
        backgroundColor: "#a88bc9",
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 }
        }
      }
    }
  });
}
