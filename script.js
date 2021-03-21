;
(function startup() {
  var currentSlide = 1;
  var slideMoving = false;
  document.getElementById('container').addEventListener("touchstart", function (e) {
      prevEvent = e;
  });
  document.getElementById('container').addEventListener("touchmove", function (e) {
    if (slideMoving === false) {
      slideMoving = true;
      if (e.touches[0].pageY - prevEvent.touches[0].pageY < 0) {
        currentSlide = currentSlide === 3 ? currentSlide : currentSlide + 1;
      } else {
        currentSlide = currentSlide === 1 ? currentSlide : currentSlide - 1;
      }
      var currentClass = 'current-' + currentSlide;
      if (currentSlide === 1) {
        addClass('body', currentClass);
        removeClass('body', 'current-2')
      } else if (currentSlide === 2) { 
        addClass('body', currentClass);
        removeClass('body', 'current-1')
        removeClass('body', 'current-3')
      } else if (currentSlide === 3) {
        addClass('body', currentClass);
        removeClass('body', 'current-2')
      }
      setTimeout(() => {
        slideMoving = false;
      }, 1500)
    }
  });
  document.getElementById('container').addEventListener("touchend", function (e) {
      prevEvent = null;
  });

  var prevValue = 100;
  var leftSlide = 1;
  document.getElementById('input').addEventListener('input', (e) => {
    const value = e.target.value;

    if (slideMoving === false) {
      slideMoving = true;
      if (prevValue - value > 0) { // right to left
        if (value < 30) {
          leftSlide = 3;
        } else if (value < 60) {
          leftSlide = 2;
        }
      } else { // left to right
        if (value > 60) {
          leftSlide = 1;
        } else if (value > 30) {
          leftSlide = 2;
        }
      }
      if (leftSlide) {
        var currentClass = 'left-' + leftSlide;
        if (leftSlide === 3) {
          addClass('body', currentClass);
          removeClass('body', 'left-2')

        } else if (leftSlide === 2) { 
          addClass('body', currentClass);
          removeClass('body', 'left-1')
          removeClass('body', 'left-3')

        } else if (leftSlide === 1) {
          addClass('body', currentClass);
          removeClass('body', 'left-2')
        }
        leftSlide = null;
      }
      prevValue = value;
      slideMoving = false;
    }
  });
  function addClass(id, clss) {
    var element = document.getElementById(id);
    var classes = element.getAttribute('class');
    if (classes) {
      var currentClasses = classes.split(' ');
      if (currentClasses.indexOf(clss) === -1) {
        currentClasses.push(clss);
        var newClasses =  currentClasses.join(' ');
        element.setAttribute('class', newClasses);
      }
    } else {
      element.setAttribute('class', clss);
    }
  }

  function removeClass(id, clss) {
    var element = document.getElementById(id);
    var classes = element.getAttribute('class');
    if(classes) {
      var currentClasses = classes.split(' ');
      if (currentClasses.indexOf(clss) > -1) {
        findIndexClss = currentClasses.indexOf(clss);
        currentClasses.splice(findIndexClss,1);
        var newClasses = currentClasses.join(' ');
        element.setAttribute('class', newClasses);
      }
    }
  }
})();
