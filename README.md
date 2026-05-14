# C20

C20 is a browser extension for Roll20. It adds a number of features that allows you to customize your game and 5e character sheet.

## App Features

- Additional journal actions for players (hide, filter, sort, and folder management)
- Custom Compendium
  - Ability to create new compendiums for custom content
  - Drag and drop ability that mimics manually updating character sheet
  - Does not work with Charactermancer

## DnD 2014 Character Sheet Features

- Defense section to track resistance, immunity, and vulnerability.
- Conditions tracking, similar to exhaustion tracking but broader.
- Custom spell table layout.
- Spell list filter.
- Item editor UI.
- Inventory tweaks. Can specify different color for magical items and add dividers.
- Added limited markdown support to Features & Traits (bold, italic, list, tables)

## 3rd Party Libraries

- expr-eval (https://github.com/silentmatt/expr-eval) - Calculate roll20 dice formulas
- FontAwesome Icons (https://fontawesome.com/) - Filter icon on spell tab
- idb (https://github.com/jakearchibald/idb) - async indexeddb helper
- Intrinsical's D&D 5e Icon Set by David Kor Kian Wei (https://github.com/intrinsical/tw-dnd/tree/main/icons) - Shield icon for defenses
- Sortable.js by RubaXa & owenm (https://github.com/SortableJS/Sortable) - Custom journal drag & drop
- uFuzzy (https://github.com/leeoniya/uFuzzy) - Custom compendium search filter

## Wish List

- Compendium: Species, Monsters, Features, Groupings (Type/Name|GroupName), category search filter
- Mini Notes: rebuild with nested accordion groups (parent/child)
- Move styles to css
- Language support

## Known Issues

Versatile Weapons:

- 5e sheet only creates one/two handed attacks on items loaded through API
- 5e sheet does not synch items with multiple attacks
