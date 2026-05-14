function levelEvent() {
  var observer = new MutationObserver(async (mutationsList, _) => {
    var settings = await StorageHelper.getItem(StorageHelper.dbNames.characters, window.character_id, "settings");
    if (settings.spellView) {
      document.querySelectorAll(".spell-container .repcontainer .spell").forEach((s) => Spells.updateSpellRow(s));
    }
  });

  const targetNode = document.querySelector(".charactersheet > input[name='attr_level']"); // Or any other DOM element
  const config = {
    attributes: true, // Observe additions/removals of child nodes
  };

  observer.observe(targetNode, config);
}

async function init5e() {
  window.campaign_id = window.location.href.split("/")[5];
  window.character_id = window.location.href.split("/")[6];

  await StorageHelper.initCharacter();
  await CharacterSettings.init();

  var settings = await StorageHelper.getItem(StorageHelper.dbNames.characters, window.character_id, "settings");

  if (settings.defenses) Defenses.init();
  if (settings.conditionCompendium !== "off") Conditions.init();
  if (settings.spellFilter) Spells.initFilter();
  if (settings.spellView) Spells.initUi();
  Traits.init();
  //MiniNotes.init();
  CompendiumImport.init();
  Inventory.init();
  Attacks.init();
  levelEvent();
}

waitForElement(".sheetform").then(() => {
  if (
    window.getComputedStyle(document.querySelector(".container.pc .header"))?.backgroundImage ===
    'url("https://app.roll20.net/images/dndstyling/CharScroll.svg")'
  )
    init5e();
});
