"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SdkClientCommentUpdatePlugin = void 0;
const converter_1 = require("typedoc/dist/lib/converter");
const components_1 = require("typedoc/dist/lib/converter/components");
const comment_1 = require("typedoc/dist/lib/converter/factories/comment");
/**
 * Best effort make the service docs markdown looks better.
 */
let SdkClientCommentUpdatePlugin = class SdkClientCommentUpdatePlugin extends components_1.ConverterComponent {
    initialize() {
        this.listenTo(this.owner, {
            [converter_1.Converter.EVENT_CREATE_DECLARATION]: this.onDeclaration,
        });
    }
    onDeclaration(context, reflection, node) {
        if (!node)
            return;
        const rawComment = comment_1.getRawComment(node);
        if (!rawComment)
            return;
        const comment = comment_1.parseComment(this.cleanEmptyCommentLines(rawComment));
        reflection.comment = comment;
    }
    /**
     * Update documentation block to exclude empty lines.
     */
    cleanEmptyCommentLines(comment) {
        return comment.startsWith('/*') && comment.endsWith('*/')
            ? comment
                .split('\n')
                .filter((line) => line.substr(line.indexOf('*') + 1).trim().length !== 0)
                .join('\n')
            : comment;
    }
};
SdkClientCommentUpdatePlugin = __decorate([
    components_1.Component({ name: 'SdkClientCommentUpdatePlugin' })
], SdkClientCommentUpdatePlugin);
exports.SdkClientCommentUpdatePlugin = SdkClientCommentUpdatePlugin;
//# sourceMappingURL=comment-update.js.map