const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose')

const eventModel = require('../schemas/event_schema');
const userModel = require('../schemas/user_schema');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('get-status')
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

    let attendence = await userModel.find({event_id: eventId})
    let event = await eventModel.find({event_id: eventId})

    console.log(attendence)

    let embed = new EmbedBuilder()
    .setTitle(`Attendence for event '${event.event_name}'`)
    for(const user in attendence){
        
        let userTime = parseInt(attendence[user].time_connected / 60000)
        let userTimeMin = parseInt(userTime % 60)
        let userTimeHrs = parseInt(userTime / 60)
        embed.addFields({name: 'Discord ID:', value: `${attendence[user].discord_id}`}, {name: 'Time in Event', value: `${userTimeHrs}:${userTimeMin} `});
    }

    interaction.reply({embeds: [embed]})
}

catch(err){ // In the event of an error -> Log in console, and to the log channel that the error has pccired
console.log(err)

        
}
	},
};


