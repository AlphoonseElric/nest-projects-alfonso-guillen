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
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const email_parser_service_1 = require("./email-parser.service");
const fs = require("fs/promises");
const axios_1 = require("axios");
let EmailController = class EmailController {
    constructor(mailParserService) {
        this.mailParserService = mailParserService;
    }
    async parseEmail(fileSource) {
        try {
            const fileContent = await this.getFileContent(fileSource);
            const result = await this.mailParserService.parseMail(fileContent);
            const responseDto = {
                jsonContent: result,
            };
            return responseDto;
        }
        catch (error) {
            console.error(`Error processing the email: ${error.message}`);
        }
    }
    async getFileContent(fileSource) {
        try {
            if (this.isURL(fileSource)) {
                const response = await axios_1.default.get(fileSource);
                return response.data;
            }
            else {
                const emailFilePath = `./emails/${fileSource}.eml`;
                return await fs.readFile(emailFilePath, 'utf-8');
            }
        }
        catch (error) {
            console.log('__dirname:', __dirname);
            console.error(`Error reading file: ${error.message}`);
            return null;
        }
    }
    isURL(str) {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(str);
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Get)('parse/:fileSource'),
    __param(0, (0, common_1.Param)('fileSource')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "parseEmail", null);
exports.EmailController = EmailController = __decorate([
    (0, common_1.Controller)('mail'),
    __metadata("design:paramtypes", [email_parser_service_1.MailParserService])
], EmailController);
//# sourceMappingURL=email.controller.js.map