'use server'

import { TRegistrationValidatorErrors, userRegistrationValidator } from "@/validators/user-validator";
import UserRepository from "../db/repositories/user-repository";
import { EkinoError } from "../helpers/error-helper";
import bcrypt from 'bcryptjs'
import { ZodError } from "zod";

export async function registerUser(formData: FormData) {
    try {

        const { email, name, password } = userRegistrationValidator.parse(
            Object.fromEntries(formData)
        );

        const userExists = await UserRepository.isExist(email, name);

        if(userExists) {
            throw new EkinoError(
                'Użytkownik z danym adresem email lub nazwą istnieje w bazie danych'
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserRepository.insert(email, name, hashedPassword);

        return {
            success: true,
            data: 'Rejestracja przebiegła pomyślnie'
        }
        
    } catch(error) {
        console.log(error);
        if(error instanceof EkinoError) {
            return {
                success: false,
                message: error.message
            }
        } else if(error instanceof ZodError) {
            return {
                success: false,
                message: 'W formularzu wystąpiły błędy, popraw je i spróbuj ponownie',
                errors: error.flatten().fieldErrors as TRegistrationValidatorErrors
            }
        }

        return {
            success: false,
            message: 'Wystąpił nieoczekiwany błąd, skontaktuj się z administratorem aplikacji.'
        }
    }
}
