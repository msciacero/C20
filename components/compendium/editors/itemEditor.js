function createItemEditor(data) {
  var editor = document.createElement("form");
  editor.className = "c20-form";
  editor.style.margin = "20px 0 30px 0";

  editor.appendChild(createTextInput({ name: "name", title: "Name", value: data.name, required: true }));
  editor.appendChild(createTextInput({ name: "source", title: "Source", value: data.source, required: false }));

  var itemGroup = document.createElement("div");
  itemGroup.className = "c20-col-4";

  itemGroup.appendChild(
    createSelectInput({
      name: "mod_Item_Type",
      title: "Type",
      value: data.mod_Item_Type,
      required: false,
      options: [
        { name: "Ammunition", value: "Ammunition" },
        { name: "Light Armor", value: "Light Armor" },
        { name: "Medium Armor", value: "Medium Armor" },
        { name: "Heavy Armor", value: "Heavy Armor" },
        { name: "Melee Weapon", value: "Melee Weapon" },
        { name: "Ranged Weapon", value: "Ranged Weapon" },
        { name: "Shield", value: "Shield" },
      ],
    }),
  );
  itemGroup.appendChild(createTextInput({ name: "count", title: "Quantity", value: data.count, required: true }));
  itemGroup.appendChild(createTextInput({ name: "weight", title: "Weight", value: data.weight, placeHolder: "1" }));
  itemGroup.appendChild(createTextInput({ name: "cost", title: "Cost", value: data.cost, placeHolder: "20g" }));
  editor.appendChild(itemGroup);

  editor.appendChild(
    createRadioInputGroup({
      title: "Magical",
      name: "propV_magical",
      options: [
        { value: "", name: "No" },
        { value: "Yes", name: "Yes" },
        { value: "Requires Attunement", name: "Attunement" },
      ],
      selectedValue: data.propV_magical,
      inline: true,
    }),
  );

  editor.appendChild(createCheckboxInput({ name: "isResource", title: "Create Resource", value: data.isResource }));

  editor.appendChild(
    createTextAreaInput({
      name: "description",
      title: "Description",
      value: data.description,
      required: false,
      height: 180,
    }),
  );

  var abilities = document.createElement("div");
  abilities.appendChild(createAbilityProperties(data));
  abilities.appendChild(createSaveProperties(data));
  abilities.appendChild(createSkillProperties(data));

  var heavyArmsNote = document.createElement("div");
  heavyArmsNote.style.fontStyle = "italic";
  heavyArmsNote.style.marginBottom = "10px";
  heavyArmsNote.textContent = "This is only for tracking upgrades. It does not modify item stats.";

  var heavyArms = document.createElement("div");
  heavyArms.appendChild(heavyArmsNote);
  heavyArms.appendChild(createArmorerArmorProperties(data));
  heavyArms.appendChild(createArmorerWeaponProperties(data));
  heavyArms.appendChild(createArmorerMaterialsProperties(data));
  heavyArms.appendChild(createArmorerStatusProperties(data));

  editor.appendChild(
    createTabContainer([
      { name: "Abilities", data: abilities },
      { name: "Armor", data: createArmorProperties(data) },
      { name: "Spell", data: createSpellProperties(data) },
      { name: "Weapon", data: createWeaponProperties(data) },
      { name: "Heavy Arms", data: heavyArms },
    ]),
  );

  if (data.id !== undefined) editor.appendChild(createHiddenInput({ name: "id", value: data.id }));

  return editor;
}

function createArmorProperties(data) {
  var armorGroup = document.createElement("div");
  armorGroup.id = "editor-armor-group";
  armorGroup.style.display = "block";

  var armorProps = document.createElement("div");
  armorProps.className = "c20-col-2";

  armorProps.appendChild(
    createTextInput({
      name: "mod_AC",
      title: "AC",
      value: data.mod_AC,
      placeHolder: "12",
    }),
  );

  var stealth = createCheckboxInput({
    name: "modV_StealthDisadvantage",
    title: "Stealth Disadvantage",
    value: data.modV_StealthDisadvantage,
  });
  stealth.style.marginTop = "22px";
  armorProps.appendChild(stealth);
  armorGroup.appendChild(armorProps);
  return armorGroup;
}

