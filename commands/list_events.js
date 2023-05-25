const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose')

const eventModel = require('../schemas/event_schema');
const userModel = require('../schemas/user_schema');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('list-events')
		.setDescription('Replies with Pong!'),


	async execute(interaction) {

        const client = interaction.client;


try{

    let eventList = await eventModel.find()

    console.log(eventList);

    let embed = new EmbedBuilder()
    .setTitle('List of Events')
    for(const event in eventList){
        embed.addFields({name: 'Event Name', value: `${eventList[event].event_name}`}, {name: `ID:`, value: `${eventList[event].event_id}`, inline: true});
    }

    interaction.reply({embeds: [embed]})
}

catch(err){ // In the event of an error -> Log in console, and to the log channel that the error has pccired
console.log(err)

        
}
	},
};


