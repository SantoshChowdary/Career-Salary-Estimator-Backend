"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openAIService_1 = __importDefault(require("./openAIService"));
const buildPrompt_1 = require("./buildPrompt");
function generatePrompt(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const prompt = (0, buildPrompt_1.buildPrompt)(formData);
        try {
            const response = yield openAIService_1.default.chat.completions.create({
                model: "gpt-4.1-mini",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: prompt }
                ],
            });
            const text = (_a = response.choices[0].message.content) === null || _a === void 0 ? void 0 : _a.trim();
            return text;
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.default = generatePrompt;
