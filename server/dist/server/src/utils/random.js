"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function randomPercent() {
    return Math.ceil(Math.random() * 100);
}
exports.randomPercent = randomPercent;
function underPercent(x) {
    return randomPercent() < x;
}
exports.underPercent = underPercent;
function isBetween(target, min, max) {
    return target >= min && target <= max;
}
exports.isBetween = isBetween;
//# sourceMappingURL=random.js.map