

module.exports = function (value, value2, options) {
    if (value.toString() === value2.toString()) {
        return options.fn(this);
    }
    return options.inverse(this);
};

