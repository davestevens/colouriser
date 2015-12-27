# Colouriser

Define a set of colours and times, this will then compute the colour based on the time of day. See `example/example.js` for usage.

Uses the HSL colour space for calculating colour based on percentage through day.

This was created as an experiment for a project requirement, the idea is a sort of f.lux for a website which can be controlled based on the time of day to gradually change the colour through out the process of a day.
Using the HSL colour space allows just two colours/times to be selected and then this will gracefully loop the hue, saturation & light colour space.

## TODO

- [ ] Create a Colour Class for input and output in different formats
- [ ] Create a Time Class for better time input
- [ ] Reduce the FPS (currently just calling `requestAnimationFrame` constantly.

## Example

There is an example using the Colouriser within the `example` directory, build the required files:
```npm run build```

and start a server:
```npm start```

to view it locally.

## Development

Install all required dependencies:
```npm install```

Run mocha tests:
```npm test```

Build and watch files (runs build and tests on file changes):
```npm run watch```
