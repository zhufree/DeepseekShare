// File: button.js
// Description: 用户界面交互模块
// 主要功能：
// 1. 创建带状态切换的截图按钮
// 2. 管理用户选择的对话内容
// 3. 协调截图功能调用
// 版本: 2.0 (2025-02-01)

// 创建截图按钮
function createCaptureButton() {
    const iconContainer = document.querySelector('.ds-icon').parentElement;
    if (!iconContainer || document.querySelector('#deepseek-capture-btn')) {
        return;
    }

    const buttonDiv = document.createElement('div');
    buttonDiv.style.marginTop = '38px';
    buttonDiv.style.marginBottom = '38px';
    buttonDiv.style.display = 'flex';
    
    const button = document.createElement('div');
    button.id = 'deepseek-capture-btn';
    button.className = 'ds-icon-button';
    button.tabIndex = 0;
    button.style.setProperty('--ds-icon-button-size', '28px');
    
    // 添加截图图标
    button.innerHTML = `
        <svg t="1738036035350" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1487" width="200" height="200"><path d="M320.544 437.968a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16H240v256h539.04v-256H688a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h123.04a16 16 0 0 1 16 16v320a16 16 0 0 1-16 16H208a16 16 0 0 1-16-16v-320a16 16 0 0 1 16-16z m201.92-194.576l135.104 105.44a16 16 0 0 1 2.768 22.448l-9.856 12.608a16 16 0 0 1-22.464 2.752L536.96 315.52l-0.768 274.56a16 16 0 0 1-14.176 15.872l-1.856 0.096-16-0.048a16 16 0 0 1-15.968-16.048l0.768-276.528-94.208 71.008a16 16 0 0 1-21.12-1.6l-1.28-1.536-9.616-12.752a16 16 0 0 1 3.136-22.4l0.032-0.032 137.136-102.88a16 16 0 0 1 19.456 0.16z" fill="currentColor" p-id="1488"></path></svg>
    `;

    // 添加工具提示
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.left = '100%';
    tooltip.style.marginLeft = '8px';
    tooltip.style.padding = '4px 8px';
    tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.display = 'none';
    tooltip.style.width = '60px';
    tooltip.textContent = '截图对话';
    button.appendChild(tooltip);

    // 显示/隐藏工具提示
    button.addEventListener('mouseenter', () => tooltip.style.display = 'block');
    button.addEventListener('mouseleave', () => tooltip.style.display = 'none');

    // 添加点击事件
    button.addEventListener('click', async () => {
        try {
            button.style.opacity = '0.5';
            // 查找对话容器
            const flexElement = document.querySelector('.ds-flex');
            if (!flexElement) {
                console.error('未找到flex容器');
                return;
            }
            const chatContainer = flexElement.parentElement?.parentElement?.parentElement;
            if (!chatContainer) {
                console.error('未找到聊天容器');
                return;
            }
            // 新增选择模式判断
            const isSelectionMode = button.dataset.mode === 'select';

            if (!isSelectionMode) {
                // 进入选择模式
                button.dataset.mode = 'select';
                
                // 获取所有对话元素
                const dialogElements = Array.from(chatContainer.children);
                dialogElements.forEach(item => {
                    const firstFlex = item.querySelector('.ds-flex');
                    if (!firstFlex) return;
                    
                    const secondFlex = firstFlex.querySelector('.ds-flex');
                    const flexChild = secondFlex || firstFlex;

                    const buttonContainer = document.createElement('div');
                    buttonContainer.className = 'ds-icon-button';
                    buttonContainer.tabIndex = 0;
                    buttonContainer.style.setProperty('--ds-icon-button-text-color', '#909090');
                    buttonContainer.style.setProperty('--ds-icon-button-size', '20px');

                    const iconContainer = document.createElement('div');
                    iconContainer.className = 'ds-icon';
                    iconContainer.style.fontSize = '20px';
                    iconContainer.style.width = '20px';
                    iconContainer.style.height = '20px';
                    
                    // 使用SVG作为选择图标
                    const unselectedSvg = `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`;
                    const selectedSvg = `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.5" fill="currentColor"/><path d="M8 10L9.5 11.5L12.5 8.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
                    
                    iconContainer.innerHTML = unselectedSvg;
                    iconContainer.style.cursor = 'pointer';

                    // 初始状态设置为未选中
                    iconContainer.dataset.selected = 'false';
                    item.dataset.selected = 'false';

                    // 添加选中状态切换
                    buttonContainer.addEventListener('click', () => {
                        const isSelected = iconContainer.dataset.selected === 'true';
                        iconContainer.innerHTML = isSelected ? unselectedSvg : selectedSvg;
                        iconContainer.dataset.selected = isSelected ? 'false' : 'true';
                        item.dataset.selected = isSelected ? 'false' : 'true';
                    });

                    buttonContainer.appendChild(iconContainer);
                    flexChild.insertBefore(buttonContainer, flexChild.firstChild);
                });

                // 切换为截图图标
                button.innerHTML = `
                    <svg t="1738036035350" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1487" width="200" height="200"><path d="M320.544 437.968a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16H240v256h539.04v-256H688a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h123.04a16 16 0 0 1 16 16v320a16 16 0 0 1-16 16H208a16 16 0 0 1-16-16v-320a16 16 0 0 1 16-16z m201.92-194.576l135.104 105.44a16 16 0 0 1 2.768 22.448l-9.856 12.608a16 16 0 0 1-22.464 2.752L536.96 315.52l-0.768 274.56a16 16 0 0 1-14.176 15.872l-1.856 0.096-16-0.048a16 16 0 0 1-15.968-16.048l0.768-276.528-94.208 71.008a16 16 0 0 1-21.12-1.6l-1.28-1.536-9.616-12.752a16 16 0 0 1 3.136-22.4l0.032-0.032 137.136-102.88a16 16 0 0 1 19.456 0.16z" fill="currentColor" p-id="1488"></path></svg>
                `;
                tooltip.textContent = '截图选中内容';
            } else {
                // 执行截图逻辑
                const selectedItems = Array.from(chatContainer.children)
                    .filter(item => item.dataset.selected === 'true');
                
                if (selectedItems.length === 0) {
                    alert('请选择至少一个对话内容');
                    return;
                }

                const result = await captureChat(selectedItems, { /* 新增参数 */ });
                if (result.success) {
                    // 创建下载链接
                    result.images.forEach((dataUrl, index) => {
                        const link = document.createElement('a');
                        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
                        const suffix = result.images.length > 1 ? `-${index + 1}-of-${result.images.length}` : '';
                        link.download = `deepseek-chat-${timestamp}${suffix}.png`;
                        link.href = dataUrl;
                        link.click();
                    });
                } else {
                    console.error('截图失败:', result.error);
                }
            }
        } catch (error) {
            console.error('截图错误:', error);
        } finally {
            button.style.opacity = '1';
        }
    });

    buttonDiv.appendChild(button);
    
    // 将按钮插入为第四个子元素
    const children = Array.from(iconContainer.children);
    if (children.length >= 3) {
        iconContainer.insertBefore(buttonDiv, children[3]);
    } else {
        iconContainer.appendChild(buttonDiv);
    }
}

// 监听页面变化，确保按钮始终存在
function initButton() {
    const observer = new MutationObserver(() => {
        if (!document.querySelector('#deepseek-capture-btn')) {
            createCaptureButton();
        }
    });

    // 开始观察页面变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 初始化时创建按钮
    createCaptureButton();
}
