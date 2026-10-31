/**
 * 完整作者 API 参考包：一个 TypeScript 类、集中四语、内联 Python 和少量原始资源。
 * 先读 README 的覆盖表，再按章节查写法；初学者仍应从 minimal-text 开始。
 * 这是生成 Python 的产品类，不是 TS 直接驱动硬件的 VM 扩展：不必为每个 opcode 写执行方法。
 * 导入包会执行作者的 JS 类；CLI 检查不是安全沙箱，也不证明代码可信。
 */
import type {
  ExtensionArgument,
  ExtensionBlock,
  ExtensionContext,
  ExtensionInfo,
  ExtensionSubcategory,
  MessageCatalog,
  NativeExtension,
  ProductDisplay,
  PythonTemplate,
} from "../../../../tools/sdk";

// MessageCatalog：语言代码 → 文案 key → 显示文字；每种声明语言必须有完全相同的 key 和 [参数]。
// 翻译名称、提示、分类、菜单显示文字；不翻译 opcode、参数名、菜单名、枚举 value 或生成代码。
export const messages = {
  "zh-cn": {
    "product.name": "作者 API 完整示例",
    "product.description": "查看类、四语、控件、端口、层级分类和全部 Python 规则写法",
    "group.values": "基础积木与菜单",
    "group.codegen": "初始化、分支与入口",
    "group.controls": "全部可生成控件",
    "group.resources": "资源、格式化与适配",
    "block.show_text": "显示文本 [TEXT]",
    "block.double_value": "[VALUE] 的两倍",
    "block.is_positive": "[VALUE] 大于零？",
    "block.repeat_text": "将 [TEXT] 重复 [COUNT] 次",
    "block.choose_text": "按 [MODE] 显示 [TEXT]",
    "block.log_text": "日志 [LEVEL] 内容 [TEXT]",
    "block.add_history": "将 [TEXT] 加入历史",
    "block.reset_history": "重置历史",
    "block.branch_store": "用 [STORE] 保存 [TEXT]",
    "block.start_thread": "主程序",
    "block.setup_demo": "程序准备",
    "block.on_demo": "注册示例回调",
    "block.run_callbacks": "调用示例回调",
    "block.pause": "等待 [SECONDS] 秒",
    "block.basic_controls": "数值 [NUMBER] 角度 [ANGLE] 条件 [FLAG] 颜色 [COLOR]",
    "block.sliders_one": "滑块 [FREE] 百分比 [PERCENT] 九十度 [DEGREE] 音量 [VOLUME]",
    "block.sliders_two": "范围一 [FIRST] 带符号 [SIGNED] 半圆 [HALF] 居中 [CENTER]",
    "block.sliders_three": "圆周 [ROUND] 范围二 [SECOND] 正负 [SIGNED] 亮度 [BRIGHTNESS]",
    "block.sliders_four": "范围三 [THIRD] 八档 [EIGHT] 三十 [THIRTY] 时间 [TIME]",
    "block.sliders_five": "千位 [THOUSAND] 千位正负 [SIGNED] 舵机 [SERVO] 十档 [TEN]",
    "block.rgb": "显示 RGB 分量 [COLOR]",
    "block.bitmap": "显示点阵参数 [MATRIX]",
    "block.line_masks": "巡线掩码 [FOUR] [SIX] [EIGHT]",
    "block.json_value": "显示静态 JSON 文本 [TEXT]",
    "block.compact_json": "兼容紧凑文本 [TEXT]",
    "block.assign_named": "将静态变量名 [NAME] 赋值为 [VALUE]",
    "block.member_name": "将固定工具名 [NAME] 对应变量赋值为 [VALUE]",
    "block.insert_parameters": "向固定列表 [PARAMS] 插入零",
    "block.legacy_color": "旧颜色名 [COLOR]",
    "block.show_resource": "显示包内 Python 资源",
    "block.read_port": "读取接口示例 [PORT]",
    "menu.keep": "保持原样",
    "menu.upper": "转大写",
    "menu.lower": "转小写",
    "menu.once": "一次",
    "menu.twice": "两次",
    "menu.info": "信息",
    "menu.warning": "警告",
    "menu.history": "文本历史",
    "menu.counter": "调用计数",
    "menu.move": "移动工具",
    "menu.stop": "停止工具",
    "menu.parameters": "两个参数",
    "menu.empty": "空列表",
    "menu.red": "红色",
    "menu.green": "绿色",
  },
  en: {
    "product.name": "Complete author API example",
    "product.description": "Class, localization, controls, ports, navigation and every Python rule field",
    "group.values": "Blocks and menus",
    "group.codegen": "Initialization, branches and entry points",
    "group.controls": "All code-generation controls",
    "group.resources": "Resources, formatting and variants",
    "block.show_text": "Print text [TEXT]",
    "block.double_value": "Double [VALUE]",
    "block.is_positive": "[VALUE] is positive?",
    "block.repeat_text": "Repeat [TEXT] [COUNT] times",
    "block.choose_text": "Print [TEXT] with [MODE]",
    "block.log_text": "Log [LEVEL] message [TEXT]",
    "block.add_history": "Add [TEXT] to history",
    "block.reset_history": "Reset history",
    "block.branch_store": "Store [TEXT] with [STORE]",
    "block.start_thread": "Main program",
    "block.setup_demo": "Prepare program",
    "block.on_demo": "Register example callback",
    "block.run_callbacks": "Call example callbacks",
    "block.pause": "Wait [SECONDS] seconds",
    "block.basic_controls": "Number [NUMBER] angle [ANGLE] condition [FLAG] color [COLOR]",
    "block.sliders_one": "Slider [FREE] percent [PERCENT] angle [DEGREE] volume [VOLUME]",
    "block.sliders_two": "Range one [FIRST] signed [SIGNED] half [HALF] centered [CENTER]",
    "block.sliders_three": "Circle [ROUND] range two [SECOND] signed [SIGNED] brightness [BRIGHTNESS]",
    "block.sliders_four": "Range three [THIRD] eight [EIGHT] thirty [THIRTY] time [TIME]",
    "block.sliders_five": "Thousand [THOUSAND] signed [SIGNED] servo [SERVO] ten [TEN]",
    "block.rgb": "Print RGB channels [COLOR]",
    "block.bitmap": "Print matrix parameters [MATRIX]",
    "block.line_masks": "Line masks [FOUR] [SIX] [EIGHT]",
    "block.json_value": "Print static JSON text [TEXT]",
    "block.compact_json": "Legacy compact text [TEXT]",
    "block.assign_named": "Set static variable name [NAME] to [VALUE]",
    "block.member_name": "Set fixed tool variable [NAME] to [VALUE]",
    "block.insert_parameters": "Insert zero into fixed list [PARAMS]",
    "block.legacy_color": "Legacy color name [COLOR]",
    "block.show_resource": "Print packaged Python resource",
    "block.read_port": "Read port example [PORT]",
    "menu.keep": "Keep",
    "menu.upper": "Uppercase",
    "menu.lower": "Lowercase",
    "menu.once": "Once",
    "menu.twice": "Twice",
    "menu.info": "Information",
    "menu.warning": "Warning",
    "menu.history": "Text history",
    "menu.counter": "Call counter",
    "menu.move": "Move tool",
    "menu.stop": "Stop tool",
    "menu.parameters": "Two parameters",
    "menu.empty": "Empty list",
    "menu.red": "Red",
    "menu.green": "Green",
  },
  "zh-tw": {
    "product.name": "作者 API 完整範例",
    "product.description": "查看類別、四語、控制項、連接埠、階層分類和全部 Python 規則寫法",
    "group.values": "基礎積木與選單",
    "group.codegen": "初始化、分支與入口",
    "group.controls": "全部可產生程式碼的控制項",
    "group.resources": "資源、格式化與適配",
    "block.show_text": "顯示文字 [TEXT]",
    "block.double_value": "[VALUE] 的兩倍",
    "block.is_positive": "[VALUE] 大於零？",
    "block.repeat_text": "將 [TEXT] 重複 [COUNT] 次",
    "block.choose_text": "以 [MODE] 顯示 [TEXT]",
    "block.log_text": "記錄 [LEVEL] 內容 [TEXT]",
    "block.add_history": "將 [TEXT] 加入歷史",
    "block.reset_history": "重設歷史",
    "block.branch_store": "用 [STORE] 儲存 [TEXT]",
    "block.start_thread": "主程式",
    "block.setup_demo": "程式準備",
    "block.on_demo": "註冊範例回呼",
    "block.run_callbacks": "呼叫範例回呼",
    "block.pause": "等待 [SECONDS] 秒",
    "block.basic_controls": "數值 [NUMBER] 角度 [ANGLE] 條件 [FLAG] 顏色 [COLOR]",
    "block.sliders_one": "滑桿 [FREE] 百分比 [PERCENT] 九十度 [DEGREE] 音量 [VOLUME]",
    "block.sliders_two": "範圍一 [FIRST] 正負 [SIGNED] 半圓 [HALF] 置中 [CENTER]",
    "block.sliders_three": "圓周 [ROUND] 範圍二 [SECOND] 正負 [SIGNED] 亮度 [BRIGHTNESS]",
    "block.sliders_four": "範圍三 [THIRD] 八段 [EIGHT] 三十 [THIRTY] 時間 [TIME]",
    "block.sliders_five": "千位 [THOUSAND] 千位正負 [SIGNED] 伺服 [SERVO] 十段 [TEN]",
    "block.rgb": "顯示 RGB 分量 [COLOR]",
    "block.bitmap": "顯示點陣參數 [MATRIX]",
    "block.line_masks": "循線遮罩 [FOUR] [SIX] [EIGHT]",
    "block.json_value": "顯示靜態 JSON 文字 [TEXT]",
    "block.compact_json": "相容緊湊文字 [TEXT]",
    "block.assign_named": "將靜態變數名稱 [NAME] 設為 [VALUE]",
    "block.member_name": "將固定工具名稱 [NAME] 對應變數設為 [VALUE]",
    "block.insert_parameters": "向固定清單 [PARAMS] 插入零",
    "block.legacy_color": "舊顏色名稱 [COLOR]",
    "block.show_resource": "顯示套件內 Python 資源",
    "block.read_port": "讀取連接埠範例 [PORT]",
    "menu.keep": "保持原樣",
    "menu.upper": "轉大寫",
    "menu.lower": "轉小寫",
    "menu.once": "一次",
    "menu.twice": "兩次",
    "menu.info": "資訊",
    "menu.warning": "警告",
    "menu.history": "文字歷史",
    "menu.counter": "呼叫計數",
    "menu.move": "移動工具",
    "menu.stop": "停止工具",
    "menu.parameters": "兩個參數",
    "menu.empty": "空清單",
    "menu.red": "紅色",
    "menu.green": "綠色",
  },
  ko: {
    "product.name": "작성자 API 전체 예제",
    "product.description": "클래스, 네 언어, 컨트롤, 포트, 하위 분류와 모든 Python 규칙 필드",
    "group.values": "기본 블록과 메뉴",
    "group.codegen": "초기화, 분기와 진입점",
    "group.controls": "코드 생성 지원 컨트롤",
    "group.resources": "리소스, 형식과 호환 방식",
    "block.show_text": "텍스트 [TEXT] 출력",
    "block.double_value": "[VALUE]의 두 배",
    "block.is_positive": "[VALUE]은 양수인가?",
    "block.repeat_text": "[TEXT]을(를) [COUNT]번 반복",
    "block.choose_text": "[MODE] 방식으로 [TEXT] 출력",
    "block.log_text": "[LEVEL] 로그 내용 [TEXT]",
    "block.add_history": "[TEXT]을(를) 기록에 추가",
    "block.reset_history": "기록 초기화",
    "block.branch_store": "[STORE]에 [TEXT] 저장",
    "block.start_thread": "메인 프로그램",
    "block.setup_demo": "프로그램 준비",
    "block.on_demo": "예제 콜백 등록",
    "block.run_callbacks": "예제 콜백 호출",
    "block.pause": "[SECONDS]초 기다리기",
    "block.basic_controls": "숫자 [NUMBER] 각도 [ANGLE] 조건 [FLAG] 색상 [COLOR]",
    "block.sliders_one": "슬라이더 [FREE] 백분율 [PERCENT] 각도 [DEGREE] 음량 [VOLUME]",
    "block.sliders_two": "범위 하나 [FIRST] 부호 [SIGNED] 반원 [HALF] 중앙 [CENTER]",
    "block.sliders_three": "원 [ROUND] 범위 둘 [SECOND] 부호 [SIGNED] 밝기 [BRIGHTNESS]",
    "block.sliders_four": "범위 셋 [THIRD] 여덟 단계 [EIGHT] 삼십 [THIRTY] 시간 [TIME]",
    "block.sliders_five": "천 [THOUSAND] 부호 [SIGNED] 서보 [SERVO] 열 단계 [TEN]",
    "block.rgb": "RGB 채널 [COLOR] 출력",
    "block.bitmap": "행렬 매개변수 [MATRIX] 출력",
    "block.line_masks": "라인 마스크 [FOUR] [SIX] [EIGHT]",
    "block.json_value": "정적 JSON 텍스트 [TEXT] 출력",
    "block.compact_json": "이전 압축 텍스트 [TEXT]",
    "block.assign_named": "정적 변수 이름 [NAME]에 [VALUE] 설정",
    "block.member_name": "고정 도구 변수 [NAME]에 [VALUE] 설정",
    "block.insert_parameters": "고정 목록 [PARAMS]에 영 삽입",
    "block.legacy_color": "이전 색상 이름 [COLOR]",
    "block.show_resource": "패키지 Python 리소스 출력",
    "block.read_port": "포트 예제 [PORT] 읽기",
    "menu.keep": "유지",
    "menu.upper": "대문자",
    "menu.lower": "소문자",
    "menu.once": "한 번",
    "menu.twice": "두 번",
    "menu.info": "정보",
    "menu.warning": "경고",
    "menu.history": "텍스트 기록",
    "menu.counter": "호출 횟수",
    "menu.move": "이동 도구",
    "menu.stop": "정지 도구",
    "menu.parameters": "매개변수 두 개",
    "menu.empty": "빈 목록",
    "menu.red": "빨강",
    "menu.green": "초록",
  },
} as const satisfies MessageCatalog;

