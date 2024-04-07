// multer.config.ts
import { diskStorage } from 'multer'
import { extname } from 'path'

export const multerConfig = (dest: string, name: string) => {
  return {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, dest)
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        const fileExtName = extname(file.originalname)
        const newFileName = `${name}_${uniqueSuffix}${fileExtName}`
        cb(null, newFileName)
      },
    }),
  }
}
