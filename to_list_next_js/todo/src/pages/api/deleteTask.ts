import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

// path database
const filePath = path.join(process.cwd(), "src/data/tasks.json")

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE"){
        const { id } = req.body;

        if(!id){
            return res.status(400).json({message: "Id da task é necessario"})
        }

        // cheka se o usuario exite 
        if(fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, "utf-8");
            let tasks = JSON.parse(fileData);

            // filtra o usuario pelo id
            tasks = tasks.filter((task: { id: number}) => task.id !== id);

            // salva a nova fila de uduarios
            fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2))

            res.status(200).json({ message: "deletado com sucesso "})
        } else {
            res.status(404).json({ message: "task nao encontrada para deletar"})
        }
    } else {
        res.status(405).json({message: "Método nao permitido"})
    }
}