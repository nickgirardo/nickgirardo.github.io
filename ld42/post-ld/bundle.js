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
/* harmony import */ var _keyboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keyboard.js */ "./src/keyboard.js");
/* harmony import */ var _entities_manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/manager.js */ "./src/entities/manager.js");




const canvas = document.querySelector('canvas#ld48');
const ctx = canvas.getContext('2d');

let manager;

function newGame() {
  manager = new _entities_manager_js__WEBPACK_IMPORTED_MODULE_1__["default"](canvas, newGame);
}

function update() {
  if(!manager)
    return;

  manager.update();
  draw();

  window.requestAnimationFrame(update);
}

function draw() {
  if(!manager)
    return;

  manager.draw(canvas, ctx);
}

function resize() {
  canvas.width = Math.min(window.innerHeight, window.innerWidth);
  canvas.height = Math.min(window.innerHeight, window.innerWidth);

  draw();
}

function init() {
  _keyboard_js__WEBPACK_IMPORTED_MODULE_0__["init"]();

  resize()
  window.addEventListener('resize', resize);

  newGame();

  update();
}

init();


/***/ }),

/***/ "./src/collision.js":
/*!**************************!*\
  !*** ./src/collision.js ***!
  \**************************/
/*! exports provided: check, test */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "check", function() { return check; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "test", function() { return test; });
/* harmony import */ var _vec2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vec2.js */ "./src/vec2.js");


function check(scene) {

  // Only check among entities with defined colision bodies
  const colBodies = scene.filter(e=> typeof e.collisionBody === "function");

  const ret = colBodies.map(e=> ({entity:e, collisions:[]}));

  colBodies.forEach((e1,ix) => {
    colBodies.slice(ix+1).forEach((e2, ix2) => {
      if(test(e1.collisionBody(), e2.collisionBody())) {
        ret[ix].collisions.push(e2);
        ret[ix + ix2 + 1].collisions.push(e1);
      }
    });
  });

  return ret.filter(r => r.collisions.length !== 0);
}

function test(a, b) {
  const invert = a.invert !== b.invert;
  switch (a.type) {
    case 'point':
      switch (b.type) {
        case 'point':
          return invert !== pointPointTest(a, b);
        case 'circle':
          return invert !== pointCircleTest(a, b);
        default:
          console.error(`Unknown collision body type: ${b.type}`);
          return false;
      }
      break;
    case 'circle':
      switch (b.type) {
        case 'point':
          return invert !== pointCircleTest(b, a);
        case 'circle':
          return invert !== circleCircleTest(a, b);
        default:
          console.error(`Unknown collision body type: ${b.type}`);
          return false;
      }
      break;
    default:
      console.error(`Unknown collision body type: ${a.type}`);
      return false;
  }

  console.error('End of collision test: I should never be reached!');
  return false;
}

function pointPointTest(a, b) {
  return _vec2_js__WEBPACK_IMPORTED_MODULE_0__["equals"](a.center, b.center);
}

function pointCircleTest(p, c) {
  return _vec2_js__WEBPACK_IMPORTED_MODULE_0__["mag"](_vec2_js__WEBPACK_IMPORTED_MODULE_0__["sub"](p.center, c.center)) <= c.radius;
}

function circleCircleTest(a, b) {
  return _vec2_js__WEBPACK_IMPORTED_MODULE_0__["mag"](_vec2_js__WEBPACK_IMPORTED_MODULE_0__["sub"](a.center, b.center)) <= (a.radius + b.radius);
}


/***/ }),

/***/ "./src/entities/arena.js":
/*!*******************************!*\
  !*** ./src/entities/arena.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Arena; });


class Arena {

  constructor(manager) {
    this.name = "Arena";
    this.manager = manager;

    this.center = {x: 0.5, y: 0.5};
    this.radius = 0.48;
    this.minRadius = 0.0001;
    this.maxRadius = 0.5;
    this.frameShrink = [
      0,
      0.0001,
      0.0002,
      0.00035,
      0.0007,
      0.0011,
      0.0014,
    ];

    this.targetRadius = this.radius;
    this.maxFrameChange = 0.04;
  }

  update() {
    this.reduce(this.frameShrink[this.manager.level]);
    const diff = this.targetRadius - this.radius;
    const change = Math.max(Math.min(diff, this.maxFrameChange), -this.maxFrameChange);
    this.radius += change;
  }

  draw(canvas, ctx) { }

  postDraw(canvas, ctx) {
    const pxRadius = this.radius * canvas.width;

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(canvas.width*this.center.x, canvas.width*this.center.y, pxRadius, 0, Math.PI * 2, false);
    ctx.rect(canvas.width, 0, -canvas.width, canvas.height);
    ctx.fill();
  }

  handleCollision() {}

  collisionBody() {
    return {
      type: "circle",
      invert: true,
      center: this.center,
      radius: this.radius,
    }
  }

  reduce(amount) {
    if(this.targetRadius - amount > this.minRadius) {
      this.targetRadius -= amount;
    } else {
      this.targetRadius = this.minRadius;
      this.manager.gameOver();
    }
  }

  increase(amount) {
    this.targetRadius = Math.min(this.targetRadius + amount, this.maxRadius);
  }

  // Collecting soul increases the size of the arena
  // The amount scales inversely with the size of the arena
  // This makes it a bit easier to come back after taking hits
  collectSoul() {
    const baseAmount = 0.0006;
    const radiusDiff = this.maxRadius - this.targetRadius;
    console.log(baseAmount + radiusDiff/600);
    this.increase(baseAmount + radiusDiff/600);
  }

}


/***/ }),

