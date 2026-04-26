function createSpellEditor(data) {
  var editor = document.createElement("form");
  editor.className = "c20-form";
  editor.style.margin = "20px 0 30px 0";

  editor.appendChild(createTextInput({ name: "name", title: "Name", value: data.name, required: true }));
  editor.appendChild(
    createSelectInput({
      name: "level",
      title: "Level",
      value: data.level,
      required: true,
      options: [
        { name: "Cantrip", value: "cantrip" },
        { name: "1st", value: "1" },
        { name: "2nd", value: "2" },
        { name: "3rd", value: "3" },
        { name: "4th", value: "4" },
        { name: "5th", value: "5" },
        { name: "6th", value: "6" },
        { name: "7th", value: "7" },
        { name: "8th", value: "8" },
        { name: "9th", value: "9" },
      ],
    }),
  );
  editor.appendChild(
    createSelectInput({
      name: "school",
      title: "School",
      value: data.school,
      required: true,
      options: [
        { name: "Abjuration", value: "abjuration" },
        { name: "Conjuration", value: "conjuration" },
        { name: "Divination", value: "divination" },
        { name: "Enchantment", value: "enchantment" },
        { name: "Evocation", value: "evocation" },
        { name: "Illusion", value: "illusion" },
        { name: "Necromancy", value: "necromancy" },
        { name: "Transmutation", value: "transmutation" },
      ],
    }),
  );
  editor.appendChild(createTextInput({ name: "time", title: "Casting Time", value: data.time, required: true }));
  editor.appendChild(createTextInput({ name: "range", title: "Range/Area", value: data.range, required: false }));
  editor.appendChild(createTextInput({ name: "duration", title: "Duration", value: data.duration, required: false }));
  editor.appendChild(
    createSelectInput({
      name: "savingThrow",
      title: "Saving Throw",
      value: data.savingThrow ?? "",
      required: false,
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

  editor.appendChild(
    createTextInput({ name: "savingEffect", title: "Saving Effect", value: data.savingEffect, required: false }),
  );

  editor.appendChild(
    createCheckboxInput({
      name: "concentration",
      title: "Concentration",
      value: data.concentration,
      required: false,
    }),
  );
  editor.appendChild(createCheckboxInput({ name: "ritual", title: "Ritual", value: data.ritual, required: false }));

  editor.appendChild(createCheckboxInput({ name: "verbal", title: "Verbal", value: data.verbal, required: false }));
  editor.appendChild(createCheckboxInput({ name: "somatic", title: "Somatic", value: data.somatic, required: false }));
  editor.appendChild(
    createCheckboxInput({ name: "material", title: "Material", value: data.material, required: false }),
  );

  editor.appendChild(
    createTextInput({ name: "materials", title: "Materials", value: data.materials, required: false }),
  );

  editor.appendChild(
    createSelectInput({
      name: "attack",
      title: "Attack",
      value: data.attack,
      required: true,
      options: [
        { name: "None", value: "None" },
        { name: "Melee", value: "Melee" },
        { name: "Ranged", value: "Ranged" },
      ],
    }),
  );
  editor.appendChild(createTextInput({ name: "healing", title: "Healing", value: data.healing, required: false }));
  editor.appendChild(createTextInput({ name: "damageRoll", title: "Damage", value: data.damageRoll, required: false }));
  editor.appendChild(
    createTextInput({ name: "damageType", title: "Damage Type/Effect", value: data.damageType, required: false }),
  );
  editor.appendChild(
    createCheckboxInput({
      name: "abilityModifier",
      title: "Add Ability Modifier to Damage/Healing",
      value: data.abilityModifier,
      required: false,
    }),
  );

  editor.appendChild(
    createTextAreaInput({ name: "description", title: "Description", value: data.description, required: false }),
  );

  editor.appendChild(
    createTextAreaInput({
      name: "higherLevels",
      title: "At Higher Levels",
      value: data.higherLevels,
      required: false,
    }),
  );

  editor.appendChild(
    createTextInput({ name: "higherRoll", title: "Higher Level Roll", value: data.higherRoll, required: false }),
  );

  editor.appendChild(createTextInput({ name: "source", title: "Source", value: data.source, required: false }));
  editor.appendChild(createHiddenInput({ name: "type", value: data.type }));

  editor.childNodes[18].style.marginBottom = "10px";
  if (data.id !== undefined) editor.appendChild(createHiddenInput({ name: "id", value: data.id }));
  if (data.savingThrow === "") editor.childNodes[7].childNodes[1].disabled = true;
  if (data.material === false || data.material === undefined) editor.childNodes[13].childNodes[1].disabled = true;

  editor.childNodes[6].addEventListener("change", function (event) {
    editor.childNodes[7].childNodes[1].disabled = event.target.value === "";
  });

  editor.childNodes[12].addEventListener("change", function (event) {
    editor.childNodes[13].childNodes[1].disabled = !event.target.checked;
  });

  return editor;
}
