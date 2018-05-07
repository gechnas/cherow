export declare const enum Token {
    Type = 255,
    PrecStart = 8,
    Precedence = 3840,
    IsIterationStatement = 16,
    Keyword = 4096,
    Reserved = 12288,
    FutureReserved = 20480,
    Contextual = 36864,
    IsIdentifier = 65536,
    IsAwait = 131072,
    IsAsync = 262144,
    ASI = 524288,
    IsInOrOf = 1048576,
    IsLogical = 2097152,
    IsEvalOrArguments = 4194304,
    IsBindingPattern = 8388608,
    IsShorthandProperty = 16777216,
    IsExpressionStart = 33554432,
    IsAssignOp = 67108864,
    IsBinaryOp = 167772160,
    IsUnaryOp = 301989888,
    IsUpdateOp = 570425344,
    IsYield = 1073741824,
    EndOfSource = 524288,
    Identifier = 33619969,
    NumericLiteral = 33554434,
    StringLiteral = 33554435,
    RegularExpression = 33554436,
    FalseKeyword = 33566725,
    TrueKeyword = 33566726,
    NullKeyword = 33566727,
    TemplateCont = 33554440,
    TemplateTail = 33554441,
    Arrow = 10,
    LeftParen = 50331659,
    LeftBrace = 41943052,
    Period = 16777229,
    Ellipsis = 14,
    RightBrace = 17301519,
    RightParen = 16,
    Semicolon = 17301521,
    Comma = 16777234,
    LeftBracket = 41943059,
    RightBracket = 20,
    Colon = 16777237,
    QuestionMark = 22,
    SingleQuote = 23,
    DoubleQuote = 24,
    JSXClose = 25,
    JSXAutoClose = 26,
    Increment = 570425371,
    Decrement = 570425372,
    Assign = 83886109,
    ShiftLeftAssign = 67108894,
    ShiftRightAssign = 67108895,
    LogicalShiftRightAssign = 67108896,
    ExponentiateAssign = 67108897,
    AddAssign = 67108898,
    SubtractAssign = 67108899,
    MultiplyAssign = 67108900,
    DivideAssign = 100663333,
    ModuloAssign = 67108902,
    BitwiseXorAssign = 67108903,
    BitwiseOrAssign = 67108904,
    BitwiseAndAssign = 67108905,
    TypeofKeyword = 302002218,
    DeleteKeyword = 302002219,
    VoidKeyword = 302002220,
    Negate = 301989933,
    Complement = 301989934,
    Add = 436209967,
    Subtract = 436209968,
    InKeyword = 168834865,
    InstanceofKeyword = 167786290,
    Multiply = 167774771,
    Modulo = 167774772,
    Divide = 167774773,
    Exponentiate = 167775030,
    LogicalAnd = 169869879,
    LogicalOr = 169869624,
    StrictEqual = 167773753,
    StrictNotEqual = 167773754,
    LooseEqual = 167773755,
    LooseNotEqual = 167773756,
    LessThanOrEqual = 167774013,
    GreaterThanOrEqual = 167774014,
    LessThan = 167774015,
    GreaterThan = 167774016,
    ShiftLeft = 167774273,
    ShiftRight = 167774274,
    LogicalShiftRight = 167774275,
    BitwiseAnd = 167773508,
    BitwiseOr = 167772997,
    BitwiseXor = 167773254,
    VarKeyword = 33566791,
    LetKeyword = 33574984,
    ConstKeyword = 33566793,
    BreakKeyword = 12362,
    CaseKeyword = 12363,
    CatchKeyword = 12364,
    ClassKeyword = 33566797,
    ContinueKeyword = 12366,
    DebuggerKeyword = 12367,
    DefaultKeyword = 12368,
    DoKeyword = 12369,
    ElseKeyword = 12370,
    ExportKeyword = 12371,
    ExtendsKeyword = 12372,
    FinallyKeyword = 12373,
    ForKeyword = 12374,
    FunctionKeyword = 33566808,
    IfKeyword = 12377,
    ImportKeyword = 33566810,
    NewKeyword = 33566811,
    ReturnKeyword = 12380,
    SuperKeyword = 33566813,
    SwitchKeyword = 33566814,
    ThisKeyword = 33566815,
    ThrowKeyword = 302002272,
    TryKeyword = 12385,
    WhileKeyword = 12402,
    WithKeyword = 12387,
    ImplementsKeyword = 20579,
    InterfaceKeyword = 20580,
    PackageKeyword = 20581,
    PrivateKeyword = 20582,
    ProtectedKeyword = 20583,
    PublicKeyword = 20584,
    StaticKeyword = 20585,
    YieldKeyword = 1107316842,
    AsKeyword = 36971,
    AsyncKeyword = 299116,
    AwaitKeyword = 33788013,
    ConstructorKeyword = 36974,
    GetKeyword = 36975,
    SetKeyword = 36976,
    FromKeyword = 36977,
    OfKeyword = 1085554,
    Hash = 115,
    Eval = 37814388,
    Arguments = 37814389,
    EnumKeyword = 12406,
    BigIntLiteral = 33554551,
    At = 120,
    JSXText = 121,
    KeyOfKeyword = 65658,
    ReadOnlyKeyword = 65659,
    IsKeyword = 65660,
}
export declare function tokenDesc(token: Token): string;
export declare function descKeyword(value: string): Token;
