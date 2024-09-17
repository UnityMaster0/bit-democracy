// GameState.js
import { Country } from './Country.js';
import { MenuItem } from './MenuItem.js';

export class GameState {
  constructor() {
    this.country = null;
    this.availableCountries = [
      'UK', 'China', 'Iran', 'Russia', 'Mexico', 'Nigeria'
    ];
    this.year = new Date().getFullYear();
    this.handlingEvents = false;
    this.activePolicies = {};
    this.currentMenu = null;
    this.menuStack = [];

    // Load menus and policies
    this.policies = this.createPolicies();
    this.submenus = this.createSubmenus();
    this.menuItems = this.createMainMenu();
    this.events = this.createEvents();

    // Initialize current menu
    this.currentMenu = this.createCountrySelectMenu();
  }

  createCountrySelectMenu() {
    return this.availableCountries.map(
      (country) => new MenuItem(country, () => this.selectCountry(country))
    );
  }

  createMainMenu() {
    return [
      new MenuItem('Economy', null, this.submenus['Economy']),
      new MenuItem('Civil Rights', null, this.submenus['Civil Rights']),
      new MenuItem('Corruption', null, this.submenus['Corruption']),
      new MenuItem('Propaganda', null, this.submenus['Propaganda']),
      new MenuItem('Progress a Year', () => this.progressYear()),
    ];
  }

  createSubmenus() {
    return {
      'Economy': [
        new MenuItem('Structure', null, this.policies['Structure']),
        new MenuItem('Taxes', null, this.policies['Taxes']),
        new MenuItem('Spending', null, this.policies['Spending']),
        new MenuItem('Back', () => this.navigateBack()),
      ],
      'Civil Rights': [
        new MenuItem('Natural Rights', null, this.policies['Natural Rights']),
        new MenuItem('Race Relations', null, this.policies['Race Relations']),
        new MenuItem('Back', () => this.navigateBack()),
      ],
      'Corruption': [
        new MenuItem('Embezzlement', null, this.policies['Embezzlement']),
        new MenuItem('Nepotism', null, this.policies['Nepotism']),
        new MenuItem('Back', () => this.navigateBack()),
      ],
      'Propaganda': [
        new MenuItem('Media', null, this.policies['Media']),
        new MenuItem('Back', () => this.navigateBack()),
      ],
    };
  }

  createPolicies() {
    return {
      // Economy Category
      'Structure': [
        new MenuItem('Command Economy', () => this.togglePolicy('Structure', 'Command Economy')),
        new MenuItem('Mixed Economy', () => this.togglePolicy('Structure', 'Mixed Economy')),
        new MenuItem('Laissez-faire', () => this.togglePolicy('Structure', 'Laissez-faire')),
        new MenuItem('Back', () => this.navigateBack()),
      ],
      'Taxes': [
        new MenuItem('Progressive Tax', () => this.togglePolicy('Taxes', 'Progressive Tax')),
        new MenuItem('Flat Tax', () => this.togglePolicy('Taxes', 'Flat Tax')),
        new MenuItem('Back', () => this.navigateBack()),
      ],
      'Spending': [
        new MenuItem('Increase Social Programs', () => this.togglePolicy('Spending', 'Increase Social Programs')),
        new MenuItem('Spend on Infrastructure', () => this.togglePolicy('Spending', 'Spend on Infrastructure')),
        new MenuItem('Back', () => this.navigateBack()),
      ],
      // Civil Rights Category
      'Natural Rights': [
        new MenuItem('Freedom of Speech', () => this.togglePolicy('Civil Rights', 'Enforce Freedom of Speech')),
        new MenuItem('Right to Privacy', () => this.togglePolicy('Civil Rights', 'Enforce Right to Privacy')),
        new MenuItem('Privacy Violations', () => this.togglePolicy('Civil Rights', 'Enforce Privacy Violations')),
        new MenuItem('Back', () => this.navigateBack()),
      ],
      'Race Relations': [
        new MenuItem('Integration', () => this.togglePolicy('Civil Rights', 'Integration')),
        new MenuItem('Segregation', () => this.togglePolicy('Civil Rights', 'Segregation')),
        new MenuItem('Back', () => this.navigateBack()),
      ],
      // Corruption Category
      'Embezzlement': [
        new MenuItem('Steal Taxes for Your Personal Use', () => this.togglePolicy('Embezzlement', 'Steal Taxes for Your Personal Use')),
        new MenuItem('Buy Bugatti', () => this.togglePolicy('Embezzlement', 'Buy Bugatti')),
        new MenuItem('Back', () => this.navigateBack()),
      ],
      'Nepotism': [
        new MenuItem('Appoint family members', () => this.togglePolicy('Corruption', 'Appoint family members')),
        new MenuItem('Use meritocracy', () => this.togglePolicy('Corruption', 'Use meritocracy')),
        new MenuItem('Back', () => this.navigateBack()),
      ],
      // Propaganda Category
      'Media': [
        new MenuItem('State Media', () => this.togglePolicy('Media', 'State Media')),
        new MenuItem('Censorship', () => this.togglePolicy('Media', 'Censorship')),
        new MenuItem('Free Press', () => this.togglePolicy('Media', 'Free Press')),
        new MenuItem('Back', () => this.navigateBack()),
      ],
    };
  }

  createEvents() {
    // Define events based on policies and situations
    return {
      // Example event structure
      'Isolationism': ['Trade decline', 'Diplomatic tensions'],
      'Global Cooperation': ['Economic growth', 'Cultural exchange'],
      'Progressive Tax': ['Income inequality reduced', 'Social programs funded'],
      'Flat Tax': ['Economic growth', 'Tax evasion'],
      'Increase Social Programs': ['Healthcare improved', 'Education funding'],
      'Spend on Infrastructure': ['Employment increase', 'Debt increase'],
    };
  }

  selectCountry(countryName) {
    this.country = new Country(countryName);
    this.currentMenu = this.menuItems;
  }

  togglePolicy(category, policy) {
    if (this.activePolicies[category] === policy) {
      delete this.activePolicies[category];
    } else {
      this.activePolicies[category] = policy;
    }
  }

  navigateBack() {
    if (this.menuStack.length > 0) {
      this.currentMenu = this.menuStack.pop();
    } else {
      this.currentMenu = this.menuItems;
    }
  }

  progressYear() {
    if (this.country) {
      this.country.progressYear();
      this.processEvents();
    }
  }

  processEvents() {
    // Generate events based on active policies
    this.handlingEvents = true;
    // For simplicity, we'll just log the events
    console.log(`Events for ${this.country.name} in ${this.country.year}:`);
    for (const [category, policy] of Object.entries(this.activePolicies)) {
      const events = this.events[policy];
      if (events) {
        events.forEach((event) => {
          console.log(`- ${event}`);
        });
      }
    }
    this.handlingEvents = false;
  }
}
