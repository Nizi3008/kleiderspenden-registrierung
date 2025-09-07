document.addEventListener("DOMContentLoaded", () => {
  // Zugriff auf die Buttons und Collapse Elemente
  const btnShop = document.getElementById("btnShop");
  const btnAbholung = document.getElementById("btnAbholung");
  const collapseShop = new bootstrap.Collapse(
    document.getElementById("formularShop"),
    { toggle: false }
  );

  const collapseAbholung = new bootstrap.Collapse(
    document.getElementById("formularAbholung"),
    { toggle: false }
  );

  // Shop Button klick
  document.getElementById("btnShop").addEventListener("click", () => {
    collapseAbholung.hide();
    collapseShop.toggle();
  });

  // Abholung Button klick
  document.getElementById("btnAbholung").addEventListener("click", () => {
    collapseShop.hide();
    collapseAbholung.toggle();
  });

  // Formular-Abholung Submit abfangen
  const formularAbholung = document.querySelector("#formularAbholung form");

  formularAbholung.addEventListener("submit", function (event) {
    event.preventDefault();
    // Verhindert Standard-Formular-Abschicken

    const adresse = document.getElementById("adresse").value.trim();
    const plz = document.getElementById("plz").value.trim();
    const ort = document.getElementById("ort").value.trim();
    const spendenartAbholung =
      document.getElementById("spendenartAbholung").value;
    const krisenregionAbholung = document.getElementById(
      "krisenregionAbholung"
    ).value;

    // PLZ-Prüfung: Startet mit "83"
    if (plz.substring(0, 2) === "83") {
      // PLZ passt -> Bestätigungsseite anzeigen
      showConfirmationAbholung(
        adresse,
        plz,
        ort,
        spendenartAbholung,
        krisenregionAbholung
      );
    } else {
      // PLZ passt nicht -> Fehlermeldung anzeigen
      alert(
        "Du wohnst außerhalb der Abholregion. Bitte nur Postleitzahlen mit 83... eintragen!"
      );
    }
  });

  function showConfirmationAbholung(
    adresse,
    plz,
    ort,
    spendenartAbholung,
    krisenregionAbholung
  ) {
    const now = new Date();
    const dateTimeString = now.toLocaleString("de-DE", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Bestätigungs-HTML-Block Abholung
    const confirmationHtml = `
        <div class="alert alert-success">
          <h3>Registrierung erfolgreich!</h3>
          <p>Vielen Dank für deine Registrierung zur Abholung durch unser Sammelfahrzeug.</p>
          <p><strong>Adresse:</strong> ${adresse}</p>
          <p><strong>Postleitzahl:</strong> ${plz}</p>
          <p><strong>Ort:</strong> ${ort}</p>
          <p><strong>Spendenart:</strong> ${spendenartAbholung}</p>
          <p><strong>Krisenregion:</strong> ${krisenregionAbholung}</p>
          <p><strong>Datum & Uhrzeit:</strong> ${dateTimeString}</p>
        </div>
      `;
    document.querySelector("main.container").innerHTML = confirmationHtml;
  }

  // Formular- Shop Submit abfangen
  const formularShop = document.querySelector("#formularShop form");
  formularShop.addEventListener("submit", function (event) {
    event.preventDefault();

    const spendenartShop = document.getElementById("spendenartShop").value;
    const krisenregionShop = document.getElementById("krisenregionShop").value;

    showConfirmationShop(spendenartShop, krisenregionShop);
  });
  function showConfirmationShop(spendenartShop, krisenregionShop) {
    const now = new Date();
    const dateTimeString = now.toLocaleString("de-DE", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Bestätigungs-HTML-Block Shop
    const confirmationHtml = `
          <div class="alert alert-success">
            <h3>Registrierung erfolgreich!</h3>
            <p>Vielen Dank für deine Registrierung in unserer Geschäftsstelle</p>
            <p><strong>Ort:</strong> Geschäftsstelle Rosenheim</p>
            <p><strong>Spendenart:</strong> ${spendenartShop}</p>
            <p><strong>Krisenregion:</strong> ${krisenregionShop}</p>
            <p><strong>Datum & Uhrzeit:</strong> ${dateTimeString}</p>
          </div>
        `;
    document.querySelector("main.container").innerHTML = confirmationHtml;
  }
});
