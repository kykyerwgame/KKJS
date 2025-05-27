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
        // 設定 NPC 圖像
    }

    async onAction(player: RpgPlayer) {
        // 玩家點擊 NPC 時觸發
        await player.showText('你好，請輸入你的名字：', {
            talkWith: this
        })

        const name = await player.showInput()
        // 顯示輸入框，等待玩家輸入文字

        if (name && name.trim().length > 0) {
            player.name = name
            // 設定玩家的名稱
            player.setComponentsTop(Components.text('{name}'))
            // 在玩家頭上顯示新名稱

            await player.showText(`你的名字是：${name}，記住囉！`, {
                talkWith: this
            })
        } else {
            await player.showText('你沒有輸入名字喔！', {
                talkWith: this
            })
        }
    }
}
