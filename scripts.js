document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('drawButton');
    const drawnCardLabel = document.getElementById('drawnCardLabel');
    let deck = [];

    const initializeDeck = (titles) => {
        deck = [...titles];
        drawButton.disabled = false;
    };

    const drawCard = () => {
        if (deck.length === 0) {
            fetch('cards.json')
                .then(response => response.json())
                .then(data => {
                    initializeDeck(data);
                })
                .catch(error => {
                    console.error('Error reinitializing card titles:', error);
                    drawnCardLabel.textContent = 'Failed to reinitialize card titles.';
                });
            return;
        }

        const randomIndex = Math.floor(Math.random() * deck.length);
        const drawnCard = deck.splice(randomIndex, 1)[0];
        const [prefix, boldPart] = drawnCard.split(':');
        drawnCardLabel.innerHTML = `<strong style="font-size: 1.5rem;">${prefix}</strong>: <style="font-size: 1.5rem;">${boldPart}`;

        if (deck.length === 0) {
            drawnCardLabel.textContent += " The deck is empty! Reinitializing...";
            fetch('cards.json')
                .then(response => response.json())
                .then(data => {
                    initializeDeck(data);
                })
                .catch(error => {
                    console.error('Error reinitializing card titles:', error);
                    drawnCardLabel.textContent = 'Failed to reinitialize card titles.';
                });
        }
    };

    fetch('cards.json')
        .then(response => response.json())
        .then(data => {
            initializeDeck(data);
        })
        .catch(error => {
            console.error('Error loading card titles:', error);
            drawnCardLabel.textContent = 'Failed to load card titles.';
        });

    drawButton.addEventListener('click', drawCard);
});
