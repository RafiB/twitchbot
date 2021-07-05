module.exports = handleCommand;

const CURRENT_PROJECT_DESCRIPTION = "\
We're currently writing a twitch bot! So far it can do !dice, !flip, !project, !commands\
";

const Commands = {
  DICE: '!dice',
  FLIP: '!flip',
  PROJECT: '!project',
  COMMANDS: '!commands',
};

const commandMap = new Map([
  [Commands.DICE, sendStandardDieRollResult],
  [Commands.FLIP, sendCoinFlipResult],
  [Commands.PROJECT, sendCurrentProjectDescription],
  [Commands.COMMANDS, sendCommands],
]);

const commandDescriptions = new Map([
  [Commands.DICE, 'roll a die'],
  [Commands.FLIP, 'flip a coin'],
  [Commands.PROJECT, 'our current project'],
]);

function handleCommand(client, target, command){
  handler = commandMap.get(command);
  if (handler) {
    handler(client, target, command);
  } else if (msg[0] === '!') {
    logUnknownCommandToConsole(command);
  }
}

function sendStandardDieRollResult(client, target, command) {
  client.say(target, `You rolled a ${rollStandardDie()}`);
}

function sendCoinFlipResult(client, target, command) {
  client.say(target, `You flipped ${coinFlip()}`);
}

function sendCurrentProjectDescription(client, target, command) {
  client.say(target, CURRENT_PROJECT_DESCRIPTION);
}

function sendCommands(client, target, command) {
  commandList = [];
  for (const [command, description] of commandDescriptions.entries()) {
    commandList.push(`${command} (${description})`);
  }

  client.say(target, commandList.join(', '));
}

function logUnknownCommandToConsole(command) {
  console.log(`* Unknown command ${command}`);
}

// Function called when the !dice command is issued
function rollStandardDie () {
  const sides = 6;
  return rollAnyDie(sides);
}
function rollAnyDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// Returns "heads" or "tails" for the !flip command
function coinFlip() {
  return (rollAnyDie(2) == 1) ? "heads" : "tails";
}
