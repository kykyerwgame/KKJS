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
        await player.showText('歡迎加入')
        await player.showText('請隨意參觀')
        player.setVariable('AFTER_INTRO', true)
    }
}

export default player