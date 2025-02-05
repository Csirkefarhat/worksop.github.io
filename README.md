# Event Card Drawing Application

This is a simple web application that allows users to draw event cards from a deck. The application fetches card titles from a JSON file and displays a random card each time the user clicks the "Draw" button. Once the deck is empty, it will automatically reload the deck from the JSON file.

## Features
- **Card Drawing**: The user can click a "Draw" button to randomly draw a card from the deck.
- **Reinitialization**: When the deck is empty, the app automatically reloads the card titles from a JSON file to allow for continuous drawing.
- **User Interface**: A simple interface with the ability to view the drawn card.

## Project Structure
- **index.html**: Contains the main menu with links to the "Card Drawing" page and a "Manual" (yet to be added) link.
- **draw.html**: Contains the event card drawing interface with a button to draw a card and display the card title.
- **style.css**: Styles for the pages, including layout and button appearance.
- **scripts.js**: JavaScript for handling card drawing functionality, including fetching card data from a JSON file and drawing random cards.
- **cards_english.json**: JSON file containing the titles of the event cards in English.
- **cards_spanish.json**: JSON file containing the titles of the event cards in Spanish.