function createAbilityProperties(data) {
  var abilityGroup = document.createElement("div");
  abilityGroup.id = "editor-ability-group";
  abilityGroup.style.display = "block";

  var abilityContainer = document.createElement("div");
  abilityContainer.style.marginBottom = "20px";

  data?.abilities?.forEach((v, i) => {
    abilityContainer.appendChild(createAbilityInput({ ability: v.ability, type: v.type, value: v.value }));
  });

  var addBtn = createAddButton();
  addBtn.addEventListener("click", function (event) {
    event.preventDefault();
    addBtn.before(
      createAbilityInput({
        ability: "",
        type: "",
        value: "",
      }),
    );
  });

  abilityContainer.appendChild(addBtn);
  abilityGroup.appendChild(abilityContainer);

  var legend = document.createElement("legend");
  legend.textContent = "Ability Score Modifiers";

  var fieldSet = document.createElement("fieldset");
  fieldSet.appendChild(legend);
  fieldSet.appendChild(abilityGroup);
  return fieldSet;
}

function createSkillProperties(data) {
  var abilityGroup = document.createElement("div");
  abilityGroup.id = "editor-ability-group";
  abilityGroup.style.display = "block";

  var abilityContainer = document.createElement("div");
  abilityContainer.style.marginBottom = "20px";

  data?.skills?.forEach((v) => {
    abilityContainer.appendChild(createSkillInput({ ability: v.ability, value: v.value }));
  });

  var addBtn = createAddButton();
  addBtn.addEventListener("click", function (event) {
    event.preventDefault();
    addBtn.before(createSkillInput({ ability: "", value: "" }));
  });

  abilityContainer.appendChild(addBtn);
  abilityGroup.appendChild(abilityContainer);

  var legend = document.createElement("legend");
  legend.textContent = "Skill Modifiers";

  var fieldSet = document.createElement("fieldset");
  fieldSet.appendChild(legend);
  fieldSet.appendChild(abilityGroup);
  return fieldSet;
}

function createSaveProperties(data) {
  var abilityGroup = document.createElement("div");
  abilityGroup.id = "editor-ability-group";
  abilityGroup.style.display = "block";

  var abilityContainer = document.createElement("div");
  abilityContainer.style.marginBottom = "20px";

  data?.saves?.forEach((v) => {
    abilityContainer.appendChild(createSaveInput({ ability: v.ability, value: v.value }));
  });

  var addBtn = createAddButton();
  addBtn.addEventListener("click", function (event) {
    event.preventDefault();
    addBtn.before(createSaveInput({ ability: "", value: "" }));
  });

  abilityContainer.appendChild(addBtn);
  abilityGroup.appendChild(abilityContainer);

  var legend = document.createElement("legend");
  legend.textContent = "Saving Throw Modifiers";

  var fieldSet = document.createElement("fieldset");
  fieldSet.appendChild(legend);
  fieldSet.appendChild(abilityGroup);
  return fieldSet;
}

function createSpellProperties(data) {
  var spellGroup = document.createElement("div");
  spellGroup.id = "editor-spell-group";

  var columnGroup = document.createElement("div");
  columnGroup.className = "c20-col-2";

  columnGroup.appendChild(
    createTextInput({
      name: "modV_Spell_Attack",
      title: "Spell Attack Modifier",
      value: data.modV_Spell_Attack,
    }),
  );

  columnGroup.appendChild(
    createTextInput({
      name: "modV_Spell_DC",
      title: "Spell DC Modifier",
      value: data.modV_Spell_DC,
    }),
  );

  spellGroup.appendChild(columnGroup);

  return spellGroup;
}

