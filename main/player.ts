import { RpgPlayer, type RpgPlayerHooks, Control, Components } from '@rpgjs/server'

const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = 'YourName'
        player.setComponentsTop(Components.text('{name}'))
    },
    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()
        }
    },
    async onJoinMap(player: RpgPlayer) {
        if (player.getVariable('AFTER_INTRO')) {
            return
        }
        await player.showText('勇者您好，歡迎來到我的世界')
        await player.showText('這個世界需要您來拯救')
        await player.showText('但世界剛被破壞在復原中')
        await player.showText('很快世界就會恢復')
        await player.showText('耐心稍等，很快需要您的幫助')
        player.setVariable('AFTER_INTRO', true)
    }
}

export default player
