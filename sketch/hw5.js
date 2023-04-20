const map = d3
  .select("#choropleth")
  .append("svg")
  .attr("width", 800)
  .attr("height", 500);

var usmap = map.append("g");
var projection = d3.geoAlbersUsa().translate([400, 250]);

var path = d3.geoPath().projection(projection);

const color = d3
  .scaleQuantile()
  .domain([0, 1000000])
  .range([
    "#fff5f0",
    "#fee0d3",
    "#fdc3ac",
    "#fca082",
    "#fb7c5c",
    "#f5553d",
    "#e23028",
    "#c2181c",
    "#9b0d14",
    "#67000d",
  ]);
var legend = d3
  .select("body")
  .append("svg")
  .attr("class", "legend")
  .attr("width", 200)
  .attr("height", 100)
  .selectAll("g")
  .data([0, ...color.quantiles()])
  .enter()
  .append("g")
  .attr("transform", function (d, i) {
    return "translate(" + i * 20 + ", 0)";
  });
d3.selectAll("text").style("fill", "black");

legend.append("rect").attr("width", 18).attr("height", 18).style("fill", color);

legend
  .append("rect")
  .attr("id", "white")
  .attr("width", 18)
  .attr("height", 18)
  .attr("transform", "translate(-20,0)")
  .style("fill", "white");

legend
  .append("text")
  .data(color.quantiles())
  .attr("x", 10)
  .attr("y", 30)
  .attr("dx", "0.15em")
  .attr("font-size", "0.5em")
  .text(function (text) {
    return text / 1000 + "k";
  });

var barGraph = d3
  .select("#barGraph")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

