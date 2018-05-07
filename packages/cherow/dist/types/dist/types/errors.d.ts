import { IParser } from './types';
import { Context } from './utilities';
export declare const enum Errors {
    Unexpected = 0,
    UnexpectedToken = 1,
    InvalidEscapedReservedWord = 2,
    UnexpectedKeyword = 3,
    InvalidLHSInAssignment = 4,
    UnterminatedString = 5,
    UnterminatedRegExp = 6,
    UnterminatedComment = 7,
    UnterminatedTemplate = 8,
    UnexpectedChar = 9,
    StrictOctalEscape = 10,
    InvalidEightAndNine = 11,
    UnicodeOutOfRange = 12,
    DuplicateRegExpFlag = 13,
    UnexpectedTokenRegExpFlag = 14,
    StrictLHSAssignment = 15,
    IllegalReturn = 16,
    StrictFunction = 17,
    SloppyFunction = 18,
    ForbiddenAsStatement = 19,
    GeneratorInSingleStatementContext = 20,
    ForAwaitNotOf = 21,
    DeclarationMissingInitializer = 22,
    ForInOfLoopInitializer = 23,
    ForInOfLoopMultiBindings = 24,
    LetInLexicalBinding = 25,
    UnexpectedLexicalDeclaration = 26,
    LabelRedeclaration = 27,
    InvalidNestedStatement = 28,
    IllegalContinue = 29,
    UnknownLabel = 30,
    MultipleDefaultsInSwitch = 31,
    ImportExportDeclAtTopLevel = 32,
    AsyncFunctionInSingleStatementContext = 33,
    InvalidLineBreak = 34,
    StrictModeWith = 35,
    AwaitOutsideAsync = 36,
    UnNamedFunctionDecl = 37,
    DisallowedInContext = 38,
    PrivateFieldConstructor = 39,
    PublicFieldConstructor = 40,
    StrictDelete = 41,
    DeletePrivateField = 42,
    InvalidConstructor = 43,
    UnexpectedReserved = 44,
    StrictEvalArguments = 45,
    AwaitBindingIdentifier = 46,
    YieldBindingIdentifier = 47,
    UnexpectedStrictReserved = 48,
    YieldInParameter = 49,
    AwaitInParameter = 50,
    MetaNotInFunctionBody = 51,
    BadSuperCall = 52,
    UnexpectedSuper = 53,
    LoneSuper = 54,
    YieldReservedKeyword = 55,
    ContinuousNumericSeparator = 56,
    TrailingNumericSeparator = 57,
    ZeroDigitNumericSeparator = 58,
    StrictOctalLiteral = 59,
    InvalidLhsInAssignment = 60,
    DuplicateProto = 61,
    IllegalUseStrict = 62,
    StaticPrototype = 63,
    AccessorWrongArgs = 64,
    BadSetterRestParameter = 65,
    StrictLHSPrefixPostFix = 66,
    InvalidElisonInObjPropList = 67,
    ElementAfterRest = 68,
    RestDefaultInitializer = 69,
    ElementAfterSpread = 70,
    InvalidDestructuringTarget = 71,
    UnexpectedSurrogate = 72,
    MalformedEscape = 73,
    TemplateOctalLiteral = 74,
    NotBindable = 75,
    ParamAfterRest = 76,
    NoCatchOrFinally = 77,
    NewlineAfterThrow = 78,
    ParamDupe = 79,
    AsAfterImportStart = 80,
    LabelNoColon = 81,
    NonEmptyJSXExpression = 82,
    ExpectedJSXClosingTag = 83,
    AdjacentJSXElements = 84,
    InvalidJSXAttributeValue = 85,
    RestWithComma = 86,
    UndefinedUnicodeCodePoint = 87,
    HtmlCommentInModule = 88,
    InvalidCoverInitializedName = 89,
    TrailingDecorators = 90,
    GeneratorConstructor = 91,
    InvalidRestBindingPattern = 92,
}
export declare const ErrorMessages: {
    [key: string]: string;
};
export declare function constructError(parser: IParser, context: Context, index: number, line: number, column: number, description: string): void;
export declare function report(parser: IParser, type: Errors, ...params: string[]): void;
export declare function tolerant(parser: IParser, context: Context, type: Errors, ...params: string[]): void;
