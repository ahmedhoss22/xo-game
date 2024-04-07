import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ name: 'isStrongPassword', async: false })
export class IsStrongPasswordConstraint
  implements ValidatorConstraintInterface
{
  validate(password: string, args: ValidationArguments) {
    // Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 6 characters long
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 6 characters long'
  }
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStrongPasswordConstraint,
    })
  }
}
