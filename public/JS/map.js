var coutnryStats = {};

// Mapgl properties -----------------------------
mapboxgl.accessToken =
  "pk.eyJ1IjoibWhuZCIsImEiOiJjamFvOThiNTEzajQ4MnFwbGtxaTlpN3ZqIn0.7N5tTPAHj0A9ZTJuBHvz6w";
mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  true // Lazy load the plugin
);

// Intinsiate Map -----------------------------
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mhnd/ck7wvcqxm0nwu1in3wb7ay069"
});

// When all resources are loaded -----------------------------
map.on("load", function() {
  fetch("https://corona.lmao.ninja/countries")
    .then(resp => resp.json())
    .then(function(data) {
      data.forEach(element => {
        coutnryStats[element["country"]] = element;
      });
      console.log("here");
      document.getElementById("overlay").remove();
    })
    .catch(function(error) {});
  //Clickable countries -----------------------------
  map.addSource("countries", {
    type: "geojson",
    data: "./Asset/countries.geojson"
  });
  map.on("click", "countries-layer", function(e) {
    // console.log(e.features[0].properties.namear);
    addMarker(e);
    updateLabels(
      e.features[0].properties.name,
      e.features[0].properties.namear || e.features[0].properties.name
    );
  });

  map.addLayer({
    id: "countries-layer",
    type: "fill",
    source: "countries",
    paint: {
      "fill-color": "rgba(30,30,30,0.2)",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0
      ]
    }
  });
  map.on("mouseenter", "countries-layer", function(e) {
    map.getCanvas().style.cursor = "pointer";
  });
  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "countries-layer", function() {
    map.getCanvas().style.cursor = "";
  });
  // Search bar -----------------------------
  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: "country",
    language: "ar,en",
    placeholder: "بحث",
    clearAndBlurOnEsc: true
  });
  geocoder.on("result", function(e) {
    removeMarker();
    country =
      e.result["text_en"] || e.result["place_name_en"] || e.result["text"];
    updateLabels(country, e.result["text_ar"]);
  });
  map.addControl(geocoder, "bottom-right");
});
var marker;
function removeMarker() {
  if (typeof marker !== "undefined") {
    marker.remove();
  }
}
function addMarker(e) {
  removeMarker();
  //add marker
  console.log("here", e);
  marker = new mapboxgl.Marker({ color: "#3FB1CE" })
    .setLngLat([e.lngLat.lng, e.lngLat.lat])
    .addTo(map);
}

// APIs -----------------------------
fetch("https://corona.lmao.ninja/all")
  .then(resp => resp.json())
  .then(function(data) {
    var countryDiv = document.createElement("div");
    countryDiv.className = "info";
    countryDiv.id = "country_label";
    countryDiv.innerHTML = "عالمياً";
    countryDiv.style.fontSize = "min(4vw, 15px)";
    countryDiv.style.fontFamily = "'Cairo', sans-serif";
    countryDiv.style.padding = "5px";
    countryDiv.style.color = "white";

    var casesDiv = document.createElement("div");
    casesDiv.id = "cases";
    casesDiv.className = "tags";
    casesDiv.innerHTML = "الحالات : " + String(data["cases"]);
    casesDiv.style.background = colors.cases;
    casesDiv.style.color = "white";
    casesDiv.style.fontSize = "min(3vw, 12px)";
    casesDiv.style.borderRadius = "5px";
    casesDiv.style.padding = "5px";
    casesDiv.style.margin = "5px";

    var rDiv = document.createElement("div");
    rDiv.id = "recovered";
    rDiv.className = "tags";
    rDiv.innerHTML = "المتعافين : " + String(data["recovered"]);
    rDiv.style.color = "white";
    rDiv.style.fontSize = "min(3vw, 12px)";
    rDiv.style.borderRadius = "5px";
    rDiv.style.padding = "5px";
    rDiv.style.margin = "5px";
    rDiv.style.background = colors.recovered;

    var dDiv = document.createElement("div");
    dDiv.id = "deaths";
    dDiv.className = "tags";
    dDiv.innerHTML = "الوفيات : " + String(data["deaths"]);
    dDiv.style.color = "white";
    dDiv.style.fontSize = "min(3vw, 12px)";
    dDiv.style.borderRadius = "5px";
    dDiv.style.padding = "5px";
    dDiv.style.margin = "5px";
    dDiv.style.background = colors.deaths;

    let date = moment(data["updated"]);
    document.getElementById("email").innerHTML =
      date.locale("ar-sa").format("MMMM Do YYYY") +
      " - " +
      date.locale("ar-sa").format("h:mm:ss a ") +
      "\t بتوقيتك المحلي ";

    var todayCases = document.createElement("div");
    todayCases.id = "todayCases";
    todayCases.style.display = "none";
    todayCases.className = "tags";
    todayCases.innerHTML = "الوفيات : " + String(data["todayCases"]);
    todayCases.style.color = "white";
    todayCases.style.fontSize = "min(3vw, 12px)";
    todayCases.style.borderRadius = "5px";
    todayCases.style.padding = "5px";
    todayCases.style.margin = "5px";
    todayCases.style.background = colors.todayCases;

    var todayDeaths = document.createElement("div");
    todayDeaths.id = "todayDeaths";
    todayDeaths.className = "tags";
    todayDeaths.innerHTML = "الوفيات : " + String(data["todayDeaths"]);
    todayDeaths.style.color = "white";
    todayDeaths.style.display = "none";
    todayDeaths.style.fontSize = "min(3vw, 12px)";
    todayDeaths.style.borderRadius = "5px";
    todayDeaths.style.padding = "5px";
    todayDeaths.style.margin = "5px";
    todayDeaths.style.background = colors.todayDeaths;

    var critical = document.createElement("div");
    critical.id = "critical";
    critical.className = "tags";
    critical.innerHTML = "الوفيات : " + String(data["critical"]);

    critical.style.display = "none";
    critical.style.color = "white";
    critical.style.fontSize = "min(3vw, 12px)";
    critical.style.borderRadius = "5px";
    critical.style.padding = "5px";
    critical.style.margin = "5px";
    critical.style.background = colors.critical;

    var v = document.createElement("div");
    v.style.display = "block";
    // v.style.width= "120px";
    v.append(countryDiv);

    v.append(casesDiv);
    v.append(todayCases);
    v.append(rDiv);
    v.append(critical);
    v.append(dDiv);
    v.append(todayDeaths);

    let a = document.getElementById("info");
    a.appendChild(v);
    // a.appendChild(dateDiv);
    // document.getElementById("res").appendChild(ref);
  })
  .catch(function(error) {});

