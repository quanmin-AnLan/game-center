
/**
 * developer:luzongpeng
 * time:2023/4/25 10:21
 * explain:创建一个单例的webscoket,导入全局使用
 */
class webSocket {
  constructor(url, time) {
    this.Wsurl = url; //通信地址 wss:// ws://
    this.socketTask = null; //soke
    this.show = false; //连接状态
    this.timeout = time; //执行时间
    this.heartbeatTime = null; //心跳检测
    this.reconnectionTime = null; //重连
    try {
      return this.connectSocket();
    } catch (e) {
      this.show = false; //链接关闭
      this.reconnect(); //重连
    }
  }
  //进行 创建 打开 接受 关闭 监听
  connectSocket() {
    //创建WebSocket链接
    // 这部分代码需要更改，理解为调用了接口，然后返回一个weboscket对象用于全局使用
    /* this.socketTask = uni.connectSocket({
      url: this.Wsurl, //服务器接口地址 测试的时候可以用ws 发布必须用wss
      success: () => {
        console.log("🍏正准备建立websocket中...");
        return this.socketTask;
      },
    }); */
    //监听WebSocket打开成功事件
    this.socketTask.onOpen((res) => {
      console.log(res, "🍏WebSocket已打开！");
      clearTimeout(this.heartbeatTime); //清楚定时器
      clearTimeout(this.reconnectionTime); //清楚定时器
      this.show = true; //链接打开
      //监听WebSocket返回的数据
      this.socketTask.onMessage((res) => {
        console.log(JSON.parse(res.data), "🍏收到的消息");
        let msg = JSON.parse(res.data)
        // 下面这一块是后端返回来的数据 有些后端会做类型 有些不会 做了的你就根据他的返回做不同操作 我这里的是type
        if (msg.type === 'connect') {
          this.heartbeat(); //心跳检测
        } else if (msg.type === "get-list") {
          // 这部分代码需要更改
          // uni.$emit("WebSocketinfo", msg); //将他保存到本地
        } else {
          console.log('其他操作');
        }
      });
    });
    //监听WebSocket事件
    this.socketTask.onClose(() => {
      console.log("🍎WebSocket已关闭");
      this.show = false; //链接关闭
      this.reconnect(); //重连
    });
  }
  //通过WebSocket发送消息
  send(data) {
    this.socketTask.send({
      data: data,
      success: (res) => {
        console.log(res, data, "🍏WebSocket消息发送成功");
      },
    });
  }
  //心跳检测
  heartbeat() {
    this.heartbeatTime = setTimeout(() => {
      let data = 'ping' //这里是发送给后端的一个关键字 不会当作消息发出来 而是跟他保持通讯的关键字
      this.send(JSON.stringify(data));
    }, this.timeout);
  }
  //重连
  reconnect() {
    clearTimeout(this.heartbeatTime); //清楚定时器 停止发送心跳
    //false重连
    if (!this.show) {
      this.reconnectionTime = setTimeout(() => {
        this.connectSocket();
      }, 10);
    }
  }
}
module.exports = webSocket;