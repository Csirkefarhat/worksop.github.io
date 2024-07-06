// document.addEventListener('DOMContentLoaded', () => {
//     const drawButton = document.getElementById('drawButton');
//     const drawnCardLabel = document.getElementById('drawnCardLabel');
//     let deck = [];

//     // Function to draw a card
//     const drawCard = () => {
//         if (deck.length === 0) {
//             drawnCardLabel.textContent = "The deck is empty!";
//             drawButton.disabled = true;
//             return;
//         }

//         const randomIndex = Math.floor(Math.random() * deck.length);
//         const drawnCard = deck.splice(randomIndex, 1)[0];
//         drawnCardLabel.textContent = `${drawnCard} has been drawn from the deck.`;
//     };

//     // Fetch the card titles from the JSON file
//     fetch('cards.json')
//         .then(response => response.json())
//         .then(data => {
//             deck = [...data];
//             drawButton.disabled = false;  // Enable the button once cards are loaded
//         })
//         .catch(error => {
//             console.error('Error loading card titles:', error);
//             drawnCardLabel.textContent = 'Failed to load card titles.';
//         });

//     drawButton.addEventListener('click', drawCard);
// });

document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('drawButton');
    const drawnCardLabel = document.getElementById('drawnCardLabel');
    let deck = [];

    // Function to initialize the deck
    const initializeDeck = (titles) => {
        deck = [...titles];
        drawButton.disabled = false;
    };

    // Function to draw a card
    const drawCard = () => {
        if (deck.length === 0) {
            // Fetch the card titles from the JSON file again to reinitialize the deck
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
            // Reinitialize the deck immediately
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

    // Initial fetch of card titles
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