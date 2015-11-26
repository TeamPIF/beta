function processName(bname) {
    var processed = bname.replace(/_/gi, " ");
    return processed;
}

module.exports.processName = processName;
