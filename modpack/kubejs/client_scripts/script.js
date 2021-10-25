// priority: 0

const modpack_version = "vp104";

console.info('[Voxell] Resource loaded')

onEvent('jei.hide.items', event => {
	// Hide items in JEI here
	// event.hide('minecraft:cobblestone')
})

events.listen('player.data_from_server.voxell_comms_verify', function (event) {
	if (event.data.get('sender') == 'server') {
		if (event.data.get('command') == 'server.get_modpack_version') {
			console.info('[Voxell] Server requested modpack version, running on ' + modpack_version);
			console.info(event.data);
			event.player.sendData('voxell_comms_verify', {
				error: false,
				sender: event.player.toString(),
				getter: 'server',
				command: 'response.server.get_modpack_version',
				message: modpack_version,
				tickdly: 1
			});
		}
	}
});