function createWeaponProperties(data) {
  var weaponGroup = document.createElement("div");
  weaponGroup.id = "editor-weapon-group";
  weaponGroup.style.display = "block";

  weaponGroup.appendChild(
    createRadioInputGroup({
      title: "",
      name: "propV_Weapon_Type",
      options: [
        { value: "Simple", name: "Simple" },
        { value: "Martial", name: "Martial" },
      ],
      selectedValue: data.propV_Weapon_Type,
      inline: true,
    }),
  );

  weaponGroup.appendChild(
    createRadioInputGroup({
      title: "",
      name: "propV_hands",
      options: [
        { value: "", name: "One-Handed" },
        { value: "Versatile", name: "Versatile" },
        { value: "Two-Handed", name: "Two-Handed" },
      ],
      selectedValue: data.propV_hands,
      inline: true,
    }),
  );

  weaponGroup.appendChild(
    createRadioInputGroup({
      title: "",
      name: "propV_size",
      options: [
        { value: "Light", name: "Light" },
        { value: "", name: "Medium" },
        { value: "Heavy", name: "Heavy" },
      ],
      selectedValue: data.propV_size,
      inline: true,
    }),
  );

  var attackProps = document.createElement("div");
  attackProps.style.margin = "10px 0";
  attackProps.className = "c20-col-4";
  attackProps.appendChild(
    createCheckboxInput({ name: "prop_Ammunition", title: "Ammunition", value: data.prop_Ammunition }),
  );
  attackProps.appendChild(createCheckboxInput({ name: "prop_Finesse", title: "Finesse", value: data.prop_Finesse }));
  attackProps.appendChild(createCheckboxInput({ name: "prop_Loading", title: "Loading", value: data.prop_Loading }));
  attackProps.appendChild(createCheckboxInput({ name: "prop_Reach", title: "Reach", value: data.prop_Reach }));
  attackProps.appendChild(createCheckboxInput({ name: "prop_Silvered", title: "Silvered", value: data.prop_Silvered }));
  attackProps.appendChild(createCheckboxInput({ name: "prop_Special", title: "Special", value: data.prop_Special }));
  attackProps.appendChild(createCheckboxInput({ name: "prop_Thrown", title: "Thrown", value: data.prop_Thrown }));

  weaponGroup.appendChild(attackProps);

  // attacks
  var attackPrimaryGroup = document.createElement("div");
  attackPrimaryGroup.className = "c20-col-2";

  attackPrimaryGroup.appendChild(
    createTextInput({ name: "mod_Damage", title: "Damage", value: data.mod_Damage, placeHolder: "1d8" }),
  );
  attackPrimaryGroup.appendChild(
    createTextInput({
      name: "mod_Damage_Type",
      title: "Damage Type",
      value: data.mod_Damage_Type,
      placeHolder: "Slashing",
    }),
  );

  attackPrimaryGroup.appendChild(
    createTextInput({
      name: "mod_Secondary_Damage",
      title: "Secondary Damage",
      value: data.mod_Secondary_Damage,
      placeHolder: "1d6",
    }),
  );
  attackPrimaryGroup.appendChild(
    createTextInput({
      name: "mod_Secondary_Damage_Type",
      title: "Secondary Damage Type",
      value: data.mod_Secondary_Damage_Type,
      placeHolder: "Fire",
    }),
  );

  weaponGroup.appendChild(attackPrimaryGroup);

  var attackSecondaryGroup = document.createElement("div");
  attackSecondaryGroup.className = "c20-col-2";
  attackSecondaryGroup.appendChild(
    createTextInput({
      name: "mod_Alternate_Damage",
      title: "Two-Handed Damage",
      value: data.mod_Alternate_Damage,
      placeHolder: "1d10",
    }),
  );
  attackSecondaryGroup.appendChild(
    createTextInput({
      name: "mod_Alternate_Damage_Type",
      title: "Two-Handed Damage Type",
      value: data.mod_Alternate_Damage_Type,
      placeHolder: "Slashing",
    }),
  );
  attackSecondaryGroup.appendChild(
    createTextInput({
      name: "mod_Alternate_Secondary_Damage",
      title: "Two-Handed Secondary Damage",
      value: data.mod_Alternate_Secondary_Damage,
      placeHolder: "1d6",
    }),
  );
  attackSecondaryGroup.appendChild(
    createTextInput({
      name: "mod_Alternate_Secondary_Damage_Type",
      title: "Two-Handed Secondary Damage Type",
      value: data.mod_Alternate_Secondary_Damage_Type,
      placeHolder: "Fire",
    }),
  );

  weaponGroup.appendChild(attackSecondaryGroup);

  var rangeGroup = document.createElement("div");
  rangeGroup.className = "c20-col-2";

  rangeGroup.appendChild(
    createTextInput({
      name: "mod_Range",
      title: "Range",
      value: data.mod_Range,
      placeHolder: "150/600",
    }),
  );

  rangeGroup.appendChild(
    createTextInput({
      name: "mod_Critical_Range",
      title: "Critical Range",
      value: data.mod_Critical_Range,
      placeHolder: "20",
    }),
  );

  rangeGroup.appendChild(
    createTextInput({
      name: "modV_Weapon_Attacks",
      title: "Attack Modifier",
      value: data.modV_Weapon_Attacks,
    }),
  );

  rangeGroup.appendChild(
    createTextInput({
      name: "modV_Weapon_Damage",
      title: "Damage Modifier",
      value: data.modV_Weapon_Damage,
    }),
  );

  weaponGroup.appendChild(rangeGroup);

  weaponGroup.appendChild(
    createTextAreaInput({
      name: "mod_Attack_Description",
      title: "Attack Description",
      value: data.mod_Attack_Description,
      height: 60,
    }),
  );

  if (data.propV_hands !== "Versatile") attackSecondaryGroup.style.display = "none";

  weaponGroup.childNodes[1].addEventListener("change", function (event) {
    if (event.target.value === "Versatile") attackSecondaryGroup.style.display = "grid";
    else attackSecondaryGroup.style.display = "none";
  });

  return weaponGroup;
}

