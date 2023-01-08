![Banner](images/banner.png)

Discord Trivia is a Node.js library which builds on top of [open-trivia-db](https://github.com/Elitezen/open-trivia-db-wrapper) and [Discord.js](https://github.com/discordjs/discord.js/) to easily integrate trivia games into your Discord.js client.

**📑 Guide:** https://dev.to/elitezen/code-fully-fledged-trivia-games-in-discordjs-ge8<br/>
**🌐 Website:** https://elitezen.github.io/discord-trivia-website/

## Installation
#### Discord.js v14

```bash
npm install discord-trivia
# or using yarn
yarn add discord-trivia
```

#### Discord.js v13

```bash
npm install discord-trivia@1.1.0
# or using yarn
yarn add discord-trivia@1.1.0
```

## Support Server
Join our support server for help & questions about open-trivia-db or discord-trivia.

[![](http://invidget.switchblade.xyz/wtwM4HhbAr)](https://discord.gg/wtwM4HhbAr)

## Example Code for Slash Commands

```js
const { SlashCommandBuilder, Colors, ButtonStyle } = require("discord.js");
const { TriviaManager } = require("discord-trivia");

const trivia = new TriviaManager();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Test out trivia'),
  async execute(interaction) {
    const game = trivia.createGame(interaction)
      .decorate({
        embedColor: Colors.Green,
        buttonStyle: ButtonStyle.Primary
      })
      .setQuestionOptions({
        amount: 15,
        category: 'Animals',
        difficulty: 'hard',
      })
      .setGameOptions({
        showAnswers: true,
        timePerQuestion: 15_000,
        maxPoints: 100
      });


    game.setup()
      .catch(console.error);
  }
}
```

## Example for Messages

```js
client.on('messageCreate', message => {
  if (message.author.bot) return;

  const game = trivia.createGame(message)
    .decorate({
      embedColor: Colors.Green,
      buttonStyle: ButtonStyle.Primary
    })
    .setQuestionOptions({
      amount: 15,
      category: 'Animals',
      difficulty: 'hard',
    })
    .setGameOptions({
      showAnswers: true,
      timePerQuestion: 15_000,
      maxPoints: 100
    });

  game.setup()
    .catch(console.error);
});
```

## Usage

Discord Trivia is highly customizable. Change the color of your embeds, styles of the buttons, and game settings.

### ✨ Decorate Your Game and Make it Feel Unique!

```js
game.decorate({
    embedColor: Colors.Purple,
    buttonStyle: ButtonStyle.Danger,
    embedImage: 'https://link-to-cool-background/',
    embedThumbnail: 'https://link-to-epic-icon/'
  })
```

### ⚙️ Control Your Game With Extensive Configuration.

```js
game.setGameOptions({
    queueTime: 30_000,
    minPlayerCount: 3,
    maxPlayerCount: 20,
    minPoints: 10,
    maxPoints: 100,
    timeBetweenRounds: 5_000,
    timePerQuestion: 15_000,
    streakDefinitionLevel: 3,
    pointsPerSteakAmount: 30,
    maximumStreakBonus: 300,
    showAnswers: true
  });
```

### ❓Choose The Best Questions for You and Your Friends.

```js
game.setGameOptions({
    amount: 15,
    category: 'History',
    difficulty:'medium',
    type: 'multiple'
  });
```

### ✏️ Create Your Own Questions For The Game!

```js
const myQuestions = [
  {
    value: 'What is the best pizza topping?',
    category: 'General Knowledge',
    difficulty: 'easy',
    type: 'multiple',
    correctAnswer: 'Chicken Feet',
    incorrectAnswers: ['Pepperoni', 'Sausage', 'Cheese']
  },
  ...
];

game.setGameQuestions({
  customQuestions: myQuestions
});
```

### 🔔 Listen for Game Events.

```js
game.on('pending', () => { ... });
game.on('queue', () => { ... });
game.on('memberJoin', member => { ... });
game.on('end', finalData => { ... });

game.setup()
  .catch(console.error);
```

🔺 Make sure to assign event listeners *before* `game.setup()`

## Consider Using `open-trivia-db`

Discord Trivia uses [open-trivia-db](https://www.npmjs.com/package/open-trivia-db) to retrieve trivia questions. Some category names are long! Use the `CategoryNames` enum from `open-trivia-db` to easily access categories.

This is not required since Discord Trivia is typed, but can come handy when abstracting the library.

**Install The Addon**

```ssh
npm i open-trivia-db
```

**Example Usage**
```js
const { CategoryNames } = require('open-trivia-db');

game.setGameQuestions({
  category: CategoryNames.Geography
});
```

▶️ `open-trivia-db` Includes a lot of utility for trivia question fetching. Visit the [NPM page](https://www.npmjs.com/package/open-trivia-db) to learn more.