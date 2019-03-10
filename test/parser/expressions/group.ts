import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Parenthesized', () => {
  for (const arg of [
    'eval',
    'arguments',
    'implements',
    'package',
    'protected',
    'interface',
    'private',
    'public',
    'yield',
    'static',
    'let'
  ]) {
    it(`(${arg}) = foo`, () => {
      t.throws(() => {
        parseSource(`(${arg}) = foo`, undefined, Context.Strict);
      });
    });
  }

  for (const arg of [
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'export',
    'extends',
    'finally',
    'for',
    'function',
    'if',
    'import',
    'in',
    'instanceof',
    'new',
    'return',
    'super',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'null',
    'true',
    'false' /*'enum',*/
  ]) {
    it(`should fail on '(${arg}) = foo'`, () => {
      t.throws(() => {
        parseSource(`(${arg}) = foo`, undefined, Context.Empty);
      });
    });
  }

  for (const arg of ['await', 'let', 'yield']) {
    it(`should fail on '(${arg})'`, () => {
      t.throws(() => {
        parseSource(`(${arg})`, undefined, Context.Strict | Context.Module);
      });
    });
  }

  for (const arg of [
    //   'arguments',
    'async ()=>x',
    'class{}',
    'delete x.y',
    // 'eval',
    'false',
    'function(){}',
    'new x',
    'null',
    'true',
    'this',
    'typeof x',
    'void x',
    'x + y',
    '[].length',
    '[x].length',
    '{}.length',
    '{x: y}.length'
  ]) {
    it(`should fail on '(${arg})'`, () => {
      t.doesNotThrow(() => {
        parseSource(`(${arg})`, undefined, Context.Empty);
      });
    });

    it(`should fail on '(${arg}) => x'`, () => {
      t.throws(() => {
        parseSource(`(${arg}) => x`, undefined, Context.Empty);
      });
    });
  }

  for (const arg of [
    'async ()=>x',
    'await foo',
    'class{}',
    'delete x.x',
    'false',
    'function(){}',
    'new x',
    'null',
    'super',
    'true',
    'this',
    'typeof x',
    'void x',
    'yield x',
    'x + y',
    '[].length',
    '[x].length',
    '{}.length',
    '{x: y}.length'
  ]) {
    it(`should fail on '(${arg})=> y'`, () => {
      t.throws(() => {
        parseSource(`(${arg})=> y`, undefined, Context.Empty);
      });
    });
  }

  for (const arg of [
    '(a,b)+=2',
    '(a,b)=2',
    '(a=1)+=2',
    '(a=1)=2',
    '();',
    '()',
    '(...x);',
    '(...);',
    '(a = b,) = x',
    '(...a,) = x',
    '([x],) = x',
    '({a},) = x',
    '(...a = x,) = x',
    '({a} = b,) = x',
    '(a, 1, "c", d, e, f) => x;',
    '((x)) => x;',
    '(x--, y) => x;',
    // '(async)=2',
    '([a + b] = x);',
    // 'async([].x) => x;',
    // 'async ({} + 1) => x;',
    '(a, b) = c',
    '(,,)',
    '(,) = x',
    '(,,) = x',
    '(a,) = x',
    '(a,b,) = x',
    '(a = b,) = x',
    '(...a,) = x',
    '([x],) = x',
    '({a},) = x',
    '(...a = x,) = x',
    '({a} = b,) = x',
    '(a, 1, "c", d, e, f) => x;',
    '((x)) => x;',
    '(x--, y) => x;',
    '(x--) => x;',
    '(++x, y) => x;',
    '(++x) => x;',
    '/i/ * ()=>j',
    '(a[b]) => x;',
    '(a.b) => x;',
    '((x)) => x;',
    '...x => x',
    'y, ...x => x',
    '(x, ...y, z) => x',
    '(...x, y) => x',
    '(...x = y) => x',
    '([...x.y]) => z',
    '([a + b] = x) => a;',
    '({ident: [foo, bar] + x} = y)',
    '(a=/i/) = /i/',
    '(/x/) => x',
    '(x, /x/g) => x',
    '(x, /x/g) => x',
    '({ident: {x}.join("")}) => x',
    '({ident: {x:y} += x})',
    '({ident: {x}/x/g}) => x',
    '(a,,) => {}',
    '(...a = x,) => {}',
    '(...a = x,) => {}'
  ]) {
    it(`should fail on '${arg}'`, () => {
      t.throws(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }
  fail('Expressions - Group (fail)', [
    ['(1) = x', Context.Empty],
    ['("a") = "b"', Context.Empty],
    ['([a]) = x', Context.Empty],
    ['({a}) = 1', Context.Empty],
    ['{a, b} = {a: 1, b: 2}', Context.Empty],
    ['({a, b}) = {a: 1, b:2};', Context.Empty],
    ['({b}) = b;', Context.Empty],
    ['([b]) = b;', Context.Empty],
    ['({a}) = 2;', Context.Empty],
    ['([b]) = b;', Context.Empty],
    // ['[(a = 0)] = 1', Context.Empty],
    ['([x, y]) = z;', Context.Empty],
    ['{x, y} = z;', Context.Empty],
    ['({x, y}) = z;', Context.Empty],
    //    ['(a \n/b/);', Context.Empty],
    //    ['([a \n/b/]);', Context.Empty],
    ['(...);', Context.Empty],
    ['(...x);', Context.Empty],
    ['()', Context.Empty],
    ['();', Context.Empty],
    ['(a=1)=2', Context.Empty],
    ['(a=1)+=2', Context.Empty],
    ['(a,b)=2', Context.Empty],
    ['(a,b)+=2', Context.Empty],
    ['([a + b] = x);', Context.Empty],
    ['(a, b) = c', Context.Empty],
    ['(++x) => x;', Context.Empty],
    ['(++x, y) => x', Context.Empty],
    ['(x--) => x;', Context.Empty],
    ['(x--, y) => x;', Context.Empty],
    ['...x => x', Context.Empty],
    ['y, ...x => x', Context.Empty],
    [`({[foo]() {}} = y)`, Context.Empty],
    ['0, {a = 0}) => 0', Context.Empty],
    ['({a = 0}, {a = 0}, 0) => 0', Context.Empty],
    ['(0, {a = 0}) = 0', Context.Empty],
    //    ['async (a, ...b=fail) => a;', Context.Empty],
    ['async (foo = yield x)', Context.Empty],
    ['async (foo = yield x) => foo', Context.Empty],
    ['(x = y) = z; ', Context.Empty],
    ['(x, ...y, z) => x', Context.Empty],
    ['(x, ...y, z) => x', Context.Empty],
    ['(...x, y) => x', Context.Empty],
    ['(...x = y) => x', Context.Empty],
    ['([...x.y]) => z', Context.Empty],
    ['([a + b] = x) => a;', Context.Empty],
    ['async(a = await x);', Context.Empty],
    ['([...a.b]) => c', Context.Empty],
    ['({ident: [foo, bar].join("")}) => x', Context.Empty],
    ['({ident: [foo, bar]/x}) => x', Context.Empty],
    ['({ident: [foo, bar]/x/g}) => x', Context.Empty],
    ['({ident: {x}.join("")}) => x', Context.Empty],
    ['({ident: {x}/x}) => x', Context.Empty],
    ['({ident: {x}/x/g}) => x', Context.Empty],
    ['(/x/) => x', Context.Empty],
    ['(/x/) => x', Context.Empty],
    ['(x, /x/g) => x', Context.Empty],
    ['(x, /x/g) => x', Context.Empty],
    ['(a=/i/) = /i/', Context.Empty],
    ['(x => y) = {}', Context.Empty],
    ['(x => y) = {}', Context.Empty],
    ['(async x => y) = {}', Context.Empty],
    ['((x, z) => y) = {}', Context.Empty],
    ['(async (x, z) => y) = {}', Context.Empty],
    //    ['async("foo".bar) => x', Context.Empty],
    ['(...rest - a) => b', Context.Empty],
    ['(a, ...b - 10) => b', Context.Empty],
    ["(c, a['b']) => {}", Context.Empty],
    ['(...a = b) => b', Context.Empty],
    ['(-a, b) => {}', Context.Empty],
    ['(a, -b) => {}', Context.Empty],
    ['{} => {}', Context.Empty],
    //['a++ => {}', Context.Empty],
    ['(a++) => {}', Context.Empty],
    ['(a++, b) => {}', Context.Empty],
    ['(a, b++) => {}', Context.Empty],
    ['[] => {}', Context.Empty],
    ['(foo ? bar : baz) => {}', Context.Empty],
    ['(a, foo ? bar : baz) => {}', Context.Empty],
    ['(foo ? bar : baz, a) => {}', Context.Empty],
    ['(a.b, c) => {}', Context.Empty],
    ['(c, a.b) => {}', Context.Empty],
    ['(x = x) = x;', Context.Empty],
    //    ['([x]++)', Context.Empty],
    ['(..., x)', Context.Empty],
    ['(x, ...);', Context.Empty],
    ['([{x: y.z}]) => b', Context.Empty],
    ['([{x: y.z}] = a) => b', Context.Empty],
    ['([{x: y.z} = a]) => b', Context.Empty],
    ['32 => {}', Context.Empty],
    ['(32) => {}', Context.Empty],
    ['(a, 32) => {}', Context.Empty],
    // ["if => {}", Context.Empty],
    ['(if) => {}', Context.Empty],
    ['(a, if) => {}', Context.Empty],
    // ['a + b => {}', Context.Empty],
    ['(a + b) => {}', Context.Empty],
    ['(a + b, c) => {}', Context.Empty],
    ['=> 0', Context.Empty],
    ['=>', Context.Empty],
    ['=> {}', Context.Empty],
    [') => {}', Context.Empty],
    [', => {}', Context.Empty],
    ['(,) => {}', Context.Empty],
    ['(...x);', Context.Empty],
    ['return => {}', Context.Empty],
    [`({"foo": [x].foo()}=y);`, Context.Empty],
    [`({15: 15.foo()}=x)`, Context.Empty],
    [`({15: 15.foo}=x)`, Context.Empty],
    ['(()) => 0', Context.Empty],
    ['((x)) => 0', Context.Empty],
    ['((x, y)) => 0', Context.Empty],
    ['(x, (y)) => 0', Context.Empty],
    ['((x, y, z)) => 0', Context.Empty],
    ['(x, (y, z)) => 0', Context.Empty],
    ['((x, y), z) => 0', Context.Empty],
    ['({[foo]: bar()} = baz)', Context.Empty],
    ['({[foo]: a + b} = baz)', Context.Empty],
    ['({[foo]: bar()}) => baz', Context.Empty],
    ['({[foo]: a + b}) => baz', Context.Empty],
    // ['async("foo".bar) => x', Context.Empty],
    ['({...x.y} = z) => z', Context.Empty],
    ['({...x.y}) => z', Context.Empty],
    ['((x, y), z) => 0', Context.Empty],
    ['({*set x(){}})', Context.Empty],
    ['({*ident: x})', Context.Empty],
    ['({*ident x(){}})', Context.Empty]
  ]);
  pass('Expressions - Parenthesized (pass)', [
    /*    [
      '("\\u{10FFFF}")',
      Context.Empty,
      {
      }
    ], */
    [
      '(a)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'a'
            }
          }
        ]
      }
    ],

    [
      '(x.foo)',
      Context.LocationTracking,
      {
        type: 'Program',
        start: 0,
        end: 7,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        },
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 7,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 7
              }
            },
            expression: {
              type: 'MemberExpression',
              start: 1,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 6
                }
              },
              object: {
                type: 'Identifier',
                start: 1,
                end: 2,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 2
                  }
                },
                name: 'x'
              },
              property: {
                type: 'Identifier',
                start: 3,
                end: 6,
                loc: {
                  start: {
                    line: 1,
                    column: 3
                  },
                  end: {
                    line: 1,
                    column: 6
                  }
                },
                name: 'foo'
              },
              computed: false
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(x + foo)',
      Context.LocationTracking,
      {
        type: 'Program',
        start: 0,
        end: 9,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        },
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 9,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 9
              }
            },
            expression: {
              type: 'BinaryExpression',
              start: 1,
              end: 8,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 8
                }
              },
              left: {
                type: 'Identifier',
                start: 1,
                end: 2,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 2
                  }
                },
                name: 'x'
              },
              operator: '+',
              right: {
                type: 'Identifier',
                start: 5,
                end: 8,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 8
                  }
                },
                name: 'foo'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(x.foo = y)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'Identifier',
                  name: 'x'
                },
                property: {
                  type: 'Identifier',
                  name: 'foo'
                }
              },
              right: {
                type: 'Identifier',
                name: 'y'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(typeof x)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'typeof',
              argument: {
                type: 'Identifier',
                name: 'x'
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '((x));',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 6,
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 6,
            expression: {
              type: 'Identifier',
              start: 2,
              end: 3,
              name: 'x'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a = 1, b = 2);',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 15,
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 15,
            expression: {
              type: 'SequenceExpression',
              start: 1,
              end: 13,
              expressions: [
                {
                  type: 'AssignmentExpression',
                  start: 1,
                  end: 6,
                  operator: '=',
                  left: {
                    type: 'Identifier',
                    start: 1,
                    end: 2,
                    name: 'a'
                  },
                  right: {
                    type: 'Literal',
                    start: 5,
                    end: 6,
                    value: 1
                  }
                },
                {
                  type: 'AssignmentExpression',
                  start: 8,
                  end: 13,
                  operator: '=',
                  left: {
                    type: 'Identifier',
                    start: 8,
                    end: 9,
                    name: 'b'
                  },
                  right: {
                    type: 'Literal',
                    start: 12,
                    end: 13,
                    value: 2
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a) = 1;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '({x} = y);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    value: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true
                  }
                ]
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'y'
              }
            }
          }
        ]
      }
    ],
    [
      '({[x]:y});',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  value: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  kind: 'init',
                  computed: true,
                  method: false,
                  shorthand: false
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '({a} = b,) => {}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        value: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true
                      }
                    ]
                  },
                  right: {
                    type: 'Identifier',
                    name: 'b'
                  }
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          }
        ]
      }
    ],
    [
      '([x] = y,) => {}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'x'
                      }
                    ]
                  },
                  right: {
                    type: 'Identifier',
                    name: 'y'
                  }
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          }
        ]
      }
    ],
    [
      '({a},) => {}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      value: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true
                    }
                  ]
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          }
        ]
      }
    ],
    [
      '([x],) => {}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    }
                  ]
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          }
        ]
      }
    ],
    [
      '({[x]:y} = z);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    value: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false
                  }
                ]
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'z'
              }
            }
          }
        ]
      }
    ],
    [
      '({ident: {x:y}/x/g})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'ident'
                  },
                  value: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'ObjectExpression',
                        properties: [
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'x'
                            },
                            value: {
                              type: 'Identifier',
                              name: 'y'
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false
                          }
                        ]
                      },
                      right: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      operator: '/'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'g'
                    },
                    operator: '/'
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'f(((a) => a + b)(1, 4), 5);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'f'
              },
              arguments: [
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      operator: '+'
                    },
                    params: [
                      {
                        type: 'Identifier',
                        name: 'a'
                      }
                    ],
                    id: null,
                    async: false,
                    expression: true
                  },
                  arguments: [
                    {
                      type: 'Literal',
                      value: 1
                    },
                    {
                      type: 'Literal',
                      value: 4
                    }
                  ]
                },
                {
                  type: 'Literal',
                  value: 5
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'f(((a, b) => a + b));',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'f'
              },
              arguments: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'b'
                    },
                    operator: '+'
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'a'
                    },
                    {
                      type: 'Identifier',
                      name: 'b'
                    }
                  ],
                  id: null,
                  async: false,
                  expression: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '(...x) => x',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Identifier',
                name: 'x'
              },
              params: [
                {
                  type: 'RestElement',
                  argument: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ],
              id: null,
              async: false,
              expression: true
            }
          }
        ]
      }
    ],
    [
      '(a.b) = 1;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'Identifier',
                  name: 'a'
                },
                property: {
                  type: 'Identifier',
                  name: 'b'
                }
              },
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a = 1, b = 2) => x;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Identifier',
                name: 'x'
              },
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  right: {
                    type: 'Literal',
                    value: 1
                  }
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  right: {
                    type: 'Literal',
                    value: 2
                  }
                }
              ],
              id: null,
              async: false,

              expression: true
            }
          }
        ]
      }
    ],
    [
      'var a = (b) => c;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'c'
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'b'
                    }
                  ],
                  id: null,
                  async: false,

                  expression: true
                },
                id: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '`X${a => b}Y`',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'a'
                    }
                  ],
                  id: null,
                  async: false,

                  expression: true
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'X',
                    raw: 'X'
                  },
                  tail: false
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'Y',
                    raw: 'Y'
                  },
                  tail: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '`X${a => b + c}Y`',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'b'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'c'
                    },
                    operator: '+'
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'a'
                    }
                  ],
                  id: null,
                  async: false,
                  expression: true
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'X',
                    raw: 'X'
                  },
                  tail: false
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'Y',
                    raw: 'Y'
                  },
                  tail: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '`X${a => b + {}}Y`',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'b'
                    },
                    right: {
                      type: 'ObjectExpression',
                      properties: []
                    },
                    operator: '+'
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'a'
                    }
                  ],
                  id: null,
                  async: false,

                  expression: true
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'X',
                    raw: 'X'
                  },
                  tail: false
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'Y',
                    raw: 'Y'
                  },
                  tail: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '_ => _\n/foo/g',
      Context.Empty,
      {
        body: [
          {
            expression: {
              async: false,
              body: {
                left: {
                  left: {
                    name: '_',
                    type: 'Identifier'
                  },
                  operator: '/',
                  right: {
                    name: 'foo',
                    type: 'Identifier'
                  },
                  type: 'BinaryExpression'
                },
                operator: '/',
                right: {
                  name: 'g',
                  type: 'Identifier'
                },
                type: 'BinaryExpression'
              },
              expression: true,
              id: null,
              params: [
                {
                  name: '_',
                  type: 'Identifier'
                }
              ],
              type: 'ArrowFunctionExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '(a[b]) = 1;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'MemberExpression',
                computed: true,
                object: {
                  type: 'Identifier',
                  name: 'a'
                },
                property: {
                  type: 'Identifier',
                  name: 'b'
                }
              },
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '({} + 1)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'ObjectExpression',
                properties: []
              },
              right: {
                type: 'Literal',
                value: 1
              },
              operator: '+'
            }
          }
        ]
      }
    ],
    [
      'async ({} + 1);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'async'
              },
              arguments: [
                {
                  type: 'BinaryExpression',
                  left: {
                    type: 'ObjectExpression',
                    properties: []
                  },
                  right: {
                    type: 'Literal',
                    value: 1
                  },
                  operator: '+'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '(x + y) <= z',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'x'
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
                },
                operator: '+'
              },
              right: {
                type: 'Identifier',
                name: 'z'
              },
              operator: '<='
            }
          }
        ]
      }
    ],
    [
      '(x + y) != z',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'x'
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
                },
                operator: '+'
              },
              right: {
                type: 'Identifier',
                name: 'z'
              },
              operator: '!='
            }
          }
        ]
      }
    ],
    [
      '(/x/)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: {},
              regex: {
                pattern: 'x',
                flags: ''
              }
            }
          }
        ]
      }
    ],
    [
      '(x, /x/)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'SequenceExpression',
              expressions: [
                {
                  type: 'Identifier',
                  name: 'x'
                },
                {
                  type: 'Literal',
                  value: {},
                  regex: {
                    pattern: 'x',
                    flags: ''
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '(x) / y',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              right: {
                type: 'Identifier',
                name: 'y'
              },
              operator: '/'
            }
          }
        ]
      }
    ],
    [
      '([target()[targetKey()]] = x);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'MemberExpression',
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'target'
                      },
                      arguments: []
                    },
                    computed: true,
                    property: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'targetKey'
                      },
                      arguments: []
                    }
                  }
                ]
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'x'
              }
            }
          }
        ]
      }
    ],
    [
      '([target()[targetKey(a=b)]] = x);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'MemberExpression',
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'target'
                      },
                      arguments: []
                    },
                    computed: true,
                    property: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'targetKey'
                      },
                      arguments: [
                        {
                          type: 'AssignmentExpression',
                          left: {
                            type: 'Identifier',
                            name: 'a'
                          },
                          operator: '=',
                          right: {
                            type: 'Identifier',
                            name: 'b'
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'x'
              }
            }
          }
        ]
      }
    ],
    [
      '([].length) = y',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'MemberExpression',
                object: {
                  type: 'ArrayExpression',
                  elements: []
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'length'
                }
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'y'
              }
            }
          }
        ]
      }
    ],
    [
      '([x].length) = y',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'MemberExpression',
                object: {
                  type: 'ArrayExpression',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    }
                  ]
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'length'
                }
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'y'
              }
            }
          }
        ]
      }
    ],
    [
      '({}.length) = z',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'MemberExpression',
                object: {
                  type: 'ObjectExpression',
                  properties: []
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'length'
                }
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'z'
              }
            }
          }
        ]
      }
    ],
    [
      '({x: y}.length) = z',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'MemberExpression',
                object: {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      value: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    }
                  ]
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'length'
                }
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'z'
              }
            }
          }
        ]
      }
    ],

    [
      '(true)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: true
            }
          }
        ]
      }
    ],
    [
      '(null)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: null
            }
          }
        ]
      }
    ],
    [
      '(x + y) == z',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'x'
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
                },
                operator: '+'
              },
              right: {
                type: 'Identifier',
                name: 'z'
              },
              operator: '=='
            }
          }
        ]
      }
    ],
    [
      '(a.b().c().d) = 1;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'MemberExpression',
                object: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'MemberExpression',
                        object: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        computed: false,
                        property: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      },
                      arguments: []
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'c'
                    }
                  },
                  arguments: []
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'd'
                }
              },
              operator: '=',
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ]
      }
    ],
    [
      '(a[b]) = 1;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'MemberExpression',
                computed: true,
                object: {
                  type: 'Identifier',
                  name: 'a'
                },
                property: {
                  type: 'Identifier',
                  name: 'b'
                }
              },
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a) += 1;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '+=',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a.b) += 1;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '+=',
              left: {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'Identifier',
                  name: 'a'
                },
                property: {
                  type: 'Identifier',
                  name: 'b'
                }
              },
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a[b]) += 1;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '+=',
              left: {
                type: 'MemberExpression',
                computed: true,
                object: {
                  type: 'Identifier',
                  name: 'a'
                },
                property: {
                  type: 'Identifier',
                  name: 'b'
                }
              },
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a.b().c().d) += 1;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'MemberExpression',
                object: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'MemberExpression',
                        object: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        computed: false,
                        property: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      },
                      arguments: []
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'c'
                    }
                  },
                  arguments: []
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'd'
                }
              },
              operator: '+=',
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ]
      }
    ],
    [
      '(delete foo.bar);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'Identifier',
                  name: 'foo'
                },
                property: {
                  type: 'Identifier',
                  name: 'bar'
                }
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '([delete foo.bar]);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'UnaryExpression',
                  operator: 'delete',
                  argument: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  },
                  prefix: true
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '([target()[targetKey(a=b)]] = x);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'MemberExpression',
                    computed: true,
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'target'
                      },
                      arguments: []
                    },
                    property: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'targetKey'
                      },
                      arguments: [
                        {
                          type: 'AssignmentExpression',
                          operator: '=',
                          left: {
                            type: 'Identifier',
                            name: 'a'
                          },
                          right: {
                            type: 'Identifier',
                            name: 'b'
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              right: {
                type: 'Identifier',
                name: 'x'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '([a.b] = x);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'b'
                    }
                  }
                ]
              },
              right: {
                type: 'Identifier',
                name: 'x'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(void x)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'void',
              argument: {
                type: 'Identifier',
                name: 'x'
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '[].length',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'ArrayExpression',
                elements: []
              },
              property: {
                type: 'Identifier',
                name: 'length'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(x = y)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              right: {
                type: 'Identifier',
                name: 'y'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a, b)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'SequenceExpression',
              expressions: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'Identifier',
                  name: 'b'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '([a / b]);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'BinaryExpression',
                  operator: '/',
                  left: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'b'
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '([a \n/b/g]);',
      Context.Empty,
      {
        body: [
          {
            expression: {
              elements: [
                {
                  left: {
                    left: {
                      name: 'a',
                      type: 'Identifier'
                    },
                    operator: '/',
                    right: {
                      name: 'b',
                      type: 'Identifier'
                    },
                    type: 'BinaryExpression'
                  },
                  operator: '/',
                  right: {
                    name: 'g',
                    type: 'Identifier'
                  },
                  type: 'BinaryExpression'
                }
              ],
              type: 'ArrayExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '(++x);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              operator: '++',
              argument: {
                type: 'Identifier',
                name: 'x'
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'delete (foo)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'Identifier',
                name: 'foo'
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(++x, y);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'SequenceExpression',
              expressions: [
                {
                  type: 'UpdateExpression',
                  operator: '++',
                  argument: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  prefix: true
                },
                {
                  type: 'Identifier',
                  name: 'y'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(x--);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              operator: '--',
              argument: {
                type: 'Identifier',
                name: 'x'
              },
              prefix: false
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(x--, y);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'SequenceExpression',
              expressions: [
                {
                  type: 'UpdateExpression',
                  operator: '--',
                  argument: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  prefix: false
                },
                {
                  type: 'Identifier',
                  name: 'y'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '([].x);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'ArrayExpression',
                elements: []
              },
              property: {
                type: 'Identifier',
                name: 'x'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(x + y) >= z',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              operator: '>=',
              left: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                  type: 'Identifier',
                  name: 'x'
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
                }
              },
              right: {
                type: 'Identifier',
                name: 'z'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(x &= 42)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '&=',
              right: {
                type: 'Literal',
                value: 42
              }
            }
          }
        ]
      }
    ],
    [
      '([a])',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '(void /=g/m.x);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'void',
              argument: {
                type: 'MemberExpression',
                object: {
                  type: 'Literal',
                  value: /=g/m,
                  regex: {
                    pattern: '=g',
                    flags: 'm'
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              prefix: true
            }
          }
        ]
      }
    ],
    [
      '(foo /=g/m.x);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'foo'
              },
              operator: '/=',
              right: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'g'
                },
                right: {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'm'
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'x'
                  }
                },
                operator: '/'
              }
            }
          }
        ]
      }
    ],
    [
      '(delete /a/g.x);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'MemberExpression',
                object: {
                  type: 'Literal',
                  value: {},
                  regex: {
                    pattern: 'a',
                    flags: 'g'
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              prefix: true
            }
          }
        ]
      }
    ],
    [
      '([new x]);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'NewExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  arguments: []
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '([delete foo.bar]);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'UnaryExpression',
                  operator: 'delete',
                  argument: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  },
                  prefix: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '([{}]);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'ObjectExpression',
                  properties: []
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '([a / b]);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  operator: '/'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '([delete /a/.x]);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'UnaryExpression',
                  operator: 'delete',
                  argument: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Literal',
                      value: {},
                      regex: {
                        pattern: 'a',
                        flags: ''
                      }
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'x'
                    }
                  },
                  prefix: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '([delete /a/g.x]);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'UnaryExpression',
                  operator: 'delete',
                  argument: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Literal',
                      value: {},
                      regex: {
                        pattern: 'a',
                        flags: 'g'
                      }
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'x'
                    }
                  },
                  prefix: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '([foo /=g/m.x]);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  operator: '/=',
                  right: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'g'
                    },
                    right: {
                      type: 'MemberExpression',
                      object: {
                        type: 'Identifier',
                        name: 'm'
                      },
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'x'
                      }
                    },
                    operator: '/'
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '([void /=g/m.x]);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'UnaryExpression',
                  operator: 'void',
                  argument: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Literal',
                      value: {},
                      regex: {
                        pattern: '=g',
                        flags: 'm'
                      }
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'x'
                    }
                  },
                  prefix: true
                }
              ]
            }
          }
        ]
      }
    ],

    [
      'async([].x);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'async'
              },
              arguments: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'ArrayExpression',
                    elements: []
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '([void /=/g/m.x]);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'BinaryExpression',
                  left: {
                    type: 'UnaryExpression',
                    operator: 'void',
                    argument: {
                      type: 'Literal',
                      value: {},
                      regex: {
                        pattern: '=',
                        flags: 'g'
                      }
                    },
                    prefix: true
                  },
                  right: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'm'
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'x'
                    }
                  },
                  operator: '/'
                }
              ]
            }
          }
        ]
      }
    ]
  ]);
});