/***/ "./src/entities/bullet.js":
/*!********************************!*\
  !*** ./src/entities/bullet.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Bullet; });
/* harmony import */ var _vec2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vec2.js */ "./src/vec2.js");


class Bullet {

  constructor(manager, source, startLoc, direction) {
    this.manager = manager;

    this.name = "Bullet";
    this.source = source;
    this.isEnemy = source.isEnemy;

    this.color = source.color;
    this.center = startLoc;
    this.direction = direction;

    this.velocity = 0.02;
    this.radius = 0.01;

    this.strength = 0.1;
  }

  update() {
    this.center = _vec2_js__WEBPACK_IMPORTED_MODULE_0__["add"](this.center, _vec2_js__WEBPACK_IMPORTED_MODULE_0__["sMul"](this.direction, this.velocity));
  }

  draw(canvas, ctx) {
    const pxRadius = canvas.width * this.radius;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(canvas.width*this.center.x, canvas.width*this.center.y, pxRadius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
  }

  handleCollision(collision) {
    switch(collision.name) {
      case 'Arena':
        this.manager.destroy(this);
        break;
    }
  }

  collisionBody() {
    return {
      type: "circle",
      center: this.center,
      radius: this.radius,
    }
  }

}


/***/ }),

/***/ "./src/entities/enemies/basic.js":
/*!***************************************!*\
  !*** ./src/entities/enemies/basic.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BasicEnemy; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util.js */ "./src/util.js");
/* harmony import */ var _vec2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../vec2.js */ "./src/vec2.js");



class BasicEnemy {
  constructor(manager, player, center) {
    this.manager = manager;

    this.name = "BasicEnemy";
    this.isEnemy = true;

    // This property helps avoid a softlock
    this.firstEnemy = false;

    this.center = center;
    this.verts = [
      {x: 0.02, y: 0.02},
      {x: 0, y: 0.024},
      {x: -0.02, y: 0.02},
      {x: -0.024, y: 0},
      {x: -0.02, y: -0.02},
      {x: 0, y: -0.024},
      {x: 0.02, y: -0.02},
      {x: 0.024, y: 0},
    ];
    this.color = 'red';
    this.rot = 0;

    this.velocity = 0.003;
    this.currentDir = Math.random()*Math.PI*2;
    this.direction = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["rotate"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["up"](), this.currentDir);

    this.strength = 0.15;
    this.souls = 16;
    this.score = 50;
  }


  update() {
    const gameCenter = {x: 0.5, y: 0.5};
    const diff = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["sub"](gameCenter, this.center);
    this.direction = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["norm"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["add"](this.direction, _vec2_js__WEBPACK_IMPORTED_MODULE_1__["div"](diff,8)));
    this.center = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["add"](this.center, _vec2_js__WEBPACK_IMPORTED_MODULE_1__["sMul"](this.direction, this.velocity));

    // TODO should this be based off of something?
    this.rot += 0.03;
  }

  draw(canvas, ctx) {
    _util_js__WEBPACK_IMPORTED_MODULE_0__["drawVec"](canvas, ctx, this.center, this.verts, this.rot, this.color);
  }

  handleCollision(collision) {
    switch(collision.name) {
      case 'Player':
        // Game needs to spawn a new enemy to begin
        if(this.firstEnemy)
          this.manager.firstEnemyCollision()
        this.manager.damagePlayer(collision, this);
        this.manager.destroy(this);
        break;
      case 'Bullet':
        if(!collision.isEnemy) {
          this.manager.defeatEnemy(this);
          this.manager.destroy(collision);
        }
        break;
    }
  }

  collisionBody() {
    return {
      type: 'circle',
      center: this.center,
      radius: 0.025,
    }
  }

}


/***/ }),

/***/ "./src/entities/enemies/rusher.js":
/*!****************************************!*\
  !*** ./src/entities/enemies/rusher.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rusher; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util.js */ "./src/util.js");
/* harmony import */ var _vec2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../vec2.js */ "./src/vec2.js");
/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bullet.js */ "./src/entities/bullet.js");





class Rusher {
  constructor(manager, player, center) {
    this.manager = manager;
    this.player = player

    this.name = "Rusher";
    this.isEnemy = true;

    this.center = center;
    this.verts = [
      {x: 0.022, y: 0},
      {x: -0.014, y: 0.018},
      {x: -0.026, y: 0.015},
      {x: -0.031, y: 0},
      {x: -0.026, y: -0.015},
      {x: -0.014, y: -0.018},
    ];
    this.color = 'red';
    this.rot = 0;

    this.velocity = 0.007;
    this.direction = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["norm"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["sub"](this.player.center, this.center));

    this.strength = 0.15;
    this.souls = 22;
    this.score = 100;
  }


