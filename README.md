# DeepseekShare Chrome 扩展

一个用于 Deepseek 聊天界面的 Chrome 扩展，支持选择性截图分享功能。

## 功能特点

- 在 Deepseek 聊天界面添加截图按钮
- 支持选择性截图：可以选择多个对话内容进行截图
- 保持 Deepseek 原有界面风格
- 截图质量优化：使用 2 倍缩放确保清晰度

## 使用方法

1. 点击聊天界面右上角的截图按钮进入选择模式
2. 点击对话内容前的选择图标（🟩）选中需要截图的内容
   - 选中状态会显示为 ✅
   - 可以选择多个对话内容
3. 再次点击截图按钮生成截图
4. 如果没有选择任何内容，会提示"请选择至少一个对话内容"

## 技术实现

- 使用 `html2canvas` 库进行页面截图
- 采用 SVG 图标保持界面一致性
- 模块化设计：
  - `button.js`: 按钮创建和交互逻辑
  - `utils.js`: 截图核心功能
  - `content.js`: 扩展入口和模块协调

## 安装方法

1. 下载扩展文件
2. 打开 Chrome 扩展管理页面 (chrome://extensions/)
3. 开启"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择扩展文件夹

## 注意事项

- 仅支持 Deepseek 聊天界面 (https://chat.deepseek.com/*)
- 确保页面完全加载后再使用截图功能
- 建议在截图前等待对话内容完全加载

## 版本历史

### v0.8 (2025-02-01)
- 新增选择性截图功能
- 优化按钮样式和交互逻辑
- 改进截图质量

### v0.5 (2025-01-28)
- 基础截图功能
- 界面集成
