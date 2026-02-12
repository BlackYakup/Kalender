const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const day = now.getDate();
let selectedDate = null;

const STORAGE_KEY ="calendarEventsV1";
let eventsByDate = JSON.parse(localStorage.getItem(STORAGE_KEY) || "()");

const daysInMonth = (year, monthIndex) => new Date(year, monthIndex + 1, 0).getDate();

const mondayIndex = (jsDay) => (jsDay + 6) % 7;

const pad2 = (n) => String(n).padStart(2, "0");
const toDateKey = (year, monthIndex, dayNumber) => `${year}-${pad2(monthIndex + 1)}-${pad2(dayNumber)}`;

function saveEvents() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(eventsByDate));
}

function generateCalendar(year, monthIndex) {
    const grid = document.querySelector(".calendarGrid");
    const startOffset = mondayIndex(new Date(year, monthIndex, 1).getDay());
    const dim = daysInMonth(year, monthIndex);

    grid.innerHTML = "";

    for (let i = 0; i < 42; i++) {
        const dayNumber = i - startOffset + 1;
        const btn = document.createElement("button");

        if (dayNumber <= dim && dayNumber >= 1) {
            btn.classList.add("day");
            btn.textContent = dayNumber;
        } 
        else {
            btn.classList.add("emptyDay")
            btn.textContent = "";
        }

        grid.appendChild(btn);
    }
}  

generateCalendar(year, month);