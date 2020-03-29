function getSideNav() {
  $("#slide-out").append([
    $("<li>").append(
      $("<div>", { class: "user-view" }).append([
        $("<div>", { class: "background grey darken-2" }),
        $("<span>", { class: "white-text name" }).html("اخر تحديث"),
        $("<span>", { id: "email", class: "white-text" }).html("none")
      ])
    ),
    $("<li>").append(
      $("<a>", { class: "waves-effect", href: "index.html" })
        .html("خريطة تفاعلية")
        .append($("<i>", { class: "material-icons" }).html("map"))
    ),
    $("<li>").append(
      $("<a>", { class: "waves-effect", href: "countries.html" })
        .html("لستة البلدان")
        .append($("<i>", { class: "material-icons" }).html("list"))
    ),

    $("<li>").append($("<div>", { class: "divider" })),
    $("<li>").append($("<a>", { class: "subheader" }).html("اللغات")),
    $("<li>").append(
      $("<a>", {
        class: "waves-effect dropdown-trigger",
        "data-target": "dropdown1"
      })
        .html("عربي")
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
    $("<li>").append($("<a>", { class: "subheader" }).html("المصادر")),
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
    $("<li>").append($("<a>", { class: "subheader" }).html("مين المطور؟")),
    $("<li>").append(
      $("<a>", { href: "https://twitter.com/mhndmousa" }).html("تويتر"),
      $("<a>", { href: "https://github.com/mhndmousa" }).html("قت هب")
    )
  ]);
}

getSideNav();

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
