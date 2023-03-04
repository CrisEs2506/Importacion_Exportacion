const { MongoClient } = require("mongodb");
const csv = require('csvtojson');

const csvFilePath = '<Nombre del Archivo>.csv'; //<----

//Conectar a la base de datos de MongoDb Atlas
//URL de la base de datos de MongoDB Atlas
const uri = "mongodb+srv://DB_Impor_Expor:imporexpor0323@crismongodb.asdyykq.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

//Conversión de CSV a JSON
csv
(
    {
        delimiter: [";"],
        checkType: true
    }
)
.fromFile(csvFilePath)
.then
((jsonObj) => 
    {
        console.log(jsonObj);

        async function run() 
        {
            try 
            {
                //Base de Datos
                const database = client.db('import_export');

                //Coleccion a Insertar Documentos
                const coleccion = database.collection('<Nombre de la Colección a Insertar>'); //<----

                //Insertar datos convertidos en JSON
                const options = { ordered: false };
                const resultado = await coleccion.insertMany(jsonObj, options);
                console.log(`${resultado.insertedCount} documentos fueron insertados`);
            } 
            finally 
            {
                await client.close();
            }
        }
        run().catch(console.dir);
    }
);