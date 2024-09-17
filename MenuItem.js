// MenuItem.js
export class MenuItem {
  constructor(name, action = null, subItems = []) {
    this.name = name;
    this.action = action; // Function to execute when the item is selected
    this.subItems = subItems; // Array of MenuItem instances
  }
}
