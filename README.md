只支持 `ts`

### 美国所有城市信息

- `postalCode` 美国城市邮编代码
- `city` 美国城市名
- `shortState` 美国州名简写
- `state` 美国州名中文
- `cityType`  城市类别  D - 默认，  N - Not Acceptable ( 可以接为别名， 在 D 城市附近区域的地址 )


### 接口

- `getSequelizeConInstance` 获取连接单例
- `closeSequelizeCon` 关闭连接
- `connectSequelizeCon` 手动连接
- `createUsaPostalCodeModel` 获取 sequelize 模型， 会自动创建和连接单例
