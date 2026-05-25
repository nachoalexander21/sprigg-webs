const SHEET_NAME = "Hoja 1";

function doPost(e){

  try{

    const hoja = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(SHEET_NAME);

    const data = JSON.parse(e.postData.contents);

    const fila = hoja.getLastRow() + 1;

    // LINK WHATSAPP
    const mensaje = encodeURIComponent(
      "Hola " + data.nombre +
      ", tu proyecto está en revisión en Sprigg Webs."
    );

    const whatsapp =
      "https://wa.me/591" +
      data.telefono.replace(/\s+/g,'') +
      "?text=" + mensaje;

    // INSERTAR DATOS
    hoja.appendRow([

      fila - 1,
      data.nombre,
      data.telefono,
      data.correo,
      data.tipoSolicitud,
      data.titulo,
      data.descripcion,
      data.obsCliente,
      "EN ESPERA",
      whatsapp

    ]);

    // CORREO AUTOMÁTICO
    MailApp.sendEmail({

      to:data.correo,

      subject:"Sprigg Webs - Solicitud Recibida",

      htmlBody:`

      <div style="
      font-family:Arial;
      padding:30px;
      background:#f4f7ff;
      ">

      <div style="
      background:linear-gradient(90deg,#007bff,#6f00ff);
      color:white;
      padding:25px;
      border-radius:15px;
      text-align:center;
      ">

      <h1>🌐 Sprigg Webs</h1>

      <p>Webs a tu servicio</p>

      </div>

      <div style="
      background:white;
      margin-top:20px;
      padding:30px;
      border-radius:15px;
      ">

      <h2>Hola ${data.nombre}</h2>

      <p>
      Tu solicitud fue registrada correctamente.
      </p>

      <p>
      Nuestro equipo revisará tu proyecto.
      </p>

      <hr>

      <h3>📋 Estado:</h3>

      <p style="
      color:orange;
      font-weight:bold;
      font-size:18px;
      ">

      EN ESPERA

      </p>

      <br>

      <p>
      Gracias por confiar en Sprigg Webs 🚀
      </p>

      </div>

      </div>

      `

    });

    return ContentService
      .createTextOutput(JSON.stringify({

        success:true

      }))
      .setMimeType(ContentService.MimeType.JSON);

  }catch(error){

    return ContentService
      .createTextOutput(JSON.stringify({

        success:false,
        error:error.toString()

      }))
      .setMimeType(ContentService.MimeType.JSON);

  }

}
