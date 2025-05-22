// src/rpg_common/events/my_name_changer_npc.js
// 假設這個檔案是你的 NPC 事件腳本

import { RpgEvent } from '@rpgjs/server';

export class MyNameChangerNPC extends RpgEvent {
    onInit() {
        this.name = '名稱修改者'; // NPC 的預設名稱
        this.set
        this.graphic = 'male_character_01'; // 設定一個角色圖像
    }

    async onAction(player) {
        // 第一次對話
        await player.showText('你好，冒險者！你想要改名嗎？');

        const { selection } = await player.showChoices('請選擇:', [
            { text: '是的，我想改名。', value: 'yes' },
            { text: '不，謝謝。', value: 'no' }
        ]);

        if (selection === 'yes') {
            const { text: newName } = await player.showVariable({
                name: 'playerNewName', // 變數名稱，用於儲存玩家輸入
                title: '輸入新名字',
                type: String, // 期望輸入的類型
                defaultValue: player.name // 預設值為玩家目前的名字
            });

            if (newName && newName.trim() !== '') {
                player.name = newName.trim(); // 更新玩家的名稱
                await player.showText(`好的，你的新名字是：**${player.name}**。`);
            } else {
                await player.showText('你沒有輸入有效的新名字。');
            }
        } else {
            await player.showText('好的，那下次再見！');
        }
    }
}
