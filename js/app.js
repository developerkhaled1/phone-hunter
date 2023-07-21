const showButton = document.getElementById('show-all');
showButton.style.display = 'none';
// document.querySelector('found-div').style.display = 'none';

// add event listener on enter button
document.getElementById('search-field').addEventListener("keypress", function (event) {
    if (event.key == 'Enter') {
        document.getElementById('search-btn').click()
    };
});

// show phones on when website loaded
const loadPhones = () => {
    fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
}
loadPhones();

// search phones
const searchPhones = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    if (searchText == '') {
        Swal.fire({
            text: 'Please type a phone name first...',
            icon: 'warning',
        });
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data.slice(0, 20)));
    }
}

// Display phones
const displaySearchResult = phones => {
    // console.log(phones);
    const productContainer = document.getElementById('phones');

    productContainer.textContent = '';
    if (phones.length == 0) {
        Swal.fire({
            text: 'No result found!',
            icon: 'error',
        });
    }
    else if (phones.length >= 20) {
        showButton.style.display = 'block';
        let searchField = document.getElementById('search-field');
        let searchText = searchField.value;
        document.getElementById('show-all').addEventListener('click', function () {
            const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
            fetch(url).then(res => res.json()).then(data => displaySearchResult(data.data))
        });
        // clear input field
        searchField.value = '';
    }
    const showPhones = phones;
    document.getElementById('found-length').innerText = phones.length;


    showPhones?.map(phone => {
        let { slug, image, phone_name, brand } = phone;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card shadow-none">
            <img src="${image}" />
            <p class="text-center mb-1 mt-3">${phone_name}</p>
            <p class="text-center mb-2 mt-1">${brand}</p>
            <button onclick="singleProduct('${slug}')" class="btn btn-dark details-btn" data-bs-toggle="modal" data-bs-target="#single">Details</button>
        </div>`;
        productContainer.appendChild(div);
    });
}

const showAllPhones = () => {

}

// Call API and Display Details
const singleProduct = async (id) => {
    // Show Preloader
    document.querySelector('.loading').style.display = 'flex';
    document.querySelector('.loading').style.opacity = '1';

    // Call API
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.data.others)
    const { name, image, releaseDate, mainFeatures, others } = data.data;

    // Display Details
    document.querySelector('.modal-title').innerText = name;
    document.querySelector('.modal-body img').src = image;
    document.getElementById('release-date').innerText = `${releaseDate ? releaseDate : "Release Date is not found"}`;
    document.getElementById('chipset').innerText = `Chipset: ${mainFeatures.chipSet ? mainFeatures.chipSet : "not available"}`;
    document.getElementById('display-size').innerText = `Display Size: ${mainFeatures.displaySize ? mainFeatures.displaySize : "not available"}`;
    document.getElementById('memory').innerText = `Memory: ${mainFeatures.memory ? mainFeatures.memory : "not available"}`;
    document.getElementById('storage').innerText = `Storage: ${mainFeatures.storage ? mainFeatures.storage : "not available"}`;
    document.getElementById('sensors').innerText = `Sensors: ${mainFeatures.sensors.map((x) => x + " ")}`;
    document.getElementById('bluetooth').innerText = `Bluetooth: ${others?.Bluetooth ? others.Bluetooth : "not available"}`;
    document.getElementById('gps').innerText = `GPS: ${others?.GPS ? others.GPS : "not available"}`;
    document.getElementById('nfc').innerText = `NFC: ${others?.NFC ? others.NFC : "not available"}`;
    document.getElementById('radio').innerText = `Radio: ${others?.Radio ? others.Radio : "not available"}`;
    document.getElementById('usb').innerText = `USB: ${others?.USB ? others.USB : "not available"}`;
    document.getElementById('wlan').innerText = `WLAN: ${others?.WLAN ? others.WLAN : "not available"}`;

    // Hide Preloader
    document.querySelector('.loading').style.opacity = '0';
    setTimeout(function () {
        document.querySelector('.loading').style.display = 'none';
    }, 500);
}

// Phone jodi 20 er besi hoi tahole ekta button show koraben ar oitate addEventlistener dia Click function koren