  update() {
    this.center = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["add"](this.center, _vec2_js__WEBPACK_IMPORTED_MODULE_1__["sMul"](this.direction, this.velocity));

    const targetRot = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["norm"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["sub"](this.player.center, this.center));
    // If this coefficient is too large the rusher will miss the player
    // or never hit him at all
    const gradualness = 4;
    this.direction = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["norm"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["add"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["sMul"](this.direction, gradualness), targetRot));
    this.rot = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["getRotation"](this.direction);
  }

  draw(canvas, ctx) {
    _util_js__WEBPACK_IMPORTED_MODULE_0__["drawVec"](canvas, ctx, this.center, this.verts, this.rot, this.color);
  }

  handleCollision(collision) {
    switch(collision.name) {
      case 'Player':
        this.manager.damagePlayer(collision, this);
        this.manager.destroy(this);
        break;
      case 'Bullet':
        if(!collision.isEnemy) {
          this.manager.defeatEnemy(this);
          this.manager.destroy(collision);
        }
        break;
    }
  }

  collisionBody() {
    return {
      type: 'circle',
      center: this.center,
      radius: 0.025,
    }
  }

}



/***/ }),

/***/ "./src/entities/enemies/shooter.js":
/*!*****************************************!*\
  !*** ./src/entities/enemies/shooter.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Shooter; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util.js */ "./src/util.js");
/* harmony import */ var _vec2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../vec2.js */ "./src/vec2.js");



class Shooter {
  constructor(manager, player, center) {
    this.manager = manager;
    this.player = player

    this.name = "Shooter";
    this.isEnemy = true;

    this.center = center;
    this.verts = [
      {x: 0.01, y: 0},
      {x: -0.01, y: 0.025},
      {x: -0.02, y: 0.020},
      {x: -0.025, y: 0},
      {x: -0.02, y: -0.020},
      {x: -0.01, y: -0.025},
    ];
    this.color = 'red';
    this.rot = 0;

    this.friction = 0.84;
    this.acceleration = 0.00065;
    this.velocity = {x: 0, y:0};
    this.direction = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["norm"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["sub"](this.player.center, this.center));

    this.fireDelay = 80;
    this.fireFrameCount = 0;

    this.strength = 0.1;
    this.souls = 22;
    this.score = 100;
  }


  update() {
    const shootingMaxDistance = 0.28;
    const idealMaxDistance = 0.22;
    const idealMinDistance = 0.15;
    const towardsPlayer = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["sub"](this.player.center, this.center)
    const distance = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["mag"](towardsPlayer);
    
    // Should the shooter approach or retreat?
    // It might be happy with its distance and not do either
    if(distance > idealMaxDistance) {
      // Approach
      this.velocity = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["add"](this.velocity, _vec2_js__WEBPACK_IMPORTED_MODULE_1__["sMul"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["norm"](towardsPlayer), this.acceleration));
    } else if (distance < idealMinDistance) {
      // Retreat
      this.velocity = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["sub"](this.velocity, _vec2_js__WEBPACK_IMPORTED_MODULE_1__["sMul"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["norm"](towardsPlayer), this.acceleration));
    }

    this.fireFrameCount++;
    if(distance < shootingMaxDistance && this.fireFrameCount >= this.fireDelay) {
      this.fireFrameCount = 0;

      this.manager.shootAt(this, this.center, this.player.center);
      const recoilForce = 0.01;
      this.velocity = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["add"](this.velocity, _vec2_js__WEBPACK_IMPORTED_MODULE_1__["sMul"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["norm"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["sub"](this.center, this.player.center)), recoilForce));
    }

    this.velocity = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["sMul"](this.velocity, this.friction);
    this.center = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["add"](this.center, this.velocity)

    this.rot = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["getRotation"](towardsPlayer);
  }

  draw(canvas, ctx) {
    _util_js__WEBPACK_IMPORTED_MODULE_0__["drawVec"](canvas, ctx, this.center, this.verts, this.rot, this.color);
  }

  handleCollision(collision) {
    switch(collision.name) {
      case 'Player':
        this.manager.damagePlayer(collision, this);
        this.manager.destroy(this);
        break;
      case 'Bullet':
        if(!collision.isEnemy) {
          this.manager.defeatEnemy(this);
          this.manager.destroy(collision);
        }
        break;
      case 'Arena':
        this.fireFrameCount = 0;
        break;
    }
  }

  collisionBody() {
    return {
      type: 'circle',
      center: this.center,
      radius: 0.025,
    }
  }

}




/***/ }),

/***/ "./src/entities/enemies/spawner.js":
/*!*****************************************!*\
  !*** ./src/entities/enemies/spawner.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Spawner; });
/* harmony import */ var _vec2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../vec2.js */ "./src/vec2.js");
/* harmony import */ var _basic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basic.js */ "./src/entities/enemies/basic.js");
/* harmony import */ var _rusher_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rusher.js */ "./src/entities/enemies/rusher.js");
/* harmony import */ var _shooter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shooter.js */ "./src/entities/enemies/shooter.js");






class Spawner {

