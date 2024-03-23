import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'

export function IsEqualTo(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isEqualTo',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedValue = (args.object as any)[property]
          return relatedValue === value
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must match ${args.constraints[0]}`
        },
      },
    })
  }
}
