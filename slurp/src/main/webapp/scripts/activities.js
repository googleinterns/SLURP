function fetchAndDisplayActivities() {
  const url = window.location.href;
  const urlParams = parseUrl(url);
  const tripId = urlParams["tripid"];

  db.collection(TRIP_COLLECTION).doc(tripId)
    .collection(ACTIVITY_COLLECTION).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc){
        console.log(doc.id, doc.data());
      });
    }).catch( function(error) {
      console.log("Error getting trip details for tripId " + tripId);
    });
}

function makeDropdown(title, content, location) {
  const element = document.getElementById(location);

  const randomId = getRandomUuid();

  var newButton = document.createElement("button");
  newButton.innerHTML = title;
  newButton.setAttribute("data-toggle", "collapse");
  newButton.setAttribute("data-parent", "#"+location);
  newButton.setAttribute("href", "#"+randomId);
  newButton.setAttribute("aria-expanded", "false");

  var newDropdownContent = document.createElement("div");
  newDropdownContent.innerHTML = content;
  newDropdownContent.classList.add("collapse");
  newDropdownContent.setAttribute("tabindex", 0);
  newDropdownContent.id = randomId;

  element.appendChild(newButton);
  element.appendChild(newDropdownContent);

  console.log(element.childNodes);
}