function createArmorerArmorProperties(data) {
  // armorers handbook
  var armorGuide = document.createElement("div");
  armorGuide.id = "editor-armorers-armor-group";

  var proofing = createRadioInputGroup({
    title: "",
    name: "propV_HAA_Proofing",
    options: [
      { value: "", name: "No Armor Proofing" },
      { value: "1st", name: "1st Tier" },
      { value: "2nd", name: "2nd Tier" },
      { value: "3rd", name: "3rd Tier" },
    ],
    selectedValue: data.propV_HAA_Proofing,
    inline: true,
  });
  proofing.style.marginBottom = "10px";
  armorGuide.appendChild(proofing);

  var armorBoxes = document.createElement("div");
  armorBoxes.className = "c20-col-3";

  armorBoxes.appendChild(
    createCheckboxInput({ name: "prop_HAA_Breathable", title: "Breathable", value: data.prop_HAA_Breathable }),
  );
  armorBoxes.appendChild(
    createCheckboxInput({ name: "prop_HAA_Burnished", title: "Burnished", value: data.prop_HAA_Burnished }),
  );
  armorBoxes.appendChild(
    createCheckboxInput({
      name: "prop_HAA_Climbing_Harness",
      title: "Climbing Harness",
      value: data.prop_HAA_Climbing_Harness,
    }),
  );
  armorBoxes.appendChild(
    createCheckboxInput({ name: "prop_HAA_Decorated", title: "Decorated", value: data.prop_HAA_Decorated }),
  );
  armorBoxes.appendChild(
    createCheckboxInput({ name: "prop_HAA_Insulated", title: "Insulated", value: data.prop_HAA_Insulated }),
  );
  armorBoxes.appendChild(
    createCheckboxInput({ name: "prop_HAA_Locking", title: "Locking joints", value: data.prop_HAA_Locking }),
  );
  armorBoxes.appendChild(
    createCheckboxInput({ name: "prop_HAA_Muffled", title: "Muffled", value: data.prop_HAA_Muffled }),
  );
  armorBoxes.appendChild(
    createCheckboxInput({
      name: "prop_HAA_Quick_Release",
      title: "Quick-release clasps",
      value: data.prop_HAA_Quick_Release,
    }),
  );
  armorBoxes.appendChild(
    createCheckboxInput({ name: "prop_HAA_Reinforced", title: "Reinforced", value: data.prop_HAA_Reinforced }),
  );
  armorBoxes.appendChild(createCheckboxInput({ name: "prop_HAA_Runic", title: "Runic", value: data.prop_HAA_Runic }));
  armorBoxes.appendChild(
    createCheckboxInput({ name: "prop_HAA_Spiked", title: "Spiked", value: data.prop_HAA_Spiked }),
  );
  armorGuide.appendChild(armorBoxes);

  var legend = document.createElement("legend");
  legend.textContent = "The Complete Armorer's Handbook (Armor)";

  var fieldSet = document.createElement("fieldset");
  fieldSet.appendChild(legend);
  fieldSet.appendChild(armorGuide);
  return fieldSet;
}

