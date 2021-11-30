import {
  Bot,
  CreateMessage,
  DiscordenoChannel,
  DiscordenoMessage,
  FinalHelpers,
} from "./deps.ts";
import { sendDirectMessage } from "./src/sendDirectMessage.ts";
import { suppressEmbeds } from "./src/suppressEmbeds.ts";
import {
  archiveThread,
  lockThread,
  unarchiveThread,
  unlockThread,
} from "./src/threads.ts";

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
    archiveThread: (bot: Bot, threadId: bigint) => Promise<DiscordenoChannel>;
    unarchiveThread: (bot: Bot, threadId: bigint) => Promise<DiscordenoChannel>;
    lockThread: (bot: Bot, threadId: bigint) => Promise<DiscordenoChannel>;
    unlockThread: (bot: Bot, threadId: bigint) => Promise<DiscordenoChannel>;
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
  // @ts-ignore we are dynamically adding this.
  bot.helpers.archiveThread = (threadId: bigint) =>
    archiveThread(bot, threadId);
  // @ts-ignore we are dynamically adding this.
  bot.helpers.unarchiveThread = (threadId: bigint) =>
    unarchiveThread(bot, threadId);
  // @ts-ignore we are dynamically adding this.
  bot.helpers.lockThread = (threadId: bigint) => lockThread(bot, threadId);
  // @ts-ignore we are dynamically adding this.
  bot.helpers.unlockThread = (threadId: bigint) => unlockThread(bot, threadId);

  return bot as BotWithHelpersPlugin;
}

// EXPORT EVERYTHING HERE SO USERS CAN OPT TO USE FUNCTIONS DIRECTLY
export * from "./src/sendDirectMessage.ts";
export * from "./src/suppressEmbeds.ts";
export * from "./src/threads.ts";
