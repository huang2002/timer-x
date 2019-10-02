/// <reference types=".." />
const output = document.getElementById('output');

function log(content) {
    output.appendChild(document.createElement('li'))
        .appendChild(document.createTextNode(content));
}

function test(name, expectation, callback) {
    const start = Date.now();
    function resolve() {
        const timeout = Date.now() - start,
            delta = timeout - expectation;
        log(`[${name}] timeout: ${timeout} expectation: ${expectation} delta: ${delta}`);
    }
    function assert(value, expectation) {
        if (value !== expectation) {
            log(`[${name}] ASSERT FAILED! expectation:${expectation} actual:${value}`);
        }
    }
    callback(resolve, assert);
}

requestAnimationFrame(() => {
    test('TX.waitAnimationFrame', 15, (resolve, assert) => {
        const testData = 'foo';
        TX.waitAnimationFrame(testData).then(data => {
            resolve();
            assert(data, testData);
        });
    });
});

test('TX.waitTimeout', 500, (resolve, assert) => {
    const testData = 'bar';
    TX.waitTimeout(500, testData).then(data => {
        resolve();
        assert(data, testData);
    });
});

requestAnimationFrame(() => {
    test('timer.waitAnimationFrame', 15, (resolve, assert) => {
        const timer = new TX.Timer(),
            testData = '666';
        timer.waitAnimationFrame(testData).then(data => {
            resolve();
            assert(data, testData);
        });
    });
});

test('timer.waitTimeout', 1000, (resolve, assert) => {
    const timer = new TX.Timer(),
        testData = '888';
    timer.waitTimeout(1000, testData).then(data => {
        resolve();
        assert(data, testData);
    });
});

test('timer.pause/resume', 1500, (resolve, assert) => {
    const timer = new TX.Timer(),
        testData = '999';
    timer.waitTimeout(500, testData).then(data => {
        resolve();
        assert(data, testData);
    });
    timer.pause();
    setTimeout(() => timer.resume(), 1000);
});

test('timer.reset', 1000, (resolve, assert) => {
    const timer = new TX.Timer(),
        testData = 'reset';
    timer.waitTimeout(600, testData).then(data => {
        resolve();
        assert(data, testData);
    });
    setTimeout(() => timer.reset(), 400);
});

test('timer.abort', 0, (resolve, assert) => {
    const timer = new TX.Timer(),
        testReason = 'abort';
    timer.waitTimeout(1000).then(data => {
        log('Failed to abort the timer!');
    }, reason => {
        resolve();
        assert(reason, testReason);
    });
    timer.abort(testReason);
});

test('timer.flush', 0, (resolve, assert) => {
    const timer = new TX.Timer(),
        testData = 'TypeScript';
    timer.waitTimeout(1000, testData).then(data => {
        resolve();
        assert(data, testData);
    });
    timer.flush();
});
