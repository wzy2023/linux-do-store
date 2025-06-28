export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id })

  // 监听来自content script的消息
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {

  })
})
