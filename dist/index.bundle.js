"use strict";
(self["webpackChunkjavascript_to_do_list_redefine"] = self["webpackChunkjavascript_to_do_list_redefine"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.js */ "./src/todo.js");
/* harmony import */ var _status_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./status.js */ "./src/status.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _images_select_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../images/select.png */ "./images/select.png");
/* harmony import */ var _images_delete_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../images/delete.png */ "./images/delete.png");
/* harmony import */ var _images_refresh_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../images/refresh.png */ "./images/refresh.png");
/* harmony import */ var _images_edit_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../images/edit.jpg */ "./images/edit.jpg");







const container = document.querySelector('#container');
const form = document.querySelector('.form');
const ul = document.querySelector('.todolist');
form.innerHTML = `
<label for="title" class="title">
Today's To Do <img src=${_images_refresh_png__WEBPACK_IMPORTED_MODULE_5__} class="refresh" alt="refresh">
</label>
<input type="text" class="inputText" id="title" placeholder="Add to your list...">
`;
const btnDeleteAll = document.createElement('button');
btnDeleteAll.setAttribute('class', 'delete-all');
btnDeleteAll.textContent = 'Clear all completed';
container.appendChild(btnDeleteAll);
const display = () => {
  _todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems.sort((a, b) => a.index - b.index); // sort the array by index
  ul.innerHTML = ''; // clear the list before re-rendering

  // Re-render the todo list
  for (let i = 0; i < _todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems.length; i += 1) {
    const node = document.createElement('li');
    node.setAttribute('class', 'todo-item editable');
    node.setAttribute('data-key', _todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems[i].index);
    node.innerHTML = `
    <input type="checkbox" class="checkbox" id="${_todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems[i].index}">
    <label for="${_todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems[i].index}" class="option">
    <img class="select" src=${_images_select_png__WEBPACK_IMPORTED_MODULE_3__} alt=""/>
            <img class="delete" src=${_images_delete_png__WEBPACK_IMPORTED_MODULE_4__} alt=""/>
            <img class="edit" src=${_images_edit_jpg__WEBPACK_IMPORTED_MODULE_6__} alt="edittext"/>
    </label>
    <input class="items" type="text" value="${_todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems[i].text}" readonly /> 
    `;
    ul.appendChild(node);

    // Get the selectdots, deleteoption, and editoption elements for this task
    const selectdots = node.querySelector('.select');
    const deleteoption = node.querySelector('.delete');
    const refresh = document.querySelector('.refresh');
    const editoption = node.querySelector('.edit');
    // Get the checkbox element for this task
    const checkbox = node.querySelector('.checkbox');

    // Add an event listener for the selectdots
    selectdots.addEventListener('click', () => {
      selectdots.style.display = 'none';
      deleteoption.style.display = 'block';
      editoption.style.display = 'block';
    });

    // Add refersh button logic
    refresh.addEventListener('click', () => {
      window.location.reload();
    });

    // Add a change event listener for the checkbox
    checkbox.addEventListener('change', () => {
      const itemKey = parseInt(node.getAttribute('data-key'), 10);
      const itemIndex = _todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems.findIndex(item => item.index === itemKey);
      const completed = !!checkbox.checked;
      (0,_status_js__WEBPACK_IMPORTED_MODULE_1__["default"])(itemIndex, completed);

      // If the task is completed, add a strikethrough to the text
      if (completed) {
        node.querySelector('.items').style.textDecoration = 'line-through';
      } else {
        node.querySelector('.items').style.textDecoration = 'none';
      }
    });
    // Add an event listener for the clear all completed button
    const clearAllCompleted = () => {
      const uncompletedTasks = _todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems.filter(item => !item.completed);
      _todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems.length = 0;
      _todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems.push(...uncompletedTasks);
      for (let i = 0; i < uncompletedTasks.length; i += 1) {
        uncompletedTasks[i].index = i + 1;
      }
      localStorage.setItem('todoItems', JSON.stringify(_todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems));
      display();
    };
    btnDeleteAll.addEventListener('click', clearAllCompleted);

    // Add an event listener for the deleteoption
    deleteoption.addEventListener('click', () => {
      const itemKey = parseInt(node.getAttribute('data-key'), 10);
      const itemIndex = _todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems.findIndex(item => item.index === itemKey);

      // Delete the item from the todoItems array
      _todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems.splice(itemIndex, 1);

      // Re-Index the remaining items
      for (let j = itemIndex; j < _todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems.length; j += 1) {
        _todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems[j].index -= 1;
      }
      localStorage.setItem('todoItems', JSON.stringify(_todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems));
      display();
    });

    // Add an event listener for the editoption
    editoption.addEventListener('click', () => {
      const itemKey = parseInt(node.getAttribute('data-key'), 10);
      const itemIndex = _todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems.findIndex(item => item.index === itemKey);

      // Toggle the readonly attribute
      const items = node.querySelector('.items');
      items.readOnly = !items.readOnly;

      // Toggle the editable class on the li element
      node.classList.toggle('editable');
      if (!items.readOnly) {
        items.focus();
      }

      // If the user clicks enter editing the item, update the todoItems array
      items.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          const newTaskText = items.value.trim();
          _todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems[itemIndex].text = newTaskText;
          localStorage.setItem('todoItems', JSON.stringify(_todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems));
          display();
        }
      });
      // Add an event listener to the input element to toggle the editable class
      items.addEventListener('blur', () => {
        node.classList.toggle('editable');
      });
    });
  }
};
form.addEventListener('submit', e => {
  e.preventDefault();
  const inputText = document.querySelector('.inputText');
  const text = inputText.value.trim();
  if (text !== '') {
    (0,_todo_js__WEBPACK_IMPORTED_MODULE_0__.addTask)(text);
    inputText.value = '';
    display();
  }
});
window.onload = display();

