import { RpgPlayer, type RpgPlayerHooks, Control, Components } from '@rpgjs/server'

const player: RpgPlayerHooks = {
    async onConnected(player: RpgPlayer) {
        // 請玩家輸入姓名
        const name = await player.showText('請輸入你的名字：', {
            input: true  // 讓對話框接受輸入
        })

        // 設定名稱並顯示在角色頭上
        player.name = name || '無名勇者'
        player.setComponentsTop(Components.text('{name}'))
    },

    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()
        }
    },

    async onJoinMap(player: RpgPlayer) {
        if (player.getVariable('AFTER_INTRO')) return

        await player.showText(`勇者 ${player.name}，歡迎來到我的世界！`)
        player.setVariable('AFTER_INTRO', true)
    }
}

export default player
