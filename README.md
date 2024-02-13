# # [planty](https://planty-i6y0.onrender.com/posts?page=1)
planty is a dynamic web page where you can find flora around you 
## ⚒ Configuration and Setup
In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the client on one terminal and the server on the other terminal)

In the first terminal
- cd client and create a .env file in the root of your client directory.
- Supply the following credentials

```
REACT_APP_GOOGLE_AUTH0  = ""
```

To obtain your Google ClientID for authentication, follow these steps:

1. Navigate to the [credential Page](https://console.cloud.google.com/apis/credentials). If you're new, [create a new project first](https://console.cloud.google.com/projectcreate).

2. Click on "Create credentials" and choose "OAuth client ID".

3. Select the Web application type.

4. Provide a name for your OAuth client and click "Create".

5. Ensure you specify your domain and redirect URL for Google to recognize the origin domain where it will display the consent screen. During development, this will typically be http://localhost:3000 and http://localhost:3000/login.

6. Copy the Client ID and assign it to the variable REACT_APP_GOOGLE_CLIENT_ID in your .env file.

```
$ cd clients
$ npm install (to install client-side dependencies)
$ npm start (to start the client)
```
In the second terminal
- cd server and create a .env file in the root of your server directory.
- Supply the following credentials

```
PORT = 5000
CoNNECTION_URL  =
JWT_EXPIRE =
JWT_SECRET_KEY =
```


```
$ cd server
$ npm install (to install server-side dependencies)
$ npm start (to start the server)
```
(If running "npm i" fails, after deleting the package.json file, you can use "npm init" to initialize a new npm project and then manually install all dependencies.)
