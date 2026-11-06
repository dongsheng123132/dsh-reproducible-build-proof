# DSH 可复现构建证据

作者 / 维护者：贺去病（贺方升 / Dosen）· [hequbing.com](https://www.hequbing.com)

这是 DeepSeek Harness 供应链的离线、确定性证据层。它核验两个以上独立运营的构建者是否记录了相同的源码 revision、recipe、build type、参数、依赖集合和相关环境契约，并产出逐字节相同的指定产物。

它不执行构建、不安装包、不认证 provenance、不签发 SLSA Verified Property，也不声称覆盖源码、依赖或分发威胁。`dsh-release-proof` 对账下载源，`dsh-attestation-proof` 验证 DSSE/in-toto 签名；本插件只验证独立重建回执是否收敛。

输入只接受显式哈希清单，原始日志、正文和秘密形态字段会被拒绝。DSH 写盘工具只读取工作区内非符号链接文件，只写入显式 `artifactDir`，并对内容寻址报告执行独占创建和回读校验。
