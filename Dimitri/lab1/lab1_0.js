"use strict"

const strings = ["a", "ab", "abc", "abcd", "abcde"];

let newStrings = strings.map(
    (str) => {
        if (str.length <= 2) {
            return str + str;
        }
        else {
            return str.substring(0, 2) + str.substring(str.length - 2, str.length);
        }
    }
)

console.log(strings);
console.log(newStrings);