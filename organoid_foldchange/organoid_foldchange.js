var numberOfPlates = 25;  //get from DOM eventually.  Will be a string so need to use parseInt to turn into integer.

const fs = require('fs');

//need to change dataSource for each useage.
//enables javascript to read .csv file containing data
const dataSource = "./It9-6 day.csv";
var data = fs.readFileSync(dataSource, "utf8");


//need to change baselineSource for each useage.
//enables javascript to read .csv file containing baseline data
const baselineSource = "./baselinetest.csv";
var baselineData = fs.readFileSync(baselineSource, "utf8");


// //returns a string with no \r\n- 
// //works
var noCarraige = data.replace(/(\r\n|\n|\r)/gm, ",");
var noCarraigeBaseline = baselineData.replace(/(\r\n|\n|\r)/gm, ",");

// //create an array of string numbers seprarated by ,
// //works but have '',
var splitstringarray = noCarraige.split(',');
var baselineSplitStringArray = noCarraigeBaseline.split(",");


// //going to loop through splitstringarray and remove '', with .filter
// //WORKS!!!  Now we have an array of string numbers with no "",
var noWhiteSpace = splitstringarray.filter(function (value, index, arr) {
    return value != "";
})
var noWhiteSpaceBaseline = baselineSplitStringArray.filter(function (value, index, arr) {
    return value != "";
})

//FILTER OUT STRINGS LESS THAN 1.  WORKS.  Now we have an array with strings of length greater than 1
var stringlength = noWhiteSpace.filter(function (value, index, arr) {
    return value.length >= 4;
});

//turn array of strings of length 8 or more into numbers and push into a new array.  
//Still contains NaN but doesn't matter because I am finding start and finish index for each plate 
var numberArray = [];
for (i = 0; i < stringlength.length; i++) {
    var number = parseFloat(stringlength[i])
    numberArray.push(number);
}

var baselineNumberArray = [];
for (i = 0; i < noWhiteSpaceBaseline.length; i++) {
    var baselineNumber = parseFloat(noWhiteSpaceBaseline[i])
    baselineNumberArray.push(baselineNumber);
}
console.log(baselineNumberArray);

var baseline

//start and finish indexes of plateread values.
//must be hardcoded for up to 60 plates. might be able to find a pattern?
// var startFinishPositionArray = [425, 779, 1206, 1560, 1987, 2341, 2768,
//     3122, 3549, 3903, 4330, 4684, 5110, 5464,
//     5891, 6245, 6672, 7026, 7453, 7807, 8234,
//     8588, 9015, 9369, 9796, 10150, 10577, 10931,
//     11358, 11712, 12139, 12493, 12919, 13273, 13699,
//     14053, 14480, 14834, 15260, 15614, 16041, 16395,
//     16822, 17176, 17603, 17957, 18384, 18738, 19165,
//     19519, 19946, 20300, 20727, 21081, 21508, 21862,
//     22289, 22643, 23070, 23424];

//create array that contains indexes of first and last position for all plate read data.  The words "fisrt" and "last" must be added to .csv file prior to running program.
var firstLast = [];

for (i = 0; i <= stringlength.length; i++) {
    if (stringlength[i] === "first") {
        firstLast.push(i + 1);
    }
    if (stringlength[i] === "last") {
        firstLast.push(i - 1)
    }
}

//holds values for each plate within an array.  Plate 1 has index 0, etc.
var arrays = [];

//holds averages for each plate-array of arrays containing integers. Plate 1 has index 0, etc.
var averagesArray = [];