d3.csv(
  "https://raw.githubusercontent.com/fuyuGT/CS7450-data/main/covid_states_data.csv"
).then(function (data) {
  d3.json("us-states.json").then(function (json) {
    //d3.selectAll("text").style("fill", "black");
    console.log(data);
    console.log(json);
    var byDate = d3.group(data, (d) => d.date);
    console.log(byDate);
    var dates = [...byDate.keys()].reverse();
    var byIndexMap = new Map();
    for (const [index, element] of dates.entries()) {
      byIndexMap.set(element, index);
    }
    /****************************************************************/
    var slider = d3
      .sliderHorizontal()
      .value(225)
      .width(300)
      .min(0)
      .max(dates.length - 1)
      .on("onchange", (val) => {
        // console.log(dates.length);
        // console.log(Math.floor(val));
        // console.log(dates[Math.floor(val)]);
        d3.selectAll(".map-path").remove();
        d3.selectAll(".myRect").remove();
        d3.selectAll(".graph-axis").remove();

        var select_date = dates[Math.floor(val)];
        document.getElementById("date-picker").value = select_date;
        var select_data = byDate.get(select_date);
        //console.log(byDate1);

        var valueArray = [];
        var max = 0;

        for (var i = 0; i < select_data.length; i++) {
          // Grab State Name
          var dataState = select_data[i].state;

          // Grab data value
          var dataValue = select_data[i].positive;
          if (+dataValue > max) max = +dataValue;
          valueArray.push(+dataValue);

          // Find the corresponding state inside the GeoJSON
          for (var j = 0; j < json.features.length; j++) {
            var jsonState = json.features[j].properties.abbrev;

            if (dataState === jsonState) {
              // Copy the data value into the JSON
              json.features[j].properties.positive = dataValue;

              // Stop looking through the JSON
              break;
            }
          }
          for (var k = 0; k < json.features.length; k++) {
            if (!json.features[k].properties.positive) {
              json.features[k].properties.positive = 0;
            }
          }
        }

        usmap
          .selectAll("path")
          .data(json.features)
          .enter()
          .append("path")
          .attr("class", "map-path")
          .attr("d", path)
          .style("stroke", "#fff")
          .style("stroke-width", "1")
          .style("fill", function (d) {
            // Get data value
            var temp = +d.properties.positive;
            return color(temp);
          })
          .on("mouseover", function (event, datum) {
            var [x, y] = d3.pointer(event, usmap);
            mapTooltip.style("opacity", 1);
            mapTooltip.text(
              `${datum.properties.name} Positive Cases: ${datum.properties.positive}`
            );
          })

          // fade out tooltip on mouse out
          .on("mouseout", function (d) {
            mapTooltip.style("opacity", 0);
          });

        select_data.sort(function (a, b) {
          return +b.positive - +a.positive;
        });
        var barX = d3.scaleLinear().domain([0, max]).range([0, 500]);

        let barGroup = barGraph
          .append("g")
          .attr("transform", "translate(" + 30 + "," + 0 + ")");
        barGroup
          .append("g")
          .attr("class", "graph-axis")
          .attr("transform", "translate(0," + 500 + ")")
          .call(d3.axisBottom(barX))
          .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

        var barY = d3
          .scaleBand()
          .range([0, 500])
          .domain(
            select_data.map(function (d) {
              return d.state;
            })
          )
          .padding(0.1);
        barGroup
          .append("g")
          .attr("class", "graph-axis")
          .call(d3.axisLeft(barY));
        barGroup
          .selectAll(".myRect")
          .data(select_data)
          .enter()
          .append("rect")
          .attr("class", "myRect")
          .attr("x", barX(0))
          .attr("y", function (d) {
            return barY(d.state);
          })
          .attr("width", function (d) {
            return barX(d.positive);
          })
          .attr("height", barY.bandwidth())
          .style("fill", function (d) {
            // Get data value
            var temp = +d.positive;
            return color(temp);
          });
      });
    /****************************************************************/
    d3.select("#slider")
      .append("svg")
      .attr("width", 400)
      .attr("height", 100)
      .append("g")
      .attr("transform", "translate(30,30)")
      .call(slider);

    var data1 = byDate.get("2020-08-24");
    console.log(data1);

    var valueArray = [];
    var max = 0;

    for (var i = 0; i < data1.length; i++) {
      // Grab State Name
      var dataState = data1[i].state;

      // Grab data value
      var dataValue = data1[i].positive;
      if (+dataValue > max) max = +dataValue;
      valueArray.push(+dataValue);

      // Find the corresponding state inside the GeoJSON
      for (var j = 0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.abbrev;

        if (dataState === jsonState) {
          // Copy the data value into the JSON
          json.features[j].properties.positive = dataValue;

          // Stop looking through the JSON
          break;
        }
      }
      for (var k = 0; k < json.features.length; k++) {
        if (!json.features[k].properties.positive) {
          json.features[k].properties.positive = 0;
        }
      }
    }

    let mapTooltip = usmap
      .append("text")
      .attr("class", "map-tooltip")
      .attr("x", 400)
      .attr("y", 20)
      .style("font-size", 16)
      .style("fill", "black")
      .style("text-anchor", "middle")
      .style("opacity", 0);
    d3.select(".map-tooltip").raise();

    usmap
      .selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("class", "map-path")
      .attr("d", path)
      .style("stroke", "#fff")
      .style("stroke-width", "1")
      .style("fill", function (d) {
        // Get data value
        var temp = +d.properties.positive;
        return color(temp);
      })
      .on("mouseover", function (event, datum) {
        var [x, y] = d3.pointer(event, usmap);
        mapTooltip.style("opacity", 1);
        mapTooltip.text(
          `${datum.properties.name} Positive Cases: ${datum.properties.positive}`
        );
      })

      // fade out tooltip on mouse out
      .on("mouseout", function (d) {
        mapTooltip.style("opacity", 0);
      });

    data1.sort(function (a, b) {
      return +b.positive - +a.positive;
    });

    var barX = d3.scaleLinear().domain([0, max]).range([0, 500]);

    let barGroup = barGraph
      .append("g")
      .attr("transform", "translate(" + 30 + "," + 0 + ")");
    barGroup
      .append("g")
      .attr("class", "graph-axis")
      .attr("transform", "translate(0," + 500 + ")")
      .call(d3.axisBottom(barX))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    var barY = d3
      .scaleBand()
      .range([0, 500])
      .domain(
        data1.map(function (d) {
          return d.state;
        })
      )
      .padding(0.1);
    barGroup.append("g").attr("class", "graph-axis").call(d3.axisLeft(barY));

    barGroup
      .selectAll(".myRect")
      .data(data1)
      .enter()
      .append("rect")
      .attr("class", "myRect")
      .attr("x", barX(0))
      .attr("y", function (d) {
        return barY(d.state);
      })
      .attr("width", function (d) {
        return barX(+d.positive);
      })
      .attr("height", barY.bandwidth())
      .style("fill", function (d) {
        // Get data value
        var temp = +d.positive;
        return color(temp);
      });
    barGroup
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", 550)
      .attr("y", 520)
      .text("Cases");

    /****************************************************************/
    d3.select("#date-picker").on("change", function () {
      d3.selectAll(".map-path").remove();
      d3.selectAll(".myRect").remove();
      d3.selectAll(".graph-axis").remove();
      var date = document.getElementById("date-picker").value;
      slider.value(byIndexMap.get(date));
      var data1 = byDate.get(date);
      var valueArray = [];
      var max = 0;

      for (var i = 0; i < data1.length; i++) {
        // Grab State Name
        var dataState = data1[i].state;

        // Grab data value
        var dataValue = data1[i].positive;
        if (+dataValue > max) max = +dataValue;
        valueArray.push(+dataValue);

        // Find the corresponding state inside the GeoJSON
        for (var j = 0; j < json.features.length; j++) {
          var jsonState = json.features[j].properties.abbrev;

          if (dataState === jsonState) {
            // Copy the data value into the JSON
            json.features[j].properties.positive = dataValue;

            // Stop looking through the JSON
            break;
          }
        }
        for (var k = 0; k < json.features.length; k++) {
          if (!json.features[k].properties.positive) {
            json.features[k].properties.positive = 0;
          }
        }
      }

      usmap
        .selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", "map-path")
        .attr("d", path)
        .style("stroke", "#fff")
        .style("stroke-width", "1")
        .style("fill", function (d) {
          // Get data value
          var temp = +d.properties.positive;
          return color(temp);
        })
        .on("mouseover", function (event, datum) {
          var [x, y] = d3.pointer(event, usmap);
          mapTooltip.style("opacity", 1);
          mapTooltip.text(
            `${datum.properties.name} Positive Cases: ${datum.properties.positive}`
          );
        })

        // fade out tooltip on mouse out
        .on("mouseout", function (d) {
          mapTooltip.style("opacity", 0);
        });

      data1.sort(function (a, b) {
        return +b.positive - +a.positive;
      });

      var barX = d3.scaleLinear().domain([0, max]).range([0, 500]);

      let barGroup = barGraph
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 0 + ")");
      barGroup
        .append("g")
        .attr("class", "graph-axis")
        .attr("transform", "translate(0," + 500 + ")")
        .call(d3.axisBottom(barX))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      var barY = d3
        .scaleBand()
        .range([0, 500])
        .domain(
          data1.map(function (d) {
            return d.state;
          })
        )
        .padding(0.1);
      barGroup.append("g").attr("class", "graph-axis").call(d3.axisLeft(barY));

      barGroup
        .selectAll(".myRect")
        .data(data1)
        .enter()
        .append("rect")
        .attr("class", "myRect")
        .attr("x", barX(0))
        .attr("y", function (d) {
          return barY(d.state);
        })
        .attr("width", function (d) {
          return barX(+d.positive);
        })
        .attr("height", barY.bandwidth())
        .style("fill", function (d) {
          // Get data value
          var temp = +d.positive;
          return color(temp);
        });
    });
  });
});
