!function(t){var e={};function i(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=5)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.panel={screenMargin:25,screenBackgroundColor:"#9aae82",screenHeightProportion:.7,controlMargin:15,backgroundColor:"#264d8f"},e.screen={padding:2},e.matrix={borderWidth:3,blockSize:18,bgBlockBorderColor:"#84946e",bgBlockBackgroundColor:"#84946e",blockBorderColor:"#010101",blockBackgroundColor:"#000",highlightBlockBorderColor:"#560000",highlightBlockBackgroundColor:"#560000"},e.state={font:"16px Arial",fontSize:16,top:20,left:10},e.control={padding:10}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),a=i(2);var r=function(){function t(e,i,n,a,r){var o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"undefined name canvas";if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),!e)throw new Error("Cannot find container for "+o+".");this.offsetX=i,this.offsetY=n,this.width=a,this.height=r,this.name=o,this.canvas=document.createElement("canvas"),this.canvas.width=this.width,this.canvas.height=this.height,e.appendChild(this.canvas),this.canvas.style.position="absolute",this.canvas.style.left=this.offsetX+"px",this.canvas.style.top=this.offsetY+"px",this.context=this.canvas.getContext("2d"),this.setStyles=this.setStyles.bind(this),this.strokeRect=this.strokeRect.bind(this),this.fillRect=this.fillRect.bind(this),this.clearRect=this.clearRect.bind(this),this.measureText=this.measureText.bind(this),this.fillText=this.fillText.bind(this),this.fillHalfEllipse=this.fillHalfEllipse.bind(this),this.fillCircle=this.fillCircle.bind(this),this.getLinearGradient=this.getLinearGradient.bind(this)}return n(t,[{key:"setStyles",value:function(t){var e=this;Array.isArray(t)&&t.forEach(function(t){var i=t.split(":");i[0]in e.canvas.style&&(e.canvas.style[i[0]]=i[1].replace(";",""))})}},{key:"strokeRect",value:function(t,e,i,n,r){(0,a.extend)(this.context,r),this.context.strokeRect(t,e,i,n)}},{key:"fillRect",value:function(t,e,i,n,r){(0,a.extend)(this.context,r),this.context.fillRect(t,e,i,n)}},{key:"clearRect",value:function(t,e,i,n,r){(0,a.extend)(this.context,r),this.context.clearRect(t,e,i,n)}},{key:"measureText",value:function(t){return this.context.measureText(t).width}},{key:"fillText",value:function(t,e,i,n){this.context.save(),(0,a.extend)(this.context,n),this.context.fillText(t,e,i),this.context.restore()}},{key:"fillHalfEllipse",value:function(t,e,i,n,r,o){var s=arguments.length>6&&void 0!==arguments[6]?arguments[6]:{fillStyle:"black"},l=1,u=1,c=0,h=0;!0===n?(u=o,h=Math.PI):(l=o,c=Math.PI/2,h=3*Math.PI/2),this.context.save(),(0,a.extend)(this.context,s),this.context.beginPath(),this.context.closePath(),this.context.moveTo(t,e),this.context.scale(l,u),this.context.arc(t/l,e/u,i,c,h,r),this.context.fill(),this.context.restore()}},{key:"fillCircle",value:function(t,e,i,n,r,o){var s=arguments.length>6&&void 0!==arguments[6]?arguments[6]:{};this.context.save(),(0,a.extend)(this.context,s),this.context.beginPath(),this.context.moveTo(t,e),this.context.arc(t,e,i,n,r,o),this.context.closePath(),this.context.fill(),this.context.restore()}},{key:"getLinearGradient",value:function(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[],r=this.context.createLinearGradient(t,e,i,n);return Array.isArray(a)&&a.forEach(function(t){r.addColorStop(t.position,t.color)}),r}}]),t}();e.default=r},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t){return 1==t?10:2==t?20:fibonacci(t-1)+fibonacci(t-2)};e.extend=function(t,e){for(var i in e)i in t&&(t[i]=e[i])},e.getScore=function(t){if(!t||0==t.length)return 0;var e=[].concat(function(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}(t));e.sort(function(t,e){return e-t});for(var i=0,a=e.shift(),r=e.shift(),o=1;r;)r-a==1?o++:(i+=n(o),o=1,a=r),r=e.shift();return i+n(o)}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();var a=function(){function t(e,i,n,a){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.canvas=e,this.x=i,this.y=n,this.size=a,this.borderWidth=1,this.padding=2,this.margin=2,this.outline={x:this.x+this.margin,y:this.y+this.margin,size:this.size-2*this.margin},this.core={x:this.outline.x+this.borderWidth+this.padding,y:this.outline.y+this.borderWidth+this.padding,size:this.outline.size-2*this.borderWidth-2*this.padding},this.isActive=!1,this.activate=this.activate.bind(this),this.inactivate=this.inactivate.bind(this)}return n(t,[{key:"activate",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{strokeStyle:"black"},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{fillStyle:"black"};this.isActive||(this.canvas.strokeRect(this.outline.x,this.outline.y,this.outline.size,this.outline.size,t),this.canvas.fillRect(this.core.x,this.core.y,this.core.size,this.core.size,e),this.isActive=!0)}},{key:"inactivate",value:function(){this.isActive&&(this.canvas.clearRect(this.x,this.y,this.size,this.size),this.isActive=!1)}}]),t}();e.default=a},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=0,a=0,r=[];e.default={initialize:function(t,e){(n=t)*(a=e);for(var i=0;i<a;i++){for(var o=[],s=0;s<n;s++)o.push(0);r.push(o)}},update:function(t,e){t.forEach(function(t){var e=t.x,i=t.y;e<n&&e>=0&&i<a&&i>=0&&(r[i][e]=0)}),e.forEach(function(t){var e=t.x,i=t.y;e<n&&e>=0&&i<a&&i>=0&&(r[i][e]=1)})},isAllFilled:function(){return r[0].some(function(t){return 1==t})},checkWhetherHasReachedLeft:function(t){var e=!1,i=function(i){var o=t[i],s=o.x,l=o.y;return s<=0||s>=n||l<0||l>=a?(e=!0,"break"):t.some(function(t){return s-1==t.x&&l==t.y})?"continue":1==r[l][s-1]?(e=!0,"break"):void 0};t:for(var o=0;o<t.length;o++)switch(i(o)){case"break":break t;case"continue":continue}return e},checkWhetherHasReachedRight:function(t){var e=!1,i=function(i){var o=t[i],s=o.x,l=o.y;return s<0||s>=n-1||l<0||l>=a?(e=!0,"break"):t.some(function(t){return s+1==t.x&&l==t.y})?"continue":1==r[l][s+1]?(e=!0,"break"):void 0};t:for(var o=0;o<t.length;o++)switch(i(o)){case"break":break t;case"continue":continue}return e},checkWhetherHasReachedBottom:function(t){var e=!1,i=function(i){var o=t[i],s=o.x,l=o.y;return s<0||s>=n||l<0||l>=a-1?(e=!0,"break"):t.some(function(t){return s==t.x&&l+1==t.y})?"continue":1==r[l+1][s]?(e=!0,"break"):void 0};t:for(var o=0;o<t.length;o++)switch(i(o)){case"break":break t;case"continue":continue}return e},getFilledYCoordinates:function(){for(var t=[],e=a-1;e>=0&&r[e].some(function(t){return 1==t});e--)if(r[e].every(function(t){return 1==t})){for(var i=0;i<n;i++)r[e][i]=0;t.push(e)}return t},reset:function(t,e){var i=[],o=[];t.sort(function(t,e){return e-t});for(var s=t[0],l=s;s>=0&&s<a;){if(r[s].some(function(t){return 1==t})){i=[],o=[];for(var u=0;u<n;u++)1==r[s][u]&&(r[s][u]=0,i.push({x:u,y:s}),r[l][u]=1,o.push({x:u,y:l}));l--,(i.length>0||o.length>0)&&e&&e(i,o)}s--}},fillRow:function(t){if(t<0||t>=a)return[];for(var e=[],i=0;i<n;i++)r[t][i]=1,e.push({x:i,y:t});return e},clearRow:function(t){if(t<0||t>=a)return[];for(var e=[],i=0;i<n;i++)r[t][i]=0,e.push({x:i,y:t});return e}}},function(t,e,i){"use strict";var n=s(i(6)),a=s(i(7)),r=s(i(12)),o=s(i(14));function s(t){return t&&t.__esModule?t:{default:t}}var l=document.getElementById("container");if(!l)throw new Error("Cannot find container.");n.default.initialize(l),a.default.initialize(l,n.default.getScreenOptions()),r.default.initialize(l,n.default.getControlOptions());var u=a.default.getSize();o.default.initialize({matrixSizeX:u.matrixSizeX,matrixSizeY:u.matrixSizeY,activate:a.default.activate,inactivate:a.default.inactivate,highlight:a.default.highlight,unhighlight:a.default.unhighlight,updateScore:a.default.updateScore,updateEliminatedRowNum:a.default.updateEliminatedRowNum,updateNextShape:a.default.updateNextShape}),r.default.addDropEventHandler(o.default.onMoveDrop),r.default.addLeftEventHandler(o.default.onMoveLeft),r.default.addRightEventHandler(o.default.onMoveRight),r.default.addDownEventHandler(o.default.onMoveDown),r.default.addRotateEventHandler(o.default.onMoveRotate),r.default.addRestartEventHandler(o.default.onGameRestart),r.default.addPauseEventHandler(o.default.onGamePause),o.default.start()},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(0),a=function(t){return t&&t.__esModule?t:{default:t}}(i(1));var r={offsetX:0,offsetY:0,width:0,height:0},o={offsetX:0,offsetY:0,width:0,height:0};e.default={initialize:function(t){var e=t.clientWidth,i=t.clientHeight;r={offsetX:n.panel.screenMargin,offsetY:n.panel.screenMargin,width:e-2*n.panel.screenMargin,height:i*n.panel.screenHeightProportion-2*n.panel.screenMargin},o={offsetX:n.panel.controlMargin,offsetY:i*n.panel.screenHeightProportion,width:e-2*n.panel.controlMargin,height:i*(1-n.panel.screenHeightProportion)-n.panel.controlMargin};var s=new a.default(t,0,0,e,i);s.setStyles(["z-index:1;"]),s.fillRect(0,0,e,i,{fillStyle:n.panel.backgroundColor}),s.clearRect(0,0,10,10),s.fillCircle(10,10,10,Math.PI/2,Math.PI,!0),s.clearRect(e-10,0,10,10),s.fillCircle(e-10,10,10,0,Math.PI/2,!0),s.clearRect(e-10,i-10,10,10),s.fillCircle(e-10,i-10,10,0,2*Math.PI,!1),s.clearRect(0,i-10,10,10),s.fillCircle(10,i-10,10,Math.PI,1.5*Math.PI,!0),s.clearRect(r.offsetX,r.offsetY,r.width,r.height),s.fillRect(r.offsetX,r.offsetY,r.width,r.height,{fillStyle:n.panel.screenBackgroundColor})},getScreenOptions:function(){return r},getControlOptions:function(){return o}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(0),a=o(i(8)),r=o(i(9));function o(t){return t&&t.__esModule?t:{default:t}}var s=0,l=0,u=0,c=0;e.default={initialize:function(t,e){var i=e.offsetX,o=e.offsetY,h=e.width,f=e.height;h=h-4*n.matrix.borderWidth-2*n.screen.padding,f=f-4*n.matrix.borderWidth-2*n.screen.padding,u=Math.floor(h/n.matrix.blockSize),c=Math.floor(f/n.matrix.blockSize),h%n.matrix.blockSize==0?(u--,s=n.matrix.blockSize/2):s=(h-u*n.matrix.blockSize)/2,f%n.matrix.blockSize==0?(c--,l=n.matrix.blockSize/2):l=(f-c*n.matrix.blockSize)/2,i=i+s+n.screen.padding,o=o+l+n.screen.padding,u=Math.floor(.7*u);var d=n.matrix.blockSize*u+2*n.matrix.borderWidth,v=n.matrix.blockSize*c+2*n.matrix.borderWidth;a.default.initialize(t,i,o,d,v,u,c),r.default.initialize(t,i+d,o,h-2*s-d,f-2*l)},getSize:function(){return{matrixSizeX:u,matrixSizeY:c}},activate:a.default.activate,inactivate:a.default.inactivate,highlight:a.default.highlight,unhighlight:a.default.unhighlight,updateScore:r.default.updateScore,updateEliminatedRowNum:r.default.updateEliminatedRowNum,updateNextShape:r.default.updateNextShape}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(0),a=o(i(1)),r=o(i(3));function o(t){return t&&t.__esModule?t:{default:t}}var s=null,l=null,u=0,c=0,h={},f=function(t,e){return"KEY_"+t+"_"+e};e.default={initialize:function(t,e,i,o,d,v,y){u=v,c=y,(s=new a.default(t,e,i,o,d,"Matrix Background Canvas")).setStyles(["z-index:2;"]),(l=new a.default(t,e,i,o,d,"Matrix Main Canvas")).setStyles(["z-index:3;"]);for(var g=0;g<u;g++)for(var x=0;x<c;x++){var p=new r.default(s,g*n.matrix.blockSize+n.matrix.borderWidth,x*n.matrix.blockSize+n.matrix.borderWidth,n.matrix.blockSize);p.activate({strokeStyle:n.matrix.bgBlockBorderColor},{fillStyle:n.matrix.bgBlockBackgroundColor}),p.canvas=l,p.isActive=!1,h[f(g,x)]=p}l.strokeRect(0,0,o,d,{lineWidth:n.matrix.borderWidth})},activate:function(t){Array.isArray(t)&&t.forEach(function(t){var e=t.x,i=t.y,a=h[f(e,i)];a&&a.activate({strokeStyle:n.matrix.blockBorderColor},{fillStyle:n.matrix.blockBackgroundColor})})},inactivate:function(t){Array.isArray(t)&&t.forEach(function(t){var e=t.x,i=t.y,n=h[f(e,i)];n&&n.inactivate()})},highlight:function(t){Array.isArray(t)&&0!=t.length&&t.forEach(function(t){if(!Number.isNaN(t)&&t>=0&&t<c)for(var e=0;e<u;e++){var i=h[f(e,t)];i&&i.activate({strokeStyle:n.matrix.highlightBlockBorderColor},{fillStyle:n.matrix.highlightBlockBackgroundColor})}})},unhighlight:function(t){Array.isArray(t)&&0!=t.length&&t.forEach(function(t){if(!Number.isNaN(t)&&t>=0&&t<c)for(var e=0;e<u;e++){var i=h[f(e,t)];i&&i.inactivate()}})}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(0),a=s(i(1)),r=s(i(3)),o=s(i(10));function s(t){return t&&t.__esModule?t:{default:t}}var l=null,u=null,c=null,h=null,f={},d=function(t,e){return"KEY_"+t+"_"+e};e.default={initialize:function(t,e,i,s,v){(l=new a.default(t,e,i,s,v,"State Background Canvas")).setStyles(["z-index:2;"]),(u=new a.default(t,e,i,s,v,"State Main Canvas")).setStyles(["z-index:3;"]),s-=n.state.left;var y=.3*(v-=n.state.top),g=.3*v,x=n.state.left,p=n.state.top,b=n.state.left,m=n.state.top+y,w=n.state.left,S=n.state.top+y+g;u.context.font=n.state.font,u.fillText("得分",x,p),c=new o.default(l,u,x+5,p+n.state.fontSize,s-5),u.fillText("消除行",b,m),h=new o.default(l,u,b+5,m+n.state.fontSize,s-5),u.fillText("下一个",w,S);for(var k=w,R=S+n.state.fontSize,z=0;z<4;z++)for(var C=0;C<2;C++){var M=new r.default(l,k+z*n.matrix.blockSize,R+C*n.matrix.blockSize,n.matrix.blockSize);M.activate({strokeStyle:n.matrix.bgBlockBorderColor},{fillStyle:n.matrix.bgBlockBackgroundColor}),M.canvas=u,M.isActive=!1,f[d(z,C)]=M}},updateScore:function(t){(t=Number.parseInt(t))>0?c.show(t):c.reset()},updateEliminatedRowNum:function(t){(t=Number.parseInt(t))>0?h.show(t):h.reset()},updateNextShape:function(t){if(Array.isArray(t)){for(var e in f)f[e].inactivate();0!=t.length&&t.forEach(function(t){var e=f[d(t.x,t.y)];e&&e.activate({strokeStyle:n.matrix.blockBorderColor},{fillStyle:n.matrix.blockBackgroundColor})})}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),a=function(t){return t&&t.__esModule?t:{default:t}}(i(11));var r=function(){function t(e,i,n,r,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.x=n,this.y=r,this.width=o,this.min=0,this.max=999999,this.digitList=[],this.digitNumber=6,this.digitSpanProportion=.4,this.size=this.width/(this.digitNumber+(this.digitNumber-1)*this.digitSpanProportion);for(var s=this.digitNumber-1;s>=0;s--)this.digitList.push(new a.default(this.x+s*this.size+s*this.digitSpanProportion*this.size,this.y,this.size,e,i));this.show=this.show.bind(this),this.reset=this.reset.bind(this)}return n(t,[{key:"show",value:function(t){if(!Number.isInteger(t))throw new Error("The value should be an integer.");if(t<this.min||t>this.max)throw new Error("The value should between "+this.min+" and "+this.max+".");this.reset();for(var e=t.toString(),i=0;i<e.length;i++)i<this.digitNumber&&this.digitList[i].show(e.charAt(e.length-1-i))}},{key:"reset",value:function(){this.digitList.forEach(function(t){return t.hide()})}}]),t}();e.default=r},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();var a=function(t,e,i){[1,4].includes(e.digit)||e.canvas.fillHalfEllipse(e.x+e.size/2,e.y,e.radius,!0,!1,e.scale,{fillStyle:i}),[5,6].includes(e.digit)||t.fillHalfEllipse(e.x+e.size,e.y+e.size/2,e.radius,!1,!1,e.scale,{fillStyle:i}),[2].includes(e.digit)||t.fillHalfEllipse(e.x+e.size,e.y+1.5*e.size,e.radius,!1,!1,e.scale,{fillStyle:i}),[1,4,7].includes(e.digit)||t.fillHalfEllipse(e.x+e.size/2,e.y+2*e.size,e.radius,!0,!0,e.scale,{fillStyle:i}),[0,2,6,8].includes(e.digit)&&t.fillHalfEllipse(e.x,e.y+1.5*e.size,e.radius,!1,!0,e.scale,{fillStyle:i}),[0,1,7].includes(e.digit)||t.fillHalfEllipse(e.x+e.size/2,e.y+e.size,e.radius,!0,!1,e.scale,{fillStyle:i}),[1,2,3,7].includes(e.digit)||t.fillHalfEllipse(e.x,e.y+e.size/2,e.radius,!1,!0,e.scale,{fillStyle:i})},r=function(){function t(e,i,n,a,r){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),!a||!r)throw new Error("The digit backgroundCanvas and canvas should not be null.");this.x=e,this.y=i,this.size=n,this.scale=.4,this.radius=this.size/2-1,this.scaleRadius=this.scale*this.radius,this.digit=8,this.bgCanvas=a,this.canvas=r,this.show=this.show.bind(this),this.hide=this.hide.bind(this),this.hide()}return n(t,[{key:"show",value:function(t){t=Number.parseInt(t),!Number.isInteger(t)||t<0||t>9||(this.digit=t,this.bgCanvas.clearRect(this.x-this.scaleRadius,this.y-this.scaleRadius,this.size+2*this.scaleRadius,2*this.size+2*this.scaleRadius),this.canvas.clearRect(this.x-this.scaleRadius,this.y-this.scaleRadius,this.size+2*this.scaleRadius,2*this.size+2*this.scaleRadius),a(this.canvas,this))}},{key:"hide",value:function(){this.digit=8,this.bgCanvas.clearRect(this.x-this.scaleRadius,this.y-this.scaleRadius,this.size+2*this.scaleRadius,2*this.size+2*this.scaleRadius),this.canvas.clearRect(this.x-this.scaleRadius,this.y-this.scaleRadius,this.size+2*this.scaleRadius,2*this.size+2*this.scaleRadius),a(this.bgCanvas,this,"#84946e")}}]),t}();e.default=r},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(0),a=o(i(1)),r=o(i(13));function o(t){return t&&t.__esModule?t:{default:t}}var s=null,l={},u=new Map,c=function(){if(!s)return{offsetX:0,offsetY:0};for(var t=0,e=0,i=s.canvas;null!==i;)t+=i.offsetLeft,e+=i.offsetTop,i=i.offsetParent;return{controlPageX:t,controlPageY:e}},h=function(t,e){if(e&&"function"==typeof e){var i=u.get(t);i||(i=[]),i.push(e),u.set(t,i)}},f=function(t){var e=u.get(t);if(e&&0!=e.length){var i=!0,n=!1,a=void 0;try{for(var r,o=e[Symbol.iterator]();!(i=(r=o.next()).done);i=!0){var s=r.value;s&&s()}}catch(t){n=!0,a=t}finally{try{!i&&o.return&&o.return()}finally{if(n)throw a}}}};e.default={initialize:function(t,e){var i=e.offsetX,o=e.offsetY,u=e.width,h=e.height;(s=new a.default(t,i,o,u,h,"控制器主画布")).setStyles(["z-index:3;"]);var d=(h-2*n.control.padding)/6;l.DROP=new r.default(s,n.control.padding+2*d,n.control.padding,d,"掉落","Drop Button"),l.LEFT=new r.default(s,n.control.padding,n.control.padding+2*d,d,"左移","Left Button"),l.RIGHT=new r.default(s,n.control.padding+4*d,n.control.padding+2*d,d,"右移","Right Button"),l.DOWN=new r.default(s,n.control.padding+2*d,n.control.padding+4*d,d,"下移","Drop Button"),l.ROTATE=new r.default(s,u-n.control.padding-4*d,h-n.control.padding-5*d,2*d,"旋转","Rotate Button"),l.RESTART=new r.default(s,u-n.control.padding-5.5*d,n.control.padding,.8*d,"重启","Restart Button",{showShadow:!1,stopColor1:"darkgreen",stopColor2:"darkgreen"}),l.PAUSE=new r.default(s,u-n.control.padding-7.5*d,n.control.padding,.8*d,"暂停","Pause Button",{showShadow:!1,stopColor1:"darkgreen",stopColor2:"darkgreen"});var v=c(),y=v.controlPageX,g=v.controlPageY;s.canvas.onclick=function(t){var e="",i=t.pageX-y,n=t.pageY-g;for(var a in l)if(l[a].contains(i,n)){e=a;break}e&&f(e)},document.onkeydown=function(t){switch(t.keyCode){case 32:f("DROP");break;case 37:f("LEFT");break;case 38:f("ROTATE");break;case 39:f("RIGHT");break;case 40:f("DOWN");break;case 80:f("PAUSE");break;case 82:f("RESTART")}}},addDropEventHandler:function(t){h("DROP",t)},addLeftEventHandler:function(t){h("LEFT",t)},addRightEventHandler:function(t){h("RIGHT",t)},addDownEventHandler:function(t){h("DOWN",t)},addRotateEventHandler:function(t){h("ROTATE",t)},addRestartEventHandler:function(t){h("RESTART",t)},addPauseEventHandler:function(t){h("PAUSE",t)}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();var a=function(){function t(e,i,n,a,r){var o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"未命名按钮",s=arguments.length>6&&void 0!==arguments[6]?arguments[6]:{showShadow:!0};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.canvas=e,this.x=i,this.y=n,this.radius=a,this.sx=this.x+this.radius,this.sy=this.y+this.radius,this.text=r,this.name=o;var l=e.getLinearGradient(this.x+2*this.radius,this.y,this.x,this.y+2*this.radius,[{position:0,color:s.stopColor1||"#343434"},{position:1,color:s.stopColor2||"black"}]);if(e.fillCircle(this.sx,this.sy,this.radius,0,2*Math.PI,!1,{fillStyle:l,shadowOffsetX:s.showShadow?-4:0,shadowOffsetY:s.showShadow?4:0,shadowBlur:s.showShadow?2:0,shadowColor:s.shadownColor||"rgb(0,0,0,0.5)"}),this.text){this.canvas.measureText(this.text);var u=.5*this.radius;u=u<10?10:u,this.canvas.fillText(r,this.sx,this.sy+u/4,{font:u+"px Arial",fillStyle:"white",textAlign:"center",textBaseLine:"hanging"})}this.contains=this.contains.bind(this)}return n(t,[{key:"contains",value:function(t,e){return Math.sqrt(Math.pow(t-this.sx,2)+Math.pow(e-this.sy,2))<=this.radius}}]),t}();e.default=a},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(2),a=l(i(4)),r=l(i(15)),o=l(i(16)),s=l(i(18));function l(t){return t&&t.__esModule?t:{default:t}}var u=[],c={matrixSizeX:0,matrixSizeY:0,activate:function(){},inactivate:function(){},highlight:function(){},unhighlight:function(){},updateScore:function(){},updateEliminatedRowNum:function(){},updateNextShape:function(){}},h={shape:null,totalScore:0,eliminatedRowNum:0,isHighlightAnimating:!1,isPaused:!1,clear:function(){h.isPaused=!1,h.shape=null,h.totalScore=0,h.eliminatedRowNum=0,h.isHighlightAnimating=!1}},f=function(){if(!h.isHighlightAnimating){for(;u.length<2;)u.push(o.default.getShape(c.matrixSizeX));return h.shape||(h.shape=u.shift(),c.updateNextShape(u[0].getRawCoordinates())),h.shape.down(),d()}},d=function(){h.shape&&(a.default.update(h.shape.prevCoordinates,h.shape.coordinates),c.inactivate(h.shape.prevCoordinates),c.activate(h.shape.coordinates),a.default.checkWhetherHasReachedBottom(h.shape.coordinates)&&(v(a.default.getFilledYCoordinates()),h.shape=null))},v=function t(e){e&&0!=e.length?(h.isHighlightAnimating=!0,s.default.highlight(e,5,function(){h.totalScore+=(0,n.getScore)(e),c.updateScore(h.totalScore),h.eliminatedRowNum+=e.length,c.updateEliminatedRowNum(h.eliminatedRowNum),a.default.reset(e,function(t,e){c.inactivate(t),c.activate(e)}),h.isHighlightAnimating=!1,t(a.default.getFilledYCoordinates())})):a.default.isAllFilled()&&(console.log("You lost game at "+(new Date).toLocaleString()+", and you got "+h.totalScore+" in score while you had eliminated "+h.eliminatedRowNum+" rows."),g(),c.updateScore(0),c.updateEliminatedRowNum(0),c.updateNextShape([]),s.default.fillScreen(function(){s.default.clearScreen(y)}))},y=function(){r.default.start()},g=function(){r.default.stop(),h.clear()},x=function(){h.isPaused=!1,r.default.resume()};e.default={initialize:function(t){(0,n.extend)(c,t),a.default.initialize(c.matrixSizeX,c.matrixSizeY),r.default.initialize(500,f),s.default.initialize(t)},start:y,onMoveLeft:function(){if(h.isPaused&&x(),!h.shape||!a.default.checkWhetherHasReachedLeft(h.shape.coordinates))return h.shape?(h.shape.left(),d()):void 0},onMoveRight:function(){if(h.isPaused&&x(),!h.shape||!a.default.checkWhetherHasReachedRight(h.shape.coordinates))return h.shape?(h.shape.right(),d()):void 0},onMoveDown:function(){if(h.isPaused&&x(),!h.shape||!a.default.checkWhetherHasReachedBottom(h.shape.coordinates))return h.shape?(h.shape.down(),d()):void 0},onMoveDrop:function(){for(h.isPaused&&x();h.shape;)h.shape.down(),d()},onMoveRotate:function(){if(h.isPaused&&x(),!h.shape||!a.default.checkWhetherHasReachedBottom(h.shape.coordinates))return h.shape?(h.shape.rotate(),d()):void 0},onGamePause:function(){h.isPaused=!0,r.default.pause()},onGameRestart:x}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={inetrval:0,handler:null},a=!1,r=-1,o=function(){a=!1,r&&clearInterval(r)};e.default={initialize:function(t,e){n.interval=t,n.handler=e},start:function(){o(),r=setInterval(function(){!a&&n.handler&&n.handler()},n.interval)},pause:function(){a=!0},resume:function(){a=!1},stop:o}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t){return t&&t.__esModule?t:{default:t}}(i(17));var a=[[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1}]],r=[[{x:0,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:1}],[{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:0,y:2}],[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:2,y:1}],[{x:1,y:0},{x:1,y:1},{x:1,y:2},{x:0,y:2}]],o=[[{x:2,y:0},{x:2,y:1},{x:1,y:1},{x:0,y:1}],[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2}],[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:0,y:1}],[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:2}]],s=[[{x:1,y:0},{x:2,y:1},{x:1,y:1},{x:0,y:1}],[{x:0,y:0},{x:1,y:1},{x:0,y:2},{x:0,y:1}],[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:1,y:1}],[{x:1,y:0},{x:1,y:1},{x:1,y:2},{x:0,y:1}]],l=[[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}],[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:0,y:3}]],u=[[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:2,y:1}],[{x:1,y:0},{x:1,y:1},{x:0,y:1},{x:0,y:2}]],c=[[{x:1,y:0},{x:2,y:0},{x:1,y:1},{x:0,y:1}],[{x:0,y:0},{x:0,y:1},{x:1,y:1},{x:1,y:2}]];e.default={getShape:function(t){var e=[a,r,o,s,l,u,c],i=0,h=0,f=e[Math.floor(Math.random()*e.length)],d=!0,v=!1,y=void 0;try{for(var g,x=f[0][Symbol.iterator]();!(d=(g=x.next()).done);d=!0){var p=g.value,b=p.x,m=p.y;h<m&&(h=m),i<b&&(i=b)}}catch(t){v=!0,y=t}finally{try{!d&&x.return&&x.return()}finally{if(v)throw y}}return new(Function.prototype.bind.apply(n.default,[null].concat([Math.floor((t-i)/2),-1*h],function(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}(f))))}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();var a=function(){function t(e,i){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);for(var a=arguments.length,r=Array(a>2?a-2:0),o=2;o<a;o++)r[o-2]=arguments[o];this.states=r,this.offsetX=e,this.offsetY=i,this.stateIndex=0,this.prevCoordinates=[],this.coordinates=this.states[this.stateIndex].map(function(t){var e=t.x,i=t.y;return{x:e+n.offsetX,y:i+n.offsetY}}),this.timestamp=Date.now(),this.getRawCoordinates=this.getRawCoordinates.bind(this),this.getCoordinates=this.getCoordinates.bind(this),this.left=this.left.bind(this),this.right=this.right.bind(this),this.down=this.down.bind(this),this.rotate=this.rotate.bind(this)}return n(t,[{key:"getRawCoordinates",value:function(){return this.states[this.stateIndex]}},{key:"getCoordinates",value:function(){var t=this;return this.prevCoordinates=this.coordinates,this.coordinates=this.states[this.stateIndex].map(function(e){var i=e.x,n=e.y;return{x:i+t.offsetX,y:n+t.offsetY}}),this.coordinates}},{key:"left",value:function(){this.offsetX--,this.getCoordinates()}},{key:"right",value:function(){this.offsetX++,this.getCoordinates()}},{key:"down",value:function(){this.offsetY++,this.getCoordinates()}},{key:"rotate",value:function(){this.stateIndex++,this.stateIndex==this.states.length&&(this.stateIndex=0),this.getCoordinates()}}]),t}();e.default=a},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(2),a=function(t){return t&&t.__esModule?t:{default:t}}(i(4));var r={matrixSizeY:0,activate:function(){},inactivate:function(){},highlight:function(){},unhighlight:function(){}};e.default={initialize:function(t){(0,n.extend)(r,t)},highlight:function t(e,i,n,a){i%2==0?r.unhighlight(e):r.highlight(e),i--,a&&clearTimeout(a),i>=0?a=setTimeout(function(){return t(e,i,n,a)},150):n&&n()},fillScreen:function t(e,i,n){void 0===n&&(n=r.matrixSizeY-1),i&&clearTimeout(i);var o=a.default.fillRow(n);o&&o.length>0?(r.activate(o),n--,i=setTimeout(function(){return t(e,i,n)},70)):e&&e()},clearScreen:function t(e,i,n){void 0===n&&(n=0),i&&clearTimeout(i);var o=a.default.clearRow(n);o&&o.length>0?(r.inactivate(o),n++,i=setTimeout(function(){return t(e,i,n)},70)):e&&e()}}}]);