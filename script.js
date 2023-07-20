const api_key = '9ygtHY1HG3urKuo3cTulvdht38J0CksPNIdS8omh';
// day picker

const day_input = document.getElementById('day');
const month_input = document.getElementById('month');
const year_input = document.getElementById('year');
const show_button = document.getElementById('show-pic');
const picture = document.getElementById('apod');
const loading = document.querySelector('.loading-screen');
const left_arrow = document.getElementById('left-arrow');
const right_arrow = document.getElementById('right-arrow');
const no_image = document.getElementById('no-image-message');
const pic_elements = document.querySelector('.pic-desc');
const today_button = document.getElementById('today-button');

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

function displayPictureElements(title, explanation, url) {
    pic_elements.innerHTML = `<h2>${title}</h2><p>${explanation}</p>`;
    picture.src = url;
}

async function fetchAndSetAPOD() {
    showLoadingAnimation();
    // get the values from the <select> elements
    const date = getDate();
    // contact the NASA API
    is_date_ok = checkDate(date);
    if (is_date_ok) {
        const result = await fetchPicture(date);
        // display the picture, the title and the explanation
        const title = result.title;
        const explanation = result.explanation;
        const url = result.url;
        displayPictureElements(title, explanation, url);
        picture.classList.remove('hidden');
    }
    else {
        // alert('You cannot go to the future!');
        onImageLoadError();
    }
}

function returnToTodayButton() {
    const date = new Date();
    setDate(date);
    fetchAndSetAPOD();
}

function onImageLoaded() {
    hideLoadingAnimation();
    no_image.classList.add('hidden');
}

function onImageLoadError() {
    hideLoadingAnimation();
    pic_elements.innerHTML = '';
    picture.classList.add('hidden');
    no_image.classList.remove('hidden');
}

today_button.addEventListener('click', returnToTodayButton);

picture.addEventListener('load', onImageLoaded);

function showLoadingAnimation() {
    loading.classList.remove('hidden');
    left_arrow.classList.add('hidden');
    right_arrow.classList.add('hidden');
}

function hideLoadingAnimation() {
    loading.classList.add('hidden');
    left_arrow.classList.remove('hidden');
    right_arrow.classList.remove('hidden');
}

show_button.addEventListener('click', fetchAndSetAPOD);

function checkDate(date) {
    const date_obj = new Date(date);
    const today = new Date();
    //if date is in the future or if date is lower than 20-06-1995 (the first picture) return false
    if ((date_obj > today) || (date_obj < new Date('1995-06-19'))) {
        return false;
    }
    return true;
}

function onLeftArrowClicked() {
    const date = getDate();
    const date_obj = new Date(date);
    date_obj.setDate(date_obj.getDate() - 1);
    setDate(date_obj);
    fetchAndSetAPOD();
}

left_arrow.addEventListener('click', onLeftArrowClicked);

function onRightArrowClicked() {
    const date = getDate();
    const date_obj = new Date(date);
    date_obj.setDate(date_obj.getDate() + 1);
    setDate(date_obj);
    fetchAndSetAPOD();
}

right_arrow.addEventListener('click', onRightArrowClicked);


function main() {
    fillDays();
    fillMonths();
    fillYears();

    const date = new Date();
    setDate(date);
    fetchAndSetAPOD();
}

main();