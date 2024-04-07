import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common'

export const filterFilter = () => {
  return {
    fileFilter: (req, file, cb) => {
      const validators = [
        new MaxFileSizeValidator({
          maxSize: 5 * 1024 * 1024,
          message: 'File size must be less than 5 MB',
        }),
        new FileTypeValidator({ fileType: 'image/jpeg' }),
      ]

      const parseFilePipe = new ParseFilePipe({ validators })
      parseFilePipe.transform(file)
    },
  }
}
