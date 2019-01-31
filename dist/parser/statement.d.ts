import * as ESTree from '../estree';
import { Context, LabelledState, ParserState, Type, Origin, ScopeState } from '../common';
export declare function parseStatementList(state: ParserState, context: Context, scope: ScopeState): ESTree.Statement[];
export declare function parseStatementListItem(state: ParserState, context: Context, scope: ScopeState): any;
export declare function parseExpressionStatement(state: ParserState, context: Context): ESTree.ExpressionStatement;
export declare function parseBlockStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.BlockStatement;
export declare function parseEmptyStatement(state: ParserState, context: Context): ESTree.EmptyStatement;
export declare function parseThrowStatement(state: ParserState, context: Context): ESTree.ThrowStatement;
export declare function parseIfStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.IfStatement;
export declare function parseReturnStatement(state: ParserState, context: Context): ESTree.ReturnStatement;
export declare function parseWhileStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.WhileStatement;
export declare function parseContinueStatement(state: ParserState, context: Context): ESTree.ContinueStatement;
export declare function parseBreakStatement(state: ParserState, context: Context): ESTree.BreakStatement;
export declare function parseWithStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.WithStatement;
export declare function parseDebuggerStatement(state: ParserState, context: Context): ESTree.DebuggerStatement;
export declare function parseTryStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.TryStatement;
export declare function parseCatchBlock(state: ParserState, context: Context, scope: ScopeState): ESTree.CatchClause;
export declare function parseDoWhileStatement(state: ParserState, context: Context, scope: ScopeState): any;
export declare function parseCaseOrDefaultClauses(state: ParserState, context: Context, test: ESTree.Expression | null, scope: ScopeState, start: number): ESTree.SwitchCase;
export declare function parseExpressionOrLabelledStatement(state: ParserState, context: Context, scope: ScopeState, label: LabelledState): any;
export declare function parseDirective(state: ParserState, context: Context, scope: ScopeState): any;
export declare function parseVariableStatement(state: ParserState, context: Context, type: Type, origin: Origin, scope: ScopeState): ESTree.VariableDeclaration;
//# sourceMappingURL=statement.d.ts.map