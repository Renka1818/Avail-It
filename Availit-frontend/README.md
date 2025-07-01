# AvailIt Frontend

React app for searching and managing hospital bed and oxygen availability.

## Live Demo
[https://avail-it.vercel.app/](https://avail-it.vercel.app/)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Advanced Configuration

Check here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

Check  here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

Check  here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## API Documentation (OpenAPI)

A comprehensive OpenAPI YAML file (`AvailIt-openapi.yaml`) is available in the project root. This file documents all backend endpoints and the subset of endpoints used by the frontend (including the live city scrapper).

### How to Use

- **Swagger Editor:**
  1. Go to [Swagger Editor](https://editor.swagger.io/)
  2. Click 'File' > 'Import File' and select `AvailIt-openapi.yaml` from the project root.
  3. View, edit, and validate the API documentation interactively.
- **Other Tools:**
  - You can also import this YAML file into Postman, Insomnia, or any OpenAPI-compatible tool for testing and documentation.

### File Structure
- The YAML file is split into two main tags:
  - `Backend`: All backend endpoints
  - `Frontend`: Endpoints actually used by the frontend (including scrapper)
