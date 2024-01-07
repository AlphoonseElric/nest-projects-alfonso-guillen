import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors: ValidationError[] = await validate(object);

    if (errors.length > 0) {
      const errorMessage = this.buildErrorMessage(errors);
      throw new BadRequestException(errorMessage);
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: Array<any> = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private buildErrorMessage(errors: ValidationError[]): string {
    const errorMessage = 'Validation failed.';

    const errorMessages = errors.map((error) => {
      const constraints = error.constraints;
      if (constraints) {
        return Object.values(constraints).join(', ');
      }
    });

    return `${errorMessage} ${errorMessages.join(', ')}`;
  }
}
