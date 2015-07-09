# Polar-Coordinate-Area
Read polygon input coordinates in local text file, convert to polar coordinates, and find area of the polygons

Running the code:

1. Run web server in command line.
  ruby -rwebrick -e'WEBrick::HTTPServer.new(:Port => 3000, :DocumentRoot => Dir.pwd).start'
2. Open html file in browser.
  http://localhost:3000/area.html

Results in console.

Input coordinates: 
  Enter in between three and six (x,y) coordinates in clockwise order. See input_coordinates.txt file.
  
Output:
  A single floating point decimal value of the area of the polygon rounded to two significant figures and the units of the area [acres], For each input set of coordinates.

Sample set of coordinates:
  {(4,6), (4,-4), (8,-4), (8,-8), (-4,-8), (-4,6)}
  
Sample output:
  128 acres
