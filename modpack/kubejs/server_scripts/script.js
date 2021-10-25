// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

console.info('[Voxell] Resource loaded')

onEvent('recipes', event => {
	// Change recipes here
})

onEvent('item.tags', event => {
	// Get the #forge:cobblestone tag collection and add Diamond Ore to it
	// event.get('forge:cobblestone').add('minecraft:diamond_ore')

	// Get the #forge:cobblestone tag collection and remove Mossy Cobblestone from it
	// event.get('forge:cobblestone').remove('minecraft:mossy_cobblestone')
})

// Creeper, Aw Man
events.listen('player.chat', function (event) {
  // Check if message equals creeper, ignoring case
	if (event.message.trim().equalsIgnoreCase('creeper')) {
	// Schedule task in 1 tick, because if you reply immidiently, it will print before player's message
		event.server.scheduleInTicks(1, event.server, function (callback) {
		// Tell everyone Aw man, colored green. Callback data is the server
			callback.data.tell(text.green('Aw man'))
		})
	}
})