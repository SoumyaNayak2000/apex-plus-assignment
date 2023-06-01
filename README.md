1. Assignment question
  Build an application using React.js.
-> The application should be able to create, display, update, delete Scenario and Vehicle, a
   scenario can have multiple vehicles, and vehicles should be able move when user click a button
   based on the scenario and vehicles parameters.
-> The scenario should have following fields:
    o Scenario id
    o Scenario name
    o Time
-> The Vehicle should have following fields:
    o Vehicle id
    o Vehicle name
    o Initial Position X
    o Initial Position Y
    o Speed
    o Direction (can have only Towards, Backwards, Upwards and Downwards).
-> For storing data use json-server.
-> You have to create sidebar like displayed in the below images.
-> Inside Home page user can be able to select the scenario whichever scenarios he has created
   and start simulation, when user click start simulation vehicles should start moving based on the
   direction and speed, till the scenario time, if the vehicles is going outside the container then
   vehicles should hide.
-> While adding the Vehicle do proper validation like user should not be able to add the positions
   greater than the Home page’s graph container size.
   
   My project deployed on netlify from this github repository.
   https://assignment-apexplus.netlify.app/
   
   
   
4. How to Install and Run the Project
   If we want to start this on our local server then we can start the server by npm start 
   We have to start our db.json on the terminal by command of   npx json-server --watch db.json --port 3001  on the 3001 port
   you can see my project on netlify 
   To build the file we can make the command of npm run build
5. This is a react js project
6. I missed some of features like the adding of the graph i am not able to understand what to do and how to  

## Site link  ->   https://assignment-apexplus.netlify.app/

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
