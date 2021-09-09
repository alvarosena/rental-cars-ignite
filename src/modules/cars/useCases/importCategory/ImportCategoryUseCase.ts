import fs from 'fs';
import csvParse from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IImportCategory{
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase{
    constructor(
    @inject("CategoriesRepository")    
    private categoriesRepository: ICategoriesRepository) {}

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
                fs.promises.unlink(file.path);
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
        
        categories.map(async category => {
            const { name, description } = category;

            const existCategory = await this.categoriesRepository.findByName(name);

            if(!existCategory) {
                await this.categoriesRepository.create({
                    name, 
                    description,
                });
            }
        });
    }
}

export { ImportCategoryUseCase }