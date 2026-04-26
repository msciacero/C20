function createTabContainer(data) {
  var tabContainer = document.createElement("div");
  tabContainer.className = "c20-tab-container";

  // Create tab buttons
  var tabButtons = document.createElement("div");
  tabButtons.className = "c20-tab-buttons";

  // Create tab content panels
  var tabContent = document.createElement("div");
  tabContent.className = "c20-tab-content";

  // Create tabs from data array
  data.forEach(function (item, index) {
    // Create tab button
    var button = document.createElement("button");
    button.className = "c20-tab-button";
    if (index === 0) button.classList.add("active");
    button.textContent = item.name;
    //button.setAttribute("data-tab-index", index);

    // Create tab content panel
    var panel = document.createElement("div");
    panel.className = "c20-tab-panel";
    if (index === 0) panel.classList.add("active");
    //panel.setAttribute("data-tab-index", index);
    panel.appendChild(item.data);

    // Add click handler to button
    button.addEventListener("click", function (event) {
      event.preventDefault();
      // Remove active class from all buttons and panels
      var allButtons = tabButtons.querySelectorAll(".c20-tab-button");
      var allPanels = tabContent.querySelectorAll(".c20-tab-panel");
      allButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      allPanels.forEach(function (pnl) {
        pnl.classList.remove("active");
      });

      // Add active class to clicked button and corresponding panel
      button.classList.add("active");
      panel.classList.add("active");
    });

    tabButtons.appendChild(button);
    tabContent.appendChild(panel);
  });

  tabContainer.appendChild(tabButtons);
  tabContainer.appendChild(tabContent);

  return tabContainer;
}
