// 代理服务器配置
// 通过server是否为null来判断是否开启代理
class PlaywrightProxy{
    server = null;
    username = null;
    password = null;

    setProxy(server){
        this.server = server
    }

    setProxy(server, username, password){
        this.server = server,
        this.username = username,
        this.password = password
    }

    jsonify() {
        return {
            server: this.server,
            username: this.username,
            password: this.password
        }
    }
}

module.exports = PlaywrightProxy