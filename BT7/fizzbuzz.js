console.log("===== FIZZBUZZ CLASSIC =====");

for (let i = 1; i <= 100; i++) {

    if (i % 15 === 0) {
        console.log("FizzBuzz");
    }
    else if (i % 3 === 0) {
        console.log("Fizz");
    }
    else if (i % 5 === 0) {
        console.log("Buzz");
    }
    else {
        console.log(i);
    }
}

console.log("\n===== CUSTOM FIZZBUZZ =====");

function customFizzBuzz(limit, rules) {

    for (let i = 1; i <= limit; i++) {

        let output = "";

        for (let j = 0; j < rules.length; j++) {

            if (i % rules[j].divisor === 0) {
                output += rules[j].word;
            }
        }

        console.log(output || i);
    }
}

customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);