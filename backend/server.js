const MIX_COLUMN_MATRIX = [
  [0x02, 0x03, 0x01, 0x01],
  [0x01, 0x02, 0x03, 0x01],
  [0x01, 0x01, 0x02, 0x03],
  [0x03, 0x01, 0x01, 0x02]
];
const INVERSE_MIX_COLUMN_MATRIX = [
  [0x0E, 0x0B, 0x0D, 0x09],
  [0x09, 0x0E, 0x0B, 0x0D],
  [0x0D, 0x09, 0x0E, 0x0B],
  [0x0B, 0x0D, 0x09, 0x0E]
];

const AES_SUBSTITUTION_BOX = [
  ["63", "7c", "77", "7b", "f2", "6b", "6f", "c5", "30", "01", "67", "2b", "fe", "d7", "ab", "76"],
      ["ca", "82", "c9", "7d", "fa", "59", "47", "f0", "ad", "d4", "a2", "af", "9c", "a4", "72", "c0"],
      ["b7", "fd", "93", "26", "36", "3f", "f7", "cc", "34", "a5", "e5", "f1", "71", "d8", "31", "15"],
      ["04", "c7", "23", "c3", "18", "96", "05", "9a", "07", "12", "80", "e2", "eb", "27", "b2", "75"],
      ["09", "83", "2c", "1a", "1b", "6e", "5a", "a0", "52", "3b", "d6", "b3", "29", "e3", "2f", "84"],
      ["53", "d1", "00", "ed", "20", "fc", "b1", "5b", "6a", "cb", "be", "39", "4a", "4c", "58", "cf"],
      ["d0", "ef", "aa", "fb", "43", "4d", "33", "85", "45", "f9", "02", "7f", "50", "3c", "9f", "a8"],
      ["51", "a3", "40", "8f", "92", "9d", "38", "f5", "bc", "b6", "da", "21", "10", "ff", "f3", "d2"],
      ["cd", "0c", "13", "ec", "5f", "97", "44", "17", "c4", "a7", "7e", "3d", "64", "5d", "19", "73"],
      ["60", "81", "4f", "dc", "22", "2a", "90", "88", "46", "ee", "b8", "14", "de", "5e", "0b", "db"],
      ["e0", "32", "3a", "0a", "49", "06", "24", "5c", "c2", "d3", "ac", "62", "91", "95", "e4", "79"],
      ["e7", "c8", "37", "6d", "8d", "d5", "4e", "a9", "6c", "56", "f4", "ea", "65", "7a", "ae", "08"],
      ["ba", "78", "25", "2e", "1c", "a6", "b4", "c6", "e8", "dd", "74", "1f", "4b", "bd", "8b", "8a"],
      ["70", "3e", "b5", "66", "48", "03", "f6", "0e", "61", "35", "57", "b9", "86", "c1", "1d", "9e"],
      ["e1", "f8", "98", "11", "69", "d9", "8e", "94", "9b", "1e", "87", "e9", "ce", "55", "28", "df"],
      ["8c", "a1", "89", "0d", "bf", "e6", "42", "68", "41", "99", "2d", "0f", "b0", "54", "bb", "16"]
];
const AES_INVERSE_SUBSTITUTION_BOX = [
  "52", "09", "6A", "D5", "30", "36", "A5", "38", "BF", "40", "A3", "9E", "81", "F3", "D7", "FB",
  "7C", "E3", "39", "82", "9B", "2F", "FF", "87", "34", "8E", "43", "44", "C4", "DE", "E9", "CB",
  "54", "7B", "94", "32", "A6", "C2", "23", "3D", "EE", "4C", "95", "0B", "42", "FA", "C3", "4E",
  "08", "2E", "A1", "66", "28", "D9", "24", "B2", "76", "5B", "A2", "49", "6D", "8B", "D1", "25",
  "72", "F8", "F6", "64", "86", "68", "98", "16", "D4", "A4", "5C", "CC", "5D", "65", "B6", "92",
  "6C", "70", "48", "50", "FD", "ED", "B9", "DA", "5E", "15", "46", "57", "A7", "8D", "9D", "84",
  "90", "D8", "AB", "00", "8C", "BC", "D3", "0A", "F7", "E4", "58", "05", "B8", "B3", "45", "06",
  "D0", "2C", "1E", "8F", "CA", "3F", "0F", "02", "C1", "AF", "BD", "03", "01", "13", "8A", "6B",
  "3A", "91", "11", "41", "4F", "67", "DC", "EA", "97", "F2", "CF", "CE", "F0", "B4", "E6", "73",
  "96", "AC", "74", "22", "E7", "AD", "35", "85", "E2", "F9", "37", "E8", "1C", "75", "DF", "6E",
  "47", "F1", "1A", "71", "1D", "29", "C5", "89", "6F", "B7", "62", "0E", "AA", "18", "BE", "1B",
  "FC", "56", "3E", "4B", "C6", "D2", "79", "20", "9A", "DB", "C0", "FE", "78", "CD", "5A", "F4",
  "1F", "DD", "A8", "33", "88", "07", "C7", "31", "B1", "12", "10", "59", "27", "80", "EC", "5F",
  "60", "51", "7F", "A9", "19", "B5", "4A", "0D", "2D", "E5", "7A", "9F", "93", "C9", "9C", "EF",
  "A0", "E0", "3B", "4D", "AE", "2A", "F5", "B0", "C8", "EB", "BB", "3C", "83", "53", "99", "61",
  "17", "2B", "04", "7E", "BA", "77", "D6", "26", "E1", "69", "14", "63", "55", "21", "0C", "7D"
];

