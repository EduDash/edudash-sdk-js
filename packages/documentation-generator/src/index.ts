import { PluginHost } from 'typedoc/dist/lib/utils';

import { SdkClientCommentUpdatePlugin } from './comment-update';
import { SdkClientRemoveNavigatorPlugin } from './remove-navigator';
import { SdkClientRenameProjectPlugin } from './rename-project';
import { SdkClientTocPlugin } from './toc-plugin';

module.exports = function load(pluginHost: PluginHost) {
  const application = pluginHost.owner;

  application.converter.addComponent(
    'SdkClientCommentUpdatePlugin',
    new SdkClientCommentUpdatePlugin(application.converter)
  );

  application.renderer.addComponent(
    'SdkClientTocPlugin',
    new SdkClientTocPlugin(application.renderer)
  );
  application.renderer.addComponent(
    'SdkClientRenameProjectPlugin',
    new SdkClientRenameProjectPlugin(application.renderer)
  );
  application.renderer.addComponent(
    'SdkClientRemoveNavigatorPlugin',
    new SdkClientRemoveNavigatorPlugin(application.renderer)
  );
};