//adds an array for each plate withing array, then loops through numberArray within specific ranges(start and finish of plate data) and pushes values to array[i-1]
//after range is complete- removes first two values from startFinishPositionArray
//than adds an array withing averagesArray, then loops through array[i-1] within a specific range for each row and pushes values to array[i]
//ultimately end up with a bunch of arrays withing averagesArray- each containing 88 calculations, which is the total number of calculations for each plate read.
function AverageForPlates() {
    for (i = 1; i <= numberOfPlates; i++) {
        arrays.push([]);
        // console.log(startFinishPositionArray[0]);
        // console.log(startFinishPositionArray[1]);
        var num = 0;
        for (j = firstLast[num]; j <= firstLast[num + 1]; j++) {
            arrays[i - 1].push(numberArray[j]);
        }

        //remove the first two numbers from startFinishPosition Array
        firstLast.shift();
        firstLast.shift();

        //create an array to hold averages for each plate.  Plate 1 has index 0, etc.
        averagesArray.push([])

        //get averagesfor row1
        var a = 0;
        var b = 1;
        var c = 23;
        var d = 24;

        while (a <= 20 && b <= 21 && c <= 43 && d <= 44) {

            var sum1 = (arrays[i - 1][a] + arrays[i - 1][b] + arrays[i - 1][c] + arrays[i - 1][d]);
            var average = sum1 / 4;
            // console.log("average", average);
            averagesArray[i - 1].push(average);
            a += 2;
            b += 2;
            c += 2;
            d += 2;
        }

        //get averages for row2   
        var e = 45;
        var f = 46;
        var g = 68;
        var h = 69;

        while (e <= 65 && f <= 66 && g <= 88 && h <= 89) {
            var sum2 = (arrays[i - 1][e] + arrays[i - 1][f] + arrays[i - 1][g] + arrays[i - 1][h]);
            var average = sum2 / 4;
            averagesArray[i - 1].push(average);
            e += 2;
            f += 2;
            g += 2;
            h += 2;
        }

        //get averages fro row3
        var eye = 90;
        var j = 91;
        var k = 113;
        var l = 114;

        while (eye <= 110 && j <= 111 && k <= 133 && l <= 134) {
            var sum3 = (arrays[i - 1][eye] + arrays[i - 1][j] + arrays[i - 1][k] + arrays[i - 1][l]);
            var average = sum3 / 4;
            averagesArray[i - 1].push(average);
            eye += 2;
            j += 2;
            k += 2;
            l += 2;
        }

        //get averages for row4
        var m = 135;
        var n = 136;
        var o = 158;
        var p = 159;

        while (m <= 155 && n <= 156 && o <= 178 && p <= 179) {
            var sum4 = (arrays[i - 1][m] + arrays[i - 1][n] + arrays[i - 1][o] + arrays[i - 1][p]);
            var average = sum4 / 4;
            averagesArray[i - 1].push(average);
            m += 2;
            n += 2;
            o += 2;
            p += 2;
        }

        //get averages for row5
        var q = 180;
        var r = 181;
        var s = 203;
        var t = 204;

        while (q <= 200 && r <= 201 && s <= 223 && t <= 224) {
            var sum5 = (arrays[i - 1][q] + arrays[i - 1][r] + arrays[i - 1][s] + arrays[i - 1][t]);
            var average = sum5 / 4;
            averagesArray[i - 1].push(average);
            q += 2;
            r += 2;
            s += 2;
            t += 2;
        }

        //get averages for row6
        var u = 225;
        var v = 226;
        var w = 248;
        var x = 249;

        while (u <= 245 && v <= 246 && w <= 268 && x <= 269) {
            var sum6 = (arrays[i - 1][u] + arrays[i - 1][v] + arrays[i - 1][w] + arrays[i - 1][x]);
            var average = sum6 / 4;
            averagesArray[i - 1].push(average);
            u += 2;
            v += 2;
            w += 2;
            x += 2;
        }

        //get averages for row7
        var y = 270;
        var z = 271;
        var aa = 292;
        var bb = 293;

        while (y <= 290 && z <= 291 && aa <= 312 && bb <= 313) {
            var sum7 = (arrays[i - 1][y] + arrays[i - 1][z] + arrays[i - 1][aa] + arrays[i - 1][bb]);
            var average = sum7 / 4;
            averagesArray[i - 1].push(average);
            y += 2;
            z += 2;
            aa += 2;
            bb += 2;
        }

        //get averages for row8
        var cc = 314;
        var dd = 315;
        var ee = 336;
        var ff = 337;

        while (cc <= 334 && dd <= 335 && ee <= 356 && ff <= 357) {
            var sum8 = (arrays[i - 1][cc] + arrays[i - 1][dd] + arrays[i - 1][ee] + arrays[i - 1][ff]);
            var average = sum8 / 4;
            averagesArray[i - 1].push(average);
            cc += 2;
            dd += 2;
            ee += 2;
            ff += 2;
        }
    }
}

//call function to run when you execute file
AverageForPlates();


//now separate into groups of 5 for each organiod.
var averageFiveArray = [];

var sliceFirst = 0;
var sliceLast = 5;

while (sliceLast <= numberOfPlates) {
    //create a new array containing 5 arrays with averages calculations for each organoid 
    var averageGroup = averagesArray.slice(sliceFirst, sliceLast);
    averageFiveArray.push(averageGroup)

    sliceFirst += 5;
    sliceLast += 5
}
console.log("averageFiveArray", averageFiveArray.length);

//save averages calculations for 5 reads into a single file and output in a .csv file
//max number of files is dynamic for groups of 5.
const maxFiles = numberOfPlates / 5;

var organoidNumber = 1
for (i = 0; i <= averageFiveArray.length; i++) {

    fs.appendFile('OutputPlate' + organoidNumber + '.csv', averageFiveArray[i], function (err) {
        if (err) throw err;

        console.log('OutputPlate' + organoidNumber + '.csv');
    });
    organoidNumber++;
    
    if (organoidNumber > maxFiles) {
        break;
    }
}