function leftCircularShift(array) {
  const temp = array[0]; // Save the first element
  array[0] = array[1];
  array[1] = array[2];
  array[2] = array[3];
  array[3] = temp;
  return [...array];
}
function rightCircularShift(array) {
  const temp = array[3]; // Save the last element
  array[3] = array[2];
  array[2] = array[1];
  array[1] = array[0];
  array[0] = temp;
  return [...array];
}


function substitute(array) {
  for (let i = 0; i < array.length; i++) {
     
      const row = parseInt(array[i].substring(0, 1), 16);
      const col = parseInt(array[i].substring(1), 16);
      array[i] = AES_SUBSTITUTION_BOX[row][col];
  }
  return [...array];
}
function inverseSubstitute(state) {
  for (let i = 0; i < state.length; i++) {
    const row = parseInt(state[i].substring(0, 1), 16);
    const col = parseInt(state[i].substring(1), 16);
    state[i] = AES_INVERSE_SUBSTITUTION_BOX[row * 16 + col];
  }
  return state;
}
function mixColumns(inputMatrix) {
  const resultMatrix = new Array(4).fill(null).map(() => new Array(4));

  for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 4; row++) {
          let result = 0;
          for (let i = 0; i < 4; i++) {
              const a = parseInt(inputMatrix[i][col], 16);
              const b = MIX_COLUMN_MATRIX[row][i];
              result ^= multiply(a, b);
          }
          resultMatrix[row][col] = result.toString(16).toUpperCase().padStart(2, '0');
      }
  }

  return resultMatrix;
}
function inverseMixColumns(inputMatrix) {
  const resultMatrix = new Array(4).fill(null).map(() => new Array(4));

  for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 4; row++) {
          let result = 0;
          for (let i = 0; i < 4; i++) {
              const a = parseInt(inputMatrix[i][col], 16);
              const b = INVERSE_MIX_COLUMN_MATRIX[row][i];
              result ^= multiply(a, b);
          }
          resultMatrix[row][col] = result.toString(16).toUpperCase().padStart(2, '0');
      }
  }

  return resultMatrix;
}

function multiply(a, b) {
  let result = 0;
  while (b > 0) {
      if ((b & 1) === 1) {
          result ^= a;
      }
      const highBit = a & 0x80;
      a <<= 1;
      if (highBit === 0x80) {
          a ^= 0x1B;
      }
      b >>>= 1;
  }
  return result;
}

