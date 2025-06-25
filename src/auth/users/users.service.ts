import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class UsersService {
    constructor(
        private databaseService: DatabaseService,
    ){};

    async getAllUser(res){
        const query = `SELECT id_usuario, nombre_usuario, rol_usuario, password FROM public.usuarios;`;
        const value = [];
        try{
            const result = await this.databaseService.query(query, value);
            res.status(200).json({
                p_message: null,
                p_status: true,
                p_data: {
                    users: result.rows,
                }
            });
        }catch(error){
            res.status(500).json({
                p_message: error.message,
                p_data: {}
            });
        }
    }

}
