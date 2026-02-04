import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// Viteの設定を定義するためのヘルパー関数。エディタでの入力補完が効くようになります。
export default defineConfig({
  // プロジェクトで使用するプラグインのリスト
  plugins: [
    // ReactをViteで利用するためのプラグイン
    react(),
    // SVGファイルをReactコンポーネントとしてインポートできるようにするプラグイン
    svgr()
  ],
  // 開発サーバーに関する設定
  server: {
    // サーバーがリッスンするIPアドレスを指定します。
    // '0.0.0.0'またはtrueに設定すると、ローカルネットワーク内の他のデバイス（Dockerコンテナなど）からのアクセスを許可します。
    host: '0.0.0.0',
    // HMR (Hot Module Replacement) の設定
    hmr: {
      // HMRクライアントが接続するポート番号を明示的に指定します。
      // Dockerなどのコンテナ環境でポートフォワーディングを使用している場合に必要です。
      clientPort: 5173,
    },
  },
});