function convertToBinary(input) {
  let binaryStringBuilder = '';

  for (let c of input) {
      let binaryChar = c.charCodeAt(0).toString(2).padStart(8, '0');
      binaryStringBuilder += binaryChar;
  }

  return binaryStringBuilder;
}
function hexToAscii(hex) {
  let ascii = '';
  
  for (let i = 0; i < hex.length; i += 2) {
    const hexPair = hex.substr(i, 2);
    const decimalValue = parseInt(hexPair, 16);
    const asciiChar = String.fromCharCode(decimalValue);
    ascii += asciiChar;
  }
  
  return ascii;
}
function create2DArray(binaryKey) {
  const keyBin = new Array(4).fill(null).map(() => new Array(4));
  const binaryLength = binaryKey.length;

  let k = 0;

  for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
          const eightBits = binaryKey.substring(k, Math.min(k + 8, binaryLength));
          keyBin[j][i] = eightBits;
          k += 8;
      }
  }

  return keyBin;
}

function convertToHex(keyBin) {
  const keyHex = new Array(4).fill(null).map(() => new Array(4));

  for (let i = 0; i < keyBin.length; i++) {
      for (let j = 0; j < keyBin[i].length; j++) {
          const decimalValue = parseInt(keyBin[i][j], 2);
          const hexDigit = decimalValue.toString(16).toUpperCase();
          keyHex[i][j] = hexDigit.padStart(2, '0');
      }
  }

  return keyHex;
}


function xorHexArrays(array1, array2) {
  const binaryArray1 = array1.map(hexToBinary);
  const binaryArray2 = array2.map(hexToBinary);

  const xorResult = new Array(4);
  for (let i = 0; i < 4; i++) {
      xorResult[i] = xorBinaryStrings(binaryArray1[i], binaryArray2[i]);
  }

  for (let i = 0; i < xorResult.length; i++) {
      xorResult[i] = binaryToHex(xorResult[i]);
  }
  return xorResult;
}

function hexToBinary(hex) {
  const decimalValue = parseInt(hex, 16);
  return decimalValue.toString(2).padStart(8, '0');
}

function xorBinaryStrings(binary1, binary2) {
  let result = '';
  for (let i = 0; i < binary1.length; i++) {
      result += (binary1[i] ^ binary2[i]);
  }
  return result;
}

