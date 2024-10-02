import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs} from "fs";

type tasks = {
    id: number;
    task: string;
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<tasks[]> ) {
    // path database
    const filePath = path.join(process.cwd(), "src/data/tasks.json");

    try{
        // reading the json file
        const fileContents = await fs.readFile(filePath, "utf-8");

        // parse contents 
        const data: tasks[] = JSON.parse(fileContents) 

        // send data response

        res.status(200).json(data);
    }catch(error){
        console.error("erro ao tentar retornar tasks");
        res.status(500).json([])
    }

}
