# z-prefix-project

------Getting Started with Docker Compose---------
- Clone the Repository to your local machine.
- Navigate to the folder with the docker-compose file
- run docker-compose up

------Getting Started without Docker Compose----------
- Clone the Repository to your local machine.
- create a new docker container
  - run docker pull postgres
  - mkdir -p $HOME/docker/volumes/postgres
   - docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
- run docker ps -a   to get the container id
- run docker exec -it {container} bash
- run psql -U postgres
- create database inventory_database

- Navigate to the z-prefix-project folder
- Navigate to the Database folder
- modifiy the knexfile.js to have a host of 127.0.0.1
- run npm install, npx knex migrate:latest, and npx seed:run
- Navigate to the Server folder
- modify the knexfile.js to have a host of 127.0.0.1
- run npm install then npm run
- Navigate to the Frontend folder then the project-app folder run - npm install and npm run


-----Using the App------
- Once on localhost:3000 you will see the full inventory from all inventory managers
You will be able to select the item of your choice to view the full details
If you wish to create an account select teh Create Account in the top right corner
  - Enter first name, last name, username, and password then select submit
- If you wish to sign-in after your account is created or if you already have an account created then select the sign-in button
  - Enter your username and password
  - You will be navigated to your full inventory upon signing-in if you have no added items you will be informed there are no items
  - If you wish you can select Full inventory to view the inventory of all the inventory managers
  - select the + to add a new item
    - enter the items name, description, and quantity then click add
    - once the item is added you will be navigated to your inventory where you will see the added item
  - If you are signed in you can select an item to view its full information and in the right corner see an edit and delete icon
  - selecting the edit icon will unlock the fields for editing
    - make any necessary edits then hit submit
    - the changes will reflect on the page and if you navigate back to the inventory screen you will see the changes
  - selecting the delete icon will delete the item and navigate you back to your inventory

