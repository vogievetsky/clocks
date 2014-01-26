// Generated by CoffeeScript 1.3.1
(function() {
  var makeClock, numbers, sel, setTime, shownTime, shuffle, size, svg;

  shuffle = function(array) {
    var i, m, t;
    m = array.length;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };

  makeClock = function(sel, size) {
    var c, r, rh, rm;
    c = size / 2;
    r = c - 3;
    rm = r - 3;
    rh = r - 6;
    sel.append('circle').attr('class', 'outter').attr('cx', c).attr('cy', c).attr('r', r).style('fill', 'none');
    sel.append('line').attr('class', 'hour').attr('x1', c).attr('y1', c).attr('x2', function(d) {
      return c + rh * Math.sin(Math.floor(d / 60) / 6 * Math.PI);
    }).attr('y2', function(d) {
      return c - rh * Math.cos(Math.floor(d / 60) / 6 * Math.PI);
    }).style('fill', 'none');
    sel.append('line').attr('class', 'minute').attr('x1', c).attr('y1', c).attr('x2', function(d) {
      return c + rm * Math.sin((d % 60) / 30 * Math.PI);
    }).attr('y2', function(d) {
      return c - rm * Math.cos((d % 60) / 30 * Math.PI);
    }).style('fill', 'none');
    sel.append('circle').attr('class', 'inner').attr('cx', c).attr('cy', c).attr('r', 2).style('stroke', 'none');
  };

  size = 38;

  svg = d3.select(document.body).append('svg').attr('width', size * 36).attr('height', size * 20).style('margin-left', -size * 36 / 2).style('margin-top', -size * 20 / 2);

  numbers = shuffle(d3.range(720));

  sel = svg.selectAll('g.clock').data(numbers);

  sel.enter().append('g').attr('class', 'clock').attr('transform', function(d, i) {
    var x, y;
    x = (i % 36) * size;
    y = Math.floor(i / 36) * size;
    return "translate(" + x + "," + y + ")";
  }).style('fill', 'white').style('stroke', 'white').call(makeClock, size);

  shownTime = null;

  setTime = function() {
    var col, duration, now, time;
    duration = 1500;
    now = new Date(Date.now() + duration / 2);
    time = (now.getHours() % 12) * 60 + now.getMinutes();
    if (time === shownTime) {
      return;
    }
    shownTime = time;
    col = function(d) {
      if (d === shownTime) {
        return 'red';
      } else {
        return 'white';
      }
    };
    svg.selectAll('g.clock').transition().duration(duration).style('fill', col).style('stroke', col);
  };

  setTime();

  setInterval(setTime, 200);

  d3.select(window).on('resize', function() {});

}).call(this);
