import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const filePath = path.resolve("./src/data/tasks.json");

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const { task } = req.body;

        if (!task){
            return res.status(400).json({error: "todos os campos sao obrigatorios"})
        }


    try {
        let data = [];
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, "utf-8");
            data = JSON.parse(fileData);
        }

        const newInstance = {
            id: Math.random(),
            task,
        }

        data.push(newInstance) // add data

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2)) // write data update

        return res.status(201).json({message: "task criada com sucesso"})
    } catch (error) {
        return res.status(500).json({error: "erro ao cadastrar task"})
    }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Metodo ${req.method} nao encontrado`)
    }

} 