var Attacks = (function () {
  function processInput(event) {
    if (event.target.name === "attr_dmgmod") updateDamageModifier(event);
    else if (event.target.name === "attr_atk_desc") updateAttackDescription(event);
  }

  function updateAttackDescription(event) {
    var roll20Item = getInventoryItem(event);
    if (!roll20Item) return;

    var itemMods = getItemModifiers(roll20Item);

    var found = false;
    for (var i = 0; i < itemMods.length; i++) {
      if (itemMods[i].startsWith("Attack Description")) {
        if (event.target.value) itemMods[i] = "Attack Description: " + event.target.value;
        else itemMods.splice(i, 1);

        found = true;
        break;
      }
    }

    if (!found) itemMods.push("Attack Description: " + event.target.value);
    updateItemModifiers(roll20Item, itemMods);
  }

  function updateDamageModifier(event) {
    var roll20Item = getInventoryItem(event);
    if (!roll20Item) return;

    var magicmod = event.target.closest(".options").querySelector("input[name='attr_atkmagic']").value;
    if (magicmod) return;

    var itemMods = getItemModifiers(roll20Item);
    var attack_type_regex = /(?:^|,)\s*Item Type: (Melee|Ranged) Weapon(?:,|$)/i;
    var attack_type_results = attack_type_regex.exec(itemMods.join(","));
    var atktype = attack_type_results ? attack_type_results[1] : "";

    var damagemod_found = false;
    for (var i = 0; i < itemMods.length; i++) {
      if (itemMods[i].match(/^(Weapon|Melee|Ranged) Damage[:]?\s([+-]?\d+)$/)) {
        damagemod_found = true;
        if (event.target.value !== 0) itemMods[i] = atktype + " Damage " + event.target.value;
        else itemMods.splice(i, 1);

        break;
      }
    }

    if (!damagemod_found) itemMods.push(atktype + " Damage " + event.target.value);

    setTimeout(() => {
      updateItemModifiers(roll20Item, itemMods);
    }, 1000);
  }

  function getInventoryItem(event) {
    var itemId = event.target.closest(".repitem")?.querySelector('input[name="attr_itemid"]')?.value;
    return document.querySelector(`.page .equipment .complex .repitem[data-reprowid="${itemId}" i]`);
  }

  function getItemModifiers(roll20Item) {
    var itemMods = roll20Item.querySelector("input[name='attr_itemmodifiers']").value;
    if (itemMods) itemMods = itemMods.split(",");
    else itemMods = [];

    return itemMods;
  }

  function updateItemModifiers(roll20Item, itemMods) {
    var input = roll20Item.querySelector("input[name='attr_itemmodifiers']");
    itemMods = itemMods.join(",");
    if (input && input.value !== itemMods) {
      input.value = itemMods;
      input.dispatchEvent(new Event("blur"));
    }
  }

  var Attacks = {
    init: function init() {
      document.querySelector(".page .attacks .repcontainer").addEventListener("change", processInput);

      Array.from(document.querySelectorAll(".page .attacks .repcontainer input[name='attr_dmgmod']"))
        ?.filter((x) => x.value)
        ?.forEach((x) => updateDamageModifier({ target: x }));

      Array.from(document.querySelectorAll(".page .attacks .repcontainer textarea[name='attr_atk_desc']"))
        ?.filter((x) => x.value)
        ?.forEach((x) => updateDamageModifier({ target: x }));
    },
  };
  return Attacks;
})();
