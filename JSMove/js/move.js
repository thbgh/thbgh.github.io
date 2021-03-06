
//最终封装的'完美移动框架'
function startMove(obj,json,fn){
  clearInterval(obj.timer);
  obj.timer = setInterval(function(){
    var flag = true;//标志所有运动是否到达目标值
    for(var attr in json){

      var curr = 0;
       //判断是否为透明度
      if(attr == 'opacity'){//由于parseInt会把小于1的小数转成0，会引起显示bug

        curr = Math.round(parseFloat(getStyle(obj,attr))*100);
      } else {
        curr = parseInt(getStyle(obj,attr));
      }
      //移动速度处理
      var speed =0;
      speed = (json[attr]-curr)/10;
      speed = speed >0?Math.ceil(speed):Math.floor(speed);

      if(json[attr] != curr  ){
        flag = false;
        }

        if(attr == 'opacity'){//属性为透明度时特殊处理
          obj.style.filter = 'alpha(opacity:'+(curr+speed)+')';
          obj.style[attr] = (curr+speed)/100;
        } else {
          obj.style[attr] = curr + speed +'px';
        }
      }
   
    if(flag) {
      clearInterval(obj.timer);
      if(fn){
        fn();
      }
    }

  },10);
}
//取样式函数
function getStyle(obj,attr){
  if(obj.currentStyle){

    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj,false)[attr];
  }
}
