"use strict";

(function(){
  var focuslock = (function(){
    var firstElem,
        lastElem;

    return {
      setFirstBtn : function(el){
        firstElem = el;
      },
      setLastBtn : function(el){
        lastElem = el;
      },
      focuslockKeyDown : function(event){
        event = event || window.event;
        var keycode = event.which || event.keyCode;
        if(event.shiftKey && keycode === 9 && event.target === firstElem){
          event.preventDefault ? event.preventDefault() : event.returnValue = false;
          lastElem.focus();
        }else if(!event.shiftKey && keycode === 9 && event.target === lastElem){
          event.preventDefault ? event.preventDefault() : event.returnValue = false;
          firstElem.focus();
        }
      }
    };
  }());

  window.focuslock = window.focuslock || focuslock;
}());

(function () {
  var focusedElem = null;
  var btnOpenPopup = document.getElementById("open-popup");
  var btnClosePopup = document.getElementById("close-popup");

  btnOpenPopup.addEventListener("click", openPopup, false);
  btnClosePopup.addEventListener("click", closePopup, false);

  function setSiblingsHidden(currElem){
    var ommits = ["script", "meta", "link", "style", "base"];
    for(var i = -1, node; node = currElem.parentNode.children[++i];){
      if(node == currElem || ommits.indexOf(node.tagName.toLowerCase()) > -1) continue;
      node.setAttribute("aria-hidden", "true");
      node.setAttribute("data-outside-modal", "true");
    }
  }

  function unsetSiblingsHidden(currElem){
    for(var i = -1, 
                node, 
                outsides= document.querySelectorAll("[data-outside-modal]"); 
                node = outsides[++i]; ) {
      node.removeAttribute("aria-hidden");
      node.removeAttribute("data-outside-modal");
    }
  }

  function openPopup(){
    var popupBody = document.querySelector(".popup-body");
    focusedElem = this;
    document.documentElement.classList.add("on-popup");

    focuslock.setFirstBtn(btnClosePopup);
    focuslock.setLastBtn(btnClosePopup);
    popupBody.addEventListener("keydown", focuslock.focuslockKeyDown);

    document.addEventListener("keydown", closePopup);

    setSiblingsHidden(document.querySelector(".popup-wrap"));

    popupBody.querySelector(".placeholder").focus();
  }

  function closePopup(event){
    event = event || window.event;
    if(event.type === 'keydown' && event.keyCode !== 27){
      return;
    }

    var popupBody = document.querySelector(".popup-body");
    
    document.documentElement.classList.remove("on-popup");
    document.removeEventListener("keydown", closePopup);
    popupBody.removeEventListener("keydown", focuslock.focuslockKeyDown);

    unsetSiblingsHidden();

    focusedElem.focus();
  }
}());
