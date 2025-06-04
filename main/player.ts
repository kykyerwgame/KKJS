// 匯入 RPGJS 提供的類別與功能
import { RpgPlayer, type RpgPlayerHooks, Control, Components } from '@rpgjs/server'

// 定義玩家的 hook（事件邏輯），讓 RPGJS 知道這是要套用在每個玩家身上的行為
const player: RpgPlayerHooks = {
    
    // ✅ 玩家連線時觸發
    onConnected(player: RpgPlayer) {
        player.name = 'YourName'  // 設定玩家名稱，可換成帳號名稱或自訂字串
        player.setComponentsTop(Components.text('{name}'))  
        // 在玩家角色頭上顯示名字（顯示 {name} 會自動替換成 player.name）
    },

    // ✅ 玩家有輸入操作時觸發
    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()  
            // 按下返回鍵時開啟主選單（預設 ESC 鍵）
        }
    },

    // ✅ 玩家首次進入地圖時觸發
    async onJoinMap(player: RpgPlayer) {
        if (player.getVariable('AFTER_INTRO')) {
            return  // 如果之前已經進入過地圖，略過歡迎訊息
        }
        
        await player.showText('勇者您好，歡迎來到我的世界')
        // 顯示一段對話文字，等待玩家按鍵後繼續

        player.setVariable('AFTER_INTRO', true)
        // 記錄玩家已看過歡迎對話（下次進地圖不再顯示）
    }
}

export default player  // 匯出此設定，供 RPGJS 自動載入
