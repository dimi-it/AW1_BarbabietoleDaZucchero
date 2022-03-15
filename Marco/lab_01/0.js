"use strict"

const values = ["", "a", "as", "asd", "asdf", "asdfg"];

function stringSlicer(strings){
    strings.forEach(element => {
        let s = ""
        if (element.length >= 2){
            s = s.concat(element.slice(0,2))
                .concat(element.slice(element.length-2, element.length));
            console.log(s);
        }
    });
}

console.log("stringhe iniziali: ", values);
stringSlicer(values);  