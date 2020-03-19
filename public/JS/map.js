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
      console.log(coutnryStats);
    })
    .catch(function(error) {});

  //Clickable countries -----------------------------
  map.addSource("countries", {
    type: "geojson",
    data: "./Asset/countries.geojson"
  });

  map.on("click", "countries-layer", function(e) {
    console.log(e.features[0].properties.namear);
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
      "fill-color": "rgba(200, 100, 240, 0)"
    }
  });

  map.addLayer({
    id: "layer1",
    type: "fill",
    source: "countries",
    paint: {
      "fill-color": "rgba(2, 3, 4, 0)"
    }
  });

  map.on("mouseenter", "countries-layer", function() {
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
    // clearOnBlur: true,
    placeholder: "ما هي الدولة التي تود البحث عنها؟",
    mapboxgl: mapboxgl,
    getItemValue: e => {
      console.log(e);
      country = e["text_en"] ?? e["place_name_en"] ?? e["text"];
      console.log(e["text_en-US"]);

      updateLabels(country, e["text_ar"]);
      //   geocoder.clear();
    }
  });

  var language = new MapboxLanguage({
    languageSource: "ar"
  });

  map.addControl(geocoder, "bottom-right");
  map.addControl(language);
});

// APIs -----------------------------
fetch("https://corona.lmao.ninja/all")
  .then(resp => resp.json())
  .then(function(data) {
    var countryDiv = document.createElement("div");
    countryDiv.className = "info";
    countryDiv.id = "country_label";
    countryDiv.innerHTML = "عالمياً";
    countryDiv.style.fontSize = "min(4vw, 15px)";
    countryDiv.style.fontFamily = "'Cairo-bold', sans-serif";
    countryDiv.style.padding = "5px";
    countryDiv.style.color = "white";

    var casesDiv = document.createElement("div");
    casesDiv.id = "cases";
    casesDiv.className = "tags";
    casesDiv.innerHTML = "الحالات : " + String(data["cases"]).toArabicDigits();
    casesDiv.style.background = "gray";
    casesDiv.style.color = "white";
    casesDiv.style.fontSize = "min(3vw, 10px)";
    casesDiv.style.borderRadius = "5px";
    casesDiv.style.padding = "5px";
    casesDiv.style.margin = "5px";

    var rDiv = document.createElement("div");
    rDiv.id = "recovered";
    rDiv.className = "tags";
    rDiv.innerHTML =
      "المتعافين : " + String(data["recovered"]).toArabicDigits();
    rDiv.style.color = "white";
    rDiv.style.fontSize = "min(3vw, 10px)";
    rDiv.style.borderRadius = "5px";
    rDiv.style.padding = "5px";
    rDiv.style.margin = "5px";
    rDiv.style.background = "rgba(50, 180, 180, 0.66)";

    var dDiv = document.createElement("div");
    dDiv.id = "deaths";
    dDiv.className = "tags";
    dDiv.innerHTML = "الوفيات : " + String(data["deaths"]).toArabicDigits();
    dDiv.style.color = "white";
    dDiv.style.fontSize = "min(3vw, 10px)";
    dDiv.style.borderRadius = "5px";
    dDiv.style.padding = "5px";
    dDiv.style.margin = "5px";
    dDiv.style.background = "rgba(250, 30, 0, 0.66)";

    var dateDiv = document.createElement("div");
    let date = moment(data["updated"]);
    dateDiv.innerHTML =
      "اخر تحديث" +
      "\n" +
      date.locale("ar-sa").format("MMMM Do YYYY") +
      "\n" +
      date.locale("ar-sa").format("h:mm:ss a ") +
      "\n بتوقيتك المحلي ";
    dateDiv.style.color = "white";
    dateDiv.style.fontSize = "min(3vw, 10px)";
    dateDiv.style.borderRadius = "5px";
    dateDiv.style.margin = "5px";
    dateDiv.style.padding = "5px";
    dateDiv.style.background = "rgba(0,0,0,0.66)";

    ref = document.createElement("a");
    ref.id = "ref";
    ref.href = "https://www.worldometers.info/coronavirus/";
    ref.innerHTML = "المصدر";
    ref.style.color = "white";
    ref.style.borderRadius = "5px";
    // ref.style.margin = "5px"
    // ref.style.padding = '5px'

    var todayCases = document.createElement("div");
    todayCases.id = "todayCases";
    todayCases.style.display = "none";
    todayCases.className = "tags";
    todayCases.innerHTML =
      "الوفيات : " + String(data["todayCases"]).toArabicDigits();
    todayCases.style.color = "white";
    todayCases.style.fontSize = "min(3vw, 10px)";
    todayCases.style.borderRadius = "5px";
    todayCases.style.padding = "5px";
    todayCases.style.margin = "5px";
    todayCases.style.background = "rgba(20, 120, 0, 0.66)";

    var todayDeaths = document.createElement("div");
    todayDeaths.id = "todayDeaths";
    todayDeaths.className = "tags";
    todayDeaths.innerHTML =
      "الوفيات : " + String(data["todayDeaths"]).toArabicDigits();
    todayDeaths.style.color = "white";
    todayDeaths.style.display = "none";
    todayDeaths.style.fontSize = "min(3vw, 10px)";
    todayDeaths.style.borderRadius = "5px";
    todayDeaths.style.padding = "5px";
    todayDeaths.style.margin = "5px";
    todayDeaths.style.background = "rgba(180, 30, 0, 0.66)";

    var critical = document.createElement("div");
    critical.id = "critical";
    critical.className = "tags";
    critical.innerHTML =
      "الوفيات : " + String(data["critical"]).toArabicDigits();

    critical.style.display = "none";
    critical.style.color = "white";
    critical.style.fontSize = "min(3vw, 10px)";
    critical.style.borderRadius = "5px";
    critical.style.padding = "5px";
    critical.style.margin = "5px";
    critical.style.background = "rgba(250, 0, 0, 0.66)";

    var v = document.createElement("div");
    v.style.display = "block";
    // v.style.width= "120px";
    v.append(countryDiv);
    v.append(rDiv);
    v.append(casesDiv);
    v.append(todayCases);
    v.append(critical);
    v.append(dDiv);
    v.append(todayDeaths);

    let a = document.getElementById("info");
    a.appendChild(v);
    // a.appendChild(dateDiv);
    document.getElementById("res").appendChild(ref);
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
    console.log("Here");

    document.getElementById("todayCases").style.setProperty("display", "block");
    document
      .getElementById("todayDeaths")
      .style.setProperty("display", "block");
    document.getElementById("critical").style.setProperty("display", "block");
  }

  window.navigator.vibrate(200);
  cases = String(data.cases).toArabicDigits();
  recovered = String(data["recovered"]).toArabicDigits();
  dead = String(data["deaths"]).toArabicDigits();
  todayCases = String(data["todayCases"]).toArabicDigits();
  todayDeaths = String(data["todayDeaths"]).toArabicDigits();
  critical = String(data["critical"]).toArabicDigits();

  document.getElementById("todayCases").innerHTML =
    "حالات اليوم: " + todayCases;
  document.getElementById("todayDeaths").innerHTML =
    "وفيات اليوم: " + todayDeaths;
  document.getElementById("critical").innerHTML = "حالات حرجة: " + critical;
  document.getElementById("cases").innerHTML = "الحالات : " + cases;
  document.getElementById("recovered").innerHTML = "المتعافين : " + recovered;
  document.getElementById("deaths").innerHTML = "الوفيات : " + dead;
}

function edgeCases(c) {
  console.log(c);

  switch (c.toLowerCase()) {
    case "United States of America".toLowerCase():
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

String.prototype.toArabicDigits = function() {
  var id = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return this.replace(/[0-9]/g, function(w) {
    return id[+w];
  });
};
