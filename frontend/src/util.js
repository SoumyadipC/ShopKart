export default {
    formatCurrency: function (num) {
        return 'Rs' + Number(num.toFixed(1)).toLocaleString() + ' ';
    }
}