// ProductDisplay：这里存文案 key，不再手写第二份名称；工具据此生成包卡片的四语元数据。
export const product = {
  name: "product.name", // 名称 key，必须存在于 messages 的每种语言。
  description: "product.description", // 可选简介 key；不是随意拼接的运行表达式。
  supportedLocales: ["zh-cn", "en", "zh-tw", "ko"], // 声明顺序不改变 opcode 或 Python。
} as const satisfies ProductDisplay;

export default class ApiShowcaseBlocks implements NativeExtension {
  // 只缓存语言无关的资源文本；不缓存 getInfo 的翻译，也不在构造时连接硬件。
  private cachedResource: string | null = null;

  /**
   * 宿主创建实例并注入 ExtensionContext，不由产品自己构造 context。
   * readonly context.variant 是 metadata.support 选出的适配，不是界面语言或代码生成语言。
   * 不支持的适配显式失败；生产包必须同时调整 getInfo 的端口与 getPython 的依赖、初始化。
   */
  constructor(private readonly context: ExtensionContext) {
    if (!["software", "hiwonder-dev-port", "hiwonder-dev-raw-io"].includes(context.variant)) {
      throw new Error(`API 示例不支持此适配：${context.variant}`);
    }
  }

  /**
   * ExtensionInfo：同步返回工具箱声明，语言切换时宿主会再次读取；不返回 Promise。
   * 每个可用 opcode 与 getPython 的同名 key 一一对应，分组对象不需要生成规则。
   */
  getInfo(): ExtensionInfo {
    // ExtensionArgument 的全部字段：type 是输入控件，不是积木形状。
    const textArgument: ExtensionArgument = {
      type: "string", // 普通文本槽；同一位置也能接合法 reporter。
      defaultValue: "Hello API", // 仅默认输入，不是固定运行值；类型可为 string/number/boolean。
      literal: false, // false／省略时由生成器处理引号转义；自由文本绝不能设 literal:true。
    };
    const blocks: Array<ExtensionBlock | ExtensionSubcategory> = [
      // 层级根导航：稳定 ID 不翻译，图标由原始 SVG 资源取得，不手工内嵌 base64。
      {
        subCategory: this.context.t(product.name),
        toolboxCategoryId: "apishowcase__root",
        toolboxIconURI: this.context.asset("assets/api-showcase.svg"),
      },
      {
        opcode: "show_text", // 工程保存的完整类型为 apishowcase_show_text，发布后保持稳定。
        blockType: "command", // 指令：上下拼接，模板生成语句；不是 reporter 或帽子。
        text: this.context.t("block.show_text"), // [TEXT] 必须与 arguments.TEXT 一致。
        arguments: { TEXT: textArgument }, // 参数名不能随语言翻译。
        blockIconURI: this.context.asset("assets/value.svg"), // 单块图标覆盖类的默认图标。
      },
      // 子导航的所有字段均实际使用；不能只放空分类或把其他产品的 ID 直接复制过来。
      {
        subCategory: this.context.t("group.values"),
        toolboxCategoryId: "apishowcase__values",
        toolboxParentId: "apishowcase__root", // 指向本包已声明的根导航。
        toolboxSubcategoryLabel: this.context.t("group.values"), // 子导航短标签，可翻译。
        toolboxIconURI: this.context.asset("assets/value.svg"),
      },
      {
        opcode: "double_value",
        blockType: "reporter", // 圆角表达式，接到其他参数槽，不生成 print。
        text: this.context.t("block.double_value"),
        disableMonitor: true, // 硬件/生成类不提供舞台实时监视。
        arguments: { VALUE: { type: "number", defaultValue: 3 } },
      },
      {
        opcode: "is_positive",
        blockType: "Boolean", // 六边形表达式，VM 标准拼写是大写 Boolean。
        text: this.context.t("block.is_positive"),
        arguments: { VALUE: { type: "number", defaultValue: 3 } },
        // SDK 的小写 'boolean' 是兼容输入，不用它演示新的积木形状。
      },
      {
        opcode: "repeat_text",
        blockType: "reporter",
        text: this.context.t("block.repeat_text"),
        arguments: {
          TEXT: textArgument,
          COUNT: {
            type: "number",
            defaultValue: 2,
            menu: "apishowcase_count",
            literal: false,
          },
        }, // menu 引用 getInfo.menus 的稳定键。
      },
      {
        opcode: "choose_text",
        blockType: "command",
        text: this.context.t("block.choose_text"),
        arguments: {
          TEXT: textArgument,
          MODE: {
            type: "string",
            defaultValue: "keep",
            menu: "apishowcase_case",
            literal: true,
          },
        }, // 仅可信固定枚举原样参与分支，显示文案可翻译。
      },
      {
        opcode: "log_text",
        blockType: "command",
        text: this.context.t("block.log_text"),
        arguments: {
          TEXT: textArgument,
          LEVEL: {
            type: "string",
            defaultValue: "logging.INFO",
            menu: "apishowcase_level",
            literal: true,
          },
        }, // 固定 Python 常量，不让任意文本变代码。
      },
      {
        subCategory: this.context.t("group.codegen"),
        toolboxCategoryId: "apishowcase__codegen",
        toolboxParentId: "apishowcase__root",
        toolboxSubcategoryLabel: this.context.t("group.codegen"),
      },
      {
        opcode: "add_history",
        blockType: "command",
        text: this.context.t("block.add_history"),
        arguments: { TEXT: textArgument },
      },
      { opcode: "reset_history", blockType: "command", text: this.context.t("block.reset_history") },
      {
        opcode: "branch_store",
        blockType: "command",
        text: this.context.t("block.branch_store"),
        arguments: {
          TEXT: textArgument,
          STORE: {
            type: "string",
            defaultValue: "history",
            menu: "apishowcase_store",
            literal: true,
          },
        },
      },
      {
        opcode: "start_thread",
        blockType: "hat", // 帽子：程序入口，不是每条命令都写一个 TS 函数。
        text: this.context.t("block.start_thread"),
        isEdgeActivated: false,
        // isEdgeActivated 是 VM 运行时声明；Python 的入口／事件语义还必须写 getPython。
      },
      {
        opcode: "setup_demo",
        blockType: "hat",
        text: this.context.t("block.setup_demo"),
        isEdgeActivated: false,
      },
      { opcode: "on_demo", blockType: "hat", text: this.context.t("block.on_demo"), isEdgeActivated: false },
      { opcode: "run_callbacks", blockType: "command", text: this.context.t("block.run_callbacks") },
      {
        opcode: "pause",
        blockType: "command",
        text: this.context.t("block.pause"),
        arguments: { SECONDS: { type: "number", defaultValue: 0.1 } },
      },
      {
        subCategory: this.context.t("group.controls"),
        toolboxCategoryId: "apishowcase__controls",
        toolboxParentId: "apishowcase__root",
        toolboxSubcategoryLabel: this.context.t("group.controls"),
      },
      {
        opcode: "basic_controls",
        blockType: "command",
        text: this.context.t("block.basic_controls"),
        arguments: {
          NUMBER: { type: "number", defaultValue: 60 }, // 数值 shadow。
          ANGLE: { type: "angle", defaultValue: 90 }, // 角度选择器，生成时显式 float 转换。
          FLAG: { type: "Boolean", defaultValue: true }, // 六边形参数槽，不是 blockType。
          COLOR: { type: "color", defaultValue: "#ff0000" }, // 普通颜色字符串。
        },
      },
      // 下面实际声明全部二十种滑块；数值范围与步进由软件内置 shadow 决定，不由模板定义。
      // defaultValue 仅作起始值，不是 min/max；不要仅凭 slider 名字猜硬件允许范围。
      {
        opcode: "sliders_one",
        blockType: "command",
        text: this.context.t("block.sliders_one"),
        arguments: {
          FREE: { type: "slider", defaultValue: 0 },
          PERCENT: { type: "slider100", defaultValue: 50 },
          DEGREE: { type: "slider90", defaultValue: 45 },
          VOLUME: { type: "slider127", defaultValue: 64 },
        },
      },
      {
        opcode: "sliders_two",
        blockType: "command",
        text: this.context.t("block.sliders_two"),
        arguments: {
          FIRST: { type: "slider150", defaultValue: 75 },
          SIGNED: { type: "slider150p", defaultValue: 0 },
          HALF: { type: "slider180", defaultValue: 90 },
          CENTER: { type: "slider180z", defaultValue: 0 },
        },
      },
      {
        opcode: "sliders_three",
        blockType: "command",
        text: this.context.t("block.sliders_three"),
        arguments: {
          ROUND: { type: "slider360", defaultValue: 180 },
          SECOND: { type: "slider200", defaultValue: 100 },
          SIGNED: { type: "slider200p", defaultValue: 0 },
          BRIGHTNESS: { type: "slider255", defaultValue: 128 },
        },
      },
      {
        opcode: "sliders_four",
        blockType: "command",
        text: this.context.t("block.sliders_four"),
        arguments: {
          THIRD: { type: "slider270", defaultValue: 135 },
          EIGHT: { type: "slider8", defaultValue: 4 },
          THIRTY: { type: "slider30", defaultValue: 15 },
          TIME: { type: "slider2500", defaultValue: 1000 },
        },
      },
      {
        opcode: "sliders_five",
        blockType: "command",
        text: this.context.t("block.sliders_five"),
        arguments: {
          THOUSAND: { type: "slider1000", defaultValue: 500 },
          SIGNED: { type: "slider1000p", defaultValue: 0 },
          SERVO: { type: "slider0180", defaultValue: 90 },
          TEN: { type: "slider10", defaultValue: 5 },
        },
      },
      {
        opcode: "rgb",
        blockType: "command",
        text: this.context.t("block.rgb"),
        arguments: { COLOR: { type: "square_color", defaultValue: "#ff0000" } },
      },
      {
        opcode: "bitmap",
        blockType: "command",
        text: this.context.t("block.bitmap"),
        arguments: { MATRIX: { type: "led_matrix", defaultValue: "0".repeat(128) } },
      }, // 16×8，不是 5×5 matrix。
      {
        opcode: "line_masks",
        blockType: "reporter",
        text: this.context.t("block.line_masks"),
        disableMonitor: true,
        arguments: {
          FOUR: { type: "line4", defaultValue: "00" }, // 保存字段 LINE4，十六进制两位。
          SIX: { type: "line6", defaultValue: "00" },
          EIGHT: { type: "line8", defaultValue: "00" },
        },
      },
      // 仅 UI 声明、尚未打通 Python shadow 取值的写法，不放进活动积木误导用户：
      // NOTE: {type: 'note', defaultValue: 60}；MATRIX: {type: 'matrix', defaultValue: '0'.repeat(25)}。
      // IMAGE 不是当前 ExtensionArgument 的完整公开能力，图标请用 blockIconURI/context.asset。
      {
        subCategory: this.context.t("group.resources"),
        toolboxCategoryId: "apishowcase__resources",
        toolboxParentId: "apishowcase__root",
        toolboxSubcategoryLabel: this.context.t("group.resources"),
      },
      {
        opcode: "json_value",
        blockType: "command",
        text: this.context.t("block.json_value"),
        arguments: { TEXT: { type: "largetext", defaultValue: '{"text": "Hello API"}' } },
      },
      {
        opcode: "compact_json",
        blockType: "command",
        text: this.context.t("block.compact_json"),
        arguments: { TEXT: { type: "largetext", defaultValue: "A B" } },
      },
      {
        opcode: "assign_named",
        blockType: "command",
        text: this.context.t("block.assign_named"),
        arguments: { NAME: { type: "string", defaultValue: "demo value" }, VALUE: { type: "number", defaultValue: 3 } },
      },
      {
        opcode: "member_name",
        blockType: "command",
        text: this.context.t("block.member_name"),
        arguments: {
          NAME: { type: "string", defaultValue: "demo.move", menu: "apishowcase_tool", literal: true },
          VALUE: { type: "number", defaultValue: 3 },
        },
      },
      {
        opcode: "insert_parameters",
        blockType: "command",
        text: this.context.t("block.insert_parameters"),
        arguments: {
          PARAMS: {
            type: "string",
            defaultValue: "[1, 2]",
            menu: "apishowcase_parameters",
            literal: true,
          },
        },
      },
      {
        opcode: "legacy_color",
        blockType: "reporter",
        text: this.context.t("block.legacy_color"),
        hideFromPalette: true, // 隐藏不等于删除：仍保留声明、参数和生成规则供旧工程恢复。
        arguments: { COLOR: { type: "string", defaultValue: "红", menu: "apishowcase_legacy_color" } },
      },
      { opcode: "show_resource", blockType: "command", text: this.context.t("block.show_resource") },
      {
        opcode: "read_port",
        blockType: "reporter",
        text: this.context.t("block.read_port"),
        disableMonitor: true,
        arguments: {
          PORT: {
            type: "string",
            menu: "apishowcase_port",
            // 缺省 namespace 时使用 metadata.namespace；第三参数用于明确历史前缀绑定。
            defaultValue: this.context.defaultPort("read_port", "PORT", "apishowcase"),
            literal: true,
          },
        }, // 此例端口值为经过配置限制的数字代码，不是任意 Python 表达式。
      },
    ];
    // 普通分组的写法是 {subCategory: this.context.t('group.values')}，没有 toolbox* 字段。
    // 它只插入标题；本完整参考实际使用层级导航。新产品不需要层级时改为普通标题即可。
    const portGroup =
      this.context.variant === "software"
        ? "apishowcase.virtual"
        : this.context.variant === "hiwonder-dev-port"
          ? "apishowcase.iic"
          : "apishowcase.raw";
    return {
      id: "apishowcase", // 活跃 namespace，必须与包声明相符；不是完整 moduleId。
      name: this.context.t(product.name), // 每次调用读取当前语言，不缓存翻译。
      color1: "#3857a6", // 主色。
      color2: "#304b90", // 次色。
      color3: "#263d76", // 边框色。
      menuIconURI: this.context.asset("assets/api-showcase.svg"), // 分类／菜单图标的资源内容。
      blockIconURI: this.context.asset("assets/api-showcase.svg"), // 未单独覆盖的积木默认图标。
      blocks, // 按数组顺序显示，不能包含空根或空子导航。
      menus: {
        apishowcase_count: {
          acceptReporters: true, // 允许接表达式，不等于 literal:true。
          items: [
            { text: this.context.t("menu.once"), value: "1" },
            { text: this.context.t("menu.twice"), value: "2" },
          ],
        },
        apishowcase_case: {
          acceptReporters: false,
          items: [
            { text: this.context.t("menu.keep"), value: "keep" },
            { text: this.context.t("menu.upper"), value: "upper" },
            { text: this.context.t("menu.lower"), value: "lower" },
          ],
        },
        apishowcase_level: {
          acceptReporters: false,
          items: [
            { text: this.context.t("menu.info"), value: "logging.INFO" },
            { text: this.context.t("menu.warning"), value: "logging.WARNING" },
          ],
        },
        apishowcase_store: {
          acceptReporters: false,
          items: [
            { text: this.context.t("menu.history"), value: "history" },
            { text: this.context.t("menu.counter"), value: "counter" },
          ],
        },
        apishowcase_tool: {
          acceptReporters: false,
          items: [
            { text: this.context.t("menu.move"), value: "demo.move" },
            { text: this.context.t("menu.stop"), value: "demo.stop" },
          ],
        },
        apishowcase_parameters: {
          acceptReporters: false,
          items: [
            { text: this.context.t("menu.parameters"), value: "[1, 2]" },
            { text: this.context.t("menu.empty"), value: "[]" },
          ],
        },
        apishowcase_legacy_color: {
          acceptReporters: false,
          items: [
            { text: this.context.t("menu.red"), value: "红" },
            { text: this.context.t("menu.green"), value: "绿" },
          ],
        },
        // ports(group) 返回当前适配允许的 {text,value}[]，显示文字可翻译，实际值不变。
        // 字符串菜单名不能代替 metadata.support 的端口组与 opcode.ARG 默认绑定。
        apishowcase_port: { acceptReporters: false, items: this.context.ports(portGroup) },
      },
    };
  }

