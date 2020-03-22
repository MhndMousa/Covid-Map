function animationActivate() {
  $("#slide-out-button").sidenav({
    menuWidth: 330,
    draggable: true,
    closeOnClick: true
  });
}
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
  cases: "background: gray",
  todayCases: "background: rgba(50, 50,50, 0.7)",

  recovered: "background: rgba(0, 150, 150, 0.7)",
  critical: "background: rgba(250, 0, 0, 0.7)",
  deaths: "background: rgba(250, 30, 0, 0.7)",
  todayDeaths: "background: rgba(180, 30, 0, 0.7)",

  text: "grey-text ",
  primary: "amber darken-3 ",
  textAccent: "text-lighten-1 ",
  textAccentHeader: "text-lighten-4 "
};

function inArabo(params) {
  switch (params) {
    case "cases":
      return "الحالات";
    case "todayCases":
      return "حالات اليوم";
    case "critical":
      return "الحالات الحرجة";
    case "deaths":
      return "الوفيات";
    case "todayDeaths":
      return "وفيات اليوم";
    case "recovered":
      return "المتعافين";
  }
}

var row = 0;
var col = 0;
var coutnryStats = {};
var countries = {};
var emojis = {};

fetch("/Asset/countries.geojson")
  .then(resp => resp.json())
  .then(data => {
    countries = data.features.map(x => x.properties);
    // console.log(countries);
    arab = countries.map(x => x.namear);
    s = {};
    arab.forEach(element => {
      s[element] = null;
    });

    return s;
  })
  .then(arab => {
    console.log(arab);
    $("#autocomplete-input").autocomplete({
      data: arab,
      limit: 5,
      onAutocomplete: e => {
        if (e == "") populate();

        countries.forEach(element => {
          if (element.namear == e) {
            // let emoji = emojis.find(
            //   a => edgeCases(a.name) == edgeCases(element.name)
            // );
            createResultCard(
              e,
              "",
              coutnryStats.find(a => a.country == edgeCases(element.name))
            );
            // document.getElementById(element.name).style.display = "block";
          }
        });
      }
    });
  })
  .then(() => {
    // console.log(countries);

    // fetch("/Asset/countries-emoji.json")
    //   .then(data => data.json())
    //   .then(data => {
    //     emojis = data;
    //   });

    fetch("https://corona.lmao.ninja/countries")
      .then(resp => resp.json())
      .then(data => {
        coutnryStats = data;

        populate();
        document.getElementById("loader").remove();
      });
  });

cases = 0;
todayCases = 0;
critical = 0;
deaths = 0;
todayDeaths = 0;
recovered = 0;

function populate() {
  for (let i = 0; i < coutnryStats.length; i++) {
    const e = coutnryStats[i];

    cases = e.cases + cases;
    document.getElementById("cases").innerHTML = inArabo("cases");
    $("#cases").append($("<div>").html(cases));

    todayCases = e.todayCases + todayCases;
    document.getElementById("todayCases").innerHTML = inArabo("todayCases");
    $("#todayCases").append($("<div>").html(todayCases));

    critical = e.critical + critical;
    document.getElementById("critical").innerHTML = inArabo("critical");
    $("#critical").append($("<div>").html(critical));

    deaths = e.deaths + deaths;
    document.getElementById("deaths").innerHTML = inArabo("deaths");
    $("#deaths").append($("<div>").html(deaths));

    todayDeaths = e.todayDeaths + todayDeaths;
    document.getElementById("todayDeaths").innerHTML = inArabo("todayDeaths");
    $("#todayDeaths").append($("<div>").html(todayDeaths));

    recovered = e.recovered + recovered;
    document.getElementById("recovered").innerHTML = inArabo("recovered");
    $("#recovered").append($("<div>").html(recovered));

    console.log(cases, todayCases, critical, deaths, todayDeaths, recovered);

    //   console.log(row, col, e.country);
    let element = countries.find(a => edgeCases(a.name) == e.country);
    // var emoji = emojis.find(a => edgeCases(a.name) == e.country);

    if (element == undefined) {
      continue;
    }
    let name = element.namear || element.name;
    emoji = "";
    if (col < 4) col++;
    else addRow();

    animationActivate();
    createRowCard(row, name, emoji, e, "col l3 m6 s6");
  }
}

