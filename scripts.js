document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('drawButton');
    const drawnCardLabelEnglish = document.getElementById('drawnCardLabelEnglish');
    const drawnCardLabelSpanish = document.getElementById('drawnCardLabelSpanish');
    let deckEnglish = [];
    let deckSpanish = [];

    const initializeDecks = (dataEnglish, dataSpanish) => {
        deckEnglish = [...dataEnglish];
        deckSpanish = [...dataSpanish];
        drawButton.disabled = false;
    };

    const drawCard = () => {

        if (deckEnglish.length === 0) {
            fetchCardData();
            return;
        }

        const randomIndex = Math.floor(Math.random() * deckEnglish.length);
        const drawnCard = deckEnglish.splice(randomIndex, 1)[0];
        const drawnCardEsp = deckSpanish.splice(randomIndex, 1)[0];
        const [prefix, boldPart] = drawnCard.split(':');
        const [prefixesp, boldPartesp] = drawnCardEsp.split(':');

        drawnCardLabelEnglish.innerHTML = `<strong>${prefix}</strong>: ${boldPart}`;
        drawnCardLabelSpanish.innerHTML = `<strong>${prefixesp}</strong>: ${boldPartesp}`; // Function to translate to Spanish
    };

    const fetchCardData = () => {
        fetch('cards_english.json')
            .then(response => response.json())
            .then(dataEnglish => {
                return fetch('cards_spanish.json')
                    .then(response => response.json())
                    .then(dataSpanish => {
                        initializeDecks(dataEnglish, dataSpanish);
                    });
            })
            .catch(error => {
                console.error('Error fetching card titles:', error);
                drawnCardLabelEnglish.innerHTML = 'Failed to load English card titles.';
                drawnCardLabelSpanish.innerHTML = 'Failed to load Spanish card titles.';
            });
    };

    fetchCardData();

    drawButton.addEventListener('click', drawCard);
});
