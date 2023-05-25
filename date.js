

module.exports.getDate = function () {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    const options = { weekday: "short", day: "numeric", month: "short" };
    return today.toLocaleDateString("en-US", options);
    // var day = today.toLocaleDateString("ja-JP", options);
}