/***/ }),

/***/ "./src/status.js":
/*!***********************!*\
  !*** ./src/status.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.js */ "./src/todo.js");

const updateCompletedStatus = (index, completed) => {
  // const task = todoItems.find((item) => item.index === index+1);
  const task = _todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems.find(item => item.index === index + 1);
  task.completed = completed;
  // task.completed = completed;
  localStorage.setItem('todoItems', JSON.stringify(_todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateCompletedStatus);

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addTask: () => (/* binding */ addTask),
/* harmony export */   todoItems: () => (/* binding */ todoItems)
/* harmony export */ });
const todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
const addTask = text => {
  const newTask = {
    text,
    completed: false,
    index: todoItems.length + 1
  };
  todoItems.push(newTask);
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/index.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/index.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../images/todo.jfif */ "./images/todo.jfif"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  background-size: cover;
  background-repeat: no-repeat;
}

h1 {
  position: relative;
  left: 40%;
  color: white;
}

#container {
  left: 30%;
  position: relative;
  top: 50px;
  width: 30%;
  border: 1px solid wheat;
  padding: 20px 20px 0 20px;
  background-color: bisque;
  box-shadow: 2px 2px 2px 2px #888;
  z-index: 10;
}

.title {
  display: block;
  font-size: 24px;
}

.refresh {
  float: right;
  position: relative;
  top: 3px;
}

.inputText {
  margin-top: 15px;
  width: 108%;
  height: 40px;
  position: relative;
  left: -15px;
  font-size: 18px;
  border: 1px solid wheat;
  border-left: none;
  border-right: none;
}

::placeholder {
  font-style: italic;
  position: relative;
  left: 15px;
}

.todo-item {
  text-decoration: none;
  min-height: 27px;
  width: 105%;
  border-bottom: 1px solid wheat;
  list-style-type: none;
  font-size: 20px;
  padding: 13px 10px;
  left: -20px;
  position: relative;
}

.refresh:hover {
  cursor: pointer;
}

.items {
  margin-left: 15px;
  border: none;
  font-size: 16px;
  padding: 15px 10px;
  height: 28px;
  width: 300px;
}

.option {
  float: right;
}

.delete {
  display: none;
  width: 15px;
  height: 15px;
}

.delete:hover {
  cursor: pointer;
}

.edit {
  display: none;
  width: 15px;
  height: 15px;
}

.edit:hover {
  cursor: pointer;
}

.select {
  display: block;
  position: relative;
  top: 5px;
}

.select:hover {
  cursor: pointer;
}

.delete-all {
  height: 50px;
  width: 109%;
  position: relative;
  top: 0;
  left: -15px;
  border-style: none;
}

