let currentDate = new Date();
let events = [
    {
        name: "First Article Release",
        date: "2024-09-21",
        time: "10:00",
        location: "Remote",
        description: "Article covering the differences in scholarships, grants, and loans. Including a top 10 list for scholarships for undergraduate women in STEM."
    }
];

document.addEventListener('DOMContentLoaded', function() {
    renderCalendar();
    document.getElementById('prev-month').addEventListener('click', prevMonth);
    document.getElementById('next-month').addEventListener('click', nextMonth);
    document.getElementById('add-event-btn').addEventListener('click', showEventForm);
    document.getElementById('event-form').addEventListener('submit', addEvent);
    document.getElementById('cancel-event').addEventListener('click', hideEventForm);
    
    // Check for saved events in local storage
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
        events = JSON.parse(savedEvents);
    }
});

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const monthYearString = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
    document.getElementById('month-year').textContent = monthYearString;

    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';

    // Days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        dayHeader.classList.add('calendar-day-header');
        calendar.appendChild(dayHeader);
    });

    // Calendar days
    for (let i = 0; i < firstDay; i++) {
        calendar.appendChild(createEmptyDay());
    }

    for (let i = 1; i <= lastDate; i++) {
        calendar.appendChild(createDay(i, month, year));
    }
}

function createDay(dayNum, month, year) {
    const dayEl = document.createElement('div');
    dayEl.classList.add('calendar-day');
    dayEl.innerHTML = `<div class="calendar-day-header">${dayNum}</div>`;

    const thisDate = new Date(year, month, dayNum);
    const dateString = thisDate.toISOString().slice(0, 10);
    const dayEvents = events.filter(event => event.date === dateString);

    dayEvents.slice(0, 3).forEach(event => {
        const eventEl = document.createElement('div');
        eventEl.classList.add('calendar-event');
        eventEl.textContent = event.name;
        eventEl.addEventListener('click', (e) => {
            e.stopPropagation();
            showEventDetails(event, e);
        });
        dayEl.appendChild(eventEl);
    });

    if (dayEvents.length > 3) {
        const moreEventsEl = document.createElement('div');
        moreEventsEl.classList.add('calendar-event');
        moreEventsEl.textContent = `+${dayEvents.length - 3} more`;
        dayEl.appendChild(moreEventsEl);
    }

    return dayEl;
}

function createEmptyDay() {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('calendar-day', 'empty');
    return emptyDay;
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

function showEventForm() {
    document.getElementById('event-form-container').classList.remove('hidden');
}

function hideEventForm() {
    document.getElementById('event-form-container').classList.add('hidden');
    document.getElementById('event-form').reset();
}


function showEventDetails(event, mouseEvent) {
    const popup = document.getElementById('event-details-popup');
    popup.innerHTML = `
        <h4>${event.name}</h4>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Description:</strong> ${event.description || 'No description'}</p>
    `;

    popup.style.left = mouseEvent.pageX + 'px';
    popup.style.top = mouseEvent.pageY + 'px';
    popup.classList.remove('hidden');

    document.addEventListener('click', hideEventDetails);
}

function hideEventDetails() {
    document.getElementById('event-details-popup').classList.add('hidden');
    document.removeEventListener('click', hideEventDetails);
}