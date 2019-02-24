"use strict"

module.exports = {
  rules: {
    // never型の処理にconsole.debugを使うためにdebugを許容
    "no-console": ["error", { allow: ["debug", "warn", "error"] }]
  }
}
