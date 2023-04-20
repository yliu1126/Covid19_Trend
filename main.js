// using d3 for convenience
let main = d3.select("main");
let scrolly = main.select("#scrolly");
// let choropleth = d3.select("#choropleth");
// let barGraph = d3.select("#barGraph");
let article = scrolly.select("article");
let step = article.selectAll(".step");

let finalData, finalJson, stateAbbrev;

let date6 = "2021-02-22";
let sliderVal = 406;

d3.csv(
  "https://raw.githubusercontent.com/fuyuGT/CS7450-data/main/covid_states_data.csv"
).then(function (data) {
  finalData = data;
  console.log(finalData);
});

d3.json("./us-states.json").then(function (json) {
  finalJson = json;
  console.log(finalJson);
});

d3.json("./state-abbrev.json").then(function (json) {
  stateAbbrev = json;
});

console.log("data::: ", finalData);
console.log("json::: ", finalJson);

// initialize the scrollama
let scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  let stepH = Math.floor(window.innerHeight * 0.75);
  step.style("height", stepH + "px");
  let svgHeight = window.innerHeight / 2;
  let svgMarginTop = (window.innerHeight - svgHeight) / 2;
  /* ------------------- initialize your charts and groups here ------------------ */
  //   svg
  //     .attr("height", svgHeight + "px")
  //     .attr("width", window.innerWidth)
  //     .style("top", svgMarginTop + "px");
  d3.select("#graph-container")
    .attr("height", svgHeight + "px")
    .attr("width", window.innerWidth / 2);

  const map = d3
    .select("#choropleth")
    .attr("width", 800)
    .attr("height", 500)
    .attr("transform", "translate(200, 0)");

  var usmap = map.append("g");
  var barGraph = d3
    .select("#barGraph")
    .attr("width", 500)
    .attr("height", 600)
    .attr("transform", "translate(170, 100)");
  let barGroup = barGraph.append("g").attr("class", "barGroup");
  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
  console.log(response);
  // response = { element, direction, index }
  // add color to current step only
  step.classed("is-active", function (d, i) {
    return i === response.index;
  });
  // update graphic based on step
  switch (response.index) {
    case 0:
      d3.select("#slider-svg").remove();

      for (var k = 0; k < finalJson.features.length; k++) {
        finalJson.features[k].properties.positive = 0;
      }
      var byDate = d3.group(finalData, (d) => d.date);
      var data1 = byDate.get("2020-01-21");
      var max = 0;
      var sum = 0;
      for (var i = 0; i < data1.length; i++) {
        // Grab State Name
        var dataState = data1[i].state;

        // Grab data value
        var dataValue = data1[i].positive;
        sum += +dataValue;
        if (+dataValue > max) max = +dataValue;

        // Find the corresponding state inside the GeoJSON
        for (var j = 0; j < finalJson.features.length; j++) {
          var jsonState = finalJson.features[j].properties.abbrev;

          if (dataState === jsonState) {
            // Copy the data value into the JSON
            finalJson.features[j].properties.positive = dataValue;

            // Stop looking through the JSON
            break;
          }
        }
        for (var k = 0; k < finalJson.features.length; k++) {
          if (!finalJson.features[k].properties.positive) {
            finalJson.features[k].properties.positive = 0;
          }
        }
      }
      createGraph(finalJson, data1, max, sum);
      break;
    case 1:
      d3.select("#slider-svg").remove();

      var byDate = d3.group(finalData, (d) => d.date);
      var data1 = byDate.get("2020-03-11");
      var max = 0;
      var sum = 0;
      for (var i = 0; i < data1.length; i++) {
        // Grab State Name
        var dataState = data1[i].state;

        // Grab data value
        var dataValue = data1[i].positive;
        sum += +dataValue;
        if (+dataValue > max) max = +dataValue;

        // Find the corresponding state inside the GeoJSON
        for (var j = 0; j < finalJson.features.length; j++) {
          var jsonState = finalJson.features[j].properties.abbrev;

          if (dataState === jsonState) {
            // Copy the data value into the JSON
            finalJson.features[j].properties.positive = dataValue;

            // Stop looking through the JSON
            break;
          }
        }
        for (var k = 0; k < finalJson.features.length; k++) {
          if (!finalJson.features[k].properties.positive) {
            finalJson.features[k].properties.positive = 0;
          }
        }
      }
      createGraph(finalJson, data1, max, sum);
      break;
    case 2:
      d3.select("#slider-svg").remove();

      var byDate = d3.group(finalData, (d) => d.date);
      var data1 = byDate.get("2020-06-11");
      var max = 0;
      var sum = 0;
      for (var i = 0; i < data1.length; i++) {
        // Grab State Name
        var dataState = data1[i].state;

        // Grab data value
        var dataValue = data1[i].positive;
        sum += +dataValue;
        if (+dataValue > max) max = +dataValue;

        // Find the corresponding state inside the GeoJSON
        for (var j = 0; j < finalJson.features.length; j++) {
          var jsonState = finalJson.features[j].properties.abbrev;

          if (dataState === jsonState) {
            // Copy the data value into the JSON
            finalJson.features[j].properties.positive = dataValue;

            // Stop looking through the JSON
            break;
          }
        }
        for (var k = 0; k < finalJson.features.length; k++) {
          if (!finalJson.features[k].properties.positive) {
            finalJson.features[k].properties.positive = 0;
          }
        }
      }
      createGraph(finalJson, data1, max, sum);
      break;
    case 3:
      d3.select("#slider-svg").remove();

      var byDate = d3.group(finalData, (d) => d.date);
      var data1 = byDate.get("2020-08-23");
      var max = 0;
      var sum = 0;
      for (var i = 0; i < data1.length; i++) {
        // Grab State Name
        var dataState = data1[i].state;

        // Grab data value
        var dataValue = data1[i].positive;
        sum += +dataValue;
        if (+dataValue > max) max = +dataValue;

        // Find the corresponding state inside the GeoJSON
        for (var j = 0; j < finalJson.features.length; j++) {
          var jsonState = finalJson.features[j].properties.abbrev;

          if (dataState === jsonState) {
            // Copy the data value into the JSON
            finalJson.features[j].properties.positive = dataValue;

            // Stop looking through the JSON
            break;
          }
        }
        for (var k = 0; k < finalJson.features.length; k++) {
          if (!finalJson.features[k].properties.positive) {
            finalJson.features[k].properties.positive = 0;
          }
        }
      }
      createGraph(finalJson, data1, max, sum);
      break;
    case 4:
      d3.select("#slider-svg").remove();

      var byDate = d3.group(finalData, (d) => d.date);
      var data1 = byDate.get("2020-12-14");
      var max = 0;
      var sum = 0;
      for (var i = 0; i < data1.length; i++) {
        // Grab State Name
        var dataState = data1[i].state;

        // Grab data value
        var dataValue = data1[i].positive;
        sum += +dataValue;
        if (+dataValue > max) max = +dataValue;

        // Find the corresponding state inside the GeoJSON
        for (var j = 0; j < finalJson.features.length; j++) {
          var jsonState = finalJson.features[j].properties.abbrev;

          if (dataState === jsonState) {
            // Copy the data value into the JSON
            finalJson.features[j].properties.positive = dataValue;

            // Stop looking through the JSON
            break;
          }
        }
        for (var k = 0; k < finalJson.features.length; k++) {
          if (!finalJson.features[k].properties.positive) {
            finalJson.features[k].properties.positive = 0;
          }
        }
      }
      createGraph(finalJson, data1, max, sum);
      break;
    case 5:
      d3.select("#slider-svg").remove();
      var byDate = d3.group(finalData, (d) => d.date);
      var data1 = byDate.get("2021-02-22");
      var max = 0;
      var sum = 0;
      for (var i = 0; i < data1.length; i++) {
        // Grab State Name
        var dataState = data1[i].state;

        // Grab data value
        var dataValue = data1[i].positive;
        sum += +dataValue;
        if (+dataValue > max) max = +dataValue;

        // Find the corresponding state inside the GeoJSON
        for (var j = 0; j < finalJson.features.length; j++) {
          var jsonState = finalJson.features[j].properties.abbrev;

          if (dataState === jsonState) {
            // Copy the data value into the JSON
            finalJson.features[j].properties.positive = dataValue;

            // Stop looking through the JSON
            break;
          }
        }
        for (var k = 0; k < finalJson.features.length; k++) {
          if (!finalJson.features[k].properties.positive) {
            finalJson.features[k].properties.positive = 0;
          }
        }
      }
      createGraph(finalJson, data1, max, sum);
      break;
    case 6:
      var byDate = d3.group(finalData, (d) => d.date);
      var data1 = byDate.get(date6);
      var dates = [...byDate.keys()].reverse();
      var byIndexMap = new Map();
      for (const [index, element] of dates.entries()) {
        byIndexMap.set(element, index);
      }
      var slider = d3
        .sliderHorizontal()
        .value(sliderVal)
        .width(300)
        .min(0)
        .max(dates.length - 1)
        .on("onchange", (val) => {
          d3.select("#choropleth").selectAll(".map-path").remove();
          d3.select(".map-tooltip").remove();
          d3.selectAll(".myRect").remove();
          d3.selectAll(".graph-axis").remove();
          d3.selectAll(".white").remove();

          var select_date = dates[Math.floor(val)];
          sliderVal = byIndexMap.get(select_date);
          date6 = select_date;
          var options = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          var newDate = new Date(select_date).toLocaleDateString(
            "en-US",
            options
          );

          document.getElementById("change-date").innerHTML = newDate;
          var select_data = byDate.get(select_date);

          var valueArray = [];
          var max = 0;
          var sum = 0;
          for (var k = 0; k < finalJson.features.length; k++) {
            finalJson.features[k].properties.positive = 0;
          }

          for (var i = 0; i < select_data.length; i++) {
            // Grab State Name
            var dataState = select_data[i].state;

            // Grab data value
            var dataValue = select_data[i].positive;
            sum += +dataValue;
            if (+dataValue > max) max = +dataValue;

            // Find the corresponding state inside the GeoJSON
            for (var j = 0; j < finalJson.features.length; j++) {
              var jsonState = finalJson.features[j].properties.abbrev;

              if (dataState === jsonState) {
                // Copy the data value into the JSON
                finalJson.features[j].properties.positive = dataValue;

                // Stop looking through the JSON
                break;
              }
            }
            for (var k = 0; k < finalJson.features.length; k++) {
              if (!finalJson.features[k].properties.positive) {
                finalJson.features[k].properties.positive = 0;
              }
            }
          }
          createGraph(finalJson, select_data, max, sum);
        });
      var max = 0;
      var sum = 0;
      for (var i = 0; i < data1.length; i++) {
        // Grab State Name
        var dataState = data1[i].state;

        // Grab data value
        var dataValue = data1[i].positive;
        sum += +dataValue;
        if (+dataValue > max) max = +dataValue;

        // Find the corresponding state inside the GeoJSON
        for (var j = 0; j < finalJson.features.length; j++) {
          var jsonState = finalJson.features[j].properties.abbrev;

          if (dataState === jsonState) {
            // Copy the data value into the JSON
            finalJson.features[j].properties.positive = dataValue;

            // Stop looking through the JSON
            break;
          }
        }
        for (var k = 0; k < finalJson.features.length; k++) {
          if (!finalJson.features[k].properties.positive) {
            finalJson.features[k].properties.positive = 0;
          }
        }
      }
      d3.select("#slider")
        .append("svg")
        .attr("id", "slider-svg")
        .attr("width", 400)
        .attr("height", 100)
        .attr("transform", "translate(300,0)")
        .append("g")
        .attr("transform", "translate(20,10)")
        .call(slider);
      createGraph(finalJson, data1, max, sum);
      break;
    default:
      break;
  }
}

