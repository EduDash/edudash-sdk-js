"use strict";
// @ts-nocheck
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SdkClientTocPlugin = void 0;
const reflections_1 = require("typedoc/dist/lib/models/reflections");
const components_1 = require("typedoc/dist/lib/output/components");
const events_1 = require("typedoc/dist/lib/output/events");
const NavigationItem_1 = require("typedoc/dist/lib/output/models/NavigationItem");
/**
 * Group the ToC for easier observability.
 */
let SdkClientTocPlugin = class SdkClientTocPlugin extends components_1.RendererComponent {
    initialize() {
        // disable existing toc plugin
        const tocPlugin = this.owner.application.renderer.getComponent('toc');
        this.owner.off(events_1.PageEvent.BEGIN, tocPlugin.onRendererBeginPage);
        this.listenTo(this.owner, {
            [events_1.PageEvent.BEGIN]: this.onRendererBeginPage,
        });
    }
    /**
     * Generates a table of contents for a page.
     * @param page Contains project details and contextual data about the page being rendered.
     */
    onRendererBeginPage(page) {
        let model = page.model;
        if (!model.constructor.name.endsWith('Reflection')) {
            return;
        }
        const trail = [];
        while (model.constructor.name !== 'ProjectReflection' &&
            !model.kindOf(reflections_1.ReflectionKind.SomeModule)) {
            trail.unshift(model);
            model = model.parent;
        }
        const tocRestriction = this.owner.toc;
        page.toc = new NavigationItem_1.NavigationItem(model.name);
        if (!model.parent && !trail.length) {
            this.clientsNavigationItem = new NavigationItem_1.NavigationItem('Clients', void 0, page.toc);
            this.commandsNavigationItem = new NavigationItem_1.NavigationItem('Commands', void 0, page.toc);
            this.paginatorsNavigationItem = new NavigationItem_1.NavigationItem('Paginators', void 0, page.toc);
        }
        this.buildToc(model, trail, page.toc, tocRestriction);
    }
    isClient(model) {
        const { extendedTypes = [] } = model;
        return (model.kindOf(reflections_1.ReflectionKind.Class) &&
            model.getFullName() !== 'Client' && // Exclude the Smithy Client class.
            (model.name.endsWith('Client') /* Modular client like S3Client */ ||
                (extendedTypes.length === 1 &&
                    extendedTypes[0].name.endsWith('Client'))) /* Legacy client like S3 */);
    }
    isCommand(model) {
        var _a;
        return (model.kindOf(reflections_1.ReflectionKind.Class) &&
            model.getFullName() !== 'Command' && // Exclude the Smithy Command class.
            model.name.endsWith('Command') &&
            ((_a = model.children) === null || _a === void 0 ? void 0 : _a.some((child) => child.name === 'resolveMiddleware')));
    }
    isPaginator(model) {
        return (model.name.startsWith('paginate') && model.kindOf(reflections_1.ReflectionKind.Function));
    }
    isInputOrOutput(model) {
        return (model.kindOf(reflections_1.ReflectionKind.TypeAlias) &&
            (model.name.endsWith('CommandInput') ||
                model.name.endsWith('CommandOutput')));
    }
    /**
     * Create a toc navigation item structure.
     *
     * @param model   The models whose children should be written to the toc.
     * @param trail   Defines the active trail of expanded toc entries.
     * @param parent  The parent [[NavigationItem]] the toc should be appended to.
     * @param restriction  The restricted table of contents.
     */
    buildToc(model, trail, parent, restriction) {
        var _a, _b;
        const index = trail.indexOf(model);
        const children = model['children'] || [];
        if (index < trail.length - 1 && children.length > 40) {
            const child = trail[index + 1];
            const item = NavigationItem_1.NavigationItem.create(child, parent, true);
            item.isInPath = true;
            item.isCurrent = false;
            this.buildToc(child, trail, item);
        }
        else {
            children.forEach((child) => {
                if (restriction &&
                    restriction.length > 0 &&
                    !restriction.includes(child.name)) {
                    return;
                }
                if (child.kindOf(reflections_1.ReflectionKind.SomeModule)) {
                    return;
                }
                if (this.isClient(child)) {
                    NavigationItem_1.NavigationItem.create(child, this.clientsNavigationItem, true);
                }
                else if (this.isCommand(child)) {
                    NavigationItem_1.NavigationItem.create(child, this.commandsNavigationItem, true);
                }
                else if (this.isPaginator(child)) {
                    NavigationItem_1.NavigationItem.create(child, this.paginatorsNavigationItem, true);
                }
                else if (this.isInputOrOutput(child)) {
                    NavigationItem_1.NavigationItem.create(child, this.commandsNavigationItem, true);
                }
                else {
                    const item = NavigationItem_1.NavigationItem.create(child, parent, true);
                    if (trail.includes(child)) {
                        item.isInPath = true;
                        item.isCurrent = trail[trail.length - 1] === child;
                        this.buildToc(child, trail, item);
                    }
                }
            });
            // Group commands and input/output interface of each command.
            (_b = (_a = this.commandsNavigationItem) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b.sort((childA, childB) => childA.title.localeCompare(childB.title));
        }
    }
};
SdkClientTocPlugin = __decorate([
    components_1.Component({ name: 'SdkClientTocPlugin' })
], SdkClientTocPlugin);
exports.SdkClientTocPlugin = SdkClientTocPlugin;
//# sourceMappingURL=toc-plugin.js.map