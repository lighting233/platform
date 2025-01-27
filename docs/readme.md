# platform

## changeset

### 使用 Changesets 的工作流程

1. **安装 Changesets**：
   ```bash
   pnpm add -Dw @changesets/cli
   ```

2. **初始化 Changesets**：
   ```bash
   pnpm changeset init
   ```

3. **创建 Changeset**：
   当你修改了某个包（例如 `utils`）并希望发布新版本时，运行以下命令：
   ```bash
   pnpm changeset
   ```
   选择需要更新的包和版本类型（`patch`、`minor`、`major`），并生成 changeset 文件。

4. **应用 Changeset**：
   当你准备好发布新版本时，运行以下命令：
   ```bash
   pnpm changeset version
   ```
   这会根据 changeset 文件更新包的版本号，并生成 changelog。

5. **发布包**：
   最后，运行以下命令发布更新后的包：
   ```bash
   pnpm changeset publish
   ```

---