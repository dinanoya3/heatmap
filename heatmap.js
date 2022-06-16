const svg = d3.select("svg");

// const width = 800;
// const height = data.length * 150;

svg.attr("width", 800).attr("height", data.length * 150);
// svg.attr("viewBox", "0 0 ${width} ${height}");

// color scale
const colorScale = d3
  .scaleLinear()
  .domain([-10, 0, 7, 14, 21, 24]) //in Celsius
  .range(["#814ee7", "#3f24ec", "#79e87c", "#fbe157", "#ff9737", "#fe3b3b"]);

// temp scale
const tempScale = d3.scaleLinear().domain([-20, 45]).range([150, 0]);

// line across bar chart
const lineGenerator = d3
  .line()
  // based on x-direction (index)
  .x((d, i) => {
    // 25 from cx + 200 to shift, 50 from width of box
    return 225 + 50 * i;
  })
  .y((d, i) => {
    return tempScale(d);
  });

// convert units scale
const unitScale = d3
  .scaleLinear()
  .domain([0, 100]) //Celsius
  .rangeRound([32, 212]); //Fahrenheit

const dataPoints = svg
  .selectAll("g.data-point")
  .data(data)
  .enter()
  .append("g")
  .attr("class", "data-point")
  // space between each data-point group
  .attr("transform", (d, i) => {
    // based on the index
    return `translate(0, ${i * 150})`;
  });

// TEXT GROUP
// add text element (city)
dataPoints
  .append("text")
  .attr("x", 175)
  .attr("y", 70)
  .attr("class", "city")
  .text((d, i) => {
    return d.city;
  });
// add text element (country)
dataPoints
  .append("text")
  .attr("x", 175)
  .attr("y", 100)
  .attr("class", "country")
  .text((d, i) => {
    return d.country;
  });

// MONTHS GROUP
const months = dataPoints
  // append months group
  .append("g")
  .attr("class", "months")
  .attr("transform", "translate(200, 0)");
// individual months
const monthGroups = months
  .selectAll("g.month")
  .data((d, i) => {
    return d.months;
  })
  .enter()
  // append month group
  .append("g")
  .attr("class", "month")
  .attr("transform", (d, i) => {
    return `translate(${i * 50}, 0)`;
  });
// append individual rect to month group
monthGroups
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 50)
  .attr("height", 150)
  .style("fill", (d, i) => {
    return colorScale(d);
  });
// append circles
monthGroups
  .append("circle")
  .attr("cx", 25)
  .attr("cy", (d, i) => {
    return tempScale(d);
  })
  .attr("r", 15);

const temperatures = monthGroups
  .append("text")
  .attr("class", "temp")
  .attr("x", 25)
  .attr("y", (d, i) => {
    return tempScale(d) + 1;
  })
  .text((d, i) => {
    return d;
  })
  .style("fill", (d, i) => {
    return colorScale(d);
  });

dataPoints
  .append("path")
  .datum((d, i) => {
    return d.months;
  })
  .attr("d", (d, i) => {
    return lineGenerator(d);
  });

// change value of temperatures depending on units (C/F) selection
const selectTag = document.querySelector("select");
selectTag.addEventListener("input", function () {
  if (this.value === "c") {
    temperatures.text((d, i) => {
      return d;
    });
  } else {
    temperatures.text((d, i) => {
      return Math.round(d * 1.8 + 32); //OR use scale
      // return unitScale(d);
    });
  }
});

// WITH ARROW FUNCTION
// change value of temperatures depending on units (C/F) selection
// const selectTag = document.querySelector("select");
// selectTag.addEventListener("input", () => {
//   if (this.value === "c") {
//     temperatures.text((d, i) => {
//       return d;
//     });
//   } else {
//     temperatures.text((d, i) => {
//       return Math.round(d * 1.8 + 32); //OR use scale
//       // return unitScale(d);
//     });
//   }
// });
