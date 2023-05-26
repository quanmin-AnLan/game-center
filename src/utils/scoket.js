
/**
 * developer:luzongpeng
 * time:2023/4/25 10:21
 * explain:创建一个单例的webscoket,导入全局使用
 */// 在Vue中使用，不需要可以去除以下引用
// 定义WebSocketService类
// 单例WebSocket类
class SingletonWebSocket {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.timer = null;
    this.timeout = 60000; // 心跳超时时间（单位：毫秒）
  }

  // 获取WebSocket实例
  getInstance() {
    if (!this.ws) {
      this.createWebSocket();
    }
    return this.ws;
  }

  // 创建WebSocket实例
  createWebSocket() {
    this.ws = new WebSocket(this.url);

    // 监听WebSocket事件
    this.ws.onopen = () => {
      console.log('WebSocket已连接');
      this.startHeartbeat(); // 开始心跳
    };
    this.ws.onmessage = (event) => {
      console.log('收到消息：', event.data);
    };
    this.ws.onclose = () => {
      console.log('WebSocket已关闭');
      this.stopHeartbeat(); // 停止心跳
      this.reconnect(); // 重新连接
    };
    this.ws.onerror = (event) => {
      console.error('WebSocket错误：', event);
      this.stopHeartbeat(); // 停止心跳
      this.reconnect(); // 重新连接
    };
  }

  // 发送消息
  send(message) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.error('WebSocket未连接');
    }
  }

  // 开始心跳
  startHeartbeat() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.send('ping'); // 发送心跳包
    }, this.timeout);
  }

  // 停止心跳
  stopHeartbeat() {
    clearInterval(this.timer);
  }

  // 重新连接
  reconnect() {
    setTimeout(() => {
      console.log('正在重新连接WebSocket...');
      this.createWebSocket();
    }, 3000); // 3秒后重新连接
  }
}

// 导出单例WebSocket实例
export const webSocket = new SingletonWebSocket('ws://localhost:8080/ws').getInstance();