.delete-all:hover {
  background-color: #f00;
  color: white;
  cursor: pointer;
}
`, "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"AAAA;EACE,sBAAsB;AACxB;;AAEA;EACE,SAAS;EACT,yDAA4C;EAC5C,sBAAsB;EACtB,4BAA4B;AAC9B;;AAEA;EACE,kBAAkB;EAClB,SAAS;EACT,YAAY;AACd;;AAEA;EACE,SAAS;EACT,kBAAkB;EAClB,SAAS;EACT,UAAU;EACV,uBAAuB;EACvB,yBAAyB;EACzB,wBAAwB;EACxB,gCAAgC;EAChC,WAAW;AACb;;AAEA;EACE,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,QAAQ;AACV;;AAEA;EACE,gBAAgB;EAChB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,WAAW;EACX,eAAe;EACf,uBAAuB;EACvB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,qBAAqB;EACrB,gBAAgB;EAChB,WAAW;EACX,8BAA8B;EAC9B,qBAAqB;EACrB,eAAe;EACf,kBAAkB;EAClB,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,iBAAiB;EACjB,YAAY;EACZ,eAAe;EACf,kBAAkB;EAClB,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;EACb,WAAW;EACX,YAAY;AACd;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,YAAY;AACd;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,QAAQ;AACV;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,MAAM;EACN,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,sBAAsB;EACtB,YAAY;EACZ,eAAe;AACjB","sourcesContent":["* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  margin: 0;\r\n  background-image: url('../images/todo.jfif');\r\n  background-size: cover;\r\n  background-repeat: no-repeat;\r\n}\r\n\r\nh1 {\r\n  position: relative;\r\n  left: 40%;\r\n  color: white;\r\n}\r\n\r\n#container {\r\n  left: 30%;\r\n  position: relative;\r\n  top: 50px;\r\n  width: 30%;\r\n  border: 1px solid wheat;\r\n  padding: 20px 20px 0 20px;\r\n  background-color: bisque;\r\n  box-shadow: 2px 2px 2px 2px #888;\r\n  z-index: 10;\r\n}\r\n\r\n.title {\r\n  display: block;\r\n  font-size: 24px;\r\n}\r\n\r\n.refresh {\r\n  float: right;\r\n  position: relative;\r\n  top: 3px;\r\n}\r\n\r\n.inputText {\r\n  margin-top: 15px;\r\n  width: 108%;\r\n  height: 40px;\r\n  position: relative;\r\n  left: -15px;\r\n  font-size: 18px;\r\n  border: 1px solid wheat;\r\n  border-left: none;\r\n  border-right: none;\r\n}\r\n\r\n::placeholder {\r\n  font-style: italic;\r\n  position: relative;\r\n  left: 15px;\r\n}\r\n\r\n.todo-item {\r\n  text-decoration: none;\r\n  min-height: 27px;\r\n  width: 105%;\r\n  border-bottom: 1px solid wheat;\r\n  list-style-type: none;\r\n  font-size: 20px;\r\n  padding: 13px 10px;\r\n  left: -20px;\r\n  position: relative;\r\n}\r\n\r\n.refresh:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n.items {\r\n  margin-left: 15px;\r\n  border: none;\r\n  font-size: 16px;\r\n  padding: 15px 10px;\r\n  height: 28px;\r\n  width: 300px;\r\n}\r\n\r\n.option {\r\n  float: right;\r\n}\r\n\r\n.delete {\r\n  display: none;\r\n  width: 15px;\r\n  height: 15px;\r\n}\r\n\r\n.delete:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n.edit {\r\n  display: none;\r\n  width: 15px;\r\n  height: 15px;\r\n}\r\n\r\n.edit:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n.select {\r\n  display: block;\r\n  position: relative;\r\n  top: 5px;\r\n}\r\n\r\n.select:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n.delete-all {\r\n  height: 50px;\r\n  width: 109%;\r\n  position: relative;\r\n  top: 0;\r\n  left: -15px;\r\n  border-style: none;\r\n}\r\n\r\n.delete-all:hover {\r\n  background-color: #f00;\r\n  color: white;\r\n  cursor: pointer;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./images/delete.png":
/*!***************************!*\
  !*** ./images/delete.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "delete.png";

/***/ }),

/***/ "./images/edit.jpg":
/*!*************************!*\
  !*** ./images/edit.jpg ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "edit.jpg";

/***/ }),

/***/ "./images/refresh.png":
/*!****************************!*\
  !*** ./images/refresh.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "refresh.png";

/***/ }),

/***/ "./images/select.png":
/*!***************************!*\
  !*** ./images/select.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "select.png";

/***/ }),

/***/ "./images/todo.jfif":
/*!**************************!*\
  !*** ./images/todo.jfif ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "todo.jfif";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qYXZhc2NyaXB0LXRvLWRvLWxpc3QtcmVkZWZpbmUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC10by1kby1saXN0LXJlZGVmaW5lLy4vc3JjL3N0YXR1cy5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LXRvLWRvLWxpc3QtcmVkZWZpbmUvLi9zcmMvdG9kby5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LXRvLWRvLWxpc3QtcmVkZWZpbmUvLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovL2phdmFzY3JpcHQtdG8tZG8tbGlzdC1yZWRlZmluZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC10by1kby1saXN0LXJlZGVmaW5lLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LXRvLWRvLWxpc3QtcmVkZWZpbmUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LXRvLWRvLWxpc3QtcmVkZWZpbmUvLi9zcmMvaW5kZXguY3NzP2NmZTQiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC10by1kby1saXN0LXJlZGVmaW5lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtdG8tZG8tbGlzdC1yZWRlZmluZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC10by1kby1saXN0LXJlZGVmaW5lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtdG8tZG8tbGlzdC1yZWRlZmluZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LXRvLWRvLWxpc3QtcmVkZWZpbmUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LXRvLWRvLWxpc3QtcmVkZWZpbmUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhZGRUYXNrLCB0b2RvSXRlbXMgfSBmcm9tICcuL3RvZG8uanMnO1xuaW1wb3J0IHVwZGF0ZUNvbXBsZXRlZFN0YXR1cyBmcm9tICcuL3N0YXR1cy5qcyc7XG5pbXBvcnQgJy4vaW5kZXguY3NzJztcbmltcG9ydCBzZWxlY3QyIGZyb20gJy4uL2ltYWdlcy9zZWxlY3QucG5nJztcbmltcG9ydCBkZWxldGUyIGZyb20gJy4uL2ltYWdlcy9kZWxldGUucG5nJztcbmltcG9ydCByZWZyZXNoIGZyb20gJy4uL2ltYWdlcy9yZWZyZXNoLnBuZyc7XG5pbXBvcnQgZWRpdCBmcm9tICcuLi9pbWFnZXMvZWRpdC5qcGcnO1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGFpbmVyJyk7XG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0nKTtcbmNvbnN0IHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9saXN0Jyk7XG5cbmZvcm0uaW5uZXJIVE1MID0gYFxuPGxhYmVsIGZvcj1cInRpdGxlXCIgY2xhc3M9XCJ0aXRsZVwiPlxuVG9kYXkncyBUbyBEbyA8aW1nIHNyYz0ke3JlZnJlc2h9IGNsYXNzPVwicmVmcmVzaFwiIGFsdD1cInJlZnJlc2hcIj5cbjwvbGFiZWw+XG48aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImlucHV0VGV4dFwiIGlkPVwidGl0bGVcIiBwbGFjZWhvbGRlcj1cIkFkZCB0byB5b3VyIGxpc3QuLi5cIj5cbmA7XG5cbmNvbnN0IGJ0bkRlbGV0ZUFsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuYnRuRGVsZXRlQWxsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZGVsZXRlLWFsbCcpO1xuYnRuRGVsZXRlQWxsLnRleHRDb250ZW50ID0gJ0NsZWFyIGFsbCBjb21wbGV0ZWQnO1xuY29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bkRlbGV0ZUFsbCk7XG5cbmNvbnN0IGRpc3BsYXkgPSAoKSA9PiB7XG4gIHRvZG9JdGVtcy5zb3J0KChhLCBiKSA9PiBhLmluZGV4IC0gYi5pbmRleCk7IC8vIHNvcnQgdGhlIGFycmF5IGJ5IGluZGV4XG4gIHVsLmlubmVySFRNTCA9ICcnOyAvLyBjbGVhciB0aGUgbGlzdCBiZWZvcmUgcmUtcmVuZGVyaW5nXG5cbiAgLy8gUmUtcmVuZGVyIHRoZSB0b2RvIGxpc3RcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2RvSXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndG9kby1pdGVtIGVkaXRhYmxlJyk7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JywgdG9kb0l0ZW1zW2ldLmluZGV4KTtcbiAgICBub2RlLmlubmVySFRNTCA9IGBcbiAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJjaGVja2JveFwiIGlkPVwiJHt0b2RvSXRlbXNbaV0uaW5kZXh9XCI+XG4gICAgPGxhYmVsIGZvcj1cIiR7dG9kb0l0ZW1zW2ldLmluZGV4fVwiIGNsYXNzPVwib3B0aW9uXCI+XG4gICAgPGltZyBjbGFzcz1cInNlbGVjdFwiIHNyYz0ke3NlbGVjdDJ9IGFsdD1cIlwiLz5cbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJkZWxldGVcIiBzcmM9JHtkZWxldGUyfSBhbHQ9XCJcIi8+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwiZWRpdFwiIHNyYz0ke2VkaXR9IGFsdD1cImVkaXR0ZXh0XCIvPlxuICAgIDwvbGFiZWw+XG4gICAgPGlucHV0IGNsYXNzPVwiaXRlbXNcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJHt0b2RvSXRlbXNbaV0udGV4dH1cIiByZWFkb25seSAvPiBcbiAgICBgO1xuICAgIHVsLmFwcGVuZENoaWxkKG5vZGUpO1xuXG4gICAgLy8gR2V0IHRoZSBzZWxlY3Rkb3RzLCBkZWxldGVvcHRpb24sIGFuZCBlZGl0b3B0aW9uIGVsZW1lbnRzIGZvciB0aGlzIHRhc2tcbiAgICBjb25zdCBzZWxlY3Rkb3RzID0gbm9kZS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0Jyk7XG4gICAgY29uc3QgZGVsZXRlb3B0aW9uID0gbm9kZS5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlJyk7XG4gICAgY29uc3QgcmVmcmVzaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZWZyZXNoJyk7XG4gICAgY29uc3QgZWRpdG9wdGlvbiA9IG5vZGUucXVlcnlTZWxlY3RvcignLmVkaXQnKTtcbiAgICAvLyBHZXQgdGhlIGNoZWNrYm94IGVsZW1lbnQgZm9yIHRoaXMgdGFza1xuICAgIGNvbnN0IGNoZWNrYm94ID0gbm9kZS5xdWVyeVNlbGVjdG9yKCcuY2hlY2tib3gnKTtcblxuICAgIC8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHNlbGVjdGRvdHNcbiAgICBzZWxlY3Rkb3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgc2VsZWN0ZG90cy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgZGVsZXRlb3B0aW9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgZWRpdG9wdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9KTtcblxuICAgIC8vIEFkZCByZWZlcnNoIGJ1dHRvbiBsb2dpY1xuICAgIHJlZnJlc2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgYSBjaGFuZ2UgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBjaGVja2JveFxuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1LZXkgPSBwYXJzZUludChub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSwgMTApO1xuICAgICAgY29uc3QgaXRlbUluZGV4ID0gdG9kb0l0ZW1zLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pbmRleCA9PT0gaXRlbUtleSk7XG4gICAgICBjb25zdCBjb21wbGV0ZWQgPSAhIWNoZWNrYm94LmNoZWNrZWQ7XG4gICAgICB1cGRhdGVDb21wbGV0ZWRTdGF0dXMoaXRlbUluZGV4LCBjb21wbGV0ZWQpO1xuXG4gICAgICAvLyBJZiB0aGUgdGFzayBpcyBjb21wbGV0ZWQsIGFkZCBhIHN0cmlrZXRocm91Z2ggdG8gdGhlIHRleHRcbiAgICAgIGlmIChjb21wbGV0ZWQpIHtcbiAgICAgICAgbm9kZS5xdWVyeVNlbGVjdG9yKCcuaXRlbXMnKS5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9ICdsaW5lLXRocm91Z2gnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZS5xdWVyeVNlbGVjdG9yKCcuaXRlbXMnKS5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9ICdub25lJztcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBjbGVhciBhbGwgY29tcGxldGVkIGJ1dHRvblxuICAgIGNvbnN0IGNsZWFyQWxsQ29tcGxldGVkID0gKCkgPT4ge1xuICAgICAgY29uc3QgdW5jb21wbGV0ZWRUYXNrcyA9IHRvZG9JdGVtcy5maWx0ZXIoKGl0ZW0pID0+ICFpdGVtLmNvbXBsZXRlZCk7XG4gICAgICB0b2RvSXRlbXMubGVuZ3RoID0gMDtcbiAgICAgIHRvZG9JdGVtcy5wdXNoKC4uLnVuY29tcGxldGVkVGFza3MpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1bmNvbXBsZXRlZFRhc2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHVuY29tcGxldGVkVGFza3NbaV0uaW5kZXggPSBpICsgMTtcbiAgICAgIH1cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvSXRlbXMnLCBKU09OLnN0cmluZ2lmeSh0b2RvSXRlbXMpKTtcbiAgICAgIGRpc3BsYXkoKTtcbiAgICB9O1xuXG4gICAgYnRuRGVsZXRlQWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYXJBbGxDb21wbGV0ZWQpO1xuXG4gICAgLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgZGVsZXRlb3B0aW9uXG4gICAgZGVsZXRlb3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgaXRlbUtleSA9IHBhcnNlSW50KG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpLCAxMCk7XG4gICAgICBjb25zdCBpdGVtSW5kZXggPSB0b2RvSXRlbXMuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmluZGV4ID09PSBpdGVtS2V5KTtcblxuICAgICAgLy8gRGVsZXRlIHRoZSBpdGVtIGZyb20gdGhlIHRvZG9JdGVtcyBhcnJheVxuICAgICAgdG9kb0l0ZW1zLnNwbGljZShpdGVtSW5kZXgsIDEpO1xuXG4gICAgICAvLyBSZS1JbmRleCB0aGUgcmVtYWluaW5nIGl0ZW1zXG4gICAgICBmb3IgKGxldCBqID0gaXRlbUluZGV4OyBqIDwgdG9kb0l0ZW1zLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIHRvZG9JdGVtc1tqXS5pbmRleCAtPSAxO1xuICAgICAgfVxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9JdGVtcycsIEpTT04uc3RyaW5naWZ5KHRvZG9JdGVtcykpO1xuICAgICAgZGlzcGxheSgpO1xuICAgIH0pO1xuXG4gICAgLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgZWRpdG9wdGlvblxuICAgIGVkaXRvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBpdGVtS2V5ID0gcGFyc2VJbnQobm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JyksIDEwKTtcbiAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRvZG9JdGVtcy5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaW5kZXggPT09IGl0ZW1LZXkpO1xuXG4gICAgICAvLyBUb2dnbGUgdGhlIHJlYWRvbmx5IGF0dHJpYnV0ZVxuICAgICAgY29uc3QgaXRlbXMgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJy5pdGVtcycpO1xuICAgICAgaXRlbXMucmVhZE9ubHkgPSAhaXRlbXMucmVhZE9ubHk7XG5cbiAgICAgIC8vIFRvZ2dsZSB0aGUgZWRpdGFibGUgY2xhc3Mgb24gdGhlIGxpIGVsZW1lbnRcbiAgICAgIG5vZGUuY2xhc3NMaXN0LnRvZ2dsZSgnZWRpdGFibGUnKTtcblxuICAgICAgaWYgKCFpdGVtcy5yZWFkT25seSkge1xuICAgICAgICBpdGVtcy5mb2N1cygpO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgdXNlciBjbGlja3MgZW50ZXIgZWRpdGluZyB0aGUgaXRlbSwgdXBkYXRlIHRoZSB0b2RvSXRlbXMgYXJyYXlcbiAgICAgIGl0ZW1zLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrVGV4dCA9IGl0ZW1zLnZhbHVlLnRyaW0oKTtcbiAgICAgICAgICB0b2RvSXRlbXNbaXRlbUluZGV4XS50ZXh0ID0gbmV3VGFza1RleHQ7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9JdGVtcycsIEpTT04uc3RyaW5naWZ5KHRvZG9JdGVtcykpO1xuICAgICAgICAgIGRpc3BsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGlucHV0IGVsZW1lbnQgdG8gdG9nZ2xlIHRoZSBlZGl0YWJsZSBjbGFzc1xuICAgICAgaXRlbXMuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHtcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdlZGl0YWJsZScpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBpbnB1dFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXRUZXh0Jyk7XG4gIGNvbnN0IHRleHQgPSBpbnB1dFRleHQudmFsdWUudHJpbSgpO1xuICBpZiAodGV4dCAhPT0gJycpIHtcbiAgICBhZGRUYXNrKHRleHQpO1xuICAgIGlucHV0VGV4dC52YWx1ZSA9ICcnO1xuICAgIGRpc3BsYXkoKTtcbiAgfVxufSk7XG5cbndpbmRvdy5vbmxvYWQgPSBkaXNwbGF5KCk7XG4iLCJpbXBvcnQgeyB0b2RvSXRlbXMgfSBmcm9tICcuL3RvZG8uanMnO1xuXG5jb25zdCB1cGRhdGVDb21wbGV0ZWRTdGF0dXMgPSAoaW5kZXgsIGNvbXBsZXRlZCkgPT4ge1xuLy8gY29uc3QgdGFzayA9IHRvZG9JdGVtcy5maW5kKChpdGVtKSA9PiBpdGVtLmluZGV4ID09PSBpbmRleCsxKTtcbiAgY29uc3QgdGFzayA9IHRvZG9JdGVtcy5maW5kKChpdGVtKSA9PiBpdGVtLmluZGV4ID09PSBpbmRleCArIDEpO1xuICB0YXNrLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcbiAgLy8gdGFzay5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvSXRlbXMnLCBKU09OLnN0cmluZ2lmeSh0b2RvSXRlbXMpKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZUNvbXBsZXRlZFN0YXR1czsiLCJjb25zdCB0b2RvSXRlbXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvSXRlbXMnKSkgfHwgW107XG5cbmNvbnN0IGFkZFRhc2sgPSAodGV4dCkgPT4ge1xuICBjb25zdCBuZXdUYXNrID0ge1xuICAgIHRleHQsXG4gICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICBpbmRleDogdG9kb0l0ZW1zLmxlbmd0aCArIDEsXG4gIH07XG5cbiAgdG9kb0l0ZW1zLnB1c2gobmV3VGFzayk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvSXRlbXMnLCBKU09OLnN0cmluZ2lmeSh0b2RvSXRlbXMpKTtcbn07XG5cbmV4cG9ydCB7IGFkZFRhc2ssIHRvZG9JdGVtcyB9OyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuLi9pbWFnZXMvdG9kby5qZmlmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG5ib2R5IHtcclxuICBtYXJnaW46IDA7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxufVxyXG5cclxuaDEge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBsZWZ0OiA0MCU7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4jY29udGFpbmVyIHtcclxuICBsZWZ0OiAzMCU7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHRvcDogNTBweDtcclxuICB3aWR0aDogMzAlO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoZWF0O1xyXG4gIHBhZGRpbmc6IDIwcHggMjBweCAwIDIwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlO1xyXG4gIGJveC1zaGFkb3c6IDJweCAycHggMnB4IDJweCAjODg4O1xyXG4gIHotaW5kZXg6IDEwO1xyXG59XHJcblxyXG4udGl0bGUge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxufVxyXG5cclxuLnJlZnJlc2gge1xyXG4gIGZsb2F0OiByaWdodDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgdG9wOiAzcHg7XHJcbn1cclxuXHJcbi5pbnB1dFRleHQge1xyXG4gIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgd2lkdGg6IDEwOCU7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBsZWZ0OiAtMTVweDtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgd2hlYXQ7XHJcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7XHJcbiAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG59XHJcblxyXG46OnBsYWNlaG9sZGVyIHtcclxuICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGxlZnQ6IDE1cHg7XHJcbn1cclxuXHJcbi50b2RvLWl0ZW0ge1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBtaW4taGVpZ2h0OiAyN3B4O1xyXG4gIHdpZHRoOiAxMDUlO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB3aGVhdDtcclxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIHBhZGRpbmc6IDEzcHggMTBweDtcclxuICBsZWZ0OiAtMjBweDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi5yZWZyZXNoOmhvdmVyIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5pdGVtcyB7XHJcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBwYWRkaW5nOiAxNXB4IDEwcHg7XHJcbiAgaGVpZ2h0OiAyOHB4O1xyXG4gIHdpZHRoOiAzMDBweDtcclxufVxyXG5cclxuLm9wdGlvbiB7XHJcbiAgZmxvYXQ6IHJpZ2h0O1xyXG59XHJcblxyXG4uZGVsZXRlIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIHdpZHRoOiAxNXB4O1xyXG4gIGhlaWdodDogMTVweDtcclxufVxyXG5cclxuLmRlbGV0ZTpob3ZlciB7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uZWRpdCB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxuICB3aWR0aDogMTVweDtcclxuICBoZWlnaHQ6IDE1cHg7XHJcbn1cclxuXHJcbi5lZGl0OmhvdmVyIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5zZWxlY3Qge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB0b3A6IDVweDtcclxufVxyXG5cclxuLnNlbGVjdDpob3ZlciB7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uZGVsZXRlLWFsbCB7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIHdpZHRoOiAxMDklO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogLTE1cHg7XHJcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xyXG59XHJcblxyXG4uZGVsZXRlLWFsbDpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwMDtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2luZGV4LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFNBQVM7RUFDVCx5REFBNEM7RUFDNUMsc0JBQXNCO0VBQ3RCLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsWUFBWTtBQUNkOztBQUVBO0VBQ0UsU0FBUztFQUNULGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsVUFBVTtFQUNWLHVCQUF1QjtFQUN2Qix5QkFBeUI7RUFDekIsd0JBQXdCO0VBQ3hCLGdDQUFnQztFQUNoQyxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsUUFBUTtBQUNWOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLDhCQUE4QjtFQUM5QixxQkFBcUI7RUFDckIsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixZQUFZO0VBQ1osZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLFdBQVc7RUFDWCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGVBQWU7QUFDakJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnLi4vaW1hZ2VzL3RvZG8uamZpZicpO1xcclxcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXHJcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxyXFxufVxcclxcblxcclxcbmgxIHtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIGxlZnQ6IDQwJTtcXHJcXG4gIGNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuI2NvbnRhaW5lciB7XFxyXFxuICBsZWZ0OiAzMCU7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB0b3A6IDUwcHg7XFxyXFxuICB3aWR0aDogMzAlO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgd2hlYXQ7XFxyXFxuICBwYWRkaW5nOiAyMHB4IDIwcHggMCAyMHB4O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlO1xcclxcbiAgYm94LXNoYWRvdzogMnB4IDJweCAycHggMnB4ICM4ODg7XFxyXFxuICB6LWluZGV4OiAxMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRpdGxlIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgZm9udC1zaXplOiAyNHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucmVmcmVzaCB7XFxyXFxuICBmbG9hdDogcmlnaHQ7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB0b3A6IDNweDtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0VGV4dCB7XFxyXFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgd2lkdGg6IDEwOCU7XFxyXFxuICBoZWlnaHQ6IDQwcHg7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBsZWZ0OiAtMTVweDtcXHJcXG4gIGZvbnQtc2l6ZTogMThweDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoZWF0O1xcclxcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxyXFxuICBib3JkZXItcmlnaHQ6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbjo6cGxhY2Vob2xkZXIge1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgbGVmdDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8taXRlbSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICBtaW4taGVpZ2h0OiAyN3B4O1xcclxcbiAgd2lkdGg6IDEwNSU7XFxyXFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgd2hlYXQ7XFxyXFxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxyXFxuICBmb250LXNpemU6IDIwcHg7XFxyXFxuICBwYWRkaW5nOiAxM3B4IDEwcHg7XFxyXFxuICBsZWZ0OiAtMjBweDtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG59XFxyXFxuXFxyXFxuLnJlZnJlc2g6aG92ZXIge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uaXRlbXMge1xcclxcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxuICBwYWRkaW5nOiAxNXB4IDEwcHg7XFxyXFxuICBoZWlnaHQ6IDI4cHg7XFxyXFxuICB3aWR0aDogMzAwcHg7XFxyXFxufVxcclxcblxcclxcbi5vcHRpb24ge1xcclxcbiAgZmxvYXQ6IHJpZ2h0O1xcclxcbn1cXHJcXG5cXHJcXG4uZGVsZXRlIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICB3aWR0aDogMTVweDtcXHJcXG4gIGhlaWdodDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmRlbGV0ZTpob3ZlciB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5lZGl0IHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICB3aWR0aDogMTVweDtcXHJcXG4gIGhlaWdodDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmVkaXQ6aG92ZXIge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2VsZWN0IHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgdG9wOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5zZWxlY3Q6aG92ZXIge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZGVsZXRlLWFsbCB7XFxyXFxuICBoZWlnaHQ6IDUwcHg7XFxyXFxuICB3aWR0aDogMTA5JTtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGxlZnQ6IC0xNXB4O1xcclxcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uZGVsZXRlLWFsbDpob3ZlciB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjAwO1xcclxcbiAgY29sb3I6IHdoaXRlO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJhZGRUYXNrIiwidG9kb0l0ZW1zIiwidXBkYXRlQ29tcGxldGVkU3RhdHVzIiwic2VsZWN0MiIsImRlbGV0ZTIiLCJyZWZyZXNoIiwiZWRpdCIsImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImZvcm0iLCJ1bCIsImlubmVySFRNTCIsImJ0bkRlbGV0ZUFsbCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsImFwcGVuZENoaWxkIiwiZGlzcGxheSIsInNvcnQiLCJhIiwiYiIsImluZGV4IiwiaSIsImxlbmd0aCIsIm5vZGUiLCJ0ZXh0Iiwic2VsZWN0ZG90cyIsImRlbGV0ZW9wdGlvbiIsImVkaXRvcHRpb24iLCJjaGVja2JveCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdHlsZSIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiaXRlbUtleSIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwiaXRlbUluZGV4IiwiZmluZEluZGV4IiwiaXRlbSIsImNvbXBsZXRlZCIsImNoZWNrZWQiLCJ0ZXh0RGVjb3JhdGlvbiIsImNsZWFyQWxsQ29tcGxldGVkIiwidW5jb21wbGV0ZWRUYXNrcyIsImZpbHRlciIsInB1c2giLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsInNwbGljZSIsImoiLCJpdGVtcyIsInJlYWRPbmx5IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiZm9jdXMiLCJlIiwia2V5IiwibmV3VGFza1RleHQiLCJ2YWx1ZSIsInRyaW0iLCJwcmV2ZW50RGVmYXVsdCIsImlucHV0VGV4dCIsIm9ubG9hZCIsInRhc2siLCJmaW5kIiwicGFyc2UiLCJnZXRJdGVtIiwibmV3VGFzayJdLCJzb3VyY2VSb290IjoiIn0=