  constructor(manager, arena, player) {
    this.manager = manager;
    this.arena = arena;
    this.player = player;

    this.name = "Spawner";

    this.spawnIntervals = [
      -1,
      70,
      60,
      45,
      32,
      20,
      15,
    ]

    this.spawnDoubleChance = [
      0,
      0.001,
      0.002,
      0.2,
      0.5,
      0.75,
      0.92,
    ]

    this.spawnTypes = [
      [1, 1, 1],
      [0.8, 0.99, 1],
      [0.6, 0.9, 1],
      [0.3, 0.8, 1],
      [0.1, 0.8, 1],
      [0.05, 0.8, 1],
      [0.02, 0.75, 1],
    ];

    this.enemyTypes = [
      "BasicEnemy",
      "Rusher",
      "Shooter",
    ];

    this.sinceLastSpawn = 0;
  }

  update() {
    const spawnEnemy = () => {
      const rand = Math.random();
      const enemyType = this.enemyTypes[this.spawnTypes[this.manager.level].findIndex(s=>s>rand)];
      this.manager.spawnEnemy(enemyType);
    }
    this.sinceLastSpawn ++;

    if(this.sinceLastSpawn > this.spawnIntervals[this.manager.level]) {
      this.sinceLastSpawn = 0;
      spawnEnemy();
      if(this.spawnDoubleChance[this.manager.level] > Math.random())
        spawnEnemy();
    }

  }

  draw() {}

}


/***/ }),

/***/ "./src/entities/manager.js":
/*!*********************************!*\
  !*** ./src/entities/manager.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Manager; });
/* harmony import */ var _collision_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../collision.js */ "./src/collision.js");
/* harmony import */ var _vec2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vec2.js */ "./src/vec2.js");
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player.js */ "./src/entities/player.js");
/* harmony import */ var _arena_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./arena.js */ "./src/entities/arena.js");
/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bullet.js */ "./src/entities/bullet.js");
/* harmony import */ var _soul_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./soul.js */ "./src/entities/soul.js");
/* harmony import */ var _enemies_spawner_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./enemies/spawner.js */ "./src/entities/enemies/spawner.js");
/* harmony import */ var _enemies_basic_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enemies/basic.js */ "./src/entities/enemies/basic.js");
/* harmony import */ var _enemies_rusher_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./enemies/rusher.js */ "./src/entities/enemies/rusher.js");
/* harmony import */ var _enemies_shooter_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./enemies/shooter.js */ "./src/entities/enemies/shooter.js");
/* harmony import */ var _ui_flashText_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ui/flashText.js */ "./src/entities/ui/flashText.js");
/* harmony import */ var _ui_gameOverText_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ui/gameOverText.js */ "./src/entities/ui/gameOverText.js");
/* harmony import */ var _sfx_enemyBullet_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./sfx/enemyBullet.js */ "./src/entities/sfx/enemyBullet.js");
/* harmony import */ var _sfx_friendlyBullet_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./sfx/friendlyBullet.js */ "./src/entities/sfx/friendlyBullet.js");
/* harmony import */ var _sfx_levelUp_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./sfx/levelUp.js */ "./src/entities/sfx/levelUp.js");
/* harmony import */ var _sfx_shipDestroy_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./sfx/shipDestroy.js */ "./src/entities/sfx/shipDestroy.js");








// Enemies





// UI



// SFX





class Manager {
  constructor(canvas, newGame) {
    this.canvas = canvas;
    this.newGame = newGame;
    this.arena = new _arena_js__WEBPACK_IMPORTED_MODULE_3__["default"](this);
    this.player = new _player_js__WEBPACK_IMPORTED_MODULE_2__["default"](this, this.canvas);
    this.scene = [
      this.arena,
      this.player,
    ];

    this.enemyBulletSfx = new _sfx_enemyBullet_js__WEBPACK_IMPORTED_MODULE_12__["default"]();
    this.friendlyBulletSfx = new _sfx_friendlyBullet_js__WEBPACK_IMPORTED_MODULE_13__["default"]();
    this.levelUpSfx = new _sfx_levelUp_js__WEBPACK_IMPORTED_MODULE_14__["default"]();
    this.shipDestroySfx = new _sfx_shipDestroy_js__WEBPACK_IMPORTED_MODULE_15__["default"]();

    const firstEnemy = this.spawnEnemy("BasicEnemy");
    firstEnemy.firstEnemy = true;

    this.isGameOver = false;

    this.levelKills = 0;
    this.levelKillsNeeded = [
      1,
      12,
      24,
      24,
      24,
      Infinity
    ];
    this.level = 0;

    this.score = 0;
    this.hiscore = Number(localStorage.getItem('hiscore')) || 0;
    this.paddedHiscore = (this.hiscore + '').padStart(8, '0');
    this.incScore(0);
  }

  update() {
    // No updates to a finished game
    if(this.isGameOver)
      return;

    // Fist handle collisions
    const collisionResults = _collision_js__WEBPACK_IMPORTED_MODULE_0__["check"](this.scene);
    collisionResults.forEach(({entity, collisions}) => {
      collisions.forEach(col => {
        if(entity && col)
          entity.handleCollision(col);
      });
    });

    this.scene.forEach(c=>c.update());
  }

