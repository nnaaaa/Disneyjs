import { stripIndent } from 'common-tags';

export class MarkdownBuilder {
  static bold(text: string): string {
    return `**${text}**`;
  }
  static italic(text: string): string {
    return `*${text}*`;
  }
  static code(text: string): string {
    return `\`${text}\``;
  }
  static underline(text: string): string {
    return `__${text}__`;
  }
  static strikethrough(text: string): string {
    return `~~${text}~~`;
  }
  static codeBlock(text: string, language?: string): string {
    if (language) {
      return `\`\`\`${language}\n${text}\n\`\`\``;
    }
    return `\`\`\`${text}\`\`\``;
  }
  static inlineCode(text: string): string {
    return `\`${text}\``;
  }
  static get tag() {
    return stripIndent;
  }
  static link(text: string, url: string): string {
    return `[${text}](${url})`;
  }
  static image(text: string, url: string): string {
    return `![${text}](${url})`;
  }
  static mention(text: string): string {
    return `<@${text}>`;
  }
}
