function makeTable(stats) {
  // console.log(stats);

  $(".container").append(
    $("<table>", {
      class: "z-depth-1 responsive-table striped centered"
    }).append(
      $("<thead>", { class: "z-depth-2" }).append(
        $("<tr>").append(
          $("<th>").append(
            $("<a>", { href: "#", class: "grey-text text-darken-2" }).html(
              "Country"
            )
          ),
          $("<th>").append(
            $("<a>", { href: "#", class: "grey-text text-darken-2" }).html(
              "Active"
            )
          ),
          $("<th>").append(
            $("<a>", { href: "#", class: "grey-text text-darken-2" }).html(
              "Cases"
            )
          ),
          $("<th>").append(
            $("<a>", { href: "#", class: "grey-text text-darken-2" }).html(
              "Recovered"
            )
          ),
          $("<th>").append(
            $("<a>", { href: "#", class: "grey-text text-darken-2" }).html(
              "Deaths"
            )
          ),
          $("<th>").append(
            $("<a>", { href: "#", class: "grey-text text-darken-2" }).html(
              "Critical"
            )
          ),
          $("<th>").append(
            $("<a>", { href: "#", class: "grey-text text-darken-2" }).html(
              "Today's Cases"
            )
          ),
          $("<th>").append(
            $("<a>", { href: "#", class: "grey-text text-darken-2" }).html(
              "Today Deaths"
            )
          ),
          $("<th>").append(
            $("<a>", { href: "#", class: "grey-text text-darken-2" }).html(
              "Cases Per One Million"
            )
          )
        )
      ),
      $("<tbody>", { id: "table-body" })
    )
  );
  populateTableWith(stats);
}

function populateTableWith(stats) {
  stats.forEach(element => {
    console.log(element);
    $("#table-body").append(
      $("<tr>").append(
        $("<td>", {
          class: "grey-text text-darken-4",
          style: colors.country
        }).html(element.country),
        $("<td>", {
          class: "grey-text text-darken-4",
          style: colors.active
        }).html(element.active.toLocaleString()),
        $("<td>", {
          class: "grey-text text-darken-4",
          style: colors.cases
        }).html(element.cases.toLocaleString()),
        $("<td>", {
          class: "grey-text text-darken-4",
          style: colors.recovered
        }).html(element.recovered.toLocaleString()),
        $("<td>", {
          class: "grey-text text-darken-4",
          style: colors.deaths
        }).html(element.deaths.toLocaleString()),
        $("<td>", {
          class: "grey-text text-darken-4",
          style: colors.critical
        }).html(element.critical.toLocaleString()),
        $("<td>", {
          class: "grey-text text-darken-4",
          style: colors.todayCases
        }).html(element.todayCases.toLocaleString()),
        $("<td>", {
          class: "grey-text text-darken-4",
          style: colors.todayDeaths
        }).html(element.todayDeaths.toLocaleString()),
        $("<td>", {
          class: "grey-text text-darken-4",
          style: colors.casesPerOneMillion
        }).html(element.casesPerOneMillion.toLocaleString())
      )
    );
  });
}

ref = window.location.href.split("/");
alert(ref[ref.length - 2]);
fetch("https://corona.lmao.ninja/countries")
  .then(data => data.json())
  .then(data => {
    makeTable(data);
  });
