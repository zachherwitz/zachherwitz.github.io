$(() => {

  // script which gradually moves the page background back and forth between two colors.
  // see: https://www.w3schools.com/css/tryit.asp?filename=trycss3_color_rgba
  // see: https://www.w3schools.com/css/tryit.asp?filename=trycss3_gradient-linear_ltr

  // #FFE6F2 --> parseInt("ff", 16), parseInt("e6", 16), etc. or just play around with these values
  const startColor = {r: 160, g: 221, b: 255};
  const endColor = {r: 255, g: 180, b: 132}; 
  const gradientPeriod = 10; // seconds
  const updateFreq = 5; // hz

  const currColor = {r: startColor.r, g: startColor.g, b: startColor.b}; // deep copy
  const delta = {};
  delta.r = (endColor.r - startColor.r) / (gradientPeriod * updateFreq);
  delta.g = (endColor.g - startColor.g) / (gradientPeriod * updateFreq);
  delta.b = (endColor.b - startColor.b) / (gradientPeriod * updateFreq);

  console.log('color delta: ' + JSON.stringify(delta));
  
  function updateGradient() {
    // reverse if we hit a boundary
    // quick and dirty - just look at r
    if(startColor.r <= endColor.r && (currColor.r >= endColor.r || currColor.r < startColor.r)
      || startColor.r > endColor.r && (currColor.r <= endColor.r || currColor.r > startColor.r)) {
        delta.r *= -1;
        delta.g *= -1;
        delta.b *= -1;
        console.log('color gradient boundary hit, reversing');
    }
    currColor.r += delta.r;
    currColor.g += delta.g;
    currColor.b += delta.b;
    // console.log('curr: ' + JSON.stringify(currColor));
    $('body').css('background-color', `rgba(${Math.floor(currColor.r)}, ${Math.floor(currColor.g)}, ${Math.floor(currColor.b)}, 0.3)`)
  }

  setInterval(updateGradient, 1000 / updateFreq)
})