function binaryToHex(binary) {
  const firstFourBits = binary.substring(0, 4);
  const secondFourBits = binary.substring(4);

  const firstDecimalValue = parseInt(firstFourBits, 2);
  const secondDecimalValue = parseInt(secondFourBits, 2);

  const firstHexValue = firstDecimalValue.toString(16).toUpperCase();
  const secondHexValue = secondDecimalValue.toString(16).toUpperCase();

  return firstHexValue + secondHexValue;
}
function encrypt(inputMsg) {
  const roundConstants = [
      ["01", "00", "00", "00"],
      ["02", "00", "00", "00"],
      ["04", "00", "00", "00"],
      ["08", "00", "00", "00"],
      ["10", "00", "00", "00"],
      ["20", "00", "00", "00"],
      ["40", "00", "00", "00"],
      ["80", "00", "00", "00"],
      ["1B", "00", "00", "00"],
      ["36", "00", "00", "00"]
  ];
  const inputKey = "satishcjisboring";
    let length = inputMsg.length;
  let noOf16Multiples = Math.ceil(length / 16);
  let binaryMsg = convertToBinary(inputMsg);

  if (length % 16 !== 0) {
   //   noOf16Multiples++; // Add an extra multiple if the length is not divisible by 16
      const upperBound = noOf16Multiples * 16;
      const lowerBound = length;
      const difference = upperBound - lowerBound;
      for (let i = 0; i < difference; i++) {
          binaryMsg += "00000000";
      }
  }

  const binaries = [];
  const blockLength = 128;
  const cipheredMessages= [];

  for (let i = 0; i < noOf16Multiples; i++) {
      const startIndex = i * blockLength;
      const endIndex = startIndex + blockLength;
      binaries[i] = binaryMsg.substring(startIndex, endIndex);
  }
  const array3D = binaries.map(binary => create2DArray(binary));
  const MsgHex = array3D.map(array2D => convertToHex(array2D));
  for (let i = 0; i < noOf16Multiples; i++) {
      for (let j = 0; j < 4; j++) {
          for (let k = 0; k < 4; k++) {
              if (MsgHex[i][j][k].length === 1) {
                  MsgHex[i][j][k] = MsgHex[i][j][k] + '0';
              }
          }
      }
  }
  const binaryKey = convertToBinary(inputKey);
  const keyBin = create2DArray(binaryKey);
  const keyHex = convertToHex(keyBin);
  const keyHexAll = new Array(4).fill(null).map(() => new Array(44));

  for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
          keyHexAll[i][j] = keyHex[i][j];
      }
  }
  for (let outer = 1; outer <= 10; outer++) {
      const lastcolIter = outer * 4 - 1;
      const third = [];
      for (let i = 0; i < 4; i++) {
          third[i] = keyHexAll[i][lastcolIter];
      }
      const newthird = leftCircularShift(third);
      substitute(newthird); // Note: Updated here

      const col = new Array(4);

      for (let i = 0; i < 4; i++) {
           col[i] = roundConstants[outer - 1][i];
      }

      const g3 = xorHexArrays(newthird, col);

      const leftg3 = new Array(4);
      const scndIndex = outer * 4 - 4;

      for (let i = 0; i < 4; i++) {
          leftg3[i] = keyHexAll[i][scndIndex];
      }
      const newWord = xorHexArrays(leftg3, g3);
      for (let i = 0; i < 4; i++) {
          keyHexAll[i][outer * 4] = newWord[i];
      }
      const nextStart = outer * 4 + 1;
      const nextEnd = outer * 4 + 4;

      for (let k = nextStart; k < nextEnd; k++) {
          const one = new Array(4);
          const two = new Array(4);
          for (let x = 0; x < 4; x++) {
              one[x] = keyHexAll[x][k - 1];
              two[x] = keyHexAll[x][k - 4];
          }          const newone = xorHexArrays(one, two);
          for (let z = 0; z < 4; z++) {
              keyHexAll[z][k] = newone[z];
          }
      }
  }
  const keys = new Array(11).fill(null).map(() => new Array(4).fill(null).map(() => new Array(4)));

  let l = 0;
  for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 4; j++, l++) {
          for (let k = 0; k < 4; k++) {
              keys[i][k][j] = keyHexAll[k][l];
          }
      }
  }
let temp=0;
  for (let i = 0; i < noOf16Multiples; i++) {
      let msg = new Array(4).fill(null).map(() => new Array(4));
      for (let j = 0; j < 4; j++) {
          msg[j] = xorHexArrays(MsgHex[i][j], keys[0][j]);
      }
      for (let x = 0; x < 10; x++) {
          for (let s = 0; s < 4; s++) {
              msg[s] = substitute(msg[s]);
          }
          msg[1] = leftCircularShift(msg[1]);
          msg[2] = leftCircularShift(msg[2]);
          msg[2] = leftCircularShift(msg[2]);
          msg[3] = leftCircularShift(msg[3]);
          msg[3] = leftCircularShift(msg[3]);
          msg[3] = leftCircularShift(msg[3]);
     
              if (x !== 9) {
              msg = mixColumns(msg);
              for (let m = 0; m < 4; m++) {
                  for (let n = 0; n < 4; n++) {
                      if (msg[m][n].length > 2) {
                          msg[m][n] = msg[m][n].substring(1);
                      }
                  }
              }
          }
          for (let z = 0; z < 4; z++) {
              msg[z] = xorHexArrays(msg[z], keys[x + 1][z]);
          }
     
      }
      let temp="";
      let CipheredMsg = "";
      for (let r = 0; r < 4; r++) {
          for (let s = 0; s < 4; s++) {
          
              CipheredMsg += msg[s][r];
          }
      }
      let halfLength=CipheredMsg.length/2;
      let firstHalf = CipheredMsg.substring(0, halfLength);
      let secondHalf = CipheredMsg.substring(halfLength);        
      cipheredMessages.push(firstHalf);
      cipheredMessages.push(secondHalf);    
      temp++;
  }
  console.log("CipheredMessages: " + cipheredMessages+".");
  
  return cipheredMessages;
}

