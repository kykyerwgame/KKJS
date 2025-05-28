import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'EV-1',
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class NameInputEvent extends RpgEvent {
    onInit() {
        this.setGraphic('female')
    }

    async onAction(player: RpgPlayer) {
        // 避免重複命名
        if (player.getVariable('named')) {
            await player.showText(`你已經叫做 ${player.name} 囉`, { talkWith: this })
            return
        }

        await player.showText('你好，請輸入你的名字：', {
            talkWith: this
        })

        // 叫前端顯示輸入框
        player.callClient('ask-name')

        // 等待前端輸入後送回 name
        player.once('name-entered', async (name: string) => {
            if (name && name.trim().length > 0) {
                player.name = name
                player.setComponentsTop(Components.text('{name}'))
                player.setVariable('named', true) // 記錄已命名
                await player.showText(`你的名字是 ${name}！`, { talkWith: this })
            } else {
                await player.showText('你沒有輸入名字喔！', { talkWith: this })
            }
        })
    }
}
