import express from "express";
//import file system inbuilt module
import fs from "fs";
const express = require('express'); 
import { format } from "date-fns";
import path from 'path';

const app = express();
//the server port 4000
const PORT = 4000;

// function to convert UTC time to Indian Standard Time (IST)
function convertToIST(utc) {
    return new Date(utc.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
}


//the date  is formatted to be displayed as dd/MM/yyyy HH:mm:ss

let today = convertToIST(new Date());
let date = format(today, " dd-MM-yyyy   HH-mm-ss");
const filePath = `timeStamp/${date}.txt`;
  
app.get('/', (req, res) => {
    res.status(200).send(` <h1>Welcome to the Nodejs file system.<br/>  To retrive  timestamp use the endpoint <mark>/getfiles</mark></h1>`);
})
app.get("/write", (req, res) => {
    try {
      //to write file
    fs.writeFileSync(filePath, `${date}`, "utf8");
    res
      .status(200)
      .send(
        `<h1 style="text-align:center;background-color:aliceblue;">File written Successfully : <br/><br/>${date}</h1>`
      );
  } catch (error) {
    console.error("Error writing file:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/read", (req, res) => {

    try {
      //to read file
      // const filePath='timeStamp';
       let data=fs.readFileSync(filePath, "utf8");
      
    res
      .status(200)
      .send(
       `<h1 style="text-align:center;background-color:yellow;">${data}</h1>`
        
      );
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).send("Internal Server Error");
  }
});


// New endpoint to retrieve all text files in a folder

app.get("/getfiles", (req, res) => {
  const filePath = "timeStamp";

  fs.readdir(filePath, (err, files) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send("An error occurred while listing the files from the directory");
    } else {
      const textFiles = files.filter((file) => path.extname(file) === ".txt");
      res.status(200).json(textFiles);
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
}); 