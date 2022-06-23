const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");

const app = express();

app.use(json());
app.use("/", routes);
//A flight object
models.flight = [
{
  id: 1,
  title: "flight to canada",
  time: "1pm",
  price: 26000,
  date: "26-06-2022"
},
{
  id: 2,
  title: "flight to United Kingdom",
  time: "3pm",
  price: 2600,
  date: "29-06-2022"
}
]

//controller to get the flight model
flights.get =(req,res)=>{
  res.send(models.flight);
}

//controller to get the flight by Id
flights.getById =(req,res)=>{
  let id = req.params.id;
  let filtered = models.flight.filter(item=>item.id==id);
  if(!filtered){
    res.status(404).send("Flight not found");
  }
  res.send(filtered);
}

//controller to add new flight object
flights.addFlight =(req,res)=>{
  let newFlight = req.body;
  models.flight.push(newFlight);
    res.send(models.flight);
}

//controller to update flight
flights.updateFlight =(req,res)=>{
  let id = req.params.id;
  let updatedFlight = req.body;
  let currentFlight = models.flight.find(item=>item.id==id);
  if(!currentFlight){
    res.status(404).send("Flight not found");
  }
  models.flight[id-1] = updatedFlight;
  res.send(models.flight);
}

//controller to delete existing flight
flights.deleteFlight = (req,res) =>{
  let id = req.params.id;
  let currentflight = models.flight.find(item=>item.id==id);
  if(!currentflight){
    res.status(404).send("Flight not found");
  }
  let index = models.flight.indexOf(currentflight);
  models.flight.splice(index,1);
  res.send(models.flight);
}

// route to get all fights
routes.get("/api/flights",flights.get);

//route to get specific flight
routes.get("/api/flights/:id",flights.getById);

//route to add new flight
routes.post("/api/flights",flights.addFlight);

//route to update existing flight
routes.put("/api/flights/:id",flights.updateFlight);

//route to delete existing flight
routes.delete("/api/flights/:id",flights.deleteFlight);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
