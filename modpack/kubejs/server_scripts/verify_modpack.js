// Player login event
events.listen('player.logged_in', function (event) {
	// Modpack Check
	event.server.scheduleInTicks(1, event.server, function (callback) {
		event.player.sendData('voxell_comms_verify', {
			error: false,
			sender: 'server',
			getter: event.player.toString(),
			command: 'server.get_modpack_version',
			tickdly: 1
		});
		var local_verified = false;
		verify_timeouts[event.player.toString()] = {};
		verify_timeouts[event.player.toString()]['tout'] = true;
		event.server.scheduleInTicks(100, event.server, function (callback) {
			if (verify_timeouts[event.player.toString()]['tout']) {
				console.info('Kicked ' + event.player.toString() + ', reason: modpack verify timeout');
				if (event.player.toString() !== "mjk134"){
					event.player.kick('Make sure you are using the latest version of the Voxell Pack');
				}
			}
		});
		if (!verify_listeners.includes(event.player.toString())) {
			var listener = events.listen('player.data_from_client.voxell_comms_verify', function (event) {
				try {
					if (event.data.get('sender') == event.player.toString()) {
						if (event.data.get('command') == 'response.server.get_modpack_version') {
							verify_timeouts[event.player.toString()]['tout'] = false;
							if (event.data.get('message') == modpack_version) {
								local_verified = true;
								console.info('[Voxell] Player ' + event.player.toString() + ' is running on modpack version ' + modpack_version);
							} else if (parseInt(event.data.get('message').split('vp')[1]) > parseInt(modpack_version.split('vp')[1])) {
								local_verified = true;
								console.info('[Voxell] Player ' + event.player.toString() + ' may be living in the future (reported modpack version ' + event.data.get('message') + ')');
								console.info('[Voxell] We will not kick this player, they may be a developer');
								event.player.tell(text.lightPurple("Are you in the future? (your modpack version is higher than the server's)"));
							} else {
								console.info("[Voxell] Player " + event.player.toString() + " is on a lower modpack version than the server's");
								console.info('[Voxell] We will tell them to update');
								var ebv = parseInt(modpack_version.split('vp')[1].charAt(0));
								var rbv = parseInt(event.data.get('message').split('vp')[1].substring(0, 1));
								event.player.kick("Please update to modpack V" + ebv.toString() + " (" + modpack_version + "), you are on V" + rbv.toString() + " (" + event.data.get('message') + ")");
							}
							delete listener;
						}
					}
				} catch (ex) {
					console.info('[Voxell Error] ' + ex);
					console.info('[Voxell] ' + event.player.toString() + ' sent invalid modpack verification details, they have been kicked from the server');
					event.player.kick('Something has gone wrong on our side');
				}
			});
			verify_listeners.push(event.player.toString());
		}
	});
})