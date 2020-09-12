const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");

// var currentTime = new Date();
// var month = currentTime.getMonth()+1;
// var day = currentTime.getDate();
// var year = currentTime.getFullYear();
// var dateString= month + "/" + day + "/" + year;



const { PDFDocument, rgb, degrees } = PDFLib;

const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  const val = capitalize(userName.value);

  //check if the text is empty or not
  if (val.trim() !== "" && userName.checkValidity()) {
    // console.log(val);
    generatePDF(val);
  } else {
    userName.reportValidity();
  }
});

const generatePDF = async (name) => {
  const existingPdfBytes = await fetch("./cert3.pdf").then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("./DancingScript-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );

  // Embed our custom font in the document
  const DancingScriptFont = await pdfDoc.embedFont(fontBytes);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: 335,
    y: 340,
    size: 26,
    font: DancingScriptFont,
    color: rgb(0.62,0.11,0.21),
  });
  firstPage.drawText("Web Development",{
    x: 320,
    y: 283,
    size: 22,
    font : DancingScriptFont,
    color: rgb(0.62,0.11,0.21),
  });
  firstPage.drawText("September 12, 2020",{
    x: 320,
    y: 225,
    size: 22,
    font: DancingScriptFont,
    color: rgb(0.62,0.11,0.21),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");

  // this was for creating uri and showing in iframe

  // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  // document.getElementById("pdf").src = pdfDataUri;

  var file = new File(
    [pdfBytes],
    "DSC Certificate.pdf",
    {
      type: "application/pdf;charset=utf-8",
    }
  );
 saveAs(file);
};

// init();

//Preloader code start
let preloader = document.getElementById("loader_page");
function fLoad(){
  preloader.style.display = 'none';
}

