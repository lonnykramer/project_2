function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample

  d3.json(`/metadata/${sample}`).then((dataJS) => {


    // Use d3 to select the panel with id of `#sample-metadata`
    var sampleNbr = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sampleNbr.html("");
    console.log(dataJS);
    // Use `Object.entries` to add each key value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(dataJS).forEach(([key, value]) => {
      sampleNbr.append("h6").text(`${key}: ${value}`)
    }
    )

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  })
}


// *** my attempt at the charts
function buildCharts(sample) {

  //   //   // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((dataJS2) => {
    console.log("trying to pull info for pie chart");
    console.log(dataJS2);

    var traceBubble = {
      type: "bubble",
      x: dataJS2.otu_ids,
      y: dataJS2.sample_values,
      mode: "markers",

      marker: {
        size: dataJS2.sample_values,
        color: dataJS2.otu_ids
      },
      text: dataJS2.otu_labels
      // NEED HOVER ADDED TO BUBBLE
    }

    var layout = {
      title: "Gross Belly Buttons",
      //showlegend: true,
      height: 600,
    };

    var test_variable = [traceBubble]
    // @TODO: Build a Bubble Chart using the sample data
    Plotly.newPlot("bubble", test_variable, layout);  // "bubble" references the HTML id location







    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each). - already sorted from app.py @app.route("/samples/<sample>")



    var tracePie = {
      values: dataJS2.sample_values.slice(0, 10), //1-6
      labels: dataJS2.otu_ids.slice(0, 10),
      hover: dataJS2.otu_labels.slice(0, 10),
      type: "pie"

    }

    var test_variable2 = [tracePie]
    var pieLayout = {
      margin: {
        t: 0,
        l: 0
      }
    };
    console.log(test_variable2);
    
    Plotly.newPlot("pie", test_variable2, pieLayout); // "pie" references the HTML id location
    console.log("drew pie");
  });
}




function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  // d3.select("#pie").html("")
  
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
