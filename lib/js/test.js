// --- Einstellungen ---
    // Ziel-Datum (YYYY-MM-DD)
    const target = new Date("2026-02-09T12:00:00"); // mittags = kein TZ-Zickzack
    const monthNames = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];

    function getISOWeek(date){
      // ISO week number (KW)
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
      return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }

    function render(){
      const y = target.getFullYear();
      const m = target.getMonth();
      const d = target.getDate();
      const kw = getISOWeek(target);

      // Header Texte
      document.getElementById("dateTitle").textContent =
        String(d).padStart(2,"0") + "." + String(m+1).padStart(2,"0") + "." + y;

      document.getElementById("monthPill").textContent = monthNames[m] + " " + y;
      document.getElementById("metaText").textContent = monthNames[m] + " " + y + " · KW " + kw;

      // Kalender-Grid (Mo..So)
      const daysEl = document.getElementById("days");
      daysEl.innerHTML = "";

      // 1. Tag des Monats (0=So..6=Sa) -> wir brauchen Mo-Start
      const first = new Date(y, m, 1);
      const firstDay = (first.getDay() + 6) % 7; // 0=Mo..6=So

      const daysInMonth = new Date(y, m+1, 0).getDate();

      // Vorlauf: Tage vom Vormonat
      const prevDays = new Date(y, m, 0).getDate();
      for(let i = firstDay - 1; i >= 0; i--){
        const num = prevDays - i;
        daysEl.appendChild(makeDay(num, true, false));
      }

      // Monats-Tage
      for(let day = 1; day <= daysInMonth; day++){
        const isToday = (day === d);
        daysEl.appendChild(makeDay(day, false, isToday));
      }

      // Nachlauf bis volle Wochen (6 Reihen maximal, optisch clean)
      const totalCells = daysEl.children.length;
      const remaining = (7 - (totalCells % 7)) % 7;
      for(let i = 1; i <= remaining; i++){
        daysEl.appendChild(makeDay(i, true, false));
      }

      // Footer (kleine Info)
      const weekday = ["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"][(target.getDay()+6)%7];
      const footer = document.getElementById("footerText");
      footer.innerHTML = `
        <span><b>${weekday}</b>, ${String(d).padStart(2,"0")}.${String(m+1).padStart(2,"0")}.${y}</span>
        <span>•</span>
        <span><b>KW ${kw}</b></span>
      `;
    }

    function makeDay(number, isOut, isToday){
      const el = document.createElement("div");
      el.className = "day" + (isOut ? " is-out" : "") + (isToday ? " is-today" : "");
      el.textContent = number;
      return el;
    }

    render();