function decrypt(inputMsg2) {
  let abc=inputMsg2.length/2;
  let inputMsg= Array(abc).fill("");
let temp=0;
  for (let i = 0; i <abc;i++) {
      inputMsg[i]+=inputMsg2[temp];
      temp++;
      inputMsg[i]+=inputMsg2[temp];
      temp++;

    }
  const roundConstants = [
      ["01", "00", "00", "00"],
      ["02", "00", "00", "00"],
      ["04", "00", "00", "00"],
      ["08", "00", "00", "00"],
      ["10", "00", "00", "00"],
      ["20", "00", "00", "00"],
      ["40", "00", "00", "00"],
      ["80", "00", "00", "00"],
      ["1B", "00", "00", "00"],
      ["36", "00", "00", "00"]
  ];

  const inputKey = "satishcjisboring";
  const threeDArray = [];

// Initialize the array with empty strings
const length = inputMsg.length;
let noOf16Multiples =length;
const pairCount = 32 / 2; // Number of pairs in each string
//inputMsg is ciphered hexadecimal strings
// Create a 3D array of ciphered hexadecimal arrays and populate
for (let i = 0; i < length; i++) {
  threeDArray[i] = [];
  let index = 0;
  for (let j = 0; j < 4; j++) {
    for (let k = 0; k < 4; k++) {
      threeDArray[i][k] = threeDArray[i][k] || []; // Initialize the array if it's undefined
      const pair = inputMsg[i].substr(index * 2, 2); // Extract the pair of hexadecimal letters
      threeDArray[i][k][j] = pair;
      index++;
    }
  }
}
  const binaryKey = convertToBinary(inputKey);
  const keyBin = create2DArray(binaryKey);
  const keyHex = convertToHex(keyBin);
  const keyHexAll = new Array(4).fill(null).map(() => new Array(44));

  for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
          keyHexAll[i][j] = keyHex[i][j];
      }
  }

  for (let outer = 1; outer <= 10; outer++) {
      const lastcolIter = outer * 4 - 1;
      const third = [];
      for (let i = 0; i < 4; i++) {
          third[i] = keyHexAll[i][lastcolIter];
      }

      const newthird = leftCircularShift(third);
      substitute(newthird); // Note: Updated here

      const col = new Array(4);

      for (let i = 0; i < 4; i++) {
          col[i] = roundConstants[outer - 1][i];
      }
      const g3 = xorHexArrays(newthird, col);
      const leftg3 = new Array(4);
      const scndIndex = outer * 4 - 4;

      for (let i = 0; i < 4; i++) {
          leftg3[i] = keyHexAll[i][scndIndex];
      }
      const newWord = xorHexArrays(leftg3, g3);
      for (let i = 0; i < 4; i++) {
          keyHexAll[i][outer * 4] = newWord[i];
      }

      const nextStart = outer * 4 + 1;
      const nextEnd = outer * 4 + 4;

      for (let k = nextStart; k < nextEnd; k++) {
          const one = new Array(4);
          const two = new Array(4);
          for (let x = 0; x < 4; x++) {
              one[x] = keyHexAll[x][k - 1];
              two[x] = keyHexAll[x][k - 4];
          }
          const newone = xorHexArrays(one, two);
          for (let z = 0; z < 4; z++) {
              keyHexAll[z][k] = newone[z];
          }
      }
  }
  const keys = new Array(11).fill(null).map(() => new Array(4).fill(null).map(() => new Array(4)));

  let l = 0;
  for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 4; j++, l++) {
          for (let k = 0; k < 4; k++) {
              keys[i][k][j] = keyHexAll[k][l];
              
          }
      }
  }
  const plainTexts = [];
  

  for (let i = 0; i < noOf16Multiples; i++) {
//add round key
for (let z = 0; z < 4; z++) {
  threeDArray[i][z] = xorHexArrays(threeDArray[i][z], keys[10][z]);
}
      for (let x = 9; x >=0; x--) {
          threeDArray[i][1] = rightCircularShift(threeDArray[i][1]);
          threeDArray[i][2] = rightCircularShift(threeDArray[i][2]);
          threeDArray[i][2] = rightCircularShift(threeDArray[i][2]);
          threeDArray[i][3] = rightCircularShift(threeDArray[i][3]);
          threeDArray[i][3] = rightCircularShift(threeDArray[i][3]);
          threeDArray[i][3] = rightCircularShift(threeDArray[i][3]);

          for (let s = 0; s < 4; s++) {
              threeDArray[i][s] = inverseSubstitute(threeDArray[i][s]);
          }
          // console.log("after right circular shifts");
          // print2DArray(threeDArray[i]);
          for (let z = 0; z < 4; z++) {
              threeDArray[i][z] = xorHexArrays(threeDArray[i][z], keys[x][z]);
          }

              if (x !== 0) {
                  threeDArray[i] = inverseMixColumns(threeDArray[i]);
              for (let m = 0; m < 4; m++) {
                  for (let n = 0; n < 4; n++) {
                      if (threeDArray[i][m][n].length > 2) {
                          threeDArray[i][m][n] = threeDArray[i][m][n].substring(1);
                      }
                  }
              }
          }  
      }
      let texts = "";
      for (let r = 0; r < 4; r++) {
          for (let s = 0; s < 4; s++) {
              texts += threeDArray[i][s][r];
          }
      }
      plainTexts.push(texts);
  }
  
