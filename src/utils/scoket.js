
/**
 * developer:luzongpeng
 * time:2023/4/25 10:21
 * explain:创建一个单例的webscoket,导入全局使用
 */// 在Vue中使用，不需要可以去除以下引用
// 定义WebSocketService类
class WebSocketService {
  // 构造函数接收WebSocket服务器的URL
  constructor(url) {
    this.url = url;
    this.socket = null;
  }

  // 连接到WebSocket服务器的方法
  connect() {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.url);

      // 当连接成功时，解析Promise
      this.socket.onopen = () => {
        resolve();
      };

      // 当连接出错时，拒绝Promise
      this.socket.onerror = (error) => {
        reject(error);
      };
    });
  }

  // 设置接收消息时的回调函数
  onMessage(callback) {
    this.socket.onmessage = (event) => {
      callback(event.data);
    };
  }

  // 向服务器发送消息的方法
  sendMessage(message) {
    this.socket.send(message);
  }

  // 断开与WebSocket服务器的连接
  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

// 导出WebSocket插件
export default {
  // Vue插件的install方法
  install(Vue, options) {
    // 创建WebSocketService实例
    const wsService = new WebSocketService(options.url);
    // 将WebSocketService实例添加到Vue原型上，使其在所有组件中可用
    Vue.prototype.$websocket = wsService;
  },
};

