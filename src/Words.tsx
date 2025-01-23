import wordBank from "./word-bank.txt";

// Define blank matrix to hold gameplay
export const boardMatrix = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

// Generate Set of words from word bank and randomly select word to be answer
export const genWordSet = async () => {
  // Fetch text from word bank document and split at newline to receive array of words
  const response = await fetch(wordBank);
  const result = await response.text();
  const wordArr = result.split("\n");
  // Define variable to hold randomly selected word from word bank array
  const todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
  // Convert word bank array into set
  const wordSet = new Set<string>(wordArr);
  return { wordSet, todaysWord };
};
