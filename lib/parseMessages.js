module.exports = string => {
  if(string[0] !== '@') return null;

  const pattern = /@(?<command>\w*):?(?<args>\w*)\s?(?<text>.*)?/;

  const match = pattern.exec(string);

  if(!match || !match.groups) return null;

  return {
    command: match.groups.command,
    args: match.groups.args,
    text: match.groups.text
  };
};
