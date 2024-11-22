import {DataTypes, Sequelize} from 'sequelize'
import path from 'node:path'

let sequelizeCon: Sequelize

/**
 * 全局只有一个实例
 * */
export function getSequelizeConInstance() {
  if (!sequelizeCon) {
    const pathname = new URL(import.meta.url).pathname
    const filePath = path.join(pathname, '..', `../db/all-usa-city.sqlite`)
    sequelizeCon = new Sequelize({
      dialect: 'sqlite',
      storage: filePath,
      logging: false
    })
  }
  return sequelizeCon
}

export async function closeSequelizeCon() {
  if (sequelizeCon) {
    await sequelizeCon.close()
  }
}

export async function connectSequelizeCon() {
  const sequelize = getSequelizeConInstance()
  await sequelize.sync()
  await Promise.all([
    sequelize.authenticate().then(() => {
      // console.log(`sequelize 数据库连接成功`)
    }),
  ])
}

export async function createUsaPostalCodeModel() {
  const sequelize = getSequelizeConInstance()
  const UsaPostalCodeModel = sequelize.define('all-city', {
    postalCode: { // 美国城市邮编代码
      type: DataTypes.STRING,
      primaryKey: true
    },
    city: { // 美国城市名
      type: DataTypes.STRING,
      primaryKey: true
    },
    cityType: {  // 城市类别  D 默认，  N Not Acceptable
      type: DataTypes.STRING,
      allowNull: false
    },
    shortState: { // 美国州名简写
      type: DataTypes.STRING,
      allowNull: false
    },
    state: { // 美国州名中文
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    timestamps: false
  })
  await connectSequelizeCon()
  return UsaPostalCodeModel
}
