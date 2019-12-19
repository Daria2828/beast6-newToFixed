### Beast #6: A twist on accounting.toFixed

In AccountingJS 13, we looked at the accounting.toFixed method. We found that we could improve the function by simulating calculations like 1.005 * 100 with 1.005e2 (using exponential notation).

Your job is to rewrite accounting.toFixed so that it does NOT use multiplication or exponential notation. Instead, you will actually move the decimal point using string manipulation.

So in the example above, instead of using 1.005e2, you'll need to figure out a way to work with the string "1.005" and then create a new string with the decimal point moved over two places to the right. In other words, you need to turn "1.005" into "100.5" using string manipulation.

Include tests that cover the weird cases we saw in the video like 0.615, 10.235, and 1.005.
