import { Bot, CreateMessage, DiscordenoMessage, FinalHelpers } from "./deps.ts";
import { sendDirectMessage } from "./src/sendDirectMessage.ts";
import { suppressEmbeds } from "./src/suppressEmbeds.ts";

export interface BotWithHelpersPlugin extends Bot {
  helpers: FinalHelpers & {
    sendDirectMessage: (
      userId: bigint,
      content: string | CreateMessage,
    ) => Promise<DiscordenoMessage>;
    suppressEmbeds: (
      bot: Bot,
      channelId: bigint,
      messageId: bigint,
    ) => Promise<DiscordenoMessage>;
  };
}

export function enableHelpersPlugin(bot: Bot): BotWithHelpersPlugin {
  // @ts-ignore we are dynamically adding this.
  bot.helpers.sendDirectMessage = (
    userId: bigint,
    content: string | CreateMessage,
  ) => sendDirectMessage(bot, userId, content);
  // @ts-ignore we are dynamically adding this.
  bot.helpers.suppressEmbeds = (channelId: bigint, messageId: bigint) =>
    suppressEmbeds(bot, channelId, messageId);

  return bot as BotWithHelpersPlugin;
}

// EXPORT EVERYTHING HERE SO USERS CAN OPT TO USE FUNCTIONS DIRECTLY
export * from "./src/sendDirectMessage.ts";
export * from "./src/suppressEmbeds.ts";