let plainTextt="";
for(let i=0;i<plainTexts.length;i++)
{
  plainTextt=plainTextt+plainTexts[i];
}
plainTextt=hexToAscii(plainTextt);
      console.log("plainTextt: " + plainTextt);

      return plainTextt;
          
  }







const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const bcrypt = require("bcryptjs");

const fs = require('fs');
const formidable = require('formidable');

// const helmet = require("helmet");
// const morgan = require("morgan");

// const conversationRoute = require("./routes/conversations");
//const messageRoute = require("./routes/messages");
// const Conversation = require("./models/Conversation");

//const path = require("path");


const directoryPath = './uploads';
app.use(express.static('public'));
app.use('/images', express.static('uploads'));






mongoose.connect('mongodb+srv://l201305:vk8LIGpl0UVhroAH@cluster0.nbaphfy.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  }
).then(()=>console.log("connected")).catch(()=>console.log("error"));



//user schema 

const UsersSchema=new mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    img: {
      type: String,
      default: "",
    }
   ,
  },
  { timestamps: true }
,{ versionKey: false });
const users=new mongoose.model('users',UsersSchema);

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);
const Conversation=new mongoose.model('Conversation',ConversationSchema);

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: [String],  
    },
    timeIs: {
      type: String,
    },
    encryptiontype: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);


app.post("/encrypt", (req, res) => {
  console.log("I am here");  
    const msg =req.body.newMessage;
    console.log("msg in route is :"+msg);
    let ciphered=encrypt(msg);
    console.log("ciphered after encrypt:",ciphered);
    
    res.status(200).json(ciphered);
  });


app.post("/decrypt", (req, res) => {
    console.log("Inside Decrypt!");
    const cipheredMsgsArray = req.body.cipheredArray || []; // Extract the array from query parameters
    console.log("cipheredarray in route is :",cipheredMsgsArray);
    const plainMsg = decrypt(cipheredMsgsArray);
    console.log("plainString after decrypt:"+plainMsg+".");
    // Do decryption logic if needed
    res.status(200).json({decrypted_values:plainMsg });
  });

