# WonderMind

主入口为 `src/index.ts`：一个产品类维护 `getInfo()`、集中四语和 `getPython()`，不按 opcode 拆文件。

## 主控与初始化

支持既有五款 AI 机甲：aimech、aimecanum、aiquadruped、aiquadrupedpro、aihexa。它们使用相同的 MCP_Tools 初始化接口，不以其他传感器的 Hiwonder_DEV 驱动替代。

```python
from mcp_tools import MCP_Tools
AiBlock_LLM = MCP_Tools(0x56,1)
```

必须先放初始化积木。五主控共用原始端口 A/B/C/D/E/J/K，实际值为 1/2/3/4/5/9/10；本地固定菜单与既有库端口表一致。没有开放 AiDoggy、miniHexa 或 AIBlocksBoard，也不为此修改已发行库快照。

## 维护边界

- 保留 20 个旧 opcode、菜单实际值、默认参数、语音／视觉输入和读取表达式。
- `aitv_mcps` 使用 `templateSelector.variableCases`，只初始化当前选中的 MCP 工具；`init_mcp_setting` 收集全部六个默认工具，随后逐个发送并等待。
- `mcp_setting` 保留工具路径末段命名和参数列表插入。`memberName` 不校验标识符，`compactHead`／`compactTail` 不校验列表；必须为工具名称和参数提供合法内容并检查 Python。
- 大文本按原始代码字段处理。类不会部署 `mcp_tools`、获取网络服务凭据或初始化真实硬件；SDK、课程输入和设备运行仍需独立验收。
- 版本目录只记录已实际发布的 ZIP；作者源码可以先于发行历史，不把未上传的包写成可下载。

```powershell
node tools/cli/index.mjs check input/wonder-mind
node tools/cli/index.mjs pack input/wonder-mind
```

通用合同见[原生 API](../../../../docs/native-api.md)和[Python 规则](../../../../docs/python-generation.md)。
