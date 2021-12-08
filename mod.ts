import {
  ApplicationCommandOptionChoice,
  Bot,
  CreateMessage,
  DiscordenoChannel,
  DiscordenoMember,
  DiscordenoMessage,
  FinalHelpers,
  ModifyThread,
} from "./deps.ts";
import { cloneChannel } from "./src/channels.ts";
import { sendAutocompleteChoices } from "./src/sendAutoCompleteChoices.ts";
import { sendDirectMessage } from "./src/sendDirectMessage.ts";
import { suppressEmbeds } from "./src/suppressEmbeds.ts";
import {
  archiveThread,
  editThread,
  lockThread,
  unarchiveThread,
  unlockThread,
} from "./src/threads.ts";
import { disconnectMember } from "./src/disconnectMember.ts";

export interface BotWithHelpersPlugin extends Bot {
  helpers: FinalHelpers & {
    sendDirectMessage: (
      userId: bigint,
      content: string | CreateMessage
    ) => Promise<DiscordenoMessage>;
    suppressEmbeds: (
      channelId: bigint,
      messageId: bigint
    ) => Promise<DiscordenoMessage>;
    archiveThread: (threadId: bigint) => Promise<DiscordenoChannel>;
    unarchiveThread: (threadId: bigint) => Promise<DiscordenoChannel>;
    lockThread: (threadId: bigint) => Promise<DiscordenoChannel>;
    unlockThread: (threadId: bigint) => Promise<DiscordenoChannel>;
    editThread: (
      threadId: bigint,
      options: ModifyThread,
      reason?: string
    ) => Promise<DiscordenoChannel>;
    cloneChannel: (
      channel: DiscordenoChannel,
      reason?: string
    ) => Promise<DiscordenoChannel>;
    sendAutocompleteChoices: (
      interactionId: bigint,
      interactionToken: string,
      choices: ApplicationCommandOptionChoice[]
    ) => Promise<void>;
    disconnectMember: (
      guildId: bigint,
      memberId: bigint
    ) => Promise<DiscordenoMember>;
  };
}

export function enableHelpersPlugin(rawBot: Bot): BotWithHelpersPlugin {
  const bot = rawBot as BotWithHelpersPlugin;

  bot.helpers.sendDirectMessage = (
    userId: bigint,
    content: string | CreateMessage
  ) => sendDirectMessage(bot, userId, content);
  bot.helpers.suppressEmbeds = (channelId: bigint, messageId: bigint) =>
    suppressEmbeds(bot, channelId, messageId);
  bot.helpers.archiveThread = (threadId: bigint) =>
    archiveThread(bot, threadId);
  bot.helpers.unarchiveThread = (threadId: bigint) =>
    unarchiveThread(bot, threadId);
  bot.helpers.lockThread = (threadId: bigint) => lockThread(bot, threadId);
  bot.helpers.unlockThread = (threadId: bigint) => unlockThread(bot, threadId);
  bot.helpers.editThread = (
    threadId: bigint,
    options: ModifyThread,
    reason?: string
  ) => editThread(bot, threadId, options, reason);
  bot.helpers.cloneChannel = (channel: DiscordenoChannel, reason?: string) =>
    cloneChannel(bot, channel, reason);
  bot.helpers.sendAutocompleteChoices = (
    interactionId: bigint,
    interactionToken: string,
    choices: ApplicationCommandOptionChoice[]
  ) => sendAutocompleteChoices(bot, interactionId, interactionToken, choices);
  bot.helpers.disconnectMember = (guildId: bigint, memberId: bigint) =>
    disconnectMember(bot, guildId, memberId);

  return bot as BotWithHelpersPlugin;
}

// EXPORT EVERYTHING HERE SO USERS CAN OPT TO USE FUNCTIONS DIRECTLY
export * from "./src/sendDirectMessage.ts";
export * from "./src/suppressEmbeds.ts";
export * from "./src/threads.ts";
export * from "./src/sendAutoCompleteChoices.ts";
