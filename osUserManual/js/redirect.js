/**
 * 获取url上的lang参数，显示不同的语言
 * @author Minsi Zhan
 */
var lang = getQueryString(location.search, 'lang');
if (!lang || lang.indexOf('en') > -1) {
    document.getElementById('en').style.display = 'block';
    document.getElementById('ko').style.display = 'none';
} else {
    document.getElementById('en').style.display = 'none';
    document.getElementById('ko').style.display = 'block';
}

function getQueryString(str, name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = str.substr(1).match(reg);
    if (r != null) return unescape(r[2]).toLowerCase();
    return null;
}