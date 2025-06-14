import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'KK', 
    hitbox: {
        width: 16,
        height: 16
    },
     blockMovement: true // 玩家無法穿透這個物件
})
export default class VillagerEvent extends RpgEvent {
    onInit() {
        this.setGraphic('female')
    }
    async onAction(player: RpgPlayer) {
        await player.showText('我給您10元', {
            talkWith: this
        })
        player.gold += 10
    }
} 