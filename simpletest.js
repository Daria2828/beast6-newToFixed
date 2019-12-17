/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */

 // TODOs
 // DONE: Get successes to be green
 // DONE: Make sure only 1 error per failure goes to console
 // DONE: Make failures red
 // DONE: Show stack traces for failures
 // DONE: Only show stack traces if you click expand
 // DONE: Output summary statistics to the DOM

var TinyTestHelper = {
    renderStats: function(tests, failures) {
        // Output summary stats displayed on DOM: # of tests run, successes, failures
        var numberOfTests = Object.keys(tests).length;
        var successes = numberOfTests - failures;
        var summaryString = 'Ran '+ numberOfTests + ' tests: ' + successes + ' successes, ' + failures + ' failures';
        var summaryElement = document.createElement('h1');
        summaryElement.textContent = summaryString;
        document.body.appendChild(summaryElement);
    }
};

var TinyTest = {

    run: function(tests) {
        var failures = 0;
        for (var testName in tests) { 
            var testAction = tests[testName]; 
            try {
                testAction.apply(this); 
                console.log('%c' + testName, "color: green"); 
            } catch (e) { 
                failures++;
                // changed from console.error --> .log --> .groupCollapsed so that 2 errors don't show per failure
                console.groupCollapsed('%c' + testName, "color: red");
                console.error(e.stack); 
                console.groupEnd();
            }
        }
        setTimeout(function() { 
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999'); // green or red
                TinyTestHelper.renderStats(tests, failures); 
            // GZ reorganized code, moved orig fxn into helper obj/utility method at top. 
            // Makes setTimeOut cleaner, easier to read for ppl who are just glancing at your code.
            }
        }, 0); 
    },

    fail: function(msg) { 
        throw new Error('fail(): ' + msg); 
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    tests              = TinyTest.run.bind(TinyTest);