//add
app.post("/addMessage", async (req, res) => {
  const newMessage = new Message(req.body);
  // console.log("newMessage::",newMessage)
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

app.post("/getMessages", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.body.conversationId,
    });
    console.log("messages::",messages)
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.post("/AllMessages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/getConversations", async (req, res) => {
  try {
    const id=req.body.id;   
    // console.log(id+"get Conversation ");
    
    const conversation = await Conversation.find({ members: { $in: [id] } });
    const collectionName = Conversation.collection.name;
    // console.log(collectionName);
   
    //{
    //   members: { $in: [id] },
    // });
    // console.log("ji"+conversation,".AB AYA is ME.");
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.post("/AddConversation", async (req, res) => {
  // console.log("Atl east hereee");
  
  try {
    const myObj=req.body.myObject;
    // console.log(myObj);
    const frndEmail=req.body.scndEmail;
    const frndObject= await users.findOne({ email:frndEmail });
    const objectIdString = frndObject._id.toString();
    // console.log("here also");
    if(frndObject)
    {
      // console.log(myObj._id);
      // console.log(frndObject._id);
      // console.log(objectIdString);
      // console.log("came add!!!!!!!!!!!!!!!!!!!!!!!!!!");
      const newConversationIs = new Conversation({
  members: [myObj._id,objectIdString]
});

// console.log("new is :");
// console.log(newConversationIs.members[0]);
// console.log(newConversationIs.members[1]);
const savedConversation = await newConversationIs.save();
// console.log("saved is :");
// console.log(savedConversation.members[0]);
// console.log(savedConversation.members[1]);

res.status(200).json(savedConversation);

    }
    else{
      console.log("came hereeee")
      res.status(500);
    }
  } catch (err) {
    console.log("huuuuuu");
    res.status(500).json(err);
  }
});




app.post('/upload', async(req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req,async function (err, fields, files) {
    const password = fields.password;
    const email = fields.email;
    const name = fields.name;
    const encryptedPassword = await bcrypt.hash(password, 10);
// console.log(files);
    try {
      const oldUser = await users.findOne({ email });
  
      if (oldUser) {
        return res.json({ error: "User Exists" });
      }
  const user=new users();
  user.name=name;
  user.email=email;
  user.password=encryptedPassword;
  // console.log(email);
  var oldpath = files.img.filepath;
    // console.log(oldpath);
    var newpath = __dirname+'/uploads/' + files.img.originalFilename;
    fs.copyFile(oldpath, newpath, (err) => {
      if (err) throw err;
      fs.unlink(oldpath, (err) => {
        if (err){ console("yes")};
       
      });
    });
  user.save();
  // console.log("came");
  res.write('ok');
        res.end();
    } catch (error) {
      res.send({error});
    }
    
  });
});


app.post("/login", async (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req,async function (err, fields, files) {
    const password = fields.password;
    const emailIs = fields.email;
    // console.log("inside login server"+password);
try{
  const user = await users.findOne({ email:emailIs });
  // console.log("after inside login server"+user.password,user.email);

  if (user) {
      if (await bcrypt.compare(password, user.password)) {
        res.status(200).json(user);
        res.end();

      } 
}
else
{
  res.status(500).send({error});
}
    }
    catch(error)
    {
      res.status(500).send({error});
    }
  });
});

app.post("/", async (req, res) => {
  const id=req.body.id;   
    // console.log(id+"maiIs ");

    try{
  const user = await users.findOne({ _id:id });
    // console.log(user);
  if (user) {

      res.status(200).json(user);
  
}
    }
    catch(error)
    {
      res.status(500).json(error);
    }
    res.end();
});

//middleware
// app.use(express.json());
// app.use(helmet());
// app.use(morgan("common"));


// app.use("/api/conversations", conversationRoute);
//app.use("/api/messages", messageRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});





