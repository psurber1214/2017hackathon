# Patrick Surber and JB Burgdorff's entry for the 2017 TruMedia MLB Hackathon
TruMedia Networks sponsored a Hackathon in February 2017. We entered as engineers, attempting to create a simple interface for users to explore the data and perform multi-dimensional queries.

We wrote a very simple Node server which simply grabs information from a Mongo Database and passes the resulting JSON to our front end where we used D3.js, Crossfilter, and DCjs to display interactive charts and visualizations.

#Hosting
As of February 2017, the project is currently hosted at http://athwp.tamu.edu:8080 (which displays Jake Arieta's Dashboard by default, where the users can search for and view other hitters and pitchers)


#Database/Back End
The database is a MongoDB hosting all of the information given to us from the 2016 season, minus a few unnecessary columns. We chose Mongo and Node because they are very lightweight and fast, a necessity for such a large dataset.

#Features/Explanation
The app is split up into 2 different Dashboards- one for pitchers and batters. Both give a searchable list of hitters/pitchers in the top area where the user can browse to different pitchers and hitters dashboards. Most charts are pretty self explanatory. For the Deceptiveness Chart (Pitchers) and Eye/Patience Chart (Batters) we look at pitches in an out of the strike zone that were watched or swung on. To calculate movement, we used equations given by The Physics of Baseball (http://baseball.physics.illinois.edu/)

All charts are interactive and "selectable" minus the Pitching Charts for Velocity and Movement over time. This allows the user to perform multi-dimensional queries on the data. For example, the user can select specific counts and see what pitches a pitcher threw to right handers as well as the results. Or the user can select specific innings and see how the pitcher's location changed over time. 
