function createConditionsEditor(data) {
  var editor = document.createElement("form");
  editor.className = "c20-form";
  editor.style.margin = "20px 0 30px 0";

  editor.appendChild(
    createTextInput({ name: "groupName", title: "Group Name", value: data?.groupName ?? "", required: false }),
  );
  editor.appendChild(createTextInput({ name: "name", title: "Name", value: data.name, required: true }));
  editor.appendChild(createTextInput({ name: "source", title: "Source", value: data.source, required: false }));
  editor.appendChild(
    createTextAreaInput({
      name: "description",
      title: "Description",
      value: data.description,
      required: false,
      height: 320,
    }),
  );
  editor.appendChild(
    createTextArray({ name: "short[]", title: "Short Description", values: data.short, required: false }),
  );
  editor.appendChild(createHiddenInput({ name: "type", value: data.type }));
  if (data.id !== undefined) editor.appendChild(createHiddenInput({ name: "id", value: data.id }));

  return editor;
}
