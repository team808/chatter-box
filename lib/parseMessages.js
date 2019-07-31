

module.exports = (string, username) => {
  if(string[0] !== '@') {
    return {
      command:'dm',
      args: username,
      text: 'Invalid input. Messages must start with @.'
    };
  }

  const pattern = /@(?<command>\w*):?(?<args>\w*)\s?(?<text>.*)?/;

  const match = pattern.exec(string);

  if(!match || !match.groups) {
    return {
      command:'dm',
      args: username,
      text: 'Invalid input. Messages must start with @.'
    };
  }
 
  return {
    command: match.groups.command,
    args: match.groups.args,
    text: match.groups.text
  };
};
