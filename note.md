### config

> .gitignore

上传到 github 需要忽略的文件

* 匹配模式前 `/` 代表项目根目录
* 匹配模式后加 `/` 代表是目录
* 匹配模式前加 `!` 表示取反
* `*` 代表任意个字符
* `?` 匹配一个字符
* `**` 匹配多级目录

> .npmignore

上传到 npm 提供给别人使用时需要忽略的文件，
如果没有此文件，会使用 .gitignore 文件

> .editorconfig

回车换行，缩进，编码的相关设置

> .eslintrc.js

js 代码相关约束

* eslint --init
