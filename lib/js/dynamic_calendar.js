const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const day = now.getDate();
const mondayIndex = (jsDay) => (jsDay + 6) % 7;

function generateCalendar(year, monthIndex) {
    const grid = document.querySelector(".calendarGrid");
    const daysInMonth = (year, monthIndex) => new Date(year, monthIndex + 1, 0).getDate();
    const startOffset = mondayIndex(new Date(year, monthIndex, 1).getDay());

    for (let i = 0; i < 42; i++) {

    }
}  