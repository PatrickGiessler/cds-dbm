import { array, Argv, boolean } from 'yargs'
import { config } from '../config'
import adapterFactory from '../adapter'

exports.command = 'load'
exports.desc = 'Imports data from csv files into the database'
exports.builder = {
  service: {
    alias: 's',
    type: array,
    default: ['db'],
  },
  via: {
    alias: 'v',
    type: String,
    demandOption: true,
  },
  ent: {
    alias: 'e',
    type: array,
    default:[]
},
}
exports.handler = async (argv: any) => {
  for (const service of argv.service) {
    const options = await config(service)
    const adapter = await adapterFactory(service, options)
    const isFull = argv.via.toLowerCase() === 'full'
    if(typeof argv.ent ==="string"){
      argv.ent = [argv.ent];
    }
    await adapter!.load(isFull,argv.ent)
  }
}
