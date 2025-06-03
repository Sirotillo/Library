import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike, Between } from "typeorm";
import { Telegraf, Markup } from "telegraf";
import { Book } from "../books/entities/book.entity";

@Injectable()
export class TelegramBotService {
  private bot: Telegraf;
  private logger = new Logger(TelegramBotService.name);

  // Foydalanuvchi qaysi rejimda ekanini saqlash uchun
  private userModes = new Map<number, string>();

  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {
    this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

    this.setupBot();

    this.bot.launch().then(() => {
      this.logger.log("Telegram bot ishga tushdi");
    });
  }

  private setupBot() {
    // /start buyrug'i
    this.bot.start((ctx) => {
      ctx.reply(
        "📚 Kitob qidiruv botiga xush kelibsiz!\n\n" +
          "Quyidagi menyudan kerakli xizmatni tanlang:",
        Markup.keyboard([
          ["📖 Kitob nomi boʻyicha qidirish"],
          ["✍️ Muallif boʻyicha qidirish"],
          ["💰 Narx boʻyicha qidirish"],
          ["🏷️ Kategoriya boʻyicha qidirish"],
        ])
          .resize()
          .oneTime()
      );
    });

    // Foydalanuvchidan kelgan matn bo'yicha
    this.bot.on("text", async (ctx) => {
      const userId = ctx.from.id;
      const text = ctx.message.text;

      if (text === "📖 Kitob nomi boʻyicha qidirish") {
        this.userModes.set(userId, "search");
        await ctx.reply("Iltimos, kitob nomini, muallifini yoki mavzusini yozing:");
        return;
      }

      if (text === "✍️ Muallif boʻyicha qidirish") {
        this.userModes.set(userId, "author");
        await ctx.reply("Iltimos, muallifning to‘liq yoki qisman ismini yozing:");
        return;
      }

      if (text === "💰 Narx boʻyicha qidirish") {
        this.userModes.set(userId, "price");
        await ctx.reply("Iltimos, narx diapazonini yozing (masalan, 20000-50000):");
        return;
      }

      if (text === "🏷️ Kategoriya boʻyicha qidirish") {
        this.userModes.set(userId, "category");
        await ctx.reply("Iltimos, kategoriya ID raqamini yozing (masalan, 3):");
        return;
      }

      const userMode = this.userModes.get(userId);

      if (userMode === "search") {
        await this.handleBookSearch(ctx, text);
        this.userModes.delete(userId);
        return;
      }

      if (userMode === "author") {
        await this.handleAuthorSearch(ctx, text);
        this.userModes.delete(userId);
        return;
      }

      if (userMode === "price") {
        await this.handlePriceSearch(ctx, text);
        this.userModes.delete(userId);
        return;
      }

      if (userMode === "category") {
        await this.handleCategorySearch(ctx, text);
        this.userModes.delete(userId);
        return;
      }

      // Agar hech qanday rejim tanlanmagan bo‘lsa, kitob nomi bo‘yicha qidirish
      await this.handleBookSearch(ctx, text);
    });
  }

  // Kitob nomi, muallif yoki mavzu bo'yicha qidirish
  private async handleBookSearch(ctx: any, query: string) {
    const text = query.trim();
    if (text.length < 3) {
      await ctx.reply("ℹ️ Iltimos, kamida 3 ta belgi yozing.");
      return;
    }

    try {
      await ctx.sendChatAction("typing");
      const results = await this.bookRepository.find({
        where: [
          { title: ILike(`%${text}%`) },
          { author: { first_name: ILike(`%${text}%`) } },
          { category: { category_name: ILike(`%${text}%`) } },
        ],
        relations: ["author", "category"],
      });

      if (results.length === 0) {
        await ctx.reply(`🔍 "${this.escapeHtml(text)}" bo‘yicha hech qanday natija topilmadi.`);
        return;
      }

      const limitedResults = results.slice(0, 10);
      const hasMore = results.length > 10;

      for (let i = 0; i < limitedResults.length; i++) {
        const book = limitedResults[i];
        const authorName = book.author ? this.escapeHtml(book.author.first_name) : "Nomaʼlum muallif";

        const caption =
          `📕 ${i + 1}. ${this.escapeHtml(book.title)}\n` +
          `👤 ${authorName}\n` +
          `🏷️ Narx: ${book.price ? book.price.toLocaleString() : "Nomaʼlum"} soʻm\n` +
          `🆔 ID: ${book.id}`;

        await ctx.reply(caption);
      }

      if (hasMore) {
        await ctx.reply(`ℹ️ Ko‘rsatilgan: 10/${results.length} ta. Barchasini koʻrish uchun qidiruvni aniqroq qiling.`);
      }
    } catch (error) {
      this.logger.error("Kitob nomi bo‘yicha qidirishda xatolik:", error);
      await ctx.reply("❌ Qidirishda xatolik yuz berdi. Keyinroq sinab koʻring.");
    }
  }

