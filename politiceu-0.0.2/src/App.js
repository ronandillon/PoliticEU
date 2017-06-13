import React from 'react';
import ReactDOM from 'react-dom';
import ParliamentSVG from 'parliament-svg';
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
    console.log(json);
    //Bind data and create one path per GeoJSON feature
    svg1.selectAll("path")
       .data(json.features)
       .enter()
       .append("path")
       .attr("d", path)
       .attr("stroke", "rgba(0,0,0, 0.2)")
       .attr("fill", "rgba(8, 81, 156, 0.6)")
       .attr("onclick", "alert((__data__.properties.sovereignt))");//formal_en another choice for the name. Longer. More....formal.

});

$("path").hover(
    function(event){
        alert();
    },
    function(event){

    }
);


var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
var open_modal = function(name) {
    $("#m-header").text("Dail Eireann");//Will change depending on country. Tabs need to be added for multiple houses of government
    $("#m-footer").text(name);
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



export default App;
