const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const conditionInput = document.getElementById('conditionInput');
const resultsContainer = document.getElementById('results');

function searchCondition() {
    const input = conditionInput.value.toLowerCase().trim();
    resultsContainer.innerHTML = ''; // Czyszczenie kontenera przed wyszukiwaniem

    if (!input) {
        alert("Please enter a keyword!");
        return;
    }

    // Task 6: Pobieranie danych z pliku JSON
    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log("Data fetched:", data); // Do sprawdzenia w konsoli

            let foundResults = [];

            // Task 7 & 8: Logika dopasowania słów kluczowych
            if (input.includes('beach')) {
                foundResults = data.beaches;
            } else if (input.includes('temple')) {
                foundResults = data.temples;
            } else {
                // Szukanie kraju
                const country = data.countries.find(c => c.name.toLowerCase().includes(input));
                if (country) {
                    foundResults = country.cities;
                }
            }

            // Task 8: Wyświetlanie wyników (obraz + opis + nazwa)
            if (foundResults.length > 0) {
                displayResults(foundResults);
            } else {
                resultsContainer.innerHTML = '<p class="error-msg">No results found. Try "beach", "temple" or a country name.</p>';
            }
        })
        .catch(error => console.error('Error:', error));
}

function displayResults(locations) {
    locations.forEach(place => {
        const card = document.createElement('div');
        card.classList.add('result-card');

        // Tworzenie struktury karty zgodnie ze zrzutem ekranu
        card.innerHTML = `
            <img src="${place.imageUrl}" alt="${place.name}">
            <div class="result-card__content">
                <h3>${place.name}</h3>
                <p>${place.description}</p>
                <button class="btn btn--primary">Visit</button>
            </div>
        `;
        resultsContainer.appendChild(card);
    });
}

// Resetowanie wyszukiwarki
btnClear.addEventListener('click', () => {
    conditionInput.value = '';
    resultsContainer.innerHTML = '';
});

btnSearch.addEventListener('click', searchCondition);