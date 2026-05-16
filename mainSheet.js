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
  if (settings.traitView) Traits.init();
  //MiniNotes.init();
  CompendiumImport.init();
  if (settings.itemView) Inventory.init();
  Attacks.init();
  levelEvent();
}

var dnd2014Image = [
  'url("https://app.roll20.net/images/dndstyling/CharScroll.svg")',
  'url("https://storage.googleapis.com/char-sheet-app-images-6e101411/D%26D5e/images/darkmode/CharScroll_dm.svg")',
];

waitForElement(".sheetform").then(() => {
  if (dnd2014Image.includes(window.getComputedStyle(document.querySelector(".container.pc .header"))?.backgroundImage))
    init5e();
});
