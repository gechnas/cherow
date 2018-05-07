import { CommentType, Node } from './estree';
import { Flags } from './utilities';
import { Token } from './token';

/**
 * ForStatement types.
 */
export type ForStatementType = 'ForStatement' | 'ForOfStatement' | 'ForInStatement';

/**
 * Comment types.
 */
export type CommentType = 'MultiLine' | 'SingleLine' | 'SheBang' | 'HTMLOpen' | 'HTMLClose';

/**
 * The parser options.
 */
export interface Options {
  // Create a top-level comments array containing all comments
  comments?: boolean;

  // The flag to enable stage 3 support (ESNext)
  next?: boolean;

  // The flag to enable start and end offsets to each node
  ranges?: boolean;

  // The flag to enable line/column location information to each node
  loc?: boolean;

  // The flag to enable React JSX parsing
  jsx?: boolean;

  // The flag to attach raw property to each literal node
  raw?: boolean;

  // Attach raw property to each identifier node
  rawIdentifier?: boolean;

  // Set to true to record the source file in every node's loc object when the loc option is set.
  source?: string;

  // The flag to enable implied strict mode
  impliedStrict?: boolean;

  // The flag to allow return in the global scope
  globalReturn?: boolean;

  // The flag to allow experimental features
  experimental?: boolean;

  // The flag to allow to skip shebang - '#'
  skipShebang?: boolean;

  // Enable tolerant mode
  tolerant?: boolean;

  // Enables method that should be bypassed when running on NodeJS
  node?: boolean;
}

/**
 * The parser interface.
 */
export interface IParser {
  // The source code to parse
  source: string;

  // Source length
  length: number;

  // Current position
  index: number;

  // Current line position
  line: number;

  // Current column position
  column: number;

  // Start position  before current token
  startIndex: number;

  // Start position column before current token
  startColumn: number;

  // Start position line before current token
  startLine: number;

  // End position after parsing after current token
  lastIndex: number;

  // End column position after current token
  lastColumn: number;

  // End line position after current token
  lastLine: number;

  // Pending cover grammar errors
  pendingExpressionError: any;

  // Mutable parser flags
  flags: Flags;

  // Mutable parser flags
  sourceFile: string | void;
  errorLocation: any;
  labelSet: any;
  comments: any;
  tokenValue: any;
  tokenRaw: string;
  lastValue: number;
  tokenRegExp: any;
  token: Token;
  errors: any[];
}

/**
 *  Line / column location
 *
 */
export interface Location {
  index: number;
  column: number;
  line: number;
}
