const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')
const { black } = require('../../colors.json')

const emoji = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟'] // Emoji used for reactions

module.exports = {
  config: {
    name: 'Survey',
    usage: `${prefix}survey`,
    description: 'Create a survey up to 10 choices',
    command: 'survey',
    displayHelp: true,
  },

  run: async (bot, message, args) => {
    message.delete()
    const choice = message.content
      .slice(prefix.length + 'survey'.length) // Escape prefix + command name
      .trim() // Escape space before and after the array
      .split(/ *; */g) // Split the array on each `;` with space or none before and after

    if (choice.length < 3) {
      // If only one choice
      const embed = new MessageEmbed()
        .setColor(black)
        .setTitle('🗒️  Survey command')
        .setDescription('Create a survey up to 10 choices')
        .addField('Usage', `${prefix}survey <Survey title>; <Option 1>; <Option 2>; ...; <Option 10>`, false)
        .addField(
          'Informations',
          "The title and options must be separated by semicolons\nYou can't put more than 10 choices in your survey"
        )

      message.channel.send({ embed }).then((m) => {
        setTimeout(() => {
          m.delete()
        }, 20000)
      })
    } else if (choice.length > 11) {
      // If more than 10 choices
      message.channel
        .send("You can't put more than 10 choices in your survey\nMore command with `/survey`")
        .then((m) => {
          setTimeout(() => {
            m.delete()
          }, 10000)
        })
    } else {
      const surveyMessage = []
      choice.forEach((e, index) => {
        if (index === 0) {
          surveyMessage.push(`**${e}** by **${message.author.username}**`) // The first argument is the survey question
        } else {
          surveyMessage.push(`${emoji[index - 1]} : ${e}`) // Push each choice in the array with a kawaii icon
        }
      })
      message.channel
        .send(surveyMessage.join('\n')) // Add each entry on a new line
        .then((m) => reactEmoji(m, surveyMessage.length)) // Add reaction for vote
    }
  },
}

// Function for adding emoji
async function reactEmoji(message, index) {
  index = index - 1 // Get the entry lenght
  for (let i = 0; i < index; i++) {
    let emojiElement = emoji[i]
    await message.react(emojiElement) // Add the emoji
  }
}