  // Muallif bo‘yicha qidirish
  private async handleAuthorSearch(ctx: any, query: string) {
    const text = query.trim();
    if (text.length < 3) {
      await ctx.reply("ℹ️ Iltimos, kamida 3 ta belgi yozing.");
      return;
    }

    try {
      await ctx.sendChatAction("typing");
      const results = await this.bookRepository.find({
        where: {
          author: {
            first_name: ILike(`%${text}%`),
          },
        },
        relations: ["author", "category"],
      });

      if (results.length === 0) {
        await ctx.reply(`🔍 Muallif nomi "${this.escapeHtml(text)}" boʻyicha hech qanday kitob topilmadi.`);
        return;
      }

      const limitedResults = results.slice(0, 10);
      const hasMore = results.length > 10;

      for (let i = 0; i < limitedResults.length; i++) {
        const book = limitedResults[i];
        const authorName = book.author ? this.escapeHtml(book.author.first_name) : "Nomaʼlum muallif";

        const caption =
          `📕 ${i + 1}. ${this.escapeHtml(book.title)}\n` +
          `👤 ${authorName}\n` +
          `🏷️ Narx: ${book.price ? book.price.toLocaleString() : "Nomaʼlum"} soʻm\n` +
          `🆔 ID: ${book.id}`;

        await ctx.reply(caption);
      }

      if (hasMore) {
        await ctx.reply(`ℹ️ Ko‘rsatilgan: 10/${results.length} ta. Barchasini koʻrish uchun qidiruvni aniqroq qiling.`);
      }
    } catch (error) {
      this.logger.error("Muallif bo‘yicha qidirishda xatolik:", error);
      await ctx.reply("❌ Qidirishda xatolik yuz berdi. Keyinroq sinab koʻring.");
    }
  }

  // Narx bo‘yicha qidirish
  private async handlePriceSearch(ctx: any, query: string) {
    const text = query.trim();
    const regex = /^(\d+)\s*-\s*(\d+)$/;
    const match = text.match(regex);

    if (!match) {
      await ctx.reply("ℹ️ Iltimos, narx diapazonini to‘g‘ri formatda yozing (masalan, 20000-50000)");
      return;
    }

    const minPrice = Number(match[1]);
    const maxPrice = Number(match[2]);

    if (minPrice > maxPrice) {
      await ctx.reply("ℹ️ Diapazon to‘g‘ri emas: boshlang‘ich narx oxirgisidan kichik bo‘lishi kerak.");
      return;
    }

    try {
      await ctx.sendChatAction("typing");
      const results = await this.bookRepository.find({
        where: {
          price: Between(minPrice, maxPrice),
        },
        relations: ["author", "category"],
      });

      if (results.length === 0) {
        await ctx.reply(`🔍 ${minPrice}-${maxPrice} soʻm oraligʻida kitob topilmadi.`);
        return;
      }

      const limitedResults = results.slice(0, 10);
      const hasMore = results.length > 10;

      for (let i = 0; i < limitedResults.length; i++) {
        const book = limitedResults[i];
        const authorName = book.author ? this.escapeHtml(book.author.first_name) : "Nomaʼlum muallif";

        const caption =
          `📕 ${i + 1}. ${this.escapeHtml(book.title)}\n` +
          `👤 ${authorName}\n` +
          `🏷️ Narx: ${book.price ? book.price.toLocaleString() : "Nomaʼlum"} soʻm\n` +
          `🆔 ID: ${book.id}`;

        await ctx.reply(caption);
      }

      if (hasMore) {
        await ctx.reply(`ℹ️ Ko‘rsatilgan: 10/${results.length} ta. Barchasini koʻrish uchun diapazonni toraytiring.`);
      }
    } catch (error) {
      this.logger.error("Narx bo‘yicha qidirishda xatolik:", error);
      await ctx.reply("❌ Qidirishda xatolik yuz berdi. Keyinroq sinab koʻring.");
    }
  }

  // Kategoriya bo‘yicha qidirish
  private async handleCategorySearch(ctx: any, query: string) {
    const categoryId = Number(query.trim());
    if (isNaN(categoryId)) {
      await ctx.reply("ℹ️ Iltimos, to‘g‘ri kategoriya ID raqamini kiriting (masalan, 3).");
      return;
    }

    try {
      await ctx.sendChatAction("typing");
      const results = await this.bookRepository.find({
        where: {
          category: {
            id: categoryId,
          },
        },
        relations: ["author", "category"],
      });

      if (results.length === 0) {
        await ctx.reply(`🔍 Kategoriya ID: ${categoryId} boʻyicha hech qanday kitob topilmadi.`);
        return;
      }

      const limitedResults = results.slice(0, 10);
      const hasMore = results.length > 10;

      for (let i = 0; i < limitedResults.length; i++) {
        const book = limitedResults[i];
        const authorName = book.author ? this.escapeHtml(book.author.first_name) : "Nomaʼlum muallif";

        const caption =
          `📕 ${i + 1}. ${this.escapeHtml(book.title)}\n` +
          `👤 ${authorName}\n` +
          `🏷️ Narx: ${book.price ? book.price.toLocaleString() : "Nomaʼlum"} soʻm\n` +
          `🆔 ID: ${book.id}`;

        await ctx.reply(caption);
      }

      if (hasMore) {
        await ctx.reply(`ℹ️ Ko‘rsatilgan: 10/${results.length} ta. Barchasini koʻrish uchun qidiruvni toraytiring.`);
      }
    } catch (error) {
      this.logger.error("Kategoriya bo‘yicha qidirishda xatolik:", error);
      await ctx.reply("❌ Qidirishda xatolik yuz berdi. Keyinroq sinab koʻring.");
    }
  }

  // HTML maxsus belgilarini qochirish (XSS oldini olish uchun)
  private escapeHtml(text: string) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}
