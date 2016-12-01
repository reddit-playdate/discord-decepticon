# Decepticon

Decepticon is a Discord bot built to facilitate asynchronous, online adaptations of the board game [Deception: Murder in Hong Kong](http://www.greyfoxgames.com/games/deception-murder-in-hong-kong/).

## Commands

## Permissions

`?admin <username> OR <role>` to add bot managers or self-select player role during a game.

## Setup and Management Commands

`?game join` add yourself to the list of current players. This is not available after a game has started. A game will automatically start if the maximum number of players have joined.

`?game start` start the game when all players have joined. Only works when the number of players is 4 or greater.

`?game stop` stop the game and clear the player list.

`?game reset` stop the game, and restart with same players.

## Gameplay Commands

`?round end` advances the game to the next round, or will end the game if all rounds have been completed. Only useable by the Forensic Scientist.

`?solve <weapon> <evidence>` attempt to solve the murder by providing the emoji shortcode for the key evidence and means of murder. Not useable by the forensic scientist. **Only useable by each player once each game**.

`?choose` Decepticon will direct message players to gather information needed to start and play the game. This begins with the murderer's means and key evidence, and continues with the Forensic Scientists' evidence from the scene. Players should respond to Decepticon with a `?choose` command in these situations. Decepticon will let you know how to make a valid choice.
