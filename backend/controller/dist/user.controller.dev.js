"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;

var _os = require("os");

var _db = _interopRequireDefault(require("../db.js"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: "signIn",
    value: function signIn(req, res) {
      var _req$body, name, password, signInFlag, flag;

      return regeneratorRuntime.async(function signIn$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, name = _req$body.name, password = _req$body.password;
              _context.next = 3;
              return regeneratorRuntime.awrap(_db["default"].query("SELECT (pswhash = crypt($2, pswhash)) AS login FROM users where name=$1", [name, password]));

            case 3:
              signInFlag = _context.sent;
              flag = signInFlag[0].login;

              if (flag) {
                res.status(200).end();
              } else {
                res.status(400).end();
              }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "changePassword",
    value: function changePassword(req, res) {
      var _req$body2, name, oldPassword, newPassword, access, ass;

      return regeneratorRuntime.async(function changePassword$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body2 = req.body, name = _req$body2.name, oldPassword = _req$body2.oldPassword, newPassword = _req$body2.newPassword;
              console.log({
                name: name,
                oldPassword: oldPassword,
                newPassword: newPassword
              });
              _context2.next = 4;
              return regeneratorRuntime.awrap(_db["default"].query("SELECT (pswhash = crypt($2, pswhash)) AS login FROM users where name=$1", [name, oldPassword]));

            case 4:
              access = _context2.sent;
              ass = access[0].login;
              console.log(ass);

              if (!access[0].login) {
                console.log("[eq]");
                res.status(400).send("Неправильный пароль");
              } else {
                console.log("ogogof");

                _db["default"].query("UPDATE users SET pswhash = crypt($2,gen_salt('md5')) WHERE name=$1", [name, newPassword]).then(function (v) {
                  console.log("ok");
                  res.status(200).end();
                }, function (e) {
                  console.log("error");
                  res.status(500).end();
                });
              }

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "signUp",
    value: function signUp(req, res) {
      var _req$body3, name, password;

      return regeneratorRuntime.async(function signUp$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log(req.body);
              _req$body3 = req.body, name = _req$body3.name, password = _req$body3.password;

              _db["default"].query("INSERT INTO users (name,pswhash) VALUES ($1,crypt($2,gen_salt('md5')))", [name, password]).then(function (v) {
                res.status(200).end();
              }, function (e) {
                if (e.code == '23505') res.status(400).send("Такой юзер уже есть...");
              });

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "deleteAccount",
    value: function deleteAccount(req, res) {
      var name;
      return regeneratorRuntime.async(function deleteAccount$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              name = req.query.name;

              _db["default"].query("DELETE FROM users WHERE name=$1", [name]);

              res.status(200).end();

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }]);

  return UserController;
}();

var userController = new UserController();
exports.userController = userController;