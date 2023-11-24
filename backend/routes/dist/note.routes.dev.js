"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _noteController = require("../controller/note.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var noteRouter = (0, _express["default"])();
noteRouter.post("/create", _noteController.noteController.createNote);
/*
    запрос:
        name: String (ползователь)
    тело:
 */

noteRouter.get("/completed", _noteController.noteController.getAllCompleted);
noteRouter.get("/completed/sortered", _noteController.noteController.getSortСompleted);
/*
    запрос:
        name: String (ползователь)
    тело:
 */

noteRouter.get("/active", _noteController.noteController.getAllActive);
/*
    запрос:
        name: String (ползователь)
        field: String (поле)
        trend: String (направление)
    тело:
 */

noteRouter.get("/active/sortered", _noteController.noteController.getSortActive);
/*
    запрос:
        note: Int (id заметки)
    тело:
 */

noteRouter.get("/photo", _noteController.noteController.getPhoto);
/*
    запрос:
        note: Int (id заметки)
    тело:
 */

noteRouter["delete"]("/delete", _noteController.noteController.deleteNote);
/*
    запрос:
        note: Int (id заметки)
    тело:
        файл
 */

noteRouter.post("/change/photo", _noteController.noteController.changePhoto);
/*
    запрос:
        note: Int (id заметки)
        importance: Boolean (важность заметки)
    тело:
 */

noteRouter.put("/change/importance", _noteController.noteController.changeImportance);
/*
    запрос:
        note: Int (id заметки)
    тело:
        text: String (текст заметки)
 */

noteRouter.put("/change/text", _noteController.noteController.changeText);
/*
    запрос:
        note: Int (id заметки)
    тело:
 */

noteRouter.put("/change/status", _noteController.noteController.changeStatus);
var _default = noteRouter;
exports["default"] = _default;