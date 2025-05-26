import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
//匯入 RPGJS 的核心
@EventData({
    name: 'EV-1', 
    hitbox: {
        width: 32,
        height: 16
    }
})
//name: EV-1：此事件的 ID ，與地圖上的事件名稱對應。
//hitbox：碰撞區域大小（站在地圖上，玩家靠近這個 hitbox 才能互動）。
    
export default class VillagerEvent extends RpgEvent {
//建立一個事件類別並預設匯出。這個事件在地圖中代表一位 NPC
    onInit() {
        this.setGraphic('female')
//設置圖像為femal
    }
    async onAction(player: RpgPlayer) {
//onAction 是玩家與 NPC 互動時觸發的事件
        await player.showText('我給您10元', {
            talkWith: this
        })
        player.gold += 10
    }
} 
