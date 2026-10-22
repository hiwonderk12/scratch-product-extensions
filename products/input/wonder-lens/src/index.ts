// WonderLens 作者入口：集中维护三种初始化、完整功能、层级分类、四语与 Python。
import type {ExtensionBlock, ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    "zh-cn": {
        "product.name": "WonderLens",
        "block.aimech_wondercamInitI2c": "初始化 WonderLens IIC接口 [IICPORT]",
        "block.minihexa_wondercamInitI2c": "初始化 WonderLens IIC接口",
        "block.aiblocks_wondercamInitI2c": "初始化 WonderLens IIC接口 [IICPORT]",
        "block.getFwVersion": "WonderLens 当前固件版本",
        "block.getFuncNumber": "功能 [NUM]",
        "block.getCurrentFunc": "WonderLens 当前功能",
        "block.switchFunc": "WonderLens 切换至功能 [NUM]",
        "block.setLed": "[ONOFF] LED",
        "block.wondercamUpdateResult": "WonderLens 更新并获取结果",
        "block.isAnyFaceDetected": "检测到人脸?",
        "block.numOfDetectedFaces": "WonderLens 检测到的人脸数量",
        "block.isAnyLearnedFaceRec": "识别到了已经学习的人脸 ?",
        "block.numOfLearnedFaceRec": "获取识别到的已经学习的人脸数量",
        "block.isAnyUnlearnedFaceDetected": "识别到了未学习的人脸 ?",
        "block.isFaceOfIdRec": "识别到了人脸ID [NUM] ?",
        "block.getFaceOfId": "获取人脸ID [NUM] 的数据 [POS]",
        "block.getUnlearnedFaceOfIndex": "获取第 [NUM] 个未学习的人脸数据 [POS]",
        "block.isAnyObjDetected": "识别到了任意物品？",
        "block.isObjOfIdDetected": "识别到了物体 [NUM] ?",
        "block.getObjTotal": "获取识别到的物体 [NUM] 总数",
        "block.getObjOfId": "获取第 [INDEX] 个识别到的物体 [NUM] 数据 [POS]",
        "block.getClMaxProbId": "获取图像分类置信度最大的ID",
        "block.getClnMaxProb": "获取图像分类最大置信度",
        "block.getClnProbOfId": "获取图像ID [INDEX] 置信度",
        "block.getFLMaxProbId": "获取特征学习置信度最大的ID",
        "block.getFLnMaxProb": "获取特征学习最大置信度",
        "block.getFLnProbOfId": "获取特征学习ID [INDEX] 的置信度",
        "block.isAnyColorDetectd": "是否检测到了任意颜色？",
        "block.numOfColorDetected": "获取检测到的颜色总数",
        "block.isColorOfIdDetected": "WonderLens 检测到颜色 ID [NUM] ?",
        "block.getColorOfId": "WonderLens 获取颜色 ID [NUM] 的 [POS]",
        "block.isAnyLineDetected": "是否检测到了线?",
        "block.setRoi": "设置视觉巡线的识别区域，区域的左上角坐标 X [XPOS] Y [YPOS] 宽 [WIDTH] 高 [HEIGHT]",
        "block.numOfLineDetected": "获取识别到的线的总数",
        "block.isLineOfIdDetected": "是否识别到了线ID [NUM] ?",
        "block.getLineOfId": "获取线ID [NUM] 的数据 [POS]",
        "block.isAnyTagDetected": "是否识别到任意标签？",
        "block.numOfTagDetected": "获取识别到的标签总数",
        "block.isTagOfIdDetected": "是否识别到标签ID [NUM] ?",
        "block.numOfTagIdDetected": "获取识别到的标签ID [NUM] 总数",
        "block.getDataOfTagIdIndex": "获取第 [INDEX] 识别到的标签ID [NUM] 的数据 [POS]",
        "block.isAnyQrCodeDetected": "是否有二维码被识别到？",
        "block.lenOfQrCodeData": "获取二维码的长度",
        "block.getStrFromQrCode": "以字符的格式获取二维码的内容",
        "block.getBytesFromCode": "以bytes(字节数组)的格式获取二维码的内容",
        "block.isAnyBarCodeDetected": "是否有条形码被识别到？",
        "block.lenOfBarCode": "获取条形码的长度",
        "block.getStrFromBarCode": "以字符的格式获取条形码的内容",
        "block.getBytesFromBarCode": "以bytes(字节数组)的格式获取条形码的内容",
        "block.getNumTagMaxProbId": "获取数字识别置信度最大的数字",
        "block.getNumTagMaxProb": "获取数字识别最大的置信度",
        "block.getNumTagProbOfId": "获取数字 [INDEX] 的置信度",
        "block.getOrientionTagMaxProbId": "获取路标识别置信度最大的编号",
        "block.getOrientionTagMaxProb": "获取路标识别最大的置信度",
        "block.getOrientionTagProbOfId": "获取路标 [ORIENTION] 的置信度",
        "group.wonder-lens-face": "人脸识别",
        "group.wonder-lens-object": "物体识别",
        "group.wonder-lens-classification": "图像分类",
        "group.wonder-lens-feature": "特征学习",
        "group.wonder-lens-color": "颜色识别",
        "group.wonder-lens-line": "巡线识别",
        "group.wonder-lens-tag": "标签识别",
        "group.wonder-lens-qr": "二维码识别",
        "group.wonder-lens-barcode": "条形码识别",
        "group.wonder-lens-number": "数字识别",
        "group.wonder-lens-landmark": "路标识别",
        "menu.funcNum.0": "设置",
        "menu.funcNum.1": "人脸识别",
        "menu.funcNum.2": "物体检测",
        "menu.funcNum.3": "图像分类",
        "menu.funcNum.4": "特征学习",
        "menu.funcNum.5": "颜色识别",
        "menu.funcNum.6": "视觉巡线",
        "menu.funcNum.7": "AprilTag",
        "menu.funcNum.8": "二维码",
        "menu.funcNum.9": "条形码",
        "menu.funcNum.10": "数字",
        "menu.funcNum.11": "地标",
        "menu.onOff.1": "开",
        "menu.onOff.0": "关",
        "menu.wonderLensColorResult.0": "中心 X",
        "menu.wonderLensColorResult.1": "中心 Y",
        "menu.wonderLensColorResult.2": "宽度",
        "menu.wonderLensColorResult.3": "高度",
        "menu.wonderLensLandmarkIds.1": "前进",
        "menu.wonderLensLandmarkIds.2": "左转",
        "menu.wonderLensLandmarkIds.3": "右转",
        "menu.wonderLensLandmarkIds.4": "掉头",
        "menu.wonderLensLandmarkIds.5": "停止",
        "menu.wonderLensLineResult.0": "箭头X",
        "menu.wonderLensLineResult.1": "箭头Y",
        "menu.wonderLensLineResult.2": "箭尾X",
        "menu.wonderLensLineResult.3": "箭尾Y",
        "menu.wonderLensLineResult.4": "角度",
        "menu.wonderLensLineResult.5": "偏移",
        "menu.wonderLensObjects.1": "飞机",
        "menu.wonderLensObjects.2": "自行车",
        "menu.wonderLensObjects.3": "鸟",
        "menu.wonderLensObjects.4": "船",
        "menu.wonderLensObjects.5": "瓶子",
        "menu.wonderLensObjects.6": "巴士",
        "menu.wonderLensObjects.7": "车",
        "menu.wonderLensObjects.8": "猫",
        "menu.wonderLensObjects.9": "椅子",
        "menu.wonderLensObjects.10": "牛",
        "menu.wonderLensObjects.11": "餐桌",
        "menu.wonderLensObjects.12": "狗",
        "menu.wonderLensObjects.13": "马",
        "menu.wonderLensObjects.14": "摩托车",
        "menu.wonderLensObjects.15": "人",
        "menu.wonderLensObjects.16": "盆栽",
        "menu.wonderLensObjects.17": "绵羊",
        "menu.wonderLensObjects.18": "沙发",
        "menu.wonderLensObjects.19": "火车",
        "menu.wonderLensObjects.20": "显示屏",
        "menu.wonderLensTagResult.0": "中心X",
        "menu.wonderLensTagResult.1": "中心Y",
        "menu.wonderLensTagResult.2": "宽度",
        "menu.wonderLensTagResult.3": "高度",
        "menu.wonderLensTagResult.4": "X轴变换",
        "menu.wonderLensTagResult.5": "X轴旋转",
        "menu.wonderLensTagResult.6": "Y轴变换",
        "menu.wonderLensTagResult.7": "Y轴旋转",
        "menu.wonderLensTagResult.8": "Z轴变换",
        "menu.wonderLensTagResult.9": "Z轴旋转"
    },
    en: {
        "product.name": "WonderLens",
        "block.aimech_wondercamInitI2c": "WonderLens initalize port [IICPORT]",
        "block.minihexa_wondercamInitI2c": "Initialize WonderLens IIC interface",
        "block.aiblocks_wondercamInitI2c": "WonderLens initalize port [IICPORT]",
        "block.getFwVersion": "WonderLens get current firmware version",
        "block.getFuncNumber": "function [NUM]",
        "block.getCurrentFunc": "WonderLens get current function",
        "block.switchFunc": "WonderLens switch to funtion [NUM]",
        "block.setLed": "[ONOFF] LED",
        "block.wondercamUpdateResult": "WonderLens update and get result",
        "block.isAnyFaceDetected": "Is any face detected?",
        "block.numOfDetectedFaces": "WonderLens get the total number of detected faces",
        "block.isAnyLearnedFaceRec": "Is any learned face detected ?",
        "block.numOfLearnedFaceRec": "Get the number of learned faces ",
        "block.isAnyUnlearnedFaceDetected": "Is any unlearned face detected ?",
        "block.isFaceOfIdRec": "WonderLens recognized the face ID [NUM] ?",
        "block.getFaceOfId": "WonderLens get result from face ID [NUM] content [POS]",
        "block.getUnlearnedFaceOfIndex": "WonderLens get result from unlearned face index [NUM] content [POS]",
        "block.isAnyObjDetected": "Is any object detected ?",
        "block.isObjOfIdDetected": "WonderLens recognized the object [NUM] ?",
        "block.getObjTotal": "WonderLens get the total number of the object [NUM]",
        "block.getObjOfId": "WonderLens get result from object [NUM] index [INDEX] content [POS]",
        "block.getClMaxProbId": "WonderLens get the image ID of maximum probability",
        "block.getClnMaxProb": "WonderLens get the maximum probability",
        "block.getClnProbOfId": "WonderLens get image ID [INDEX] probability",
        "block.getFLMaxProbId": "WonderLens get the maximum probability feature learning ID",
        "block.getFLnMaxProb": "WonderLens get the maximum probability",
        "block.getFLnProbOfId": "WonderLens get the probability of feature learning ID [INDEX]",
        "block.isAnyColorDetectd": "Is any color detected ?",
        "block.numOfColorDetected": "WonderLens get the total number of detected colors",
        "block.isColorOfIdDetected": "WonderLens recognized the color ID [NUM] ?",
        "block.getColorOfId": "WonderLens get result from color ID [NUM] content [POS]",
        "block.isAnyLineDetected": "Is any lines detected ?",
        "block.setRoi": "Set the recognition area, coordinates of the upper left X [XPOS] Y [YPOS],width [WIDTH] height [HEIGHT]",
        "block.numOfLineDetected": "WonderLens get the total number of detected lines",
        "block.isLineOfIdDetected": "WonderLens recognized the line ID [NUM] ?",
        "block.getLineOfId": "WonderLens get from result line ID [NUM] content [POS]",
        "block.isAnyTagDetected": "Is any tags detected ?",
        "block.numOfTagDetected": "WonderLens get the total number of detected tags",
        "block.isTagOfIdDetected": "WonderLens recognized the tag ID [NUM] ?",
        "block.numOfTagIdDetected": "WonderLens get the total number of detected tags ID [NUM] ",
        "block.getDataOfTagIdIndex": "WonderLens get from result tags ID [NUM] index [INDEX] content [POS]",
        "block.isAnyQrCodeDetected": "Is any QR code detected ?",
        "block.lenOfQrCodeData": "WonderLens get the length of QR code",
        "block.getStrFromQrCode": "WonderLens analyze QR code content in the form of characters",
        "block.getBytesFromCode": "WonderLens analyze QR code content in the form of bytes",
        "block.isAnyBarCodeDetected": "Is any bar code detected ?",
        "block.lenOfBarCode": "WonderLens get the length of bar code",
        "block.getStrFromBarCode": "WonderLens analyze bar code content in the form of characters",
        "block.getBytesFromBarCode": "WonderLens analyze bar code content in the form of bytes",
        "block.getNumTagMaxProbId": "Get the ID of the maximum probability number",
        "block.getNumTagMaxProb": "Get the number maximum probability",
        "block.getNumTagProbOfId": "Get the number [INDEX] probability",
        "block.getOrientionTagMaxProbId": "Get the ID of the maximum probability landmark",
        "block.getOrientionTagMaxProb": "Get the landmark maximum probability",
        "block.getOrientionTagProbOfId": "Get the landmark [ORIENTION] probability",
        "group.wonder-lens-face": "Face recognition",
        "group.wonder-lens-object": "Object recognition",
        "group.wonder-lens-classification": "Image classification",
        "group.wonder-lens-feature": "Feature learning",
        "group.wonder-lens-color": "Color recognition",
        "group.wonder-lens-line": "Line recognition",
        "group.wonder-lens-tag": "Tag recognition",
        "group.wonder-lens-qr": "QR code recognition",
        "group.wonder-lens-barcode": "Bar code recognition",
        "group.wonder-lens-number": "Number Recognition",
        "group.wonder-lens-landmark": "Landmark Recognition",
        "menu.funcNum.0": "Settings",
        "menu.funcNum.1": "Facial Recognition",
        "menu.funcNum.2": "Object Detection",
        "menu.funcNum.3": "Image Classification",
        "menu.funcNum.4": "Feature Learning",
        "menu.funcNum.5": "Color Recognition",
        "menu.funcNum.6": "Visual Linefollowing",
        "menu.funcNum.7": "April Tag",
        "menu.funcNum.8": "Qr Code",
        "menu.funcNum.9": "Barcode",
        "menu.funcNum.10": "Number",
        "menu.funcNum.11": "Landmark",
        "menu.onOff.1": "ON",
        "menu.onOff.0": "OFF",
        "menu.wonderLensColorResult.0": "X center",
        "menu.wonderLensColorResult.1": "Y center",
        "menu.wonderLensColorResult.2": "width",
        "menu.wonderLensColorResult.3": "height",
        "menu.wonderLensLandmarkIds.1": "forward",
        "menu.wonderLensLandmarkIds.2": "turn left",
        "menu.wonderLensLandmarkIds.3": "turn right",
        "menu.wonderLensLandmarkIds.4": "turn around",
        "menu.wonderLensLandmarkIds.5": "stop",
        "menu.wonderLensLineResult.0": "X start",
        "menu.wonderLensLineResult.1": "Y start",
        "menu.wonderLensLineResult.2": "X end",
        "menu.wonderLensLineResult.3": "Y end",
        "menu.wonderLensLineResult.4": "Inclination angle",
        "menu.wonderLensLineResult.5": "deviation",
        "menu.wonderLensObjects.1": "airplane",
        "menu.wonderLensObjects.2": "bicycle",
        "menu.wonderLensObjects.3": "bird",
        "menu.wonderLensObjects.4": "boat",
        "menu.wonderLensObjects.5": "bottle",
        "menu.wonderLensObjects.6": "bus",
        "menu.wonderLensObjects.7": "car",
        "menu.wonderLensObjects.8": "cat",
        "menu.wonderLensObjects.9": "chair",
        "menu.wonderLensObjects.10": "cow",
        "menu.wonderLensObjects.11": "table",
        "menu.wonderLensObjects.12": "dog",
        "menu.wonderLensObjects.13": "horse",
        "menu.wonderLensObjects.14": "motorcycle",
        "menu.wonderLensObjects.15": "human",
        "menu.wonderLensObjects.16": "plant",
        "menu.wonderLensObjects.17": "sheep",
        "menu.wonderLensObjects.18": "sofa",
        "menu.wonderLensObjects.19": "train",
        "menu.wonderLensObjects.20": "screen",
        "menu.wonderLensTagResult.0": "Center X",
        "menu.wonderLensTagResult.1": "Center Y",
        "menu.wonderLensTagResult.2": "Width",
        "menu.wonderLensTagResult.3": "Height",
        "menu.wonderLensTagResult.4": "X trans",
        "menu.wonderLensTagResult.5": "X rotate",
        "menu.wonderLensTagResult.6": "Y trans",
        "menu.wonderLensTagResult.7": "Y rotate",
        "menu.wonderLensTagResult.8": "Z trans",
        "menu.wonderLensTagResult.9": "Z rotate"
    },
    "zh-tw": {
        "product.name": "WonderLens",
        "block.aimech_wondercamInitI2c": "初始化 WonderLens IIC介面 [IICPORT]",
        "block.minihexa_wondercamInitI2c": "初始化 WonderLens IIC介面",
        "block.aiblocks_wondercamInitI2c": "初始化 WonderLens IIC介面 [IICPORT]",
        "block.getFwVersion": "WonderLens 目前韌體版本",
        "block.getFuncNumber": "功能 [NUM]",
        "block.getCurrentFunc": "WonderLens 目前功能",
        "block.switchFunc": "WonderLens 切換至功能 [NUM]",
        "block.setLed": "[ONOFF] LED",
        "block.wondercamUpdateResult": "WonderLens 更新並取得結果",
        "block.isAnyFaceDetected": "偵測到人臉?",
        "block.numOfDetectedFaces": "WonderLens 偵測到的人臉數量",
        "block.isAnyLearnedFaceRec": "辨識到了已經學習的人臉 ?",
        "block.numOfLearnedFaceRec": "取得辨識到的已經學習的人臉數量",
        "block.isAnyUnlearnedFaceDetected": "辨識到了未學習的人臉 ?",
        "block.isFaceOfIdRec": "辨識到了人臉ID [NUM] ?",
        "block.getFaceOfId": "取得人臉ID [NUM] 的資料 [POS]",
        "block.getUnlearnedFaceOfIndex": "取得第 [NUM] 個未學習的人臉資料 [POS]",
        "block.isAnyObjDetected": "辨識到了任意物品？",
        "block.isObjOfIdDetected": "辨識到了物體 [NUM] ?",
        "block.getObjTotal": "取得辨識到的物體 [NUM] 總數",
        "block.getObjOfId": "取得第 [INDEX] 個辨識到的物體 [NUM] 資料 [POS]",
        "block.getClMaxProbId": "取得圖像分類信賴度最大的ID",
        "block.getClnMaxProb": "取得圖像分類最大信賴度",
        "block.getClnProbOfId": "取得圖像ID [INDEX] 信賴度",
        "block.getFLMaxProbId": "取得特徵學習信賴度最大的ID",
        "block.getFLnMaxProb": "取得特徵學習最大信賴度",
        "block.getFLnProbOfId": "取得特徵學習ID [INDEX] 的信賴度",
        "block.isAnyColorDetectd": "是否偵測到了任意顏色？",
        "block.numOfColorDetected": "取得偵測到的顏色總數",
        "block.isColorOfIdDetected": "WonderLens 偵測到顏色 ID [NUM] ?",
        "block.getColorOfId": "WonderLens 取得顏色 ID [NUM] 的 [POS]",
        "block.isAnyLineDetected": "是否偵測到了線?",
        "block.setRoi": "設定視覺循線的辨識區域，區域的左上角座標 X [XPOS] Y [YPOS] 寬 [WIDTH] 高 [HEIGHT]",
        "block.numOfLineDetected": "取得辨識到的線的總數",
        "block.isLineOfIdDetected": "是否辨識到了線ID [NUM] ?",
        "block.getLineOfId": "取得線ID [NUM] 的資料 [POS]",
        "block.isAnyTagDetected": "是否辨識到任意標籤？",
        "block.numOfTagDetected": "取得辨識到的標籤總數",
        "block.isTagOfIdDetected": "是否辨識到標籤ID [NUM] ?",
        "block.numOfTagIdDetected": "取得辨識到的標籤ID [NUM] 總數",
        "block.getDataOfTagIdIndex": "取得第 [INDEX] 辨識到的標籤ID [NUM] 的資料 [POS]",
        "block.isAnyQrCodeDetected": "是否有二維碼被辨識到？",
        "block.lenOfQrCodeData": "取得二維碼的長度",
        "block.getStrFromQrCode": "以字串格式取得二維碼的內容",
        "block.getBytesFromCode": "以bytes(位元組陣列)格式取得二維碼的內容",
        "block.isAnyBarCodeDetected": "是否有條碼被辨識到？",
        "block.lenOfBarCode": "取得條碼的長度",
        "block.getStrFromBarCode": "以字串格式取得條碼的內容",
        "block.getBytesFromBarCode": "以bytes(位元組陣列)格式取得條碼的內容",
        "block.getNumTagMaxProbId": "取得數字辨識信賴度最大的數字",
        "block.getNumTagMaxProb": "取得數字辨識最大的信賴度",
        "block.getNumTagProbOfId": "取得數字 [INDEX] 的信賴度",
        "block.getOrientionTagMaxProbId": "取得路標辨識信賴度最大的編號",
        "block.getOrientionTagMaxProb": "取得路標辨識最大的信賴度",
        "block.getOrientionTagProbOfId": "取得路標 [ORIENTION] 的信賴度",
        "group.wonder-lens-face": "人臉辨識",
        "group.wonder-lens-object": "物體辨識",
        "group.wonder-lens-classification": "圖像分類",
        "group.wonder-lens-feature": "特徵學習",
        "group.wonder-lens-color": "顏色辨識",
        "group.wonder-lens-line": "循線辨識",
        "group.wonder-lens-tag": "標籤辨識",
        "group.wonder-lens-qr": "二維碼辨識",
        "group.wonder-lens-barcode": "條碼辨識",
        "group.wonder-lens-number": "數字辨識",
        "group.wonder-lens-landmark": "路標辨識",
        "menu.funcNum.0": "設定",
        "menu.funcNum.1": "人臉辨識",
        "menu.funcNum.2": "物體偵測",
        "menu.funcNum.3": "圖像分類",
        "menu.funcNum.4": "特徵學習",
        "menu.funcNum.5": "顏色辨識",
        "menu.funcNum.6": "視覺循線",
        "menu.funcNum.7": "AprilTag",
        "menu.funcNum.8": "二維碼",
        "menu.funcNum.9": "條碼",
        "menu.funcNum.10": "數字",
        "menu.funcNum.11": "地標",
        "menu.onOff.1": "開",
        "menu.onOff.0": "關",
        "menu.wonderLensColorResult.0": "中心 X",
        "menu.wonderLensColorResult.1": "中心 Y",
        "menu.wonderLensColorResult.2": "寬度",
        "menu.wonderLensColorResult.3": "高度",
        "menu.wonderLensLandmarkIds.1": "前進",
        "menu.wonderLensLandmarkIds.2": "左轉",
        "menu.wonderLensLandmarkIds.3": "右轉",
        "menu.wonderLensLandmarkIds.4": "迴轉",
        "menu.wonderLensLandmarkIds.5": "停止",
        "menu.wonderLensLineResult.0": "箭頭X",
        "menu.wonderLensLineResult.1": "箭頭Y",
        "menu.wonderLensLineResult.2": "箭尾X",
        "menu.wonderLensLineResult.3": "箭尾Y",
        "menu.wonderLensLineResult.4": "角度",
        "menu.wonderLensLineResult.5": "偏移",
        "menu.wonderLensObjects.1": "飛機",
        "menu.wonderLensObjects.2": "自行車",
        "menu.wonderLensObjects.3": "鳥",
        "menu.wonderLensObjects.4": "船",
        "menu.wonderLensObjects.5": "瓶子",
        "menu.wonderLensObjects.6": "巴士",
        "menu.wonderLensObjects.7": "車",
        "menu.wonderLensObjects.8": "貓",
        "menu.wonderLensObjects.9": "椅子",
        "menu.wonderLensObjects.10": "牛",
        "menu.wonderLensObjects.11": "餐桌",
        "menu.wonderLensObjects.12": "狗",
        "menu.wonderLensObjects.13": "馬",
        "menu.wonderLensObjects.14": "摩托車",
        "menu.wonderLensObjects.15": "人",
        "menu.wonderLensObjects.16": "盆栽",
        "menu.wonderLensObjects.17": "綿羊",
        "menu.wonderLensObjects.18": "沙發",
        "menu.wonderLensObjects.19": "火車",
        "menu.wonderLensObjects.20": "顯示器",
        "menu.wonderLensTagResult.0": "中心X",
        "menu.wonderLensTagResult.1": "中心Y",
        "menu.wonderLensTagResult.2": "寬度",
        "menu.wonderLensTagResult.3": "高度",
        "menu.wonderLensTagResult.4": "X軸變換",
        "menu.wonderLensTagResult.5": "X軸旋轉",
        "menu.wonderLensTagResult.6": "Y軸變換",
        "menu.wonderLensTagResult.7": "Y軸旋轉",
        "menu.wonderLensTagResult.8": "Z軸變換",
        "menu.wonderLensTagResult.9": "Z軸旋轉"
    },
    ko: {
        "product.name": "WonderLens",
        "block.aimech_wondercamInitI2c": "WonderLens IIC 포트 [IICPORT] 초기화하기",
        "block.minihexa_wondercamInitI2c": "WonderLens IIC 인터페이스 초기화하기",
        "block.aiblocks_wondercamInitI2c": "WonderLens IIC 포트 [IICPORT] 초기화하기",
        "block.getFwVersion": "WonderLens 현재 펌웨어 버전",
        "block.getFuncNumber": "기능 [NUM]",
        "block.getCurrentFunc": "WonderLens 현재 기능",
        "block.switchFunc": "WonderLens 기능을 [NUM] 로 전환하기",
        "block.setLed": "LED [ONOFF]",
        "block.wondercamUpdateResult": "WonderLens 결과 갱신하고 읽기",
        "block.isAnyFaceDetected": "얼굴이 감지되었는가?",
        "block.numOfDetectedFaces": "WonderLens 감지된 얼굴 수",
        "block.isAnyLearnedFaceRec": "학습한 얼굴이 인식되었는가?",
        "block.numOfLearnedFaceRec": "인식된 학습한 얼굴 수 읽기",
        "block.isAnyUnlearnedFaceDetected": "학습하지 않은 얼굴이 인식되었는가?",
        "block.isFaceOfIdRec": "얼굴 ID [NUM] 이 인식되었는가?",
        "block.getFaceOfId": "얼굴 ID [NUM] 의 데이터 [POS] 읽기",
        "block.getUnlearnedFaceOfIndex": "학습하지 않은 [NUM] 번째 얼굴 데이터 [POS] 읽기",
        "block.isAnyObjDetected": "물체가 인식되었는가?",
        "block.isObjOfIdDetected": "물체 [NUM] 이 인식되었는가?",
        "block.getObjTotal": "인식된 물체 [NUM] 의 총수 읽기",
        "block.getObjOfId": "인식된 물체 [NUM] 의 [INDEX] 번째 데이터 [POS] 읽기",
        "block.getClMaxProbId": "이미지 분류 신뢰도가 가장 높은 ID 읽기",
        "block.getClnMaxProb": "이미지 분류 최대 신뢰도 읽기",
        "block.getClnProbOfId": "이미지 ID [INDEX] 의 신뢰도 읽기",
        "block.getFLMaxProbId": "특징 학습 신뢰도가 가장 높은 ID 읽기",
        "block.getFLnMaxProb": "특징 학습 최대 신뢰도 읽기",
        "block.getFLnProbOfId": "특징 학습 ID [INDEX] 의 신뢰도 읽기",
        "block.isAnyColorDetectd": "색상이 감지되었는가?",
        "block.numOfColorDetected": "감지된 색상의 총수 읽기",
        "block.isColorOfIdDetected": "WonderLens 색상 ID [NUM] 이 감지되었는가?",
        "block.getColorOfId": "WonderLens 색상 ID [NUM] 의 [POS] 읽기",
        "block.isAnyLineDetected": "선이 감지되었는가?",
        "block.setRoi": "시각 라인 추적 인식 영역 설정하기: 왼쪽 위 좌표 X [XPOS] Y [YPOS] 너비 [WIDTH] 높이 [HEIGHT]",
        "block.numOfLineDetected": "인식된 선의 총수 읽기",
        "block.isLineOfIdDetected": "선 ID [NUM] 이 인식되었는가?",
        "block.getLineOfId": "선 ID [NUM] 의 데이터 [POS] 읽기",
        "block.isAnyTagDetected": "태그가 인식되었는가?",
        "block.numOfTagDetected": "인식된 태그의 총수 읽기",
        "block.isTagOfIdDetected": "태그 ID [NUM] 이 인식되었는가?",
        "block.numOfTagIdDetected": "인식된 태그 ID [NUM] 의 총수 읽기",
        "block.getDataOfTagIdIndex": "인식된 태그 ID [NUM] 의 [INDEX] 번째 데이터 [POS] 읽기",
        "block.isAnyQrCodeDetected": "QR 코드가 인식되었는가?",
        "block.lenOfQrCodeData": "QR 코드 데이터 길이 읽기",
        "block.getStrFromQrCode": "QR 코드 내용을 문자열로 읽기",
        "block.getBytesFromCode": "QR 코드 내용을 bytes(바이트 배열)로 읽기",
        "block.isAnyBarCodeDetected": "바코드가 인식되었는가?",
        "block.lenOfBarCode": "바코드 데이터 길이 읽기",
        "block.getStrFromBarCode": "바코드 내용을 문자열로 읽기",
        "block.getBytesFromBarCode": "바코드 내용을 bytes(바이트 배열)로 읽기",
        "block.getNumTagMaxProbId": "숫자 인식 신뢰도가 가장 높은 숫자 읽기",
        "block.getNumTagMaxProb": "숫자 인식 최대 신뢰도 읽기",
        "block.getNumTagProbOfId": "숫자 [INDEX] 의 신뢰도 읽기",
        "block.getOrientionTagMaxProbId": "도로 표지 인식 신뢰도가 가장 높은 ID 읽기",
        "block.getOrientionTagMaxProb": "도로 표지 인식 최대 신뢰도 읽기",
        "block.getOrientionTagProbOfId": "도로 표지 [ORIENTION] 의 신뢰도 읽기",
        "group.wonder-lens-face": "얼굴 인식",
        "group.wonder-lens-object": "물체 인식",
        "group.wonder-lens-classification": "이미지 분류",
        "group.wonder-lens-feature": "특징 학습",
        "group.wonder-lens-color": "색상 인식",
        "group.wonder-lens-line": "라인 인식",
        "group.wonder-lens-tag": "태그 인식",
        "group.wonder-lens-qr": "QR 코드 인식",
        "group.wonder-lens-barcode": "바코드 인식",
        "group.wonder-lens-number": "숫자 인식",
        "group.wonder-lens-landmark": "도로 표지 인식",
        "menu.funcNum.0": "설정",
        "menu.funcNum.1": "얼굴 인식",
        "menu.funcNum.2": "물체 감지",
        "menu.funcNum.3": "이미지 분류",
        "menu.funcNum.4": "특징 학습",
        "menu.funcNum.5": "색상 인식",
        "menu.funcNum.6": "시각 라인 추적",
        "menu.funcNum.7": "AprilTag",
        "menu.funcNum.8": "QR 코드",
        "menu.funcNum.9": "바코드",
        "menu.funcNum.10": "숫자",
        "menu.funcNum.11": "랜드마크",
        "menu.onOff.1": "켜기",
        "menu.onOff.0": "끄기",
        "menu.wonderLensColorResult.0": "중심 X",
        "menu.wonderLensColorResult.1": "중심 Y",
        "menu.wonderLensColorResult.2": "너비",
        "menu.wonderLensColorResult.3": "높이",
        "menu.wonderLensLandmarkIds.1": "전진",
        "menu.wonderLensLandmarkIds.2": "좌회전",
        "menu.wonderLensLandmarkIds.3": "우회전",
        "menu.wonderLensLandmarkIds.4": "유턴",
        "menu.wonderLensLandmarkIds.5": "정지",
        "menu.wonderLensLineResult.0": "화살촉 X",
        "menu.wonderLensLineResult.1": "화살촉 Y",
        "menu.wonderLensLineResult.2": "화살꼬리 X",
        "menu.wonderLensLineResult.3": "화살꼬리 Y",
        "menu.wonderLensLineResult.4": "각도",
        "menu.wonderLensLineResult.5": "편차",
        "menu.wonderLensObjects.1": "비행기",
        "menu.wonderLensObjects.2": "자전거",
        "menu.wonderLensObjects.3": "새",
        "menu.wonderLensObjects.4": "배",
        "menu.wonderLensObjects.5": "병",
        "menu.wonderLensObjects.6": "버스",
        "menu.wonderLensObjects.7": "자동차",
        "menu.wonderLensObjects.8": "고양이",
        "menu.wonderLensObjects.9": "의자",
        "menu.wonderLensObjects.10": "소",
        "menu.wonderLensObjects.11": "식탁",
        "menu.wonderLensObjects.12": "개",
        "menu.wonderLensObjects.13": "말",
        "menu.wonderLensObjects.14": "오토바이",
        "menu.wonderLensObjects.15": "사람",
        "menu.wonderLensObjects.16": "화분",
        "menu.wonderLensObjects.17": "양",
        "menu.wonderLensObjects.18": "소파",
        "menu.wonderLensObjects.19": "기차",
        "menu.wonderLensObjects.20": "디스플레이",
        "menu.wonderLensTagResult.0": "중심 X",
        "menu.wonderLensTagResult.1": "중심 Y",
        "menu.wonderLensTagResult.2": "너비",
        "menu.wonderLensTagResult.3": "높이",
        "menu.wonderLensTagResult.4": "X축 이동",
        "menu.wonderLensTagResult.5": "X축 회전",
        "menu.wonderLensTagResult.6": "Y축 이동",
        "menu.wonderLensTagResult.7": "Y축 회전",
        "menu.wonderLensTagResult.8": "Z축 이동",
        "menu.wonderLensTagResult.9": "Z축 회전"
    }
} as const;

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class WonderLensBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private checkVariant (): void {
        if (!['hiwonder-dev-port', 'hiwonder-dev-onboard', 'hiwonder-iic'].includes(this.context.variant)) {
            throw new Error('wonder-lens: 未支持的主控适配 ' + this.context.variant);
        }
    }

    getInfo (): ExtensionInfo {
        this.checkVariant();
        let initialization: ExtensionBlock;
        if (this.context.variant === 'hiwonder-dev-port') {
            initialization = {
                opcode: "aimech_wondercamInitI2c",
                blockType: "command",
                text: this.context.t('block.aimech_wondercamInitI2c'),
                blockIconURI: this.context.asset('assets/cam.svg'),
                arguments: {
                    IICPORT: {
                        type: "string",
                        defaultValue: this.context.defaultPort('aimech_wondercamInitI2c', 'IICPORT'),
                        menu: "aimech_iicport",
                        literal: true
                    }
                }
            };
        } else if (this.context.variant === 'hiwonder-dev-onboard') {
            initialization = {
                opcode: "minihexa_wondercamInitI2c",
                blockType: "command",
                text: this.context.t('block.minihexa_wondercamInitI2c'),
                blockIconURI: this.context.asset('assets/cam.svg'),
                arguments: {}
            };
        } else {
            initialization = {
                opcode: "aiblocks_wondercamInitI2c",
                blockType: "command",
                text: this.context.t('block.aiblocks_wondercamInitI2c'),
                blockIconURI: this.context.asset('assets/cam.svg'),
                arguments: {
                    IICPORT: {
                        type: "string",
                        defaultValue: this.context.defaultPort('aiblocks_wondercamInitI2c', 'IICPORT'),
                        menu: "aiblocks_iicport",
                        literal: true
                    }
                }
            };
        }
        const menus: NonNullable<ExtensionInfo['menus']> = {
            funcNum: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t('menu.funcNum.0'),
                        value: "0"
                    },
                    {
                        text: this.context.t('menu.funcNum.1'),
                        value: "1"
                    },
                    {
                        text: this.context.t('menu.funcNum.2'),
                        value: "2"
                    },
                    {
                        text: this.context.t('menu.funcNum.3'),
                        value: "3"
                    },
                    {
                        text: this.context.t('menu.funcNum.4'),
                        value: "4"
                    },
                    {
                        text: this.context.t('menu.funcNum.5'),
                        value: "5"
                    },
                    {
                        text: this.context.t('menu.funcNum.6'),
                        value: "6"
                    },
                    {
                        text: this.context.t('menu.funcNum.7'),
                        value: "7"
                    },
                    {
                        text: this.context.t('menu.funcNum.8'),
                        value: "8"
                    },
                    {
                        text: this.context.t('menu.funcNum.9'),
                        value: "9"
                    },
                    {
                        text: this.context.t('menu.funcNum.10'),
                        value: "10"
                    },
                    {
                        text: this.context.t('menu.funcNum.11'),
                        value: "11"
                    }
                ]
            },
            onOff: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t('menu.onOff.1'),
                        value: "1"
                    },
                    {
                        text: this.context.t('menu.onOff.0'),
                        value: "0"
                    }
                ]
            },
            wonderLensColorResult: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t('menu.wonderLensColorResult.0'),
                        value: "0"
                    },
                    {
                        text: this.context.t('menu.wonderLensColorResult.1'),
                        value: "1"
                    },
                    {
                        text: this.context.t('menu.wonderLensColorResult.2'),
                        value: "2"
                    },
                    {
                        text: this.context.t('menu.wonderLensColorResult.3'),
                        value: "3"
                    }
                ]
            },
            wonderLensLandmarkIds: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t('menu.wonderLensLandmarkIds.1'),
                        value: "1"
                    },
                    {
                        text: this.context.t('menu.wonderLensLandmarkIds.2'),
                        value: "2"
                    },
                    {
                        text: this.context.t('menu.wonderLensLandmarkIds.3'),
                        value: "3"
                    },
                    {
                        text: this.context.t('menu.wonderLensLandmarkIds.4'),
                        value: "4"
                    },
                    {
                        text: this.context.t('menu.wonderLensLandmarkIds.5'),
                        value: "5"
                    }
                ]
            },
            wonderLensLineResult: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t('menu.wonderLensLineResult.0'),
                        value: "0"
                    },
                    {
                        text: this.context.t('menu.wonderLensLineResult.1'),
                        value: "1"
                    },
                    {
                        text: this.context.t('menu.wonderLensLineResult.2'),
                        value: "2"
                    },
                    {
                        text: this.context.t('menu.wonderLensLineResult.3'),
                        value: "3"
                    },
                    {
                        text: this.context.t('menu.wonderLensLineResult.4'),
                        value: "4"
                    },
                    {
                        text: this.context.t('menu.wonderLensLineResult.5'),
                        value: "5"
                    }
                ]
            },
            wonderLensNumberIds: {
                acceptReporters: false,
                items: [
                    {
                        text: "1",
                        value: "1"
                    },
                    {
                        text: "2",
                        value: "2"
                    },
                    {
                        text: "3",
                        value: "3"
                    },
                    {
                        text: "4",
                        value: "4"
                    },
                    {
                        text: "5",
                        value: "5"
                    },
                    {
                        text: "6",
                        value: "6"
                    }
                ]
            },
            wonderLensObjects: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t('menu.wonderLensObjects.1'),
                        value: "1"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.2'),
                        value: "2"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.3'),
                        value: "3"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.4'),
                        value: "4"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.5'),
                        value: "5"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.6'),
                        value: "6"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.7'),
                        value: "7"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.8'),
                        value: "8"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.9'),
                        value: "9"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.10'),
                        value: "10"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.11'),
                        value: "11"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.12'),
                        value: "12"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.13'),
                        value: "13"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.14'),
                        value: "14"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.15'),
                        value: "15"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.16'),
                        value: "16"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.17'),
                        value: "17"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.18'),
                        value: "18"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.19'),
                        value: "19"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.20'),
                        value: "20"
                    }
                ]
            },
            wonderLensTagResult: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t('menu.wonderLensTagResult.0'),
                        value: "0"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.1'),
                        value: "1"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.2'),
                        value: "2"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.3'),
                        value: "3"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.4'),
                        value: "4"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.5'),
                        value: "5"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.6'),
                        value: "6"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.7'),
                        value: "7"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.8'),
                        value: "8"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.9'),
                        value: "9"
                    }
                ]
            }
        };
        if (this.context.variant !== 'hiwonder-dev-onboard') {
            const menu = this.context.variant === 'hiwonder-dev-port' ? 'aimech_iicport' : 'aiblocks_iicport';
            menus[menu] = {acceptReporters: false, items: this.context.ports('sensor.' + menu)};
        }
        return {
            id: "sensor",
            name: this.context.t(product.name),
            color1: "#7B68EE",
            color2: "#7B68EE",
            color3: "#7B68EE",
            menus: menus,
            blocks: [
                {
                    subCategory: this.context.t(product.name),
                    toolboxCategoryId: "sensor__wonder-lens",
                    toolboxIconURI: this.context.asset('assets/cam.svg')
                },
                initialization,
                {
                    opcode: "getFwVersion",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getFwVersion'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getFuncNumber",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getFuncNumber'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "0",
                            menu: "funcNum",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "getCurrentFunc",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getCurrentFunc'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "switchFunc",
                    blockType: "command",
                    text: this.context.t('block.switchFunc'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "0",
                            menu: "funcNum",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "setLed",
                    blockType: "command",
                    text: this.context.t('block.setLed'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        ONOFF: {
                            type: "string",
                            defaultValue: "1",
                            menu: "onOff",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "wondercamUpdateResult",
                    blockType: "command",
                    text: this.context.t('block.wondercamUpdateResult'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-face'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-face",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-face')
                },
                {
                    opcode: "isAnyFaceDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyFaceDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "numOfDetectedFaces",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.numOfDetectedFaces'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "isAnyLearnedFaceRec",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyLearnedFaceRec'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "numOfLearnedFaceRec",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.numOfLearnedFaceRec'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "isAnyUnlearnedFaceDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyUnlearnedFaceDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "isFaceOfIdRec",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isFaceOfIdRec'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "getFaceOfId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getFaceOfId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        },
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "wonderLensColorResult",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "getUnlearnedFaceOfIndex",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getUnlearnedFaceOfIndex'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        },
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "wonderLensColorResult",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-object'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-object",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-object')
                },
                {
                    opcode: "isAnyObjDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyObjDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "isObjOfIdDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isObjOfIdDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "1",
                            menu: "wonderLensObjects",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "getObjTotal",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getObjTotal'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "1",
                            menu: "wonderLensObjects",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "getObjOfId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getObjOfId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        INDEX: {
                            type: "number",
                            defaultValue: 1
                        },
                        NUM: {
                            type: "string",
                            defaultValue: "1",
                            menu: "wonderLensObjects",
                            literal: true
                        },
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "wonderLensColorResult",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-classification'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-classification",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-classification')
                },
                {
                    opcode: "getClMaxProbId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getClMaxProbId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getClnMaxProb",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getClnMaxProb'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getClnProbOfId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getClnProbOfId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        INDEX: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-feature'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-feature",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-feature')
                },
                {
                    opcode: "getFLMaxProbId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getFLMaxProbId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getFLnMaxProb",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getFLnMaxProb'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getFLnProbOfId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getFLnProbOfId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        INDEX: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-color'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-color",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-color')
                },
                {
                    opcode: "isAnyColorDetectd",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyColorDetectd'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "numOfColorDetected",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.numOfColorDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "isColorOfIdDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isColorOfIdDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "getColorOfId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getColorOfId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        },
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "wonderLensColorResult",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-line'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-line",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-line')
                },
                {
                    opcode: "isAnyLineDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyLineDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "setRoi",
                    blockType: "command",
                    text: this.context.t('block.setRoi'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        XPOS: {
                            type: "number",
                            defaultValue: 0
                        },
                        YPOS: {
                            type: "number",
                            defaultValue: 0
                        },
                        WIDTH: {
                            type: "number",
                            defaultValue: 320
                        },
                        HEIGHT: {
                            type: "number",
                            defaultValue: 240
                        }
                    }
                },
                {
                    opcode: "numOfLineDetected",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.numOfLineDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "isLineOfIdDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isLineOfIdDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "getLineOfId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getLineOfId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        },
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "wonderLensLineResult",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-tag'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-tag",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-tag')
                },
                {
                    opcode: "isAnyTagDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyTagDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "numOfTagDetected",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.numOfTagDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "isTagOfIdDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isTagOfIdDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "numOfTagIdDetected",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.numOfTagIdDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "getDataOfTagIdIndex",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getDataOfTagIdIndex'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        INDEX: {
                            type: "number",
                            defaultValue: 1
                        },
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        },
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "wonderLensTagResult",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-qr'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-qr",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-qr')
                },
                {
                    opcode: "isAnyQrCodeDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyQrCodeDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "lenOfQrCodeData",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.lenOfQrCodeData'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getStrFromQrCode",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getStrFromQrCode'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getBytesFromCode",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getBytesFromCode'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-barcode'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-barcode",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-barcode')
                },
                {
                    opcode: "isAnyBarCodeDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyBarCodeDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "lenOfBarCode",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.lenOfBarCode'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getStrFromBarCode",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getStrFromBarCode'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getBytesFromBarCode",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getBytesFromBarCode'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-number'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-number",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-number')
                },
                {
                    opcode: "getNumTagMaxProbId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getNumTagMaxProbId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getNumTagMaxProb",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getNumTagMaxProb'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getNumTagProbOfId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getNumTagProbOfId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        INDEX: {
                            type: "string",
                            defaultValue: "1",
                            menu: "wonderLensNumberIds",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-landmark'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-landmark",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-landmark')
                },
                {
                    opcode: "getOrientionTagMaxProbId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getOrientionTagMaxProbId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getOrientionTagMaxProb",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getOrientionTagMaxProb'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getOrientionTagProbOfId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getOrientionTagProbOfId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        ORIENTION: {
                            type: "string",
                            defaultValue: "1",
                            menu: "wonderLensLandmarkIds",
                            literal: true
                        }
                    }
                }
            ]
        };
    }

    // 每个适配只注册自己的初始化；读取和更新不隐式创建 cam，也不执行硬件操作。
    getPython (): Record<string, PythonTemplate> {
        this.checkVariant();
        let initialization: Record<string, PythonTemplate>;
        if (this.context.variant === 'hiwonder-dev-port') {
            initialization = {
                aimech_wondercamInitI2c: {
                    template: "",
                    imports: [
                        "import Hiwonder_DEV"
                    ],
                    variables: [
                        "cam = Hiwonder_DEV.WonderCam(Hiwonder_DEV.Port({IICPORT}))"
                    ]
                }
            };
        } else if (this.context.variant === 'hiwonder-dev-onboard') {
            initialization = {
                minihexa_wondercamInitI2c: {
                    template: "",
                    imports: [
                        "import Hiwonder_DEV"
                    ],
                    variables: [
                        "cam = Hiwonder_DEV.WonderCam()"
                    ]
                }
            };
        } else {
            initialization = {
                aiblocks_wondercamInitI2c: {
                    template: "",
                    imports: [
                        "import Hiwonder_IIC"
                    ],
                    variables: [
                        "iic = Hiwonder_IIC.IIC()",
                        "cam = Hiwonder_IIC.WonderCam(iic,{IICPORT})"
                    ]
                }
            };
        }
        return {
            ...initialization,
            getFwVersion: {
                template: "cam.getFwVersion()"
            },
            getFuncNumber: {
                template: "{NUM}",
                templateSelector: {
                    argument: "NUM",
                    cases: {
                        "0": "cam.FuncNone",
                        "1": "cam.FaceDetect",
                        "2": "cam.ObjectDetect",
                        "3": "cam.Classification",
                        "4": "cam.FeatureLearning",
                        "5": "cam.ColorDetect",
                        "6": "cam.LineFollowing",
                        "7": "cam.AprilTag",
                        "8": "cam.QrCode",
                        "9": "cam.BarCode",
                        "10": "cam.NumberRecognition",
                        "11": "cam.LandmarkRecognition"
                    }
                }
            },
            getCurrentFunc: {
                template: "cam.getCurrentFunc()"
            },
            switchFunc: {
                template: "cam.switchFunc({NUM})",
                templateSelector: {
                    argument: "NUM",
                    cases: {
                        "0": "cam.switchFunc(cam.FuncNone)",
                        "1": "cam.switchFunc(cam.FaceDetect)",
                        "2": "cam.switchFunc(cam.ObjectDetect)",
                        "3": "cam.switchFunc(cam.Classification)",
                        "4": "cam.switchFunc(cam.FeatureLearning)",
                        "5": "cam.switchFunc(cam.ColorDetect)",
                        "6": "cam.switchFunc(cam.LineFollowing)",
                        "7": "cam.switchFunc(cam.AprilTag)",
                        "8": "cam.switchFunc(cam.QrCode)",
                        "9": "cam.switchFunc(cam.BarCode)",
                        "10": "cam.switchFunc(cam.NumberRecognition)",
                        "11": "cam.switchFunc(cam.LandmarkRecognition)"
                    }
                }
            },
            setLed: {
                template: "cam.setLed({ONOFF})",
                templateSelector: {
                    argument: "ONOFF",
                    cases: {
                        "0": "cam.setLed(cam.LED_OFF)",
                        "1": "cam.setLed(cam.LED_ON)"
                    }
                }
            },
            wondercamUpdateResult: {
                template: "cam.updateResult()"
            },
            isAnyFaceDetected: {
                template: "cam.isAnyFaceDetected()"
            },
            numOfDetectedFaces: {
                template: "cam.numOfDetectedFaces()"
            },
            isAnyLearnedFaceRec: {
                template: "cam.isAnyLearnedFaceRec()"
            },
            numOfLearnedFaceRec: {
                template: "cam.numOfLearnedFaceRec()"
            },
            isAnyUnlearnedFaceDetected: {
                template: "cam.isAnyUnlearnedFaceDetected()"
            },
            isFaceOfIdRec: {
                template: "cam.isFaceOfIdRec({NUM})"
            },
            getFaceOfId: {
                template: "cam.getFaceOfId({NUM})[{POS}]"
            },
            getUnlearnedFaceOfIndex: {
                template: "cam.getUnlearnedFaceOfIndex({NUM})[{POS}]"
            },
            isAnyObjDetected: {
                template: "cam.isAnyObjDetected()"
            },
            isObjOfIdDetected: {
                template: "cam.isObjOfIdDetected({NUM})",
                templateSelector: {
                    argument: "NUM",
                    cases: {
                        "1": "cam.isObjOfIdDetected(cam.Aeroplane)",
                        "2": "cam.isObjOfIdDetected(cam.Bicycle)",
                        "3": "cam.isObjOfIdDetected(cam.Bird)",
                        "4": "cam.isObjOfIdDetected(cam.Boat)",
                        "5": "cam.isObjOfIdDetected(cam.Bottle)",
                        "6": "cam.isObjOfIdDetected(cam.Bus)",
                        "7": "cam.isObjOfIdDetected(cam.Car)",
                        "8": "cam.isObjOfIdDetected(cam.Cat)",
                        "9": "cam.isObjOfIdDetected(cam.Chair)",
                        "10": "cam.isObjOfIdDetected(cam.Cow)",
                        "11": "cam.isObjOfIdDetected(cam.Diningtable)",
                        "12": "cam.isObjOfIdDetected(cam.Dog)",
                        "13": "cam.isObjOfIdDetected(cam.Horse)",
                        "14": "cam.isObjOfIdDetected(cam.Motorbike)",
                        "15": "cam.isObjOfIdDetected(cam.Person)",
                        "16": "cam.isObjOfIdDetected(cam.Pottedplant)",
                        "17": "cam.isObjOfIdDetected(cam.Sheep)",
                        "18": "cam.isObjOfIdDetected(cam.Sofa)",
                        "19": "cam.isObjOfIdDetected(cam.Train)",
                        "20": "cam.isObjOfIdDetected(cam.Monitor)"
                    }
                }
            },
            getObjTotal: {
                template: "cam.numOfObjOfIdDetected({NUM})",
                templateSelector: {
                    argument: "NUM",
                    cases: {
                        "1": "cam.numOfObjOfIdDetected(cam.Aeroplane)",
                        "2": "cam.numOfObjOfIdDetected(cam.Bicycle)",
                        "3": "cam.numOfObjOfIdDetected(cam.Bird)",
                        "4": "cam.numOfObjOfIdDetected(cam.Boat)",
                        "5": "cam.numOfObjOfIdDetected(cam.Bottle)",
                        "6": "cam.numOfObjOfIdDetected(cam.Bus)",
                        "7": "cam.numOfObjOfIdDetected(cam.Car)",
                        "8": "cam.numOfObjOfIdDetected(cam.Cat)",
                        "9": "cam.numOfObjOfIdDetected(cam.Chair)",
                        "10": "cam.numOfObjOfIdDetected(cam.Cow)",
                        "11": "cam.numOfObjOfIdDetected(cam.Diningtable)",
                        "12": "cam.numOfObjOfIdDetected(cam.Dog)",
                        "13": "cam.numOfObjOfIdDetected(cam.Horse)",
                        "14": "cam.numOfObjOfIdDetected(cam.Motorbike)",
                        "15": "cam.numOfObjOfIdDetected(cam.Person)",
                        "16": "cam.numOfObjOfIdDetected(cam.Pottedplant)",
                        "17": "cam.numOfObjOfIdDetected(cam.Sheep)",
                        "18": "cam.numOfObjOfIdDetected(cam.Sofa)",
                        "19": "cam.numOfObjOfIdDetected(cam.Train)",
                        "20": "cam.numOfObjOfIdDetected(cam.Monitor)"
                    }
                }
            },
            getObjOfId: {
                template: "cam.getObjOfId({NUM},{INDEX})[{POS}]",
                templateSelector: {
                    argument: "NUM",
                    cases: {
                        "1": "cam.getObjOfId(cam.Aeroplane,{INDEX})[{POS}]",
                        "2": "cam.getObjOfId(cam.Bicycle,{INDEX})[{POS}]",
                        "3": "cam.getObjOfId(cam.Bird,{INDEX})[{POS}]",
                        "4": "cam.getObjOfId(cam.Boat,{INDEX})[{POS}]",
                        "5": "cam.getObjOfId(cam.Bottle,{INDEX})[{POS}]",
                        "6": "cam.getObjOfId(cam.Bus,{INDEX})[{POS}]",
                        "7": "cam.getObjOfId(cam.Car,{INDEX})[{POS}]",
                        "8": "cam.getObjOfId(cam.Cat,{INDEX})[{POS}]",
                        "9": "cam.getObjOfId(cam.Chair,{INDEX})[{POS}]",
                        "10": "cam.getObjOfId(cam.Cow,{INDEX})[{POS}]",
                        "11": "cam.getObjOfId(cam.Diningtable,{INDEX})[{POS}]",
                        "12": "cam.getObjOfId(cam.Dog,{INDEX})[{POS}]",
                        "13": "cam.getObjOfId(cam.Horse,{INDEX})[{POS}]",
                        "14": "cam.getObjOfId(cam.Motorbike,{INDEX})[{POS}]",
                        "15": "cam.getObjOfId(cam.Person,{INDEX})[{POS}]",
                        "16": "cam.getObjOfId(cam.Pottedplant,{INDEX})[{POS}]",
                        "17": "cam.getObjOfId(cam.Sheep,{INDEX})[{POS}]",
                        "18": "cam.getObjOfId(cam.Sofa,{INDEX})[{POS}]",
                        "19": "cam.getObjOfId(cam.Train,{INDEX})[{POS}]",
                        "20": "cam.getObjOfId(cam.Monitor,{INDEX})[{POS}]"
                    }
                }
            },
            getClMaxProbId: {
                template: "cam.getClMaxProbId()"
            },
            getClnMaxProb: {
                template: "cam.getClMaxProb()"
            },
            getClnProbOfId: {
                template: "cam.getClProbOfId({INDEX})"
            },
            getFLMaxProbId: {
                template: "cam.getFLMaxProbId()"
            },
            getFLnMaxProb: {
                template: "cam.getFLMaxProb()"
            },
            getFLnProbOfId: {
                template: "cam.getFLProbOfId({INDEX})"
            },
            isAnyColorDetectd: {
                template: "cam.isAnyColorDetected()"
            },
            numOfColorDetected: {
                template: "cam.numOfColorDetected()"
            },
            isColorOfIdDetected: {
                template: "cam.isColorOfIdDetected({NUM})"
            },
            getColorOfId: {
                template: "cam.getColorOfId({NUM})[{POS}]"
            },
            isAnyLineDetected: {
                template: "cam.isAnyLineDetected()"
            },
            setRoi: {
                template: "cam.setRoi({XPOS},{YPOS},{WIDTH},{HEIGHT})"
            },
            numOfLineDetected: {
                template: "cam.numOfLineDetected()"
            },
            isLineOfIdDetected: {
                template: "cam.isLineOfIdDetected({NUM})"
            },
            getLineOfId: {
                template: "cam.getLineOfId({NUM})[{POS}]"
            },
            isAnyTagDetected: {
                template: "cam.isAnyTagDetected()"
            },
            numOfTagDetected: {
                template: "cam.numOfTagDetected()"
            },
            isTagOfIdDetected: {
                template: "cam.isTagOfIdDetected({NUM})"
            },
            numOfTagIdDetected: {
                template: "cam.numOfTagIdDetected({NUM})"
            },
            getDataOfTagIdIndex: {
                template: "cam.getDataOfTagIdIndex({NUM},{INDEX})[{POS}]"
            },
            isAnyQrCodeDetected: {
                template: "cam.isAnyQrCodeDetected()"
            },
            lenOfQrCodeData: {
                template: "cam.lenOfQrCodeData()"
            },
            getStrFromQrCode: {
                template: "cam.getStrFromQrCode()"
            },
            getBytesFromCode: {
                template: "cam.getBytesFromCode()"
            },
            isAnyBarCodeDetected: {
                template: "cam.isAnyBarCodeDetected()"
            },
            lenOfBarCode: {
                template: "cam.lenOfBarCode()"
            },
            getStrFromBarCode: {
                template: "cam.getStrFromBarCode()"
            },
            getBytesFromBarCode: {
                template: "cam.getBytesFromBarCode()"
            },
            getNumTagMaxProbId: {
                template: "cam.getNumMaxProbOfId()"
            },
            getNumTagMaxProb: {
                template: "cam.getNumMaxProb()"
            },
            getNumTagProbOfId: {
                template: "cam.getNumProbOfId({INDEX})"
            },
            getOrientionTagMaxProbId: {
                template: "cam.getLandmarkMaxProbId()"
            },
            getOrientionTagMaxProb: {
                template: "cam.getLandmarkMaxProb()"
            },
            getOrientionTagProbOfId: {
                template: "cam.getLandmarkProbOfId({ORIENTION})"
            }
        };
    }
}