  draw(canvas, ctx) {

    ctx.fillStyle = this.isGameOver ? 'red' : 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.scene.filter(e=>typeof e.draw === "function").forEach(e=>e.draw(canvas, ctx));

    // Make sure this bit of the arena is drawn after everything
    // This is a hack to avoid needing system of layers
    this.scene.filter(e=>typeof e.postDraw === "function").forEach(e=>e.postDraw(canvas, ctx));

    // Just drawing the UI here save time
    ctx.fillStyle = 'white';
    // TODO should shrink based on screen size
    // but this is mostly good so I might just keep it
    ctx.font = '24px LuluMono';
    ctx.textBaseline = 'top';

    ctx.textAlign = 'start';
    if(this.level === 0) {
      ctx.fillText('WASD to move', 4, 4);
      ctx.fillText('Click to shoot', 4, 32);
    } else {
      ctx.fillText(`Level ${this.level}`, 4, 4);
      ctx.fillText(`Kills to next: ${this.levelKillsNeeded[this.level] - this.levelKills}`, 4, 32);
    }

    ctx.textAlign = 'end';
    ctx.fillText(`Hi Score ${this.hiScore()}`, canvas.width-4, 4)
    ctx.fillText(`Score ${this.paddedScore || 0}`, canvas.width-4, 32)
  }

  destroy(entity) {
    const ix = this.scene.indexOf(entity);
    if(ix === -1) {
      console.error('Entity not found for deletion');
      return;
    }
    this.scene.splice(ix, 1);
  }

  defeatEnemy(entity) {
    this.incScore(entity.score * (this.level+1));
    this.levelKills++;
    if(this.levelKills >= this.levelKillsNeeded[this.level])
      this.advanceLevel();

    const soulsToCreate = entity.souls;
    for(let i=0; i<soulsToCreate; i++) {
      this.scene.push(new _soul_js__WEBPACK_IMPORTED_MODULE_5__["default"](this, this.player, entity.center));
    }

    this.shipDestroySfx.play();

    this.destroy(entity);
  }

  incScore(amount) {
    this.score += amount;
    this.paddedScore = (this.score + '').padStart(8, '0');
  }

  hiScore() {
    return this.score < this.hiscore ? this.paddedHiscore : this.paddedScore;
  }

  advanceLevel() {
    this.level++;
    this.levelKills = 0;

    this.scene.push(new _ui_flashText_js__WEBPACK_IMPORTED_MODULE_10__["default"](this, 'LEVEL ' + this.level));

    this.levelUpSfx.play();
    // Start spawning enemies at the start of the first level
    // Level 0 is just one enemy
    if(this.level === 1)
      this.scene.push(new _enemies_spawner_js__WEBPACK_IMPORTED_MODULE_6__["default"](this, this.arena, this.player));
  }

  shootAt(source, spawn, target) {
    const direction = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["norm"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["sub"](target, source.center));
    this.scene.push(new _bullet_js__WEBPACK_IMPORTED_MODULE_4__["default"](this, source, spawn, direction));
    if(source.isEnemy)
      this.enemyBulletSfx.play();
    else
      this.friendlyBulletSfx.play();
  }

  // Damage dealt to the player is represented by arena shrinking
  // The only way the player loses is if he leaves the arena
  damagePlayer(player, enemy) {
    this.arena.reduce(enemy.strength);
  }

  collectSoul(player, soul) {
    this.incScore(this.level);
    this.arena.collectSoul();
  }

  // If the first enemy hits the player we need to spawn a new enemy
  // so that the player doesn't get stuck in level zero and the game
  // can begin
  firstEnemyCollision() {
    const newFirstEnemy = this.spawnEnemy("BasicEnemy");
    newFirstEnemy.firstEnemy = true;
  }

  spawnEnemy(type) {
    const spawnFns = {
      "BasicEnemy": (center) => new _enemies_basic_js__WEBPACK_IMPORTED_MODULE_7__["default"](this, this.player, center),
      "Rusher": (center) => new _enemies_rusher_js__WEBPACK_IMPORTED_MODULE_8__["default"](this, this.player, center),
      "Shooter": (center) => new _enemies_shooter_js__WEBPACK_IMPORTED_MODULE_9__["default"](this, this.player, center),
    }
    const center = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["add"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["sMul"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["rotate"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["up"](), Math.random()*Math.PI*2), this.arena.radius * 2), {x: 0.5, y: 0.5});
    if(!spawnFns[type]) {
      console.error(`Unable to spawn enemy, unknown type '${type}'`);
      return;
    }
    const enemy = spawnFns[type](center);
    this.scene.push(enemy);

    return enemy;
  }

  gameOver() {
    if(this.score > this.hiscore)
      localStorage.setItem('hiscore', this.score);

    this.isGameOver = true;
    this.scene.push(new _ui_gameOverText_js__WEBPACK_IMPORTED_MODULE_11__["default"](this));
    
    this.scene.filter(e=>typeof e.cleanUp === "function").forEach(e=>e.cleanUp());
    
    const clickHandler = (e) => {
      this.canvas.removeEventListener("click", clickHandler);
      this.newGame();
    };
    this.canvas.addEventListener("click", clickHandler);
  }

}


