(function(){var l=document.getElementById('loader');
var h=function(){if(l){l.classList.add('hide');setTimeout(function(){l.classList.add('gone')},1000)}};
setTimeout(h,1900);addEventListener('error',h);
addEventListener('load',function(){setTimeout(h,600)});})();