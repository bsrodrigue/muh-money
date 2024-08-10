export function getWordCount(str) {
  return str.split(' ').filter(function(num) {
    return num != ''
  }).length;
}

export const truncate = (str: string, len: number) => str.length > len ? str.slice(0, len) + "..." : str;
