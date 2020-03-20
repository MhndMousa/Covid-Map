function animationActivate() {
  $("#slide-out-button").sidenav({
    menuWidth: 330,
    draggable: true,
    closeOnClick: true
  });

  // $(".dropdown-button").dropdown({
  //   belowOrigin: true // Displays dropdown below the button
  // });

  // $("ul.tabs").tabs();
  // $(".collapsible").collapsible();

  // $(".modal").modal({
  //   dismissible: true, // Modal can be dismissed by clicking outside of the modal
  //   opacity: 0.5, // Opacity of modal background
  //   inDuration: 300, // Transition in duration
  //   outDuration: 200, // Transition out duration
  //   startingTop: "4%", // Starting top style attribute
  //   endingTop: "10%" // Ending top style attribute
  //   //   ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
  //   //     alert("Ready");
  //   //     console.log(modal, trigger);
  //   //   },
  //   //   complete: function() { alert('Closed'); } // Callback for Modal close
  // });
}
function getNav() {
  $("mheader").append(
    $("<nav>", { class: "nav white" }).append([
      $("<div>", { class: "nav-wrapper " }).append(
        // Logo Picture
        $("<a>", { href: "#", class: "center brand-logo red-text" }).html(
          "Covid 19"
        )
      )
    ])
  );
}

var row = 0;
var col = 0;
var colors = {
  text: "grey-text ",
  primary: "amber darken-3 ",
  textAccent: "text-lighten-1 ",
  textAccentHeader: "text-lighten-4 "
};

var coutnryStats = {};
var countries = {};
var emojis = {};

function edgeCases(c) {
  //   console.log(c);

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
            let emoji = emojis.find(
              a => edgeCases(a.name) == edgeCases(element.name)
            );
            createResultCard(
              e,
              emoji.emoji || "",
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

    fetch("/Asset/countries-emoji.json")
      .then(data => data.json())
      .then(data => {
        emojis = data;
      });

    fetch("https://corona.lmao.ninja/countries")
      .then(resp => resp.json())
      .then(data => {
        coutnryStats = data;
        populate();
      });
  });

function populate() {
  console.log(coutnryStats);

  for (let i = 0; i < coutnryStats.length; i++) {
    const e = coutnryStats[i];
    //   console.log(row, col, e.country);
    let element = countries.find(a => edgeCases(a.name) == e.country);
    var emoji = emojis.find(a => edgeCases(a.name) == e.country);

    if (element == undefined || emoji == undefined) {
      continue;
    }
    let name = element.namear || element.name;
    emoji = emoji.emoji || "";
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
        href: element.country,
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
          }).append($("<h6>").html(name + "\n" + emoji + "\t")),
          $("<li>", {
            class: "collection-item",
            style: "background :gray"
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
            style: "background :rgba(50, 50,50, 0.7)"
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
            style: "background :rgba(250, 0, 0, 0.7)"
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
            style: "background :rgba(250, 30, 0, 0.7)"
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
            style: "background :rgba(180, 30, 0, 0.7)"
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
          ),
          $("<li>", {
            class: "collection-item ",
            style: "background :rgba(0, 150, 150, 0.7)"
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
    $("<div>", { class: "col l8 push-l2" }).append(
      $("<a>", {
        // href: element.country,
        class: "grey-text text-darken-2 waves-effect",
        id: name
      }).append(
        $("<ul>", {
          class: "collection with-header z-depth-4",
          style: "border-radius : 5px"
        }).append([
          $("<li>", {
            class: "collection-header"
          }).append($("<h6>").html(name + "\n" + emoji + "\t")),
          $("<li>", {
            class: "collection-item",
            style: "background :gray"
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
            style: "background :rgba(50, 50,50, 0.7)"
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
            style: "background :rgba(250, 0, 0, 0.7)"
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
            style: "background :rgba(250, 30, 0, 0.7)"
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
            style: "background :rgba(180, 30, 0, 0.7)"
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
          ),
          $("<li>", {
            class: "collection-item ",
            style: "background :rgba(0, 150, 150, 0.7)"
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
