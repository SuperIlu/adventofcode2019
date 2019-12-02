/*
MIT License

Copyright (c) 2019 Andre Seidelt <superilu@yahoo.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

--------

This code was created for the Advent of Code 2019:
    https://adventofcode.com/

*/

var lines = ["START"];
var max_lines;
var inFile;
var result = 0;
var pc = 0;
var prg;

/*
** This function is called once when the script is started.
*/
function Setup() {
	SetFramerate(30);
	MouseShowCursor(false);
	max_lines = (SizeY() / 10) - 1;

	inFile = new File("examples/aoc2019/day02/input", FILE.READ);
	prg = inFile.ReadLine().split(",");
	for (var i = 0; i < prg.length; i++) {
		prg[i] = new Number(prg[i]);
	}
	prg[1] = 12;
	prg[2] = 2;
}

/*
** This function is repeatedly until ESC is pressed or Stop() is called.
*/
function Loop() {
	ClearScreen(EGA.BLACK);

	TextXY(SizeX() - 120, 5, 'result=' + result, EGA.CYAN);

	for (var l = 0; l < lines.length; l++) {
		TextXY(2, 10 * (l + 1), lines[l][1], lines[l][0]);
	}

	if (prg) {
		var op = "";
		if (prg[pc] == 99) {
			result = prg[0];
			prg = null;
			op = "HALT";
		} else if (prg[pc] == 1) {
			var in1 = prg[pc + 1];
			var in2 = prg[pc + 2];
			var out = prg[pc + 3];

			prg[out] = prg[in1] + prg[in2];

			op = prg[in1] + "+" + prg[in2] + "->[" + out + "]";

			pc += 4;
		} else if (prg[pc] == 2) {
			var in1 = prg[pc + 1];
			var in2 = prg[pc + 2];
			var out = prg[pc + 3];

			prg[out] = prg[in1] * prg[in2];

			op = prg[in1] + "*" + prg[in2] + "->[" + out + "]";

			pc += 4;
		} else {
			op = result = "ERROR: pc=" + pc + ", opcode=" + prg[pc];
			prg = null;
		}
		lines.push([EGA.GREEN, op]);
	}

	// truncate to max lines
	while (lines.length > max_lines) {
		lines.shift();
	}
}

/*
** This function is called on any input.
*/
function Input(event) {
}
