System.register(['cherow'], function (exports, module) {
  'use strict';
  var Parser;
  return {
    setters: [function (module) {
      Parser = module.Parser;
    }],
    execute: function () {

      exports('parseFlow', parseFlow);
      function parseFlow(source, options) {
          return options && options.module
              ? Parser.parse(source, options, 4096 | 8192)
              : Parser.parse(source, options, 0);
      }

    }
  };
});
