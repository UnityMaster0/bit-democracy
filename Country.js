// Country.js
export class Country {
    constructor(name = 'Mexico') {
      this.name = name;
      this.activePolicies = {};
      this.population = 0;
      this.gdp = 0;
      this.corruptionPerceptionIndex = 0;
      this.hdi = 0;
      this.giniIndex = 0;
      this.freedomHouseRating = 0;
      this.fragileStatesIndex = 0;
      this.year = new Date().getFullYear();
  
      // Load stats for the selected country
      this.loadStats();
    }
  
    countryStats = {
      "UK": {
        "population": 67059000,
        "gdp": 23174000000,
        "corruptionPerceptionIndex": 0.6,
        "hdi": 0.9,
        "giniIndex": 32.5,
        "freedomHouseRating": 15,
        "fragileStatesIndex": 14
      },
      "China": {
        "population": 1409517377,
        "gdp": 1337120000000,
        "corruptionPerceptionIndex": 0.4,
        "hdi": 0.9,
        "giniIndex": 35.5,
        "freedomHouseRating": 17,
        "fragileStatesIndex": 21
      },
      "Iran": {
        "population": 83769853,
        "gdp": 23215500000,
        "corruptionPerceptionIndex": 0.2,
        "hdi": 0.7,
        "giniIndex": 31.3,
        "freedomHouseRating": 9,
        "fragileStatesIndex": 18
      },
      "Russia": {
        "population": 146934462,
        "gdp": 290800000000,
        "corruptionPerceptionIndex": 0.7,
        "hdi": 0.85,
        "giniIndex": 39.1,
        "freedomHouseRating": 4,
        "fragileStatesIndex": 24
      },
      "Mexico": {
        "population": 134529582,
        "gdp": 23146000000,
        "corruptionPerceptionIndex": 0.5,
        "hdi": 0.85,
        "giniIndex": 43.1,
        "freedomHouseRating": 12,
        "fragileStatesIndex": 29
      },
      "Nigeria": {
        "population": 209485321,
        "gdp": 63457000000,
        "corruptionPerceptionIndex": 0.8,
        "hdi": 0.65,
        "giniIndex": 37.1,
        "freedomHouseRating": 7,
        "fragileStatesIndex": 28
      }
    };
  
    loadStats() {
      const data = this.countryStats[this.name];
      if (data) {
        this.population = data.population;
        this.gdp = data.gdp;
        this.corruptionPerceptionIndex = data.corruptionPerceptionIndex;
        this.hdi = data.hdi;
        this.giniIndex = data.giniIndex;
        this.freedomHouseRating = data.freedomHouseRating;
        this.fragileStatesIndex = data.fragileStatesIndex;
      } else {
        console.error(`Stats for ${this.name} not found.`);
      }
    }
  
    applyRandomChanges() {
      const randomFactor = (Math.random() - 0.5) * 0.2;
      this.freedomHouseRating += randomFactor;
      this.fragileStatesIndex += randomFactor;
      this.corruptionPerceptionIndex += randomFactor * 0.01;
      this.hdi += randomFactor * 0.01;
      this.giniIndex += randomFactor * 2;
      this.gdp += randomFactor * 10;
  
      // Ensure all values stay within their valid ranges
      this.corruptionPerceptionIndex = Math.max(0, Math.min(1, this.corruptionPerceptionIndex));
      this.hdi = Math.max(0, Math.min(1, this.hdi));
      this.giniIndex = Math.max(0, Math.min(100, this.giniIndex));
      this.freedomHouseRating = Math.max(0, Math.min(20, this.freedomHouseRating));
      this.fragileStatesIndex = Math.max(0, Math.min(100, this.fragileStatesIndex));
    }
  
    progressYear() {
      this.population *= 1.01; // Increase population by 1%
      this.year += 1;
      this.applyRandomChanges();
    }
  }
  