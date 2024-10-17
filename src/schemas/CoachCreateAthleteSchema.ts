import { z } from 'zod'

// Schéma de base pour les athlètes
const baseAthleteSchema = z.object({
	name: z.string().min(1, 'Le nom est obligatoire'),
	email: z.string().email('Format de courriel invalide'),
})

type BaseAthleteSchema = z.infer<typeof baseAthleteSchema>

const coachRegisterAthleteSchema = baseAthleteSchema
	.extend({
		password: z
			.string()
			.min(6, 'Le mot de passe doit comporter au moins 6 caractères'),
		retypePassword: z.string().min(6, 'Les mots de passe doivent correspondre'),
	})
	.refine((data) => data.password === data.retypePassword, {
		message: 'Les mots de passe ne correspondent pas',
		path: ['retypePassword'],
	})

type CoachRegisterAthleteSchema = z.infer<typeof coachRegisterAthleteSchema>

const updateAthleteSchema = baseAthleteSchema.partial()

type UpdateAthleteSchema = z.infer<typeof updateAthleteSchema>

export {
	baseAthleteSchema,
	coachRegisterAthleteSchema,
	updateAthleteSchema,
	type BaseAthleteSchema,
	type CoachRegisterAthleteSchema,
	type UpdateAthleteSchema,
}
