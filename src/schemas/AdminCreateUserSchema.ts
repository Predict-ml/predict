import { z } from 'zod'

const roleDuplicated = (roles: { role: string }[]) => {
	const reducedRole = roles.reduce(
		(acc, role) => {
			acc[role.role] = acc[role.role] ? acc[role.role] + 1 : 1
			return acc
		},
		{} as { [key: string]: number },
	)

	return Object.values(reducedRole).some((count) => count > 1)
}

const roleSchema = z.array(
	z.object({ role: z.string().min(1, 'Champ obligatoire') }),
)

const baseSchema = z.object({
	name: z.string().min(1, 'Le nom est obligatoire'),
	email: z.string().email('Format de courriel invalide'),
	password: z
		.string()
		.min(6, 'Le mot de passe doit comporter au moins 6 caractères'),
	retypePassword: z.string().min(6, 'Les mots de passe doivent correspondre'),
	roles: roleSchema,
})

const schema = baseSchema
	.refine((data) => data.password === data.retypePassword, {
		message: 'Les mots de passe ne correspondent pas',
		path: ['retypePassword'],
	})
	.refine((data) => data.roles.length > 0, {
		message: 'Sélectionnez au moins un rôle',
		path: ['roles'],
	})
	.refine(
		(data) => {
			const hasDuplicates = roleDuplicated(data.roles)
			return !hasDuplicates
		},
		{
			message: 'Rôles en double',
			path: ['roles'],
		},
	)

type RegisterSchema = z.infer<typeof schema>

const updateUserSchema = baseSchema.omit({
	password: true,
	retypePassword: true,
})

type UpdateUserSchema = z.infer<typeof updateUserSchema>

export { schema, type RegisterSchema, updateUserSchema, type UpdateUserSchema }
