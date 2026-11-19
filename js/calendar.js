// Monthly calendar with assignment deadline markers
const student = currentStudent();

if (student) {
  let currentMonth = new Date();
  let selectedDate = "";

  const grid = document.getElementById("calendarGrid");
  const title = document.getElementById("calendarTitle");
  const dateTitle = document.getElementById("selectedDate");
  const dateTasks = document.getElementById("dateTasks");

  function dateKey(date) {
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  }

  function renderCalendar() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    title.textContent = currentMonth.toLocaleDateString("en-US", {
      month: "long", year: "numeric"
    });

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    let html = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      .map(day => `<strong>${day}</strong>`).join("");

    for (let i = 0; i < firstDay; i++) {
      html += `<div class="calendar-empty"></div>`;
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const key = dateKey(date);
      const count = student.tasks.filter(t => dateKey(parseDueDate(t.due)) === key).length;

      html += `<button class="calendar-day ${
        dateKey(new Date()) === key ? "today" : ""
      } ${selectedDate === key ? "selected" : ""}" data-date="${key}">
        ${day}${count ? `<small>● ${count}</small>` : ""}
      </button>`;
    }

    grid.innerHTML = html;
  }

  function showDate(key) {
    selectedDate = key;
    const parts = key.split("-").map(Number);
    const date = new Date(parts[0], parts[1], parts[2]);

    dateTitle.textContent = date.toLocaleDateString("en-US", {
      day: "numeric", month: "long", year: "numeric"
    });

    const tasks = student.tasks.filter(t => dateKey(parseDueDate(t.due)) === key);
    dateTasks.innerHTML = tasks.length ? tasks.map(task => `
      <div class="date-task">
        <strong>${task.title}</strong>
        <p class="small text-secondary mb-1">${task.subject}</p>
        <span class="badge bg-light text-dark">${task.status}</span>
      </div>
    `).join("") : `<p class="text-secondary">No assignments for this date.</p>`;

    renderCalendar();
  }

  grid.addEventListener("click", function (e) {
    const button = e.target.closest("[data-date]");
    if (button) showDate(button.dataset.date);
  });

  document.getElementById("prevMonth").onclick = function () {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    renderCalendar();
  };

  document.getElementById("nextMonth").onclick = function () {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    renderCalendar();
  };

  renderCalendar();
}
