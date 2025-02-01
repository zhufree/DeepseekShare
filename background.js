chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sharePage') {
    // 处理分享逻辑
    console.log('分享页面:', request.data);
    // 这里可以添加具体的分享实现
  }
});
