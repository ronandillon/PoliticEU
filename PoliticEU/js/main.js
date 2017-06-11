//Width and height
			var w = 800;
			var h = 600;

			//Define map projection


			var projection = d3.geo.mercator()
								   .center([ 13, 52 ])
								   .translate([ w/2.3, h/1.6 ])
								   .scale([ w/1.5 ]);//Scale of the map.

			//Define path generator
			var path = d3.geo.path().projection(projection);


			//Create SVG
			var svg = d3.select("#container")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			//Load in GeoJSON data
			d3.json("countries.json", function(json) {
                console.log(path);

			    //Bind data and create one path per GeoJSON feature
				svg.selectAll("path")
				   .data(json.features)
				   .enter()
				   .append("path")
				   .attr("d", path)
				   .attr("stroke", "rgba(0,0,0, 0.2)")
				   .attr("fill", "rgba(8, 81, 156, 0.6)")
                   .attr("onclick", "console.log(__data__.properties.sovereignt)");//formal_en another choice for the name. Longer. More....formal.

			});
