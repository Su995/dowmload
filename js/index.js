/**
 * Created by Administrator on 2018/10/18.
 */
function validationTerminal(){
    var browser = {
        versions:function () {
            var ua = navigator.userAgent;
            return {
                weixin : ua.match(/MicroMessenger\/([^\s]+)/i),
                webkit : ua.match(/WebKit\/([\d.]+)/i),
                android : ua.match(/(Android)\s+([\d.]+)/i),
                ipad : ua.match(/(iPad).*OS\s([\d_]+)/i),
                ipod : ua.match(/(iPod).*OS\s([\d_]+)/i),
                iphone : !this.ipod && !this.ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/i),
                nokia : ua.toLowerCase().match(/nokia/i),
                webos : ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/i),
                touchpad : this.webos && ua.match(/TouchPad/i),
                kindle : ua.match(/Kindle\/([\d.]+)/i),
                silk : ua.match(/Silk\/([\d._]+)/i),
                blackberry : ua.match(/(BlackBerry).*Version\/([\d.]+)/i),
                mqqbrowser : ua.match(/MQQBrowser\/([\d.]+)/i),
                chrome : ua.match(/CriOS\/([\d.]+)/i),
                opera : ua.match(/Opera\/([\d.]+)/i),
                safari : ua.match(/Safari\/([\d.]+)/i),
                mobile : ua.match(/windows mobile\/([\d.]+)/i),
                mobilePhone: ua.toLowerCase().match(/mobile/i)
            }
        }()
    };
    return browser.versions;
}
/*
* scheme     : string app–≠“È
* iOSUrl     : string url
* androidUrl : string url
* */
function skip(scheme,iosUrl,androidUrl) {
    var wx = document.getElementById('openInWx');
    var container = document.getElementById("container");
    var main = document.getElementsByClassName('main');
    if (navigator.userAgent.match(/MicroMessenger/i)) {
        wx.className = 'show';
        main[0].style.top = 10+wx.offsetHeight*(100 / window.innerHeight) + "vh";
    } else {
        wx.className = 'hide';
    }
    //ios≈–∂œ
    if (validationTerminal().ipad || validationTerminal().iphone) {
        var isInstalled;
        var ifr = document.createElement('iframe');
        ifr.src = scheme;
        ifr.style.display = 'none';
        ifr.onload = function () {
            isInstalled = true;
            window.location.href = iosUrl;
            // window.location.href = "https://itunes.apple.com/cn/app/%E5%AE%89%E4%BF%9D%E5%B0%8F%E6%99%BA/id1135790133?mt=8";
        };
        document.body.appendChild(ifr);
        setTimeout(function () {
            document.body.removeChild(ifr);
        }, 1000);
    }

    if (validationTerminal().android ||validationTerminal().nokia || validationTerminal().mobilePhone && !validationTerminal().iphone) {
        var isInstalled;
        var ifr = document.createElement('iframe');
        ifr.src = scheme;
        ifr.style.display = 'none';
        ifr.onload = function () {
            isInstalled = true;
            window.location.href = androidUrl;
            // window.location.href = "http://iview.1link.com.cn:9090/appStore/iViewApp_G.apk";
        };

        document.body.appendChild(ifr);
        setTimeout(function () {
            document.body.removeChild(ifr);
        }, 1000);
    }
}