function createRowCard(row, name, emoji, element, col_size) {
  $("#row" + row).append(
    $("<div>", { class: col_size }).append(
      $("<a>", {
        // href: element.country,
        class: "grey-text text-darken-2",
        id: name,
        style: "display: block;"
      }).append(
        $("<ul>", {
          class: "collection with-header z-depth-3",
          style: "border-radius : 5px"
        }).append([
          $("<li>", {
            class: "collection-header"
          }).append($("<h6>").html(name + "\n" + emoji + "\t")),
          $("<li>", {
            class: "collection-item",
            style: colors.cases
          }).append(
            $("<div>", {
              class: "grey-text text-lighten-4 "
            })
              .html(element.cases)
              .append(
                $("<div>", {
                  class: "secondary-content grey-text text-lighten-4"
                }).html("الحالات ")
              )
          ),
          $("<li>", {
            class: "collection-item ",
            style: colors.todayCases
          }).append(
            $("<div>", {
              class: "grey-text text-lighten-4"
            })
              .html(element.todayCases)
              .append(
                $("<div>", {
                  class: "secondary-content grey-text text-lighten-4"
                }).html("حالات اليوم")
              )
          ),
          $("<li>", {
            class: "collection-item ",
            style: colors.recovered
          }).append(
            $("<div>", {
              class: "grey-text text-lighten-4"
            })
              .html(element.recovered)
              .append(
                $("<div>", {
                  class: "secondary-content grey-text text-lighten-4"
                }).html("المتعافين ")
              )
          ),
          $("<li>", {
            class: "collection-item ",
            style: colors.critical
          }).append(
            $("<div>", {
              class: "grey-text text-lighten-4"
            })
              .html(element.critical)
              .append(
                $("<div>", {
                  class: "secondary-content grey-text text-lighten-4"
                }).html("حالات حرجة ")
              )
          ),
          $("<li>", {
            class: "collection-item",
            style: colors.deaths
          }).append(
            $("<div>", {
              class: "grey-text text-lighten-4"
            })
              .html(element.deaths)
              .append(
                $("<div>", {
                  class: "secondary-content grey-text text-lighten-4"
                }).html("الوفيات ")
              )
          ),
          $("<li>", {
            class: "collection-item ",
            style: colors.todayDeaths
          }).append(
            $("<div>", {
              class: "grey-text text-lighten-4"
            })
              .html(element.todayDeaths)
              .append(
                $("<div>", {
                  class: "secondary-content grey-text text-lighten-4"
                }).html("وفيات اليوم ")
              )
          )
        ])
      )
    )
  );
}

function createResultCard(name, emoji, element) {
  console.log(element);

  $("#result").empty();
  $("#result").append(
    $("<div>", { class: "col s8 push-s2" }).append(
      $("<a>", {
        // href: element.country,
        class: "grey-text text-darken-2",
        id: name,
        style: "display: block;"
      }).append(
        $("<ul>", {
          class: "collection with-header z-depth-4",
          style: "border-radius : 5px"
        }).append([
          $("<li>", {
            class: "collection-header"
          }).append($("<h6>").html(name)),
          $("<li>", {
            class: "collection-item",
            style: colors.cases
          }).append(
            $("<div>", {
              class: "grey-text text-lighten-4 "
            })
              .html(element.cases)
              .append(
                $("<div>", {
                  class: "secondary-content grey-text text-lighten-4"
                }).html("الحالات ")
              )
          ),
          $("<li>", {
            class: "collection-item ",
            style: colors.todayCases
          }).append(
            $("<div>", {
              class: "grey-text text-lighten-4"
            })
              .html(element.todayCases)
              .append(
                $("<div>", {
                  class: "secondary-content grey-text text-lighten-4"
                }).html("حالات اليوم")
              )
          ),
          $("<li>", {
            class: "collection-item ",
            style: colors.recovered
          }).append(
            $("<div>", {
              class: "grey-text text-lighten-4"
            })
              .html(element.recovered)
              .append(
                $("<div>", {
                  class: "secondary-content grey-text text-lighten-4"
                }).html("المتعافين ")
              )
          ),
          $("<li>", {
            class: "collection-item ",
            style: colors.critical
          }).append(
            $("<div>", {
              class: "grey-text text-lighten-4"
            })
              .html(element.critical)
              .append(
                $("<div>", {
                  class: "secondary-content grey-text text-lighten-4"
                }).html("حالات حرجة ")
              )
          ),
          $("<li>", {
            class: "collection-item",
            style: colors.deaths
          }).append(
            $("<div>", {
              class: "grey-text text-lighten-4"
            })
              .html(element.deaths)
              .append(
                $("<div>", {
                  class: "secondary-content grey-text text-lighten-4"
                }).html("الوفيات ")
              )
          ),
          $("<li>", {
            class: "collection-item ",
            style: colors.todayDeaths
          }).append(
            $("<div>", {
              class: "grey-text text-lighten-4"
            })
              .html(element.todayDeaths)
              .append(
                $("<div>", {
                  class: "secondary-content grey-text text-lighten-4"
                }).html("وفيات اليوم ")
              )
          )
        ])
      )
    )
  );
}

function addRow() {
  col = 1;
  row++;
  $("#list").append($("<div>", { class: "row", id: "row" + row }));
}

/////////////////////