function createArmorerWeaponProperties(data) {
  var weaponGuide = document.createElement("div");
  weaponGuide.id = "editor-armorers-weapon-group";
  weaponGuide.className = "c20-col-3";

  var weaponTier1 = document.createElement("div");
  var weaponTier1Title = document.createElement("div");
  weaponTier1Title.textContent = "Tier 1";
  weaponTier1.appendChild(weaponTier1Title);
  weaponTier1.appendChild(
    createCheckboxInput({ name: "prop_HAW_Balanced", title: "Balanced", value: data.prop_HAW_Balanced }),
  );
  weaponTier1.appendChild(
    createCheckboxInput({ name: "prop_HAW_Critical", title: "Critical", value: data.prop_HAW_Critical }),
  );
  weaponTier1.appendChild(createCheckboxInput({ name: "prop_HAW_Runic", title: "Runic", value: data.prop_HAW_Runic }));
  weaponTier1.appendChild(
    createCheckboxInput({ name: "prop_HAW_Silvered", title: "Silvered", value: data.prop_HAW_Silvered }),
  );
  weaponTier1.appendChild(
    createCheckboxInput({ name: "prop_HAW_Wounding", title: "Wounding", value: data.prop_HAW_Wounding }),
  );
  weaponGuide.appendChild(weaponTier1);

  var weaponTier2 = document.createElement("div");
  var weaponTier2Title = document.createElement("div");
  weaponTier2Title.textContent = "Tier 2";
  weaponTier2.appendChild(weaponTier2Title);
  weaponTier2.appendChild(
    createCheckboxInput({ name: "prop_HAW_Brutal", title: "Brutal", value: data.prop_HAW_Brutal }),
  );
  weaponTier2.appendChild(
    createCheckboxInput({ name: "prop_HAW_Enchanted", title: "Enchanted", value: data.prop_HAW_Enchanted }),
  );
  weaponTier2.appendChild(
    createCheckboxInput({ name: "prop_HAW_Flanged", title: "Flanged", value: data.prop_HAW_Flanged }),
  );
  weaponTier2.appendChild(
    createCheckboxInput({ name: "prop_HAW_Magical", title: "Magical", value: data.prop_HAW_Magical }),
  );
  weaponTier2.appendChild(
    createCheckboxInput({ name: "prop_HAW_Sawtooth", title: "Saw-toothed", value: data.prop_HAW_Sawtooth }),
  );
  weaponTier2.appendChild(
    createCheckboxInput({ name: "prop_HAW_Superior", title: "Superior", value: data.prop_HAW_Superior }),
  );
  weaponGuide.appendChild(weaponTier2);

  var weaponTier3 = document.createElement("div");
  var weaponTier3Title = document.createElement("div");
  weaponTier3Title.textContent = "Tier 3";
  weaponTier3.appendChild(weaponTier3Title);
  weaponTier3.appendChild(
    createCheckboxInput({ name: "prop_HAW_Arcane", title: "Arcane", value: data.prop_HAW_Arcane }),
  );
  weaponTier3.appendChild(
    createCheckboxInput({ name: "prop_HAW_Masterwork", title: "Masterwork", value: data.prop_HAW_Masterwork }),
  );
  weaponGuide.appendChild(weaponTier3);

  var legend = document.createElement("legend");
  legend.textContent = "The Complete Armorer's Handbook (Weapon)";

  var fieldSet = document.createElement("fieldset");
  fieldSet.appendChild(legend);
  fieldSet.appendChild(weaponGuide);
  return fieldSet;
}

function createArmorerMaterialsProperties(data) {
  // armorers handbook
  var armorGuide = document.createElement("div");
  armorGuide.id = "editor-armorers-material-group";

  var armorBoxes = document.createElement("div");
  armorBoxes.className = "c20-col-3";

  armorBoxes.appendChild(
    createCheckboxInput({ name: "prop_HAM_Adamantine", title: "Adamantine", value: data.prop_HAM_Adamantine }),
  );
  armorBoxes.appendChild(
    createCheckboxInput({ name: "prop_HAM_Cold_Iron", title: "Cold Iron", value: data.prop_HAM_Cold_Iron }),
  );
  armorBoxes.appendChild(
    createCheckboxInput({ name: "prop_HAM_Darkwood", title: "Darkwood", value: data.prop_HAM_Darkwood }),
  );
  armorBoxes.appendChild(
    createCheckboxInput({ name: "prop_HAM_Deep_Crystal", title: "Deep Crystal", value: data.prop_HAM_Deep_Crystal }),
  );
  armorBoxes.appendChild(
    createCheckboxInput({ name: "prop_HAM_Dragonhide", title: "Dragonhide", value: data.prop_HAM_Dragonhide }),
  );
  armorBoxes.appendChild(
    createCheckboxInput({ name: "prop_HAM_Ironwood", title: "Ironwood", value: data.prop_HAM_Ironwood }),
  );
  armorBoxes.appendChild(
    createCheckboxInput({ name: "prop_HAM_Mithral", title: "Mithral", value: data.prop_HAM_Mithral }),
  );
  armorBoxes.appendChild(
    createCheckboxInput({ name: "prop_HAM_Shadowsilk", title: "Shadowsilk", value: data.prop_HAM_Shadowsilk }),
  );

  armorGuide.appendChild(armorBoxes);

  var legend = document.createElement("legend");
  legend.textContent = "The Complete Armorer's Handbook (Materials)";

  var fieldSet = document.createElement("fieldset");
  fieldSet.appendChild(legend);
  fieldSet.appendChild(armorGuide);
  return fieldSet;
}

