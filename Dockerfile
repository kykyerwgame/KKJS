# === 第一階段：建構階段（Build Stage） ===
FROM node:18 as build

# 設定工作目錄
WORKDIR /build

# 將所有專案檔案複製到容器內的 /build 資料夾
ADD . /build

# 安裝所有依賴（包括 devDependencies）
RUN npm i

# 設定環境變數為生產模式
ENV NODE_ENV=production

# 執行專案建構指令，生成 dist 目錄
RUN npm run build
