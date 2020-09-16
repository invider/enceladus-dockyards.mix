# enceladus-dockyards.mix
_GameBoy Jam 8 Entry_


## Welcome to Enceladus Dockyards!

Enceladus Dockyards is a space ship building and tactical battle simulator created for GameBoy Jam 8.

Construct you own spaceship on super-secret dockyards located on the Saturn's moon. Many parts and ship layouts are available at your disposal.

Test your design in epic battles with bots or your friends!



## Controls

Move: WASD or Arrow keys

Action: Space/Right Shift/E

Back: Enter/Z/Q/Numpad0

Gamepads are supported.



## Getting Started

Welcome to the outer planets! The lawless part of our Solar System, where mining mega-corporations are building battleships for use in a fight for resources.

Enceladus Dockyards is a neutral facility operated by Ring Space Engineering Corp. Here, for the right amount of money, any mining mega-corp can build and equip a space ship.

You are a space ship construction engineer working for Ring Space Engineering Corp. Your goal is to build the best possible ship on the given budget and evaluate it in battle.

You can play against a human, a bot. And it is even possible to match a couple of bots in an epic battle!

The game is divided into a construction phase and a battle phase.

The flow usually looks like this - choose players and available budget, select ship layout, place various components like lasers, shields, missiles, and mass drivers. And finally, engage in an epic battle to see who has a better ship.



## Ship Construction
To construct a ship, you have to select a layout. The layout determines the overall ship configuration and total space available for components. There are several pre-existing blueprints with already placed components available. You can choose and modify them to save some time.

Use the cursor keys to select a needed component, then press the Select button to place it. Use the cursor keys again to choose the position and hit Select to place it.

You may place as many components of the same type as you like. E.g. you can select a laser and then place it in 4 free cells. Use the Back button to get back to the parts list when you done.

You can remove already placed parts by selecting special 'Remove' options form the parts menu or simply by placing another part on the same spot - the old one will be replaced by a new component.

When you satisfied with your design, select the 'Build' option in the parts menu. Your ship will be constructed.



## Parts Available

* Lasers - shoot in volleys all at the same time, moderately precise.

* Mass Driver - high-precision and very powerful projectile.

* Missile - powerful wide-area hit weapon

* Armor Plating - protects against mass driver projectiles

* Shield Gen - generates energy field that protects from lasers

* ECM Jammers - electronic countermeasure to disturb incoming missile guiding system. Significantly reduces missile precision and effectiveness.

* Reactor Core - generates energy to recharge lasers, mass drivers, shields, ECM jammers, and other systems.



## Battle

The battle is quite simple. Each turn you are selecting what kind of weapons you want to fire.

Only ready to fire weapons will be listed, so sometimes that list will be empty (e.g. when you fired all the missiles and lasers and mass drivers are not charged).

Shields protect from lasers, armor plating from mass drivers, and ECM Jammers reduce missile accuracy. So choose a weapon that meets the least resistance. E.g. lasers, when your opponent's shield indicator is low.



## Status Indicators

Each ship has a bunch of indicators that show the status of hull, shields, and weapons.

The thick bottom indicator shows hits available. The ship is destroyed when this indicator drops to 0.

Just above the hits indicator, there are 2 smaller levels. The left one shows the status of shields and ECM jammers. They fully charged when the level is at maximum.

The level on the right shows the weapon charge. This one gives you some indication on when your lasers and mass drivers will be ready to fire.


----

## How to run

Make sure you have Collider.JAM installed:

```
npm install collider.jam
```

Run it with:

```
jam play
```


## Cheats

Bots are capturing control of the ship after the battle menu
has been idle for 30 seconds.

You can capture control from a bot by executing
the following sequences:

```
    <<A<< - capture player A
    >>A>> - capture player B
```


## Debug

Run with _--newgame flag to quick jump straight into the design phase:

```
jam -d --newgame
```

Available flags:

* --fast - shortens transitions
* --menu - skip the title and jump straight to the menu
* --newgame - jump to the new game on start
* --battle - jump straight to battle between human and AI with random ships
* --blueprintA/B - manually select a ship for battle (works only with --battle flag!)
* --botA/B - select bot player for A or B
* --humanA/B - select a human player for A or B

