// 原生 TS 作者参考：单类集中声明四语、积木、菜单和 Python；默认演示不连接硬件。
// 本文件是“写法参考”，不是要求每个新包都保留全部积木；从 show_text 开始按需删减。
// SDK 类型只参与编译，不打包为运行时依赖；不要增加运行期 npm 导入或拆成多个 TS 入口。
import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 文案按语言集中维护。key 是稳定标识；[TEXT] 等占位符必须与 arguments 中的参数名一致。
// 声明支持的每种语言都须覆盖全部 key；翻译显示文字，不翻译 opcode、参数名或菜单 value。
export const messages = {
    'zh-cn': {
        'product.name': '文本演示',
        'product.description': '原生类、控件与 Python 生成规则参考',
        'group.values': '参数、菜单与表达式',
        'group.generation': '依赖、入口与事件',
        'group.resources': '资源和已有专用控件',
        'block.show_text': '显示文本 [TEXT]',
        'block.double_value': '[VALUE] 的两倍',
        'block.is_positive': '[VALUE] 是正数',
        'block.repeat_text': '将文本 [TEXT] 重复 [COUNT] 次',
        'block.choose_text': '以 [MODE] 方式显示 [TEXT]',
        'block.log_text': '记录 [LEVEL] 日志 [TEXT]',
        'block.add_history': '添加演示记录 [TEXT]',
        'block.reset_history': '清空演示记录',
        'block.start_thread': '当主程序启动时（需要 Hiwonder SDK）',
        'block.setup_demo': '当初始化时',
        'block.on_demo': '当演示回调被调用时',
        'block.pause': '等待 [SECONDS] 秒',
        'block.show_resource': '显示 Python 资源中的固定文本',
        'block.show_controls': '显示 数值 [NUMBER] 角度 [ANGLE] 布尔 [FLAG] 颜色 [COLOR]',
        'block.show_sliders': '显示 亮度 [BRIGHTNESS] 有符号数值 [SIGNED]',
        'block.show_rgb': '显示 RGB 分量 [COLOR]',
        'block.show_bitmap': '显示点阵位图 [MATRIX]',
        'block.line_masks': '巡线位掩码 四路 [FOUR] 六路 [SIX] 八路 [EIGHT]',
        'block.show_json': '显示静态 JSON 文本 [TEXT]',
        'block.show_compact': '显示去空白编码 [TEXT]',
        'block.assign_named': '设置命名变量 [NAME] 为 [VALUE]',
        'block.legacy_color': '旧颜色名称 [COLOR]',
        'block.read_light': '接口 [PORT] 光敏值（SDK 示例）',
        'menu.repeat.once': '一次',
        'menu.repeat.twice': '两次',
        'menu.case.keep': '原样',
        'menu.case.upper': '大写',
        'menu.case.lower': '小写',
        'menu.level.info': '信息',
        'menu.level.warning': '警告',
        'menu.color.red': '红色',
        'menu.color.green': '绿色'
    },
    en: {
        'product.name': 'Text demo',
        'product.description': 'Native class, controls and Python generation reference',
        'group.values': 'Arguments, menus and expressions',
        'group.generation': 'Dependencies, entry points and events',
        'group.resources': 'Resources and existing custom controls',
        'block.show_text': 'Show text [TEXT]',
        'block.double_value': 'Double [VALUE]',
        'block.is_positive': '[VALUE] is positive',
        'block.repeat_text': 'Repeat text [TEXT] [COUNT] times',
        'block.choose_text': 'Show [TEXT] using [MODE]',
        'block.log_text': 'Log [TEXT] at [LEVEL] level',
        'block.add_history': 'Add demo record [TEXT]',
        'block.reset_history': 'Clear demo records',
        'block.start_thread': 'When main program starts (requires Hiwonder SDK)',
        'block.setup_demo': 'When initializing',
        'block.on_demo': 'When the demo callback is called',
        'block.pause': 'Wait [SECONDS] seconds',
        'block.show_resource': 'Show fixed text from the Python resource',
        'block.show_controls': 'Show number [NUMBER] angle [ANGLE] Boolean [FLAG] color [COLOR]',
        'block.show_sliders': 'Show brightness [BRIGHTNESS] signed value [SIGNED]',
        'block.show_rgb': 'Show RGB channels [COLOR]',
        'block.show_bitmap': 'Show LED bitmap [MATRIX]',
        'block.line_masks': 'Line masks: four [FOUR] six [SIX] eight [EIGHT]',
        'block.show_json': 'Show static JSON text [TEXT]',
        'block.show_compact': 'Show whitespace-stripped encoding [TEXT]',
        'block.assign_named': 'Set named variable [NAME] to [VALUE]',
        'block.legacy_color': 'Legacy color name [COLOR]',
        'block.read_light': 'Port [PORT] light value (SDK example)',
        'menu.repeat.once': 'Once',
        'menu.repeat.twice': 'Twice',
        'menu.case.keep': 'Unchanged',
        'menu.case.upper': 'Uppercase',
        'menu.case.lower': 'Lowercase',
        'menu.level.info': 'Info',
        'menu.level.warning': 'Warning',
        'menu.color.red': 'Red',
        'menu.color.green': 'Green'
    },
    'zh-tw': {
        'product.name': '文字示範',
        'product.description': '原生類別、控制項與 Python 產生規則參考',
        'group.values': '參數、選單與運算式',
        'group.generation': '相依項、入口與事件',
        'group.resources': '資源及現有專用控制項',
        'block.show_text': '顯示文字 [TEXT]',
        'block.double_value': '[VALUE] 的兩倍',
        'block.is_positive': '[VALUE] 是正數',
        'block.repeat_text': '將文字 [TEXT] 重複 [COUNT] 次',
        'block.choose_text': '以 [MODE] 方式顯示 [TEXT]',
        'block.log_text': '記錄 [LEVEL] 日誌 [TEXT]',
        'block.add_history': '新增示範紀錄 [TEXT]',
        'block.reset_history': '清空示範紀錄',
        'block.start_thread': '當主程式啟動時（需要 Hiwonder SDK）',
        'block.setup_demo': '當初始化時',
        'block.on_demo': '當示範回呼被呼叫時',
        'block.pause': '等待 [SECONDS] 秒',
        'block.show_resource': '顯示 Python 資源中的固定文字',
        'block.show_controls': '顯示 數值 [NUMBER] 角度 [ANGLE] 布林 [FLAG] 顏色 [COLOR]',
        'block.show_sliders': '顯示 亮度 [BRIGHTNESS] 有符號數值 [SIGNED]',
        'block.show_rgb': '顯示 RGB 分量 [COLOR]',
        'block.show_bitmap': '顯示點陣位圖 [MATRIX]',
        'block.line_masks': '循線位元遮罩 四路 [FOUR] 六路 [SIX] 八路 [EIGHT]',
        'block.show_json': '顯示靜態 JSON 文字 [TEXT]',
        'block.show_compact': '顯示移除空白的編碼 [TEXT]',
        'block.assign_named': '設定具名變數 [NAME] 為 [VALUE]',
        'block.legacy_color': '舊顏色名稱 [COLOR]',
        'block.read_light': '介面 [PORT] 光敏值（SDK 範例）',
        'menu.repeat.once': '一次',
        'menu.repeat.twice': '兩次',
        'menu.case.keep': '原樣',
        'menu.case.upper': '大寫',
        'menu.case.lower': '小寫',
        'menu.level.info': '資訊',
        'menu.level.warning': '警告',
        'menu.color.red': '紅色',
        'menu.color.green': '綠色'
    },
    ko: {
        'product.name': '텍스트 예제',
        'product.description': '네이티브 클래스, 컨트롤 및 Python 생성 규칙 참고',
        'group.values': '인수, 메뉴 및 표현식',
        'group.generation': '의존성, 진입점 및 이벤트',
        'group.resources': '리소스 및 기존 사용자 정의 컨트롤',
        'block.show_text': '텍스트 표시 [TEXT]',
        'block.double_value': '[VALUE]의 두 배',
        'block.is_positive': '[VALUE]은(는) 양수',
        'block.repeat_text': '텍스트 [TEXT]을(를) [COUNT]번 반복',
        'block.choose_text': '[MODE] 방식으로 [TEXT] 표시',
        'block.log_text': '[LEVEL] 수준으로 [TEXT] 기록',
        'block.add_history': '예제 기록 [TEXT] 추가',
        'block.reset_history': '예제 기록 지우기',
        'block.start_thread': '메인 프로그램 시작 시 (Hiwonder SDK 필요)',
        'block.setup_demo': '초기화 시',
        'block.on_demo': '예제 콜백 호출 시',
        'block.pause': '[SECONDS]초 기다리기',
        'block.show_resource': 'Python 리소스의 고정 텍스트 표시',
        'block.show_controls': '숫자 [NUMBER] 각도 [ANGLE] 불리언 [FLAG] 색상 [COLOR] 표시',
        'block.show_sliders': '밝기 [BRIGHTNESS] 부호 있는 값 [SIGNED] 표시',
        'block.show_rgb': 'RGB 성분 [COLOR] 표시',
        'block.show_bitmap': 'LED 비트맵 [MATRIX] 표시',
        'block.line_masks': '라인 비트마스크 4채널 [FOUR] 6채널 [SIX] 8채널 [EIGHT]',
        'block.show_json': '정적 JSON 텍스트 [TEXT] 표시',
        'block.show_compact': '공백 제거 인코딩 [TEXT] 표시',
        'block.assign_named': '이름 있는 변수 [NAME]을(를) [VALUE](으)로 설정',
        'block.legacy_color': '기존 색상 이름 [COLOR]',
        'block.read_light': '포트 [PORT] 조도 값 (SDK 예제)',
        'menu.repeat.once': '한 번',
        'menu.repeat.twice': '두 번',
        'menu.case.keep': '그대로',
        'menu.case.upper': '대문자',
        'menu.case.lower': '소문자',
        'menu.level.info': '정보',
        'menu.level.warning': '경고',
        'menu.color.red': '빨강',
        'menu.color.green': '초록'
    }
} as const;

