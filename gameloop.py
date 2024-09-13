import sys

import pygame as pg

from logic import Logic

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
if __name__ == '__main__':
    game = gameContoller()
    game.run()