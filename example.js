const PdfPrinter = require("pdfmake");
const fs = require("fs");

const fonts = {
  Roboto: {
    normal: "./fonts/Roboto/Roboto-Regular.ttf",
    bold: "./fonts/Roboto/Roboto-Medium.ttf",
    italics: "./fonts/Roboto/Roboto-Italic.ttf",
    bolditalics: "./fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};

const printer = new PdfPrinter(fonts);

const michelinLogoPlaceholder = "./miche.png";
const cocaColaLogoPlaceholder = "./coca.png";

const docDefinition = {
  content: [
    { text: "zebra style", margin: [0, 20, 0, 8] },
    {
      style: "tableExample",
      table: {
        body: [
          ["Sample value 1", "Sample value 2", "Sample value 3"],
          ["Sample value 1", "Sample value 2", "Sample value 3"],
          ["Sample value 1", "Sample value 2", "Sample value 3"],
          ["Sample value 1", "Sample value 2", "Sample value 3"],
          ["Sample value 1", "Sample value 2", "Sample value 3"],
        ],
      },
      layout: {
        fillColor: function (rowIndex, node, columnIndex) {
          return rowIndex % 2 === 0 ? "#CCCCCC" : null;
        },
      },
    },

    {
      table: {
        widths: ["*", "auto", "*"],
        body: [
          [
            {
              image: michelinLogoPlaceholder,
              width: 50,
            },
            {
              text: "Informe de reemplazo estimado\nPara Coca Cola FEMSA T2,\nRegion Noreste Coca Cola FEMSA T2",
              style: "header",
              alignment: "center",
            },
            {
              image: cocaColaLogoPlaceholder,
              width: 50,
            },
          ],
        ],
      },
      layout: "noBorders",
    },

    {
      style: "tableExample",
      table: {
        headerRows: 1,
        body: [
          [
            "Localidad",
            "KOF Ciudad Victoria Coca Noreste T2",
            "Frecuencia de inspección 1 mes",
            { text: "Promedio de desgaste mensual 5,0", colSpan: 2 },
            {},
            { text: "Profundidad de desmontaje 5,0", colSpan: 2 },
            {},
            "Rango de fechas",
            { text: "30/06/2023 - 30/10/2023", colSpan: 2 },
            {},
          ],
        ],
      },
    },
  ],
  styles: {
    header: {
      fontSize: 16,
      bold: true,
    },
    tableExample: {
      margin: [0, 5, 0, 15],
    },
    tableHeader: {
      bold: true,
      fontSize: 13,
      color: "black",
    },
  },
  defaultStyle: {
    font: "Roboto",
  },
};

const pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream("output.pdf"));
pdfDoc.end();
