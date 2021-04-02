"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_update_1 = require("./comment-update");
const remove_navigator_1 = require("./remove-navigator");
const rename_project_1 = require("./rename-project");
const toc_plugin_1 = require("./toc-plugin");
module.exports = function load(pluginHost) {
    const application = pluginHost.owner;
    application.converter.addComponent('SdkClientCommentUpdatePlugin', new comment_update_1.SdkClientCommentUpdatePlugin(application.converter));
    application.renderer.addComponent('SdkClientTocPlugin', new toc_plugin_1.SdkClientTocPlugin(application.renderer));
    application.renderer.addComponent('SdkClientRenameProjectPlugin', new rename_project_1.SdkClientRenameProjectPlugin(application.renderer));
    application.renderer.addComponent('SdkClientRemoveNavigatorPlugin', new remove_navigator_1.SdkClientRemoveNavigatorPlugin(application.renderer));
};
//# sourceMappingURL=index.js.map