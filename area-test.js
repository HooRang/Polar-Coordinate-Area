var testCoords;
var polygons = [];

// function source: http://stackoverflow.com/questions/14446447/javascript-read-local-text-file
function readTextFile(file) {
  var input = new XMLHttpRequest();
  input.open("GET", file, false);
  input.onreadystatechange = function () {
    if(input.readyState === 4) {
      if(input.status === 200 || input.status == 0) {
        testCoords = input.responseText;
      }
    }
  }
  input.send(null);
}
readTextFile('/input_coordinates.txt');

function parseInput(text) {
  split1 = text.split('Polygon');
  // finds each set of coords in the input text
  split1.shift();
  for (i=0; i<split1.length; i++) {
    roughPoly = split1[i].match(/\(([^\)]*)\)/g); // splits the coords into separate string by matching the paranthesis
    polygons[i] = roughPoly.map(function(obj){ 
      // converts the string arrays into number arrays
      c = obj.match(/[-.\d]+/g);
      if (c) {
        return c.map(Number);
      }
    });
  }
}
parseInput(testCoords);

// calculating clockwise relative to center point of the polygons
function findCenter(array) {
  x = 0;
  y = 0;
  for (i=0; i<array.length; i++) {
    x = x + array[i][0];
    y = y + array[i][1];
  }
  return [x/array.length, y/array.length]
}

// Polar coordinate sorting algorithm adapted from http://stackoverflow.com/a/6989383/3317093
function sortCoords(array) {
  center = findCenter(array);
  return array.sort(function(a,b) {
    if (a[0] - center[0] >=0 && b[0] - center[0] < 0) {
      return true;
    } else if (a[0] - center[0] < 0 && b[0] - center[0] >= 0) {
      return false;
    } else if (a[0] - center[0] == 0 && b[0] - center[0] == 0) {
      if (a[1] - center[1] >= 0 || b[1] - center[1] >= 0) {
        return (a[1] > b[1]);
      }
      return (a[1] < b[1]);
    }
    // compute the cross product of vectors (center -> a) x (center -> b)
    det = (a[0] - center[0]) * (b[1] - center[1]) - (b[0] - center[0]) * (a[1] - center[1]);
    if (det < 0) {      
      return true;
    } else if (det > 0) {      
      return false;
    }
    // points a and b are on the same line from the center
    // check which point is closer to the center
    d1 = (a[0] - center[0]) * (a[0] - center[0]) + (a[1] - center[1]) * (a[1] - center[1]);
    d2 = (b[0] - center[0]) * (b[0] - center[0]) + (b[1] - center[1]) * (b[1] - center[1]);
    return d1 > d2
  });
}

// algorithm adapted from http://www.mathopenref.com/coordpolygonarea2.html
function polygonArea() {
  arguments = arguments[0];
  numCoords = arguments.length;
  coords = sortCoords(arguments);
  if (numCoords >= 3 && numCoords <= 6) {
    area = 0;
    j = numCoords - 1;  // The last vertex is the 'previous' one to the first
    for (i=0; i<numCoords; i++) {
      area = area + (coords[j][1] + coords[i][1]) * (coords[j][0] - coords[i][0]); 
      j = i;  // j is previous vertex to i
    }
    return Math.round(area * 50)/100;
  } else {
    return false;
  }
}

for (n=0; n<polygons.length; n++) {
  var results = polygonArea(polygons[n]);
  if (results !== false) {
    console.log('Polygon' + (n + 1) + ' area: '+ results + ' acres');  
  } else {
    console.log('Function requires between three and six coordinates!');  
  }
}