const api_key = '9ygtHY1HG3urKuo3cTulvdht38J0CksPNIdS8omh';
// day picker

const day_input = document.getElementById('day');
const month_input = document.getElementById('month');
const year_input = document.getElementById('year');
const show_button = document.getElementById('show-pic');
const picture = document.getElementById('apod');
const loading = document.querySelector('.loading-screen');

// fill the day <select> with all the days

function fillDays() {

    for (let i = 1; i <= 31; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.text = i;
        day_input.appendChild(option);
    }
}

// fill the month <select> with all the months

function fillMonths() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octomber', 'November', 'December'];
    for (let i = 0; i < months.length; i++) {
        let option = document.createElement('option');
        option.value = i + 1;
        option.text = months[i];
        month_input.appendChild(option);
    }
}

// fill the year <select> with all the years

function fillYears() {
    const min_year = 1995;
    const max_year = new Date().getFullYear();

    for (let i = max_year; i >= min_year; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.text = i;
        year_input.appendChild(option);
    }
}

function getDate() {
    const day = day_input.value;
    const month = month_input.value;
    const year = year_input.value;

    return `${year}-${month}-${day}`;
}

function setDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    day_input.value = day;
    month_input.value = month;
    year_input.value = year;
}

async function fetchPicture(date) {
    const url = 'https://api.nasa.gov/planetary/apod?' + new URLSearchParams({
        date: date,
        api_key: api_key
    });
    console.log(url);
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
}

function displayPicture(url) {
    picture.src = url;
}

async function fetchAndSetAPOD() {
    showLoadingAnimation();
    // get the values from the <select> elements
    const date = getDate();
    // contact the NASA API
    const result = await fetchPicture(date);
    // display the picture
    const url = result.url;
    displayPicture(url);
    picture.classList.remove('hidden');

}

function onImageLoaded() {
    hideLoadingAnimation();
}

picture.addEventListener('load', onImageLoaded);

function showLoadingAnimation() {
    loading.classList.remove('hidden');
}

function hideLoadingAnimation() {
    loading.classList.add('hidden');
}

show_button.addEventListener('click', fetchAndSetAPOD);

function main() {
    fillDays();
    fillMonths();
    fillYears();

    const date = new Date();
    setDate(date);
    fetchAndSetAPOD();
}

main();