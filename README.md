# Movingavg
To run the program you need following requisites
python 3.13.2
pip
flask
flask_cors
node.js 22.14.0 
react 
chart.js
react-chartjs-2

 
# if you dont have python or node here are the links
https://nodejs.org/en
https://www.python.org/downloads/

# to install
open cmd and run commands in the backend dir
pip install flask
pip install flask_cors

# frontend
npx create-react-app frontend

- run from frontend folder

npm install chart.js react-chartjs-2

# replays my code with the original code 
replace src folder with my src folder 

# run the program 
# backend
py -path to/program.py

# frontend
cd to frontend folder
npm start


# design considerations.
# overall picture 
from the assignment my assumption is that a prototype should be delivered showing the overall architecture in order to discus the next steps.

for the frontend i have chosen a thin client to be run on user end. So no data upload nor calculations are preformed in the frontend, only presentation of result and user input.

for the backend i have chosen the backend to access data here given as a file but could be data in a database. All calculations are also run from the backend.

# specific choices 
React 
i am not used to work with ui's so i picked the choice suggested in the assignment.
virtual DOM only renders the changed parts of the website.
it is very popular and there for a big community base.

Flask
easy to learn API
quick to setup

Python
the choice of the assignment, i could have used a compiled language instead of a scripting language which would code checks for error in the compile step.

# Next steps / Improvements 
request input
- better input error handling.
- expand to a matrix so multible graphs can be shown in the same chart.

data cleaning
- add a tolerance to remove wrong data 

averaging calculation
- right now 30 days means 30 points should be improved to mean calendar days.
- how to handle missing days for instance weekends, holidays or removed data.
