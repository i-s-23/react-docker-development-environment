# Workflows

## fix-dependabot.yml — Dependabot 脆弱性の自動修正

### 用途

Dependabot が検出したセキュリティアラートに対して、パッケージのバージョン制約を自動で引き上げ、修正 PR を作成するワークフロー。

Dependabot 標準の自動 PR はパッケージマネージャーによっては動作しない場合がある。このワークフローは `package.json` の `overrides` / `resolutions`、または Python のパッケージファイルに直接バージョン制約を書き込むことで、間接依存を含む脆弱パッケージを強制的にアップグレードする暫定対応を行う。

### 認証方法

追加の Secrets や GitHub App は不要。ランナーに自動付与される **`GITHUB_TOKEN`** のみで完結する。

必要な権限は以下の 3 つ。いずれもワークフローファイル内で明示的に宣言している。

| 権限 | 用途 |
|---|---|
| `security-events: read` | Dependabot アラートの取得 |
| `contents: write` | 修正ブランチの作成・push |
| `pull-requests: write` | 修正 PR の作成 |

### 動作フロー

```
1. open 状態の Dependabot アラートを全件取得（severity でフィルタ）
         ↓
2. パッケージマネージャーを自動判定
         ↓
3. 既存の修正 PR があればスキップ（重複防止）
         ↓
4. 修正ブランチを作成（fix/dependabot-<run_id>）
         ↓
5. パッケージファイルにバージョン制約を書き込む
         ↓
6. ロックファイルを再生成（install 実行）
         ↓
7. 変更をコミット・push して PR を作成
```

### 対応パッケージマネージャー

| マネージャー | 修正方法 |
|---|---|
| pnpm | `pnpm.overrides` に `^FIXED` を追記 |
| yarn | `resolutions` に `^FIXED` を追記 |
| npm | `overrides` に `^FIXED` を追記 |
| pip | `requirements.txt` に `>=FIXED` を追記 |
| poetry | `pyproject.toml` の `[tool.poetry.dependencies]` に `>=FIXED,<NEXT_MAJOR` を追記 |
| pipenv | `Pipfile` の `[packages]` に `>=FIXED,<NEXT_MAJOR` を追記 |

リポジトリ内で最初に見つかったマネージャー 1 種のみを処理する（複数マネージャー混在リポジトリは非対応）。

### トリガー

| トリガー | 条件 |
|---|---|
| `schedule` | 毎週月曜 09:00 JST に自動実行 |
| `workflow_dispatch` | Actions タブから手動実行（severity をカスタマイズ可能） |

### 手動実行時のパラメータ

| パラメータ | デフォルト | 説明 |
|---|---|---|
| `severity` | `critical high medium` | 対象 severity をスペース区切りで指定。指定可能な値: `critical` `high` `medium` `low` |

### 注意事項

- このワークフローの修正は**暫定対応**。`overrides` / `resolutions` は間接依存を強制バージョンアップするもので、直接依存のアップグレードで解消できる場合は overrides を削除することを推奨
- `GITHUB_TOKEN` で作成した PR は他の GitHub Actions ワークフローのトリガーにならない（GitHub の仕様）。CI が必要な場合は手動で再実行するか、GitHub App を利用する
