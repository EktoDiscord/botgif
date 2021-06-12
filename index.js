const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('quick.db')
const prefix = ""
const token = ""
client.on("message", (message) => {

    let owners = ["IdOwner1","IdOwner2"]

    if(message.content == prefix+"setpp") {
        if(owners.includes(message.author.id) ) {
        let channel = message.mentions.channels.first()
    
        if(!channel) {
          return message.lineReply("Merci de mentionner un salon")
        }
     
          
            db.set(`pp_${message.guild.id}`, channel.id)
        
        message.lineReply("Vous avez défini avec succès le canal de pp sur <#" + channel.id + ">")
    } else {
        return message.delete()
    }
}}
)
client.on("guildMemberAdd", (member) => {
    let setpp = db.fetch(`pp_${member.guild.id}`)
    if(setpp == null) return;
    let channel = member.guild.channels.cache.get(setpp)
    if(!channel) return;
    if(channel) {
        channel.send(new Discord.MessageEmbed()
        .setDescription(member.avatarURL({dynamic:true}))
        .setColor('2f3136')
        )
    }

})

client.on("ready", () => {
  console.log('Je me suis connecté ! Pour set le channel fait' +prefix'setpp channel')

})
client.login(token)