  /**
   * PythonTemplate：opcode → 同步规则，按工程实际用到的积木收集，不在 TS 中执行 Python。
   * getInfo 和 getPython 必须用同一 variant，切换界面语言不能更改规则或菜单实际值。
   * 注释中的输出是默认参数的局部结果；完整程序还会收集依赖、初始化、帽子函数及启动语句。
   */
  getPython(): Record<string, PythonTemplate> {
    // python(path) 读取包内 UTF-8 文本并 trimEnd，不是部署文件或在 TS 里运行 Python。
    // 路径必须是模块根相对的字符串字面量，不允许绝对路径或 ..；缓存与语言无关。
    if (this.cachedResource === null) this.cachedResource = this.context.python("python/resource-demo.py");
    const rules: Record<string, PythonTemplate> = {
      show_text: { template: "print({TEXT})" }, // TEXT 已经是带安全转义的表达式，不再手工套双引号。
      double_value: { template: "({VALUE} * 2)" }, // reporter 只输出表达式，用括号保护运算优先级。
      is_positive: { template: "({VALUE} > 0)" }, // Boolean 也生成表达式，不附加 print 或冒号。
      repeat_text: {
        template: "({TEXT} * int({COUNT}))", // 连接表达式或未命中分支时的回退。
        templateSelector: {
          argument: "COUNT", // 指定依据哪个输入选择模板。
          matchInputCode: true, // 比较生成代码，如 1、2；不执行或计算表达式。
          cases: { "1": "{TEXT}", "2": "({TEXT} * 2)" }, // 只切 template，不切 imports 等其他字段。
        },
      },
      choose_text: {
        template: "print({TEXT})",
        templateSelector: {
          argument: "MODE",
          matchInputCode: false, // false／省略时比较固定枚举 value，不比较译文。
          cases: { upper: "print(({TEXT}).upper())", lower: "print(({TEXT}).lower())" },
        },
      },
      log_text: {
        template: "logging.log({LEVEL}, {TEXT})",
        imports: ["import logging"], // 按完整字符串去重；imports 不进行 {PORT} 这类参数替换。
      },
      add_history: {
        template: "apishowcase_history.append({TEXT})",
        variables: ['apishowcase_history = ["normal"]'], // 顶层普通初始化，按赋值左侧名称去重。
        setups: ['apishowcase_history.append("ready")'], // 主逻辑之前执行，按替换后的完整语句去重。
      },
      reset_history: {
        template: "apishowcase_history.clear()", // 每次执行的行为放 template。
        forcedVariables: [{ name: "apishowcase_history", code: "apishowcase_history = []" }],
        // name 是覆盖身份，code 是初始化代码；都支持参数替换。
        // forcedVariables 替换同名普通初始化，不是每次积木执行时重新定义变量。
      },
      branch_store: {
        template: "print({TEXT})",
        templateSelector: {
          argument: "STORE",
          matchInputCode: false,
          cases: {
            history: "apishowcase_history.append({TEXT})",
            counter: "apishowcase_counter[0] += 1",
          },
          variableCases: {
            // 与 cases 使用相同分支，只收集命中的初始化，不装入所有设备/工具。
            history: ["apishowcase_history = []"],
            counter: ["apishowcase_counter = [0]"],
          },
          // variableCases 的键必须已有对应 cases；没有命中时不额外收集变量。
        },
      },
      start_thread: {
        template: "", // 帽子函数体来自下方积木；空字符串仍是必需的 template 字段。
        imports:
          this.context.variant === "software"
            ? ["import time"]
            : ["import Hiwonder", "import time", "import Hiwonder_DEV"], // 软件示例不强加硬件 SDK；硬件入口展示多 import，同名条目统一去重。
        launcher: this.context.variant === "software" ? "{MAIN}()" : "Hiwonder.startMain({MAIN})",
        // {MAIN} 是实际入口函数名；多个入口会自动编号，不要把 start_main 写死。
        section: "main", // main 生成主函数，再输出 launcher；不是界面小分类。
      },
      setup_demo: { template: "", section: "setup" }, // 帽子下语句生成到顶层，不包 start_main。
      on_demo: {
        template: "",
        section: "main", // 自定义事件也必须声明 main，才会作为可执行入口收集。
        variables: ["apishowcase_callbacks = []"],
        entryTemplate: "def on_api_demo():", // 自定义事件函数头，不含函数体积木。
        entryFooter: "apishowcase_callbacks.append(on_api_demo)", // 与显式函数名一致，宿主同步重名编号。
        // entryTemplate 覆盖普通主入口规则；不要靠 isEdgeActivated 自动获得硬件事件订阅。
      },
      run_callbacks: {
        template: "for callback in apishowcase_callbacks:\n    callback()",
        variables: ["apishowcase_callbacks = []"],
      }, // Python 内部缩进由作者保证。
      pause: { template: "time.sleep({SECONDS})", imports: ["import time"] },
      basic_controls: { template: "print({NUMBER}, float({ANGLE}), {FLAG}, {COLOR})" },
      sliders_one: { template: "print({FREE}, {PERCENT}, {DEGREE}, {VOLUME})" },
      sliders_two: { template: "print({FIRST}, {SIGNED}, {HALF}, {CENTER})" },
      sliders_three: { template: "print({ROUND}, {SECOND}, {SIGNED}, {BRIGHTNESS})" },
      sliders_four: { template: "print({THIRD}, {EIGHT}, {THIRTY}, {TIME})" },
      sliders_five: { template: "print({THOUSAND}, {SIGNED}, {SERVO}, {TEN})" },
      rgb: { template: "print({COLOR.rgb})" }, // #ff0000 → 0xff,0x00,0x00；用于接收分量的接口。
      bitmap: { template: "print({MATRIX.bitmap})" }, // led_matrix 的 128 位转为既有位图参数。
      line_masks: { template: "(0x{FOUR}, 0x{SIX}, 0x{EIGHT})" }, // LINE 控件已保存十六进制，不再加引号。
      json_value: { template: "print({TEXT.jsonValue})" }, // 静态文本重新 JSON 编码；不求值任意 Python 对象。
      compact_json: { template: "print({TEXT.compactJson})" }, // 删除空白后再编码，连字符串内部空格也会删！
      assign_named: { template: "{NAME.identifier} = {VALUE}" }, // 静态名称转合法 Python 标识符。
      member_name: { template: "apishowcase_{NAME.memberName} = {VALUE}" },
      // memberName 仅取工具路径末段并去双引号，不修复非法标识符；本例限制为固定菜单。
      insert_parameters: { template: "print({PARAMS.compactHead}0,{PARAMS.compactTail})" },
      // compactHead/Tail 删除 ASCII 空格后取首字符/剩余内容；默认 [1, 2] → print([0,1,2])。
      // 不是 Python 列表解析器，不对自由文本或动态 reporter 使用这种兼容拼接。
      legacy_color: { template: "{COLOR.colorName}" }, // 旧中文颜色值转换，不是界面多语言翻译 API。
      show_resource: {
        template: this.cachedResource,
        runtimeFiles: ["python/resource-demo.py"], // 当前只保留声明，不自动复制到设备或追加 import。
      },
    };
    // 同一包展示三种适配；只切端口标签而不切依赖、构造与读取方法是不完整迁移。
    if (this.context.variant === "software") {
      rules.read_port = {
        imports: ["import math"],
        variables: ["apishowcase_virtual_{PORT} = math.sqrt({PORT})"],
        template: "apishowcase_virtual_{PORT}",
      }; // 模拟值，不伪装成硬件读数。
    } else if (this.context.variant === "hiwonder-dev-port") {
      rules.read_port = {
        imports: ["import Hiwonder_DEV"],
        variables: ["apishowcase_ir_{PORT} = Hiwonder_DEV.DEV_IR(Hiwonder_DEV.Port({PORT}))"],
        template: "apishowcase_ir_{PORT}.read_state()",
      }; // Aimech：Port 包装接口。
    } else {
      rules.read_port = {
        imports: ["import Hiwonder_DEV"],
        variables: ["apishowcase_ir_{PORT} = Hiwonder_DEV.DEV_IR({PORT})"],
        template: "apishowcase_ir_{PORT}.read()",
      }; // MiniHexa：原始 IO，不套 Port。
    }
    // 对象名包含端口，防止变量去重把不同接口合并；真实 SDK 仍须按设备文档和实机验收。
    return rules;
  }

  /**
   * 可选 dispose 在卸载／替换时由宿主调用；可返回 void 或 Promise<void>。
   * 本例展示 Promise 形态并清除自己的缓存，不新建无用监听或硬件连接。
   * 真实包若创建订阅、计时器、连接，应在此释放自己的资源，不清理其他包。
   * 重复调用保持无害；此钩子不是硬件急停，也不能保证进程崩溃时一定执行。
   */
  dispose(): Promise<void> {
    this.cachedResource = null;
    return Promise.resolve();
    // 无异步资源时也可写 dispose (): void { this.cachedResource = null; }，无需两个同名方法。
  }
}
