"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapperService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const event_dto_1 = require("../dto/event.dto");
let MapperService = class MapperService {
    mapJsonToEventDto(json) {
        const eventDto = (0, class_transformer_1.plainToClass)(event_dto_1.EventDto, json);
        this.validateDto(eventDto);
        return eventDto;
    }
    async validateDto(dto) {
        const errors = await (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            const errorMessage = this.buildErrorMessage(errors);
            throw new Error(errorMessage);
        }
    }
    buildErrorMessage(errors) {
        const errorMessage = 'Validation failed.';
        const errorMessages = errors.map((error) => {
            const constraints = error.constraints;
            if (constraints) {
                return Object.values(constraints).join(', ');
            }
        });
        return `${errorMessage} ${errorMessages.join(', ')}`;
    }
};
exports.MapperService = MapperService;
exports.MapperService = MapperService = __decorate([
    (0, common_1.Injectable)()
], MapperService);
//# sourceMappingURL=mapper.service.js.map