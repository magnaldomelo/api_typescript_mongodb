import { IGaleriaService } from "../contracts/IGareriaService";
import { Result } from "../infra/result";
import { Galeria } from "../models/galaria";
import { GaleriaRepository } from "../repository/gareriaRepository";

export class GaleriaService implements IGaleriaService {

    async get(_id: string): Promise<Galeria> {
        let result = await GaleriaRepository.findById(_id);
        return result;
    }

    async getAll(page: number, qtd: number): Promise<Result<Galeria>> {
        let result = new Result<Galeria>();
        result.Page = page;
        result.Qtd = qtd;
        result.Total = await GaleriaRepository.count({});
        result.Data = await GaleriaRepository.find({}).skip((page* qtd) - qtd).limit(qtd);
        return result;
    }
}