/***/ }),

/***/ "./src/entities/player.js":
/*!********************************!*\
  !*** ./src/entities/player.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");
/* harmony import */ var _vec2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vec2.js */ "./src/vec2.js");
/* harmony import */ var _keyboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../keyboard.js */ "./src/keyboard.js");




class Player {
  constructor(manager, canvas) {
    this.manager = manager;
    this.canvas = canvas;

    this.name = "Player";
    this.isEnemy = false;

    this.center = {x: 0.5, y: 0.5};
    this.verts = [
      {x: 0.025, y: 0},
      {x: -0.025, y: -0.015},
      {x: -0.018, y: 0},
      {x: -0.025, y: 0.015},
    ];
    this.rot = 0;

    this.color = 'lightgrey'

    // Don't want the bullets we shoot to just spawn inside the ship at its center
    this.bulletOffset = {x: 0.025, y:0.008};

    this.velocity = {x: 0, y:0};
    this.friction = 0.84;
    this.acceleration = 0.0024;

    // Mouse related garbage
    this.mouseMoveHandler = (e) => {
      this.mouseLoc = {x: (e.clientX - canvas.offsetLeft)/canvas.width, y: (e.clientY - canvas.offsetTop)/canvas.height};
    };
    this.clickHandler = (e) => {
      this.click = true;
      this.clickLoc = {x: (e.clientX - canvas.offsetLeft)/canvas.width, y: (e.clientY - canvas.offsetTop)/canvas.height};
    };
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.addEventListener("click", this.clickHandler);

    this.mouseLoc = {x: 0.5, y: 0.5};
    this.click = false;
    this.clickLoc = {x: 0.5, y: 0.5};
  }

  update() {
    function moreRecentPress(a, b) {
      if (_keyboard_js__WEBPACK_IMPORTED_MODULE_2__["keys"][a] && _keyboard_js__WEBPACK_IMPORTED_MODULE_2__["keys"][b])
        return (_keyboard_js__WEBPACK_IMPORTED_MODULE_2__["timestamps"][b] > _keyboard_js__WEBPACK_IMPORTED_MODULE_2__["timestamps"][a]) ? -1 : 1;
      else if (_keyboard_js__WEBPACK_IMPORTED_MODULE_2__["keys"][a] || _keyboard_js__WEBPACK_IMPORTED_MODULE_2__["keys"][b])
        return _keyboard_js__WEBPACK_IMPORTED_MODULE_2__["keys"][b] ? -1 : 1;
      else
        return 0;
    }

    const mouseLoc = this.mouseLoc;
    this.rot = Math.atan2(mouseLoc.y - this.center.y, mouseLoc.x - this.center.x);

    const direction = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["norm"]({x: moreRecentPress(68, 65), y: moreRecentPress(83, 87)});
    // I think this math is wrong but it seems to be working well enough for now
    this.velocity = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["add"](this.velocity, _vec2_js__WEBPACK_IMPORTED_MODULE_1__["sMul"](direction, this.acceleration));
    this.velocity = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["sMul"](this.velocity, this.friction);
    this.center = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["add"](this.center, this.velocity);

    if(this.click) {
      this.click = false;

      // Fire bullets
      // TODO need cooldown?
      // This makes it come out of a different side of the front of the ship each shot
      // as if the ship has two cannons on the front
      this.bulletOffset.y *= -1;
      const spawnLoc = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["add"](this.center, _vec2_js__WEBPACK_IMPORTED_MODULE_1__["rotate"](this.bulletOffset, this.rot));
      this.manager.shootAt(this, spawnLoc, this.clickLoc);
      const recoilForce = 0.0015;
      this.velocity = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["add"](this.velocity, _vec2_js__WEBPACK_IMPORTED_MODULE_1__["sMul"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["norm"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["sub"](this.center, this.clickLoc)), recoilForce));

    }

  }

  draw(canvas, ctx) {
    _util_js__WEBPACK_IMPORTED_MODULE_0__["drawVec"](canvas, ctx, this.center, this.verts, this.rot, this.color);
  }

  handleCollision(collision) {
    switch(collision.name) {
      case 'Arena':
        this.manager.gameOver();
        break;
      case 'Bullet':
        if(collision.isEnemy) {
          this.manager.damagePlayer(this, collision);
          this.manager.destroy(collision);
        }
        break;
    }
  }

  collisionBody() {
    return {
      type: 'circle',
      center: this.center,
      radius: 0.01,
    }
  }

  cleanUp() {
    this.canvas.removeEventListener("click", this.clickHandler);
    this.canvas.removeEventListener("mouseMove", this.mouseMoveHandler);
  }

}


/***/ }),

