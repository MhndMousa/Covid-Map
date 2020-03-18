var coutnryStats = {};
var a = [];

mapboxgl.accessToken =
  "pk.eyJ1IjoibWhuZCIsImEiOiJjamFvOThiNTEzajQ4MnFwbGtxaTlpN3ZqIn0.7N5tTPAHj0A9ZTJuBHvz6w";
mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  true // Lazy load the plugin
);

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mhnd/ck7wvcqxm0nwu1in3wb7ay069/draft"
});

map.on("load", function() {
  fetch("https://corona.lmao.ninja/countries")
    .then(resp => resp.json())
    .then(function(data) {
      data.forEach(element => {
        coutnryStats[element["country"]] = element;
        a.push(element["country"]);
      });
      console.log(coutnryStats);
    })
    .catch(function(error) {});
  map.on("mousemove", function(e) {
    // updateLabels(e.features[0].properties.name)
    // console.log(e);
    // document.getElementById("info").innerHTML =
    //   // e.point is the x, y coordinates of the mousemove event relative
    //   // to the top-left corner of the map
    // JSON.stringify(e.point) +
    //   "<br />" +
    //   // e.lngLat is the longitude, latitude geographical position of the event
    //   JSON.stringify(e.lngLat.wrap());
  });
  map.addSource("states", {
    type: "geojson",
    data:
      "https://raw.githubusercontent.com/MhndMousa/res/master/countries.geojson"
  });

  map.on("click", "states-layer", function(e) {
    console.log(e.features[0].properties.namear);
    updateLabels(
      e.features[0].properties.name,
      e.features[0].properties.namear || e.features[0].properties.name
    );
  });
  map.addLayer({
    id: "states-layer",
    type: "fill",
    source: "states",
    paint: {
      "fill-color": "rgba(200, 100, 240, 0)"
    }
  });

  map.on("mouseenter", "states-layer", function() {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "states-layer", function() {
    map.getCanvas().style.cursor = "";
  });

  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: "country",
    // countries: [],
    placeholder: "ما هي الدولة التي تود البحث عنها؟",
    mapboxgl: mapboxgl,
    getItemValue: e => {
      country = e["matching_text"] || e["place_name"];
      updateLabels(country);
    }
  });

  map.addControl(geocoder, "bottom-right");
});

function updateLabels(country, country_in_arabic) {
  document.getElementById("country_label").innerHTML = country_in_arabic;
  data = coutnryStats[country];

  if (data == undefined) {
    document.getElementById("cases").innerHTML = "الحالات : " + "غير معروف";
    document.getElementById("recovered").innerHTML =
      "المتعافين : " + "غير معروف";
    document.getElementById("deaths").innerHTML = "الوفيات : " + "غير معروف";
    return;
  }

  cases = String(data.cases).toArabicDigits();
  recovered = String(data["recovered"]).toArabicDigits();
  dead = String(data["deaths"]).toArabicDigits();
  document.getElementById("cases").innerHTML = "الحالات : " + cases;
  document.getElementById("recovered").innerHTML = "المتعافين : " + recovered;
  document.getElementById("deaths").innerHTML = "الوفيات : " + dead;
}

fetch("https://corona.lmao.ninja/all")
  .then(resp => resp.json())
  .then(function(data) {
    var countryDiv = document.createElement("div");
    countryDiv.id = "country_label";
    countryDiv.innerHTML = "عالمياً";
    countryDiv.style.fontSize = "15px";
    countryDiv.style.fontFamily = "'Cairo-bold', sans-serif";
    countryDiv.style.padding = "5px";
    countryDiv.style.color = "white";

    var casesDiv = document.createElement("div");
    casesDiv.id = "cases";
    casesDiv.innerHTML = "الحالات : " + String(data["cases"]).toArabicDigits();
    casesDiv.style.background = "gray";
    casesDiv.style.color = "white";
    casesDiv.style.borderRadius = "5px";
    casesDiv.style.padding = "5px";
    casesDiv.style.margin = "5px";

    var rDiv = document.createElement("div");
    rDiv.id = "recovered";
    rDiv.innerHTML =
      "المتعافين : " + String(data["recovered"]).toArabicDigits();
    rDiv.style.color = "white";
    rDiv.style.borderRadius = "5px";
    rDiv.style.padding = "5px";
    rDiv.style.margin = "5px";
    rDiv.style.background = "rgba(50, 180, 180, 0.66)";

    var dDiv = document.createElement("div");
    dDiv.id = "deaths";
    dDiv.innerHTML = "الوفيات : " + String(data["deaths"]).toArabicDigits();
    dDiv.style.color = "white";
    dDiv.style.borderRadius = "5px";
    dDiv.style.padding = "5px";
    dDiv.style.margin = "5px";
    dDiv.style.background = "rgba(250, 30, 0, 0.66)";

    var newDiv = document.createElement("div");
    let date = moment(Date(data["updated"]));
    newDiv.innerHTML =
      "اخر تحديث" +
      "\n" +
      date.locale("ar-sa").format("MMMM Do YYYY") +
      "\n" +
      date.locale("ar-sa").format("h:mm:ss a ") +
      "\n بتوقيت " +
      date.locale("ar-sa").format("Z");
    newDiv.style.color = "white";
    newDiv.style.borderRadius = "5px";
    newDiv.style.margin = "5px";
    newDiv.style.padding = "5px";
    newDiv.style.background = "rgba(0,0,0,0.66)";

    ref = document.createElement("a");
    ref.href = "https://www.worldometers.info/coronavirus/";
    ref.innerHTML = "المصدر";
    ref.style.color = "white";
    ref.style.borderRadius = "5px";
    // ref.style.margin = "5px"
    // ref.style.padding = '5px'

    var v = document.createElement("div");
    v.style.display = "block";
    // v.style.width= "120px";
    v.append(countryDiv);
    v.append(casesDiv);
    v.append(rDiv);
    v.append(dDiv);

    let a = document.getElementById("info");
    a.appendChild(v);
    a.appendChild(newDiv);
    document.getElementById("res").appendChild(ref);
  })
  .catch(function(error) {});

String.prototype.toArabicDigits = function() {
  var id = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return this.replace(/[0-9]/g, function(w) {
    return id[+w];
  });
};
