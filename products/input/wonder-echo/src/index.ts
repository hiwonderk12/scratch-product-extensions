// WonderEcho 作者入口：四语菜单与显式语音初始化集中维护。
import type {ExtensionBlock, ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    "zh-cn": {
        "product.name": "WonderEcho语音模块",
        "block.minihexa_wonderecho_init": "初始化语音识别模块板载IIC接口",
        "block.aimech_wonderecho_init": "初始化WonderEcho语音模块接口 [PORT]",
        "block.wonderecho_get_results": "更新并获取WonderEcho识别结果",
        "block.wonderecho_results": "WonderEcho语音模块识别到 [WORD]",
        "block.wonderecho_get_result_num": "获取WonderEcho语音模块识别词ID",
        "block.wonderecho_speech_cmd": "WonderEcho语音模块播放命令词 [WORD]",
        "block.wonderecho_speech_cmd_number": "WonderEcho语音模块播放命令词编号 [NUM]",
        "block.wonderecho_speech_play": "WonderEcho语音模块播放播报词 [WORD]",
        "block.wonderecho_speech_play_number": "WonderEcho语音模块播放播报词编号 [NUM]",
        "menu.moving-forward": "正在前进",
        "menu.moving-backward": "正在后退",
        "menu.turning-left": "正在左转",
        "menu.turning-right": "正在右转",
        "menu.lean-forward": "身体前倾",
        "menu.lean-backward": "身体后仰",
        "menu.lean-left": "身体左倾",
        "menu.lean-right": "身体右倾",
        "menu.received": "收到",
        "menu.turning-light-on": "正在开灯",
        "menu.turning-light-off": "正在关灯",
        "menu.door-opened": "门已打开",
        "menu.door-closed": "门已关闭",
        "menu.turning-pump-on": "正在打开水泵",
        "menu.turning-pump-off": "正在关闭水泵",
        "menu.hello": "你好",
        "menu.introduction": "你好，我是幻尔，我会说话和跳舞。",
        "menu.watch-this": "看好了",
        "menu.recyclables": "可回收物",
        "menu.food-waste": "厨余垃圾",
        "menu.hazardous-waste": "有害垃圾",
        "menu.other-waste": "其他垃圾",
        "menu.obstacle-ahead": "前方有障碍物",
        "menu.parking-complete": "停车完成",
        "menu.resume-travel": "重新出发",
        "menu.left-turn-detected": "检测到左转",
        "menu.right-turn-detected": "检测到右转",
        "menu.stop-detected": "检测到停车",
        "menu.red-light-detected": "检测到红灯",
        "menu.green-light-detected": "检测到绿灯",
        "menu.u-turn-detected": "检测到掉头",
        "menu.turn-detected": "检测到转弯",
        "menu.welcome": "欢迎光临",
        "menu.grabbing-object": "检测到前方物体，正在抓取",
        "menu.object-out-of-range": "检测到前方物体超出范围，无法抓取",
        "menu.grabbing-complete": "抓取结束",
        "menu.forward": "前进",
        "menu.backward": "后退",
        "menu.left": "左转",
        "menu.right": "右转",
        "menu.stop": "停止",
        "menu.attention": "立正",
        "menu.lie-down": "趴下",
        "menu.sit": "坐下",
        "menu.speed-up": "加速",
        "menu.slow-down": "减速",
        "menu.raise-body": "抬高身体",
        "menu.lower-body": "降低身体",
        "menu.make-sound": "发出声音",
        "menu.light-on": "开灯",
        "menu.light-off": "关灯",
        "menu.open-door": "开门",
        "menu.close-door": "关门",
        "menu.pump-on": "打开水泵",
        "menu.pump-off": "关闭水泵",
        "menu.extend-rack": "展开晾衣架",
        "menu.retract-rack": "收起晾衣架",
        "menu.introduce-yourself": "自我介绍",
        "menu.show-skills": "展示技能",
        "menu.march-in-place": "原地踏步",
        "menu.shake-head": "摇头",
        "menu.lunge-forward": "向前扑",
        "menu.lunge-backward": "向后扑",
        "menu.combat-mode": "战斗模式",
        "menu.crouch": "蹲下",
        "menu.shake-body": "抖一抖",
        "menu.fan-on": "打开风扇",
        "menu.fan-off": "关闭风扇",
        "menu.rotate-servo": "转动舵机",
        "menu.red-light-on": "亮红灯",
        "menu.green-light-on": "亮绿灯",
        "menu.blue-light-on": "亮蓝灯",
        "menu.smile": "显示笑脸",
        "menu.cry": "显示哭脸",
        "menu.face-recognition": "开始人脸识别",
        "menu.tag-recognition": "开始标签识别",
        "menu.waste-sorting": "开始垃圾分类",
        "menu.color-recognition": "开始颜色识别",
        "menu.line-following": "开始巡线",
        "menu.color-tracking": "开始颜色追踪",
        "menu.obstacle-avoidance": "开始避障",
        "menu.sort-red": "分拣红色",
        "menu.sort-green": "分拣绿色",
        "menu.sort-blue": "分拣蓝色",
        "menu.dance": "跳舞",
        "menu.push-ups": "俯卧撑",
        "menu.kick-left": "左脚射门",
        "menu.kick-right": "右脚射门",
        "menu.twist-body": "扭动身体",
        "menu.sit-ups": "仰卧起坐",
        "menu.bow": "鞠躬",
        "menu.spread-hands": "摊手",
        "menu.wave": "挥手",
        "menu.stand-after-fall": "跌倒后站起",
        "menu.stride": "昂首阔步",
        "menu.hook-left": "左勾拳",
        "menu.hook-right": "右勾拳",
        "menu.stop-playback-detected": "检测到关闭播放",
        "menu.sort-yellow": "分拣黄色"
    },
    en: {
        "product.name": "WonderEcho voice module",
        "block.minihexa_wonderecho_init": "Initialize speech recognition module onboard IIC interface",
        "block.aimech_wonderecho_init": "Initialize WonderEcho voice module at port [PORT]",
        "block.wonderecho_get_results": "Update and get WonderEcho recognition result",
        "block.wonderecho_results": "WonderEcho voice module recognized [WORD]",
        "block.wonderecho_get_result_num": "Get WonderEcho recognized word ID",
        "block.wonderecho_speech_cmd": "WonderEcho voice module play command phrase [WORD]",
        "block.wonderecho_speech_cmd_number": "WonderEcho voice module play command phrase ID [NUM]",
        "block.wonderecho_speech_play": "WonderEcho voice module play announcement [WORD]",
        "block.wonderecho_speech_play_number": "WonderEcho voice module play announcement ID [NUM]",
        "menu.moving-forward": "Moving forward",
        "menu.moving-backward": "Moving backward",
        "menu.turning-left": "Turning left",
        "menu.turning-right": "Turning right",
        "menu.lean-forward": "Lean forward",
        "menu.lean-backward": "Lean backward",
        "menu.lean-left": "Lean left",
        "menu.lean-right": "Lean right",
        "menu.received": "Received",
        "menu.turning-light-on": "Turning light on",
        "menu.turning-light-off": "Turning light off",
        "menu.door-opened": "Door opened",
        "menu.door-closed": "Door closed",
        "menu.turning-pump-on": "Turning water pump on",
        "menu.turning-pump-off": "Turning water pump off",
        "menu.hello": "Hello",
        "menu.introduction": "Hello, I am Hiwonder. I can talk and dance.",
        "menu.watch-this": "Watch this",
        "menu.recyclables": "Recyclables",
        "menu.food-waste": "Food waste",
        "menu.hazardous-waste": "Hazardous waste",
        "menu.other-waste": "Other waste",
        "menu.obstacle-ahead": "Obstacle ahead",
        "menu.parking-complete": "Parking complete",
        "menu.resume-travel": "Resume travel",
        "menu.left-turn-detected": "Left turn detected",
        "menu.right-turn-detected": "Right turn detected",
        "menu.stop-detected": "Stop detected",
        "menu.red-light-detected": "Red light detected",
        "menu.green-light-detected": "Green light detected",
        "menu.u-turn-detected": "U-turn detected",
        "menu.turn-detected": "Turn detected",
        "menu.welcome": "Welcome",
        "menu.grabbing-object": "Object detected ahead, grabbing",
        "menu.object-out-of-range": "Object ahead is out of range, cannot grab",
        "menu.grabbing-complete": "Grabbing complete",
        "menu.forward": "Move forward",
        "menu.backward": "Move backward",
        "menu.left": "Turn left",
        "menu.right": "Turn right",
        "menu.stop": "Stop",
        "menu.attention": "Stand at attention",
        "menu.lie-down": "Lie down",
        "menu.sit": "Sit down",
        "menu.speed-up": "Speed up",
        "menu.slow-down": "Slow down",
        "menu.raise-body": "Raise body",
        "menu.lower-body": "Lower body",
        "menu.make-sound": "Make a sound",
        "menu.light-on": "Turn light on",
        "menu.light-off": "Turn light off",
        "menu.open-door": "Open door",
        "menu.close-door": "Close door",
        "menu.pump-on": "Turn water pump on",
        "menu.pump-off": "Turn water pump off",
        "menu.extend-rack": "Extend drying rack",
        "menu.retract-rack": "Retract drying rack",
        "menu.introduce-yourself": "Introduce yourself",
        "menu.show-skills": "Show skills",
        "menu.march-in-place": "March in place",
        "menu.shake-head": "Shake head",
        "menu.lunge-forward": "Lunge forward",
        "menu.lunge-backward": "Lunge backward",
        "menu.combat-mode": "Combat mode",
        "menu.crouch": "Crouch",
        "menu.shake-body": "Shake body",
        "menu.fan-on": "Turn fan on",
        "menu.fan-off": "Turn fan off",
        "menu.rotate-servo": "Rotate servo",
        "menu.red-light-on": "Turn red light on",
        "menu.green-light-on": "Turn green light on",
        "menu.blue-light-on": "Turn blue light on",
        "menu.smile": "Show smiling face",
        "menu.cry": "Show crying face",
        "menu.face-recognition": "Start face recognition",
        "menu.tag-recognition": "Start tag recognition",
        "menu.waste-sorting": "Start waste sorting",
        "menu.color-recognition": "Start color recognition",
        "menu.line-following": "Start line following",
        "menu.color-tracking": "Start color tracking",
        "menu.obstacle-avoidance": "Start obstacle avoidance",
        "menu.sort-red": "Sort red",
        "menu.sort-green": "Sort green",
        "menu.sort-blue": "Sort blue",
        "menu.dance": "Dance",
        "menu.push-ups": "Do push-ups",
        "menu.kick-left": "Kick with left foot",
        "menu.kick-right": "Kick with right foot",
        "menu.twist-body": "Twist body",
        "menu.sit-ups": "Do sit-ups",
        "menu.bow": "Bow",
        "menu.spread-hands": "Spread hands",
        "menu.wave": "Wave",
        "menu.stand-after-fall": "Stand up after falling",
        "menu.stride": "Stride with head held high",
        "menu.hook-left": "Left hook punch",
        "menu.hook-right": "Right hook punch",
        "menu.stop-playback-detected": "Stop playback detected",
        "menu.sort-yellow": "Sort yellow"
    },
    "zh-tw": {
        "product.name": "WonderEcho語音模組",
        "block.minihexa_wonderecho_init": "初始化語音辨識模組板載IIC介面",
        "block.aimech_wonderecho_init": "初始化WonderEcho語音模組介面 [PORT]",
        "block.wonderecho_get_results": "更新並取得WonderEcho辨識結果",
        "block.wonderecho_results": "WonderEcho語音模組辨識到 [WORD]",
        "block.wonderecho_get_result_num": "取得WonderEcho語音模組辨識詞ID",
        "block.wonderecho_speech_cmd": "WonderEcho語音模組播放命令詞 [WORD]",
        "block.wonderecho_speech_cmd_number": "WonderEcho語音模組播放命令詞編號 [NUM]",
        "block.wonderecho_speech_play": "WonderEcho語音模組播放播報詞 [WORD]",
        "block.wonderecho_speech_play_number": "WonderEcho語音模組播放播報詞編號 [NUM]",
        "menu.moving-forward": "正在前進",
        "menu.moving-backward": "正在後退",
        "menu.turning-left": "正在左轉",
        "menu.turning-right": "正在右轉",
        "menu.lean-forward": "身體前傾",
        "menu.lean-backward": "身體後仰",
        "menu.lean-left": "身體左傾",
        "menu.lean-right": "身體右傾",
        "menu.received": "收到",
        "menu.turning-light-on": "正在開燈",
        "menu.turning-light-off": "正在關燈",
        "menu.door-opened": "門已開啟",
        "menu.door-closed": "門已關閉",
        "menu.turning-pump-on": "正在開啟水泵",
        "menu.turning-pump-off": "正在關閉水泵",
        "menu.hello": "你好",
        "menu.introduction": "你好，我是幻爾，我會說話和跳舞。",
        "menu.watch-this": "看好了",
        "menu.recyclables": "可回收物",
        "menu.food-waste": "廚餘垃圾",
        "menu.hazardous-waste": "有害垃圾",
        "menu.other-waste": "其他垃圾",
        "menu.obstacle-ahead": "前方有障礙物",
        "menu.parking-complete": "停車完成",
        "menu.resume-travel": "重新出發",
        "menu.left-turn-detected": "偵測到左轉",
        "menu.right-turn-detected": "偵測到右轉",
        "menu.stop-detected": "偵測到停車",
        "menu.red-light-detected": "偵測到紅燈",
        "menu.green-light-detected": "偵測到綠燈",
        "menu.u-turn-detected": "偵測到迴轉",
        "menu.turn-detected": "偵測到轉彎",
        "menu.welcome": "歡迎光臨",
        "menu.grabbing-object": "偵測到前方物體，正在抓取",
        "menu.object-out-of-range": "偵測到前方物體超出範圍，無法抓取",
        "menu.grabbing-complete": "抓取結束",
        "menu.forward": "前進",
        "menu.backward": "後退",
        "menu.left": "左轉",
        "menu.right": "右轉",
        "menu.stop": "停止",
        "menu.attention": "立正",
        "menu.lie-down": "趴下",
        "menu.sit": "坐下",
        "menu.speed-up": "加速",
        "menu.slow-down": "減速",
        "menu.raise-body": "抬高身體",
        "menu.lower-body": "降低身體",
        "menu.make-sound": "發出聲音",
        "menu.light-on": "開燈",
        "menu.light-off": "關燈",
        "menu.open-door": "開門",
        "menu.close-door": "關門",
        "menu.pump-on": "開啟水泵",
        "menu.pump-off": "關閉水泵",
        "menu.extend-rack": "展開晾衣架",
        "menu.retract-rack": "收起晾衣架",
        "menu.introduce-yourself": "自我介紹",
        "menu.show-skills": "展示技能",
        "menu.march-in-place": "原地踏步",
        "menu.shake-head": "搖頭",
        "menu.lunge-forward": "向前撲",
        "menu.lunge-backward": "向後撲",
        "menu.combat-mode": "戰鬥模式",
        "menu.crouch": "蹲下",
        "menu.shake-body": "抖一抖",
        "menu.fan-on": "開啟風扇",
        "menu.fan-off": "關閉風扇",
        "menu.rotate-servo": "轉動舵機",
        "menu.red-light-on": "亮紅燈",
        "menu.green-light-on": "亮綠燈",
        "menu.blue-light-on": "亮藍燈",
        "menu.smile": "顯示笑臉",
        "menu.cry": "顯示哭臉",
        "menu.face-recognition": "開始人臉辨識",
        "menu.tag-recognition": "開始標籤辨識",
        "menu.waste-sorting": "開始垃圾分類",
        "menu.color-recognition": "開始顏色辨識",
        "menu.line-following": "開始循線",
        "menu.color-tracking": "開始顏色追蹤",
        "menu.obstacle-avoidance": "開始避障",
        "menu.sort-red": "分揀紅色",
        "menu.sort-green": "分揀綠色",
        "menu.sort-blue": "分揀藍色",
        "menu.dance": "跳舞",
        "menu.push-ups": "伏地挺身",
        "menu.kick-left": "左腳射門",
        "menu.kick-right": "右腳射門",
        "menu.twist-body": "扭動身體",
        "menu.sit-ups": "仰臥起坐",
        "menu.bow": "鞠躬",
        "menu.spread-hands": "攤手",
        "menu.wave": "揮手",
        "menu.stand-after-fall": "跌倒後站起",
        "menu.stride": "昂首闊步",
        "menu.hook-left": "左鉤拳",
        "menu.hook-right": "右鉤拳",
        "menu.stop-playback-detected": "偵測到關閉播放",
        "menu.sort-yellow": "分揀黃色"
    },
    ko: {
        "product.name": "WonderEcho 음성 모듈",
        "block.minihexa_wonderecho_init": "음성 인식 모듈 내장 IIC 인터페이스 초기화",
        "block.aimech_wonderecho_init": "포트 [PORT] 에서 WonderEcho 음성 모듈 초기화하기",
        "block.wonderecho_get_results": "WonderEcho 인식 결과 갱신하고 읽기",
        "block.wonderecho_results": "WonderEcho 음성 모듈이 [WORD] 을 인식했는가?",
        "block.wonderecho_get_result_num": "WonderEcho 음성 모듈의 인식 단어 ID 읽기",
        "block.wonderecho_speech_cmd": "WonderEcho 음성 모듈 명령 문구 [WORD] 재생하기",
        "block.wonderecho_speech_cmd_number": "WonderEcho 음성 모듈 명령 문구 ID [NUM] 재생하기",
        "block.wonderecho_speech_play": "WonderEcho 음성 모듈 안내 문구 [WORD] 재생하기",
        "block.wonderecho_speech_play_number": "WonderEcho 음성 모듈 안내 문구 ID [NUM] 재생하기",
        "menu.moving-forward": "전진 중",
        "menu.moving-backward": "후진 중",
        "menu.turning-left": "좌회전 중",
        "menu.turning-right": "우회전 중",
        "menu.lean-forward": "몸을 앞으로 기울이기",
        "menu.lean-backward": "몸을 뒤로 기울이기",
        "menu.lean-left": "몸을 왼쪽으로 기울이기",
        "menu.lean-right": "몸을 오른쪽으로 기울이기",
        "menu.received": "확인",
        "menu.turning-light-on": "조명 켜는 중",
        "menu.turning-light-off": "조명 끄는 중",
        "menu.door-opened": "문이 열렸습니다",
        "menu.door-closed": "문이 닫혔습니다",
        "menu.turning-pump-on": "물 펌프 켜는 중",
        "menu.turning-pump-off": "물 펌프 끄는 중",
        "menu.hello": "안녕하세요",
        "menu.introduction": "안녕하세요. 저는 하이원더입니다. 말하고 춤출 수 있어요.",
        "menu.watch-this": "잘 보세요",
        "menu.recyclables": "재활용품",
        "menu.food-waste": "음식물 쓰레기",
        "menu.hazardous-waste": "유해 폐기물",
        "menu.other-waste": "기타 쓰레기",
        "menu.obstacle-ahead": "앞에 장애물이 있습니다",
        "menu.parking-complete": "주차 완료",
        "menu.resume-travel": "다시 출발하기",
        "menu.left-turn-detected": "좌회전 감지",
        "menu.right-turn-detected": "우회전 감지",
        "menu.stop-detected": "정지 감지",
        "menu.red-light-detected": "빨간 신호등 감지",
        "menu.green-light-detected": "초록 신호등 감지",
        "menu.u-turn-detected": "유턴 감지",
        "menu.turn-detected": "방향 전환 감지",
        "menu.welcome": "환영합니다",
        "menu.grabbing-object": "앞의 물체를 감지하여 집는 중",
        "menu.object-out-of-range": "앞의 물체가 범위를 벗어나 집을 수 없습니다",
        "menu.grabbing-complete": "집기 완료",
        "menu.forward": "전진하기",
        "menu.backward": "후진하기",
        "menu.left": "좌회전하기",
        "menu.right": "우회전하기",
        "menu.stop": "정지하기",
        "menu.attention": "차렷 자세 취하기",
        "menu.lie-down": "엎드리기",
        "menu.sit": "앉기",
        "menu.speed-up": "속도 높이기",
        "menu.slow-down": "속도 낮추기",
        "menu.raise-body": "몸 높이기",
        "menu.lower-body": "몸 낮추기",
        "menu.make-sound": "소리 내기",
        "menu.light-on": "조명 켜기",
        "menu.light-off": "조명 끄기",
        "menu.open-door": "문 열기",
        "menu.close-door": "문 닫기",
        "menu.pump-on": "물 펌프 켜기",
        "menu.pump-off": "물 펌프 끄기",
        "menu.extend-rack": "빨래 건조대 펼치기",
        "menu.retract-rack": "빨래 건조대 접기",
        "menu.introduce-yourself": "자기소개하기",
        "menu.show-skills": "기술 보여주기",
        "menu.march-in-place": "제자리걸음하기",
        "menu.shake-head": "고개 흔들기",
        "menu.lunge-forward": "앞으로 뛰어들기",
        "menu.lunge-backward": "뒤로 뛰어들기",
        "menu.combat-mode": "전투 모드",
        "menu.crouch": "웅크리기",
        "menu.shake-body": "몸 털기",
        "menu.fan-on": "팬 켜기",
        "menu.fan-off": "팬 끄기",
        "menu.rotate-servo": "서보 회전하기",
        "menu.red-light-on": "빨간불 켜기",
        "menu.green-light-on": "초록불 켜기",
        "menu.blue-light-on": "파란불 켜기",
        "menu.smile": "웃는 얼굴 표시하기",
        "menu.cry": "우는 얼굴 표시하기",
        "menu.face-recognition": "얼굴 인식 시작하기",
        "menu.tag-recognition": "태그 인식 시작하기",
        "menu.waste-sorting": "쓰레기 분류 시작하기",
        "menu.color-recognition": "색상 인식 시작하기",
        "menu.line-following": "라인 추적 시작하기",
        "menu.color-tracking": "색상 추적 시작하기",
        "menu.obstacle-avoidance": "장애물 회피 시작하기",
        "menu.sort-red": "빨간색 분류하기",
        "menu.sort-green": "초록색 분류하기",
        "menu.sort-blue": "파란색 분류하기",
        "menu.dance": "춤추기",
        "menu.push-ups": "팔굽혀펴기",
        "menu.kick-left": "왼발로 슛하기",
        "menu.kick-right": "오른발로 슛하기",
        "menu.twist-body": "몸 비틀기",
        "menu.sit-ups": "윗몸일으키기",
        "menu.bow": "인사하기",
        "menu.spread-hands": "손 펼치기",
        "menu.wave": "손 흔들기",
        "menu.stand-after-fall": "넘어진 뒤 일어나기",
        "menu.stride": "고개를 들고 힘차게 걷기",
        "menu.hook-left": "왼손 훅 펀치",
        "menu.hook-right": "오른손 훅 펀치",
        "menu.stop-playback-detected": "재생 중지 감지",
        "menu.sort-yellow": "노란색 분류하기"
    }
} as const;

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class WonderEchoBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private checkVariant (): void {
        if (!['hiwonder-dev-port', 'hiwonder-dev-onboard'].includes(this.context.variant)) {
            throw new Error('input/wonder-echo: 未支持的主控适配 ' + this.context.variant);
        }
    }

    getInfo (): ExtensionInfo {
        this.checkVariant();
        const onboard = this.context.variant === 'hiwonder-dev-onboard';
        return {
            id: "sensor",
            name: this.context.t(product.name),
            color1: "#7B68EE",
            color2: "#7B68EE",
            color3: "#7B68EE",
            menus: {
                aimech_iicport: {
                    acceptReporters: false,
                    items: this.context.ports('sensor.aimech_iicport')
                },
                mechdog_speech_cmd_word: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.moving-forward'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.moving-backward'),
                            value: "2"
                        },
                        {
                            text: this.context.t('menu.turning-left'),
                            value: "3"
                        },
                        {
                            text: this.context.t('menu.turning-right'),
                            value: "4"
                        },
                        {
                            text: this.context.t('menu.lean-forward'),
                            value: "5"
                        },
                        {
                            text: this.context.t('menu.lean-backward'),
                            value: "6"
                        },
                        {
                            text: this.context.t('menu.lean-left'),
                            value: "7"
                        },
                        {
                            text: this.context.t('menu.lean-right'),
                            value: "8"
                        },
                        {
                            text: this.context.t('menu.received'),
                            value: "9"
                        },
                        {
                            text: this.context.t('menu.received'),
                            value: "0xd"
                        },
                        {
                            text: this.context.t('menu.received'),
                            value: "0xe"
                        },
                        {
                            text: this.context.t('menu.turning-light-on'),
                            value: "0x12"
                        },
                        {
                            text: this.context.t('menu.turning-light-off'),
                            value: "0x13"
                        },
                        {
                            text: this.context.t('menu.door-opened'),
                            value: "0x14"
                        },
                        {
                            text: this.context.t('menu.door-closed'),
                            value: "0x15"
                        },
                        {
                            text: this.context.t('menu.turning-pump-on'),
                            value: "0x16"
                        },
                        {
                            text: this.context.t('menu.turning-pump-off'),
                            value: "0x17"
                        },
                        {
                            text: this.context.t('menu.received'),
                            value: "0x18"
                        },
                        {
                            text: this.context.t('menu.received'),
                            value: "0x19"
                        },
                        {
                            text: this.context.t('menu.hello'),
                            value: "0x1A"
                        },
                        {
                            text: this.context.t('menu.introduction'),
                            value: "0x1B"
                        },
                        {
                            text: this.context.t('menu.watch-this'),
                            value: "0x1C"
                        },
                        {
                            text: this.context.t('menu.received'),
                            value: "0x62"
                        }
                    ]
                },
                mechdog_speech_play_word: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.recyclables'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.food-waste'),
                            value: "2"
                        },
                        {
                            text: this.context.t('menu.hazardous-waste'),
                            value: "3"
                        },
                        {
                            text: this.context.t('menu.other-waste'),
                            value: "4"
                        },
                        {
                            text: this.context.t('menu.obstacle-ahead'),
                            value: "5"
                        },
                        {
                            text: this.context.t('menu.parking-complete'),
                            value: "6"
                        },
                        {
                            text: this.context.t('menu.resume-travel'),
                            value: "7"
                        },
                        {
                            text: this.context.t('menu.left-turn-detected'),
                            value: "8"
                        },
                        {
                            text: this.context.t('menu.right-turn-detected'),
                            value: "9"
                        },
                        {
                            text: this.context.t('menu.stop-detected'),
                            value: "0xA"
                        },
                        {
                            text: this.context.t('menu.red-light-detected'),
                            value: "0xB"
                        },
                        {
                            text: this.context.t('menu.green-light-detected'),
                            value: "0xC"
                        },
                        {
                            text: this.context.t('menu.u-turn-detected'),
                            value: "0xD"
                        },
                        {
                            text: this.context.t('menu.turn-detected'),
                            value: "0xE"
                        },
                        {
                            text: this.context.t('menu.welcome'),
                            value: "0xF"
                        },
                        {
                            text: this.context.t('menu.grabbing-object'),
                            value: "0x10"
                        },
                        {
                            text: this.context.t('menu.object-out-of-range'),
                            value: "0x11"
                        },
                        {
                            text: this.context.t('menu.grabbing-complete'),
                            value: "0x12"
                        }
                    ]
                },
                mechdog_word: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.forward'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.backward'),
                            value: "2"
                        },
                        {
                            text: this.context.t('menu.left'),
                            value: "3"
                        },
                        {
                            text: this.context.t('menu.right'),
                            value: "4"
                        },
                        {
                            text: this.context.t('menu.lean-forward'),
                            value: "5"
                        },
                        {
                            text: this.context.t('menu.lean-backward'),
                            value: "6"
                        },
                        {
                            text: this.context.t('menu.lean-left'),
                            value: "7"
                        },
                        {
                            text: this.context.t('menu.lean-right'),
                            value: "8"
                        },
                        {
                            text: this.context.t('menu.stop'),
                            value: "9"
                        },
                        {
                            text: this.context.t('menu.attention'),
                            value: "0xA"
                        },
                        {
                            text: this.context.t('menu.lie-down'),
                            value: "0xB"
                        },
                        {
                            text: this.context.t('menu.sit'),
                            value: "0xC"
                        },
                        {
                            text: this.context.t('menu.speed-up'),
                            value: "0xD"
                        },
                        {
                            text: this.context.t('menu.slow-down'),
                            value: "0xE"
                        },
                        {
                            text: this.context.t('menu.raise-body'),
                            value: "0xF"
                        },
                        {
                            text: this.context.t('menu.lower-body'),
                            value: "0x10"
                        },
                        {
                            text: this.context.t('menu.make-sound'),
                            value: "0x11"
                        },
                        {
                            text: this.context.t('menu.light-on'),
                            value: "0x12"
                        },
                        {
                            text: this.context.t('menu.light-off'),
                            value: "0x13"
                        },
                        {
                            text: this.context.t('menu.open-door'),
                            value: "0x14"
                        },
                        {
                            text: this.context.t('menu.close-door'),
                            value: "0x15"
                        },
                        {
                            text: this.context.t('menu.pump-on'),
                            value: "0x16"
                        },
                        {
                            text: this.context.t('menu.pump-off'),
                            value: "0x17"
                        },
                        {
                            text: this.context.t('menu.extend-rack'),
                            value: "0x18"
                        },
                        {
                            text: this.context.t('menu.retract-rack'),
                            value: "0x19"
                        },
                        {
                            text: this.context.t('menu.hello'),
                            value: "0x1A"
                        },
                        {
                            text: this.context.t('menu.introduce-yourself'),
                            value: "0x1B"
                        },
                        {
                            text: this.context.t('menu.show-skills'),
                            value: "0x1C"
                        },
                        {
                            text: this.context.t('menu.march-in-place'),
                            value: "0x1D"
                        },
                        {
                            text: this.context.t('menu.shake-head'),
                            value: "0x1E"
                        },
                        {
                            text: this.context.t('menu.lunge-forward'),
                            value: "0x1F"
                        },
                        {
                            text: this.context.t('menu.lunge-backward'),
                            value: "0x20"
                        },
                        {
                            text: this.context.t('menu.combat-mode'),
                            value: "0x21"
                        },
                        {
                            text: this.context.t('menu.crouch'),
                            value: "0x22"
                        },
                        {
                            text: this.context.t('menu.shake-body'),
                            value: "0x23"
                        },
                        {
                            text: this.context.t('menu.fan-on'),
                            value: "0x24"
                        },
                        {
                            text: this.context.t('menu.fan-off'),
                            value: "0x25"
                        },
                        {
                            text: this.context.t('menu.rotate-servo'),
                            value: "0x26"
                        },
                        {
                            text: this.context.t('menu.red-light-on'),
                            value: "0x27"
                        },
                        {
                            text: this.context.t('menu.green-light-on'),
                            value: "0x28"
                        },
                        {
                            text: this.context.t('menu.blue-light-on'),
                            value: "0x29"
                        },
                        {
                            text: this.context.t('menu.smile'),
                            value: "0x2A"
                        },
                        {
                            text: this.context.t('menu.cry'),
                            value: "0x2B"
                        },
                        {
                            text: this.context.t('menu.face-recognition'),
                            value: "0x62"
                        },
                        {
                            text: this.context.t('menu.tag-recognition'),
                            value: "0x63"
                        },
                        {
                            text: this.context.t('menu.waste-sorting'),
                            value: "0x64"
                        },
                        {
                            text: this.context.t('menu.color-recognition'),
                            value: "0x65"
                        },
                        {
                            text: this.context.t('menu.line-following'),
                            value: "0x66"
                        },
                        {
                            text: this.context.t('menu.color-tracking'),
                            value: "0x67"
                        },
                        {
                            text: this.context.t('menu.obstacle-avoidance'),
                            value: "0x68"
                        },
                        {
                            text: this.context.t('menu.sort-red'),
                            value: "0x69"
                        },
                        {
                            text: this.context.t('menu.sort-green'),
                            value: "0x6A"
                        },
                        {
                            text: this.context.t('menu.sort-blue'),
                            value: "0x6B"
                        },
                        {
                            text: this.context.t('menu.dance'),
                            value: "0x6C"
                        },
                        {
                            text: this.context.t('menu.push-ups'),
                            value: "0x6D"
                        },
                        {
                            text: this.context.t('menu.kick-left'),
                            value: "0x6E"
                        },
                        {
                            text: this.context.t('menu.kick-right'),
                            value: "0x6F"
                        },
                        {
                            text: this.context.t('menu.twist-body'),
                            value: "0x71"
                        },
                        {
                            text: this.context.t('menu.sit-ups'),
                            value: "0x72"
                        },
                        {
                            text: this.context.t('menu.bow'),
                            value: "0x73"
                        },
                        {
                            text: this.context.t('menu.spread-hands'),
                            value: "0x74"
                        },
                        {
                            text: this.context.t('menu.wave'),
                            value: "0x75"
                        },
                        {
                            text: this.context.t('menu.march-in-place'),
                            value: "0x76"
                        },
                        {
                            text: this.context.t('menu.stand-after-fall'),
                            value: "0x77"
                        },
                        {
                            text: this.context.t('menu.stride'),
                            value: "0x78"
                        },
                        {
                            text: this.context.t('menu.hook-left'),
                            value: "0x79"
                        },
                        {
                            text: this.context.t('menu.hook-right'),
                            value: "0x7A"
                        },
                        {
                            text: this.context.t('menu.stop-playback-detected'),
                            value: "0x7B"
                        },
                        {
                            text: this.context.t('menu.sort-yellow'),
                            value: "0x7C"
                        }
                    ]
                }
            },
            blocks: [
                {
                    subCategory: this.context.t(product.name)
                },
                ...(onboard ? [{
                    opcode: "minihexa_wonderecho_init",
                    blockType: "command",
                    text: this.context.t('block.minihexa_wonderecho_init'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {}
                } satisfies ExtensionBlock] : []),
                {
                    opcode: "aimech_wonderecho_init",
                    ...(onboard ? {hideFromPalette: true} : {}),
                    blockType: "command",
                    text: this.context.t('block.aimech_wonderecho_init'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimech_wonderecho_init', 'PORT'),
                            menu: "aimech_iicport",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "wonderecho_get_results",
                    blockType: "command",
                    text: this.context.t('block.wonderecho_get_results'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {}
                },
                {
                    opcode: "wonderecho_results",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.wonderecho_results'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {
                        WORD: {
                            type: "string",
                            defaultValue: "1",
                            menu: "mechdog_word",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "wonderecho_get_result_num",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.wonderecho_get_result_num'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {}
                },
                {
                    opcode: "wonderecho_speech_cmd",
                    blockType: "command",
                    text: this.context.t('block.wonderecho_speech_cmd'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {
                        WORD: {
                            type: "string",
                            defaultValue: "1",
                            menu: "mechdog_speech_cmd_word",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "wonderecho_speech_cmd_number",
                    blockType: "command",
                    text: this.context.t('block.wonderecho_speech_cmd_number'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "wonderecho_speech_play",
                    blockType: "command",
                    text: this.context.t('block.wonderecho_speech_play'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {
                        WORD: {
                            type: "string",
                            defaultValue: "1",
                            menu: "mechdog_speech_play_word",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "wonderecho_speech_play_number",
                    blockType: "command",
                    text: this.context.t('block.wonderecho_speech_play_number'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                }
            ]
        };
    }

    // 仅初始化积木创建 asr2；ASR_CMDMAND 是设备 API 的原始常量名。
    getPython (): Record<string, PythonTemplate> {
        this.checkVariant();
        const templates: Record<string, PythonTemplate> = {
            aimech_wonderecho_init: {
                template: "",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "asr2 = Hiwonder_DEV.DEV_ASR(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            wonderecho_get_results: {
                template: "wonderecho_result = asr2.getResult()"
            },
            wonderecho_results: {
                template: "(wonderecho_result == {WORD})"
            },
            wonderecho_get_result_num: {
                template: "wonderecho_result"
            },
            wonderecho_speech_cmd: {
                template: "asr2.speak(asr2.ASR_CMDMAND, {WORD})"
            },
            wonderecho_speech_cmd_number: {
                template: "asr2.speak(asr2.ASR_CMDMAND, {NUM})"
            },
            wonderecho_speech_play: {
                template: "asr2.speak(asr2.ASR_ANNOUNCER, {WORD})"
            },
            wonderecho_speech_play_number: {
                template: "asr2.speak(asr2.ASR_ANNOUNCER, {NUM})"
            }
        };
        if (this.context.variant === 'hiwonder-dev-onboard') {
            templates.aimech_wonderecho_init.variables = ["asr2 = Hiwonder_DEV.DEV_ASR()"];
            templates.minihexa_wonderecho_init = templates.aimech_wonderecho_init;
        }
        return templates;
    }
}