// 同一份名称／简介用于工具箱和发行卡片；值是 messages 的 key，不是显示文字。
export const product = {
    name: 'product.name',
    description: 'product.description',
    // 中文必需；这里声明四语，检查工具会要求四语全部 key 和占位符完整。
    supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']
} as const;

export default class TextDemoBlocks implements NativeExtension {
    // context 由宿主注入；private/readonly 是 TS 约束，不是新增文件或硬件权限。
    // 构造时只保存上下文和检查适配标识，不固定译文、不打开设备。
    constructor (private readonly context: ExtensionContext) {
        if (!['text-demo', 'hiwonder-dev-port'].includes(context.variant)) {
            throw new Error('文本参考包不支持此适配：' + context.variant);
        }
    }

    // 每次同步返回当前语言的声明；语言切换会重读，不返回 Promise、不执行设备逻辑。
    getInfo (): ExtensionInfo {
        const blocks: ExtensionInfo['blocks'] = [
            {
                // opcode 决定完整保存类型 textdemo_show_text，发布后不随文案或语言改名。
                opcode: 'show_text',
                // command 为上下可拼接指令；其余为 reporter（圆角）、Boolean（六边形）、hat（帽子）。
                // 大小写敏感：不要把 SDK 中残留的小写 boolean 当作 VM 六边形类型。
                blockType: 'command',
                // [TEXT] 对应下方 arguments.TEXT，翻译可以换顺序，不能换参数名。
                text: this.context.t('block.show_text'),
                // 单块图标覆盖 getInfo 的默认图标；路径从模块根起算，作者保存原始 SVG。
                blockIconURI: this.context.asset('assets/text-demo.svg'),
                arguments: {
                    TEXT: {
                        // type 决定输入控件；string 的 Python 引号由生成器负责。
                        type: 'string',
                        // defaultValue 是新拖出积木的初值，不会覆盖旧工程里用户已保存的内容。
                        defaultValue: '你好，课程',
                        // literal=false 表示正常生成字符串；自由文本绝不能按代码原样拼接。
                        literal: false
                    }
                }
            },
            // 普通 subCategory 仅在同一工具箱内插入标题，不自动拆出侧栏子分类。
            {subCategory: this.context.t('group.values')},
            {
                opcode: 'double_value',
                blockType: 'reporter',
                text: this.context.t('block.double_value'),
                // 禁用 reporter 监视器；舞台不会读取设备值，Python 规则才是生成来源。
                disableMonitor: true,
                arguments: {VALUE: {type: 'number', defaultValue: 3}}
            },
            {
                opcode: 'is_positive',
                blockType: 'Boolean',
                text: this.context.t('block.is_positive'),
                arguments: {VALUE: {type: 'number', defaultValue: 1}}
            },
            {
                opcode: 'repeat_text',
                blockType: 'reporter',
                text: this.context.t('block.repeat_text'),
                arguments: {
                    TEXT: {type: 'string', defaultValue: 'Hi'},
                    // menu 引用本类下方声明的菜单名；数值菜单允许接入计算表达式。
                    COUNT: {type: 'number', defaultValue: 2, menu: 'textdemo_repeat_count'}
                }
            },
            {
                opcode: 'choose_text',
                blockType: 'command',
                text: this.context.t('block.choose_text'),
                arguments: {
                    TEXT: {type: 'string', defaultValue: 'Hello'},
                    // 默认值是菜单 value，不是翻译后的“原样”。
                    MODE: {type: 'string', defaultValue: 'keep', menu: 'textdemo_case'}
                }
            },
            {
                opcode: 'log_text',
                blockType: 'command',
                text: this.context.t('block.log_text'),
                arguments: {
                    // 仅可信闭合枚举可 literal=true；菜单不允许 reporter，不能输入任意 Python。
                    LEVEL: {type: 'string', defaultValue: 'logging.INFO', menu: 'textdemo_log_level', literal: true},
                    TEXT: {type: 'string', defaultValue: 'Hello'}
                }
            },
            {subCategory: this.context.t('group.generation')},
            {
                opcode: 'add_history',
                blockType: 'command',
                text: this.context.t('block.add_history'),
                arguments: {TEXT: {type: 'string', defaultValue: 'Hello'}}
            },
            {
                opcode: 'reset_history',
                blockType: 'command',
                text: this.context.t('block.reset_history')
            },
            {
                opcode: 'start_thread',
                blockType: 'hat',
                text: this.context.t('block.start_thread'),
                // Python 入口不是舞台边沿轮询事件；此属性也不会自动注册硬件回调。
                isEdgeActivated: false
            },
            {
                opcode: 'setup_demo',
                blockType: 'hat',
                text: this.context.t('block.setup_demo'),
                isEdgeActivated: false
            },
            {
                opcode: 'on_demo',
                blockType: 'hat',
                text: this.context.t('block.on_demo'),
                isEdgeActivated: false
            },
            {
                opcode: 'pause',
                blockType: 'command',
                text: this.context.t('block.pause'),
                arguments: {SECONDS: {type: 'number', defaultValue: 1}}
            },
            {subCategory: this.context.t('group.resources')},
            {
                opcode: 'show_resource',
                blockType: 'command',
                text: this.context.t('block.show_resource')
            },
            {
                opcode: 'show_controls',
                blockType: 'command',
                text: this.context.t('block.show_controls'),
                arguments: {
                    NUMBER: {type: 'number', defaultValue: 60},
                    ANGLE: {type: 'angle', defaultValue: 90},
                    // 这是参数类型 Boolean，不是本积木的 blockType；它提供布尔连接槽。
                    FLAG: {type: 'Boolean', defaultValue: true},
                    COLOR: {type: 'color', defaultValue: '#ff0000'}
                }
                // note 音符与基础 matrix 的 UI 声明写法分别为：
                // NOTE: {type: 'note', defaultValue: 60}
                // PATTERN: {type: 'matrix', defaultValue: '0000000000000000000000000'}
                // 但当前 Python 生成器尚未专门读取 NOTE/MATRIX shadow 字段，会落到默认值回退。
                // 因此这里仅注释说明，不把它们放入“已支持实际生成”的示例；不要误认为编辑有效。
                // 基础 matrix 是 5×5；下方已适配的 led_matrix 是 16×8，不能混用。
            },
            {
                opcode: 'show_sliders',
                blockType: 'command',
                text: this.context.t('block.show_sliders'),
                arguments: {
                    BRIGHTNESS: {type: 'slider255', defaultValue: 128},
                    SIGNED: {type: 'slider150p', defaultValue: 0}
                }
                // 其他已有滑块：slider/slider100/slider90/slider127/slider150/slider180/
                // slider180z/slider360/slider200/slider200p/slider270/slider8/slider30/
                // slider2500/slider1000/slider1000p/slider0180/slider10。
                // 不凭名字猜范围和步进；先参考已有产品。这里不为每个范围重复建一块。
            },
            {
                opcode: 'show_rgb',
                blockType: 'command',
                text: this.context.t('block.show_rgb'),
                arguments: {COLOR: {type: 'square_color', defaultValue: '#ff0000'}}
            },
            {
                opcode: 'show_bitmap',
                blockType: 'command',
                text: this.context.t('block.show_bitmap'),
                arguments: {
                    // 保存字段为 LEDMATRIX；默认值是 16×8=128 位，不是图标路径。
                    MATRIX: {type: 'led_matrix', defaultValue: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'}
                }
            },
            {
                opcode: 'line_masks',
                blockType: 'reporter',
                text: this.context.t('block.line_masks'),
                disableMonitor: true,
                arguments: {
                    // LINE4/6/8 shadow 保存两位十六进制字符串；通道含义仍由真实 SDK 定义。
                    FOUR: {type: 'line4', defaultValue: '00'},
                    SIX: {type: 'line6', defaultValue: '00'},
                    EIGHT: {type: 'line8', defaultValue: '00'}
                }
            },
            {
                opcode: 'show_json',
                blockType: 'command',
                text: this.context.t('block.show_json'),
                arguments: {TEXT: {type: 'largetext', defaultValue: '{"text": "Hello world"}'}}
            },
            {
                opcode: 'show_compact',
                blockType: 'command',
                text: this.context.t('block.show_compact'),
                arguments: {TEXT: {type: 'largetext', defaultValue: 'A B'}}
            },
            {
                opcode: 'assign_named',
                blockType: 'command',
                text: this.context.t('block.assign_named'),
                arguments: {
                    NAME: {type: 'string', defaultValue: 'demo value'},
                    VALUE: {type: 'number', defaultValue: 3}
                }
            },
            {
                // 仅用于示范旧颜色值转换；新模块无此兼容需要时不保留这个积木。
                opcode: 'legacy_color',
                blockType: 'reporter',
                text: this.context.t('block.legacy_color'),
                hideFromPalette: true,
                arguments: {COLOR: {type: 'string', defaultValue: '红', menu: 'textdemo_legacy_color'}}
            },
            {
                // 示例隐藏旧名：工具箱不展示，但旧工程恢复仍需保留参数、菜单和 Python 规则。
                opcode: 'old_show_text',
                blockType: 'command',
                text: this.context.t('block.show_text'),
                hideFromPalette: true,
                arguments: {TEXT: {type: 'string', defaultValue: 'Hello'}}
            }
        ];
        const menus: NonNullable<ExtensionInfo['menus']> = {
            textdemo_repeat_count: {
                // true 允许将 reporter 表达式接进菜单输入；和 literal 是独立配置。
                acceptReporters: true,
                items: [
                    {text: this.context.t('menu.repeat.once'), value: '1'},
                    {text: this.context.t('menu.repeat.twice'), value: '2'}
                ]
            },
            textdemo_case: {
                // false 是固定枚举，仅显示 items 中的值；并不是设备支持范围开关。
                acceptReporters: false,
                items: [
                    {text: this.context.t('menu.case.keep'), value: 'keep'},
                    {text: this.context.t('menu.case.upper'), value: 'upper'},
                    {text: this.context.t('menu.case.lower'), value: 'lower'}
                ]
            },
            textdemo_log_level: {
                acceptReporters: false,
                items: [
                    // text 翻译；value 是合法 Python 枚举，任何语言都不能改成显示文字。
                    {text: this.context.t('menu.level.info'), value: 'logging.INFO'},
                    {text: this.context.t('menu.level.warning'), value: 'logging.WARNING'}
                ]
            },
            textdemo_legacy_color: {
                acceptReporters: false,
                items: [
                    // 历史协议值恰好是中文，并不意味着切换语言时可以翻译 value。
                    {text: this.context.t('menu.color.red'), value: '红'},
                    {text: this.context.t('menu.color.green'), value: '绿'}
                ]
            }
        };

        // 硬件适配是可选分支；默认 text-demo 不访问端口配置，更不读取设备。
        // 启用前按本示例 README 配置 variant、端口组和绑定，不能只在这里增加下拉菜单。
        if (this.context.variant === 'hiwonder-dev-port') {
            blocks.push({
                opcode: 'read_light',
                blockType: 'reporter',
                text: this.context.t('block.read_light'),
                disableMonitor: true,
                arguments: {
                    PORT: {
                        type: 'string',
                        menu: 'textdemo_iic_port',
                        // 参数依次为 opcode、参数名、活跃 namespace；缺绑定会报错，不会选首项。
                        defaultValue: this.context.defaultPort('read_light', 'PORT', 'textdemo'),
                        // 当前 SDK Port 接受数字代码；不可照抄到需要字符串名称的其他驱动。
                        literal: true
                    }
                }
            });
            // ports 只读取当前主控允许的端口表；返回的 text 本地化、value 不翻译。
            menus.textdemo_iic_port = {acceptReporters: false, items: this.context.ports('sensor.aimech_iicport')};
        }

        return {
            // 必须属于 metadata.namespace(s) 及主控允许的前缀，与 metadata.id 不是一回事。
            id: 'textdemo',
            name: this.context.t(product.name),
            color1: '#4b6cb7', // 主色。
            color2: '#405c99', // 次色。
            color3: '#324777', // 边框色。
            menuIconURI: this.context.asset('assets/text-demo.svg'), // 分类图标。
            blockIconURI: this.context.asset('assets/text-demo.svg'), // 全类积木的默认图标。
            blocks, // 顺序决定工具箱排列；包括积木与普通分组标题。
            menus // 参数通过稳定菜单名引用；同前缀下避免与其他模块的菜单重名。
        };

        // 独立层级导航仅在确实需要时替换普通分组，不要默认污染普通模块分类：
        // {
        //     subCategory: this.context.t('product.name'), // 根分类的完整显示名。
        //     toolboxCategoryId: 'textdemo__reference', // 稳定根 ID，不翻译。
        //     toolboxIconURI: this.context.asset('assets/text-demo.svg') // 根分类图标。
        // },
        // {
        //     subCategory: this.context.t('group.resources'), // 子分类完整显示名。
        //     toolboxCategoryId: 'textdemo__reference__resources', // 唯一子 ID。
        //     toolboxParentId: 'textdemo__reference', // 指向同包的根 ID。
        //     toolboxSubcategoryLabel: this.context.t('group.resources') // 子导航短标签。
        // }
        // 每个分类之后必须有实际积木；上面只是替换写法，不在默认 getInfo 中启用。
    }

    // 返回 opcode → 规则，依赖只在项目实际使用相应积木时收集；本方法不运行 Python。
    // Record 的 key 必须与 getInfo 的 opcode 一致，普通、隐藏及可选适配分支均须匹配。
    getPython (): Record<string, PythonTemplate> {
        const rules: Record<string, PythonTemplate> = {
            show_text: {
                // command 模板是语句。{TEXT} 已包含正常字符串转义，不能再套双引号。
                template: 'print({TEXT})'
            },
            double_value: {
                // reporter 模板是表达式，不加 print；用括号保护接入其他表达式时的优先级。
                template: '({VALUE} * 2)'
            },
            is_positive: {
                // Boolean 模板仍是 Python 表达式，积木形状由 getInfo 决定。
                template: '({VALUE} > 0)'
            },
            repeat_text: {
                template: '({TEXT} * {COUNT})', // 未命中 cases 或连接其他表达式时使用。
                templateSelector: {
                    argument: 'COUNT', // 检查哪个参数。
                    matchInputCode: true, // 按生成后的代码精确比较，而不是按菜单显示名。
                    cases: {'1': '{TEXT}', '2': '({TEXT} * 2)'} // 只替换 template，不切换 imports 等字段。
                }
            },
            choose_text: {
                template: 'print({TEXT})',
                templateSelector: {
                    argument: 'MODE',
                    // false／省略时匹配原始枚举 value；切换四语不影响 keep/upper/lower。
                    matchInputCode: false,
                    cases: {
                        upper: 'print(({TEXT}).upper())',
                        lower: 'print(({TEXT}).lower())'
                    }
                }
            },
            log_text: {
                template: 'logging.log({LEVEL}, {TEXT})', // LEVEL 是可信字面枚举，TEXT 正常转义。
                imports: ['import logging'] // 导入按字符串去重；这里不能使用 {PORT} 等参数占位符。
            },
            add_history: {
                template: 'textdemo_history.append({TEXT})',
                // variables 在函数前集中初始化，按赋值左侧变量名去重；同名普通项第一个保留。
                variables: ['textdemo_history = []'],
                // setups 在顶层、入口函数前执行；按替换后的完整语句去重，而不是按函数名去重。
                setups: ['textdemo_history.append("ready")']
            },
            reset_history: {
                template: 'textdemo_history.clear()',
                // forcedVariables 强制替换同名普通初始化，不是“每次积木执行时”重新定义。
                forcedVariables: [{
                    name: 'textdemo_history', // 去重／替换身份；name 和 code 都可按参数替换。
                    code: 'textdemo_history = []' // 写入初始化区的 Python，不是 TS 代码。
                }]
            },
            start_thread: {
                template: '', // hat 的函数体来自下面连接的积木，因此此处允许空字符串。
                imports: [
                    'import Hiwonder', // 此入口需要 SDK，普通 show_text 不收集它。
                    'import time' // 展示多条导入；与 pause 的同一导入会去重。
                    // 真正调用 DEV 设备的规则见 read_light，不在所有积木里无条件加入 Hiwonder_DEV。
                ],
                launcher: 'Hiwonder.startMain({MAIN})', // {MAIN} 替换实际主函数名，不是装饰器。
                section: 'main' // 帽子下的内容收集为 start_main / start_main1 等主函数。
                // 预期：def start_main(): ...，随后 Hiwonder.startMain(start_main)。
                // 仅在具有此 SDK 的目标上运行；普通桌面 Python 不会自动获得 Hiwonder。
            },
            setup_demo: {
                template: '',
                section: 'setup' // 帽子下内容在顶层执行，不套进 start_main。
            },
            on_demo: {
                template: '',
                variables: ['textdemo_callbacks = []'],
                entryTemplate: 'def on_demo():', // 自定义事件函数头；函数体来自帽子下的积木。
                entryFooter: 'textdemo_callbacks.append({MAIN})' // 定义后注册；自动重名编号同步到 {MAIN}。
                // 这里只把回调放入列表，不触发事件；真实硬件订阅必须依据实际 SDK。
                // 有 entryTemplate 时不再自动套主入口 launcher，不能臆造硬件装饰器。
            },
            pause: {
                template: 'time.sleep({SECONDS})',
                imports: ['import time']
            },
            show_resource: {
                // python() 从模块根读取打包文本并 trimEnd；复杂规则才有必要外置成文件。
                template: this.context.python('python/fixed-message.py'),
                // 当前仅保留运行文件声明；不会自动部署到硬件、执行文件或追加 import。
                // 此例真正生成的代码来自上方内联读取，而不是依赖 runtimeFiles 部署。
                runtimeFiles: ['python/fixed-message.py']
            },
            show_controls: {
                // angle shadow 当前走 NUM 通用回退，可能生成字符串；这里显式转换为数值。
                template: 'print({NUMBER}, float({ANGLE}), {FLAG}, {COLOR})'
            },
            show_sliders: {
                template: 'print({BRIGHTNESS}, {SIGNED})'
            },
            show_rgb: {
                // rgb 把颜色生成为 0xff,0x00,0x00 等分量，适用于接收分量的 SDK 参数。
                template: 'print({COLOR.rgb})'
            },
            show_bitmap: {
                // bitmap 使用 led_matrix 对应的位图格式；不是把二进制字符串直接当数字。
                template: 'print({MATRIX.bitmap})'
            },
            line_masks: {
                // 当前控件保存两位十六进制文本；0x 前缀保持数值代码，不额外加引号。
                template: '(0x{FOUR}, 0x{SIX}, 0x{EIGHT})'
            },
            show_json: {
                // jsonValue 读取静态字符串后安全编码；不是解析任意运行时对象的 JSON 引擎。
                template: 'print({TEXT.jsonValue})'
            },
            show_compact: {
                // compactJson 会删除空白，包括数据内部空格！仅作旧协议兼容参考，不用于普通文字。
                template: 'print({TEXT.compactJson})'
            },
            assign_named: {
                // identifier 要求静态字符串，转换为合法变量名；不能接动态计算表达式。
                template: '{NAME.identifier} = {VALUE}'
            },
            legacy_color: {
                // colorName 是已有中文颜色值→英文值的兼容转换，不是通用翻译函数。
                template: '{COLOR.colorName}'
            },
            old_show_text: {
                template: 'print({TEXT})' // 隐藏旧积木也必须保留完整生成规则。
            }
        };
        if (this.context.variant === 'hiwonder-dev-port') {
            rules.read_light = {
                imports: ['import Hiwonder_DEV'], // 同一模块按所选主控变更 import／初始化，而不只换端口名。
                // 对象名含 PORT，避免不同端口设备都写成 light 而被变量去重覆盖。
                variables: ['textdemo_light_{PORT} = Hiwonder_DEV.DEV_LIGHT(Hiwonder_DEV.Port({PORT}))'],
                template: 'textdemo_light_{PORT}.read_value()'
            };
        }
        return rules;
    }

    // 可选生命周期：卸载／替换时由宿主调用，可返回 void 或 Promise<void>。
    // 本例没有自建监听或硬件连接，无需清理。真实包若注册监听，应在这里解除自己的订阅；
    // 异步清理应返回 Promise，不清理其他模块；不要把此钩子当作设备紧急停止保证。
    dispose (): void {}
}
