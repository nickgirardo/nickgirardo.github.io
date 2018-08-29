/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entities_segment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entities/segment.js */ "./src/entities/segment.js");



const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Chain set up as linked list like structure
const root = new _entities_segment_js__WEBPACK_IMPORTED_MODULE_0__["default"](120, 0, 0.01, 
              new _entities_segment_js__WEBPACK_IMPORTED_MODULE_0__["default"](100, 0, 0.01,
                new _entities_segment_js__WEBPACK_IMPORTED_MODULE_0__["default"](80, 0, 0.01,
                  new _entities_segment_js__WEBPACK_IMPORTED_MODULE_0__["default"](60, 0, 0.01,
                    new _entities_segment_js__WEBPACK_IMPORTED_MODULE_0__["default"](40, 0, 0.01,
                      new _entities_segment_js__WEBPACK_IMPORTED_MODULE_0__["default"](20, 0, 0.01)
                  )))));


function update() {
  root.update();

  draw();

  window.requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  root.draw(canvas, ctx);
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  root.pos = {x: canvas.width/2, y: canvas.height/2};

  draw();
}

function handleError(msg, url, row, col, obj) {
  const handlerDiv = document.querySelector('#error-handler');
  const errorMsg = document.querySelector('#error-message');

  handlerDiv.style.display = "block"

  if(!!obj && !!obj.stack) {
    const stack = obj.stack.split('\n').map(str=>'\t'+str).join('\n');
    const fullMsg = `${obj.name}: ${obj.message}\n${stack}`;
    console.error(fullMsg);
    errorMsg.innerText = fullMsg;
  } else {
    // Not all browsers have access to obj and obj.stack
    const fallbackMsg = `${msg}\n\t${url}:${row}:${col}\n\t(fallback error handler)`;
    console.error(fallbackMsg);
    errorMsg.innerText = fallbackMsg;
  }
}

function init() {
  window.onerror = handleError;

  window.addEventListener('resize', resize);

  update();
  resize();
}

init();


/***/ }),

/***/ "./src/entities/segment.js":
/*!*********************************!*\
  !*** ./src/entities/segment.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Segment; });
/* harmony import */ var _vec2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vec2.js */ "./src/vec2.js");



class Segment {

  constructor(length, angle, rotationalVelocity, next = null) {
    this.length = length;
    this.ownAngle = angle;
    this.rotationalVelocity = rotationalVelocity

    // These should be given values later
    this.pos = {x: 0, y: 0};
    this.inheritedAngle = 0;

    this.next = next;
  }

  angle() {
    return this.ownAngle + this.inheritedAngle;
  }

  endPoint() {
    return _vec2_js__WEBPACK_IMPORTED_MODULE_0__["rotateAbout"](_vec2_js__WEBPACK_IMPORTED_MODULE_0__["add"](this.pos, {x: 0, y: this.length}), this.pos, this.angle());
  }

  update(pos = this.pos, angle = this.ownAngle) {
    this.pos = pos;
    this.inheritedAngle = angle;

    this.ownAngle += this.rotationalVelocity;

    if(this.next)
      this.next.update(this.endPoint(), this.angle());
  }

  draw(canvas, ctx) {
    const segmentWidth = 20;
    const points = [
      _vec2_js__WEBPACK_IMPORTED_MODULE_0__["add"](this.pos, {x: -segmentWidth/2, y:0}),
      _vec2_js__WEBPACK_IMPORTED_MODULE_0__["add"](this.pos, {x: -segmentWidth/2, y:this.length}),
      _vec2_js__WEBPACK_IMPORTED_MODULE_0__["add"](this.pos, {x: segmentWidth/2, y:this.length}),
      _vec2_js__WEBPACK_IMPORTED_MODULE_0__["add"](this.pos, {x: segmentWidth/2, y:0}),
    ].map(p => _vec2_js__WEBPACK_IMPORTED_MODULE_0__["rotateAbout"](p, this.pos, this.angle()));

    ctx.fillStyle = 'lightgrey';
    ctx.beginPath();
    ctx.moveTo(points[points.length-1].x, points[points.length-1].y);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.fill();
    ctx.stroke();

    if(this.next)
      this.next.draw(canvas, ctx);
  }

}


/***/ }),

/***/ "./src/vec2.js":
/*!*********************!*\
  !*** ./src/vec2.js ***!
  \*********************/
/*! exports provided: up, rotate, rotateAbout, getRotation, add, subtract, sub, normalize, norm, divide, div, magnitude, mag, sMul, equals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "up", function() { return up; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateAbout", function() { return rotateAbout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRotation", function() { return getRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "norm", function() { return norm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "magnitude", function() { return magnitude; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mag", function() { return mag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sMul", function() { return sMul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });

// Super sloppy 2d-vector maths
// Started this when I was doing ld48 and I'm still using it because its simple

function up() {
  return {x: 0, y: 1};
}

function rotate(vec, theta) {
  return {
    x: vec.x*Math.cos(theta) - vec.y*Math.sin(theta), 
    y: vec.x*Math.sin(theta) + vec.y*Math.cos(theta)
  }
}

function rotateAbout(vec, about, theta) {
  return add(rotate(sub(vec, about), theta), about);
}

function getRotation(vec) {
  return Math.atan2(vec.y, vec.x);
}

function add(vec1, vec2) {
  return {x: vec1.x + vec2.x, y: vec1.y + vec2.y};
}

function subtract(vec1, vec2) {
  return {x: vec1.x - vec2.x, y: vec1.y - vec2.y};
}

const sub = subtract;

function normalize(vec) {
  const _mag = mag(vec);
  if(_mag === 0)
    return {x: 0, y: 0};
  return div(vec, _mag);
}

const norm = normalize;

// Vector by scalar division
function divide(vec, s) {
  return {x: vec.x/s, y: vec.y/s};
}

const div = divide;

function magnitude(vec) {
  return Math.sqrt(vec.x**2 + vec.y**2);
}

const mag = magnitude;

function sMul(vec, s) {
  return {x: vec.x*s, y: vec.y*s};
}

// TODO should be using epsilons for this
function equals(vec1, vec2) {
  return vec1.x === vec2.x && vec1.y === vec2.y;
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map