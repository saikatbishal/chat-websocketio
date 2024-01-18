# Ecommerce Chat Application (Frontend & Backend)

### Made with ❤️ by Saikat Bishal 
## Technologies used

* Node
* React
* Git
* Express
* Socket.io

  ## How to setup
* install git [here](https://git-scm.com/downloads) if you haven't already
* install node [here](https://nodejs.org/dist/v20.10.0/node-v20.10.0.pkg) if you haven't already
  type `npm -v`, `node -v` and `git -v` in your terminal to check if they were installed correctly.(checks the versions of npm, node and git respectively)
  > I used node version 20.11.0 and npm version 9.6.7
* Fork the repo from [here](https://github.com/saikatbishal/chat-websocketio/)
* go to your command line and type `git clone <your-repo-link.git> `
* once the repo is cloned to your local, go to the **main** branch. `git fetch origin main`, `git checkout main`. 
* **To install the server dependencies** - In the terminal go to the project folder and type `cd server` then `npm install`.</br>
  create a `.env` file and paste the following - ```PORT = 3000``` </br>
  When all the dependencies are installed, type in the terminal - `npm run dev`. this should start running your server in port 3000 `http://localhost:3000`
  
* **To install the client dependencies** - Open another terminal inside the root directory and type `cd client` then `npm install`.</br>
  When all the dependencies are installed, type in the terminal - `npm run dev`. This should start running your UI in port 5173 [http://localhost:5173](http://localhost:5173/)

  ## Features
  1. The user encounters a form, where he has to enter the following details :
      a. Name
      b. Mobile Contact
      c. Items to Order
      d. Expected Delivery Date
  2. The user clicks submit button, he can see the chat window with all the previous user interactions.
  3. All the other users can view the details of the current user along with his order details and his contact details
  
