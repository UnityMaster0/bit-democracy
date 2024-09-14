import pygame as pg, sys, asyncio
from random import random

class Country:
    def __init__(self):
        
        # Initialize statistics
        self.population = 1000000
        self.gdp = 5000000000
        self.corruption_preceptions_index = 0.3
        self.media_freedom_index = 49

        # Set up a dictionary to map countries to their statistics
        self.country_stats = {
            "UK": {
                "population": 67059000,
                "gdp": 23174000000,
                "corruption_preceptions_index": 0.6,
                "media_freedom_index": 78
            },
            "China": {
                "population": 1409517377,
                "gdp": 1337120000000,
                "corruption_preceptions_index": 0.4,
                "media_freedom_index": 84
            },
            "Iran": {
                "population": 83769853,
                "gdp": 23215500000,
                "corruption_preceptions_index": 0.2,
                "media_freedom_index": 54
            },
            "Russia": {
                "population": 146934462,
                "gdp": 290800000000,
                "corruption_preceptions_index": 0.7,
                "media_freedom_index": 62
            },
            "Mexico": {
                "population": 134529582,
                "gdp": 23146000000,
                "corruption_preceptions_index": 0.5,
                "media_freedom_index": 75
            },
            "Nigeria": {
                "population": 209485321,
                "gdp": 63457000000,
                "corruption_preceptions_index": 0.8,
                "media_freedom_index": 49
            }
        }

    def update_stats(self, current_country):
        # Update the statistics based on the current country
        self.population = self.country_stats[current_country]["population"]
        self.gdp = self.country_stats[current_country]["gdp"]
        self.corruption_preceptions_index = self.country_stats[current_country]["corruption_preceptions_index"]
        self.media_freedom_index = self.country_stats[current_country]["media_freedom_index"]

class Logic:
    def __init__(self):
        pg.init()
        self.screen = pg.display.set_mode((800, 600))
        pg.display.set_caption("BitLife-like Menu")
        self.clock = pg.time.Clock()
        self.font = pg.font.Font(None, 36)

        self.country = Country()
        self.country.update_stats("Mexico")

        self.menu_items = ["Policy", "Economy", "Corruption", "Propaganda", "Stats", "Progress a Year", "Quit"]
        self.submenus = {
            "Policy": ["Foreign Policy", "Domestic Policy", "Back"],
            "Economy": ["Taxes", "Spending", "Trade", "Back"],
            "Corruption": ["Bribery", "Embezzlement", "Nepotism", "Back"],
            "Propaganda": ["Media Control", "Censorship", "Disinformation", "Back"],
            "Stats": [f"Population: {self.country.population}",
                      f"GDP: ${self.country.gdp}",
                      f"Corrpution Level: {self.country.corruption_preceptions_index}",
                      f"Media Freedom Index: {self.country.media_freedom_index}",
                      "Back"]
        }
        self.current_menu = "main"
        self.selected_item = 0
        self.key_pressed = False
    
    def select_menu_item(self):
        selected = self.menu_items[self.selected_item] if self.current_menu == "main" else self.submenus[self.current_menu][self.selected_item]
        if selected == "Quit":
            pg.quit()
            sys.exit()
        elif selected == "Back":
            self.current_menu = "main"
            self.selected_item = 0
        elif selected in self.submenus:
            self.current_menu = selected
            self.selected_item = 0
        elif selected == "Progress a Year":
            self.progress_a_year()
            print("Progressing a year...")
        else:
            print(f"Selected: {selected}")

    def progress_a_year(self):
        self.country.population += int(self.country.population * 0.005)  # 0.5% growth
        self.country.gdp *= 1.02  # GDP increases by 2%
        self.country.corruption_preceptions_index = max(0, min(1, self.country.corruption_preceptions_index + (random() * 0.02 - 0.01)))

        self.submenus["Stats"] = [f"Population: {self.population}",
                                  f"GDP: ${self.country.gdp}",
                                  f"Corrpution Level: {self.country.corruption_preceptions_index}",
                                  f"Media Freedom Index: {self.country.media_freedom_index}",
                                   "Back"]
        
    def handle_events(self):

        if not self.key_pressed:
            if pg.key.get_pressed()[pg.K_UP]:
                self.selected_item = (self.selected_item - 1) % len(self.menu_items)
                self.key_pressed = True
            elif pg.key.get_pressed()[pg.K_DOWN]:
                self.selected_item = (self.selected_item + 1) % len(self.menu_items)
                self.key_pressed = True
            elif pg.key.get_pressed()[pg.K_RETURN]:
                self.select_menu_item()
                self.key_pressed = True
        else:
            pg.time.wait(100)
            self.key_pressed = False
    
    def update(self):
        self.handle_events()

    def draw(self):
        self.screen.fill((255, 255, 255))
        items = self.menu_items if self.current_menu == "main" else self.submenus[self.current_menu]

        for i, item in enumerate(items):
            color = (0, 0, 0) if i != self.selected_item else (255, 0, 0)
            text = self.font.render(item, True, color)
            self.screen.blit(text, (300, 100 + i * 50))

        pg.display.flip()

    def run(self):
        self.update()
        self.draw()


FPS = 60

class gameContoller:

    def __init__(self):

        pg.init()
        self.screen = pg.display.set_mode((1680, 1080))
        pg.display.set_caption('Bit-Democracy')
        self.clock = pg.time.Clock()
        self.logic = Logic()

    # Runs the game
    def run(self):
        while True:
            self.clock.tick(FPS)
            for event in pg.event.get():
                if event.type == pg.QUIT or pg.key.get_pressed()[pg.K_ESCAPE]:
                    pg.quit()
                    sys.exit()
            
            self.logic.run()
            pg.display.update()

#Starts game loop
async def main():
    if __name__ == '__main__':
        game = gameContoller()
        game.run()
    await asyncio.sleep(0)
asyncio.run(main())