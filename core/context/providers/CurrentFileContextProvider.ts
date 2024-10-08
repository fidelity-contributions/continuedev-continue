import {
  ContextItem,
  ContextProviderDescription,
  ContextProviderExtras,
} from "../../";
import { getBasename } from "../../util/";
import { BaseContextProvider } from "../";

class CurrentFileContextProvider extends BaseContextProvider {
  static description: ContextProviderDescription = {
    title: "currentFile",
    displayTitle: "Current File",
    description: "Reference the currently open file",
    type: "normal",
    renderInlineAs: "",
  };

  async getContextItems(
    query: string,
    extras: ContextProviderExtras,
  ): Promise<ContextItem[]> {
    const ide = extras.ide;
    const currentFile = await ide.getCurrentFile();
    if (!currentFile) {
      return [];
    }
    const contents = await ide.readFile(currentFile);
    return [
      {
        description: currentFile,
        content: `This is the currently open file:\n\n\`\`\`${getBasename(
          currentFile,
        )}\n${contents}\n\`\`\``,
        name: getBasename(currentFile),
        uri: {
          type: "file",
          value: currentFile,
        },
      },
    ];
  }
}

export default CurrentFileContextProvider;
