import { Bot } from "../deps.ts";

/** Sets a thread channel to be archived. */
export async function archiveThread(bot: Bot, threadId: bigint) {
  return await bot.helpers.editThread(threadId, { archived: true });
}

/** Sets a thread channel to be unarchived. */
export async function unarchiveThread(bot: Bot, threadId: bigint) {
  return await bot.helpers.editThread(threadId, { archived: false });
}

/** Sets a thread channel to be locked. */
export async function lockThread(bot: Bot, threadId: bigint) {
  return await bot.helpers.editThread(threadId, { locked: true });
}

/** Sets a thread channel to be unlocked. */
export async function unlockThread(bot: Bot, threadId: bigint) {
  return await bot.helpers.editThread(threadId, { locked: false });
}
