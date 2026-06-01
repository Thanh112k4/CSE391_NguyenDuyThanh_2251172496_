// 1. PIPE

function pipe(...fns) {
    return function (value) {
        return fns.reduce(
            (result, fn) => fn(result),
            value
        );
    };
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);

console.log(process(5));

// =================================

// 2. MEMOIZE

function memoize(fn) {
    const cache = {};

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache[key]) {
            console.log("Lấy từ cache");
            return cache[key];
        }

        const result = fn(...args);
        cache[key] = result;

        return result;
    };
}

const expensiveCalc = memoize(n => {
    console.log("Đang tính...");

    let result = 0;

    for (let i = 0; i < n; i++) {
        result += i;
    }

    return result;
});

console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));

// =================================

// 3. DEBOUNCE

function debounce(fn, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const search = debounce(query => {
    console.log("Searching:", query);
}, 500);

search("i");
search("ip");
search("iph");
search("iphone");

// =================================

// 4. RETRY

async function retry(
    fn,
    maxAttempts = 3
) {
    let attempts = 0;

    while (attempts < maxAttempts) {
        try {
            return await fn();
        } catch (error) {
            attempts++;

            console.log(
                `Lần thử ${attempts} thất bại`
            );

            if (
                attempts === maxAttempts
            ) {
                throw error;
            }
        }
    }
}

// TEST RETRY

let count = 0;

retry(async () => {
    count++;

    if (count < 3) {
        throw new Error(
            "Lỗi tạm thời"
        );
    }

    return "Thành công!";
})
    .then(console.log)
    .catch(console.error);