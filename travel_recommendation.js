const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const conditionInput = document.getElementById('conditionInput');
const resultsContainer = document.getElementById('results');

function searchCondition() {
    const input = conditionInput.value.toLowerCase().trim();
    resultsContainer.innerHTML = ''; // Czyścimy wyniki przed nowym wyszukiwaniem

    if (!input) {
        alert("Wpisz słowo kluczowe!");
        return;
    }

    // Pobieranie danych z pliku JSON (Task 6)
    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log("Pobrane dane:", data); // Logowanie do konsoli (Task 6)

            let foundResults = [];

            // Obsługa słów kluczowych i wariacji (Task 7)
            if (input.includes('beach')) {
                foundResults = data.beaches;
            } else if (input.includes('temple')) {
                foundResults = data.temples;
            } else {
                // Szukanie kraju (Task 8)
                const country = data.countries.find(c => c.name.toLowerCase().includes(input));
                if (country) {
                    foundResults = country.cities;
                }
            }

            // Wyświetlanie wyników (Task 8)
            if (foundResults.length > 0) {
                displayResults(foundResults);
            } else {
                resultsContainer.innerHTML = '<p class="error-msg">Nie znaleziono wyników. Spróbuj "beach", "temple" lub nazwę kraju.</p>';
            }
        })
        .catch(error => console.error('Błąd pobierania danych:', error));
}

function displayResults(locations) {
    locations.forEach(place => {
        const card = document.createElement('div');
        card.classList.add('result-card');

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

// Funkcja Clear - resetuje pole i czyści wyniki
btnClear.addEventListener('click', () => {
    conditionInput.value = '';
    resultsContainer.innerHTML = '';
});

btnSearch.addEventListener('click', searchCondition);