function createArmorerStatusProperties(data) {
  // armorers handbook
  var armorGuide = document.createElement("div");
  armorGuide.id = "editor-armorers-status-group";

  var proofing = createRadioInputGroup({
    title: "",
    name: "propV_HAS_Status",
    options: [
      { value: "", name: "No Damage" },
      { value: "Worn", name: "Worn/Sundered" },
      { value: "Damaged", name: "Damaged" },
      { value: "Broken", name: "Broken" },
    ],
    selectedValue: data.propV_HAS_Status,
    inline: true,
  });
  proofing.style.marginBottom = "10px";
  armorGuide.appendChild(proofing);

  armorGuide.appendChild(
    createSelectInput({
      name: "propV_HAS_Rune",
      title: "Rune",
      value: data.propV_HAS_Rune,
      options: [
        { name: "Alchemist", value: "Alchemist" },
        { name: "Arrow-Catcher", value: "Arrow-Catcher" },
        { name: "Bastion", value: "Bastion" },
        { name: "Blood Weapon", value: "Blood Weapon" },
        { name: "Bound Armor", value: "Bound Armor" },
        { name: "Bound weapon", value: "Bound weapon" },
        { name: "Cat", value: "Cat" },
        { name: "Chalice", value: "Chalice" },
        { name: "Chaos", value: "Chaos" },
        { name: "Daywalker", value: "Daywalker" },
        { name: "Death", value: "Death" },
        { name: "Displacement", value: "Displacement" },
        { name: "Dragonbane", value: "Dragonbane" },
        { name: "Earthshaker", value: "Earthshaker" },
        { name: "Elemental Shield", value: "Elemental Shield" },
        { name: "Featherfood", value: "Featherfood" },
        { name: "Force of Will", value: "Force of Will" },
        { name: "Giant Slayer", value: "Giant Slayer" },
        { name: "Hunt", value: "Hunt" },
        { name: "Journey", value: "Journey" },
        { name: "Knock", value: "Knock" },
        { name: "Magebane", value: "Magebane" },
        { name: "Mariner", value: "Mariner" },
        { name: "Mark/Recall", value: "Mark/Recall" },
        { name: "Mime", value: "Mime" },
        { name: "Nondetection", value: "Nondetection" },
        { name: "Overshield", value: "Overshield" },
        { name: "Phoenix", value: "Phoenix" },
        { name: "Retribution", value: "Retribution" },
        { name: "Serpent", value: "Serpent" },
        { name: "Soultrap", value: "Soultrap" },
        { name: "Superconductor", value: "Superconductor" },
        { name: "Tempest", value: "Tempest" },
        { name: "Thief", value: "Thief" },
        { name: "Volant", value: "Volant" },
        { name: "Warmage", value: "Warmage" },
        { name: "Warrior", value: "Warrior" },
        { name: "Wolfsbane", value: "Wolfsbane" },
      ],
    }),
  );

  var legend = document.createElement("legend");
  legend.textContent = "The Complete Armorer's Handbook (Status)";

  var fieldSet = document.createElement("fieldset");
  fieldSet.appendChild(legend);
  fieldSet.appendChild(armorGuide);
  return fieldSet;
}

function createAbilityInput({ ability, type, value }) {
  var group = document.createElement("div");
  group.className = "c20-col-3";

  group.appendChild(
    createSelectInput({
      name: "abilities[]",
      title: "Ability",
      value: ability,
      required: true,
      options: [
        { name: "Strength", value: "Strength" },
        { name: "Dexterity", value: "Dexterity" },
        { name: "Constitution", value: "Constitution" },
        { name: "Intelligence", value: "Intelligence" },
        { name: "Wisdom", value: "Wisdom" },
        { name: "Charisma", value: "Charisma" },
      ],
    }),
  );

  group.appendChild(
    createSelectInput({
      name: "abilities_type[]",
      title: "Modification Type",
      value: type,
      required: true,
      options: [
        { name: "Increase", value: "Increase" },
        { name: "Set", value: "Set" },
      ],
    }),
  );

  var textGroup = document.createElement("div");
  textGroup.appendChild(
    createTextInput({
      name: "abilities_value[]",
      title: "Value",
      value: value,
      required: true,
    }),
  );

  var btn = document.createElement("button");
  btn.style.float = "right";
  btn.textContent = "Delete";
  btn.addEventListener("click", function () {
    group.remove();
  });

  textGroup.appendChild(btn);
  group.appendChild(textGroup);
  return group;
}

