# 対多 (不和)

唯一偽中国語使用可能掲示板

🌱 草。非常愉快、爆笑投稿用  
👍 親指。良仕事、高評価投稿用  
🍬 飴。可哀想、同情、及元気譲渡用

利用可能、不和鯖内！

## 起動方法

設置不和機器鍵、主番号:

```bash
cp .env.example .env
```

生成、起動:

```bash
# 依存関係
npm install

# 生成
npm run build

# 起動
npm run start
```

常時起動:

```bash
npm install -g pm2
# 起動
pm2 start ecosystem.config.cjs

# 再起動
pm2 restart tuita

# 停止
pm2 stop tuita

# 確認
pm2 logs tuita

# 鯖再起動後、自動起動
pm2 save
pm2 startup
```

## 導入

https://discord.com/oauth2/authorize?client_id=1478588627478118481

対多有効化:

```
*tuita <CHANNEL>
```
