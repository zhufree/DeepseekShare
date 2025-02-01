// File: capture.js
// Description: 截图核心功能模块
// 主要功能：
// 1. 创建临时截图容器
// 2. 执行HTML到canvas的转换
// 3. 对话内容分组处理
// 依赖: html2canvas@1.4.1

const _MAX_PIC_HEIGHT = 5000; // 最大高度限制（像素）

// 创建临时容器用于截图
function createTempContainer(originalContainer) {
    const temp = document.createElement('div');
    temp.style.position = 'fixed';
    temp.style.left = '-9999px';
    temp.style.top = '0';
    temp.style.width = originalContainer.clientWidth + 'px';
    temp.style.backgroundColor = '#ffffff';
    // 复制原容器的样式
    const styles = window.getComputedStyle(originalContainer);
    temp.style.padding = styles.padding;
    temp.style.margin = styles.margin;
    temp.style.border = styles.border;
    document.body.appendChild(temp);
    return temp;
}

// 对话片段截图
async function captureSegment(container, elements) {
    const temp = createTempContainer(container);
    elements.forEach(el => {
        const clone = el.cloneNode(true);
        temp.appendChild(clone);
    });

    try {
        const canvas = await html2canvas(temp, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            logging: false,
            windowWidth: container.clientWidth,
            windowHeight: temp.scrollHeight
        });
        const dataUrl = canvas.toDataURL('image/png');
        return dataUrl;
    } finally {
        temp.remove();
    }
}

// 将对话元素分组
function groupElements(elements) {
    const groups = [];
    let currentGroup = [];
    let currentHeight = 0;

    for (const element of elements) {
        const elementHeight = element.offsetHeight;
        console.log(elementHeight);
        console.log(currentHeight);
        // 如果当前组为空，或者添加新元素后不超过最大高度
        if (currentGroup.length === 0 || currentHeight + elementHeight <= _MAX_PIC_HEIGHT) {
            currentGroup.push(element);
            currentHeight += elementHeight;
        } else {
            // 如果当前组只有一个元素但高度已超过限制，强制作为一组
            if (currentGroup.length === 1) {
                groups.push(currentGroup);
                currentGroup = [element];
                currentHeight = elementHeight;
            } else {
                // 当前组已满，创建新组
                groups.push(currentGroup);
                currentGroup = [element];
                currentHeight = elementHeight;
            }
        }
    }

    // 添加最后一组
    if (currentGroup.length > 0) {
        groups.push(currentGroup);
    }

    return groups;
}

// 主截图函数
export async function captureChat(selectedElements) {
    const container = document.querySelector('.chat-container');
    if (!container) return { success: false };

    // 使用传入的选中元素或默认全部
    const elementsToCapture = selectedElements || Array.from(container.querySelectorAll('.chat-item'));

    // 对元素进行分组
    const groups = groupElements(elementsToCapture);
    
    // 为每组生成截图
    const images = await Promise.all(groups.map(group => 
        captureSegment(container, group)
    ));

    return {
        success: true,
        images: images,
        totalGroups: groups.length
    };
}
