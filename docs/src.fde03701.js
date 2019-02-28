parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"DOAq":[function(require,module,exports) {

},{}],"NDqt":[function(require,module,exports) {
var define;
var e;!function(t,o){"undefined"!=typeof module?module.exports=o():"function"==typeof e&&"object"==typeof e.amd?e(o):this.domready=o()}(0,function(){var e,t=[],o=document,n=o.documentElement.doScroll,d=(n?/^loaded|^c/:/^loaded|^i|^c/).test(o.readyState);return d||o.addEventListener("DOMContentLoaded",e=function(){for(o.removeEventListener("DOMContentLoaded",e),d=1;e=t.shift();)e()}),function(e){d?setTimeout(e,0):t.push(e)}});
},{}],"etho":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./");function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function t(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function i(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}var r=function(){function t(i){var r=this;n(this,t),this.container=i,this.canvas=i.getContext("2d"),this.world=new e.World(this.container,this.canvas),this.obstacle=new e.Obstacle(this.container,this.canvas,this.world),this.player=new e.Player(this.container,this.canvas,this.world),this.setup().then(function(){r.resize(!0),r.bind(),r.render()})}return i(t,[{key:"setup",value:function(){var e=this;return new Promise(function(n){if(e.canvas.imageSmoothingEnabled=!1,window.screen&&window.screen.orientation&&window.screen.orientation.lock)return window.screen.orientation.lock("portrait").then(n).catch(n)})}},{key:"resize",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(window.innerWidth>window.innerHeight?(this.container.width=960,this.container.height=600):(this.container.width=600,this.container.height=960),this.world.resize(),this.obstacle.resize(),this.player.resize(),!e)return this.render()}},{key:"bind",value:function(){var e=this;window.addEventListener("resize",function(){return e.resize()})}},{key:"render",value:function(){this.canvas.clearRect(0,0,this.container.width,this.container.height),this.world.render(),this.obstacle.render(),this.player.render(),window.requestAnimationFrame(this.render.bind(this))}}]),t}(),o=r;exports.default=o;
},{"./":"8/iA"}],"ofZm":[function(require,module,exports) {
"use strict";function t(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function i(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function e(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var n=function(){function i(e,n){t(this,i),this.container=e,this.canvas=n,this.tileSize=0,this.columns=0,this.rows=0,this.resize()}return e(i,[{key:"resize",value:function(){this.container.width&&this.container.height&&(this.tileSize=24,this.columns=Math.floor(this.container.width/this.tileSize),this.rows=Math.floor(this.container.height/this.tileSize)-1)}},{key:"drawLine",value:function(t,i,e,n){this.canvas.beginPath(),this.canvas.strokeStyle="#fafafa",this.canvas.lineWidth=1,this.canvas.moveTo(t,i),this.canvas.lineTo(e,n),this.canvas.stroke()}},{key:"render",value:function(){for(var t=0;t<this.columns+1;t++){var i=t*this.tileSize,e=i,n=this.container.height;this.drawLine(i,0,e,n)}for(var s=0;s<this.rows+1;s++){var a=s*this.tileSize,r=this.container.width,o=a;this.drawLine(0,a,r,o)}}}]),i}(),s=n;exports.default=s;
},{}],"VjGp":[function(require,module,exports) {
var global = arguments[3];
var f,c=arguments[3];!function(f){var c=["#ff0066","#ffcc00","#3d9df2","#e673cf","#8800cc","#005fb3","#a69d7c","#8c3f23","#397358","#594358","#30403d","#0d2b33","#ffbffb","#ffd580","#00e2f2","#9173e6","#a099cc","#5995b3","#994d6b","#2d2080","#736039","#0c0059","#00401a","#1a3320","#f240ff","#ff8800","#00f2c2","#e59173","#3347cc","#18b300","#269954","#205380","#733d00","#161f59","#364010","#332b1a","#0000ff","#ffc8bf","#79f299","#0000d9","#99cca7","#b29559","#8c004b","#7f7700","#730000","#305900","#402200","#331a1a","#bfe1ff","#ff0000","#baf279","#a3d5d9","#cc8533","#b38686","#59468c","#7f4840","#66001b","#134d49","#401100","#40bfff","#ff8080","#def2b6","#d94c36","#cc5200","#a67c98","#23858c","#6d1d73","#005266","#4d3e39","#330014","#73ff40","#f2b6c6","#f2d6b6","#cc3347","#0000bf","#29a68d","#8c6246","#565a73","#57664d","#400033","#331a31","#ccff00","#f279aa","#f20000","#cc0088","#b2bf00","#95a653","#8c7769","#566973","#592d39","#002240","#070033"];f.unique_colors=function(f){if(f>92)throw new Error("n <= 92");return c.slice(0,f)},f.unique_shuffled_colors=function(f){if(f>92)throw new Error("n <= 92");var d,r=[],e=[];for(d=0;d<f;d+=1)r.push([Math.floor(Math.random()*f),d]);for(r.sort(function(f,c){return f[0]-c[0]}),d=0;d<f;d+=1)e.push(c[r[d][1]]);return e}}(f="undefined"!=typeof module&&module.exports?module.exports:window);
},{}],"Jvv/":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("unique-colors");function i(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function s(t,i){for(var s=0;s<i.length;s++){var e=i[s];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function e(t,i,e){return i&&s(t.prototype,i),e&&s(t,e),t}var n=function(){function t(s,e,n){i(this,t),this.container=s,this.canvas=e,this.world=n,this.x=0,this.y=0,this.rate=.08,this.fill=this.getRandomFill(),this.missingX=this.getRandomMissingX()}return e(t,[{key:"getRandomFill",value:function(){}},{key:"getRandomMissingX",value:function(){return this.world.columns?Math.floor(Math.random()*this.world.columns):-1}},{key:"resize",value:function(){this.missingX<0&&(this.missingX=this.getRandomMissingX())}},{key:"render",value:function(){for(var t=this.world,i=(t.columns,t.tileSize),s=0;s<this.world.columns;s++)if(s!==this.missingX){var e=s*i,n=this.y*i;this.canvas.beginPath(),this.canvas.fillStyle="#ddd",this.canvas.strokeStyle="#fafafa",this.canvas.rect(e,n,i,i),this.canvas.fill(),this.canvas.stroke()}this.world.columns>0&&this.y<this.world.rows&&(this.y+=this.rate)}}]),t}(),a=n;exports.default=a;
},{"unique-colors":"VjGp"}],"Noz8":[function(require,module,exports) {
"use strict";function t(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function i(t,i){for(var e=0;e<i.length;e++){var s=i[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function e(t,e,s){return e&&i(t.prototype,e),s&&i(t,s),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var s=function(){function i(e,s,n){t(this,i),this.container=e,this.canvas=s,this.world=n,this.size=-1,this.x=this.getStartingX(),this.y=this.getStartingY(),this.resize()}return e(i,[{key:"resize",value:function(){this.size<0&&this.world.tileSize&&(this.size=this.world.tileSize),(this.x<0||this.y<0)&&(this.x=this.getStartingX(),this.y=this.getStartingY())}},{key:"getStartingX",value:function(){return this.world.columns?Math.floor(this.world.columns/2):-1}},{key:"getStartingY",value:function(){return this.world.rows?Math.floor(this.world.rows/1.5):-1}},{key:"render",value:function(){this.canvas.beginPath(),this.canvas.fillStyle="#000000",this.canvas.strokeStyle="#fafafa",this.canvas.rect(this.x*this.size,this.y*this.size,this.size,this.size),this.canvas.fill(),this.canvas.stroke()}}]),i}(),n=s;exports.default=n;
},{}],"8/iA":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"Game",{enumerable:!0,get:function(){return e.default}}),Object.defineProperty(exports,"World",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(exports,"Obstacle",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(exports,"Player",{enumerable:!0,get:function(){return u.default}});var e=n(require("./Game")),r=n(require("./World")),t=n(require("./Obstacle")),u=n(require("./Player"));function n(e){return e&&e.__esModule?e:{default:e}}
},{"./Game":"etho","./World":"ofZm","./Obstacle":"Jvv/","./Player":"Noz8"}],"Focm":[function(require,module,exports) {
"use strict";require("normalize.css");var e=t(require("domready")),r=require("./components");function t(e){return e&&e.__esModule?e:{default:e}}var u=function(){return new r.Game(document.getElementById("thru"))};(0,e.default)(u);
},{"normalize.css":"DOAq","domready":"NDqt","./components":"8/iA"}]},{},["Focm"], null)
//# sourceMappingURL=/src.fde03701.map