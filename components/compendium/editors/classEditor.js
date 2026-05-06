function createClassEditor(data) {
  var editor = document.createElement("form");
  editor.className = "c20-form";
  editor.style.margin = "20px 0 30px 0";

  editor.appendChild(createTextInput({ name: "name", title: "Feature", value: data.name, required: true }));
  editor.appendChild(
    createTextInput({ name: "groupName", title: "Class", value: data?.groupName ?? "", required: true }),
  );
  editor.appendChild(createTextInput({ name: "level", title: "Level", value: data.level, required: true }));
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
  editor.appendChild(createHiddenInput({ name: "type", value: data.type }));
  if (data.id !== undefined) editor.appendChild(createHiddenInput({ name: "id", value: data.id }));

  return editor;
}

function createSubclassEditor(data) {
  var editor = document.createElement("form");
  editor.className = "c20-form";
  editor.style.margin = "20px 0 30px 0";

  editor.appendChild(createTextInput({ name: "name", title: "Feature", value: data.name, required: true }));
  editor.appendChild(
    createTextInput({ name: "className", title: "Class", value: data?.className ?? "", required: true }),
  );
  editor.appendChild(
    createTextInput({ name: "subclassName", title: "Subclass", value: data?.subclassName ?? "", required: true }),
  );
  editor.appendChild(createTextInput({ name: "level", title: "Level", value: data.level, required: true }));
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
  editor.appendChild(createHiddenInput({ name: "type", value: data.type }));
  if (data.id !== undefined) editor.appendChild(createHiddenInput({ name: "id", value: data.id }));

  return editor;
}
