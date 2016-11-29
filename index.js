const Discord = require('discord.js')
var bot = new Discord.Client()

var weapons = require('./weapons.js')
var keys = require('./evidence.js')
var scene = require('./scene.js')

var model = {
  'players': [],
  'murderer': null,
  'forensicScientist': null,
  'investigators': [],
  'keyEvidence': null,
  'meansOfMurder': null,
  'tiles': null,
  'round': 0
}

var controller = {
  addPlayer: function (user) {
    model.players.push(user)
  },
  dealCards: function (players) {
    players.forEach((player) => {
      player.weapons = []
      player.keyEvidence = []
      for (let i = 0; i < 4; i++) {
        player.weapons.push(chooseRandomAndRemoveFrom(weapons))
        player.keyEvidence.push(chooseRandomAndRemoveFrom(keys))
      }
    })
  },
  assignRoles: function (players) {
    model.murderer = chooseRandomAndRemoveFrom(players)
    model.forensicScientist = chooseRandomAndRemoveFrom(players)
    model.investigators = players
  },
  startGame: function () {
    controller.dealCards(model.players)
    controller.assignRoles(model.players)
    controller.drawTiles()
  },
  commitCrime: function (means, key) {
    model.meansOfMurder = means
    model.keyEvidence = key
  },
  drawTiles: function () {
    let tiles = {}
    tiles.cause = scene.cause
    tiles.location = chooseRandomAndRemoveFrom(scene.location)
    tiles.scene = []
    for (let i = 0; i < 4; i++) {
      tiles.scene.push(chooseRandomAndRemoveFrom(scene.scene))
    }
    return tiles
  },
  markTile: function (tile, string) {
    if (tile.title) {
      tile.marker = tile.clues.indexOf(string)
    } else {
      tile.marker = tile.indexOf(string)
    }
  },
  advanceRound: function () {
    model.round ++
  },
  replaceTile: function (title) {
    let index = model.tiles.scene.findIndex((tile) => {
      return (tile.title === title)
    })
    model.tiles.scene.splice(index, 1)
    let newTile = chooseRandomAndRemoveFrom(scene.scene)
    model.tiles.scene.push(newTile)
    return newTile
  },
  solveCrime: function (means, key) {
    return (means === model.meansOfMurder && key === model.keyEvidence)
  },
  stopGame: function () {
    model = {
      'players': [],
      'murderer': null,
      'forensicScientist': null,
      'investigators': [],
      'keyEvidence': null,
      'meansOfMurder': null,
      'tiles': null,
      'round': 0
    }
  },
  resetGame: function () {
    model.players.push(model.murderer)
    model.players.push(model.forensicScientist)
    model.investigators.forEach((investigator) => {
      model.players.push(investigator)
    })
  }
}

bot.on('message', message => {
  let prefix = '?'
  if (!message.content.startsWith(prefix)) { return }

  if (message.content.startsWith('?game join')) {
    if (alreadyJoined(message.author) || model.round > 0) {
      // Send an error message to channel or user
      return
    } else {
      controller.addPlayer(message.author)
      if (model.players > 10) {
        controller.startGame()
      }
    }
  }

  if (message.content.startsWith('?game start')) {
    controller.startGame()
  }

  if (message.content.startsWith('?game stop')) {
    controller.stopGame()
  }

  if (message.content.startsWith('?game reset')) {
    controller.resetGame()
  }

  if (message.content.startsWith('?round end')) {
    if (model.round < 1) { return }
    controller.advanceRound()
    if (model.round > 3) { controller.stopGame() }
  }

  if (message.content.startsWith('?solve')) {
    let content = message.content.split(' ')
    let weapon = content[1]
    let key = content[2]
    if (controller.solveCrime(weapon, key)) {
      controller.stopGame()
    } else {
      // Send a message indicating incorrect solution
      return
    }
  }
})

bot.on('ready', () => {
  console.log('I am prepared.')
})

bot.login(process.env.BOT_TOKEN)

// Hoisted helper functions
function chooseRandomAndRemoveFrom (array) {
  let index = Math.floor(Math.random() * array.length)
  let choice = array[index]
  array.splice(index, 1)
  return choice
}

function alreadyJoined (author) {
  return model.players.indexOf(function (player) {
    return player.id === author.id
  })
}
