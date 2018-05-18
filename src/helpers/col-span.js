module.exports = function (emailOrder) {
    let colspan = 0;

    if (emailOrder.showPrice) {
        colspan += 1;
    }

    if (emailOrder.showDeadline) {
        colspan += 1;
    }

    if (emailOrder.showStatus) {
        colspan += 1;
    }

    return colspan;
}