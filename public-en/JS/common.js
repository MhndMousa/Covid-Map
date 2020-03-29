function getSideNav() {
  $("#slide-out").append([
    $("<li>").append(
      $("<div>", { class: "user-view" }).append([
        $("<div>", { class: "background grey darken-2" }),
        $("<span>", { class: "white-text name" }).html("Last Updated"),
        $("<span>", { id: "email", class: "white-text" })
      ])
    ),
    $("<li>").append(
      $("<a>", { class: "waves-effect", href: "index.html" })
        .html("Interactive Map")
        .append($("<i>", { class: "material-icons" }).html("map"))
    ),
    $("<li>").append(
      $("<a>", { class: "waves-effect", href: "countries.html" })
        .html("Countries List")
        .append($("<i>", { class: "material-icons" }).html("list"))
    ),

    $("<li>").append($("<div>", { class: "divider" })),
    $("<li>").append($("<a>", { class: "subheader" }).html("Languages")),
    $("<li>").append(
      $("<a>", {
        class: "waves-effect dropdown-trigger",
        "data-target": "dropdown1"
      })
        .html("English")
        .append(
          $("<i>", { class: "material-icons right" }).html("arrow_drop_down")
        )
    ),
    $("<ul>", { id: "dropdown1", class: "dropdown-content" }).append(
      $("<li>").append($("<a>", { href: "http://covid-map.app" }).html("عربي")),
      $("<li>").append(
        $("<a>", { href: "http://en.covid-map.app" }).html("English")
      ),
      $("<li>").append(
        $("<a>", { href: "http://es.covid-map.app" }).html("Español")
      ),
      $("<li>").append(
        $("<a>", { href: "http://fr.covid-map.app" }).html("Frencè")
      )
    ),
    $("<li>").append($("<div>", { class: "divider" })),
    $("<li>").append($("<a>", { class: "subheader" }).html("Refrences")),
    $("<li>").append(
      $("<a>", { href: "https://www.worldometers.info/coronavirus" }).html(
        "World meters"
      )
    ),
    $("<li>").append(
      $("<a>", { href: "https://github.com/novelcovid/api" }).html("NovelCOVID")
    ),
    $("<li>").append(
      $("<a>", { href: "https://github.com/CSSEGISandData/COVID-19" }).html(
        "Johns Hopkins CSSE"
      )
    ),

    $("<li>").append($("<div>", { class: "divider" })),
    $("<li>").append(
      $("<a>", { class: "subheader" }).html("Developed by Muhannad ☕️")
    ),
    $("<li>").append(
      $("<a>", { href: "https://twitter.com/mhndmousa" }).html("Twitter"),
      $("<a>", { href: "https://github.com/mhndmousa" }).html("Github")
    )
  ]);
}
getSideNav();
