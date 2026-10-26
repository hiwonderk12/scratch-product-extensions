# 独立用户拓展包

## 作者格式与安装格式

作者只维护 metadata.json、一个主要 src/index.ts，以及可选 assets/、python/。运行 `check 作者目录`、`pack 作者目录`；不需要 products 目录、catalog、library.config.json 或主控配套。

打包器将 TypeScript 标准编译成可读的 index.cjs，输出 ZIP：

~~~text
metadata.json       身份、编译入口、四语名称、可选主控适配
index.cjs           class / getInfo / getPython，软件直接实例化
src/index.ts        作者源码，供查看；宿主不执行 TypeScript
assets/...          可选原始图片，不以 Base64 写回作者源码
python/...          可选 Python 文本资源
~~~

编译后的 metadata 自动补充 `installation: "standalone"`、moduleId、profile 和从集中文案提取的名称。它不是旧积木 manifest。没有 library.json、嵌套 ZIP、package-set.json 或配套主控。

`pack output/模块` 是官方库命令；`pack ./作者目录` 是独立用户包命令，不要混淆。仅手工压缩原始 TS 目录无法运行，必须先编译。

## 无硬件积木

不配置 support 时，所有主控（含未选择主控）使用 variant `default`，没有端口。参考包通过以下元数据保持演示分支：

~~~json
"support": {
  "default": {"variant": "text-demo", "portGroups": {}}
}
~~~

## 不同主控使用不同初始化

support.products 按软件当前主控 ID 选择适配，优先于 support.default。**硬件模块没有通用兼容依据时应省略 default**，仅开放已经验证的主控。ports 与 portGroups 都在本包，不修改软件内置主控或官方支持表。

~~~json
"support": {
  "products": {
    "aimech": {
      "variant": "hiwonder-dev-port",
      "portGroups": {
        "sensor.aimech_iicport": {
          "bindings": {"textdemo_read_light.PORT": "1"}
        }
      }
    }
  },
  "ports": {
    "sensor.aimech_iicport": [
      {"label": "1", "value": "1"},
      {"label": "2", "value": "2"}
    ]
  }
}
~~~

在类中用 context.variant 选择 import、Port 包装、构造函数和生成模板；用 context.ports 和 context.defaultPort 读取对应菜单与默认值。不同主控不能只改端口显示文字而复用错误的驱动初始化。上例对应完整参考的可选 read_light 分支，需要真实 Hiwonder_DEV SDK；不是全主控硬件兼容声明。

## 安装与更新规则

- 以 profile + moduleId 标识包；同一用户模块只保留当前一份。重新导入原子替换当前内容，同版本也允许修改，不进入官方多版本和配套选择。
- 用户包不能占用官方产品的标识或命名空间。保持 namespace、opcode、参数名及菜单 value 稳定，旧项目才能用当前包恢复。
- 工程仅记录用户包身份和适配，不锁历史包版本；不内嵌作者可执行代码。缺包时明确报错，不静默用官方包替代。
- 当前窗口导入会重新挂载；其他打开窗口不会热更新，请关闭相关项目再重新打开。保留作者 ZIP/Git 历史可供需要时手动重新导入。
- 桌面以磁盘持久化，Web 使用浏览器存储配额。运行代码或写盘失败时不以“安装成功”代替挂载成功。
- 官方硬件库的旧项目兼容、不可变发行和库配置快照仍按原合同解释，不套用到独立用户包。

软件首次导入、四语、Python、保存重开均需在支持该格式的新构建中验证；旧正式版不会因文档更新自动获得支持。
