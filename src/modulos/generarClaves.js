function GenerarClaves() {
    const text = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    var a = text[Math.floor(Math.random() * text.length)];
    var b = text[Math.floor(Math.random() * text.length)];
    var c = text[Math.floor(Math.random() * text.length)];
    var d = text[Math.floor(Math.random() * text.length)];
    var e = text[Math.floor(Math.random() * text.length)];
    var f = text[Math.floor(Math.random() * text.length)];
    var g = text[Math.floor(Math.random() * text.length)];
    var h = text[Math.floor(Math.random() * text.length)];
    var i = text[Math.floor(Math.random() * text.length)];
    var j = text[Math.floor(Math.random() * text.length)];
    var k = text[Math.floor(Math.random() * text.length)];
    var l = text[Math.floor(Math.random() * text.length)];
    var m = text[Math.floor(Math.random() * text.length)];
    var n = text[Math.floor(Math.random() * text.length)];

    return a + b + c + e + n + i + j + h + g + d;

}

module.exports = GenerarClaves