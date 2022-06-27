const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
  name: "Job",
  aliases: ['emprego', 'job', 'empregos'],

  run: async (discordClient, message, args) => {
    let jobs = {
      programador: 'programador',
      trader: 'trader',
      designer: 'designer',
      influencer: 'influencer',
      palhaco: 'palhaco',
      garcom: 'garcom',
      ator: 'ator',
      piloto: 'piloto',
      empresario: 'empresario',
      prostituto: 'prostituto',
      barman: 'barman',
      policial: 'policial'
    }

    let workEmbed = new MessageEmbed()
      .setColor('GOLD')
      .setTitle('💼 | Empregos')
      .setDescription('💻 Programador\n〽 Trader\n📳 Influencer\n🤡 Palhaço\n🍽 Garçom\n👨🏿‍🎤 Ator\n✈ Piloto\n 💼 Empresário\n😈 Prostituto\n🍺 Barman\n 🔫 Policial')
      .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
      .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

    let jobOptions = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setPlaceholder('💼 Selecione seu emprego')
        .setCustomId('jobOptions')
        .addOptions([
          {
            label: 'Programador',
            value: jobs.programador,
          },
          {
            label: 'Trader',
            value: jobs.trader,
          },
          {
            label: 'Influencer',
            value: jobs.influencer,
          },
          {
            label: 'Palhaço',
            value: jobs.palhaco,
          },
          {
            label: 'Garçom',
            value: jobs.garcom,
          },
          {
            label: 'Ator',
            value: jobs.ator,
          },
          {
            label: 'Piloto',
            value: jobs.piloto,
          },
          {
            label: 'Empresário',
            value: jobs.empresario,
          },
          {
            label: 'Prostituto',
            value: jobs.prostituto,
          },
          {
            label: 'Barman',
            value: jobs.barman,
          },
          {
            label: 'Policial',
            value: jobs.policial,
          }
        ])
    )

    message.reply({ embeds: [workEmbed], components: [jobOptions] }).then(() => {
      let filter = msg => msg.user.id === message.author.id && msg.isSelectMenu()
      let collector = message.channel.createMessageComponentCollector({ filter: filter, time: 600000 * 2 })

      collector.on('collect', async (c) => {
        let value = c.values[0]

        if (value === jobs.programador) {
          let jobSelectedEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('💼 | Empregos')
            .setDescription(`Você escolheu ser um ${jobs.programador}`)
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
            .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

          await c.reply({ embeds: [jobSelectedEmbed], ephemeral: true }).then((err) => {
            if (err) return c.reply({ content: `Houve algum erro ao selecionar seu emprego`, ephemeral: true })

            db.set(`job_${message.author.id}`, { job: jobs.programador, hasJob: true, wage: 12000 })
          })
        }

        if (value === jobs.trader) {
          let jobSelectedEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('💼 | Empregos')
            .setDescription(`Você escolheu ser um ${jobs.trader}`)
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
            .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

          await c.reply({ embeds: [jobSelectedEmbed], ephemeral: true }).then((err) => {
            if (err) return c.reply({ content: `Houve algum erro ao selecionar seu emprego`, ephemeral: true })

            db.set(`job_${message.author.id}`, { job: jobs.trader, hasJob: true, wage: 13000 })
          })
        }

        if (value === jobs.designer) {
          let jobSelectedEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('💼 | Empregos')
            .setDescription(`Você escolheu ser um ${jobs.designer}`)
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
            .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

          await c.reply({ embeds: [jobSelectedEmbed], ephemeral: true }).then((err) => {
            if (err) return c.reply({ content: `Houve algum erro ao selecionar seu emprego`, ephemeral: true })

            db.set(`job_${message.author.id}`, { job: jobs.designer, hasJob: true, wage: 5500 })
          })

        }

        if (value === jobs.influencer) {
          let jobSelectedEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('💼 | Empregos')
            .setDescription(`Você escolheu ser um ${jobs.influencer}`)
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
            .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

          await c.reply({ embeds: [jobSelectedEmbed], ephemeral: true }).then((err) => {
            if (err) return c.reply({ content: `Houve algum erro ao selecionar seu emprego`, ephemeral: true })

            db.set(`job_${message.author.id}`, { job: jobs.influencer, hasJob: true, wage: 10000 })
          })

        }

        if (value === jobs.palhaco) {
          let jobSelectedEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('💼 | Empregos')
            .setDescription(`Você escolheu ser um ${jobs.palhaco}`)
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
            .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

          await c.reply({ embeds: [jobSelectedEmbed], ephemeral: true }).then((err) => {
            if (err) return c.reply({ content: `Houve algum erro ao selecionar seu emprego`, ephemeral: true })

            db.set(`job_${message.author.id}`, { job: jobs.palhaco, hasJob: true, wage: 500 })
          })

        }

        if (value === jobs.garcom) {
          let jobSelectedEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('💼 | Empregos')
            .setDescription(`Você escolheu ser um ${jobs.garcom}`)
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
            .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

          await c.reply({ embeds: [jobSelectedEmbed], ephemeral: true }).then((err) => {
            if (err) return c.reply({ content: `Houve algum erro ao selecionar seu emprego`, ephemeral: true })

            db.set(`job_${message.author.id}`, { job: jobs.garcom, hasJob: true, wage: 1200 })
          })

        }

        if (value === jobs.ator) {
          let jobSelectedEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('💼 | Empregos')
            .setDescription(`Você escolheu ser um ${jobs.ator}`)
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
            .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

          await c.reply({ embeds: [jobSelectedEmbed], ephemeral: true }).then((err) => {
            if (err) return c.reply({ content: `Houve algum erro ao selecionar seu emprego`, ephemeral: true })

            db.set(`job_${message.author.id}`, { job: jobs.ator, hasJob: true, wage: 10000 })
          })

        }

        if (value === jobs.piloto) {
          let jobSelectedEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('💼 | Empregos')
            .setDescription(`Você escolheu ser um ${jobs.piloto}`)
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
            .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

          await c.reply({ embeds: [jobSelectedEmbed], ephemeral: true }).then((err) => {
            if (err) return c.reply({ content: `Houve algum erro ao selecionar seu emprego`, ephemeral: true })

            db.set(`job_${message.author.id}`, { job: jobs.piloto, hasJob: true, wage: 10500 })
          })

        }

        if (value === jobs.empresario) {
          let jobSelectedEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('💼 | Empregos')
            .setDescription(`Você escolheu ser um ${jobs.empresario}`)
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
            .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

          await c.reply({ embeds: [jobSelectedEmbed], ephemeral: true }).then((err) => {
            if (err) return c.reply({ content: `Houve algum erro ao selecionar seu emprego`, ephemeral: true })

            db.set(`job_${message.author.id}`, { job: jobs.empresario, hasJob: true, wage: 8500 })
          })

        }

        if (value === jobs.prostituto) {
          let jobSelectedEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('💼 | Empregos')
            .setDescription(`Você escolheu ser um ${jobs.prostituto}`)
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
            .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

          await c.reply({ embeds: [jobSelectedEmbed], ephemeral: true }).then((err) => {
            if (err) return c.reply({ content: `Houve algum erro ao selecionar seu emprego`, ephemeral: true })

            db.set(`job_${message.author.id}`, { job: jobs.prostituto, hasJob: true, wage: 1200 })
          })

        }

        if (value === jobs.barman) {
          let jobSelectedEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('💼 | Empregos')
            .setDescription(`Você escolheu ser um ${jobs.barman}`)
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
            .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

          await c.reply({ embeds: [jobSelectedEmbed], ephemeral: true }).then((err) => {
            if (err) return c.reply({ content: `Houve algum erro ao selecionar seu emprego`, ephemeral: true })

            db.set(`job_${message.author.id}`, { job: jobs.barman, hasJob: true, wage: 1500 })
          })

        }

        if (value === jobs.policial) {
          let jobSelectedEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('💼 | Empregos')
            .setDescription(`Você escolheu ser um ${jobs.policial}`)
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
            .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

          await c.reply({ embeds: [jobSelectedEmbed], ephemeral: true }).then((err) => {
            if (err) return c.reply({ content: `Houve algum erro ao selecionar seu emprego`, ephemeral: true })

            db.set(`job_${message.author.id}`, { job: jobs.policial, hasJob: true, wage: 4000 })
          })

        }
      })
    })
  }
}