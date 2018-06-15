
import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
const API_KEY = "574aab125b11b9f6b100412e1b56d1b3";

class App extends React.Component{
    constructor(){
      super();
      this.state = {
        columns: [
          { name: 'temperature', title: 'Temperature' },
          { name: 'city', title: 'City' },
          { name: 'country', title: 'Country' },
          { name: 'humidity', title: 'Humidity' },
          { name: 'description', title: 'Description' }
        ],
        rows: [{

        }
        ],
        defaultHiddenColumnNames: ['description'],
      }
    }
    getWeather = async (e) => {

     e.preventDefault();

     const city = e.target.elements.city.value;
     const country = e.target.elements.country.value;
     const zipcode = e.target.elements.zipcode.value;

     if(city && country && zipcode){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country},${zipcode}&appid=${API_KEY}&units=metric`);

      const data = await api_call.json();  
      const dataArr = [];

      if(data.cod !== 404){
        dataArr.push({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""
        });
        
        this.setState({
          rows: dataArr,   
          error:null
        });
      }
     }
     else {
      this.setState({
        error: "Please enter the values."
      });
    }
    }

    render(){
      return(
        <div>
            <Titles/>
            <Form getWeather={this.getWeather}/>
            <Weather
              columns = {this.state.columns}
              row = {this.state.rows}
              error= {this.state.error}
              defaultHiddenColumnNames={this.state.defaultHiddenColumnNames}
            />
        </div>
      );
  }
};

export default App;