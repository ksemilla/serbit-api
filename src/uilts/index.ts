import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueContstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async validate(v: any, args: ValidationArguments) {
    const repository = this.dataSource.getRepository(args.constraints[0]);
    const object = await repository.findOneBy({
      [args.property]: v,
    });

    const data = args.object as any;

    if (data?.id) {
      return data.id === object.id;
    }

    return !object;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be unique`;
  }
}

export function IsUnique(
  validationOptions?: ValidationOptions & { repository: any },
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [validationOptions.repository],
      validator: IsUniqueContstraint,
    });
  };
}
