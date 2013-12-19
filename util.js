String.prototype.chunk = function(n) {
    var ret = [];
    for (var i = 0, len = this.length; i < len; i += n) {
	ret.push(this.substr(i, n))
    }
    return ret
};