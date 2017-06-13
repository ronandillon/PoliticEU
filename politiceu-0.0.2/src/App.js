import React from 'react';
import ReactDOM from 'react-dom';
import ParliamentSVG from 'parliament-svg';
import toStr from 'virtual-dom-stringify';
import d3 from 'd3';
import $ from 'jquery';
import svg from 'svg';
import './index.css';

class App extends React.Component{
  render() {
    return (
      <div className="App">
        <div className="App-header">
        </div>
        <p className="App-intro">

        </p>
      </div>
    );
  }
}


var w = 800;
var h = 600;

var projection = d3.geo.mercator()
                       .center([ 13, 52 ])
                       .translate([ w/2.3, h/1.6 ])
                       .scale([ w/1.5 ]);//Scale of the map.

//Define path generator
var path = d3.geo.path().projection(projection);

//Create SVG
var svg1 = d3.select("#container").append("svg").attr("width", w).attr("height", h);

//Load in GeoJSON data
d3.json("countries.json", function(json) {
    //Bind data and create one path per GeoJSON feature
    svg1.selectAll("path")
       .data(json.features)
       .enter()
       .append("path")
       .attr("d", path)
       .attr("stroke", "rgba(0,0,0, 0.2)")
       .attr("fill", "rgba(8, 81, 156, 0.6)")
       .attr("onclick", "open_modal(__data__.properties.formal_en)");//formal_en another choice for the name. Longer. More....formal.

});

var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
var open_modal = function(name) {
    $("#m-header").text("Dail Eireann");//Will change depending on country. Tabs need to be added for multiple houses of government
    $("#m-footer").text(name);
    var parties={
    "Fine Gael": {
        "seats": 50,
        "colour": "blue"
    },
    "Independent": {
        "seats": 7,
        "colour": "grey"
    },
    "Fianna Fail": {
        "seats": 44,
        "colour": "#00FF00"
    },
    "Sine Fein": {
        "seats": 23,
        "colour": "#006400"
    },
    "Labour": {
        "seats": 7,
        "colour": "red"
    },
    "AAA-PBP": {
        "seats": 6,
        "colour": "yellow"
    },
    "I4C": {
        "seats": 4,
        "colour": "pink"
    },
    "Green": {
        "seats": 2,
        "colour": "#228B22"
    },
    "Soc Dem": {
        "seats": 2,
        "colour": "purple"
    },
    "Independents": {
        "seats": 12,
        "colour": "grey"
    }
    };
    var seatCount=631;
    const svg = ParliamentSVG(parties, seatCount);
    var svg1 = toStr(svg);
    console.log(svg1);
    $("#m-body").append(svg1);
    //document.getElementById('m-body').append(svg1);
    //$("#m-body").value(svg);
    modal.style.display = "block";
};
open_modal("Ireland");
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}



export default App;
