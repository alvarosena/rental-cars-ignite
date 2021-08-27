import fs from 'fs';
import csvParse from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory{
    name: string;
    description: string;
}

class ImportCategoryUseCase{
    constructor(private categoriesRepository: ICategoriesRepository) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) =>{
            // Criação de stream de leitura    // Caminho do arquivo
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];
        
            const parseFile = csvParse();
        
            // Pegar todos as chunks lidas e passar para o parse file 
            stream.pipe(parseFile);
        
            parseFile.on("data", async (line) =>{
                const [name, description] = line;
                categories.push({
                    name,
                    description
                });
            })
            .on("end", () =>{
                resolve(categories);
            })
            .on("error", (err) => {
                reject(err);
            });
        });

    }

    // Parenteses é o que o metodo vai receber
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        console.log(categories);
    }
}

export { ImportCategoryUseCase }