function init() {
  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.33,
      // debug: true
    })
    .onStepEnter(handleStepEnter);
}

// kick things off

setTimeout(() => {
  init();
}, 1500);

function createGraph(json, data1, max, sum) {
  d3.select("#choropleth").selectAll(".map-path").remove();
  d3.select(".map-tooltip").remove();
  d3.selectAll(".myRect").remove();
  d3.selectAll(".graph-axis").remove();
  d3.selectAll(".white").remove();
  var usmap = d3.select("#choropleth").select("g");
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
  let mapTooltip = usmap
    .append("text")
    .attr("class", "map-tooltip")
    .attr("x", 400)
    .attr("y", 20)
    .style("font-size", 16)
    .style("fill", "black")
    .style("text-anchor", "middle")
    .style("opacity", 1)
    .text(`Total Positive Cases: ${sum}`);

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
      if (temp === 0) return "#ffffff";
      return color(temp);
    })
    .on("mouseover", function (event, data) {
      //var [x, y] = d3.pointer(event, usmap);
      mapTooltip.style("opacity", 1);
      mapTooltip.text(
        `${data.properties.name} Positive Cases: ${data.properties.positive}`
      );
    })

    // fade out tooltip on mouse out
    .on("mouseout", function (d) {
      mapTooltip.style("opacity", 1);
      mapTooltip.text(`Total Positive Cases: ${sum}`);
    });

  data1.sort(function (a, b) {
    return +b.positive - +a.positive;
  });

  var barX = d3.scaleLinear().domain([0, max]).range([0, 400]);

  let barGroup = d3
    .select("#barGraph")
    .select("g")
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
    })
    .on("mouseover", function (event, data) {
      //var [x, y] = d3.pointer(event, usmap);
      console.log(data);
      mapTooltip.style("opacity", 1);
      mapTooltip.text(
        `${stateAbbrev[data.state]} Positive Cases: ${data.positive}`
      );
    })

    // fade out tooltip on mouse out
    .on("mouseout", function (d) {
      mapTooltip.style("opacity", 1);
      mapTooltip.text(`Total Positive Cases: ${sum}`);
    });
  barGroup
    .append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 550)
    .attr("y", 520)
    .text("Cases");

  var legend = d3
    .select("#legend")
    .attr("width", 230)
    .attr("height", 50)
    .attr("transform", "translate(250,0)")
    .selectAll("g")
    .data([0, ...color.quantiles()])
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
      return "translate(" + (i + 1) * 20 + ", 0)";
    });

  d3.select("#legend")
    .append("rect")
    .attr("class", "white")
    .attr("width", 18)
    .attr("height", 18)
    .attr("transform", "translate(0,0)")
    .style("fill", "white");

  d3.select("#legend")
    .append("text")
    .attr("class", "white")
    .attr("x", 10)
    .attr("y", 30)
    .attr("dx", "0.15em")
    .attr("font-size", "0.5em")
    .text("0k");

  legend
    .append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);
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
}
