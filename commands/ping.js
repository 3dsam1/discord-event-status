const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {

        const client = interaction.client;


        try {



            const exampleEmbed = new EmbedBuilder()
                .setColor('#3D408F')
                .setTitle("Latency :ping_pong:")
                .setDescription('Pinging.. Please wait.')
                .setTimestamp()
                .setFooter({ text: `Stream Team`, iconURL: 'https://i.imgur.com/N4IRIbH.gif' })
                

            const sent = await interaction.reply({ embeds: [exampleEmbed], fetchReply: true });

            await interaction.fetchReply()

            var ping = sent.createdTimestamp - interaction.createdTimestamp;

            const finalEmbed = new EmbedBuilder()
                .setColor('#3D408F')
                .setTitle("Latency :ping_pong:")
                .setDescription(`Bot: ${ping} ms\nAPI: ${interaction.client.ws.ping} ms`)
                .setTimestamp()
                .setFooter({ text: `Stream Team`, iconURL: 'https://i.imgur.com/N4IRIbH.gif' });


            interaction.editReply({ embeds: [finalEmbed] });

        }

        catch (err) { // In the event of an error -> Log in console, and to the log channel that the error has pccired
            console.log(err)


        }
    },
};


