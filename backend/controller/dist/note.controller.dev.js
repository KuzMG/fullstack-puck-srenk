"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noteController = void 0;

var _db = _interopRequireDefault(require("../db.js"));

var _fs = _interopRequireDefault(require("fs"));

var _dirname2 = _interopRequireDefault(require("../dirname.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NoteController =
/*#__PURE__*/
function () {
  function NoteController() {
    _classCallCheck(this, NoteController);
  }

  _createClass(NoteController, [{
    key: "createNote",
    value: function createNote(req, res) {
      var _req$body, name, text, name_user, note;

      return regeneratorRuntime.async(function createNote$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, name = _req$body.name, text = _req$body.text, name_user = _req$body.name_user;
              _context.next = 3;
              return regeneratorRuntime.awrap(_db["default"].query("INSERT INTO notes(name,txt,name_user) VALUES ($1,$2,$3) RETURNING *", [name, text, name_user]));

            case 3:
              note = _context.sent;
              res.json(note);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "getAllCompleted",
    value: function getAllCompleted(req, res) {
      var name_user, note;
      return regeneratorRuntime.async(function getAllCompleted$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              name_user = req.query.name;
              _context2.next = 3;
              return regeneratorRuntime.awrap(_db["default"].query("SELECT name, first_date, last_date, id, txt FROM  notes WHERE active=FALSE AND name_user=$1 ORDER BY first_date DESC", [name_user]));

            case 3:
              note = _context2.sent;
              res.json(note);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "getAllActive",
    value: function getAllActive(req, res) {
      var name_user, note;
      return regeneratorRuntime.async(function getAllActive$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              name_user = req.query.name;
              _context3.next = 3;
              return regeneratorRuntime.awrap(_db["default"].query("SELECT name, first_date, id, txt FROM  notes WHERE active=TRUE AND name_user=$1 ORDER BY first_date DESC", [name_user]));

            case 3:
              note = _context3.sent;
              res.json(note);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "getSortActive",
    value: function getSortActive(req, res) {
      var name_user, field, trend, query, note;
      return regeneratorRuntime.async(function getSortActive$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              name_user = req.query.name;
              field = req.query.field;
              trend = req.query.trend;
              query = "SELECT name, first_date, id, txt FROM notes WHERE active=TRUE AND name_user='" + name_user + "' ORDER BY " + field + " " + trend;
              _context4.next = 6;
              return regeneratorRuntime.awrap(_db["default"].query(query));

            case 6:
              note = _context4.sent;
              res.json(note);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "getSort\u0421ompleted",
    value: function getSortOmpleted(req, res) {
      var name_user, field, trend, query, note;
      return regeneratorRuntime.async(function getSortOmpleted$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              name_user = req.query.name;
              field = req.query.field;
              trend = req.query.trend;
              query = "SELECT name, first_date, last_date, id, txt FROM notes WHERE active=FALSE AND name_user='" + name_user + "' ORDER BY " + field + " " + trend;
              _context5.next = 6;
              return regeneratorRuntime.awrap(_db["default"].query(query));

            case 6:
              note = _context5.sent;
              res.json(note);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "deleteNote",
    value: function deleteNote(req, res) {
      var note;
      return regeneratorRuntime.async(function deleteNote$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              note = req.query.note;

              _db["default"].query("DELETE FROM notes WHERE id=$1", [note]);

              res.status(200).end();

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }, {
    key: "changePhoto",
    value: function changePhoto(req, res) {
      var note;
      return regeneratorRuntime.async(function changePhoto$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              note = req.query.note;

              if (!filedata) {
                res.status(400).send("ТЫ ДОЛБАЕБ???");
              } else {
                res.status(200).send("ФАЙЛ ЗАГРУЖЕН");
              }

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      });
    }
  }, {
    key: "getPhoto",
    value: function getPhoto(req, res) {
      var note;
      return regeneratorRuntime.async(function getPhoto$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              note = req.query.note;
              res.sendFile(_dirname2["default"] + '/photo/' + note);

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      });
    }
  }, {
    key: "changeImportance",
    value: function changeImportance(req, res) {
      var note, importance;
      return regeneratorRuntime.async(function changeImportance$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              note = req.query.note;
              importance = req.query.importance;

              _db["default"].query("UPDATE notes SET importance=$1 WHERE id=$2", [importance, note]);

              res.status(200).end();

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      });
    }
  }, {
    key: "changeText",
    value: function changeText(req, res) {
      var note, text;
      return regeneratorRuntime.async(function changeText$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              note = req.query.note;
              text = req.body.text;

              _db["default"].query("UPDATE notes SET txt=$1 WHERE id=$2", [text, note]);

              res.status(200).end();

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      });
    }
  }, {
    key: "changeStatus",
    value: function changeStatus(req, res) {
      var note;
      return regeneratorRuntime.async(function changeStatus$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              note = req.query.note;

              _db["default"].query("UPDATE notes SET active=False, last_date=current_date WHERE id=$1", [note]);

              res.status(200).end();

            case 3:
            case "end":
              return _context11.stop();
          }
        }
      });
    }
  }]);

  return NoteController;
}();

var noteController = new NoteController();
exports.noteController = noteController;