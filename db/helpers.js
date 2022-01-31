const fs = require('fs');
const util = require('util');
const {v4: uuidv4 } = require('uuid')

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

function read() {
  return readFromFile('db/db.json', 'utf8');
}
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */

function write(note) {
  const writeFileAsync =  util.promisify(fs.writeFile)
  return writeFileAsync('db/db.json', JSON.stringify(note))
}
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      write(file, parsedData);
    }
  });
};

const getNotes = exports.getNotes = function() {
  return read().then((notes) => {
    let parsedNotes = JSON.parse(notes) || [];
    return parsedNotes;
  })
}

exports.addNote = function(note) {
  const { title, text } = note;

  if(!title || !text ) {
    throw new Error('Notes must have a title and a text!');
  }

  const newNote = {title, text, id: uuidv4()};

  return getNotes()
  .then((notes) => {
    notes.push(newNote)
    return write(notes)
  })
  .then(() => newNote);
}

exports.deleteNote = function(id) {
  return getNotes()
  .then((notes) => notes.filter((note) => note.id !== id))
  .then((filteredNotes)=> write(filteredNotes));
}




// module.exports = { readFromFile, writeToFile, readAndAppend };