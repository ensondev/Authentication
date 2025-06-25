import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { encrypt } from './libs/bcrypt';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private databaseService: DatabaseService,
        private jwtService: JwtService
    ){};

    async createUser(req, res){
        const {nombre_usuario, rol_usuario, password} = req.body;

        if (!nombre_usuario || !rol_usuario || !password) {
            return res.status(400).json({
                p_message: 'Todos los campos son requeridos',
                p_status: false,
                p_data: {}
            });
        }

        const checkQuery = `SELECT id_usuario FROM public.usuarios WHERE nombre_usuario = $1`;
        const checkValues = [nombre_usuario];

        try{
            const existingUser = await this.databaseService.query(checkQuery, checkValues);

            if (existingUser.rows.length > 0) {
                return res.status(400).json({
                    p_message: 'El nombre de usuario ya existe',
                    p_status: false,
                    p_data: {}
                });
            }

            const hashedPassword = await encrypt(password);
            const insertQuery = (`INSERT INTO public.usuarios (nombre_usuario, rol_usuario, password) VALUES ($1, $2, $3) RETURNING id_usuario, nombre_usuario, rol_usuario;`);
            const insertValue = [nombre_usuario, rol_usuario, hashedPassword];
            const result = await this.databaseService.query(insertQuery, insertValue);

            const newUser = result.rows[0];

            const payload = {
                sub: newUser.id_usuario,
                usuario: newUser.nombre_usuario,
                rol: newUser.rol_usuario
            }

            const access_token = await this.jwtService.signAsync(payload);

            res.status(201).json({
                p_message: 'Usuario registrado correctamente',
                p_status: true,
                p_data: {
                    usuario: newUser.nombre_usuario,
                    rol: newUser.rol_usuario,
                    access_token: access_token
                }
            });

        }catch(error){
            res.status(500).json({
                p_message: error.message,
                p_data: {}
            });
        }
    }


    async login(req, res){
        const { nombre_usuario, password } = req.body;

        if(!nombre_usuario || !password){
            return res.status(400).json({
                p_message: 'Nombre de usuario y contraseña son requeridos',
                p_status: false,
                p_data: {}
            });
        }

        try{
            const userQuery = `SELECT id_usuario, nombre_usuario, rol_usuario, password FROM public.usuarios WHERE nombre_usuario = $1`;
            const valueValues = [nombre_usuario];

            const userResult  = await this.databaseService.query(userQuery , valueValues);

            const errorMessage = 'Usuario o contraseña incorrecta';

            if(userResult.rows.length === 0 || !await compare(password, userResult.rows[0].password)){
                return res.status(401).json({
                    p_message: errorMessage,
                    p_status: false,
                    p_data: {}
                });
            }

            const user = userResult.rows[0];

            const payload = {
                sub: user.id_usuario,
                usuario: user.nombre_usuario,
                rol: user.rol_usuario
            }

            const access_token = await this.jwtService.signAsync(payload);

            res.status(200).json({
                p_message: 'Inicio de sesión exitoso',
                p_status: true,
                p_data: {
                    usuario: user.nombre_usuario,
                    rol: user.rol_usuario,
                    token: access_token
                }
            });

        }catch(error){
            console.error('Error en login:', error);
            res.status(500).json({
                p_message: `Error interno del servidor ${error.message}`,
                p_data: {}
            });
        }
    }

}
