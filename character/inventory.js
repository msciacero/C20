var Inventory = (function () {
  function createUi(e) {
    if (e.target.classList.contains("inventorysubflag") && e.target.checked) {
      e.target.checked = false;
      var itemId = e.target.parentElement.parentElement.getAttribute("data-reprowid");
      var itemData = getItemData(itemId);

      var wrapper = document.createElement("div");
      wrapper.className = "item-editor-wrapper";
      wrapper.setAttribute("data-itemid", itemId);
      wrapper.appendChild(createItemEditor(itemData));

      new ModalHelper("Inventory Item", wrapper, function () {
        // on close, save data back to item
        var itemId = wrapper.getAttribute("data-itemid");
        var form = wrapper.querySelector("form");
        var formData = new FormData(form);
        var itemData = {};

        for (const [key, value] of formData.entries()) {
          if (key.endsWith("[]")) {
            const arrayKey = key.slice(0, -2); // Remove '[]'
            if (!itemData[arrayKey]) {
              itemData[arrayKey] = [];
            }
            itemData[arrayKey].push(value);
          } else if (key === "id") {
            itemData[key] = Number(value);
          } else {
            itemData[key] = value;
          }
        }

        updateItemData(itemId, itemData);
      });
    }
  }

  function getItemData(itemId) {
    var itemRow = document.querySelector(`.repcontainer .repitem[data-reprowid="${itemId}"] .item`);
    var data = {
      name: itemRow.querySelector('input[name="attr_itemname"]').value,
      count: itemRow.querySelector('input[name="attr_itemcount"]').value,
      weight: itemRow.querySelector('input[name="attr_itemweight"]').value,
      isResource: itemRow.querySelector('input[name="attr_useasresource"]').checked,
      description: itemRow.querySelector('textarea[name="attr_itemcontent"]').value,
    };

    var propertiesStr = itemRow.querySelector('input[name="attr_itemproperties"]').value;
    var props = propertiesStr
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x);

    var modifiersStr = itemRow.querySelector('input[name="attr_itemmodifiers"]').value;
    var mods = modifiersStr
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x);

    // Parse properties back to data fields
    props.forEach(function (prop) {
      if (prop === "Magical") {
        data.propV_magical = "Yes";
      } else if (prop === "Magical (Attunement)") {
        data.propV_magical = "Attunement";
      } else if (prop === "Simple" || prop === "Martial") {
        data.propV_Weapon_Type = prop;
      } else if (prop === "Two-Handed" || prop === "Versatile") {
        data.propV_hands = prop;
      } else if (prop === "Light" || prop === "Heavy") {
        data.propV_size = prop;
      } else if (prop.startsWith("Source: ")) {
        data.source = prop.substring(8);
      } else if (prop.startsWith("Cost: ")) {
        data.cost = prop.substring(6);
      } else if (prop.match(/^(.+) Tier Armor Proofing$/)) {
        data.propV_Proofing = RegExp.$1;
      } else if (prop.match(/^(.+) Rune$/)) {
        data.propV_Rune = RegExp.$1;
      } else {
        // For other properties like Versatile, Finesse, etc.
        var key = "prop_" + prop.replace(/\s+/g, "_");
        data[key] = true;
      }
    });

    // Parse modifiers back to data fields
    mods.forEach(function (mod) {
      if (mod === "Stealth:Disadvantage") {
        data.modV_StealthDisadvantage = "on";
      } else if (mod.match(/^Spell Attack ([+-]\d+)$/)) {
        data.modV_Spell_Attack = parseInt(RegExp.$1);
      } else if (mod.match(/^Spell DC ([+-]\d+)$/)) {
        data.modV_Spell_DC = parseInt(RegExp.$1);
      } else if (mod.match(/^Weapon Attacks ([+-]\d+)$/)) {
        data.modV_Weapon_Attacks = parseInt(RegExp.$1);
      } else if (mod.match(/^Weapon Damage ([+-]\d+)$/)) {
        data.modV_Weapon_Damage = parseInt(RegExp.$1);
      } else if (mod.match(/^([A-Z][a-z]+) ([+-]\d+)$/)) {
        var ability = RegExp.$1;
        var value = parseInt(RegExp.$2);
        if (["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"].includes(ability)) {
          if (!data.saves) data.saves = [];
          data.saves.push({ ability: ability, value: value });
        } else {
          if (!data.skills) data.skills = [];
          data.skills.push({ ability: ability, value: value });
        }
      } else if (mod.match(/^([A-Z][a-z]+): (\d+)$/)) {
        var ability = RegExp.$1;
        var value = parseInt(RegExp.$2);
        if (!data.abilities) data.abilities = [];
        data.abilities.push({ type: "set", ability: ability, value: value });
      } else {
        // For other modifiers
        var kv = mod.split(":").map((x) => x.trim());
        var key = "mod_" + kv[0].replace(/\s+/g, "_");
        data[key] = kv[1];
      }
    });

    // fill in missing fields with defaults
    if (!data.propV_magical) data.propV_magical = "";
    if (data.propV_Weapon_Type) {
      if (!data.propV_hands) data.propV_hands = "";
      if (!data.propV_size) data.propV_size = "";
    }

    return data;
  }

  function updateItemData(itemId, itemData) {
    // Properties (Versatile, Finesse, Thrown, heavy arms)
    var props = [];
    Object.keys(itemData)
      .filter((x) => x.indexOf("prop_") === 0 && itemData[x])
      .forEach((x) => {
        props.push(x.substring(5).replaceAll("_", " "));
      });

    if (itemData.propV_magical === "Yes") props.push("Magical");
    else if (itemData.propV_magical === "Attunement") props.push("Magical (Attunement)");

    if (itemData.propV_hands) props.push(itemData.propV_hands);
    if (itemData.propV_size) props.push(itemData.propV_size);
    if (itemData.propV_Proofing) props.push(itemData.propV_Proofing + " Tier Armor Proofing");
    if (itemData.propV_Status) props.push(itemData.propV_Status);
    if (itemData.propV_Rune) props.push(itemData.propV_Rune + " Rune");
    if (itemData.propV_Weapon_Type) props.push(itemData.propV_Weapon_Type);
    if (itemData.source) props.push("Source: " + itemData.source);
    if (itemData.cost) props.push("Cost: " + itemData.cost);

    // modifiers
    var mods = [];
    Object.keys(itemData)
      .filter((x) => x.indexOf("mod_") === 0 && itemData[x])
      .forEach((x) => {
        mods.push(x.substring(4).replaceAll("_", " ") + ": " + itemData[x]);
      });

    if (itemData.modV_StealthDisadvantage) mods.push("Stealth:Disadvantage");
    if (itemData.modV_Spell_Attack) mods.push("Spell Attack " + getSignedString(itemData.modV_Spell_Attack));
    if (itemData.modV_Spell_DC) mods.push("Spell DC " + getSignedString(itemData.modV_Spell_DC));
    if (itemData.modV_Weapon_Attacks) mods.push("Weapon Attacks " + getSignedString(itemData.modV_Weapon_Attacks));
    if (itemData.modV_Weapon_Damage) mods.push("Weapon Damage " + getSignedString(itemData.modV_Weapon_Damage));

    itemData.abilities?.forEach((ability) => {
      if (ability.type === "increase") mods.push(ability.ability + " " + getSignedString(ability.value));
      else if (ability.type === "set") mods.push(ability.ability + ": " + ability.value);
    });

    itemData.skills?.forEach((skill) => {
      mods.push(skill.ability + " " + getSignedString(skill.value));
    });

    itemData.saves?.forEach((save) => {
      mods.push(save.ability + " " + getSignedString(save.value));
    });

    // populate item fields
    var roll20Item = document.querySelector(
      `.equipment .complex .repcontainer .repitem[data-reprowid="${itemId}"] .item`,
    );
    updateInput(roll20Item, 'input[name="attr_itemname"]', itemData.name);
    if (itemData.count) updateInput(roll20Item, 'input[name="attr_itemcount"]', itemData.count);
    if (itemData.weight) updateInput(roll20Item, 'input[name="attr_itemweight"]', itemData.weight);
    if (itemData.isResource) updateCheckbox(roll20Item, 'input[name="attr_useasresource"]', itemData.isResource);
    if (itemData.mod_Damage) updateCheckbox(roll20Item, 'input[name="attr_hasattack"]', itemData.mod_Damage);
    updateTextArea(roll20Item, 'textarea[name="attr_itemcontent"]', itemData.description);

    updateInput(roll20Item, 'input[name="attr_itemproperties"]', props.join(", "));
    updateInput(roll20Item, 'input[name="attr_itemmodifiers"]', mods.join(", "));
  }

  function updateInput(element, query, value) {
    var input = element.querySelector(query);
    if (input && value) {
      input.value = value;
      input.dispatchEvent(new Event("blur"));
    }
  }

  function updateCheckbox(element, query, value) {
    var checkbox = element.querySelector(query);
    if (checkbox) {
      checkbox.checked = !value;
      checkbox.click();
    }
  }

  function updateTextArea(element, query, value) {
    var textArea = element.querySelector(query);
    if (textArea && value) {
      textArea.value = value;
      textArea.dispatchEvent(new Event("blur"));
    }
  }

  function getSignedString(n) {
    return (n < 0 ? "" : "+") + n;
  }

  var Inventory = {
    init: async function init() {
      document.querySelector(".page .equipment .complex").addEventListener("click", createUi);
    },
    remove: function remove() {
      document.removeEventListener("click", createUi);
    },
  };
  return Inventory;
})();
