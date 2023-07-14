// day picker

const day_input = document.getElementById('day');
const month_input = document.getElementById('month');
const year_input = document.getElementById('year');

// fill the day <select> with all the days

function fill_days() {

    for (let i = 1; i <= 31; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.text = i;
        day_input.appendChild(option);
    }
}

// fill the month <select> with all the months

function fill_months() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octomber', 'November', 'December'];
    for (let i = 0; i < months.length; i++) {
        let option = document.createElement('option');
        option.value = i + 1;
        option.text = months[i];
        month_input.appendChild(option);
    }
}

// fill the year <select> with all the years

function fill_years() {
    const min_year = 1995;
    const max_year = new Date().getFullYear();

    for (let i = max_year; i >= min_year; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.text = i;
        year_input.appendChild(option);
    }
}

function setDay(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    day_input.value = day;
    month_input.value = month;
    year_input.value = year;
}

function main() {
    fill_days();
    fill_months();
    fill_years();

    const date = new Date();
    setDay(date);
}

main();