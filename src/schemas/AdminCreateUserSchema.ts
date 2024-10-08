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
	z.object({ role: z.string().min(1, 'Campo obrigatório') }),
)

const baseSchema = z.object({
	name: z.string().min(1, 'Nome é obrigatório'),
	email: z.string().email('Formato de e-mail inválido'),
	password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
	retypePassword: z.string().min(6, 'Senhas devem coincidir'),
	roles: roleSchema,
})

const schema = baseSchema
	.refine((data) => data.password === data.retypePassword, {
		message: 'As senhas não coincidem',
		path: ['retypePassword'],
	})
	.refine((data) => data.roles.length > 0, {
		message: 'Selecione ao menos um cargo',
		path: ['roles'],
	})
	.refine(
		(data) => {
			const hasDuplicates = roleDuplicated(data.roles)
			return !hasDuplicates
		},
		{
			message: 'Cargos duplicados',
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
