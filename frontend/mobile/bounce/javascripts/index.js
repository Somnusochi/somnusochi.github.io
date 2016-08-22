window.onload = function() {
  console.log("aaa");
  var height = $(window).height();
  var main = $(".main");
  main.css('height', height);
  var div = document.getElementById('div');
  var startPositon, movePositon, endPosition;

  function touchMove(event) {
    event.preventDefault();
    var touch = event.touches[0];
    movePosition = {
      x: touch.pageX,
      y: touch.pageY
    }
    console.log('movePositon.x:' + movePosition.x);
    console.log('movePositon.y:' + movePosition.y);
    var distance = startPosition.y - movePosition.y;
    console.log(distance);
    animate(distance);
  }

  function animate(distance) {
    // main.css('background-color', '#ffffff');
    main.css({
      "transform": "translate3d(0px," + -distance / Math.sqrt(5) +
        "px, 0px)",
      "transition": 0 + "ms " + 'ease'
    });
  }

  function touchstart(event) {
    event.preventDefault();
    var touch = event.touches[0];
    startPosition = {
      x: touch.pageX,
      y: touch.pageY
    }
    console.log('startPositon.x:' + startPosition.x);
    console.log('startPositon.y:' + startPosition.y);
  }

  function touchend(event) {
    event.preventDefault();
    var distance = startPosition.y - movePosition.y;
    console.log('结束时的位移量：' + distance)
    main.css({
      "transform": "translate3d(0px,0px, 0px)",
      "transition-duration": 300 + "ms "
    });
  }
  div.addEventListener('touchstart', touchstart, false);
  div.addEventListener('touchmove', touchMove, false);
  div.addEventListener('touchend', touchend, false);

}