/***/ "./src/entities/sfx/enemyBullet.js":
/*!*****************************************!*\
  !*** ./src/entities/sfx/enemyBullet.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EnemyBulletSFX; });


class EnemyBulletSFX {
  constructor() {
    this.sfxArray = [
      "sfx/EnemyBullet1.wav",
      "sfx/EnemyBullet2.wav",
      "sfx/EnemyBullet3.wav",
      "sfx/EnemyBullet4.wav",
      "sfx/EnemyBullet1.wav",
      "sfx/EnemyBullet2.wav",
      "sfx/EnemyBullet3.wav",
      "sfx/EnemyBullet4.wav",
    ].map(path => {
      const sfx = new Audio(path);
      sfx.volume = 0.32;
      sfx.load();
      return sfx;
    });

    this.current = 0;
  }

  play() {
    if(this.sfxArray[this.current].currentTime == 0 || this.sfxArray[this.current].ended) {
			this.sfxArray[this.current].play();
		}
		this.current++;
    this.current %= this.sfxArray.length;
  }
}


/***/ }),

/***/ "./src/entities/sfx/friendlyBullet.js":
/*!********************************************!*\
  !*** ./src/entities/sfx/friendlyBullet.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FriendlyBulletSFX; });


class FriendlyBulletSFX {
  constructor() {
    this.sfxArray = [
      "sfx/FriendlyBullet1.wav",
      "sfx/FriendlyBullet2.wav",
      "sfx/FriendlyBullet3.wav",
      "sfx/FriendlyBullet4.wav",
      "sfx/FriendlyBullet1.wav",
      "sfx/FriendlyBullet2.wav",
      "sfx/FriendlyBullet3.wav",
      "sfx/FriendlyBullet4.wav",
    ].map(path => {
      const sfx = new Audio(path);
      sfx.volume = 0.32;
      sfx.load();
      return sfx;
    });

    this.current = 0;
  }

  play() {
    if(this.sfxArray[this.current].currentTime == 0 || this.sfxArray[this.current].ended) {
			this.sfxArray[this.current].play();
		}
		this.current++;
    this.current %= this.sfxArray.length;
  }
}


/***/ }),

/***/ "./src/entities/sfx/levelUp.js":
/*!*************************************!*\
  !*** ./src/entities/sfx/levelUp.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LevelUpSFX; });


class LevelUpSFX {
  constructor() {
    this.sfxArray = [
      "sfx/LevelUp.wav",
      "sfx/LevelUp.wav",
      "sfx/LevelUp.wav",
      "sfx/LevelUp.wav",
    ].map(path => {
      const sfx = new Audio(path);
      sfx.volume = 0.32;
      sfx.load();
      return sfx;
    });

    this.current = 0;
  }

  play() {
    if(this.sfxArray[this.current].currentTime == 0 || this.sfxArray[this.current].ended) {
			this.sfxArray[this.current].play();
		}
		this.current++;
    this.current %= this.sfxArray.length;
  }
}


/***/ }),

/***/ "./src/entities/sfx/shipDestroy.js":
/*!*****************************************!*\
  !*** ./src/entities/sfx/shipDestroy.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDestroySFX; });


class ShipDestroySFX {
  constructor() {
    this.sfxArray = [
      "sfx/GameOver1.wav",
      "sfx/GameOver2.wav",
      "sfx/GameOver3.wav",
      "sfx/GameOver4.wav",
      "sfx/GameOver1.wav",
      "sfx/GameOver2.wav",
      "sfx/GameOver3.wav",
      "sfx/GameOver4.wav",
    ].map(path => {
      const sfx = new Audio(path);
      sfx.volume = 0.36;
      sfx.load();
      return sfx;
    });

    this.current = 0;
  }

  play() {
    if(this.sfxArray[this.current].currentTime == 0 || this.sfxArray[this.current].ended) {
			this.sfxArray[this.current].play();
		}
		this.current++;
    this.current %= this.sfxArray.length;
  }
}


/***/ }),

/***/ "./src/entities/soul.js":
/*!******************************!*\
  !*** ./src/entities/soul.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Soul; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");
/* harmony import */ var _vec2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vec2.js */ "./src/vec2.js");



class Soul {

  constructor(manager, player, center) {
    this.manager = manager;
    this.player = player;

    this.name = "Soul";

    this.center = center;
    this.verts = [
      {x: 0.003, y: 0.004},
      {x: 0.003, y: -0.004},
      {x: -0.003, y: 0.004},
      {x: -0.003, y: -0.004},
    ];

    this.rotation = Math.random()*Math.PI*2;
    this.color = 'lightgrey';

    this.spin = Math.random() * 1000 - 500;
    this.magnetized = false;

    // TODO tweak here later
    this.friction = 0.8;
    this.direction = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["rotate"](_vec2_js__WEBPACK_IMPORTED_MODULE_1__["up"](), Math.random()*Math.PI*2);
    this.velocity = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["sMul"](this.direction, 0.016 * Math.random());

    this.maxTTL = 120;
    this.TTL = 120;
  }

  update() {
    this.TTL--;
    if(this.TTL === 0) {
      this.manager.destroy(this);
      return;
    }

    this.velocity = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["sMul"](this.velocity, this.friction);

    const magnetRange = 0.1;
    const diff = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["sub"](this.player.center, this.center);
    const distance = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["mag"](diff);

    if(distance < magnetRange) {
      this.magnetized = true;
    }

    if(this.magnetized) {
      // This is a divisor, so the larger this is the weaker the magntic effect
      const magnetism = 10000;
      const scaled = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["div"](diff, distance**2*magnetism);
      this.velocity = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["add"](this.velocity, scaled);
    }

    this.spin *= this.friction;
    this.center = _vec2_js__WEBPACK_IMPORTED_MODULE_1__["add"](this.center, this.velocity);
    // Spin should hit 0 pretty quickly so it should only spin on its initial movemnet
    // Not while it's being attracted by the magnetic force
    this.rotation += _vec2_js__WEBPACK_IMPORTED_MODULE_1__["mag"](this.velocity) * this.spin;
  }

