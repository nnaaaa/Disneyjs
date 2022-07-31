import { MessageAction } from '../services';
import { Client } from './interface';

export class MessageClient extends Client {
  async login(token: string) {
    await super.login(token);

    this.message.onCreate(({ worker }) => {
      this.message.setWorker(worker);
      this.message.setAction(new MessageAction());

      this.channel.setWorker(worker);
      this.channel.setChannel(this.message.data.channel);

      this.bot.info.commands.forEach(command => {
        const { name, args } = this.message.command;
        if (
          name &&
          args &&
          command.name === name &&
          command.args.length === args.length
        ) {
          (this as any)[command.name as any](...args);
        }
      });
    });
  }
}
