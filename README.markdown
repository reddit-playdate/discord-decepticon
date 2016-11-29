# Decepticon

Decepticon is a Discord bot built to facilitate an async, online version of the board game Deception: Murder in Hong Kong.

## Commands

## Permissions

?admin <username> OR <role>

## Setup and Management Commands

`?game join` add yourself to the list of current players. not available after a game has started. game will automatically start if the maximum number of players joins.

`?game start` start the game when all players have joined. only works when the number of players is 4 or greater.

`?game stop` stop the game and clear the player list.

`?game reset` stop the game, restart with same players.

## Gameplay Commands

`?round end` advance game to the next round, or end the game if all rounds have been completed. only useable by the Forensic Scientist.

`?solve <weapon> <evidence>` attempt to solve the murder by providing the emoji shortcode for the key evidence and means of murder. only useable by investigators. **only useable once each game**.

`?choose` Decepticon will direct message players to gather information, including the murderer's means and key evidence, as well as scene evidence from the Forensic Scientist. Those players should respond with ?choose <emoji shortcode> OR <string>. Invalid responses will be met with error messages.
