# react-users-table
## Searchable React Configurable Table

Simple table using JsonPlaceholder Rest API
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



Searchable React Table with detail page (lists user's posts).

This amazing react table:
      <ul>
        <li>Features a single presentational component to display variable json data</li>
        <li><b>*Fully*</b> configurable with an external json file to define json fields displayed, display names for fields, column widths, text alignment, title definition</li>
        <li>Uses <b>redux and thunk</b> to facilitate asynchronous data fetching from configurable api endpoints</li>
        <li>Uses <b>Bootstrap 4</b> and most modules are implemented with typescript</li>
        <li>Responsive tables are implemented by entering a "-1" value in the col specification in the config file. This allows a narrow browser to wrap the table and provide horizontal scrolling if necessary.
        <li>Based from the create-react-app with typescript</li>
        <li>Features a <b>case-sensitivity mode checkbox</b> to enable/disable case sensitive searches using  lodash for speed and efficiency</li>

## Configuration Options
The main functional component in this small application is a react table that can be configured by an external .json file. The Users.json file is shown below.

<pre>{
  "apiUrl": "https://jsonplaceholder.typicode.com/users",
  "headers": [ 
    { "field": "name", "display": "Name" }, 
    { "field": "email", "display": "Email" }, 
    { "field": "address.city", "display": "City" }, 
    { "field": "company.name", "display": "Company"}
  ],
  "alignments": [ "left", "center", "right", "right" ],
  "cols": [ 3, 3, 2, 4 ],
  "title": "Users",
  "searchCaseSensitive": false
}</pre>

<caption>src/config/userConfig file</caption>

There are two table wrapper presentational components in src/screen: UsersTableWrapper and PostsTableWrapper that pass the interaction callbacks (filtering and url redirection), configuration and data to the GeneralTable stateless component (dependency injection - easy testing for the General Table component which just handles the data view and invokes the callbacks on user clicks to the parent). They provide the api load requests and response handling via the actions/reducers from  redux and thunk for the async functionality.

The search bar provides a very rudimentary data filter function on all the cell data as the filter's text input is updated. There is a checkbox that will enable case sensitive searches (the default is case-insensitive).

Each User table row is clickable and will create another Post Table which will display the user's posts. There is a home button that will reload the main User page. The post url, /posts/:userID will also display the posts for the specified user if the Id exists. It will no include the user's name in the header information (this is passed as location state via a history.push on the User page).

Testing is done with Jest and the testing-library. There are a couple of smoke tests using enzyme. The tests are not currently complete - they are in progress though!


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
