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

var lines = [""];
var max_lines;
var inFile;
var sum = 0;
var lastFuel = 0;

/*
** This function is called once when the script is started.
*/
function Setup() {
    SetFramerate(30);
    MouseShowCursor(false);
    inFile = new File("examples/aoc2019/input", FILE.READ);
    max_lines = (SizeY() / 10) - 1;
}

/*
** This function is repeatedly until ESC is pressed or Stop() is called.
*/
function Loop() {
    ClearScreen(EGA.BLACK);

    TextXY(SizeX() - 120, 5, 'fuel=' + sum, EGA.CYAN);

    for (var l = 0; l < lines.length; l++) {
        TextXY(2, 10 * (l + 1), lines[l][1], lines[l][0]);
    }

    if (inFile) {
        var line = inFile.ReadLine();
        if (line) {
            line = line.trim();
            var divided = line / 3;
            var floor = Math.floor(divided);
            var sub = floor - 2;
            var fuelFuel = calcFuelFuel(sub);
            sum += fuelFuel;

            lines.push([EGA.LIGHT_GREEN, "M:" + padd(line, 8) + " | " + padd(divided.toFixed(3), 8) + " | " + padd(floor, 8) + " | " + padd(sub, 8) + " | " + padd(fuelFuel, 8)]);
        } else {
            inFile = null;
        }
        lastFuel = sum;
    }

    // truncate to max lines
    while (lines.length > max_lines) {
        lines.shift();
    }
}

function calcFuelFuel(fuel) {
    var lastFuel = fuel;
    while (true) {
        var fuelFuel = Math.floor(lastFuel / 3) - 2;
        if (fuelFuel < 0) {
            break;
        }
        lastFuel = fuelFuel;
        fuel += fuelFuel;
    }
    return fuel;
}

function padd(str, max) {
    while (str.length < max) {
        str = " " + str;
    }
    return str;
}

/*
** This function is called on any input.
*/
function Input(event) {
}
