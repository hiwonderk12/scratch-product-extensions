# 制作第一个积木包：显示文本

目标：制作“文本演示”模块，输入文字后生成 `print(...)`，打出一套主控与模块 ZIP，在桌面软件中保存并离线重开。
不需要机器人或传感器；这里只检查代码生成，不运行硬件，也不演示上传。

## 1. 准备一个独立副本

需要 Node.js 20 或以上、npm、文本编辑器，以及[支持原生包的 WonderLab](importing.md#软件要求)。
先在终端确认 `node --version`、`npm --version` 能输出版本。

从[源码仓库](https://github.com/hiwonderk12/scratch-product-extensions)选择 `wonderlab` 分支，使用 GitHub **Code → Download ZIP** 获取源码并解压。
熟悉 Git 也可以克隆该分支。只使用自己的学习副本，不直接修改官方工作区。
终端切换到包含 `package.json` 的目录，执行：

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run ext -- --help
```

成功标志：依赖安装成功，帮助列出 `new`、`support add`、`pack-set`。
不需要其他软件源码或其依赖目录，也不要使用未发布的 `npx` 命令。
若源码缺少锁文件或帮助中没有这些命令，请获取包含本教程对应工具的源码版本，而不是跳过步骤。

## 2. 创建文本模块

```sh
npm run ext -- new module hello-text --category output --spec docs/examples/first-package.json --dry-run
npm run ext -- new module hello-text --category output --spec docs/examples/first-package.json
```

第一条只预览，不写文件。第二条创建 `products/output/hello-text/`，包括：

| 文件 | 你需要做什么 |
| --- | --- |
| `src/index.ts` | 维护积木、集中四语文字、菜单和 Python 规则 |
| `metadata.json` | 维护包版本与资源路径 |
| `test/smoke.mjs` | 运行本地作者结构冒烟 |
| `docs/README.md` | 记录这个模块的使用方法 |

打开 `src/index.ts`，找到 `defaultValue: "Hello"`，把 `Hello` 改为 `你好，课程`。
这是积木文本输入框的默认值，不要改动参数名 `TEXT` 或模板 `print({TEXT})`。
文件开头的 `messages` 已包含简体中文、英文、繁体中文、韩文；修改积木显示文字时，同步维护四语，并保留 `[TEXT]`。

```sh
npm run ext -- check output/hello-text
node --test products/output/hello-text/test/smoke.mjs
```

成功标志：编译检查和冒烟通过。此时还不能认为模块已接入主控或在软件中验收。
重新执行创建命令会拒绝覆盖；继续编辑已生成的 index 即可。

## 3. 显式接入一个主控

本例选用软件中的 **AI机甲双驱车**（配置标识 `aimech`），只是提供 Python 运行环境，不需要连接设备。
先查看 `docs/examples/text-support.json`：

```json
{
  "variant": "text-demo",
  "portGroups": {},
  "libraryVersion": "0.1.12-demo.1",
  "productVersion": "1.0.6-demo.1"
}
```

`text-demo` 是本例规则；空端口表示不连接硬件。两个版本分别对应库配置和重新打包的主控。
该示例基于库配置 `0.1.11`、主控包 `1.0.5`；如果你的副本版本已更新，先将示例中的数字版本调整得更高。
修改的是学习副本，**不要把演示版本当官方发布**。

```sh
npm run ext -- support add aimech output/hello-text --spec docs/examples/text-support.json --dry-run
npm run ext -- support add aimech output/hello-text --spec docs/examples/text-support.json
npm run ext -- check --write-indexes
npm run ext -- check
```

成功标志：预览列出主控配置、库配置、主控元数据三个修改；实际执行后全库检查通过。
只接入这个主控，不会给全部主控开放模块，也不会修改共享支持集。
新模块尚未发行，保留初始版本 `0.1.0`；如果你之前已打包或安装过它，先递增模块版本再重新打包。

## 4. 打出完整配套

```sh
npm run ext -- pack-set aimech output/hello-text --output dist/hello-text-demo --dry-run
npm run ext -- pack-set aimech output/hello-text --output dist/hello-text-demo
```

命令先标准编译，再输出完整路径。按本例版本会得到：

```text
dist/hello-text-demo/
  aimech-1.0.6-demo.1.zip
  hello-text-0.1.0.zip
  package-set.json
```

两个 ZIP 携带相同的库配置。`package-set.json` 记录主控、包版本及文件名，供交付核对，**不导入软件**。
输出目录必须不存在；重复打包请使用新目录，并遵守[版本不可覆盖规则](versions-and-projects.md)。
只打本例两个包，不会自动打全部产品、上传或发布。

## 5. 导入并查看代码

按[导入步骤](importing.md#导入配套包)操作：新建**空白学习工程**，分别导入两个 ZIP，在“用户拓展”先选择演示版主控，再添加“文本演示”。
不要先选内置旧版主控再直接添加新模块；即使名称相同，库配置也可能不同。
若工程已有其他扩展，需要它们的同配置新版；第一课不迁移已有课程。

回到积木区，把“显示文本”接到主程序下面，输入 `你好，课程`。查看代码区，应包含：

```python
print("你好，课程")
```

单引号或双引号等价；完整程序还会有主控所需的 import、主程序和启动调用。
不要把积木的运行按钮当作桌面 Python 执行器；这一步验的是代码，不是控制硬件。

依次切换简体中文、English、繁體中文、한국어，检查分类和积木文字变化，输入文本及 Python 不变。
若文字仍停留在原语言，记录软件版本和界面截图，不把 CLI 检查通过当作真实四语验收。

## 6. 保存并离线重开

1. 用软件文件菜单将工程保存为自己的 `.sb3`，保留两个配套 ZIP。
2. 正常退出软件，断开网络后重新启动，再打开刚保存的工程。
3. 检查输入文本、积木连接和 Python 是否保留，是否仍使用演示版配套。
4. 任何一步缺包或报配置冲突，都先按[故障处理](importing.md#常见问题)解决，不改成最新版蒙混通过。

完成标志是**桌面实际重开正确**，不只是出现 ZIP 或通过脚本。
如果没有适配软件或尚未完成桌面验证，请明确停在“已打包，待导入验收”。

## 接下来

- 加数字参数或菜单：[CLI 示例与限制](cli.md)。
- 改真实硬件：[支持关系与端口](configuration.md)，先确认 SDK，不能猜 import 或初始化接口。
- 修改已有包：[维护手册](development.md)。AI 辅助可选，不影响以上步骤。
