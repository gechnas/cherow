import { Token } from './token';
import { Flags } from './common';
import { OnComment, OnToken } from './types';
import { CommentType } from './lexer/comments';

export class State {
  public index: number;
  public startIndex: number;
  public lastIndex: number;
  public column: number;
  public startColumn: number;
  public lastColumn: number;
  public line: number;
  public startLine: number;
  public lastLine: number;
  public source: string;
  public length: number;
  public nextChar: number;
  public flags: Flags;
  public token: Token;
  public tokenRaw: string | null;
  public tokenRegExp: any;
  public onToken: OnToken;
  public onComment: OnComment;
  public commentState: number | undefined;
  public tokenValue: any;
  public commentStart: number;
  public commentType: CommentType | void;
  public capturingParens: number;
  public largestBackReference: number;
  public assignable: boolean;
  public destructible: boolean;

  constructor(source: string, onToken: OnToken | void, onComment: OnComment | void) {
      this.index = 0;
      this.lastIndex = 0;
      this.startIndex = 0;
      this.line = 1;
      this.lastLine = 0;
      this.startLine = 0;
      this.column = 0;
      this.lastColumn = 0;
      this.startColumn = 0;
      this.source = source || '';
      this.length = source.length;
      this.flags = Flags.Empty;
      this.tokenValue = '';
      this.nextChar = source.charCodeAt(0);
      this.token = Token.EndOfSource;
      this.tokenRaw = null;
      this.tokenRegExp = undefined;
      this.onToken = onToken;
      this.onComment = onComment;
      this.commentStart = 0;
      this.commentType = undefined;
      this.capturingParens = 0;
      this.largestBackReference = 0;
      this.assignable = true;
      this.destructible  = true;
  }
}