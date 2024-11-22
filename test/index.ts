import {createUsaPostalCodeModel} from "../src/sequelize";

const UsaPostalCodeModel = await createUsaPostalCodeModel()


console.log((await UsaPostalCodeModel.findAll()).map(item => item.dataValues))

