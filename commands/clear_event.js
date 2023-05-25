const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose')

const eventModel = require('../schemas/event_schema');
const userModel = require('../schemas/user_schema');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear-event')
		.setDescription('Gets an event\'s status.')
        .addStringOption(option => option
            .setName('id')
            .setDescription('The ID of the event')
            .setRequired(true)
            ),


	async execute(interaction) {

        const client = interaction.client;


try{

    let eventId = interaction.options.getString('id')

    await userModel.deleteMany({event_id: eventId})
    await eventModel.deleteOne({event_id: eventId})
interaction.reply(`Event ${eventId} has been cleared.`);
}

catch(err){ // In the event of an error -> Log in console, and to the log channel that the error has pccired
console.log(err)

        
}
	},
};


