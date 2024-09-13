import pygame as pg
import sys

class Logic:
    def __init__(self):
        pg.init()
        self.screen = pg.display.set_mode((800, 600))
        pg.display.set_caption("BitLife-like Menu")
        self.clock = pg.time.Clock()
        self.font = pg.font.Font(None, 36)
        self.menu_items = ["Policy", "Economy", "Corruption", "Propaganda", "Progress a Year", "Quit"]
        self.submenus = {
            "Policy": ["Foreign Policy", "Domestic Policy", "Back"],
            "Economy": ["Taxes", "Spending", "Trade", "Back"],
            "Corruption": ["Bribery", "Embezzlement", "Nepotism", "Back"],
            "Propaganda": ["Media Control", "Censorship", "Disinformation", "Back"],
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
            print("Progressing a year...")
        else:
            print(f"Selected: {selected}")

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
        pass

    def draw(self):
        self.screen.fill((255, 255, 255))
        items = self.menu_items if self.current_menu == "main" else self.submenus[self.current_menu]
        for i, item in enumerate(items):
            color = (0, 0, 0) if i != self.selected_item else (255, 0, 0)
            text = self.font.render(item, True, color)
            self.screen.blit(text, (300, 100 + i * 50))
        pg.display.flip()
    
    def run(self):
        self.handle_events()
        self.update()
        self.draw()