// Helpers -----------------------------
function updateLabels(country, country_in_arabic) {
  document.getElementById("country_label").innerHTML = country_in_arabic;
  country = edgeCases(country);
  data = coutnryStats[country];

  if (data == undefined) {
    document.getElementById("cases").innerHTML = "الحالات : " + "غير معروف";
    document.getElementById("recovered").innerHTML =
      "المتعافين : " + "غير معروف";
    document.getElementById("deaths").innerHTML = "الوفيات : " + "غير معروف";
    document.getElementById("todayCases").innerHTML =
      "حالات اليوم: " + "غير معروف";
    document.getElementById("todayDeaths").innerHTML =
      "وفيات اليوم: " + "غير معروف";
    document.getElementById("critical").innerHTML =
      "حالات حرجة: " + "غير معروف";

    return;
  }
  if (
    document.getElementById("todayCases").style.display == "none" ||
    document.getElementById("todayDeaths").style.display == "none" ||
    document.getElementById("critical").style.display == "none"
  ) {
    // console.log("Here");

    document.getElementById("todayCases").style.setProperty("display", "block");
    document
      .getElementById("todayDeaths")
      .style.setProperty("display", "block");
    document.getElementById("critical").style.setProperty("display", "block");
  }

  cases = String(data.cases);
  recovered = String(data["recovered"]);
  dead = String(data["deaths"]);
  todayCases = String(data["todayCases"]);
  todayDeaths = String(data["todayDeaths"]);
  critical = String(data["critical"]);

  document.getElementById("todayCases").innerHTML =
    "حالات اليوم: " + todayCases;
  document.getElementById("todayDeaths").innerHTML =
    "وفيات اليوم: " + todayDeaths;
  document.getElementById("critical").innerHTML = "حالات حرجة: " + critical;
  document.getElementById("cases").innerHTML = "الحالات : " + cases;
  document.getElementById("recovered").innerHTML = "المتعافين : " + recovered;
  document.getElementById("deaths").innerHTML = "الوفيات : " + dead;
}

String.prototype.toArabicDigits = function() {
  var id = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return this.replace(/[0-9]/g, function(w) {
    return id[+w];
  });
};
function edgeCases(c) {
  switch (c.toLowerCase()) {
    case "United States of America".toLowerCase():
      return "USA";
      break;
    case "United States".toLowerCase():
      return "USA";
      break;
    case "United Arab Emirates".toLowerCase():
      return "UAE";
      break;
    case "Republic of Serbia".toLowerCase():
      return "Serbia";
      break;
    case "United Kingdom".toLowerCase():
      return "UK";
      break;
    case "South Korea".toLowerCase():
      return "S. Korea";
      break;
    default:
      return c;
      break;
  }
}

var colors = {
  cases: "gray",
  todayCases: "rgba(50, 50,50, 0.7)",

  recovered: "rgba(0, 150, 150, 0.7)",
  critical: "rgba(250, 0, 0, 0.7)",
  deaths: "rgba(250, 30, 0, 0.7)",
  todayDeaths: "rgba(180, 30, 0, 0.7)",

  text: "grey-text ",
  primary: "amber darken-3 ",
  textAccent: "text-lighten-1 ",
  textAccentHeader: "text-lighten-4 "
};
