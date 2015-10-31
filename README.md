# Faster than Light Analytics

This application should visualize data from the FasterThanLight project in order to get a better overview over the incoming sensor values.

OSX run this project

Install Node.js.
Start RabbitMQ.
Clone this repo
Enter the repo root folder
Install node packages with npm install
Install Bower Packages with bower install


## Draw a Racetrack

It is possible to draw a Racetrack with it. Just send the necessary data over the WebsocketConnection:

    {
        "eventMessageType": "trackInfo",
        "genericMessage": {
            "trackId": 55,
            "sections": [
                {
                    "id": 76,
                    "angle": 45,
                    "radius": 30,
                    "length": 50.00
                }, 
                {
                    "id": 77,
                    "angle": 0,
                    "radius": 0,
                    "length": 100.00,
                    "speedLimit": 200
                    
                }
                
            ]
        
        }
    }
    
Use Ids on every section in order to be able to identify it later.
    
### Learn and Update    
    
After the car drove and learned something, sections can be updated:

    {
        "eventMessageType": "trackInfoUpdate",
        "genericMessage": {
            "trackId": 55,
            "sections": [
                {
                    "id": 76,
                    "length": 55.00,
                    "speedLimit": 100
                }
               
            ]
        
        }
    }
    
Use the ids to identify section which should be updated.
