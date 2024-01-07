"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const validation_pipe_1 = require("../common/pipes/validation.pipe");
const mapper_service_1 = require("../event/service/mapper.service");
let EventController = class EventController {
    constructor(mapperService) {
        this.mapperService = mapperService;
    }
    processEvent(json) {
        const eventDto = this.mapperService.mapJsonToEventDto(json);
        const result = this.processEventDto(eventDto);
        return this.formatResponse(result);
    }
    processEventDto(eventDto) {
        const records = eventDto.Records;
        const eventRecord = records[0];
        const { spamVerdict, virusVerdict, spfVerdict, dkimVerdict, dmarcVerdict, processingTimeMillis, } = eventRecord.ses.receipt;
        const { timestamp, source, destination } = eventRecord.ses.mail;
        return {
            spam: spamVerdict.status === 'PASS',
            virus: virusVerdict.status === 'PASS',
            dns: spfVerdict.status === 'PASS' &&
                dkimVerdict.status === 'PASS' &&
                dmarcVerdict.status === 'PASS',
            mes: this.formatTimestampToMonth(timestamp),
            retrasado: parseInt(processingTimeMillis, 10) > 1000,
            emisor: this.extractUsernameFromEmail(source),
            receptor: destination.map((recipient) => this.extractUsernameFromEmail(recipient)),
        };
    }
    formatTimestampToMonth(timestamp) {
        return new Date(timestamp).toLocaleString('en-US', { month: 'long' });
    }
    extractUsernameFromEmail(email) {
        return email.split('@')[0];
    }
    formatResponse(result) {
        return result;
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Post)('process-event'),
    __param(0, (0, common_1.Body)(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "processEvent", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)('event'),
    __metadata("design:paramtypes", [mapper_service_1.MapperService])
], EventController);
//# sourceMappingURL=event.controller.js.map