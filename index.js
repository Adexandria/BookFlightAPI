const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");

const app = express();

app.use(json());

//A flight object
const flight = [
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
app.use("/", routes);

// Get all fights
app.get("/api/flights",(req,res)=>{
  res.send(flight);
});

//Get specific flight
app.get("/api/flights/:id",(req,res)=>{
    let id = req.params.id;
    let filtered = flight.filter(item=>item.id==id);
    if(!filtered){
      res.status(404).send("Flight not found");
    }
    res.send(filtered);
});

//Add new flight
app.post("/api/flights",(req,res)=>{
    let newFlight = req.body;
    flight.push(newFlight);
    res.send(flight);
});

//Update existing flight
app.put("/api/flights/:id",(req,res)=>{
  let id = req.params.id;
  let updatedFlight = req.body;
  let currentFlight = flight.find(item=>item.id==id);
  if(!currentFlight){
    res.status(404).send("Flight not found");
  }
  flight[id] = updatedFlight;
  res.send(flight);
});

//Delete existing flight
app.delete("/api/flights/:id",(req,res)=>{
    let id = req.params.id;
    let currentflight = flight.find(item=>item.id==id);
    if(!currentflight){
      res.status(404).send("Flight not found");
    }
    let index = flight.indexOf(currentflight);
    flight.splice(index,1);
    res.send(flight);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
