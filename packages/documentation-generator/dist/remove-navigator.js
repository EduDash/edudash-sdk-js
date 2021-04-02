"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SdkClientRemoveNavigatorPlugin = void 0;
const components_1 = require("typedoc/dist/lib/output/components");
const events_1 = require("typedoc/dist/lib/output/events");
let SdkClientRemoveNavigatorPlugin = class SdkClientRemoveNavigatorPlugin extends components_1.RendererComponent {
    initialize() {
        this.navigationPlugin = (this.owner.application.renderer.getComponent('navigation'));
        this.listenTo(this.owner, {
            [events_1.RendererEvent.BEGIN]: this.onRenderedBegin,
        });
    }
    onRenderedBegin(event) {
        const navigationItem = this.navigationPlugin.navigation;
        if (!navigationItem) {
            return;
        }
        navigationItem.children = [];
    }
};
SdkClientRemoveNavigatorPlugin = __decorate([
    components_1.Component({ name: 'SdkClientRemoveNavigator' })
], SdkClientRemoveNavigatorPlugin);
exports.SdkClientRemoveNavigatorPlugin = SdkClientRemoveNavigatorPlugin;
//# sourceMappingURL=remove-navigator.js.map