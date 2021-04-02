"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SdkClientRenameProjectPlugin = void 0;
const fs_1 = require("fs");
const components_1 = require("typedoc/dist/lib/output/components");
const events_1 = require("typedoc/dist/lib/output/events");
/**
 * Correct the package name in the navigator.
 */
let SdkClientRenameProjectPlugin = class SdkClientRenameProjectPlugin extends components_1.RendererComponent {
    initialize() {
        this.listenTo(this.owner, {
            [events_1.RendererEvent.BEGIN]: this.onRenderedBegin,
        });
    }
    onRenderedBegin(event) {
        const { fullFileName } = event.project.files.filter((sourceFile) => sourceFile.fileName.endsWith('/package.json'))[0];
        const { name } = JSON.parse(fs_1.readFileSync(fullFileName).toString());
        event.project.name = name;
    }
};
SdkClientRenameProjectPlugin = __decorate([
    components_1.Component({ name: 'SdkClientRenameProject' })
], SdkClientRenameProjectPlugin);
exports.SdkClientRenameProjectPlugin = SdkClientRenameProjectPlugin;
//# sourceMappingURL=rename-project.js.map