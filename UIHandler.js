// UIHandler.js
import { GameState } from './GameState.js';

export class UIHandler {
  constructor() {
    this.gameState = new GameState();

    // UI Elements
    this.menuElement = document.getElementById('menu');
    this.statsElement = document.getElementById('stats');
    this.policiesElement = document.getElementById('policies');
    this.notificationArea = document.getElementById('notification-area');

    // State for keyboard and mouse navigation
    this.selectedItemIndex = 0;

    // Initial rendering
    this.renderMenu();
    this.updateDataBoxes();
  }

  renderMenu() {
    this.menuElement.innerHTML = '';
    const fragment = document.createDocumentFragment();

    this.gameState.currentMenu.forEach((menuItem, index) => {
      const div = document.createElement('div');
      div.textContent = menuItem.name;
      div.className = 'menu-item';
      div.setAttribute('role', 'menuitem');
      div.setAttribute('tabindex', '0');
      if (index === this.selectedItemIndex) {
        div.classList.add('selected');
        div.focus();
      }

      // Event Listeners for Point-and-Click Controls
      div.addEventListener('click', () => this.selectMenuItem(index));
      div.addEventListener('mouseover', () => this.highlightMenuItem(index));

      fragment.appendChild(div);
    });

    this.menuElement.appendChild(fragment);
    this.scrollToSelectedItem();
  }

  selectMenuItem(index) {
    this.selectedItemIndex = index; // Update selected index
    const selectedItem = this.gameState.currentMenu[index];

    if (selectedItem.action) {
      selectedItem.action();
    }

    if (selectedItem.subItems && selectedItem.subItems.length > 0) {
      this.gameState.menuStack.push(this.gameState.currentMenu);
      this.gameState.currentMenu = selectedItem.subItems;
      this.selectedItemIndex = 0;
      this.renderMenu();
    } else {
      this.updateDataBoxes();
    }
  }

  highlightMenuItem(index) {
    this.selectedItemIndex = index; // Update selected index
    this.renderMenu(); // Re-render menu to update highlighting
  }

  scrollToSelectedItem() {
    const selectedElement = this.menuElement.querySelector('.selected');
    if (selectedElement) {
      selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  updateDataBoxes() {
    if (this.gameState.handlingEvents) {
      // Display events (if any)
      this.statsElement.innerHTML = `<h3>Events in ${this.gameState.country.name} (${this.gameState.country.year})</h3>`;
      // For now, we'll just display a placeholder
      this.statsElement.innerHTML += '<p>No events to display.</p>';
    } else if (this.gameState.country) {
      const country = this.gameState.country;
      this.statsElement.innerHTML = `
        <h3>${country.name} Stats for ${country.year}</h3>
        <p>Population: ${country.population.toFixed(0)}</p>
        <p>GDP: $${country.gdp.toLocaleString()}</p>
        <p>Corruption Level: ${country.corruptionPerceptionIndex.toFixed(2)}</p>
        <p>HDI: ${country.hdi.toFixed(2)}</p>
        <p>GINI Index: ${country.giniIndex.toFixed(2)}</p>
        <p>Freedom House Rating: ${country.freedomHouseRating.toFixed(2)}</p>
        <p>Fragile States Index: ${country.fragileStatesIndex.toFixed(2)}</p>
      `;
    } else {
      this.statsElement.innerHTML = '<h3>Select a country to start</h3>';
    }

    // Update policies
    this.policiesElement.innerHTML = `<h3>Policies for ${this.gameState.country ? this.gameState.country.name : 'country'}</h3>`;
    for (const [category, policy] of Object.entries(this.gameState.activePolicies)) {
      this.policiesElement.innerHTML += `<h4>${category}:</h4> ${policy}<br>`;
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    this.notificationArea.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}
