
function updateDateTime() {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString();
    document.getElementById('datetime').innerHTML = formattedDateTime;
}

setInterval(updateDateTime, 1000);
updateDateTime();
// time and date

document.addEventListener('DOMContentLoaded', function () {
    const heading = document.getElementById('editableHeading');
    const input = document.getElementById('editableInput');

    heading.addEventListener('click', function () {
        heading.style.display = 'none';
        input.style.display = 'inline-block';
        input.value = heading.textContent.trim();
        input.focus();
    });

    input.addEventListener('blur', function () {
        heading.style.display = 'inline-block';
        input.style.display = 'none';
        heading.textContent = input.value;

    });
});
// user can now edit head title

//to add a new link


function addLink() {
    const linkInput = document.getElementById('link');
    const headingInput = document.getElementById('heading');
    const link = linkInput.value.trim();
    const linkHeading = headingInput.value.trim();
    if (link === '' || linkHeading === '') {
        alert('Fill in both link and heading');
        return;
    }

    // create a new list item
    const listItem = document.createElement('li');
    listItem.className = 'linkItem';

    // create a link  
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.textContent = linkHeading;

    // create a remove link 
    const removeLink = document.createElement('span');
    removeLink.className = 'removeLink';
    removeLink.textContent = 'Remove';
    removeLink.onclick = function () {
        listItem.remove();
        updateLocalStorage();
    };

    // append link and remove link to the list
    listItem.appendChild(linkElement);
    listItem.appendChild(removeLink);

    // append the list to the link item

    document.getElementById('linkList').appendChild(listItem);

    // clear input
    linkInput.value = '';
    headingInput.value = '';

    updateLocalStorage();
}

    // function to update storage with the current list 
    function updateLocalStorage() {
        const linkList = document.getElementById('linkList').innerHTML;
        localStorage.setItem('linkList', linkList);
    }

    // function to load link from storage
    function loadLinkList() {
        const linkList = localStorage.getItem('linkList');
        if (linkList) {
            document.getElementById('linkList').innerHTML = linkList;
        }
    }

    // load link list when its loaded
    window.onload = loadLinkList;

    // Function to get user's location using Geolocation API
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showWeather, showError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    // Function to handle errors in geolocation
    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
    }
// Function to fetch weather data using OpenWeatherMap API
    function showWeather(position) {
        const apiKey = '066f5c16af8664d29d899fe9422bc25d';
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=malm%C3%B6&appid=066f5c16af8664d29d899fe9422bc25d&units=metric";

        // Fetch weather data
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('weather-container').innerHTML = 'Unable to fetch weather data.';
            });
    }

    // Function to display weather data
    function displayWeather(data) {
        const weatherContainer = document.getElementById('weather-container');
        const cityName = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;

        const weatherHTML = `
            <h2>${cityName}</h2>
            <p>${temperature}°C, ${description}</p>
        `;

        weatherContainer.innerHTML = weatherHTML;
    }

    // Call the function to get user's location and display weather
    getLocation();

    // weather API code

    // Replace 'YOUR_API_KEY' with your actual News API key
    const apiKey = '2a3fbd2315e04b749c351287389637e4';
    const apiUrl = 'https://newsapi.org/v2/top-headlines?country=se&apiKey=2a3fbd2315e04b749c351287389637e4';

    async function fetchNews() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            const newsContainer = document.getElementById('news-container');

            if (data.articles) {
                data.articles.forEach(article => {
                    const articleElement = document.createElement('div');
                    articleElement.classList.add('article');

                    articleElement.innerHTML = `
                        <h2>${article.title}</h2>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Read more</a>
                    `;

                    newsContainer.appendChild(articleElement);
                });
            } else {
                newsContainer.innerHTML = '<p>Failed to fetch news. Please try again later.</p>';
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }

    // Fetch news when the page loads
    fetchNews();


    // news API code

    // Function to load saved note from local storage
    function loadNote() {
        const savedNote = localStorage.getItem('quickNote');
        if (savedNote) {
            document.getElementById('noteArea').value = savedNote;
        }
    }

    // Function to save note to local storage
    function saveNote() {
        const noteValue = document.getElementById('noteArea').value;
        localStorage.setItem('quickNote', noteValue);
    }

    // Load saved note when the page loads
    document.addEventListener('DOMContentLoaded', loadNote);

    // Save note on every input change
    document.getElementById('noteArea').addEventListener('input', saveNote);


    // notes code

    function getRandomImage() {
        const accessKey = '1gOhagaR6bF3ep85XDQD_OLUkoE8O97vVpWxlzev1mc';
        const apiUrl = 'https://api.unsplash.com/photos/random?client_id=1gOhagaR6bF3ep85XDQD_OLUkoE8O97vVpWxlzev1mc';
  
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            const imageUrl = data.urls.full;
            document.body.style.backgroundImage = `url(${imageUrl})`;
          })
          .catch(error => console.error('Error fetching image:', error));
      }

    // background button code