  draw(canvas, ctx) {
    const scale = this.TTL > 60 ? 1 : (this.TTL/(this.maxTTL-60));
    _util_js__WEBPACK_IMPORTED_MODULE_0__["drawVec"](canvas, ctx, this.center, this.verts, this.rotation, this.color, scale);
  }

  handleCollision(collision) {
    switch(collision.name) {
      case 'Player':
        this.manager.collectSoul(this, collision);
        this.manager.destroy(this);
        break;
      case 'Arena':
        this.manager.destroy(this);
        break;
    }
  }

  collisionBody() {
    return {
      type: 'circle',
      center: this.center,
      radius: 0.02,
    }
  }

}


/***/ }),

/***/ "./src/entities/ui/flashText.js":
/*!**************************************!*\
  !*** ./src/entities/ui/flashText.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FlashText; });

class FlashText {

  constructor(manager, text) {
    this.manager = manager;
    this.text = text;
    this.ttl = 60;
  }

  update() {
    this.ttl--;
    if(this.ttl < 0)
      this.manager.destroy(this);
  }

  postDraw(canvas, ctx) {

    // Avoid drawing same place as game over text
    if(this.manager.isGameOver)
      return;

    ctx.fillStyle = 'black';
    // TODO should shrink based on screen size
    // but this is mostly good so I might just keep it
    ctx.font = '48px LuluMono';
    ctx.textBaseline = 'top';

    ctx.textAlign = 'center';
    ctx.fillText(this.text, canvas.width/2, canvas.height/3);

  }

}



/***/ }),

/***/ "./src/entities/ui/gameOverText.js":
/*!*****************************************!*\
  !*** ./src/entities/ui/gameOverText.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameOverText; });

class GameOverText {

  constructor(manager) {}

  update() {}

  postDraw(canvas, ctx) {
    ctx.fillStyle = 'white';
    // TODO should shrink based on screen size
    // but this is mostly good so I might just keep it
    ctx.font = '48px LuluMono';
    ctx.textBaseline = 'top';

    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2-48);
    ctx.font = '24px LuluMono';
    ctx.fillText('Click to restart', canvas.width/2, canvas.height/2);

  }

}


/***/ }),

/***/ "./src/keyboard.js":
/*!*************************!*\
  !*** ./src/keyboard.js ***!
  \*************************/
/*! exports provided: keys, timestamps, timestampsUp, lastKey, init, stop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timestamps", function() { return timestamps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timestampsUp", function() { return timestampsUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lastKey", function() { return lastKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stop", function() { return stop; });

let keys = [];
let timestamps = [];
let timestampsUp = [];
let lastKey = {};

function init() {
  document.addEventListener("keydown", keydown);
  document.addEventListener("keyup", keyup);
}

function stop() {
  document.removeEventListener("keydown", keydown);
  document.removeEventListener("keyup", keyup);
}

function keydown(e) {
  const key = e.keyCode;

  if(keys[key]) return;

  keys[key] = true;
  timestamps[key] = Date.now();
  lastKey = {e, key};
}

function keyup(e) {
  const key = e.keyCode;

  if(!keys[key]) return;

  keys[key] = false;
  timestampsUp[key] = Date.now();
}


/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: drawVec */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawVec", function() { return drawVec; });
/* harmony import */ var _vec2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vec2.js */ "./src/vec2.js");


function drawVec(canvas, ctx, center, verts, rotation, color, scale=1) {
  const normalize = (vert) => {
    const rotated = _vec2_js__WEBPACK_IMPORTED_MODULE_0__["sMul"](_vec2_js__WEBPACK_IMPORTED_MODULE_0__["rotate"](vert, rotation), scale);
    return {x: canvas.width*(center.x+rotated.x), y: canvas.width*(center.y+rotated.y)}
  };

  const ayy = verts.map(normalize);

  ctx.fillStyle = color;

  ctx.beginPath()
  ctx.moveTo(ayy[0].x, ayy[0].y);
  ayy.slice(1).forEach(v => ctx.lineTo(v.x, v.y));
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
}


/***/ }),

/***/ "./src/vec2.js":
/*!*********************!*\
  !*** ./src/vec2.js ***!
  \*********************/
/*! exports provided: up, rotate, getRotation, add, subtract, sub, normalize, norm, divide, div, magnitude, mag, sMul, equals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "up", function() { return up; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
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
// Just adding functions as I go

function up() {
  return {x: 0, y: 1};
}

function rotate(vec, theta) {
  return {
    x: vec.x*Math.cos(theta) - vec.y*Math.sin(theta), 
    y: vec.x*Math.sin(theta) + vec.y*Math.cos(theta)
  }
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