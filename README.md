# Currency Converter

A responsive currency converter application that uses real-time exchange rates and adapts to all viewports. The client is built with React, TypeScript, and Styled Components, while the server is built with Node.js and Express.

## Getting started

To run the project locally, run the following commands :

`npm install`

`npm run install-all`

`npm run start`

Open [http://localhost:3000](http://localhost:3000) in your browser and start using the app.

## APIs Used

This project utilizes two APIs:

API 1: Fetches a list of all available currencies.
API 2: Converts between currencies.

## Known Limitations

Since the application uses two different APIs for different functionalities, there could be cases where:

Some currencies displayed in the list may not be available for conversion.
This limitation arises due to possible discrepancies between the currencies supported by the two APIs. Future enhancements may involve aligning both APIs or switching to a single comprehensive API.