function createSkillInput({ ability = "", value = "" } = {}) {
  var group = document.createElement("div");
  group.className = "c20-col-2";

  group.appendChild(
    createSelectInput({
      name: "skills[]",
      title: "Ability",
      value: ability,
      required: true,
      options: [
        { name: "All Abilities", value: "Ability Checks" },
        { name: "Acrobatics", value: "Acrobatics" },
        { name: "Animal Handling", value: "Animal Handling" },
        { name: "Arcana", value: "Arcana" },
        { name: "Athletics", value: "Athletics" },
        { name: "Deception", value: "Deception" },
        { name: "History", value: "History" },
        { name: "Insight", value: "Insight" },
        { name: "Intimidation", value: "Intimidation" },
        { name: "Investigation", value: "Investigation" },
        { name: "Medicine", value: "Medicine" },
        { name: "Nature", value: "Nature" },
        { name: "Perception", value: "Perception" },
        { name: "Performance", value: "Performance" },
        { name: "Persuasion", value: "Persuasion" },
        { name: "Religion", value: "Religion" },
        { name: "Sleight of Hand", value: "Sleight of Hand" },
        { name: "Stealth", value: "Stealth" },
        { name: "Survival", value: "Survival" },
      ],
    }),
  );

  var textGroup = document.createElement("div");
  textGroup.appendChild(
    createTextInput({
      name: "skills_value[]",
      title: "Value",
      value: value,
      required: true,
    }),
  );

  var btn = document.createElement("button");
  btn.style.float = "right";
  btn.textContent = "Delete";
  btn.addEventListener("click", function () {
    group.remove();
  });

  textGroup.appendChild(btn);
  group.appendChild(textGroup);
  return group;
}

function createSaveInput({ ability = "", value = "" } = {}) {
  var group = document.createElement("div");
  group.className = "c20-col-2";

  group.appendChild(
    createSelectInput({
      name: "saves[]",
      title: "Saving Throw",
      value: ability,
      required: true,
      options: [
        { name: "All Saves", value: "Saving Throws" },
        { name: "Strength", value: "Strength Save" },
        { name: "Dexterity", value: "Dexterity Save" },
        { name: "Constitution", value: "Constitution Save" },
        { name: "Intelligence", value: "Intelligence Save" },
        { name: "Wisdom", value: "Wisdom Save" },
        { name: "Charisma", value: "Charisma Save" },
      ],
    }),
  );

  var textGroup = document.createElement("div");
  textGroup.appendChild(
    createTextInput({
      name: "saves_value[]",
      title: "Value",
      value: value,
      required: true,
    }),
  );

  var btn = document.createElement("button");
  btn.style.float = "right";
  btn.textContent = "Delete";
  btn.addEventListener("click", function () {
    group.remove();
  });

  textGroup.appendChild(btn);
  group.appendChild(textGroup);
  return group;
}

function constructItemAbilityData(formData) {
  // Reconstruct abilities array from separate field arrays
  if (formData.abilities && formData.abilities_type && formData.abilities_value) {
    formData.abilities = formData.abilities.map((ability, index) => ({
      ability: ability,
      type: formData.abilities_type[index],
      value: formData.abilities_value[index],
    }));
    delete formData.abilities_type;
    delete formData.abilities_value;
  }

  // Reconstruct skills array from separate field arrays
  if (formData.skills && formData.skills_value) {
    formData.skills = formData.skills.map((ability, index) => ({
      ability: ability,
      value: formData.skills_value[index],
    }));
    delete formData.skills_value;
  }

  // Reconstruct saves array from separate field arrays
  if (formData.saves && formData.saves_value) {
    formData.saves = formData.saves.map((ability, index) => ({
      ability: ability,
      value: formData.saves_value[index],
    }));
    delete formData.saves_value;
  }

  return formData;
}
