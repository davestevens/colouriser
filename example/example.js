var element = document.getElementById("example"),
    colouriser = new Colouriser({
      colours: [
        { value: [   0,   0,   0 ], at: { hours: 9 } },
        { value: [ 240, 100,  25 ], at: { hours: 12 } },
        { value: [   0, 100,  50 ], at: { hours: 18 } },
        { value: [ 360, 50,  50 ], at: { hours: 21, minutes: 10 } },
        { value: [ 100, 75,  50 ], at: { hours: 21, minutes: 30 } }
     ],
      onUpdate: function(colour) {
        var colourString = colour[0] + "," + colour[1] + "%," + colour[2] + "%";
        element.style.backgroundColor = "hsl(" + colourString + ")";
      }
    });

colouriser.start();
