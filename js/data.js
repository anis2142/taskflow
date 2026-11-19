
// Student and assignment data
const students = [
  {
    id: "anis",
    name: "Anis",
    password: "1234",
    tasks: [
      { title: "Website Design", subject: "IMS566", due: "25 Nov 2026", status: "Completed" },
      { title: "Database Report", subject: "IMD263", due: "28 Nov 2026", status: "In progress" },
      { title: "Project Presentation", subject: "IMS566", due: "5 Dec 2026", status: "Not started" },
      { title: "Literature Review", subject: "IMS565", due: "30 Nov 2026", status: "In progress" },
      { title: "Email Writing", subject: "LCC501", due: "2 Dec 2026", status: "Not started" },
      { title: "Database Exercises", subject: "IMD263", due: "8 Dec 2026", status: "Not started" },
      { title: "Group Assignment", subject: "CTU554", due: "12 Dec 2026", status: "Not started" },
      { title: "Final Report", subject: "IMS565", due: "15 Dec 2026", status: "Not started" }
    ]
  },
  {
    id: "aina",
    name: "Aina",
    password: "1234",
    tasks: [
      { title: "User Interface", subject: "IMS566", due: "24 Nov 2026", status: "Completed" },
      { title: "System Testing", subject: "IMS566", due: "30 Nov 2026", status: "Not started" },
      { title: "Final Report", subject: "IMS565", due: "6 Dec 2026", status: "In progress" },
      { title: "Database Exercises", subject: "IMD263", due: "3 Dec 2026", status: "Not started" },
      { title: "Article Review", subject: "CTU554", due: "8 Dec 2026", status: "In progress" },
      { title: "Project Proposal", subject: "IMS566", due: "12 Dec 2026", status: "Not started" }
    ]
  }
];

// Get logged-in student
function currentStudent() {
  return students.find(s => s.id === sessionStorage.getItem("student"));
}

// Convert assignment date into JavaScript date
function parseDueDate(value) {
  const parts = value.split(" ");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return new Date(
    Number(parts[2]),
    months.indexOf(parts[1]),
    Number(parts[0])
  );
}

// Format date for assignment form
function formatDueDate(value) {
  const date = new Date(value + "T00:00:00");

  return date.getDate() + " " +
    date.toLocaleDateString("en-GB", { month: "short" }) +
    " " + date.getFullYear();
}

// Convert date for HTML date input
function dateToInput(value) {
  const date = parseDueDate(value);

  return date.getFullYear() + "-" +
    String(date.getMonth() + 1).padStart(2, "0") + "-" +
    String(date.getDate()).padStart(2, "0");
}
