function fetchAndDisplayActivities() {
  const url = window.location.href;
  urlParams = parseUrl(url);
  console.log(urlParams);
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