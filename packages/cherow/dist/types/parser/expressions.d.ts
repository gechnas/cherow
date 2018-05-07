import * as ESTree from '../estree';
import { Token } from '../token';
import { Location, IParser } from '../types';
import { Context, ObjectState } from '../utilities';
export declare function parseExpression(parser: IParser, context: Context): ESTree.Expression;
export declare function parseSequenceExpression(parser: IParser, context: Context, left: ESTree.Expression, pos: Location): ESTree.SequenceExpression;
export declare function parseAssignmentExpression(parser: IParser, context: Context): any;
export declare function parseRestElement(parser: IParser, context: Context, args?: string[]): any;
export declare function parseLeftHandSideExpression(parser: IParser, context: Context, pos: Location): ESTree.Expression;
export declare function parsePrimaryExpression(parser: IParser, context: Context): any;
export declare function parseIdentifier(parser: IParser, context: Context): ESTree.Identifier;
export declare function parseLiteral(parser: IParser, context: Context): ESTree.Literal;
export declare function parseBigIntLiteral(parser: IParser, context: Context): ESTree.Literal;
export declare function parseIdentifierName(parser: IParser, context: Context, t: Token): ESTree.Identifier;
export declare function parseFunctionExpression(parser: IParser, context: Context): ESTree.FunctionExpression;
export declare function parseAsyncFunctionOrAsyncGeneratorExpression(parser: IParser, context: Context): ESTree.FunctionExpression;
export declare function parsePropertyName(parser: IParser, context: Context): ESTree.Expression;
export declare function parseObjectLiteral(parser: IParser, context: Context): ESTree.ObjectExpression;
export declare function parseFormalListAndBody(parser: IParser, context: Context, state: ObjectState): {
    params: ESTree.Identifier[];
    body: ESTree.BlockStatement;
};
export declare function parseFunctionBody(parser: IParser, context: Context, params: any): ESTree.BlockStatement;
export declare function parseFormalParameters(parser: IParser, context: Context, state: ObjectState): {
    params: ESTree.Identifier[];
    args: string[];
};
export declare function parseFormalParameterList(parser: IParser, context: Context, args: string[]): any;
export declare function parseClassBodyAndElementList(parser: IParser, context: Context, state: ObjectState): ESTree.ClassBody;
export declare function parseClassElement(parser: IParser, context: Context, state: ObjectState, decorators: ESTree.Decorator[]): ESTree.MethodDefinition | ESTree.FieldDefinition;
export declare function parseDecorators(parser: IParser, context: Context): ESTree.Decorator[];
